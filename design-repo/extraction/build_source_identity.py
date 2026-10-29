#!/usr/bin/env python3
"""Derive the generation-mode leakage registry (schema/source-identity.json) from the REAL source.

    python3 extraction/build_source_identity.py            # --check (default): rebuild in memory, exit 1 on drift
    python3 extraction/build_source_identity.py --write    # rewrite schema/source-identity.json

The source project is the PARENT of design-repo/ (derived from __file__). Without it the script prints a
WARNING and exits 0, leaving the checked-in registry untouched (the semantic validator only needs the
checked-in file, so a standalone design-repo keeps working).

Nothing is typed in by hand except the EXTRACTION RULES below (which file, which key); every term carries
file:line evidence. Categories (schema/semantic_validate.py rule in brackets):
  BRAND     [GENERATION_MODE_BRAND]    the clone's <title> brand (index.html), the Wordmark aria-label, the saved
                                       original page's <title> brand, and the brand words that differ between a
                                       clone path and its `original` path in src/routes.js (nova/kiki,
                                       why-nimbus/why-thrive, impact/thrive-impact); every source host containing one
  CUSTOMER  [GENERATION_MODE_CUSTOMER] the real customer slugs of src/routes.js `original` case-study paths, and the
                                       clone's own (fictional) org / company values in src/
  PERSON    [GENERATION_MODE_PERSON]   every `name:` in src/ that sits within 3 lines of a `role:` key, and `author:`
  CLAIM     [GENERATION_MODE_CLAIM]    every stat: / value: / price: figure in src/
  URL       [GENERATION_MODE_URL]      every http(s) host in src/, index.html, CLONE_SPEC*.md, asset-manifest.json,
                                       pages-manifest.json (www.w3.org, an XML namespace, excluded)
  EMBED     [GENERATION_MODE_EMBED]    asset-manifest.json `embeds`: video embed URLs + ids, form portalId / formId
  ASSET     [GENERATION_MODE_ASSET]    every file name under public/assets/ and public/stock/
  CTA       [GENERATION_MODE_CTA]      button / link labels in src/ (label:, ctaLabel:, cta:) that carry a BRAND term
  copy      [GENERATION_MODE_COPY]     sha256[:16] of every normalised 5-token shingle of: string literals and JSX
                                       text of >= 5 words in src/ (components + pages), the >= 5-word quoted strings
                                       of CLONE_SPEC*.md, and every >= 5-word string of the bundled mode=clone
                                       example PageSpecs (whose copy verify_all's example-provenance check
                                       traces to src/)
Normalisation is schema/textnorm.py (shared with the validator). Detection is string-based, see that file.
"""
import glob
import json
import os
import re
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
SOURCE = os.path.dirname(REPO)
sys.path.insert(0, os.path.join(REPO, "schema"))
import textnorm as tn  # noqa: E402

OUT = os.path.join(REPO, "schema", "source-identity.json")
EXCLUDED_HOSTS = {"www.w3.org"}
MAX_EVIDENCE = 3


def rel(p, src):
    return os.path.relpath(p, src).replace(os.sep, "/")


def read_lines(p):
    return open(p, encoding="utf-8", errors="replace").read().split("\n")


def scan(src, files, regex, group=1):
    rx = re.compile(regex)
    for f in files:
        for i, ln in enumerate(read_lines(f), 1):
            for m in rx.finditer(ln):
                yield m.group(group), "%s:%d-%d" % (rel(f, src), i, i), i, f


def add(store, term, ev):
    k = term.strip()
    if not k:
        return
    e = store.setdefault(k, [])
    if ev not in e and len(e) < MAX_EVIDENCE:
        e.append(ev)


def as_list(store, category):
    return [{"term": t, "category": category, "tokens": tn.tokens(t), "evidence": ev}
            for t, ev in sorted(store.items(), key=lambda kv: (kv[0].lower(), kv[0]))]


def strip_comments(text):
    text = re.sub(r"/\*.*?\*/", lambda m: "\n" * m.group(0).count("\n"), text, flags=re.S)
    return re.sub(r"(^|[^:'\"`])//[^\n]*", r"\1", text)


def code_files(src):
    out = []
    for f in sorted(glob.glob(os.path.join(src, "src", "**", "*.js*"), recursive=True)):
        if "/__preview" in rel(f, src):
            continue
        out.append(f)
    return out


def copy_strings(src, repo):
    out = []
    for f in code_files(src):
        t = strip_comments(open(f, encoding="utf-8").read())
        cands = re.findall(r"'((?:[^'\\\n]|\\.)*)'|\"((?:[^\"\\\n]|\\.)*)\"|`([^`]*)`", t)
        cands = [a or b or c for a, b, c in cands]
        cands += re.findall(r">([^<>{}]+)<", t)
        for s in cands:
            s = re.sub(r"\$\{[^}]*\}", " ", s)
            words = s.split()
            if len(words) < 5 or re.search(r"[={}();]|=>|\bclassName\b", s):
                continue
            if sum(1 for w in words if re.match(r"^[A-Za-z‘’“”'\",.!?:&-]+$", w)) < 0.6 * len(words):
                continue
            out.append(s)
    for f in sorted(glob.glob(os.path.join(src, "CLONE_SPEC*.md"))):
        for ln in read_lines(f):
            for q in re.findall(r"[“\"]([^”\"]{20,})[”\"]", ln):
                if len(q.split()) >= 5:
                    out.append(q)
    for f in [os.path.join(repo, "schema", "example.pagespec.json")] + sorted(glob.glob(os.path.join(repo, "schema", "examples", "*.json"))):
        with open(f, encoding="utf-8") as fh:
            spec = json.load(fh)
        if spec.get("mode") != "clone":
            continue

        def walk(v):
            if isinstance(v, dict):
                for x in v.values():
                    walk(x)
            elif isinstance(v, list):
                for x in v:
                    walk(x)
            elif isinstance(v, str) and len(v.split()) >= 5:
                out.append(v)
        walk(spec.get("nodes"))
    return out


def build(src, repo=REPO):
    code = code_files(src)
    docs = sorted(glob.glob(os.path.join(src, "CLONE_SPEC*.md")))
    manifests = [os.path.join(src, n) for n in ("index.html", "asset-manifest.json", "pages-manifest.json") if os.path.exists(os.path.join(src, n))]

    brand = {}
    for v, ev, _, _ in scan(src, [os.path.join(src, "index.html")], r"<title>([^<|]+)"):
        add(brand, v.strip(), ev)
    for v, ev, _, _ in scan(src, [os.path.join(src, "src", "components", "shared", "Wordmark.jsx")], r'aria-label="([^"]+)"'):
        add(brand, v, ev)
    for f in sorted(glob.glob(os.path.join(src, "*.html"))):
        if os.path.basename(f) == "index.html":
            continue
        for v, ev, _, _ in scan(src, [f], r"<title>([^<]+)"):
            add(brand, v.split("|")[-1].strip(), ev)
    routes = os.path.join(src, "src", "routes.js")
    for i, ln in enumerate(read_lines(routes), 1):
        m = re.search(r"path: '([^']+)', original: '([^']+)'", ln)
        if not m:
            continue
        a, b = set(re.split(r"[/-]", m.group(1))) - {""}, set(re.split(r"[/-]", m.group(2))) - {""}
        if a != b:
            for w in sorted((a - b) | (b - a)):
                add(brand, w.capitalize(), "src/routes.js:%d-%d" % (i, i))
    roots = [t for t in brand]

    hosts, brand_hosts = {}, {}
    for v, ev, _, _ in scan(src, code + docs + manifests, r"https?://([A-Za-z0-9.-]+[A-Za-z0-9])"):
        h = v.lower()
        if h in EXCLUDED_HOSTS:
            continue
        add(hosts, h, ev)
        if any(r.lower() in h for r in roots):
            add(brand_hosts, h, ev)
    for h, ev in brand_hosts.items():
        for e in ev:
            add(brand, h, e)

    customers = {}
    lines = read_lines(routes)
    for i, ln in enumerate(lines, 1):
        m = re.match(r"\s*\.\.\.\[(.*)\]\.map", ln)
        if m:
            for slug in re.findall(r"'([^']+)'", m.group(1)):
                add(customers, slug.replace("-", " ").title(), "src/routes.js:%d-%d" % (i, i))
    for v, ev, _, _ in scan(src, code, r"\b(?:org|company): '([^']+)'"):
        add(customers, v, ev)

    people = {}
    for f in code:
        L = read_lines(f)
        for i, ln in enumerate(L, 1):
            for m in re.finditer(r"\bname: '([^']+)'", ln):
                window = "\n".join(L[max(0, i - 4):i + 3])
                if re.search(r"\brole: ", window):
                    add(people, m.group(1), "%s:%d-%d" % (rel(f, src), i, i))
            for m in re.finditer(r"\bauthor: '([^']+)'", ln):
                add(people, m.group(1), "%s:%d-%d" % (rel(f, src), i, i))

    claims = {}
    for v, ev, _, _ in scan(src, code, r"\b(?:stat|value|price): '([^']*[0-9][^']*)'"):
        add(claims, v, ev)

    embeds = {}
    am = os.path.join(src, "asset-manifest.json")
    if os.path.exists(am):
        for v, ev, _, _ in scan(src, [am], r"(https?://[^\"\s]*(?:embed|youtube|hsforms|hubspot|vimeo|wistia)[^\"\s]*)"):
            add(embeds, v, ev)
            idm = re.search(r"/embed/([A-Za-z0-9_-]{6,})", v)
            if idm:
                add(embeds, idm.group(1), ev)
        for v, ev, _, _ in scan(src, [am], r"\"(?:portalId|formId)\": \"([^\"]+)\""):
            add(embeds, v, ev)

    assets = {}
    for sub in ("assets", "stock"):
        for f in sorted(glob.glob(os.path.join(src, "public", sub, "*"))):
            if os.path.isfile(f) and not f.endswith(".md"):
                add(assets, os.path.basename(f), rel(f, src))

    cta = {}
    brand_tok = [tn.tokens(t) for t in brand]
    for v, ev, _, _ in scan(src, code, r"\b(?:label|ctaLabel|cta): '([^']{2,60})'"):
        if any(tn.contains_term(tn.tokens(v), bt) for bt in brand_tok):
            add(cta, v, ev)

    texts = copy_strings(src, repo)
    shingles = set()
    for s in texts:
        shingles |= tn.shingle_hashes(s)

    return {
        "_note": "GENERATED by extraction/build_source_identity.py from the real source (do not hand-edit; verify_all.py re-derives it and fails on drift when the source tree is present). schema/semantic_validate.py uses it to reject source identity and content in mode=generation PageSpecs. Detection is string-based on schema/textnorm.py-normalised text (paraphrase, translation or misspelling is not detected); nobody has hand-reviewed these harvested patterns.",
        "normalization": "NFKC; zero-width + soft hyphen removed; curly quotes -> straight; dash variants -> '-'; lower-case; apostrophes dropped; tokens [a-z0-9]+; terms match as contiguous token sequences; CLAIM figures match literally on whitespace-collapsed normalised text, bounded by non-alphanumerics",
        "terms": as_list(brand, "BRAND") + as_list(customers, "CUSTOMER") + as_list(people, "PERSON") + as_list(hosts, "URL") + as_list(embeds, "EMBED") + as_list(cta, "CTA"),
        "claims": [{"figure": t, "evidence": ev} for t, ev in sorted(claims.items())],
        "assetFiles": as_list(assets, "ASSET"),
        "copy": {"shingleSize": tn.SHINGLE, "hash": "sha256 hex[:16] of the space-joined normalised tokens", "sourceStrings": len(texts), "hashes": sorted(shingles)},
    }


def main(argv):
    if not (os.path.isdir(os.path.join(SOURCE, "src")) and os.path.isfile(os.path.join(SOURCE, "index.html"))):
        print("WARNING: source tree absent; schema/source-identity.json not re-derived (checked-in copy used)")
        return 0
    new = build(SOURCE)
    if "--write" in argv:
        with open(OUT, "w", encoding="utf-8") as f:
            f.write(json.dumps(new, indent=1, ensure_ascii=False) + "\n")
        cats = {}
        for t in new["terms"]:
            cats[t["category"]] = cats.get(t["category"], 0) + 1
        print("wrote schema/source-identity.json: terms %s, %d claims, %d asset files, %d copy shingles from %d strings"
              % (cats, len(new["claims"]), len(new["assetFiles"]), len(new["copy"]["hashes"]), new["copy"]["sourceStrings"]))
        return 0
    old = json.load(open(OUT, encoding="utf-8")) if os.path.isfile(OUT) else None
    if old != new:
        diff = [k for k in new if (old or {}).get(k) != new[k]]
        print("DRIFT: schema/source-identity.json differs from a rebuild from the source (keys: %s)" % diff)
        return 1
    print("schema/source-identity.json matches a rebuild from the source")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
