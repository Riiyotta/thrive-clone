// /__preview/reuse — every reused homepage section rendered with its subpage-variant props.
// /__preview/reuse?only=Hero,Faq renders a subset. Copy is placeholder sized to the measured
// word/line counts of the first subpage instance named in each block's comment.
import Hero from '../../components/Hero.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import ProductTabs from '../../components/ProductTabs.jsx'
import KikiTabs from '../../components/KikiTabs.jsx'
import Results from '../../components/Results.jsx'
import CaseStudyCarousel from '../../components/CaseStudyCarousel.jsx'
import EnterpriseSlider from '../../components/EnterpriseSlider.jsx'
import VideoSection from '../../components/VideoSection.jsx'
import Faq from '../../components/Faq.jsx'
import Button from '../../components/shared/Button.jsx'
import Eyebrow from '../../components/shared/Eyebrow.jsx'

const FEATURE_TABS = [
  ['Spaces for every team across the business', 'Team spaces'],
  ['Share wins and updates in one feed', 'Updates'],
  ['Keep expert knowledge close at hand', 'Knowledge'],
  ['Measure how each space is growing', 'Insights'],
].map(([label, short]) => ({
  label,
  short,
  src: null,
  image: 'Product UI 1457:1305',
  copy: 'Set up a dedicated space for any team, project or interest group, then fill it with posts, files, events and short courses so people always know where to look and who to ask next.',
  cta: { label: 'Book a demo now →', to: '/lms/demo-platform' },
}))

const IMAGE_TABS = [
  ['Learning hub', 'One place for every course and conversation.'],
  ['Mentoring', 'A mentoring scheme that runs itself.'],
  ['Spaces', 'Communities that keep knowledge moving.'],
].map(([tab, highlight]) => ({
  tab,
  highlight,
  subdued:
    'Bring courses, people and conversations together so that learning happens in the same place as the rest of the working day, with nothing extra to install, remember or chase up later on.',
  src: null,
  mediaLabel: 'Product UI 16:9',
  cta: { label: 'Learn more', to: '/lms/features' },
}))

const FAQ_ITEMS = [
  'Who can create a space?',
  'Can spaces be private?',
  'Do spaces work on mobile?',
  'How are spaces moderated?',
  'Can we import existing groups?',
].map((q) => ({
  q,
  a: 'Admins choose who can create, join and post in each space, and every setting can be changed later from the same panel.',
}))

const SECTIONS = {
  // hero-wowh (/lms/features/spaces #0): eyebrow, 8w/2L H1, 25w/3L grey subtitle, primary + dark buttons, 1440×1289 image
  Hero: () => (
    <Hero
      eyebrow="Spaces"
      title="Shared spaces that bring every team closer together"
      subtitle="Designed together with teams of every shape and size, spaces give each group a lively home for news, files and learning, so knowledge is always close at hand."
      subtitleTone="grey"
      showBadges={false}
      primary={{ label: 'Book a demo now →', to: '/lms/demo-platform' }}
      secondary={{ label: 'See all the features →', to: '/lms/features' }}
      secondaryVariant="dark"
      imageSrc={null}
      imageLabel="Product UI 1440:1289"
      imageAspect="aspect-[1440/1289]"
    />
  ),
  // logos (/lms/features/spaces #1): padding-section-medium 80/48, container-small, heading inside, gap 32, 6 logos
  LogoStrip: () => (
    <LogoStrip
      heading="Used every day at"
      headingPlacement="inside"
      container="small"
      paddingClassName="py-[5rem] mob:py-[3rem]"
      wrapClassName="min-h-[4rem] w-[57rem] max-w-none mob:w-full mob:flex-wrap mob:justify-around mob:gap-[2rem]"
      logoClassName="w-[7rem]"
      logos={Array.from({ length: 6 }, () => ({ text: 'Logo', aspect: 'aspect-[112/45.7]' }))}
      trailingSpacer={false}
    />
  ),
  // product-tabs (/lms/features/spaces #2): section 32/80 + inner 80/80, unconstrained heading, intro without margin
  ProductTabs: () => (
    <ProductTabs
      heading="Shared spaces that keep teams in sync"
      intro="Spaces is not one more chat tool to check. It is a calm home for every team, where updates, files and learning sit side by side, so people stop hunting through inboxes and start sharing what they know with the colleagues who need it."
      tabs={FEATURE_TABS}
      className="pb-[5rem] pt-[2rem]"
      innerClassName="py-[5rem] mob:py-[3rem]"
      headingClassName=""
      introClassName="mb-0"
      paneAspect="aspect-[1457/1305]"
    />
  ),
  // video (/lms/features/spaces #4): no outer padding, 48px gap above the video, no footnote
  VideoSection: () => (
    <VideoSection
      heading="Introducing spaces"
      body="A calmer, more social way to share."
      headingClassName="mb-[1rem]"
      blockClassName=""
      videoClassName="mt-[3rem]"
      footnote={null}
    />
  ),
  // faq (/lms/features/spaces #6): 1-line heading, 5 items
  Faq: () => <Faq heading="Frequently asked questions" items={FAQ_ITEMS} />,
  // autotabs-cta (/lms/features/spaces #7): small header + image slides with a button
  KikiTabs: () => (
    <KikiTabs
      media="image"
      tabs={IMAGE_TABS}
      className="pb-[2rem] pt-[5rem]"
      header={
        <div className="padding-global">
          <div className="container-medium">
            <div className="flex max-w-[28rem] flex-col items-start gap-[1rem]">
              <h2 className="mb-[1.25rem] mt-[0.25rem] text-[1.5rem] leading-[1.725rem] text-ink">
                Explore more of the features that teams use every single day
              </h2>
              <Button variant="primary" to="/lms/features">
                See all the features →
              </Button>
            </div>
            <div className="pt-[2rem]" />
          </div>
        </div>
      }
    />
  ),
  // results (/lms #12): subtitle, 4 cards with logo placeholders, no testimonial
  Results: () => (
    <div className="padding-global">
      <Results
        heading={
          <>
            What learning can <em className="italic">really achieve</em>
          </>
        }
        headingClassName="max-w-[42rem]"
        subtitle="Strong results follow when people have a single place to learn, share and grow, and leaders can see it working."
        cards={['1.5x', '40%', '3x', '92%'].map((stat, i) => ({
          stat,
          brand: `Customer ${['one', 'two', 'three', 'four'][i]}`,
          rest: 'brought new starters up to speed faster than ever before with short guided journeys.',
          logo: null,
        }))}
        testimonial={null}
        cta={{ label: 'Book a demo now →', to: '/lms/demo-platform' }}
      />
    </div>
  ),
  // highlight-slider (/lms/features #8): eyebrow, 1-line heading, no button, 32px spacer
  CaseStudyCarousel: () => (
    <CaseStudyCarousel
      eyebrow="Results"
      heading="Proven learning outcomes"
      cta={null}
      intro="More than five hundred teams use Nimbus to build skills, share knowledge and keep their people learning every single week."
      spacerClassName="h-[2rem]"
      slides={[0, 1, 2, 3, 4].map((i) => ({
        text: `Customer ${['one', 'two', 'three', 'four', 'five'][i]} made everyday learning part of every shift`,
        stats: [
          ['75%', 'of staff active every month'],
          ['3x', 'more courses completed'],
        ],
        image: null,
        logo: null,
      }))}
    />
  ),
  // related-3col-slider (/case-study/customer-1 #1): centred 1-line header, case cards, 96/80 padding
  EnterpriseSlider: () => (
    <EnterpriseSlider
      variant="case"
      className="overflow-hidden pb-[5rem] pt-[6rem] xs:pb-0"
      header={
        <div className="flex flex-col items-center">
          <h2 className="heading-h2">More customer stories</h2>
        </div>
      }
      headerSpacerClassName="pt-[5rem] xs:pt-[3rem]"
      slides={[1, 2, 3, 4, 5, 6].map((n) => ({
        logo: null,
        text: `Customer ${['one', 'two', 'three', 'four', 'five', 'six'][n - 1]} lifts course completion across every one of its sites in a single year`,
      }))}
    />
  ),
}

// Header chip primitive shown on its own for reference.
SECTIONS.Eyebrow = () => (
  <div className="padding-global py-[2rem]">
    <div className="container-medium flex gap-[2rem]">
      <Eyebrow>Results</Eyebrow>
      <Eyebrow chipClassName="bg-[#9335fe]">Included in every plan</Eyebrow>
    </div>
  </div>
)

export default function ReusePreview() {
  const only = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('only') : null
  const names = Object.keys(SECTIONS).filter((n) => !only || only.split(',').includes(n))
  return (
    <>
      {names.map((n) => {
        const S = SECTIONS[n]
        return (
          <div key={n} data-preview={n}>
            <S />
          </div>
        )
      })}
    </>
  )
}
