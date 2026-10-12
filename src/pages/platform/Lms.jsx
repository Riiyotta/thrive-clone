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
    'Bring learning, knowledge, chat and team news into one calm home, so people always know where to look and who to ask, admins run everything from one panel and leaders see how skills grow across the business every single day, right away, with no extra fuss.',
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
    'Nova checks in with people on the shop floor after every single session, asks them what landed, and suggests one small next step so new habits keep on building long after the training day is over.',
  mediaLabel: 'Product video 1:1',
}))

const NOVA_HEADER = (
  <div className="padding-global">
    <div className="container-large pt-[1rem]">
      <div className="mx-auto flex max-w-[60rem] flex-col items-center text-center">
        <h2 className="heading-h2 mb-[1rem] mt-[2rem] wide:mb-[calc(1rem+10px)]">One AI agent for every learning task</h2>
        <p className="mx-[5rem] mb-[20px] max-w-[50rem] text-body text-grey mob:mx-0 mob:text-[1.1rem] mob:leading-[1.4]">
          Nova spots gaps in compliance, drafts new courses in minutes, answers questions and coaches people step by step through the whole working day, on every shift.{' '}
          <em className="font-bold italic">All from a single prompt.</em>
        </p>
        <div className="mb-[15px] flex w-full justify-center wide:mb-[30px]">
          <Button variant="primary" to="/nova">
            Meet Nova, your agent →
          </Button>
        </div>
      </div>
    </div>
  </div>
)

// AutotabsGroup platform tabs: copy sized so the tallest slide header wraps to 7 lines at 390 (original 172px).
const SEARCH_TABS = [
  { tab: 'Connected search', title: 'One search for every answer.', text: 'Whether it lives in your documents, chat tools, intranet or course library, Nimbus finds the right answer for each person and shows them exactly where it came from, in just a few seconds, every single time.' },
  { tab: 'Course search', title: 'Search inside every course you own.', text: 'Nimbus reads the content inside uploaded course packages, so learners can jump straight to the exact lesson, slide or video moment that answers their question, right when they need it most.' },
  { tab: 'Assistant', title: 'Run Nimbus from the AI tools you already use every day.', text: 'Create spaces, assign courses and pull reports from your favourite AI assistant, with the very same permissions, safeguards and full audit trail as the platform itself, every time.' },
  { tab: 'Build your own', title: 'Build the learning tools you imagine.', text: 'Describe a quiz, a checklist or a mini app in plain words and Nimbus builds it for you in moments, ready to share with any team, site or region you choose in a single click, with no code needed.' },
]

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
  [['Pathways', 'Pathways'], ['Skills', 'Skills'], ['Assessments', 'Assessments'], ['Analytics', 'Analytics']],
  'Help new starters get up to speed faster, grow the skills that matter and keep every single team learning, with guided paths built around their real day-to-day roles.',
)
const TABS_B = productTabs(
  [['Spaces', 'Spaces'], ['Recognition', 'Recognition'], ['Team chat', 'Team chat'], ['Mobile app', 'Mobile app']],
  'Give every team a lively place to share news, swap tips and celebrate wins, so knowledge flows freely between sites and shifts every day.',
)

// Card copy lengths mirror the original's line counts (6 lines at 1440; 4/4/3/4 at 390).
const RESULT_REST = [
  'brought new starters up to speed faster than ever with short guided learning journeys built for every shift.',
  'brought thousands of new starters up to speed faster than ever with short, friendly guided learning journeys.',
  'lifted platform adoption dramatically by encouraging employee-generated knowledge sharing.',
  'brought new starters up to speed faster than ever with short guided learning journeys built for every shift.',
]
const RESULT_CARDS = ['1.5x', '40%', '3x', '92%'].map((stat, i) => ({
  stat,
  brand: `Customer ${['one', 'two', 'three', 'four'][i]}`,
  rest: RESULT_REST[i],
  label: <LogoPlaceholder className="h-[3rem] w-[3rem] text-[0.6rem] mob:h-[2rem] mob:w-[2rem]" />,
}))

// `.platform-final-quote`: centred 32px quote + stacked author + demo button, inside the results block.
function FinalQuote() {
  return (
    <div className="flex flex-col items-center gap-[1.5rem] pb-[1rem] pt-[1.5rem] mob:gap-[2rem]">
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
                <div className="text-para leading-[1.5] text-ink xs:text-body-xs">Jordan Ellis</div>
                <div className="text-[16px] leading-[24px] text-grey mob:text-[0.875rem] mob:leading-[1.5]">
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

// ComparisonTable rows: copy lengths match the original's per-row line counts (3 lines each at 1440 except the last; 3/4/3/4/3/3/3/3/3/3/4 at 1280; 3/3/2/3/3/2/2/2/3/3/4 at 390).
const TL = ({ children }) => <a href="#">{children}</a>
const TABLE_ROWS = [
  ['Learning management', <>Create <TL>pathways</TL>, quizzes, live events and compliance courses with full support for course packages</>],
  ['AI assistant', <>Use <TL>Nova, the built-in AI assistant</TL>, for coaching, authoring, insight, admin, everyday questions and knowledge</>],
  ['Course creation', <>Build courses, videos, quizzes and microlearning in minutes with <TL>AI</TL></>],
  ['Home feed', <>Bring courses, news and conversations together in <TL>one personal home feed</TL> for everyone in the whole business</>],
  ['Search and knowledge', <>Find learning, documents and answers from all your connected tools in one place with <TL>Connected search</TL></>],
  ['Skills and growth', <>Set goals, <TL>grow skills</TL>, run reviews and plan careers in one connected place</>],
  ['Mentoring', <><TL>Pair mentors with mentees</TL> and run programmes that scale</>],
  ['Spaces and social learning', <>Bring teams together, share know-how and celebrate wins in <TL>Spaces</TL></>],
  ['Insight and reporting', <>Follow compliance, engagement, skills and impact with <TL>live dashboards</TL> anyone in the business can read</>],
  ['Integrations', <>Connect Nimbus with your HR, chat, calendar, content and identity tools across <TL>60+ systems</TL> in minutes</>],
  ['Mobile and global teams', <>Give people learning wherever they are through a <TL>branded mobile app</TL>, offline access, automatic translation and support for more than forty languages worldwide</>],
]

const FAQ = faqItems([
  'What is a learning platform?',
  'How does Nimbus support new starters?',
  'How is Nimbus different from an older learning system, and what does that change mean for the people using it?',
  'Can Nimbus replace the tools our teams use today?',
  'How long does a typical launch take?',
  'Does it work on mobile too?',
  'Is our data kept safe?',
  'Which tools does Nimbus connect with today?',
  'How do we measure the impact of learning?',
  'Can we bring our existing content across?',
  'What support do we get?',
])

export default function Lms() {
  return (
    <>
      <PlatformHero />
      <PlatformIntroHeader />
      <KikiTabs header={null} media="image" tabs={HUB_TABS} className="" tabsClassName="overflow-hidden py-[3rem]" copyMargin="mb-0" />
      <TestimonialQuote
        variant="platform"
        quote={`"We needed a platform that feels engaging, looks great and matches how all our people behave in their lives outside work — that real sense of streaming, user-made and AI-made content."`}
      />
      <KikiTabs header={NOVA_HEADER} tabs={NOVA_TABS} className="overflow-hidden pt-[3rem]" tabsClassName="" inlineCopy videoXsClassName="xs:aspect-square" />
      <TestimonialQuote
        variant="platform-lg"
        quote={`"We treat Nova like another member of the team, helping our people find answers faster, summarise, translate, and solve admin queries, freeing our team to focus on the business. This is truly the future of digital learning."`}
      />
      <AutotabsGroup variant="platform" headingClassName="!mt-0 wide:!mt-[2rem]" mediaClassName="xs:aspect-[306/197]" tabs={SEARCH_TABS} />
      <ProductTabs
        heading="Learning software that supports every stage of the employee journey"
        intro="Guided paths to bring people up to speed, skills tracking to plan what comes next, and clear reports that show leaders the real difference learning makes across every single team, every month."
        tabs={TABS_A}
        className="overflow-x-clip pb-[5rem] pt-[2rem] mob:pb-0"
        headingClassName=""
        introClassName="mb-0 px-[2rem] tab:mb-[1.5rem] mob:px-[1.25rem]"
      />
      <ProductTabs
        heading="Social tools that keep every team talking, sharing and learning from each other"
        intro="Spaces for every team, chat that sits right beside learning, and small rewards and badges that keep people coming back for more each week, so useful knowledge never gets stuck with just one person, one site or one shift."
        tabs={TABS_B}
        className="overflow-x-clip pb-[5rem] pt-[2rem] mob:pb-0"
        headingClassName=""
        introClassName="mb-0"
      />
      <TestimonialQuote
        variant="section"
        quote={`"I have lots of experience working with different learning experience platforms and learning management systems, and they've always been clunky and complicated. Nimbus simply removes every one of those problems."`}
        buttonClassName="mt-[1.75rem]" button={{ label: 'Book a demo →', href: '/lms/demo-platform' }} />
      <FeatureBento
        intro="Nimbus helps fast-moving teams get far more from learning than most"
        introRest="ever could, with room to grow as your people and your goals change over time."
      />
      <div className="padding-global mb-[4rem]">
        <Results
          heading={
            <>
              This is what learning can <em className="italic">really achieve</em>
            </>
          }
          headingClassName="max-w-[42rem]"
          subtitle="Strong results follow when people have one single home to learn, share and grow every day, and leaders can see it working across the business."
          cards={RESULT_CARDS}
          testimonial={null}
          cta={null}
          headerClassName="pb-[1rem] pt-[2.5rem]"
          className="container-medium"
        />
        <FinalQuote />
      </div>
      <ComparisonTable variant="platform" rows={TABLE_ROWS} />
      <Faq heading="Questions about the Nimbus platform" items={FAQ} />
    </>
  )
}
