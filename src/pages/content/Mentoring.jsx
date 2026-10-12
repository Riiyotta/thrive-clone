import { Fragment } from 'react'
import Sec from './Sec.jsx'
import WowContentHero from '../../components/sections/WowContentHero.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import Wow2col from '../../components/sections/Wow2col.jsx'
import Marquee from '../../components/sections/Marquee.jsx'
import WowBento from '../../components/sections/WowBento.jsx'
import Faq from '../../components/Faq.jsx'
import { MENTORING_FAQ } from './faqData.js'
import { prose } from './filler.js'

// /mentoring (page-mentoring, fixed 16px root): hero, logos, four wow2col + marquee pairs, bento, FAQ.
// Copy lengths per block follow the original (heading/lead/paragraph characters) so line counts match.
const PAIRS = [
  { heading: 'Mentoring that works', lead: prose(216, 3), body: prose(131, 40), leadNarrow: false },
  { heading: 'Lead inclusively', lead: 'Where belonging becomes everyday habit, not policy.', body: prose(229, 60), leadNarrow: true },
  { heading: 'Leadership growth for women', lead: 'Helping women lead with confidence, clarity and real purpose.', body: prose(287, 90), leadNarrow: true },
  { heading: 'High-Potential Talent Development', lead: 'Growing the leaders of tomorrow.', body: prose(287, 120), leadNarrow: true },
]

// .section_wowlogos on /mentoring: padding-section-small 48/48 (32 ≤767), container-small, no heading,
// 912px-wide row of six 112px logos, gap 48; ≤991 wraps (centred, 64px rows, gaps 32/48); ≤767 2 per row (gap 32).
const LOGOS = Array.from({ length: 6 }, () => ({ text: 'Logo', aspect: 'aspect-[112/26]' }))

// Live cards carry an empty block after the image (one extra 0.5rem gap), an image at its natural 644:732
// ratio ≤991 and an 18px title ≤767.
const CARD_LIVE = { size: 'medium', media: 'Programme visual', spacer: true, mediaClassName: 'h-full min-h-[22rem] tab:aspect-[644/732] tab:h-auto tab:min-h-0', titleClassName: 'text-[1.25rem] mob:text-[1.125rem]' }
const INCLUDED = [
  { title: 'Mentor packs', text: prose(106, 150), ...CARD_LIVE },
  { title: 'Mentee toolkits', text: prose(120, 170), ...CARD_LIVE },
  { title: 'Habit and reflection prompts', text: prose(87, 190), ...CARD_LIVE },
]

export default function Mentoring() {
  return (
    <>
      <Sec id="wowcontent-hero"><WowContentHero variant="mentoring" /></Sec>
      <Sec id="logos">
        <LogoStrip
          heading={null}
          container="small"
          paddingClassName="py-[3rem] mob:py-[2rem]"
          wrapClassName="min-h-[4rem] w-[57rem] max-w-none tab:w-full tab:flex-wrap tab:justify-center tab:gap-x-[3rem] tab:gap-y-[2rem] mob:justify-around mob:gap-[2rem]"
          logoClassName="w-[7rem] tab:h-[4rem]"
          logos={LOGOS}
          trailingSpacer={false}
        />
      </Sec>
      {PAIRS.map((p, i) => (
        <Fragment key={i}>
          <Sec id="wow2col" className="overflow-x-clip"><Wow2col {...p} stackTab /></Sec>
          <Sec id="marquee"><Marquee variant="plain" set={i + 1} /></Sec>
        </Fragment>
      ))}
      <Sec id="wowbento"><WowBento variant="included" cards={INCLUDED} /></Sec>
      <Sec id="faq"><Faq heading="Frequently asked questions" items={MENTORING_FAQ} /></Sec>
    </>
  )
}
