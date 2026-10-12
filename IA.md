# Local clone of https://www.thrivelearning.com/ -- '/' (src/pages/Home.jsx) + the 57 routes in src/routes.js

Source: Local clone of https://www.thrivelearning.com/ -- '/' (src/pages/Home.jsx) + the 57 routes in src/routes.js
Status: **measured-from-codebase** · production approved: **false**
58 routes · 33 templates · 94 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Feature detail, Case study detail (platform), Case study detail (content)) account for 27 of 58 routes (47%). The remaining 31 routes span 30 templates.

| template | routes | share |
|---|---:|---:|
| Feature detail | 17 | 29% |
| Case study detail (platform) | 5 | 9% |
| Case study detail (content) | 5 | 9% |
| Content catalogue (topics / sector suites) | 2 | 3% |
| Marketing homepage | 1 | 2% |
| Platform overview | 1 | 2% |
| Segment landing: small business | 1 | 2% |
| Segment landing: mid-market | 1 | 2% |
| Segment landing: enterprise | 1 | 2% |
| Solutions index (sticky anchor tabs) | 1 | 2% |
| Professional services (legacy grid system) | 1 | 2% |
| Impact (legacy layout, pink theme) | 1 | 2% |
| Integrations directory | 1 | 2% |
| Release notes landing | 1 | 2% |
| Book a demo | 1 | 2% |
| Pricing | 1 | 2% |
| Features index (sticky anchor tabs) | 1 | 2% |
| AI agent product page | 1 | 2% |
| Mentoring software product page | 1 | 2% |
| Content overview | 1 | 2% |
| Content service (legacy layout) | 1 | 2% |
| Custom content | 1 | 2% |
| Mentoring programmes | 1 | 2% |
| Case study index (platform, filterable) | 1 | 2% |
| Case study index (content) | 1 | 2% |
| Company | 1 | 2% |
| Why us | 1 | 2% |
| What's included | 1 | 2% |
| Contact | 1 | 2% |
| Events & webinars index | 1 | 2% |
| Blog & news index | 1 | 2% |
| Guides index | 1 | 2% |
| Glossary index | 1 | 2% |

## Page chrome

**2 routes carry chrome = `full-form-footer`** — Marketing homepage, Company.

**56 routes carry chrome = `full-cta-footer`** — Feature detail, Case study detail (platform), Case study detail (content), Content catalogue (topics / sector suites), Platform overview, Segment landing: small business, Segment landing: mid-market, Segment landing: enterprise, Solutions index (sticky anchor tabs), Professional services (legacy grid system), Impact (legacy layout, pink theme), Integrations directory, Release notes landing, Book a demo, Pricing, Features index (sticky anchor tabs), AI agent product page, Mentoring software product page, Content overview, Content service (legacy layout), Custom content, Mentoring programmes, Case study index (platform, filterable), Case study index (content), Why us, What's included, Contact, Events & webinars index, Blog & news index, Guides index, Glossary index.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.footer` | SHELL | 33 | 58 | `src/components/Footer.jsx` | Present on all 58 routes. |
| `shell.nav` | SHELL | 33 | 58 | `src/components/Nav.jsx` | Present on all 58 routes. |
| `conversion.demo-cta` | CONVERSION | 31 | 56 | `src/components/Footer.jsx` | Listed on 56 routes: Feature detail; Case study detail (platform); Case study detail (content); Content catalogue (topics / sector suites); Platform overview; Segment landing: small business; Segment landing: mid-market; Segment landing: enterprise; Solutions index (sticky anchor tabs); Professional services (legacy grid system); Impact (legacy layout, pink theme); Integrations directory; Release notes landing; Book a demo; Pricing; Features index (sticky anchor tabs); AI agent product page; Mentoring software product page; Content overview; Content service (legacy layout); Custom content; Mentoring programmes; Case study index (platform, filterable); Case study index (content); Why us; What's included; Contact; Events & webinars index; Blog & news index; Guides index; Glossary index. |
| `conversion.faq` | CONVERSION | 20 | 36 | `src/components/Faq.jsx` | Listed on 36 routes: Marketing homepage; Feature detail; Platform overview; Segment landing: small business; Segment landing: mid-market; Segment landing: enterprise; Solutions index (sticky anchor tabs); Release notes landing; Book a demo; Pricing; Features index (sticky anchor tabs); AI agent product page; Mentoring software product page; Custom content; Mentoring programmes; Case study index (platform, filterable); Company; Why us; What's included; Contact. |
| `proof.logo-row` | PROOF | 13 | 29 | `src/components/LogoStrip.jsx` | Listed on 29 routes: Marketing homepage; Feature detail; Segment landing: small business; Solutions index (sticky anchor tabs); Release notes landing; Book a demo; Features index (sticky anchor tabs); AI agent product page; Mentoring programmes; Company; Why us; What's included; Contact. |
| `proof.reviews-slider` | PROOF | 7 | 24 | `src/components/sections/ReviewsSlider.jsx` | Listed on 24 routes: Feature detail; Content catalogue (topics / sector suites); Segment landing: mid-market; Professional services (legacy grid system); Integrations directory; Content overview; What's included. |
| `conversion.cta-strip` | CONVERSION | 6 | 22 | `src/components/sections/CtaStrip.jsx` | Listed on 22 routes: Feature detail; Segment landing: small business; Segment landing: enterprise; Features index (sticky anchor tabs); AI agent product page; Mentoring software product page. |
| `product.assistant-tabs` | PRODUCT | 4 | 20 | `src/components/KikiTabs.jsx` | Listed on 20 routes: Marketing homepage; Feature detail; Platform overview; Segment landing: small business. |
| `story.brand-video` | STORY | 4 | 20 | `src/components/VideoSection.jsx` | Listed on 20 routes: Marketing homepage; Feature detail; AI agent product page; Mentoring software product page. |
| `product.feature-tabs` | PRODUCT | 3 | 19 | `src/components/ProductTabs.jsx` | Listed on 19 routes: Marketing homepage; Feature detail; Platform overview. |
| `hero.split-visual` | HERO | 2 | 18 | `src/components/Hero.jsx` | Listed on 18 routes: Marketing homepage; Feature detail. |
| `conversion.faq-empty` | CONVERSION | 1 | 17 | `src/pages/features/FeatureDetail.jsx > FaqEmpty` | Listed on 17 routes: Feature detail. |
| `product.explore-empty` | PRODUCT | 1 | 17 | `src/pages/features/FeatureDetail.jsx > ExploreEmpty` | Listed on 17 routes: Feature detail. |
| `hero.wow-content` | HERO | 10 | 10 | `src/components/sections/WowContentHero.jsx` | Listed on 10 routes: Segment landing: small business; Segment landing: mid-market; Segment landing: enterprise; Solutions index (sticky anchor tabs); Release notes landing; Features index (sticky anchor tabs); Mentoring programmes; Case study index (platform, filterable); Why us; What's included. |
| `hero.layout2-media` | HERO | 5 | 9 | `src/components/sections/Layout2Hero.jsx` | Listed on 9 routes: Case study detail (content); Impact (legacy layout, pink theme); Content service (legacy layout); Company; Events & webinars index. |
| `proof.results-stats` | PROOF | 7 | 7 | `src/components/Results.jsx` | Listed on 7 routes: Marketing homepage; Platform overview; Segment landing: small business; Segment landing: mid-market; Segment landing: enterprise; Professional services (legacy grid system); Book a demo. |
| `proof.case-study-carousel` | PROOF | 6 | 6 | `src/components/CaseStudyCarousel.jsx` | Listed on 6 routes: Marketing homepage; Solutions index (sticky anchor tabs); Features index (sticky anchor tabs); Company; Why us; Contact. |
| `proof.testimonial-quote` | PROOF | 6 | 6 | `src/components/sections/TestimonialQuote.jsx` | Listed on 6 routes: Platform overview; Segment landing: mid-market; Segment landing: enterprise; Solutions index (sticky anchor tabs); Features index (sticky anchor tabs); AI agent product page. |
| `product.capability-slider` | PRODUCT | 2 | 6 | `src/components/EnterpriseSlider.jsx` | Listed on 6 routes: Marketing homepage; Case study detail (platform). |
| `proof.flip-logos` | PROOF | 4 | 5 | `src/components/sections/FlipLogos.jsx` | Listed on 5 routes: Content catalogue (topics / sector suites); Impact (legacy layout, pink theme); Content service (legacy layout); Custom content. |
| `article.cs-content-article` | ARTICLE | 1 | 5 | `src/components/sections/CsContentArticle.jsx` | Listed on 5 routes: Case study detail (content). |
| `article.cs-platform-body` | ARTICLE | 1 | 5 | `src/components/sections/CsPlatformBody.jsx` | Listed on 5 routes: Case study detail (platform). |
| `index.cs-content-related` | INDEX | 1 | 5 | `src/components/sections/CsContentRelated.jsx` | Listed on 5 routes: Case study detail (content). |
| `proof.cs-content-stats` | PROOF | 1 | 5 | `src/components/sections/CsContentStats.jsx` | Listed on 5 routes: Case study detail (content). |
| `product.autotabs-group` | PRODUCT | 4 | 4 | `src/components/sections/AutotabsGroup.jsx` | Listed on 4 routes: Platform overview; Segment landing: enterprise; AI agent product page; Mentoring software product page. |
| `product.layout03-tabs` | PRODUCT | 4 | 4 | `src/components/sections/Layout03Tabs.jsx` | Listed on 4 routes: Segment landing: small business; Segment landing: mid-market; Segment landing: enterprise; What's included. |
| `product.wow-bento` | PRODUCT | 4 | 4 | `src/components/sections/WowBento.jsx` | Listed on 4 routes: Segment landing: small business; Release notes landing; Mentoring programmes; Why us. |
| `conversion.faq-legacy` | CONVERSION | 3 | 4 | `src/components/sections/FaqLegacy.jsx` | Listed on 4 routes: Content catalogue (topics / sector suites); Integrations directory; Content overview. |
| `story.grid-split-legacy` | STORY | 3 | 4 | `src/components/sections/GridSplitLegacy.jsx` | Listed on 4 routes: Content catalogue (topics / sector suites); Professional services (legacy grid system); Impact (legacy layout, pink theme). |
| `product.card-slider-legacy` | PRODUCT | 3 | 3 | `src/components/sections/CardSliderLegacy.jsx` | Listed on 3 routes: Impact (legacy layout, pink theme); Content service (legacy layout); Custom content. |
| `product.comparison-table` | PRODUCT | 3 | 3 | `src/components/sections/ComparisonTable.jsx` | Listed on 3 routes: Platform overview; Segment landing: enterprise; AI agent product page. |
| `product.feature-rows-legacy` | PRODUCT | 3 | 3 | `src/components/sections/FeatureTwoColLegacy.jsx` | Listed on 3 routes: Professional services (legacy grid system); Impact (legacy layout, pink theme); Content service (legacy layout). |
| `product.grid-cards-legacy` | PRODUCT | 3 | 3 | `src/components/sections/GridCardsLegacy.jsx` | Listed on 3 routes: Professional services (legacy grid system); Impact (legacy layout, pink theme); Content overview. |
| `product.integrations-visual` | PRODUCT | 3 | 3 | `src/components/sections/IntegrationsVisual.jsx` | Listed on 3 routes: Segment landing: mid-market; Segment landing: enterprise; Features index (sticky anchor tabs). |
| `product.two-col-features` | PRODUCT | 3 | 3 | `src/components/sections/TwoColFeatures.jsx` | Listed on 3 routes: Segment landing: mid-market; Segment landing: enterprise; Company. |
| `proof.centred-quote` | PROOF | 3 | 3 | `src/pages/platform/CentredQuote.jsx` | Listed on 3 routes: Platform overview; Segment landing: small business; Segment landing: enterprise. |
| `conversion.demo-form` | CONVERSION | 2 | 2 | `src/components/Footer.jsx` | Opens the footer on the 2 routes with the form footer ('/' and '/company'). |
| `hero.center-legacy` | HERO | 2 | 2 | `src/components/sections/HeroCenterLegacy.jsx` | Listed on 2 routes: Professional services (legacy grid system); Custom content. |
| `hero.global-header-legacy` | HERO | 2 | 2 | `src/components/sections/GlobalHeaderLegacy.jsx` | Listed on 2 routes: Case study index (content); Contact. |
| `product.anchor-intro` | PRODUCT | 2 | 2 | `src/components/sections/AnchorNav.jsx` | Listed on 2 routes: Solutions index (sticky anchor tabs); Features index (sticky anchor tabs). |
| `product.sector-tabs` | PRODUCT | 2 | 2 | `src/components/sections/Sectors.jsx` | Listed on 2 routes: Solutions index (sticky anchor tabs); Content overview. |
| `product.split-autotabs` | PRODUCT | 2 | 2 | `src/pages/platform/SplitAutotabs.jsx` | Listed on 2 routes: Segment landing: mid-market; Segment landing: enterprise. |
| `product.split-tabs` | PRODUCT | 2 | 2 | `src/components/sections/SplitTabs.jsx` | Listed on 2 routes: AI agent product page; Mentoring software product page. |
| `product.sticky-tabs` | PRODUCT | 2 | 2 | `src/components/sections/StickyTabs.jsx` | Listed on 2 routes: Solutions index (sticky anchor tabs); Features index (sticky anchor tabs). |
| `proof.results-proof` | PROOF | 2 | 2 | `src/pages/company/ProofResults.jsx` | Listed on 2 routes: Company; What's included. |
| `proof.testimonial-card-legacy` | PROOF | 2 | 2 | `src/components/sections/TestimonialCardLegacy.jsx` | Listed on 2 routes: Content service (legacy layout); Custom content. |
| `story.marquee` | STORY | 2 | 2 | `src/components/sections/Marquee.jsx` | Listed on 2 routes: Segment landing: small business; Mentoring programmes. |
| `hero.header-grid-card` | HERO | 1 | 2 | `src/components/sections/HeaderGridCard.jsx` | Listed on 2 routes: Content catalogue (topics / sector suites). |
| `index.topics-grid` | INDEX | 1 | 2 | `src/components/sections/TopicsGrid.jsx` | Listed on 2 routes: Content catalogue (topics / sector suites). |
| `conversion.contact-form` | CONVERSION | 1 | 1 | `src/components/sections/ContactForm.jsx` | Listed on 1 route: Contact. |
| `conversion.content-pricing` | CONVERSION | 1 | 1 | `src/components/sections/ContentPricing.jsx` | Listed on 1 route: Pricing. |
| `conversion.glossary-cta` | CONVERSION | 1 | 1 | `src/components/sections/GlossaryCta.jsx` | Listed on 1 route: Glossary index. |
| `conversion.pricing-plans-legacy` | CONVERSION | 1 | 1 | `src/components/sections/PricingProLegacy.jsx` | Listed on 1 route: Impact (legacy layout, pink theme). |
| `conversion.why-cta` | CONVERSION | 1 | 1 | `src/components/sections/WhyBlock.jsx` | Listed on 1 route: Why us. |
| `hero.assistant-video` | HERO | 1 | 1 | `src/components/sections/KikiHeader.jsx` | Listed on 1 route: AI agent product page. |
| `hero.company-video` | HERO | 1 | 1 | `src/components/sections/CompanyHeader.jsx` | Listed on 1 route: Company. |
| `hero.content-overview` | HERO | 1 | 1 | `src/components/sections/ContentHero.jsx` | Listed on 1 route: Content overview. |
| `hero.demo-form` | HERO | 1 | 1 | `src/components/sections/DemoHero.jsx` | Listed on 1 route: Book a demo. |
| `hero.integrations-header` | HERO | 1 | 1 | `src/components/sections/IntegrationsHeader.jsx` | Listed on 1 route: Integrations directory. |
| `hero.logos-overlap` | HERO | 1 | 1 | `src/components/sections/LogosHeroOverlap.jsx` | Listed on 1 route: Segment landing: mid-market. |
| `hero.mentoring-software` | HERO | 1 | 1 | `src/components/sections/MentoringHeader.jsx` | Listed on 1 route: Mentoring software product page. |
| `hero.platform` | HERO | 1 | 1 | `src/components/sections/PlatformHero.jsx` | Listed on 1 route: Platform overview. |
| `hero.pricing-calculator` | HERO | 1 | 1 | `src/components/sections/PricingHero.jsx` | Listed on 1 route: Pricing. |
| `index.blog-featured` | INDEX | 1 | 1 | `src/components/sections/BlogFeatured.jsx` | Listed on 1 route: Blog & news index. |
| `index.blog-filter` | INDEX | 1 | 1 | `src/components/sections/BlogFilter.jsx` | Listed on 1 route: Blog & news index. |
| `index.cs-content-list` | INDEX | 1 | 1 | `src/components/sections/CsContentList.jsx` | Listed on 1 route: Case study index (content). |
| `index.cs-filter-grid` | INDEX | 1 | 1 | `src/components/sections/CsFilterGrid.jsx` | Listed on 1 route: Case study index (platform, filterable). |
| `index.events-past` | INDEX | 1 | 1 | `src/components/sections/EventsFilter.jsx` | Listed on 1 route: Events & webinars index. |
| `index.events-upcoming` | INDEX | 1 | 1 | `src/components/sections/EventsUpcoming.jsx` | Listed on 1 route: Events & webinars index. |
| `index.glossary` | INDEX | 1 | 1 | `src/components/sections/GlossaryIndex.jsx` | Listed on 1 route: Glossary index. |
| `index.guides` | INDEX | 1 | 1 | `src/components/sections/GuidesIndex.jsx` | Listed on 1 route: Guides index. |
| `index.integration-filter` | INDEX | 1 | 1 | `src/components/sections/IntegrationFilter.jsx` | Listed on 1 route: Integrations directory. |
| `index.webinars-upcoming` | INDEX | 1 | 1 | `src/components/sections/WebinarsUpcoming.jsx` | Listed on 1 route: Events & webinars index. |
| `product.assistant-feature-tabs` | PRODUCT | 1 | 1 | `src/components/sections/KikiFeatureTabs.jsx` | Listed on 1 route: AI agent product page. |
| `product.feature-bento` | PRODUCT | 1 | 1 | `src/components/sections/FeatureBento.jsx` | Listed on 1 route: Platform overview. |
| `product.features-intro` | PRODUCT | 1 | 1 | `src/components/sections/FeaturesIntro.jsx` | Listed on 1 route: Features index (sticky anchor tabs). |
| `product.included-tabs` | PRODUCT | 1 | 1 | `src/pages/company/IncludedTabs.jsx` | Listed on 1 route: What's included. |
| `product.learn-grid` | PRODUCT | 1 | 1 | `src/components/sections/LearnGrid.jsx` | Listed on 1 route: Custom content. |
| `product.platform-intro` | PRODUCT | 1 | 1 | `src/components/sections/PlatformIntroHeader.jsx` | Listed on 1 route: Platform overview. |
| `product.release-block` | PRODUCT | 1 | 1 | `src/components/sections/SpringGrid.jsx` | Listed on 1 route: Release notes landing. |
| `product.solution-tabs` | PRODUCT | 1 | 1 | `src/components/sections/SolutionTabs.jsx` | Listed on 1 route: Content overview. |
| `product.tabs-horizontal-legacy` | PRODUCT | 1 | 1 | `src/components/sections/TabsHLegacy.jsx` | Listed on 1 route: Professional services (legacy grid system). |
| `product.why-assistant-tabs` | PRODUCT | 1 | 1 | `src/components/sections/WhyKikitabs.jsx` | Listed on 1 route: Why us. |
| `proof.case-results` | PROOF | 1 | 1 | `src/pages/content/CaseStudiesLms.jsx > CaseStudyResults` | Listed on 1 route: Case study index (platform, filterable). |
| `proof.case-study-video` | PROOF | 1 | 1 | `src/components/sections/CaseStudyVideo.jsx` | Listed on 1 route: Mentoring software product page. |
| `proof.reviews-grid` | PROOF | 1 | 1 | `src/components/sections/ReviewsGrid.jsx` | Listed on 1 route: Pricing. |
| `proof.stats-countup` | PROOF | 1 | 1 | `src/pages/company/StatsResults.jsx` | Listed on 1 route: Company. |
| `proof.testimonial` | PROOF | 1 | 1 | `src/components/Results.jsx` | Listed on 1 route: Marketing homepage. |
| `story.company-news` | STORY | 1 | 1 | `src/components/sections/CompanyNews.jsx` | Listed on 1 route: Company. |
| `story.custom-video` | STORY | 1 | 1 | `src/components/sections/CustomVideo.jsx` | Listed on 1 route: Custom content. |
| `story.header-image-legacy` | STORY | 1 | 1 | `src/components/sections/HeaderImageLegacy.jsx` | Listed on 1 route: Professional services (legacy grid system). |
| `story.scroll-quote` | STORY | 1 | 1 | `src/components/QuoteHighlight.jsx` | Listed on 1 route: Marketing homepage. |
| `story.wow-2col` | STORY | 1 | 1 | `src/components/sections/Wow2col.jsx` | Listed on 1 route: Mentoring programmes. |
| `story.zoom-statement` | STORY | 1 | 1 | `src/components/Statement.jsx` | Listed on 1 route: Marketing homepage. |

**41 shared sections** appear in more than one template and belong in a component library.

**53 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Marketing homepage — `template.home`

1 route · `/` · chrome: **full-form-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.split-visual` | shared ×2 |
| 3 | PROOF | `proof.logo-row` | shared ×13 |
| 4 | PRODUCT | `product.feature-tabs` | shared ×3 |
| 5 | PRODUCT | `product.assistant-tabs` | shared ×4 |
| 6 | PRODUCT | `product.capability-slider` | shared ×2 |
| 7 | PROOF | `proof.results-stats` | shared ×7 |
| 8 | PROOF | `proof.testimonial` | page-local |
| 9 | STORY | `story.zoom-statement` | page-local |
| 10 | STORY | `story.scroll-quote` | page-local |
| 11 | PROOF | `proof.case-study-carousel` | shared ×6 |
| 12 | STORY | `story.brand-video` | shared ×4 |
| 13 | CONVERSION | `conversion.faq` | shared ×20 |
| 14 | CONVERSION | `conversion.demo-form` | shared ×2 |
| 15 | SHELL | `shell.footer` | shared ×33 |

### Feature detail — `template.feature-detail`

17 routes · `/lms/features/{slug}` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.split-visual` | shared ×2 |
| 3 | PROOF | `proof.logo-row` | shared ×13 |
| 4 | PRODUCT | `product.feature-tabs` | shared ×3 |
| 5 | CONVERSION | `conversion.cta-strip` | shared ×6 |
| 6 | STORY | `story.brand-video` | shared ×4 |
| 7 | PROOF | `proof.reviews-slider` | shared ×7 |
| 8 | CONVERSION | `conversion.faq` | shared ×20 |
| 9 | CONVERSION | `conversion.faq-empty` | page-local |
| 10 | PRODUCT | `product.assistant-tabs` | shared ×4 |
| 11 | PRODUCT | `product.explore-empty` | page-local |
| 12 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 13 | SHELL | `shell.footer` | shared ×33 |

### Case study detail (platform) — `template.case-study-platform`

5 routes · `/case-study/customer-{N}` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | ARTICLE | `article.cs-platform-body` | page-local |
| 3 | PRODUCT | `product.capability-slider` | shared ×2 |
| 4 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 5 | SHELL | `shell.footer` | shared ×33 |

### Case study detail (content) — `template.case-study-content`

5 routes · `/case-studies-contents/customer-{N}` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.layout2-media` | shared ×5 |
| 3 | PROOF | `proof.cs-content-stats` | page-local |
| 4 | ARTICLE | `article.cs-content-article` | page-local |
| 5 | INDEX | `index.cs-content-related` | page-local |
| 6 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 7 | SHELL | `shell.footer` | shared ×33 |

### Content catalogue (topics / sector suites) — `template.content-catalogue`

2 routes · `/content/topics`, `/content/sector-suites` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.header-grid-card` | page-local |
| 3 | PROOF | `proof.flip-logos` | shared ×4 |
| 4 | INDEX | `index.topics-grid` | page-local |
| 5 | STORY | `story.grid-split-legacy` | shared ×3 |
| 6 | PROOF | `proof.reviews-slider` | shared ×7 |
| 7 | CONVERSION | `conversion.faq-legacy` | shared ×3 |
| 8 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 9 | SHELL | `shell.footer` | shared ×33 |

### Platform overview — `template.lms`

1 route · `/lms` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.platform` | page-local |
| 3 | PRODUCT | `product.platform-intro` | page-local |
| 4 | PRODUCT | `product.assistant-tabs` | shared ×4 |
| 5 | PROOF | `proof.testimonial-quote` | shared ×6 |
| 6 | PRODUCT | `product.assistant-tabs` | shared ×4 |
| 7 | PROOF | `proof.testimonial-quote` | shared ×6 |
| 8 | PRODUCT | `product.autotabs-group` | shared ×4 |
| 9 | PRODUCT | `product.feature-tabs` | shared ×3 |
| 10 | PRODUCT | `product.feature-tabs` | shared ×3 |
| 11 | PROOF | `proof.testimonial-quote` | shared ×6 |
| 12 | PRODUCT | `product.feature-bento` | page-local |
| 13 | PROOF | `proof.results-stats` | shared ×7 |
| 14 | PROOF | `proof.centred-quote` | shared ×3 |
| 15 | PRODUCT | `product.comparison-table` | shared ×3 |
| 16 | CONVERSION | `conversion.faq` | shared ×20 |
| 17 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 18 | SHELL | `shell.footer` | shared ×33 |

### Segment landing: small business — `template.lms-small-business`

1 route · `/lms/small-business` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.wow-content` | shared ×10 |
| 3 | PROOF | `proof.logo-row` | shared ×13 |
| 4 | PRODUCT | `product.wow-bento` | shared ×4 |
| 5 | PRODUCT | `product.assistant-tabs` | shared ×4 |
| 6 | PRODUCT | `product.layout03-tabs` | shared ×4 |
| 7 | PROOF | `proof.results-stats` | shared ×7 |
| 8 | PROOF | `proof.centred-quote` | shared ×3 |
| 9 | STORY | `story.marquee` | shared ×2 |
| 10 | PRODUCT | `product.wow-bento` | shared ×4 |
| 11 | CONVERSION | `conversion.cta-strip` | shared ×6 |
| 12 | CONVERSION | `conversion.faq` | shared ×20 |
| 13 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 14 | SHELL | `shell.footer` | shared ×33 |

### Segment landing: mid-market — `template.lms-corporate`

1 route · `/lms/corporate-lms` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.wow-content` | shared ×10 |
| 3 | HERO | `hero.logos-overlap` | page-local |
| 4 | PRODUCT | `product.split-autotabs` | shared ×2 |
| 5 | PRODUCT | `product.layout03-tabs` | shared ×4 |
| 6 | PROOF | `proof.testimonial-quote` | shared ×6 |
| 7 | PROOF | `proof.results-stats` | shared ×7 |
| 8 | PRODUCT | `product.two-col-features` | shared ×3 |
| 9 | PRODUCT | `product.integrations-visual` | shared ×3 |
| 10 | PROOF | `proof.reviews-slider` | shared ×7 |
| 11 | CONVERSION | `conversion.faq` | shared ×20 |
| 12 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 13 | SHELL | `shell.footer` | shared ×33 |

### Segment landing: enterprise — `template.lms-enterprise`

1 route · `/lms/enterprise` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.wow-content` | shared ×10 |
| 3 | PRODUCT | `product.split-autotabs` | shared ×2 |
| 4 | PRODUCT | `product.layout03-tabs` | shared ×4 |
| 5 | PRODUCT | `product.autotabs-group` | shared ×4 |
| 6 | PROOF | `proof.results-stats` | shared ×7 |
| 7 | PROOF | `proof.centred-quote` | shared ×3 |
| 8 | PRODUCT | `product.two-col-features` | shared ×3 |
| 9 | PRODUCT | `product.split-autotabs` | shared ×2 |
| 10 | PRODUCT | `product.integrations-visual` | shared ×3 |
| 11 | PROOF | `proof.testimonial-quote` | shared ×6 |
| 12 | CONVERSION | `conversion.cta-strip` | shared ×6 |
| 13 | PRODUCT | `product.comparison-table` | shared ×3 |
| 14 | CONVERSION | `conversion.faq` | shared ×20 |
| 15 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 16 | SHELL | `shell.footer` | shared ×33 |

### Solutions index (sticky anchor tabs) — `template.lms-solutions`

1 route · `/lms/solutions` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.wow-content` | shared ×10 |
| 3 | PROOF | `proof.logo-row` | shared ×13 |
| 4 | PRODUCT | `product.anchor-intro` | shared ×2 |
| 5 | PRODUCT | `product.sticky-tabs` | shared ×2 |
| 6 | PROOF | `proof.testimonial-quote` | shared ×6 |
| 7 | PRODUCT | `product.sector-tabs` | shared ×2 |
| 8 | PROOF | `proof.case-study-carousel` | shared ×6 |
| 9 | CONVERSION | `conversion.faq` | shared ×20 |
| 10 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 11 | SHELL | `shell.footer` | shared ×33 |

### Professional services (legacy grid system) — `template.lms-professional-services`

1 route · `/lms/professional-services` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.center-legacy` | shared ×2 |
| 3 | PROOF | `proof.results-stats` | shared ×7 |
| 4 | STORY | `story.header-image-legacy` | page-local |
| 5 | STORY | `story.grid-split-legacy` | shared ×3 |
| 6 | PRODUCT | `product.tabs-horizontal-legacy` | page-local |
| 7 | STORY | `story.grid-split-legacy` | shared ×3 |
| 8 | PRODUCT | `product.feature-rows-legacy` | shared ×3 |
| 9 | PRODUCT | `product.grid-cards-legacy` | shared ×3 |
| 10 | PROOF | `proof.reviews-slider` | shared ×7 |
| 11 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 12 | SHELL | `shell.footer` | shared ×33 |

### Impact (legacy layout, pink theme) — `template.lms-impact`

1 route · `/lms/impact` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.layout2-media` | shared ×5 |
| 3 | PROOF | `proof.flip-logos` | shared ×4 |
| 4 | PRODUCT | `product.feature-rows-legacy` | shared ×3 |
| 5 | PRODUCT | `product.grid-cards-legacy` | shared ×3 |
| 6 | PRODUCT | `product.card-slider-legacy` | shared ×3 |
| 7 | PRODUCT | `product.grid-cards-legacy` | shared ×3 |
| 8 | PRODUCT | `product.grid-cards-legacy` | shared ×3 |
| 9 | STORY | `story.grid-split-legacy` | shared ×3 |
| 10 | CONVERSION | `conversion.pricing-plans-legacy` | page-local |
| 11 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 12 | SHELL | `shell.footer` | shared ×33 |

### Integrations directory — `template.lms-integrations`

1 route · `/lms/integrations` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.integrations-header` | page-local |
| 3 | INDEX | `index.integration-filter` | page-local |
| 4 | PROOF | `proof.reviews-slider` | shared ×7 |
| 5 | CONVERSION | `conversion.faq-legacy` | shared ×3 |
| 6 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 7 | SHELL | `shell.footer` | shared ×33 |

### Release notes landing — `template.lms-spring-release`

1 route · `/lms/spring-release` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.wow-content` | shared ×10 |
| 3 | PROOF | `proof.logo-row` | shared ×13 |
| 4 | PRODUCT | `product.release-block` | page-local |
| 5 | PRODUCT | `product.wow-bento` | shared ×4 |
| 6 | CONVERSION | `conversion.faq` | shared ×20 |
| 7 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 8 | SHELL | `shell.footer` | shared ×33 |

### Book a demo — `template.lms-demo-platform`

1 route · `/lms/demo-platform` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.demo-form` | page-local |
| 3 | PROOF | `proof.logo-row` | shared ×13 |
| 4 | PROOF | `proof.results-stats` | shared ×7 |
| 5 | CONVERSION | `conversion.faq` | shared ×20 |
| 6 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 7 | SHELL | `shell.footer` | shared ×33 |

### Pricing — `template.pricing`

1 route · `/pricing` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.pricing-calculator` | page-local |
| 3 | PROOF | `proof.reviews-grid` | page-local |
| 4 | CONVERSION | `conversion.content-pricing` | page-local |
| 5 | CONVERSION | `conversion.faq` | shared ×20 |
| 6 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 7 | SHELL | `shell.footer` | shared ×33 |

### Features index (sticky anchor tabs) — `template.lms-features`

1 route · `/lms/features` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.wow-content` | shared ×10 |
| 3 | PROOF | `proof.logo-row` | shared ×13 |
| 4 | PRODUCT | `product.features-intro` | page-local |
| 5 | PRODUCT | `product.anchor-intro` | shared ×2 |
| 6 | PRODUCT | `product.sticky-tabs` | shared ×2 |
| 7 | PRODUCT | `product.integrations-visual` | shared ×3 |
| 8 | PROOF | `proof.testimonial-quote` | shared ×6 |
| 9 | CONVERSION | `conversion.cta-strip` | shared ×6 |
| 10 | PROOF | `proof.case-study-carousel` | shared ×6 |
| 11 | CONVERSION | `conversion.faq` | shared ×20 |
| 12 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 13 | SHELL | `shell.footer` | shared ×33 |

### AI agent product page — `template.nova`

1 route · `/nova` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.assistant-video` | page-local |
| 3 | PROOF | `proof.logo-row` | shared ×13 |
| 4 | PRODUCT | `product.assistant-feature-tabs` | page-local |
| 5 | PRODUCT | `product.assistant-feature-tabs` | page-local |
| 6 | CONVERSION | `conversion.cta-strip` | shared ×6 |
| 7 | PROOF | `proof.testimonial-quote` | shared ×6 |
| 8 | PRODUCT | `product.split-tabs` | shared ×2 |
| 9 | PRODUCT | `product.comparison-table` | shared ×3 |
| 10 | PRODUCT | `product.autotabs-group` | shared ×4 |
| 11 | STORY | `story.brand-video` | shared ×4 |
| 12 | CONVERSION | `conversion.faq` | shared ×20 |
| 13 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 14 | SHELL | `shell.footer` | shared ×33 |

### Mentoring software product page — `template.lms-mentoring-software`

1 route · `/lms/mentoring-software` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.mentoring-software` | page-local |
| 3 | PRODUCT | `product.autotabs-group` | shared ×4 |
| 4 | PRODUCT | `product.split-tabs` | shared ×2 |
| 5 | PROOF | `proof.case-study-video` | page-local |
| 6 | STORY | `story.brand-video` | shared ×4 |
| 7 | CONVERSION | `conversion.cta-strip` | shared ×6 |
| 8 | CONVERSION | `conversion.faq` | shared ×20 |
| 9 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 10 | SHELL | `shell.footer` | shared ×33 |

### Content overview — `template.content-overview`

1 route · `/content` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.content-overview` | page-local |
| 3 | PRODUCT | `product.sector-tabs` | shared ×2 |
| 4 | PRODUCT | `product.solution-tabs` | page-local |
| 5 | PRODUCT | `product.grid-cards-legacy` | shared ×3 |
| 6 | PROOF | `proof.reviews-slider` | shared ×7 |
| 7 | CONVERSION | `conversion.faq-legacy` | shared ×3 |
| 8 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 9 | SHELL | `shell.footer` | shared ×33 |

### Content service (legacy layout) — `template.content-service`

1 route · `/content/service` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.layout2-media` | shared ×5 |
| 3 | PROOF | `proof.flip-logos` | shared ×4 |
| 4 | PRODUCT | `product.feature-rows-legacy` | shared ×3 |
| 5 | PRODUCT | `product.card-slider-legacy` | shared ×3 |
| 6 | PROOF | `proof.testimonial-card-legacy` | shared ×2 |
| 7 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 8 | SHELL | `shell.footer` | shared ×33 |

### Custom content — `template.content-custom`

1 route · `/content/custom-content` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.center-legacy` | shared ×2 |
| 3 | PROOF | `proof.flip-logos` | shared ×4 |
| 4 | STORY | `story.custom-video` | page-local |
| 5 | PROOF | `proof.testimonial-card-legacy` | shared ×2 |
| 6 | PRODUCT | `product.learn-grid` | page-local |
| 7 | PRODUCT | `product.card-slider-legacy` | shared ×3 |
| 8 | CONVERSION | `conversion.faq` | shared ×20 |
| 9 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 10 | SHELL | `shell.footer` | shared ×33 |

### Mentoring programmes — `template.mentoring`

1 route · `/mentoring` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.wow-content` | shared ×10 |
| 3 | PROOF | `proof.logo-row` | shared ×13 |
| 4 | STORY | `story.wow-2col` | page-local |
| 5 | STORY | `story.marquee` | shared ×2 |
| 6 | STORY | `story.wow-2col` | page-local |
| 7 | STORY | `story.marquee` | shared ×2 |
| 8 | STORY | `story.wow-2col` | page-local |
| 9 | STORY | `story.marquee` | shared ×2 |
| 10 | STORY | `story.wow-2col` | page-local |
| 11 | STORY | `story.marquee` | shared ×2 |
| 12 | PRODUCT | `product.wow-bento` | shared ×4 |
| 13 | CONVERSION | `conversion.faq` | shared ×20 |
| 14 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 15 | SHELL | `shell.footer` | shared ×33 |

### Case study index (platform, filterable) — `template.case-studies-lms`

1 route · `/case-studies/lms` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.wow-content` | shared ×10 |
| 3 | INDEX | `index.cs-filter-grid` | page-local |
| 4 | PROOF | `proof.case-results` | page-local |
| 5 | CONVERSION | `conversion.faq` | shared ×20 |
| 6 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 7 | SHELL | `shell.footer` | shared ×33 |

### Case study index (content) — `template.case-studies-content`

1 route · `/case-studies/content` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.global-header-legacy` | shared ×2 |
| 3 | INDEX | `index.cs-content-list` | page-local |
| 4 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 5 | SHELL | `shell.footer` | shared ×33 |

### Company — `template.company`

1 route · `/company` · chrome: **full-form-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.company-video` | page-local |
| 3 | PROOF | `proof.logo-row` | shared ×13 |
| 4 | PROOF | `proof.stats-countup` | page-local |
| 5 | PRODUCT | `product.two-col-features` | shared ×3 |
| 6 | PROOF | `proof.results-proof` | shared ×2 |
| 7 | STORY | `story.company-news` | page-local |
| 8 | PROOF | `proof.case-study-carousel` | shared ×6 |
| 9 | HERO | `hero.layout2-media` | shared ×5 |
| 10 | CONVERSION | `conversion.faq` | shared ×20 |
| 11 | CONVERSION | `conversion.demo-form` | shared ×2 |
| 12 | SHELL | `shell.footer` | shared ×33 |

### Why us — `template.company-why`

1 route · `/company/why-nimbus` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.wow-content` | shared ×10 |
| 3 | PROOF | `proof.logo-row` | shared ×13 |
| 4 | PRODUCT | `product.why-assistant-tabs` | page-local |
| 5 | PRODUCT | `product.wow-bento` | shared ×4 |
| 6 | CONVERSION | `conversion.why-cta` | page-local |
| 7 | PROOF | `proof.case-study-carousel` | shared ×6 |
| 8 | CONVERSION | `conversion.faq` | shared ×20 |
| 9 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 10 | SHELL | `shell.footer` | shared ×33 |

### What's included — `template.whats-included`

1 route · `/whats-included` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.wow-content` | shared ×10 |
| 3 | PROOF | `proof.logo-row` | shared ×13 |
| 4 | PRODUCT | `product.included-tabs` | page-local |
| 5 | PRODUCT | `product.layout03-tabs` | shared ×4 |
| 6 | PROOF | `proof.results-proof` | shared ×2 |
| 7 | PROOF | `proof.reviews-slider` | shared ×7 |
| 8 | CONVERSION | `conversion.faq` | shared ×20 |
| 9 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 10 | SHELL | `shell.footer` | shared ×33 |

### Contact — `template.contact-us`

1 route · `/contact-us` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.global-header-legacy` | shared ×2 |
| 3 | PROOF | `proof.logo-row` | shared ×13 |
| 4 | CONVERSION | `conversion.contact-form` | page-local |
| 5 | PROOF | `proof.case-study-carousel` | shared ×6 |
| 6 | CONVERSION | `conversion.faq` | shared ×20 |
| 7 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 8 | SHELL | `shell.footer` | shared ×33 |

### Events & webinars index — `template.events-webinars`

1 route · `/resources/events-webinars` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | HERO | `hero.layout2-media` | shared ×5 |
| 3 | INDEX | `index.events-upcoming` | page-local |
| 4 | INDEX | `index.webinars-upcoming` | page-local |
| 5 | INDEX | `index.events-past` | page-local |
| 6 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 7 | SHELL | `shell.footer` | shared ×33 |

### Blog & news index — `template.blog-and-news`

1 route · `/resources/blog-and-news` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | INDEX | `index.blog-featured` | page-local |
| 3 | INDEX | `index.blog-filter` | page-local |
| 4 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 5 | SHELL | `shell.footer` | shared ×33 |

### Guides index — `template.guides`

1 route · `/resources/guides` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | INDEX | `index.guides` | page-local |
| 3 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 4 | SHELL | `shell.footer` | shared ×33 |

### Glossary index — `template.lms-glossary`

1 route · `/resources/lms-glossary` · chrome: **full-cta-footer**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.nav` | shared ×33 |
| 2 | INDEX | `index.glossary` | page-local |
| 3 | CONVERSION | `conversion.glossary-cta` | page-local |
| 4 | CONVERSION | `conversion.demo-cta` | shared ×31 |
| 5 | SHELL | `shell.footer` | shared ×33 |

## Section reference

### SHELL

_Site chrome on every route: fixed navigation and footer card (rendered once by Layout.jsx)._

**`shell.footer`** — Dark rounded footer card: 'ask an AI' icon row, wordmark + socials, four link columns, rating and award badges, compliance line and legal drop-up menus.

· Present on all 58 routes. · appears on 58 routes · implemented by `src/components/Footer.jsx`

**`shell.nav`** — Fixed, transparent top bar: wordmark, centred pill of hover-open dropdown menus (300ms close delay), AI 'Ask' link, primary 'Book a demo' button; collapses to a full-screen menu at <=991px.

· Present on all 58 routes. · appears on 58 routes · implemented by `src/components/Nav.jsx`

### HERO

_Page-opening block carrying the page H1 (or a mid-page reuse of a hero component, see SECONDARY_HERO_USES)._

**`hero.assistant-video`** — Full-width stage (/nova) 85vh tall (max 60rem) holding a centred 1440:500 background-video band; under it a centred block (max 42rem): serif 4rem/1.1 H1 with one italic word, grey intro with a bold phrase, and primary + dark buttons (the dark one carries an AI icon). <=767 the block is pulled up -12rem over the stage; <=479 the video band becomes 3:2, 15rem tall.

· Listed on 1 route: AI agent product page. · appears on 1 routes · implemented by `src/components/sections/KikiHeader.jsx`

**`hero.center-legacy`** — Centred hero inside hairline frame lines in the legacy theme colours. One component with `variant`: 'services' (/lms/professional-services; full hairline box, eyebrow tag, H1 3.8rem/1.1 max 60rem, ink paragraph, theme pill button stacked over 3 overlapping avatars + proof line) and 'custom' (/content/custom-content; top + side hairlines, extra 4rem top padding, 115x38 brand logo slot, H1 3.8rem/1.15 max 41.2rem, paragraph, button). Padding steps down at 991/767/479. Same component reused on subpages with a variant prop (services, custom). Same component reused on subpages with a variant prop (services, custom). Same component reused on subpages with a variant prop (services, custom). Same component reused on subpages with a variant prop (services, custom). Same component reused on subpages with a variant prop (services, custom).

· Listed on 2 routes: Professional services (legacy grid system); Custom content. · appears on 2 routes · implemented by `src/components/sections/HeroCenterLegacy.jsx`

**`hero.company-video`** — Full-viewport header (/company; min-h 100svh, max 60rem) with a background-video slot under a 50% black wash and a bottom-up #00030a gradient; white centred content sits at the bottom: serif 4rem/1.1 H1 (2.5rem <=767), 20px lead, primary button and a dark 'ask AI' button with an icon track. Buttons wrap and stretch <=479.

· Listed on 1 route: Company. · appears on 1 routes · implemented by `src/components/sections/CompanyHeader.jsx`

**`hero.content-overview`** — Legacy content ('yellow') theme, three parts (/content): (1) a hairline-framed centred hero: sub-brand lockup, serif 3.8rem H1, paragraph, yellow pill button + 3 overlapping avatars and a social line; (2) a one-line caption and 6-logo row; (3) a 2-column feature: serif 3.5rem H2, grey paragraphs with two inline links, quote card with avatar, name and role | square image card with a yellow button. The feature stacks <=767.

· Listed on 1 route: Content overview. · appears on 1 routes · implemented by `src/components/sections/ContentHero.jsx`

**`hero.demo-form`** — In container-large (/lms/demo-platform): avatar strip + trust line, then three 2-column grids (gap 5rem): [serif 3.8rem/1.1 H1 | serif 1.75rem form title, bottom-aligned], [grey intro with one bold phrase, 4-item bullet list and 3 review badges | static 300x358 form placeholder], [quote | quote]. At <=479 grids become one column, the form moves above the copy and the second quote is hidden.

· Listed on 1 route: Book a demo. · appears on 1 routes · implemented by `src/components/sections/DemoHero.jsx`

**`hero.global-header-legacy`** — Top + side hairline frame (no bottom border) with legacy header padding. One component with `variant`: 'eyebrow' (/contact-us; centred eyebrow tag, H1 3.8rem/1.1, grey paragraph) and 'logo' (/case-studies/content; centred content-brand logo, H1 3.8rem/1.15, grey paragraph that keeps the original's 12rem left offset). No buttons. The file also exports the shared legacy theme primitives (legacyVars, LegacyButton, LegacyEyebrow). Same component reused on subpages with a variant prop (eyebrow, logo). Same component reused on subpages with a variant prop (eyebrow, logo). Same component reused on subpages with a variant prop (eyebrow, logo). Same component reused on subpages with a variant prop (eyebrow, logo). Same component reused on subpages with a variant prop (eyebrow, logo).

· Listed on 2 routes: Case study index (content); Contact. · appears on 2 routes · implemented by `src/components/sections/GlobalHeaderLegacy.jsx`

**`hero.header-grid-card`** — Legacy content ('yellow') theme, two hairline-framed grid cells (one column <=767): left card with a dark eyebrow pill, serif 3rem/1.1 H1 (2rem <=479), grey paragraph and a yellow pill button; right cell is media. One component with `variant`: 'topics' (/content/topics) shows a 923:600 header image (3:2 <=991); 'suites' (/content/sector-suites) shows a 500px background-video slot. Content shape is identical. Same component reused on subpages with a variant prop (topics, suites). Same component reused on subpages with a variant prop (topics, suites). Same component reused on subpages with a variant prop (topics, suites). Same component reused on subpages with a variant prop (topics, suites). Same component reused on subpages with a variant prop (topics, suites).

· Listed on 2 routes: Content catalogue (topics / sector suites). · appears on 2 routes · implemented by `src/components/sections/HeaderGridCard.jsx`

**`hero.integrations-header`** — Green legacy styling (/lms/integrations): a hairline-bordered 2-column card (copy: eyebrow tag, serif 3.8rem/1.1 H1, 18px paragraph, green pill button + 3 overlapping avatars and a users line | full-height visual, 3:2 <=991), one column <=767. Below: a centred logo lead line + 6 logos, then a split header (heading-h2 left, grey paragraph right; stacked <=991).

· Listed on 1 route: Integrations directory. · appears on 1 routes · implemented by `src/components/sections/IntegrationsHeader.jsx`

**`hero.layout2-media`** — A rounded media card (min-h 42rem, p 2.5rem; 30rem / 1.5rem <=767) with media behind a transparent-to-black gradient and bottom-aligned content, framed by legacy hairlines. One component with `variant`: 'impact' (/lms/impact; logo + H1 + para, CTA right, top border), 'service' (/content/service; logo + H1 + para + CTA below), 'case-study' (/case-studies-contents/customer-6..10; customer logo + H1 max 47rem + decorative play button), 'company' (/company, mid-page before the FAQ; no hairlines, eyebrow chip + H2 + para + primary Button) and 'events' (/resources/events-webinars; H1 + CTA over a background-video slot). Same component reused on subpages with a variant prop (impact, service, case-study, company, events). Same component reused on subpages with a variant prop (impact, service, case-study, company, events). Same component reused on subpages with a variant prop (impact, service, case-study, company, events). Same component reused on subpages with a variant prop (impact, service, case-study, company, events). Same component reused on subpages with a variant prop (impact, service, case-study, company, events).

· Listed on 9 routes: Case study detail (content); Impact (legacy layout, pink theme); Content service (legacy layout); Company; Events & webinars index. · appears on 9 routes · implemented by `src/components/sections/Layout2Hero.jsx`

**`hero.logos-overlap`** — The `.section_wowlogos.is-neg-overlap` block on /lms/corporate-lms: pulled up -16rem (-10 / -8 / -6rem at 991 / 767 / 479) over the empty WowContentHero 'corporate' spacer. Split row: avatar strip + trust line, serif 3.8rem H1 (2.5rem <=479), grey paragraph, quote card (italic quote, avatar, name, role + linked company) and primary CTA | 1440:920 product visual; stacks <=767. Below: centred lead line + 7 logos.

· Listed on 1 route: Segment landing: mid-market. · appears on 1 routes · implemented by `src/components/sections/LogosHeroOverlap.jsx`

**`hero.mentoring-software`** — A wide hero image (150% of the container, 35rem tall, black-to-transparent top fade) pulled up -8rem under the nav, then a centred block overlapping it by 3rem: avatar strip + trust line, two-line serif H1 (h1 token), 20px grey copy (lead line + paragraph), brand-blue primary and dark buttons; then a logo lead line and 6 logos. <=767 the image becomes an in-flow 3:2 card with radius and buttons stack <=479.

· Listed on 1 route: Mentoring software product page. · appears on 1 routes · implemented by `src/components/sections/MentoringHeader.jsx`

**`hero.platform`** — Split hero (/lms, pulled up -1rem): left column has a serif 3.8rem H1 (2.5rem <=479), grey intro, italic quote with 40px avatar, name and role + linked company, and a primary CTA; right column is a 1440:1339 product visual. Below, a centred one-line lead and an 8-slot logo row (flex space-between, max 60rem, wrapping and centring <=991). Columns stack <=767.

· Listed on 1 route: Platform overview. · appears on 1 routes · implemented by `src/components/sections/PlatformHero.jsx`

**`hero.pricing-calculator`** — Centred column (/pricing): eyebrow chip, heading-h2-sized H1, grey intro and 3 review badges; a 'We have [learners] learners' custom dropdown; a plan card (currency dropdown top-right, plan eyebrow, lead, large serif price computed from the selected bracket, primary CTA + dark button that opens a right-hand feature drawer, check list); under the card a results ticker that steps through one stat row at a time. The drawer (hidden <=479) has a title, intro, tab buttons and cross-fading screenshot panes. Card contents stack <=479.

· Listed on 1 route: Pricing. · appears on 1 routes · implemented by `src/components/sections/PricingHero.jsx`

**`hero.split-visual`** — Two-column hero: avatar row + trust line, serif H1, subtitle, three review badges, primary + dark buttons on the left; a 1440:1089 product collage bleeding past the right viewport edge. Load-time staggered blur/skew reveal. Same component reused on subpages with a variant prop (feature-detail). Same component reused on subpages with a variant prop (feature-detail). Same component reused on subpages with a variant prop (feature-detail). Same component reused on subpages with a variant prop (feature-detail). Same component reused on subpages with a variant prop (feature-detail). Same component reused on subpages with a variant prop (feature-detail).

· Listed on 18 routes: Marketing homepage; Feature detail. · appears on 18 routes · implemented by `src/components/Hero.jsx`

**`hero.wow-content`** — One component with a `variant` prop that switches between ten measured layouts of the `.section_wowcontent` hero: split layouts (copy left, media right, stacking to one column <=767) for small-business, enterprise, features, mentoring, case-studies and why; centred single-column layouts for solutions, spring-release and whats-included; and an empty spacer for corporate. Routes: small-business /lms/small-business, corporate /lms/corporate-lms, enterprise /lms/enterprise, solutions /lms/solutions, spring-release /lms/spring-release, features /lms/features, mentoring /mentoring, case-studies /case-studies/lms, why /company/why-nimbus, whats-included /whats-included. The H1 is serif 3.8rem/1.15 (2.5rem <=767) except case-studies (heading-h2 size). Same component reused on subpages with a variant prop (small-business, corporate, enterprise, solutions, spring-release, features, mentoring, case-studies, why, whats-included). Same component reused on subpages with a variant prop (small-business, corporate, enterprise, solutions, spring-release, features, mentoring, case-studies, why, whats-included). Same component reused on subpages with a variant prop (small-business, corporate, enterprise, solutions, spring-release, features, mentoring, case-studies, why, whats-included). Same component reused on subpages with a variant prop (small-business, corporate, enterprise, solutions, spring-release, features, mentoring, case-studies, why, whats-included). Same component reused on subpages with a variant prop (small-business, corporate, enterprise, solutions, spring-release, features, mentoring, case-studies, why, whats-included).

· Listed on 10 routes: Segment landing: small business; Segment landing: mid-market; Segment landing: enterprise; Solutions index (sticky anchor tabs); Release notes landing; Features index (sticky anchor tabs); Mentoring programmes; Case study index (platform, filterable); Why us; What's included. · appears on 10 routes · implemented by `src/components/sections/WowContentHero.jsx`

### PROOF

_Social proof: customer logos, outcome stats, testimonials, case studies._

**`proof.case-results`** — Page-local function on /case-studies/lms: a centred H2 and grey paragraph in a 50rem column, then a single 6-track grid `repeat(5, min-content) 1fr` of five dark cards, each as wide as its stat (clipped by the page section on mobile rather than wrapping). Each card shows a brand-green challenge label, the customer logo, a 64px stat (48/40px on smaller breakpoints) and a grey result sentence ending in the linked customer name. A centred primary button follows. Differs from the shared Results block in grid behaviour, labels and the trailing customer link.

· Listed on 1 route: Case study index (platform, filterable). · appears on 1 routes · implemented by `src/pages/content/CaseStudiesLms.jsx > CaseStudyResults`

**`proof.case-study-carousel`** — Header (H2 + button left, paragraph right) over a centred, looping carousel of five case-study cards (photo with brand logo, title, two stats); centre card scaled 1.1, neighbours at 20% opacity; 4s autoplay paused on hover. Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage).

· Listed on 6 routes: Marketing homepage; Solutions index (sticky anchor tabs); Features index (sticky anchor tabs); Company; Why us; Contact. · appears on 6 routes · implemented by `src/components/CaseStudyCarousel.jsx`

**`proof.case-study-video`** — A dark rounded video card (min 60vh inner, 50vh tab, 40vh <=479) with the customer logo top-left, a large spacer, the H2 story headline bottom-left and a 4rem round play button bottom-right, over a background video still faded out by a radial mask. Below it two stat/quote cards sit side by side (one column <=479), each with a 24px heading (48px <=991, 40px <=767) and a grey paragraph. Used once, on /lms/mentoring-software.

· Listed on 1 route: Mentoring software product page. · appears on 1 routes · implemented by `src/components/sections/CaseStudyVideo.jsx`

**`proof.centred-quote`** — Page-local block placed directly after the Results card grid inside the same container-medium wrapper: a 32px (28 tab / 24 mob) medium-weight quote in a 60rem column (centred, or left-aligned on /lms/small-business), a stacked avatar (5rem, 3rem on small-business) with the site's 6px tag corners below 1440 and round at >=1440, the name and a grey role with an optional linked org; the page then renders a centred primary button row. On /lms the same markup is the inline FinalQuote function (quote + author + button in one component). /lms/enterprise uses CentredQuote twice: after Results, and as the `after` slot of the service SplitAutotabs.

· Listed on 3 routes: Platform overview; Segment landing: small business; Segment landing: enterprise. · appears on 3 routes · implemented by `src/pages/platform/CentredQuote.jsx`

**`proof.cs-content-stats`** — Three hairline-bordered cards in a row (one column at 991 and below) on the content ("yellow") legacy theme: a dotted-texture card with a large yellow Source Serif stat and its label, a "Solutions" card with bordered chips, and a "Topics used" card with chips that optionally carry a check-circle icon. The stat number and solutions list rise in on scroll.

· Listed on 5 routes: Case study detail (content). · appears on 5 routes · implemented by `src/components/sections/CsContentStats.jsx`

**`proof.flip-logos`** — Four logo cells in a row (2x2 at <=767) between side hairlines, each with legacy-theme borders. Every cell masks a 3rem-high window onto a vertical track of four logos, so 16 logos are shown four at a time. Once the section scrolls into view each track steps upward through its logos on a staggered, looping GSAP timeline. Geometry is identical on every route; only the legacy colour theme changes (yellow on /content/topics, /content/sector-suites and /content/service, pink on /lms/impact, green on /content/custom-content).

· Listed on 5 routes: Content catalogue (topics / sector suites); Impact (legacy layout, pink theme); Content service (legacy layout); Custom content. · appears on 5 routes · implemented by `src/components/sections/FlipLogos.jsx`

**`proof.logo-row`** — Static (non-scrolling) row of six customer logos under a one-line caption; wraps to a grid on mobile. Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage).

· Listed on 29 routes: Marketing homepage; Feature detail; Segment landing: small business; Solutions index (sticky anchor tabs); Release notes landing; Book a demo; Features index (sticky anchor tabs); AI agent product page; Mentoring programmes; Company; Why us; What's included; Contact. · appears on 29 routes · implemented by `src/components/LogoStrip.jsx`

**`proof.results-proof`** — Page-local block: centred serif H2 with one italic word and a grey lead, then a 4-column grid (2 cols <=991, 1 col <=479) of three dark stat cards (customer logo, big stat, grey outcome line with an italic phrase) plus a translucent quote card (logo, 6rem-padded quote, small round avatar with name/role). It ends either with a green CTA card (text + dark button, /company) or a centred primary button row (/whats-included). Unlike the homepage Results block it carries the quote card and the CTA.

· Listed on 2 routes: Company; What's included. · appears on 2 routes · implemented by `src/pages/company/ProofResults.jsx`

**`proof.results-stats`** — Centred H2 over a 4-column grid of dark stat cards (customer logo, large stat, grey sentence with inline brand link); 2 columns at <=991px, 1 at <=479px. Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage).

· Listed on 7 routes: Marketing homepage; Platform overview; Segment landing: small business; Segment landing: mid-market; Segment landing: enterprise; Professional services (legacy grid system); Book a demo. · appears on 7 routes · implemented by `src/components/Results.jsx`

**`proof.reviews-grid`** — Serif H3-size centred heading, then a row (stacks <=767) of a 2-column customer-logo grid card (10 logos, 3rem gaps) beside a max-56rem testimonial card holding a one-slide reviews carousel: each slide has a customer logo, a 24px quote, a 3rem avatar with name/role, and a faded brand image top-right; prev/next outline arrows sit bottom-right. On /pricing a centred video block (H2 with an italic word + 4:3 video placeholder with play button, the VideoSection component) is nested inside the same <section> after the row, passed as children.

· Listed on 1 route: Pricing. · appears on 1 routes · implemented by `src/components/sections/ReviewsGrid.jsx`

**`proof.reviews-slider`** — Centred H2 above a 60rem one-slide-at-a-time carousel. Each slide is a tall dark panel (min 32.5rem, 35rem <=479) with a customer logo top-left, a customer image pinned top-right, and at the bottom a 28px quote plus a 3rem-avatar author row; `order` puts the author first (content, corporate, integrations, professional services, whats-included) or the quote first (/lms/features/*). Inactive slides sit at scale .65 / opacity .5. Prev/next round arrows overlap the slider's bottom-right corner, and a centred primary button follows. With `slides=[]` (the CMS empty state on /lms/features/employee-experience and /lms/features/communication) the slider is replaced by a single 'No items found.' bar while the heading, arrows and button stay.

· Listed on 24 routes: Feature detail; Content catalogue (topics / sector suites); Segment landing: mid-market; Professional services (legacy grid system); Integrations directory; Content overview; What's included. · appears on 24 routes · implemented by `src/components/sections/ReviewsSlider.jsx`

**`proof.stats-countup`** — Page-local block on /company: a small (24px, 20px mob) Inter H2 with one italic phrase and a grey lead, centred, then three square dark stat cards in a row, each with a label + short line at the top and a big number with suffix at the bottom. At <=767 the three 18.75rem squares stay in one row and scroll sideways (hidden scrollbar), as on the original.

· Listed on 1 route: Company. · appears on 1 routes · implemented by `src/pages/company/StatsResults.jsx`

**`proof.testimonial`** — Single large pull quote with 80px avatar, name and role/company line, centred under the stats grid.

· Listed on 1 route: Marketing homepage. · appears on 1 routes · implemented by `src/components/Results.jsx`

**`proof.testimonial-card-legacy`** — A hairline-bordered card (legacy theme border colour) over a decorative full-bleed background image at 85% opacity, holding a 2-column grid: customer logo on the left, and on the right a body-size quote with a client row below (3.5rem round photo, semibold name, grey role). Padding 3.5rem/2.5rem, tightening per breakpoint; at <=767 it becomes one column and the client photo stacks above the name. Theme switches the legacy colour set (yellow on /content/service, green on /content/custom-content); the logo box is tall (5rem, 3rem at >=1440) or wide (2.5rem).

· Listed on 2 routes: Content service (legacy layout); Custom content. · appears on 2 routes · implemented by `src/components/sections/TestimonialCardLegacy.jsx`

**`proof.testimonial-quote`** — One component with a `variant` prop: a 32px (28 tab / 24 mob) medium-weight quote in a 60rem column, above a stacked author block (avatar, name, grey role + linked or bold org). Variants only change spacing, alignment and avatar size: platform (/lms 1st, /lms/features, /lms/solutions with a centred button row below), platform-lg (/lms 2nd, 5rem top + 4rem bottom margin), section (/lms 3rd, 5rem/3rem section padding, button rendered inside the author block), mid-market (/lms/corporate-lms, bare left-aligned quote, 2rem top margin), enterprise (/lms/enterprise, centred quote with 2rem left pad, 1rem top margin), kiki (/nova, 6rem/5rem/3.5rem top pad, 3rem avatar). Avatar is a 5rem (3rem kiki) square with the site's 6px TL/BR tag corners below 1440 and fully round at >=1440. Same component reused on subpages with a variant prop (platform, platform-lg, section, mid-market, enterprise, kiki). Same component reused on subpages with a variant prop (platform, platform-lg, section, mid-market, enterprise, kiki). Same component reused on subpages with a variant prop (platform, platform-lg, section, mid-market, enterprise, kiki). Same component reused on subpages with a variant prop (platform, platform-lg, section, mid-market, enterprise, kiki). Same component reused on subpages with a variant prop (platform, platform-lg, section, mid-market, enterprise, kiki).

· Listed on 6 routes: Platform overview; Segment landing: mid-market; Segment landing: enterprise; Solutions index (sticky anchor tabs); Features index (sticky anchor tabs); AI agent product page. · appears on 6 routes · implemented by `src/components/sections/TestimonialQuote.jsx`

### PRODUCT

_Product explanation modules: tabs, sliders, bentos, feature rows, comparison tables._

**`product.anchor-intro`** — A single centred 2rem/1.4 H2 (1.5rem at <=767), no paragraph or media. `variant` changes only placement: 'solutions' (/lms/solutions) renders a bare full-width H2 with 1rem top margin; 'features' (/lms/features) wraps it in padding-global > container-medium with 4rem top margin. Always rendered immediately before the sticky-tabs block. Same component reused on subpages with a variant prop (solutions, features). Same component reused on subpages with a variant prop (solutions, features). Same component reused on subpages with a variant prop (solutions, features). Same component reused on subpages with a variant prop (solutions, features). Same component reused on subpages with a variant prop (solutions, features).

· Listed on 2 routes: Solutions index (sticky anchor tabs); Features index (sticky anchor tabs). · appears on 2 routes · implemented by `src/components/sections/AnchorNav.jsx`

**`product.assistant-feature-tabs`** — Header (H2 + grey intro) stacked above a vertical list of 3 items, each with an 8px left track that lights white when active; only the active item shows its body. Beside it a 40% visual column cross-fades between one 30rem-tall video per item. `reversed: true` mirrors the row (visual left, gap 5rem, list column 55%). Used twice in a row on /nova (default, then reversed). <=479 stacks: the visual column hides and the active item shows its own video under the body.

· Listed on 1 route: AI agent product page. · appears on 1 routes · implemented by `src/components/sections/KikiFeatureTabs.jsx`

**`product.assistant-tabs`** — AI-assistant intro header followed by five persona tab buttons driving a looping, draggable slide track (800ms ease); each slide pairs title + copy with a square animation slot. Same component reused on subpages with a variant prop (image-slides, video-slides). Same component reused on subpages with a variant prop (image-slides, video-slides). Same component reused on subpages with a variant prop (image-slides, video-slides). Same component reused on subpages with a variant prop (image-slides, video-slides). Same component reused on subpages with a variant prop (image-slides, video-slides). Same component reused on subpages with a variant prop (image-slides, video-slides).

· Listed on 20 routes: Marketing homepage; Feature detail; Platform overview; Segment landing: small business. · appears on 20 routes · implemented by `src/components/KikiTabs.jsx`

**`product.autotabs-group`** — One component with a `variant` prop: 'platform' (/lms and /nova), 'enterprise' (/lms/enterprise), 'mentoring' (/lms/mentoring-software). Centred H2 + grey paragraph, then a row of equal tab buttons ABOVE a full-width loop slider whose slides hold a lead-in title + continuation copy and a 16:9 product screenshot; a centred customer quote closes the block (platform/enterprise reuse TestimonialQuote 'autotabs'/'autotabs-enterprise'; mentoring renders its own 24px quote with a small avatar row). 'platform' renders the slide title inline in white with grey copy run-on; 'enterprise' puts the title on its own line; 'mentoring' nests the slider in an extra padding wrapper and uses cover screenshots. <=767 the tab row wraps (200px tabs, 3.5rem tall); <=479 two tabs per row. Same component reused on subpages with a variant prop (platform, enterprise, mentoring). Same component reused on subpages with a variant prop (platform, enterprise, mentoring). Same component reused on subpages with a variant prop (platform, enterprise, mentoring). Same component reused on subpages with a variant prop (platform, enterprise, mentoring). Same component reused on subpages with a variant prop (platform, enterprise, mentoring).

· Listed on 4 routes: Platform overview; Segment landing: enterprise; AI agent product page; Mentoring software product page. · appears on 4 routes · implemented by `src/components/sections/AutotabsGroup.jsx`

**`product.capability-slider`** — Three-up looping slider of six enterprise capability cards (image + highlighted lead phrase + grey body); autoplays every 3s once 40% visible, with widening progress bullets and a play/pause button. Same component reused on subpages with a variant prop (case). Same component reused on subpages with a variant prop (case). Same component reused on subpages with a variant prop (case). Same component reused on subpages with a variant prop (case). Same component reused on subpages with a variant prop (case). Same component reused on subpages with a variant prop (case).

· Listed on 6 routes: Marketing homepage; Case study detail (platform). · appears on 6 routes · implemented by `src/components/EnterpriseSlider.jsx`

**`product.card-slider-legacy`** — Legacy hairline-framed header + Webflow-style paged slider of cards with square prev/next arrows bottom-right and round page dots bottom-left; the visible mask is 25% wide (50% <=991, 80% <=767, 95% <=479) with overflow visible, so ~4 cards show at desktop. `variant` gives three shapes: 'journey' (/lms/impact, theme pink): centred H2, 3.42:5 cards with a serif title and 1-2 eyebrow tags; 'library' (/content/service, theme yellow): 2-col header (H2 | grey para), square cards with title + grey text; 'process' (/content/custom-content, theme green): 2-col header, 3.42:5 cards with an auto-numbered 01/02 chip, brand-colour serif title and small text. Same component reused on subpages with a variant prop (journey, library, process). Same component reused on subpages with a variant prop (journey, library, process). Same component reused on subpages with a variant prop (journey, library, process). Same component reused on subpages with a variant prop (journey, library, process). Same component reused on subpages with a variant prop (journey, library, process).

· Listed on 3 routes: Impact (legacy layout, pink theme); Content service (legacy layout); Custom content. · appears on 3 routes · implemented by `src/components/sections/CardSliderLegacy.jsx`

**`product.comparison-table`** — Raw-HTML-style table embed with its own px-based CSS (re-scoped nct-* classes) and a centred serif H2 (with an italic phrase) plus grey intro above it. One component with a `variant` prop: platform (/lms) is a 2-column capability / 'what you can do' table of 11 rows, nudged 40px right on desktop; enterprise (/lms/enterprise) is a 2-column requirement / provision table of 7 rows whose right cells are green-edged chat-bubble evidence cards; vendor (/nova, directly after the split-tabs block) is a 4-column evaluation checklist (area, what to ask, what good looks like, Nimbus evidence bubble) of 7 rows. Column headers and the visually hidden caption are fixed per variant. At <=767 every variant collapses to stacked rows (vendor cells gain uppercase data-labels). Same component reused on subpages with a variant prop (platform, enterprise, vendor). Same component reused on subpages with a variant prop (platform, enterprise, vendor). Same component reused on subpages with a variant prop (platform, enterprise, vendor). Same component reused on subpages with a variant prop (platform, enterprise, vendor). Same component reused on subpages with a variant prop (platform, enterprise, vendor).

· Listed on 3 routes: Platform overview; Segment landing: enterprise; AI agent product page. · appears on 3 routes · implemented by `src/components/sections/ComparisonTable.jsx`

**`product.explore-empty`** — Page-local CMS empty state of the feature-page autotabs block (data-section 'kiki', data-variant 'empty'), padding 5rem top (3rem mob) / 2rem bottom. Top: the shared ExploreHeader in container-medium (28rem column: 1.5rem H2 and a primary 'see every feature' button, then a 2rem spacer). Below, inside the doubled gutter, two stacked full-width #dddddd bars each reading 'No items found.' (0.5rem gap). No tabs, slides or images.

· Listed on 17 routes: Feature detail. · appears on 17 routes · implemented by `src/pages/features/FeatureDetail.jsx > ExploreEmpty`

**`product.feature-bento`** — Split header (H2 left, grey paragraph with one inline link right, bottom-aligned), then a 3-column bento of 4 cards ordered large (spans 2), small, small, large. Each card is a dark rounded panel with an image layer under a 50% wash and bottom fade, copy pinned to the bottom: a white lead phrase run into grey body text (the services card lists inline links), then an arrow text-link. <=991 2 columns (large spans 2); <=767 1 column with 1.5rem gaps. Only on /lms.

· Listed on 1 route: Platform overview. · appears on 1 routes · implemented by `src/components/sections/FeatureBento.jsx`

**`product.feature-rows-legacy`** — A bordered stack of 2-column rows (`.section_feature_2-col`): text cell + 3:2 image cell alternating sides, hairline between rows; <=767 rows stack with the text cell first. One component with `variant`: 'impact' (/lms/impact; centred legacy H2 header, rows on a 16px gap, text = H3 28px + paragraph vertically centred), 'service' (/content/service; no header, no top hairline, gapless stretched cells with long paragraphs) and 'services' (/lms/professional-services; no header, 16px gap, text = H4-size 32px title + paragraph + legacy CTA). Same component reused on subpages with a variant prop (impact, service, services). Same component reused on subpages with a variant prop (impact, service, services). Same component reused on subpages with a variant prop (impact, service, services). Same component reused on subpages with a variant prop (impact, service, services). Same component reused on subpages with a variant prop (impact, service, services).

· Listed on 3 routes: Professional services (legacy grid system); Impact (legacy layout, pink theme); Content service (legacy layout). · appears on 3 routes · implemented by `src/components/sections/FeatureTwoColLegacy.jsx`

**`product.feature-tabs`** — Section H2 plus four click-driven accordion-style tab rows on the left; matching 670:600 product screenshot fades (.3s) in a pane that bleeds off the right edge. No autoplay. Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage).

· Listed on 19 routes: Marketing homepage; Feature detail; Platform overview. · appears on 19 routes · implemented by `src/components/ProductTabs.jsx`

**`product.features-intro`** — Left-aligned header only: H2 (max 42rem), a 1rem spacer and a grey paragraph (max 36rem) inside container-large > container-medium. No media, no CTA. Only on /lms/features, directly above the anchor intro + sticky tabs.

· Listed on 1 route: Features index (sticky anchor tabs). · appears on 1 routes · implemented by `src/components/sections/FeaturesIntro.jsx`

**`product.grid-cards-legacy`** — A legacy-theme section: a header block (split H2 | para, centred H2, left H2, or centred eyebrow + H2 + para + legacy CTA) over one or more rows of hairline `.grid_card` cells (border top/bottom/left, 2/3/4 cols; every row collapses to 1 col <=767, stat row becomes a 2x2 grid <=479). One component with `variant` presets whose card kind differs: 'services-extra' (/lms/professional-services; split header + 3 + 2 text cards), 'people' (/lms/impact; centred H2 + 3 + 2 text cards), 'stats' (/lms/impact; left H2 + 4 stat cards: label, serif brand-colour figure, caption), 'awards' (/lms/impact; centred eyebrow + H2 + a row of 4 award-badge cells) and 'content' (/content; centred eyebrow + H2 + para + CTA, then 2 + 3 image cards: title, 3:2 image, copy). Same component reused on subpages with a variant prop (services-extra, people, stats, awards, content). Same component reused on subpages with a variant prop (services-extra, people, stats, awards, content). Same component reused on subpages with a variant prop (services-extra, people, stats, awards, content). Same component reused on subpages with a variant prop (services-extra, people, stats, awards, content). Same component reused on subpages with a variant prop (services-extra, people, stats, awards, content).

· Listed on 3 routes: Professional services (legacy grid system); Impact (legacy layout, pink theme); Content overview. · appears on 3 routes · implemented by `src/components/sections/GridCardsLegacy.jsx`

**`product.included-tabs`** — Page-local block for /whats-included. Split header: H2 + grey lead on the left, an italic quote card (avatar, name, role) on the right (stacks <=767). Then a loop slider of full-width slides, each a large rounded panel with an offset 1440:873 product image, a bottom gradient and the module name (H3) + paragraph pinned bottom-left; the tab row sits BELOW the slider (4.75rem; <=767 two per row, 3.5rem). A centred primary CTA follows.

· Listed on 1 route: What's included. · appears on 1 routes · implemented by `src/pages/company/IncludedTabs.jsx`

**`product.integrations-visual`** — Centred H2 + grey paragraph above a wide 1440:410 integrations strip image (padded 1.5rem), optionally followed by a centred primary button. `variant` changes layout only: 'mid-market' (/lms/corporate-lms; 45.25rem container, button below the container), 'enterprise' (/lms/enterprise; same, no button), 'features' (/lms/features; 60rem container, 6rem spacer, larger 24px paragraph in 42rem, button row under the image). Same component reused on subpages with a variant prop (mid-market, enterprise, features). Same component reused on subpages with a variant prop (mid-market, enterprise, features). Same component reused on subpages with a variant prop (mid-market, enterprise, features). Same component reused on subpages with a variant prop (mid-market, enterprise, features). Same component reused on subpages with a variant prop (mid-market, enterprise, features).

· Listed on 3 routes: Segment landing: mid-market; Segment landing: enterprise; Features index (sticky anchor tabs). · appears on 3 routes · implemented by `src/components/sections/IntegrationsVisual.jsx`

**`product.layout03-tabs`** — Centred H2 + grey paragraph + primary button, then a two-column grid: a vertical list of tab cards (inactive 72px tall showing only the label; the current one expands to show its paragraph) and a pane on the right. `variant` (same content shape): 'image' (/lms/small-business, /lms/corporate-lms; container-large, .3fr/1fr, screenshot anchored bottom-right), 'video' (/lms/enterprise; container-medium, .5fr/1fr, centred 30rem 1:1.1 video), 'video-compact' (/whats-included; like video without section padding, 2.5rem header gap). <=767 two equal columns with 48px tabs; <=479 single column, the pane hides and each tab shows its own screenshot under its text. Same component reused on subpages with a variant prop (image, video, video-compact). Same component reused on subpages with a variant prop (image, video, video-compact). Same component reused on subpages with a variant prop (image, video, video-compact). Same component reused on subpages with a variant prop (image, video, video-compact). Same component reused on subpages with a variant prop (image, video, video-compact).

· Listed on 4 routes: Segment landing: small business; Segment landing: mid-market; Segment landing: enterprise; What's included. · appears on 4 routes · implemented by `src/components/sections/Layout03Tabs.jsx`

**`product.learn-grid`** — A legacy green hairline component (`.section_learn`, no right border) on a 0.75fr / 1fr grid: left = serif 4rem/1.1 H2 + 16px paragraph; right = 2-column list of items, each a green-outlined icon box (plus glyph) + 20px/500 white label, hairline left/bottom rules (last row unruled). Stacks to one column <=767 (list keeps 2 columns). No variants; theme is fixed green.

· Listed on 1 route: Custom content. · appears on 1 routes · implemented by `src/components/sections/LearnGrid.jsx`

**`product.platform-intro`** — Centred, shrink-to-fit header with no section padding: an H2 split into two lines by a forced break, then a grey paragraph also split into two lines by a forced break. No media or CTA. Only on /lms, between the platform hero and the first tabbed slider.

· Listed on 1 route: Platform overview. · appears on 1 routes · implemented by `src/components/sections/PlatformIntroHeader.jsx`

**`product.release-block`** — Repeated release-note block on /lms/spring-release (6 instances, alternating light #fafefe and page-black themes): a centred header (optional green 'New' pill, H2 with one italic word, body copy, optional button), an optional visual (a 150px looping-video strip under the header, or a product screenshot placed above or below the grid), a 4-column grid of feature items (bold title + text, optionally a customer credit with a 44px avatar; 2 cols <=991, stacked <=479 or <=767 for the wide grid), and an optional big 32px customer quote with a 3rem avatar. Spacers are 4rem / 3rem <=991 / 2rem <=767.

· Listed on 1 route: Release notes landing. · appears on 1 routes · implemented by `src/components/sections/SpringGrid.jsx`

**`product.sector-tabs`** — Legacy-theme block with a `variant` prop producing two different shapes. 'industries' (/lms/solutions, theme green, rendered with id="industries" as the sticky-tabs 5th anchor target): centred serif H2 + grey paragraph, a wrapping row of pill tabs, then one full-width image pane with a bottom gradient, the selected tab name as a large serif label and a theme button. 'topics' (/content, theme yellow): side-hairline frame, eyebrow + H2, a row of 8px/0-radius tag tabs, then a row of 5 topic cards (portrait image + serif title; hover shows a frame and pattern) and an 'All Topics' button. <=767 cards wrap to 3-up, <=479 2-up and tab pills grow to fill rows. Same component reused on subpages with a variant prop (industries, topics). Same component reused on subpages with a variant prop (industries, topics). Same component reused on subpages with a variant prop (industries, topics). Same component reused on subpages with a variant prop (industries, topics). Same component reused on subpages with a variant prop (industries, topics).

· Listed on 2 routes: Solutions index (sticky anchor tabs); Content overview. · appears on 2 routes · implemented by `src/components/sections/Sectors.jsx`

**`product.solution-tabs`** — Legacy content (yellow, hairline-framed) block used on /content. Header row: eyebrow chip, large serif H2 and a yellow pill button on the left, grey multi-paragraph copy bottom-aligned on the right. Below, a 5-column frame: a 2/5 vertical tab list (rows share the height; the active row shows its summary on a dotted texture) and a 3/5 image pane with a dark bottom fade and an outlined 'Learn more' button. <=767 the header stacks; <=479 the tabs become an accordion of serif heading rows each opening to its text and image.

· Listed on 1 route: Content overview. · appears on 1 routes · implemented by `src/components/sections/SolutionTabs.jsx`

**`product.split-autotabs`** — Page-local block (/lms/corporate-lms once, /lms/enterprise twice). A header slot (H2 alone; H2 | grey intro with an inline link; or eyebrow + H2 | italic quote card with avatar) sits above a loop slider whose slides are split 47%/47%: a 20px title, grey paragraph and optional arrow text-link on the left, a square/1440:1289 product image on the right (stacked <=767). The tab row sits BELOW the slider (equal 4.75rem tabs; <=767 two per row, 3.5rem). An optional closing node follows the slider: on the enterprise services instance a big centred 32px quote with stacked avatar and a centred primary button.

· Listed on 2 routes: Segment landing: mid-market; Segment landing: enterprise. · appears on 2 routes · implemented by `src/pages/platform/SplitAutotabs.jsx`

**`product.split-tabs`** — Centred header (H2 + grey intro), then a 37rem-tall split: a 40% column of large text tabs (inactive dimmed, current white with the green tab-chip and 2rem indent, hairline rule under each) above a per-tab paragraph + button, and a 55% media pane on the opposite side that cross-fades per tab. `variant` (same content shape): 'base' (/nova; tabs left, 16:9 video pane right, 1-line H2 with italic phrase, 16px intro) and 'reversed' (/lms/mentoring-software; pane left, tabs right, image pane, 2-line H2, 18px intro, blue 'brand' buttons). <=767 stacks: tabs become a horizontally scrolling row, pane 60dvh, copy below. Same component reused on subpages with a variant prop (base, reversed). Same component reused on subpages with a variant prop (base, reversed). Same component reused on subpages with a variant prop (base, reversed). Same component reused on subpages with a variant prop (base, reversed). Same component reused on subpages with a variant prop (base, reversed).

· Listed on 2 routes: AI agent product page; Mentoring software product page. · appears on 2 routes · implemented by `src/components/sections/SplitTabs.jsx`

**`product.sticky-tabs`** — One component with a `variant` prop: 'solutions' (/lms/solutions) and 'features' (/lms/features). A sticky (top 0, z 999) bar of equal anchor pills (green when its panel is in view, scroll-spy) sits over a stack of panels; each panel is a header plus a tab row ABOVE a loop slider whose slides hold one paragraph, a fixed primary button ('Learn more' on solutions, 'Explore' on features) and a clipped product shot. 'solutions' headers are eyebrow + H4-style heading + paragraph beside a bordered stat card (40%); its bar sits in a 45.25rem container and its 5th anchor targets the sector-tabs block further down. 'features' headers are eyebrow / title / paragraph, bar in container-medium. <=767 the anchor bar and tab rows scroll horizontally (200px pills, 150px at <=479) and the stat card stacks under the copy. Same component reused on subpages with a variant prop (solutions, features). Same component reused on subpages with a variant prop (solutions, features). Same component reused on subpages with a variant prop (solutions, features). Same component reused on subpages with a variant prop (solutions, features). Same component reused on subpages with a variant prop (solutions, features).

· Listed on 2 routes: Solutions index (sticky anchor tabs); Features index (sticky anchor tabs). · appears on 2 routes · implemented by `src/components/sections/StickyTabs.jsx`

**`product.tabs-horizontal-legacy`** — Legacy hairline-framed block (/lms/professional-services, green colours hard-coded). A row of 5 equal tab links (24px labels); the current tab gets a green bottom border and a soft radial glow. Below, one pane split 50/50: 32px H3 + grey paragraph with one bold phrase | a photo (6.835:5.23). No section header. <=767 tabs wrap 2-up with 16px labels and the pane stacks with a 3:2 image.

· Listed on 1 route: Professional services (legacy grid system). · appears on 1 routes · implemented by `src/components/sections/TabsHLegacy.jsx`

**`product.two-col-features`** — Two alternating rows inside container-medium/large: row 1 text left + square image right, row 2 image left + text right (stacking below 991, image first on row 2). Each text column holds a serif H3-size heading (56/48/40/32px), an 18px grey paragraph (can contain inline links and paragraph breaks) and a translucent quote card (italic quote, 2.5rem avatar, bold name, role with optional linked org). `preset` selects default copy and spacing per route: company (/company), corporate (/lms/corporate-lms, row 1 puts the heading after the quote), enterprise (/lms/enterprise, no reveal motion).

· Listed on 3 routes: Segment landing: mid-market; Segment landing: enterprise; Company. · appears on 3 routes · implemented by `src/components/sections/TwoColFeatures.jsx`

**`product.why-assistant-tabs`** — Four stacked blocks in one component (only /company/why-nimbus): (1) left-aligned balanced H2 with an italic phrase, grey intro and primary button; (2) a tab row above a loop slider of 5 slides (white lead-in + grey run-on copy, a 1:1 video placeholder bleeding right); (3) a split header (H2 | italic quote card with avatar) over split-layout tabs (large text tabs with green chip on the left, a fading screenshot pane bleeding right, per-tab paragraph + dark button); (4) centred results header with an italic word, a 4-up grid of stat cards (logo, big stat, sentence with the customer name as link), a big centred quote with stacked avatar and a primary CTA. <=991 results go 2-up and the split header stacks; <=767 the split tabs become a scrolling row over a 60dvh pane; <=479 cards are 1-up.

· Listed on 1 route: Why us. · appears on 1 routes · implemented by `src/components/sections/WhyKikitabs.jsx`

**`product.wow-bento`** — One component with a `variant` prop whose variants have genuinely different shapes. cards (/lms/small-business, 1st): split header (H2 left, small italic side quote right), a 1.5fr/1fr row (rect + square media) then three squares, each with a caption whose lead-in is white, and a centred demo button. cards-cta (/lms/small-business, 2nd): serif H3 + paragraph beside a side quote, then two rect 'Team photo' cards with a serif H4, text and a small dark button each. release (/lms/spring-release): H2 | paragraph + green pill button, then three rows of two feature cards (one per row is 150% wide). included (/mentoring): centred H2 and three feature cards with a 20px title and text. why (/company/why-nimbus): H2 + paragraph + dark button beside a quote card, two square photos (event, team) with a caption, an awards line with four award shields, and a closing large quote. All stack at <=991/767. Same component reused on subpages with a variant prop (cards, cards-cta, release, included, why). Same component reused on subpages with a variant prop (cards, cards-cta, release, included, why). Same component reused on subpages with a variant prop (cards, cards-cta, release, included, why). Same component reused on subpages with a variant prop (cards, cards-cta, release, included, why). Same component reused on subpages with a variant prop (cards, cards-cta, release, included, why).

· Listed on 4 routes: Segment landing: small business; Release notes landing; Mentoring programmes; Why us. · appears on 4 routes · implemented by `src/components/sections/WowBento.jsx`

### STORY

_Editorial blocks: statements, scroll quote, videos, marquees, split image/text stories, news._

**`story.brand-video`** — H2 and intro paragraph above a 16:9 video slot with play button (static placeholder; the original embeds YouTube), with a closing paragraph below. Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage).

· Listed on 20 routes: Marketing homepage; Feature detail; AI agent product page; Mentoring software product page. · appears on 20 routes · implemented by `src/components/VideoSection.jsx`

**`story.company-news`** — Left-aligned header (green-chip eyebrow, H2, one-line lead), then a 0.6fr / 1fr grid (one column <=767): a featured news card (3:2 image, serif title, grey summary, faded date + read-time meta) beside a rounded list of four headline rows separated by hairlines. Card and rows are links whose background lightens on hover. Used once, on /company.

· Listed on 1 route: Company. · appears on 1 routes · implemented by `src/components/sections/CompanyNews.jsx`

**`story.custom-video`** — Legacy green-theme hairline block (left and bottom borders only) in container-large: a header with a 64px serif H2 (max 42rem) and a green pill button, then a bordered 2-column grid of a 16:9 video lightbox thumbnail (right hairline) and a 20px paragraph. One column at <=767, with the paragraph moved above the thumbnail at <=479. Used once, on /content/custom-content.

· Listed on 1 route: Custom content. · appears on 1 routes · implemented by `src/components/sections/CustomVideo.jsx`

**`story.grid-split-legacy`** — One hairline-framed `.grid_section` row split into a header cell (left, padding 2.5rem / 1.5 <=991 / 1.25 <=767) and a companion cell (right); stacks to one column <=767. One component with `variant`: 'testimonial' (/lms/professional-services; cols 1fr .6fr, H2 + grey para | bottom-aligned quote card with italic quote, 40px avatar, name, role + linked org), 'text' (/lms/professional-services; 1:1, H2 | grey 16px paragraph), 'image' (/lms/impact; no top hairline, 16px gap, H3 28px + para + legacy CTA vertically centred | 3:2 story image) and 'suites' (/content/sector-suites; no top hairline, spacer + H2 + para | CTA bottom-right, followed by a 3-col (1 col <=767) list of hairline link cards: H3 + grey text + 3:2 image). Same component reused on subpages with a variant prop (testimonial, text, image, suites). Same component reused on subpages with a variant prop (testimonial, text, image, suites). Same component reused on subpages with a variant prop (testimonial, text, image, suites). Same component reused on subpages with a variant prop (testimonial, text, image, suites). Same component reused on subpages with a variant prop (testimonial, text, image, suites).

· Listed on 4 routes: Content catalogue (topics / sector suites); Professional services (legacy grid system); Impact (legacy layout, pink theme). · appears on 4 routes · implemented by `src/components/sections/GridSplitLegacy.jsx`

**`story.header-image-legacy`** — A hairline (#00251e, no top line) 2-column card with no gap: left cell holds a serif H2 (4rem/1.1 at every width), a 16px ink paragraph and a row of 4 review badges (h 4rem, 3rem <=479); right cell is a square team photo. Padding 5rem 2.5rem (3rem 1.5rem <=991, 1.5rem <=767); stacks to one column <=767. Not the page H1 (it follows the centred legacy hero on /lms/professional-services). No variants, no theme prop.

· Listed on 1 route: Professional services (legacy grid system). · appears on 1 routes · implemented by `src/components/sections/HeaderImageLegacy.jsx`

**`story.marquee`** — One component with a `variant` prop. header (/lms/small-business): centred serif H2 and a grey paragraph with one inline link, three full-width rows of white-text pills, then a primary + dark button pair. plain (/mentoring, four instances, `set` 1-4): just two rows of grey-text pills inside padding-global, each placed straight after a wow2col block. Each row is an edge-faded (0 -> 15% / 85% -> 0 mask) overflow-hidden strip whose track holds the pill list twice and scrolls with a CSS keyframe loop; rows alternate direction. Same component reused on subpages with a variant prop (header, plain). Same component reused on subpages with a variant prop (header, plain). Same component reused on subpages with a variant prop (header, plain). Same component reused on subpages with a variant prop (header, plain). Same component reused on subpages with a variant prop (header, plain).

· Listed on 2 routes: Segment landing: small business; Mentoring programmes. · appears on 2 routes · implemented by `src/components/sections/Marquee.jsx`

**`story.scroll-quote`** — Short analyst-style quote whose letters scroll-scrub from near-black to white one by one; the page's only ScrollTrigger-driven text effect.

· Listed on 1 route: Marketing homepage. · appears on 1 routes · implemented by `src/components/QuoteHighlight.jsx`

**`story.wow-2col`** — A 2-column row in container-medium: the text column has the H2 pinned to the top and, pinned to the bottom (4rem minimum gap), a large 24px lead (optionally held to 28rem) and an 18px grey paragraph; the right column is a 1:1 dark rounded image card. Stacks at <=991 on /mentoring (stackTab) or <=767 by default, with a 20rem minimum image height. Used four times on /mentoring, each followed by a plain marquee.

· Listed on 1 route: Mentoring programmes. · appears on 1 routes · implemented by `src/components/sections/Wow2col.jsx`

**`story.zoom-statement`** — Full-bleed 1440:598 image that scroll-scrubs from 2.5x/transparent to 1x/opaque, followed by a centred serif H2 and multi-line grey statement paragraph.

· Listed on 1 route: Marketing homepage. · appears on 1 routes · implemented by `src/components/Statement.jsx`

### CONVERSION

_Blocks whose job is to capture a demo/contact request, answer pre-sale objections or show pricing._

**`conversion.contact-form`** — Legacy green-theme bordered block in container-large (/contact-us): a 40% / 60% grid (one column <=767, gap 2rem). Left: 1.75rem H3, two grey paragraphs separated by a blank line, and a row of three review badges. Right: a static HubSpot-footprint form (fixed 300x1020px, white Helvetica labels): intro line, four text inputs, an employee-count select, a file input, a requirements textarea, an empty captcha-sized box and a Submit button. Submit is prevented; nothing is sent.

· Listed on 1 route: Contact. · appears on 1 routes · implemented by `src/components/sections/ContactForm.jsx`

**`conversion.content-pricing`** — Two-column grid (1.25fr / 1fr, gap 6rem; one column <=767). Left: yellow-chip eyebrow, H1 at h2 scale, grey intro and three independently toggling accordion cards (question + optional bold lead + answer). Right: a surface-2 content plan card with eyebrow, lead line, a static learners select, a question, two custom checkbox tiles (core library / sector packs), a computed placeholder price with a currency select, a primary CTA, and a yellow-tick feature list; under the card an outlined box runs a vertical testimonial ticker (logo, italic quote, avatar, name, role). Nothing submits: the checkboxes and selects only recompute the on-page placeholder price.

· Listed on 1 route: Pricing. · appears on 1 routes · implemented by `src/components/sections/ContentPricing.jsx`

**`conversion.cta-strip`** — One component with a `variant` prop. 'heading' (all 17 /lms/features/* routes, after the product tabs): centred one-line H2 (60rem max, balanced) over a primary button, margin 4rem top / 3rem bottom. 'pricing' (/lms/small-business): the same header inside padding-global/container-medium with a 0.5rem top margin and a 2rem spacer below. 'spacer' (/lms/mentoring-software): an empty 5rem (3rem <=767) padded block reproducing the original's empty section. 'button' (/lms/features with pullUp's -4rem top margin, /lms/enterprise; visually also the inline row on /nova): a lone centred primary button; buttons stack column-wise <=767. Same component reused on subpages with a variant prop (heading, pricing, spacer, button). Same component reused on subpages with a variant prop (heading, pricing, spacer, button). Same component reused on subpages with a variant prop (heading, pricing, spacer, button). Same component reused on subpages with a variant prop (heading, pricing, spacer, button). Same component reused on subpages with a variant prop (heading, pricing, spacer, button).

· Listed on 22 routes: Feature detail; Segment landing: small business; Segment landing: enterprise; Features index (sticky anchor tabs); AI agent product page; Mentoring software product page. · appears on 22 routes · implemented by `src/components/sections/CtaStrip.jsx`

**`conversion.demo-cta`** — The SUBPAGE_CTA block that Footer renders above the footer card when its real `variant` prop is 'subpage' (Layout.jsx passes 'subpage' on every route except '/' and '/company', which get the 'home' variant = conversion.demo-form). A centred 40rem column, gap 2rem: Nimbus wordmark, H2 whose last three words are italic, an 18px ink paragraph (max 32rem) and one green accent pill button linking to /lms/demo-platform; no form. Padding 3rem (1.5rem at <=479); the column simply narrows on smaller screens. It sits inside the <footer> element, directly above the shared footer card.

· Listed on 56 routes: Feature detail; Case study detail (platform); Case study detail (content); Content catalogue (topics / sector suites); Platform overview; Segment landing: small business; Segment landing: mid-market; Segment landing: enterprise; Solutions index (sticky anchor tabs); Professional services (legacy grid system); Impact (legacy layout, pink theme); Integrations directory; Release notes landing; Book a demo; Pricing; Features index (sticky anchor tabs); AI agent product page; Mentoring software product page; Content overview; Content service (legacy layout); Custom content; Mentoring programmes; Case study index (platform, filterable); Case study index (content); Why us; What's included; Contact; Events & webinars index; Blog & news index; Guides index; Glossary index. · appears on 56 routes · implemented by `src/components/Footer.jsx`

**`conversion.demo-form`** — Demo-request block at the top of the footer: heading and copy beside a 300px form (static placeholder standing in for the original HubSpot embed).

· Opens the footer on the 2 routes with the form footer ('/' and '/company'). · appears on 2 routes · implemented by `src/components/Footer.jsx`

**`conversion.faq`** — FAQ H2 with five independently toggling accordion items (open 450ms / close 650ms outQuart, plus-icon rotation). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage). Same component reused on subpages with a variant prop (subpage).

· Listed on 36 routes: Marketing homepage; Feature detail; Platform overview; Segment landing: small business; Segment landing: mid-market; Segment landing: enterprise; Solutions index (sticky anchor tabs); Release notes landing; Book a demo; Pricing; Features index (sticky anchor tabs); AI agent product page; Mentoring software product page; Custom content; Mentoring programmes; Case study index (platform, filterable); Company; Why us; What's included; Contact. · appears on 36 routes · implemented by `src/components/Faq.jsx`

**`conversion.faq-empty`** — Page-local CMS empty state of the feature-page FAQ (data-section 'faq', data-variant 'empty'): padding 5rem / 4rem tab / 3rem mob, a centred serif H2 (60rem max) and, 4.375rem below, a single 42rem-wide surface-1 bar with the message 'No FAQs found.' in body text. No accordion, no interaction. Rendered by FeatureDetail in place of the FAQ when the route's data has `empty: true`.

· Listed on 17 routes: Feature detail. · appears on 17 routes · implemented by `src/pages/features/FeatureDetail.jsx > FaqEmpty`

**`conversion.faq-legacy`** — Relume-style 'grid lines' FAQ in container-large: a centred header cell (42rem wide, bordered left/right) with a pill eyebrow and a 3rem (2rem <=767) H2, then a single-column 42rem accordion of bordered rows (bold 1.25rem question cell + a separate square plus-icon cell), then a bottom spacer cell with a centre line (12rem; omitted for the green theme). The `theme` prop picks the line/open colours: 'olive' (/content/topics, /content/sector-suites), 'olive-items' (/content: item lines also olive) and 'green' (/lms/integrations: no top border, no bottom spacer). Outer side borders drop at <=991; one item can be open on load.

· Listed on 4 routes: Content catalogue (topics / sector suites); Integrations directory; Content overview. · appears on 4 routes · implemented by `src/components/sections/FaqLegacy.jsx`

**`conversion.glossary-cta`** — Oldest-system block (fixed 16px root) on /resources/lms-glossary: an 80rem container holding a #1b1b1b rounded (10px) card. Centred stack of the Nimbus wordmark, a 2.5rem (1.875rem <=767) H2, one line of white 1.25rem copy and two small green pill-less buttons side by side (stacked <=767), then a wide 1300:582 product image filling the card bottom. The card rises and fades in once when it enters the viewport.

· Listed on 1 route: Glossary index. · appears on 1 routes · implemented by `src/components/sections/GlossaryCta.jsx`

**`conversion.pricing-plans-legacy`** — Legacy purple-hairline (#570039) block: centred serif 4rem H2 header over a shrink-to-fit 2-plan grid (second plan tinted #3b041d); each plan = name, serif 3rem price, period, then a count label (+ optional note) with a large count at the bottom-right. Below, a centred 36rem feature list: grey lead line + rows with top/left hairlines. Plans stack to one column <=479. No variants or theme prop.

· Listed on 1 route: Impact (legacy layout, pink theme). · appears on 1 routes · implemented by `src/components/sections/PricingProLegacy.jsx`

**`conversion.why-cta`** — A bare centred block (72rem max, margin 4rem top / 6rem bottom) holding a serif H2 and, 1rem below, a single primary button. No background or card. Side padding 1.5rem <=767 and 1rem <=479, where the button stretches to full width.

· Listed on 1 route: Why us. · appears on 1 routes · implemented by `src/components/sections/WhyBlock.jsx`

### INDEX

_Filterable or listing collections (blog, events, guides, glossary, integrations, case studies), including such a block when it also carries the page H1._

**`index.blog-featured`** — Legacy 'green' styling inside side hairlines (/resources/blog-and-news): (1) page header row with eyebrow tag, serif 3.8rem H1 and 20px lead; (2) a featured-post link card, 0.8fr image | 1fr content (H2-sized title, grey excerpt, 'Written by' avatar + author, date and read-time tags), one column <=767 and meta row reversed <=479; (3) a #001811 subscribe callout with a heading, sub line and a static email field + button (no submission). The SubscribeCallout part is also exported and reused by EventsUpcoming.

· Listed on 1 route: Blog & news index. · appears on 1 routes · implemented by `src/components/sections/BlogFeatured.jsx`

**`index.blog-filter`** — Hairline-bordered block on the legacy "green" theme. Left 20%: sticky "Filter by category" checkbox list (2-column grid at 991 and below, wrapping row at 479). Right 80%: a header row "Showing N articles out of M" with a Sort by dropdown (newest / oldest), a 2-column grid (1 at 479) of post cards (image, serif title, date and read-time pills) and a "Load more" pill that reveals 20 more. Client-side filtering, OR across ticked categories.

· Listed on 1 route: Blog & news index. · appears on 1 routes · implemented by `src/components/sections/BlogFilter.jsx`

**`index.cs-content-list`** — Unfiltered CMS-style grid on the content ("yellow") legacy theme: 3 columns (2 at 767 and below, 1 at 479 and below) of hairline-bordered link cards, each with a customer logo top-left, a short summary and a "Learn more ›" label at the bottom. Sits under the page's legacy header; carries no heading of its own.

· Listed on 1 route: Case study index (content). · appears on 1 routes · implemented by `src/components/sections/CsContentList.jsx`

**`index.cs-content-related`** — Hairline-bordered block on the content ("yellow") theme: a left-aligned serif 4rem H2 header row, then a 3-column grid (1 column at 767 and below) of fixed-aspect cards, each with a customer logo, a one-sentence summary and a "Learn more ›" link to that case study. Not a slider.

· Listed on 5 routes: Case study detail (content). · appears on 5 routes · implemented by `src/components/sections/CsContentRelated.jsx`

**`index.cs-filter-grid`** — Dark-theme block: left-aligned H2, then a filter bar ("All" reset + three click-open checkbox dropdowns with two-column option lists; OR within a dropdown, AND across them; the button shows the ticked values) above a 3-column grid (2 at 991 and below, 1 at 767 and below) of rounded case-study cards with a customer logo and a two-line headline. Shows an empty-state line when no card matches. On /case-studies/lms the bar stays in flow (stickyBar false).

· Listed on 1 route: Case study index (platform, filterable). · appears on 1 routes · implemented by `src/components/sections/CsFilterGrid.jsx`

**`index.events-past`** — Hairline-bordered block on the legacy "green" theme: centred serif 4rem H2, then a 2-column grid (1 at 479) of fixed-aspect cells (auto height at 991 and below), each with an optional green month-year label, a big day number, a title and a "Watch now ›" link. On hover a photo layer with a 75% black overlay fades in behind the cell. An optional year-pill filter exists (showFilter) but no page enables it.

· Listed on 1 route: Events & webinars index. · appears on 1 routes · implemented by `src/components/sections/EventsFilter.jsx`

**`index.events-upcoming`** — Hairline-bordered block on the legacy "green" theme: centred serif 4rem H2, a 3-column list (1 at 767) of upcoming-event link cards (date chip with green gradient and left rule, semibold event name, "Register today ›"), then the shared newsletter callout (heading, sub line, static email field + Subscribe button). The live CMS had a single event.

· Listed on 1 route: Events & webinars index. · appears on 1 routes · implemented by `src/components/sections/EventsUpcoming.jsx`

**`index.glossary`** — Oldest-system block (fixed 16px root) carrying the page H1: centred serif H1, a multi-line intro and a static email sign-up row; an A-Z pill radio filter ("All" + 26 letters, filters terms by first letter) with a "Showing N results." line; then a 3-column grid (2 at 991, 1 at 767) of rounded #1b1b1b term cards ("What is X?" heading, definition, "Read more" chip). Hovering a card dims the others to 50%.

· Listed on 1 route: Glossary index. · appears on 1 routes · implemented by `src/components/sections/GlossaryIndex.jsx`

**`index.guides`** — Oldest-system block (fixed 16px root) carrying the page H1: centred serif H1, one line of intro and a static email sign-up row; then a featured guide card (#1b1b1b, 550px tall, title + text + Download button on the left half, guide cover on the right, under a 65% black blurred layer); then a 3-column grid (2 at 767, 1 at 479) of guides, each a cover image, 1.875rem title, short text and a Download button.

· Listed on 1 route: Guides index. · appears on 1 routes · implemented by `src/components/sections/GuidesIndex.jsx`

**`index.integration-filter`** — Hairline-bordered (#00251e) block: left 20% sticky "Filter by category" checkbox list (wrapping row at 991, 2-column grid at 479); right 80% header "Showing N connections out of M" with a Sort by dropdown (Name A-Z / Z-A) above a 3-column grid (2 at 991, 1 at 479) of integration cards (logo mark, arrow chip, serif name). OR filter across ticked categories. Same filter layout family as the blog filter but with name sort and logo cards.

· Listed on 1 route: Integrations directory. · appears on 1 routes · implemented by `src/components/sections/IntegrationFilter.jsx`

**`index.topics-grid`** — Legacy content (yellow) theme: a centred serif 4rem H2 header in a side-hairline frame over a 3-col grid (1 col <=767) of hairline link cards, each with a 20px/500 title, grey copy and a 3:2 topic image; hover reveals a dotted radial-gradient texture instantly. The component also has a 'suites' variant (split header + button + 6 sector cards) but no real page uses it; only 'topics' (/content/topics) is live and modelled. Same component reused on subpages with a variant prop (topics). Same component reused on subpages with a variant prop (topics). Same component reused on subpages with a variant prop (topics). Same component reused on subpages with a variant prop (topics). Same component reused on subpages with a variant prop (topics).

· Listed on 2 routes: Content catalogue (topics / sector suites). · appears on 2 routes · implemented by `src/components/sections/TopicsGrid.jsx`

**`index.webinars-upcoming`** — Two-column hairline block on the legacy "green" theme (stacked at 767): left half is a sticky intro (pill eyebrow, 1.75rem heading, grey line of copy); right half lists upcoming webinars as bordered rows (date pill + semibold title). With no webinars it renders the CMS empty state, a grey #ddd box reading "No items found.", which is what the only real page shows.

· Listed on 1 route: Events & webinars index. · appears on 1 routes · implemented by `src/components/sections/WebinarsUpcoming.jsx`

### ARTICLE

_Long-form detail bodies (case-study articles)._

**`article.cs-content-article`** — Hairline-bordered two-column block on the legacy content ("yellow") theme. Left 30%: sticky sidebar with an "In this article" TOC (on the real pages every H2, section titles and sub-headings, is listed via tocFromHeadings), a Share row with three icon buttons and a dotted-texture CTA card with a yellow pill button. Right 70%: rich-text sections (title H2, then a sequence of paragraphs with **bold**/[[link]] spans, sub-heading H2s, spacer/empty paragraphs, centred or full-width figures and yellow-ruled blockquotes), followed by a dotted-texture quote card (quote, avatar, name, role). At 767 and below the sidebar moves under the article and the TOC is hidden.

· Listed on 5 routes: Case study detail (content). · appears on 5 routes · implemented by `src/components/sections/CsContentArticle.jsx`

**`article.cs-platform-body`** — One long section that is the whole case-study-platform template body: an opening block (customer logo top-left, serif H1 bottom-left over a radial-masked hero image, play-video ring icon on the right), a row of 4 info cards (4 columns, 1 column at tablet and below: two stat cards, a challenge-tag card and an integrations-chip card, the last stat card carrying a "See how" anchor link), then a two-column body with a sticky left TOC (section titles + Testimonial entry, scroll-spy highlight, sidebar demo card; the sidebar is hidden at 479 and below) beside the article (H2 + rich paragraphs per section, optional inline image), a testimonial card, a serif video heading with a video placeholder and caption, and finally a centred serif CTA heading with a button. Because it carries the page H1, the template has no separate hero section.

· Listed on 5 routes: Case study detail (platform). · appears on 5 routes · implemented by `src/components/sections/CsPlatformBody.jsx`
