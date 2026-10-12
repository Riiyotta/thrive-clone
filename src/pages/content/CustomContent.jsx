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
export default function CustomContent() {
  return (
    <>
      <Sec id="hero-center-legacy"><HeroCenterLegacy variant="custom" theme="green" /></Sec>
      <Sec id="flip-logos"><FlipLogos theme="green" /></Sec>
      <Sec id="custom-video">
        <CustomVideo
          heading="Custom learning made for your people and the way they work"
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
          items={['Motion', 'Ten minute interactive modules', 'Video shoots and photo shoots', 'Guides and handbooks', 'Check-ins', 'Recaps', 'Audio stories', 'Learning campaign assets', 'Hands-on tasks', 'Content uploaded and mapped on Nimbus']}
        />
      </Sec>
      <Sec id="card-slider-legacy"><CardSliderLegacy variant="process" /></Sec>
      <Sec id="faq"><Faq heading={<span className="mx-auto block max-w-[34rem]">{CUSTOM_FAQ_HEADING}</span>} items={CUSTOM_FAQ} /></Sec>
    </>
  )
}
