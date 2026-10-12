import { useState } from 'react'
import Placeholder from '../shared/Placeholder.jsx'

// solution-tabs (.section > .component + .solution_tab_component) on /content, legacy content theme.
// Header row (eyebrow, serif H2, yellow button | grey paragraph aligned to the bottom), then Finsweet-style
// vertical tabs: 2/5 tab list (active tab shows its summary on the dotted texture; rows share the height,
// transition .2s) and a 3/5 image pane with a bottom #0a0700 fade and an outlined "Learn more" button.
// ≤479 the tabs become an accordion (heading rows; body height + opacity .4s ease).
// Button hovers: yellow bg #eee96d -> #edcf00; outlined -> bg #edcf00 / text black.
const THEME = { '--th-border': '#2d2919', '--th-eyebrow': '#2d2919', '--th-brand': '#eee96d', '--th-btn-hover': '#edcf00', '--th-dark': '#875800' }
const TEXTURE = 'bg-[radial-gradient(rgba(238,233,109,0.09)_1px,transparent_1.3px)] bg-[length:0.375rem_0.375rem]'

const DEFAULTS = {
  eyebrow: 'Sector bundles',
  heading: 'Industry-ready learning content',
  button: { label: 'Explore sector bundles', href: '/content/sector-suites' },
  text: 'More than 200 industry-specific resources give your teams the knowledge they need for their sector and the skills that keep customers happy.\n\nEvery bundle is ready to launch and easy to tailor to your own ways of working.',
  tabs: [
    { title: 'Public sector', text: 'Public sector learning that supports safety, community care and strong governance.' },
    { title: 'Professional services', text: 'Specialist learning for modern firms, covering client care, commercial awareness, data handling and the technical skills professional teams rely on.' },
    { title: 'Retail', text: 'Store-ready learning shaped with retail experts, covering service, product knowledge, loss prevention and smooth daily operations.' },
    { title: 'Food and drink production', text: 'Learning designed for production teams, covering food safety, hygiene, quality checks and the everyday habits that keep every line running safely.' },
    { title: 'Financial services', text: 'Purpose-built learning for financial teams, covering regulation, conduct, data protection and the customer skills that build lasting trust.' },
    { title: 'Hospitality', text: 'Hospitality learning for great guest experiences on every shift.' },
  ],
  ctaLabel: 'Learn more',
}

const BTN =
  'rounded-[200vw] border border-[var(--th-brand)] bg-[var(--th-brand)] px-[1.25rem] py-[0.75rem] text-center text-[1.125rem] font-medium leading-none text-black no-underline transition-[border-radius] duration-300 ease-in-out hover:bg-[var(--th-btn-hover)] tab:px-[1rem] tab:py-[0.5rem] tab:text-[1rem] xs:block xs:self-stretch'

export default function SolutionTabs({
  eyebrow = DEFAULTS.eyebrow,
  heading = DEFAULTS.heading,
  button = DEFAULTS.button,
  text = DEFAULTS.text,
  tabs = DEFAULTS.tabs,
  ctaLabel = DEFAULTS.ctaLabel,
  // liveDetails: live /content details — tab rows top-aligned (not centred) and each ≤479 accordion body
  // keeps 1px transparent top/bottom borders (2px when closed); the accordion opens over 400ms ease with the
  // #232011 open background, closes in 100ms and does not fade (IX2 "Tabs Content accordian"). Default off
  // keeps the original behaviour.
  liveDetails = false,
}) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(-1)
  return (
    <section data-section="solution-tabs" style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="relative flex flex-col border-l border-r border-t border-[var(--th-border)]">
            <div className="flex w-full pt-[4rem] tab:pt-[3rem] mob:pt-[2rem]" />
            <div className="grid grid-cols-2 items-end gap-[3rem] px-[2.5rem] tab:px-[1.5rem] mob:grid-cols-1 mob:gap-[2rem] mob:px-[1.25rem] xs:gap-[1.5rem]">
              <div className="flex w-full max-w-[28rem] flex-col items-start justify-between leading-[1.4]">
                <div className="flex w-full max-w-[28rem] flex-col items-start justify-start gap-[0.5rem]">
                  <div className="mb-[0.75rem] inline-block rounded-[100vw] border border-[var(--th-eyebrow)] bg-[var(--th-eyebrow)] px-[0.75rem] py-[0.325rem] text-[0.875rem] font-medium text-white tab:px-[0.625rem] tab:py-[0.425rem] tab:text-[0.725rem] xs:mb-[0.25rem] xs:leading-none">
                    {eyebrow}
                  </div>
                  <h2 className="mb-[1.25rem] mt-[0.25rem] font-serif text-[4rem] font-normal leading-[1.1]">{heading}</h2>
                </div>
                <div className="mt-[2rem] flex flex-wrap items-center justify-start gap-[1.5rem] xs:w-full xs:flex-col xs:items-stretch xs:gap-[1rem]">
                  <a href={button.href} className={BTN}>
                    {button.label}
                  </a>
                </div>
              </div>
              <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">
                {text.split('\n\n').map((t, i) => (
                  <span key={i}>
                    {i > 0 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                    {t}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex w-full pt-[4rem] tab:pt-[3rem] mob:pt-[2rem]" />
          </div>
          <div>
            {/* desktop / tablet: vertical tabs */}
            <div className="grid w-full grid-cols-5 border border-[var(--th-border)] xs:hidden">
              <div className="col-span-2">
                <div role="tablist" className="grid h-full grid-cols-1">
                  {tabs.map((t, i) => {
                    const on = i === active
                    return (
                      <div
                        key={i}
                        role="tab"
                        aria-selected={on}
                        tabIndex={0}
                        onClick={() => setActive(i)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActive(i)}
                        className="relative cursor-pointer overflow-hidden border-b border-r border-[var(--th-border)] transition-all duration-200 last:border-b-0"
                      >
                        <div
                          className={`flex h-full flex-col items-start ${liveDetails ? 'justify-start' : 'justify-center'} border-r border-[var(--th-border)] pb-[1.125rem] pl-[2.5rem] pr-[2rem] pt-[1.125rem] text-ink tab:gap-[0.5rem] tab:px-[1.5rem] tab:py-[1rem] mob:px-[1.5rem] ${on ? TEXTURE : ''}`}
                        >
                          <div className="text-[1.25rem] font-bold leading-[1.5] mob:text-[1rem]">{t.title}</div>
                          {on && (
                            <div className="pt-[0.5rem] leading-[1.3]">
                              <p className="text-[0.875rem] leading-[1.3] text-grey">{t.text}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="relative col-span-3 grid">
                {tabs.map((t, i) => (
                  <div
                    key={i}
                    data-active={i === active}
                    className="fade-pane relative z-[1] flex items-center justify-center gap-[6rem] bg-[#ededed] [grid-area:1/1]"
                  >
                    <Placeholder label={`${t.title} image`} src={t.image} className="aspect-[821/659] w-full" />
                    <div className="absolute inset-0 z-0 bg-[linear-gradient(0deg,#0a0700,rgba(35,32,17,0)_38%)]" />
                    <div className="absolute bottom-0 z-[1] pb-[3rem]">
                      <a
                        href={t.href || '#'}
                        className="rounded-[200vw] border border-[var(--th-dark)] bg-[rgba(30,233,182,0)] px-[1.25rem] py-[0.75rem] text-center text-[1.125rem] font-medium leading-none text-[#eafff7] no-underline transition-[border-radius] duration-300 ease-in-out hover:bg-[var(--th-btn-hover)] hover:text-black tab:px-[1rem] tab:py-[0.5rem] tab:text-[1rem]"
                      >
                        {ctaLabel}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* ≤479: accordion */}
            <div className="hidden xs:block">
              {tabs.map((t, i) => {
                const on = open === i
                return (
                  <div key={i}>
                    <button
                      type="button"
                      aria-expanded={on}
                      onClick={() => setOpen(on ? -1 : i)}
                      className={`flex w-full items-center justify-between border-l border-t border-[var(--th-border)] text-left ${liveDetails ? `transition-[background-color] ${on ? 'bg-[#232011] duration-100' : 'duration-100'}` : ''}`}
                    >
                      <div className="w-full p-[1.25rem]">
                        <div className="font-serif text-[1.125rem] font-bold leading-[1.4]">{t.title}</div>
                      </div>
                    </button>
                    <div
                      className={`grid overflow-hidden border-l border-[var(--th-border)] px-[1.25rem] ${liveDetails ? `border-y border-y-transparent transition-[grid-template-rows,background-color] ease-[ease] ${on ? 'grid-rows-[1fr] bg-[#232011] duration-[400ms]' : 'grid-rows-[0fr] duration-100'}` : `transition-[grid-template-rows,opacity] duration-[400ms] ease-[ease] ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}`}
                    >
                      <div className="min-h-0">
                        <div className="my-[1.25rem]">
                          <p className="text-small text-grey">{t.text}</p>
                          <div className="mt-[1rem]">
                            <Placeholder label={`${t.title} image`} src={t.image} className="aspect-[1936/1133] w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
