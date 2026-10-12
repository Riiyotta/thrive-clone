import Button from '../shared/Button.jsx'

// `marquee` (.section_wowmarquee). Used by /lms/small-business (variant "header": centred
// header + 3 white rows + 2 buttons) and /mentoring (variant "plain": 2 grey rows, x4 sections).
// Motion is the original's CSS embed verbatim: each track holds the content twice and runs
// translateX(0 -> -50%) (`.is-reversed`: -50% -> 0) over 30s linear infinite. Speed therefore
// depends on the row length (e.g. ~111px/s on small-business, ~77px/s on mentoring at 1440).
// The wrapper has the site-wide edge fade mask (transparent 0 -> black 15% / 85% -> transparent).

const KEYFRAMES = `
@keyframes nimbusMarqueeScroll { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
@keyframes nimbusMarqueeScrollReverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }
`

// Item lists keep the original's character lengths so each track (and so the px/s speed) matches.
const SB_ITEMS = [
  'Lifting safely', 'Asking the best questions', 'Small injuries', 'Building presence and credibility', 'Earning rapport',
  'Understanding Data Privacy and Security', 'Emotional awareness 101', 'Giving and taking on feedback',
  'Understanding Data Privacy and Security', 'Fraud and anti-bribery', 'Dignity at work',
]
const MENTOR_A = [
  'Position & perspective', 'Inclusive management', 'Recognising bias', 'Advocacy', 'Growing community', 'Inclusion',
  'Collective culture', 'Inclusive structures', 'Growth-minded coaching', 'Team belonging', 'Cultural awareness',
]
const MENTOR_B = [
  'Understanding values', 'Advantage & disadvantage', 'Listening & growing', 'Global working styles', 'Leading global teams',
  'Language choices', 'Talking well across cultures', 'Inclusive language', 'After-incident review', 'Noticing microaggressions',
]
const MENTOR_C = [
  'Building lasting self-confidence', 'Finding your voice', 'Defining your direction', 'Learning from real experiences',
  'Showing up with presence', 'Growing influence at work', 'Nurturing your contacts', 'Core skills', 'Responding to exclusion',
  'Women in leadership', 'Self-trust',
]
const MENTOR_D = [
  'Building executive presence', 'Problem framing', 'Handling pressure and stress', 'Showing your impact', 'Personal story',
  'Shaping your leadership style', 'Growing self-awareness', 'Speaking with real authority', 'Making better decisions',
  'Learning fast, failing well',
]

// /mentoring has four marquee sections (`set` 1-4); rows alternate direction as measured.
const SETS = {
  1: [{ items: MENTOR_A, reverse: false }, { items: MENTOR_B, reverse: true }],
  2: [{ items: MENTOR_B, reverse: true }, { items: MENTOR_A, reverse: false }],
  3: [{ items: MENTOR_C, reverse: false }, { items: MENTOR_D, reverse: true }],
  4: [{ items: MENTOR_D, reverse: true }, { items: MENTOR_C, reverse: false }],
}

const DEFAULTS = {
  header: {
    rows: [
      { items: SB_ITEMS, reverse: false },
      { items: SB_ITEMS, reverse: true },
      { items: SB_ITEMS, reverse: false },
    ],
    tone: 'white',
  },
  plain: { rows: SETS[1], tone: 'grey' },
}

function Row({ items, reverse, tone }) {
  const content = (hidden) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center justify-start gap-[1rem]">
      {items.map((t, i) => (
        <div
          key={i}
          className={`shrink-0 whitespace-nowrap rounded-card bg-surface-1 p-[1.5rem] text-center text-body xs:text-body-xs ${
            tone === 'white' ? 'text-ink' : 'text-grey'
          }`}
        >
          {t}
        </div>
      ))}
    </div>
  )
  return (
    <div
      data-marquee-row
      className="relative flex w-full gap-[1rem] overflow-hidden"
      style={{
        maskImage: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, #000 15%, #000 85%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, #000 15%, #000 85%, rgba(0,0,0,0) 100%)',
      }}
    >
      <div
        data-marquee-track
        className="flex w-max gap-[1rem]"
        style={{ animation: `${reverse ? 'nimbusMarqueeScrollReverse' : 'nimbusMarqueeScroll'} 30s linear infinite` }}
      >
        {content(false)}
        {content(true)}
      </div>
    </div>
  )
}

export default function Marquee({
  variant = 'plain',
  set = 1,
  rows,
  tone,
  title = 'Over 900 award-winning learning courses included',
  paragraph = (
    <>
      From data privacy and compliance training to leadership and communication, every Nimbus Go plan includes a full library
      of expert-built courses from <a href="#" className="inline-link">Nimbus Library</a> for small business teams.
    </>
  ),
  buttons = [
    { label: 'Book your demo', variant: 'primary', href: '/lms/demo-platform' },
    { label: 'Explore Nimbus Library', variant: 'dark', href: '/content' },
  ],
  // optional ('header' variant): spacer between the last row and the buttons; default unchanged
  afterRowsClassName = 'pt-[3rem]',
}) {
  const d = DEFAULTS[variant] || DEFAULTS.plain
  const rws = rows || (variant === 'plain' ? SETS[set] || SETS[1] : d.rows)
  const tn = tone || d.tone
  const rowList = rws.map((r, i) => (
    <div key={i}>
      {i > 0 && <div className="w-full pt-[1rem]" />}
      <Row {...r} tone={tn} />
    </div>
  ))

  if (variant === 'header') {
    return (
      <section data-section="marquee" data-variant="header">
        <style>{KEYFRAMES}</style>
        <div className="pb-[4rem] pt-[2rem]">
          <div className="padding-global">
            <div className="container-large">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex max-w-[36rem] flex-col items-center gap-[1.5rem]">
                  <h2 className="mt-[0.25rem] font-serif text-[3.5rem] font-normal leading-[1.15] text-ink tab:text-[3rem] mob:text-[2.5rem] xs:p-[0.5rem] xs:text-[2rem]">
                    {title}
                  </h2>
                  <div className="w-full max-w-[28rem]">
                    <p className="mb-[1.25rem] text-center text-para text-grey">{paragraph}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-[3rem]" />
            {rowList}
            <div className={afterRowsClassName} />
            <div className="flex flex-wrap items-center justify-center gap-[1.5rem] xs:gap-[2rem]">
              {buttons.map((b, i) => (
                <Button key={i} variant={b.variant} href={b.href}>
                  {b.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section data-section="marquee" data-variant="plain">
      <style>{KEYFRAMES}</style>
      <div className="padding-global">{rowList}</div>
    </section>
  )
}
