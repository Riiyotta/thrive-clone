import Button from './shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from './shared/Placeholder.jsx'

// §7 results cards + testimonial. Intentionally NOT wrapped in .padding-global
// (measured: edge-to-edge at 390).
const CARD_LOGOS = ['result-logo-1.png', 'result-logo-2.svg', 'result-logo-3.avif', 'result-logo-4.svg']
const HOME_CARDS = [
  { stat: '2.1x', brand: 'Northwind', rest: 'saw learners come back more than twice as often once every course lived in a single home.' },
  { stat: '18%', brand: 'Brightway', rest: 'cut early staff turnover after rolling out mentoring pairs for every new starter in their stores.' },
  { stat: '64%', brand: 'Kestrel Co', rest: 'of employees finished a skill journey within their first quarter, well ahead of the internal goal.' },
  { stat: '91%', brand: 'Harbor Foods', rest: 'completion on required training across sites, with reminders doing the chasing.' },
]

const HOME_CARD_DATA = HOME_CARDS.map((c, i) => ({ ...c, logo: `/assets/${CARD_LOGOS[i]}` }))

const HOME_TESTIMONIAL = {
  quote:
    '“People reach for it on their phones, on the shop floor and in the back office. It has quietly become the one home for learning, team news and training, and it feels like it belongs to the whole team.”',
  name: 'Jordan Ellis',
  role: 'Head of People Development,',
  company: 'Northwind',
  avatar: '/assets/testimonial-avatar.png',
}

/**
 * §7 results cards (+ optional testimonial and CTA). Defaults reproduce the homepage
 * (`.container-medium.ad-page`). Subpage variants: optional grey subtitle under the heading,
 * cards without logos or with a top label (company `is-square` cards), 3–4 cards, no testimonial,
 * different CTA.
 * @param {React.ReactNode} [props.heading] centred H2
 * @param {string} [props.headingClassName='max-w-[60rem]'] H2 width class
 * @param {React.ReactNode|null} [props.subtitle=null] grey centred paragraph under the heading
 * @param {Array<{stat: React.ReactNode, brand?: string, rest: React.ReactNode, logo?: string|null, label?: React.ReactNode}>} [props.cards]
 *   `logo` image src (null/omitted = no logo row unless `label`), `label` text shown top-left instead of a logo,
 *   `brand` underlined link before `rest`. Default: 4 homepage cards.
 * @param {string} [props.gridClassName='grid-cols-4 tab:grid-cols-2 xs:grid-cols-1'] card grid columns
 * @param {string} [props.cardClassName=''] extra card classes (e.g. 'aspect-square p-[1rem]')
 * @param {{quote: React.ReactNode, name: string, role: string, company?: string, avatar?: string}|null} [props.testimonial]
 *   quote block under the cards; null hides it
 * @param {{label: React.ReactNode, to?: string, variant?: string}|null} [props.cta] centred button; null hides it
 * @param {string} [props.className='container-medium mb-[2rem]'] outer wrapper classes
 * @param {string} [props.headerClassName='pb-[2.5rem] pt-[2.5rem]'] heading block padding (/lms/demo-platform: 'pt-[2rem]')
 * @param {string} [props.subtitleClassName='mb-[1.25rem] mt-[1.5rem] max-w-[42rem]'] subtitle spacing/width (/lms/corporate-lms: 'mb-[1.25rem] mt-0 max-w-[46rem]')
 * @param {string} [props.ctaClassName='pb-[4rem] pt-[1.5rem]'] CTA row spacing (/lms/demo-platform: 'mb-[1.5rem]')
 */
export default function Results({
  heading = 'Real teams, real numbers, and the outcomes that keep them here',
  headingClassName = 'max-w-[60rem]',
  subtitle = null,
  cards = HOME_CARD_DATA,
  gridClassName = 'grid-cols-4 tab:grid-cols-2 xs:grid-cols-1',
  cardClassName = '',
  testimonial = HOME_TESTIMONIAL,
  cta = { label: 'See Nimbus in action →', to: '/lms/demo-platform' },
  className = 'container-medium mb-[2rem]',
  headerClassName = 'pb-[2.5rem] pt-[2.5rem]',
  ctaClassName = 'pb-[4rem] pt-[1.5rem]',
  subtitleClassName = 'mb-[1.25rem] mt-[1.5rem] max-w-[42rem]',
}) {
  return (
    <div data-section="results" className={className}>
      <div className={`flex flex-col items-center ${headerClassName}`}>
        <h2 className={`heading-h2 ${headingClassName} text-center`}>{heading}</h2>
        {subtitle && <p className={`${subtitleClassName} text-center text-body text-grey xs:text-body-xs`}>{subtitle}</p>}
      </div>

      <div className={`grid ${gridClassName} gap-[1rem]`}>
        {cards.map((c, i) => (
          <div
            key={i}
            className={`flex flex-col items-start justify-between gap-[3.7rem] rounded-card bg-surface-1 px-[2rem] pb-[2rem] pt-[1rem] tab:gap-[5rem] mob:p-[1.5rem] xs:gap-[3rem] ${cardClassName}`}
          >
            {c.label ? (
              <div className="text-body text-ink">{c.label}</div>
            ) : c.logo ? (
              <LogoPlaceholder src={c.logo} alt="Customer logo" imgClassName="object-left" className="h-[3rem] w-[7.5rem] max-w-[50%] text-[1rem] mob:h-[2rem]" />
            ) : null}
            <div className="flex flex-col gap-[1rem]">
              <div className="text-stat font-semibold text-ink tab:text-stat-48 mob:text-stat-40 xs:text-stat-48">{c.stat}</div>
              {c.rest && (
                <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">
                  {c.brand && (
                    <>
                      <a href="#" className="inline-link">{c.brand}</a>{' '}
                    </>
                  )}
                  {c.rest}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {testimonial && (
        <div className="mx-auto mb-[1rem] mt-[2rem] flex max-w-[60rem] flex-col items-center gap-[1rem]">
          <p className="flex flex-wrap text-left text-quote font-medium text-ink tab:text-quote-tab mob:text-quote-mob">
            {testimonial.quote}{' '}
            <br />
            <br />
          </p>
          <div className="flex flex-col items-center gap-[0.75rem]">
            <Placeholder src={testimonial.avatar} alt="" tone={2} label="Avatar" className="h-[5rem] w-[5rem] rounded-[0.375rem_0] wide:rounded-avatar" />
            <div className="flex flex-col items-center">
              <div className="text-para text-ink xs:text-body-xs">{testimonial.name}</div>
              <div className="text-body text-grey xs:text-small">
                {testimonial.role}
                {testimonial.company && (
                  <>
                    {' '}
                    <a href="#" className="inline-link">{testimonial.company}</a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {cta && (
        <div className={`flex justify-center ${ctaClassName}`}>
          <Button variant={cta.variant || 'primary'} to={cta.to}>
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  )
}
