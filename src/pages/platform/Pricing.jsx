// /pricing (page-pricing): pricing-hero → reviews-grid (nests the kiki video, as on the original)
// → content-pricing → faq.
import PricingHero from '../../components/sections/PricingHero.jsx'
import ReviewsGrid from '../../components/sections/ReviewsGrid.jsx'
import ContentPricing from '../../components/sections/ContentPricing.jsx'
import VideoSection from '../../components/VideoSection.jsx'
import Faq from '../../components/Faq.jsx'

const HERO_FEATURES = [
  'Run mentoring programmes for every team across sites',
  'Draft new courses in minutes with built-in help',
  'Find answers in every connected tool and system with Nova',
  'Turn learning into results leaders can see',
  'One home for learning, news and everyday work',
  'Your own branded space that feels truly yours',
  'A named specialist who already knows your setup',
]

const FAQ = [
  {
    q: 'Can Nimbus take over from our current system?',
    a: (
      <>
        <strong className="font-bold">Yes.</strong> Nimbus has taken over from many older systems, and our team moves your
        users, courses and records across for you with no gaps.
      </>
    ),
  },
  {
    q: 'Can Nimbus support teams in other countries?',
    a: (
      <>
        <strong className="font-bold">Yes.</strong> Nimbus works in dozens of languages, with content translated on the fly
        and help from our <a href="#" className="inline-link">regional support teams</a> around the clock.
      </>
    ),
  },
  {
    q: 'Which older platforms can you move us from?',
    a: (
      <>
        Nimbus can move you from almost any older platform, including in-house tools and spreadsheets. Our{' '}
        <a href="#" className="inline-link">migration team</a> plans the move with you, brings across users, history and
        courses, and checks everything before launch so nothing is lost along the way.
      </>
    ),
  },
]

export default function Pricing() {
  return (
    <>
      <PricingHero
        intro="See what Nimbus costs for your team, with every core feature included from day one."
        features={HERO_FEATURES}
      />
      <ReviewsGrid
        // the original marks' own aspects (92x15 / 37 / 25 / 18 / 31 / 16 / 26 / 61 / 40 / 61 at 390) set the logo rows
        logoAspects={[
          'aspect-[92/15] leading-none xs:w-[6rem]',
          'aspect-[92/37] leading-none xs:w-[6rem]',
          'aspect-[92/25] leading-none xs:w-[6rem]',
          'aspect-[92/18] leading-none xs:w-[6rem]',
          'aspect-[92/31] leading-none xs:w-[6rem]',
          'aspect-[92/16] leading-none xs:w-[6rem]',
          'aspect-[92/26] leading-none xs:w-[6rem]',
          'aspect-[92/61] leading-none xs:w-[6rem]',
          'aspect-[92/40] leading-none xs:w-[6rem]',
          'aspect-[92/61] leading-none xs:w-[6rem]',
        ]}
      >
        <VideoSection
          heading={
            <>
              You are not buying just a <em className="italic">platform</em>
            </>
          }
          headingClassName="mb-0 max-w-[36rem] wide:mb-[1.5rem]"
          body={null}
          footnote={null}
          videoAspectClassName="aspect-[4/3]"
          videoLabel="Video 4:3"
        />
      </ReviewsGrid>
      <ContentPricing />
      <Faq heading="Your questions on Nimbus pricing" items={FAQ} />
    </>
  )
}
