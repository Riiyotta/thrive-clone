import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap, ScrollTrigger } from '../../lib/gsap.js'
import Button from '../shared/Button.jsx'
import SharedEyebrow from '../shared/Eyebrow.jsx'
import Placeholder, { LogoPlaceholder } from '../shared/Placeholder.jsx'

// pricing-hero: /pricing `.section_wowcontent.new-pricing-page-calculator`.
// Header (eyebrow chip, H1, paragraph, 3 review badges) -> "We have [users] learners" select ->
// platform card (currency select, eyebrow, price, primary + modal button, 7-item check list) ->
// results ticker under the card (IX2 "3cards - stat flip": every 4s the track moves one row, 850ms outQuart, loops).
// The secondary button opens a right-hand drawer (IX2 Modal 2: content x 100% -> 0 500ms outQuad,
// overlay opacity 0 -> 1 500ms ease; hidden <=479 like the original).
// Plans/prices are placeholders; selects mirror the original custom `.cs-*` dropdowns (px-sized on the original).

// ---------- small shared bits (also used by ContentPricing.jsx) ----------
export function Eyebrow({ children, chip = 'bg-green-hover', className = '' }) {
  return (
    <SharedEyebrow chipClassName={chip} className={className}>
      {children}
    </SharedEyebrow>
  )
}

const CHECK_MASK =
  "url(\"data:image/svg+xml,%3Csvg width='12' height='10' viewBox='0 0 12 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.68.26a.75.75 0 0 1 1.14.98l-7.35 8.5a.75.75 0 0 1-1.1.04L.22 6.59a.75.75 0 1 1 1.06-1.06l2.58 2.61z' fill='%23000'/%3E%3C/svg%3E\")"

export function CheckList({ items, color = '#1de9b6', className = '' }) {
  return (
    <ul role="list" className={`mb-[1rem] mt-[0.75rem] grid list-none grid-cols-[100%] pl-0 ${className}`}>
      {items.map((t) => (
        <li key={t} className="mb-[0.75rem] flex items-center gap-[0.75rem] text-ink">
          <span
            aria-hidden
            className="mr-[8px] inline-block h-[10px] w-[12px] shrink-0"
            style={{ backgroundColor: color, WebkitMaskImage: CHECK_MASK, maskImage: CHECK_MASK, WebkitMaskRepeat: 'no-repeat', WebkitMaskSize: 'contain' }}
          />
          <div>{t}</div>
        </li>
      ))}
    </ul>
  )
}

function Chevron({ small }) {
  return small ? (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
      <path d="M8.22.22a.75.75 0 0 1 1.06 1.06L5.81 4.75a1.5 1.5 0 0 1-2.12 0L.22 1.28A.75.75 0 0 1 1.28.22l3.47 3.47z" fill="white" fillOpacity=".5" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15.22 10.22a.75.75 0 0 1 1.06 1.06l-3.47 3.47a1.5 1.5 0 0 1-2.12 0l-3.47-3.47a.75.75 0 0 1 1.06-1.06L12 13.69z" fill="white" fillOpacity=".5" />
    </svg>
  )
}

function Tick({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M16.68 7.26a.75.75 0 0 1 1.14.98l-7.35 8.5a.75.75 0 0 1-1.1.04l-3.15-3.19a.75.75 0 1 1 1.06-1.06l2.58 2.61z" fill={color} />
    </svg>
  )
}

// Custom dropdown, px-sized like the original `.cs-*` embed (12px 16px padding, 48px tall, radius 12, 15px text).
export function PricingSelect({ value, options, onChange, width = 180, optionWidth = 264, compact = false, tick = '#1de9b6', label }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])
  return (
    <div ref={ref} className="relative inline-block select-none">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className="box-border flex h-[48px] cursor-pointer items-center justify-between gap-[8px] whitespace-nowrap rounded-[12px] bg-surface-3 px-[16px] py-[12px] text-[15px] leading-[1.4] text-white"
        style={{ width }}
      >
        <span className="flex items-center gap-[12px]">{value}</span>
        <Chevron small={compact} />
      </button>
      {open && (
        <div role="listbox" className="absolute left-0 top-[calc(100%+6px)] z-10 max-h-[600px] overflow-y-auto overflow-x-hidden rounded-[12px] bg-surface-3">
          {options.map((o) => {
            const on = o === value
            return (
              <div
                key={o}
                role="option"
                aria-selected={on}
                onClick={() => {
                  onChange(o)
                  setOpen(false)
                }}
                className={`box-border flex h-[48px] cursor-pointer items-center justify-between gap-[8px] whitespace-nowrap px-[16px] py-[12px] text-[15px] text-white hover:bg-[#404040] ${
                  on ? (compact ? 'bg-[#2a2a2a]' : 'bg-[#404040]') : ''
                }`}
                style={{ width: compact ? width : optionWidth }}
              >
                <span>{o}</span>
                {!compact && (on ? <Tick color={tick} /> : <span className="inline-block w-[24px]" />)}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export const CURRENCIES = { USD: ['$', 1], GBP: ['£', 0.8], EUR: ['€', 0.92], AUD: ['A$', 1.5], CAD: ['C$', 1.36], AED: ['AED ', 3.67] }
export const formatPrice = (usd, cur) => {
  const [sym, rate] = CURRENCIES[cur]
  if (usd == null) return 'On request'
  return sym + (Math.round((usd * rate) / 50) * 50).toLocaleString('en-US')
}

// ---------- results ticker (IX2 stat flip) ----------
export function TickerTrack({ items, renderItem, trackClass = '', delay = 4, className = '' }) {
  const root = useRef(null)
  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      const track = el.querySelector('[data-track]')
      const rows = [...track.children]
      const tl = gsap.timeline({ paused: true, repeat: -1 })
      tl.set(track, { y: 0 })
      rows.slice(1).forEach((r) => tl.to(track, { y: () => -r.offsetTop, duration: 0.85, ease: 'power3.out', delay }))
      tl.set(track, { y: 0 })
      ScrollTrigger.create({ trigger: el, start: 'top bottom', once: true, onEnter: () => tl.play() })
    }, el)
    return () => ctx.revert()
  }, [delay, items.length])
  return (
    <div ref={root} className={className}>
      <div data-track className={`flex flex-col ${trackClass || 'gap-[1rem]'}`}>
        {[...items, items[0]].map((it, i) => (
          <div key={i}>{renderItem(it, i)}</div>
        ))}
      </div>
    </div>
  )
}

// ---------- modal drawer ----------
function FeatureModal({ open, onClose, title, intro, tabs }) {
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)
  const [tab, setTab] = useState(0)
  useEffect(() => {
    if (open) {
      setMounted(true)
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
      return () => cancelAnimationFrame(id)
    }
    setShown(false)
    const t = setTimeout(() => setMounted(false), 500)
    return () => clearTimeout(t)
  }, [open])
  if (!mounted) return null
  return createPortal(
    <div className="fixed inset-0 z-[99999999] flex h-[100vh] w-[100vw] items-center justify-end xs:hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 z-[-1] h-full w-full bg-[rgba(0,0,0,0.4)] backdrop-blur-[20px] transition-opacity duration-500 ease-[ease]"
        style={{ opacity: shown ? 1 : 0 }}
      />
      <div
        className="absolute mt-[1rem] h-[100vh] w-[75vw] max-w-[60rem] overflow-auto bg-surface-1 px-[3rem] py-[5rem] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] tab:w-[80%] tab:max-w-none tab:py-[4rem] mob:w-[90%] mob:px-[2rem] mob:pb-[7rem]"
        style={{ transform: shown ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-[2rem] top-[1rem] text-[1.5rem] leading-none text-grey hover:text-ink">
          ✕
        </button>
        <div className="mb-[1.5rem]">
          <h2 className="heading-h2 mt-0">{title}</h2>
          <p className="mt-[1rem] text-grey">{intro}</p>
        </div>
        <div className="mb-[0.75rem] flex flex-wrap">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setTab(i)}
              className={`border-b px-[1.25rem] py-[9px] ${i === tab ? 'border-white text-white' : 'border-transparent text-[gray]'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative h-[35rem] w-full overflow-clip rounded-panel bg-surface-3">
          {tabs.map((t, i) => (
            <div key={t.label} data-active={i === tab} className="fade-pane absolute inset-0">
              <Placeholder label="Product screenshot" tone={2} className="absolute left-[12vw] right-0 top-0 h-[75%]" />
              <div className="absolute inset-x-0 bottom-0 z-[3] h-[45%] bg-[linear-gradient(rgba(26,26,26,0),#1a1a1a_61%)]" />
              <div className="relative z-[5] flex h-full items-end px-[2.5rem] pb-[1rem]">
                <div>
                  <div className="text-[1.25rem] leading-[1.4]">{t.title}</div>
                  <div className="pt-[0.75rem]" />
                  <p className="text-grey">{t.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}

// ---------- defaults ----------
const USER_BRACKETS = ['1–250', '251–500', '501–1,000', '1,001–2,500', '2,501–5,000', '5,001–10,000', '10,000+']
const PLAN_USD = [9000, 14000, 21000, 32000, 45000, 62000, null]

const DEFAULTS = {
  eyebrow: 'Plans',
  heading: 'Clear pricing. No hidden costs.',
  intro: 'See what Nimbus costs for your team today, with every core feature included from the start.',
  badges: ['/assets/badge-g2.svg', '/assets/badge-capterra.svg', '/assets/badge-software-advice.svg'],
  planEyebrow: 'One plan for every growing team',
  planLead: 'Everything you need to run learning in one place.',
  primaryCta: 'Book a demo →',
  secondaryCta: 'See what comes in the box',
  listLead: 'Included from the very first day:',
  features: [
    'Run mentoring programmes for every team across sites',
    'Draft new courses in minutes with built-in help',
    'Find an answer from any connected tool or system in seconds with Nova',
    'Turn learning into results leaders can see',
    'One home for learning, news and everyday work',
    'Your own branded space that feels truly yours',
    'A named specialist who already knows your setup',
  ],
  results: [
    { stat: '3,200% rise in course views within a year' },
    { stat: '94% of staff completed their profiles' },
    { stat: '41% less time spent on admin tasks' },
  ],
  modal: {
    title: 'Ready to go on day one',
    intro: 'Six core features that turn learning into results the business can see',
    tabs: [
      { label: 'Home', title: 'A single home for learning and team knowledge', body: 'Give everyone a personal space where courses, news, chat and daily work sit side by side, so nobody has to hunt across tools to find what they need.' },
      { label: 'Nova', title: 'An AI assistant included as standard', body: 'Nova answers questions, drafts content and coaches learners, built in at no extra cost.' },
      { label: 'Authoring', title: 'Create courses in minutes', body: 'Turn documents and ideas into ready-to-share lessons with guided AI drafting.' },
      { label: 'Spaces', title: 'Spaces for every team', body: 'Group people, content and conversations around a team, site or project.' },
      { label: 'Mentoring', title: 'Mentoring at scale', body: 'Match mentors and mentees automatically and track how pairs progress.' },
      { label: 'Reports', title: 'Reports leaders trust', body: 'Live dashboards that tie learning activity to the numbers the business tracks.' },
    ],
  },
}

export default function PricingHero(props) {
  const p = { ...DEFAULTS, ...props }
  const brackets = p.brackets || USER_BRACKETS
  const prices = p.pricesUsd || PLAN_USD
  const [users, setUsers] = useState('–')
  const [cur, setCur] = useState('USD')
  const [modal, setModal] = useState(false)
  const idx = brackets.indexOf(users)
  const price = idx < 0 ? CURRENCIES[cur][0] + '0' : formatPrice(prices[idx], cur)

  return (
    <section data-section="pricing-hero" className="padding-global">
      <div className="container-medium">
        <div className="pb-[2rem] pt-[5rem] mob:pt-[3rem]">
          <div className="flex flex-col items-center gap-[2rem]">
            {/* header */}
            <div className="flex max-w-[28rem] flex-col items-center text-center">
              <Eyebrow>{p.eyebrow}</Eyebrow>
              <div className="pt-[1rem]" />
              <h1 className="heading-h2 mt-0">{p.heading}</h1>
              <div className="pt-[1rem]" />
              <p className="mb-[1.25rem] text-para text-grey">{p.intro}</p>
              <div className="flex items-center gap-[2rem] pt-[1rem]">
                {p.badges.map((src, i) => (
                  <Placeholder key={i} src={src} alt="Review badge" fit="contain" label="Badge" tone={2} className="aspect-[71/63] h-[4rem] max-w-[6.5rem] rounded-media xs:h-[3rem] xs:max-w-[5rem]" />
                ))}
              </div>
            </div>

            {/* users select */}
            <div className="flex flex-wrap items-center justify-center gap-[1rem] self-stretch xs:flex-col xs:justify-start">
              <div className="text-ink">We have</div>
              <PricingSelect label="Number of learners" value={users} options={brackets} onChange={setUsers} width={180} />
              <div className="text-ink">learners</div>
            </div>

            {/* plan card */}
            <div className="w-full max-w-[36rem]">
              <div className="flex flex-col">
                <div className="relative rounded-panel bg-surface-2 px-[2rem] pb-[2rem] pt-[3.5rem] xs:flex xs:flex-col xs:items-start xs:justify-between xs:pt-[2rem]">
                  <div className="absolute right-[2rem] top-[2rem] xs:static xs:mb-[0.9rem]">
                    <PricingSelect label="Currency" value={cur} options={Object.keys(CURRENCIES)} onChange={setCur} width={110} compact />
                  </div>
                  <Eyebrow>{p.planEyebrow}</Eyebrow>
                  <div className="pt-[0.75rem]" />
                  <div className="text-grey">{p.planLead}</div>
                  <div className="pt-[1rem]" />
                  <div data-price className="font-serif text-[4rem] font-medium leading-[1.4] text-ink xs:text-[2.5rem]">
                    {price}
                  </div>
                  <div className="flex flex-wrap items-center justify-start gap-[1.5rem] xs:gap-[1rem] xs:self-stretch">
                    <Button variant="primary" to="/lms/demo-platform">
                      {p.primaryCta}
                    </Button>
                    <Button
                      variant="dark"
                      className="gap-[0.5rem]"
                      onClick={(e) => {
                        e.preventDefault()
                        setModal(true)
                      }}
                    >
                      {p.secondaryCta}
                    </Button>
                  </div>
                  <div className="pt-[2rem]" />
                  <div className="text-grey">{p.listLead}</div>
                  <div className="pt-[0.75rem]" />
                  <CheckList items={p.features} color="#1de9b6" />
                </div>
                {/* results ticker */}
                <div className="relative h-[4.5rem] xs:h-[5rem]">
                  <div className="absolute inset-x-0 top-0 mx-[1rem] flex flex-col rounded-b-[12px] border border-t-0 border-hover pb-[1rem] pl-[1.5rem] pr-[1rem] pt-[1.25rem] xs:mx-0 xs:px-[0.5rem] xs:pb-[1.25rem]">
                    <TickerTrack
                      className="h-[2rem] overflow-clip xs:h-[3rem]"
                      items={p.results}
                      renderItem={(r) => (
                        <div className="flex items-center justify-center gap-[2rem] xs:gap-[1rem]">
                          <LogoPlaceholder className="h-[2rem] w-[4rem] shrink-0 text-[0.625rem]" />
                          <div className="text-[1rem] leading-[1.4rem] text-grey">{r.stat}</div>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeatureModal open={modal} onClose={() => setModal(false)} {...p.modal} />
    </section>
  )
}
