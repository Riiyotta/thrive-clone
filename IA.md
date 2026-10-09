# Local clone of https://www.thrivelearning.com/ homepage (src/App.jsx)

Source: Local clone of https://www.thrivelearning.com/ homepage (src/App.jsx)
Status: **measured-from-codebase** · production approved: **false**
1 routes · 1 templates · 15 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 1 template (Homepage) accounts for 1 of 1 routes (100%). The remaining 0 routes span 0 templates.

| template | routes | share |
|---|---:|---:|
| Homepage | 1 | 100% |

## Page chrome

**1 routes carry chrome = `full`** — Homepage.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.nav` | SHELL | 1 | 1 | `src/components/Nav.jsx` | Present on the 1 route. |
| `hero.split-visual` | HERO | 1 | 1 | `src/components/Hero.jsx` | Opens the 1 route. |
| `proof.logo-row` | PROOF | 1 | 1 | `src/components/LogoStrip.jsx` | Directly under the hero on the 1 route. |
| `product.feature-tabs` | PRODUCT | 1 | 1 | `src/components/ProductTabs.jsx` | On the 1 route. |
| `product.assistant-tabs` | PRODUCT | 1 | 1 | `src/components/KikiTabs.jsx` | On the 1 route. |
| `product.capability-slider` | PRODUCT | 1 | 1 | `src/components/EnterpriseSlider.jsx` | On the 1 route. |
| `proof.results-stats` | PROOF | 1 | 1 | `src/components/Results.jsx` | On the 1 route, immediately followed by proof.testimonial in the same container. |
| `proof.testimonial` | PROOF | 1 | 1 | `src/components/Results.jsx` | On the 1 route. |
| `story.zoom-statement` | STORY | 1 | 1 | `src/components/Statement.jsx` | On the 1 route. |
| `story.scroll-quote` | STORY | 1 | 1 | `src/components/QuoteHighlight.jsx` | On the 1 route. |
| `proof.case-study-carousel` | PROOF | 1 | 1 | `src/components/CaseStudyCarousel.jsx` | On the 1 route. |
| `story.brand-video` | STORY | 1 | 1 | `src/components/VideoSection.jsx` | On the 1 route. |
| `conversion.faq` | CONVERSION | 1 | 1 | `src/components/Faq.jsx` | On the 1 route. |
| `conversion.demo-form` | CONVERSION | 1 | 1 | `src/components/Footer.jsx` | Opens the footer on the 1 route. |
| `shell.footer` | SHELL | 1 | 1 | `src/components/Footer.jsx` | Closes the 1 route. |

**0 shared sections** appear in more than one template and belong in a component library.

**15 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | page-local |
| 2 | HERO | `hero.split-visual` | page-local |
| 3 | PROOF | `proof.logo-row` | page-local |
| 4 | PRODUCT | `product.feature-tabs` | page-local |
| 5 | PRODUCT | `product.assistant-tabs` | page-local |
| 6 | PRODUCT | `product.capability-slider` | page-local |
| 7 | PROOF | `proof.results-stats` | page-local |
| 8 | PROOF | `proof.testimonial` | page-local |
| 9 | STORY | `story.zoom-statement` | page-local |
| 10 | STORY | `story.scroll-quote` | page-local |
| 11 | PROOF | `proof.case-study-carousel` | page-local |
| 12 | STORY | `story.brand-video` | page-local |
| 13 | CONVERSION | `conversion.faq` | page-local |
| 14 | CONVERSION | `conversion.demo-form` | page-local |
| 15 | SHELL | `shell.footer` | page-local |

## Section reference

### SHELL

_Site chrome present on every route: fixed navigation and footer._

**`shell.nav`** — Fixed, transparent top bar: wordmark, centred pill of hover-open dropdown menus (300ms close delay), AI 'Ask' link, primary 'Book a demo' button; collapses to a full-screen menu at <=991px.

· Present on the 1 route. · appears on 1 routes · implemented by `src/components/Nav.jsx`

**`shell.footer`** — Dark rounded footer card: 'ask an AI' icon row, wordmark + socials, four link columns, rating and award badges, compliance line and legal drop-up menus.

· Closes the 1 route. · appears on 1 routes · implemented by `src/components/Footer.jsx`

### HERO

_Page-opening, above-the-fold block._

**`hero.split-visual`** — Two-column hero: avatar row + trust line, serif H1, subtitle, three review badges, primary + dark buttons on the left; a 1440:1089 product collage bleeding past the right viewport edge. Load-time staggered blur/skew reveal.

· Opens the 1 route. · appears on 1 routes · implemented by `src/components/Hero.jsx`

### PROOF

_Social proof: customer logos, outcome stats, testimonials, case studies._

**`proof.logo-row`** — Static (non-scrolling) row of six customer logos under a one-line caption; wraps to a grid on mobile.

· Directly under the hero on the 1 route. · appears on 1 routes · implemented by `src/components/LogoStrip.jsx`

**`proof.results-stats`** — Centred H2 over a 4-column grid of dark stat cards (customer logo, large stat, grey sentence with inline brand link); 2 columns at <=991px, 1 at <=479px.

· On the 1 route, immediately followed by proof.testimonial in the same container. · appears on 1 routes · implemented by `src/components/Results.jsx`

**`proof.testimonial`** — Single large pull quote with 80px avatar, name and role/company line, centred under the stats grid.

· On the 1 route. · appears on 1 routes · implemented by `src/components/Results.jsx`

**`proof.case-study-carousel`** — Header (H2 + button left, paragraph right) over a centred, looping carousel of five case-study cards (photo with brand logo, title, two stats); centre card scaled 1.1, neighbours at 20% opacity; 4s autoplay paused on hover.

· On the 1 route. · appears on 1 routes · implemented by `src/components/CaseStudyCarousel.jsx`

### PRODUCT

_Product explanation modules: feature tabs, AI assistant, capability slider._

**`product.feature-tabs`** — Section H2 plus four click-driven accordion-style tab rows on the left; matching 670:600 product screenshot fades (.3s) in a pane that bleeds off the right edge. No autoplay.

· On the 1 route. · appears on 1 routes · implemented by `src/components/ProductTabs.jsx`

**`product.assistant-tabs`** — AI-assistant intro header followed by five persona tab buttons driving a looping, draggable slide track (800ms ease); each slide pairs title + copy with a square animation slot.

· On the 1 route. · appears on 1 routes · implemented by `src/components/KikiTabs.jsx`

**`product.capability-slider`** — Three-up looping slider of six enterprise capability cards (image + highlighted lead phrase + grey body); autoplays every 3s once 40% visible, with widening progress bullets and a play/pause button.

· On the 1 route. · appears on 1 routes · implemented by `src/components/EnterpriseSlider.jsx`

### STORY

_Editorial brand moments: statement copy, scroll-driven quote, brand video._

**`story.zoom-statement`** — Full-bleed 1440:598 image that scroll-scrubs from 2.5x/transparent to 1x/opaque, followed by a centred serif H2 and multi-line grey statement paragraph.

· On the 1 route. · appears on 1 routes · implemented by `src/components/Statement.jsx`

**`story.scroll-quote`** — Short analyst-style quote whose letters scroll-scrub from near-black to white one by one; the page's only ScrollTrigger-driven text effect.

· On the 1 route. · appears on 1 routes · implemented by `src/components/QuoteHighlight.jsx`

**`story.brand-video`** — H2 and intro paragraph above a 16:9 video slot with play button (static placeholder; the original embeds YouTube), with a closing paragraph below.

· On the 1 route. · appears on 1 routes · implemented by `src/components/VideoSection.jsx`

### CONVERSION

_Blocks whose job is to capture a demo request or answer pre-sale objections._

**`conversion.faq`** — FAQ H2 with five independently toggling accordion items (open 450ms / close 650ms outQuart, plus-icon rotation).

· On the 1 route. · appears on 1 routes · implemented by `src/components/Faq.jsx`

**`conversion.demo-form`** — Demo-request block at the top of the footer: heading and copy beside a 300px form (static placeholder standing in for the original HubSpot embed).

· Opens the footer on the 1 route. · appears on 1 routes · implemented by `src/components/Footer.jsx`
