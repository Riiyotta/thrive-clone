import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap.js'
import Button from '../shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from '../shared/Placeholder.jsx'

// mentoring-header: /lms/mentoring-software `.section_mentoring-header`.
// Wide hero image (150% of the container, 35rem tall, black->transparent top fade; in-flow 3:2 with radius 1rem
// <=767) pulled up -8rem under the nav, then a centred hero block (-3rem overlap): avatar line, H1 4.5rem/1.15,
// 20px grey copy, brand-blue + dark buttons, logo line + 6 logos.
// Motion: IX2 "Mentoring Hero Reveal" (same family as Wow Hero Reveal, outQuart == power3.out):
// avatar .5s; H1 1.25s (y40 scale.9 skew10 blur); copy 1.25s d.25; buttons 1.25s d.35; image opacity .5s / y .85s / blur 1s.
const REVEAL = [
  ['avatar', { opacity: 0, y: 40, scale: 0.9, skewX: 10 }, 0.5, 0],
  ['image', { opacity: 0, y: '2rem', filter: 'blur(1.25rem)' }, 0.85, 0],
  ['h1', { opacity: 0, y: 40, scale: 0.9, skewX: 10, filter: 'blur(1.25rem)' }, 1.25, 0],
  ['copy', { opacity: 0, y: 10, skewX: 10, filter: 'blur(0.5rem)' }, 1.25, 0.25],
  ['buttons', { opacity: 0, y: 10, skewX: 10, filter: 'blur(1.25rem)' }, 1.25, 0.35],
]

const DEFAULTS = {
  trusted: 'Chosen by 5 million people in over 60 countries',
  headingA: 'Mentoring software',
  headingB: 'that grows people',
  introLead: 'When AI can answer anything, a real conversation counts.',
  intro:
    'Nimbus mentoring software pairs mentors and mentees, tracks progress and turns peer learning into results the business can see. Use it on its own or as part of your platform.',
  primary: 'Watch the video',
  secondary: 'Book a demo →',
  logosLead: 'Building a mentoring culture at',
  logos: ['logo-volvo.png', 'logo-burgerking.png', 'logo-vodafone.png', 'logo-ba.png', 'logo-krispykreme.svg', 'logo-nothingbundt.png'],
}

export default function MentoringHeader(props) {
  const p = { ...DEFAULTS, ...props }
  const ref = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      REVEAL.forEach(([key, from, duration, delay]) => {
        const to = { opacity: 1, y: 0, duration, delay, ease: 'power3.out' }
        if ('skewX' in from) to.skewX = 0
        if ('scale' in from) to.scale = 1
        if ('filter' in from) to.filter = 'blur(0px)'
        gsap.fromTo(`[data-reveal="${key}"]`, from, to)
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <header ref={ref} data-section="mentoring-header" className="overflow-x-clip">
      <div className="padding-global">
        <div className="container-medium">
          <div className="pb-[6rem] tab:pb-[5rem] mob:pb-[3.5rem]">
            <div className="-mt-[8rem] flex flex-col items-center justify-start gap-[2rem]">
              <div className="relative flex h-[35rem] w-[150%] items-center justify-center gap-[4rem] mob:h-auto mob:justify-start mob:gap-[2rem] xs:gap-[1rem]">
                <div data-reveal="image" className="absolute inset-0 mx-auto w-full mob:relative">
                  <Placeholder label="Mentoring hero image" tone={2} className="absolute inset-0 z-[-2] aspect-[3/2] h-full w-full tab:rounded-panel mob:relative mob:h-auto" />
                  <div className="absolute inset-0 z-[-1] flex-1 bg-[linear-gradient(#000,rgba(0,0,0,0)_46%)]" />
                </div>
              </div>
              <div className="relative z-[1] -mt-[3rem] h-auto w-full max-w-[60rem] text-center">
                <div data-reveal="avatar" className="flex flex-wrap items-center justify-center gap-[1rem] text-small text-grey">
                  <Placeholder src="/assets/hero-avatars.png" alt="" fit="contain" className="aspect-[144/64] w-[4.5rem] shrink-0" />
                  <div>{p.trusted}</div>
                </div>
                <div className="w-full pt-[1rem]" />
                <h1 data-reveal="h1" className="font-serif text-h1 font-normal text-ink tab:text-h1-tab mob:text-h1-mob">
                  {p.headingA}
                  <br />
                  {p.headingB}
                </h1>
                <div className="w-full pt-[1rem]" />
                <div className="mx-auto flex max-w-[36rem] flex-col items-center justify-center">
                  <p data-reveal="copy" className="mb-[1.25rem] text-medium text-grey xs:text-medium-xs">
                    {p.introLead}
                    <br />
                    {p.intro}
                  </p>
                </div>
                <div data-reveal="buttons" className="flex items-center justify-center gap-[1rem] xs:flex-col xs:items-stretch">
                  <Button variant="primary" href="#mentoring-video" className="!bg-[#2a63f6] !text-white hover:!bg-white hover:!text-[#131313]">
                    {p.primary}
                  </Button>
                  <Button variant="dark" to="/lms/demo-platform">
                    {p.secondary}
                  </Button>
                </div>
              </div>
              <div className="mt-[0.5rem] w-full text-center text-body text-ink xs:text-body-xs">{p.logosLead}</div>
              <div className="container-medium -mt-[2rem]">
                <div className="flex w-full flex-col items-center gap-[2rem]">
                  <div className="flex max-w-[60rem] items-center justify-between gap-[3rem] pt-[2rem] tab:flex-wrap tab:justify-center tab:gap-y-[2rem] mob:justify-around xs:gap-[2rem]">
                    {p.logos.map((f, i) => (
                      <div key={i} className="flex w-[7rem] items-center justify-center overflow-clip">
                        <LogoPlaceholder src={`/assets/${f}`} alt="Customer logo" className="aspect-[120/49] max-h-[4rem] w-full text-[0.75rem]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
