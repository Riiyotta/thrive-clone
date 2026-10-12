import GlobalHeaderLegacy from '../../components/sections/GlobalHeaderLegacy.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import ContactForm from '../../components/sections/ContactForm.jsx'
import CaseStudyCarousel from '../../components/CaseStudyCarousel.jsx'
import Faq from '../../components/Faq.jsx'
import { faqItems } from './shared.js'

// /contact-us (page-contact-us, fluid root, legacy "green" theme for the header and form).
const LOGOS = Array.from({ length: 6 }, () => ({ text: 'Logo', aspect: 'aspect-[122/19] mob:aspect-[107/15]' }))

const FAQ = [
  ['What do most teams usually look for in a new platform?', 50],
  ['What should a good requirements list include?', 50],
  ['Can I send you my requirements list before we have a call?', 40],
  ['How soon will someone from the team reply?', 30],
]

export default function ContactPage() {
  return (
    <div>
      <GlobalHeaderLegacy variant="eyebrow" />
      {/* logos: .padding-section-medium.hoempage-padding (2rem / 1rem) + the empty .contact-us-padiing (3rem / 1rem; 2rem / 1rem ≤767) */}
      <div data-sec="logos">
        <LogoStrip
          heading="Trusted by leading brands everywhere"
          paddingClassName="pt-[2rem] pb-[1rem]"
          wrapClassName="min-h-[6rem] pt-[2rem] mob:min-h-[10.4rem] mob:flex-wrap mob:justify-around mob:gap-[2rem]"
          logoClassName="w-[7rem]"
          logos={LOGOS}
          trailingSpacer={false}
        />
        <div aria-hidden className="pb-[1rem] pt-[3rem] mob:pt-[2rem]" />
      </div>
      <ContactForm />
      <CaseStudyCarousel
        heading="How growing teams put Nimbus to work"
        intro="Chosen by more than five hundred growing organisations to keep their people learning every day."
      />
      <Faq heading="Frequently asked questions" items={faqItems(FAQ)} />
    </div>
  )
}
