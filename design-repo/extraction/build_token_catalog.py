#!/usr/bin/env python3
"""Generate tokens/llm/token-catalog.json from the REAL token files.

    python3 extraction/build_token_catalog.py           # rewrite tokens/llm/token-catalog.json
    python3 extraction/build_token_catalog.py --check   # rebuild in memory; exit 1 if the file on disk differs

Sources (nothing else is read, nothing is typed in by hand):
  tokens/00-foundation/{color,typography,spacing,radius,breakpoint,elevation,motion}.json
  tokens/10-semantic/semantic.json, tokens/20-component/component.json, tokens/30-layout/layout.json,
  tokens/themes/*.json

Every catalog entry is {category, value, evidence, file} (+ usage / note / ref where the token file records
them). `category` is one of the closed CATEGORIES below; tokens/llm/token-policy.json names categories and
slots by exactly these keys, and extraction/verify_all.py resolves them. A PageSpec names a token by its
catalog path, never by a raw value (schema/semantic_validate.py TOKEN_* rules).

Also exported: citation_problems(source_root) -- every token whose evidence cites tailwind.config.js or
src/... must have its name or value on the cited line(s) (catches citations that are in range but describe
the wrong line; used by verify_all.py's token-catalog check when the sibling source tree is present).
"""
import glob
import json
import os
import re
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
OUT = os.path.join(REPO, "tokens", "llm", "token-catalog.json")
VERSION = "1.0.0"
CATEGORIES = ["color", "semanticColor", "fontFamily", "fontWeight", "typography", "spacing", "radius",
              "breakpoint", "layout", "component", "motion"]
VALUE_CHECKED = {"color", "fontFamily", "typography", "spacing", "radius", "breakpoint"}


def _load(rel, base):
    with open(os.path.join(base, rel), encoding="utf-8") as fh:
        return json.load(fh)


def _flat(obj, prefix, out, skip=("measuredFrom", "note", "specMeasuredFrom")):
    for k, v in obj.items():
        if k in skip:
            continue
        p = prefix + "." + k
        if isinstance(v, dict):
            _flat(v, p, out, skip)
        else:
            out[p] = v


def build(base=None):
    base = base or REPO
    T = "tokens/00-foundation/"
    toks = {}

    def put(path, category, value, evidence, file, **extra):
        if path in toks:
            raise ValueError("duplicate token path " + path)
        e = {"category": category, "value": value, "evidence": evidence, "file": file}
        e.update({k: v for k, v in extra.items() if v is not None})
        toks[path] = e

    color = _load(T + "color.json", base)
    hexes = {}
    for k, v in color["tokens"].items():
        hexes[k] = v["$value"]
        put(k, "color", v["$value"], v.get("measuredFrom", color.get("measuredFrom")), T + "color.json", usage=v.get("usage"))

    sem = _load("tokens/10-semantic/semantic.json", base)
    for role, v in sem["roles"].items():
        put("semantic." + role, "semanticColor", hexes[v["ref"]], "tokens/10-semantic/semantic.json#" + role,
            "tokens/10-semantic/semantic.json", ref=v["ref"], usage=v.get("observedOn"),
            themeOverrides=v.get("themeOverrides"))

    ty = _load(T + "typography.json", base)
    ff = ty["fontFamily"]
    for k, v in ff.items():
        if k.startswith("fontFamily."):
            put(k, "fontFamily", v["$value"], v["measuredFrom"], T + "typography.json", note=v.get("note"))
    for short in sorted(k for k in ff if not k.startswith("fontFamily.") and k != "loadedFrom"):
        if "fontFamily." + short not in toks:
            v = ff[short]
            put("fontFamily." + short, "fontFamily", v["stack"], v["measuredFrom"], T + "typography.json")
    for k, v in ty["fontWeight"].items():
        put(k, "fontWeight", v, ty.get("specMeasuredFrom"), T + "typography.json")
    for k, v in ty["fontSize"].items():
        if k.startswith("fontSize."):
            continue    # px renderings of the same scale at the 16px root; the rem entries below are canonical
        px = ty["fontSize"].get("fontSize." + k, {})
        put("fontSize." + k, "typography", {"size": v["size"], "lineHeight": v["lineHeight"],
                                            "sizePxAt16": px.get("size"), "lineHeightPxAt16": px.get("lineHeight")},
            v["measuredFrom"], T + "typography.json")
    put("typography.body", "typography", ty["body"]["$value"], ty["body"]["measuredFrom"], T + "typography.json")

    sp = _load(T + "spacing.json", base)
    for k, v in sp["tokens"].items():
        put(k, "spacing", v["$value"], v.get("measuredFrom", sp.get("specMeasuredFrom")), T + "spacing.json", usage=v.get("usage"))
    put("space.paragraphMarginBottom", "spacing", sp["paragraphMarginBottom"]["$value"],
        sp["paragraphMarginBottom"]["measuredFrom"], T + "spacing.json", note=sp["paragraphMarginBottom"].get("note"))

    rd = _load(T + "radius.json", base)
    for k, v in rd["tokens"].items():
        put(k, "radius", v["$value"], v["measuredFrom"], T + "radius.json")
    for k, v in rd.get("literals", {}).items():
        put("radius." + k, "radius", v["$value"], v["measuredFrom"], T + "radius.json", note=v.get("note"))

    bp = _load(T + "breakpoint.json", base)
    for k, v in bp["tokens"].items():
        put(k, "breakpoint", v["$value"], v["measuredFrom"], T + "breakpoint.json")

    lay = _load("tokens/30-layout/layout.json", base)
    for k, v in lay.items():
        if k in ("id", "designSystem"):
            continue
        ev = v.get("measuredFrom")
        if "$value" in v:
            put("layout." + k, "layout", v["$value"], ev, "tokens/30-layout/layout.json", note=v.get("note"))
        elif k == "pageWrapper":
            put("layout." + k, "layout", v["note"], ev, "tokens/30-layout/layout.json")
        else:
            for sub, val in v.items():
                if sub != "measuredFrom":
                    put("layout.%s.%s" % (k, sub), "layout", val, ev, "tokens/30-layout/layout.json")

    comp = _load("tokens/20-component/component.json", base)
    for k, v in comp.items():
        if k in ("id", "designSystem"):
            continue
        flat = {}
        _flat(v, "component." + k, flat)
        ev = v.get("measuredFrom", "tokens/20-component/component.json#" + k)
        for p, val in flat.items():
            put(p, "component", val, ev, "tokens/20-component/component.json")

    mo = _load(T + "motion.json", base)
    for k, v in mo["easing"].items():
        put("motion.easing." + k, "motion", v, mo["easingMeasuredFrom"], T + "motion.json")
    for k, v in mo["reducedMotionFallbacks"].items():
        put("motion.reducedMotionFallback." + k, "motion", v, "tokens/00-foundation/motion.json#reducedMotionFallbacks", T + "motion.json")
    for k, v in mo["patterns"].items():
        put("motion.pattern." + k, "motion",
            {f: v[f] for f in ("trigger", "durationsMs", "delaysMs", "easings", "reducedMotionFallback") if f in v},
            v.get("measuredFrom"), T + "motion.json")
    for k, v in mo.get("primitivePatterns", {}).items():
        put("motion.primitive." + k, "motion",
            {f: v[f] for f in ("trigger", "durationsMs", "easings") if f in v}, v.get("measuredFrom"), T + "motion.json")

    elev = _load(T + "elevation.json", base)
    if elev.get("tokens"):
        raise ValueError("elevation tokens appeared; add an 'elevation' category to CATEGORIES and the policy")

    themes = {}
    for f in sorted(glob.glob(os.path.join(base, "tokens", "themes", "*.json"))):
        with open(f, encoding="utf-8") as fh:
            d = json.load(fh)
        name = d["id"].split(".", 1)[1]
        resolves = {"semantic." + k: {"ref": v, "value": hexes[v]} for k, v in d["resolves"].items()}
        themes[name] = {"file": "tokens/themes/" + os.path.basename(f), "default": d.get("default", False),
                        "semanticTokens": sorted(resolves), "resolves": dict(sorted(resolves.items()))}

    bad = sorted({t["category"] for t in toks.values()} - set(CATEGORIES))
    if bad:
        raise ValueError("unknown categories %s" % bad)
    counts = {c: sum(1 for t in toks.values() if t["category"] == c) for c in CATEGORIES}
    return {
        "version": VERSION,
        "$comment": "GENERATED by extraction/build_token_catalog.py from tokens/{00-foundation,10-semantic,20-component,30-layout,themes}. Do not hand-edit: extraction/verify_all.py rebuilds it and fails on any difference, so neither this file nor a token file can change alone. Every value is copied from a token file (which cites tailwind.config.js / src / CLONE_SPEC.md); nothing here is invented. A PageSpec names tokens by these paths (tokens/llm/token-policy.json pageSpecTokenSlots), never by raw values.",
        "categories": CATEGORIES,
        "counts": {"tokens": len(toks), "byCategory": counts, "themes": len(themes)},
        "absent": {"elevation": elev["statement"]},
        "themes": themes,
        "tokens": dict(sorted(toks.items())),
    }


def render(catalog):
    return json.dumps(catalog, indent=2, ensure_ascii=False) + "\n"


def citation_problems(source_root, catalog=None):
    """Tokens whose evidence cites a real file line: the token's short name or value must be on that line."""
    catalog = catalog or build()
    out = []

    def rem(v):
        if isinstance(v, str) and v.endswith("px"):
            try:
                return ("%g" % (float(v[:-2]) / 16)) + "rem"
            except ValueError:
                return None
        return None

    for path, t in catalog["tokens"].items():
        if t["category"] not in VALUE_CHECKED:
            continue    # motion values are keyword-verified by the ledger; layout/component values are prose/refs
        ev = t.get("evidence") or ""
        if not (ev.startswith("tailwind.config.js:") or ev.startswith("src/")):
            continue
        f, rng = ev.rsplit(":", 1)
        a, b = (int(x) for x in rng.split("-"))
        fp = os.path.join(source_root, f)
        if not os.path.exists(fp):
            continue
        text = "\n".join(open(fp, encoding="utf-8").read().split("\n")[a - 1:b])
        flat = text.replace("'", "").replace('"', "").replace(" ", "")
        short = path.split(".")[-1]
        val = t["value"]
        cands = [short]
        if isinstance(val, str):
            cands.append(val.replace("'", "").replace('"', "").replace(" ", ""))
            cands.append(rem(val))
            # multi-part values written as a Tailwind arbitrary value: '6px 0' -> '0.375rem_0'
            cands.append(re.sub(r"(\d+(?:\.\d+)?)px", lambda m: rem(m.group(0)), val).replace(" ", "_"))
        elif isinstance(val, dict):
            cands += [str(x).replace(" ", "") for x in val.values() if isinstance(x, str)]
        if not any(c and c in flat for c in cands):
            out.append("%s cites %s but neither its name nor its value is on that line" % (path, ev))
    return out


if __name__ == "__main__":
    text = render(build())
    if "--check" in sys.argv:
        ok = os.path.exists(OUT) and open(OUT, encoding="utf-8").read() == text
        print("token-catalog.json up to date" if ok else "token-catalog.json OUT OF DATE (run extraction/build_token_catalog.py)")
        sys.exit(0 if ok else 1)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(text)
    c = json.loads(text)
    print("wrote tokens/llm/token-catalog.json: %d tokens %s, %d themes" % (c["counts"]["tokens"], c["counts"]["byCategory"], c["counts"]["themes"]))
