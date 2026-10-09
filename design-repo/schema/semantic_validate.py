#!/usr/bin/env python3
"""Semantic validation for Nimbus (thrive clone) PageSpecs.

Everything JSON Schema structurally cannot express. A PageSpec is valid only if
it passes BOTH schema/pagespec.schema.json AND this script.

Every check here emits rule ids from compatibility/graph.json, and
extraction/verify_all.py asserts that every rule's `enforcedBy` function exists
in CHECKS, so the graph's prose and this file's code cannot silently diverge.

Paths are derived from __file__, never hardcoded.

Usage:
    python3 semantic_validate.py [pagespec.json ...]
    python3 semantic_validate.py            # validates the bundled example
"""
import json
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, "schema"))


def _load(*parts):
    with open(os.path.join(REPO, *parts), encoding="utf-8") as handle:
        return json.load(handle)


def load_registry():
    sections = {}
    secdir = os.path.join(REPO, "sections")
    for name in sorted(os.listdir(secdir)):
        if name.endswith(".json"):
            data = _load("sections", name)
            sections[data["id"]] = data
    return {
        "sections": sections,
        "templates": _load("templates", "templates.json"),
        "graph": _load("compatibility", "graph.json"),
        "assets": _load("assets", "asset-roles.json"),
        "motion": _load("tokens", "00-foundation", "motion.json"),
        "allowlist": _load("tokens", "llm", "component-allowlist.json"),
    }


def _words(text):
    return len([w for w in re.split(r"\s+", text.strip()) if w])


def _strings(value, path="$"):
    """Yield (path, string) for every string leaf."""
    if isinstance(value, str):
        yield path, value
    elif isinstance(value, dict):
        for key, sub in value.items():
            for item in _strings(sub, "%s.%s" % (path, key)):
                yield item
    elif isinstance(value, list):
        for i, sub in enumerate(value):
            for item in _strings(sub, "%s[%d]" % (path, i)):
                yield item


def _dicts(value, path="$"):
    if isinstance(value, dict):
        yield path, value
        for key, sub in value.items():
            for item in _dicts(sub, "%s.%s" % (path, key)):
                yield item
    elif isinstance(value, list):
        for i, sub in enumerate(value):
            for item in _dicts(sub, "%s[%d]" % (path, i)):
                yield item


# --------------------------------------------------------------------------
# registry-level check shared with extraction/verify_all.py
# --------------------------------------------------------------------------

def pinned_policy_problems(registry, allowlist):
    """PINNED_ASSET_POLICIES.

    Membership in the closed generationPolicy enum is NOT the rule for the
    real-third-party roles -- each must hold one EXACT value. A mutation to a
    different-but-valid member (e.g. may-generate-new) must be caught.
    """
    problems = []
    allowed = set(registry["generationPolicyEnum"])
    pinned = {k: v for k, v in registry["pinnedPolicies"].items() if k != "note"}
    for role, spec in sorted(registry["roles"].items()):
        policy = spec.get("generationPolicy")
        if policy not in allowed:
            problems.append("%s has policy %r, outside the closed enum" % (role, policy))
        if role in pinned and policy != pinned[role]:
            problems.append("PINNED role %s must be %r but is %r" % (role, pinned[role], policy))
        if spec.get("realThirdParty") and role not in pinned:
            problems.append("%s is realThirdParty but has no pinned policy" % role)
    for role in pinned:
        if role not in registry["roles"]:
            problems.append("pinned role %s has no entry in roles" % role)
    if allowlist.get("pinnedAssetPolicies") != pinned:
        problems.append("the allowlist's pinnedAssetPolicies disagrees with the registry")
    for role, value in sorted(allowlist.get("assetRoles", {}).items()):
        real = registry["roles"].get(role, {}).get("generationPolicy")
        if value.get("generationPolicy") != real:
            problems.append("allowlist role %s says %r, registry says %r"
                            % (role, value.get("generationPolicy"), real))
    return problems


# --------------------------------------------------------------------------
# checks -- each returns a list of (severity, rule_id, message)
# --------------------------------------------------------------------------

def check_template_sequence(spec, reg):
    """TEMPLATE_NODE_SEQUENCE_MATCH + TEMPLATE_ROUTE_MEASURED.

    nodes[] is validated against the node list of the template the PageSpec
    DECLARES -- never inspected in isolation.
    """
    out = []
    tid = spec.get("template")
    templates = reg["templates"]["templates"]
    if tid not in templates:
        return [("error", "TEMPLATE_NODE_SEQUENCE_MATCH",
                 "declared template %r is not a real template" % tid)]
    tpl = templates[tid]
    actual = spec.get("nodes", [])
    ai = 0
    for slot in tpl["nodes"]:
        sec = slot["section"]
        lo = 1 if slot.get("required", True) else 0
        hi = len(actual) if slot.get("repeatable") else 1
        seen = 0
        while ai < len(actual) and actual[ai].get("section") == sec and seen < hi:
            seen += 1
            ai += 1
        if seen < lo:
            out.append(("error", "TEMPLATE_NODE_SEQUENCE_MATCH",
                        "template %r requires %s at position %d but the PageSpec has %r there"
                        % (tid, sec, ai, actual[ai].get("section") if ai < len(actual) else None)))
    if ai < len(actual):
        extras = [n.get("section") for n in actual[ai:]]
        out.append(("error", "TEMPLATE_NODE_SEQUENCE_MATCH",
                    "PageSpec has %d node(s) template %r does not list at that point, or lists "
                    "in a different order: %s" % (len(extras), tid, extras)))
    route = spec.get("route")
    if route and route not in tpl["routes"]:
        out.append(("warn", "TEMPLATE_ROUTE_MEASURED",
                    "route %r is not a measured route of template %r %s; only '/' was measured"
                    % (route, tid, tpl["routes"])))
    if spec.get("designSystem") != tpl["designSystem"]:
        out.append(("error", "TEMPLATE_NODE_SEQUENCE_MATCH",
                    "designSystem %r does not match template %r's %r"
                    % (spec.get("designSystem"), tid, tpl["designSystem"])))
    return out


def check_chrome_position(spec, reg):
    """NAV_FIRST, FOOTER_LAST."""
    out = []
    ids = [n.get("section") for n in spec.get("nodes", [])]
    sections = reg["sections"]
    firsts = [s for s, c in sections.items() if c.get("constraints", {}).get("mustBeFirst")]
    lasts = [s for s, c in sections.items() if c.get("constraints", {}).get("mustBeLast")]
    for sid in firsts:
        if not ids or ids[0] != sid:
            out.append(("error", "NAV_FIRST", "first node is %r, expected %s"
                        % (ids[0] if ids else None, sid)))
    for sid in lasts:
        if not ids or ids[-1] != sid:
            out.append(("error", "FOOTER_LAST", "last node is %r, expected %s"
                        % (ids[-1] if ids else None, sid)))
    return out


def check_pinned_neighbours(spec, reg):
    """HERO_FOLLOWS_NAV, TESTIMONIAL_FOLLOWS_STATS, FAQ_PRECEDES_DEMO_FORM,
    DEMO_FORM_PRECEDES_FOOTER -- each section declares its rule id."""
    out = []
    ids = [n.get("section") for n in spec.get("nodes", [])]
    for i, sid in enumerate(ids):
        cons = reg["sections"].get(sid, {}).get("constraints", {})
        rule = cons.get("neighbourRuleId")
        want_prev = cons.get("mustImmediatelyFollow")
        want_next = cons.get("mustImmediatelyPrecede")
        if want_prev and (i == 0 or ids[i - 1] != want_prev):
            out.append(("error", rule, "node %d (%s) must immediately follow %s, but follows %r"
                        % (i, sid, want_prev, ids[i - 1] if i else None)))
        if want_next and (i + 1 >= len(ids) or ids[i + 1] != want_next):
            out.append(("error", rule, "node %d (%s) must immediately precede %s, but precedes %r"
                        % (i, sid, want_next, ids[i + 1] if i + 1 < len(ids) else None)))
    return out


def check_one_hero(spec, reg):
    """ONE_HERO_PER_PAGE, with the DERIVED (empty) hero-less exception set."""
    nohero = reg["graph"]["derivedSets"]["NO_HERO_TEMPLATES"]["value"]
    heroes = [n for n in spec.get("nodes", [])
              if reg["sections"].get(n.get("section"), {}).get("category") == "hero"]
    if len(heroes) > 1:
        return [("error", "ONE_HERO_PER_PAGE", "%d hero sections on one page" % len(heroes))]
    if not heroes and spec.get("template") not in nohero:
        return [("error", "ONE_HERO_PER_PAGE",
                 "template %r is not in NO_HERO_TEMPLATES %s but has no hero"
                 % (spec.get("template"), nohero))]
    return []


def check_duplicates(spec, reg):
    """NO_DUPLICATE_SINGLETON."""
    out = []
    counts = {}
    for node in spec.get("nodes", []):
        counts[node.get("section")] = counts.get(node.get("section"), 0) + 1
    for sec, n in sorted(counts.items(), key=lambda kv: str(kv[0])):
        cons = reg["sections"].get(sec, {}).get("constraints", {})
        cap = cons.get("maxPerPage", 1 if cons.get("onePerPage") else None)
        if isinstance(cap, int) and n > cap:
            out.append(("error", "NO_DUPLICATE_SINGLETON",
                        "%s appears %d times, maxPerPage is %d" % (sec, n, cap)))
    return out


def check_adjacency(spec, reg):
    """NO_ADJACENT_SAME_CATEGORY -- warn, with the derived real pairs exempt."""
    out = []
    rule = next(r for r in reg["graph"]["rules"] if r["id"] == "NO_ADJACENT_SAME_CATEGORY")
    exempt = {tuple(p) for p in rule.get("exemptPairs", [])}
    ids = [n.get("section") for n in spec.get("nodes", [])]
    for i, (a, b) in enumerate(zip(ids, ids[1:])):
        if (a, b) in exempt:
            continue
        ca = reg["sections"].get(a, {}).get("category")
        cb = reg["sections"].get(b, {}).get("category")
        if ca and ca == cb:
            out.append(("warn", "NO_ADJACENT_SAME_CATEGORY",
                        "nodes %d and %d are both category %r (%s, %s)" % (i, i + 1, ca, a, b)))
    return out


def check_motion_pattern(spec, reg):
    """MOTION_PATTERN_CLOSED."""
    out = []
    for i, node in enumerate(spec.get("nodes", [])):
        contract = reg["sections"].get(node.get("section"))
        if not contract:
            continue
        allowed = contract["motion"]["allowedPatterns"]
        pattern = (node.get("motion") or {}).get("pattern")
        if pattern not in allowed:
            out.append(("error", "MOTION_PATTERN_CLOSED",
                        "node %d (%s): motion pattern %r is not in allowedPatterns %s"
                        % (i, node.get("section"), pattern, allowed)))
    return out


def check_reduced_motion(spec, reg):
    """REDUCED_MOTION_FALLBACK_REQUIRED."""
    out = []
    for i, node in enumerate(spec.get("nodes", [])):
        motion = node.get("motion") or {}
        if "reducedMotionFallback" not in motion:
            out.append(("error", "REDUCED_MOTION_FALLBACK_REQUIRED",
                        "node %d (%s): motion is missing reducedMotionFallback"
                        % (i, node.get("section"))))
            continue
        contract = reg["sections"].get(node.get("section"))
        if contract and motion["reducedMotionFallback"] != contract["motion"]["reducedMotionFallback"]:
            out.append(("error", "REDUCED_MOTION_FALLBACK_REQUIRED",
                        "node %d (%s): reducedMotionFallback %r, section contract declares %r"
                        % (i, node.get("section"), motion["reducedMotionFallback"],
                           contract["motion"]["reducedMotionFallback"])))
    return out


def check_motion_values(spec, reg):
    """MOTION_VALUES_MATCH_PATTERN: optional values must be measured for THIS pattern."""
    out = []
    patterns = reg["motion"]["patterns"]
    fields = (("trigger", "trigger"), ("durationMs", "durationsMs"),
              ("delayMs", "delaysMs"), ("easing", "easings"))
    for i, node in enumerate(spec.get("nodes", [])):
        motion = node.get("motion") or {}
        pat = patterns.get(motion.get("pattern"))
        if not pat:
            continue
        for field, key in fields:
            if field in motion and motion[field] not in pat[key]:
                out.append(("error", "MOTION_VALUES_MATCH_PATTERN",
                            "node %d (%s): %s=%r was not measured for pattern %r (measured: %s)"
                            % (i, node.get("section"), field, motion[field],
                               motion.get("pattern"), pat[key])))
    return out


def check_asset_roles(spec, reg):
    """ASSET_ROLE_CLOSED + ASSET_REF_FORBIDDEN_FOR_PROTECTED_ROLE."""
    out = []
    roles = reg["assets"]["roles"]
    for i, node in enumerate(spec.get("nodes", [])):
        settable = (reg["allowlist"]["sections"].get(node.get("section"), {})
                    .get("settableProperties", {}))
        for path, d in _dicts(node.get("content"), "node[%d]" % i):
            if "assetRole" not in d:
                continue
            role = d["assetRole"]
            spec_role = roles.get(role)
            # the field's own allowed roles, from the allowlist path
            field = re.sub(r"\[\d+\]", "[]", path.split(".", 1)[1]) if "." in path else ""
            allowed = settable.get(field, {}).get("assetRoles")
            if spec_role is None:
                out.append(("error", "ASSET_ROLE_CLOSED",
                            "%s: assetRole %r is not in the closed enum" % (path, role)))
                continue
            if spec_role.get("exposedAsPageSpecField") is False:
                out.append(("error", "ASSET_ROLE_CLOSED",
                            "%s: assetRole %r is not exposed as a PageSpec field" % (path, role)))
            if allowed is not None and role not in allowed:
                out.append(("error", "ASSET_ROLE_CLOSED",
                            "%s: assetRole %r is not allowed on this field %s" % (path, role, allowed)))
            if "assetRef" in d and spec_role.get("generationPolicy") != "may-generate-new":
                out.append(("error", "ASSET_REF_FORBIDDEN_FOR_PROTECTED_ROLE",
                            "%s: role %r is %s -- it renders a neutral placeholder and may "
                            "not carry an assetRef (%r)"
                            % (path, role, spec_role.get("generationPolicy"), d["assetRef"])))
    return out


_SOURCE_PATH = re.compile(r"(^|[\s\"'(])(/assets/|public/assets/|https?://)", re.I)


def check_asset_paths(spec, reg):
    """NO_SOURCE_OR_EXTERNAL_ASSET_PATHS."""
    out = []
    for path, text in _strings(spec):
        if _SOURCE_PATH.search(text):
            out.append(("error", "NO_SOURCE_OR_EXTERNAL_ASSET_PATHS",
                        "%s: %r references a source-project asset path or an external URL"
                        % (path, text[:80])))
    return out


def check_original_terms(spec, reg):
    """ORIGINAL_COPY_AND_MARKS_FORBIDDEN."""
    out = []
    terms = reg["assets"]["sourceIsARealCompany"]["bannedTerms"]
    patterns = [(t, re.compile(r"(?<![A-Za-z0-9])%s(?![A-Za-z0-9])" % re.escape(t))) for t in terms]
    for path, text in _strings(spec):
        for term, pat in patterns:
            if pat.search(text):
                out.append(("error", "ORIGINAL_COPY_AND_MARKS_FORBIDDEN",
                            "%s contains %r: the original brand/assistant name or a real "
                            "third-party name. Use original placeholder copy." % (path, term)))
    return out


_FORM_BANNED = ("action", "endpoint", "method", "portalId", "formId", "hubspot", "onSubmit", "submitUrl")
_VIDEO_BANNED = ("embedUrl", "iframe", "iframeSrc", "youtubeId", "autoplay", "src", "videoUrl")


def check_static_form(spec, reg):
    """DEMO_FORM_STAYS_STATIC + VIDEO_STAYS_PLACEHOLDER (defence in depth behind the closed schema)."""
    out = []
    for i, node in enumerate(spec.get("nodes", [])):
        content = node.get("content") or {}
        if node.get("section") == "conversion.demo-form":
            form = content.get("form") or {}
            if form.get("live") is not False:
                out.append(("error", "DEMO_FORM_STAYS_STATIC",
                            "node %d: form.live must be false -- the demo form is a static "
                            "placeholder with no endpoint" % i))
        for path, d in _dicts(content, "node[%d]" % i):
            for key in d:
                if key in _FORM_BANNED:
                    out.append(("error", "DEMO_FORM_STAYS_STATIC",
                                "%s: %r is forbidden -- no form may submit anywhere" % (path, key)))
                if key in _VIDEO_BANNED:
                    out.append(("error", "VIDEO_STAYS_PLACEHOLDER",
                                "%s: %r is forbidden -- media stays a static placeholder" % (path, key)))
    return out


def check_inline_phrases(spec, reg):
    """INLINE_PHRASES_PRESENT."""
    out = []
    for path, d in _dicts(spec.get("nodes", [])):
        text = d.get("text")
        if not isinstance(text, str):
            continue
        for key in ("linkPhrases", "boldPhrases"):
            for phrase in d.get(key) or []:
                if isinstance(phrase, str) and phrase not in text:
                    out.append(("error", "INLINE_PHRASES_PRESENT",
                                "%s.%s: %r does not occur in the sibling text" % (path, key, phrase)))
    return out


def _walk_budget(value, schema, path, out):
    if not isinstance(schema, dict):
        return
    if "oneOf" in schema:
        import _draft7
        for branch in schema["oneOf"]:
            if not _draft7.validate(value, branch):
                _walk_budget(value, branch, path, out)
                return
        return
    budget = schema.get("maxWords")
    if budget is not None and isinstance(value, str):
        n = _words(value)
        if n > budget:
            out.append(("error", "MAX_WORDS_BUDGETS",
                        "%s: %d words exceeds maxWords %d" % (path, n, budget)))
    if isinstance(value, dict):
        for key, sub in (schema.get("properties") or {}).items():
            if key in value:
                _walk_budget(value[key], sub, "%s.%s" % (path, key), out)
    if isinstance(value, list) and isinstance(schema.get("items"), dict):
        for i, sub in enumerate(value):
            _walk_budget(sub, schema["items"], "%s[%d]" % (path, i), out)


def check_max_words(spec, reg):
    """MAX_WORDS_BUDGETS -- per-instance word counts."""
    out = []
    for i, node in enumerate(spec.get("nodes", [])):
        contract = reg["sections"].get(node.get("section"))
        if contract:
            _walk_budget(node.get("content"), contract["content"], "node[%d]" % i, out)
    return out


CHECKS = [
    check_template_sequence,
    check_chrome_position,
    check_pinned_neighbours,
    check_one_hero,
    check_duplicates,
    check_adjacency,
    check_motion_pattern,
    check_reduced_motion,
    check_motion_values,
    check_asset_roles,
    check_asset_paths,
    check_original_terms,
    check_static_form,
    check_inline_phrases,
    check_max_words,
]


def validate_spec(spec, reg=None):
    """Return (errors, warnings) as lists of (rule_id, message)."""
    reg = reg or load_registry()
    errors, warnings = [], []
    for check in CHECKS:
        for severity, rule, message in check(spec, reg):
            (errors if severity == "error" else warnings).append((rule, message))
    return errors, warnings


def validate_schema(spec):
    """Draft-07 validation using the repo's vendored, dependency-free validator."""
    import _draft7
    return _draft7.validate(spec, _load("schema", "pagespec.schema.json"))


def main(argv):
    paths = argv[1:] or [os.path.join(REPO, "schema", "example.pagespec.json")]
    reg = load_registry()
    bad = 0
    for path in paths:
        with open(path, encoding="utf-8") as handle:
            spec = json.load(handle)
        schema_errors = validate_schema(spec)
        errors, warnings = validate_spec(spec, reg)
        print("== %s" % os.path.basename(path))
        for where, message in schema_errors:
            print("   SCHEMA  %s %s" % (where, message))
        for rule, message in errors:
            print("   ERROR   [%s] %s" % (rule, message))
        for rule, message in warnings:
            print("   WARN    [%s] %s" % (rule, message))
        print("   -> %d schema error(s), %d semantic error(s), %d warning(s)"
              % (len(schema_errors), len(errors), len(warnings)))
        bad += len(schema_errors) + len(errors)
    print()
    print("FAIL: %d error(s)" % bad if bad else "PASS: 0 errors")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
