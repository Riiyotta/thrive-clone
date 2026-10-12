// /lms/enterprise (page-lms-enterprise, fixed 16px root). Order per CLONE_SPEC_PAGES §C.
import WowContentHero from '../../components/sections/WowContentHero.jsx'
import Layout03Tabs from '../../components/sections/Layout03Tabs.jsx'
import AutotabsGroup from '../../components/sections/AutotabsGroup.jsx'
import Results from '../../components/Results.jsx'
import TwoColFeatures from '../../components/sections/TwoColFeatures.jsx'
import IntegrationsVisual from '../../components/sections/IntegrationsVisual.jsx'
import TestimonialQuote from '../../components/sections/TestimonialQuote.jsx'
import CtaStrip from '../../components/sections/CtaStrip.jsx'
import ComparisonTable from '../../components/sections/ComparisonTable.jsx'
import Faq from '../../components/Faq.jsx'
import Eyebrow from '../../components/shared/Eyebrow.jsx'
import Button from '../../components/shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from '../../components/shared/Placeholder.jsx'
import SplitAutotabs from './SplitAutotabs.jsx'
import CentredQuote from './CentredQuote.jsx'
import { faqItems } from './faq.js'

const TEXT =
  'Scattered systems mean scattered data. Nimbus brings learning, skills, knowledge and reporting together so every team works from the same picture, and leaders across the business can act on it with confidence.'

const EXTRA = {
  1: 'Single sign-on, regional hosting and full audit trails are set up for you from the very first day.',
  2: 'Live dashboards show completions, skills and engagement by region, so nothing gets missed at review time.',
  4: 'A named team supports you from the very first workshop through to launch day, and keeps on helping your teams improve with regular reviews long after it.',
}

const PLATFORM_SLIDES = [
  ['One platform', 'One enterprise learning platform in place of five separate tools.'],
  ['Security', 'Enterprise-level security from the very start.'],
  ['Analytics', 'Insight that leaders can act on today.'],
  ['Scale', 'Built to grow with global teams.'],
  ['Support', 'A partner for every stage of growth.'],
].map(([tab, title], i) => ({
  tab,
  title,
  // slides 2, 3 and 5 carry a longer paragraph, as on the original (their 9-line copy sets the slider height at 390)
  text: [1, 2, 4].includes(i) ? `${TEXT} ${EXTRA[i]}` : TEXT,
  imageAspect: 'aspect-square mob:aspect-[350/320]',
}))

const PLATFORM_HEADER = (
  <div className="flex items-end justify-between gap-[3.75rem] mob:flex-col mob:items-start mob:gap-[1.5rem]">
    <div className="w-[47.3%] mob:w-full">
      <h2 className="heading-h2">The enterprise platform built for scale</h2>
    </div>
    <div className="w-[47.3%] max-w-[36rem] mob:w-full">
      <p className="mb-[1.25rem] text-para text-grey">
        Nimbus brings everything your people need into one home, from courses and mentoring to{' '}
        <a href="#" className="inline-link">
          smart insight tools
        </a>
        , global news, team spaces and chat, so large teams can learn, share and grow together in every region, every office,
        every site and every shift.
      </p>
    </div>
  </div>
)

const SERVICE_SLIDES = [
  ['A partnership', 'A partnership, not just a supplier.', 'See the full service offer'],
  ['Migration', 'Migration and setup', 'Plan your move'],
  ['Launch', 'Launch campaigns that land', 'Plan your launch'],
  ['Content', 'Content that fits your teams', 'Explore content'],
  ['Success', 'Ongoing success reviews', 'Meet the team'],
].map(([tab, title, label], i) => ({
  tab,
  title,
  // the first slide's paragraph is one line longer, as on the original (5 lines desktop / 7 at 390)
  text: `Every enterprise rollout is different. Our services team works alongside yours from the first workshop to launch day and beyond, shaping the plan, the content and the campaigns around how your people really work${i === 0 ? ', in every region and every team' : ''}.`,
  link: { label, href: '/lms/professional-services' },
  imageAspect: 'aspect-square mob:aspect-[350/320]',
}))

const SERVICE_HEADER = (
  <div className="flex items-start justify-between gap-[5rem] mob:flex-col mob:gap-[1rem]">
    <div className="flex max-w-[42rem] flex-1 flex-col items-start gap-[1rem]">
      <Eyebrow chipClassName="bg-green-hover">Expert services</Eyebrow>
      <h2 className="heading-h2">The team behind your enterprise learning success story</h2>
    </div>
    <div className="mb-[1rem] mt-[4rem] max-w-[36rem] flex-1 rounded-[0.75rem] bg-surface-1 p-[1rem]">
      <p className="mb-[0.75rem] text-[1.125rem] italic leading-[1.4] text-ink mob:text-[1.1rem]">
        “People keep telling us how easy the switch felt. The services team planned every step with us, answered every
        question quickly and made sure our launch went off without a hitch across every site.”
      </p>
      <div className="flex items-center gap-[1rem] mob:flex-col mob:items-start">
        <Placeholder tone={3} label="" className="h-[2.5rem] w-[2.5rem] rounded-full" />
        <div className="text-[1rem] leading-[1.4] text-grey mob:mb-[1rem]">
          <div className="font-semibold">Jordan Ellis</div>
          <div>
            Learning Lead,{' '}
            <a href="#" className="inline-link">
              Northwind
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const SERVICE_AFTER = (
  <>
    <CentredQuote
      className="mb-[3rem] mt-[4rem]"
      quote="“The process, the support and the people behind Nimbus have been outstanding from day one. Every question was answered quickly, every deadline was met and our teams felt looked after at every step. The launch went smoothly across all of our sites, and the ongoing reviews keep us improving month after month. I could not ask for a better partner.”"
      name="Sam Rivera"
      role="Digital Learning Experience Platform Manager,"
      org="Northwind Roads"
      roleClassName="text-body mob:text-small"
    />
    <div className="flex justify-center">
      <Button variant="primary" to="/lms/professional-services">
        Explore our expert services →
      </Button>
    </div>
  </>
)

const CARDS = [
  ['1.5x', 'Customer one', 'return on investment for frontline training in the very first year, across every region.'],
  ['40%', 'Customer two', 'less time spent onboarding new starters across every region, brand and division.'],
  ['3x', 'Customer three', 'more courses completed after moving away from their old and clunky learning system.'],
  ['92%', 'Customer four', 'of staff active on the platform every single month, from busy stores to head office.'],
].map(([stat, brand, rest]) => ({ stat, brand, rest, label: <LogoPlaceholder className="h-[3rem] w-[3rem] text-[0.6rem] mob:h-[2rem] mob:w-[2rem]" /> }))

// TwoColFeatures rows (preset copy, with the security paragraph trimmed by one word so it wraps to the original's
// 11 lines at desktop; 16 at 390 unchanged).
const IL = ({ children }) => (
  <a href="#" className="inline-link">
    {children}
  </a>
)
const TWO_COL_ROWS = [
  {
    title: "We're only getting started",
    text: (
      <>
        We're <IL>shipping features</IL> three to four times faster than we did last year. These aren't vanity features. They're
        the ones enterprise customers actually ask for, like <IL>Spaces</IL>, built with you, for you. Every single month, without
        fail.
        <br />
        <br />
        And we're only just getting started. Enterprise customers help shape our roadmap directly, in regular sessions with our
        product team, so what we build solves your challenges sooner.
      </>
    ),
    quote: '"We are adopting the latest Nimbus features almost as fast as they come out. As part of our leadership programme, we launched Spaces, which has been really popular."',
    name: 'Jordan Ellis',
    role: 'Digital Capability Manager, Northwind Retail Group',
    blocks: ['title', 'text', 'quote'],
  },
  {
    title: 'Enterprise grade security, built in',
    text: (
      <>
        Nimbus is a secure, cloud-based learning platform built for <IL>enterprise data protection</IL>, independently certified
        for security and quality, hosted in the cloud with enterprise-grade encryption and regional data residency options, so
        your IT and legal teams get what they need to sign off with confidence.
        <br />
        <br />
        Nimbus also supports enterprise <IL>compliance training</IL> needs, letting you build and deliver mandatory training
        alongside everything else your teams learn. <IL>Role-based access</IL>, <IL>SSO</IL>, audit logging and content
        permissions come as standard, not an add-on.
      </>
    ),
    quote: '“Security was one of our key considerations when we ran a tender for a new platform, and the Nimbus team were able to show that they met all of our required standards.”',
    name: 'Sam Rivera',
    role: 'Improvement Manager, Kite',
    blocks: ['title', 'text', 'quote'],
  },
]

// ComparisonTable enterprise rows: copy lengths match the original's per-row line counts (2/3/3/3/2/3/2 at 1440,
// 4/5/5/5/4/4/3 at 390).
const TL = ({ children }) => <a href="#">{children}</a>
const TABLE_ROWS = [
  ['Security and control', <><TL>Independent security certifications in place</TL>, cloud hosting, encryption, role-based access and full audit logs</>],
  ['Global rollout', <>Automatic translation of the platform and all learning content into <TL>40+ languages</TL>, with regional hosting and data residency choices</>],
  ['Multi-brand management', <>Central oversight of separate brands, each with its own look, content, access and reporting, all managed through <TL>multi-brand setup</TL></>],
  ['AI, search and automation', <><TL>Nova, the built-in assistant</TL>, connected search across business systems, AI-assisted authoring and <TL>assistant access</TL> from the AI tools your teams already use</>],
  ['Integrations', <>HR, chat, CRM, identity, payroll and productivity tools plus <TL>60+ systems</TL> ready to connect</>],
  ['Launch and support', <><TL>Guided launch</TL>, <TL>smooth migration</TL>, single sign-on setup, onboarding, global rollout and <TL>round-the-clock enterprise help</TL></>],
  ['Measurement', <>Compliance, engagement, skills and <TL>learning impact</TL> reporting</>],
]

// AutotabsGroup enterprise tabs + quote: copy lengths match the original's line counts (slide headers 123px at
// desktop; 226/200/200/200 at 390; quote 6 lines at 390).
const ENT_TABS = [
  { tab: 'Connected search', title: 'One search for every answer.', text: 'Whether it lives in your documents, chat tools, wikis, shared drives, intranet or course library, Nimbus finds the right answer for every single person and shows them exactly where it came from, in seconds.' },
  { tab: 'Course search', title: 'Search inside every course you own.', text: 'Nimbus reads the content inside uploaded course packages, so learners can jump straight to the lesson, slide or video moment that answers their question.' },
  { tab: 'Assistant', title: 'Run Nimbus from the AI tools you already use every day.', text: 'Create spaces, assign courses and pull reports from your favourite AI assistant, with the same permissions and audit trail as the platform itself, every time.' },
  { tab: 'Build your own', title: 'Build the learning tools you imagine.', text: 'Describe a quiz, a checklist or a mini app in plain words and Nimbus builds it for you in moments, ready to share with any team, site or region in a single click.' },
]
const ENT_QUOTE = {
  quote: '"One thing I love about Nimbus is how ambitious they are. I love the different ways of thinking, the bold ideas they keep coming up with, and our team at Kite being part of that journey is exceptional."',
}

const FAQ = faqItems([
  'What is an enterprise LMS?',
  'Can Nimbus replace several older systems without disrupting our busy teams?',
  'Which security certifications does Nimbus currently hold?',
  'Does Nimbus scale across global regions?',
  'How are admin permissions handled across each division?',
  'Can we run separate portals for different brands?',
  'What reporting is available to senior leaders today?',
  'How does Nimbus support multilingual global workforces?',
  'How long does enterprise rollout take?',
  'Which HR systems can Nimbus connect with?',
  'Is there a dedicated support team?',
  'Can we move our content and records across?',
  'How is our data hosted securely?',
  'Can we tie learning to our business results?',
  'What does enterprise pricing include?',
])

export default function Enterprise() {
  return (
    <>
      <WowContentHero
        variant="enterprise"
        // the original's seven marks (96x26 / 39 / 39 / 27 / 64 / 27 / 64) set the stacked logo-row heights at 390
        logoAspects={['aspect-[96/26]', 'aspect-[96/39]', 'aspect-[96/39]', 'aspect-[96/27]', 'aspect-[96/64]', 'aspect-[96/27]', 'aspect-[96/64]']}
      />
      <SplitAutotabs header={PLATFORM_HEADER} slides={PLATFORM_SLIDES} innerClassName="pt-[3rem]" spacerClassName="pt-[2rem]" />
      <Layout03Tabs variant="video" />
      <AutotabsGroup variant="enterprise" tabs={ENT_TABS} quote={ENT_QUOTE} headingClassName="mob:!mt-0" />
      <div className="container-medium">
        <Results
          heading={
            <>
              The enterprise platform that delivers <em className="italic">real results</em>
            </>
          }
          headingClassName="max-w-[42rem]"
          subtitle="Completions alone are simply not enough. Nimbus links learning to the results your business cares about most, from sales and service to safety."
          headerClassName="pb-[1rem] pt-[2.5rem]"
          cards={CARDS}
          testimonial={null}
          cta={null}
          className=""
        />
        <CentredQuote
          className="mx-[5rem] mb-[1rem] mt-[2rem] tab:mx-0"
          quote="“We needed a platform that could grow with us across every market. Nimbus gave our people one place to learn and share, and gave our leaders the insight to see exactly what it changed for the whole business.”"
          name="Alex Morgan"
          role="Chief Product and Learning Officer,"
          org="Contoso"
          roleClassName="text-body mob:text-small"
        />
        <div className="flex justify-center pb-[1rem] pt-[1.5rem]">
          <Button variant="primary" to="/lms/demo-platform">
            See it in action →
          </Button>
        </div>
      </div>
      <div data-gap className="h-[2rem]" />
      <TwoColFeatures preset="enterprise" rows={TWO_COL_ROWS} imageClassNames={[undefined, 'aspect-square w-full']} />
      <SplitAutotabs header={SERVICE_HEADER} slides={SERVICE_SLIDES} innerClassName="" after={SERVICE_AFTER} />
      <IntegrationsVisual variant="enterprise" />
      <TestimonialQuote
        variant="enterprise"
        quote={`"We can actually link our sales data. The reps who engage with the content on the platform are seeing a bigger lift in their earnings than the reps who don't."`}
      />
      <CtaStrip variant="button" label="Book a demo" href="/lms/demo-platform" />
      <div data-gap className="h-[4rem]" />
      <ComparisonTable variant="enterprise" rows={TABLE_ROWS} />
      <Faq heading="Enterprise FAQs answered" items={FAQ} />
    </>
  )
}
