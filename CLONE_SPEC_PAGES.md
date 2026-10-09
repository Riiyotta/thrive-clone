Source: https://www.thrivelearning.com/ (57 nav-linked pages). Measured live with Playwright 1.63 on 2026-10-09 at 1440×900, 1280×800, 390×844 after scrolling each page to the bottom.

# Thrive subpage templates spec

This is the companion to `CLONE_SPEC.md` (homepage). `pages-manifest.json` is the machine-readable twin of this file: templates, the section catalogue with links to raw dumps, the nav mapping and per-page metrics.

**Raw data for build agents** (everything under `/private/tmp/claude-504/scratch/recon-pages/`):
- `dumps/<slug>.json`: `<slug>` is the *original* path with `/` → `__` (e.g. `lms__features__spaces`, `case-study__avon`, `kiki`, `lms__thrive-impact`, `company__why-thrive`). It holds `v1440` / `v1280` / `v390`, and each has `blocks[i].els[]` with every visible element: tag, classes, depth, box (x, page-y, w, h), computed styles, word count, text excerpt, img natural size/src, video/iframe, href, IX2 attributes. `dumps/<slug>.html` is the rendered DOM. `dumps/home.json` is the homepage in the same format, for comparing.
- `motion/<slug>.json`: IX2 events whose targets exist on that page (trigger type, action list, steps with duration/easing/values), live Swiper params, ScrollTrigger instances, page inline scripts (swiper / tabs / marquee code), CSS animations.
- `digest.mjs <slug> <blockIndex> [1440,1280,390]` prints a compact geometry digest of one section. Style values come out in **design px** (rem×16, with the fluid root factored out); boxes are raw px. `describe.mjs` gives the raw tree.
- `nav-live.json` is the live nav link structure (desktop + mobile menus).

---

## 0. Global findings that affect every template (read first)

1. **Fluid root font-size on most subpages.** The `.global-styles` embed on subpages sets
   `html{font-size:1rem}` / `≤1440: calc(0.4375rem + 0.725vw)` / `≤960: calc(0.75052rem + 0.41580vw)` / `≤479: calc(0.74948rem + 0.83682vw)`.
   The root is **17.44px at 1440, 16.28 at 1280 and 15.255 at 390**, and **16px at ≥1441**. The homepage does NOT have this embed (root is always 16), so CLONE_SPEC.md values are 16-based.
   - Fluid pages: every route except the fixed-16 list below. All rem-based sizes (type, paddings, container 70rem, radii in rem) render ×1.09 at 1440, ×1.0175 at 1280 and ×0.953 at 390. Example: on `/lms/features/spaces` at 1440 the H1 is 78.48px, `.container-medium` is 1220.8px wide and the nav is 87px tall (80 on the homepage).
   - Fixed-16 pages (no embed): `/lms/corporate-lms`, `/lms/enterprise`, `/lms/features`, `/mentoring`, `/company/why-nimbus`, `/whats-included`, `/resources/guides`, `/resources/lms-glossary`.
   - Build guidance: author subpage sections in **rem** (design px ÷16), and have the page template switch `document.documentElement.style.fontSize` to the fluid rule on mount for fluid routes (restore on unmount). Values in this spec and in `digest.mjs` output are design px; boxes in the dumps / metrics are raw rendered px.
   - The global Nav.jsx/Footer.jsx are written in px, so on fluid routes they will be ~9% smaller than the original at 1440 (nav 80 vs 87). They are global and must not be rebuilt; this is flagged in §F for the coordinator.
2. **Footer variant on every subpage.** Subpages use `footer.footer.contact-us-footer`. The CTA block has **no HubSpot form**. Its order is logo → H2 (2 lines) → paragraph → a primary button (`.footer_button-block`, "Book a demo", 106×44 design). `.footer-heading-wrapper` is **640** wide (768 on home) and `.padding-large` is 474 tall (788 on home); the card below is identical. Footer.jsx needs a `variant="subpage"` prop (button instead of form). Footer height at 1440: 1472 on fixed pages, 1619 on fluid pages (home 1786 incl. padding).
3. **Three design systems coexist**:
   - (a) the homepage "wow" system (`section_wow*`, `.new-heading_h2`, `.btn_global`), used by most Platform/Features/Company pages;
   - (b) an older Relume-style system (`.component`, `.section_global_header`, `.grid_section`, `.grid_card`, `.header_global`, `section_layout-2_header`, `section_faq`, hairline borders), used by Content, Impact, Professional Services, content case studies, contact, events, blog;
   - (c) the oldest system (`.s`, `.section-23`, `.h1-centered`, `.p20`, `.button-green`), used by Guides and Glossary.
   Sections from (b) and (c) are never the same as homepage components.
4. **Customer names, brands and logos**: the clone uses neutral names (route slugs `customer-1..10`, `/nova` for Kiki, `/company/why-nimbus`). Use `LogoPlaceholder` / `Placeholder` for every logo, photo, avatar and product shot.

---

## §A. Templates and routes (clone paths)

32 templates. Four are true multi-page templates (34 routes); the other 28 pages are one-offs, each composed from the shared section catalogue (§B). Pages differ structurally, not only in content, so they are not forced into shared templates. Section order per template is in §C and in `pages-manifest.json → templates[].sections`.

| Template id | Name | Routes (clone paths) |
|---|---|---|
| `feature-detail` | Feature detail (/lms/features/*) | `/lms/features/lms-homepage`, `/lms/features/spaces`, `/lms/features/chat`, `/lms/features/learning-pathways`, `/lms/features/lms-analytics`, `/lms/features/skills`, `/lms/features/employee-assessment-software`, `/lms/features/ai-content-creator`, `/lms/features/lms-admin`, `/lms/features/lms-rewards`, `/lms/features/mcp`, `/lms/features/mobile-lms`, `/lms/features/lms-security`, `/lms/features/employee-experience`, `/lms/features/communication`, `/lms/features/employee-performance-management-software`, `/lms/features/lms-gamification` |
| `case-study-platform` | Case study detail, platform (/case-study/*) | `/case-study/customer-1`, `/case-study/customer-2`, `/case-study/customer-3`, `/case-study/customer-4`, `/case-study/customer-5` |
| `case-study-content` | Case study detail, content (/case-studies-contents/*) | `/case-studies-contents/customer-6`, `/case-studies-contents/customer-7`, `/case-studies-contents/customer-8`, `/case-studies-contents/customer-9`, `/case-studies-contents/customer-10` |
| `content-catalogue` | Content catalogue (topics / sector suites) | `/content/topics`, `/content/sector-suites` |
| `page-lms` | Platform overview | `/lms` |
| `page-lms-small-business` | Segment landing: small business | `/lms/small-business` |
| `page-lms-corporate-lms` | Segment landing: mid-market | `/lms/corporate-lms` |
| `page-lms-enterprise` | Segment landing: enterprise | `/lms/enterprise` |
| `page-lms-solutions` | Solutions index (sticky anchor tabs) | `/lms/solutions` |
| `page-lms-professional-services` | Professional services (legacy grid system) | `/lms/professional-services` |
| `page-lms-impact` | Impact (legacy layout-2) | `/lms/impact` |
| `page-lms-integrations` | Integrations directory | `/lms/integrations` |
| `page-lms-spring-release` | Release notes landing | `/lms/spring-release` |
| `page-lms-demo-platform` | Book a demo | `/lms/demo-platform` |
| `page-pricing` | Pricing | `/pricing` |
| `page-lms-features` | Features index (sticky anchor tabs) | `/lms/features` |
| `page-nova` | AI agent product page | `/nova` |
| `page-lms-mentoring-software` | Mentoring software product page | `/lms/mentoring-software` |
| `page-content` | Content overview | `/content` |
| `page-content-service` | Content service (legacy layout-2) | `/content/service` |
| `page-content-custom-content` | Custom content | `/content/custom-content` |
| `page-mentoring` | Mentoring programmes | `/mentoring` |
| `page-case-studies-lms` | Case study index, platform (filterable) | `/case-studies/lms` |
| `page-case-studies-content` | Case study index, content | `/case-studies/content` |
| `page-company` | Company | `/company` |
| `page-company-why-nimbus` | Why us | `/company/why-nimbus` |
| `page-whats-included` | What's included | `/whats-included` |
| `page-contact-us` | Contact | `/contact-us` |
| `page-resources-events-webinars` | Events & webinars index | `/resources/events-webinars` |
| `page-resources-blog-and-news` | Blog & news index | `/resources/blog-and-news` |
| `page-resources-guides` | Guides index (oldest system) | `/resources/guides` |
| `page-resources-lms-glossary` | Glossary index (oldest system) | `/resources/lms-glossary` |

Grouping notes:
- `feature-detail`: all 17 `/lms/features/*` share one block sequence. The `video` section (`section_kiki-video`) is present only on lms-homepage, spaces, chat, ai-content-creator, mcp and mobile-lms. On employee-experience and communication the hero, reviews and final CTA blocks are shorter (less content and fewer slides), but the structure is the same. Per-route lists are in `sectionsByRoute`.
- `case-study-platform` and `case-study-content` are different systems: (a) `section_wowcstemp` vs (b) layout-2 hero + stats + article + related cards.
- The two case-study indexes are NOT one template: `/case-studies/lms` is a wow hero + filterable grid (`section_wowfilters`) + results + FAQ; `/case-studies/content` is a legacy header + CMS list.
- `content-catalogue`: topics and sector-suites share hero card, flip-logos, reviews and FAQ-legacy. The middle block differs: topics uses `content-topic_item` cards and sector-suites a split list. Treat it as a variant prop (`body: 'topics' | 'suites'`); it is classified `topics-grid` for both in the manifest. Confirm against `dumps/content__sector-suites.json#blocks[2]`.
- Near-relatives kept separate on purpose: corporate-lms / enterprise / small-business (same section vocabulary, different order and count); impact / content-service (same hero + flip-logos + feature-2col start, then they diverge).

---

## §B. Section catalogue

`reuses` names an existing homepage component when the Webflow class is the same and the geometry matches in design px (allowing for the fluid root). "variant" means the same component needs props (copy, item count, optional sub-blocks). New sections have `reuses: null`. Raw dumps for each section are listed in the manifest (`sections[].dumpFiles`, `file.json#v1440.blocks[i]`; use the same index under `v1280` / `v390`).

| id | Webflow class(es) | Templates | Reuses |
|---|---|---|---|
| `hero-wowh` | `section_wowh-hero` | feature-detail | Hero |
| `product-tabs` | `section_wowcustom-tabs` | feature-detail, page-lms | ProductTabs |
| `split-tabs` | `section_wowcustom-tabs` | page-nova, page-lms-mentoring-software | new |
| `cta-strip` | `button-block`<br>`button-group`<br>`section_header`<br>`section_pricing` | feature-detail, page-lms-small-business, page-lms-enterprise, page-lms-features, page-lms-mentoring-software | new |
| `video` | `section_kiki-video` | feature-detail, page-lms-mentoring-software | VideoSection |
| `reviews-grid` | `section_wowreviews` | page-pricing | new |
| `reviews-slider` | `section_testimonial`<br>`section_testimonial-card`<br>`section_wowreviews` | feature-detail, content-catalogue, page-lms-corporate-lms, page-lms-professional-services, page-lms-integrations, page-content, page-whats-included | new |
| `faq` | `section_wowfaqs` | feature-detail, page-lms, page-lms-small-business, page-lms-corporate-lms, page-lms-enterprise, page-lms-solutions, page-lms-spring-release, page-lms-demo-platform, page-pricing, page-lms-features, page-lms-mentoring-software, page-content-custom-content, page-mentoring, page-case-studies-lms, page-company, page-company-why-nimbus, page-whats-included, page-contact-us | Faq |
| `faq-legacy` | `section_faq` | content-catalogue, page-lms-integrations, page-content | new |
| `autotabs-cta` | `section_hero-platform` | feature-detail | KikiTabs |
| `platform-hero` | `section_hero-platform` | page-lms | new |
| `platform-intro-header` | `section_header` | page-lms | new |
| `pricing-hero` | `section_wowcontent` | page-pricing | new |
| `wowcontent-hero` | `section_wowcontent` | page-lms-small-business, page-lms-corporate-lms, page-lms-enterprise, page-lms-solutions, page-lms-spring-release, page-lms-features, page-mentoring, page-case-studies-lms, page-company-why-nimbus, page-whats-included | new |
| `logos-hero-overlap` | `section_wowlogos` | page-lms-corporate-lms | new |
| `autotabs-group` | `section_autotabs`<br>`section_wowlogos` | page-lms, page-lms-enterprise, page-lms-mentoring-software | new |
| `logos` | `padding-section-medium`<br>`section_wowlogos` | feature-detail, page-lms-small-business, page-lms-solutions, page-lms-spring-release, page-lms-demo-platform, page-lms-features, page-nova, page-mentoring, page-company, page-company-why-nimbus, page-whats-included, page-contact-us | LogoStrip |
| `features-autotabs` | `section_features` | page-lms-small-business | KikiTabs |
| `kiki-autotabs` | `section_wowautotabs` | page-lms, page-lms-corporate-lms, page-lms-enterprise, page-whats-included | KikiTabs |
| `testimonial-quote` | `padding-global > wowtestimonial_data wowtestimonail_text wowmeta_author-wrap`<br>`section > wowtestimonial_data gap-small wowtestimonail_text`<br>`section_testimonial`<br>`wowtestimonial_data` | page-lms, page-lms-corporate-lms, page-lms-enterprise, page-lms-solutions, page-lms-features, page-nova | new |
| `results` | `container-medium > section_header custom-layout sub-text-hero`<br>`container-medium > section_header custom-layout thrive-go-results`<br>`container-medium ad-page > section_header custom-layout adpage`<br>`container-medium ad-page-medium-container > section_header custom-layout sub-text-hero`<br>`container-medium pro-serve-page > section_header custom-layout adpage`<br>`padding-bottom`<br>`section > section_header custom-layout adpage`<br>`section_results` | page-lms, page-lms-small-business, page-lms-corporate-lms, page-lms-enterprise, page-lms-professional-services, page-lms-demo-platform, page-case-studies-lms, page-company, page-whats-included | Results |
| `feature-bento` | `section_feature-bento` | page-lms | new |
| `comparison-table` | `table-attempt`<br>`w-embed` | page-lms, page-lms-enterprise | new |
| `layout03-tabs` | `section > layout03-tabs_component layout03_tabs`<br>`section_layout03-tabs` | page-lms-small-business, page-lms-corporate-lms, page-lms-enterprise, page-whats-included | new |
| `wowbento` | `section_wowbento` | page-lms-small-business, page-lms-spring-release, page-mentoring, page-company-why-nimbus | new |
| `marquee` | `section_wowmarquee` | page-lms-small-business, page-mentoring | new |
| `two-col-features` | `section_2col-features` | page-lms-corporate-lms, page-lms-enterprise, page-company | new |
| `integrations-visual` | `padding-global > section_header custom-layout wowcenter_header`<br>`section_wowintegrations` | page-lms-corporate-lms, page-lms-enterprise, page-lms-features | new |
| `sticky-tabs` | `section_sticky-parent-div` | page-lms-solutions, page-lms-features | new |
| `anchor-nav` | `heading-style-h4`<br>`solutions-nav` | page-lms-solutions, page-lms-features | new |
| `testimonial-card-legacy` | `section_testimonial-card` | page-content-service, page-content-custom-content | new |
| `sectors` | `section_sectors` | page-lms-solutions, page-content | new |
| `highlight-slider` | `section_wowhighlight-slider` | page-lms-solutions, page-lms-features, page-company, page-company-why-nimbus, page-contact-us | CaseStudyCarousel |
| `related-3col-slider` | `section_wow3col-slider` | case-study-platform | EnterpriseSlider |
| `cs-platform-body` | `section_wowcstemp` | case-study-platform | new |
| `cs-filter-grid` | `section_wowfilters` | page-case-studies-lms | new |
| `kiki-header` | `section_kikiheader` | page-nova | new |
| `kiki-feature-tabs` | `section_kiki-tabs` | page-nova | new |
| `mentoring-header` | `section_mentoring-header` | page-lms-mentoring-software | new |
| `case-study-video` | `section_case-study` | page-lms-mentoring-software | new |
| `wow2col` | `section_wow2col` | page-mentoring | new |
| `company-header` | `section_company-header` | page-company | new |
| `company-news` | `section_company-news` | page-company | new |
| `content-pricing` | `section_content-pricing` | page-pricing | new |
| `spring-grid` | `section > section_center section_header custom-layout`<br>`section > section_center wowgrid-4col wowgrid_item`<br>`section background-color-secondary > section_center section_header custom-layout` | page-lms-spring-release | new |
| `demo-hero` | `section > demo-container user-avatar_group user-avatar` | page-lms-demo-platform | new |
| `features-intro` | `section > feature-large-block wowsection_header section_header-content` | page-lms-features | new |
| `why-block` | `container-medium-2` | page-company-why-nimbus | new |
| `why-kikitabs` | `section_kikitabs` | page-company-why-nimbus | new |
| `layout2-hero` | `section_layout-2_header` | case-study-content, page-lms-impact, page-content-service, page-company, page-resources-events-webinars | new |
| `flip-logos` | `section_flip-logos` | content-catalogue, page-lms-impact, page-content-service, page-content-custom-content | new |
| `feature-2col-legacy` | `section_feature_2-col` | page-lms-professional-services, page-lms-impact, page-content-service | new |
| `integrations-header` | `section_integrations_header` | page-lms-integrations | new |
| `custom-video` | `section_custom-video` | page-content-custom-content | new |
| `learn-grid` | `section_learn` | page-content-custom-content | new |
| `hero-center-legacy` | `section > component hero_header section_center`<br>`section > section_component border-top hero_header` | page-lms-professional-services, page-content-custom-content | new |
| `header-image-legacy` | `section > header_component header_wrap header_content_wrap` | page-lms-professional-services | new |
| `tabs-h-legacy` | `section > section_tabs tabs-h_component tabs-h_layout` | page-lms-professional-services | new |
| `card-slider-legacy` | `section > component section_global_header grid-gap-large`<br>`section > component section_global_header header_global`<br>`section > component section_header section-heading-padding` | page-lms-impact, page-content-service, page-content-custom-content | new |
| `pricing-pro-legacy` | `section > component section_global_header header_global` | page-lms-impact | new |
| `integration-filter` | `section > section_component filter_wrap filter_form-block` | page-lms-integrations | new |
| `blog-filter` | `section > section_component filter_wrap filter_form-block` | page-resources-blog-and-news | new |
| `blog-featured` | `section > section_component section-split border-bottom` | page-resources-blog-and-news | new |
| `events-upcoming` | `section > component section_global_header header_global` | page-resources-events-webinars | new |
| `webinars-upcoming` | `section > section_component upcoming-webinars-wrap border-bottom` | page-resources-events-webinars | new |
| `events-filter` | `section > section_component events_filters-wrap webinars_filter_content-wrap` | page-resources-events-webinars | new |
| `contact-form` | `section > component grid_section contact` | page-contact-us | new |
| `content-hero` | `section > component section_global_header header_global` | page-content | new |
| `solution-tabs` | `section > component grid-gap-medium header_global` | page-content | new |
| `topics-grid` | `section > component section_global_header header_global` | content-catalogue | new |
| `header-grid-card` | `section > component grid_section grid_card` | content-catalogue | new |
| `cs-content-stats` | `section > component grid_section grid_card` | case-study-content | new |
| `cs-content-article` | `section > section_component blog_content-wrap blog_sidebar` | case-study-content | new |
| `cs-content-related` | `section > component section_global_header header_global` | case-study-content | new |
| `cs-content-list` | `section > component cs-content_collection-wrap cs-content_collection-list` | page-case-studies-content | new |
| `global-header-legacy` | `section > component section_global_header content-case-studies`<br>`section > component section_global_header header_global` | page-case-studies-content, page-contact-us | new |
| `grid-cards-legacy` | `section > component section_global_header border-horizontal`<br>`section > component section_global_header header_global`<br>`section > grid_section grid-content-left header_global` | page-lms-professional-services, page-lms-impact, page-content | new |
| `grid-split-legacy` | `section > component grid_section grid-content-left`<br>`section > component grid_section professional-services` | content-catalogue, page-lms-professional-services, page-lms-impact | new |
| `guides-index` | `s` | page-resources-guides | new |
| `glossary-index` | `section-23` | page-resources-lms-glossary | new |
| `glossary-cta` | `container > container card-texts centered` | page-resources-lms-glossary | new |

Reuse notes (homepage component vs subpage instance, measured):
- `hero-wowh` → **Hero**. Same `.section_wowh-hero` structure, with these differences:
  - The avatar group is replaced by `.wowevebrow`: an 8×16 green (`green-hover` #00ffbf) chip with radius 4px 0, plus a one-word 18/25.2 label in `rgb(102,108,106)`.
  - No review-badge row.
  - The subtitle is grey, not white, and is ~25 words over 3 lines.
  - Buttons are primary + **dark (h44)**, not dark-small.
  - The hero image is natural 1440×1289.
  - Needs props: `eyebrow`, `showBadges`, `subtitleTone`, `secondaryVariant`.
- `product-tabs` → **ProductTabs** (`.section_wowcustom-tabs.wow-customs-homepage`; on the homepage it is `.homepage-tabs`). Same tabs/pane/child structure. Feature pages use 4 tabs and section height 1194–1354 (design). Needs props for header copy and tab items.
- `kiki-autotabs` / `features-autotabs` / `autotabs-cta` → **KikiTabs** (`.section_wowautotabs`), with variants:
  - several pages use `.wownav-logo_content` tab buttons and `.wow-slider_img` image slides (not videos), with a section header above;
  - `autotabs-cta` (`section_hero-platform` at the foot of feature pages) wraps a header + autotabs block.
  - Needs props: `tabs`, `media: 'video' | 'image'`, `header`.
- `results` → **Results** (`.wowresults_card-grid`, `.wowresults_card`). Variants:
  - cards without logo (company, professional-services);
  - with or without the testimonial;
  - CTA button variants (`button-integrations`);
  - card count 3–4.
- `highlight-slider` → **CaseStudyCarousel**. Same class. Some instances have an eyebrow chip in the header (`/lms/features`, `/company`).
- `related-3col-slider` → **EnterpriseSlider** (`.section_wow3col-slider.case-studies-story-section`). The case-study variant has a section header with a split layout.
- `video` → **VideoSection**. Same `section_kiki-video` (H2 + paragraph + 16:9 YouTube embed).
- `faq` → **Faq**. Same `.section_wowfaqs`. Only the item count changes (5–11; `/lms` has 11).
- `logos` → **LogoStrip** (`.section_wowlogos`), with variants:
  - optional header text;
  - `gap-small`;
  - logo count 4–8;
  - `is-neg-overlap` (corporate-lms, where the hero is nested inside the logos section) is a separate id, `logos-hero-overlap`.
- Everything else is new. Of note: `reviews-slider` (`.section_wowreviews` Swiper with a centre slide at scale 1 and side slides at scale .65 / opacity .5, `transition: opacity .6s, transform .6s`, prev/next arrows 46px, slide card surface-1, radius 16, padding 40, min-h 520, logo + 28/30.8 quote + author + `fit:contain` brand image absolute bottom-right) is used by 9 templates and is the highest-value new component.

---

## §D. Nav mapping

The clone's `Nav.jsx` MENUS mirror the **desktop** dropdown structure. Map each slot by index:

| Menu | Col (header) | Idx | Clone slot label | Original link | Clone path |
|---|---|---|---|---|---|
| Platform | 0 (Solutions) | 0 | Learning home | `/lms/small-business` | `/lms/small-business` |
| Platform | 0 (Solutions) | 1 | Skill journeys | `/lms/corporate-lms` | `/lms/corporate-lms` |
| Platform | 0 (Solutions) | 2 | Peer mentoring | `/lms/enterprise` | `/lms/enterprise` |
| Platform | 0 (Solutions) | 3 | Team spaces | `/lms/solutions` | `/lms/solutions` |
| Platform | 1 (More) | 0 | Integrations | `/lms/professional-services` | `/lms/professional-services` |
| Platform | 1 (More) | 1 | Security | `/lms/thrive-impact` | `/lms/impact` |
| Platform | 1 (More) | 2 | Analytics | `/lms/integrations` | `/lms/integrations` |
| Platform | 1 (More) | 3 | Pricing | `/lms/spring-release` | `/lms/spring-release` |
| Features | 0 (Experience) | 0 | Home feed | `/kiki` | `/nova` |
| Features | 0 (Experience) | 1 | Search | `/lms/mentoring-software` | `/lms/mentoring-software` |
| Features | 0 (Experience) | 2 | Mobile app | `/lms/features/lms-homepage` | `/lms/features/lms-homepage` |
| Features | 0 (Experience) | 3 | Notifications | `/lms/features/spaces` | `/lms/features/spaces` |
| Features | 0 (Experience) | 4 | Profiles | `/lms/features/chat` | `/lms/features/chat` |
| Features | 1 (Learning) | 0 | Courses | `/lms/features/learning-pathways` | `/lms/features/learning-pathways` |
| Features | 1 (Learning) | 1 | Pathways | `/lms/features/lms-analytics` | `/lms/features/lms-analytics` |
| Features | 1 (Learning) | 2 | Assessments | `/lms/features/skills` | `/lms/features/skills` |
| Features | 1 (Learning) | 3 | Events | `/lms/features/employee-assessment-software` | `/lms/features/employee-assessment-software` |
| Features | 1 (Learning) | 4 | Certificates | `/lms/features/ai-content-creator` | `/lms/features/ai-content-creator` |
| Features | 2 (Admin) | 0 | Reporting | `/lms/features/lms-admin` | `/lms/features/lms-admin` |
| Features | 2 (Admin) | 1 | Automations | `/lms/features/lms-rewards` | `/lms/features/lms-rewards` |
| Features | 2 (Admin) | 2 | User groups | `/lms/features/mcp` | `/lms/features/mcp` |
| Features | 2 (Admin) | 3 | Branding | `/lms/features/mobile-lms` | `/lms/features/mobile-lms` |
| Features | 2 (Admin) | 4 | Permissions | `/lms/features/lms-security` | `/lms/features/lms-security` |
| Content | 0 (–) | 0 | Course library | `/content/topics` | `/content/topics` |
| Content | 0 (–) | 1 | Authoring | `/content/sector-suites` | `/content/sector-suites` |
| Content | 0 (–) | 2 | Compliance packs | `/content/service` | `/content/service` |
| Content | 1 (–) | 0 | Content partners | `/mentoring` | `/mentoring` |
| Content | 1 (–) | 1 | Custom content | `/content/custom-content` | `/content/custom-content` |
| Case Studies | 0 | header link | (headerLink 'Platform') | `/case-studies/lms` | `/case-studies/lms` |
| Case Studies | 0 (Platform) | 0 | Customer one | `/case-study/avon` | `/case-study/customer-1` |
| Case Studies | 0 (Platform) | 1 | Customer two | `/case-study/british-airways` | `/case-study/customer-2` |
| Case Studies | 0 (Platform) | 2 | Customer three | `/case-study/burger-king` | `/case-study/customer-3` |
| Case Studies | 0 (Platform) | 3 | Customer four | `/case-study/international-workplace-group` | `/case-study/customer-4` |
| Case Studies | 0 (Platform) | 4 | Customer five | `/case-study/nothing-bundt-cakes` | `/case-study/customer-5` |
| Case Studies | 1 | header link | (headerLink 'Content') | `/case-studies/content` | `/case-studies/content` |
| Case Studies | 1 (Content) | 0 | Customer six | `/case-studies-contents/nhs-property-service` | `/case-studies-contents/customer-6` |
| Case Studies | 1 (Content) | 1 | Customer seven | `/case-studies-contents/specsavers` | `/case-studies-contents/customer-7` |
| Case Studies | 1 (Content) | 2 | Customer eight | `/case-studies-contents/nandos` | `/case-studies-contents/customer-8` |
| Case Studies | 1 (Content) | 3 | Customer nine | `/case-studies-contents/morrisons` | `/case-studies-contents/customer-9` |
| Case Studies | 1 (Content) | 4 | Customer ten | `/case-studies-contents/momentum-group` | `/case-studies-contents/customer-10` |
| Learn | 0 (About) | 0 | Our story | `/company/why-thrive` | `/company/why-nimbus` |
| Learn | 0 (About) | 1 | Careers | `/whats-included` | `/whats-included` |
| Learn | 0 (About) | 2 | Partners | `https://careers.thrivelearning.com/` | `https://careers.thrivelearning.com/` |
| Learn | 0 (About) | 3 | Contact | `/contact-us` | `/contact-us` |
| Learn | 1 (Resources) | 0 | Blog | `/resources/events-webinars` | `/resources/events-webinars` |
| Learn | 1 (Resources) | 1 | Guides | `/resources/blog-and-news` | `/resources/blog-and-news` |
| Learn | 1 (Resources) | 2 | Webinars | `/resources/guides` | `/resources/guides` |
| Learn | 1 (Resources) | 3 | Help centre | `/resources/lms-glossary` | `/resources/lms-glossary` |

Top-level and other links:
| Element | Original | Clone path |
|---|---|---|
| Toggle label "Platform" (it is an `<a>` inside the toggle: click navigates, hover opens) | `/lms` | `/lms` |
| Toggle label "Features" | `/lms/features` | `/lms/features` |
| Toggle label "Content" | `/content` | `/content` |
| Toggle label "Case Studies" | `/case-studies/lms` | `/case-studies/lms` |
| Toggle label "Learn" | `/company` | `/company` |
| "Book a demo→" button | `/lms/demo-platform` | `/lms/demo-platform` |
| Logo | `/` | `/` |
| "Ask why teams choose…" | external chatgpt.com query | keep external / `#` |

Desktop slot coverage: all 11 desktop columns have exactly as many items as the clone's columns. Platform 4+4, Features 5+5+5, Content 3+2, Case Studies 5+5 plus 2 header links, Learn 4+4. Every clone desktop slot has an original link. The only non-route link is Learn › About › index 2 "Careers" (`https://careers.thrivelearning.com/`, external), which is not in routes.js.

**Mobile menu (≤991) differs from desktop on the original** (`.newnav_menu-inner.mob-only`). The clone renders the desktop MENUS for mobile, so these original links have no clone slot:
- Features columns are **Core** (Kiki, Mentoring Software, Pathways, Employee experience, AI Content Creator), **Performance** (Analytics, Skills, Spaces, Communication, Performance) and **Admin** (Admin, Security, Mobile LMS, Gamification; 4 items).
- The 4 routes `/lms/features/employee-experience`, `/lms/features/communication`, `/lms/features/employee-performance-management-software` and `/lms/features/lms-gamification` are linked **only from the mobile menu**. The desktop dropdown has no slot for them (desktop has Hub, Chat, Rewards, MCP, Assessments instead).
- Learn › About on mobile is Why Thrive, **Events & Webinars**, Careers, Contact; Resources is Blog, Guides, Glossary (3 items). So `/whats-included` is desktop-only.
- A plain **"Pricing"** row (`/pricing`, class `hide-mobile-portrait`, so visible 480–991 only) sits after Learn. The clone has no slot for it. On desktop, `/pricing` is **not linked from the nav at all** (only from page CTAs and the footer). The clone's Platform › More idx 3 placeholder is labelled "Pricing", but it maps to `/lms/spring-release`; rename the placeholder label.
- Platform › Solutions › idx 1 is labelled "Mid Market" on mobile vs "Mid-sized Companies" on desktop. Same href.
- A hidden desktop link "Enterprise" (`.newnav_link.enterprise`, display none) exists. Ignore it.
- Full mobile mapping is in `pages-manifest.json → nav[]` with `viewport:"mobile"`. If the coordinator wants mobile parity, Nav.jsx needs a separate `MOBILE_MENUS` (Features 5/5/4, Learn 4/3, plus a Pricing row).

---

## §C. Per-template section order

Detailed per-section geometry and content structure (word and line counts per text node, card counts, image natural sizes) can be read from the dumps. `node digest.mjs <slug> <i>` prints `«font size/lh weight color» Nw ML "excerpt"` for every text node, so placeholder copy can match line breaks without transcribing copy. Block heights below are design-independent raw px at 1440 for the first route of each template.

### `feature-detail` (17 routes; root 17.44px at 1440)
1. `hero-wowh` → Hero: `.section_wowh-hero`, h 812 (390: see metrics)
2. `logos` → LogoStrip: `.section_wowlogos`, h 306 (390: see metrics)
3. `product-tabs` → ProductTabs: `.section_wowcustom-tabs.wow-customs-homepage`, h 1194 (390: see metrics)
4. `cta-strip`: `.section_header.custom-layout.case-study-quote-cta.feature-cta`, h 157 (390: see metrics)
5. `video` → VideoSection: `.section_kiki-video`, h 969 (390: see metrics)
6. `reviews-slider`: `.section_wowreviews`, h 968 (390: see metrics)
7. `faq` → Faq: `.section_wowfaqs`, h 576 (390: see metrics)
8. `autotabs-cta` → KikiTabs: `.section_hero-platform`, h 1660 (390: see metrics)
   - `/lms/features/learning-pathways`: hero-wowh → logos → product-tabs → cta-strip → reviews-slider → faq → autotabs-cta
   - `/lms/features/lms-analytics`: hero-wowh → logos → product-tabs → cta-strip → reviews-slider → faq → autotabs-cta
   - `/lms/features/skills`: hero-wowh → logos → product-tabs → cta-strip → reviews-slider → faq → autotabs-cta
   - `/lms/features/employee-assessment-software`: hero-wowh → logos → product-tabs → cta-strip → reviews-slider → faq → autotabs-cta
   - `/lms/features/lms-admin`: hero-wowh → logos → product-tabs → cta-strip → reviews-slider → faq → autotabs-cta
   - `/lms/features/lms-rewards`: hero-wowh → logos → product-tabs → cta-strip → reviews-slider → faq → autotabs-cta
   - `/lms/features/lms-security`: hero-wowh → logos → product-tabs → cta-strip → reviews-slider → faq → autotabs-cta
   - `/lms/features/employee-experience`: hero-wowh → logos → product-tabs → cta-strip → reviews-slider → faq → autotabs-cta
   - `/lms/features/communication`: hero-wowh → logos → product-tabs → cta-strip → reviews-slider → faq → autotabs-cta
   - `/lms/features/employee-performance-management-software`: hero-wowh → logos → product-tabs → cta-strip → reviews-slider → faq → autotabs-cta
   - `/lms/features/lms-gamification`: hero-wowh → logos → product-tabs → cta-strip → reviews-slider → faq → autotabs-cta

### `case-study-platform` (5 routes; root 17.44px at 1440)
1. `cs-platform-body`: `.section_wowcstemp`, h 4812 (390: see metrics)
2. `related-3col-slider` → EnterpriseSlider: `.section_wow3col-slider.case-studies-story-section`, h 843 (390: see metrics)

### `case-study-content` (5 routes; root 17.44px at 1440)
1. `layout2-hero`: `.section_layout-2_header`, h 750 (390: see metrics)
2. `cs-content-stats`: `.section`, h 348 (390: see metrics)
3. `cs-content-article`: `.section`, h 1551 (390: see metrics)
4. `cs-content-related`: `.section`, h 613 (390: see metrics)

### `content-catalogue` (2 routes; root 17.44px at 1440)
1. `header-grid-card`: `.section`, h 464 (390: see metrics)
2. `flip-logos`: `.section_flip-logos.section-24`, h 194 (390: see metrics)
3. `topics-grid`: `.section`, h 3355 (390: see metrics)
4. `reviews-slider`: `.section_testimonial`, h 968 (390: see metrics)
5. `faq-legacy`: `.section_faq`, h 1119 (390: see metrics)
   - `/content/sector-suites`: header-grid-card → flip-logos → grid-split-legacy → reviews-slider → faq-legacy

### `page-lms` (1 route; root 17.44px at 1440)
1. `platform-hero`: `.section_hero-platform.platform-hero`, h 852 (390: see metrics)
2. `platform-intro-header`: `.section_header.custom-layout.platform-new-header`, h 298 (390: see metrics)
3. `kiki-autotabs` → KikiTabs: `.section_wowautotabs`, h 1079 (390: see metrics)
4. `testimonial-quote`: `.section_testimonial.platform-top`, h 408 (390: see metrics)
5. `kiki-autotabs` → KikiTabs: `.section_wowautotabs.platform-new-kiki`, h 1039 (390: see metrics)
6. `testimonial-quote`: `.section_testimonial.platform-top`, h 467 (390: see metrics)
7. `autotabs-group`: `.section_wowlogos.reuslts`, h 1833 (390: see metrics)
8. `product-tabs` → ProductTabs: `.section_wowcustom-tabs.wow-customs-homepage`, h 1100 (390: see metrics)
9. `product-tabs` → ProductTabs: `.section_wowcustom-tabs.wow-customs-homepage`, h 1100 (390: see metrics)
10. `testimonial-quote`: `.section_testimonial`, h 701 (390: see metrics)
11. `feature-bento`: `.section_feature-bento`, h 1277 (390: see metrics)
12. `results` → Results: `.section`, h 1283 (390: see metrics)
13. `comparison-table`: `.w-embed`, h 999 (390: see metrics)
14. `faq` → Faq: `.section_wowfaqs`, h 1290 (390: see metrics)

### `page-lms-small-business` (1 route; root 17.44px at 1440)
1. `wowcontent-hero`: `.section_wowcontent`, h 745 (390: see metrics)
2. `logos` → LogoStrip: `.section_wowlogos`, h 167 (390: see metrics)
3. `wowbento`: `.section_wowbento`, h 1712 (390: see metrics)
4. `features-autotabs` → KikiTabs: `.section_features`, h 1306 (390: see metrics)
5. `layout03-tabs`: `.section_layout03-tabs`, h 1209 (390: see metrics)
6. `results` → Results: `.container-medium`, h 1141 (390: see metrics)
7. `marquee`: `.section_wowmarquee`, h 852 (390: see metrics)
8. `wowbento`: `.section_wowbento`, h 1126 (390: see metrics)
9. `cta-strip`: `.section_pricing`, h 227 (390: see metrics)
10. `faq` → Faq: `.section_wowfaqs`, h 1204 (390: see metrics)

### `page-lms-corporate-lms` (1 route; root 16px at 1440)
1. `wowcontent-hero`: `.section_wowcontent`, h 160 (390: see metrics)
2. `logos-hero-overlap`: `.section_wowlogos.is-neg-overlap`, h 837 (390: see metrics)
3. `kiki-autotabs` → KikiTabs: `.section_wowautotabs`, h 889 (390: see metrics)
4. `layout03-tabs`: `.section_layout03-tabs`, h 1233 (390: see metrics)
5. `testimonial-quote`: `.wowtestimonial_data.align-center.gap-small.mid-market`, h 333 (390: see metrics)
6. `results` → Results: `.container-medium`, h 771 (390: see metrics)
7. `two-col-features`: `.section_2col-features`, h 1328 (390: see metrics)
8. `integrations-visual`: `.padding-global`, h 628 (390: see metrics)
9. `reviews-slider`: `.section_wowreviews`, h 969 (390: see metrics)
10. `faq` → Faq: `.section_wowfaqs`, h 1026 (390: see metrics)

### `page-lms-enterprise` (1 route; root 16px at 1440)
1. `wowcontent-hero`: `.section_wowcontent`, h 742 (390: see metrics)
2. `kiki-autotabs` → KikiTabs: `.section_wowautotabs`, h 941 (390: see metrics)
3. `layout03-tabs`: `.section_layout03-tabs`, h 1141 (390: see metrics)
4. `autotabs-group`: `.section_autotabs`, h 1670 (390: see metrics)
5. `results` → Results: `.container-medium.ad-page`, h 1147 (390: see metrics)
6. `two-col-features`: `.section_2col-features`, h 1410 (390: see metrics)
7. `kiki-autotabs` → KikiTabs: `.section_wowautotabs`, h 1609 (390: see metrics)
8. `integrations-visual`: `.section_wowintegrations`, h 709 (390: see metrics)
9. `testimonial-quote`: `.wowtestimonial_data.align-center.gap-small.mid-market.enterprise.enterprise-2`, h 294 (390: see metrics)
10. `cta-strip`: `.button-block`, h 44 (390: see metrics)
11. `comparison-table`: `.table-attempt.w-embed`, h 903 (390: see metrics)
12. `faq` → Faq: `.section_wowfaqs`, h 1500 (390: see metrics)

### `page-lms-solutions` (1 route; root 17.44px at 1440)
1. `wowcontent-hero`: `.section_wowcontent`, h 462 (390: see metrics)
2. `logos` → LogoStrip: `.section_wowlogos`, h 219 (390: see metrics)
3. `anchor-nav`: `.heading-style-h4.solutions-nav`, h 49 (390: see metrics)
4. `sticky-tabs`: `.section_sticky-parent-div`, h 5270 (390: see metrics)
5. `testimonial-quote`: `.padding-global`, h 430 (390: see metrics)
6. `sectors`: `.section_sectors`, h 1647 (390: see metrics)
7. `highlight-slider` → CaseStudyCarousel: `.section_wowhighlight-slider`, h 1407 (390: see metrics)
8. `faq` → Faq: `.section_wowfaqs`, h 1487 (390: see metrics)

### `page-lms-professional-services` (1 route; root 17.44px at 1440)
1. `hero-center-legacy`: `.section`, h 597 (390: see metrics)
2. `results` → Results: `.container-medium.pro-serve-page`, h 621 (390: see metrics)
3. `header-image-legacy`: `.section`, h 704 (390: see metrics)
4. `grid-split-legacy`: `.section`, h 431 (390: see metrics)
5. `tabs-h-legacy`: `.section`, h 668 (390: see metrics)
6. `grid-split-legacy`: `.section`, h 286 (390: see metrics)
7. `feature-2col-legacy`: `.section_feature_2-col`, h 980 (390: see metrics)
8. `grid-cards-legacy`: `.section`, h 1219 (390: see metrics)
9. `reviews-slider`: `.section_testimonial-card`, h 968 (390: see metrics)

### `page-lms-impact` (1 route; root 17.44px at 1440)
1. `layout2-hero`: `.section_layout-2_header`, h 751 (390: see metrics)
2. `flip-logos`: `.section_flip-logos.section-24`, h 194 (390: see metrics)
3. `feature-2col-legacy`: `.section_feature_2-col`, h 1730 (390: see metrics)
4. `grid-cards-legacy`: `.section`, h 855 (390: see metrics)
5. `card-slider-legacy`: `.section`, h 1004 (390: see metrics)
6. `grid-cards-legacy`: `.section`, h 667 (390: see metrics)
7. `grid-cards-legacy`: `.section`, h 501 (390: see metrics)
8. `grid-split-legacy`: `.section`, h 498 (390: see metrics)
9. `pricing-pro-legacy`: `.section`, h 1090 (390: see metrics)

### `page-lms-integrations` (1 route; root 17.44px at 1440)
1. `integrations-header`: `.section_integrations_header`, h 1147 (390: see metrics)
2. `integration-filter`: `.section`, h 4753 (390: see metrics)
3. `reviews-slider`: `.section_wowreviews`, h 968 (390: see metrics)
4. `faq-legacy`: `.section_faq`, h 1375 (390: see metrics)

### `page-lms-spring-release` (1 route; root 17.44px at 1440)
1. `wowcontent-hero`: `.section_wowcontent`, h 1653 (390: see metrics)
2. `logos` → LogoStrip: `.section_wowlogos`, h 211 (390: see metrics)
3. `spring-grid`: `.section.background-color-secondary`, h 1281 (390: see metrics)
4. `spring-grid`: `.section`, h 1469 (390: see metrics)
5. `spring-grid`: `.section`, h 1691 (390: see metrics)
6. `spring-grid`: `.section.background-color-secondary`, h 1383 (390: see metrics)
7. `spring-grid`: `.section`, h 1578 (390: see metrics)
8. `spring-grid`: `.section`, h 1544 (390: see metrics)
9. `wowbento`: `.section_wowbento`, h 2036 (390: see metrics)
10. `faq` → Faq: `.section_wowfaqs`, h 874 (390: see metrics)

### `page-lms-demo-platform` (1 route; root 17.44px at 1440)
1. `demo-hero`: `.section`, h 949 (390: see metrics)
2. `logos` → LogoStrip: `.section_wowlogos`, h 133 (390: see metrics)
3. `results` → Results: `.container-medium.ad-page-medium-container`, h 667 (390: see metrics)
4. `faq` → Faq: `.section_wowfaqs`, h 859 (390: see metrics)

### `page-pricing` (1 route; root 17.44px at 1440)
1. `pricing-hero`: `.section_wowcontent`, h 1449 (390: see metrics)
2. `reviews-grid`: `.section_wowreviews`, h 2278 (390: see metrics)
3. `content-pricing`: `.section_content-pricing`, h 1453 (390: see metrics)
4. `faq` → Faq: `.section_wowfaqs`, h 576 (390: see metrics)

### `page-lms-features` (1 route; root 16px at 1440)
1. `wowcontent-hero`: `.section_wowcontent`, h 521 (390: see metrics)
2. `logos` → LogoStrip: `.section_wowlogos`, h 129 (390: see metrics)
3. `features-intro`: `.section`, h 296 (390: see metrics)
4. `anchor-nav`: `.padding-global`, h 45 (390: see metrics)
5. `sticky-tabs`: `.section_sticky-parent-div`, h 7333 (390: see metrics)
6. `integrations-visual`: `.section_wowintegrations`, h 768 (390: see metrics)
7. `testimonial-quote`: `.section_testimonial.platform-top`, h 476 (390: see metrics)
8. `cta-strip`: `.button-group.is-center.feature-cta`, h 44 (390: see metrics)
9. `highlight-slider` → CaseStudyCarousel: `.section_wowhighlight-slider`, h 1159 (390: see metrics)
10. `faq` → Faq: `.section_wowfaqs`, h 1161 (390: see metrics)

### `page-nova` (1 route; root 17.44px at 1440)
1. `kiki-header`: `.section_kikiheader`, h 1059 (390: see metrics)
2. `logos` → LogoStrip: `.section_wowlogos`, h 306 (390: see metrics)
3. `kiki-feature-tabs`: `.section_kiki-tabs`, h 852 (390: see metrics)
4. `kiki-feature-tabs`: `.section_kiki-tabs.reversed`, h 797 (390: see metrics)
5. `testimonial-quote`: `.section`, h 474 (390: see metrics)
6. `split-tabs`: `.section_wowcustom-tabs`, h 9541 (390: see metrics)

### `page-lms-mentoring-software` (1 route; root 17.44px at 1440)
1. `mentoring-header`: `.section_mentoring-header`, h 1293 (390: see metrics)
2. `autotabs-group`: `.section_autotabs`, h 1582 (390: see metrics)
3. `split-tabs`: `.section_wowcustom-tabs`, h 1208 (390: see metrics)
4. `case-study-video`: `.section_case-study`, h 962 (390: see metrics)
5. `video` → VideoSection: `.section_kiki-video`, h 981 (390: see metrics)
6. `cta-strip`: `.section_pricing`, h 174 (390: see metrics)
7. `faq` → Faq: `.section_wowfaqs`, h 1093 (390: see metrics)

### `page-content` (1 route; root 17.44px at 1440)
1. `content-hero`: `.section`, h 1731 (390: see metrics)
2. `sectors`: `.section_sectors`, h 957 (390: see metrics)
3. `solution-tabs`: `.section`, h 1138 (390: see metrics)
4. `grid-cards-legacy`: `.section`, h 1827 (390: see metrics)
5. `reviews-slider`: `.section_testimonial`, h 968 (390: see metrics)
6. `faq-legacy`: `.section_faq`, h 1334 (390: see metrics)

### `page-content-service` (1 route; root 17.44px at 1440)
1. `layout2-hero`: `.section_layout-2_header`, h 751 (390: see metrics)
2. `flip-logos`: `.section_flip-logos.section-24`, h 194 (390: see metrics)
3. `feature-2col-legacy`: `.section_feature_2-col`, h 991 (390: see metrics)
4. `card-slider-legacy`: `.section`, h 760 (390: see metrics)
5. `testimonial-card-legacy`: `.section_testimonial-card`, h 329 (390: see metrics)

### `page-content-custom-content` (1 route; root 17.44px at 1440)
1. `hero-center-legacy`: `.section`, h 647 (390: see metrics)
2. `flip-logos`: `.section_flip-logos.section-24`, h 194 (390: see metrics)
3. `custom-video`: `.section_custom-video`, h 966 (390: see metrics)
4. `testimonial-card-legacy`: `.section_testimonial-card`, h 301 (390: see metrics)
5. `learn-grid`: `.section_learn`, h 660 (390: see metrics)
6. `card-slider-legacy`: `.section`, h 873 (390: see metrics)
7. `faq` → Faq: `.section_wowfaqs`, h 767 (390: see metrics)

### `page-mentoring` (1 route; root 16px at 1440)
1. `wowcontent-hero`: `.section_wowcontent`, h 511 (390: see metrics)
2. `logos` → LogoStrip: `.section_wowlogos`, h 160 (390: see metrics)
3. `wow2col`: `.section_wow2col`, h 706 (390: see metrics)
4. `marquee`: `.section_wowmarquee`, h 162 (390: see metrics)
5. `wow2col`: `.section_wow2col`, h 706 (390: see metrics)
6. `marquee`: `.section_wowmarquee`, h 162 (390: see metrics)
7. `wow2col`: `.section_wow2col`, h 706 (390: see metrics)
8. `marquee`: `.section_wowmarquee`, h 162 (390: see metrics)
9. `wow2col`: `.section_wow2col`, h 706 (390: see metrics)
10. `marquee`: `.section_wowmarquee`, h 162 (390: see metrics)
11. `wowbento`: `.section_wowbento`, h 833 (390: see metrics)
12. `faq` → Faq: `.section_wowfaqs`, h 1477 (390: see metrics)

### `page-case-studies-lms` (1 route; root 17.44px at 1440)
1. `wowcontent-hero`: `.section_wowcontent`, h 838 (390: see metrics)
2. `cs-filter-grid`: `.section_wowfilters`, h 5611 (390: see metrics)
3. `results` → Results: `.container-medium`, h 756 (390: see metrics)
4. `faq` → Faq: `.section_wowfaqs`, h 920 (390: see metrics)

### `page-case-studies-content` (1 route; root 17.44px at 1440)
1. `global-header-legacy`: `.section`, h 418 (390: see metrics)
2. `cs-content-list`: `.section`, h 1312 (390: see metrics)

### `page-company` (1 route; root 17.44px at 1440)
1. `company-header`: `.section_company-header.text-color-white`, h 917 (390: see metrics)
2. `logos` → LogoStrip: `.section_wowlogos`, h 129 (390: see metrics)
3. `results` → Results: `.section_results`, h 663 (390: see metrics)
4. `two-col-features`: `.section_2col-features`, h 1517 (390: see metrics)
5. `results` → Results: `.section_results`, h 921 (390: see metrics)
6. `company-news`: `.section_company-news`, h 994 (390: see metrics)
7. `highlight-slider` → CaseStudyCarousel: `.section_wowhighlight-slider`, h 1389 (390: see metrics)
8. `layout2-hero`: `.section_layout-2_header`, h 750 (390: see metrics)
9. `faq` → Faq: `.section_wowfaqs`, h 834 (390: see metrics)

### `page-company-why-nimbus` (1 route; root 16px at 1440)
1. `wowcontent-hero`: `.section_wowcontent`, h 720 (390: see metrics)
2. `logos` → LogoStrip: `.section_wowlogos`, h 105 (390: see metrics)
3. `why-kikitabs`: `.section_kikitabs`, h 2958 (390: see metrics)
4. `wowbento`: `.section_wowbento`, h 1801 (390: see metrics)
5. `why-block`: `.container-medium-2.text-align-center.enterprise-block.why-thrive-block`, h 134 (390: see metrics)
6. `highlight-slider` → CaseStudyCarousel: `.section_wowhighlight-slider`, h 1300 (390: see metrics)
7. `faq` → Faq: `.section_wowfaqs`, h 766 (390: see metrics)

### `page-whats-included` (1 route; root 16px at 1440)
1. `wowcontent-hero`: `.section_wowcontent`, h 463 (390: see metrics)
2. `logos` → LogoStrip: `.section_wowlogos`, h 64 (390: see metrics)
3. `kiki-autotabs` → KikiTabs: `.section_wowautotabs.extra-tm.whats-included-section-tabs-2`, h 1191 (390: see metrics)
4. `layout03-tabs`: `.section`, h 833 (390: see metrics)
5. `results` → Results: `.padding-bottom.padding-xhuge.demo-stats`, h 790 (390: see metrics)
6. `reviews-slider`: `.section_wowreviews`, h 896 (390: see metrics)
7. `faq` → Faq: `.section_wowfaqs`, h 868 (390: see metrics)

### `page-contact-us` (1 route; root 17.44px at 1440)
1. `global-header-legacy`: `.section`, h 380 (390: see metrics)
2. `logos` → LogoStrip: `.padding-section-medium.hoempage-padding`, h 254 (390: see metrics)
3. `contact-form`: `.section`, h 1169 (390: see metrics)
4. `highlight-slider` → CaseStudyCarousel: `.section_wowhighlight-slider`, h 1407 (390: see metrics)
5. `faq` → Faq: `.section_wowfaqs`, h 662 (390: see metrics)

### `page-resources-events-webinars` (1 route; root 17.44px at 1440)
1. `layout2-hero`: `.section_layout-2_header`, h 750 (390: see metrics)
2. `events-upcoming`: `.section`, h 838 (390: see metrics)
3. `webinars-upcoming`: `.section`, h 277 (390: see metrics)
4. `events-filter`: `.section`, h 13777 (390: see metrics)

### `page-resources-blog-and-news` (1 route; root 17.44px at 1440)
1. `blog-featured`: `.section`, h 1090 (390: see metrics)
2. `blog-filter`: `.section`, h 5209 (390: see metrics)

### `page-resources-guides` (1 route; root 16px at 1440)
1. `guides-index`: `.s`, h 2833 (390: see metrics)

### `page-resources-lms-glossary` (1 route; root 16px at 1440)
1. `glossary-index`: `.section-23`, h 4915 (390: see metrics)
2. `glossary-cta`: `.container`, h 777 (390: see metrics)

---

## §E. Breakpoints and motion

Breakpoints are the same as homepage §14 (991 / 767 / 479), plus the fluid-root steps at 1440 / 960 / 479 (§0.1). Motion found on the subpages (from `motion/*.json`). IX2 events are filtered to elements present on each page:

| Motion | Where | Spec |
|---|---|---|
| Wow Hero Reveal (IX2 load reveal) | `hero-wowh` (all 17 feature pages) | Same as CLONE_SPEC §13.2, so reuse Hero's reveal |
| WowFaqs open/close | `faq` (32 pages); also inside `content-pricing` and nova `split-tabs` | Same as §13.8 |
| FAQ legacy accordion (`faqs_question_wrap`, "FAQ 4/6 accordion", "FAQ Content accordian") | `faq-legacy` | IX2 click open / second-click close; action lists are in `motion/content__topics.json` |
| Logos Grid / ThriveGo / Content Logos Col 1–4 (scroll-into-view, per-column flip) | `flip-logos` (5 pages) | Per-column logo flip loops; action steps are in `motion/content__service.json` |
| Stat counters (`company_stats_number-large`), list reveal | `cs-content-stats` | Scroll-into-view |
| 2Col Feature Animation (+ Reverse) | `two-col-features`, `/content` | Scroll-into-view |
| WowCard Imge Reveal | `wowbento` (spring-release, mentoring) | Scroll-into-view |
| ThriveGo header + cards | small-business hero / `wowbento` | Scroll-into-view |
| Mentoring Hero Reveal | `mentoring-header` | Load reveal |
| Pricing: modal open/close, "3/5 cards stat flip", "testimonial flip" | `pricing-hero`, `content-pricing` | Click / scroll-into-view |
| Card hovers (integrations, events, blog, guides, glossary, case-study cards) | index pages | IX2 mouse over/out |
| Content tabs hover / tabs accordion | `/content` `sectors`, `solution-tabs` | |
| Swiper `is-reviews-slider` | `reviews-slider` (25 pages) | slidesPerView 1, spaceBetween 24, loop, speed 800, **autoplay 4000**; side slides scale .65, opacity .5 (CSS transition .6s) |
| Swiper `is-wowautotabs` | `kiki-autotabs` variants | Same as homepage §5b (no autoplay) |
| Swiper `is-3-item` | `related-3col-slider`, cs index | Same as §6 (autoplay 3000, bullet 3s) |
| Swiper `is-highlight-slider` | `highlight-slider` | Same as §10 (autoplay 4000, bullet 4s) |
| Swiper `kiki-tabs_swiper` | nova `kiki-feature-tabs` | spv 1, speed 300, no loop, no autoplay; hidden ≤479 |
| ScrollTrigger `cta_blocl` | `cs-platform-body` (5 pages) | start `clamp(top 90%)`, end `clamp(bottom 60%)`, scrub .8 |
| ScrollTrigger `kikiheader_reveal-heading` | `kiki-header` | start `top 85%` (heading reveal) |
| CSS `marqueeScroll` / `marqueeScrollReverse` 30s linear infinite | `marquee` | Alternating rows |
| CSS `icon-anim-anim` 3s ease-in-out infinite alternate | `cs-platform-body` | Icon bob |
| Button hover (IX3 char roll) | every `.btn_global` | Same as §13.1 |

---

## §F. Caveats

- **Fluid root (§0.1)**: the biggest fidelity risk. Nav.jsx and Footer.jsx are px-based; on fluid routes the original nav is 87px tall at 1440 (80 on home) and the footer scales too. The coordinator needs to decide whether Layout applies the fluid root globally per route and whether the chrome moves to rem.
- **Footer subpage variant (§0.2)** needs a prop on the global Footer. This was not built, because src/ was not edited.
- `/lms/demo-platform` failed 3 times in the batch run (the page navigated during scroll), then loaded fine on a solo retry. Its data is complete.
- Earlier timeouts (british-airways, specsavers, whats-included, employee-experience) all loaded on this pass. employee-experience and communication are genuinely shorter than the other feature pages (re-dump confirmed).
- **Unmeasurable embeds**:
  - HubSpot forms: contact `contact-form`, events/blog subscribe blocks, demo hero form (the iframe is cross-origin).
  - YouTube/embedly in `video`, `case-study-video`, `custom-video` lightbox.
  - `comparison-table` (`.w-embed` raw HTML tables: `platform-table`, `table-attempt`, `vend-table`), which are measurable as DOM but are hand-written HTML.
  - CMS-driven lists (events 13.8k px tall, blog, integrations, glossary, guides, case-study filters) depend on live CMS item counts. Filters are Finsweet (`fs-` attributes).
- `/nova` (`/kiki`) `split-tabs` block is 9541px tall: it contains a long vendor comparison table and FAQ-style items inside the tabs.
- The `content-catalogue` middle block was classified as one id (`topics-grid`) for both routes, but its inner layout differs between topics and sector-suites (see §A note).
- Classification is by Webflow block class + inner component classes. Generic `section` blocks were classified by inner signature. Check ambiguous ones (`grid-cards-legacy`, `grid-split-legacy`) against the dump before building.
- Third-party overlays (HubSpot cookie banner, chat, Pathmonk, Warmly) are present on the live pages and excluded, as for the homepage.
