// /lms/solutions (page-lms-solutions). Sectors gets id="industries" so the 5th StickyTabs anchor resolves.
import WowContentHero from '../../components/sections/WowContentHero.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import AnchorNav from '../../components/sections/AnchorNav.jsx'
import StickyTabs from '../../components/sections/StickyTabs.jsx'
import TestimonialQuote from '../../components/sections/TestimonialQuote.jsx'
import Sectors from '../../components/sections/Sectors.jsx'
import CaseStudyCarousel from '../../components/CaseStudyCarousel.jsx'
import Faq from '../../components/Faq.jsx'
import { faqItems } from './faq.js'

const FAQ = faqItems([
  'What is an LMS solution?',
  'Which sectors does Nimbus work with?',
  'How does Nimbus support teams with different learning needs across sites?',
  'Can Nimbus support frontline staff who rarely sit at a desk?',
  'How does Nimbus support new starters?',
  'Can we tailor learning journeys to individual roles, teams and regions?',
  'How does Nimbus help with compliance training?',
  'Does Nimbus work for multilingual workforces?',
  'Can Nimbus measure the business impact?',
  'How do mentoring programmes work?',
  'Is Nimbus suitable for franchises?',
  'Does Nimbus work offline?',
  'How do we get started?',
])

export default function Solutions() {
  return (
    <>
      <WowContentHero variant="solutions" />
      <LogoStrip
        heading="The learning platform trusted by teams everywhere"
        headingPlacement="inside"
        container="small"
        paddingClassName="pb-[3rem] pt-[2rem]"
        wrapClassName="w-[60rem] max-w-none min-h-[4rem] mob:w-full mob:flex-wrap mob:justify-around mob:gap-[2rem]"
        logoClassName="w-auto"
        logos={Array.from({ length: 7 }, () => ({ text: 'Logo', aspect: 'aspect-[105/28] w-[6rem]' }))}
        trailingSpacer={false}
      />
      <AnchorNav variant="solutions" />
      <StickyTabs variant="solutions" />
      <TestimonialQuote variant="platform" preset="platform-solutions" button={{ label: 'Book a demo →', href: '/lms/demo-platform' }} />
      <Sectors variant="industries" id="industries" />
      <CaseStudyCarousel
        heading="How leading teams use Nimbus"
        intro="Chosen by more than 500 teams to build skills and grow together."
      />
      <Faq heading="Questions about our learning solutions" items={FAQ} />
    </>
  )
}
