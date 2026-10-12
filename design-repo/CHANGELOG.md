# Changelog

## 2.0.0: expansion from 1 route to all 58 routes

A migration, not a rewrite: the 1.0.0 contracts, checks, adversarial suite, asset-role pinning and
copy-provenance check were kept and extended; every pre-existing check still runs.

### Added
- **33 templates covering 58 routes**, re-derived from the real page files (`src/pages/**`,
  parsed with babel): `/` + the 57 paths in `src/routes.js`. Multi-route templates: feature-detail (17), case-study-platform (5), case-study-content (5), content-catalogue (2). Slots carry
  `required` / `repeatable` / `variants` / `alternatives` (choice slots), and multi-route templates record
  `routeSequences` (the realized node list of every route). `src/pages/__preview-*` are excluded (build-time
  previews, not site routes).
- **94 section contracts** (79 new + the 15 homepage ids, kept stable). Reused homepage components keep
  one id and gain a `oneOf` subpage branch selected by a required `variant` const (hero.split-visual,
  proof.logo-row, product.feature-tabs, product.assistant-tabs, product.capability-slider, proof.results-stats,
  proof.case-study-carousel, story.brand-video, conversion.faq). New `conversion.demo-cta` (the subpage footer
  CTA). Page-local blocks are contracts too (`File.jsx > Component`). New categories `index` and `article`.
- **Every citation re-derived from current source**: component ranges and template node lines from babel page
  trees, motion citations from keyword anchors, responsive entries from the breakpoint-prefixed classes on the
  cited line (760 entries).
- **Motion**: 21 patterns (10 new: scroll.revealOnce, ticker.verticalLoop, stats.countUp,
  carousel.autoplayLoop, carousel.pagedSlide, accordion.legacyHeight, marquee.cssLoop, tabs.fadeOutIn,
  sticky.anchorTabs, modal.drawerSlide -- see docs/MOTION.md), each with measured values and a fallback.
- **Theme `nimbus-content`** for the content-theme routes (warm near-black body, `Layout.jsx isContentTheme`);
  `THEME_MATCHES_TEMPLATE`.
- **Asset role `stock.photo`** (`may-reuse-licensed`, pinned): the 91 Unsplash-licensed photos in
  `public/stock/` (credited in CREDITS.md). Allowed only on scene/product/decorative fields, never on
  logo/badge/award/AI-vendor or person fields. `STOCK_REF_ONLY_FOR_STOCK_ROLE`. The 9 real-third-party pins are
  unchanged. Asset coverage now includes public/stock.
- **32 example PageSpecs** (home + one per template that has literal source copy), every word of copy verbatim from the clone's `src/`.
- **Rules (28)**: TEMPLATE_VARIANT_MATCH, THEME_MATCHES_TEMPLATE, FOOTER_CTA_EXACTLY_ONE, DEMO_FORM_PLACEMENT,
  DEMO_CTA_PRECEDES_FOOTER, OVERLAP_HERO_FOLLOWS_SPACER, HERO_OPENS_PAGE, STOCK_REF_ONLY_FOR_STOCK_ROLE;
  ONE_HERO_PER_PAGE gains the derived SECONDARY_HERO_USES exemption; NO_DUPLICATE_SINGLETON keys on
  (section, variant) with caps derived from the real templates; DEMO_FORM_STAYS_STATIC covers every form.
- **verify_all.py**: new checks route-sequences, route-source (vs src/routes.js), template-composition (page
  render tags re-read), plus generalised ia-alignment (all templates), example-provenance (all examples, now
  case-insensitive because the clone's filler helpers capitalise sentence starts), asset-coverage (stock),
  graph-validator (6 derived sets incl. per-(section, variant) caps). --prove-drift: 35 cases, all caught.
- **Adversarial suite**: one synthesised control per template and per recorded route sequence (generic loop),
  every family example as a control, and multi-template mutations (variant mismatch, theme mismatch, choice
  slot doubled/empty, cap overflow, second non-exempt hero, stock ref on a protected role, live forms...).

### Fixed (the three 1.0.0 FAILs, at their root)
- `templates/templates.json` cited `src/App.jsx:15-35` (App is now a 32-line router): templates now cite their
  page component (`src/pages/Home.jsx` etc.); the App ledger entry was re-keyed to the router lines.
- 242 responsive class drifts (px -> rem, e.g. Footer `p-[48px]` -> `p-[3rem]`): every homepage entry was re-cited
  to the line that now carries the converted classes; 2 entries whose classes no longer exist were dropped
  (Results.jsx, Footer.jsx). Six ledger entries keyed on px values were re-keyed to the rem source.
- The example word 'Partners': the example's nav menus are now re-derived from the current `Nav.jsx` MENUS.

### Changed / retired
- HERO_FOLLOWS_NAV -> HERO_OPENS_PAGE; FAQ_PRECEDES_DEMO_FORM + DEMO_FORM_PRECEDES_FOOTER -> DEMO_FORM_PLACEMENT
  (the FAQ precedes other blocks on subpages, so the constraint moved to conversion.demo-form).
- `noScrollFadeIns` is now false site-wide (true for the homepage only).
- Banned terms gain 'Microsoft' and 'Vista Air' (found in the clone's own source copy; see EVIDENCE.md).

### Known gaps
- Templates without a bundled example (1): lms-integrations. They are covered by the synthesised per-template
  control. lms-integrations: its integration names are generated syllables in IntegrationFilter.jsx, not literal
  src copy, so the word-level provenance check (rightly) refuses them.
- Responsive `changes` text on new sections is auto-derived (base -> breakpoint class chains), not hand-written.
- Source copy that named real products/companies (Microsoft Teams, Vista Air, Workday, OneDrive, LinkedIn) was
  replaced in the clone by commit 1b3b419; the names stay banned. The lms, nova and lms-corporate examples were
  built from the corrected copy.

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
