# Thrive homepage clone (local design study)

A Vite + React 18 + Tailwind v3 + GSAP rebuild of the https://www.thrivelearning.com/
homepage and its 57 nav pages (layout, typography and motion). Not affiliated with Thrive. Copy is
original placeholder text (brand "Nimbus", assistant "Nova"); `public/assets/`
holds images copied from a locally saved page of the original for reference only.

```bash
npm install
npm run dev   # http://localhost:5173
```

## Information architecture

`ia.json` is the only IA file to hand-edit. `IA.md` and `matrix.csv` are
generated from it — don't edit them. After changing `ia.json`:

```bash
node validate.mjs && node build.mjs
```

The IA was re-derived (2.0.0) from what each page component actually renders
(`src/pages/**`); `pages-manifest.json` / `CLONE_SPEC_PAGES.md` were only a
first draft (see `design-repo/docs/EVIDENCE.md` for where they disagree with the
code). `src/pages/__preview-*` are build-time preview routes and are excluded.

What the data shows (`node validate.mjs`: 58 routes, 33 templates, 0 hard failures):

- **Half the site is four data-driven templates.** 29 of 58 routes come from
  `feature-detail` (17), `case-study-platform` (5), `case-study-content` (5) and
  `content-catalogue` (2); the other 29 routes are one-off templates.
- **94 sections: 41 shared across templates, 53 page-local.** Beyond the chrome
  (nav + footer on all 58 routes, the subpage demo CTA on 56), the most reused
  blocks are the FAQ (36 routes), the logo row (29), the reviews slider (24) and
  the CTA strip (22). `hero.wow-content` opens 10 one-off templates through 10
  variants of one component.
- **Product explanation dominates**: 28 PRODUCT sections versus 15 HERO, 15 PROOF,
  12 INDEX, 11 CONVERSION, 9 STORY, 2 ARTICLE, 2 SHELL. Many PRODUCT blocks are
  tab/slider variants of the same few interaction patterns (`docs/MOTION.md`).
- **Two footers**: 2 routes (`/`, `/company`) carry the demo-form footer, 56 the
  CTA-button footer (`chrome` partition).
- `node validate.mjs`'s "N templates" reuse column counts *occurrences*, so a
  section repeated on one page (the 4 wow2col/marquee pairs on `/mentoring`, the
  3 testimonial quotes on `/lms`) shows more templates than routes.

Other docs: `CLONE_SPEC.md` (recon measurements of the original),
`asset-manifest.json` (original asset inventory), `design-repo/` (AI-ready
design contracts, when built).
