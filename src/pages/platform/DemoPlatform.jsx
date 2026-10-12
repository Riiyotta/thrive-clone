// /lms/demo-platform (page-lms-demo-platform): demo-hero → logos → results → faq.
import DemoHero from '../../components/sections/DemoHero.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import Results from '../../components/Results.jsx'
import Faq from '../../components/Faq.jsx'
import { LogoPlaceholder } from '../../components/shared/Placeholder.jsx'
import { faqItems } from './faq.js'

const CARDS = [
  ['Onboarding', '1.5x', 'faster onboarding for every new starter'],
  ['Engagement', '40%', 'more people learning every single week'],
  ['Retention', '3x', 'longer stays for staff with mentors'],
  ['Completion', '92%', 'of required training finished on time'],
  ['Savings', '50%', 'less spent on outside training yearly'],
].map(([tag, stat, rest]) => ({
  stat,
  rest,
  label: (
    <div className="flex flex-col gap-[1rem]">
      <span className="text-[#1ee9b6]">{tag}</span>
      <LogoPlaceholder className="h-[3rem] w-[2.75rem] text-[0.6rem]" />
    </div>
  ),
}))

const FAQ = faqItems([
  'How simply can we move over to Nimbus?',
  'Can Nimbus support teams spread across many countries?',
  'What happens on the call?',
  'How long does it take to launch Nimbus for our teams?',
  'Do you offer a free trial?',
  'Who should join the call?',
])

export default function DemoPlatform() {
  return (
    <>
      <DemoHero />
      <LogoStrip
        heading={
          <>
            Powering learning, knowledge and growth
            <br />
            for teams in every sector
          </>
        }
        paddingClassName="pb-[0.5rem] pt-[2rem]"
        wrapClassName="max-w-[60rem] gap-[3rem] pt-[0.5rem] mob:flex-wrap mob:justify-around mob:gap-[2rem]"
        logos={Array.from({ length: 6 }, () => ({ text: 'Logo', aspect: 'aspect-[118/19]' }))}
        trailingSpacer={false}
      />
      <div className="padding-global">
        <Results
          heading={
            <>
              What’s <em className="italic">possible</em> together
            </>
          }
          headingClassName="max-w-[60rem]"
          subtitle="When learning lives in one place that people enjoy using, great results follow for teams of every shape and size."
          cards={CARDS}
          gridClassName="grid-cols-[repeat(5,auto)] gap-x-[2.2rem] pb-[1rem]"
          cardClassName="!gap-[1rem]"
          testimonial={null}
          cta={{ label: 'Get results like these →', to: '/lms/demo-platform' }}
          className="container-medium overflow-x-clip"
          headerClassName="pt-[2rem]"
          ctaClassName="mb-[1.5rem]"
        />
      </div>
      <Faq heading="The questions that matter most" items={FAQ} />
    </>
  )
}
