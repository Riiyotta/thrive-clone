# Evidence

## Sources, in order of authority

1. **The clone's code**: `src/**/*.jsx`, `src/hooks/useLoopCarousel.js`,
   `src/lib/gsap.js`, `src/index.css`, `tailwind.config.js`, `index.html`. This
   is what a generated page reproduces.
2. **The pixel-audit dumps**: external, under
   `../website-builder/.playwright-mcp/thrive-audit/` relative to the source
   project. These were measured against the live original after the build and
   corrected the recon spec in several places. They are cited as `audit:<file>`
   in the ledger and degrade to a warning when absent.
3. **The IA**: `ia.json` at the project root (33 templates, 58 routes, 96 sections).
   Template ids/orders/routes and section ids, categories and `implementedBy` here are aligned to it.
   `verify_all.py::check_ia_alignment` re-checks this.
4. **`CLONE_SPEC.md`**: the recon spec, measured on the live original. It is a
   strong first draft but was wrong in the places listed below. Sections cite it
   as `specMeasuredFrom`, and the code wins wherever the two disagree.
5. **`asset-manifest.json`**: the original's CDN URLs, cited only to show where
   the product videos and embeds live. None of them is used.
6. **The page files** (`src/pages/**`, 2.0.0): the authoritative source for every
   template's composition, parsed with babel when building and re-read by
   `verify_all.py::check_template_composition` on every run. `CLONE_SPEC_PAGES.md`
   and `pages-manifest.json` (recon of the live subpages) were a first draft; see the
   2.0.0 table below. The session audit dumps of the subpage families were not cited
   (session-scoped scratch paths cannot be referenced portably from this repo).

Evidence levels: `home` is **measured** (code, the 1440/390 audit and the spec
agree on the 15-section sequence). The 32 subpage templates are **code-derived**
(`templates.json` → `evidenceLevel`): their compositions come from the page files,
cross-read against the recon of the live pages.

## Where CLONE_SPEC.md is wrong against the code and the audit

Each item is cited in `extraction/measured-values.json` (group `correction`).

| # | spec says | reality | evidence |
|---|---|---|---|
| 1 | Hero section has padding-top 64 to clear the nav | The **page wrapper** also has `pt-[64px]`, so the hero section itself starts at y=64 | `src/App.jsx` wrapper; audit `top=64` (orig and clone, 1440) |
| 2 | (silent) | **Every H2 has margin-top 4px** | `src/index.css` `.heading-h2`; audit `orig-tree1.txt` `mt=4px` |
| 3 | margin-bottom 20 on a few paragraphs only | **Most paragraphs** carry margin-bottom 20px | audit `orig-tree1.txt` (`mb=20px` on 9× text-color-grey, 11× subdued, ...) |
| 4 | §6/§14: 3-col slider "section padding 0" on mobile | Only the **bottom** padding goes to 0; **top stays 32** (`pt-[32px] mob:pb-0`) | audit `orig390.txt`: H2 at y=36 (32 + 4) |
| 5 | §5a: assistant header margin "56 at ≤767" | **64 at 390** (no override in code) | audit `orig390.txt` H2 at y=68 (64 + 4); `orig-tree390.txt` `margin-huge mt=64px` |
| 6 | §3: logo strip 337 tall at 390 | **Agrees.** It was in the correction list, but the current spec already says 337 | audit orig 337 / clone 337 |
| 7 | §9 base colour `#1a1a1a` vs §13.6 `hsl(0 0% 8.73%)` (#161616) | The spec contradicts itself. The code uses `text-surface-3` (#1a1a1a) as the base | `QuoteHighlight.jsx` |
| 8 | §1: dropdown panel sits under "padding-top 16" | The code uses `pt-[8px]`, which puts the panel top at the spec's own measured y≈78 | `Nav.jsx` |
| 9 | §7: results header "padding-top 32" | The code uses `pt-[40px] pb-[40px]`. The audited clone matches the original's section height (1143 at 1440) | `Results.jsx`; audit |
| 10 | §4 mobile: "padding-top 32 (≤479)" | The code sets **padding-bottom** back to 32 at ≤479 (`py-[32px] mob:pb-0 xs:pb-[32px]`). Top was already 32 | `ProductTabs.jsx` |
| 11 | §11: video sub-paragraph margin-bottom 20 | `mb-0`, `44px` at ≥1440 (margins collapse differently in block vs flex layout; see the code comment) | `VideoSection.jsx` |

## Known clone-versus-original deviations (recorded, not fixed here)

These were left in the source on purpose. This repo is read-only against `src/`.

- Nav item and footer link hovers use Tailwind's default timing function
  (`cubic-bezier(.4,0,.2,1)`) because no ease class is set. The original's CSS
  transitions use the browser default `ease`. The durations match.
- The logo strip's order differs from the spec's listed order. This does not
  matter here, because generated pages render neutral logo slots.
- The hero avatar strip is three neutral CSS circles. The original was a
  headshot image, which is banned (`photo.person`).

## What could not be measured

- The HubSpot form internals (cross-origin iframe).
- The YouTube player chrome.
- Webflow A/B variants: only the default variant was measured.

## 2.0.0: recon (pages-manifest.json / CLONE_SPEC_PAGES.md) vs the real page files

The 32-template recon of the live site was used as a first draft only. Templates
were re-derived from what each page component actually renders
(`src/pages/**`, parsed with babel; `verify_all.py::check_template_composition`
re-reads them on every run). Where the two disagree, the page files win:

| Route(s) | Recon says | The code renders |
|---|---|---|
| `/nova` | ends at split-tabs | split-tabs, **then** the vendor comparison table, an autotabs-group (platform), a video section and the FAQ, plus an inline centred demo button between the feature tabs and the quote |
| `/pricing` | reviews-grid only | reviews-grid with a **VideoSection nested inside it** (children), modelled as `proof.reviews-grid.video` |
| `/lms/corporate-lms`, `/lms/enterprise` (×2) | kiki-autotabs (shared KikiTabs) | page-local `src/pages/platform/SplitAutotabs.jsx` → `product.split-autotabs` |
| `/whats-included` | kiki-autotabs + results | page-local `IncludedTabs.jsx` → `product.included-tabs`; page-local `ProofResults.jsx` |
| `/company` | results ×2 | page-local `StatsResults.jsx` (count-up, `proof.stats-countup`) and `ProofResults.jsx` (`proof.results-proof`) |
| `/case-studies/lms` | results (shared Results) | page-local `CaseStudiesLms.jsx > CaseStudyResults` → `proof.case-results` |
| `/content/sector-suites` | topics-grid | `GridSplitLegacy` variant `suites` (a choice slot in `content-catalogue`) |
| `/company` | layout2-hero (as a hero) | the layout2 media card renders mid-page as an H2 block before the FAQ → `SECONDARY_HERO_USES` |
| `/lms/small-business`, `/lms/enterprise`, `/lms` | quotes folded into results | a separate centred quote block (`CentredQuote.jsx`; `/lms` has an inline copy, `Lms.jsx > FinalQuote`) → `proof.centred-quote` |
| `/lms/features/*` | one sequence | `video` only on 6 of 17 routes; `employee-experience` and `communication` render CMS empty states for the FAQ and the explore slider (choice slots) |
| case-study-content | "stat counters" | a y/opacity scroll reveal (1000ms, delays 250/200ms), no counting |
| case-study-platform | 3s icon bob | no such animation in the code |
| spring-release, mentoring | WowCard image reveal | not reproduced (the IX2 target is not inside those cards on the original) |
| small-business hero | ThriveGo header scroll reveal | rendered as the static end state |
| reviews-slider | 25 pages | 24 routes |
| events-webinars | events filter | the filter UI is hidden on the original; renders as a plain archive grid (`index.events-past`) |

### Source copy flagged during the expansion

- Real product/company names in the clone's own copy (Microsoft Teams in IntegrationsVisual's mid-market body,
  "Vista Air" in TestimonialQuote's autotabs preset, Workday / OneDrive / LinkedIn Learning in CsPlatformBody's
  integration tags, LinkedIn in WebinarsUpcoming) were reported and replaced in source by commit 1b3b419. They
  remain banned terms (`assets/asset-roles.json` -> `bannedTerms`).
- The default slides of `CaseStudyCarousel` (used unchanged on `/lms/solutions`, `/company`,
  `/company/why-nimbus`, `/contact-us`) and of `ReviewsGrid`'s logo grid still load files from
  `public/assets/` (the user's reference copies of the original's imagery). The contracts expose those
  slots only as pinned `must-not-reuse` roles, so generated pages never reproduce them.
