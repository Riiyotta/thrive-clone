import { useState } from 'react'
import Button from './shared/Button.jsx'
import Placeholder from './shared/Placeholder.jsx'
import Wrap from './shared/Wrap.jsx'

// §4 Product tabs: click-driven, opacity + visibility .3s fade, no autoplay.
const HOME_TABS = [
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

const HOME_INTRO = (
  <>
    One platform brings together a{' '}
    <a href="#" className="inline-link">learning home</a>,{' '}
    <a href="#" className="inline-link">skill journeys</a>,{' '}
    <a href="#" className="inline-link">mentoring</a>,{' '}
    <a href="#" className="inline-link">team spaces</a> and{' '}
    <a href="#" className="inline-link">analytics</a> so nobody has to hunt for anything.
  </>
)

/**
 * §4 `.section_wowcustom-tabs`. Defaults reproduce the homepage (`.homepage-tabs`).
 * Feature pages (`.wow-customs-homepage`) use 4 tabs, section padding 32/80 plus an inner
 * padding-section-medium (80/80), an unconstrained heading column and an intro with no margin.
 * @param {React.ReactNode} [props.heading] H2 (left column)
 * @param {React.ReactNode} [props.intro] grey paragraph (right column, max 28rem)
 * @param {Array<{label: React.ReactNode, short: string, image?: string, src?: string|null, copy: React.ReactNode, cta?: {label: React.ReactNode, to?: string}|null}>} [props.tabs]
 *   tab list; `label` desktop tab text, `short` ≤767 tab text, `src` pane image (null → labelled
 *   Placeholder using `image`), `cta` dark button under the copy. Default: 4 homepage tabs.
 * @param {string} [props.className='py-[2rem] mob:pb-0 xs:pb-[2rem]'] section padding
 * @param {string} [props.innerClassName=''] extra wrapper inside padding-global (e.g. 'py-[5rem] mob:py-[3rem]')
 * @param {string} [props.headingClassName='max-w-[36rem]'] heading column width
 * @param {string} [props.introClassName='mb-[1.25rem]'] intro paragraph margin
 * @param {string} [props.bodyHeightClassName='h-[37rem]'] tabs body height (≥768)
 * @param {string} [props.childHeightClassName='h-[12rem] mob:h-[14rem]'] child copy block height
 * @param {string} [props.paneAspect='aspect-[670/600]'] pane image aspect class
 */
export default function ProductTabs({
  heading = 'Everything your people need to keep growing at work',
  intro = HOME_INTRO,
  tabs = HOME_TABS,
  className = 'py-[2rem] mob:pb-0 xs:pb-[2rem]',
  innerClassName = '',
  headingClassName = 'max-w-[36rem]',
  introClassName = 'mb-[1.25rem]',
  bodyHeightClassName = 'h-[37rem]',
  childHeightClassName = 'h-[12rem] mob:h-[14rem]',
  paneAspect = 'aspect-[670/600]',
}) {
  const [active, setActive] = useState(0)

  return (
    <section data-section="tabs" className={className}>
      <div className="padding-global">
        <Wrap className={innerClassName}>
        <div className="container-medium">
          {/* Header */}
          <div className="flex flex-row items-end justify-between gap-[3.75rem] tab:flex-col tab:items-start tab:gap-[1.5rem]">
            <h2 className={`heading-h2 ${headingClassName}`}>{heading}</h2>
            <div className="max-w-[28rem]">
              <p className={`${introClassName} text-para text-grey`}>{intro}</p>
            </div>
          </div>

          <div className="h-[5rem] tab:h-[4rem] mob:h-[3rem]" />

          {/* Tabs body */}
          <div className={`relative flex ${bodyHeightClassName} flex-col justify-between mob:h-auto`}>
            <div className="w-1/2 mob:flex mob:w-full mob:flex-col">
              <div role="tablist" className="flex flex-col mob:mb-[3rem] mob:flex-row mob:flex-wrap mob:gap-[1.5rem]">
                {tabs.map((t, i) => {
                  const on = i === active
                  return (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActive(i)}
                      className={`w-full border-b border-surface-3 py-[1.5rem] text-left text-tab font-normal mob:w-auto mob:whitespace-nowrap mob:py-[0.5rem] mob:text-tab-mob ${
                        on ? 'tab-chip pl-[2rem] text-ink' : 'pl-[0.25rem] text-tab-inactive'
                      }`}
                    >
                      <span className="mob:hidden">{t.label}</span>
                      <span className="hidden mob:inline">{t.short}</span>
                    </button>
                  )
                })}
              </div>

              {/* Pane: images bleed off the right edge */}
              <div className="absolute bottom-0 right-0 top-0 mr-[-10vw] w-[60%] overflow-clip mob:relative mob:m-0 mob:mb-[3rem] mob:h-[60dvh] mob:w-full xs:h-[40dvh]">
                {tabs.map((t, i) => (
                  <div key={i} data-active={i === active} className="fade-pane absolute left-0 top-0 w-full">
                    <Placeholder
                      src={t.src === undefined ? `/assets/tab-${i + 1}.png` : t.src || undefined}
                      alt=""
                      tone={2}
                      label={t.image}
                      className={`${paneAspect} w-full mob:min-w-full`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Child copy */}
            <div className={`relative ${childHeightClassName} w-[40%] mob:w-full`}>
              {tabs.map((t, i) => (
                <div
                  key={i}
                  data-active={i === active}
                  className="fade-pane absolute inset-x-0 top-0"
                >
                  <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">{t.copy}</p>
                  {t.cta !== null && (
                    <div className="flex flex-wrap gap-[1.5rem] xs:gap-[2rem]">
                      <Button variant="dark" to={t.cta?.to}>
                        {t.cta?.label ?? t.cta}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        </Wrap>
      </div>
    </section>
  )
}
