import Placeholder from '../shared/Placeholder.jsx'
import { LEGACY_H2, LEGACY_PARA, LegacyButton, legacyVars } from './GlobalHeaderLegacy.jsx'

// grid-split-legacy: one hairline-framed `.grid_section` row split into a header cell (left,
// .padding-medium 2.5rem / ≤991 1.5rem / ≤767 1.25rem) and a companion cell (right).
//   'testimonial' /lms/professional-services #4: cols 1fr .6fr; H2 + grey para between 1rem
//                 spacers | quote card (italic quote, 40px avatar, name + role) bottom-aligned
//   'text'        /lms/professional-services #7: cols 1:1; H2 | grey 16px paragraph (.padding-regular)
//   'image'       /lms/impact #8: frame without top line, 16px grid gap; H3 28/30.8 + para + CTA
//                 (vertically centred) | 3:2 image (.padding-regular)
//   'suites'      /content/sector-suites #2: frame without top line; 3rem spacer + H2 + para |
//                 CTA bottom-right; followed by a 3-col list of 6 hairline link cards (H3 20/23 +
//                 grey text + 3:2 image), hover = theme pattern (approximated by bg-secondary).
// ≤767 every split stacks to one column.
const DEFAULTS = {
  testimonial: {
    theme: 'green',
    heading: 'Everything included with your Expert Services',
    body: 'Our Expert Services keep your platform running at its very best.',
    quote: '"The planning, support and guidance from the whole team were outstanding. They took real time to understand our goals and helped us shape a platform our people genuinely enjoy using every single working day."',
    name: 'Jordan Ellis',
    role: 'Learning Experience Platform Manager,',
    org: 'Customer one',
  },
  text: {
    theme: 'green',
    heading: 'Add Nimbus experts to your team',
    body: 'On top of the services above, you can add extra specialist time whenever you need it. Our consultants slot in alongside your team for as long as you need them, bringing hands-on platform skills, fresh ideas and a clear plan, so busy periods, big launches and new projects never stall.',
  },
  image: {
    theme: 'pink',
    heading: 'How Customer one proves the value of learning',
    body: 'Well-known retail brand Customer one used Nimbus to link learning to results, tracking how new skills on the shop floor lifted sales, cut staff turnover and gave every store manager a clear, simple view of progress across the whole team in every single region and store.',
    cta: 'Find out more',
  },
  suites: {
    theme: 'yellow',
    heading: 'Shaped by the experts',
    body: 'With input from hundreds of sector specialists, every suite is built around the real skills, rules and everyday pressures your teams face, so your people learn exactly what matters to them from the very start.',
    cta: 'Book a content demo',
    cards: [
      { title: 'Public Sector', body: 'Ready-made learning for public bodies, from data protection and safeguarding to leadership, built with sector experts to meet the standards your teams work to every day.' },
      { title: 'Healthcare', body: 'Clinical and non-clinical courses that help care teams stay safe, confident and compliant, with short formats designed to fit around busy shift patterns.' },
      { title: 'Retail', body: 'Bite-sized learning for store and head office teams, from customer service and product know-how to health and safety and the rules of the shop floor.' },
      { title: 'Hospitality', body: 'Front and back of house training covering food safety, guest experience and licensing, ready to roll out across every venue with minimal setup work.' },
      { title: 'Financial Services', body: 'Regulation-ready courses on conduct, risk, fraud and customer outcomes, kept current by specialists so your teams always learn the latest guidance.' },
      { title: 'Manufacturing', body: 'Practical safety and skills learning for site teams, with clear visuals and short modules that work just as well on the floor as at a desk.' },
    ],
  },
}

const LEFT_PAD = 'p-[2.5rem] tab:p-[1.5rem] mob:p-[1.25rem]'
const RIGHT_PAD = 'p-[2.5rem] tab:p-[2rem] mob:p-[1.5rem] xs:p-[1rem]'

// rightClassName (optional): extra classes on the CTA column of the 'suites' variant (e.g. 'xs:items-stretch'
// for the live full-width button ≤479). Default '' keeps the current layout.
// authorInfoClassName (optional, 'testimonial' variant): extra classes on the author name/role block; default ''.
export default function GridSplitLegacy({ variant = 'testimonial', rightClassName = '', authorInfoClassName = '', ...props }) {
  const d = { ...DEFAULTS[variant], ...props }
  const frame = variant === 'image' || variant === 'suites' ? 'border-x border-b' : 'border'

  let left
  let right
  if (variant === 'image') {
    left = (
      <div className={`flex w-full flex-wrap content-stretch items-start justify-between gap-[1.25rem] self-center ${LEFT_PAD}`}>
        <div className="flex w-full flex-col items-start justify-between">
          <div className="flex flex-col items-start gap-[0.5rem]">
            <h3 className="mb-[1rem] text-[1.75rem] font-normal leading-[1.1] text-ink mob:text-[1.5rem]">{d.heading}</h3>
          </div>
          <p className={`${LEGACY_PARA} text-ink`}>{d.body}</p>
          <div className="mt-[2rem] flex flex-wrap items-center gap-[1.5rem] xs:w-full xs:flex-col xs:items-stretch xs:gap-[1rem]">
            <LegacyButton>{d.cta}</LegacyButton>
          </div>
        </div>
      </div>
    )
    right = (
      <div className={`flex w-full flex-col ${RIGHT_PAD}`}>
        <Placeholder label="Story image 3:2" tone={2} className="aspect-[3/2] w-full" />
      </div>
    )
  } else {
    const spacer =
      variant === 'testimonial'
        ? 'w-full pt-[1rem]'
        : variant === 'suites'
          ? 'pt-[3rem] tab:pt-[2.5rem] mob:pt-[1.5rem]'
          : null
    left = (
      <div className={`flex w-full flex-wrap content-stretch items-start justify-between gap-[1.25rem] ${LEFT_PAD}`}>
        {spacer && <div className={spacer} />}
        <div className="flex w-full flex-col items-start justify-between">
          <div className="flex flex-col items-start gap-[0.5rem]">
            <h2 className={LEGACY_H2}>{d.heading}</h2>
          </div>
          {d.body && variant !== 'text' && (
            <p className={`${LEGACY_PARA} ${variant === 'testimonial' ? 'text-grey' : 'text-ink'}`}>{d.body}</p>
          )}
        </div>
        {variant === 'testimonial' && <div className={spacer} />}
      </div>
    )
    if (variant === 'testimonial') {
      right = (
        <div className="flex w-full flex-col items-end justify-start self-end">
          <div className="mb-[1rem] mt-[0.5rem] w-full rounded-card bg-[rgba(11,11,11,0.02)] p-[1rem]">
            <p className="mb-[0.75rem] text-body italic text-ink xs:text-body-xs">{d.quote}</p>
            <div className="flex items-center gap-[1rem] text-left mob:w-full mob:flex-col mob:items-start">
              <div className="min-h-[2.5rem] w-[2.5rem] min-w-[2.5rem] overflow-clip border border-solid border-black">
                <Placeholder label="" tone={3} className="aspect-square w-full rounded-[2.5rem]" />
              </div>
              <div className={authorInfoClassName}>
                <div className="text-[1rem] font-semibold leading-[1.4] text-ink">{d.name}</div>
                <div className="text-[1rem] leading-[1.4] text-ink">
                  {d.role}{' '}
                  <a href="#" className="text-ink underline">
                    {d.org}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (variant === 'text') {
      right = (
        <div className={`flex w-full flex-col ${RIGHT_PAD}`}>
          <p className="mb-[1.25rem] text-[1rem] leading-[1.4] text-grey">{d.body}</p>
        </div>
      )
    } else {
      right = (
        <div className={`flex w-full flex-col items-end justify-start self-end ${RIGHT_PAD} ${rightClassName}`}>
          <LegacyButton>{d.cta}</LegacyButton>
        </div>
      )
    }
  }

  const cols =
    variant === 'testimonial'
      ? 'grid-cols-[1fr_0.6fr] mob:grid-cols-1'
      : `grid-cols-2 mob:grid-cols-1 ${variant === 'image' ? 'gap-[16px]' : ''}`

  return (
    <section data-section="grid-split-legacy" style={legacyVars(d.theme)}>
      <div className="padding-global">
        <div className="container-large">
          <div className={`flex flex-col border-solid border-[color:var(--lt-border)] ${frame}`}>
            <div className={`grid w-full ${cols}`}>
              {left}
              {right}
            </div>
          </div>
          {variant === 'suites' && (
            <div className="flex flex-col">
              <div className="border-r border-solid border-[color:var(--lt-border)]">
                <div className="grid grid-cols-3 mob:grid-cols-1">
                  {d.cards.map((c) => (
                    <a
                      key={c.title}
                      href="#"
                      className="flex h-full flex-col items-stretch justify-between gap-y-[3rem] border-b border-l border-solid border-[color:var(--lt-border)] p-[2rem] text-ink no-underline hover:bg-[var(--lt-bg2)] mob:p-[1.25rem] xs:gap-y-[2rem] xs:p-[1rem]"
                    >
                      <div className="flex flex-col items-start justify-start gap-[1rem] tab:gap-[1.25rem]">
                        <h3 className="m-0 text-[1.25rem] font-medium leading-[1.15] text-white xs:text-[1.125rem]">{c.title}</h3>
                        <p className="mb-[1.25rem] text-[1rem] leading-[1.4] text-grey">{c.body}</p>
                      </div>
                      <Placeholder label="Suite image 3:2" tone={2} className="aspect-[3/2] w-full" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
