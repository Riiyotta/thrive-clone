import Placeholder from '../shared/Placeholder.jsx'
import {
  GLOBAL_HEADER_PAD,
  LEGACY_H2,
  LEGACY_PARA,
  LegacyButton,
  LegacyEyebrow,
  legacyVars,
} from './GlobalHeaderLegacy.jsx'

// grid-cards-legacy: legacy header + rows of hairline `.grid_card` cells (`.grid_section` cols 2/3/4).
// One component; the 5 usages differ only in header layout, frame hairlines and card kind:
//   'services-extra' /lms/professional-services #9: split header (H2 + para, cols-2) + 3 text cards
//                    + 2 text cards; frame top+sides (.component-3.no-border-bottom)
//   'people'         /lms/impact #4: centred H2 (no margin) with side hairlines, 3 + 2 text cards
//   'stats'          /lms/impact #6: left H2 (max 42rem) + 4 stat cards (2×2 grid at ≤479)
//   'awards'         /lms/impact #7: centred eyebrow + H2 + 4 badge (image) cards
//   'content'        /content #4: centred eyebrow + H2 + para + CTA (max 60rem) + 2 + 3 image cards
// Card: border T/B/L (R only on `.border-right` or ≤767), padding 2rem (≤991 1.5, ≤767 1.25, ≤479 1).
// text card row-gap 7.5rem (≤991 6, ≤767 5, ≤479 4); image card 3rem; stat/badge .75rem (≤991 2rem).
const T = (title, body) => ({ title, body })

const PRESETS = {
  'services-extra': {
    theme: 'green',
    frame: 'border border-b-0',
    header: {
      layout: 'split',
      heading: 'Additional Short-Term Support',
      body: 'When you need a little more help, our specialists can step in for a short project, from a fresh setup review to a full data migration, so your team keeps moving forward without the cost of extra hires or long, fixed contracts with outside agencies.',
    },
    rows: [
      { cols: 3, kind: 'text', cards: [
        T('Setup review', 'Refresh your configuration with a guided session that tidies audiences, automations and reports, so your platform keeps pace with how your business works today.'),
        T('Launch planning', 'Plan a brand new programme with our specialist team, from the very first brief and timeline through to the launch comms that get your learners genuinely excited to take part from day one.'),
        T('Content audit', 'Find out which courses earn their place, which need a refresh and where the gaps remain, with a clear and practical plan to improve your whole library.'),
      ] },
      { cols: 2, kind: 'text', cards: [
        T('Data review', 'Get a clear view of your learning data with a focused review that turns raw numbers into simple, useful insights your leaders can act on.'),
        { ...T('Switching identity or platforms', 'Changing systems does not need to slow anyone down. We plan and run the whole move with you so every learner keeps their history safe and sound.'), plain: true },
      ] },
    ],
  },
  people: {
    theme: 'pink',
    frame: '',
    cardEdge: true,
    header: { layout: 'center', heading: 'More hands for your learning', headingMargin: false, sides: true, borderBottom: false },
    rows: [
      { cols: 3, kind: 'text', cards: [
        T('Data Specialist', 'Help from a data team to shape dashboards, reports and the insight that proves your impact.'),
        T('Programme Lead', 'A dedicated lead to plan, launch and steer every stage of your learning programme.'),
        T('Design', 'Fresh creative assets to promote every learning campaign.'),
      ] },
      { cols: 2, kind: 'text', noTop: true, cards: [
        T('Campaign Lead', 'Support from our marketing experts to spread the word, build excitement and lift engagement across every team.'),
        T('Insight', 'Tailored analysis and automated reports built for your senior leaders.'),
      ] },
    ],
  },
  stats: {
    theme: 'pink',
    frame: 'border border-b-0',
    header: { layout: 'left', heading: 'Delivering real business results for every customer', maxW: 'max-w-[42rem]' },
    rows: [
      { cols: 4, kind: 'stat', cards: [
        { title: 'Customer one', stat: '32%', body: 'Rise in sales at stores taking part' },
        { title: 'Customer two', stat: '2x', body: 'More managers completing core training' },
        { title: 'Customer three', stat: '85%', body: 'Of new starters fully onboarded sooner' },
        { title: 'Customer four', stat: '40%', body: 'Fewer support tickets after launch' },
      ] },
    ],
  },
  awards: {
    theme: 'pink',
    frame: 'border-x',
    header: { layout: 'center', eyebrow: 'Awards', heading: 'Awards we have earned with customers' },
    rows: [{ cols: 4, kind: 'badge', noTop: true, cards: [{}, {}, {}, {}] }],
  },
  content: {
    theme: 'yellow',
    frame: 'border-x',
    cardEdge: true,
    header: {
      layout: 'center',
      wide: true,
      borderBottom: false,
      eyebrow: 'Full service',
      heading: 'Content planning and expert support',
      maxW: 'max-w-[28.2rem]',
      body: 'From topic mapping and pathway design to fresh requests and custom formats, our team helps you shape a library that fits every role.',
      cta: 'Learn more',
    },
    rows: [
      { cols: 2, kind: 'image', cards: [
        T('Topic mapping', 'You are never left to work it out alone. We map your roles to the right topics and build a clear plan that your teams can follow from day one onwards.'),
        T('Ready pathways', 'Need a starting point? We have built ready pathways for common roles that you can launch today.'),
      ] },
      { cols: 3, kind: 'image', cards: [
        T('Ask for a topic', 'Cannot find the topic you need? Ask our team and we will add it to the plan, then let you know as soon as it is ready.'),
        T('Fresh releases', 'New titles land every month, shaped by what our customers ask for and the skills their teams need most right now.'),
        T('Mixed media', 'Never dull. Our library mixes short video, interactive lessons, quick reads and printable guides so every learner finds a format that suits them.'),
      ] },
    ],
  },
}

const COLS = {
  2: 'grid grid-cols-2 mob:grid-cols-1',
  3: 'grid grid-cols-3 mob:grid-cols-1',
  4: 'grid grid-cols-4 mob:grid-cols-1',
}
const CARD_PAD = 'p-[2rem] tab:p-[1.5rem] mob:p-[1.25rem] xs:p-[1rem]'

function Card({ kind, card, last, noTop }) {
  const border = `border-solid border-[color:var(--lt-border)] ${noTop ? 'border-b border-l' : 'border-y border-l'} ${
    last ? 'border-r' : 'mob:border-r'
  }`
  if (kind === 'text') {
    return (
      <div className={`flex flex-1 flex-col justify-between gap-y-[7.5rem] text-ink ${CARD_PAD} ${border} tab:gap-y-[6rem] mob:gap-y-[5rem] xs:gap-y-[4rem]`}>
        <div className="flex items-center justify-start gap-[1rem]">
          <h3 className="m-0 text-[1.25rem] font-medium leading-[1.15] text-white xs:text-[1.125rem]">{card.title}</h3>
        </div>
        <div className={`${card.plain ? '' : 'mb-[1.25rem]'} text-[1rem] leading-[1.4] text-grey`}>{card.body}</div>
      </div>
    )
  }
  if (kind === 'stat') {
    return (
      <div className={`flex flex-1 flex-col justify-between gap-y-[0.75rem] ${CARD_PAD} ${border} tab:gap-y-[2rem]`}>
        <div className="flex items-center justify-start gap-[1rem]">
          <h3 className="mb-[1rem] text-[1.5rem] font-semibold leading-[1.15] text-white mob:text-[1.25rem]">{card.title}</h3>
        </div>
        <div className="font-['Source_Serif_4','Sourceserif_4_18_Pt',Georgia,serif] text-[4rem] font-semibold leading-[1.3] text-[color:var(--lt-brand)] mob:text-[3.5rem] xs:text-[2.5rem] xs:leading-none">
          {card.stat}
        </div>
        <p className="mb-[1.25rem] text-[1rem] leading-[1.4] text-grey">{card.body}</p>
      </div>
    )
  }
  if (kind === 'badge') {
    return (
      <div className={`flex flex-1 flex-col justify-between gap-y-[0.75rem] ${CARD_PAD} ${border} tab:gap-y-[2rem]`}>
        <Placeholder label="Award badge" tone={2} className="h-[5rem] w-full mob:h-[4rem]" labelClassName="xs:hidden" />
      </div>
    )
  }
  // image card
  return (
    <div className={`flex flex-1 flex-col justify-between gap-y-[3rem] ${CARD_PAD} ${border}`}>
      <div className="flex items-center justify-start gap-[1rem]">
        <div className="text-[1.5rem] font-semibold leading-[1.4] text-white mob:text-[1.25rem]">{card.title}</div>
      </div>
      <div className="flex flex-col gap-[1.5rem]">
        <Placeholder label="Card image 3:2" tone={2} className="aspect-[3/2] w-full" />
        <p className="mb-[1.25rem] text-[1rem] leading-[1.4] text-grey">{card.body}</p>
      </div>
    </div>
  )
}

function Header({ h }) {
  if (h.layout === 'split') {
    return (
      <div className="grid grid-cols-2 mob:grid-cols-1">
        <div className="flex w-full flex-wrap content-stretch items-start justify-between gap-[1.25rem] p-[2.5rem] tab:p-[1.5rem] mob:p-[1.25rem]">
          <div className="w-full pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]" />
          <div className="flex w-full flex-col items-start justify-between">
            <div className="flex flex-col items-start gap-[0.5rem]">
              <h2 className={LEGACY_H2}>{h.heading}</h2>
            </div>
            <p className={`${LEGACY_PARA} text-ink`}>{h.body}</p>
          </div>
          <div className="w-full pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]" />
        </div>
      </div>
    )
  }
  const center = h.layout === 'center'
  const borderB = h.borderBottom === false ? '' : 'border-b'
  return (
    <div
      className={`flex flex-col border-solid border-[color:var(--lt-border)] ${GLOBAL_HEADER_PAD} ${borderB} ${
        h.sides ? 'border-x' : ''
      } ${center ? 'items-center' : 'items-start'} ${h.wide ? 'mx-auto w-full max-w-[60rem]' : ''}`}
    >
      <div className={`flex w-full flex-col justify-between ${center ? 'items-center text-center' : 'items-start'}`}>
        <div className={`flex flex-col gap-[0.5rem] ${center ? 'items-center' : 'items-start'}`}>
          {h.eyebrow && <LegacyEyebrow>{h.eyebrow}</LegacyEyebrow>}
          <h2 className={`${h.headingMargin === false ? 'm-0 font-serif text-[4rem] font-normal leading-[1.1] text-ink' : LEGACY_H2} ${h.maxW || ''}`}>
            {h.heading}
          </h2>
        </div>
        {h.body && <p className={`${LEGACY_PARA} max-w-[42rem] text-grey`}>{h.body}</p>}
        {h.cta && (
          <div className="mt-[2rem] flex flex-wrap items-center justify-start gap-[1.5rem] xs:w-full xs:flex-col xs:items-stretch xs:gap-[1rem]">
            <LegacyButton href={h.ctaHref || '#'}>{h.cta}</LegacyButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default function GridCardsLegacy({ variant = 'people', ...props }) {
  const d = { ...PRESETS[variant], ...props }
  return (
    <section data-section="grid-cards-legacy" style={legacyVars(d.theme)}>
      <div className="padding-global">
        <div className="container-large">
          <div className={`flex flex-col border-solid border-[color:var(--lt-border)] ${d.frame}`}>
            <Header h={d.header} />
            {d.rows.map((row, r) => (
              <div
                key={r}
                className={
                  row.kind === 'stat'
                    ? 'flex justify-center xs:grid xs:grid-cols-2 xs:gap-[16px]'
                    : row.kind === 'badge'
                      ? 'flex justify-center'
                      : COLS[row.cols]
                }
              >
                {row.cards.map((card, i) => (
                  <Card key={i} kind={row.kind} card={card} noTop={row.noTop} last={!!d.cardEdge && i === row.cards.length - 1} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
