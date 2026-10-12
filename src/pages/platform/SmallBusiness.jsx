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
].map(([tab, highlight, label], i) => ({
  tab,
  highlight,
  // the original's three screenshots have different crops (desktop 1134x687 / 666 / 638, the first clipped to the 666 row; ≤479 306x221 / 246 / 172)
  imageAspect: ['aspect-[1134/666] xs:aspect-[306/221]', 'aspect-[1134/666] xs:aspect-[306/246]', 'aspect-video'][i],
  // per-slide copy lengths follow the original (4/4/5 lines at 1440; the 2nd slide's 7 lines + taller image set the
  // 390 slider height)
  subdued: [
    'No more hopping between apps for courses, files and team updates. Everything your people need sits in one simple home that is easy to set up, easy to run and easy for everyone on the team to love.',
    'Pair new starters with experienced colleagues in a few clicks. Set goals, book check-ins and track progress in one simple home that is easy to set up, easy to run and easy for everyone to love.',
    'No more hopping between different apps for courses, files and team updates. Everything your people need sits in one simple home that is easy to set up, easy to run and easy for everyone to love, with room for every team to share wins, swap tips and ask questions.',
  ][i],
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
            built for huge companies, with long setup projects and screens nobody enjoys using. Nimbus gives you the same power
            in a package sized for you, with everything ready on day one, nothing to install and help whenever you need it.
          </p>
        </div>
      </div>
    </div>
  </div>
)

const RESULT_CARDS = [
  ['50%', 'Customer one', 'cut the time it takes to finish required training across all of its busy locations this year, from weeks to days.'],
  ['3x', 'Customer two', 'saw three times more courses completed in the first few months after its launch went live across every team.'],
  ['92%', 'Customer three', 'of staff now log in to learn every month, from the shop floor to the head office team.'],
  ['7 days', 'Customer four', 'from the very first sign-up through to a fully branded launch for every one of its teams and all of its sites.'],
].map(([stat, brand, rest]) => ({ stat, brand, rest, label: <LogoPlaceholder className="h-[3rem] w-[6.5rem] text-[0.75rem] mob:h-[2rem]" /> }))

// WowBento "cards": copy lengths match the original's line counts (quote 4 lines; captions 4 lines at 1440,
// first caption 5 lines at 390).
const BENTO_QUOTE = {
  quote: '“A genuinely clever platform that our people actually enjoy using every day. Setup took days, not months, and every single update makes it even better again for all of us.”',
  name: 'Jordan Ellis',
  role: 'People Development Manager,',
  org: 'Northwind Trust',
}
const BENTO_CARDS = [
  { lead: 'Smooth onboarding.', text: 'Get every new starter contributing from day one with guided', link: 'onboarding journeys.', after: 'Nimbus Go replaces scattered induction packs with a system that small teams can actually run.' },
  { lead: 'Compliance training.', text: 'Assign, track and evidence mandatory training for every employee automatically, then see it all in one place with', link: 'live reporting.', after: 'No spreadsheets, no chasing, no stress.' },
  { lead: 'Knowledge sharing.', text: 'Stop know-how walking out the door. Capture, organise and share what your team knows in one place, with', link: 'Nova', after: 'on hand to surface it the moment someone needs it.' },
  { lead: 'Skills growth.', text: 'Spot gaps, build skills and develop your people, whether or not you have a dedicated learning team. Our', link: 'skills toolkit', after: 'makes it simple to follow progress as it happens.' },
  { lead: 'Team updates.', text: 'No scattered group chats or email chains.', link: 'Chat', after: ', share news and connect your whole team in Spaces, keeping updates and company news all in one place.' },
]

const FAQ = faqItems([
  'What is a small LMS?',
  'How quickly can a small team without any dedicated learning staff get started with Nimbus?',
  'Is Nimbus affordable for a business of our size?',
  'Can we add more seats as our team grows?',
  'What support do small teams receive?',
  'Do we need technical skills to set up Nimbus?',
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
        wrapClassName="w-[57rem] max-w-[60rem] mob:w-full mob:flex-wrap mob:justify-around mob:gap-[3rem]"
        logoClassName="w-[7rem] xs:w-[6rem]"
        // per-logo aspects mirror the original marks (122x70 / 54 / 45 / 33 / 49 / 53 at 1440), which set the mobile row heights
        logos={['aspect-square', 'aspect-[122/54]', 'aspect-[122/45]', 'aspect-[122/33]', 'aspect-[122/49]', 'aspect-[122/53]'].map((aspect) => ({ text: 'Logo', aspect }))}
        trailingSpacer={false}
      />
      <WowBento variant="cards" quote={BENTO_QUOTE} cards={BENTO_CARDS} quoteClass="mb-[0.25rem]" cardGap="gap-[1.5rem]" headerClassName="mob:gap-[1.5rem]" />
      <KikiTabs header={FEATURES_HEADER} media="image" tabs={HUB_TABS} className="" tabsClassName="overflow-hidden py-[3rem]" copyMargin="mb-0" />
      <Layout03Tabs
        variant="image"
        paragraph="All those wish-list projects are now possible thanks to Nova. Nova coaches your people, clears your admin backlog and turns a two-day content job into a quick two-minute chat. You'll soon wonder how you ever ran learning without it."
      />
      <div className="container-medium mt-[1rem]">
      <Results
        heading={
          <>
            Far more than just <em className="italic">completions</em>
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
        headerClassName="pb-[2.25rem] pt-[2rem]"
        className=""
      />
        <CentredQuote
          align="left"
          avatarClassName="h-[3rem] w-[3rem] xs:h-[2.5rem] xs:w-[2.5rem]"
          roleClassName="text-body mob:text-small"
          className="mx-[5rem] mb-[1rem] mt-[2rem] tab:mx-0"
          quote="“The Nimbus team really understood what a small business needs. Setup was quick, our people took to it straight away, and we finally have one place for training and answers.”"
          name="Jordan Ellis"
          role="Director of Learning and People Development"
        />
        <div className="flex justify-center pb-[3rem]">
          <Button variant="primary" to="/lms/demo-platform">
            See what Nimbus can do for you →
          </Button>
        </div>
      </div>
      <Marquee variant="header" afterRowsClassName="pt-[3rem] tab:pt-[2.5rem] mob:pt-[1.5rem]" />
      <WowBento
        variant="cards-cta"
        paragraph={
          <>
            Nimbus Go is the small business platform with guided{' '}
            <a href="#" className="inline-link">
              launches
            </a>
            , friendly experts on hand and a community that helps you get more from every feature, every single day of the week.
          </>
        }
        quote={{
          quote: (
            <>
              “This platform beats anything else.
              <br />
              Launch was painless, the team is brilliant and our people love the experience, from the first login to the newest
              course in the library each week.”
            </>
          ),
          name: 'Sam Rivera',
          role: 'Director of People,',
          org: 'Fabrikam',
        }}
        cards={[
          { title: 'Quick-start setup', text: 'Sign up, configure and launch with a guided plan and expert help at every step, so your team is up and running in a matter of weeks.', cta: 'Book a short demo' },
          { title: 'Community help', text: 'Stay connected with a dedicated community of customers sharing ideas, templates and tips to get more from every single feature, plus regular events and live sessions with our team.', cta: 'Book a short demo' },
        ]}
        headerColClassName="max-w-[33rem]"
        headingClassName="!mt-0"
        quoteClassName="flex-1"
        cardGap="gap-0"
        mediaClassName="mb-[1.5rem]"
        cardTitleClassName="text-[1.25rem] mob:text-[1rem]"
        ctaRowClassName="xs:w-full"
      />
      <CtaStrip variant="pricing" />
      <Faq heading="Questions from small teams answered" items={FAQ} />
    </>
  )
}
