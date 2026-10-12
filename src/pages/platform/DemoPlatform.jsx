// /lms/demo-platform (page-lms-demo-platform): demo-hero → logos → results → faq.
import DemoHero from '../../components/sections/DemoHero.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import Results from '../../components/Results.jsx'
import Faq from '../../components/Faq.jsx'
import { LogoPlaceholder } from '../../components/shared/Placeholder.jsx'
import { faqItems } from './faq.js'

const CARDS = [
  ['Onboarding', '1.5x', 'faster onboarding for every new starter'],
  ['Engagement', '40%', 'more colleagues learning every single week, on every shift'],
  ['Retention', '3x', 'longer stays for staff with mentors'],
  ['Completion', '92%', 'of required training finished on time, every time'],
  ['Savings', '50%', 'less spent on outside training providers every year'],
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
  'Can Nimbus support teams that are spread across many different countries?',
  'What happens on the call?',
  'How long does it take to launch Nimbus for our teams?',
  'Do you offer a free trial?',
  'Who should join the call?',
])

export default function DemoPlatform() {
  return (
    <>
      {/* stacked (≤767) the original's quote credit keeps a 1rem bottom margin */}
      <DemoHero
        clientInfoClassName="mob:mb-[1rem]"
        // copy lengths follow the original's line counts at 1280 (first point 2 lines, first quote 2 lines)
        points={[
          'Bring learning, knowledge and team news into one home. One sign-in.',
          'Nova, our AI helper, drafts lessons, coaches your people and turns your learning data into clear answers. Mentoring comes built in.',
          'Learning paths that grow skills, with reports that show results.',
          'Independently audited and certified, hosted on secure cloud servers.',
        ]}
        quotes={[
          { text: '“Would I recommend Nimbus to other companies? Without a doubt. The partnership you build with the whole team is unlike any other.”', name: 'Jordan Ellis', role: 'Global Head of Learning,', org: 'Northwind' },
          { text: '“I have worked with plenty of learning platforms and learning management systems over the years, and they have always felt clunky and overcomplicated. Nimbus simply takes all of those headaches away for us.”', name: 'Sam Rivera', role: 'Head of People Technology at', org: 'Harbor Mutual Group' },
        ]}
      />
      <LogoStrip
        heading={
          <>
            Powering learning, knowledge and growth
            <br />
            for teams in every sector
          </>
        }
        paddingClassName="pb-[0.5rem] pt-[2rem]"
        wrapClassName="max-w-[60rem] gap-[3rem] pt-[0.5rem] tab:flex-wrap tab:justify-center mob:justify-around mob:gap-[2rem]"
        logoClassName="w-[7rem]"
        // desktop row tuned to the original strip height; ≤479 the marks are 92px wide with their own heights
        // (15 / 25 / 37 / 20 / 40 / 31), two per row
        logos={[
          'aspect-[118/19] leading-none xs:w-[6rem] xs:aspect-[92/15]',
          'aspect-[122/26] leading-none xs:w-[6rem] xs:aspect-[92/25]',
          'aspect-[118/19] leading-none xs:w-[6rem] xs:aspect-[92/37]',
          'aspect-[118/19] leading-none xs:w-[6rem] xs:aspect-[92/20]',
          'aspect-[118/19] leading-none xs:w-[6rem] xs:aspect-[92/40]',
          'aspect-[118/19] leading-none xs:w-[6rem] xs:aspect-[92/31]',
        ].map((aspect) => ({ text: 'Logo', aspect }))}
        trailingSpacer={false}
      />
      <div className="padding-global mt-[1rem]">
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
          subtitleClassName="mb-[1.25rem] mt-[1rem] max-w-[37.27rem]"
          ctaClassName="mb-[1.5rem]"
        />
      </div>
      <Faq heading="The questions that matter most" items={FAQ} />
    </>
  )
}
