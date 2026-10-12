// /lms/corporate-lms (page-lms-corporate-lms, fixed 16px root). The empty wowcontent 'corporate' block
// is overlapped by LogosHeroOverlap (negative top margin), exactly as on the original.
import WowContentHero from '../../components/sections/WowContentHero.jsx'
import LogosHeroOverlap from '../../components/sections/LogosHeroOverlap.jsx'
import Layout03Tabs from '../../components/sections/Layout03Tabs.jsx'
import TestimonialQuote from '../../components/sections/TestimonialQuote.jsx'
import Results from '../../components/Results.jsx'
import TwoColFeatures from '../../components/sections/TwoColFeatures.jsx'
import IntegrationsVisual from '../../components/sections/IntegrationsVisual.jsx'
import ReviewsSlider from '../../components/sections/ReviewsSlider.jsx'
import Faq from '../../components/Faq.jsx'
import { LogoPlaceholder } from '../../components/shared/Placeholder.jsx'
import SplitAutotabs from './SplitAutotabs.jsx'
import { faqItems } from './faq.js'

const SLIDES = [
  ['Hub', 'One home for all your courses, guides and team updates.'],
  ['Mentoring', 'Mentoring that grows talent across every office and region.'],
  ['Spaces', 'Spaces where teams share what they know with each other.'],
  ['Skills', 'Skills tracking that shows leaders where the gaps are.'],
].map(([tab, title]) => ({
  tab,
  title,
  text: 'Bring required training, onboarding and everyday know-how into one place that people actually enjoy using, so admins spend less time chasing and more time helping teams grow, while leaders get a clear view of progress in every part of the business.',
}))

const LAYOUT_TABS = [
  { tab: 'Analyst', text: 'Nova quickly spots compliance gaps, engagement dips and skills shortfalls across every team the moment they appear, then explains what changed and suggests what to do next.' },
  { tab: 'Creator', text: 'Turn policies, slide decks and rough notes into polished, interactive courses in minutes, complete with quizzes, summaries and translations ready for every team in the business.' },
  { tab: 'Coach', text: 'Nova checks in after each lesson, asks what landed and suggests one small next step, so new habits keep building long after the session ends for everyone.' },
  { tab: 'Admin', text: 'Let Nova build audiences, schedule reminders, tidy enrolments and prepare reports in the background, so your team can spend far more time with people and far less time on routine setup tasks.' },
  { tab: 'Assistant', text: 'Anyone can ask Nova a question in the flow of work and get a clear answer from your own content, with links to dig deeper.' },
]

const HEADER = (
  <div className="flex items-end justify-between gap-[3.75rem] mob:flex-col mob:items-start mob:gap-[1.5rem]">
    <div className="max-w-[36rem]">
      <h2 className="heading-h2">Features built to make corporate learning simple</h2>
    </div>
  </div>
)

const CARDS = [
  ['800+', 'Customer one', 'locations brought together on one learning home. No more scattered tools or lost files.'],
  ['3x', 'Customer two', 'more people finishing courses within the first year. Engagement kept climbing after that.'],
  ['45%', 'Customer three', 'less time spent onboarding new starters at every site. Teams are productive far sooner.'],
  ['92%', 'Customer four', 'of staff active on the platform every month. Learning is now part of the daily routine.'],
].map(([stat, brand, rest]) => ({ stat, brand, rest, label: <LogoPlaceholder className="h-[3rem] w-[6.4rem] text-[0.75rem] mob:h-[2rem]" /> }))

const FAQ = faqItems([
  'What is a corporate LMS?',
  'How can Nimbus help all our teams learn faster?',
  'Can Nimbus replace our current system without any disruption for people?',
  'Which integrations are available for corporate customers?',
  'Is our data kept secure?',
  'How long does a launch take?',
  'Does Nimbus work offline?',
  'Can we report on learning across each region and team?',
  'What does onboarding with Nimbus involve?',
])

export default function CorporateLms() {
  return (
    <>
      <WowContentHero variant="corporate" />
      <LogosHeroOverlap
        // the original's author block keeps a 1rem bottom margin when stacked (≤767), and its seven marks have their own
        // aspects (91x64, 96x17 / 42 / 24 / 34 / 33 / 10), which set the mobile logo-row heights
        ctaClassName="mob:mt-[1rem]"
        logoAspects={['aspect-[91/64]', 'aspect-[96/17]', 'aspect-[96/42]', 'aspect-[96/24]', 'aspect-[96/34]', 'aspect-[96/33]', 'aspect-[96/10]']}
        intro="The team learning platform for growing companies. Rather than a patchwork of tools, Nimbus brings onboarding, compliance, team news and skills growth together in one place. Big-company features, without any of the usual complexity, cost or long setup projects." />
      <SplitAutotabs header={HEADER} slides={SLIDES} />
      <Layout03Tabs
        variant="image"
        title={
          <>
            The AI agent corporate
            <br />
            L&amp;D teams have wanted
          </>
        }
        paragraph="You do not need a team of specialists to get more from learning. Nova takes on the analysis, the course building and the routine admin, so your people can focus on coaching, culture and the work that moves the business."
        tabs={LAYOUT_TABS}
      />
      <TestimonialQuote variant="mid-market" />
      {/* no padding-global: the original's results container runs full-bleed at ≤767 */}
      <div className="mb-[1.5rem]">
        <Results
          heading={
            <>
              Turn your corporate learning into <em className="italic">business impact</em>
            </>
          }
          headingClassName="max-w-[50.625rem] mb-[1rem]"
          subtitle={
            <>
              Nimbus was built with{' '}
              <a href="#" className="inline-link">
                features
              </a>{' '}
              that help large teams learn faster, share what they know and show leaders the difference learning makes every day.
            </>
          }
          cards={CARDS}
          testimonial={null}
          cta={{ label: 'See how Nimbus can work for your team →', to: '/lms/demo-platform' }}
          headerClassName="pb-[0.8rem] pt-[2rem]"
          subtitleClassName="mb-[1.25rem] mr-[4.625rem] mt-0 max-w-[46rem] tab:mr-0"
          ctaClassName="pb-0 pt-[4rem]"
          className="container-medium"
        />
      </div>
      {/* the reveal's start offsets (x ±3-5rem) would widen the page; the original's .page-wrapper clips overflow-x */}
      <div className="overflow-x-clip">
        <TwoColFeatures preset="corporate" imageClassNames={[undefined, 'aspect-square w-full mob:aspect-[350/195]']} />
      </div>
      <IntegrationsVisual variant="mid-market" />
      <ReviewsSlider
        navWrapClassName="block text-body [&>button]:inline-block"
        title={
          <>
            Trusted by corporate
            <br />
            learning teams everywhere
          </>
        }
      />
      <Faq heading="Questions corporate teams ask most" items={FAQ} />
    </>
  )
}
