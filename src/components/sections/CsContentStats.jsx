import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap.js'

// cs-content-stats (.section > .component.grid_section.grid_card), case-study-content template.
// Three hairline cards on the content ("yellow") legacy theme: a big Source Serif stat (+ label below,
// on the dotted texture), a "Solutions" chip list and a "Topics used" icon-chip list.
// Motion (IX2 SCROLL_INTO_VIEW): the stat number and the solutions list start at y 100px / opacity 0 and
// move to 0 / 1 over 1000ms outQuart, delays 250ms (number) and 200ms (list), once.
// Theme values (content theme, measured): border #2d2919, chip bg #232011, brand #eee96d.
const THEME = { '--th-border': '#2d2919', '--th-bg2': '#232011', '--th-brand': '#eee96d' }
const TEXTURE = 'bg-[radial-gradient(rgba(238,233,109,0.09)_1px,transparent_1.3px)] bg-[length:0.375rem_0.375rem]'

const DEFAULTS = {
  stat: { value: '34,000', label: 'User licences' },
  solutionsLabel: 'Solutions',
  solutions: ['Employee engagement', 'Skills development', 'Social learning', 'Essential learning'],
  topicsLabel: 'Topics used',
  topics: [{ label: 'DEI', icon: true }, { label: 'Mental health & Wellbeing', icon: true }, { label: 'Compliance' }],
}

function TopicIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-full w-full" aria-hidden>
      <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10.5l2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function CsContentStats({
  stat = DEFAULTS.stat,
  solutionsLabel = DEFAULTS.solutionsLabel,
  solutions = DEFAULTS.solutions,
  topicsLabel = DEFAULTS.topicsLabel,
  topics = DEFAULTS.topics,
}) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ;[
        ['[data-reveal-number]', 0.25],
        ['[data-reveal-list]', 0.2],
      ].forEach(([sel, delay]) => {
        gsap.fromTo(
          sel,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay, ease: 'power3.out', scrollTrigger: { trigger: sel, start: 'top bottom', once: true } },
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const card = 'flex flex-1 flex-col justify-between gap-y-[5rem] border border-r-0 border-solid border-[var(--th-border)] p-[2rem] text-ink tab:p-[1.5rem] mob:gap-y-[3rem] mob:border-r mob:p-[1.25rem] xs:p-[1rem]'
  return (
    <section ref={ref} data-section="cs-content-stats" style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="relative flex flex-col border-l border-r border-[var(--th-border)]">
            <div className="grid w-full flex-1 grid-cols-3 tab:grid-cols-1">
              <div className={`${card} ${TEXTURE}`}>
                <div
                  data-reveal-number
                  className="order-first font-['Source_Serif_4',Georgia,serif] text-[4rem] font-semibold leading-[1.3] text-[var(--th-brand)] mob:text-[3.5rem] xs:text-[2.5rem] xs:leading-none"
                >
                  {stat.value}
                </div>
                <div className="text-body xs:text-body-xs">{stat.label}</div>
              </div>
              <div className={card}>
                <div className="text-body text-grey xs:text-body-xs">{solutionsLabel}</div>
                <div data-reveal-list>
                  <div className="flex flex-wrap gap-[1rem]">
                    {solutions.map((s) => (
                      <div key={s}>
                        <div className="inline-block rounded-br-[6px] rounded-tl-[6px] border border-[var(--th-border)] bg-[var(--th-bg2)] px-[10px] py-[5px] text-[1rem] leading-[1.4]">
                          {s}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={card}>
                <div className="text-body text-grey xs:text-body-xs">{topicsLabel}</div>
                <div>
                  <div className="flex flex-wrap gap-[0.5rem]">
                    {topics.map((t) => (
                      <div key={t.label}>
                        <div className="flex flex-none items-center justify-start gap-[0.63rem] self-center rounded-br-[8px] rounded-tl-[8px] border border-[var(--th-border)] bg-[var(--th-bg2)] px-[0.75rem] py-[0.5rem] text-[1rem] leading-[1.4] text-[var(--th-brand)] xs:justify-center xs:px-[0.5rem] xs:text-[0.875rem]">
                          {t.icon && (
                            <span className="flex h-[1.5rem] w-[1.5rem] flex-col items-center justify-center xs:h-[1rem] xs:w-[1rem]">
                              <TopicIcon />
                            </span>
                          )}
                          <span className="text-ink">{t.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
