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
      <FeatureTwoColLegacy
        variant="impact"
        theme="pink"
        // the middle row runs one line longer, as on the original (5 lines at 1440, 7 at 390)
        rows={[
          { title: 'Planning and target setting', body: 'We work with you to set clear goals for your programme, agree the measures that matter most, and build a practical plan that links every learning activity to a result your leadership team already cares about and can track over time.' },
          { title: 'Campaigns and creative help', body: 'Our creative team helps you launch with energy, shaping campaigns, visuals and messages that bring learners in, keep them coming back, and make every new programme feel like an event worth joining rather than just another task on the list for the week.' },
          { title: 'Reporting the wins', body: 'When the project wraps up, we pull your data into a clear story of what changed, share it with your leaders, and help you celebrate the wins with your teams so the momentum carries straight into the next programme you run.' },
        ]}
      />
      <GridCardsLegacy variant="people" theme="pink" />
      <CardSliderLegacy variant="journey" theme="pink" />
      <GridCardsLegacy
        variant="stats"
        theme="pink"
        statStack
        header={{ layout: 'left', heading: 'Delivering real business results for each and every customer', maxW: 'max-w-[42rem]' }}
        // copy lengths follow the original's per-card line counts (2/1/2/1 at 1440; tallest card per row 3 lines at 390)
        rows={[
          { cols: 4, kind: 'stat', cards: [
            { title: 'Brand one', stat: '32%', body: 'Rise in sales at stores taking part in it' },
            { title: 'Brand two', stat: '2x', body: 'More managers trained' },
            { title: 'Brand three', stat: '85%', body: 'Of new starters fully onboarded sooner' },
            { title: 'Brand four', stat: '40%', body: 'Fewer support tickets after launch' },
          ] },
        ]}
      />
      {/* ≤479 the original's four badges sit in a 2-column grid with the first and last spanning both columns */}
      <GridCardsLegacy
        variant="awards"
        theme="pink"
        rows={[
          {
            cols: 4,
            kind: 'badge',
            noTop: true,
            className: 'flex justify-center xs:grid xs:grid-cols-2',
            cards: [{ className: 'xs:col-span-2' }, {}, {}, { className: 'xs:col-span-2' }],
          },
        ]}
      />
      <GridSplitLegacy
        variant="image"
        theme="pink"
        body="Well-known retail brand Customer one used Nimbus to link learning to real results, tracking how new skills on the shop floor lifted sales, cut staff turnover and gave every store manager a clear, simple view of progress across the whole team in every single region and store."
      />
      <PricingProLegacy />
    </>
  )
}
