import { useEffect, useState } from 'react'
import Placeholder from '../shared/Placeholder.jsx'

// tabs-h-legacy: /lms/professional-services `.section_tabs > .tabs-h_component` (Webflow tabs, duration-in 400ms).
// Row of 5 equal tab links (24px label, 1.5rem 2rem padding, hairlines #00251e); the current tab gets a green
// (#1ee9b6) bottom border and a soft glow background. Pane: copy (32px H3 + grey copy) | image (6.835:5.23).
// <=767: tabs wrap 2-up (16px labels, current tab bottom border black), pane stacks with a 3:2 image.
const DEFAULTS = {
  tabs: [
    { label: 'Transfers', title: 'Change platforms without losing a thing', body: 'Coming from another learning system? Our', strong: 'platform move', rest: 'team brings over your users, history and content, checks every record and keeps your teams learning through the switch.' },
    { label: 'Implementation', title: 'A launch plan built around your goals', body: 'Your specialist maps out', strong: 'every step', rest: 'from setup and branding to the first big day, with clear owners, dates and a checklist your whole team can follow along with.' },
    { label: 'Participation', title: 'Get everyone using it from week one', body: 'We help you plan the', strong: 'internal launch', rest: 'with comms, champions and quick wins that turn a new platform into a daily habit across every site and team.' },
    { label: 'Support and Guidance', title: 'Support that knows your setup inside out', body: 'A named', strong: 'success partner', rest: 'checks in regularly, answers questions fast and brings ideas from teams like yours so the platform keeps getting better.' },
    { label: 'Outcomes', title: 'Show the difference learning is making', body: 'We set up', strong: 'clear reports', rest: 'that link learning to the numbers your leaders care about, then review them with you every quarter and plan what comes next.' },
  ],
}

export default function TabsHLegacy(props) {
  const p = { ...DEFAULTS, ...props }
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(true)
  useEffect(() => {
    setShown(false)
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
    return () => cancelAnimationFrame(id)
  }, [active])
  const t = p.tabs[active]
  return (
    <section data-section="tabs-h-legacy">
      <div className="padding-global">
        <div className="container-large">
          <div className="-my-px grid grid-cols-1 items-stretch overflow-hidden border border-[#00251e] tab:gap-x-[3rem]">
            <div role="tablist" className="flex h-full mob:flex-wrap mob:items-center mob:justify-between">
              {p.tabs.map((tb, i) => {
                const on = i === active
                return (
                  <a
                    key={tb.label}
                    href="#"
                    role="tab"
                    aria-selected={on}
                    onClick={(e) => {
                      e.preventDefault()
                      setActive(i)
                    }}
                    className={`flex w-full max-w-full items-center justify-center gap-[1rem] border-b border-r px-[2rem] py-[1.5rem] text-center text-white tab:p-[1.25rem] mob:w-auto mob:flex-1 mob:basis-0 mob:justify-start mob:p-[1rem] mob:text-small ${
                      on ? 'border-b-[#1ee9b6] border-r-[#00251e] bg-[radial-gradient(ellipse_at_50%_100%,rgba(30,233,182,0.18),rgba(0,37,30,0.35)_45%,transparent_75%)] mob:border-b-black' : 'border-[#00251e]'
                    }`}
                  >
                    <div className="text-[1.5rem] leading-[1.4] tab:text-[1.25rem] mob:text-[1rem] mob:leading-none">{tb.label}</div>
                  </a>
                )
              })}
            </div>
            <div className="overflow-hidden">
              <div
                role="tabpanel"
                className="grid h-full w-full grid-cols-2 items-stretch gap-x-0 gap-y-[4rem] transition-opacity duration-[400ms] ease-[ease] tab:gap-0 mob:grid-cols-1 mob:gap-[1rem] mob:p-[1.5rem] xs:p-[1rem]"
                style={{ opacity: shown ? 1 : 0, transitionDuration: shown ? '400ms' : '0ms' }}
              >
                <div className="flex flex-col items-start justify-between gap-y-[2rem] p-[3rem] tab:gap-[1.5rem] tab:p-[2rem] mob:p-0">
                  <div className="flex items-center justify-start gap-[1rem] tab:flex-col tab:items-start tab:justify-center">
                    <h3 className="mb-[1rem] text-[2rem] font-normal leading-[1.4] text-ink mob:text-[1.5rem]">{t.title}</h3>
                  </div>
                  <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">
                    {t.body} <strong className="font-bold text-ink">{t.strong}</strong> {t.rest}
                  </p>
                </div>
                <div className="relative flex aspect-[6.835/5.23] flex-col items-center justify-center overflow-hidden tab:aspect-auto mob:aspect-[3/2]">
                  <Placeholder label={`${t.label} photo`} tone={2} className="h-full w-full self-stretch" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
