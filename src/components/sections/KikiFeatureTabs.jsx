import { useState } from 'react'
import Placeholder from '../shared/Placeholder.jsx'

// kiki-feature-tabs: /nova `.section_kiki-tabs` (+ `.reversed`). Header + vertical tab list on one side,
// cross-fading visual on the other (Swiper fade, speed 300, no loop/autoplay: slides opacity .3s; the
// 8px left track #262626 gets a white bar, opacity .3s, on the active item; only the active item shows its body).
// Visual column 40% (video 30rem tall, 3:2). reversed: row-reverse, gap 5rem, nav 55%.
// <=479: stacked, the swiper is hidden and the active item shows its own visual under the body.
const DEFAULTS = {
  reversed: false,
  heading: 'Made for the people who run learning',
  intro:
    'Nova reviews results, drafts courses, answers questions and keeps learners moving, so your team spends less time on admin and more time on the work that matters. It plugs into the tools you already use and gets smarter the more your people lean on it every week.',
  items: [
    { title: 'Skip the reports and get straight answers', body: 'Nova reads your dashboards and surfaces what matters on compliance, take-up and results. Spot the gaps in seconds, not spreadsheets.' },
    { title: 'Polished courses ready in minutes', body: 'Type a prompt or upload a file and Nova turns it into a finished course, quiz or lesson. No blank page, no starting over, just an extra maker on the team.' },
    { title: 'Prompts that can handle a thousand admin jobs', body: 'Enrol a whole site, chase every late learner and tidy years of old content, all from one sentence to Nova, so your team never has to open a spreadsheet again.' },
  ],
}

// Optional `xsStackFix` (default false): ≤479 the original's active-item video sits right under the body
// (no 1rem flex gap) and the stacked component keeps a 1rem gap before its empty visual column.
export default function KikiFeatureTabs({ xsStackFix = false, ...props }) {
  const p = { ...DEFAULTS, ...props }
  const [active, setActive] = useState(0)
  const rev = p.reversed
  return (
    <section data-section="kiki-feature-tabs" className="relative z-[10] bg-page">
      <div className="py-[5rem] tab:py-[4rem] mob:py-[3rem]">
        <div className="padding-global">
          <div className="container-medium">
            <div className={`flex items-start justify-between xs:flex-col xs:gap-[1rem] ${rev ? 'flex-row-reverse gap-[5rem]' : 'gap-0'} ${xsStackFix ? 'xs:pb-[1rem]' : ''}`}>
              <div className={`flex max-w-[45rem] flex-[0_1_auto] flex-col items-start justify-start gap-[1.5rem] xs:w-full ${rev ? 'w-[55%] tab:w-[50%]' : 'w-[70%] tab:w-[60%] mob:w-[50%]'}`}>
                <div className="max-w-[42rem]">
                  <div className="max-w-[36rem]">
                    <h2 className="heading-h2">{p.heading}</h2>
                  </div>
                  <div className="h-[1rem]" />
                  <div className="max-w-[36rem]">
                    <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">{p.intro}</p>
                  </div>
                </div>
                {p.items.map((it, i) => {
                  const on = i === active
                  return (
                    <div
                      key={it.title}
                      role="button"
                      tabIndex={0}
                      aria-pressed={on}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setActive(i))}
                      className="relative flex max-w-[30rem] cursor-pointer items-stretch justify-center gap-[1rem] overflow-hidden py-[0.5rem] pl-[2rem]"
                    >
                      <div className="absolute left-0 top-0 h-full w-[8px] self-stretch overflow-clip rounded-[3rem] bg-hover">
                        <div className="absolute left-0 top-0 h-full w-[8px] rounded-[3rem] bg-ink transition-opacity duration-300 ease-[ease]" style={{ opacity: on ? 1 : 0 }} />
                      </div>
                      <div className="flex flex-col gap-[1rem]">
                        <h3 className={`mb-0 text-[1.5rem] font-normal leading-[1.15] xs:text-[1.25rem] ${on ? 'text-white' : 'text-ink'}`}>{it.title}</h3>
                        {on && (
                          <>
                            <p className="mb-[1.25rem] text-[1rem] leading-[1.4rem] text-grey">{it.body}</p>
                            <Placeholder label="Nova video" tone={2} className={`hidden h-[23rem] w-full xs:flex ${xsStackFix ? 'xs:-mt-[1rem]' : ''}`} />
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className={`relative w-[40%] shrink-0 self-stretch overflow-hidden tab:w-[35%] mob:w-[50%] mob:self-end xs:hidden`}>
                {p.items.map((it, i) => (
                  <div
                    key={it.title}
                    className={`absolute inset-0 flex items-center transition-opacity duration-300 ease-[ease] ${rev ? 'justify-start' : 'justify-center'} tab:items-end`}
                    style={{ opacity: i === active ? 1 : 0 }}
                    aria-hidden={i !== active}
                  >
                    <Placeholder label={`Nova video ${i + 1}`} tone={2} className="h-[30rem] max-h-[30rem] w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
