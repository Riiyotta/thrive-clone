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

const LOGOS = Array.from({ length: 6 }, () => ({ text: 'Logo', aspect: 'aspect-[112/45.7]' }))
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
  const bar = <div className="bg-[#dddddd] p-[0.575rem] text-body text-ink xs:p-[0.6875rem] xs:text-body-xs">No items found.</div>
  return (
    <section data-section="kiki" data-variant="empty" className="pb-[2rem] pt-[5rem] mob:pt-[3rem]">
      <ExploreHeader />
      <div className="overflow-hidden py-[3rem]">
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
        wrapClassName="min-h-[4rem] w-[57rem] max-w-none mob:w-full mob:flex-wrap mob:justify-around mob:gap-[2rem]"
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
        introClassName="mb-0"
        paneAspect={paneAspect}
      />
      </div>
      <CtaStrip variant="heading" />
      {d.video && (
        <VideoSection
          heading={d.video[0]}
          body={d.video[1]}
          headingClassName="mb-[1rem]"
          blockClassName=""
          videoClassName="mt-[3rem]"
          footnote={null}
        />
      )}
      {d.empty ? <ReviewsSlider order="quote-first" slides={[]} /> : <ReviewsSlider order="quote-first" />}
      {d.empty ? <FaqEmpty /> : <Faq heading="Frequently asked questions" items={d.faq.map((q) => ({ q, a: FAQ_ANSWER }))} />}
      {d.empty ? (
        <ExploreEmpty />
      ) : (
        <KikiTabs
          media="image"
          imageAspect="aspect-[2914/2610]"
          slideInsetClassName="px-[0.53rem] mob:px-0"
          className="pb-[2rem] pt-[5rem] mob:pt-[3rem]"
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
