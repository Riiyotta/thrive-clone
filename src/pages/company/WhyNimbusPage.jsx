import WowContentHero from '../../components/sections/WowContentHero.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import WhyKikitabs from '../../components/sections/WhyKikitabs.jsx'
import WowBento from '../../components/sections/WowBento.jsx'
import WhyBlock from '../../components/sections/WhyBlock.jsx'
import CaseStudyCarousel from '../../components/CaseStudyCarousel.jsx'
import Faq from '../../components/Faq.jsx'
import { faqItems } from './shared.js'

// /company/why-nimbus (page-company-why-nimbus, fixed 16px root via Layout FIXED_REM_PAGES).
// 768–991: two rows of four 112px boxes (64px rows, centred, 3rem / 2rem gaps); ≤767: two columns of 96px boxes whose
// heights follow the original's per-logo heights so the four rows keep their measured height.
const MOB_ASPECT = ['mob:aspect-[96/64]', 'mob:aspect-[96/27]', 'mob:aspect-[96/39]', 'mob:aspect-[96/24]', 'mob:aspect-[96/17] mob:leading-none', 'mob:aspect-[96/21] mob:leading-none', 'mob:aspect-[96/64]', 'mob:aspect-[96/64]']
const LOGOS = MOB_ASPECT.map((m) => ({ text: 'Logo', aspect: `aspect-[78/55] tab:aspect-[112/64] ${m}` }))

const FAQ = [
  ['What makes Nimbus different from a typical old LMS?', 39],
  ['Is Nimbus the right fit for the size of my team?', 65],
  ['Is our data kept safe?', 40],
  ['Can Nimbus connect with the tools we already use?', 40],
  ['How quickly can we launch Nimbus for everyone?', 32],
  ['Can every one of our learners use Nimbus?', 32],
]

// Copy sized to the original's line counts (heading 2L @1440 / 3L @390, quote 5L / 6L, card texts 4L @1440
// and 2-3-2-3L @390, split heading 1L at both widths; slide texts 4-3-3-3-4L @1440 / 9-7-7-9-9L @390,
// slide titles 2-2-2-3-2L @390, Hub copy 4L at both).
const KIKITABS = {
  heading: { before: 'The friendly assistant your team keeps ', em: 'asking for', after: '' },
  intro:
    'Flexible and built around how your people already work, Nova answers questions, finds the right resource and nudges every learner forward, so managers spend less time chasing updates and teams spend more time learning together.',
  slides: [
    { tab: 'Guide', highlight: 'Coaching that really grows people.', subdued: 'Guidance in the flow of work, with prompts, check-ins and honest feedback that adapt to each person, so growth keeps moving even when managers are busy with everything else on their plate this week.' },
    { tab: 'Builder', highlight: 'Great content, ready in minutes.', subdued: 'An extra designer on the team, turning rough notes, long documents and half-formed ideas into polished learning that people actually want to finish this week.' },
    { tab: 'Analyst', highlight: 'Skip the dashboards and just ask.', subdued: 'Nova spots gaps, trends and risks across all of your learning data, then explains what it found in plain words that anyone on the team can act on right away.' },
    { tab: 'Admin', highlight: 'Housekeeping that quietly happens in the background.', subdued: 'Tidy old content, fix broken links and keep every pathway current, so your platform stays fresh without hours of manual clean-up each month, and all of your teams always see what is new.' },
    { tab: 'Assistant', highlight: 'One place for every answer.', subdued: 'Nova searches all your courses, documents, people and conversations at once, then gives one clear answer with links to every source, so nobody has to dig through old folders or wait around.' },
  ],
  splitHeading: 'The next era of learning',
  tabs: [
    { label: 'Hub', copy: 'Bring your tools together in one place, so people find learning, news and help without switching between apps all day long or losing track of what matters most to them.', cta: 'Book a demo' },
    { label: 'Mentors', copy: 'Give every team its own space to share updates, celebrate wins and learn from each other in the open.', cta: 'Book a demo' },
    { label: 'Spaces', copy: 'See the skills your people have today and the ones they need next, then build pathways that close the gap.', cta: 'Book a demo' },
    { label: 'People Search', copy: 'Turn activity into answers with reports that show what is working and where to focus your effort next.', cta: 'Book a demo' },
  ],
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
      { stat: '50%', brand: 'Customer three', rest: 'less time spent on administration at', after: 'this year after switching' },
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
        wrapClassName="min-h-[4rem] w-[60rem] max-w-none tab:w-full tab:flex-wrap tab:justify-center tab:gap-x-[3rem] tab:gap-y-[2rem] mob:justify-around mob:gap-[2rem]"
        logoClassName="w-[4.875rem] tab:w-[7rem] mob:w-[6rem]"
        logos={LOGOS}
        trailingSpacer={false}
      />
      <WhyKikitabs {...KIKITABS} />
      <WowBento
        variant="why"
        quote={{
          quote: '“One of the things that really sets Nimbus apart is how closely they listen. Our ideas show up in the product, and the whole team treats us like partners rather than customers.”',
          name: 'Jordan Ellis',
          role: 'Learning and Development Lead,',
          org: 'Northwind Hotels',
        }}
        awardsText="Nimbus is recognised by leading industry awards for innovation, employee experience, product design and the quality of our long-term customer partnerships with teams all around the world."
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
