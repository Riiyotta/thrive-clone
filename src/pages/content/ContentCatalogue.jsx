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
// Topic cards: 13 items as on the live CMS list; description lengths (characters) tuned so each card wraps to the
// live card's line count at 1440, 1280 and 390 (an optional third entry overrides the corpus seed).
const TOPICS = [
  ['The working world', 242], ['Employee experience', 324], ['Leading and managing people', 224], ['Belonging', 260, 98], ['Customer care', 222],
  ['Communication and influence', 163], ['Mental health and wellbeing', 261], ['Safety at work', 331], ['Cyber and information security', 278],
  ['Compliance', 199], ['Digital skills', 242], ['Workplace skills', 235], ['Business skills', 252],
].map(([title, n, seed], i) => ({ title, text: prose(n, seed ?? i * 31), href: '#' }))

// Sector split list (/content/sector-suites): header paragraph and six cards sized to the live route.
const SUITES = {
  body: prose(210, 7),
  cards: [['Public Sector', 182], ['Professional Services', 132], ['Retail', 174], ['Food and Drink Production', 127], ['Financial Services', 155], ['Hospitality', 140]]
    .map(([title, n], i) => ({ title, body: prose(n, 40 + i * 27) })),
}

// Hero eyebrow + button labels sized to the live pill widths (Inter 500).
const HEADER_TOPICS = { eyebrow: 'Core lessons', button: { label: "See what's on", href: '#' } }
const HEADER_SUITES = { eyebrow: 'Sector packs', button: { label: 'Take the content tour', href: '#' } }

export default function ContentCatalogue() {
  const suites = useLocation().pathname === '/content/sector-suites'
  return (
    <>
      <Sec id="header-grid-card"><HeaderGridCard variant={suites ? 'suites' : 'topics'} {...(suites ? HEADER_SUITES : HEADER_TOPICS)} /></Sec>
      <Sec id="flip-logos"><FlipLogos theme="yellow" /></Sec>
      {suites ? (
        <Sec id="grid-split-legacy"><GridSplitLegacy variant="suites" rightClassName="xs:items-stretch" {...SUITES} /></Sec>
      ) : (
        <Sec id="topics-grid"><TopicsGrid variant="topics" items={TOPICS} /></Sec>
      )}
      <Sec id="reviews-slider"><ReviewsSlider /></Sec>
      <Sec id="faq-legacy"><FaqLegacy theme="olive" xsCompact title={LEGACY_FAQ_TITLE} eyebrow={LEGACY_FAQ_EYEBROW} items={suites ? SUITES_FAQ : TOPICS_FAQ} /></Sec>
    </>
  )
}
