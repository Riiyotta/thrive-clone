// /lms (page-lms): platform overview. Order per CLONE_SPEC_PAGES §C page-lms.
import PlatformHero from '../../components/sections/PlatformHero.jsx'
import PlatformIntroHeader from '../../components/sections/PlatformIntroHeader.jsx'
import KikiTabs from '../../components/KikiTabs.jsx'
import TestimonialQuote from '../../components/sections/TestimonialQuote.jsx'
import AutotabsGroup from '../../components/sections/AutotabsGroup.jsx'
import ProductTabs from '../../components/ProductTabs.jsx'
import FeatureBento from '../../components/sections/FeatureBento.jsx'
import Results from '../../components/Results.jsx'
import ComparisonTable from '../../components/sections/ComparisonTable.jsx'
import Faq from '../../components/Faq.jsx'
import Button from '../../components/shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from '../../components/shared/Placeholder.jsx'
import { faqItems } from './faq.js'

// kiki-autotabs #1 (.section_wowautotabs): 3 image slides, white lead-in (10w) + grey copy (41w, 5 lines), CTA.
const HUB_TABS = [
  ['Learning hub', 'Why juggle five different tools when just one will do?', 'Learn more'],
  ['Mentoring', 'A mentoring platform, built for you.', 'Explore mentoring'],
  ['Spaces', 'Shaped together with the best teams in every sector.', 'Explore spaces'],
].map(([tab, highlight, label]) => ({
  tab,
  highlight,
  subdued:
    'Bring learning, knowledge, chat and team news into one calm home, so people always know where to look and who to ask, admins run everything from one panel and leaders see how skills grow across the business every single day, right away.',
  src: null,
  mediaLabel: 'Product UI 16:9',
  cta: { label, to: '/lms/features' },
}))

// kiki-autotabs #2 (.platform-new-kiki): Nova header + 5 video slides (20px lead-in + grey copy).
const NOVA_TABS = [
  ['Coach', 'Coaching that sticks with people.'],
  ['Creator', 'Great content, ready in minutes.'],
  ['Analyst', 'Answers hidden in your data.'],
  ['Admin', 'Routine setup that runs itself.'],
  ['Assistant', 'Help at the moment of need.'],
].map(([tab, highlight]) => ({
  tab,
  highlight,
  subdued:
    'Nova checks in with people on the shop floor after every session, asks what landed, and suggests one small next step so new habits keep building long after the training day is over.',
  mediaLabel: 'Product video 1:1',
}))

const NOVA_HEADER = (
  <div className="padding-global">
    <div className="container-large pt-[1rem]">
      <div className="mx-auto flex max-w-[60rem] flex-col items-center text-center">
        <h2 className="heading-h2 mb-[0.575rem] mt-[2rem]">One AI agent for every learning task</h2>
        <p className="mx-[5rem] mb-[1.15rem] max-w-[50rem] text-body text-grey mob:mx-0">
          Nova spots gaps in compliance, drafts courses, answers questions and coaches people through the working day.{' '}
          <em className="font-bold italic">All from a single prompt.</em>
        </p>
        <div className="mb-[1.72rem] flex justify-center">
          <Button variant="primary" to="/nova">
            Meet Nova, your agent →
          </Button>
        </div>
      </div>
    </div>
  </div>
)

const productTabs = (labels, copy) =>
  labels.map(([label, short]) => ({
    label,
    short,
    src: null,
    image: 'Product UI 670:600',
    copy,
    cta: { label: 'Explore this feature →', to: '/lms/features' },
  }))

const TABS_A = productTabs(
  [['Pathways', 'Pathways'], ['Skills', 'Skills'], ['Analytics', 'Analytics'], ['Assessments', 'Assessments']],
  'Bring people up to speed faster, grow the skills that matter and keep every team learning with guided paths built around real roles.',
)
const TABS_B = productTabs(
  [['Spaces', 'Spaces'], ['Chat', 'Chat'], ['Rewards', 'Rewards'], ['Mobile', 'Mobile']],
  'Give every team a lively place to share news, swap tips and celebrate wins, so knowledge flows freely between sites and shifts every day.',
)

const RESULT_CARDS = ['1.5x', '40%', '3x', '92%'].map((stat, i) => ({
  stat,
  brand: `Customer ${['one', 'two', 'three', 'four'][i]}`,
  rest: 'brought new starters up to speed faster than ever with short guided learning journeys.',
  label: <LogoPlaceholder className="h-[3rem] w-[3rem] text-[0.6rem]" />,
}))

// `.platform-final-quote`: centred 32px quote + stacked author + demo button, inside the results block.
function FinalQuote() {
  return (
    <div className="flex flex-col items-center gap-[1.5rem] pb-[1rem] pt-[1.5rem]">
      <div className="padding-global w-full max-w-[64rem]">
        <div className="pt-[1rem]">
          <div className="mx-auto flex max-w-[60rem] flex-col items-center gap-[2rem]">
            <p className="mb-[1.25rem] text-center text-[2rem] font-medium leading-[1.2] text-ink tab:text-[1.75rem] mob:text-[1.5rem]">
              “Nothing else we tried comes close. Our people open it every day because it feels like the apps they already love,
              and we can finally show leaders exactly how learning moves the numbers that matter to the business.”
            </p>
            <div className="flex flex-col items-center gap-[0.75rem]">
              <Placeholder tone={3} label="" className="h-[5rem] w-[5rem] rounded-[0.375rem_0] wide:rounded-avatar" />
              <div className="flex flex-col items-center text-center">
                <div className="text-para text-ink xs:text-body-xs">Jordan Ellis</div>
                <div className="text-small text-grey">
                  Director of L&amp;D,{' '}
                  <a href="#" className="inline-link">
                    Northwind
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button variant="primary" to="/lms/demo-platform">
        Get results like these for your team →
      </Button>
    </div>
  )
}

const FAQ = faqItems([
  'What is a learning platform?',
  'How does Nimbus support new starters?',
  'How is Nimbus different from an older learning system, and what does that change mean for the people using it?',
  'Can Nimbus replace the tools our teams use today?',
  'How long does a typical launch take?',
  'Does Nimbus work on mobile?',
  'Is our data kept safe?',
  'Which systems and tools does Nimbus connect with today?',
  'How do we measure the impact of learning?',
  'Can we bring our existing content across?',
  'What support do we get?',
])

export default function Lms() {
  return (
    <>
      <PlatformHero />
      <PlatformIntroHeader />
      <KikiTabs header={null} media="image" tabs={HUB_TABS} className="" tabsClassName="overflow-hidden pb-[3rem] pt-[4rem]" copyMargin="mb-0" />
      <TestimonialQuote variant="platform" />
      <KikiTabs header={NOVA_HEADER} tabs={NOVA_TABS} className="overflow-hidden pt-[3rem]" tabsClassName="" />
      <TestimonialQuote variant="platform-lg" />
      <AutotabsGroup variant="platform" />
      <ProductTabs
        heading="Learning software that supports every stage of the employee journey"
        intro="Guided paths to bring people up to speed, skills tracking to plan what comes next, and clear reports that show leaders the difference learning makes across every team."
        tabs={TABS_A}
        className="pb-[5rem] pt-[2rem]"
        headingClassName=""
        introClassName="mb-0 px-[2rem]"
      />
      <ProductTabs
        heading="Social tools that keep every team talking, sharing and learning from each other"
        intro="Spaces for every team, chat that sits beside learning and small rewards that keep people coming back, so knowledge never gets stuck with just one person."
        tabs={TABS_B}
        className="pb-[5rem] pt-[2rem]"
        headingClassName=""
        introClassName="mb-0 px-[2rem]"
      />
      <TestimonialQuote variant="section" button={{ label: 'Book a demo →', href: '/lms/demo-platform' }} />
      <FeatureBento />
      <div className="padding-global mb-[4rem]">
        <Results
          heading={
            <>
              This is what learning can <em className="italic">really achieve</em>
            </>
          }
          headingClassName="max-w-[42rem]"
          subtitle="Strong results follow when people have a single home to learn, share and grow, and leaders can see it working."
          cards={RESULT_CARDS}
          testimonial={null}
          cta={null}
          className="container-medium"
        />
        <FinalQuote />
      </div>
      <ComparisonTable variant="platform" />
      <Faq heading="Questions about the Nimbus platform" items={FAQ} />
    </>
  )
}
