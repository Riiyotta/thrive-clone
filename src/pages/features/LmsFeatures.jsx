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

// White customer wordmarks on the original; neutral placeholders here, sized to the original's image boxes
// (112 wide ≥768 except a 92px and a 64px square mark; 86% of the block ≤767). `aspect` lands in the
// placeholder's className, so it also carries the width caps.
const LOGOS = [
  'aspect-[112/18]',
  'aspect-[112/30]',
  'aspect-[92/37] max-w-[5.75rem] mob:max-w-none',
  'aspect-[112/32]',
  'aspect-[112/26]',
  'aspect-square max-w-[4rem] mob:max-w-none',
].map((aspect) => ({ text: 'Logo', aspect: `${aspect} !leading-none mob:!w-[86%]` }))

// Sticky-tab panels (same copy as the StickyTabs 'features' defaults), with per-panel slide copy sized so each
// block's tallest slide matches the original: its hidden slides keep a 585px image box (170px ≤479) below the
// copy row, so the block height follows the longest copy in it. Lines at 1440 / 390: four = 2 / 4 (measure, ai),
// brk = 2+1 / 3+1 via a line break (develop, communicate), two = two paragraphs (create), long = 3 / 5 (scale).
const an = (t) => (/^[aeiou]/.test(t) ? 'An' : 'A')
const stickyText = {
  four: (t) => `${an(t)} ${t} space that brings the right learning, news and tools together in one place, so every person always knows where to start.`,
  brk: (t) => (
    <>
      {`${an(t)} ${t} space that brings the right learning, news and tools together in one place.`}
      <br />
      It is quick to set up.
    </>
  ),
  two: (t) => (
    <>
      {`${an(t)} ${t} space that brings the right learning, news and tools together in one place, so every person always knows where to start.`}
      <span className="mt-[1.25rem] block">It is quick to set up.</span>
    </>
  ),
  long: (t) =>
    `${an(t)} ${t} space that brings the right learning, news and tools together in one calm place, so every person on every team always knows where to start and what to do next.`,
}
const panel = (id, eyebrow, title, body, names, kind) => ({
  id, eyebrow, title, body, tabs: names.map((tab) => ({ tab, text: stickyText[kind](tab.toLowerCase()) })),
})
const PANELS = [
  panel('develop-people', 'Grow your people', 'Learning platform features for growing people', ['Give every employee a personal home for learning, with pathways, skills and goals that adapt as they grow, as teams at ', 'Customer one and Customer two', ' found when they moved their whole workforce onto Nimbus.'], ['Home', 'Pathways', 'Skills', 'Goals', 'Mentoring'], 'brk'),
  panel('create-learning', 'Build learning', 'The key features of a modern content studio', ['Build pathways, campaigns and courses in minutes with simple drag-and-drop tools, just like ', 'Customer three', ' did when they rebuilt their whole induction programme.'], ['Studio', 'Campaigns', 'Library', 'Assessments', 'Events'], 'two'),
  panel('communicate-and-engage', 'Connect and engage', 'Platform tools that keep people talking together', ['Chat, notifications, rewards and spaces keep teams at ', 'Customer four', ' connected, informed and learning together every single day, wherever they happen to work.'], ['Messages', 'Spaces', 'Rewards', 'Alerts', 'Feeds'], 'brk'),
  panel('measure-impact', 'Prove impact', 'Platform analytics and reporting for every leader', ['Track completions, assessments and skills growth in real time with clear, shareable dashboards, just as ', 'Customer five', ' now does across every one of its sites, regions and teams.'], ['Dashboards', 'Reports', 'Skills', 'Exports'], 'four'),
  panel('work-with-ai', 'Use AI', 'AI features that save every team real time', ['Nova drafts courses, answers everyday questions and surfaces useful insight in seconds, just as ', 'Customer six', ' saw within weeks of switching it on for every team across the business.'], ['Nova', 'Studio AI', 'Insights', 'Search'], 'four'),
  panel('scale-securely', 'Scale safely', 'Security and admin built for scale', ['Single sign-on, flexible roles and full audit trails keep every record safe and every admin in control, just as ', 'Customer seven', ' relied on for a fast and smooth global rollout.'], ['Security', 'Admin', 'Roles', 'Mobile', 'Audit'], 'long'),
]

// Quote sized to the original's line count at 1440/1280 (5) and 390 (9).
const QUOTE =
  "“Since moving from our old platform we’ve seen some great results: 160% more engagement, a third less time spent onboarding, 2,900% more content completions and half of our annual training budget saved. It’s safe to say we've never looked back!”"

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
      {/* The hero image bleeds 10vw right; the original's page wrapper clips it (overflow-x: clip). */}
      <div className="overflow-x-clip">
        <WowContentHero variant="features" title="Platform features that improve learning and work" />
      </div>
      <LogoStrip
        heading="Platform features trusted by 500+ organisations"
        headingPlacement="inside"
        paddingClassName="pb-[1rem] pt-[0.5rem]"
        gapClassName="gap-[1rem]"
        wrapClassName="min-h-[4rem] tab:w-full tab:flex-wrap tab:justify-center tab:gap-y-[2rem] mob:justify-around mob:gap-[2rem]"
        logoClassName="w-[7rem]"
        logos={LOGOS}
        trailingSpacer={false}
      />
      <FeaturesIntro />
      <AnchorNav variant="features" />
      <StickyTabs variant="features" panels={PANELS} mediaClassName="h-[36.5625rem] xs:h-[10.56rem]" />
      <IntegrationsVisual variant="features" />
      <TestimonialQuote variant="platform" preset="platform-features" quote={QUOTE} />
      <CtaStrip variant="button" pullUp />
      <CaseStudyCarousel
        eyebrow="Results"
        heading="Real learning results"
        cta={null}
        intro="More than five hundred organisations use Nimbus to build skills, share knowledge and keep their people learning every week."
        spacerClassName="h-[2rem]"
        textClampClassName=""
        slides={SLIDES}
      />
      <Faq heading="Platform features FAQ" items={FAQ} />
    </>
  )
}
