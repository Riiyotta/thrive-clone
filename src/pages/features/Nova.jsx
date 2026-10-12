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

const SECOND_TABS = {
  reversed: true,
  heading: 'Built for every learner on the team',
  intro:
    'Nova answers questions, recommends the next course and helps people practise new skills in the flow of work, so every learner gets a patient coach that knows your content inside out and is ready at any hour.',
  items: [
    { title: 'Answers drawn from your own content', body: 'Ask anything and Nova replies with a clear answer and a link to the course, policy or post it came from.' },
    { title: 'A personal next step for everyone', body: 'Nova suggests the next course, pathway or mentor based on role, goals and what each person has already finished.' },
    { title: 'Practice that builds real confidence', body: 'Role-play tricky conversations and get instant, friendly feedback on what went well and what to try next time.' },
  ],
}

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
      <KikiHeader />
      <LogoStrip
        heading="Working alongside"
        headingPlacement="inside"
        container="small"
        paddingClassName="py-[5rem] mob:py-[3rem]"
        wrapClassName="min-h-[4rem] w-[57rem] max-w-none mob:w-full mob:flex-wrap mob:justify-around"
        logoClassName="w-[7rem]"
        trailingSpacer={false}
      />
      {/* .section_kiki-animation: an empty animation stage (0 tall) that still leaves a 3rem gap */}
      <div aria-hidden className="h-[3rem]" />
      <KikiFeatureTabs />
      <KikiFeatureTabs {...SECOND_TABS} />
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
      <SplitTabs variant="base" />
      <ComparisonTable variant="vendor" />
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
