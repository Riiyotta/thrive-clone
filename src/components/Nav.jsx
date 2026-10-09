import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Button from './shared/Button.jsx'
import Wordmark from './shared/Wordmark.jsx'
import Placeholder from './shared/Placeholder.jsx'

// §1 dropdown content (placeholder copy, same column/item structure as spec)
const MENUS = [
  {
    label: 'Platform',
    columns: [
      {
        header: 'Solutions',
        items: [
          { title: 'Learning home', desc: 'One place for all learning' },
          { title: 'Skill journeys', desc: 'Guided paths that build skills' },
          { title: 'Peer mentoring', desc: 'Match people who can help' },
          { title: 'Team spaces', desc: 'Communities around topics' },
        ],
      },
      {
        header: 'More',
        items: [
          { title: 'Integrations', desc: 'Connect the tools you use' },
          { title: 'Security', desc: 'How we keep data safe' },
          { title: 'Analytics', desc: 'See what moves the needle' },
          { title: 'Pricing', desc: 'Plans for every team size' },
        ],
      },
    ],
  },
  {
    label: 'Features',
    columns: [
      { header: 'Experience', items: ['Home feed', 'Search', 'Mobile app', 'Notifications', 'Profiles'].map((t) => ({ title: t })) },
      { header: 'Learning', items: ['Courses', 'Pathways', 'Assessments', 'Events', 'Certificates'].map((t) => ({ title: t })) },
      { header: 'Admin', items: ['Reporting', 'Automations', 'User groups', 'Branding', 'Permissions'].map((t) => ({ title: t })) },
    ],
  },
  {
    label: 'Content',
    columns: [
      {
        items: [
          { title: 'Course library', desc: 'Ready-made courses' },
          { title: 'Authoring', desc: 'Build your own in minutes' },
          { title: 'Compliance packs', desc: 'Required training, sorted' },
        ],
      },
      {
        items: [
          { title: 'Content partners', desc: 'Bring in third-party catalogs' },
          { title: 'Custom content', desc: 'Made-to-order by our studio' },
        ],
      },
    ],
  },
  {
    label: 'Case Studies',
    columns: [
      { headerLink: 'Platform', customers: ['Customer one', 'Customer two', 'Customer three', 'Customer four', 'Customer five'] },
      { headerLink: 'Content', customers: ['Customer six', 'Customer seven', 'Customer eight', 'Customer nine', 'Customer ten'] },
    ],
  },
  {
    label: 'Learn',
    columns: [
      {
        header: 'About',
        items: [
          { title: 'Our story', desc: 'Why we started Nimbus' },
          { title: 'Careers', desc: 'Come work with us' },
          { title: 'Partners', desc: 'Grow alongside our team' },
          { title: 'Contact', desc: 'Get in touch with sales' },
        ],
      },
      {
        header: 'Resources',
        items: [
          { title: 'Blog', desc: 'Ideas on workplace learning' },
          { title: 'Guides', desc: 'Practical how-to playbooks' },
          { title: 'Webinars', desc: 'Live and recorded talks' },
          { title: 'Help centre', desc: 'Answers for every user' },
        ],
      },
    ],
  },
]

function DropdownColumn({ col, mobile = false }) {
  const itemPad = mobile ? 'py-[10px] pr-[12px]' : 'px-[12px] py-[10px]'
  // Title-only columns (Features) are content-width on the original (99.7 / 123.9 / 83.6px);
  // columns with descriptions or customer rows are 208px with 13rem items.
  const titleOnly = col.items && col.items.every((it) => !it.desc)
  const minW = titleOnly ? '' : 'min-w-[13rem]'
  return (
    <div className={`flex flex-col gap-[4px] ${mobile || titleOnly ? '' : 'w-[208px]'}`}>
      {col.header && (
        <div className={`text-dd-head font-semibold text-grey ${mobile ? '' : 'pl-[12px]'}`}>{col.header}</div>
      )}
      {col.headerLink && (
        <a href="#" className={`flex items-center gap-[4px] text-dd-head font-semibold text-grey ${mobile ? '' : 'pl-[12px]'}`}>
          {col.headerLink}
          <span aria-hidden>↗</span>
        </a>
      )}
      {col.items?.map((it) => (
        <a
          key={it.title}
          href="#"
          className={`flex ${minW} flex-col gap-[4px] rounded-item transition-colors duration-[360ms] hover:bg-hover ${itemPad}`}
        >
          <span className="text-dd-title font-medium text-ink">{it.title}</span>
          {it.desc && <span className="text-small text-grey">{it.desc}</span>}
        </a>
      ))}
      {col.customers?.map((name) => (
        <a
          key={name}
          href="#"
          className={`flex min-w-[13rem] items-center gap-[4px] rounded-item transition-colors duration-[360ms] hover:bg-hover ${itemPad}`}
        >
          <Placeholder tone={3} className="h-[24px] w-[24px] shrink-0 rounded-[4px]" />
          <span className="text-dd-title font-medium text-ink">{name}</span>
        </a>
      ))}
    </div>
  )
}

function Chevron({ className = '' }) {
  return (
    <span className={`flex h-[12px] w-[12px] items-center justify-center ${className}`} aria-hidden>
      <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
        <path d="M.5.75 3.5 3.75 6.5.75" className="stroke-ink" strokeWidth="1.2" />
      </svg>
    </span>
  )
}

function AiMark() {
  return <Placeholder tone={3} className="h-[16px] w-[16px] shrink-0 rounded-full" aria-label="AI assistant icon" />
}

export default function Nav() {
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
          <div className="flex h-[64px] items-center justify-between gap-[16px] p-[16px]">
            {/* Brand */}
            <div className="flex flex-1 items-center">
              <a href="#" className="block max-w-[124px] xs:max-w-[6rem]">
                <Wordmark className="h-[27px] w-[97px] xs:w-[96px]" textClassName="text-[22px] leading-none" />
              </a>
            </div>

            {/* Centre pill (desktop). The open panel is centred on the whole pill (measured x=479.8,
                top=78.2 at 1440), not on the hovered toggle. */}
            <div className="relative flex rounded-pill bg-surface-2 p-[4px] tab:hidden">
              {MENUS.map((m) => (
                <div key={m.label} onMouseEnter={() => enter(m.label)} onMouseLeave={leave}>
                  <button
                    type="button"
                    aria-expanded={openMenu === m.label}
                    className={`flex h-[36px] items-center whitespace-nowrap rounded-pill px-[12px] py-[8px] text-small font-medium text-ink transition-colors duration-[320ms] hover:bg-hover ${
                      openMenu === m.label ? 'bg-hover' : ''
                    }`}
                  >
                    {m.label}
                  </button>
                </div>
              ))}
              {openMenu && (
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-[8px]"
                  onMouseEnter={() => enter(openMenu)}
                  onMouseLeave={leave}
                >
                  <div className="flex gap-[32px] rounded-card bg-surface-2 p-[16px]">
                    {MENUS.find((m) => m.label === openMenu).columns.map((col, i) => (
                      <DropdownColumn key={i} col={col} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA wrap */}
            <div className="flex flex-1 items-center justify-end gap-[8px]">
              <a
                href="#"
                className="group flex h-[36px] w-[3.7rem] items-center gap-[6px] overflow-hidden whitespace-nowrap rounded-pill pl-[10px] text-small text-ink transition-[background-color,width] duration-[250ms,500ms] hover:w-[14.5rem] hover:bg-ai-hover tab:hidden"
              >
                <AiMark />
                <span>Ask why teams choose Nimbus</span>
              </a>
              <Button variant="primary-small" stretch={false}>
                Book a demo→
              </Button>
              <button
                type="button"
                aria-label="Menu"
                aria-expanded={phase === 'open' || phase === 'enter'}
                onClick={toggleMobile}
                className="hidden h-[32px] w-[32px] items-center justify-center rounded-full border border-ink bg-transparent tab:flex"
              >
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden>
                  <path d="M0 1h12M0 5h12M0 9h12" className="stroke-ink" strokeWidth="1.2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu panel (≤991) */}
          {phase !== 'closed' && (
            <div
              ref={menuRef}
              data-state={phase}
              className="mobile-menu absolute left-0 top-0 mt-[64px] hidden w-full flex-col overflow-y-auto rounded-card bg-page p-[4px] tab:flex xs:h-[100vh]"
            >
              {MENUS.map((m) => {
                const open = mobileSub === m.label
                return (
                  <div key={m.label} className="py-[8px]">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setMobileSub(open ? null : m.label)}
                      className="flex h-[36px] w-full items-center justify-between px-[12px] text-small font-medium text-ink"
                    >
                      {m.label}
                      <Chevron />
                    </button>
                    {open && (
                      <div className="mt-[1rem] flex flex-col gap-[16px] bg-transparent px-[12px]">
                        {m.columns.map((col, i) => (
                          <DropdownColumn key={i} col={col} mobile />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
              <a
                href="#"
                className="mx-auto mt-[16px] flex items-center gap-[6px] rounded-pill border border-link-hover px-[16px] py-[8px] text-small text-ink"
              >
                <AiMark />
                Ask why teams choose Nimbus
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
