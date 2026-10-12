# Nimbus (thrive clone) design-repo

A machine-validated **PageSpec system**: tokens, primitives, components,
sections, templates, a compatibility graph, a JSON Schema and two validators.
It lets an LLM generate new on-brand pages in this site's design language
**without inventing colours, copy, structure, motion or assets**.

It was built from a pixel-audited local clone of a real, live company's
marketing site (thrivelearning.com), rebuilt in React 18 + react-router-dom +
Vite 5 + Tailwind CSS v3 + GSAP 3.15. The clone uses **original placeholder
copy**: brand **"Nimbus"**, AI assistant **"Nova"**. Every value here cites a
real file and line range, and every citation is re-derived from current source.

> **Status:** `design-review-pending` · `productionApproved: false`.
> Design review and asset-licensing review are still **open**
> (`registry.manifest.json` → `approvalFlags`). This repo is **not** to be
> published, and the repository is **not** to be made public.

## Routes and templates (2.0.0)

The clone mounts **58 routes**: `/` (`src/pages/Home.jsx`) plus the 57 paths in
`src/routes.js`, resolved through `src/pages/registry.js`. They map onto
**one template per distinct page shape**, each route exactly once
(`templates/templates.json` → `routeToTemplate`). Multi-route templates use one
component plus a data file: `feature-detail` (17 routes), `case-study-platform`
(5), `case-study-content` (5), `content-catalogue` (2). Everything else is a
one-route template. `src/pages/__preview-*` are build-time section previews,
**not** site routes, and are excluded on purpose.

Template slots are structured: `required`, `repeatable`, `variants` (the
`content.variant` values allowed in that slot) and `alternatives` (a choice slot,
e.g. the FAQ or its CMS empty state on the feature-detail routes). Multi-route
templates also record `routeSequences`, the realized node list of every route.
Template ids, node orders and section ids are aligned 1:1 with the project's IA
(`ia.json`).

## What is here

| Count | |
|---:|---|
| **94** <!--count:sections--> | section contracts (`sections/`), ids aligned with `ia.json` |
| **10** <!--count:primitives--> | primitives (`primitives/`) |
| **14** <!--count:components--> | components (`components/`) |
| **33** <!--count:templates--> | templates (`templates/templates.json`) |
| **58** <!--count:routePatterns--> | routes, each mapped to exactly one template |
| **28** <!--count:compatibilityRules--> | compatibility rules (`compatibility/graph.json`), each naming its enforcing function |
| **12** <!--count:assetRoles--> | asset roles (`assets/asset-roles.json`), a closed enum; 10 hold a pinned policy |
| **21** <!--count:motionPatterns--> | section motion patterns (`tokens/00-foundation/motion.json`) |
| **94** <!--count:schemaContentBranches--> | schema content branches (one per section type) |
| **1791** <!--count:settablePropertyPaths--> | settable property paths in the allowlist |
| **760** <!--count:responsiveEntries--> | structured responsive entries, each cited to the Tailwind classes on a real source line |
| **187** <!--count:ledgerCitations--> | keyword-verified ledger citations (`extraction/measured-values.json`) |
| **32** <!--count:examples--> | example PageSpecs (`schema/example.pagespec.json` + `schema/examples/`) |
| **2** <!--count:themes--> | themes (`tokens/themes/`) |
| **169** <!--count:jsonFiles--> | JSON files |
| **178** <!--count:files--> | files in total |

`verify_all.py` **recomputes every count above from disk**, including this table,
and fails the run on any mismatch.

## Read these before changing anything

| Doc | Why |
|---|---|
| **`docs/CONSTRAINTS.md`** | The hard constraints: real routes only, placeholder copy only, real third-party imagery banned, static forms, no publication, reduced motion. |
| **`docs/MOTION.md`** | The motion inventory with code citations. The homepage has no scroll reveals; some subpage sections do. |
| **`docs/EVIDENCE.md`** | Evidence sources, and every place the recon docs (`CLONE_SPEC*.md`, `pages-manifest.json`) disagree with the real page files. |

## Licensing: the source is a real company

- **Copy:** use only original placeholder copy. Every example's copy comes
  verbatim from the clone's `src/` (never the saved HTML, the recon docs or the
  live site), and `verify_all.py` checks every word. The original brand and
  assistant names, and real third-party names, are rejected
  (`ORIGINAL_COPY_AND_MARKS_FORBIDDEN`).
- **Imagery:** `public/assets/` in the source project holds 56 images the user
  copied from their own saved page of the original (real customer logos,
  screenshots, a real person's photo, review/award badges, AI-vendor logos).
  **None is copied in here**; every role backed by such imagery is pinned to
  `must-not-reuse` / `must-not-fabricate` and accepts no file reference.
  `public/stock/` holds 91 Unsplash-licensed stock photos that the clone paints
  into empty slots: role `stock.photo` (`may-reuse-licensed`), allowed only on
  scene/product/decorative fields, never on logo/badge or person fields.
- **Forms:** every form (footer demo form, demo-hero form, contact form,
  subscribe/sign-up forms) is a static placeholder. A PageSpec cannot make one live.

## Verifying

Zero runtime dependencies, no `pip install` (the draft-07 validator is vendored
as `schema/_draft7.py`).

```bash
python3 extraction/verify_all.py                # all checks
python3 extraction/verify_all.py --prove-drift  # inject one defect per scratch copy; each must be caught
python3 extraction/verify_all.py --cross-check  # optional: diff against the `jsonschema` package
python3 schema/tests/adversarial_test.py        # controls + mutations
python3 schema/semantic_validate.py [spec.json] # validate one PageSpec (default: every bundled example)
```

A PageSpec is valid only if it passes **both** the schema and
`semantic_validate.py`, which cross-references the declared `template` (slots,
variants, choices, theme) rather than checking `nodes[]` in isolation.

Source-dependent checks (citations, responsive classes, asset coverage, IA
alignment, example provenance, route list vs `src/routes.js`, page composition)
**warn and skip** when no sibling source project is present (a standalone copy or
an extracted zip).

## Generating a page

1. Pick a template and follow its node list: fill required slots, optional
   slots only if wanted, exactly one member of each choice slot, and the variant
   the slot allows. Use the template's `theme`.
2. Fill each node's `content` using only the paths in
   `tokens/llm/component-allowlist.json` → `sections.<id>.settableProperties`,
   within every `maxWords` budget.
3. Media fields are `{assetRole, ...}` with a role from the field's own list.
   Only `placeholder.neutral` (generated/…) and `stock.photo` (`stock/<id>.jpg`)
   may carry an `assetRef`.
4. `motion.pattern` from the section's allowed patterns, `reducedMotionFallback`
   equal to the section's const (the source implements no reduced motion; this
   is a generation requirement).
5. Run both validators.

There is deliberately **no per-instance token-override field**.

## Caveat

A design-repo is a **snapshot**, not a living mirror. Re-run `verify_all.py`
after any source change: the ledger re-greps motion values, the responsive check
re-greps Tailwind classes, and route/composition checks re-read the page files.
