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
  { heading: 'Leadership growth for women', lead: 'Helping women lead with confidence, clarity and real purpose.', body: prose(282, 90), leadNarrow: true },
  { heading: 'High-Potential Talent Development', lead: 'Growing the leaders of tomorrow.', body: prose(287, 120), leadNarrow: true },
]

// .section_wowlogos on /mentoring: padding-section-small 48/48 (32 ≤767), container-small, no heading,
// 912px-wide row of six 112px logos, gap 48; ≤767 wraps to 2 per row in 64px rows (gap 32).
const LOGOS = Array.from({ length: 6 }, () => ({ text: 'Logo', aspect: 'aspect-[112/26]' }))

const INCLUDED = [
  { title: 'Mentor packs', text: prose(106, 150), size: 'medium', media: 'Programme visual' },
  { title: 'Mentee toolkits', text: prose(120, 170), size: 'medium', media: 'Programme visual' },
  { title: 'Habit and reflection prompts', text: prose(87, 190), size: 'medium', media: 'Programme visual' },
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
          wrapClassName="min-h-[4rem] w-[57rem] max-w-none mob:w-full mob:flex-wrap mob:justify-around mob:gap-[2rem]"
          logoClassName="w-[7rem] mob:h-[4rem]"
          logos={LOGOS}
          trailingSpacer={false}
        />
      </Sec>
      {PAIRS.map((p, i) => (
        <Fragment key={i}>
          <Sec id="wow2col"><Wow2col {...p} /></Sec>
          <Sec id="marquee"><Marquee variant="plain" set={i + 1} /></Sec>
        </Fragment>
      ))}
      <Sec id="wowbento"><WowBento variant="included" cards={INCLUDED} /></Sec>
      <Sec id="faq"><Faq heading="Frequently asked questions" items={MENTORING_FAQ} /></Sec>
    </>
  )
}
