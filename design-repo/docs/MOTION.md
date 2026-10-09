# Motion inventory

Machine-readable source: `tokens/00-foundation/motion.json`. Each value below is
cited to the code that implements it. The `motion` ledger group in
`extraction/measured-values.json` stores those values as keywords that must
occur in the cited lines, so each `verify_all.py` run re-greps them against the
current source.

**Sections do not fade in on scroll.** The closed pattern enum has no generic
reveal pattern. The only load animation is the hero reveal, and the only
scroll-driven animations are the statement zoom and the quote highlight.

**Reduced motion:** neither the original nor the clone implements it (see
`docs/CONSTRAINTS.md` §6). The fallbacks below are requirements for generated
pages. They do not describe the source.

| pattern | used by | values | fallback |
|---|---|---|---|
| `button.letterRollUp` (primitive) | every Button | SplitText chars, y 0 → −1.5em, 0.45s, stagger `{amount: .25}`, power4.inOut; mouseenter plays, mouseleave reverses; bg 240ms ease | — |
| `nav.hoverMenus` | shell.nav | dropdowns toggle instantly, 300ms hover-out close delay; item hover 320ms, dropdown item 360ms; AI link bg 250ms / width 500ms; mobile menu 650ms outQuart in, 350ms out, unmount at 400ms | instant-toggle |
| `hero.loadReveal` | hero.split-visual | avatar 500ms; h1 1250ms; subtitle and badges 1250ms +250ms; buttons 1250ms +350ms; opacity/y/scale/skewX/blur; GSAP power3.out (= IX2 outQuart); hero image not animated | instant-final-state |
| `tabs.crossFade` | product.feature-tabs | opacity + visibility .3s ease, click only, no autoplay | instant-toggle |
| `carousel.dragLoop` | product.assistant-tabs | loop, 800ms ease, tab click or drag, threshold 5px, **no autoplay** | instant-slide-change |
| `carousel.autoplayOnView` | product.capability-slider | starts once 40% visible (IO 0.4, once) → jump to 0 → play; 3000ms delay after each 800ms transition; active bullet 24 → 48px over 500ms; 3s linear fill; play/pause | autoplay-off-instant-slide-change |
| `scroll.zoomScrub` | story.zoom-statement | scale 2.5, x 23, y −447, opacity 0 → identity; ScrollTrigger `top 55%` → `top 5%`, scrub 0.9, ease none | instant-final-state |
| `scroll.charColorScrub` | story.scroll-quote | SplitText chars #1a1a1a → #fff, 1.5s each, stagger `{amount: 10}`, power4.inOut; `clamp(top 500)` → `clamp(bottom 500)`, scrub 0.8 | instant-final-state |
| `carousel.centeredAutoplay` | proof.case-study-carousel | autoplay 4000ms, pauses on pointerenter (mouse only) and resumes with the time left; centre scale 1.1 / opacity 1, sides .95 / .2 over 300ms; active bullet 40px (300ms), 4s fill, bullets not clickable; threshold 10px | autoplay-off-instant-slide-change |
| `accordion.faq` | conversion.faq | open 450ms outQuart, close 650ms outQuart (grid-rows, opacity, scaleY .7); icon 45° → 0° over 150ms inOutQuart | instant-toggle |
| `footer.dropup` | shell.footer | chevron 0 → 180° over 300ms ease; link hover 240ms; header hover 200ms (≥1440 only) | instant-toggle |
| `none` | proof.logo-row, proof.results-stats, proof.testimonial, story.brand-video, conversion.demo-form | — | none |

Drag/swipe (`src/hooks/useLoopCarousel.js`) follows Swiper-like rules:
- Threshold: 5px, or 10px on the highlight carousel.
- Touch angle: 45°. A steeper gesture scrolls the page instead.
- A short swipe (under 300ms) always advances.
- A long swipe advances only past 0.5 of a step.
- Release uses an 800ms ease transition.
- The click after a drag is swallowed.

Easing ids: `outQuart` and `inOutQuart` are the CSS cubic-bezier fallbacks with
`linear()` quartic curves. `power3.out` and `power4.inOut` are GSAP eases. `ease`
and `linear` are CSS. `none` is a GSAP scrub. `tailwind-default`
(cubic-bezier(.4,0,.2,1)) appears where the clone sets a duration class but no
ease class: nav item hovers and footer link hovers. See `docs/EVIDENCE.md`.

A PageSpec node may optionally declare `trigger`, `durationMs`, `delayMs` and
`easing`. Each must be a value **measured for that node's own pattern**
(`MOTION_VALUES_MATCH_PATTERN`). A value measured for a different pattern is
rejected.
