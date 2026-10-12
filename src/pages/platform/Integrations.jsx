// /lms/integrations (page-lms-integrations): integrations-header → integration-filter → reviews-slider → faq-legacy (green).
import IntegrationsHeader from '../../components/sections/IntegrationsHeader.jsx'
import IntegrationFilter from '../../components/sections/IntegrationFilter.jsx'
import ReviewsSlider from '../../components/sections/ReviewsSlider.jsx'
import FaqLegacy from '../../components/sections/FaqLegacy.jsx'

const ANSWER =
  'Our team can talk you through the options, from ready-made connections to custom work through our open API, and help you plan a rollout that suits the tools you already use every day.'

// The 4th item is open on load on the original (5 lines at 1440, 10 at 390).
const API_ANSWER =
  'Yes. Nimbus offers an open API so your developers can connect almost any system, sync users and records automatically and pull learning data into your own reporting tools. Clear documentation, a sandbox to test in and a friendly technical team mean your connections are up and running quickly, and stay reliable as your whole business grows.'

const FAQ = [
  'What if we need a link to another tool?',
  'Does Nimbus support all major identity providers and single sign-on?',
  'Which HR systems does Nimbus connect with?',
  'Is there an API?',
  'How can we keep learner records synced across systems?',
  'Who builds new connections?',
  'Can integrations be switched off?',
].map((q, i) => ({ q, a: i === 3 ? API_ANSWER : ANSWER, open: i === 3 }))

export default function Integrations() {
  return (
    <>
      <IntegrationsHeader
        // ≤479 the original marks are 92px wide with their own heights (15 / 25 / 37 / 20 / 19 / 20), which set the stacked rows
        logoClassNames={[
          'xs:w-[6rem] xs:aspect-[92/15]',
          'xs:w-[6rem] xs:aspect-[92/25]',
          'xs:w-[6rem] xs:aspect-[92/37]',
          'xs:w-[6rem] xs:aspect-[92/20]',
          'xs:w-[6rem] xs:aspect-[92/19]',
          'xs:w-[6rem] xs:aspect-[92/20]',
        ]}
      />
      <IntegrationFilter />
      {/* <1440 the original's arrows are inline-blocks on a text line (~6px taller) */}
      <ReviewsSlider navWrapClassName="flex text-body [@media(max-width:1439px)]:block [@media(max-width:1439px)]:[&>button]:inline-block" />
      <FaqLegacy theme="green" xsCompact answerClassName="my-[2.5rem] tab:my-[1.5rem] mob:my-[1.25rem]" title="Integration FAQs" items={FAQ} />
    </>
  )
}
