import Sec from './Sec.jsx'
import WowContentHero from '../../components/sections/WowContentHero.jsx'
import CsFilterGrid from '../../components/sections/CsFilterGrid.jsx'
import Results from '../../components/Results.jsx'
import Faq from '../../components/Faq.jsx'
import { LogoPlaceholder } from '../../components/shared/Placeholder.jsx'
import { CASE_STUDIES_FAQ, CASE_STUDIES_FAQ_HEADING } from './faqData.js'

// Results on /case-studies/lms (.wowresults_card-grid.case-studies): five cards in one row, each with a
// brand-colour challenge label above the customer logo, stat and a 1-sentence result ending in the customer
// link. The row stays 5-up on mobile (scrolls sideways inside its own box instead of overflowing the page).
const CARDS = [
  ['Slow onboarding', '50%', 'shorter time to full productivity for every new starter at', 'Customer one'],
  ['Low engagement', '2.5x', 'more weekly active learners within six months of launch at', 'Customer two'],
  ['Skills gaps', '70%', 'of frontline roles now have a mapped skills pathway at', 'Customer three'],
  ['Weak culture', '90%', 'of colleagues say they feel more connected to peers at', 'Customer four'],
  ['Compliance', '98%', 'completion on required training across every site at', 'Customer five'],
].map(([label, stat, rest, brand]) => ({
  stat,
  label: (
    <span className="flex flex-col items-start gap-[1rem]">
      <span className="text-[#1ee9b6]">{label}</span>
      <LogoPlaceholder text={brand} className="h-[3rem] w-[4.3rem] text-[0.75rem] mob:h-[2rem] mob:w-[3.2rem]" />
    </span>
  ),
  rest: (
    <>
      {rest}{' '}
      <a href="#" className="inline-link">{brand}.</a>
    </>
  ),
}))

export default function CaseStudiesLms() {
  return (
    <>
      <Sec id="wowcontent-hero"><WowContentHero variant="case-studies" /></Sec>
      <Sec id="cs-filter-grid"><CsFilterGrid /></Sec>
      <Sec id="results" className="overflow-x-auto overflow-y-hidden">
        <Results
          heading="Learning results that speak for themselves"
          headingClassName="max-w-[60rem]"
          subtitle={'From faster onboarding to stronger culture, these teams turned everyday learning into results their leaders could see, measure and share across the business.'}
          cards={CARDS}
          gridClassName="grid-cols-[repeat(5,minmax(0,1fr))] xs:grid-cols-[repeat(5,9.5rem)]"
          cardClassName="!gap-[1rem] xs:!gap-[1rem]"
          testimonial={null}
          cta={{ label: 'See Nimbus at work →', to: '/lms/demo-platform' }}
          className="container-medium -mt-[0.25rem] -mb-[4rem] xs:-mb-[5.6rem]"
        />
      </Sec>
      <Sec id="faq"><Faq heading={CASE_STUDIES_FAQ_HEADING} items={CASE_STUDIES_FAQ} /></Sec>
    </>
  )
}
