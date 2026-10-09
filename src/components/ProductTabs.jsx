import { useState } from 'react'
import Button from './shared/Button.jsx'
import Placeholder from './shared/Placeholder.jsx'

// §4 Product tabs: click-driven, opacity + visibility .3s fade, no autoplay.
const TABS = [
  {
    label: 'Keep every course in one simple home',
    short: 'Learning home',
    image: 'Product UI 670:600',
    copy: 'Give people a single front door to every course, guide and video, then let smart suggestions surface the next thing worth their time today.',
    cta: 'Explore the home →',
  },
  {
    label: 'Turn the skills you need into clear, guided journeys for everyone',
    short: 'Skill journeys',
    image: 'Product UI 670:600',
    copy: 'Map the skills your teams need, build step-by-step journeys around them, and watch progress roll up into reports leaders can actually use.',
    cta: 'Explore journeys →',
  },
  {
    label: 'Pair people with mentors in seconds',
    short: 'Peer mentoring',
    image: 'Product UI 670:600',
    copy: 'Match colleagues by goals and strengths, keep conversations on track with gentle prompts, and see which pairings lead to real growth over time.',
    cta: 'Explore mentoring →',
  },
  {
    label: 'Bring teams together in lively shared spaces',
    short: 'Team spaces',
    image: 'Product UI 670:600',
    copy: 'Create lively spaces for every team, topic or launch, where people swap tips, post wins and keep shared knowledge from slipping away.',
    cta: 'Explore spaces →',
  },
]

export default function ProductTabs() {
  const [active, setActive] = useState(0)

  return (
    <section data-section="tabs" className="py-[32px] mob:pb-0 xs:pb-[32px]">
      <div className="padding-global">
        <div className="container-medium">
          {/* Header */}
          <div className="flex flex-row items-end justify-between gap-[60px] tab:flex-col tab:items-start tab:gap-[24px]">
            <h2 className="heading-h2 max-w-[576px]">Everything your people need to keep growing at work</h2>
            <div className="max-w-[448px]">
              <p className="mb-[20px] text-para text-grey">
                One platform brings together a{' '}
                <a href="#" className="inline-link">learning home</a>,{' '}
                <a href="#" className="inline-link">skill journeys</a>,{' '}
                <a href="#" className="inline-link">mentoring</a>,{' '}
                <a href="#" className="inline-link">team spaces</a> and{' '}
                <a href="#" className="inline-link">analytics</a> so nobody has to hunt for anything.
              </p>
            </div>
          </div>

          <div className="h-[80px] tab:h-[64px] mob:h-[48px]" />

          {/* Tabs body */}
          <div className="relative flex h-[592px] flex-col justify-between mob:h-auto">
            <div className="w-1/2 mob:flex mob:w-full mob:flex-col">
              <div role="tablist" className="flex flex-col mob:mb-[48px] mob:flex-row mob:flex-wrap mob:gap-[24px]">
                {TABS.map((t, i) => {
                  const on = i === active
                  return (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActive(i)}
                      className={`w-full border-b border-surface-3 py-[24px] text-left text-tab font-normal mob:w-auto mob:whitespace-nowrap mob:py-[8px] mob:text-tab-mob ${
                        on ? 'tab-chip pl-[32px] text-ink' : 'pl-[4px] text-tab-inactive'
                      }`}
                    >
                      <span className="mob:hidden">{t.label}</span>
                      <span className="hidden mob:inline">{t.short}</span>
                    </button>
                  )
                })}
              </div>

              {/* Pane: images bleed off the right edge */}
              <div className="absolute bottom-0 right-0 top-0 mr-[-10vw] w-[60%] overflow-clip mob:relative mob:m-0 mob:mb-[48px] mob:h-[60dvh] mob:w-full xs:h-[40dvh]">
                {TABS.map((t, i) => (
                  <div key={i} data-active={i === active} className="fade-pane absolute left-0 top-0 w-full">
                    <Placeholder src={`/assets/tab-${i + 1}.png`} alt="" tone={2} label={t.image} className="aspect-[670/600] w-full mob:min-w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Child copy */}
            <div className="relative h-[192px] w-[40%] mob:h-[14rem] mob:w-full">
              {TABS.map((t, i) => (
                <div
                  key={i}
                  data-active={i === active}
                  className="fade-pane absolute inset-x-0 top-0"
                >
                  <p className="mb-[20px] text-body text-grey xs:text-body-xs">{t.copy}</p>
                  <div className="flex flex-wrap gap-[24px] xs:gap-[32px]">
                    <Button variant="dark">{t.cta}</Button>
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
