import Sec from './Sec.jsx'
import WowContentHero from '../../components/sections/WowContentHero.jsx'
import CsFilterGrid from '../../components/sections/CsFilterGrid.jsx'
import Button from '../../components/shared/Button.jsx'
import Faq from '../../components/Faq.jsx'
import { LogoPlaceholder } from '../../components/shared/Placeholder.jsx'
import { CASE_STUDIES_FAQ, CASE_STUDIES_FAQ_HEADING } from './faqData.js'

// Results on /case-studies/lms (.container-medium > .wowresults_card-grid.case-studies), page-local because the
// live block differs from the shared Results: header (pt 2rem, H2 mt .25rem / mb 1rem, grey para max 46rem mb 2rem
// left-aligned in a 50rem centred column), a 6-track grid `repeat(5, min-content) 1fr` (each card as wide as
// its stat, gap 1rem, pb 3rem) whose overflow is clipped on mobile, cards (bg #0b0b0b, radius .75rem,
// p 1rem 2rem 2rem / 1.5rem ≤767, column gap 1rem): brand-colour challenge label, customer logo (3rem / 2rem
// tall), stat 4rem, grey result ending in the customer link; then the centred button (pt 1rem).
// The live stat uses the narrower "Inter 24 Pt" cut; -0.016em tracking brings the static Inter
// stat to the same width. Stat strings and copy are sized so the five columns and line counts match the live cards at 1440 and 390.
const CARDS = [
  ['Slow onboarding', '50%', 'shorter time to full productivity for new starters at', 'Customer one'],
  ['Low engagement', '100%', 'completion on required compliance training across every site at', 'Customer two'],
  ['Admin load', '980', 'hours saved each year on manual admin at', 'Customer three'],
  ['Weak culture', '96%', 'of colleagues now learn and share every week at', 'Customer four'],
  ['Lagging sales', '18%', 'lift in weekly sales after store training at', 'Customer five'],
]

function CaseStudyResults() {
  return (
    <div data-section="results" className="container-medium">
      <div className="flex justify-center">
        <div className="w-full max-w-[50rem] pt-[2rem] text-center">
          <h2 className="heading-h2 mb-[1rem] mt-[0.25rem]">Learning results our customers love</h2>
          <p className="mb-[2rem] max-w-[46rem] text-body text-grey xs:text-body-xs">
            From faster onboarding to stronger culture, these teams turned everyday learning into results their leaders could see, measure and share across the business.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(5,min-content)_1fr] gap-[1rem] pb-[3rem]">
        {CARDS.map(([label, stat, rest, brand]) => (
          <div key={brand} className="flex flex-col items-start justify-between gap-[1rem] rounded-card bg-surface-1 px-[2rem] pb-[2rem] pt-[1rem] mob:p-[1.5rem]">
            <p className="text-body text-[#1ee9b6] xs:text-body-xs">{label}</p>
            <LogoPlaceholder text={brand} className="h-[3rem] w-[4.3rem] text-[0.75rem] mob:h-[2rem] mob:w-[3.2rem]" />
            <div className="flex flex-1 flex-col justify-between gap-[1rem]">
              <div className="text-stat font-semibold tracking-[-0.016em] text-ink tab:text-stat-48 mob:text-stat-40 xs:text-stat-48">{stat}</div>
              <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">
                {rest}{' '}
                <a href="#" className="inline-link">{brand}.</a>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-[1rem]">
        <Button to="/lms/demo-platform">See Nimbus at work →</Button>
      </div>
    </div>
  )
}

export default function CaseStudiesLms() {
  return (
    <>
      <Sec id="wowcontent-hero"><WowContentHero variant="case-studies" /></Sec>
      <Sec id="cs-filter-grid"><CsFilterGrid stickyBar={false} allClassName="mb-[5px]" heading="Learning stories from onboarding, compliance and performance teams in every sector" /></Sec>
      <Sec id="results" className="mb-[1.5rem] overflow-hidden"><CaseStudyResults /></Sec>
      <Sec id="faq"><Faq heading={CASE_STUDIES_FAQ_HEADING} items={CASE_STUDIES_FAQ} /></Sec>
    </>
  )
}
