// /lms/integrations (page-lms-integrations): integrations-header → integration-filter → reviews-slider → faq-legacy (green).
import IntegrationsHeader from '../../components/sections/IntegrationsHeader.jsx'
import IntegrationFilter from '../../components/sections/IntegrationFilter.jsx'
import ReviewsSlider from '../../components/sections/ReviewsSlider.jsx'
import FaqLegacy from '../../components/sections/FaqLegacy.jsx'

const ANSWER =
  'Our team can talk you through the options, from ready-made connections to custom work through our open API, and help you plan a rollout that suits the tools you already use every day.'

// The 4th item is open on load on the original (29 words, 4 lines at 1440).
const API_ANSWER =
  'Yes. Nimbus offers an open API so your developers can connect almost any system, sync users and records automatically and pull learning data into your own reporting tools.'

const FAQ = [
  'What if we need a link to another tool?',
  'Does Nimbus support identity providers and single sign-on?',
  'Which HR systems does Nimbus connect with?',
  'Is there an API?',
  'How can we keep learner records synced across systems?',
  'Who builds new connections?',
  'Can integrations be switched off?',
].map((q, i) => ({ q, a: i === 3 ? API_ANSWER : ANSWER, open: i === 3 }))

export default function Integrations() {
  return (
    <>
      <IntegrationsHeader />
      <IntegrationFilter />
      <ReviewsSlider />
      <FaqLegacy theme="green" title="Integration questions answered" items={FAQ} />
    </>
  )
}
