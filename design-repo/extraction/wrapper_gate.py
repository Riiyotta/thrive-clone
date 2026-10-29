#!/usr/bin/env python3
"""R9: automated whole-page-wrapper quality gate over MEASURED section heights.

    python3 extraction/wrapper_gate.py          # prints findings; exit 1 on any error

Input: extraction/measured-values.json `sectionHeights` (measured at 1440px from the built clone by
extraction/measure_sections.mjs) and extraction/wrapper-whitelist.json. Thresholds are PINNED HERE, in code:
  * a HERO section taller than 1800px warns; taller than 3000px is an error unless whitelisted
  * one in-flow, non-SHELL unit holding > 50% of its page warns; > 60% is an error unless whitelisted
    (pages with fewer than 3 in-flow non-SHELL units are skipped for the share rule; fixed/sticky elements
    such as the nav take no page height and are excluded; empty spacer divs count toward the page only)
  * a template with no measurement, a required node of a template with no measurement, or a measurement at a
    viewport other than 1440px is an error
  * a whitelist entry needs reviewedBy, a justification of 30+ characters and a maxHeightPx above the measured
    height; an agent reviewer must say "agent attestation, not a human sign-off"; an entry that no longer
    matches a hit (stale) or whose measured height exceeds maxHeightPx (over cap) is an error; a whitelisted
    hit still warns.
Called by extraction/verify_all.py (wrapper-gate). evaluate() is importable for the adversarial / drift tests.
"""
import json
import os
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)

VIEWPORT_WIDTH = 1440
HERO_WARN_PX = 1800
HERO_ERROR_PX = 3000
SHARE_WARN = 0.50
SHARE_ERROR = 0.60
MIN_IN_FLOW_SECTIONS = 3
MIN_JUSTIFICATION = 30
AGENT_MARK = "agent attestation, not a human sign-off"


def _load(rel):
    with open(os.path.join(REPO, rel), encoding="utf-8") as fh:
        return json.load(fh)


def evaluate(heights, whitelist, templates):
    errors, warns, hits = [], [], set()
    if (heights.get("viewport") or {}).get("width") != VIEWPORT_WIDTH:
        errors.append("sectionHeights measured at viewport %r, not %dpx" % ((heights.get("viewport") or {}).get("width"), VIEWPORT_WIDTH))
    wl = {(e.get("template"), e.get("section")): e for e in whitelist.get("entries", [])}
    for e in whitelist.get("entries", []):
        rb = str(e.get("reviewedBy") or "")
        if not rb:
            errors.append("whitelist %s/%s: reviewedBy missing" % (e.get("template"), e.get("section")))
        elif ("agent" in rb.lower() or "claude" in rb.lower()) and AGENT_MARK not in rb:
            errors.append("whitelist %s/%s: an agent reviewer must say %r" % (e.get("template"), e.get("section"), AGENT_MARK))
        if len(str(e.get("justification") or "")) < MIN_JUSTIFICATION:
            errors.append("whitelist %s/%s: justification shorter than %d characters" % (e.get("template"), e.get("section"), MIN_JUSTIFICATION))
    measured = heights.get("templates", {})
    for tid, tpl in sorted(templates.items()):
        m = measured.get(tid)
        if not m:
            errors.append("%s: no section-height measurement" % tid)
            continue
        have = {s for u in m["units"] for s in u["sections"]}
        seq = (tpl.get("routeSequences") or {}).get(m["route"])
        need = seq if seq else [n["section"] for n in tpl["nodes"] if n.get("required", True)]
        for s in need:
            if s not in have:
                errors.append("%s: required node %s has no measurement on %s" % (tid, s, m["route"]))
        page = m["pageHeightPx"]
        if not page:
            errors.append("%s: pageHeightPx missing" % tid)
            continue
        flow = [u for u in m["units"] if u.get("inFlow") and not all(s.startswith("shell.") for s in u["sections"])]
        for u in m["units"]:
            for s in u["sections"]:
                if s.startswith("hero.") and u["heightPx"] > HERO_WARN_PX:
                    key = (tid, s)
                    if u["heightPx"] > HERO_ERROR_PX:
                        hits.add(key)
                        e = wl.get(key)
                        if e and u["heightPx"] <= e.get("maxHeightPx", 0):
                            warns.append("%s: HERO %s is %dpx (> %d) -- whitelisted" % (tid, s, u["heightPx"], HERO_ERROR_PX))
                        else:
                            errors.append("%s: HERO %s is %dpx (> %dpx)" % (tid, s, u["heightPx"], HERO_ERROR_PX))
                    else:
                        warns.append("%s: HERO %s is %dpx (> %dpx warn)" % (tid, s, u["heightPx"], HERO_WARN_PX))
        if len(flow) < MIN_IN_FLOW_SECTIONS:
            continue
        for u in flow:
            share = u["heightPx"] / float(page)
            label = "+".join(u["sections"])
            if share > SHARE_ERROR:
                key = (tid, u["sections"][0])
                hits.add(key)
                e = wl.get(key)
                if e and u["heightPx"] <= e.get("maxHeightPx", 0):
                    warns.append("%s: %s holds %.0f%% of the page (> %.0f%%) -- whitelisted" % (tid, label, share * 100, SHARE_ERROR * 100))
                else:
                    errors.append("%s: %s holds %.0f%% of the page (%dpx of %dpx, > %.0f%%)" % (tid, label, share * 100, u["heightPx"], page, SHARE_ERROR * 100))
            elif share > SHARE_WARN:
                warns.append("%s: %s holds %.0f%% of the page (> %.0f%% warn)" % (tid, label, share * 100, SHARE_WARN * 100))
    for key, e in wl.items():
        if key not in hits:
            errors.append("whitelist %s/%s is stale: no gate error to excuse" % key)
            continue
        m = measured.get(key[0], {})
        h = max([u["heightPx"] for u in m.get("units", []) if key[1] in u["sections"]] or [0])
        if h > e.get("maxHeightPx", 0):
            errors.append("whitelist %s/%s: measured %dpx exceeds maxHeightPx %s" % (key[0], key[1], h, e.get("maxHeightPx")))
    return errors, warns


def main():
    heights = _load("extraction/measured-values.json").get("sectionHeights") or {}
    whitelist = _load("extraction/wrapper-whitelist.json")
    templates = _load("templates/templates.json")["templates"]
    errors, warns = evaluate(heights, whitelist, templates)
    for w in warns:
        print("  WARN  %s" % w)
    for e in errors:
        print("  ERROR %s" % e)
    print("wrapper gate: %d template(s) measured, %d warning(s), %d error(s)" % (len(heights.get("templates", {})), len(warns), len(errors)))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
