import Placeholder from '../shared/Placeholder.jsx'

// topics-grid, content-catalogue middle block, legacy content ("yellow") theme. Two variants:
//  'topics' (/content/topics): centred serif H2 header + 3-col grid of 13 topic cards.
//  'suites' (/content/sector-suites): split header (H2 + paragraph | right-aligned yellow button)
//  + 3-col grid of 6 sector cards.
// Card = hairline cell (left + bottom rules, last cell also right) with title, grey copy and a 3:2 image;
// hover reveals the dotted texture (instant, as on the original). 1 col ≤767.
const THEME = { '--th-border': '#2d2919', '--th-brand': '#eee96d', '--th-btn-hover': '#edcf00' }
const TEXTURE = 'hover:bg-[radial-gradient(rgba(238,233,109,0.09)_1px,transparent_1.3px)] hover:bg-[length:0.375rem_0.375rem]'

// Placeholder copy trimmed to the per-card word counts of the live CMS list (so card heights match).
const BASE =
  'Covering everything from building confident habits to leading change, these resources help people handle the moments that shape their working week, with practical tips they can use straight away, short videos that fit between meetings, guided activities for teams, reflection prompts for quieter moments and clear next steps that turn new ideas into lasting everyday habits across the whole organisation.'
const words = (n, lead = '') => {
  const w = (lead ? lead + ' ' + BASE : BASE).split(' ')
  return w.slice(0, n).join(' ').replace(/[,.]$/, '') + '.'
}
const TOPICS = [
  ['The working world', 34], ['Employee experience', 46], ['Leading and managing people', 31], ['Belonging', 40], ['Customer care', 31],
  ['Communication and influence', 27], ['Mental health and wellbeing', 40], ['Safety at work', 51], ['Cyber and information security', 43],
  ['Compliance', 26], ['Digital skills', 39], ['Workplace skills', 34], ['Business skills', 37],
].map(([title, n]) => ({ title, text: words(n), href: '#' }))
const SUITES = [
  ['Public sector', 24], ['Professional services', 17], ['Retail', 25], ['Food and drink production', 18], ['Financial services', 20], ['Hospitality', 17],
].map(([title, n]) => ({ title, text: words(n, `Our ${title.toLowerCase()} collection helps teams meet their duties with confidence.`), href: '#' }))

const DEFAULTS = {
  topics: { heading: 'Discover our core learning library', items: TOPICS },
  suites: {
    heading: 'Made with the experts',
    text: 'Shaped with insight from more than 500 learning leaders and sector specialists, every suite brings together the topics, formats and compliance essentials that matter most to teams working in each industry today.',
    button: { label: 'Book a content walkthrough', href: '#' },
    items: SUITES,
  },
}

function Card({ it }) {
  return (
    <div className="h-full last:border-r last:border-[var(--th-border)]">
      <a
        href={it.href}
        className={`flex h-full flex-col justify-between gap-y-[3rem] border-b border-l border-[var(--th-border)] p-[2rem] text-ink no-underline tab:gap-y-[2rem] tab:p-[1.5rem] mob:p-[1.25rem] xs:p-[1rem] ${TEXTURE}`}
      >
        <div className="flex flex-col items-start justify-start gap-[1rem] tab:gap-[1.25rem] xs:justify-between">
          <h3 className="text-[1.25rem] font-medium leading-[1.15] text-white xs:text-[1.125rem]">{it.title}</h3>
          <p className="mb-[1.25rem] text-[1rem] leading-[1.4] text-grey">{it.text}</p>
        </div>
        <Placeholder label="Topic image 3:2" src={it.image} className="aspect-[3/2] w-full" />
      </a>
    </div>
  )
}

export default function TopicsGrid({ variant = 'topics', heading, text, button, items }) {
  const d = DEFAULTS[variant] || DEFAULTS.topics
  heading = heading ?? d.heading
  text = text ?? d.text
  button = button ?? d.button
  items = items ?? d.items
  const grid = (
    <div className="grid w-full grid-cols-3 tab:grid-cols-3 mob:grid-cols-1">
      {items.map((it, i) => (
        <Card key={i} it={it} />
      ))}
    </div>
  )
  return (
    <section data-section="topics-grid" data-variant={variant} style={THEME}>
      <div className="padding-global">
        {variant === 'suites' ? (
          <div className="container-large">
            <div className="relative flex flex-col border-b border-l border-[var(--th-border)]">
              <div className="grid grid-cols-2 mob:grid-cols-1">
                <div className="flex w-full flex-wrap items-start justify-between gap-[1.25rem] p-[2.5rem] tab:p-[1.5rem] mob:p-[1.25rem]">
                  <div className="pt-[3rem] tab:pt-[2.5rem] mob:pt-[1.5rem]" />
                  <div className="flex w-full flex-col items-start justify-between leading-[1.4]">
                    <div className="flex flex-col items-start justify-start gap-[0.5rem]">
                      <h2 className="mb-[1.25rem] mt-[0.25rem] font-serif text-[4rem] font-normal leading-[1.1]">{heading}</h2>
                    </div>
                    <p className="mb-[1.25rem] mt-[1rem] text-body xs:text-body-xs">{text}</p>
                  </div>
                </div>
                <div className="flex w-full flex-col items-end justify-start self-end p-[2.5rem] tab:p-[1.5rem] mob:self-auto mob:p-[1.25rem] xs:p-[1rem]">
                  <a
                    href={button.href}
                    className="rounded-[200vw] border border-[var(--th-brand)] bg-[var(--th-brand)] px-[1.25rem] py-[0.75rem] text-center text-[1.125rem] font-medium leading-none text-black no-underline transition-[border-radius] duration-300 ease-in-out hover:bg-[var(--th-btn-hover)] tab:px-[1rem] tab:py-[0.5rem] tab:text-[1rem] xs:block xs:self-stretch"
                  >
                    {button.label}
                  </a>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col">{grid}</div>
          </div>
        ) : (
          <>
            <div className="container-large">
              <div className="relative flex flex-col border-l border-r border-[var(--th-border)]">
                <div className="flex flex-col items-center justify-start border-b border-[var(--th-border)] px-[2.5rem] pb-[4rem] pt-[5.5rem] [text-wrap:pretty] tab:px-[2rem] tab:pt-[4rem] mob:px-[1.5rem] xs:px-[1rem]">
                  <div className="flex w-full flex-col items-center justify-between text-center leading-[1.4]">
                    <div className="flex flex-col items-center justify-start gap-[0.5rem]">
                      <h2 className="mb-[1.25rem] mt-[0.25rem] font-serif text-[4rem] font-normal leading-[1.1]">{heading}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-large">
              <div className="relative flex flex-col border-l border-r border-[var(--th-border)]">{grid}</div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
