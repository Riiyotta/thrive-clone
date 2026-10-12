import CompanyHeader from '../../components/sections/CompanyHeader.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import TwoColFeatures from '../../components/sections/TwoColFeatures.jsx'
import CompanyNews from '../../components/sections/CompanyNews.jsx'
import CaseStudyCarousel from '../../components/CaseStudyCarousel.jsx'
import Layout2Hero from '../../components/sections/Layout2Hero.jsx'
import Faq from '../../components/Faq.jsx'
import StatsResults from './StatsResults.jsx'
import ProofResults from './ProofResults.jsx'
import { COMPANY_LOGOS, faqItems, HIGHLIGHT_SLIDES } from './shared.js'

// /company (page-company, fluid root; footer keeps the homepage form block via Layout).
export default function CompanyPage() {
  return (
    <div>
      <CompanyHeader />
      <LogoStrip
        heading="You will be in great company"
        headingPlacement="inside"
        container="small"
        paddingClassName="pt-[1rem] mb-[2rem]"
        wrapClassName="w-max max-w-none tab:w-full tab:flex-wrap tab:justify-center tab:gap-[3rem] mob:flex-wrap mob:justify-around"
        logoClassName="w-[7rem]"
        logos={COMPANY_LOGOS}
        trailingSpacer={false}
      />
      <StatsResults />
      <TwoColFeatures
        rows={TWO_COL_ROWS}
        imageClassNames={['aspect-square w-full mob:aspect-[352/233]', 'aspect-square w-full mob:aspect-[352/196]']}
      />
      <ProofResults
        heading={
          <>
            Results, not <em className="italic">slogans</em>
          </>
        }
        lead="Measured results from teams who really put learning first."
        cards={[
          { stat: '1.6x', text: <><em className="italic">Quicker onboarding</em> for every new starter joining stores across all of the regions</>, logoClass: 'w-[3rem]' },
          { stat: '12%', text: <><em className="italic">Sales uplift</em> once short product lessons reached every frontline team member in each store</>, logoClass: 'w-[6.4rem]' },
          { stat: '94%', text: <><em className="italic">Completion rate</em> on required courses across every single site and region in the group</>, logoClass: 'w-[6.4rem]' },
        ]}
        quote={{
          text: '“We can finally see how learning moves the needle, and our people enjoy coming back to it every week.”',
          name: 'Jordan Ellis',
          role: 'Head of People and Culture, Northwind',
          clientClassName: 'mob:pb-[1rem]',
        }}
        containerClassName="container-medium mb-[2rem]"
        cta={{ kind: 'card', text: 'Find out what your team could achieve.', label: 'See Nimbus in action', to: '/lms/demo-platform' }}
      />
      <CompanyNews />
      <CaseStudyCarousel
        eyebrow="Results"
        heading="Learning that leaves a lasting mark on teams"
        cta={null}
        intro="More than five hundred growing organisations use Nimbus to help their people learn and do more."
        slides={HIGHLIGHT_SLIDES}
      />
      <Layout2Hero variant="company" />
      <Faq heading="Frequently asked questions" items={faqItems(COMPANY_FAQ)} />
    </div>
  )
}

// Copy sized to the original's line counts (1440 / 1280 / 390): paragraph 1 9L / 9L / 12L, quote 1 4L / 4L / 6L,
// row-2 heading 1L, paragraph 2 4L / 4L / 7L, quote 2 4L / 4L / 5L.
const BR2 = (
  <>
    <br />
    <br />
  </>
)
const TWO_COL_ROWS = [
  {
    title: 'Why teams pick Nimbus',
    text: (
      <>
        Most learning platforms track completions. Nimbus goes further. Learning, skills and knowledge live in one AI-powered place
        that people genuinely want to use. {BR2}That's why over 400 organisations across 50 countries trust it to drive performance
        that actually shows up in their business results. {BR2}There’s never been a learning platform quite like it.
      </>
    ),
    quote: '“Nimbus has completely changed the way we run learning and development here. It’s made everything so much more engaging, far more accessible, and so much more effective with everything we roll out.”',
    name: 'Jordan Ellis',
    role: 'L&D Manager, Northwind Brewery',
    blocks: ['title', 'text', 'quote'],
  },
  {
    title: 'Customers first. Every day.',
    text: (
      <>
        We don't vanish after go-live. Every Nimbus customer gets a dedicated team from day one, with{' '}
        <a href="#" className="inline-link">
          launch support
        </a>
        , strategy, training and help built around your goals, not ours. It's why our customers stay, and why they keep winning awards with us.
      </>
    ),
    quote: '"Would I recommend Nimbus to other organisations? A resounding yes. The partnership your organisation will build with the Nimbus team is like no other, and I truly, truly endorse it."',
    name: 'Sam Rivera',
    role: 'Global Head of Learning & Development, Kite',
    blocks: ['title', 'text', 'quote'],
  },
]

const COMPANY_FAQ = [
  ['How safe is Nimbus?', 54],
  ['Is Nimbus a good fit for the size of my team?', 63],
  ['Can every learner use Nimbus easily?', 32],
  ['Which languages does Nimbus offer?', 60],
  ['Do you support single sign on for staff?', 36],
  ['How do we get all of our people started?', 36],
]
