import { useLayoutEffect, useRef } from 'react'
import Button from '../shared/Button.jsx'
import Placeholder from '../shared/Placeholder.jsx'
import { gsap, SplitText } from '../../lib/gsap.js'

// company-header (header.section_company-header) on /company: full-viewport (100svh, max 60rem)
// background-video hero with a 50% black wash + bottom-up #00030a overlay, centred serif H1,
// one-line lead and two buttons (primary + dark "ask AI" button with an icon track).
// AI button hover (IX3, as .btn_global): chars y -1.5em 0.45s stagger .25 power4.inOut and the icon
// track y -50% 0.45s at 0.125; bg #1a1a1a -> white, text -> #0b0b0b (.24s).

function AiIcon() {
  return (
    <svg viewBox="0 0 22 22" className="h-full w-full" aria-hidden>
      <path d="M11 2.5l1.9 5.6 5.6 1.9-5.6 1.9L11 17.5l-1.9-5.6L3.5 10l5.6-1.9z" fill="currentColor" />
    </svg>
  )
}

export function AiButton({ children, href = '#' }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const btn = ref.current
    const ctx = gsap.context(() => {
      const split = SplitText.create(btn.querySelector('[data-button-animate]'), { type: 'words,chars', wordsClass: 'gsap_split_word', charsClass: 'gsap_split_letter' })
      gsap.set([...split.words, ...split.chars], { position: 'relative', display: 'inline-block' })
      const tl = gsap.timeline({ paused: true })
      tl.to(split.chars, { y: '-1.5em', duration: 0.45, stagger: { amount: 0.25 }, ease: 'power4.inOut' }, 0)
      tl.to(btn.querySelector('[data-icon-track]'), { yPercent: -50, duration: 0.45, ease: 'power4.inOut' }, 0.125)
      const enter = () => tl.play()
      const leave = () => tl.reverse()
      btn.addEventListener('mouseenter', enter)
      btn.addEventListener('mouseleave', leave)
      return () => {
        btn.removeEventListener('mouseenter', enter)
        btn.removeEventListener('mouseleave', leave)
      }
    }, btn)
    return () => ctx.revert()
  }, [])
  return (
    <a
      ref={ref}
      href={href}
      className="group inline-flex shrink-0 items-center justify-center rounded-pill bg-surface-3 px-[1.25rem] py-[0.75rem] text-btn font-medium text-ink no-underline transition-[background-color,color] duration-[240ms] hover:bg-white hover:text-surface-1 mob:py-[0.5rem] xs:flex-auto xs:self-stretch"
    >
      <span className="flex h-[1.375rem] items-center justify-center gap-[0.5rem] overflow-clip">
        <span data-icon-track className="flex flex-col items-center justify-center self-start">
          <span className="flex h-[1.375rem] w-[1.375rem]"><AiIcon /></span>
          <span className="flex h-[1.375rem] w-[1.375rem]"><AiIcon /></span>
        </span>
        <span data-button-animate className="btn-label whitespace-nowrap">
          {children}
        </span>
      </span>
    </a>
  )
}

export default function CompanyHeader({
  title = 'Learning that changes how people grow, connect and do great work',
  lead = 'Nimbus is the learning platform built for people who want to keep growing.',
  primary = { label: 'Book a demo', href: '/lms/demo-platform' },
  secondary = { label: 'Ask AI about Nimbus', href: '#' },
  video = null,
}) {
  return (
    <header data-section="company-header" className="relative text-white">
      <div className="padding-global">
        <div className="container-large">
          <div className="relative z-[1] flex max-h-[60rem] min-h-[100svh] items-end justify-center">
            <div className="py-[7rem] tab:py-[6rem] mob:py-[4rem]">
              <div className="flex w-full max-w-[60rem] flex-col items-center justify-center text-center mob:block">
                <div className="mb-[1.5rem]">
                  <h1 className="mt-[4rem] font-serif text-[4rem] font-normal leading-[1.1] mob:text-[2.5rem]">{title}</h1>
                </div>
                <p className="mb-[1.25rem] text-[1.25rem] leading-[1.4] xs:text-[1.125rem]">{lead}</p>
                <div className="mt-[2.5rem] tab:mt-[1.5rem] mob:mt-[1.25rem]">
                  <div className="flex flex-wrap items-center justify-center gap-[1.5rem] xs:gap-[2rem]">
                    <Button href={primary.href}>{primary.label}</Button>
                    <AiButton href={secondary.href}>{secondary.label}</AiButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))]">
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(0deg,#00030a_30%,rgba(0,3,10,0.1))]" />
        <Placeholder label="Background video" src={video || undefined} className="relative z-0 h-full w-full" />
      </div>
    </header>
  )
}
