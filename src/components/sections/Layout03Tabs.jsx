import { useEffect, useRef, useState } from 'react'
import Button from '../shared/Button.jsx'
import Placeholder from '../shared/Placeholder.jsx'

// `layout03-tabs` (.section_layout03-tabs, Webflow Tabs: data-duration-out 200, data-duration-in 400,
// data-easing ease). Vertical tab list (left) + pane (right).
// Tab link: surface-1, radius .75rem, padding 1.5rem 2rem, height 72px (px on the original) and overflow
// hidden when inactive; current = height auto, colour ink. `transition: .3s` (all) animates colour
// #808080 <-> ink and the column gap 8rem (inactive) -> 4rem (current), which is why the newly opened
// tab visibly settles. Pane: old fades out 200ms, new fades in 400ms (ease).
// <=767: two columns, 48px tabs; <=479: single column, the pane is hidden and each tab shows its own
// media (.hide-desktop) under the text.
// Variants:
//  - "image"           /lms/small-business, /lms/corporate-lms: container-large, columns .3fr / 1fr,
//                      pane image anchored bottom-right.
//  - "video"           /lms/enterprise: container-medium, columns .5fr / 1fr, centred 30rem 1:1.1 video.
//  - "video-compact"   /whats-included: like "video" but without the section padding and with a
//                      2.5rem header gap.

const TABS = [
  { tab: 'Analyst', text: 'Nova reads your dashboards and surfaces insight on compliance, engagement and performance the moment it changes. Spot gaps in seconds, not spreadsheets.' },
  { tab: 'Creator', text: 'Turn policies, slide decks and rough notes into polished, interactive courses in minutes, complete with quizzes, summaries and translations ready for every team in the business.' },
  { tab: 'Coach', text: 'Nova checks in after each lesson, asks what landed and suggests one small next step, so new habits keep building long after the session ends for everyone.' },
  { tab: 'Admin', text: 'Let Nova build audiences, schedule reminders, tidy enrolments and prepare reports in the background, so your team can spend far more time with people and far less time on routine setup tasks.' },
  { tab: 'Assistant', text: 'Anyone can ask Nova a question in the flow of work and get a clear answer from your own content, with links to dig deeper.' },
]

function useWebflowTabs() {
  const [current, setCurrent] = useState(0) // .w--current (immediate)
  const [pane, setPane] = useState(0) // displayed pane
  const [phase, setPhase] = useState('in') // 'out' | 'in'
  const t = useRef(null)
  useEffect(() => () => clearTimeout(t.current), [])
  const select = (i) => {
    if (i === current) return
    setCurrent(i)
    setPhase('out')
    clearTimeout(t.current)
    t.current = setTimeout(() => {
      setPane(i)
      setPhase('pre')
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase('in')))
    }, 200)
  }
  const style =
    phase === 'out'
      ? { opacity: 0, transition: 'opacity 200ms ease' }
      : phase === 'pre'
        ? { opacity: 0, transition: 'none' }
        : { opacity: 1, transition: 'opacity 400ms ease' }
  return { current, pane, style, select }
}

function Media({ video, className = '' }) {
  return video ? (
    <div className={`flex h-full flex-col items-stretch justify-center rounded-panel bg-surface-1 p-[1rem] tab:p-[2rem] mob:self-stretch mob:p-[1.5rem] ${className}`}>
      <Placeholder label="Product video" tone={2} className="z-[1] mx-auto aspect-[1/1.1] w-full max-w-[30rem] rounded-card" />
    </div>
  ) : (
    <div className={`relative flex h-full flex-col items-stretch justify-center overflow-clip rounded-panel bg-surface-1 pl-[3rem] pt-[3rem] tab:p-[2rem] mob:self-stretch mob:p-[1.5rem] ${className}`}>
      <Placeholder
        label="Product screenshot"
        tone={2}
        className="absolute bottom-0 right-0 aspect-[1440/851] w-full max-w-full rounded-card tab:bottom-auto tab:px-[1rem]"
      />
    </div>
  )
}

const PRESETS = {
  image: {
    title: 'The AI agent L&D teams have waited for',
    paragraph:
      "All those wish-list projects are now possible thanks to Nova. Nova coaches your people, clears your admin backlog and turns a two-day content job into a two-minute chat. You'll wonder how you ever ran learning without it.",
    tabs: TABS,
  },
  video: {
    title: (
      <>
        AI learning tools for global teams, <br />
        as <em className="italic">capable</em> as the apps you open every day
      </>
    ),
    paragraph:
      "Thanks to Nova, it's never been easier to run learning at a global scale. Coach teams in Lisbon while you check what's working in Sydney, all with one prompt. Handle admin 25x faster and create brilliant learning with Nova.",
    tabs: [
      { tab: 'Analyst', text: 'Nova spots the compliance gap in one region before your board even asks about it, surfacing engagement and performance dips the moment they happen, not weeks later.' },
      { tab: 'Creator', text: 'Brief Nova once and get a course, quiz or video ready for review in minutes, shaped for the team, country and language it is landing in.' },
      { tab: 'Coach', text: 'Nova coaches one team on negotiation and another on compliance at the same time, each in their own language, with no human trainer needed in the room.' },
      { tab: 'Admin', text: 'Nova finds and archives stale content across every region 25x faster than manual tidying, turning a four-hour job into a two-minute one, so your platform team gets their week back.' },
      { tab: 'Assistant', text: 'Ask Nova one question and get the answer pulled from every connected system and every course file you own, with no more searching five places for one answer.' },
    ],
  },
  'video-compact': {
    title: 'Nova comes as standard, whatever your size',
    paragraph:
      'The power of five AI agents rolled into one. Analyse compliance data, create content, coach around the clock in 40+ languages, automate admin and search every connected system.',
    tabs: [
      { tab: 'Analyst', text: 'Surface compliance, engagement and performance gaps in seconds, not spreadsheets.' },
      { tab: 'Creator', text: 'Build courses, quizzes and resources tailored to your teams in minutes. Your content backlog is gone.' },
      { tab: 'Coach', text: 'Deliver role-based coaching in the flow of work that builds real skills, not just completion ticks.' },
      { tab: 'Admin', text: 'Automate workflows and keep your platform tidy and compliant so you can focus on your people.' },
      { tab: 'Assistant', text: 'Your teams get instant answers from across your whole content library, even inside course files. Less searching, more doing.' },
    ],
  },
}

export default function Layout03Tabs({ variant = 'image', title, paragraph, button = { label: 'Meet Nova →', href: '/nova' }, tabs: tabsProp }) {
  const P = PRESETS[variant] || PRESETS.image
  title = title || P.title
  paragraph = paragraph || P.paragraph
  const tabs = tabsProp || P.tabs
  const video = variant !== 'image'
  const { current, pane, style, select } = useWebflowTabs()

  const header = (
    <div className="text-center">
      <div className="mx-auto flex w-full max-w-[60rem] flex-col items-center justify-center">
        <h2 className="heading-h2">{title}</h2>
        <div className="mx-auto mt-[1rem] flex w-full max-w-[42rem] flex-col items-center justify-center">
          <p className="mb-[1.25rem] text-center text-body text-grey xs:text-body-xs">{paragraph}</p>
          <div className="flex w-full flex-wrap items-center justify-center gap-[1.5rem] xs:gap-[2rem]">
            <Button variant="primary" href={button.href}>
              {button.label}
            </Button>
          </div>
        </div>
      </div>
      <div className={variant === 'video-compact' ? 'pt-[2.5rem] mob:pt-[1.25rem]' : 'pt-[5rem] mob:pt-[3rem]'} />
    </div>
  )

  const tabsEl = (
    <div
      className={`grid items-stretch gap-[0.75rem] overflow-hidden ${
        // .layout03_tabs.enterprise (.5fr 1fr) outranks the breakpoint rules on the original
        video ? 'grid-cols-[0.5fr_1fr]' : 'grid-cols-[0.3fr_1fr] tab:grid-cols-[0.5fr_1fr] mob:grid-cols-[1fr_1fr] xs:grid-cols-[1fr]'
      }`}
    >
      <div role="tablist" className="flex h-auto flex-col gap-[0.75rem]">
        {tabs.map((t, i) => {
          const cur = i === current
          return (
            <a
              key={i}
              href="#"
              role="tab"
              aria-selected={cur}
              onClick={(e) => {
                e.preventDefault()
                select(i)
              }}
              className={`flex max-w-full flex-col items-start justify-between overflow-hidden rounded-card bg-surface-1 px-[2rem] py-[1.5rem] transition-all duration-300 mob:rounded-media mob:p-[1rem] ${
                cur ? 'h-auto gap-[4rem] text-ink' : 'h-[72px] gap-[8rem] text-icon mob:h-[48px] mob:gap-[4rem]'
              }`}
            >
              <h3 className="mb-0 text-[1.125rem] font-normal leading-[1.15]">{t.tab}</h3>
              <div>
                <div className="text-body xs:text-body-xs">{t.text}</div>
                <div className="hidden xs:mt-[0.5rem] xs:block xs:w-full">
                  {/* the in-tab (.hide-desktop) media is a screenshot on every variant */}
                  <Placeholder label="Product screenshot" tone={2} className="aspect-[1440/851] w-full rounded-card" />
                </div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="relative overflow-hidden xs:hidden">
        <div className="relative h-full mob:min-h-[40vh]" style={style} data-pane={pane}>
          <Media video={video} />
        </div>
      </div>
    </div>
  )

  if (variant === 'video-compact') {
    return (
      <section data-section="layout03-tabs" data-variant={variant}>
        <div className="padding-global">
          <div className="container-medium">
            {header}
            {tabsEl}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section data-section="layout03-tabs" data-variant={variant}>
      <div className="padding-global">
        <div className={variant === 'image' ? 'container-large' : 'container-medium'}>
          <div className="py-[5rem] tab:py-[4rem] mob:py-[3rem]">
            {header}
            {tabsEl}
          </div>
        </div>
      </div>
    </section>
  )
}
