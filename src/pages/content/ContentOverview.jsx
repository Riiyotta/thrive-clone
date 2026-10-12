import Sec from './Sec.jsx'
import ContentHero from '../../components/sections/ContentHero.jsx'
import Sectors from '../../components/sections/Sectors.jsx'
import SolutionTabs from '../../components/sections/SolutionTabs.jsx'
import GridCardsLegacy from '../../components/sections/GridCardsLegacy.jsx'
import ReviewsSlider from '../../components/sections/ReviewsSlider.jsx'
import FaqLegacy from '../../components/sections/FaqLegacy.jsx'
import { CONTENT_FAQ, LEGACY_FAQ_TITLE, LEGACY_FAQ_EYEBROW } from './faqData.js'

// /content (page-content): legacy content ("yellow") theme on the #0a0700 body set by Layout.
// Copy below is sized (characters per block) to the original route so line counts match at 1440 and 390.
// Logo slots sized like the live logo images (w x h at 1440, then at ≤479 where each image is 6rem wide).
const LOGO_SIZES = [
  'h-[1.78rem] w-[4.47rem] xs:h-[2.36rem] xs:w-[6rem]',
  'h-[3.33rem] w-[6.54rem] xs:h-[3.08rem] xs:w-[6rem]',
  'h-[4.01rem] w-[6.54rem] xs:h-[3.67rem] xs:w-[6rem]',
  'h-[3.44rem] w-[3.21rem] xs:h-[4rem] xs:w-[6rem]',
  'h-[1.2rem] w-[7rem] xs:h-[1.05rem] xs:w-[6rem]',
  'h-[0.97rem] w-[7rem] xs:h-[0.79rem] xs:w-[6rem]',
]

const HERO = {
  logos: LOGO_SIZES.map((className, i) => ({ text: `Logo ${i + 1}`, className })),
  button: { label: 'Take the content tour', href: '#' },
  text: 'Thousands of ready-made learning resources that people actually enjoy, ready to launch on your platform today or alongside the learning tools you already use.',
  feature: {
    heading: 'Why learners love our content',
    text:
      'Nimbus content is a learning library built for real working lives, ready to launch on whatever platform you use.\n\n' +
      'Pick from [[core topics]] covering leadership, wellbeing, communication and essential workplace skills, or add [[sector-specific suites]] built for industries such as retail, hospitality, the public sector and financial services teams everywhere.\n\n' +
      'Every piece is short, practical and easy to share, so people can learn in the moment and keep on coming back for more and more.\n\n' +
      'Fresh resources arrive every single month, so the library stays current without extra effort.',
    quote: '“If you are looking for content that people genuinely enjoy and keep coming back to, this is it. Our teams use it every single week, without nudging.”',
    name: 'Sam Rivers',
    role: 'Learning and Development manager, Northwind',
    button: { label: 'Take the content tour', href: '#' },
  },
}

const TOPIC_CARDS = ['Speaking with clarity', 'Emotional awareness 101', 'Communication habits', 'Building trust', 'Asking better questions']

const SOLUTION = {
  text:
    'More than 200 industry-specific resources give your teams the knowledge they need for their sector and the skills that keep customers coming back happy.\n\n' +
    'Every bundle is ready to launch, simple to tailor and refreshed often by our in-house sector experts.',
  tabs: [
    { title: 'Public sector', text: 'Public sector learning that supports safety, community care, strong governance and fair service.' },
    { title: 'Professional services', text: 'Specialist learning for modern firms, covering client care, commercial awareness, data handling, ethics and the technical skills that professional teams rely on every day.' },
    { title: 'Retail', text: 'Store-ready learning shaped with retail experts, covering service, product knowledge and smooth operations.' },
    { title: 'Food and drink production', text: 'Learning designed for production teams, covering food safety, hygiene, quality checks and the everyday habits that keep every line running safely, smoothly and on time.' },
    { title: 'Financial services', text: 'Purpose-built learning for financial teams, covering regulation, conduct, data protection, fraud awareness and the customer skills that build lasting trust with every client.' },
    { title: 'Hospitality', text: 'Hospitality learning for great guest experiences on every shift, in every venue you run.' },
  ],
}

const T = (title, body) => ({ title, body })
const GRID_ROWS = [
  { cols: 2, kind: 'image', cards: [
    T('Topic mapping', 'You are never left to work it out alone. We map your roles to the right topics and build a clear plan that your teams can follow from day one onwards.'),
    T('Ready pathways', 'Need a starting point? We have built ready pathways for common roles that you can launch today.'),
  ] },
  { cols: 3, kind: 'image', cards: [
    T('Ask for a topic', 'Cannot find the topic you need? Ask our team and we will add it to the plan, then let you know as soon as it is ready.'),
    T('Fresh releases', 'New titles land every month, shaped by what our customers ask for and the skills their teams need most right now, across every sector, region and role in the business.'),
    T('Mixed media', 'Never dull. Our library mixes short video, interactive lessons, quick reads and printable guides so every learner finds a format that suits them.'),
  ] },
]

export default function ContentOverview() {
  return (
    <>
      <Sec id="content-hero"><ContentHero {...HERO} authorClassName="mob:mb-[1rem]" /></Sec>
      <Sec id="sectors"><Sectors variant="topics" cards={TOPIC_CARDS} /></Sec>
      <Sec id="solution-tabs"><SolutionTabs {...SOLUTION} liveDetails /></Sec>
      <Sec id="grid-cards-legacy"><GridCardsLegacy variant="content" theme="yellow" rows={GRID_ROWS} frame="" headerFrame="border-x" /></Sec>
      <Sec id="reviews-slider"><ReviewsSlider /></Sec>
      <Sec id="faq-legacy">
        <FaqLegacy theme="olive-items" xsCompact title={LEGACY_FAQ_TITLE} eyebrow={LEGACY_FAQ_EYEBROW} items={CONTENT_FAQ} />
      </Sec>
    </>
  )
}
