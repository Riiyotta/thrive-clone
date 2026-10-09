# Changelog

## 1.0.0: initial build

Built from scratch, bottom-up per the build methodology: tokens → primitives →
components → sections → template → compatibility graph → schema → example →
semantic validator → adversarial tests → manifest/allowlist/docs.

### Added

- **Tokens.** Foundation colour (19 colours from `tailwind.config.js`),
  typography (Inter opsz 24 + Instrument Serif, 36 size roles), radius,
  spacing, desktop-first breakpoints, motion (11 section patterns + the button
  roll-up), and an explicit *empty* elevation set (the page has no shadows).
  Also semantic roles, component tokens, layout, and the single `nimbus-dark`
  theme.
- **10 primitives and 14 components**, each citing its
  source lines.
- **15 section contracts**, ids aligned with the project's `ia.json`.
  `Results.jsx` and `Footer.jsx` each render two sections. Every contract has
  `additionalProperties:false` content, `maxWords` on every text field (with the
  measured longest instance from the clone's own copy), a const-locked motion
  block, a structured `responsive` list cited to real Tailwind classes, and
  asset roles.
- **1 template / 1 route.** This is a single-route repo.
- **23 compatibility rules**, each naming the function that
  enforces it. Derived sets (including the 5 real same-category adjacencies,
  which are exempt from the adjacency warning) are re-checked against
  `templates.json`.
- **A closed asset-role enum (11 roles)** derived from real `src=` usage
  sites. 9 real-third-party roles are pinned to `must-not-reuse` /
  `must-not-fabricate` with an exact-value check.
- **Schema + example + semantic validator + adversarial suite.**
- **`verify_all.py`**: 20 checks plus `--prove-drift`, which injects one defect
  per scratch copy, and `--cross-check`.
- **`extraction/measured-values.json`**: 82 keyword-verified
  citations, including the external pixel-audit dumps. They degrade to warnings
  when the dumps are absent.

### Corrections to the recon spec

See `docs/EVIDENCE.md`. In short:
- The page wrapper adds 64px top padding.
- Every H2 has a 4px top margin.
- Most paragraphs have a 20px bottom margin.
- The 3-col slider keeps 32px top padding on mobile.
- The assistant header keeps a 64px top margin at 390.
- The spec contradicts itself on the quote's base colour.
- Smaller deviations in the dropdown, results header, product-tabs and video
  spacing.
