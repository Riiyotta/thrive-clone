import Button from './shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from './shared/Placeholder.jsx'

// §7 results cards + testimonial. Intentionally NOT wrapped in .padding-global
// (measured: edge-to-edge at 390).
const CARD_LOGOS = ['result-logo-1.png', 'result-logo-2.svg', 'result-logo-3.avif', 'result-logo-4.svg']
const CARDS = [
  { stat: '2.1x', brand: 'Northwind', rest: 'saw learners come back more than twice as often once every course lived in a single home.' },
  { stat: '18%', brand: 'Brightway', rest: 'cut early staff turnover after rolling out mentoring pairs for every new starter in their stores.' },
  { stat: '64%', brand: 'Kestrel Co', rest: 'of employees finished a skill journey within their first quarter, well ahead of the internal goal.' },
  { stat: '91%', brand: 'Harbor Foods', rest: 'completion on required training across sites, with reminders doing the chasing.' },
]

export default function Results() {
  return (
    <div data-section="results" className="container-medium mb-[32px]">
      <div className="flex flex-col items-center pb-[40px] pt-[40px]">
        <h2 className="heading-h2 max-w-[960px] text-center">Real teams, real numbers, and the outcomes that keep them here</h2>
      </div>

      <div className="grid grid-cols-4 gap-[16px] tab:grid-cols-2 xs:grid-cols-1">
        {CARDS.map((c, i) => (
          <div
            key={c.stat}
            className="flex flex-col items-start justify-between gap-[3.7rem] rounded-card bg-surface-1 px-[32px] pb-[32px] pt-[16px] tab:gap-[5rem] mob:p-[24px] xs:gap-[48px]"
          >
            <LogoPlaceholder src={`/assets/${CARD_LOGOS[i]}`} alt="Customer logo" imgClassName="object-left" className="h-[48px] w-[120px] max-w-[50%] text-[16px] mob:h-[32px]" />
            <div className="flex flex-col gap-[16px]">
              <div className="text-stat font-semibold text-ink tab:text-stat-48 mob:text-stat-40 xs:text-stat-48">{c.stat}</div>
              <p className="mb-[20px] text-body text-grey xs:text-body-xs">
                <a href="#" className="inline-link">{c.brand}</a> {c.rest}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mb-[16px] mt-[32px] flex max-w-[960px] flex-col items-center gap-[16px]">
        <p className="flex flex-wrap text-left text-quote font-medium text-ink tab:text-quote-tab mob:text-quote-mob">
          “People reach for it on their phones, on the shop floor and in the back office. It has quietly become the one home for learning, team news and training, and it feels like it belongs to the whole team.”{' '}
          <br />
          <br />
        </p>
        <div className="flex flex-col items-center gap-[12px]">
          <Placeholder src="/assets/testimonial-avatar.png" alt="" tone={2} label="Avatar" className="h-[80px] w-[80px] rounded-[6px_0] wide:rounded-avatar" />
          <div className="flex flex-col items-center">
            <div className="text-para text-ink xs:text-body-xs">Jordan Ellis</div>
            <div className="text-body text-grey xs:text-small">
              Head of People Development, <a href="#" className="inline-link">Northwind</a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-[64px] pt-[24px]">
        <Button variant="primary">See Nimbus in action →</Button>
      </div>
    </div>
  )
}
