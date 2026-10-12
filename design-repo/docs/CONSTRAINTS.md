# Hard constraints

These are load-bearing. Each one is enforced by a machine check, named below,
and each check is proven to reject a violation (`schema/tests/adversarial_test.py`,
`extraction/verify_all.py --prove-drift`).

## 1. Only the real routes and templates exist

The clone mounts **58 routes**: `/` (`src/pages/Home.jsx`) and the 57 paths in
`src/routes.js`, each resolved through `src/pages/registry.js` (every family's
`index.js` exports a `pages` map). They group into one template per distinct page
shape (`templates/templates.json`); every route is assigned exactly once.
`src/pages/__preview-*` register extra `/__preview/*` paths used during the build;
they are **not** site routes and are deliberately excluded.

- The schema's `template` enum lists exactly the real templates.
- A PageSpec may target another path (a generated page has to live somewhere),
  but `TEMPLATE_ROUTE_MEASURED` **flags** it.
- `verify_all.py::check_route_source` re-reads `src/routes.js` and fails if a
  route is missing or invented; `check_template_composition` re-reads every page
  component and fails if its rendered section tags drift from the template.
- `verify_all.py::check_ia_alignment` re-checks every template's node order and
  routes, and every section's category and `implementedBy`, against `ia.json`.

## 2. Copy is the clone's own placeholder copy, never the original's

The source is **thrivelearning.com, a real, live company's site**. The clone
deliberately replaces every piece of text with original placeholder copy: brand
**"Nimbus"**, AI assistant **"Nova"**, placeholder customers ("Northwind",
"Brightway", "Customer one" ...).

- Every example (`schema/example.pagespec.json` and `schema/examples/*`) uses
  only copy from the clone's `src/` (component defaults, page props, data files;
  computed filler evaluated with node). None of it was taken from the saved HTML
  page, from `CLONE_SPEC*.md`/`pages-manifest.json`, or from the live site.
  `verify_all.py::check_example_provenance` checks every word of every example.
- Every `maxWords` budget was derived from the clone's own copy
  (`measuredLongestRealInstance` records that count on every field).
- `ORIGINAL_COPY_AND_MARKS_FORBIDDEN` rejects any PageSpec string containing the
  original brand or assistant name, or a real third-party name visible in the
  reference imagery or recon. The full list is in
  `assets/asset-roles.json` → `sourceIsARealCompany.bannedTerms`.
- Ledger keywords in `extraction/measured-values.json` are code/measurement
  tokens only, never original copy.

## 3. Real third-party imagery: never reused, never fabricated

The source project's `public/assets/` holds **56 images the user copied from
their own saved page of the original site, for local reference only**. They
include real customer logos (Volvo, Burger King, Vodafone, British Airways,
Krispy Kreme ...), real product screenshots, a real named person's photo
(`testimonial-avatar.png`), G2/Capterra/Software Advice review badges, award
shields, event photography and AI-vendor logos.

- **No image is copied into `design-repo/`.** `verify_all.py::check_no_images`
  fails the run if any image or video file appears in the tree.
- Media fields are objects with a closed `assetRole`. The roles were derived
  from the real `src=` usage sites in `src/` (each role lists its `usageSites`).
  Each field accepts only its own roles.
- Every role backed by real third-party, brand or person imagery is **pinned**
  to `must-not-reuse` or `must-not-fabricate`:

  | role | pinned policy |
  |---|---|
  | `logo.customer` | must-not-reuse |
  | `logo.aiVendor` | must-not-reuse |
  | `photo.event` | must-not-reuse |
  | `photo.brand` | must-not-reuse |
  | `product.screenshot` | must-not-reuse |
  | `product.video` | must-not-reuse |
  | `badge.review` | must-not-fabricate |
  | `badge.award` | must-not-fabricate |
  | `photo.person` | must-not-fabricate |

  `verify_all.py::check_pinned_asset_policies` enforces the **exact** value, not
  just membership in the enum. It is proven by switching a role to a
  different-but-valid member (e.g. `logo.customer` → `may-generate-new`).
- Protected roles render as a neutral placeholder (`primitive.placeholder-media`
  / `primitive.logo-placeholder`) and accept **no `assetRef`**
  (`ASSET_REF_FORBIDDEN_FOR_PROTECTED_ROLE`). The schema pattern only allows
  `generated/...` refs, so a `/assets/` path, `public/assets/` path or URL can
  never validate (`NO_SOURCE_OR_EXTERNAL_ASSET_PATHS` backs this up).
- Only `placeholder.neutral` is `may-generate-new`.
- `verify_all.py::check_asset_coverage` checks that each of the 56 reference
  files is claimed by a banned role or listed as unreferenced, so nothing slips
  through unclassified.

## 4. Every form is a static placeholder

The original embeds cross-origin HubSpot forms (footer demo form on `/` and
`/company`, the demo-hero form on `/lms/demo-platform`, the contact form) and
Finsweet/Webflow subscribe and sign-up forms. Their internals could not be
measured. The clone renders static stand-ins: inputs disabled or inert, submit
prevented, **no endpoint and no network request**.

- Every form object in a contract carries `live: const false`.
- `DEMO_FORM_STAYS_STATIC` rejects any `live` that is not false, and `action`,
  `endpoint`, `method`, `portalId`, `formId`, `hubspot`, `onSubmit` or
  `submitUrl` anywhere in a PageSpec.

Videos work the same way: no YouTube/embedly iframe is reproduced, and
`VIDEO_STAYS_PLACEHOLDER` rejects any embed field.

## 4b. Stock photography is licensed, not reference material

`public/stock/` holds 91 Unsplash-licensed photos (credited in
`public/stock/CREDITS.md`). `src/components/shared/Placeholder.jsx` paints a
label-based default into empty labelled slots and marks each eligible slot
`data-stock-slot`; `src/components/Layout.jsx` then applies the per-route picks in
`src/stock/stockMap.js` (`STOCK_MAP`, `SQUARE_IDS`) through a MutationObserver
(background-image only; geometry unchanged). `verify_all.py::check_asset_coverage`
checks that every picked id exists in `public/stock/`. They are not copies of the original site. Role `stock.photo`
is pinned to `may-reuse-licensed`: a generator may reference one as
`stock/<id>.jpg`, swap in another freely licensed image, or generate a new one.
It is allowed only on fields that also accept scene/product/brand imagery or are
purely decorative. It is never allowed on logo, badge, award or AI-vendor fields
(the clone's `NO_STOCK` list), and **never on person fields**. The clone also
paints square stock crops into avatar slots, but a stock face beside a fictional
testimonial would fabricate a real person's endorsement, so `photo.person` stays
`must-not-fabricate`. `STOCK_REF_ONLY_FOR_STOCK_ROLE` rejects a `stock/` ref on
any other role.

## 5. Not for publication

This design-repo must not be published, and the repository must not be made
public. `registry.manifest.json` has `productionApproved: false` and
`approvalFlags.publishApproved: false`.

## 6. Reduced motion: required of generated pages, absent from the source

Neither the original site nor the clone has any `prefers-reduced-motion`
handling. A grep of `src/`, `index.html` and `tailwind.config.js` finds none.
The schema still **requires** a `reducedMotionFallback` on every node, and
locks it per section, so that generated pages get one. Every contract records
`sourceImplementsReducedMotion: false`. This repo does not claim the source
implements it.
