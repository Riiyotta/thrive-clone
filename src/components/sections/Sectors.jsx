import { useEffect, useRef, useState } from 'react'
import Placeholder from '../shared/Placeholder.jsx'
import { LEGACY_H2, LegacyButton, LegacyEyebrow, legacyVars } from './GlobalHeaderLegacy.jsx'

// sectors (`header.section_sectors`): legacy header + Webflow tabs (data-easing ease,
// duration-out 100ms, duration-in 300ms: the old pane fades out, then the new one fades in).
//   'industries' /lms/solutions (theme green): centred H2 + grey para; 9 pill tabs
//                (current = theme button colours); one full-width image pane with a bottom
//                gradient and a centred H2 label + "Explore" button. padding-section-large.
//   'topics'     /content (theme yellow): side hairline frame, eyebrow + H2; 9 tag tabs
//                (8px 0 radius, bg-secondary/brand text, current = button colours); pane =
//                5 topic cards (image 2.73:2.93 + serif H5) + "All Topics" button.
//                Card hover (IX2 "Content Tabs Hover In/Out" + CSS :hover): the 10% dark overlay
//                is hidden, a 1px border-secondary frame and the theme pattern appear.
// Tabs ≤991: menu side padding 2rem; ≤767 1rem, links 1rem; ≤479 links grow (flex 1.5 1 auto),
// .5rem padding, .875rem text, centred.
const DEFAULTS = {
  industries: {
    theme: 'green',
    heading: 'Workplace learning built for your sector',
    body: 'Nimbus shapes its learning platform around the needs of each sector, with ready content, smart reporting and support for every type of team.',
    tabs: ['Finance', 'Gaming', 'Government & Public Sector', 'Healthcare', 'Hospitality', 'Real Estate', 'Retail', 'Software', 'Transport'],
    cta: 'Explore further',
  },
  topics: {
    theme: 'yellow',
    eyebrow: 'Core Library',
    heading: 'eLearning courses for everyday workplace skills',
    tabs: ['Communication at work', 'Compliance', 'Customer care', 'Data and cyber security', 'Inclusion', 'Health and safety', 'Leadership and management', 'Wellbeing and mental health', 'Future of work'],
    cards: ['Speaking with clarity', 'Active listening', 'Giving feedback', 'Writing that lands', 'Difficult conversations'],
    cta: 'All Topics',
  },
}

function useWebflowTabs(count) {
  const [current, setCurrent] = useState(0) // highlighted link (w--current)
  const [shown, setShown] = useState(0) // visible pane
  const [visible, setVisible] = useState(true) // pane opacity target
  const timer = useRef(null)
  const select = (i) => {
    if (i === current) return
    setCurrent(i)
    clearTimeout(timer.current)
    setVisible(false) // fade out 100ms
    timer.current = setTimeout(() => {
      setShown(i)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true))) // fade in 300ms
    }, 100)
  }
  useEffect(() => () => clearTimeout(timer.current), [])
  return { current, shown, visible, select, count }
}

export default function Sectors({ variant = 'industries', id, ...props }) {
  const d = { ...DEFAULTS[variant], ...props }
  const t = useWebflowTabs(d.tabs.length)
  const industries = variant === 'industries'

  const menu = (
    <div
      role="tablist"
      className="mx-auto mb-[3rem] flex max-w-[60rem] flex-wrap justify-center gap-[0.75rem] tab:max-w-full tab:px-[2rem] mob:w-auto mob:px-[1rem] xs:items-center xs:justify-start"
    >
      {d.tabs.map((label, i) => {
        const on = i === t.current
        return (
          <button
            type="button"
            role="tab"
            aria-selected={on}
            key={label}
            onClick={() => t.select(i)}
            className={
              industries
                ? `flex flex-none items-center justify-start gap-[0.63rem] self-center rounded-pill border border-solid border-[color:var(--lt-border)] px-[1.3rem] py-[0.5rem] text-body font-normal mob:text-[1rem] xs:flex-[1.5_1_auto] xs:justify-center xs:p-[0.5rem] xs:text-[0.875rem] xs:leading-[1.4] ${
                    on ? 'bg-[var(--lt-btn-bg)] text-[color:var(--lt-btn-text)]' : 'bg-transparent text-ink'
                  }`
                : `flex flex-none items-center justify-start gap-[0.63rem] self-center rounded-[8px_0] border border-solid border-[color:var(--lt-border)] px-[0.75rem] py-[0.5rem] text-[1rem] font-normal leading-[1.4] xs:flex-[1.5_1_auto] xs:justify-center xs:p-[0.5rem] xs:text-[0.875rem] ${
                    on ? 'bg-[var(--lt-btn-bg)] text-[color:var(--lt-btn-text)]' : 'bg-[var(--lt-bg2)] text-[color:var(--lt-brand)]'
                  }`
            }
          >
            <div>{label}</div>
          </button>
        )
      })}
    </div>
  )

  const fade = {
    opacity: t.visible ? 1 : 0,
    transition: `opacity ${t.visible ? 300 : 100}ms ease`,
  }

  if (industries) {
    return (
      <header id={id} data-section="sectors" style={legacyVars(d.theme)}>
        <div className="padding-global">
          <div className="container-large">
            <div className="py-[7rem] tab:py-[6rem] mob:py-[4rem]">
              <div className="flex flex-col items-center">
                <div className="px-[2.5rem] mob:px-[1.25rem]">
                  <div className="flex w-full max-w-[36rem] flex-col items-center justify-between text-center">
                    <div className="flex max-w-[36rem] flex-col items-center gap-[0.5rem]">
                      <h2 className={LEGACY_H2}>{d.heading}</h2>
                    </div>
                    <p className="mb-[1.25rem] mt-[1rem] text-body leading-[1.4] text-grey xs:text-body-xs">{d.body}</p>
                  </div>
                </div>
                <div className="mt-[2.5rem] w-full mob:mt-[1.25rem]">
                  {menu}
                  <div className="overflow-hidden" style={fade}>
                    <div className="relative z-[2] flex w-full flex-col items-center">
                      <Placeholder label={`${d.tabs[t.shown]} image`} tone={2} className="aspect-[1440/926] w-full" labelClassName="self-start pt-[2rem]" />
                      <div aria-hidden className="absolute inset-0 z-[1] bg-[linear-gradient(0deg,#000a06_4%,rgba(0,24,17,0)_80%)]" />
                      <div className="absolute bottom-0 z-[1] flex flex-col items-center gap-[0.5rem] pb-[3rem]">
                        <div className="text-center font-serif text-h2 font-medium leading-[1.4] text-ink mob:text-h2-mob mob:leading-[1.4] xs:text-h2-xs xs:leading-[1.4]">
                          {d.tabs[t.shown]}
                        </div>
                        <LegacyButton>{d.cta}</LegacyButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header id={id} data-section="sectors" style={legacyVars(d.theme)}>
      <div className="padding-global">
        <div className="container-large">
          <div className="flex flex-col border-l border-r border-solid border-[color:var(--lt-border)]">
            <div className="pt-[6rem] tab:pt-[5rem] mob:pt-[3.5rem]">
              <div className="flex flex-col items-center">
                <div className="flex w-full max-w-[64rem] flex-col items-center justify-between text-center">
                  <div className="flex flex-col items-center gap-[0.5rem]">
                    <LegacyEyebrow>{d.eyebrow}</LegacyEyebrow>
                    <h2 className={LEGACY_H2}>{d.heading}</h2>
                  </div>
                </div>
                <div className="mt-[1.5rem] w-full">
                  {menu}
                  <div className="flex overflow-hidden" style={fade}>
                    <div className="w-full pb-[2.5rem] mob:pb-[1.25rem]">
                      <div className="flex w-full items-start justify-center tab:gap-[8px] mob:flex-wrap mob:gap-x-[8px] mob:gap-y-[1rem] xs:gap-x-[16px]">
                        {d.cards.map((c, i) => (
                          <a
                            key={c}
                            href="#"
                            className="group relative z-[1] w-[20%] overflow-hidden text-ink no-underline hover:border hover:border-solid hover:border-[color:var(--lt-border2)] hover:bg-[var(--lt-bg2)] mob:w-[30%] xs:w-[45%]"
                          >
                            <Placeholder label={`${d.tabs[t.shown]} ${i + 1}`} tone={2} className="aspect-[2.73/2.93] w-full" />
                            <div className="relative z-[1] px-[1.5rem] pb-[0.8rem] pt-[1rem] tab:px-[1rem]">
                              <h5 className="mb-[0.5rem] font-serif text-[1.125rem] font-normal leading-[1.4] tracking-[0.03em] text-ink mob:text-[1.25rem] xs:mb-[0.125rem]">
                                {c}
                              </h5>
                            </div>
                            <div aria-hidden className="absolute inset-0 z-[1] bg-[rgba(0,10,6,0.1)] group-hover:hidden" />
                          </a>
                        ))}
                      </div>
                      <div className="padding-global mt-[2.5rem] mob:mt-[1.25rem]">
                        <div className="flex flex-wrap items-center justify-center gap-[1.5rem] xs:gap-[2rem]">
                          <LegacyButton>{d.cta}</LegacyButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
