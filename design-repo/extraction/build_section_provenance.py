#!/usr/bin/env python3
"""R7: derive every section contract's closed `source` (provenance) and `semantic` (taxonomy) objects.

    python3 extraction/build_section_provenance.py            # --check: exit 1 if any contract is stale
    python3 extraction/build_section_provenance.py --write    # rewrite source/semantic in sections/*.json

source   {id, tag, file, lines}: file = the contract's implementedBy file; the rendered root element is the
         first lowercase element returned by the implementing function (implementedBy "file > Fn", else the
         default export), or, for files that render several sections (ANCHORS), the first element at the
         section's own content anchor; lines = that element's opening line through its closing line (or the
         line before the next anchor); tag = its tag name; id = "<Component>.<tag>[data-section=..]" or
         "<Component>.<tag>@<line>". It describes WHAT renders, never what the AI should call it.
semantic {id, category}: id = the contract id, category = its id prefix (the AI-facing taxonomy).
Wrapper/class naming never decides the taxonomy (semantic is derived from the contract id, not from source).
Needs the sibling source tree; without it prints a warning and exits 0. extraction/verify_all.py
(section-provenance) re-reads every range and checks the tag really opens at the cited line.
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
CITE = re.compile(r"^(.+?):(\d+)-(\d+)$")


# Files that render more than one design-repo section: (start anchor, end anchor or None). The rendered element
# is the first tag at/after the start anchor; it ends at the line before the end anchor, or at its own close.
ANCHORS = {
    "shell.footer": (r"\{/\* Footer card \*/\}", None),
    "conversion.demo-cta": (r"\{sub \? \(", None),
    "conversion.demo-form": (r"^\s*\) : \($", None),
    "proof.results-stats": (r'data-section="results"', r"\{testimonial && \("),
    "proof.testimonial": (r"\{testimonial && \(", None),
    "article.cs-platform-header": (r"\{/\* hero \*/\}", r"\{/\* sidebar \+ article \*/\}"),
    "article.cs-platform-body": (r"\{/\* sidebar \+ article \*/\}", r"\{/\* CTA \*/\}"),
    "conversion.cs-platform-cta": (r"\{/\* CTA \*/\}", None),
}
TAG_RE = re.compile(r"<([a-z][a-z0-9]*)\b")


def _is_comment(s):
    s = s.strip()
    return s.startswith(("*", "//", "/*"))


def _first_tag(lines, frm):
    for i in range(frm, len(lines) + 1):
        if _is_comment(lines[i - 1]):
            continue
        m = TAG_RE.search(lines[i - 1])
        if m:
            return i, m.group(1)
    raise ValueError("no element after line %d" % frm)


def _close(lines, line, tag):
    """line of the element's closing tag (balanced count of <tag ... > / </tag> / self-closing)."""
    depth = 0
    for i in range(line, len(lines) + 1):
        s = lines[i - 1]
        if i == line:
            s = s[s.index("<" + tag):]
        for m in re.finditer(r"<(/?)%s\b[^>]*?(/?)>|<%s\b[^>]*$" % (tag, tag), s):
            if m.group(0).startswith("</"):
                depth -= 1
            elif m.group(0).endswith("/>"):
                pass
            else:
                depth += 1
        if depth <= 0 and i >= line:
            return i
    raise ValueError("unclosed <%s> at %d" % (tag, line))


def derive(contract, source=SOURCE):
    impl = contract["implementedBy"]
    file, _, fn = impl.partition(" > ")
    lines = open(os.path.join(source, file), encoding="utf-8").read().split("\n")
    cid = contract["id"]
    end_line = None
    if cid in ANCHORS:
        sa, ea = ANCHORS[cid]
        a = next(i for i, ln in enumerate(lines, 1) if re.search(sa, ln))
        if ea:
            end_line = next(i for i, ln in enumerate(lines, 1) if i > a and re.search(ea, ln)) - 1
    else:
        decl = r"function %s\(" % re.escape(fn) if fn else r"export default function \w+\("
        d = next(i for i, ln in enumerate(lines, 1) if re.search(decl, ln))
        indent = re.match(r"\s*", lines[d - 1]).group(0) + "  "
        # the function body's own (top-level or first variant-branch) return, never one inside a callback
        cands = [i for i, ln in enumerate(lines, 1) if i > d and re.match(r"%s(?:  )?return (?:\(\s*$|<)" % indent, ln)]
        top = [i for i in cands if re.match(r"%sreturn\b" % indent, lines[i - 1])]
        a = (top or cands)[0] if not any(i < (top or [10 ** 9])[0] for i in cands if i not in top) else cands[0]
    line, tag = _first_tag(lines, a)
    b = end_line if end_line else _close(lines, line, tag)
    comp = fn or os.path.splitext(os.path.basename(file))[0]
    head = ""
    for k in range(line, min(line + 8, len(lines)) + 1):
        head += lines[k - 1] + " "
        if re.search(r"(?<!=)>\s*$|/>", lines[k - 1]) and k > line or re.search(r"<%s\b[^>]*>" % tag, lines[k - 1]):
            break
    ds = re.search(r'data-section="([^"]+)"', head)
    sid = "%s.%s[data-section=%s]" % (comp, tag, ds.group(1)) if ds and cid not in ANCHORS else "%s.%s@%d" % (comp, tag, line)
    return {"id": sid, "tag": tag, "file": file, "lines": "%d-%d" % (line, b)}


def build_all(repo=REPO, source=SOURCE):
    out = {}
    seen = {}
    for f in sorted(glob.glob(os.path.join(repo, "sections", "*.json"))):
        with open(f, encoding="utf-8") as fh:
            c = json.load(fh)
        src = derive(c, source)
        if src["id"] in seen:
            src["id"] = "%s@%s" % (src["id"].split("@")[0], src["lines"].split("-")[0])
        seen[src["id"]] = c["id"]
        out[c["id"]] = (f, {"source": src, "semantic": {"id": c["id"], "category": c["id"].split(".")[0]}})
    ids = [v[1]["source"]["id"] for v in out.values()]
    dup = sorted({i for i in ids if ids.count(i) > 1})
    if dup:
        raise ValueError("duplicate source ids %s" % dup)
    return out


def main(argv):
    if not os.path.isdir(os.path.join(SOURCE, "src")):
        print("WARNING: no sibling src/; section provenance not re-derived")
        return 0
    stale = []
    for cid, (f, want) in build_all().items():
        with open(f, encoding="utf-8") as fh:
            c = json.load(fh)
        if c.get("source") != want["source"] or c.get("semantic") != want["semantic"]:
            stale.append(cid)
            if "--write" in argv:
                out = {}
                for k, v in c.items():
                    if k in ("source", "semantic"):
                        continue
                    out[k] = v
                    if k == "category":
                        out["source"] = want["source"]
                        out["semantic"] = want["semantic"]
                with open(f, "w", encoding="utf-8") as fh:
                    fh.write(json.dumps(out, indent=2, ensure_ascii=False) + "\n")
    if "--write" in argv:
        print("wrote source/semantic on %d section contract(s)" % len(stale))
        return 0
    if stale:
        print("STALE provenance: %s" % stale[:8])
        return 1
    print("section provenance up to date")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
