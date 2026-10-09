Source: https://www.thrivelearning.com/

# Thrive homepage clone spec (route `/`)

Measured live with Playwright on 2026-10-09 at 1440x900, 1280x800 and 390x844. Computed values come from `getComputedStyle` / `getBoundingClientRect`. Motion comes from the live Webflow IX2 config, the IX3 (GSAP) config, the inline custom scripts, and live Swiper/ScrollTrigger instances. Webflow class names are given in `code` so you can check them against `Thrive_files/thrive-new-site.webflow.shared.f199e606e.min.css`. Asset URLs are in `asset-manifest.json` next to this file.

Third-party overlays are NOT part of the clone: HubSpot cookie banner, Pathmonk "Meet Thrive" video popup, HubSpot chat, Warmly, and intellimize/VWO A/B variants. Hidden Webflow variants (`w-optimization` with `display:none`, `.wowsection_right-visual.hide`, `.wowoh-hero_base`) are also excluded.

---

## 0. Global tokens

### 0.1 Fonts (load from Google Fonts)
| Site family | Use | Google Fonts equivalent | Weights the site actually loads |
|---|---|---|---|
| `"Inter 24 Pt", Arial, sans-serif` | body, UI, buttons, stats, quotes | **Inter** (set `font-variation-settings:"opsz" 24` or load the `opsz` axis; the site uses the Inter 24pt optical cut) | 400, 500 |
| `Instrumentserif, Georgia, sans-serif` | H1, all H2s | **Instrument Serif** | 400 normal, 400 italic |

- The CSS asks for weight **600** (`.results_number`, `.text-weight-semibold`, `.text-span-bold`, `.newnav_menu-header`), but no 600 face is loaded, so the browser renders a synthetic bold from Inter 500. For the closest match, load Inter 600 and accept a slightly crisper result.
- H2s are declared `font-weight:500`, but Instrument Serif only has 400, so they render at 400. Use 400.
- Source Sans 3 and Source Serif 4 are declared via @font-face but **not used on the homepage**. You don't need to load them for this route.
- Root `html` font-size is 16px. `body` is 18px / line-height 1.4 (25.2px) / weight 400 / color `#f5f6ff` / background `#000`. At ≤479px, body computes to 17.6px / 24.64px.

### 0.2 Color tokens (measured)
| Token | Value | Where |
|---|---|---|
| page bg | `#000000` | body, `.page-wrapper`, footer |
| text primary | `#f5f6ff` (rgb 245,246,255) | all headings, white text, primary button bg |
| text grey | `#a4a4a4` | paragraphs `.text-color-grey`, subdued text, footer links |
| surface-1 | `#0b0b0b` | cards (results, FAQ, autotab slides, footer card), swiper pagination pill, primary button text |
| surface-2 | `#131313` | nav pill, nav dropdown panel, case-study stat blocks |
| surface-3 | `#1a1a1a` | dark button variant, active Kiki tab, tab dividers (1px), scroll-highlight base text |
| hover surface | `#262626` | nav link/dropdown hover, dropdown item hover, social icon hover |
| bullet track | `#222222` | swiper bullets |
| play/pause btn | `#111111` | swiper play/pause button |
| accent green | `#1de9b6` (`--green-500-main`) | active tab "chip" (SVG) |
| hover green | `#00ffbf` (`--green-400`) | primary (white) button hover bg |
| hover link | `#e6e7e7` | footer link hover |
| icon grey | `#808080` | FAQ × icon fill |
| nav bg | `rgba(0,10,6,0)` (transparent) at ≥480px; `#000` at ≤479px | `.newnav` |

The page has no gradients, box-shadows or backdrop-filters (all computed `none`). Depth comes only from the stepped surface colors above.

### 0.3 Radii
- Pill: `1440px` / `100vw` / `999px` (buttons, nav pill, pagination).
- 16px: Kiki slides, case-study image, video, footer card.
- 12px: results cards, FAQ cards, Kiki tab buttons, nav dropdown panel, mobile menu.
- 8px: 3-col slide images, case-study stat blocks, social icon hit areas.
- 6px: nav dropdown items.
- Author avatar: 100px circle at ≥1440. Below 1440 it is `6px 0` (top-left and bottom-right only).

### 0.4 Layout primitives
- `.padding-global`: 32px left/right (20px at ≤767).
- `.container-medium`: max-width 1120px (70rem), centered. Result: 160px side margins at 1440, 80px at 1280, full width minus gutters at 390.
- `.container-large`: max-width 1344px (84rem), padding-top 16px. Used by nav, footer and the Kiki autotabs.
- `.padding-section-small`: 48px vertical (32 at ≤767). `-medium`: 80px (64 ≤991, 48 ≤767). `-large`: 112px (96 ≤991, 64 ≤767).
- Spacers: `spacer-small` 16, `spacer-medium` 32 (24 ≤991, 20 ≤767), `spacer-xxlarge` 80 (64 ≤991, 48 ≤767). `.spacer-xl-home` = 32.
- `.button-group`: flex, wrap, gap 24 (32 ≤479).

### 0.5 Typography roles (computed at 1440 / 1280; mobile values at 390)
| Role | Family | Size / line-height | Weight | Letter-spacing | Color | Mobile (390) |
|---|---|---|---|---|---|---|
| H1 hero `.new-heading-h1.hero-h1` | Instrument Serif | 72 / 82.8 (1.15) | 400 | 0 | #f5f6ff | 48 / 55.2 |
| H2 section `.new-heading_h2` | Instrument Serif | 64 / 73.6 (1.15) | 400 (declared 500) | 0 | #f5f6ff | 40 / 46 |
| H2 italic word (`em` in Kiki H2) | Instrument Serif italic | 64 / 73.6 | 400 | 0 | #f5f6ff | 40 / 46 |
| Hero subtitle `.text-size-medium` | Inter | 20 / 28 | 400 | 0 | #f5f6ff | 18 / 25.2 |
| Section intro `.wow-paragraph` | Inter | 18.4 / 25.76 | 400 | 0 | #a4a4a4 (links #f5f6ff underlined) | same |
| Body / card text `p.text-color-grey` | Inter | 18 / 25.2 | 400 | 0 | #a4a4a4 | 17.6 / 24.64 |
| Small `.text-size-small` | Inter | 14 / 19.6 | 400 | 0 | #a4a4a4 | same |
| Eyebrow-ish (hero "Trusted by…") | Inter | 14 / 19.6 | 400 | 0 | #a4a4a4 | same, wraps to 2 lines |
| Nav link | Inter | 14 / 19.6 | 500 | 0 | #f5f6ff | same |
| Button default `.btn_global` | Inter | 16 / 16 | 500 | 0 | #0b0b0b on #f5f6ff | same |
| Button small (nav CTA) `.global-small` | Inter | 14.4 / 16 | 500 | -0.36px (-0.025em) | #0b0b0b on #f5f6ff | same |
| Button dark small variant | Inter | 14 / 16 | 500 | 0 | #f5f6ff on #1a1a1a | |
| Tab label `.wowtabs_link` | Inter | 24 / 33.6 | 400 | 0 | active #f5f6ff, inactive rgba(255,255,255,.3) | 20 / 28 |
| Kiki tab button `.wownav-logo` | Inter | 18.4 / 25.76 | 400 | 0 | #f5f6ff | 16 / 22.4 |
| Feature title `.wowfeatures_title` | Inter | 20 / 25 | 500 | 0 (subdued line -0.4px) | white + #a4a4a4 | 20 / 25 |
| 3-col slide text `.wow3slider_titlesubtext` | Inter | 16 / 22.4 | 500 | subdued -0.32px | white + #a4a4a4 | 20 / 28 |
| Stat number `.results_number` | Inter | 64 / 64 | 600 | 0 | #f5f6ff | 48 / 48 |
| Case-study stat `.text-size-xlarge` | Inter | 32 / 44.8 | 600 | 0 | #f5f6ff | 24 / 33.6 |
| Big quote `.wowtestimonail_text` | Inter | 32 / 38.4 (1.2) | 500 | 0 | #f5f6ff (scroll-highlight starts #1a1a1a) | 24 / 28.8 |
| Author name | Inter | 18.4 / 25.76 | 400 | 0 | #f5f6ff | |
| Author role | Inter | 18 / 25.2 | 400 | 0 | #a4a4a4 | 14 / 19.6 |
| FAQ question `h3.wowfaqs_question` | Inter | 20 / 23 | 500 | 0 | #f5f6ff | same |
| Footer col header | Inter | 18.4 / 21.16 | 500 | 0 | #f5f6ff | 18 / 20.7 |
| Footer link | Inter | 16 / 22.4 | 400 | 0 | #a4a4a4 → #e6e7e7 hover | same |
| Nav dropdown title | Inter | 13.6 / 19.04 | 500 | 0 | #f5f6ff | |
| Nav dropdown desc | Inter | 14 / 19.6 | 400 | 0 | #a4a4a4 | |
| Nav dropdown column header | Inter | 12 / 16.8 | 600 | 0 | #a4a4a4 | |

### 0.6 Buttons (`.btn_global`, all pill radius)
| Variant | Size at 1440 | Padding | Bg / text | Hover |
|---|---|---|---|---|
| Primary (white) | h 44 (e.g. "Book a demo →" 155×44) | 12px 20px | #f5f6ff / #0b0b0b | bg → #00ffbf |
| Primary small (nav) `.global-small` | 128×36 | 8px 16px | #f5f6ff / #0b0b0b | bg → #00ffbf |
| Dark (`w-variant-ff0134af…`) | h 44 | 12px 20px | #1a1a1a / #f5f6ff | bg → #f5f6ff, text → #0b0b0b |
| Dark small (`w-variant-6db51a3a…`) | h 36 | 8px 16px, 14px text | #1a1a1a / #f5f6ff | bg → #f5f6ff, text → #0b0b0b |

- Bg transition: `background-color .24s` (ease).
- Inner structure: `.btn_global-text-block.is-mask` is a 20px-tall flex box with `overflow:clip`. Inside it, `.btn_global-text` carries `text-shadow: 0 1.5em #0b0b0b`, which draws a duplicate of the label 1.5em below. The duplicate is hidden by the mask until hover.
- The label ends with a "→" character (part of the text, not an icon).
- At ≤767, vertical padding drops to 8px. At ≤479, buttons stretch to full width (`flex:auto; align-self:stretch`).
- Hover motion is described in §13.1.

---

## 1. Nav (`nav.newnav`, fixed)

**Layout (1440)**
- `position:fixed; inset:0 0 auto; z-index:1000`. Total height 80. Background is transparent at every scroll position on desktop.
- Structure: `.padding-global` (32px sides) → `.container-large` (max 1344, padding-top 16) → `.newnav_component` (flex, `space-between`, `align-items:center`, gap 16, height 64, padding 16).
- Three flex children:
  1. **Brand** (`flex:1`, 434px wide at 1440): logo image 97×27 SVG ("T" square mark plus "thrive" wordmark, white), max-width 124.
  2. **Center pill** `.newnav_menu-wrap`: 411×44, bg `#131313`, radius pill, padding 4, flex.
     - Five items: Platform, Features, Content, Case Studies, Learn.
     - Each item is a pill toggle with padding 8px 12px, 14px/500 text, height 36.
     - Hover bg `#262626`, `transition: background-color .32s`.
  3. **CTA wrap** (`flex:1; justify-content:flex-end`, gap 8):
     - "Ask" AI link `.nav_ai-link-wrap`: 59.2px wide (3.7rem), radius pill, overflow hidden. It holds a 16×16 ChatGPT logo plus the text "Ask why teams choose Thrive" (14px, nowrap) and shows only "Ask" when collapsed.
     - Small primary button "Book a demo→" (128×36).
- At 1280: same structure in a 1216-wide container. The pill stays centred at x≈434.

**Dropdowns** (Webflow `w-dropdown`, `data-hover=true`, `data-delay=300`)
- Behaviour: open on hover, close 300ms after the pointer leaves. No IX2 animation; display toggles instantly.
- The open list sits 2rem below the toggle with padding-top 16. It renders as a centred panel `.newdropdown_menu-wrap`: bg `#131313`, radius 12, padding 16, flex row, gap 32, top edge at y≈78px. Platform panel is 480×315.
- Columns `.newnav_menu-col` are 208 wide with gap 4.
  - Column header: 12px/600 grey, padding-left 12.
  - Items `.newnav_menu-link`: padding 10px 12px, radius 6, min-width 13rem, gap 4, hover bg `#262626` (transition .36s).
- Content per dropdown:
  - **Platform**: 2 columns ("Solutions", "More"). 4 items each, every item a title plus a 1-line grey description.
  - **Features**: 3 columns ("Experience", "Learning", "Admin"). 5 title-only items each.
  - **Content**: 2 columns, no headers. 3 and 2 items, each title plus description.
  - **Case Studies**: 2 columns. Each column has a header link ("Platform" / "Content") with a small arrow image, then 5 rows of [24×24 customer logo icon, `object-fit:contain`] plus the customer name (horizontal flex).
  - **Learn**: 2 columns ("About", "Resources"). 4 items each, each title plus description.

**Scroll behaviour**
- A custom script toggles class `scrolled` on `.newnav` when `scrollY > 100`.
- `scrolled` has no style rule on desktop, so the nav looks identical while scrolling. No hide-on-scroll and no background change.
- Implement as always-visible, fixed and transparent (black bg only at ≤479).

**AI link hover**
- `.nav_ai-link-wrap:hover`: width 3.7rem → 14.5rem (232px), bg → `rgba(230,231,231,.2)`.
- `transition: background-color .25s, width .5s`.
- Text is revealed by the overflow clip.

**Mobile (≤991)**
- Centre pill and AI link move into a hamburger menu.
- `.newnav_mobile-trigger`: 32×32 circle, 1px solid `#f5f6ff` border, transparent bg, 12×10 three-line SVG icon (white).
- At 390: logo shrinks to 96×27 (max 6rem). The bar holds logo (left), small "Book a demo→" button (131×36), and the hamburger (gap 8). Nav bg `#000`.
- Menu panel `.newnav_menu-wrap`: `position:absolute; top:0; margin-top:64px`, width 100% of container (350 at 390), bg `#000`, radius 12, padding 4. At ≤479 it is 100vh tall.
- Panel contents: column of 5 rows, each 52px tall (padding 8px 0). Each row is a 14px/500 label plus a 12×12 chevron (7×5 SVG). Below them, an outlined "Ask why teams choose Thrive" link: 1px solid `#e6e7e7`, radius pill, centred, margin-top 16.
- Each row expands its sub-list inline when tapped (Webflow dropdown, `margin-top:1rem` when open; sub-panel transparent, items without padding-left).
- Open animation (IX2 "NewNav Menu Open"): initial `display:none`, opacity 0, translateY 20px → `display:flex`, then opacity 1 and y 0 over **650ms outQuart** (≈ GSAP `power3.out`).
- Close: y → 10px and opacity → 0 over **350ms outQuart**, then `display:none` after 400ms.

---

## 2. Hero (`.section_wowh-hero`)

**Layout (1440)**
- Section padding-top 64 (clears the fixed nav), `overflow:hidden`, height 680.
- `.padding-global` → `.container-medium` (1120) → `.padding-section-medium.why-thrive-hero` (padding 80 top / 32 bottom).
- `.wowcontent_component.flex-horizontal`: flex row, `space-between`, `align-items:center`, gap 48, height 504.

**Left column** `.wowh-hero_component`: 672 wide (max-width-large 42rem), `margin-top:-48px`. Stacked:
1. `.user-avatar_group`: flex, gap 16, padding-bottom 16, height 48.
   - Avatar strip image 72×32: 3 overlapping circular headshots in one PNG, natural 144×64.
   - One line of 14px grey text, ~8 words (users / countries claim).
2. Spacer 16.
3. **H1**: 3 lines at 1440/1280, ~7 words, 672 wide, 248 tall. `transform-origin: 50% 100%`.
4. Spacer 16.
5. Subtitle `p.text-size-medium`: max-width 576, 20/28 white, 1 line, ~9 words, margin-bottom 20.
6. `.wowheader_stars-wrap`: flex, gap 32, padding-top 16, height 80. Three review-badge images (G2, Capterra, Software Advice), each rendered 104×64 (max-width 104). These are SVGs with a logo, green stars and a score.
7. `.spacer-medium` (32) holding `.button-block.align-left-center` (flex, gap 16):
   - Primary button "Book a demo →" (155×44).
   - Dark-small button "Why Thrive?" (113×36).

**Right column** `.wowh_img-block`
- Flex item, `width:100%`, `margin-right:-30vw` (−432px at 1440, −384 at 1280), `overflow:clip`, so it bleeds past the right edge of the viewport.
- Holds one `img.wowh_visual`: `width:80%`, `object-fit:cover`. Renders 665.6×503.8 at 1440 and 627×475 at 1280. Natural 1440×1089 (≈4:3) webp.
- Image content: product-UI collage of dark desktop and mobile Thrive screens (chat, mentoring, rewards, learning hub, AI report). No radius. At ≥1920 the width is 75%.

**Mobile (390)**
- `.wowcontent_component` becomes a column (`align-items:flex-start`, gap 48). Hero section height 959.
- Avatar text wraps to 2 lines (262 wide).
- H1 is 4 lines, 350×221.
- Subtitle is 2 lines.
- Badges are 80×48 (max 5rem, height 3rem), still in one row with gap 32.
- Button block becomes a column; both buttons are full width (350×44).
- Hero image follows below: 350×265, margin-right 0.
- Padding-section top 48.

**Motion**: on-load reveal, see §13.2.

---

## 3. Logo strip (`.section_wowlogos`)

This is a static row. There is no marquee and no animation.

- Section height 234. `.padding-global` → `.padding-section-small.logos-homepage` (48/48).
- Header "Loved by teams at": 18/25.2 white, centred, full width (outside the container).
- `.container-medium` → `.wowlogos_component` (flex column, centre, gap 32) → `.wowlogos_wrap.home-setting`:
  - flex, `space-between`, `align-items:center`, gap 48, max-width 960 (renders 912 wide), padding-top 32, centred.
- Six `.wowlogos_block` (112 wide = 7rem, flex centre, overflow clip), each holding a white customer wordmark: `width:auto; max-height:4rem`, rendered ≈112×46 (Krispy Kreme 112×38).
- Order: Volvo, Vodafone, British Airways, Nothing Bundt Cakes, Burger King, Krispy Kreme.
- After the row, an empty `.padding-section-small-hoemapge` adds 32px (16 + 16).
- **Mobile (390)**:
  - Padding 32/32.
  - Wrap becomes `flex-wrap:wrap; justify-content:space-around`, gap 32.
  - Logos are 96 wide (6rem), so the 6 logos sit in 3 rows of 2. Section height 337.

---

## 4. Product tabs (`.section_wowcustom-tabs.homepage-tabs`)

**Layout (1440)**
- Section padding 32/32, height 961. `.padding-global` → `.container-medium`.
- **Header** `.section_header.custom-layout.flex-horizontal`: flex row, `space-between`, `align-items:flex-end`, gap 60, height 225.
  - Left: H2, max-width 576, 3 lines, ~10 words.
  - Right: `.max-width-small` (448). `p.wow-paragraph.text-color-grey`, 3 lines, ~25 words. Five inline links (white, underlined) name the product pillars.
- `.spacer-xxlarge` (80).
- **Tabs body** `.wowtabs_wrapper`: `position:relative`, height 592 (37rem), flex column `space-between`.
  - `.wowtabs` (width 50% = 560) → `.wowotabs_menu`: four `.wowtabs_link` rows, each full width.
    - Each row: `border-bottom:1px solid #1a1a1a`, padding 24 top/bottom, 24/33.6 Inter 400.
    - Row heights are 83 for 1 line and 116 for 2 lines. Labels are short sentences of 5–9 words.
    - Inactive: color `rgba(255,255,255,.3)`, padding-left 4.
    - Active (`w--current`): color `#f5f6ff`, padding-left 32, gap 12. Background image is the 18×8 green tab-chip SVG (rounded "tag" shape, fill `#1DE9B6`), `no-repeat 0% 50%`.
  - `.wowtabs_pane.h-100`: `position:absolute; top:0; bottom:0; right:0`, width 60% (672), `margin-right:-10vw` (−144 at 1440, −128 at 1280), `overflow:clip`.
    - Contains 4 stacked `.wowtabs_pane-content` (one per tab). Each holds an `img.wowtabs_visual`: 672 wide, natural 670×600 (≈1.12:1), `object-fit:cover`, rendered 672×601 (clipped to 592), no radius.
    - Images are product-UI screenshots on a dark background: Spaces community feed, GDPR pathway, mentoring match, Future Leaders space. They bleed off the right edge.
  - `.wowtabs_child-wrap` (sits at the bottom of the wrapper): width 40% (448), height 192 (12rem), `position:relative`.
    - Four absolutely stacked `.wowtabs_child-content`. Each is a column, gap 16:
      - `p.text-color-grey` (18/25.2, 3 lines, ~25 words).
      - `.button-group` with one dark button (h 44), e.g. "Explore The Hub".
- **Interaction**:
  - Click a tab → `w--current` moves.
  - The matching pane image and child copy fade in (`opacity 0→1, visibility`, `transition .3s ease`); the old ones fade out and get `display:none` after 300ms.
  - No autoplay.
- **Mobile (≤767 / 390)**:
  - Header becomes a column, gap 24. H2 is 40/46, 3 lines.
  - Spacer 48.
  - `.wowtabs` becomes a column, 100% wide.
  - Menu becomes `display:flex; flex-wrap:wrap`, gap 24, margin-bottom 48. Links are auto-width with padding 8px top/bottom, 20/28, `white-space:nowrap`.
  - Mobile labels replace the desktop sentences ("Learning Hub", "Skill Pathways", "Mentoring & Coaching", "Spaces"). Active link keeps the chip and 32px left padding.
  - Pane becomes `position:relative`, width 100%, margin 0, margin-bottom 48. Height is 40dvh at ≤479 (60dvh ≤767, 50dvh ≤479 without `.h-100`). Image is `min-width:100%; height:auto`.
  - Child wrap is 100% wide, height 14rem (224).
  - Section padding-bottom 0 (≤767), padding-top 32 (≤479).

---

## 5. Kiki intro + Kiki autotabs (`.section_kikitabs`)

### 5a. Kiki header
- `.container-medium.hoempage-hero-kiki` (`display:flex`) → `.margin-top.margin-huge` (margin-top 64) → `.section_header.custom-layout.homepage-new-kiki` (flex column, `align-items:flex-start`), 640 wide.
- Contents:
  - H2 `.kiki-h2`: 2 lines, ~6 words, 496 wide. The last word is wrapped in `<em>` (Instrument Serif italic) and there is a `<br>` after the first line.
  - 24px gap.
  - `p.wow-paragraph.text-color-grey`: 640 wide, 3 lines incl. a `<br>`, ~25 words.
  - 20px margin.
  - Primary button "Meet Kiki →" (127×44).
- Mobile: H2 is 40/46, 310 wide. Margin-top 64 is kept (from `.margin-huge`; 56 at ≤767).

### 5b. Kiki autotabs (`.section_wowautotabs`)
- Section padding 48/48, `overflow:hidden`, height 716. `.padding-global` → `.container-large` → `.container-medium` → `.wow-slider-wrapper` (flex column, gap 8).
- **Tab bar** `.wowtestimonial-nav`: flex, gap 12. Five buttons `.wownav-logo`:
  - Each 214.4×76 (height 4.75rem), radius 12, padding 8.
  - Centred label (18.4/25.76), one word each: Coach, Creator, Analyst, Admin, Assistant.
  - Bg `#0b0b0b`; active `.active` bg `#1a1a1a`. No transition.
  - A `.wowprogress-overlay` child exists but is `display:none`. The script still tweens its width 0→100% over 7.5s linear, but nothing is visible, so you can skip it.
- **Swiper** `.swiper.is-wowautotabs`: 1120×520, `overflow:clip`.
  - Params: `slidesPerView:1, spaceBetween:24, loop:true, speed:800, grabCursor:true`. **No autoplay** (commented out in source).
  - Clicking a tab calls `slideToLoop(index)`. Dragging also changes the slide and updates the active tab.
  - The swiper is initialised by an IntersectionObserver (threshold 0.3); it doesn't matter visually.
- **Slide** `.wowfeatures_slide-wrap`: bg `#0b0b0b`, radius 16, min-height 520, padding 40px 0 0 40px, overflow clip.
  - `.wowfeatures-slider_slide-inner`: column, `space-between`.
  - `.wowfeatures-slide_content`: max-width 65% (702).
  - `.wowfeatures_title` (max-width 85% = 597; 20/25, 500) contains two inline-block spans:
    - `.highlight-text` (white, 1 line, ~5 words).
    - `.subdued-text` (grey, letter-spacing -0.4px, 3 lines, ~25 words).
  - **Video slot** `.features_slider_video-right` (Webflow background video):
    - `position:absolute; right:0; bottom:0`, width 45% (486), `aspect-ratio:1/1`, `object-fit:cover; object-position:0% 50%; z-index:-1`.
    - It sits flush in the bottom-right corner, clipped by the card radius. Rendered 486×486.
    - The video is autoplay, loop, muted, playsinline (mp4 + webm, jpg poster). Content: Kiki chat UI animation on a dark panel with a blue glow, one per tab.
- **Mobile (390)**:
  - Tab bar becomes `flex-wrap:wrap`, gap 12, `overflow:auto`. Buttons are `flex:1; min-width:150px`, height 56 (3.5rem), 16/22.4. Result is 3 rows (2+2+1), 192 tall.
  - Slide padding 24 / 24 / 72 / 24, min-height 35rem.
  - Inner becomes a column, gap 24, `justify-content:flex-start`. Content is max-width 100%. Title stays 20/25; the highlight wraps to 2 lines and the subdued text to 6.
  - Video becomes `position:static`, width 100% (302×352).
  - Slide height 692; section height 1004.

---

## 6. "Enterprise" 3-column slider (`.section_wow3col-slider`)

- Section padding 32 top / 80 bottom, `overflow:hidden`, height 1021. `.padding-global` → `.container-medium`.
- **Header**: column, `align-items:flex-start`.
  - H2 `.home-section`: max 960, 2 lines, ~8 words.
  - Spacer 32.
  - Primary button "Meet Thrive →" (147×44).
- Spacer 32.
- `.slider-container.align-left`: flex column, gap 32.
  - `.swiper.is-3-item`: 1120×546. It does **not** clip, so neighbouring slides bleed out to the viewport edges; the section's `overflow:hidden` clips them there.
  - Params: `slidesPerView:3` (breakpoints 0→1, 768→2, 992→3), `spaceBetween:24, speed:800, loop:true, grabCursor:true`. Prev/next elements are referenced but absent.
- **Slide** (357.33 wide): `.case-study_slide-content`, column, gap 20, radius 12, overflow clip.
  - Image `.wow3col_img`: height 416 (26rem, min 20rem), radius 8, `object-fit:cover`. Natural 408×(272–408).
  - Text block: `.highlight-text` title (white, 1 line, ~5 words) + `.subdued-text` (grey, 2–3 lines, ~20 words), both 16/22.4 500.
  - Six slides. Image types: integrations app-icon grid, login/security screen, Arabic RTL product UI, captioned video UI, 2 event photos (conference speaker / attendee).
- **Controls** `.swiper-controls` (flex, gap 12):
  - Pagination pill: bg `#0b0b0b`, padding 8px 20px, radius 999, height 40, gap 8.
  - Six bullets: 24×10, radius 999, bg `#222`, overflow hidden, `transition: width .5s ease`.
    - The active bullet becomes **48px** wide while autoplay is running.
    - Its inner `.progress-bar` (absolute, white `#fff`) animates `width 0→100%` with `bulletProgress 3s linear forwards`.
  - Play/pause button: 36×36 circle, bg `#111`, white 16px glyph "⏸" / "▶".
- **Autoplay**:
  - Starts only when 40% of the container is visible (IntersectionObserver, threshold 0.4, once). It first jumps to slide 0, then calls `autoplay.start()`.
  - Swiper default delay **3000ms**, `disableOnInteraction:false`, transition 800ms ease.
  - Pause button stops autoplay and clears the progress.
- **Mobile (390)**: section padding 0; 1 slide per view (350 wide); text is 20/28; image height stays 416; section height 950.

---

## 7. Results stats + testimonial (`.container-medium.ad-page`)

This block is **not** wrapped in `.padding-global`: it is a bare `.container-medium` with margin-bottom 32.

- **Header**: column, centred, padding-top 32. H2 centred, max 960, 2 lines, ~10 words, height 147.
- **Card grid** `.wowresults_card-grid`: grid of 4 × 268px, gap 16, height 381.
- **Card** `.wowresults_card`: bg `#0b0b0b`, radius 12, padding 16px 32px 32px 32px. Flex column, `space-between`, `align-items:flex-start`, gap 59.2 (3.7rem).
  1. Customer logo `.wowresults_card-logo`: height 48, `width:auto`, max-width 50%, `object-fit:contain`. White logos: Burger King, Avon, The AA, Princes.
  2. `.wowresults_card-inner` (column, gap 16):
     - Big stat `.results_number` (64/64, 600): "1.5x", "14%", "75%", "93%".
     - `p` grey (18/25.2), 4–5 lines, ~20 words, with the brand name as a white underlined link.
- **Testimonial** `.wowtestimonial_data`: max-width 960, margin 32 top / 16 bottom, column, centred, gap 16.
  - Quote `p.wowtestimonail_text.kiki-quote`: Inter 32/38.4 500, white, left-aligned text, 5 lines at 960 wide, ~40 words incl. quote marks.
  - Author `.wowmeta_author-wrap.stack` (column centre, gap 12):
    - Avatar 80×80 (`object-fit:cover`; radius 100px at ≥1440, `6px 0` below).
    - Name (18.4).
    - Role line (18 grey) with an underlined white company link.
- **CTA** `.button-group.homepage-demo-cta`: centred, padding 24 top / 64 bottom. Primary button "See Thrive in action →" (204×44).
- **Breakpoints**:
  - ≤991: grid becomes 2 columns; card gap 5rem; number 48px.
  - ≤767: card padding 24, logo height 32, number 40px.
  - ≤479: 1 column, number 48/48.
- **At 390** the container has no side gutters, so cards span the full 390px viewport edge to edge, 286 tall. The quote is 24/28.8 and the role text 14px. Reproduce this as-is, or add the 20px gutter if Build prefers consistency (it looks like an original bug).

---

## 8. Statement + scroll-zoom visual (`.section_wowostandout`)

- Section margin-top 32, flex column.
- **Big visual** `.wowh_big-visual` (`position:relative`):
  - Contains `img.wowh_big-visual-img`: width 100% of the viewport (1440 at 1440), natural 1440×598 (≈2.41:1) avif, no radius.
  - Content: wide montage of floating, blurred, dark product cards (learning-course cards with landscape photos), with a sharp central "Thrive Product Launch" card.
  - Also contains `.overlay-clip` (absolute bottom black block, height 0%). It is unused, so skip it.
- **Text** `.padding-section-medium.hoemapge-statemnt-section` (80 top / 16 bottom) → `.wowsection_header.max-width-medium` (576, centred column):
  - H2: 2 lines, ~5 words, 400 wide.
  - Spacer 16.
  - `p.wow-paragraph` grey, centred, 5 lines incl. 3 `<br>`, ~30 words.
- Section height at 1440 is 1010 (598 image + 412 text).
- Mobile: image is 390 wide (≈162 tall); padding-top 48; H2 40/46.
- **Motion**: scroll-driven zoom-in, see §13.5.

---

## 9. Scroll-highlight quote (`.section_textcall`)

- `.padding-section-medium.hoempage-quote-section`: padding 32 top / 80 bottom.
- `.textcall_component` (column centre) → `.max-width-large` (672) → `p.wowtestimonail_text.scroll-highlight`:
  - Inter 32/38.4 500, 672×230.
  - Contents: an analyst quote (~25 words, in curly quotes), `<br><br>`, then the attribution "Name, title" on its own line.
  - Base color `#1a1a1a` (near-invisible on black).
- Mobile: 24/28.8, 350 wide.
- **Motion**: SplitText chars are coloured to white as you scroll, see §13.6.

---

## 10. Case-study highlight carousel (`.section_wowhighlight-slider`)

- Section padding 80/80, `overflow:hidden`, height 1300.
- **Header** `.section_header.custom-layout.flex-horizontal` (row, `space-between`, align flex-end):
  - Left: `.section_header-content` (576, column, gap 16): H2 (2 lines, ~6 words) + dark button "View customer stories" (204×44).
  - Right: `p.wow-paragraph` grey, max 448, 2 lines.
- Spacer 80.
- `.slider-container` (flex column, centred, gap 32).
- **Swiper** `.swiper.is-highlight-slider`:
  - Padding 40px 0, overflow visible.
  - Params: `slidesPerView:'auto', centeredSlides:true, loop:true, speed:800, grabCursor:true, slideToClickedSlide:false, threshold:10`, autoplay `delay:4000, disableOnInteraction:false, pauseOnMouseEnter:true`. No `spaceBetween`.
- **Slides** `.swiper-slide.is-highlight-slider`:
  - Layout width 666px (min-width 41.625rem).
  - Default `opacity:.2; transform:scale(.95)`. Centre slide (`.is-center`): `opacity:1; transform:scale(1.1); z-index:2`.
  - `transition: opacity .3s ease, transform .3s ease`.
  - Visual widths: side 632.7, centre 732.6.
- **Slide content** (column, gap 20):
  - `.case-study_feature-hold`: height 480 (30rem), radius 16, overflow clip.
    - Full-bleed `object-fit:cover` photo (retail store interiors / brand lifestyle photos, natural ≈16:9 to 3:2).
    - Overlay `.case-study_inner-brand-wrap` (absolute inset 0, padding 32) holds a white brand wordmark, height 48 (3rem), `width:auto`, at the top-left.
  - `.case-study_slide-inner` (column, gap 16). Hidden unless the slide is centred: `opacity:0; visibility:hidden` → visible, `.3s ease`.
    - Head: grid `1fr max-content`, gap 32, centred vertically.
      - `p.wow-paragraph.text-style-2lines` (white 18.4/25.76, 1–2 lines, ~9 words).
      - Dark button "Read more".
    - Stats: flex, gap 16, two blocks `.case-study_slide-inner-block`. Each block: bg `#131313`, radius 8, padding 16px 20px, flex `space-between` centred, gap 48. It holds a stat (32/44.8 600 white, e.g. "75%", "500k+") and a label (14/19.6 grey, 1–2 lines).
- 5 slides (CMS order): The AA, DECIEM, Krispy Kreme, Reiss, Ann Summers.
- **Controls**: centred `.swiper-controls`.
  - Pagination pill as in §6, but the active bullet is **40px** and the progress fill is `bulletProgress 4s linear`.
  - Highlight bullets are `pointer-events:none`.
  - Bullet width transition .3s ease (highlight) vs .5s (default rule); use .3s here.
  - Play/pause button as in §6.
- **Mobile (390)**:
  - Section padding 0 (≤991).
  - Header becomes a column, gap 24.
  - Slides min-width 95% (333 layout → 316 visual, centre 366).
  - Image height 24rem (384); brand logo height 24 (1.5rem), wrap padding 24.
  - Head becomes a column (button below the text). Stats stack in a column; blocks `justify-content:flex-start`, gap 16. Stat number 24/33.6.

---

## 11. "This is Thrive" video (`section.section_kiki-video`)

- `.padding-section-large.thrive-homepage-video`: 32 top / 112 bottom.
- `.kiki-video_component`: column, centred, padding-bottom 48.
  - H2 centred, 1 line, 3 words.
  - `p.text-color-grey` centred, 2 lines (with `<br>`), ~15 words, margin-bottom 20.
  - Margin-top 32.
  - `.kiki-video_video`: 1120×630, `aspect-ratio:16/9`, radius 16, overflow clip. Holds a YouTube iframe (video id `27Z_YlmgGAY`, embedded through embedly), absolutely filling the box.
- `p.homepage-llm-paragraph`:
  - max-width 800, margin 40 auto, centred, 18/25.2 white, 4 lines, ~60 words.
  - Some phrases are wrapped in `.text-span-bold` (600), and some of those are underlined links.
- Mobile: video 350×197; padding-bottom 64; paragraph 350 wide, 9 lines.

---

## 12. FAQ (`.section_wowfaqs`) and Footer

### 12a. FAQ
- `.padding-global` → `.padding-section-medium` (80/80; 48 at 390). This section has no container-medium.
- `.wowfaqs_component`: column, centred, gap 70.
  - H2 centred, max 960, 2 lines with `<br>`, ~6 words.
  - List `.wowfaqs_wrap`: max-width 672, column, gap 16.
- 5 items. Each card `.wowfaqs_card`: bg `#0b0b0b`, radius 12, padding 20px 24px.
  - Head: flex `space-between`, centred, gap 24, cursor pointer.
    - `h3` question (20/23 500, 1–2 lines).
    - `.cross-icon` (20×20 SVG "×", fill `#808080`).
  - Body `.wowfaqs_body`: overflow clip, closed height 0.
    - `.wowfaqs_answer`: padding-top 16.
    - Rich text grey 18/25.2, 1–2 paragraphs, ~60–110 words, white underlined links.
- Closed state: icon rotated 45° (it reads as "+"); body height 0, opacity 0, scaleY .7. Open/close timing is in §13.8.

### 12b. Footer (`footer.footer`)
- bg `#000`, padding-bottom 24. `.padding-global` → `.container-large` (1344, padding-top 16).

**CTA block** `.padding-large` (padding 48) → `.footer-heading-wrapper`: max 768, column, centred, gap 32, text-align centre. Stacked:
1. Thrive logo (light SVG, 112×32).
2. H2: 2 lines, ~10 words.
3. `p`: white 18/25.2, max 512, 2 lines.
4. HubSpot embedded form (`.hs-frame`, 300×351 iframe, portal 4722527, form `57925d00-4ffe-4d43-a508-adaf0cbd5c45`, region na1). It is cross-origin, so its fields and styles **could not be measured**. Build a placeholder 300-wide form or embed HubSpot.

**Footer card** `.newfooter_component`: bg `#0b0b0b`, radius 16, padding 48, column, gap 88.
1. `.newfooter_ai-grid-component` (centred):
   - "Need a second opinion?" (18/25.2), margin-bottom 24.
   - Row of 4 AI logo links (ChatGPT, Perplexity, Gemini, Claude): white PNG marks, 48×48 `object-fit:contain`, gap 24.
2. `.newfooter_top` (column, gap 60):
   - Row `space-between`: Thrive logo inline SVG 124×36 on the left. On the right, 3 social icons (Instagram, LinkedIn, YouTube): 28px SVG in a 40×40 hit area, radius 8, gap 8, hover bg `#262626` (.24s).
   - `.newfooter_menu-block`: grid of 4 × 300px (268px at 1280), gap 16, `space-between`.
   - Each column (column, gap 24):
     - Header (18.4/21.16 500 white; a link in 3 of 4 columns; hover colour `#a4a4a4` at ≥1440, transition .2s).
     - Link list (column, gap 8): 16/22.4 grey links, hover `#e6e7e7` (.24s).
   - Column contents:
     - Platform: 6 links + dark-small button "See Thrive in action →".
     - Content: 4 links + dark-small button.
     - Case Studies: 5 links.
     - Resources: 6 links.
3. `.newfooter_bottom` (column, gap 32):
   - Badges row (`space-between`, margin-bottom 32):
     - Left: Capterra and G2 rating SVGs (104×54 and 71×63, max 6.5rem).
     - Right: 4 G2 award-shield SVGs (each ≈110×79).
   - One-line compliance sentence (18/25.2) with 3 underlined white links.
   - Legal row (`space-between`, centred, height 50):
     - "© 2026 Thrive Learning" (14 grey).
     - Links (gap 24): "Trust Centre", "Website Cookies & Policy" (16 grey), plus 2 drop-ups, "Terms and Conditions" and "Privacy Policy".
     - Each drop-up toggle: label + 14px Webflow chevron icon (`#808080`). Toggle padding 4px 30px 4px 10px, min-height 50.
     - On click, the list opens **upward** (`bottom:50px; right:0`). The list is a `#2f2f2f` card: 1px `rgba(214,214,214,.16)` border, radius 10, padding 16, gap 6. It holds 5–6 policy links.
     - The chevron rotates 0→180° over 300ms ease on open, and back on close.

**Footer breakpoints**
- ≤991:
  - Card padding 32; gap remains 88. Menu grid becomes 3 columns, row gap 48.
  - Badges row becomes a column (`align-items:flex-start`, gap 24). Award badges get margin-left −24.
  - Legal row becomes a column, gap 16. AI logos are 40px.
- ≤767: menu grid row gap 24; column header 18px; link list gap 4; legal row gap 24; drop-up lists open inline (static).
- ≤479 (390):
  - `.padding-large` 24; footer H2 40/46.
  - Card padding 16.
  - CTA row becomes a column, gap 24.
  - Menu grid becomes 2 columns (151px), gap 24/16.
  - Rating badges max 5rem; award badges max 4.5rem (72×52), margin-left −16.
  - Legal links stack centred (column, gap 4).
- Footer height: 1809 at 1440, 2203 at 390.

---

## 13. Motion catalogue (all animated elements)

Easing map:
- Webflow IX2 `outQuart` ≈ GSAP `power3.out` (quartic); `inOutQuart` ≈ `power3.inOut`.
- Webflow IX3 ease index 12 = GSAP `"power4.inOut"` (confirmed from the IX3 ease table).
- Libraries on the original: GSAP (Webflow ships 3.15.0; a second 3.12.5 copy overwrites `window.gsap`), ScrollTrigger, SplitText, Flip (unused), Swiper 11.

There are no load or scroll animations other than those listed here. Section headings, cards and images do not fade in on scroll.

### 13.1 Button hover (IX3, every `[button]` element: all `.btn_global` instances)
- Trigger: `mouseenter` plays, `mouseleave` reverses (each button independently).
- SplitText `type:"chars"` on `[button-animate]` (`.btn_global-text`). Webflow wraps words as `.gsap_split_word` and chars as `.gsap_split_letter`, each `display:inline-block; position:relative`.
- Tween: chars `y: 0 → -1.5em`, duration **0.45s**, stagger `{amount: 0.25}` (spread over all chars, from the first), ease **power4.inOut**.
- The `text-shadow: 0 1.5em #0b0b0b` copy rises into the 20px mask, so the label appears to roll up letter by letter.
- At the same time, CSS `background-color .24s` changes the bg: white → `#00ffbf`, or dark → white with the text turning `#0b0b0b`.
- A second action (`.btn_icon-track` y −50%, 0.45s at position 0.125) targets an element that does not exist on this page, so ignore it.

### 13.2 Hero reveal on load (IX2 "Wow Hero Reveal", trigger: scroll-into-view of `.section_wowh-hero` at 0% offset, which fires on page load)
Initial states, applied before first paint (set them in CSS or JS to avoid a flash):
| Target | Initial |
|---|---|
| `h1` | opacity 0, translateY 40px, scale .9, skewX 10deg, blur(20px); transform-origin 50% 100% |
| `.user-avatar_group` | opacity 0, translateY 40px, scale .9, skewX 10deg |
| subtitle `.text-size-medium` | opacity 0, translateY 10px, skewX 10deg, blur(8px) |
| `.wowheader_stars-wrap` | opacity 0, translateY 10px, skewX 8deg, blur(5px) |
| `.button-block` | opacity 0, translateY 10px, skewX 10deg, blur(20px) |

Animate to opacity 1, y 0, scale 1, skew 0, blur 0:
| Target | Duration | Delay | Ease |
|---|---|---|---|
| h1 | 1250ms | 0 | outQuart |
| avatar group | 500ms | 0 | outQuart |
| subtitle | 1250ms | 250ms | outQuart |
| badges | 1250ms | 250ms | outQuart |
| buttons | 1250ms | 350ms | outQuart |

- The hero image `.wowh_visual` is **not** animated.
- Mobile uses the same animation.

### 13.3 Nav
- Dropdown open/close is instant, with a 300ms hover-out delay.
- Hover backgrounds: .32s on top-level items, .36s on dropdown items.
- AI link width expansion: .5s.
- Mobile menu: 650ms outQuart in, 350ms out (see §1).

### 13.4 Tabs (§4) and Kiki autotabs (§5b)
- Tabs: click-driven `opacity` + `visibility` fade, .3s ease.
- Kiki autotabs: Swiper slide 800ms (Swiper default ease), click or drag. No autoplay.
- Kiki videos autoplay and loop muted.

### 13.5 Scroll-zoom visual `.wowh_big-visual` (IX2 "WowBig Visual Reveal", continuous scroll-progress, smoothing 90)
- Keyframes, where progress = element entering the bottom of the viewport → leaving the top:
  - ≤55%: `scale(2.5) translate(23px, -447px)`, opacity 0.
  - ≥65%: `scale(1) translate(0,0)`, opacity 1.
  - Linear interpolation between them.
- Observed on the live page (1440×900): the image stays invisible until its top is about 500px from the viewport top. It reaches the final state when its top is about 0–80px from the viewport top.
- The live implementation jitters, because IX2 measures the transformed box.
- For the clone, implement with GSAP ScrollTrigger:
  - `fromTo(el, {scale:2.5, x:23, y:-447, opacity:0}, {scale:1, x:0, y:0, opacity:1, ease:"none"})`
  - `scrollTrigger:{trigger:el, start:"top 55%", end:"top 5%", scrub:0.9}`
  - Transform origin: center.
- Same behaviour on mobile, where the values are proportionally smaller. Keep x/y in px, or scale them by `vw/1440`.

### 13.6 Scroll-highlight quote (IX3 → GSAP ScrollTrigger; the only live `ScrollTrigger.getAll()` entry)
- SplitText `type:"chars"` (145 chars, 29 words, on `.wowtestimonail_text.scroll-highlight`).
- Timeline: each char tweens `color` from `hsl(0 0% 8.73%)` (#161616) to `#ffffff`. Duration 1.5s each, stagger `{amount:10}`, ease power4.inOut. Total timeline 11.5s, played by scrub.
- ScrollTrigger: `start:"top 500"`, `end:"bottom 500"` (px from the viewport top), `scrub:0.8`, `clamp` (Webflow clamp: `start:"clamp(top 500)"`, `end:"clamp(bottom 500)"`).
- Toggle: enter = play.
- At 1440 the range is about 230px of scroll (the element's height).

### 13.7 Carousels
| Carousel | Autoplay | Delay | Speed | Progress bullet | Other |
|---|---|---|---|---|---|
| 3-col (§6) | starts when 40% visible, once | 3000ms | 800ms | active bullet 48px, fill 3s linear | play/pause toggle |
| Highlight (§10) | on init | 4000ms, pauses on mouse enter | 800ms | active bullet 40px, fill 4s linear | centre slide scale 1.1 / opacity 1; others .95 / .2, .3s ease; info panel fades in .3s |

- Both carousels loop and use bullet width transitions (.5s / .3s).
- Swiper wrapper easing is the CSS default `ease`.

### 13.8 FAQ accordion (IX2 "WowFaqs Open/Close", click toggles each item independently)
- **Open**:
  - Icon rotate 45° → 0°: 150ms inOutQuart.
  - Body height 0 → auto: 450ms outQuart.
  - Body opacity 0 → 1: 450ms outQuart.
  - Body scaleY .7 → 1: 450ms outQuart.
- **Close**:
  - Icon rotate → 45°: 150ms inOutQuart.
  - Body scaleY → .7, opacity → 0, height → 0: 650ms outQuart.

### 13.9 Footer
- Drop-up chevron rotates 0 → 180°, 300ms ease.
- Link colour transitions .24s; social bg .24s.

---

## 14. Breakpoints summary

| Breakpoint | What changes |
|---|---|
| ≥1920 | hero image width 75%; award badges right-aligned |
| ≥1440 | author avatar fully round; footer col header hover colour (#a4a4a4) |
| 1280 (measured) | identical to 1440 inside a 1120 container (80px side margins), nav container 1216, footer grid columns 268px, tab pane bleed −128px, hero image bleed −384px (627×475) |
| ≤991 | hamburger nav (menu panel absolute under the bar); `.flex-horizontal` headers become columns; results grid 2 columns; footer grid 3 columns, legal + badges stack; section paddings −16px; highlight section padding 0 and slides 95% wide; Kiki feature content full width; type scale: H1 64, H2 ≈ `--h2-new` 64 (unchanged), quotes 28px |
| ≤767 | gutters 20px; hero becomes a column; tabs become a mobile layout (wrapped chips, short labels, pane 60dvh); Kiki tab buttons 200px wide, 56px tall, scrollable; Kiki slide padding 24; logos 80px wide (wrap, space-around); H1 48px, H2 56px (`--h2-new` 3.5rem); quotes 24px; 3-col section padding 0; case-study image 24rem; buttons 8px vertical padding; Swiper 3-col shows 2 per view between 768 and 991 and 1 below 768 |
| ≤479 (390 measured) | nav bg black, logo 96px; H1 48, H2 40; hero buttons full width and stacked; badges 80×48; logos 96px in a 2-column wrap; Kiki tab buttons `flex:1` min 150; Kiki video static and full width; results grid 1 column, edge to edge; case-study head and stats stack; footer grid 2 columns, card padding 16; legal links stacked centred |

## 15. Page metrics
- Document height: 1440 → 11,728px; 1280 → 11,623px; 390 → 12,703px (after all lazy images loaded).
- Section top offsets at 1440 (lazy images loaded):

| Section | y (px) |
|---|---|
| hero | 64 |
| logos | 744 |
| tabs | 977 |
| Kiki | 1938 |
| 3-col | 3035 |
| results | 4055 |
| statement | 5231 |
| quote | 6241 |
| highlight | 6583 |
| video | 7883 |
| FAQ | 9114 |
| footer | 9920 |

## 16. Not measurable / caveats
- HubSpot form internals (cross-origin iframe).
- The YouTube player chrome (embedly iframe).
- Webflow A/B variants: copy can differ for other visitors. The default (visible) variant was measured.
- The IX2 big-visual zoom on the original oscillates under smoothing (feedback from scaled bounding boxes). The ScrollTrigger replacement in §13.5 matches the observed start and end positions.
