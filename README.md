# Thrive homepage clone (local design study)

A Vite + React 18 + Tailwind v3 + GSAP rebuild of the https://www.thrivelearning.com/
homepage's layout, typography and motion. Not affiliated with Thrive. Copy is
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

What the data shows:

- **One route, one template.** The clone is the homepage only (`/`); nav and
  footer links are `#` stubs. All 15 sections are single-use, so the IA's
  section-reuse table has nothing to share at the section level.
- **Reuse lives one layer down.** 13 component files render the 15 sections
  (`Results.jsx` renders stats + testimonial; `Footer.jsx` renders the demo
  form + footer). The shared pieces are primitives: `Button` (8 sections),
  `Placeholder` (11), `useLoopCarousel` (3 carousels), `Pagination` (2),
  `Wordmark` (nav + footer).
- **Proof dominates the page**: 4 of 15 sections are PROOF (logos, stats,
  testimonial, case studies), versus 3 PRODUCT and 3 STORY.

Other docs: `CLONE_SPEC.md` (recon measurements of the original),
`asset-manifest.json` (original asset inventory), `design-repo/` (AI-ready
design contracts, when built).
