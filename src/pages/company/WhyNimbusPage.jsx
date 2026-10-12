import WowContentHero from '../../components/sections/WowContentHero.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import WhyKikitabs from '../../components/sections/WhyKikitabs.jsx'
import WowBento from '../../components/sections/WowBento.jsx'
import WhyBlock from '../../components/sections/WhyBlock.jsx'
import CaseStudyCarousel from '../../components/CaseStudyCarousel.jsx'
import Faq from '../../components/Faq.jsx'
import { faqItems } from './shared.js'

// /company/why-nimbus (page-company-why-nimbus, fixed 16px root via Layout FIXED_REM_PAGES).
const LOGOS = Array.from({ length: 8 }, () => ({ text: 'Logo', aspect: 'aspect-[78/55] mob:aspect-[112/47]' }))

const FAQ = [
  ['What makes Nimbus different from a typical old LMS?', 39],
  ['Is Nimbus the right fit for the size of my team?', 65],
  ['Is our data kept safe?', 40],
  ['Can Nimbus connect with the tools we already use?', 40],
  ['How quickly can we launch Nimbus for everyone?', 32],
  ['Can every one of our learners use Nimbus?', 32],
]

// Copy sized to the original's line counts (heading 2L @1440 / 3L @390, quote 5L / 6L, card texts 4L @1440
// and 2-3-2-3L @390, split heading 1L at both widths).
const KIKITABS = {
  heading: { before: 'The friendly assistant your team keeps ', em: 'asking for', after: '' },
  intro:
    'Flexible and built around how your people already work, Nova answers questions, finds the right resource and nudges every learner forward, so managers spend less time chasing updates and teams spend more time learning together.',
  slides: [
    { tab: 'Guide', highlight: 'Coaching that really grows people.', subdued: 'Guidance in the flow of work, with prompts, check-ins and honest feedback that adapt to each person, so growth keeps moving even when managers are busy with everything else.' },
    { tab: 'Builder', highlight: 'Great content, ready in minutes.', subdued: 'An extra designer on the team, turning rough notes, long documents and half-formed ideas into polished learning that people actually want to finish this week.' },
    { tab: 'Analyst', highlight: 'Skip the dashboards and just ask the question.', subdued: 'Nova spots gaps, trends and risks across your learning data, then explains what it found in plain words anyone can act on.' },
    { tab: 'Admin', highlight: 'Housekeeping that quietly happens in the background.', subdued: 'Tidy old content, fix broken links and keep every pathway current, so your platform stays fresh without hours of manual clean-up each month.' },
    { tab: 'Assistant', highlight: 'One place for every answer.', subdued: 'Nova searches your courses, documents, people and conversations at once, then gives a clear answer with links to the source, so nobody has to dig through folders or wait around.' },
  ],
  splitHeading: 'The next era of learning',
  quote: {
    text: '“We needed a platform that could grow with us and keep our people engaged from the very first day. Nimbus gave us all of that and more, with a team that listens closely and a product that keeps on improving every single month for all of our people.”',
    name: 'Casey Morgan',
    role: 'Chief Product and Marketing Officer,',
    org: 'Northwind',
  },
  results: {
    heading: { before: 'What could your people ', em: 'achieve?' },
    lead: 'Real outcomes from real teams who chose Nimbus to power their learning every day.',
    cards: [
      { stat: '1.5x', brand: 'Customer one', rest: 'faster onboarding for new starters at', after: 'across all of their stores' },
      { stat: '8.2%', brand: 'Customer two', rest: 'increase in sales for', after: 'after launching new product learning in every region' },
      { stat: '50%', brand: 'Customer three', rest: 'less time spent on admin at', after: 'this year after switching over' },
      { stat: '150%', brand: 'Customer four', rest: 'more active learners at', after: 'within six months of launching the new platform' },
    ],
  },
}

export default function WhyNimbusPage() {
  return (
    <div>
      <WowContentHero variant="why" />
      <LogoStrip
        heading="Bringing learning, knowledge and people together for teams like these"
        headingPlacement="inside"
        container="small"
        paddingClassName="mt-[1rem]"
        gapClassName="gap-[1rem]"
        wrapClassName="min-h-[4rem] w-[60rem] max-w-none mob:w-full mob:flex-wrap mob:justify-around mob:gap-[2rem]"
        logoClassName="w-[4.875rem] mob:w-[7rem]"
        logos={LOGOS}
        trailingSpacer={false}
      />
      <WhyKikitabs {...KIKITABS} />
      <WowBento
        variant="why"
        closing={{
          quote: '“We have had people telling us this is the best learning experience they have ever had at work. That says it all about how much care and effort goes into making every part of Nimbus feel this good.”',
          name: 'Sam Rivera',
          role: 'Learning & Development Manager,',
          org: 'Contoso',
        }}
      />
      <WhyBlock heading="Time to find out what Nimbus can do for you" />
      <CaseStudyCarousel
        heading="How growing teams put Nimbus to work"
        cta={{ label: 'Read the customer stories', to: '/case-studies/lms' }}
        intro="Chosen by more than five hundred organisations to keep their people learning."
      />
      <Faq heading="Frequently asked questions" items={faqItems(FAQ)} />
    </div>
  )
}
