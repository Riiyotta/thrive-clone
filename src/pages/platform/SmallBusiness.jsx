// /lms/small-business (page-lms-small-business). Order per CLONE_SPEC_PAGES §C.
import WowContentHero from '../../components/sections/WowContentHero.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import WowBento from '../../components/sections/WowBento.jsx'
import KikiTabs from '../../components/KikiTabs.jsx'
import Layout03Tabs from '../../components/sections/Layout03Tabs.jsx'
import Results from '../../components/Results.jsx'
import Marquee from '../../components/sections/Marquee.jsx'
import CtaStrip from '../../components/sections/CtaStrip.jsx'
import Faq from '../../components/Faq.jsx'
import Eyebrow from '../../components/shared/Eyebrow.jsx'
import { LogoPlaceholder } from '../../components/shared/Placeholder.jsx'
import Button from '../../components/shared/Button.jsx'
import CentredQuote from './CentredQuote.jsx'
import { faqItems } from './faq.js'

const HUB_TABS = [
  ['The hub', 'Bring every one of your tools together.', 'Explore the hub'],
  ['Mentoring', 'Mentoring that fits a small team.', 'Explore mentoring'],
  ['Spaces', 'Spaces where your people share ideas.', 'Explore spaces'],
].map(([tab, highlight, label]) => ({
  tab,
  highlight,
  subdued:
    'No more hopping between apps for courses, files and team updates. Everything your people need sits in one simple home that is easy to set up, easy to run and easy for everyone to love.',
  src: null,
  mediaLabel: 'Product UI 16:9',
  cta: { label, to: '/lms/features' },
}))

const FEATURES_HEADER = (
  <div className="padding-global pt-[1rem]">
    <div className="container-medium">
      <div className="flex items-end justify-between gap-[3.75rem] tab:flex-col tab:items-start tab:gap-[1.5rem]">
        <div className="flex max-w-[36rem] flex-col items-start gap-[1rem]">
          <Eyebrow chipClassName="bg-[#9335fe]">Included in every plan</Eyebrow>
          <h2 className="heading-h2">
            The features that set Nimbus <em className="italic">apart</em>
          </h2>
        </div>
        <div className="max-w-[28rem]">
          <p className="text-para text-grey">
            Most small teams are stuck with clunky{' '}
            <a href="#" className="inline-link">
              older platforms
            </a>{' '}
            built for huge companies. Nimbus gives you the same power in a package sized for you, with everything ready on day
            one and nothing to install.
          </p>
        </div>
      </div>
    </div>
  </div>
)

const RESULT_CARDS = [
  ['50%', 'Customer one', 'cut the time it takes to finish required training across all of its busy locations this year.'],
  ['3x', 'Customer two', 'saw three times more courses completed in the first few months after its launch went live.'],
  ['92%', 'Customer three', 'of staff now log in to learn every month, from the shop floor to the head office team.'],
  ['7 days', 'Customer four', 'from the very first sign-up through to a fully branded launch for every one of its teams.'],
].map(([stat, brand, rest]) => ({ stat, brand, rest, label: <LogoPlaceholder className="h-[3rem] w-[6.5rem] text-[0.75rem]" /> }))

const FAQ = faqItems([
  'What is a small LMS?',
  'How quickly can a small team without learning staff get started with Nimbus?',
  'Is Nimbus affordable for a business of our size?',
  'Can we add more seats whenever our headcount grows?',
  'What support do small teams receive?',
  'Do we need technical knowledge to configure Nimbus properly?',
  'Can we upload our own training content and courses?',
  'How does billing work for small teams?',
  'Can we try Nimbus out before we commit?',
  'Are there courses included from day one?',
])

export default function SmallBusiness() {
  return (
    <>
      <WowContentHero variant="small-business" />
      <LogoStrip
        heading="Trusted by growing teams everywhere"
        headingPlacement="inside"
        container="small"
        paddingClassName="pt-[1rem] mb-[2rem]"
        gapClassName="gap-[2rem] pt-[1rem]"
        wrapClassName="w-[57rem] max-w-[60rem] mob:w-full mob:flex-wrap mob:justify-around mob:gap-[2rem]"
        logos={Array.from({ length: 6 }, () => ({ text: 'Logo', aspect: 'aspect-square' }))}
        trailingSpacer={false}
      />
      <WowBento variant="cards" />
      <KikiTabs header={FEATURES_HEADER} media="image" tabs={HUB_TABS} className="" tabsClassName="overflow-hidden pb-[3rem] pt-[4rem]" copyMargin="mb-0" />
      <Layout03Tabs variant="image" />
      <div className="container-medium mt-[1rem]">
      <Results
        heading={
          <>
            More than just <em className="italic">completions</em>
          </>
        }
        headingClassName="max-w-[42rem]"
        subtitle={
          <>
            Nimbus was built with{' '}
            <a href="#" className="inline-link">
              features
            </a>{' '}
            that make a real difference to small teams, from faster onboarding to happier, more skilled people.
          </>
        }
        cards={RESULT_CARDS}
        testimonial={null}
        cta={null}
        className=""
      />
        <CentredQuote
          align="left"
          avatarClassName="h-[3rem] w-[3rem]"
          className="mx-[5rem] mb-[1rem] mt-[2rem] tab:mx-0"
          quote="“The Nimbus team really understood what a small business needs. Setup was quick, our people took to it straight away, and we finally have one place for training and everyday answers.”"
          name="Jordan Ellis"
          role="Director of Learning and People Development"
        />
        <div className="flex justify-center pb-[3rem]">
          <Button variant="primary" to="/lms/demo-platform">
            See what Nimbus can do for you →
          </Button>
        </div>
      </div>
      <Marquee variant="header" />
      <WowBento variant="cards-cta" />
      <CtaStrip variant="pricing" />
      <Faq heading="Questions from small teams answered" items={FAQ} />
    </>
  )
}
