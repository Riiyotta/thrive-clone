// /lms/mentoring-software (page-lms-mentoring-software). Order per pages-manifest.json:
// mentoring-header → autotabs-group → split-tabs (reversed) → case-study-video → video → cta-strip (spacer) → faq.
import MentoringHeader from '../../components/sections/MentoringHeader.jsx'
import AutotabsGroup from '../../components/sections/AutotabsGroup.jsx'
import SplitTabs from '../../components/sections/SplitTabs.jsx'
import CaseStudyVideo from '../../components/sections/CaseStudyVideo.jsx'
import VideoSection from '../../components/VideoSection.jsx'
import CtaStrip from '../../components/sections/CtaStrip.jsx'
import Faq from '../../components/Faq.jsx'

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
      <MentoringHeader />
      <AutotabsGroup variant="mentoring" />
      <SplitTabs variant="reversed" buttonVariant="brand" />
      <CaseStudyVideo />
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
        blockClassName="py-[5rem] mob:py-[3rem]"
        videoClassName="mx-auto mt-[2rem] max-w-[45.25rem]"
      />
      <CtaStrip variant="spacer" />
      <Faq heading="Frequently asked mentoring questions" items={FAQ} />
    </>
  )
}
