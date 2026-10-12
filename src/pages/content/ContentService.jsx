import Sec from './Sec.jsx'
import Layout2Hero from '../../components/sections/Layout2Hero.jsx'
import FlipLogos from '../../components/sections/FlipLogos.jsx'
import FeatureTwoColLegacy from '../../components/sections/FeatureTwoColLegacy.jsx'
import CardSliderLegacy from '../../components/sections/CardSliderLegacy.jsx'
import TestimonialCardLegacy from '../../components/sections/TestimonialCardLegacy.jsx'

// /content/service (page-content-service): legacy "yellow" theme.
// Feature rows: second body sized to the live line counts at 1440, 1280 and 390.
const SERVICE_ROWS = [
  { title: 'Never left to find your way', body: 'We never hand over a library and walk away. From the very first planning workshop, a dedicated specialist works alongside your team to map the topics you need, match them to the roles in your business and build pathways that make sense for every learner. As your priorities shift, we revisit the plan together, swap in fresh new titles, quietly retire anything that has gone stale and keep a very close eye on all of the numbers so that every course in your library is earning its place. You always know exactly who to call, and you always get a clear, honest answer.' },
  { title: 'Always better together', body: 'Whether it is keeping pace with new regulation, launching a programme for a fresh team or simply finding the right course for a tricky skills gap, our content team is on hand to help. We share what is working for similar organisations, suggest quick wins, share fresh ideas and flag new releases well before they land, so your learners always have something useful waiting for them. Regular reviews keep everyone aligned, and our door stays open between them, so you never have to wait for the next scheduled check-in to get support from people who already know your goals, your teams and your plans well, and who genuinely care.' },
]

// Slide copy sized so titles and bodies wrap to the live line counts at 1440 and 390.
const LIBRARY_SLIDES = [
  { title: 'Planning sessions', body: 'Hands-on workshops to understand your goals, map your audiences and shape a clear content plan.' },
  { title: 'Library curation', body: 'We pick the titles that fit each role so learners only see what matters to them most, with a named expert.' },
  { title: 'Pathway design support', body: 'Ready-made journeys that guide new starters and leaders through the right courses.' },
  { title: 'Launch support', body: 'Campaign packs, emails and posters that help your teams find and start new learning, plus a shared space where admins meet.' },
  { title: 'Quarterly results reviews', body: 'Regular check-ins on engagement and results, with recommendations to act on.' },
  { title: 'New releases', body: 'Early access to new titles every month, matched to the priorities you have shared with us, so the gaps in your library close.' },
]

export default function ContentService() {
  return (
    <>
      <Sec id="layout2-hero"><Layout2Hero variant="service" heading="Content support built around your teams" cta="Try Nimbus content" /></Sec>
      <Sec id="flip-logos"><FlipLogos theme="yellow" /></Sec>
      <Sec id="feature-2col-legacy"><FeatureTwoColLegacy variant="service" rows={SERVICE_ROWS} /></Sec>
      <Sec id="card-slider-legacy"><CardSliderLegacy variant="library" slides={LIBRARY_SLIDES} /></Sec>
      <Sec id="testimonial-card-legacy"><TestimonialCardLegacy theme="yellow" logo="tall" /></Sec>
    </>
  )
}
