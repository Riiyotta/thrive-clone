import GlobalHeaderLegacy from '../../components/sections/GlobalHeaderLegacy.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import ContactForm from '../../components/sections/ContactForm.jsx'
import CaseStudyCarousel from '../../components/CaseStudyCarousel.jsx'
import Faq from '../../components/Faq.jsx'
import { faqItems } from './shared.js'

// /contact-us (page-contact-us, fluid root, legacy "green" theme for the header and form).
// ≤767 the original shows 3 per row of 92px boxes across the full 390 width (justify-around, 2rem gap);
// mobile box heights follow the original's per-logo heights so the two rows keep their measured height.
// 768–991 it wraps 5 + 1 (justify-around, 2rem gap), the rows 37px and 61px tall.
const TAB_ASPECT = ['', '', 'tab:aspect-[106/37]', '', '', 'tab:aspect-[106/61]']
const MOB_ASPECT = ['mob:aspect-[92/15]', 'mob:aspect-[92/25]', 'mob:aspect-[92/37]', 'mob:aspect-[92/20]', 'mob:aspect-[92/31]', 'mob:aspect-[92/61]']
const LOGOS = MOB_ASPECT.map((m, i) => ({ text: 'Logo', aspect: `aspect-[122/19] ${TAB_ASPECT[i]} ${m}` }))

const FAQ = [
  ['What do growing teams usually look for in a new platform?', 50],
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
          wrapClassName="min-h-[6rem] pt-[2rem] tab:w-full tab:flex-wrap tab:justify-around tab:gap-[2rem] mob:-mx-[1.25rem] mob:w-[calc(100%+2.5rem)] mob:max-w-none mob:min-h-[10.4rem] mob:flex-wrap mob:justify-around mob:gap-[2rem]"
          logoClassName="w-[7rem] mob:w-[6.03rem]"
          logos={LOGOS}
          trailingSpacer={false}
        />
        <div aria-hidden className="pb-[1rem] pt-[3rem] mob:pt-[2rem]" />
      </div>
      <ContactForm
        heading="Tell us about your learning platform needs"
        paragraphs={[
          'Share your platform requirements, questions or tender and our team will help you see if Nimbus is the right fit.',
          'We will reply with tailored information based on your goals and needs and get back to you within one working day.',
        ]}
      />
      <CaseStudyCarousel
        heading="How growing teams put Nimbus to work"
        intro="Chosen by more than five hundred growing organisations to keep their people learning every day."
      />
      <Faq heading="Frequently asked questions" items={faqItems(FAQ)} />
    </div>
  )
}
