# Hard constraints

These are load-bearing. Each one is enforced by a machine check, named below,
and each check is proven to reject a violation (`schema/tests/adversarial_test.py`,
`extraction/verify_all.py --prove-drift`).

## 1. This is a single-route, single-template repo

The source app (`src/App.jsx`) has no router. It renders one page, `/`, from 13
component files that produce the 15 sections listed in the project's IA
(`ia.json` → `template.home`). So there is **one template (`home`) and one route
(`/`)**. No other template or route was measured, and none may be invented.

- The schema's `template` enum is `["home"]`.
- A PageSpec may target another path (a generated page has to live somewhere),
  but `TEMPLATE_ROUTE_MEASURED` **flags** it as a warning, because only `/` was
  measured.
- `verify_all.py::check_ia_alignment` re-checks section ids, order, categories
  and `implementedBy` against `ia.json` whenever it is present.

## 2. Copy is the clone's own placeholder copy, never the original's

The source is **thrivelearning.com, a real, live company's site**. The clone
deliberately replaces every piece of text with original placeholder copy: brand
**"Nimbus"**, AI assistant **"Nova"**, placeholder customers ("Northwind",
"Brightway", "Customer one" ...).

- `schema/example.pagespec.json` uses only copy from the clone's `src/`. It was
  not taken from the saved HTML page, from quotes in `CLONE_SPEC.md`, or from
  the live site. `verify_all.py::check_example_provenance` checks that every
  word of the example's copy occurs in `src/`.
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

## 4. The footer demo form is a static placeholder

The original footer embeds a cross-origin HubSpot form. Its internals could not
be measured (`CLONE_SPEC.md` §16). The clone renders a static 300px stand-in:
inputs and submit are disabled, `onSubmit` calls `preventDefault`, and there is
**no endpoint and no network request**.

- `conversion.demo-form.form.live` is `const false` in the schema.
- `DEMO_FORM_STAYS_STATIC` rejects `action`, `endpoint`, `method`, `portalId`,
  `formId`, `hubspot`, `onSubmit` and `submitUrl` anywhere in a PageSpec.

The product video works the same way. The original's YouTube/embedly iframe is
not reproduced, and `VIDEO_STAYS_PLACEHOLDER` rejects any embed field.

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
