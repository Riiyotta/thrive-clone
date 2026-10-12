// /lms/impact (page-lms-impact, original /lms/thrive-impact): legacy layout-2 page, pink theme.
import Layout2Hero from '../../components/sections/Layout2Hero.jsx'
import FlipLogos from '../../components/sections/FlipLogos.jsx'
import FeatureTwoColLegacy from '../../components/sections/FeatureTwoColLegacy.jsx'
import GridCardsLegacy from '../../components/sections/GridCardsLegacy.jsx'
import CardSliderLegacy from '../../components/sections/CardSliderLegacy.jsx'
import GridSplitLegacy from '../../components/sections/GridSplitLegacy.jsx'
import PricingProLegacy from '../../components/sections/PricingProLegacy.jsx'

export default function Impact() {
  return (
    <>
      <Layout2Hero variant="impact" theme="pink" />
      <FlipLogos theme="pink" />
      <FeatureTwoColLegacy variant="impact" theme="pink" />
      <GridCardsLegacy variant="people" theme="pink" />
      <CardSliderLegacy variant="journey" theme="pink" />
      <GridCardsLegacy variant="stats" theme="pink" />
      <GridCardsLegacy variant="awards" theme="pink" />
      <GridSplitLegacy variant="image" theme="pink" />
      <PricingProLegacy />
    </>
  )
}
