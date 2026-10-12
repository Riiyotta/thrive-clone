// feature-detail template: the 17 /lms/features/* routes. One component; per-route copy and
// options live in featureDetailData.js (keyed by path). Section order per pages-manifest.json
// sectionsByRoute: hero-wowh → logos → product-tabs → cta-strip → [video] → reviews-slider → faq → autotabs-cta.
import { useLocation } from 'react-router-dom'
import Hero from '../../components/Hero.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import ProductTabs from '../../components/ProductTabs.jsx'
import VideoSection from '../../components/VideoSection.jsx'
import Faq from '../../components/Faq.jsx'
import KikiTabs from '../../components/KikiTabs.jsx'
import CtaStrip from '../../components/sections/CtaStrip.jsx'
import ReviewsSlider from '../../components/sections/ReviewsSlider.jsx'
import Button from '../../components/shared/Button.jsx'
import { FEATURE_DETAIL } from './featureDetailData.js'

// Logo boxes mirror the original's image boxes inside the 7rem blocks (full width ≥768, 86% ≤767, max-h 4rem):
// the 4th is a tall mark (capped by max-h on desktop), so the 390 rows come out 37/61/37 tall like the live page.
// (`aspect` is interpolated into the placeholder's className, so it also carries the mobile width.)
const LOGOS = ['aspect-[92/37]', 'aspect-[92/37]', 'aspect-[92/25]', 'aspect-[92/61]', 'aspect-[92/37]', 'aspect-[92/31]'].map(
  (aspect) => ({ text: 'Logo', aspect: `${aspect} mob:!w-[86%]` }),
)
// 57rem logo row centred over the 45.25rem container (it overflows both sides equally); ≤991 it wraps,
// centred, 2rem/3rem gaps; ≤767 space-around with 2rem gaps.
const LOGO_WRAP =
  'ml-[-5.875rem] min-h-[4rem] w-[57rem] max-w-none tab:ml-0 tab:w-full tab:flex-wrap tab:justify-center tab:gap-y-[2rem] mob:justify-around mob:gap-[2rem]'
// <1440 the reviews arrows sit as inline-blocks on a body-text line (block wrap), adding the strut's descent below them.
const NAV_INLINE =
  'flex text-body [@media(max-width:1439px)]:block [@media(max-width:1439px)]:[&>button]:inline-block'
// .wow-slider-content on the feature pages: min-h 32rem ≤991 / 28rem ≤767, 1.5rem padding ≤767 (no bottom ≤479);
// copy and button stack ≤767 with a 3rem gap, and the button fills the row ≤479.
const EXPLORE_SLIDE = {
  slideClassName: 'tab:min-h-[32rem] mob:min-h-[28rem] mob:p-[1.5rem] xs:pb-0',
  rowClassName: 'mob:flex-col mob:items-start mob:gap-[3rem]',
  ctaStretch: true,
}
const EXPLORE_HEADING = 'Explore further features built to support your entire learning programme'
const FAQ_ANSWER =
  'Yes. It is part of every Nimbus plan, and admins can switch it on for the whole organisation or for selected teams from one settings panel in a few minutes.'

// .section_hero-platform header (h2.text-size-large + primary button, then a 2rem spacer).
function ExploreHeader() {
  return (
    <div className="padding-global">
      <div className="container-medium">
        <div className="flex max-w-[28rem] flex-col items-start gap-[1rem]">
          <h2 className="mb-[1.25rem] mt-[0.25rem] text-[1.5rem] leading-[1.725rem] text-ink mob:text-[1.25rem] mob:leading-[1.4375rem]">
            {EXPLORE_HEADING}
          </h2>
          <Button variant="primary" to="/lms/features">
            See every feature →
          </Button>
        </div>
        <div className="pt-[2rem] mob:pt-[1.25rem]" />
      </div>
    </div>
  )
}

// CMS empty state of .section_wowfaqs (employee-experience, communication).
function FaqEmpty() {
  return (
    <section data-section="faq" data-variant="empty">
      <div className="padding-global">
        <div className="py-[5rem] tab:py-[4rem] mob:py-[3rem]">
          <div className="flex flex-col items-center gap-[4.375rem]">
            <h2 className="heading-h2 max-w-[60rem] text-center">Frequently asked questions</h2>
            <div className="w-full max-w-[42rem]">
              <div className="bg-surface-1 py-[1rem] pl-[1.5rem] pr-[1rem] text-body text-ink xs:text-body-xs">No FAQs found.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// CMS empty state of .section_hero-platform (both lists empty): header + two grey bars.
function ExploreEmpty() {
  const bar = <div className="bg-[#dddddd] p-[10px] text-body text-ink xs:text-body-xs">No items found.</div>
  return (
    <section data-section="kiki" data-variant="empty" className="pb-[2rem] pt-[5rem] mob:pt-[3rem]">
      <ExploreHeader />
      <div className="overflow-hidden px-[2rem] py-[3rem] mob:px-[1.25rem]">
        <div className="padding-global">
          <div className="container-large pt-[1rem]">
            <div className="container-medium">
              <div className="flex flex-col gap-[0.5rem]">
                {bar}
                {bar}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function FeatureDetail() {
  const { pathname } = useLocation()
  const d = FEATURE_DETAIL[pathname] || FEATURE_DETAIL['/lms/features/spaces']
  // Literal classes so Tailwind's scanner generates them.
  const paneAspect = d.paneAspect || 'aspect-[670/600]'
  const heroAspect = d.heroAspect || 'aspect-[1440/1289]'
  const ratio = (c) => c.slice(8, -1).replace('/', ':')
  const tabs = d.tabs.map(([label, copy]) => ({
    label,
    short: label,
    src: null,
    image: `Product UI ${ratio(paneAspect)}`,
    copy: copy || d.tabCopy,
    cta: { label: 'See it in action →', to: '/lms/demo-platform' },
  }))

  return (
    <>
      <Hero
        eyebrow={d.eyebrow}
        title={d.title}
        subtitle={d.subtitle}
        subtitleTone="grey"
        showBadges={false}
        primary={{ label: 'See it in action →', to: '/lms/demo-platform' }}
        secondary={{ label: 'Explore more features', to: '/lms/features' }}
        secondaryVariant="dark"
        imageSrc={null}
        imageLabel={`Product UI ${ratio(heroAspect)}`}
        imageAspect={heroAspect}
      />
      <LogoStrip
        heading="Used every day at"
        headingPlacement="inside"
        container="small"
        paddingClassName="py-[5rem] mob:py-[3rem]"
        wrapClassName={LOGO_WRAP}
        logoClassName="w-[7rem]"
        logos={LOGOS}
        trailingSpacer={false}
      />
      {/* The original clips the nowrap ≤767 tab row (and the bleeding pane) at the page edge. */}
      <div className="overflow-x-clip">
      <ProductTabs
        heading={d.tabsHeading}
        intro={d.tabsIntro ?? null}
        tabs={tabs}
        className="pb-[5rem] pt-[2rem] mob:pb-0"
        innerClassName="py-[5rem] mob:py-[3rem]"
        headingClassName=""
        // Without an intro the original keeps its empty 28rem column, so the heading stays 667px wide.
        introClassName={d.tabsIntro ? 'mb-0' : 'mb-0 w-[28rem] tab:w-auto'}
        paneAspect={paneAspect}
        // .wowtabs_child-wrap: 12rem tall but shrinkable, 2.5rem under the tabs (1.25rem / 14rem ≤767), pinned to
        // the bottom of the 37rem body by justify-between.
        childHeightClassName="mt-[2.5rem] h-[12rem] mob:mt-[1.25rem] mob:h-[14rem]"
      />
      </div>
      <CtaStrip variant="heading" />
      {d.video && (
        <VideoSection
          heading={d.video[0]}
          body={d.video[1]}
          // The header sits in a 36rem column (.max-width-medium). <1440 the original header is block, so the
          // H2's top margin collapses out of the section and the
          // video's .margin-large (3rem, 2.5rem tab, 1.5rem mob) collapses with the paragraph margins.
          headingClassName="mb-[1rem] max-w-[36rem] [@media(max-width:1439px)]:mt-0"
          blockClassName=""
          videoClassName="mt-[3rem] tab:mt-[2.5rem] mob:mt-[1.5rem]"
          footnote={null}
        />
      )}
      {d.empty ? (
        <ReviewsSlider order="quote-first" slides={[]} navWrapClassName={NAV_INLINE} />
      ) : (
        <ReviewsSlider order="quote-first" navWrapClassName={NAV_INLINE} />
      )}
      {d.empty ? <FaqEmpty /> : <Faq heading="Frequently asked questions" items={d.faq.map((q) => ({ q, a: FAQ_ANSWER }))} />}
      {d.empty ? (
        <ExploreEmpty />
      ) : (
        <KikiTabs
          media="image"
          imageAspect="aspect-[2914/2610]"
          slideInsetClassName="px-[10px]"
          className="pb-[2rem] pt-[5rem] mob:pt-[3rem]"
          // .section_wowautotabs sits inside the section's padding-global and adds its own, so the gutter doubles.
          tabsClassName="overflow-hidden px-[2rem] py-[3rem] mob:px-[1.25rem]"
          imageSlideOptions={EXPLORE_SLIDE}
          header={<ExploreHeader />}
          tabs={d.explore.map(([tab, text]) => ({
            tab,
            text,
            mediaLabel: 'Product UI 2914:2610',
            cta: { label: 'Learn more', to: '/lms/features' },
          }))}
        />
      )}
    </>
  )
}
