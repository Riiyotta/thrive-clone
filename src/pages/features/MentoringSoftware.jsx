// /lms/mentoring-software (page-lms-mentoring-software). Order per pages-manifest.json:
// mentoring-header → autotabs-group → split-tabs (reversed) → case-study-video → video → cta-strip (spacer) → faq.
import MentoringHeader from '../../components/sections/MentoringHeader.jsx'
import AutotabsGroup from '../../components/sections/AutotabsGroup.jsx'
import SplitTabs from '../../components/sections/SplitTabs.jsx'
import CaseStudyVideo from '../../components/sections/CaseStudyVideo.jsx'
import VideoSection from '../../components/VideoSection.jsx'
import CtaStrip from '../../components/sections/CtaStrip.jsx'
import Faq from '../../components/Faq.jsx'

// Header logo boxes at the original's image sizes: 92 wide in the 7rem block ≤767 (86%), full width above;
// the last mark is shorter (92×31).
const HEADER_LOGOS = [...Array(5).fill('aspect-[92/37]'), 'aspect-[92/31]'].map((a) => `${a} mob:!w-[86%]`)

// AutotabsGroup 'mentoring' tabs; slide 1's copy runs to 6 lines at 390 like the original (same lines ≥768),
// which also sets the slider height (its screenshot box fills the rest of the 24rem slide).
const MENTOR_TABS = [
  { tab: 'Smart mentor matching', title: 'Pair the right mentors with the right people.', text: 'Nimbus looks at skills, goals and interests to suggest strong matches, so every pairing starts with real common ground. It takes seconds to set up for you.' },
  { tab: 'Guided programmes', title: 'Give every pairing a clear path.', text: 'Ready-made programmes, prompts and check-ins keep mentors and mentees moving forward, week after week.' },
  { tab: 'Reporting', title: 'See the impact of mentoring.', text: 'Track sessions, goals and feedback in one place and show leaders how mentoring lifts skills and retention.' },
]

// Case-study stat cards sized to the original's lines: card 1 copy 2 lines ≥768 / 4 at 390; card 2 heading
// 1 line ≥768 / 3 at 390 and copy 3 / 4.
const CASE_STATS = [
  { heading: 'Why the right match matters most', body: 'Nimbus pairs mentors and mentees on goals, skills and availability, so each pairing starts on the right foot straightaway.' },
  { heading: 'Jordan Ellis, Mentoring Programme Lead', body: '“Matching is the most important part of any mentoring scheme. Get it right from the start and people stay engaged, trust builds and results follow.”' },
]

const FAQ = [
  'Is mentoring an add-on, or is it included in every plan?',
  'How does mentoring work in Nimbus?',
  'Can I buy mentoring as a standalone tool?',
  'How do you choose the right mentoring platform?',
  'What is mentoring software?',
  'What is peer-to-peer learning and why does it work?',
  'What is the best sales coaching platform?',
  'What is the best mentoring software for teams?',
  'How do you mentor employees?',
].map((q) => ({
  q,
  a: 'Mentoring is part of every Nimbus plan. Admins set up programmes, matching rules and check-ins, and mentors and mentees manage everything from one simple space.',
}))

export default function MentoringSoftware() {
  return (
    <>
      <MentoringHeader
        intro="Nimbus mentoring software pairs mentors and mentees, tracks their progress and turns peer learning into results the business can see. Use it on its own or as part of your platform."
        logoClassNames={HEADER_LOGOS}
        // ≤767 the original's logo line sits 1.25rem under the buttons (outside the 2rem-gap component).
        logosLeadClassName="mt-[0.5rem] mob:-mt-[0.75rem]"
      />
      <AutotabsGroup variant="mentoring" tabs={MENTOR_TABS} />
      <SplitTabs variant="reversed" buttonVariant="brand" containerClassName="mb-[6rem] xs:mb-[3.5rem]" />
      <CaseStudyVideo stats={CASE_STATS} />
      <VideoSection
        heading={
          <>
            Nothing beats a warm
            <br />
            <em className="italic">hello</em>
          </>
        }
        body="See how mentoring relationships grow inside Nimbus, one chat at a time."
        footnote={null}
        // 1rem under the H2; the video's .margin-large is 3rem (2.5rem tab, 1.5rem mob, where it collapses
        // with the paragraph margins).
        headingClassName="mb-[1rem]"
        blockClassName="py-[5rem] mob:py-[3rem]"
        videoClassName="mx-auto mt-[3rem] max-w-[45.25rem] tab:mt-[2.5rem] mob:mt-[1.5rem]"
      />
      <CtaStrip variant="spacer" />
      <Faq heading="Frequently asked mentoring questions" items={FAQ} />
    </>
  )
}
