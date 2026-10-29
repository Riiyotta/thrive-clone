#!/usr/bin/env python3
"""Drift proof: copy the design-repo (plus the cited source files) into a scratch directory once per case,
inject exactly one defect, run extraction/verify_all.py there, and require the matching check to FAIL; then
prove the unmutated staged copy passes everything.

    python3 extraction/prove_drift.py --scratch <dir>     # scratch copies are created (and removed) under <dir>
    python3 extraction/prove_drift.py                     # uses the OS temp directory

The case list lives in extraction/verify_all.py (prove_drift + drift_cases_v3) so the checks and the proofs
that they catch drift stay in one file. Cases that need the sibling source tree are SKIPPED (and say so) when
the design-repo runs standalone.
"""
import os
import sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.join(os.path.dirname(HERE), "schema"))


def main(argv):
    scratch = None
    if "--scratch" in argv:
        i = argv.index("--scratch")
        if i + 1 >= len(argv):
            print("usage: prove_drift.py [--scratch DIR]")
            return 2
        scratch = os.path.abspath(argv[i + 1])
        os.makedirs(scratch, exist_ok=True)
    import verify_all
    return verify_all.prove_drift(scratch)


if __name__ == "__main__":
    sys.exit(main(sys.argv))
