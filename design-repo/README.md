# Nimbus (thrive clone) design-repo

A machine-validated **PageSpec system**: tokens, primitives, components,
sections, one template, a compatibility graph, a JSON Schema and two
validators. It lets an LLM generate new on-brand pages in this site's design
language **without inventing colours, copy, structure, motion or assets**.

It was built from a pixel-audited local clone of a real, live company's marketing
homepage (thrivelearning.com), rebuilt in React 18.3.1 + Vite 5 + Tailwind CSS v3 +
GSAP 3.15. The clone uses **original placeholder copy**: brand **"Nimbus"**, AI
assistant **"Nova"**. Every value here cites a real file and line range.

> **Status:** `design-review-pending` · `productionApproved: false`.
> Design review and asset-licensing review are still **open**
> (`registry.manifest.json` → `approvalFlags`). This repo is **not** to be
> published, and the repository is **not** to be made public.

## Single route, single template

The source app has no router. It renders exactly **one route (`/`)**, so this
repo has exactly **one template (`home`)**. Its 15 sections are aligned 1:1 with
the project's IA (`ia.json` → `template.home`). No other template or route was
measured, and none should be invented. A generated page may target another
path, but the validator flags it (`TEMPLATE_ROUTE_MEASURED`, warn).

## What is here

| Count | |
|---:|---|
| **15** <!--count:sections--> | section contracts (`sections/`), ids aligned with `ia.json` |
| **10** <!--count:primitives--> | primitives (`primitives/`) |
| **14** <!--count:components--> | components (`components/`) |
| **1** <!--count:templates--> | template (`templates/templates.json`) |
| **1** <!--count:routePatterns--> | route, mapped to exactly one template |
| **23** <!--count:compatibilityRules--> | compatibility rules (`compatibility/graph.json`), each naming its enforcing function |
| **11** <!--count:assetRoles--> | asset roles (`assets/asset-roles.json`), a closed enum; 9 are pinned to must-not-reuse / must-not-fabricate |
| **11** <!--count:motionPatterns--> | section motion patterns (`tokens/00-foundation/motion.json`) |
| **216** <!--count:settablePropertyPaths--> | settable property paths in the allowlist |
| **90** <!--count:responsiveEntries--> | structured responsive entries, each cited to the Tailwind classes on a real source line |
| **82** <!--count:ledgerCitations--> | keyword-verified ledger citations (`extraction/measured-values.json`) |
| **58** <!--count:jsonFiles--> | JSON files |
| **67** <!--count:files--> | files in total |

`verify_all.py` **recomputes every count above from disk**, including this table,
and fails the run on any mismatch.

## Read these before changing anything

| Doc | Why |
|---|---|
| **`docs/CONSTRAINTS.md`** | The hard constraints: single route, placeholder copy only, real third-party imagery banned, static demo form, no publication, reduced motion. |
| **`docs/MOTION.md`** | The complete motion inventory with code citations. Sections do **not** fade in on scroll. |
| **`docs/EVIDENCE.md`** | Evidence sources and every place `CLONE_SPEC.md` is wrong against the code and the pixel audit. |

## Licensing: the source is a real company

- **Copy:** use only original placeholder copy. The example PageSpec's copy comes
  verbatim from the clone's `src/`. It does not come from the saved HTML, from
  quotes in `CLONE_SPEC.md`, or from the live site, and `verify_all.py` checks
  this. The original brand and assistant names, and real third-party names, are
  rejected (`ORIGINAL_COPY_AND_MARKS_FORBIDDEN`).
- **Imagery:** the source project's `public/assets/` holds 56 images the user
  copied from their own saved page of the original, for local reference only.
  They include real customer logos, real product screenshots, a real named
  person's photo, review/award badges and AI-vendor logos. **None is copied in
  here.** Every role backed by such imagery is pinned to `must-not-reuse` or
  `must-not-fabricate`, renders as a neutral placeholder, and accepts no file
  reference.
- **Form:** the footer demo form is a static placeholder. The original was a
  HubSpot iframe; the clone has no live endpoint. A PageSpec cannot make it live.

## Verifying

The repo has **zero runtime dependencies** and needs **no `pip install`**. It
ships its own draft-07 validator (`schema/_draft7.py`).

```bash
python3 extraction/verify_all.py                # all checks
python3 extraction/verify_all.py --prove-drift  # inject one defect per scratch copy; each must be caught
python3 extraction/verify_all.py --cross-check  # optional: diff against the `jsonschema` package
python3 schema/tests/adversarial_test.py        # controls + mutations
python3 schema/semantic_validate.py <spec.json> # validate one PageSpec
```

A PageSpec is valid only if it passes **both** the schema and
`semantic_validate.py`. The semantic validator cross-references the declared
`template` against that template's real node list, so `nodes[]` is never
checked in isolation.

Source-dependent checks are citations, responsive classes, asset coverage, IA
alignment and example provenance. With no sibling source project present (a
standalone copy or an extracted zip), they **warn and skip** instead of failing.

## Generating a page

1. Use `template: "home"` and its 15-node sequence.
2. Fill each node's `content` using only the paths in
   `tokens/llm/component-allowlist.json` → `sections.<id>.settableProperties`.
   Respect every `maxWords` budget.
3. Every media field is `{assetRole, ...}` with a role from that field's own
   list. For any role that is not `may-generate-new`, leave out `assetRef`. It
   renders as a neutral placeholder.
4. Set `motion.pattern` to the section's pattern, and `reducedMotionFallback` to
   the section's const. Neither the original site nor the clone implements
   reduced motion. The fallback is a requirement for generated pages.
5. Run both validators.

There is deliberately **no per-instance token-override field**. Styling is owned
entirely by the contracts.

## Caveat

A design-repo is a **snapshot**, not a living mirror. If the source project
changes, re-run `verify_all.py`: the ledger re-greps motion values and responsive
classes against the current source.
