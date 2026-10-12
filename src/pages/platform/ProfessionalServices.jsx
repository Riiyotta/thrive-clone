// /lms/professional-services (page-lms-professional-services): legacy grid system, green theme.
import HeroCenterLegacy from '../../components/sections/HeroCenterLegacy.jsx'
import Results from '../../components/Results.jsx'
import HeaderImageLegacy from '../../components/sections/HeaderImageLegacy.jsx'
import GridSplitLegacy from '../../components/sections/GridSplitLegacy.jsx'
import TabsHLegacy from '../../components/sections/TabsHLegacy.jsx'
import FeatureTwoColLegacy from '../../components/sections/FeatureTwoColLegacy.jsx'
import GridCardsLegacy from '../../components/sections/GridCardsLegacy.jsx'
import ReviewsSlider from '../../components/sections/ReviewsSlider.jsx'

// `.company-stats-company-page`: three square stat cards (label top-left, number bottom-left). The grid stays
// 3 columns at every width on the original (it overflows and is clipped on phones).
const CARDS = [
  ['Launches: from first call to go-live', '500+'],
  ['Countries supported: help in every time zone', '60+'],
  ['Satisfaction: rated by our customers', '98%'],
].map(([label, stat]) => ({ label, stat }))

export default function ProfessionalServices() {
  return (
    <>
      <HeroCenterLegacy variant="services" theme="green" />
      <Results
        heading="We know this road well"
        headingClassName="!font-sans !text-[1.5rem] !leading-[1.725rem] !font-normal mob:!text-[1.25rem] mob:!leading-[1.4375rem]"
        subtitle={
          <>
            Our expert services team has guided hundreds of firms away from older{' '}
            <a href="#" className="inline-link">
              learning vendors
            </a>{' '}
            and onto a platform their people love, with a clear plan at every step of the way.
          </>
        }
        cards={CARDS}
        gridClassName="grid-cols-3"
        cardClassName="aspect-square !p-[1rem] mob:!gap-[3rem]"
        testimonial={null}
        cta={null}
        className="container-medium overflow-x-clip"
      />
      <HeaderImageLegacy />
      <GridSplitLegacy variant="testimonial" theme="green" />
      <TabsHLegacy />
      <GridSplitLegacy variant="text" theme="green" />
      <FeatureTwoColLegacy variant="services" theme="green" />
      <GridCardsLegacy variant="services-extra" theme="green" />
      <ReviewsSlider />
    </>
  )
}
