import Button from '../shared/Button.jsx'
import Placeholder from '../shared/Placeholder.jsx'

// spring-grid: /lms/spring-release release-note blocks (6 instances, light #fafefe or page-black).
// `.section > .container-large > .section_center` header (optional eyebrow tag, H2 with an italic word,
// 18/25.2 copy, CTA) -> optional media -> 4-col feature grid (`.wowgrid-4col` gap 2.5rem, or `.wowgrid-3col`
// variant: 4 cols, col-gap 3.8rem) -> optional big quote. Spacers 4rem / 3rem <=991 / 2rem <=767.
// Grid: 2 cols <=991; stacked <=479 (4col) or <=767 (3col). Props cover all six instances; defaults = block 1.

function Heading({ parts, dark }) {
  const [a, em, b] = parts
  return (
    <h2 className={`heading-h2 font-medium ${dark ? 'text-ink' : 'text-[#000a06]'}`}>
      {a}
      {em && <em className="italic">{em}</em>}
      {b}
    </h2>
  )
}

function Quote({ q, dark }) {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-[3.75rem] mob:p-[1.5rem] xs:pb-0">
      <div className="flex max-w-[60rem] flex-col items-center justify-center gap-[2rem]">
        <p className={`mb-[1.25rem] text-[2rem] font-medium leading-[1.2] tab:text-[1.75rem] mob:text-[1.5rem] ${dark ? 'text-ink' : 'text-[#000a06]'}`}>{q.text}</p>
        <div className="flex items-center justify-start gap-[0.75rem]">
          <div className="flex w-[3rem] items-center justify-start">
            <Placeholder label="" tone={3} className="h-[3rem] min-h-[3rem] w-[3rem] min-w-[3rem] rounded-[6px_0] wide:rounded-avatar" />
          </div>
          <div className="flex flex-col items-start">
            <div className={`text-para ${dark ? 'text-ink' : 'text-[#000a06]'} xs:text-body-xs`}>{q.name}</div>
            <div className="text-body text-grey mob:text-small">{q.role}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Grid({ items, dark, wide }) {
  return (
    <div
      className={`grid w-full grid-cols-4 tab:grid-cols-2 ${
        wide ? 'gap-x-[3.8rem] gap-y-[2.5rem] mob:grid-cols-1' : 'gap-[2.5rem] xs:flex xs:flex-col'
      }`}
    >
      {items.map((it) => (
        <div key={it.title} className="flex flex-col gap-[0.75rem]">
          <div>
            <strong className={`text-para font-bold ${dark ? 'text-ink' : 'text-[#000a06]'}`}>{it.title}</strong>
          </div>
          <p className={`mb-[1.25rem] text-[1rem] leading-[1.4rem] ${dark ? 'text-ink' : 'text-page'}`}>{it.body}</p>
        </div>
      ))}
    </div>
  )
}

const Spacer = () => <div className="flex w-full pt-[4rem] tab:pt-[3rem] mob:pt-[2rem]" />

const DEFAULTS = {
  theme: 'light',
  eyebrow: null,
  heading: ['Nova. Now on ', 'autopilot.', ''],
  body: 'Five new AI roles that plan, build, coach, review and report across your learning, working quietly alongside your team so admins can focus on the people instead of the busywork.',
  cta: { label: 'Meet Nova', href: '/nova' },
  media: { type: 'strip' },
  inset: false,
  wide: false,
  items: [
    { title: 'Review', body: 'Nova reviews completion trends across every team and flags the courses that need attention before deadlines start to slip.' },
    { title: 'Build', body: 'Nova turns policies, notes and slide decks into short lessons with quizzes, ready for an admin to check and publish.' },
    { title: 'Plan', body: 'Nova suggests the next step for each person based on their role, goals and the skills their team is building.' },
    { title: 'Guide', body: 'Nova follows up after each course with friendly nudges and short refreshers so the learning really sticks.' },
  ],
  quote: {
    text: '“We treat Nova like a new colleague on the team. It takes on the repetitive work that used to fill our week, spots gaps before we do and gives our people answers in seconds. That frees our small team to spend its time on coaching, culture and the projects that actually move the whole business forward.”',
    name: 'Jordan Ellis',
    role: 'Head of Digital Learning, Northwind',
  },
}

export default function SpringGrid(props) {
  const p = { ...DEFAULTS, ...props }
  const dark = p.theme === 'dark'
  const media = p.media
  const mediaEl =
    media?.type === 'image' ? (
      <Placeholder
        label="Product screenshot"
        tone={dark ? 2 : 3}
        className={`w-full ${media.rounded ? 'rounded-[1.5rem]' : 'rounded-media'}`}
        style={{ maxWidth: media.width || '100%', aspectRatio: media.aspect || '1440 / 873', marginBottom: media.mb || 0 }}
      />
    ) : null
  const body = (
    <>
      {media?.type === 'image' && media.placement !== 'bottom' && (
        <>
          <Spacer />
          {mediaEl}
        </>
      )}
      {(media?.type !== 'image' || media.placement === 'bottom') && <Spacer />}
      <Grid items={p.items} dark={dark} wide={p.wide} />
      {media?.type === 'image' && media.placement === 'bottom' && (
        <>
          <Spacer />
          {mediaEl}
        </>
      )}
      {p.quote && (
        <>
          <Spacer />
          <Quote q={p.quote} dark={dark} />
        </>
      )}
      <Spacer />
    </>
  )
  return (
    <section data-section="spring-grid" className={dark ? '' : 'bg-[#fafefe]'}>
      <div className="padding-global">
        <div className="container-large">
          <div className="relative z-[1] flex w-full flex-col items-center justify-center px-[2.5rem] py-[4.5rem] tab:py-[3.5rem] mob:gap-[1rem] mob:py-[2.5rem] xs:px-[1rem]">
            <div className="flex flex-col items-center text-center">
              <div className="flex w-full max-w-[36rem] flex-col items-center gap-[1.5rem]">
                {p.eyebrow && (
                  <div className="mb-[0.75rem] rounded-pill border border-[#01584b] bg-[#00251e] px-[0.75rem] py-[0.325rem] text-small font-medium text-[#1ee9b6] tab:px-[0.625rem] tab:py-[0.425rem] tab:text-[0.725rem]">
                    {p.eyebrow}
                  </div>
                )}
                <Heading parts={p.heading} dark={dark} />
                <div className={`text-body xs:text-body-xs ${dark ? 'text-ink' : 'text-[#000a06]'}`}>{p.body}</div>
                {p.cta && (
                  <div className="flex items-center justify-center gap-[1rem]">
                    <Button variant={dark ? 'primary' : 'dark'} to={p.cta.href} stretch={false}>
                      {p.cta.label}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {p.inset && body}
          </div>
          {media?.type === 'strip' && <Placeholder label="Looping video" tone={3} className="h-[150px] w-full" />}
          {!p.inset && body}
        </div>
      </div>
    </section>
  )
}
