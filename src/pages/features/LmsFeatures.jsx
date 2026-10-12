// /lms/features (page-lms-features, fixed 16px root — Layout handles it). Section order per
// pages-manifest.json: wowcontent-hero → logos → features-intro → anchor-nav → sticky-tabs →
// integrations-visual → testimonial-quote → cta-strip → highlight-slider → faq.
import WowContentHero from '../../components/sections/WowContentHero.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import FeaturesIntro from '../../components/sections/FeaturesIntro.jsx'
import AnchorNav from '../../components/sections/AnchorNav.jsx'
import StickyTabs from '../../components/sections/StickyTabs.jsx'
import IntegrationsVisual from '../../components/sections/IntegrationsVisual.jsx'
import TestimonialQuote from '../../components/sections/TestimonialQuote.jsx'
import CtaStrip from '../../components/sections/CtaStrip.jsx'
import CaseStudyCarousel from '../../components/CaseStudyCarousel.jsx'
import Faq from '../../components/Faq.jsx'

// White customer wordmarks on the original (118×19); neutral placeholders here.
const LOGOS = Array.from({ length: 6 }, () => ({ text: 'Logo', aspect: 'aspect-[118/19]' }))

const SLIDES = [
  ['Customer one adds new revenue by training its partners on one platform', [['100%', 'Adoption within four months'], ['21K', 'Course views']]],
  ['Customer two speeds up onboarding for every new hire', [['120,000', 'Course views since launch'], ['80%', 'Monthly active user reach']]],
  ['Customer three uses Nimbus to move its training online', [['4', 'Languages live on the platform'], ['78%', 'Adoption within the first six weeks']]],
  ['Driving growth and performance at Customer four', [['75%', 'Customer growth in the very first year'], ['500k+', 'Platform views in three months']]],
  ['Building a global learning culture at Customer five', [['50%', 'Lift in employee engagement'], ['90%', 'Training completion rate']]],
  ['Customer six gives its learning team the tools to grow skills across every single location', [['70%', 'Engagement lifted across sites'], ['50%', 'Onboarding time reduced']]],
].map(([text, stats]) => ({ text, stats, image: null, logo: null }))

const FAQ = [
  'How secure is Nimbus?',
  'How do learning platforms compare on features?',
  'What should a platform feature checklist include?',
  'Which reporting features should a platform have?',
  'Does Nimbus have a mobile app?',
  'Is Nimbus accessible for every learner?',
  'What are the main benefits of the right platform features?',
  'What makes a good learning platform?',
  'What are the key features of a learning platform today?',
  'What does a learning platform do for a growing business?',
  'What are the basic features of a platform?',
].map((q) => ({
  q,
  a: 'Nimbus brings courses, skills, mentoring, analytics and AI into one platform, with every feature included as standard and set up for you by our team.',
}))

export default function LmsFeatures() {
  return (
    <>
      <WowContentHero variant="features" />
      <LogoStrip
        heading="Platform features trusted by 500+ organisations"
        headingPlacement="inside"
        paddingClassName="pb-[1rem] pt-[0.5rem]"
        gapClassName="gap-[1rem]"
        wrapClassName="min-h-[4rem] w-full mob:flex-wrap mob:justify-around mob:gap-[2rem]"
        logoClassName="w-[7rem]"
        logos={LOGOS}
        trailingSpacer={false}
      />
      <FeaturesIntro />
      <AnchorNav variant="features" />
      <StickyTabs variant="features" />
      <IntegrationsVisual variant="features" />
      <TestimonialQuote variant="platform" preset="platform-features" />
      <CtaStrip variant="button" pullUp />
      <CaseStudyCarousel
        eyebrow="Results"
        heading="Proven learning outcomes"
        cta={null}
        intro="More than five hundred organisations use Nimbus to build skills, share knowledge and keep their people learning every week."
        spacerClassName="h-[2rem]"
        slides={SLIDES}
      />
      <Faq heading="Platform features FAQ" items={FAQ} />
    </>
  )
}
