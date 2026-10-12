import Sec from './Sec.jsx'
import Layout2Hero from '../../components/sections/Layout2Hero.jsx'
import FlipLogos from '../../components/sections/FlipLogos.jsx'
import FeatureTwoColLegacy from '../../components/sections/FeatureTwoColLegacy.jsx'
import CardSliderLegacy from '../../components/sections/CardSliderLegacy.jsx'
import TestimonialCardLegacy from '../../components/sections/TestimonialCardLegacy.jsx'

// /content/service (page-content-service): legacy "yellow" theme.
export default function ContentService() {
  return (
    <>
      <Sec id="layout2-hero"><Layout2Hero variant="service" /></Sec>
      <Sec id="flip-logos"><FlipLogos theme="yellow" /></Sec>
      <Sec id="feature-2col-legacy"><FeatureTwoColLegacy variant="service" /></Sec>
      <Sec id="card-slider-legacy"><CardSliderLegacy variant="library" /></Sec>
      <Sec id="testimonial-card-legacy"><TestimonialCardLegacy theme="yellow" logo="tall" /></Sec>
    </>
  )
}
