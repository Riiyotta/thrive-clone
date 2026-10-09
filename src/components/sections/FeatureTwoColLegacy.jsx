import Placeholder from '../shared/Placeholder.jsx'
import { GLOBAL_HEADER_PAD, LEGACY_H2, LEGACY_PARA, LegacyButton, legacyVars } from './GlobalHeaderLegacy.jsx'

// feature-2col-legacy (`.section_feature_2-col`): bordered stack of 2-column rows, text cell +
// 3:2 image cell alternating sides, hairline between rows.
//   'impact'   /lms/impact            optional centred H2 header; rows on a 16px-gap w-layout-grid,
//                                      text cells vertically centred; text = H3 28/30.8 + para
//   'service'  /content/service       .component.no-border-top, rows without gap, cells stretched
//   'services' /lms/professional-services  rows on 16px grid; text = H4 32/44.8 top line +
//                                      para + CTA (space-between)
// Cell padding: text .padding-medium 2.5rem (≤991 1.5rem, ≤767 1.25rem); image .padding-regular
// 2.5rem (≤991 2rem, ≤767 1.5rem, ≤479 1rem). ≤767 rows stack and the text cell always comes first.
const DEFAULTS = {
  impact: {
    theme: 'pink',
    header: 'Every step from the first plan to proof',
    rows: [
      { title: 'Planning and target setting', body: 'We work with you to set clear goals for your programme, agree the measures that matter most, and build a practical plan that links every learning activity to a result your leadership team already cares about and can track over time.' },
      { title: 'Campaigns and creative help', body: 'Our creative team helps you launch with energy, shaping campaigns, visuals and messages that bring learners in, keep them coming back, and make every new programme feel like an event worth joining rather than another task on the list.' },
      { title: 'Reporting the wins', body: 'When the project wraps up, we pull your data into a clear story of what changed, share it with your leaders, and help you celebrate the wins with your teams so the momentum carries straight into the next programme you run.' },
    ],
  },
  service: {
    theme: 'yellow',
    header: null,
    rows: [
      { title: 'Never left to find your way', body: 'We never hand over a library and walk away. From the very first planning workshop, a dedicated specialist works alongside your team to map the topics you need, match them to the roles in your business and build pathways that make sense for every learner. As your priorities shift, we revisit the plan together, swap in fresh new titles, quietly retire anything that has gone stale and keep a very close eye on all of the numbers so that every course in your library is earning its place. You always know exactly who to call, and you always get a clear, honest answer.' },
      { title: 'Always better together', body: 'Whether it is keeping pace with new regulation, launching a programme for a fresh team or simply finding the right course for a tricky skills gap, our content team is on hand to help. We share what is working for similar organisations, suggest quick wins, share fresh ideas and flag new releases well before they land, so your learners always have something useful waiting for them. Regular reviews keep everyone aligned, and our door stays open between them, so you never have to wait for the next scheduled check-in to get support from people who already know your goals, your teams and your plans well.' },
    ],
  },
  services: {
    theme: 'green',
    header: null,
    rows: [
      { title: 'Hands-on Admin Cover', body: 'Whether it is for one day a week or every day of the year, our experienced admins can run the routine work on your platform for you, from enrolments and reporting to content uploads, so your own team has far more time for the bigger projects that really need their attention most.', cta: 'Find out more' },
      { title: 'Your Own Support Lead', body: 'Whether it is daily help with tricky questions or a regular check-in with your leaders, a named specialist who knows your setup inside out is always on hand to keep things running smoothly, answer questions quickly and help you get much more value from every single feature you already use today.', cta: 'Find out more' },
    ],
  },
}

function TextCell({ row, variant }) {
  if (variant === 'services') {
    return (
      <>
        <div className="flex w-full items-start justify-start gap-[1rem]">
          <h3 className="mb-[1rem] text-xlarge font-normal text-ink mob:text-xlarge-mob">{row.title}</h3>
        </div>
        <div className="flex w-full flex-col items-start justify-between">
          <p className={`${LEGACY_PARA} text-ink`}>{row.body}</p>
          {row.cta && (
            <div className="mt-[2rem] flex flex-wrap items-center gap-[1.5rem] xs:w-full xs:flex-col xs:items-stretch xs:gap-[1rem]">
              <LegacyButton href={row.href || '#'}>{row.cta}</LegacyButton>
            </div>
          )}
        </div>
      </>
    )
  }
  return (
    <div className="flex w-full flex-col items-start justify-between">
      <div className="flex flex-col items-start gap-[0.5rem]">
        <h3 className="mb-[1rem] text-[1.75rem] font-normal leading-[1.1] text-ink mob:text-[1.5rem]">{row.title}</h3>
      </div>
      <p className={`${LEGACY_PARA} text-ink`}>{row.body}</p>
    </div>
  )
}

export default function FeatureTwoColLegacy({ variant = 'impact', ...props }) {
  const d = { ...DEFAULTS[variant], ...props }
  const gapped = variant !== 'service'
  const rows = d.rows
  return (
    <section data-section="feature-2col-legacy" style={legacyVars(d.theme)}>
      <div className="padding-global">
        <div className="container-large">
          <div
            className={`flex flex-col border-solid border-[color:var(--lt-border)] ${variant === 'service' ? 'border-x border-b' : 'border'}`}
          >
            {d.header && (
              <div className={`flex flex-col items-center border-b border-solid border-[color:var(--lt-border)] ${GLOBAL_HEADER_PAD}`}>
                <div className="flex w-full flex-col items-center text-center">
                  <h2 className={`${LEGACY_H2} max-w-[60rem]`}>{d.header}</h2>
                </div>
              </div>
            )}
            {rows.map((row, i) => {
              const imageLeft = i % 2 === 1
              const last = i === rows.length - 1
              // Cell padding follows the column (left .padding-medium, right .padding-regular), not the content.
              const leftPad = 'p-[2.5rem] tab:p-[1.5rem] mob:p-[1.25rem]'
              const rightPad = 'p-[2.5rem] tab:p-[2rem] mob:p-[1.5rem] xs:p-[1rem]'
              const image = <Placeholder label="Feature image 3:2" tone={2} className="aspect-[3/2] w-full" />
              const left = (
                <div
                  key="l"
                  className={`flex w-full flex-wrap content-stretch items-start justify-between gap-[1.25rem] ${leftPad} ${
                    !imageLeft && variant === 'impact' ? 'self-center' : ''
                  }`}
                >
                  {imageLeft ? image : <TextCell row={row} variant={variant} />}
                </div>
              )
              const right = (
                <div
                  key="r"
                  className={`flex w-full flex-col ${rightPad} ${
                    imageLeft ? `${variant === 'impact' ? 'mob:order-first' : ''} ${variant === 'impact' ? 'justify-center' : 'items-start justify-between'}` : ''
                  }`}
                >
                  {imageLeft ? <TextCell row={row} variant={variant} /> : image}
                </div>
              )
              return (
                <div
                  key={i}
                  className={`grid grid-cols-2 mob:grid-cols-1 ${gapped ? 'gap-[16px]' : 'gap-0'} ${
                    last ? '' : 'border-b border-solid border-[color:var(--lt-border)]'
                  }`}
                >
                  {[left, right]}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
