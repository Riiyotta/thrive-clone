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
    python3 semantic_validate.py            # validates every bundled example
"""
import json
import os
import re
import sys

sys.dont_write_bytecode = True

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
        "catalog": _load("tokens", "llm", "token-catalog.json"),
        "tokenPolicy": _load("tokens", "llm", "token-policy.json"),
        "identity": _load("schema", "source-identity.json"),
        "components": {n[:-5]: _load("components", n) for n in sorted(os.listdir(os.path.join(REPO, "components"))) if n.endswith(".json")},
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

def node_variant(node):
    content = node.get("content")
    if isinstance(content, dict) and isinstance(content.get("variant"), str):
        return content["variant"]
    return "default"


def slot_choices(slot):
    """a slot plus its alternatives (a CHOICE slot accepts exactly one of them)."""
    return [slot] + list(slot.get("alternatives", []))


def template_realizations(tpl):
    """every node sequence a template permits: optional slots in/out, each choice resolved."""
    import itertools
    opts = []
    for slot in tpl["nodes"]:
        ch = [[c["section"]] for c in slot_choices(slot)]
        if not slot.get("required", True):
            ch.append([])
        opts.append(ch)
    return [[x for part in combo for x in part] for combo in itertools.product(*opts)]


def check_template_sequence(spec, reg):
    """TEMPLATE_NODE_SEQUENCE_MATCH + TEMPLATE_VARIANT_MATCH + THEME_MATCHES_TEMPLATE + TEMPLATE_ROUTE_MEASURED.

    nodes[] is validated against the node list of the template the PageSpec
    DECLARES -- never inspected in isolation. Slots honour required / repeatable /
    choice (alternatives); a slot listing `variants` is matched on (section, variant).
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
        choices = slot_choices(slot)
        names = [c["section"] for c in choices]
        lo = 1 if slot.get("required", True) else 0
        hi = len(actual) if slot.get("repeatable") else 1
        seen = 0
        picked = None
        while ai < len(actual) and seen < hi:
            sec = actual[ai].get("section")
            if sec not in names or (picked is not None and sec != picked["section"]):
                break
            picked = choices[names.index(sec)]
            allowed = picked.get("variants")
            if allowed and node_variant(actual[ai]) not in allowed:
                out.append(("error", "TEMPLATE_VARIANT_MATCH",
                            "node %d (%s) has variant %r; template %r allows %s in this slot"
                            % (ai, sec, node_variant(actual[ai]), tid, allowed)))
            seen += 1
            ai += 1
        if seen < lo:
            out.append(("error", "TEMPLATE_NODE_SEQUENCE_MATCH",
                        "template %r requires %s at position %d but the PageSpec has %r there"
                        % (tid, " | ".join(names), ai, actual[ai].get("section") if ai < len(actual) else None)))
    if ai < len(actual):
        extras = [n.get("section") for n in actual[ai:]]
        out.append(("error", "TEMPLATE_NODE_SEQUENCE_MATCH",
                    "PageSpec has %d node(s) template %r does not list at that point, or lists "
                    "in a different order: %s" % (len(extras), tid, extras)))
    route = spec.get("route")
    if route and route not in tpl["routes"]:
        out.append(("warn", "TEMPLATE_ROUTE_MEASURED",
                    "route %r is not a measured route of template %r (%d measured route(s), e.g. %s)"
                    % (route, tid, len(tpl["routes"]), tpl["routes"][0])))
    if spec.get("designSystem") != tpl["designSystem"]:
        out.append(("error", "TEMPLATE_NODE_SEQUENCE_MATCH",
                    "designSystem %r does not match template %r's %r"
                    % (spec.get("designSystem"), tid, tpl["designSystem"])))
    if spec.get("theme") != tpl.get("theme"):
        out.append(("error", "THEME_MATCHES_TEMPLATE",
                    "theme %r does not match template %r's theme %r" % (spec.get("theme"), tid, tpl.get("theme"))))
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
    ctas = [i for i, x in enumerate(ids) if x in ("conversion.demo-form", "conversion.demo-cta")]
    if len(ctas) != 1 or (ids and ctas and ctas[0] != len(ids) - 2):
        out.append(("error", "FOOTER_CTA_EXACTLY_ONE",
                    "expected exactly one footer CTA block (conversion.demo-form | conversion.demo-cta) right "
                    "before shell.footer; found at positions %s" % ctas))
    return out


def check_pinned_neighbours(spec, reg):
    """TESTIMONIAL_FOLLOWS_STATS, DEMO_FORM_PLACEMENT, DEMO_CTA_PRECEDES_FOOTER,
    OVERLAP_HERO_FOLLOWS_SPACER -- each section declares its rule id."""
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
    """HERO_OPENS_PAGE + ONE_HERO_PER_PAGE, with the DERIVED NO_HERO_TEMPLATES and
    SECONDARY_HERO_USES exception sets (compatibility/graph.json derivedSets)."""
    ds = reg["graph"]["derivedSets"]
    nohero = ds["NO_HERO_TEMPLATES"]["value"]
    secondary = {tuple(p) for p in ds["SECONDARY_HERO_USES"]["value"]}
    nodes = spec.get("nodes", [])
    cat = lambda n: reg["sections"].get(n.get("section"), {}).get("category")
    heroes = [n for n in nodes if cat(n) == "hero"]
    counted = [n for n in heroes if (n.get("section"), node_variant(n)) not in secondary]
    out = []
    if len(counted) > 1:
        out.append(("error", "ONE_HERO_PER_PAGE", "%d hero sections on one page (%s)"
                    % (len(counted), [n.get("section") for n in counted])))
    if spec.get("template") in nohero:
        return out
    if not heroes:
        out.append(("error", "ONE_HERO_PER_PAGE",
                    "template %r is not in NO_HERO_TEMPLATES %s but has no hero" % (spec.get("template"), nohero)))
    elif len(nodes) < 2 or cat(nodes[1]) != "hero":
        out.append(("error", "HERO_OPENS_PAGE", "node 1 is %r, expected a hero-category section right after the nav"
                    % (nodes[1].get("section") if len(nodes) > 1 else None)))
    return out


def check_duplicates(spec, reg):
    """NO_DUPLICATE_SINGLETON, keyed on (section, variant) with the derived caps."""
    out = []
    counts = {}
    for node in spec.get("nodes", []):
        key = (node.get("section"), node_variant(node))
        counts[key] = counts.get(key, 0) + 1
    for (sec, var), n in sorted(counts.items(), key=lambda kv: (str(kv[0][0]), kv[0][1])):
        cons = reg["sections"].get(sec, {}).get("constraints", {})
        caps = cons.get("maxPerPageByVariant") or {}
        cap = caps.get(var, caps.get("*", cons.get("maxPerPage", 1 if cons.get("onePerPage") else None)))
        if isinstance(cap, int) and n > cap:
            out.append(("error", "NO_DUPLICATE_SINGLETON",
                        "%s (variant %s) appears %d times, the most on any real page is %d" % (sec, var, n, cap)))
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
            if "assetRef" in d and spec_role.get("generationPolicy") not in ("may-generate-new", "may-reuse-licensed"):
                out.append(("error", "ASSET_REF_FORBIDDEN_FOR_PROTECTED_ROLE",
                            "%s: role %r is %s -- it renders a neutral placeholder and may "
                            "not carry an assetRef (%r)"
                            % (path, role, spec_role.get("generationPolicy"), d["assetRef"])))
            if str(d.get("assetRef", "")).startswith("stock/") and role != "stock.photo":
                out.append(("error", "STOCK_REF_ONLY_FOR_STOCK_ROLE",
                            "%s: assetRef %r points at the licensed stock set but the role is %r, not stock.photo"
                            % (path, d["assetRef"], role)))
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
            if "live" in d and d["live"] is not False:
                out.append(("error", "DEMO_FORM_STAYS_STATIC",
                            "%s.live must be false -- every form is a static placeholder" % path))
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


# --------------------------------------------------------------------------
# 3.0.0: registry pins (availability, retrieval eligibility, section taxonomy)
# --------------------------------------------------------------------------

# Pinned IN CODE, independently of assets/asset-roles.json (extraction/verify_all.py holds the same table and
# compares). Editing the registry alone cannot loosen a role: every PageSpec validation fails.
PINNED_AVAILABILITY = {
    "brand.wordmark": "clone-only",
    "placeholder.neutral": "generation-safe",
    "logo.customer": "blocked-for-generation",
    "logo.aiVendor": "blocked-for-generation",
    "badge.review": "blocked-for-generation",
    "badge.award": "blocked-for-generation",
    "photo.person": "blocked-for-generation",
    "photo.event": "blocked-for-generation",
    "photo.brand": "blocked-for-generation",
    "product.screenshot": "blocked-for-generation",
    "product.video": "blocked-for-generation",
    "stock.photo": "clone-only",
    "asset.userSupplied": "generation-safe",
    "illustration.generated": "generation-safe",
    "screenshot.placeholder": "generation-safe",
    "person.fictional": "generation-safe",
    "logo.placeholderCompany": "generation-safe",
    "badge.placeholder": "generation-safe",
    "brand.placeholderMark": "generation-safe",
    "url.placeholder": "generation-safe",
    "copy.original": "generation-safe",
}
AVAILABILITY_ENUM = ("clone-only", "generation-safe", "blocked-for-generation")

# R8: contracts that are runtime / utility UI and must not be retrieved as content (every other contract: True).
RETRIEVAL_PINNED = {
    "conversion.faq-empty": False,
    "product.explore-empty": False,
    "mobile-menu-panel": False,
    "nav-dropdown-panel": False,
    "footer-dropup": False,
}
RUNTIME_UI_RE = re.compile(r"cookie|consent|modal|dialog|drawer|popup|dropup|overlay|preloader|toast|menu-panel|dropdown-panel|-empty$")
MIN_RETRIEVAL_REASON = 30
SECTION_CATEGORY_ENUM = ("shell", "hero", "proof", "product", "story", "conversion", "index", "article")


def registry_pin_problems(reg):
    """PINNED_AVAILABILITY + RETRIEVAL_ELIGIBILITY_PINNED + SECTION_TAXONOMY_PINNED, as (rule, message)."""
    out = []
    roles = reg["assets"]["roles"]
    for role, want in PINNED_AVAILABILITY.items():
        got = roles.get(role, {}).get("availability")
        if got != want:
            out.append(("PINNED_AVAILABILITY", "asset role %s must be availability %r but asset-roles.json says %r" % (role, want, got)))
    for role, spec in roles.items():
        if role not in PINNED_AVAILABILITY:
            out.append(("PINNED_AVAILABILITY", "asset role %s has no pinned availability (add it to PINNED_AVAILABILITY in both validators after review)" % role))
        if spec.get("availability") not in AVAILABILITY_ENUM:
            out.append(("PINNED_AVAILABILITY", "asset role %s availability %r is outside the closed enum" % (role, spec.get("availability"))))
        if spec.get("availability") != "generation-safe":
            subs = spec.get("generationSafeSubstitutes") or []
            if not subs or any(PINNED_AVAILABILITY.get(s) != "generation-safe" for s in subs):
                out.append(("PINNED_AVAILABILITY", "asset role %s needs generationSafeSubstitutes that are all generation-safe (has %s)" % (role, subs)))
        if spec.get("availability") == "generation-safe" and spec.get("generationPolicy") in ("must-not-reuse", "must-not-fabricate", "must-reuse-exact"):
            out.append(("PINNED_AVAILABILITY", "asset role %s is generation-safe but its generationPolicy is %r" % (role, spec.get("generationPolicy"))))
    allow_roles = reg["allowlist"].get("assetRoles", {})
    for role, spec in roles.items():
        if allow_roles.get(role, {}).get("availability") != spec.get("availability"):
            out.append(("PINNED_AVAILABILITY", "allowlist copy of %s availability %r != registry %r" % (role, allow_roles.get(role, {}).get("availability"), spec.get("availability"))))
    contracts = [("sections", k, v) for k, v in reg["sections"].items()] + [("components", k, v) for k, v in reg["components"].items()]
    for kind, cid, c in contracts:
        want = RETRIEVAL_PINNED.get(cid, True)
        got = c.get("retrievalEligible")
        if got is not want:
            out.append(("RETRIEVAL_ELIGIBILITY_PINNED", "%s/%s: retrievalEligible is %r but pinned %r" % (kind, cid, got, want)))
        if RUNTIME_UI_RE.search(cid) and RETRIEVAL_PINNED.get(cid) is not False:
            out.append(("RETRIEVAL_ELIGIBILITY_PINNED", "%s/%s looks like runtime/utility UI and must be pinned retrievalEligible false" % (kind, cid)))
        if got is False and len(c.get("retrievalReason") or "") < MIN_RETRIEVAL_REASON:
            out.append(("RETRIEVAL_ELIGIBILITY_PINNED", "%s/%s: retrievalEligible false needs a retrievalReason of %d+ characters" % (kind, cid, MIN_RETRIEVAL_REASON)))
        entry = reg["allowlist"].get(kind, {}).get(cid, {})
        if entry.get("retrievalEligible") is not want:
            out.append(("RETRIEVAL_ELIGIBILITY_PINNED", "allowlist %s/%s retrievalEligible %r != pinned %r" % (kind, cid, entry.get("retrievalEligible"), want)))
    for sid, c in reg["sections"].items():
        sem, src = c.get("semantic") or {}, c.get("source") or {}
        if sem.get("id") != sid or sem.get("category") != sid.split(".")[0] or sem.get("category") not in SECTION_CATEGORY_ENUM:
            out.append(("SECTION_TAXONOMY_PINNED", "%s: semantic %r must be {id: contract id, category: id prefix}" % (sid, sem)))
        if not src.get("id") or src.get("id") == sid:
            out.append(("SECTION_TAXONOMY_PINNED", "%s: source.id %r must name the DOM/component source, not the semantic id" % (sid, src.get("id"))))
    return out


def check_registry_pins(spec, reg):
    """PINNED_AVAILABILITY + RETRIEVAL_ELIGIBILITY_PINNED + SECTION_TAXONOMY_PINNED (registry-level; fail every spec)."""
    return [("error", r, m) for r, m in registry_pin_problems(reg)]


def check_retrieval_nodes(spec, reg):
    """RETRIEVAL_ELIGIBILITY_PINNED at node level: a generation-mode page never composes an ineligible section."""
    out = []
    if spec.get("mode") != "generation":
        return out
    for i, n in enumerate(spec.get("nodes", [])):
        if RETRIEVAL_PINNED.get(n.get("section")) is False:
            out.append(("error", "RETRIEVAL_ELIGIBILITY_PINNED", "node %d: %s is runtime/utility UI (retrievalEligible false) and cannot be composed into a generation-mode page" % (i, n.get("section"))))
    return out


# --------------------------------------------------------------------------
# 3.0.0: token rules (TOKEN_*)
# --------------------------------------------------------------------------

PINNED_TOKEN_RULES = {
    "themes": ["nimbus-dark", "nimbus-content"],
    "themeScope": {"color.content-yellow": ["nimbus-content"], "color.brand-blue": ["nimbus-dark"]},
    "minTextContrast": 4.5,
}
RAW_COLOR_RE = re.compile(r"#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\s*\(", re.I)
COLOR_WORDS = {"white", "black", "red", "green", "blue", "yellow", "transparent", "currentcolor"}
RAW_LENGTH_RE = re.compile(r"(?<![A-Za-z0-9_.])-?\d+(?:\.\d+)?(?:px|rem|em|vh|vw|vmin|vmax|pt)\b|\bcalc\s*\(", re.I)
RAW_LENGTH_SLOT_RE = re.compile(r"^-?\d+(?:\.\d+)?(?:px|rem|em|vh|vw|vmin|vmax|pt|%)?$|calc\s*\(", re.I)
TOKEN_PATH_RE = re.compile(r"^[a-zA-Z][a-zA-Z0-9-]*(?:\.[a-zA-Z0-9][a-zA-Z0-9-]*)+$")


def _lum(hexstr):
    h = hexstr.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    rgb = [int(h[i:i + 2], 16) / 255.0 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in rgb]
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]


def contrast_ratio(a, b):
    la, lb = _lum(a), _lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def classify_token(slot_name, slot, value, reg):
    cat = reg["catalog"]["tokens"]
    pol = reg["tokenPolicy"]
    v = value if isinstance(value, str) else ""
    if RAW_COLOR_RE.search(v) or v.strip().lower() in COLOR_WORDS:
        return "TOKEN_RAW_COLOR", "tokens.%s: raw colour %r; name a token (%s)" % (slot_name, value, ", ".join(slot["allow"]))
    if RAW_LENGTH_SLOT_RE.search(v.strip()) or RAW_LENGTH_RE.search(v):
        return "TOKEN_ARBITRARY_SPACING", "tokens.%s: arbitrary length %r; name a token (%s)" % (slot_name, value, ", ".join(slot["allow"]))
    if slot["kind"] == "fontFamily" and (v not in cat or cat[v]["category"] != "fontFamily"):
        return "TOKEN_UNSUPPORTED_FONT", "tokens.%s: unsupported font %r; fonts are tokens (%s)" % (slot_name, value, ", ".join(slot["allow"]))
    if not TOKEN_PATH_RE.match(v) or v not in cat:
        return "TOKEN_UNKNOWN", "tokens.%s: %r is not a token of tokens/llm/token-catalog.json" % (slot_name, value)
    if v in pol.get("notGenerationApproved", []):
        return "TOKEN_NOT_APPROVED", "tokens.%s: %r is notGenerationApproved (%s)" % (slot_name, v, pol["notGenerationApprovedReason"].get(v, "")[:80])
    if v not in slot["allow"]:
        return "TOKEN_SLOT_MISMATCH", "tokens.%s: %r (%s) is not accepted by this slot (allowed: %s)" % (slot_name, v, cat[v]["category"], ", ".join(slot["allow"]))
    return None


def check_tokens(spec, reg):
    """TOKEN_UNKNOWN / TOKEN_RAW_COLOR / TOKEN_ARBITRARY_SPACING / TOKEN_UNSUPPORTED_FONT / TOKEN_SLOT_MISMATCH /
    TOKEN_NOT_APPROVED / TOKEN_THEME_COMBINATION: every page-level token is a real, approved catalog path for its
    slot and valid in the declared theme; no node content string carries a raw colour or CSS length."""
    out = []
    slots = {k: v for k, v in reg["tokenPolicy"]["pageSpecTokenSlots"].items() if not k.startswith("$")}
    themes = reg["catalog"]["themes"]
    theme = spec.get("theme")
    toks = spec.get("tokens") if isinstance(spec.get("tokens"), dict) else {}
    ok = {}
    for name, value in toks.items():
        slot = slots.get(name)
        if slot is None:
            out.append(("error", "TOKEN_UNKNOWN", "tokens.%s is not a slot of tokens/llm/token-policy.json" % name))
            continue
        bad = classify_token(name, slot, value, reg)
        if bad:
            out.append(("error",) + bad)
        else:
            ok[name] = value
    if theme not in themes or theme not in PINNED_TOKEN_RULES["themes"]:
        out.append(("error", "TOKEN_THEME_COMBINATION", "theme %r is not a theme of the token catalog %s" % (theme, sorted(themes))))
        return out
    resolved = themes[theme]["resolves"]
    for name, value in ok.items():
        slot = slots[name]
        if slot.get("themeResolved") and value not in themes[theme]["semanticTokens"]:
            out.append(("error", "TOKEN_THEME_COMBINATION", "tokens.%s: %r is not resolved by theme %r" % (name, value, theme)))
        scope = PINNED_TOKEN_RULES["themeScope"].get(value)
        if scope is not None and theme not in scope:
            out.append(("error", "TOKEN_THEME_COMBINATION", "tokens.%s: %r is only valid in theme(s) %s, not %r" % (name, value, scope, theme)))
    for name, slot in slots.items():
        against = slot.get("contrastAgainst")
        if against and name in ok and against in ok:
            a = resolved.get(ok[name], {}).get("value")
            b = resolved.get(ok[against], {}).get("value")
            if a and b and a.startswith("#") and b.startswith("#"):
                r = contrast_ratio(a, b)
                if r < PINNED_TOKEN_RULES["minTextContrast"]:
                    out.append(("error", "TOKEN_THEME_COMBINATION", "tokens.%s %r (%s) on tokens.%s %r (%s) has contrast %.2f < %s in theme %r"
                                % (name, ok[name], a, against, ok[against], b, r, PINNED_TOKEN_RULES["minTextContrast"], theme)))
    for path, text in _strings(spec.get("nodes", []), "nodes"):
        if path.endswith((".pattern", ".reducedMotionFallback", ".section", ".assetRole", ".variant")):
            continue
        if RAW_COLOR_RE.search(text):
            out.append(("error", "TOKEN_RAW_COLOR", "%s: raw colour value in content %r" % (path, text[:60])))
        if RAW_LENGTH_RE.search(text):
            out.append(("error", "TOKEN_ARBITRARY_SPACING", "%s: raw CSS length in content %r" % (path, text[:60])))
    return out


# --------------------------------------------------------------------------
# 3.0.0: generation mode (GENERATION_MODE_*)
# --------------------------------------------------------------------------

ROLE_RULE = {
    "brand.wordmark": "GENERATION_MODE_BRAND",
    "logo.customer": "GENERATION_MODE_CUSTOMER",
    "photo.person": "GENERATION_MODE_PERSON",
    "product.screenshot": "GENERATION_MODE_SCREENSHOT",
    "product.video": "GENERATION_MODE_SCREENSHOT",
}
TERM_RULE = {"BRAND": "GENERATION_MODE_BRAND", "CUSTOMER": "GENERATION_MODE_CUSTOMER", "PERSON": "GENERATION_MODE_PERSON",
             "URL": "GENERATION_MODE_URL", "EMBED": "GENERATION_MODE_EMBED", "CTA": "GENERATION_MODE_CTA"}
RESERVED_TLDS = ("example", "invalid")
HOST_RE = re.compile(r"(?:https?://)?((?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:com|net|org|io|co|ai|app|dev|uk|us|eu|de|fr|tv|me|info|biz|cloud|tech|learning|example|invalid))\b")
EMAIL_RE = re.compile(r"[a-z0-9._+-]+@((?:[a-z0-9-]+\.)+[a-z]{2,})")
NON_TEXT_KEYS = (".pattern", ".reducedMotionFallback", ".section", ".assetRole", ".variant", ".markRole")


def _spec_strings(spec):
    for key in ("route",):
        if isinstance(spec.get(key), str):
            yield "$." + key, spec[key]
    if isinstance(spec.get("brand"), dict) and isinstance(spec["brand"].get("name"), str):
        yield "$.brand.name", spec["brand"]["name"]
    for path, text in _strings(spec.get("nodes", []), "nodes"):
        if not path.endswith(NON_TEXT_KEYS):
            yield path, text


def check_generation_mode(spec, reg):
    """GENERATION_MODE_BRAND / _ASSET / _PERSON / _CUSTOMER / _SCREENSHOT / _COPY / _CLAIM / _URL / _EMBED / _CTA.
    In mode=generation nothing may identify or reproduce the source: no source term, figure, host, embed id,
    asset file name or 5-token copy shingle, and only generation-safe asset roles."""
    import textnorm as tn
    out = []
    if spec.get("mode") != "generation":
        return out
    roles = reg["assets"]["roles"]
    ident = reg["identity"]
    for i, node in enumerate(spec.get("nodes", [])):
        for path, d in _dicts(node.get("content"), "node[%d]" % i):
            role = d.get("assetRole")
            if role is None:
                continue
            av = PINNED_AVAILABILITY.get(role)
            if av != "generation-safe":
                rule = ROLE_RULE.get(role, "GENERATION_MODE_ASSET")
                out.append(("error", rule, "%s: asset role %s is %s; a generation-mode page uses a generation-safe substitute (%s)"
                            % (path, role, av, ", ".join(roles.get(role, {}).get("generationSafeSubstitutes", [])))))
            ref = str(d.get("assetRef", ""))
            if ref.startswith("stock/"):
                out.append(("error", "GENERATION_MODE_ASSET", "%s: assetRef %r reuses the clone's licensed stock set" % (path, ref)))
    terms = [(t["category"], t["term"], t["tokens"]) for t in ident["terms"]]
    files = [(t["term"].lower(), t["term"]) for t in ident["assetFiles"]]
    claims = [(re.sub(r"\s+", " ", tn.normalize(c["figure"])).strip(), c["figure"]) for c in ident["claims"]]
    hashes = set(ident["copy"]["hashes"])
    for path, text in _spec_strings(spec):
        toks = tn.tokens(text)
        norm = tn.normalize(text)
        flagged = set()
        for cat, term, tt in terms:
            if tn.contains_term(toks, tt):
                rule = TERM_RULE[cat]
                if (rule, term) not in flagged:
                    flagged.add((rule, term))
                    out.append(("error", rule, "%s: %r contains the source %s %r" % (path, text[:60], cat.lower(), term)))
        for low, name in files:
            if low in norm:
                out.append(("error", "GENERATION_MODE_ASSET", "%s: names the source asset file %r" % (path, name)))
        flat = re.sub(r"\s+", " ", norm)
        for fig, raw in claims:
            for m in re.finditer(re.escape(fig), flat):
                before = flat[m.start() - 1] if m.start() > 0 else ""
                after = flat[m.end()] if m.end() < len(flat) else ""
                if not re.match(r"[0-9a-z.,$]", before) and not re.match(r"[0-9a-z%]", after):
                    out.append(("error", "GENERATION_MODE_CLAIM", "%s: %r repeats the source claim/figure %r" % (path, text[:60], raw)))
                    break
        for rx in (HOST_RE, EMAIL_RE):
            for m in rx.finditer(norm):
                host = m.group(1)
                if host.rsplit(".", 1)[-1] not in RESERVED_TLDS:
                    out.append(("error", "GENERATION_MODE_URL", "%s: host %r is not on a reserved .example / .invalid domain" % (path, host)))
        if len(toks) >= tn.SHINGLE:
            shared = [k for k in range(len(toks) - tn.SHINGLE + 1) if tn.shingle_hash(toks[k:k + tn.SHINGLE]) in hashes]
            if shared:
                k = shared[0]
                out.append(("error", "GENERATION_MODE_COPY", "%s: shares the 5-word run %r with the source copy" % (path, " ".join(toks[k:k + tn.SHINGLE]))))
    return out


CHECKS = [
    check_registry_pins,
    check_tokens,
    check_generation_mode,
    check_retrieval_nodes,
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


def example_paths():
    """the bundled homepage example plus one example per template family in schema/examples/."""
    out = [os.path.join(REPO, "schema", "example.pagespec.json")]
    exdir = os.path.join(REPO, "schema", "examples")
    if os.path.isdir(exdir):
        out += [os.path.join(exdir, n) for n in sorted(os.listdir(exdir)) if n.endswith(".json")]
    return out


def validate_schema(spec):
    """Draft-07 validation using the repo's vendored, dependency-free validator."""
    import _draft7
    return _draft7.validate(spec, _load("schema", "pagespec.schema.json"))


def main(argv):
    paths = argv[1:] or example_paths()
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
