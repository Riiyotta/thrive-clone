import { useEffect, useRef, useState } from 'react'
import Button from '../shared/Button.jsx'
import Placeholder from '../shared/Placeholder.jsx'

// `split-tabs` (.section_wowcustom-tabs > .splittabs_wrapper, "Tabs - Split layout - w/ videos").
//  - variant "base"     (/nova): tabs left, 16:9 video pane right; header = 1-line H2 with italic + 16px intro.
//  - variant "reversed" (/lms/mentoring-software): pane left, tabs right; image pane; header = 2-line H2
//    + 18px intro; buttons use the blue "brand" button variant (#2a63f6, hover white/#131313).
// Behaviour = page script "WOW PAGES - CUSTOM TABS SYSTEM WITH FADE TRANSITIONS": click a tab -> the
// matching pane + child content get display:block then `.active` next frame (opacity/visibility .3s);
// the old ones lose `.active` and get display:none after 300ms (a .3s cross-fade).
// Tab: 1.5rem/1.4 (1.25rem <=767), inactive rgba(255,255,255,.3) + 0.25rem left pad, current white +
// 2rem left pad with the green tag chip; 1px #1a1a1a bottom rule. No hover style on the original.
// NOTE: on /nova the original block continues with a raw-HTML vendor table embed (ComparisonTable
// variant="vendor"); render it after this section.

const KIKI_TABS = [
  { tab: 'Customer service', text: 'Nova pulls the right answer from your help centre, policies and past tickets, so support teams reply faster and every customer hears the same accurate message, whichever channel they use or whoever happens to pick up the conversation that day.' },
  { tab: 'Sales teams', text: 'Nova coaches reps before every call with product facts, objection handling and the latest pricing, then suggests short refreshers based on how each conversation actually went.' },
  { tab: 'People teams', text: 'Nova answers policy questions, drafts onboarding plans and builds short courses from your documents, so people teams spend less time on admin and more time with their people.' },
  { tab: 'Frontline teams', text: 'On any shift and any device, Nova gives frontline staff quick how-to answers and bite-sized refreshers in their own language, right when they need them on the floor.' },
  { tab: 'Compliance & risk', text: 'Nova keeps policies current, flags gaps in training and answers compliance questions with links to the source, so audits feel routine instead of stressful.' },
]
const MENTOR_TABS = [
  { tab: 'Sales coaching', text: 'In sales, nothing beats learning from someone who has closed the deal. Pair new reps with top performers and share what works.' },
  { tab: 'Leadership mentoring', text: 'Help new managers learn from experienced leaders through guided conversations, shared goals and regular check-ins.' },
  { tab: 'New starter onboarding', text: 'Give every new starter a buddy who knows the ropes, so the first weeks feel welcoming, clear and connected.' },
  { tab: 'High performer coaching', text: 'Support people exploring new roles with mentors who have walked the same path and can open doors.' },
  { tab: 'Inclusion mentoring', text: 'Let experts across the business share their know-how with colleagues who want to grow the same skills.' },
]

const BRAND_BTN = '!bg-[#2a63f6] !text-white hover:!bg-white hover:!text-surface-2'

function useFadeTabs(n) {
  // mirrors the original: `shown` = display:block set, `active` = .active class (opacity 1)
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(() => new Set([0]))
  const [faded, setFaded] = useState(0)
  const timers = useRef([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const select = (i) => {
    if (i === active) return
    const prev = active
    setActive(i)
    setShown((s) => new Set([...s, i]))
    requestAnimationFrame(() => setFaded(i))
    timers.current.push(
      setTimeout(() => {
        setShown((s) => {
          const ns = new Set(s)
          if (prev !== i) ns.delete(prev)
          ns.add(i)
          return ns
        })
      }, 300),
    )
  }
  return { active, shown, faded, select }
}

export default function SplitTabs({
  variant = 'base',
  title = variant === 'reversed' ? (
    <>
      Unlock the power of <br />
      peer-to-peer growth with Nimbus
    </>
  ) : (
    <>
      A Nova for <em className="italic">every team</em>
    </>
  ),
  intro = variant === 'reversed'
    ? 'Your people already have the answers, so help them share what they know.'
    : 'One assistant, helping solve every team’s challenges.',
  tabs = variant === 'reversed' ? MENTOR_TABS : KIKI_TABS,
  button = { label: 'Book a demo', href: '/lms/demo-platform' },
}) {
  const rev = variant === 'reversed'
  const { active, shown, faded, select } = useFadeTabs(tabs.length)

  return (
    <section data-section="split-tabs" data-variant={variant} className="pb-[5rem] pt-[5rem] mob:pb-0 xs:pt-[2rem]">
      <div className="padding-global">
        <div className="mb-[6rem] container-medium">
          {rev ? (
            <>
              <div className="mx-auto flex w-full max-w-[60rem] flex-col items-center justify-center text-center">
                <h2 className="heading-h2 text-balance">{title}</h2>
              </div>
              <div className="w-full pt-[1rem]" />
              <div className="mx-auto flex w-full max-w-[42rem] flex-col items-center justify-center">
                <p className="mb-[1.25rem] text-center text-body text-grey xs:text-body-xs">{intro}</p>
              </div>
              <div className="pt-[3rem] tab:pt-[2.5rem] mob:pt-[1.5rem]" />
            </>
          ) : (
            <>
              <div className="mx-auto flex w-full max-w-[36rem] flex-col items-center justify-center text-center">
                <h2 className="heading-h2 text-balance">{title}</h2>
                <p className="mb-[1.25rem] mt-[1rem] text-[1rem] leading-[1.4rem] text-grey">{intro}</p>
              </div>
              <div className="w-full pt-[5rem] tab:pt-[4rem] mob:pt-[3rem]" />
            </>
          )}

          <div className="relative flex h-[37rem] flex-col justify-between gap-x-[6rem] mob:h-auto">
            <div className={`static w-[40%] justify-between mob:flex mob:w-full mob:flex-col ${rev ? 'self-end' : ''}`}>
              <div role="tablist" className="w-full mob:mb-[3rem] mob:flex mob:gap-[1.5rem] mob:overflow-auto xs:flex-wrap">
                {tabs.map((t, i) => {
                  const cur = i === active
                  return (
                    <div
                      key={i}
                      role="tab"
                      aria-selected={cur}
                      onClick={() => select(i)}
                      className={`flex w-full cursor-pointer items-center justify-start border-b border-solid border-surface-3 py-[0.75rem] text-tab mob:whitespace-nowrap mob:text-tab-mob xs:w-auto ${
                        cur ? 'tab-chip gap-[0.75rem] pl-[2rem] text-ink' : 'gap-[1rem] pl-[0.25rem] text-tab-inactive'
                      }`}
                    >
                      <div>{t.tab}</div>
                    </div>
                  )
                })}
              </div>
              <div
                className={`absolute bottom-0 top-0 flex w-[55%] max-w-[150%] flex-col items-stretch justify-center overflow-clip mob:relative mob:mb-[3rem] mob:h-[60dvh] mob:w-full xs:mb-0 xs:h-[30dvh] ${
                  rev ? 'left-0' : 'right-0'
                }`}
              >
                {tabs.map((t, i) => (
                  <div
                    key={i}
                    data-active={faded === i && active === i}
                    className="fade-pane absolute inset-0 z-[4] h-full w-full xs:static"
                    style={{ display: shown.has(i) ? 'block' : 'none' }}
                  >
                    {rev ? (
                      <Placeholder label="Mentoring visual" tone={2} className="aspect-[670/406] w-full" />
                    ) : (
                      <div className="flex h-full w-auto items-start justify-center overflow-clip rounded-panel">
                        <Placeholder label="Product video 16:9" tone={2} className="aspect-video w-full rounded-card" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative h-[12rem] w-[40%] mob:w-full ${rev ? 'self-end' : ''}`}>
              {tabs.map((t, i) => (
                <div
                  key={i}
                  data-active={faded === i && active === i}
                  className="fade-pane absolute bottom-0 left-0 z-[4] w-full flex-col items-start justify-start gap-y-[1rem]"
                  style={{ display: shown.has(i) ? 'flex' : 'none' }}
                >
                  <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">{t.text}</p>
                  <div className="flex w-full flex-wrap items-center justify-start gap-[1.5rem] xs:gap-[2rem]">
                    <Button variant="primary" href={button.href} className={rev ? BRAND_BTN : ''}>
                      {button.label}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
