import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from './shared/Button.jsx'
import Wordmark from './shared/Wordmark.jsx'
import Placeholder from './shared/Placeholder.jsx'

// Nav link targets follow CLONE_SPEC_PAGES.md §D (pages-manifest.json → nav[]).
// Items carry `to` (clone route, rendered as a router <Link>) or `href` (external
// placeholder, rendered as a plain <a target="_blank">). Copy is placeholder.
const CAREERS = { title: 'Careers', desc: 'Come work with us', href: '#', external: true }

// §1 desktop dropdown content (same column/item structure as the original's desktop menus)
const MENUS = [
  {
    label: 'Platform',
    to: '/lms',
    columns: [
      {
        header: 'Solutions',
        items: [
          { title: 'Learning home', desc: 'One place for all learning', to: '/lms/small-business' },
          { title: 'Skill journeys', desc: 'Guided paths that build skills', to: '/lms/corporate-lms' },
          { title: 'Peer mentoring', desc: 'Match people who can help', to: '/lms/enterprise' },
          { title: 'Team spaces', desc: 'Communities around topics', to: '/lms/solutions' },
        ],
      },
      {
        header: 'More',
        items: [
          { title: 'Integrations', desc: 'Connect the tools you use', to: '/lms/professional-services' },
          { title: 'Security', desc: 'How we keep data safe', to: '/lms/impact' },
          { title: 'Analytics', desc: 'See what moves the needle', to: '/lms/integrations' },
          { title: "What's new", desc: 'Fresh features this season', to: '/lms/spring-release' },
        ],
      },
    ],
  },
  {
    label: 'Features',
    to: '/lms/features',
    columns: [
      {
        header: 'Experience',
        items: [
          { title: 'Home feed', to: '/nova' },
          { title: 'Search', to: '/lms/mentoring-software' },
          { title: 'Mobile app', to: '/lms/features/lms-homepage' },
          { title: 'Notifications', to: '/lms/features/spaces' },
          { title: 'Profiles', to: '/lms/features/chat' },
        ],
      },
      {
        header: 'Learning',
        items: [
          { title: 'Courses', to: '/lms/features/learning-pathways' },
          { title: 'Pathways', to: '/lms/features/lms-analytics' },
          { title: 'Assessments', to: '/lms/features/skills' },
          { title: 'Events', to: '/lms/features/employee-assessment-software' },
          { title: 'Certificates', to: '/lms/features/ai-content-creator' },
        ],
      },
      {
        header: 'Admin',
        items: [
          { title: 'Reporting', to: '/lms/features/lms-admin' },
          { title: 'Automations', to: '/lms/features/lms-rewards' },
          { title: 'User groups', to: '/lms/features/mcp' },
          { title: 'Branding', to: '/lms/features/mobile-lms' },
          { title: 'Permissions', to: '/lms/features/lms-security' },
        ],
      },
    ],
  },
  {
    label: 'Content',
    to: '/content',
    columns: [
      {
        items: [
          { title: 'Course library', desc: 'Ready-made courses', to: '/content/topics' },
          { title: 'Authoring', desc: 'Build your own in minutes', to: '/content/sector-suites' },
          { title: 'Compliance packs', desc: 'Required training, sorted', to: '/content/service' },
        ],
      },
      {
        items: [
          { title: 'Content partners', desc: 'Bring in third-party catalogs', to: '/mentoring' },
          { title: 'Custom content', desc: 'Made-to-order by our studio', to: '/content/custom-content' },
        ],
      },
    ],
  },
  {
    label: 'Case Studies',
    to: '/case-studies/lms',
    columns: [
      {
        headerLink: 'Platform',
        headerTo: '/case-studies/lms',
        customers: ['Customer one', 'Customer two', 'Customer three', 'Customer four', 'Customer five'].map((name, i) => ({
          name,
          to: `/case-study/customer-${i + 1}`,
        })),
      },
      {
        headerLink: 'Content',
        headerTo: '/case-studies/content',
        customers: ['Customer six', 'Customer seven', 'Customer eight', 'Customer nine', 'Customer ten'].map((name, i) => ({
          name,
          to: `/case-studies-contents/customer-${i + 6}`,
        })),
      },
    ],
  },
  {
    label: 'Learn',
    to: '/company',
    columns: [
      {
        header: 'About',
        items: [
          { title: 'Our story', desc: 'Why we started Nimbus', to: '/company/why-nimbus' },
          { title: 'What you get', desc: 'Everything in every plan', to: '/whats-included' },
          CAREERS,
          { title: 'Contact', desc: 'Get in touch with sales', to: '/contact-us' },
        ],
      },
      {
        header: 'Resources',
        items: [
          { title: 'Events', desc: 'Live and recorded talks', to: '/resources/events-webinars' },
          { title: 'Blog', desc: 'Ideas on workplace learning', to: '/resources/blog-and-news' },
          { title: 'Guides', desc: 'Practical how-to playbooks', to: '/resources/guides' },
          { title: 'Glossary', desc: 'Terms every team uses', to: '/resources/lms-glossary' },
        ],
      },
    ],
  },
]

// The original's mobile menu (≤991, `.newnav_menu-inner.mob-only`) differs from desktop in
// Features (Core / Performance / Admin, 5/5/4, incl. 4 mobile-only routes) and Learn.
const MOBILE_COLUMNS = {
  Features: [
    {
      header: 'Core',
      items: [
        { title: 'Home feed', to: '/nova' },
        { title: 'Search', to: '/lms/mentoring-software' },
        { title: 'Courses', to: '/lms/features/learning-pathways' },
        { title: 'Engagement', to: '/lms/features/employee-experience' },
        { title: 'Certificates', to: '/lms/features/ai-content-creator' },
      ],
    },
    {
      header: 'Performance',
      items: [
        { title: 'Pathways', to: '/lms/features/lms-analytics' },
        { title: 'Assessments', to: '/lms/features/skills' },
        { title: 'Notifications', to: '/lms/features/spaces' },
        { title: 'Announcements', to: '/lms/features/communication' },
        { title: 'Goals', to: '/lms/features/employee-performance-management-software' },
      ],
    },
    {
      header: 'Admin',
      items: [
        { title: 'Reporting', to: '/lms/features/lms-admin' },
        { title: 'Permissions', to: '/lms/features/lms-security' },
        { title: 'Branding', to: '/lms/features/mobile-lms' },
        { title: 'Leaderboards', to: '/lms/features/lms-gamification' },
      ],
    },
  ],
  Learn: [
    {
      header: 'About',
      items: [
        { title: 'Our story', desc: 'Why we started Nimbus', to: '/company/why-nimbus' },
        { title: 'Events', desc: 'Live and recorded talks', to: '/resources/events-webinars' },
        CAREERS,
        { title: 'Contact', desc: 'Get in touch with sales', to: '/contact-us' },
      ],
    },
    {
      header: 'Resources',
      items: [
        { title: 'Blog', desc: 'Ideas on workplace learning', to: '/resources/blog-and-news' },
        { title: 'Guides', desc: 'Practical how-to playbooks', to: '/resources/guides' },
        { title: 'Glossary', desc: 'Terms every team uses', to: '/resources/lms-glossary' },
        // 4th row links to "#" on the original too (podcast-style item)
        { title: 'Podcast', desc: 'Talks on the future of learning', href: '#' },
      ],
    },
  ],
}

// Internal route -> router <Link>; external / placeholder -> plain <a>.
function NavLink({ item, className, children, onNavigate }) {
  if (item.to) {
    return (
      <Link to={item.to} className={className} onClick={onNavigate}>
        {children}
      </Link>
    )
  }
  return (
    <a href={item.href || '#'} className={className} {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}

function HeaderArrow() {
  return (
    <span className="flex h-[1.05rem] w-[0.75rem] shrink-0 items-center justify-center" aria-hidden>
      <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
        <path d="M1 1l4 4-4 4" className="stroke-grey" strokeWidth="1.4" />
      </svg>
    </span>
  )
}

function DropdownColumn({ col, mobile = false, onNavigate }) {
  // Desktop: items have padding 10/12, radius 6, hover bg; column gap 4.
  // Mobile (measured live at 390/768): header -> list gap 8, items stacked with 0 gap,
  // padding 10px 12px 10px 0, no hover fill; columns are content-width and wrap.
  const itemPad = mobile ? 'py-[0.625rem] pr-[0.75rem]' : 'px-[0.75rem] py-[0.625rem]'
  // Title-only columns (Features) are content-width on the original (99.7 / 123.9 / 83.6px);
  // columns with descriptions or customer rows are 208px with 13rem items.
  const titleOnly = col.items && col.items.every((it) => !it.desc)
  const minW = mobile || titleOnly ? '' : 'min-w-[13rem]'
  const hover = mobile ? '' : 'rounded-item transition-colors duration-[360ms] hover:bg-hover'
  return (
    <div data-col className={`flex flex-col ${mobile ? 'gap-[0.5rem]' : `gap-[0.25rem] ${titleOnly ? '' : 'w-[13rem]'}`}`}>
      {col.header && (
        <div className={`text-dd-head font-semibold text-grey ${mobile ? '' : 'pl-[0.75rem]'}`}>{col.header}</div>
      )}
      {col.headerLink && (
        <Link
          to={col.headerTo}
          onClick={onNavigate}
          className="flex items-center justify-between text-dd-head font-semibold text-grey"
        >
          <span className={mobile ? '' : 'pl-[0.75rem]'}>{col.headerLink}</span>
          <HeaderArrow />
        </Link>
      )}
      <div className={`flex flex-col ${mobile || col.customers ? '' : 'gap-[0.25rem]'}`}>
        {col.items?.map((it) => (
          <NavLink
            key={it.title}
            item={it}
            onNavigate={onNavigate}
            className={`flex ${minW} flex-col gap-[0.25rem] ${hover} ${itemPad}`}
          >
            <span className="text-dd-title font-medium text-ink">{it.title}</span>
            {it.desc && <span className="text-small text-grey">{it.desc}</span>}
          </NavLink>
        ))}
        {col.customers?.map((c) => (
          <NavLink
            key={c.name}
            item={c}
            onNavigate={onNavigate}
            className={`flex ${mobile ? '' : 'min-w-[13rem]'} items-center gap-[1rem] ${hover} ${itemPad}`}
          >
            <Placeholder tone={3} className="h-[1.5rem] w-[1.5rem] shrink-0 rounded-[0.25rem]" />
            <span className="text-dd-title font-medium text-ink">{c.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

function Chevron({ className = '' }) {
  return (
    <span className={`flex h-[0.75rem] w-[0.75rem] items-center justify-center ${className}`} aria-hidden>
      <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
        <path d="M.5.75 3.5 3.75 6.5.75" className="stroke-ink" strokeWidth="1.2" />
      </svg>
    </span>
  )
}

function AiMark() {
  return <Placeholder tone={3} className="h-[1rem] w-[1rem] shrink-0 rounded-full" aria-label="AI assistant icon" />
}

export default function Nav() {
  const { pathname } = useLocation()
  const [openMenu, setOpenMenu] = useState(null)
  const closeTimer = useRef(null)
  // mobile menu phases: closed -> enter -> open -> closing -> closed
  const [phase, setPhase] = useState('closed')
  const [mobileSub, setMobileSub] = useState(null)

  const enter = (label) => {
    clearTimeout(closeTimer.current)
    setOpenMenu(label)
  }
  const leave = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 300) // data-delay=300
  }

  // Close the dropdown and the mobile menu whenever the route changes (the original is a
  // multi-page site, so a click always lands on a fresh page with everything closed).
  const closeAll = () => {
    clearTimeout(closeTimer.current)
    setOpenMenu(null)
    setPhase('closed')
    setMobileSub(null)
  }
  useEffect(closeAll, [pathname])
  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // IX2 "NewNav Menu Open": display flex at opacity 0 / y 20 then animate in the same frame.
  // Commit the 'enter' styles with a forced reflow and flip to 'open' before paint (no rAF delay).
  const menuRef = useRef(null)
  useLayoutEffect(() => {
    if (phase !== 'enter') return
    if (menuRef.current) void menuRef.current.offsetHeight
    setPhase('open')
  }, [phase])

  useEffect(() => {
    if (phase === 'closing') {
      const t = setTimeout(() => setPhase('closed'), 400)
      return () => clearTimeout(t)
    }
  }, [phase])

  const toggleMobile = () => setPhase((p) => (p === 'closed' || p === 'closing' ? 'enter' : 'closing'))

  return (
    <nav data-nav className="fixed inset-x-0 top-0 z-[1000] bg-nav-transparent xs:bg-page">
      <div className="padding-global">
        <div className="container-large relative">
          <div className="flex h-[4rem] items-center justify-between gap-[1rem] p-[1rem]">
            {/* Brand */}
            <div className="flex flex-1 items-center">
              <Link to="/" onClick={closeAll} aria-label="Nimbus home" className="block max-w-[7.75rem] xs:max-w-[6rem]">
                <Wordmark className="h-[1.6875rem] w-[6.0625rem] xs:w-[6rem]" textClassName="text-[1.375rem] leading-none" />
              </Link>
            </div>

            {/* Centre pill (desktop). The open panel is centred on the whole pill (measured x=479.8,
                top=78.2 at 1440), not on the hovered toggle. Toggle labels are links (click
                navigates, hover opens). */}
            <div className="relative flex rounded-pill bg-surface-2 p-[0.25rem] tab:hidden">
              {MENUS.map((m) => (
                <div key={m.label} onMouseEnter={() => enter(m.label)} onMouseLeave={leave}>
                  <Link
                    to={m.to}
                    data-menu-toggle
                    aria-haspopup="true"
                    aria-expanded={openMenu === m.label}
                    onFocus={() => enter(m.label)}
                    className={`flex h-[2.25rem] items-center whitespace-nowrap rounded-pill px-[0.75rem] py-[0.5rem] text-small font-medium text-ink transition-colors duration-[320ms] hover:bg-hover ${
                      openMenu === m.label ? 'bg-hover' : ''
                    }`}
                  >
                    {m.label}
                  </Link>
                </div>
              ))}
              {openMenu && (
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-[0.5rem]"
                  onMouseEnter={() => enter(openMenu)}
                  onMouseLeave={leave}
                >
                  <div data-dd-panel className="flex gap-[2rem] rounded-card bg-surface-2 p-[1rem]">
                    {MENUS.find((m) => m.label === openMenu).columns.map((col, i) => (
                      <DropdownColumn key={i} col={col} onNavigate={closeAll} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA wrap */}
            <div className="flex flex-1 items-center justify-end gap-[0.5rem]">
              <a
                href="#"
                className="group flex h-[2.25rem] w-[3.7rem] items-center gap-[0.375rem] overflow-hidden whitespace-nowrap rounded-pill pl-[0.625rem] text-small text-ink transition-[background-color,width] duration-[250ms,500ms] hover:w-[14.5rem] hover:bg-ai-hover tab:hidden"
              >
                <AiMark />
                <span>Ask why teams choose Nimbus</span>
              </a>
              <Button as={Link} to="/lms/demo-platform" variant="primary-small" stretch={false} onClick={closeAll}>
                Book a demo→
              </Button>
              <button
                type="button"
                aria-label="Menu"
                aria-expanded={phase === 'open' || phase === 'enter'}
                onClick={toggleMobile}
                className="hidden h-[2rem] w-[2rem] items-center justify-center rounded-full border border-ink bg-transparent tab:flex"
              >
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden>
                  <path d="M0 1h12M0 5h12M0 9h12" className="stroke-ink" strokeWidth="1.2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu panel (≤991). Sits right under the 80px bar (container pt 16 + bar 64).
              Two layouts on the original: 480–991 (rows 60, no chevrons, Pricing row, borderless
              centred AI link) and ≤479 (rows 52, inline chevrons, outlined full-width AI link). */}
          {phase !== 'closed' && (
            <div
              ref={menuRef}
              data-state={phase}
              className="mobile-menu absolute left-0 top-[1rem] mt-[4rem] hidden w-full flex-col overflow-y-auto rounded-card bg-page p-[0.25rem] tab:flex xs:h-[100vh]"
            >
              <div className="flex flex-col items-center gap-[0.25rem] px-[1rem]">
                {MENUS.map((m) => {
                  const open = mobileSub === m.label
                  const columns = MOBILE_COLUMNS[m.label] || m.columns
                  return (
                    <div key={m.label} className="w-full py-[0.75rem] xs:py-[0.5rem]">
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => setMobileSub(open ? null : m.label)}
                        className="flex w-full items-center justify-between gap-[0.75rem] text-small font-medium text-ink xs:justify-start xs:gap-[0.125rem]"
                      >
                        {/* label padding 8/12/8/0 (8/8/8/0 at ≤479) + 19.6 line = 35.6px toggle, as measured */}
                        <span className="py-[0.5rem] pr-[0.75rem] xs:pr-[0.5rem]">{m.label}</span>
                        <Chevron className="hidden mt-[-0.3125rem] xs:flex" />
                      </button>
                      {open && (
                        <div className="mt-[1rem] flex flex-wrap gap-x-[2rem] gap-y-[1.5rem] py-[1rem]">
                          {columns.map((col, i) => (
                            <DropdownColumn key={i} col={col} mobile onNavigate={closeAll} />
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
                {/* Plain Pricing row: visible 480–991 only (`hide-mobile-portrait`) */}
                <Link
                  to="/pricing"
                  onClick={closeAll}
                  className="block w-full py-[0.75rem] pr-[0.75rem] text-small font-medium text-ink xs:hidden"
                >
                  Pricing
                </Link>
                <a
                  href="#"
                  className="flex items-center gap-[0.5rem] rounded-pill p-[0.5rem] text-small font-medium text-ink xs:mt-[1rem] xs:self-stretch xs:justify-center xs:border xs:border-link-hover"
                >
                  <AiMark />
                  Ask why teams choose Nimbus
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
