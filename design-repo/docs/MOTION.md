# Motion inventory

Machine-readable source: `tokens/00-foundation/motion.json` (21 section patterns). Each pattern cites the code
that implements it (`measuredFrom` / `alsoMeasuredFrom`), and the `motion` group of
`extraction/measured-values.json` stores the measured values as keywords that must occur in the cited lines,
so every `verify_all.py` run re-greps them against the current source.

**The homepage has no scroll reveals** (true since 1.0.0). **Subpages do**: the sections listed under
`scroll.revealOnce` animate once when scrolled into view, and `stats.countUp` / `ticker.verticalLoop` start on
viewport entry. A generated page may use a pattern only on a section whose contract allows it
(`MOTION_PATTERN_CLOSED`), with values measured for that pattern (`MOTION_VALUES_MATCH_PATTERN`).

**Reduced motion:** neither the original nor the clone implements it. The fallbacks are requirements for
generated pages, not a description of the source.

| pattern | triggers | values | fallback | used by |
|---|---|---|---|---|
| `accordion.faq` | click | durations 150/450/650ms; delays 0ms; easings outQuart, inOutQuart, cubic-bezier(0.165, 0.84, 0.44, 1), cubic-bezier(0.77, 0, 0.175, 1) | instant-toggle | `conversion.content-pricing`, `conversion.faq` |
| `accordion.legacyHeight` | click | durations 100/200/400ms; easings ease, linear | instant-toggle | `conversion.faq-legacy`, `product.solution-tabs` |
| `carousel.autoplayLoop` | autoplay, click, drag, hover | durations 320/600/800ms; delays 4000ms; easings ease | autoplay-off-instant-slide-change | `proof.reviews-grid`, `proof.reviews-slider` |
| `carousel.autoplayOnView` | viewport-enter, autoplay, click, drag | durations 200/500/800/3000ms; delays 3000ms; easings ease, linear | autoplay-off-instant-slide-change | `product.capability-slider` |
| `carousel.centeredAutoplay` | autoplay, hover, drag | durations 300/800/4000ms; delays 4000ms; easings ease, linear | autoplay-off-instant-slide-change | `proof.case-study-carousel` |
| `carousel.dragLoop` | click, drag, hover | durations 250/300/800ms; delays 0ms; easings ease | instant-slide-change | `product.assistant-tabs`, `product.autotabs-group`, `product.included-tabs`, `product.split-autotabs`, `product.sticky-tabs`, `product.why-assistant-tabs` |
| `carousel.pagedSlide` | click, drag | durations 100/500ms; easings ease | instant-slide-change | `product.card-slider-legacy` |
| `footer.dropup` | click, hover | durations 200/240/300ms; easings ease, tailwind-default | instant-toggle | `shell.footer` |
| `hero.loadReveal` | load | durations 500/850/1250ms; delays 0/250/350ms; easings power3.out | instant-final-state | `hero.mentoring-software`, `hero.split-visual` |
| `marquee.cssLoop` | load | durations 30000ms; easings linear | static-first-frame | `story.marquee` |
| `modal.drawerSlide` | click | durations 500ms; easings ease, cubic-bezier(0.25,0.46,0.45,0.94) | instant-toggle | `hero.pricing-calculator` |
| `nav.hoverMenus` | hover, click | durations 250/320/350/360/500/650ms; delays 300/400ms; easings outQuart, tailwind-default | instant-toggle | `shell.nav` |
| `none` | none | - | none | `article.cs-content-article`, `conversion.contact-form`, `conversion.cta-strip`, `conversion.demo-cta`, `conversion.demo-form`, `conversion.faq-empty`, `conversion.pricing-plans-legacy`, `conversion.why-cta`, `hero.center-legacy`, `hero.company-video`, `hero.demo-form`, `hero.global-header-legacy`, `hero.header-grid-card`, `hero.integrations-header`, `hero.layout2-media`, `hero.logos-overlap`, `hero.platform`, `hero.wow-content`, `index.blog-featured`, `index.blog-filter`, `index.cs-content-list`, `index.cs-content-related`, `index.cs-filter-grid`, `index.events-past`, `index.events-upcoming`, `index.guides`, `index.integration-filter`, `index.topics-grid`, `index.webinars-upcoming`, `product.anchor-intro`, `product.comparison-table`, `product.explore-empty`, `product.feature-bento`, `product.feature-rows-legacy`, `product.features-intro`, `product.grid-cards-legacy`, `product.integrations-visual`, `product.learn-grid`, `product.platform-intro`, `product.release-block`, `product.two-col-features`, `product.wow-bento`, `proof.case-results`, `proof.case-study-video`, `proof.centred-quote`, `proof.logo-row`, `proof.results-proof`, `proof.results-stats`, `proof.testimonial`, `proof.testimonial-card-legacy`, `proof.testimonial-quote`, `story.brand-video`, `story.company-news`, `story.custom-video`, `story.grid-split-legacy`, `story.header-image-legacy`, `story.wow-2col` |
| `scroll.charColorScrub` | scroll-scrub, hover | durations 200/250/350/1500ms; easings power4.inOut, none | instant-final-state | `article.cs-platform-body`, `story.scroll-quote` |
| `scroll.revealOnce` | viewport-enter, hover | durations 200/300/450/500/600/750/1000ms; delays 100/200/250/300/500ms; easings power3.out, ease, power2.out, cubic-bezier(0.86,0,0.07,1), ease-in-out | instant-final-state | `conversion.glossary-cta`, `hero.assistant-video`, `hero.content-overview`, `index.glossary`, `product.two-col-features`, `product.wow-bento`, `proof.cs-content-stats` |
| `scroll.zoomScrub` | scroll-scrub | easings none | instant-final-state | `story.zoom-statement` |
| `stats.countUp` | viewport-enter | durations 1500ms; easings power2.out | instant-final-state | `proof.stats-countup` |
| `sticky.anchorTabs` | click, drag, scroll-scrub | durations 250/800ms; easings ease, easeInOutCubic | instant-slide-change | `product.sticky-tabs` |
| `tabs.crossFade` | click | durations 100/200/300/400ms; delays 0ms; easings ease, ease-in-out | instant-toggle | `hero.pricing-calculator`, `product.assistant-feature-tabs`, `product.feature-tabs`, `product.solution-tabs`, `product.split-tabs`, `product.why-assistant-tabs` |
| `tabs.fadeOutIn` | click, hover | durations 100/200/300/400ms; delays 100/200ms; easings ease | instant-toggle | `product.layout03-tabs`, `product.sector-tabs`, `product.tabs-horizontal-legacy` |
| `ticker.verticalLoop` | viewport-enter, autoplay, click | durations 150/300/450/500/650/850ms; delays 0/250/300/500/1500/2000/4000/6000ms; easings power3.out, cubic-bezier(0.165, 0.84, 0.44, 1), cubic-bezier(0.77, 0, 0.175, 1), ease, cubic-bezier(0.25,0.46,0.45,0.94) | static-first-frame | `conversion.content-pricing`, `hero.pricing-calculator`, `proof.flip-logos` |

Pattern descriptions:

- `accordion.faq`: Each item toggles independently. Open: body grid-rows 0fr->1fr, opacity 0->1, scaleY .7->1 over 450ms outQuart. Close: 650ms outQuart. Icon rotates 45deg->0 over 150ms inOutQuart. CSS transitions with cubic-bezier fallbacks and linear() quartic curves.
- `accordion.legacyHeight`: Legacy FAQ accordion: body height 0 -> measured px -> auto (400ms ease, rAF double-frame), click / second click closes.
- `carousel.autoplayLoop`: useLoopCarousel loop slider that autoplays from mount (initialPlaying; 4000ms delay, pause on mouse enter), 800ms ease slide transition; inactive slides scale .65 / opacity .5, active 1/1 over .6s ease.
- `carousel.autoplayOnView`: Autoplay starts once 40% of the slider container is visible (IntersectionObserver 0.4, once): jump to slide 0, then play. Delay 3000ms after each 800ms ease transition. Active bullet widens 24->48px (500ms ease) while playing; its fill runs bulletProgress 3s linear. Play/pause toggle. Drag threshold 5px.
- `carousel.centeredAutoplay`: Centred loop carousel, autoplay from init with 4000ms delay, pauses while the pointer is over it (mouse only) and resumes with the remaining time. Centre slide scale 1.1 / opacity 1, others .95 / .2 (300ms ease); info panel fades in 300ms; active bullet 40px (300ms) with a 4s linear fill; bullets are not clickable. Drag threshold 10px.
- `carousel.dragLoop`: Swiper-like loop, 1 slide per view, 24px gap, 800ms CSS ease slide transition; tab click goes to slide; drag threshold 5px, 45deg touch angle, short swipe (<300ms) always advances, long swipe advances past 50% of a step. NO autoplay.
- `carousel.pagedSlide`: Webflow w-slider: slides grouped into pages; arrows, dots or a >30px swipe move one page over 500ms ease; no loop, no autoplay.
- `footer.dropup`: Legal drop-ups open upward on click (inline at <=767); chevron rotates 0->180deg over 300ms ease. Link/social hover colour 240ms; column-header hover 200ms (>=1440 only).
- `hero.loadReveal`: On load: avatar row (500ms), h1 (1250ms), subtitle and badges (1250ms, +250ms), buttons (1250ms, +350ms) from opacity 0 / y 40|10 / scale .9 / skewX 10|8 / blur 20|8|5px to rest. GSAP power3.out (= IX2 outQuart). Initial states set in a layout effect before first paint. The hero image is NOT animated.
- `marquee.cssLoop`: CSS keyframes translateX(0 -> -50%) (reverse rows -50% -> 0), 30s linear infinite, track holds the items twice; edge fade mask.
- `modal.drawerSlide`: Click opens a right-hand drawer: overlay opacity 0 -> 1 (500ms ease) and the panel slides in from x 100% (500ms outQuad); close reverses.
- `nav.hoverMenus`: Desktop dropdowns open instantly on hover and close 300ms after pointer-leave (no tween). Top-level item hover bg 320ms, dropdown item hover 360ms, AI link bg 250ms / width 500ms. Mobile menu (<=991): opacity 0->1 + translateY 20->0 over 650ms outQuart in; close to opacity 0 / y 10 over 350ms, unmounted after 400ms.
- `none`: No section-level motion. Hover colour transitions on buttons/links and the button letter roll-up are primitive behaviour, not section motion.
- `scroll.charColorScrub`: SplitText chars on the quote tween colour from the base #1a1a1a (surface-3) to #fff: 1.5s per char, stagger {amount: 10}, power4.inOut, ScrollTrigger start clamp(top 500) / end clamp(bottom 500), scrub 0.8.
- `scroll.revealOnce`: GSAP fromTo/to started once when the block scrolls into view (ScrollTrigger once / start 'top bottom' or 'top 85%'): opacity 0 -> 1 with a y/x offset and sometimes a blur, power3.out (IX2 outQuart) or power2.out. Subpage-only: the homepage has no scroll reveals.
- `scroll.zoomScrub`: GSAP ScrollTrigger scrub 0.9 on the statement visual: scale 2.5 / x 23 / y -447 / opacity 0 -> identity / opacity 1, start 'top 55%', end 'top 5%', ease none, origin centre.
- `stats.countUp`: Numbers tween from 0 to their value (GSAP, power2.out) once the block is observed in view (IntersectionObserver).
- `sticky.anchorTabs`: Sticky anchor bar (sticky top 0) whose links smooth-scroll (rAF) to stacked autotab panels; each panel is a useLoopCarousel drag/tab loop (800ms ease).
- `tabs.crossFade`: Click-driven pane + copy cross-fade: opacity and visibility .3s ease. No autoplay.
- `tabs.fadeOutIn`: Webflow-tabs behaviour: click a tab, the old pane fades out (data-duration-out) then the new pane fades in (data-duration-in), ease.
- `ticker.verticalLoop`: Infinite GSAP timeline (repeat -1) stepping a masked vertical track one row at a time (850ms power3.out between waits), started when the block enters the viewport.

Primitive: `button.letterRollUp` (every Button): SplitText chars y 0 -> -1.5em, 0.45s, stagger `{amount: .25}`,
power4.inOut; background 240ms ease (`primitivePatterns`).

Drag/swipe (`src/hooks/useLoopCarousel.js`) follows Swiper-like rules: threshold 5px (10px on the highlight
carousel), 45deg touch angle, a short swipe (<300ms) always advances, a long one only past half a step, release
uses an 800ms ease transition, and the click after a drag is swallowed.
