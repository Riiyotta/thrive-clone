import { useLocation } from 'react-router-dom'
import Sec from './Sec.jsx'
import HeaderGridCard from '../../components/sections/HeaderGridCard.jsx'
import FlipLogos from '../../components/sections/FlipLogos.jsx'
import TopicsGrid from '../../components/sections/TopicsGrid.jsx'
import GridSplitLegacy from '../../components/sections/GridSplitLegacy.jsx'
import ReviewsSlider from '../../components/sections/ReviewsSlider.jsx'
import FaqLegacy from '../../components/sections/FaqLegacy.jsx'
import { prose } from './filler.js'
import { TOPICS_FAQ, SUITES_FAQ, LEGACY_FAQ_TITLE, LEGACY_FAQ_EYEBROW } from './faqData.js'

// content-catalogue (/content/topics, /content/sector-suites): hero card, flip logos, a middle block that
// differs per route (topic cards | sector split list), reviews and the olive legacy FAQ.
// Topic cards: 13 items as on the live CMS list; description lengths (characters) follow each live card.
const TOPICS = [
  ['The working world', 244], ['Employee experience', 313], ['Leading and managing people', 211], ['Belonging', 271], ['Customer care', 220],
  ['Communication and influence', 164], ['Mental health and wellbeing', 267], ['Safety at work', 331], ['Cyber and information security', 269],
  ['Compliance', 199], ['Digital skills', 242], ['Workplace skills', 235], ['Business skills', 252],
].map(([title, n], i) => ({ title, text: prose(n, i * 31), href: '#' }))

// Sector split list (/content/sector-suites): header paragraph and six cards sized to the live route.
const SUITES = {
  body: prose(210, 7),
  cards: [['Public Sector', 180], ['Professional Services', 132], ['Retail', 174], ['Food and Drink Production', 127], ['Financial Services', 155], ['Hospitality', 140]]
    .map(([title, n], i) => ({ title, body: prose(n, 40 + i * 27) })),
}

export default function ContentCatalogue() {
  const suites = useLocation().pathname === '/content/sector-suites'
  return (
    <>
      <Sec id="header-grid-card"><HeaderGridCard variant={suites ? 'suites' : 'topics'} /></Sec>
      <Sec id="flip-logos"><FlipLogos theme="yellow" /></Sec>
      {suites ? (
        <Sec id="grid-split-legacy"><GridSplitLegacy variant="suites" {...SUITES} /></Sec>
      ) : (
        <Sec id="topics-grid"><TopicsGrid variant="topics" items={TOPICS} /></Sec>
      )}
      <Sec id="reviews-slider"><ReviewsSlider /></Sec>
      <Sec id="faq-legacy"><FaqLegacy theme="olive" xsCompact title={LEGACY_FAQ_TITLE} eyebrow={LEGACY_FAQ_EYEBROW} items={suites ? SUITES_FAQ : TOPICS_FAQ} /></Sec>
    </>
  )
}
