import WowContentHero from '../../components/sections/WowContentHero.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import Layout03Tabs from '../../components/sections/Layout03Tabs.jsx'
import ReviewsSlider from '../../components/sections/ReviewsSlider.jsx'
import Faq from '../../components/Faq.jsx'
import IncludedTabs from './IncludedTabs.jsx'
import ProofResults from './ProofResults.jsx'
import { faqItems } from './shared.js'

// /whats-included (page-whats-included, fixed 16px root via Layout FIXED_REM_PAGES).
// 768–991 the original wraps 4 + 1 (centred, 3rem / 2rem gaps), rows 37px and 64px tall.
const TAB_ASPECT = ['', '', '', 'tab:aspect-[112/37]', 'tab:aspect-[112/64]']
const LOGOS = TAB_ASPECT.map((t) => ({ text: 'Logo', aspect: `aspect-[112/18] ${t} mob:aspect-[112/43]` }))

const FAQ = [
  ['What makes Nimbus different from a typical LMS?', 39],
  ['Is Nimbus the right fit for the size of my team?', 65],
  ['Can Nimbus connect with the HR, chat and calendar tools we already use?', 40],
  ['How does Nimbus keep our data secure?', 40],
  ['How long does a typical launch take?', 32],
  ['Can every learner use Nimbus easily?', 32],
  ['Which languages does Nimbus offer?', 30],
]

export default function WhatsIncludedPage() {
  return (
    <div>
      <WowContentHero variant="whats-included" />
      <LogoStrip
        heading={null}
        container="small"
        paddingClassName=""
        wrapClassName="min-h-[4rem] w-max max-w-none tab:w-full tab:flex-wrap tab:justify-center tab:gap-x-[3rem] tab:gap-y-[2rem] mob:w-full mob:flex-wrap mob:justify-around mob:gap-[2rem]"
        logoClassName="w-[7rem]"
        logos={LOGOS}
        trailingSpacer={false}
      />
      <IncludedTabs />
      <Layout03Tabs variant="video-compact" />
      <div aria-hidden className="h-[4rem] mob:h-[2rem]" />
      <ProofResults
        wrapGlobal={false}
        innerClassName="pb-[2rem]"
        containerClassName="container-medium mb-[2rem]"
        headingClassName="mb-[1.5rem]"
        leadClassName="mb-[1.25rem]"
        heading={
          <>
            Results, not <em className="italic">slogans</em>
          </>
        }
        lead={
          <>
            Leading teams everywhere already see the difference our <a href="#" className="inline-link">features</a> make every day.
          </>
        }
        cards={[
          { stat: '1.6x', text: <><em className="italic">Quicker onboarding</em> for every single new starter joining the stores across all of their regions</>, logoClass: 'w-[3rem]' },
          { stat: '12%', text: <>Lift in product sales after short <em className="italic">product lessons</em> reached every single store</>, logoClass: 'w-[6.4rem]' },
          { stat: '94%', text: <>Completion on required courses once <em className="italic">smart reminders</em> went live across every site</>, logoClass: 'w-[6.4rem]' },
        ]}
        quote={{
          text: '“What I love most about Nimbus is how naturally people take to it. Our teams log in because they want to, and the support has been brilliant.”',
          name: 'Jordan Ellis',
          role: 'Head of People and Culture, Northwind',
          clientClassName: 'mob:pb-[1rem]',
        }}
        cta={{ kind: 'button', label: 'See Nimbus in action', to: '/lms/demo-platform' }}
      />
      {/* the original's arrows are inline-blocks on a body-text line at every width (strut adds ~6px under them) */}
      <ReviewsSlider title="Trusted by teams like yours" navWrapClassName="block text-body [&>button]:inline-block" />
      <Faq heading="Frequently asked questions" items={faqItems(FAQ)} />
    </div>
  )
}
