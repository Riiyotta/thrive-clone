#!/usr/bin/env python3
"""Adversarial suite for the Nimbus (thrive clone) PageSpec contract.

  CONTROLS -- the bundled example and a control SYNTHESISED generically from each
  real template's own node list (there is one: 'home') must produce ZERO errors.
  A validator that rejects everything is as broken as one that rejects nothing.

  MUTATIONS -- for every rule the repo claims to enforce, a deliberately broken
  instance that must be REJECTED (or, for warn-severity rules, FLAGGED).

  REGISTRY MUTATIONS -- the pinned asset policies are a claim about
  assets/asset-roles.json, not about a PageSpec, so they are proven at that
  layer: each real-third-party role is switched to a DIFFERENT-BUT-VALID enum
  member and the pinned-value check must catch it.

Run:  python3 adversarial_test.py
"""
import copy
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, "schema"))

import semantic_validate as sv  # noqa: E402

REG = sv.load_registry()
SECTIONS = REG["sections"]
TEMPLATES = REG["templates"]["templates"]
SEVERITY = {r["id"]: r["severity"] for r in REG["graph"]["rules"]}


# --------------------------------------------------------------------------
# generic control synthesis
# --------------------------------------------------------------------------

def synth(schema, key=None):
    if not isinstance(schema, dict):
        return None
    if "x-allowedRoles" in schema:
        roles = schema["x-allowedRoles"]
        role = "placeholder.neutral" if "placeholder.neutral" in roles else roles[0]
        out = {"assetRole": role}
        if "slotCount" in schema["properties"]:
            out["slotCount"] = schema["properties"]["slotCount"]["minimum"]
        return out
    if "const" in schema:
        return schema["const"]
    if "enum" in schema:
        return schema["enum"][0]
    if "oneOf" in schema:
        return synth(schema["oneOf"][0], key)
    kind = schema.get("type")
    if kind == "object":
        props = schema.get("properties", {})
        return {n: synth(props[n], n) for n in schema.get("required", []) if n in props}
    if kind == "array":
        lo = schema.get("minItems", 0)
        if key in ("linkPhrases", "boldPhrases"):
            return []
        return [synth(schema.get("items", {})) for _ in range(max(lo, 1))]
    if kind == "string":
        return "placeholder"
    if kind == "integer":
        return schema.get("minimum", 1)
    if kind == "boolean":
        return False
    return "placeholder"


def synth_motion(sid):
    m = SECTIONS[sid]["motion"]
    return {"pattern": m["allowedPatterns"][0], "reducedMotionFallback": m["reducedMotionFallback"]}


def synth_node(sid):
    return {"section": sid, "content": synth(SECTIONS[sid]["content"]), "motion": synth_motion(sid)}


def synth_control(tid):
    tpl = TEMPLATES[tid]
    nodes = [synth_node(slot["section"]) for slot in tpl["nodes"] if slot.get("required", True)]
    return {"pageSpecVersion": "1.0.0", "route": tpl["routes"][0], "template": tid,
            "designSystem": tpl["designSystem"], "theme": "nimbus-dark", "nodes": nodes}


def run(spec):
    schema_errors = sv.validate_schema(spec)
    errors, warnings = sv.validate_spec(spec, REG)
    return schema_errors, errors, warnings


def load_example():
    with open(os.path.join(REPO, "schema", "example.pagespec.json"), encoding="utf-8") as handle:
        return json.load(handle)


def idx(spec, sid):
    return next(i for i, n in enumerate(spec["nodes"]) if n["section"] == sid)


def node(spec, sid):
    return spec["nodes"][idx(spec, sid)]


def C(spec, sid):
    return node(spec, sid)["content"]


# --------------------------------------------------------------------------
# PageSpec mutations
# --------------------------------------------------------------------------

def mutations():
    out = []

    def add(label, expect, fn):
        spec = load_example()
        fn(spec)
        out.append((label, expect, spec))

    def move(spec, sid, to):
        n = spec["nodes"].pop(idx(spec, sid))
        spec["nodes"].insert(to, n)

    # ---- schema layer ----
    add("invented template value", "SCHEMA", lambda s: s.update(template="landing"))
    add("invented section type alias", "SCHEMA", lambda s: node(s, "hero.split-visual").update(section="hero.marketing"))
    add("missing required content field (hero heading)", "SCHEMA", lambda s: C(s, "hero.split-visual").pop("heading"))
    add("missing reducedMotionFallback", "SCHEMA", lambda s: node(s, "conversion.faq")["motion"].pop("reducedMotionFallback"))
    add("invented motion field smuggled in", "SCHEMA", lambda s: node(s, "conversion.faq")["motion"].update(inventedAnimation="parallax"))
    add("invented stagger field on motion", "SCHEMA", lambda s: node(s, "hero.split-visual")["motion"].update(staggerMs=80))
    add("unmeasured motion duration (750ms exists nowhere)", "SCHEMA", lambda s: node(s, "conversion.faq")["motion"].update(durationMs=750))
    add("unmeasured easing curve", "SCHEMA", lambda s: node(s, "conversion.faq")["motion"].update(easing="ease.bounce"))
    add("invented scroll fade-in pattern", "SCHEMA", lambda s: node(s, "proof.logo-row")["motion"].update(pattern="scroll.fadeIn"))
    add("extra top-level property", "SCHEMA", lambda s: s.update(customField="anything"))
    add("extra property inside a closed content object", "SCHEMA", lambda s: C(s, "hero.split-visual").update(backgroundVideo="x"))
    add("invented theme (light mode)", "SCHEMA", lambda s: s.update(theme="nimbus-light"))
    add("bare generic image string instead of an assetRole object", "SCHEMA",
        lambda s: C(s, "hero.split-visual").__setitem__("visual", "hero-visual.webp"))
    add("invented assetRole", "SCHEMA", lambda s: C(s, "hero.split-visual")["visual"].update(assetRole="photo.stock"))
    add("valid role not allowed on this field (person photo in logo row)", "SCHEMA",
        lambda s: C(s, "proof.logo-row")["logos"].update(assetRole="photo.person"))
    add("source-project asset path as assetRef", "SCHEMA",
        lambda s: C(s, "proof.logo-row")["logos"].update(assetRef="public/assets/logo-volvo.png"))
    add("external asset URL as assetRef", "SCHEMA",
        lambda s: C(s, "hero.split-visual")["visual"].update(assetRef="https://cdn.example.com/x.webp"))
    add("demo form made live", "SCHEMA", lambda s: C(s, "conversion.demo-form")["form"].update(live=True))
    add("demo form gaining an endpoint", "SCHEMA", lambda s: C(s, "conversion.demo-form")["form"].update(action="https://forms.example.com/submit"))
    add("video gaining an embed URL", "SCHEMA", lambda s: C(s, "story.brand-video")["video"].update(embedUrl="https://www.youtube.com/embed/x"))
    add("fifth results card (grid is exactly 4)", "SCHEMA",
        lambda s: C(s, "proof.results-stats")["cards"].append(copy.deepcopy(C(s, "proof.results-stats")["cards"][0])))
    add("brand wordmark (not exposed) smuggled into nav", "SCHEMA",
        lambda s: C(s, "shell.nav").update(wordmark={"assetRole": "brand.wordmark"}))
    add("per-instance token override field", "SCHEMA", lambda s: node(s, "hero.split-visual").update(tokens={"color.ink": "#fff"}))

    # ---- structural ----
    add("duplicate one-per-page section", "NO_DUPLICATE_SINGLETON",
        lambda s: s["nodes"].insert(idx(s, "conversion.faq"), copy.deepcopy(node(s, "conversion.faq"))))
    add("removed mandatory section (product tabs)", "TEMPLATE_NODE_SEQUENCE_MATCH",
        lambda s: s["nodes"].pop(idx(s, "product.feature-tabs")))
    add("reordered nodes (quote before statement)", "TEMPLATE_NODE_SEQUENCE_MATCH",
        lambda s: move(s, "story.scroll-quote", idx(s, "story.zoom-statement")))
    add("footer moved to the front", "NAV_FIRST", lambda s: move(s, "shell.footer", 0))
    add("nav moved to the end", "FOOTER_LAST", lambda s: move(s, "shell.nav", len(s["nodes"])))
    add("hero no longer directly after nav", "HERO_FOLLOWS_NAV",
        lambda s: move(s, "proof.logo-row", 1))
    add("testimonial detached from the stats", "TESTIMONIAL_FOLLOWS_STATS",
        lambda s: move(s, "proof.testimonial", idx(s, "proof.results-stats")))
    add("FAQ detached from the demo form", "FAQ_PRECEDES_DEMO_FORM",
        lambda s: move(s, "conversion.faq", idx(s, "story.brand-video")))
    add("demo form detached from the footer", "DEMO_FORM_PRECEDES_FOOTER",
        lambda s: move(s, "conversion.demo-form", idx(s, "conversion.faq")))
    add("second hero on one page", "ONE_HERO_PER_PAGE",
        lambda s: s["nodes"].insert(2, copy.deepcopy(node(s, "hero.split-visual"))))
    add("hero removed", "ONE_HERO_PER_PAGE", lambda s: s["nodes"].pop(idx(s, "hero.split-visual")))
    add("non-measured route (allowed but must be FLAGGED)", "TEMPLATE_ROUTE_MEASURED", lambda s: s.update(route="/pricing"))
    add("same-category adjacency FLAGGED (also out of sequence)", "NO_ADJACENT_SAME_CATEGORY",
        lambda s: move(s, "story.brand-video", idx(s, "story.scroll-quote") + 1))

    # ---- motion ----
    add("motion pattern valid elsewhere but not for this section", "SCHEMA",
        lambda s: node(s, "conversion.faq")["motion"].update(pattern="tabs.crossFade"))
    add("reducedMotionFallback disagreeing with the section contract", "SCHEMA",
        lambda s: node(s, "story.zoom-statement")["motion"].update(reducedMotionFallback="none"))
    add("duration measured elsewhere but not for this pattern", "MOTION_VALUES_MATCH_PATTERN",
        lambda s: node(s, "hero.split-visual")["motion"].update(durationMs=800))
    add("easing measured elsewhere but not for this pattern", "MOTION_VALUES_MATCH_PATTERN",
        lambda s: node(s, "conversion.faq")["motion"].update(easing="power4.inOut"))
    add("trigger not measured for this pattern (FAQ on scroll)", "MOTION_VALUES_MATCH_PATTERN",
        lambda s: node(s, "conversion.faq")["motion"].update(trigger="scroll-scrub"))

    # ---- runtime budgets ----
    add("maxWords overflow on a real field", "MAX_WORDS_BUDGETS",
        lambda s: C(s, "hero.split-visual").update(heading=" ".join(["word"] * 40)))
    add("maxWords overflow inside an array item", "MAX_WORDS_BUDGETS",
        lambda s: C(s, "product.feature-tabs")["tabs"][0].update(copy=" ".join(["word"] * 60)))
    add("maxWords overflow inside a oneOf branch (nav item)", "MAX_WORDS_BUDGETS",
        lambda s: C(s, "shell.nav")["menus"][0]["columns"][0]["items"][0].update(desc=" ".join(["word"] * 20)))
    add("link phrase that is not in its text", "INLINE_PHRASES_PRESENT",
        lambda s: C(s, "product.feature-tabs")["intro"]["linkPhrases"].append("pricing plans"))

    # ---- licensing / original-copy ----
    add("protected role carrying a generated assetRef", "ASSET_REF_FORBIDDEN_FOR_PROTECTED_ROLE",
        lambda s: C(s, "proof.logo-row")["logos"].update(assetRef="generated/logo-row.png"))
    add("fabricated review badge as a generated file", "ASSET_REF_FORBIDDEN_FOR_PROTECTED_ROLE",
        lambda s: C(s, "hero.split-visual")["reviewBadges"].update(assetRef="generated/badge.svg"))
    add("fabricated person photo as a generated file", "ASSET_REF_FORBIDDEN_FOR_PROTECTED_ROLE",
        lambda s: C(s, "proof.testimonial")["author"]["avatar"].update(assetRole="photo.person", assetRef="generated/face.png"))
    add("source asset path hidden in copy", "NO_SOURCE_OR_EXTERNAL_ASSET_PATHS",
        lambda s: C(s, "hero.split-visual")["visual"].update(alt="see /assets/hero-visual.webp"))
    add("original brand name in the hero heading", "ORIGINAL_COPY_AND_MARKS_FORBIDDEN",
        lambda s: C(s, "hero.split-visual").update(heading="Workplace learning with Thrive"))
    add("original assistant name", "ORIGINAL_COPY_AND_MARKS_FORBIDDEN",
        lambda s: C(s, "product.assistant-tabs").update(assistantName="Kiki"))
    add("real customer name as a results brand", "ORIGINAL_COPY_AND_MARKS_FORBIDDEN",
        lambda s: C(s, "proof.results-stats")["cards"][0].update(brand="Burger King"))
    add("review-site name in copy", "ORIGINAL_COPY_AND_MARKS_FORBIDDEN",
        lambda s: C(s, "hero.split-visual").update(socialProof="Rated 4.8 on G2 by learners"))
    return out


# --------------------------------------------------------------------------
# registry mutations (pinned policies)
# --------------------------------------------------------------------------

def registry_mutations():
    out = []
    swaps = [("logo.customer", "may-generate-new"), ("logo.aiVendor", "must-reuse-exact"),
             ("badge.review", "may-generate-new"), ("badge.award", "must-not-reuse"),
             ("photo.person", "must-not-reuse"), ("photo.event", "may-generate-new"),
             ("photo.brand", "must-not-fabricate"), ("product.screenshot", "may-generate-new"),
             ("product.video", "may-generate-new")]
    for role, value in swaps:
        reg = copy.deepcopy(REG["assets"])
        assert value in reg["generationPolicyEnum"] and value != reg["roles"][role]["generationPolicy"]
        reg["roles"][role]["generationPolicy"] = value
        out.append(("pinned %s -> %s (different-but-VALID enum member)" % (role, value), reg, REG["allowlist"]))
    allow = copy.deepcopy(REG["allowlist"])
    allow["assetRoles"]["photo.person"]["generationPolicy"] = "may-generate-new"
    out.append(("allowlist copy of photo.person drifted to may-generate-new", REG["assets"], allow))
    return out


# --------------------------------------------------------------------------

def main():
    failures = []
    print("=" * 78)
    print("CONTROLS -- the real template and the bundled example must pass clean")
    print("=" * 78)
    controls = [("bundled example (/)", load_example())]
    controls += [("synthesised control: " + t, synth_control(t)) for t in sorted(TEMPLATES)]
    for label, spec in controls:
        schema_errors, errors, warnings = run(spec)
        ok = not schema_errors and not errors
        print("  %-56s %s  (%d schema, %d semantic, %d warn)"
              % (label, "PASS" if ok else "FAIL", len(schema_errors), len(errors), len(warnings)))
        if not ok:
            failures.append("control: " + label)
            for where, message in schema_errors[:4]:
                print("        SCHEMA %s %s" % (where, message[:140]))
            for rule, message in errors[:4]:
                print("        ERROR  [%s] %s" % (rule, message[:140]))
    problems = sv.pinned_policy_problems(REG["assets"], REG["allowlist"])
    print("  %-56s %s" % ("unmutated asset registry (pinned policies)", "PASS" if not problems else "FAIL %s" % problems[:1]))
    if problems:
        failures.append("control: registry")

    print()
    print("=" * 78)
    print("MUTATIONS -- every one must be REJECTED (warn-severity rules: FLAGGED)")
    print("=" * 78)
    muts = mutations()
    for label, expect, spec in muts:
        schema_errors, errors, warnings = run(spec)
        error_rules = {r for r, _ in errors}
        warn_rules = {r for r, _ in warnings}
        if expect == "SCHEMA":
            caught = bool(schema_errors)
            how = "schema" if caught else ("only semantic %s" % sorted(error_rules) if error_rules else "-")
            verdict = "rejected"
        elif SEVERITY.get(expect) == "warn":
            # A warn rule must FLAG. Where the mutation can only be built by also breaking
            # the single template's sequence, the hard error is expected too; otherwise
            # the warning must be the ONLY finding (proves warn is non-fatal).
            strict = not schema_errors and not errors
            caught = expect in warn_rules and (strict or "also out of sequence" in label)
            how = expect if caught else "warn=%s err=%s schema=%d" % (sorted(warn_rules), sorted(error_rules), len(schema_errors))
            verdict = "flagged (warn)"
        else:
            caught = expect in error_rules
            how = expect if caught else "got %s%s" % (sorted(error_rules), " + schema" if schema_errors else "")
            verdict = "rejected"
        print("  %-62s %s  [%s]" % (label[:62], verdict if caught else "NOT CAUGHT", how))
        if not caught:
            failures.append("mutation not caught as %s: %s" % (expect, label))

    print()
    print("=" * 78)
    print("REGISTRY MUTATIONS -- pinned asset policies (PINNED_ASSET_POLICIES)")
    print("=" * 78)
    regs = registry_mutations()
    for label, registry, allowlist in regs:
        problems = sv.pinned_policy_problems(registry, allowlist)
        caught = bool(problems)
        print("  %-62s %s" % (label[:62], "rejected" if caught else "NOT CAUGHT"))
        if not caught:
            failures.append("registry mutation not caught: " + label)

    print()
    print("=" * 78)
    print("controls: %d | mutations: %d | registry mutations: %d | failures: %d"
          % (len(controls) + 1, len(muts), len(regs), len(failures)))
    if failures:
        print("RESULT: FAIL")
        for f in failures:
            print("  - %s" % f)
        return 1
    print("RESULT: PASS -- every control clean, every mutation caught")
    return 0


if __name__ == "__main__":
    sys.exit(main())
