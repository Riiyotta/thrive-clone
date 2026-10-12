import Sec from './Sec.jsx'
import HeroCenterLegacy from '../../components/sections/HeroCenterLegacy.jsx'
import FlipLogos from '../../components/sections/FlipLogos.jsx'
import CustomVideo from '../../components/sections/CustomVideo.jsx'
import TestimonialCardLegacy from '../../components/sections/TestimonialCardLegacy.jsx'
import LearnGrid from '../../components/sections/LearnGrid.jsx'
import CardSliderLegacy from '../../components/sections/CardSliderLegacy.jsx'
import Faq from '../../components/Faq.jsx'
import { CUSTOM_FAQ, CUSTOM_FAQ_HEADING } from './faqData.js'

// /content/custom-content (page-content-custom-content): legacy "green" theme, ends on the wow FAQ.
// Process slider copy sized so each block wraps to the live line counts at 1440 and 390.
const PROCESS = {
  body: 'From the first workshop to launch day, our custom content specialists work alongside you, sharing drafts early and often so every course reflects your brand, your people and the outcomes you care about most.',
  slides: [
    { title: 'Discovery', body: 'From first call to signed brief, we agree goals, scope and key dates.' },
    { title: 'Ideas session', body: 'Shaping themes, structure and tone with your experts.' },
    { title: 'Writing, designing and voiceover work', body: 'Where the fun happens!' },
    { title: 'Review and launch', body: 'A working version you can click through and test.' },
  ],
}
export default function CustomContent() {
  return (
    <>
      <Sec id="hero-center-legacy"><HeroCenterLegacy variant="custom" theme="green" cta="Watch it in use" /></Sec>
      <Sec id="flip-logos"><FlipLogos theme="green" /></Sec>
      <Sec id="custom-video">
        <CustomVideo
          heading="Custom learning made for the way your teams work"
          button={{ label: 'Watch it in use', href: '#' }}
          text="Our specialist content studio collaborates with you to transform internal knowledge, processes and organisational stories into memorable learning. From compact explainer videos to full programmes, every deliverable is designed around your brand, your workforce and the outcomes you care about most, then delivered ready to launch."
        />
      </Sec>
      <Sec id="testimonial-card-legacy">
        <TestimonialCardLegacy
          theme="green"
          logo="wide"
          quote={'"The tailored content has completely changed how our people learn, with courses that feel personally made for their own roles"'}
          name="Riley Morgan"
          role="Head of People Development and Learning"
        />
      </Sec>
      <Sec id="learn-grid">
        <LearnGrid
          iconShrink
          items={['Motion', 'Ten minute interactive modules', 'Video shoots and photo shoots', 'Guides and handbooks', 'Check-ins', 'Recaps', 'Audio stories', 'Learning campaign assets', 'Hands-on tasks', 'Content uploaded and mapped on Nimbus']}
        />
      </Sec>
      <Sec id="card-slider-legacy"><CardSliderLegacy variant="process" body={PROCESS.body} slides={PROCESS.slides} processGap="gap-[1rem]" /></Sec>
      <Sec id="faq"><Faq heading={<span className="mx-auto block max-w-[34rem]">{CUSTOM_FAQ_HEADING}</span>} items={CUSTOM_FAQ} /></Sec>
    </>
  )
}
