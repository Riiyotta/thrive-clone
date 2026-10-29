"""Text normalisation shared by extraction/build_source_identity.py and schema/semantic_validate.py.

Detection of source identity/content in generation-mode PageSpecs is STRING-BASED: NFKC, zero-width and
soft-hyphen removal, curly quotes -> straight, every dash variant -> '-', lower-case; tokens are runs of
[a-z0-9] (apostrophes dropped first, so "nando's" -> "nandos"). Terms match as contiguous token sequences;
copy is compared as sha256 hashes of 5-token shingles. A paraphrase, a translation or a deliberate misspelling
is NOT detected; nobody has hand-reviewed the harvested patterns.
"""
import hashlib
import re
import unicodedata

SHINGLE = 5
_ZW = dict.fromkeys(map(ord, "​‌‍⁠﻿­"), None)
_QUOTES = {ord(c): "'" for c in "‘’‚‛′ʼ"}
_QUOTES.update({ord(c): '"' for c in "“”„‟″"})
_DASHES = {ord(c): "-" for c in "‐‑‒–—―−﹘﹣－"}


def normalize(s):
    s = unicodedata.normalize("NFKC", s)
    s = s.translate(_ZW).translate(_QUOTES).translate(_DASHES)
    return s.lower()


def tokens(s):
    return re.findall(r"[a-z0-9]+", normalize(s).replace("'", ""))


def contains_term(text_tokens, term_tokens):
    n = len(term_tokens)
    if not n:
        return False
    for i in range(len(text_tokens) - n + 1):
        if text_tokens[i:i + n] == term_tokens:
            return True
    return False


def shingle_hash(words):
    return hashlib.sha256(" ".join(words).encode("utf-8")).hexdigest()[:16]


def shingle_hashes(s, n=SHINGLE):
    t = tokens(s)
    return {shingle_hash(t[i:i + n]) for i in range(len(t) - n + 1)}


def compact(s):
    """normalised text with all whitespace removed (for literal claim figures such as '$18,500' or '1.5x')."""
    return re.sub(r"\s+", "", normalize(s))
