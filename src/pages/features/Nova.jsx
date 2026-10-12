// /nova (original /kiki, page-nova). Order per pages-manifest.json: kiki-header → logos →
// kiki-feature-tabs → kiki-feature-tabs (reversed) → [centred demo button] → testimonial-quote → split-tabs.
// The original split-tabs block continues with a raw-HTML vendor table whose truncated markup swallows
// the rest of the page (autotabs, video, FAQ and even the footer end up inside its last cell). Here the
// table is closed normally and those sections follow as ordinary siblings.
import KikiHeader from '../../components/sections/KikiHeader.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import KikiFeatureTabs from '../../components/sections/KikiFeatureTabs.jsx'
import TestimonialQuote from '../../components/sections/TestimonialQuote.jsx'
import SplitTabs from '../../components/sections/SplitTabs.jsx'
import ComparisonTable from '../../components/sections/ComparisonTable.jsx'
import AutotabsGroup from '../../components/sections/AutotabsGroup.jsx'
import VideoSection from '../../components/VideoSection.jsx'
import Faq from '../../components/Faq.jsx'
import Button from '../../components/shared/Button.jsx'

// Neutral logo boxes at the original's image sizes (122 wide ≥768 except a 70px square mark, 86% of the
// 7rem block ≤767, max-h 4rem); the row is centred over the container like the original.
const LOGOS = [
  'aspect-[92/37]',
  'aspect-[92/25]',
  'aspect-[92/37]',
  'aspect-[92/31]',
  'aspect-square max-w-[4rem] mob:max-w-none',
  'aspect-[122/53]',
].map((a) => ({ text: 'Logo', aspect: `${a} !leading-none mob:!w-[86%]` }))

const SECOND_TABS = {
  reversed: true,
  heading: 'Built for every learner on the team',
  intro:
    'Nova answers questions, suggests the next course and helps people practise new skills in the flow of work, every hour of the day.',
  items: [
    { title: 'Answers from your own content', body: 'Ask anything and Nova replies with a clear answer and a link to the course, policy or post it came from, so people can dig deeper.' },
    { title: 'A personal next step for everyone on every team', body: 'Nova suggests the next course, pathway or mentor based on role, goals and what each person has already finished.' },
    { title: 'Practice that builds real confidence', body: 'Role-play tricky conversations and get instant, friendly feedback on what went well and what to try next time.' },
  ],
}

// Vendor table rows (the ComparisonTable 'vendor' defaults) with three evidence cells re-sized to the original's
// line counts: row 1 one line shorter ≤767, rows 3 and 4 one line longer on desktop.
const L = ({ children }) => <a href="#">{children}</a>
const VENDOR_ROWS = [
  ['Security and compliance', 'Which independent certifications do you hold, and can you share proof early in the buying process?', 'Current, independently checked security and quality certifications', <><L>Independent security certifications</L> with a public trust centre for every customer</>],
  ['Global reach', 'Can the platform support our languages, regions, brands and separate business units?', 'Translation, multi-region hosting and separately branded spaces', <><L>40+ languages</L>, regional hosting and <L>multi-brand setup</L> as standard for all</>],
  ['AI capability', 'Does the AI only answer questions, or can it also create, coach and take action?', 'Governed AI that supports learners, authors and admins in context', <><L>Nova</L> supports insight, authoring, coaching, admin and knowledge, with <L>assistant access</L> from the AI tools your teams already use every day</>],
  ['Integrations', 'Which HR, chat and identity systems do you connect with today?', 'Proven integrations with the tools your teams already use daily', <><L>Integrations</L> include HR, chat, CRM, identity and productivity tools, with more added each quarter</>],
  ['Support after launch', 'What support is included once we are live, and how fast do you respond?', 'Clear ongoing support, enablement and a named point of contact', <><L>Round-the-clock support</L>, a named success manager and a <L>help centre</L> with guides</>],
  ['Product momentum', 'How often do you release meaningful new features for customers?', 'A visible and reliable release rhythm', <><L>40 new features shipped</L> across the last two quarters</>],
  ['Migration', 'What happens to our users, content, learning records and integrations when we switch platforms?', 'A documented migration plan with testing and continuity checks', <><L>Guided migration</L> from your current platform, fully tested before launch day</>],
]

const FAQ = [
  'What can Nova do for my team today?',
  'What is the best AI assistant for a learning platform?',
  'Which languages does Nova support?',
  'Can I control which content and data Nova is able to use?',
  'Is Nova a learning assistant or an agent?',
  'What is an MCP server and how does Nova use one?',
].map((q) => ({
  q,
  a: 'Nova works inside your Nimbus platform with the same permissions as each user, so it only ever uses content and data that person is allowed to see.',
}))

export default function Nova() {
  return (
    <>
      <KikiHeader aiTrack />
      <LogoStrip
        heading="Working alongside"
        headingPlacement="inside"
        container="small"
        paddingClassName="py-[5rem] mob:py-[3rem]"
        wrapClassName="ml-[-5.875rem] min-h-[4rem] w-[57rem] max-w-none tab:ml-0 tab:w-full tab:flex-wrap tab:justify-center mob:justify-around"
        logoClassName="w-[7rem]"
        logos={LOGOS}
        trailingSpacer={false}
      />
      {/* .section_kiki-animation: an empty animation stage (0 tall) that still leaves a 3rem gap */}
      <div aria-hidden className="h-[3rem]" />
      <KikiFeatureTabs xsStackFix />
      <KikiFeatureTabs xsStackFix {...SECOND_TABS} />
      {/* centred demo button between the tab sections and the quote */}
      <div className="padding-global mt-[1rem]">
        <div className="container-medium">
          <div className="flex flex-wrap items-center justify-center gap-[1.5rem]">
            <Button variant="primary" to="/lms/demo-platform">
              See Nova in action →
            </Button>
          </div>
        </div>
      </div>
      <TestimonialQuote variant="kiki" />
      {/* The table sits inside the split-tabs section on the original, so there is no bottom padding between them. */}
      <SplitTabs
        variant="base"
        intro="One assistant, solving every team’s challenges."
        sectionClassName="pt-[5rem] xs:pt-[2rem]"
        containerClassName="mb-[6rem] xs:mb-[3.5rem]"
      />
      <ComparisonTable variant="vendor" rows={VENDOR_ROWS} />
      <AutotabsGroup variant="platform" />
      <VideoSection
        heading="See Nova at work"
        body="A two-minute tour of the assistant in action."
        footnote={null}
        blockClassName="py-[7rem] tab:py-[6rem] mob:py-[4rem]"
      />
      <Faq heading="Questions about your new AI learning assistant" items={FAQ} />
    </>
  )
}
