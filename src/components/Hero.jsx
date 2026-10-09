import { useLayoutEffect, useRef } from 'react'
import Button from './shared/Button.jsx'
import Placeholder from './shared/Placeholder.jsx'
import { gsap } from '../lib/gsap.js'

// §13.2 IX2 "Wow Hero Reveal" (a-100), read from the original's IX2 store.
// outQuart (IX2, quartic) == GSAP power3.out. Initial states are set in a layout effect,
// i.e. before the first paint, so nothing flashes.
const REVEAL = [
  // [target, from, duration s, delay s]
  ['avatar', { opacity: 0, y: 40, scale: 0.9, skewX: 10 }, 0.5, 0],
  ['h1', { opacity: 0, y: 40, scale: 0.9, skewX: 10, filter: 'blur(20px)' }, 1.25, 0],
  ['subtitle', { opacity: 0, y: 10, skewX: 10, filter: 'blur(8px)' }, 1.25, 0.25],
  ['badges', { opacity: 0, y: 10, skewX: 8, filter: 'blur(5px)' }, 1.25, 0.25],
  ['buttons', { opacity: 0, y: 10, skewX: 10, filter: 'blur(20px)' }, 1.25, 0.35],
]

export default function Hero() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      REVEAL.forEach(([key, from, duration, delay]) => {
        const to = { opacity: 1, y: 0, skewX: 0, duration, delay, ease: 'power3.out' }
        if ('scale' in from) to.scale = 1
        if ('filter' in from) to.filter = 'blur(0px)'
        gsap.fromTo(`[data-hero-reveal="${key}"]`, from, to)
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} data-section="hero" className="overflow-hidden pt-[64px]">
      <div className="padding-global">
        <div className="container-medium">
          <div className="pb-[32px] pt-[80px] tab:pt-[64px] mob:pt-[48px]">
            <div className="flex flex-row items-center justify-between gap-[48px] mob:flex-col mob:items-start">
              {/* Left column */}
              <div className="mt-[-48px] w-full max-w-[42rem] shrink-0">
                <div data-hero-reveal="avatar" className="flex h-[48px] items-center gap-[16px] pb-[16px] mob:h-auto">
                  <div className="relative h-[32px] w-[72px] shrink-0" aria-label="Avatar strip placeholder" role="img">
                    {[0, 20, 40].map((x) => (
                      <span
                        key={x}
                        style={{ left: x }}
                        className="absolute top-0 h-[32px] w-[32px] rounded-full border border-page bg-surface-3"
                      />
                    ))}
                  </div>
                  <p className="text-small text-grey">Trusted by two million learners in ninety countries</p>
                </div>
                <div className="h-[16px]" />
                <h1
                  data-hero-reveal="h1"
                  className="origin-[50%_100%] font-serif text-h1 font-normal text-ink tab:text-h1-tab mob:text-h1-mob"
                >
                  Workplace learning your people will genuinely look forward to
                </h1>
                <div className="h-[16px]" />
                <p data-hero-reveal="subtitle" className="mb-[20px] max-w-[576px] text-medium text-ink xs:text-medium-xs">
                  Learning, skills and mentoring, finally living in one place.
                </p>
                <div data-hero-reveal="badges" className="flex h-[80px] gap-[32px] pt-[16px] xs:h-auto">
                  {['badge-g2.svg', 'badge-capterra.svg', 'badge-software-advice.svg'].map((f, i) => (
                    <Placeholder
                      key={i}
                      src={`/assets/${f}`}
                      alt="Review badge"
                      fit="contain"
                      className="h-[64px] w-[104px] max-w-[104px] rounded-media xs:h-[3rem] xs:w-[5rem] xs:max-w-[5rem]"
                      labelClassName="text-[10px] leading-[12px]"
                    />
                  ))}
                </div>
                <div className="pt-[32px] tab:pt-[24px] mob:pt-[20px]">
                  <div data-hero-reveal="buttons" className="flex items-center gap-[16px] xs:flex-col xs:items-stretch">
                    <Button variant="primary">
                      Book a demo →
                    </Button>
                    <Button variant="dark-small">
                      Why Nimbus?
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right column: bleeds past the viewport edge */}
              <div className="mr-[-30vw] w-full overflow-clip mob:mr-0">
                <Placeholder
                  src="/assets/hero-visual.webp"
                  alt="Product UI collage"
                  className="aspect-[1440/1090] w-[80%] ultra:w-[75%] mob:w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
