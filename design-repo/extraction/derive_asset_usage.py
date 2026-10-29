#!/usr/bin/env python3
"""Re-derive every asset role's `usageSites` (assets/asset-roles.json) from the CURRENT clone source.

    python3 extraction/derive_asset_usage.py            # --check: exit 1 if asset-roles.json is stale
    python3 extraction/derive_asset_usage.py --write    # rewrite usageSites / usageSiteCount

A usage site is a non-comment line of src/ (build-time preview pages excluded) that references the role:
  * roles with files under public/assets/: a line naming one of those files (by basename)
  * brand.wordmark: a `<Wordmark` element;  placeholder.neutral: a `<Placeholder` element
  * product.video: a video placeholder label (videoLabel / mediaLabel / label="...video...")
  * stock.photo: the stock map / slot machinery (STOCK, NO_STOCK, SQUARE_IDS, STOCK_MAP, data-stock-slot)
  * roles with no marker (the generation-safe roles added in 3.0.0) have no source usage site.
At most MAX_SITES sites are listed (sorted by file, line); usageSiteCount is the full count.
Needs the sibling source tree; without it, prints a warning and exits 0.
"""
import json
import os
import re
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
SOURCE = os.path.dirname(REPO)
ROLES = os.path.join(REPO, "assets", "asset-roles.json")
MAX_SITES = 12
MARKERS = {
    "brand.wordmark": r"<Wordmark\b",
    "placeholder.neutral": r"<Placeholder\b",
    "product.video": r"videoLabel|mediaLabel|label=\"[^\"]*[Vv]ideo",
    "stock.photo": r"\bSTOCK\b|NO_STOCK|SQUARE_IDS|STOCK_MAP|data-stock-slot",
}


def src_lines(source):
    out = []
    base = os.path.join(source, "src")
    for root, dirs, files in os.walk(base):
        dirs[:] = sorted(d for d in dirs if not d.startswith("__preview"))
        for name in sorted(files):
            if not name.endswith((".js", ".jsx")):
                continue
            p = os.path.join(root, name)
            rel = os.path.relpath(p, source).replace(os.sep, "/")
            for i, ln in enumerate(open(p, encoding="utf-8").read().split("\n"), 1):
                s = ln.strip()
                if s.startswith(("*", "//", "/*")):
                    continue
                out.append((rel, i, ln))
    return out


def derive(roles, source=SOURCE):
    lines = src_lines(source)
    res = {}
    for role, spec in roles.items():
        pats = []
        if role in MARKERS:
            pats.append(MARKERS[role])
        names = [os.path.basename(f) for f in spec.get("files", []) if f.startswith("public/assets/")]
        if names:
            pats.append("|".join(re.escape(n) for n in names))
        if not pats:
            res[role] = []
            continue
        rx = re.compile("|".join("(?:%s)" % p for p in pats))
        res[role] = ["%s:%d-%d" % (f, i, i) for f, i, ln in lines if rx.search(ln)]
    return res


def main(argv):
    if not os.path.isdir(os.path.join(SOURCE, "src")):
        print("WARNING: no sibling src/; asset usage sites not re-derived")
        return 0
    with open(ROLES, encoding="utf-8") as fh:
        reg = json.load(fh)
    sites = derive(reg["roles"])
    stale = []
    for role, spec in reg["roles"].items():
        want = sites[role][:MAX_SITES]
        if spec.get("usageSites") != want or spec.get("usageSiteCount") != len(sites[role]):
            stale.append(role)
            spec["usageSites"] = want
            spec["usageSiteCount"] = len(sites[role])
    if "--write" in argv:
        with open(ROLES, "w", encoding="utf-8") as fh:
            fh.write(json.dumps(reg, indent=2, ensure_ascii=False) + "\n")
        print("wrote usageSites for %d roles (%d changed)" % (len(reg["roles"]), len(stale)))
        return 0
    if stale:
        print("STALE usageSites: %s" % stale)
        return 1
    print("usageSites up to date for %d roles" % len(reg["roles"]))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
