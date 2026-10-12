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
        wrapClassName="w-max max-w-none mob:w-full mob:flex-wrap mob:justify-around"
        logoClassName="w-[7rem]"
        logos={COMPANY_LOGOS}
        trailingSpacer={false}
      />
      <StatsResults />
      <TwoColFeatures preset="company" />
      <ProofResults
        heading={
          <>
            Results, not <em className="italic">slogans</em>
          </>
        }
        lead="Measured results from organisations that truly put learning first."
        cards={[
          { stat: '1.6x', text: <><em className="italic">Quicker onboarding</em> for every new starter joining stores across all of the regions</>, logoClass: 'w-[3rem]' },
          { stat: '12%', text: <><em className="italic">Sales uplift</em> once short product lessons reached every frontline team member</>, logoClass: 'w-[6.4rem]' },
          { stat: '94%', text: <><em className="italic">Completion rate</em> on required courses across every single site and region in the group</>, logoClass: 'w-[6.4rem]' },
        ]}
        quote={{
          text: '“We can finally see how learning moves the needle, and our people actually enjoy coming back to it every week.”',
          name: 'Jordan Ellis',
          role: 'Head of People and Culture, Northwind',
          clientClassName: 'mob:mt-[1rem]',
        }}
        cta={{ kind: 'card', text: 'Find out what your learning programme could achieve.', label: 'See Nimbus in action', to: '/lms/demo-platform' }}
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

const COMPANY_FAQ = [
  ['How safe is Nimbus?', 54],
  ['Is Nimbus a good fit for the size of my team?', 63],
  ['Can every learner use Nimbus easily?', 32],
  ['Which languages does Nimbus offer?', 60],
  ['Do you support single sign on for staff?', 36],
  ['How do we get all of our people started?', 36],
]
