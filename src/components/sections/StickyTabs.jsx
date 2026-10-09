import { useCallback, useEffect, useState } from 'react'
import useLoopCarousel from '../../hooks/useLoopCarousel.js'
import Button from '../shared/Button.jsx'
import Eyebrow from '../shared/Eyebrow.jsx'
import Placeholder from '../shared/Placeholder.jsx'

// sticky-tabs (`.section_sticky-parent-div`): a sticky anchor bar (`.section_sticky-nav`: sticky
// top 0, z 999, page bg, 4rem/1rem padding) over a stack of autotab panels (`.section_wowautotabs`).
//   'solutions' /lms/solutions (fluid root): bar in container-small (45.25rem), 5 anchors (the 5th
//               points at the sectors section further down); panel header = eyebrow + H4 + para |
//               stat card (40%, 1px #303030, radius .5rem); 16:9-ish product shots.
//   'features'  /lms/features (fixed 16px root): bar in container-medium, 6 anchors; panel header =
//               eyebrow / 2rem / title 24/33.6 w500 + para / 2rem; taller (clipped) product shots.
// Anchor bar behaviour (webflow.js):
//   - scroll-spy: a link is current while its section satisfies
//     top + height - vh/2 >= scrollY && top + vh/2 <= scrollY + vh  → green (#1ee9b6) / #000a06
//     (same colours on :hover), `transition: all .25s`.
//   - click: animated scroll to the section top (no offset), duration
//     472.143·ln(|Δ| + 125) − 2000 ms, easeInOutCubic.
// Panels: Swiper is-wowautotabs (slidesPerView 1, spaceBetween 24px, loop, speed 800, grab,
// no autoplay); tab click = slideToLoop(i); active tab surface-3, others surface-1 (no hover).
// ≤767: anchors 200px wide and the bar scrolls horizontally (150px at ≤479); tab rows wrap
// (or scroll horizontally for panels with `tabsScroll`), 3.5rem tall.
const IMG = { solutions: 'aspect-[1728/1117]', features: 'aspect-[2912/2600]' }

const SOLUTIONS = {
  nav: [
    { label: 'Onboarding', href: '#learning' },
    { label: 'Sales', href: '#performance' },
    { label: 'Careers', href: '#skills' },
    { label: 'Culture', href: '#engagement' },
    { label: 'Sectors', href: '#industries' },
  ],
  panels: [
    {
      id: 'learning',
      tabsScroll: true,
      eyebrow: 'Onboarding and compliance',
      heading: 'Staff training and compliance tools',
      body: ['Nimbus runs onboarding, regulatory training and frontline learning in one ', 'connected learning platform', ', with audit-ready reporting and easy mobile access for every single busy team.'],
      stat: '35%',
      statBody: ['Customer one', ' trimmed their chef academy by three months, getting new cooks ready sooner while cutting travel costs.'],
      tabs: [
        { tab: 'New starter onboarding', text: 'Best for people and learning teams who need every new starter productive fast, with clear steps, checklists and timely nudges from day one.' },
        { tab: 'Compliance training', text: 'Best for regulated teams that need assigned courses, automatic reminders and clear audit trails without chasing people by email.' },
        { tab: 'Frontline learning', text: 'Best for shift-based teams who learn on their phones in short bursts between customers, shifts and busy periods on site.' },
        { tab: 'Policy rollout', text: 'Best for leaders sharing new policies who need proof that every person has read, understood and signed off on time.' },
        { tab: 'Product training', text: 'Best for retail and service teams learning new products fast, with short videos, quick quizzes and handy refreshers.' },
      ],
    },
    {
      id: 'performance',
      bodyInside: true,
      eyebrow: 'Sales and service performance',
      heading: 'Sales enablement solutions for customer-facing teams and their managers',
      body: ['Nimbus gives sales, service and support teams the skills to hit targets, with ', 'Nova', ' coaching every rep and clear insight for managers.'],
      stat: '88%',
      statBody: ['of ', 'Customer two', ' stores lifted their customer service scores within six months of rolling out new weekly coaching.'],
      tabs: [
        { tab: 'Sales coaching', text: 'Best for lifting sales results with role-based pathways, practice scenarios and coaching that fits into a busy week.' },
        { tab: 'Service excellence', text: 'Best for service teams building consistent habits that customers notice in every single conversation.' },
        { tab: 'Manager coaching', text: 'Best for managers who want simple prompts and insight to coach their teams every week.' },
        { tab: 'Product launches', text: 'Best for getting every rep confident on a new launch before it reaches customers.' },
        { tab: 'Performance reviews', text: 'Best for linking learning to goals, reviews and growth plans in one clear view.' },
      ],
    },
    {
      id: 'skills',
      bodyInside: true,
      eyebrow: 'Skills and career growth',
      heading: 'Blended learning tools for building skills and careers',
      body: ['Learning and development teams use Nimbus to map skills, build careers and grow future leaders across every level and location of the business, with simple tools that managers and learners enjoy using.'],
      stat: '350 goals',
      statBody: ['Customer three', ' set across teams in the first quarter.'],
      tabs: [
        { tab: 'Skills mapping', text: 'Best for workforce planning teams who need a live view of skills, gaps and strengths across the whole business today.' },
        { tab: 'Career pathways', text: 'Best for growing talent from within with clear routes into new and senior roles.' },
        { tab: 'Peer mentoring', text: 'Best for pairing people with mentors and tracking progress over time.' },
        { tab: 'Leadership growth', text: 'Best for building strong leaders at every level of the business.' },
        { tab: 'Blended programmes', text: 'Best for mixing live sessions, digital learning and on-the-job tasks.' },
      ],
    },
    {
      id: 'engagement',
      bodyInside: true,
      eyebrow: 'Culture and connection',
      heading: 'Engagement tools that build a lasting culture of learning',
      body: ['Keep people coming back with social learning, rewards and recognition, so learning feels like a natural part of the culture rather than a box to tick each year.'],
      stat: '3x',
      statBody: ['Customer four', ' tripled weekly active learners after launching rewards.'],
      tabs: [
        { tab: 'Social learning', text: 'Best for teams that learn from each other through posts, spaces and shared tips every day.' },
        { tab: 'Rewards', text: 'Best for recognising progress with points, badges and real prizes.' },
        { tab: 'Recognition', text: 'Best for celebrating great work in public across the business.' },
        { tab: 'Internal comms', text: 'Best for sharing news and updates where learning happens.' },
        { tab: 'Wellbeing', text: 'Best for supporting people with resources they can trust.' },
      ],
    },
  ],
}

const featTabs = (names) =>
  names.map((tab) => ({ tab, text: `A ${tab.toLowerCase()} space that brings the right learning, news and tools together in one place for every person.` }))

const FEATURES = {
  nav: [
    { label: 'Grow your people', href: '#develop-people' },
    { label: 'Build learning', href: '#create-learning' },
    { label: 'Connect and engage', href: '#communicate-and-engage' },
    { label: 'Prove impact', href: '#measure-impact' },
    { label: 'Use AI', href: '#work-with-ai' },
    { label: 'Scale safely', href: '#scale-securely' },
  ],
  panels: [
    { id: 'develop-people', eyebrow: 'Grow your people', title: 'Learning platform features for growing people', body: ['Give every employee a personal home for learning, with pathways, skills and goals that adapt as they grow, as teams at ', 'Customer one and Customer two', ' found when they moved their whole workforce onto Nimbus.'], tabs: featTabs(['Home', 'Pathways', 'Skills', 'Goals', 'Mentoring']) },
    { id: 'create-learning', eyebrow: 'Build learning', title: 'The key features of a modern content studio', body: ['Build pathways, campaigns and courses in minutes with simple drag-and-drop tools, just like ', 'Customer three', ' did when they rebuilt their whole induction programme.'], tabs: featTabs(['Studio', 'Campaigns', 'Library', 'Assessments', 'Events']) },
    { id: 'communicate-and-engage', eyebrow: 'Connect and engage', title: 'Platform tools that keep people talking together', body: ['Chat, notifications, rewards and spaces keep teams at ', 'Customer four', ' connected, informed and learning together every single day, wherever they happen to work.'], tabs: featTabs(['Messages', 'Spaces', 'Rewards', 'Alerts', 'Feeds']) },
    { id: 'measure-impact', eyebrow: 'Prove impact', title: 'Platform analytics and reporting for every leader', body: ['Track completions, assessments and skills growth in real time with clear, shareable dashboards, just as ', 'Customer five', ' now does across every one of its sites, regions and teams.'], tabs: featTabs(['Dashboards', 'Reports', 'Skills', 'Exports']) },
    { id: 'work-with-ai', eyebrow: 'Use AI', title: 'AI features that save every team real time', body: ['Nova drafts courses, answers everyday questions and surfaces useful insight in seconds, just as ', 'Customer six', ' saw within weeks of switching it on for every team across the business.'], tabs: featTabs(['Nova', 'Studio AI', 'Insights', 'Search']) },
    { id: 'scale-securely', eyebrow: 'Scale safely', title: 'Security and admin features built for scale', body: ['Single sign-on, flexible roles and full audit trails keep every record safe and every admin in control, just as ', 'Customer seven', ' relied on for a fast and smooth global rollout.'], tabs: featTabs(['Security', 'Admin', 'Roles', 'Mobile', 'Audit']) },
  ],
}

function Rich({ parts }) {
  // [text, link, text, ...] — odd entries render as the white underlined inline link
  return parts.map((p, i) =>
    i % 2 ? (
      <a key={i} href="#" className="inline-link">
        {p}
      </a>
    ) : (
      <span key={i}>{p}</span>
    ),
  )
}

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)

// webflow.js in-page anchor scroll
function webflowScrollTo(el) {
  const start = window.scrollY
  const end = el.getBoundingClientRect().top + window.scrollY
  const dist = end - start
  const duration = Math.max(0, 472.143 * Math.log(Math.abs(dist) + 125) - 2000)
  const t0 = performance.now()
  const step = (now) => {
    const t = Math.min(1, (now - t0) / duration)
    window.scrollTo(0, start + dist * easeInOutCubic(t))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function Panel({ p, variant }) {
  const N = p.tabs.length
  const c = useLoopCarousel(N, { threshold: 5 })
  const all = [...p.tabs, ...p.tabs, ...p.tabs]
  const solutions = variant === 'solutions'

  return (
    <div id={p.id} className="overflow-hidden py-[3rem]" data-panel={p.id}>
      <div className="padding-global">
        <div className="container-large">
          <div className="container-medium">
            {solutions ? (
              <>
                <div className="flex justify-between gap-[3rem] mob:flex-col mob:items-start">
                  <div className="w-full max-w-[60rem]">
                    <div className="flex max-w-[56rem] flex-col items-start justify-start">
                      <div className="flex flex-col items-start justify-start gap-[1rem]">
                        <Eyebrow>{p.eyebrow}</Eyebrow>
                        <h2 className="mb-[1rem] mt-[0.25rem] max-w-[40rem] text-xlarge font-normal text-ink mob:text-xlarge-mob">{p.heading}</h2>
                        {p.bodyInside && (
                          <p className="mb-0 max-w-[40rem] text-para text-grey">
                            <Rich parts={p.body} />
                          </p>
                        )}
                      </div>
                    </div>
                    {!p.bodyInside && (
                      <p className="mb-0 max-w-[40rem] text-para text-grey">
                        <Rich parts={p.body} />
                      </p>
                    )}
                  </div>
                  <div className="w-[40%] rounded-media border border-solid border-[#303030] p-[1.5rem] mob:w-full">
                    <div className="flex h-full flex-col items-start justify-between gap-[1rem]">
                      <div className="text-[2rem] font-semibold leading-none text-green">{p.stat}</div>
                      <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">
                        <Rich parts={p.statBody} />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]" />
              </>
            ) : (
              <div>
                <Eyebrow>{p.eyebrow}</Eyebrow>
                <div className="w-full pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]" />
                <div className="w-full max-w-[40rem]">
                  <div className="flex text-tab font-medium text-ink mob:text-medium">{p.title}</div>
                  <p className="mb-[2rem] pt-[1rem] text-para text-grey">
                    <Rich parts={p.body} />
                  </p>
                </div>
                <div className="w-full pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]" />
              </div>
            )}

            <div className="flex flex-col gap-[0.5rem]">
              <div
                role="tablist"
                className={`flex gap-[0.75rem] mob:flex-wrap mob:items-center mob:justify-start mob:overflow-auto ${
                  p.tabsScroll ? 'mob:flex-nowrap' : 'xs:flex-wrap'
                }`}
              >
                {p.tabs.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === c.real}
                    onClick={() => c.goTo(i)}
                    className={`relative flex h-[4.75rem] w-full flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-card p-[8px] text-center text-kikitab text-ink tab:text-[1rem] mob:h-[3.5rem] mob:w-[200px] mob:min-w-[200px] mob:flex-none mob:text-[1rem] mob:leading-[1.4] xs:w-auto xs:min-w-[150px] ${
                      p.tabsScroll ? '' : 'xs:flex-1'
                    } ${i === c.real ? 'bg-surface-3' : 'bg-surface-1'}`}
                  >
                    <span className="relative z-[1] flex">{t.tab}</span>
                  </button>
                ))}
              </div>

              <div className="w-full overflow-clip">
                <div
                  {...c.trackProps}
                  className={`flex gap-[24px] ${c.animate ? 'transition-transform duration-[800ms] ease-[ease]' : ''}`}
                  style={{
                    ...c.trackProps.style,
                    transform: `translateX(calc(${-(c.pos + N)} * (100% + 24px) + ${c.dragX}px))`,
                  }}
                >
                  {all.map((t, i) => (
                    <div key={i} aria-hidden={i !== c.pos + N} className="flex w-full shrink-0">
                      <div
                        className={`flex w-full flex-col items-start justify-start gap-[2.5rem] overflow-hidden rounded-panel bg-surface-1 px-[2.5rem] pt-[2.5rem] mob:p-[1.5rem] mob:pb-0 ${solutions ? 'xs:min-h-[26.75rem]' : 'xs:min-h-[27.25rem]'}`}
                      >
                        <div className="relative flex w-full items-end justify-between gap-[3rem] mob:flex-col mob:items-start">
                          <div className={`w-full ${solutions ? 'max-w-[42rem]' : 'max-w-[36rem]'}`}>
                            <p className={`text-body text-ink xs:text-body-xs ${solutions ? '' : 'mb-[1.25rem]'}`}>{t.text}</p>
                          </div>
                          <Button variant="primary" href="#">
                            {solutions ? 'Learn more' : 'Explore'}
                          </Button>
                        </div>
                        <div className={`flex w-full flex-col overflow-hidden ${solutions ? 'h-[36.6rem] xs:h-[11.08rem]' : 'h-[38.19rem] xs:h-[10.56rem]'}`}>
                          <Placeholder label={`${t.tab} product shot`} tone={2} className={`${IMG[variant]} w-full shrink-0`} />
                        </div>
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
  )
}

export default function StickyTabs({ variant = 'solutions', nav, panels }) {
  const data = variant === 'features' ? FEATURES : SOLUTIONS
  const items = nav || data.nav
  const list = panels || data.panels
  const [current, setCurrent] = useState(() => items.map(() => false))

  // webflow.js links module: scroll-spy on hash links
  const spy = useCallback(() => {
    const vh = window.innerHeight
    const y = window.scrollY
    const off = vh * 0.5
    setCurrent(
      items.map((it) => {
        const el = document.getElementById(it.href.slice(1))
        if (!el) return false
        const r = el.getBoundingClientRect()
        const top = r.top + y
        return top + r.height - off >= y && top + off <= y + vh
      }),
    )
  }, [items])

  useEffect(() => {
    spy()
    window.addEventListener('scroll', spy, { passive: true })
    window.addEventListener('resize', spy)
    return () => {
      window.removeEventListener('scroll', spy)
      window.removeEventListener('resize', spy)
    }
  }, [spy])

  return (
    <div data-section="sticky-tabs" className="relative h-auto">
      <div className="sticky top-0 z-[999] mt-0 bg-page pb-[1rem] pt-[4rem]">
        <div className="padding-global">
          <div className={variant === 'features' ? 'container-medium' : 'mx-auto w-full max-w-[45.25rem]'}>
            <nav className="flex justify-center gap-[1rem] mob:items-center mob:justify-start mob:overflow-auto">
              {items.map((it, i) => (
                <a
                  key={it.href}
                  href={it.href}
                  data-current={current[i] || undefined}
                  onClick={(e) => {
                    const el = document.getElementById(it.href.slice(1))
                    if (!el) return
                    e.preventDefault()
                    webflowScrollTo(el)
                  }}
                  className={`relative flex h-[3.5rem] w-full max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-card p-[8px] text-center text-[1rem] leading-[1.4] no-underline transition-all duration-[250ms] ease-[ease] hover:bg-green hover:text-[#000a06] mob:w-[200px] mob:min-w-[200px] xs:w-[150px] xs:min-w-[150px] ${
                    current[i] ? 'bg-green text-[#000a06]' : 'bg-surface-1 text-ink'
                  }`}
                >
                  <div className="flex">
                    <div>{it.label}</div>
                  </div>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {list.map((p) => (
        <Panel key={p.id} p={p} variant={variant} />
      ))}
    </div>
  )
}
