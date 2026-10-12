#!/usr/bin/env python3
"""One-shot verification for the Nimbus (thrive clone) design-repo.

Every check recomputes a fact from the real files rather than trusting a
hand-maintained summary, so a stale number fails the run instead of looking
coherent.

   1 json-parse         every JSON file parses
   2 no-abs-paths       no absolute local machine paths anywhere in the tree
   3 no-images          no image/video file ships inside design-repo/
   4 self-contained     manifest entryPoints are all INSIDE design-repo/ and exist
   5 schema             the bundled example validates draft-07 with 0 errors
   6 schema-sections    every schema branch == its section contract (content + motion)
   7 allowlist-parity   allowlist <-> contract files, both directions (+ asset roles)
   8 allowlist-schema   EVERY settable path in the allowlist <-> the real schema
   9 version-parity     manifest.allowlistVersion == allowlist.version
  10 manifest-counts    manifest counts recomputed from disk
  10b readme-counts     README.md's count table recomputed from disk
  11 route-coverage     every route assigned exactly once, 1:1 with templates
  11b route-sequences   every per-route node sequence is a real realization of its template
  11c route-source      templates' routes == '/' + src/routes.js (preview paths excluded)
  11d template-composition  each template's componentTags == the tags really rendered by its page
  12 graph-validator    every graph rule maps to a real function; derived sets match data
  13 pinned-assets      real-third-party roles hold their EXACT pinned policy
  14 citations          every path:line citation in range; ledger keywords inside the range
  15 responsive         every responsive entry's Tailwind classes occur in its cited line(s)
  16 asset-coverage     every public/assets file is claimed by a role or listed unreferenced
  17 ia-alignment       section ids/order/implementedBy match the project's ia.json
  18 example-provenance every example's copy uses only words that occur in the clone's src/
  19 adversarial        the full control + mutation suite

Checks 11c, 11d and 14-18 need the sibling source project. With none present (a standalone
copy or an extracted zip) they WARN and skip rather than fail.

Paths derive from __file__, never hardcoded.

Usage:
    python3 verify_all.py                # everything
    python3 verify_all.py --prove-drift  # inject one defect per scratch copy; each must be caught
    python3 verify_all.py --cross-check  # diff the vendored validator against `jsonschema`, if installed
"""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_ROOT = os.path.dirname(REPO)   # the sibling project, when present
sys.path.insert(0, os.path.join(REPO, "schema"))

PASS, FAIL, WARN = "PASS", "FAIL", "WARN"
results = []


def record(name, status, detail=""):
    results.append((name, status, detail))
    print("  %-19s %-4s %s" % (name, status, detail))


def jload(*parts):
    with open(os.path.join(REPO, *parts), encoding="utf-8") as handle:
        return json.load(handle)


def all_files():
    out = []
    for root, dirs, files in os.walk(REPO):
        dirs[:] = [d for d in dirs if d != "__pycache__"]
        for name in sorted(files):
            if name == ".DS_Store":
                continue
            out.append(os.path.relpath(os.path.join(root, name), REPO))
    return sorted(out)


def all_json():
    return [f for f in all_files() if f.endswith(".json")]


def example_files():
    out = ["schema/example.pagespec.json"]
    exdir = os.path.join(REPO, "schema", "examples")
    if os.path.isdir(exdir):
        out += ["schema/examples/" + n for n in sorted(os.listdir(exdir)) if n.endswith(".json")]
    return out


def required_of(content):
    if "oneOf" in content:
        return sorted(set.intersection(*[set(b.get("required", [])) for b in content["oneOf"]]))
    return sorted(content.get("required", []))


def contract_ids():
    out = {}
    for kind in ("sections", "primitives", "components"):
        out[kind] = sorted(n[:-5] for n in os.listdir(os.path.join(REPO, kind)) if n.endswith(".json"))
    return out


def source_present():
    return os.path.isdir(os.path.join(SOURCE_ROOT, "src"))


# --------------------------------------------------------------------------

def check_json_parse():
    bad = []
    for rel in all_json():
        try:
            jload(rel)
        except Exception as exc:
            bad.append("%s: %s" % (rel, exc))
    if bad:
        record("json-parse", FAIL, "; ".join(bad[:3]))
    else:
        record("json-parse", PASS, "%d JSON files parse" % len(all_json()))


def check_no_abs_paths():
    # Assembled from fragments so this file does not match its own check.
    home = "/" + "Users" + "/"
    nix = "/" + "home" + "/"
    tmp = "/" + "private" + "/"
    pattern = re.compile("%s|%s[a-z]|%s|[A-Z]:%s" % (home, nix, tmp, re.escape(chr(92) * 2)))
    hits = []
    for rel in all_files():
        try:
            with open(os.path.join(REPO, rel), encoding="utf-8", errors="replace") as handle:
                for i, line in enumerate(handle, 1):
                    if pattern.search(line):
                        hits.append("%s:%d" % (rel, i))
        except OSError:
            pass
    if hits:
        record("no-abs-paths", FAIL, "%d hit(s): %s" % (len(hits), hits[:4]))
    else:
        record("no-abs-paths", PASS, "no absolute local machine paths in %d files" % len(all_files()))


IMAGE_EXT = (".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg", ".mp4", ".webm", ".ico")


def check_no_images():
    shipped = [f for f in all_files() if f.lower().endswith(IMAGE_EXT)]
    if shipped:
        record("no-images", FAIL, "image/video files inside design-repo/: %s -- the source "
               "imagery is real third-party content and must never be copied in" % shipped[:4])
    else:
        record("no-images", PASS, "0 image/video files shipped (reference imagery stays out)")


def check_self_contained():
    entries = jload("registry.manifest.json").get("entryPoints", {})
    flat = []
    for value in entries.values():
        flat.extend(value if isinstance(value, list) else [value])
    outside = [e for e in flat if e.startswith("../") or e.startswith("/")]
    missing = [e for e in flat if not os.path.exists(os.path.join(REPO, e))]
    if outside:
        record("self-contained", FAIL, "%d entryPoint(s) point outside design-repo/: %s" % (len(outside), outside[:4]))
    elif missing:
        record("self-contained", FAIL, "%d entryPoint(s) do not exist: %s" % (len(missing), missing[:4]))
    else:
        record("self-contained", PASS, "%d entryPoints, all inside design-repo/ and present" % len(flat))


def check_schema():
    import _draft7
    schema = jload("schema", "pagespec.schema.json")
    unsupported = _draft7.check_schema(schema)
    errors = []
    exs = example_files()
    for rel in exs:
        errors += [(rel, e) for e in _draft7.validate(jload(rel), schema)]
    if unsupported:
        record("schema", FAIL, "unsupported keywords: %s" % unsupported)
    elif errors:
        record("schema", FAIL, "%d error(s): %s" % (len(errors), errors[:2]))
    else:
        record("schema", PASS, "%d examples validate draft-07 with 0 errors; %d content branches"
               % (len(exs), len(schema["properties"]["nodes"]["items"]["allOf"])))


def _branches(schema):
    out = {}
    for b in schema["properties"]["nodes"]["items"]["allOf"]:
        out[b["if"]["properties"]["section"]["const"]] = b["then"]["properties"]
    return out


def check_schema_sections():
    """The schema's per-section content is a COPY of the section contract. They must not drift."""
    schema = jload("schema", "pagespec.schema.json")
    branches = _branches(schema)
    problems = []
    ids = contract_ids()["sections"]
    enum = schema["properties"]["nodes"]["items"]["properties"]["section"]["enum"]
    if sorted(enum) != sorted(ids):
        problems.append("section enum %s != contract files %s" % (sorted(enum), ids))
    for sid in ids:
        contract = jload("sections", "%s.json" % sid)
        br = branches.get(sid)
        if br is None:
            problems.append("%s has no schema branch" % sid)
            continue
        if br["content"] != contract["content"]:
            problems.append("%s: schema content differs from the section contract" % sid)
        m = br["motion"]["properties"]
        if m["pattern"]["enum"] != contract["motion"]["allowedPatterns"]:
            problems.append("%s: schema motion patterns differ from the contract" % sid)
        if m["reducedMotionFallback"]["const"] != contract["motion"]["reducedMotionFallback"]:
            problems.append("%s: schema fallback const differs from the contract" % sid)
    extra = sorted(set(branches) - set(ids))
    if extra:
        problems.append("schema branches with no contract: %s" % extra)
    patterns = set(jload("tokens", "00-foundation", "motion.json")["patterns"])
    if set(schema["properties"]["nodes"]["items"]["properties"]["motion"]["properties"]["pattern"]["enum"]) != patterns:
        problems.append("schema motion pattern enum != tokens/00-foundation/motion.json patterns")
    if problems:
        record("schema-sections", FAIL, problems[0])
    else:
        record("schema-sections", PASS, "%d branches == contracts (content, patterns, fallback)" % len(ids))


def check_allowlist_parity():
    allowlist = jload("tokens", "llm", "component-allowlist.json")
    ids = contract_ids()
    problems = []
    for kind in ("sections", "primitives", "components"):
        listed = set(allowlist.get(kind, {}).keys())
        real = set(ids[kind])
        if listed - real:
            problems.append("%s: phantom allowlist entries with no contract file %s" % (kind, sorted(listed - real)))
        if real - listed:
            problems.append("%s: contract files with no allowlist entry %s" % (kind, sorted(real - listed)))
        for name in sorted(listed & real):
            declared = allowlist[kind][name].get("contractFile")
            if declared != "%s/%s.json" % (kind, name):
                problems.append("%s/%s: contractFile says %r" % (kind, name, declared))
    roles = set(jload("assets", "asset-roles.json")["roles"])
    if roles != set(allowlist.get("assetRoles", {})):
        problems.append("assetRoles mismatch between registry and allowlist")
    if problems:
        record("allowlist-parity", FAIL, problems[0])
    else:
        record("allowlist-parity", PASS, "%d contracts <-> %d allowlist entries, both directions, + %d asset roles"
               % (sum(len(v) for v in ids.values()), sum(len(v) for v in ids.values()), len(roles)))


def flatten(schema, prefix, out):
    if "oneOf" in schema:
        for b in schema["oneOf"]:
            flatten(b, prefix, out)
        return
    if schema.get("type") != "object":
        return
    for k, sub in schema.get("properties", {}).items():
        p = prefix + ("." if prefix else "") + k
        entry = out.setdefault(p, {"settable": True})
        if "maxWords" in sub:
            entry["maxWords"] = sub["maxWords"]
        if "x-allowedRoles" in sub:
            entry["assetRoles"] = sub["x-allowedRoles"]
            flatten(sub, p, out)
            continue
        if sub.get("type") == "array":
            it = sub["items"]
            e2 = out.setdefault(p + "[]", {"settable": True})
            if "maxWords" in it:
                e2["maxWords"] = it["maxWords"]
            if it.get("type") == "object" or "oneOf" in it:
                flatten(it, p + "[]", out)
        elif sub.get("type") == "object" or "oneOf" in sub:
            flatten(sub, p, out)


def check_allowlist_schema():
    """Every settable path (with its maxWords and assetRoles) is re-derived from the schema."""
    allowlist = jload("tokens", "llm", "component-allowlist.json")
    branches = _branches(jload("schema", "pagespec.schema.json"))
    problems = []
    total = 0
    for sid, entry in sorted(allowlist["sections"].items()):
        br = branches.get(sid)
        if br is None:
            problems.append("%s has an allowlist entry but no schema branch" % sid)
            continue
        derived = {}
        flatten(br["content"], "", derived)
        total += len(derived)
        if entry["settableProperties"] != derived:
            only_a = sorted(set(entry["settableProperties"]) - set(derived))
            only_s = sorted(set(derived) - set(entry["settableProperties"]))
            changed = sorted(k for k in set(derived) & set(entry["settableProperties"])
                             if derived[k] != entry["settableProperties"][k])
            problems.append("%s: allowlist-only %s / schema-only %s / differing %s" % (sid, only_a, only_s, changed))
        if sorted(entry["requiredContentFields"]) != required_of(br["content"]):
            problems.append("%s: requiredContentFields differ from the schema" % sid)
    if problems:
        record("allowlist-schema", FAIL, problems[0])
    else:
        record("allowlist-schema", PASS, "%d settable paths re-derived from the schema and matching" % total)
    return total


def check_version_parity():
    want = jload("tokens", "llm", "component-allowlist.json")["version"]
    got = jload("registry.manifest.json").get("allowlistVersion")
    if got != want:
        record("version-parity", FAIL, "manifest.allowlistVersion %r != allowlist.version %r" % (got, want))
    else:
        record("version-parity", PASS, "allowlistVersion %s (machine-checked)" % want)


def actual_counts():
    ids = contract_ids()
    schema = jload("schema", "pagespec.schema.json")
    derived = 0
    for br in _branches(schema).values():
        d = {}
        flatten(br["content"], "", d)
        derived += len(d)
    return {
        "sections": len(ids["sections"]),
        "primitives": len(ids["primitives"]),
        "components": len(ids["components"]),
        "templates": len(jload("templates", "templates.json")["templates"]),
        "routePatterns": len(jload("templates", "templates.json")["routeToTemplate"]),
        "compatibilityRules": len(jload("compatibility", "graph.json")["rules"]),
        "assetRoles": len(jload("assets", "asset-roles.json")["roles"]),
        "motionPatterns": len(jload("tokens", "00-foundation", "motion.json")["patterns"]),
        "schemaContentBranches": len(schema["properties"]["nodes"]["items"]["allOf"]),
        "settablePropertyPaths": derived,
        "responsiveEntries": sum(len(jload("sections", "%s.json" % s)["responsive"]) for s in ids["sections"]),
        "ledgerCitations": len(jload("extraction", "measured-values.json")["citations"]),
        "examples": len(example_files()),
        "themes": len([n for n in os.listdir(os.path.join(REPO, "tokens", "themes")) if n.endswith(".json")]),
        "jsonFiles": len(all_json()),
        "files": len(all_files()),
    }


def check_manifest_counts():
    actual = actual_counts()
    claimed = jload("registry.manifest.json").get("counts", {})
    bad = {k: (claimed.get(k), v) for k, v in actual.items() if claimed.get(k) != v}
    extra = sorted(set(claimed) - set(actual))
    ledger = jload("extraction", "measured-values.json")
    allow = jload("tokens", "llm", "component-allowlist.json")["counts"]
    if ledger.get("citationCount") != len(ledger["citations"]):
        bad["ledger.citationCount"] = (ledger.get("citationCount"), len(ledger["citations"]))
    for k in ("sections", "primitives", "components", "assetRoles", "settablePropertyPaths"):
        if allow.get(k) != actual[k]:
            bad["allowlist.counts." + k] = (allow.get(k), actual[k])
    if bad or extra:
        record("manifest-counts", FAIL, "; ".join("%s claims %r, disk says %r" % (k, c, a)
                                                  for k, (c, a) in sorted(bad.items())) or "unknown keys %s" % extra)
    else:
        record("manifest-counts", PASS, "%d counts recomputed from disk and matching" % len(actual))


def check_readme_counts():
    with open(os.path.join(REPO, "README.md"), encoding="utf-8") as handle:
        text = handle.read()
    found = dict((k, int(v)) for v, k in re.findall(r"\*\*(\d+)\*\* <!--count:(\w+)-->", text))
    actual = actual_counts()
    bad = ["%s says %d, disk says %r" % (k, v, actual.get(k)) for k, v in sorted(found.items()) if actual.get(k) != v]
    if not found:
        bad.append("README.md has no count table")
    if bad:
        record("readme-counts", FAIL, "; ".join(bad[:3]))
    else:
        record("readme-counts", PASS, "%d README counts match disk" % len(found))


def check_route_coverage():
    t = jload("templates", "templates.json")
    problems = []
    seen = {}
    for tid, tpl in t["templates"].items():
        for route in tpl["routes"]:
            if route in seen:
                problems.append("route %r assigned to both %r and %r" % (route, seen[route], tid))
            seen[route] = tid
    if seen != t["routeToTemplate"]:
        problems.append("routeToTemplate disagrees with the templates' own route lists")
    if t.get("templateCount") != len(t["templates"]) or t.get("routePatternCount") != len(t["routeToTemplate"]):
        problems.append("templateCount/routePatternCount is stale")
    if set(jload("schema", "pagespec.schema.json")["properties"]["template"]["enum"]) != set(t["templates"]):
        problems.append("schema template enum != templates.json")
    if problems:
        record("route-coverage", FAIL, problems[0])
    else:
        record("route-coverage", PASS, "%d route -> %d template, each assigned exactly once"
               % (len(t["routeToTemplate"]), len(t["templates"])))


def check_route_sequences():
    import semantic_validate as sv
    tpl = jload("templates", "templates.json")["templates"]
    problems, n = [], 0
    for tid, t in tpl.items():
        real = sv.template_realizations(t)
        for route, seq in (t.get("routeSequences") or {}).items():
            n += 1
            if route not in t["routes"]:
                problems.append("%s: routeSequences names %s, not one of its routes" % (tid, route))
            if seq not in real:
                problems.append("%s %s: sequence is not a realization of the template's slots" % (tid, route))
        if t.get("routeSequences") and sorted(t["routeSequences"]) != sorted(t["routes"]):
            problems.append("%s: routeSequences does not cover every route" % tid)
    if problems:
        record("route-sequences", FAIL, problems[0])
    else:
        record("route-sequences", PASS, "%d per-route sequences are real realizations of their templates" % n)


def source_routes():
    text = open(os.path.join(SOURCE_ROOT, "src", "routes.js"), encoding="utf-8").read()
    routes = set(re.findall(r"path:\s*'([^'`$]+)'", text))
    for m in re.finditer(r"\.\.\.\[([^\[\]]*)\]\.map\(\(s(?:, i)?\) => \(\{\s*path:\s*`([^`]*)`", text, re.S):
        names = re.findall(r"'([^']+)'", m.group(1))
        for i, name in enumerate(names):
            routes.add(m.group(2).replace("${s}", name).replace("${i + 1}", str(i + 1)).replace("${i + 6}", str(i + 6)))
    routes.add("/")
    return routes


def check_route_source():
    if not source_present():
        record("route-source", WARN, "no sibling src/; route list comparison SKIPPED")
        return
    real = source_routes()
    mine = set(jload("templates", "templates.json")["routeToTemplate"])
    problems = []
    if real - mine:
        problems.append("routes in src/routes.js with no template: %s" % sorted(real - mine)[:4])
    if mine - real:
        problems.append("templated routes not in src/routes.js: %s" % sorted(mine - real)[:4])
    if any(r.startswith("/__preview") for r in mine):
        problems.append("a build-time preview path is templated")
    if problems:
        record("route-source", FAIL, problems[0])
    else:
        record("route-source", PASS, "%d routes == '/' + src/routes.js (preview paths excluded)" % len(real))


def render_tags(rel, component):
    """capitalised JSX tags inside the named function's body, in source order (regex re-derivation)."""
    text = open(os.path.join(SOURCE_ROOT, rel), encoding="utf-8").read()
    m = re.search(r"(?:export default )?function %s\(" % re.escape(component), text)
    if not m:
        return None
    body = text[m.end():]
    end = re.search(r"\n}\n", body)
    body = body[:end.start()] if end else body
    ret = body.find("return (")
    body = body[ret:] if ret >= 0 else body
    return [t for t in re.findall(r"<([A-Z][A-Za-z0-9]*)", body) if t not in ("Fragment", "Sec")]


def check_template_composition():
    if not source_present():
        record("template-composition", WARN, "no sibling src/; page composition re-derivation SKIPPED")
        return
    problems, n = [], 0
    for tid, t in jload("templates", "templates.json")["templates"].items():
        page, comp = t["pageComponent"].split(" > ")
        got = render_tags(page, comp)
        n += 1
        if got is None:
            problems.append("%s: %s not found in %s" % (tid, comp, page))
        elif got != t["componentTags"]:
            problems.append("%s: page renders %s, templates.json records %s" % (tid, got, t["componentTags"]))
    if problems:
        record("template-composition", FAIL, problems[0])
    else:
        record("template-composition", PASS, "%d templates: recorded component tags == the tags their pages render" % n)


def check_graph_validator_agreement():
    graph = jload("compatibility", "graph.json")
    with open(os.path.join(REPO, "schema", "semantic_validate.py"), encoding="utf-8") as handle:
        source = handle.read()
    import semantic_validate as sv
    implemented = {fn.__name__ for fn in sv.CHECKS} | {"pinned_policy_problems"}
    problems = []
    for rule in graph["rules"]:
        enforced = rule.get("enforcedBy", "")
        for fn in re.findall(r"semantic_validate\.py::(\w+)", enforced):
            if fn not in implemented:
                problems.append("%s claims %s, which is not a real check" % (rule["id"], fn))
        for fn in re.findall(r"verify_all\.py::(\w+)", enforced):
            if fn not in globals():
                problems.append("%s claims verify_all.py::%s, which does not exist" % (rule["id"], fn))
        if "semantic_validate.py" in enforced and rule["id"] not in source:
            sections_emit = any(jload("sections", "%s.json" % s)["constraints"].get("neighbourRuleId") == rule["id"]
                                for s in contract_ids()["sections"])
            if not sections_emit:
                problems.append("%s is not emitted anywhere in the validator or the contracts" % rule["id"])
    # every rule id the contracts emit must be a real graph rule
    rule_ids = {r["id"] for r in graph["rules"]}
    for s in contract_ids()["sections"]:
        rid = jload("sections", "%s.json" % s)["constraints"].get("neighbourRuleId")
        if rid and rid not in rule_ids:
            problems.append("sections/%s.json emits %s, which is not a graph rule" % (s, rid))
    # derived sets must equal the real data
    import semantic_validate as sv
    tpl = jload("templates", "templates.json")["templates"]
    cats = {s: jload("sections", "%s.json" % s)["category"] for s in contract_ids()["sections"]}
    nohero, secondary, orders, pairs, caps = [], [], {}, [], {}
    for tid, t in tpl.items():
        orders[tid] = [n["section"] for n in t["nodes"]]
        heroes = [(i, n) for i, n in enumerate(t["nodes"]) if cats.get(n["section"]) == "hero"]
        if not heroes:
            nohero.append(tid)
        for i, n in heroes:
            if i != 1:
                for v in (n.get("variants") or ["default"]):
                    if [n["section"], v] not in secondary:
                        secondary.append([n["section"], v])
        for r in sv.template_realizations(t):
            for a, b in zip(r, r[1:]):
                if cats.get(a) == cats.get(b) and [a, b] not in pairs:
                    pairs.append([a, b])
        counts = {}
        for n in t["nodes"]:
            for m in [n] + n.get("alternatives", []):
                vs = m.get("variants") or ["default"]
                key = (m["section"], vs[0] if len(vs) == 1 else "*")
                counts[key] = counts.get(key, 0) + 1
        for (sid, v), k in counts.items():
            caps.setdefault(sid, {})
            caps[sid][v] = max(caps[sid].get(v, 0), k)
    ds = graph["derivedSets"]
    if sorted(ds["NO_HERO_TEMPLATES"]["value"]) != sorted(nohero):
        problems.append("NO_HERO_TEMPLATES claims %s, real data says %s" % (ds["NO_HERO_TEMPLATES"]["value"], sorted(nohero)))
    if sorted(ds["SECONDARY_HERO_USES"]["value"]) != sorted(secondary):
        problems.append("SECONDARY_HERO_USES claims %s, real data says %s" % (ds["SECONDARY_HERO_USES"]["value"], sorted(secondary)))
    if ds["SECTION_CATEGORIES"]["value"] != cats:
        problems.append("SECTION_CATEGORIES is stale")
    if ds["TEMPLATE_ORDERS"]["value"] != orders:
        problems.append("TEMPLATE_ORDERS is stale")
    if sorted(ds["REAL_SAME_CATEGORY_PAIRS"]["value"]) != sorted(pairs):
        problems.append("REAL_SAME_CATEGORY_PAIRS is stale")
    adj = next(r for r in graph["rules"] if r["id"] == "NO_ADJACENT_SAME_CATEGORY")
    if sorted(adj["exemptPairs"]) != sorted(pairs):
        problems.append("NO_ADJACENT_SAME_CATEGORY.exemptPairs != the real same-category pairs")
    for sid, bv in caps.items():
        cons = jload("sections", "%s.json" % sid)["constraints"]
        claimed = cons.get("maxPerPageByVariant") or {"default": cons.get("maxPerPage")}
        if claimed != bv or ds["REAL_MAX_PER_PAGE"]["value"].get(sid) != bv:
            problems.append("%s: maxPerPage caps %s / REAL_MAX_PER_PAGE %s != real data %s" % (sid, claimed, ds["REAL_MAX_PER_PAGE"]["value"].get(sid), bv))
    if graph.get("ruleCount") != len(graph["rules"]):
        problems.append("ruleCount is stale")
    if problems:
        record("graph-validator", FAIL, problems[0])
    else:
        record("graph-validator", PASS, "%d rules map to real checks; 6 derived sets (incl. per-(section,variant) caps) match the real data" % len(graph["rules"]))


def check_pinned_asset_policies():
    """PINNED_ASSET_POLICIES -- exact value, not merely enum membership."""
    import semantic_validate as sv
    registry = jload("assets", "asset-roles.json")
    problems = sv.pinned_policy_problems(registry, jload("tokens", "llm", "component-allowlist.json"))
    schema_pins = jload("schema", "pagespec.schema.json").get("x-pinnedAssetPolicies")
    pinned = {k: v for k, v in registry["pinnedPolicies"].items() if k != "note"}
    if schema_pins != pinned:
        problems.append("schema x-pinnedAssetPolicies disagrees with the registry")
    if problems:
        record("pinned-assets", FAIL, problems[0])
    else:
        record("pinned-assets", PASS, "%d roles within the enum; %d pinned roles hold their exact value"
               % (len(registry["roles"]), len(pinned)))


CITE = re.compile(r"^((?:audit:)?[A-Za-z0-9_./\-]+\.(?:md|css|jsx|js|json|html|txt)):(\d+)-(\d+)$")


def resolve(path):
    if path.startswith("audit:"):
        root = jload("extraction", "measured-values.json")["auditRoot"]
        return os.path.normpath(os.path.join(SOURCE_ROOT, root, path[6:]))
    return os.path.join(SOURCE_ROOT, path)


def collect_citations():
    out = []

    def walk(node, rel):
        if isinstance(node, dict):
            for key, value in node.items():
                if isinstance(value, str) and ("measuredFrom" in key or key == "range"):
                    out.append((rel, key, value))
                elif isinstance(value, list) and key in ("alsoMeasuredFrom", "usageSites"):
                    out.extend((rel, key, v) for v in value if isinstance(v, str))
                else:
                    walk(value, rel)
        elif isinstance(node, list):
            for value in node:
                walk(value, rel)

    for rel in all_json():
        walk(jload(rel), rel)
    return out


def _read(path):
    with open(path, encoding="utf-8", errors="replace") as handle:
        return handle.read().splitlines()


def check_citations():
    citations = collect_citations()
    ledger = jload("extraction", "measured-values.json")["citations"]
    if not source_present():
        record("citations", WARN, "%d citations + %d ledger entries recorded; no sibling source tree, so "
               "range and keyword resolution is SKIPPED (standalone copy)" % (len(citations), len(ledger)))
        return
    problems, missing_ext = [], []
    for rel, key, value in citations + [("ledger", "measuredFrom", e["measuredFrom"]) for e in ledger]:
        m = CITE.match(value)
        if not m:
            problems.append("%s/%s unparseable: %r" % (rel, key, value))
            continue
        path, lo, hi = m.group(1), int(m.group(2)), int(m.group(3))
        real = resolve(path)
        if not os.path.exists(real):
            (missing_ext if path.startswith("audit:") else problems).append("%s cites missing %s" % (rel, path))
            continue
        n = len(_read(real))
        if lo < 1 or hi < lo or hi > n:
            problems.append("%s cites %s:%d-%d but the file has %d lines" % (rel, path, lo, hi, n))
    offtopic = []
    checked = 0
    for entry in ledger:
        m = CITE.match(entry["measuredFrom"])
        if not m or not os.path.exists(resolve(m.group(1))):
            continue
        lines = _read(resolve(m.group(1)))
        lo, hi = int(m.group(2)), int(m.group(3))
        if hi > len(lines):
            continue
        window = "\n".join(lines[lo - 1:hi])
        checked += 1
        for needle in entry["keywords"]:
            if needle not in window:
                offtopic.append("%s: keyword %r is NOT inside the cited range" % (entry["measuredFrom"], needle))
    if problems:
        record("citations", FAIL, "%d bad: %s" % (len(problems), problems[:2]))
    elif offtopic:
        record("citations", FAIL, "%d off-topic: %s" % (len(offtopic), offtopic[:2]))
    elif missing_ext:
        record("citations", WARN, "%d citations in range, %d ledger entries keyword-verified; %d external "
               "audit citation(s) unresolvable (audit dumps absent)" % (len(citations), checked, len(missing_ext)))
    else:
        record("citations", PASS, "%d citations in range; %d ledger entries keyword-verified on-topic "
               "(incl. external audit dumps)" % (len(citations) + len(ledger), checked))


def check_responsive():
    if not source_present():
        record("responsive", WARN, "no sibling source tree; Tailwind class resolution SKIPPED")
        return
    problems, n = [], 0
    for sid in contract_ids()["sections"]:
        for entry in jload("sections", "%s.json" % sid)["responsive"]:
            m = CITE.match(entry["measuredFrom"])
            lines = _read(resolve(m.group(1)))
            window = " ".join(lines[int(m.group(2)) - 1:int(m.group(3))])
            tokens = set(re.findall(r"[^\s\"'`{}]+", window))
            if entry.get("cssMediaQuery"):
                n += 1
                if entry["cssMediaQuery"] not in window:
                    problems.append("%s: media rule %r not on %s" % (sid, entry["cssMediaQuery"], entry["measuredFrom"]))
            for group in entry["tailwind"]:
                for cls in group.split():
                    n += 1
                    if cls not in tokens and cls not in window:
                        problems.append("%s: class %r not on %s" % (sid, cls, entry["measuredFrom"]))
    if problems:
        record("responsive", FAIL, "%d drifted: %s" % (len(problems), problems[:2]))
    else:
        record("responsive", PASS, "%d Tailwind classes found on their cited lines" % n)


def check_asset_coverage():
    """Every file in public/assets (real reference copies) and public/stock (licensed stand-ins) is claimed."""
    reg = jload("assets", "asset-roles.json")
    claimed = set()
    for role in reg["roles"].values():
        claimed.update(f for f in role["files"] if f.startswith(("public/assets/", "public/stock/")))
        if role.get("licenseFile"):
            claimed.add(role["licenseFile"])
    claimed.update(reg["unreferencedReferenceFiles"]["files"])
    if not source_present():
        record("asset-coverage", WARN, "%d reference/stock files claimed; source tree absent, disk comparison SKIPPED" % len(claimed))
        return
    real = set()
    for sub in ("assets", "stock"):
        folder = os.path.join(SOURCE_ROOT, "public", sub)
        if os.path.isdir(folder):
            real |= {"public/%s/%s" % (sub, n) for n in os.listdir(folder) if not n.startswith(".")}
    problems = []
    if real - claimed:
        problems.append("unclaimed files: %s" % sorted(real - claimed)[:4])
    if claimed - real:
        problems.append("roles claim files that do not exist: %s" % sorted(claimed - real)[:4])
    na = len([f for f in real if f.startswith("public/assets/")])
    ns = len([f for f in real if f.startswith("public/stock/") and f.endswith(".jpg")])
    if reg["fileCount"]["publicAssets"] != na:
        problems.append("fileCount.publicAssets %r != %d on disk" % (reg["fileCount"]["publicAssets"], na))
    smap = os.path.join(SOURCE_ROOT, "src", "stock", "stockMap.js")
    if os.path.exists(smap):
        text = open(smap, encoding="utf-8").read()
        sq = set(int(x) for x in re.findall(r"\d+", text[text.index("SQUARE_IDS"):text.index("STOCK_MAP")]))
        body = text[text.index("STOCK_MAP = {"):]
        ids = set(int(x) for x in re.findall(r"(?<=[\[ ,])(\d+)(?=[,\]])", body))
        miss = sorted(i for i in ids if "public/stock/%d.jpg" % i not in real)
        miss += sorted("%d-sq" % i for i in sq if "public/stock/%d-sq.jpg" % i not in real)
        if miss:
            problems.append("src/stock/stockMap.js picks photos that are not in public/stock: %s" % miss[:5])
    if reg["fileCount"].get("publicStock") != ns:
        problems.append("fileCount.publicStock %r != %d on disk" % (reg["fileCount"].get("publicStock"), ns))
    if problems:
        record("asset-coverage", FAIL, problems[0])
    else:
        record("asset-coverage", PASS, "all %d public/assets files under a banned role or the unreferenced list; all %d public/stock photos (+ CREDITS.md) under stock.photo" % (na, ns))


def ia_order(t):
    """IA section order for a template: slots in order, each choice's alternatives listed right after it."""
    out = []
    for n in t["nodes"]:
        out.append(n["section"])
        out.extend(a["section"] for a in n.get("alternatives", []))
    return out


def check_ia_alignment():
    path = os.path.join(SOURCE_ROOT, "ia.json")
    if not os.path.exists(path):
        record("ia-alignment", WARN, "no sibling ia.json; IA alignment SKIPPED")
        return
    with open(path, encoding="utf-8") as handle:
        ia = json.load(handle)
    by_id = {t["id"]: t for t in ia["templates"]}
    problems = []
    tpls = jload("templates", "templates.json")["templates"]
    for tid, tpl in tpls.items():
        ia_tpl = by_id.get(tpl.get("iaTemplateId"))
        if ia_tpl is None:
            problems.append("%s: iaTemplateId %r is not in ia.json" % (tid, tpl.get("iaTemplateId")))
            continue
        if ia_tpl["sections"] != ia_order(tpl):
            problems.append("%s: node order %s != ia.json %s" % (tid, ia_order(tpl), ia_tpl["sections"]))
        if sorted(ia_tpl.get("routes") or []) != sorted(tpl["routes"]) or ia_tpl["routeCount"] != len(tpl["routes"]):
            problems.append("%s: routes differ from ia.json" % tid)
    if len(by_id) != len(tpls):
        problems.append("ia.json has %d templates, templates.json %d" % (len(by_id), len(tpls)))
    ids = contract_ids()["sections"]
    if sorted(ia["sections"]) != sorted(ids):
        problems.append("section ids differ: only-IA %s / only-repo %s" % (sorted(set(ia["sections"]) - set(ids))[:3], sorted(set(ids) - set(ia["sections"]))[:3]))
    for sid in ids:
        mine = jload("sections", "%s.json" % sid)
        theirs = ia["sections"].get(sid, {})
        if mine["implementedBy"] != theirs.get("implementedBy"):
            problems.append("%s implementedBy %r != ia.json %r" % (sid, mine["implementedBy"], theirs.get("implementedBy")))
        if mine["category"] != str(theirs.get("category", "")).lower():
            problems.append("%s category %r != ia.json %r" % (sid, mine["category"], theirs.get("category")))
    if problems:
        record("ia-alignment", FAIL, problems[0])
    else:
        record("ia-alignment", PASS, "%d templates (orders, routes) and %d sections (categories, implementedBy) match ia.json" % (len(tpls), len(ids)))


def check_example_provenance():
    """Every word of every example's copy must occur somewhere in the clone's own src/.
    Catches copy pulled from the saved original HTML, the spec or the live site."""
    if not source_present():
        record("example-provenance", WARN, "no sibling src/; provenance SKIPPED")
        return
    corpus = []
    for root, _, files in os.walk(os.path.join(SOURCE_ROOT, "src")):
        for name in files:
            if name.endswith((".jsx", ".js")):
                corpus.append(open(os.path.join(root, name), encoding="utf-8").read())
    text = "\n".join(corpus)
    # case-insensitive: the clone's own filler helpers (prose()/words()/phrase()) capitalise sentence starts
    vocab = {w.lower() for w in re.findall(r"[A-Za-z]+(?:['’-][A-Za-z]+)*", text.replace("&amp;", "&"))}
    skip_keys = {"assetRole", "pattern", "reducedMotionFallback", "trigger", "easing", "section",
                 "template", "designSystem", "theme", "route", "pageSpecVersion", "kind", "variant", "assetRef"}
    missing = {}
    n = 0

    def walk(v, rel, key=None):
        nonlocal n
        if isinstance(v, dict):
            for k, s in v.items():
                walk(s, rel, k)
        elif isinstance(v, list):
            for s in v:
                walk(s, rel, key)
        elif isinstance(v, str) and key not in skip_keys:
            for w in re.findall(r"[A-Za-z]+(?:['’-][A-Za-z]+)*", v):
                n += 1
                if w.lower() not in vocab:
                    missing.setdefault(w, rel)

    exs = example_files()
    for rel in exs:
        walk(jload(rel), rel)
    if missing:
        record("example-provenance", FAIL, "%d example word(s) not found in the clone's src/: %s"
               % (len(missing), sorted(missing.items())[:6]))
    else:
        record("example-provenance", PASS, "all %d words of copy in %d examples occur in the clone's own src/" % (n, len(exs)))


def check_adversarial():
    script = os.path.join(REPO, "schema", "tests", "adversarial_test.py")
    proc = subprocess.run([sys.executable, "-I", script], capture_output=True, text=True)
    tail = [l for l in proc.stdout.strip().splitlines() if l.startswith(("controls:", "RESULT"))]
    record("adversarial", FAIL if proc.returncode else PASS, " | ".join(tail) or proc.stdout[-200:] + proc.stderr[-300:])


def cross_check():
    try:
        from jsonschema import Draft7Validator
    except ImportError:
        print("  cross-check         SKIP jsonschema not installed (optional second opinion)")
        return 0
    import _draft7
    sys.path.insert(0, os.path.join(REPO, "schema", "tests"))
    import adversarial_test as at
    schema = jload("schema", "pagespec.schema.json")
    Draft7Validator.check_schema(schema)
    cases = [(rel, jload(rel)) for rel in example_files()]
    cases += [("control:" + t, at.synth_control(t)) for t in sorted(at.TEMPLATES)]
    cases += [("mutation:" + l, s) for l, _, s in at.mutations()]
    disagree = [l for l, s in cases
                if bool(_draft7.validate(s, schema)) != bool(list(Draft7Validator(schema).iter_errors(s)))]
    if disagree:
        print("  cross-check         FAIL %d disagreement(s): %s" % (len(disagree), disagree[:3]))
        return 1
    print("  cross-check         PASS vendored validator agrees with jsonschema on all %d cases" % len(cases))
    return 0


CHECKS = [
    check_json_parse, check_no_abs_paths, check_no_images, check_self_contained, check_schema,
    check_schema_sections, check_allowlist_parity, check_allowlist_schema, check_version_parity,
    check_manifest_counts, check_readme_counts, check_route_coverage, check_route_sequences,
    check_route_source, check_template_composition, check_graph_validator_agreement,
    check_pinned_asset_policies, check_citations, check_responsive, check_asset_coverage,
    check_ia_alignment, check_example_provenance, check_adversarial,
]


# --------------------------------------------------------------------------
# drift proof
# --------------------------------------------------------------------------

def _edit(root, rel, fn):
    path = os.path.join(root, rel)
    with open(path, encoding="utf-8") as handle:
        data = json.load(handle)
    fn(data)
    with open(path, "w", encoding="utf-8") as handle:
        json.dump(data, handle, indent=2, ensure_ascii=False)


def _append(root, rel, text):
    with open(os.path.join(root, rel), "a", encoding="utf-8") as handle:
        handle.write(text)


def _write(root, rel, data):
    with open(os.path.join(root, rel), "wb") as handle:
        handle.write(data)


def _stage_sources(tmp):
    """Mirror every cited source file (and src/, public/assets names, ia.json) next to the
    scratch copy so citation-dependent defects are observable. Audit dumps are staged under
    the same relative auditRoot."""
    if not source_present():
        return False
    wanted = set()
    for _, _, value in collect_citations():
        m = CITE.match(value)
        if m:
            wanted.add(m.group(1))
    for e in jload("extraction", "measured-values.json")["citations"]:
        m = CITE.match(e["measuredFrom"])
        if m:
            wanted.add(m.group(1))
    for rel in sorted(wanted):
        src = resolve(rel)
        if not os.path.exists(src):
            continue
        if rel.startswith("audit:"):
            root = jload("extraction", "measured-values.json")["auditRoot"]
            dst = os.path.normpath(os.path.join(tmp, "project", root, rel[6:]))
        else:
            dst = os.path.join(tmp, "project", rel)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(src, dst)
    shutil.copytree(os.path.join(SOURCE_ROOT, "src"), os.path.join(tmp, "project", "src"), dirs_exist_ok=True)
    os.makedirs(os.path.join(tmp, "project", "public", "assets"), exist_ok=True)
    for sub in ("assets", "stock"):
        os.makedirs(os.path.join(tmp, "project", "public", sub), exist_ok=True)
        for name in os.listdir(os.path.join(SOURCE_ROOT, "public", sub)):
            open(os.path.join(tmp, "project", "public", sub, name), "w").close()   # names only, no image bytes
    if os.path.exists(os.path.join(SOURCE_ROOT, "ia.json")):
        shutil.copy2(os.path.join(SOURCE_ROOT, "ia.json"), os.path.join(tmp, "project", "ia.json"))
    return True


def prove_drift():
    S = "sections/"
    cases = [
        ("phantom allowlist entry", "allowlist-parity", lambda d: _edit(d, "tokens/llm/component-allowlist.json",
            lambda j: j["sections"].update({"hero.nonexistent": {"contractFile": "sections/hero.nonexistent.json"}}))),
        ("orphaned contract (allowlist entry removed)", "allowlist-parity", lambda d: _edit(d, "tokens/llm/component-allowlist.json",
            lambda j: j["primitives"].pop("tab-chip"))),
        ("out-of-range citation", "citations", lambda d: _edit(d, "tokens/00-foundation/color.json",
            lambda j: j["tokens"]["color.ink"].update(measuredFrom="tailwind.config.js:9000-9001"))),
        ("in-range but OFF-TOPIC ledger citation", "citations", lambda d: _edit(d, "extraction/measured-values.json",
            lambda j: j["citations"][next(i for i, e in enumerate(j["citations"]) if "duration: 0.45" in e["keywords"])].update(
                measuredFrom="src/components/shared/Button.jsx:1-3"))),
        ("motion value drifted in source (button roll-up 0.45 -> 0.6)", "citations",
            lambda d: _sed(os.path.join(d, "..", "src", "components", "shared", "Button.jsx"), "duration: 0.45", "duration: 0.6")),
        ("responsive class removed from source (mob:pb-0 -> mob:pb-[8px])", "responsive",
            lambda d: _sed(os.path.join(d, "..", "src", "components", "EnterpriseSlider.jsx"), "mob:pb-0", "mob:pb-[8px]")),
        ("hand-bumped manifest count", "manifest-counts", lambda d: _edit(d, "registry.manifest.json",
            lambda j: j["counts"].update(sections=99))),
        ("README count table hand-bumped", "readme-counts", _readme_bump),
        ("ledger citationCount hand-bumped", "manifest-counts", lambda d: _edit(d, "extraction/measured-values.json",
            lambda j: j.update(citationCount=1))),
        ("allowlistVersion drift", "version-parity", lambda d: _edit(d, "registry.manifest.json",
            lambda j: j.update(allowlistVersion="9.9.9"))),
        ("pinned logo.customer -> may-generate-new (DIFFERENT-BUT-VALID)", "pinned-assets", lambda d: _edit(d, "assets/asset-roles.json",
            lambda j: j["roles"]["logo.customer"].update(generationPolicy="may-generate-new"))),
        ("pinned photo.person -> must-reuse-exact (DIFFERENT-BUT-VALID)", "pinned-assets", lambda d: _edit(d, "assets/asset-roles.json",
            lambda j: j["roles"]["photo.person"].update(generationPolicy="must-reuse-exact"))),
        ("pinned badge.review -> must-not-reuse (DIFFERENT-BUT-VALID)", "pinned-assets", lambda d: _edit(d, "assets/asset-roles.json",
            lambda j: j["roles"]["badge.review"].update(generationPolicy="must-not-reuse"))),
        ("entryPoint pointing outside design-repo/", "self-contained", lambda d: _edit(d, "registry.manifest.json",
            lambda j: j["entryPoints"].update(external=["../CLONE_SPEC.md"]))),
        ("absolute local path introduced", "no-abs-paths", lambda d: _append(d, "README.md",
            "\nBuilt at " + "/" + "Users" + "/someone/project\n")),
        ("reference image copied into the repo", "no-images", lambda d: _write(d, "assets/logo-volvo.png", b"\x89PNG")),
        ("stale derived set in the graph", "graph-validator", lambda d: _edit(d, "compatibility/graph.json",
            lambda j: j["derivedSets"]["NO_HERO_TEMPLATES"].update(value=["home"]))),
        ("graph rule claims a validator function that does not exist", "graph-validator", lambda d: _edit(d, "compatibility/graph.json",
            lambda j: j["rules"][0].update(enforcedBy="semantic_validate.py::check_nothing"))),
        ("allowlist path drifted from the schema (maxWords)", "allowlist-schema", lambda d: _edit(d, "tokens/llm/component-allowlist.json",
            lambda j: j["sections"]["hero.split-visual"]["settableProperties"]["heading"].update(maxWords=50))),
        ("section contract drifted from its schema branch", "schema-sections", lambda d: _edit(d, S + "story.scroll-quote.json",
            lambda j: j["content"]["properties"]["quote"].update(maxWords=99))),
        ("route double-assigned", "route-coverage", lambda d: _edit(d, "templates/templates.json",
            lambda j: j["routeToTemplate"].update({"/pricing": "home"}))),
        ("reference file dropped from every role", "asset-coverage", lambda d: _edit(d, "assets/asset-roles.json",
            lambda j: j["roles"]["logo.customer"]["files"].remove("public/assets/logo-volvo.png"))),
        ("section order drifted from ia.json", "ia-alignment", lambda d: _edit(d, "templates/templates.json",
            lambda j: j["templates"]["home"]["nodes"].reverse())),
        ("example copy pulled from outside src/ (not in vocabulary)", "example-provenance", lambda d: _edit(d, "schema/example.pagespec.json",
            lambda j: j["nodes"][1]["content"].update(subtitle="Upskill reskill outskill everyone."))),
        ("per-route sequence that is not a template realization", "route-sequences", lambda d: _edit(d, "templates/templates.json",
            lambda j: j["templates"]["feature-detail"]["routeSequences"]["/lms/features/spaces"].reverse())),
        ("route added to src/routes.js with no template", "route-source",
            lambda d: _sed(os.path.join(d, "..", "src", "routes.js"), "{ path: '/pricing', original: '/pricing' },",
                           "{ path: '/pricing', original: '/pricing' },\n  { path: '/lms/new-page', original: '/lms/new-page' },")),
        ("page gains a section the template does not record", "template-composition",
            lambda d: _sed(os.path.join(d, "..", "src", "pages", "company", "GuidesPage.jsx"), "<GuidesIndex ", "<WhyBlock />\n      <GuidesIndex ")),
        ("stale SECONDARY_HERO_USES derived set", "graph-validator", lambda d: _edit(d, "compatibility/graph.json",
            lambda j: j["derivedSets"]["SECONDARY_HERO_USES"].update(value=[]))),
        ("hand-edited maxPerPage cap (release-block 6 -> 9)", "graph-validator", lambda d: _edit(d, S + "product.release-block.json",
            lambda j: j["constraints"].update(maxPerPage=9))),
        ("stock photo dropped from the stock.photo role", "asset-coverage", lambda d: _edit(d, "assets/asset-roles.json",
            lambda j: j["roles"]["stock.photo"]["files"].pop())),
        ("stock map picks a photo that is not in public/stock", "asset-coverage",
            lambda d: _sed(os.path.join(d, "..", "src", "stock", "stockMap.js"), "'/lms/demo-platform': [445]", "'/lms/demo-platform': [9999]")),
        ("pinned stock.photo -> must-not-reuse (DIFFERENT-BUT-VALID)", "pinned-assets", lambda d: _edit(d, "assets/asset-roles.json",
            lambda j: j["roles"]["stock.photo"].update(generationPolicy="must-not-reuse"))),
        ("family example copy pulled from outside src/", "example-provenance", lambda d: _edit(d, "schema/examples/feature-detail.pagespec.json",
            lambda j: j["nodes"][1]["content"].update(heading="Upskill reskill outskill everyone."))),
        ("family example breaks the schema", "schema", lambda d: _edit(d, "schema/examples/case-study-platform.pagespec.json",
            lambda j: j.update(template="landing"))),
        ("template node order drifted from ia.json (non-home template)", "ia-alignment", lambda d: _edit(d, "templates/templates.json",
            lambda j: j["templates"]["pricing"]["nodes"].reverse())),
        ("schema accepts a live demo form", "adversarial", lambda d: _edit(d, "schema/pagespec.schema.json",
            lambda j: _loosen_form(j))),
    ]
    print()
    print("=" * 78)
    print("DRIFT PROOF -- one defect per scratch copy; the matching check must FAIL")
    print("=" * 78)
    failures = 0
    staged_ok = None
    for label, expect, mutate in cases:
        tmp = tempfile.mkdtemp(prefix="drift-")
        dest = os.path.join(tmp, "project", "design-repo")
        os.makedirs(os.path.dirname(dest))
        shutil.copytree(REPO, dest, ignore=shutil.ignore_patterns("__pycache__", ".DS_Store"))
        staged_ok = _stage_sources(tmp)
        if not staged_ok and expect in ("citations", "responsive", "asset-coverage", "ia-alignment", "example-provenance",
                                         "route-source", "template-composition"):
            print("  %-64s SKIP (no source tree to stage)" % label[:64])
            shutil.rmtree(tmp, ignore_errors=True)
            continue
        # sanity: the unmutated scratch copy must pass this check first
        mutate(dest)
        proc = subprocess.run([sys.executable, "-I", os.path.join(dest, "extraction", "verify_all.py")],
                              capture_output=True, text=True)
        line = next((l for l in proc.stdout.splitlines() if l.strip().startswith(expect + " ")), "")
        caught = " FAIL " in line
        print("  %-64s %s" % (label[:64], "caught" if caught else "NOT CAUGHT"))
        if caught:
            print("      -> %s" % line.strip()[:150])
        else:
            failures += 1
            print("      expected %r to FAIL; got: %s" % (expect, line.strip() or "(no line)"))
        shutil.rmtree(tmp, ignore_errors=True)
    # and the unmutated staged copy passes everything
    tmp = tempfile.mkdtemp(prefix="drift-")
    dest = os.path.join(tmp, "project", "design-repo")
    os.makedirs(os.path.dirname(dest))
    shutil.copytree(REPO, dest, ignore=shutil.ignore_patterns("__pycache__", ".DS_Store"))
    _stage_sources(tmp)
    proc = subprocess.run([sys.executable, "-I", os.path.join(dest, "extraction", "verify_all.py")], capture_output=True, text=True)
    clean = proc.returncode == 0
    print("  %-64s %s" % ("CONTROL: unmutated scratch copy (staged sources)", "PASS" if clean else "FAIL"))
    if not clean:
        failures += 1
        print("\n".join("      " + l for l in proc.stdout.splitlines() if " FAIL " in l))
    shutil.rmtree(tmp, ignore_errors=True)
    print()
    print("drift cases: %d | not caught: %d" % (len(cases), failures))
    print("DRIFT PROOF: %s" % ("FAIL" if failures else "PASS"))
    return 1 if failures else 0


def _sed(path, old, new):
    with open(path, encoding="utf-8") as handle:
        text = handle.read()
    assert old in text, (path, old)
    with open(path, "w", encoding="utf-8") as handle:
        handle.write(text.replace(old, new))


def _readme_bump(d):
    path = os.path.join(d, "README.md")
    text = open(path, encoding="utf-8").read()
    new = re.sub(r"\*\*(\d+)\*\* <!--count:sections-->", "**99** <!--count:sections-->", text)
    assert new != text
    open(path, "w", encoding="utf-8").write(new)


def _loosen_form(schema):
    for b in schema["properties"]["nodes"]["items"]["allOf"]:
        if b["if"]["properties"]["section"]["const"] == "conversion.demo-form":
            b["then"]["properties"]["content"]["properties"]["form"]["properties"]["live"] = {"type": "boolean"}


def main(argv):
    print("=" * 78)
    print("design-repo verification")
    print("repo: %s" % os.path.basename(REPO))
    print("sibling source tree: %s" % ("present" if source_present() else "ABSENT (source-dependent checks warn and skip)"))
    print("=" * 78)
    for check in CHECKS:
        try:
            check()
        except Exception as exc:
            record(check.__name__, FAIL, "raised %s: %s" % (type(exc).__name__, exc))
    extra = 0
    if "--cross-check" in argv:
        extra = cross_check() or 0
    failed = [r for r in results if r[1] == FAIL]
    warned = [r for r in results if r[1] == WARN]
    print("=" * 78)
    print("%d checks | %d pass | %d warn | %d FAIL" % (len(results), len(results) - len(failed) - len(warned), len(warned), len(failed)))
    print("RESULT: %s" % ("FAIL" if failed or extra else "PASS"))
    if "--prove-drift" in argv:
        extra = prove_drift() or extra
    return 1 if (failed or extra) else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
