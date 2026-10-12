import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap.js'
import Button from '../shared/Button.jsx'
import Placeholder from '../shared/Placeholder.jsx'

// kiki-header: /nova `.section_kikiheader`. Full-bleed background-video stage (85vh, max 60rem; the video
// band is 1440:500, centred) with the heading block under it. Motion (page script): the heading block starts
// at opacity 0 / y 2rem and reveals when its top passes 85% of the viewport — gsap.to {opacity 1, y 0,
// 0.6s, power2.out}, once. (The original also auto-scrolls to the heading after the 21s video ends if the
// visitor hasn't scrolled; not reproduced, there is no real video here.)
// <=767: component pulled up -15vh, heading block -12rem over the stage; <=479 video band 3:2, 15rem tall, mt 10rem.
function AiIcon({ className = 'mr-[0.5rem] inline-block h-[22px] w-[22px] align-[-5px] xs:h-[19px] xs:w-[19px]' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden className={className}>
      <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 11h8M11 7v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

const DEFAULTS = {
  headingA: 'Meet Nova, the AI helper built for your ',
  headingEm: 'team',
  headingB: '',
  introA: 'You don’t need a team of AI helpers.',
  introStrong: 'Nova does',
  introB: 'the busy work for you.',
  primary: 'Book a demo →',
  secondary: 'Ask an AI about Nimbus',
}

// Optional `aiTrack` (default false): the original's AI button keeps a 22px icon mask (the button is 48px, not 46)
// holding two stacked icons; on hover the track slides up one icon (0.45s power4.inOut after ~0.1s).
function AiIconTrack() {
  return (
    <span aria-hidden className="mr-[0.5rem] inline-block h-[22px] w-[22px] overflow-hidden align-[-5px] xs:h-[19px] xs:w-[19px]">
      <span className="flex flex-col transition-transform delay-[100ms] duration-[450ms] ease-[cubic-bezier(0.86,0,0.07,1)] group-hover:-translate-y-1/2">
        <AiIcon className="block h-[22px] w-[22px] shrink-0 xs:h-[19px] xs:w-[19px]" />
        <AiIcon className="block h-[22px] w-[22px] shrink-0 xs:h-[19px] xs:w-[19px]" />
      </span>
    </span>
  )
}

export default function KikiHeader({ aiTrack = false, ...props }) {
  const p = { ...DEFAULTS, ...props }
  const root = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const h = root.current.querySelector('[data-reveal]')
      gsap.set(h, { opacity: 0, y: '2rem' })
      ScrollTrigger.create({
        trigger: h,
        start: 'top 85%',
        once: true,
        onEnter: () => gsap.to(h, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }),
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <header ref={root} data-section="kiki-header">
      <div className="container-large">
        <div className="relative flex flex-col items-center tab:-mt-[5vh] mob:z-[2] mob:-mt-[15vh]">
          <div className="relative z-[1] flex h-[85vh] max-h-[60rem] w-full flex-col items-center justify-center overflow-visible mob:z-[-1] xs:mt-[5rem]">
            <div className="z-[-1] my-auto self-stretch overflow-hidden xs:mt-[10rem] xs:h-[15rem] xs:flex-[0_1_auto]">
              <Placeholder label="Background video" tone={2} className="aspect-[1440/500] w-full xs:aspect-[3/2] xs:h-full" />
            </div>
          </div>
          <div className="padding-global">
            <div data-reveal className="relative z-[2] mx-auto flex max-w-[42rem] flex-col items-center justify-center text-center mob:-mt-[12rem]">
              <h1 className="font-serif text-[4rem] font-normal leading-[1.1] text-ink mob:text-[2.5rem]">
                {p.headingA}
                <em className="italic">{p.headingEm}</em>
                {p.headingB}
              </h1>
              <div className="h-[1.5rem]" />
              <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">
                {p.introA} <strong className="font-bold">{p.introStrong}</strong> {p.introB}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-[1.5rem] xs:gap-[2rem] xs:self-stretch">
                <Button variant="primary" to="/lms/demo-platform">
                  {p.primary}
                </Button>
                <Button variant="dark" href="#" className={aiTrack ? 'group [&>span:first-child]:h-[22px]' : ''}>
                  {aiTrack ? <AiIconTrack /> : <AiIcon />}
                  {p.secondary}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
