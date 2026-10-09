import Placeholder from '../shared/Placeholder.jsx'

// feature-bento: /lms `.section_feature-bento`. Split header (H2 left, grey paragraph right, bottom-aligned)
// then a 3-col bento (`.bento_row`: gap .75rem; large cards span 2): large, small, small, large.
// Each card: #131313, radius 1rem, min-h 25rem (20rem <=479), image layer under a 50% black wash and a
// #131313 bottom fade (57% -> 70%), copy pinned bottom. Hover: `.button-link` gap .75rem -> 1rem (all .25s ease).
// <=991: 2 cols; <=767: 1 col, gap 1.5rem.

function Arrow() {
  return (
    <svg className="w-[8px] shrink-0" style={{ aspectRatio: '5.1 / 8.43' }} viewBox="0 0 6 10" fill="none" aria-hidden>
      <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ButtonLink({ href = '#', children }) {
  return (
    <div className="flex flex-wrap items-center justify-start gap-[1.5rem] mob:gap-[2rem]">
      <a
        href={href}
        className="mt-[0.25rem] flex items-center gap-[0.75rem] self-start pr-[1.5rem] text-[1rem] font-semibold leading-[1.4rem] text-ink no-underline transition-all duration-[250ms] ease-[ease] hover:gap-[1rem]"
      >
        <div>{children}</div>
        <Arrow />
      </a>
    </div>
  )
}

const CARDS = [
  { size: 'large', lead: 'Connections.', body: 'Link your HR, chat and calendar tools so learning lands where your people already spend the day.', cta: 'Browse every connection', href: '/lms/integrations' },
  { size: 'small', lead: 'Privacy & protection', body: 'Certified, audited and encrypted so your data stays safe at every step of the way.', cta: 'Read about trust', href: '#', fit: 'contain', offset: true },
  { size: 'small', lead: 'Worldwide help.', body: 'Sixty languages, one local team.', cta: 'Explore worldwide help', href: '/lms/enterprise' },
  { size: 'large', lead: 'Expert services', body: 'Setup, ', links: ['Moving', 'Branding', 'Training'], cta: 'Meet our expert services team', href: '/lms/professional-services' },
]

function Card({ c }) {
  const large = c.size === 'large'
  return (
    <div
      className={`relative flex min-h-[25rem] flex-col overflow-clip rounded-panel bg-surface-2 p-[1.5rem] tab:p-[1rem] mob:p-[1.5rem] mob:text-[1rem] mob:leading-[1.4rem] xs:min-h-[20rem] ${
        large ? 'col-span-2 tab:col-span-2 mob:col-span-1' : 'tab:min-h-[20rem]'
      }`}
    >
      <div className="absolute inset-0 z-0 overflow-clip bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))]">
        <Placeholder label="Feature image" tone={3} className="absolute inset-0 h-full w-full opacity-60" />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(19,19,19,0)_57%,#131313_70%)]" />
      </div>
      <div className="relative flex flex-1 flex-col justify-end">
        <div className={`max-w-[32rem] [text-wrap:pretty] ${c.offset ? 'pt-[2rem]' : ''}`}>
          <div className={`text-grey ${c.offset ? 'mt-[4rem] pt-[2rem]' : ''}`}>
            {c.links ? (
              <>
                <strong className="font-medium text-ink">{c.lead}</strong> {c.body}
                {c.links.map((l, i) => (
                  <span key={l}>
                    <a href="#" className="text-ink underline">
                      {l}
                    </a>
                    {i < c.links.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </>
            ) : (
              <>
                <span className="text-ink">{c.lead}</span> {c.body}
              </>
            )}
            <div className="pt-[1rem]" />
            <ButtonLink href={c.href}>{c.cta}</ButtonLink>
          </div>
        </div>
      </div>
    </div>
  )
}

const DEFAULTS = {
  heading: 'A cloud learning platform built to keep up with you',
  intro: 'Nimbus helps fast-moving teams get more from learning than most',
  introLink: 'hosted learning tools',
  introRest: 'ever could, with room to grow as your people and goals change.',
  cards: CARDS,
}

export default function FeatureBento(props) {
  const p = { ...DEFAULTS, ...props }
  return (
    <section data-section="feature-bento">
      <div className="padding-global">
        <div className="container-medium">
          <div className="py-[5rem] tab:py-[4rem] mob:py-[3rem]">
            <div className="flex items-end justify-between gap-[3.75rem] [text-wrap:pretty] tab:flex-col tab:items-start tab:gap-[2rem] xs:gap-[1.5rem]">
              <div className="flex max-w-[36rem] flex-col items-start gap-[1rem]">
                <h2 className="heading-h2">{p.heading}</h2>
              </div>
              <div className="max-w-[28rem]">
                <p className="text-para text-grey [text-wrap:pretty]">
                  {p.intro}{' '}
                  <a href="#" className="text-ink underline">
                    {p.introLink}
                  </a>{' '}
                  {p.introRest}
                </p>
              </div>
            </div>
            <div className="mt-[3rem] grid grid-cols-3 gap-[0.75rem] tab:grid-cols-2 mob:grid-cols-1 mob:gap-[1.5rem]">
              {p.cards.map((c, i) => (
                <Card key={i} c={c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
