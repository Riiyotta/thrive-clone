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
  ['h1', { opacity: 0, y: 40, scale: 0.9, skewX: 10, filter: 'blur(1.25rem)' }, 1.25, 0],
  ['subtitle', { opacity: 0, y: 10, skewX: 10, filter: 'blur(0.5rem)' }, 1.25, 0.25],
  ['badges', { opacity: 0, y: 10, skewX: 8, filter: 'blur(0.3125rem)' }, 1.25, 0.25],
  ['buttons', { opacity: 0, y: 10, skewX: 10, filter: 'blur(1.25rem)' }, 1.25, 0.35],
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
    <section ref={ref} data-section="hero" className="overflow-hidden pt-[4rem]">
      <div className="padding-global">
        <div className="container-medium">
          <div className="pb-[2rem] pt-[5rem] tab:pt-[4rem] mob:pt-[3rem]">
            <div className="flex flex-row items-center justify-between gap-[3rem] mob:flex-col mob:items-start">
              {/* Left column */}
              <div className="mt-[-3rem] w-full max-w-[42rem] shrink-0">
                <div data-hero-reveal="avatar" className="flex h-[3rem] items-center gap-[1rem] pb-[1rem] mob:h-auto">
                  <div className="relative h-[2rem] w-[4.5rem] shrink-0" aria-label="Avatar strip placeholder" role="img">
                    {[0, 20, 40].map((x) => (
                      <span
                        key={x}
                        style={{ left: x }}
                        className="absolute top-0 h-[2rem] w-[2rem] rounded-full border border-page bg-surface-3"
                      />
                    ))}
                  </div>
                  <p className="text-small text-grey">Trusted by two million learners in ninety countries</p>
                </div>
                <div className="h-[1rem]" />
                <h1
                  data-hero-reveal="h1"
                  className="origin-[50%_100%] font-serif text-h1 font-normal text-ink tab:text-h1-tab mob:text-h1-mob"
                >
                  Workplace learning your people will genuinely look forward to
                </h1>
                <div className="h-[1rem]" />
                <p data-hero-reveal="subtitle" className="mb-[1.25rem] max-w-[36rem] text-medium text-ink xs:text-medium-xs">
                  Learning, skills and mentoring, finally living in one place.
                </p>
                <div data-hero-reveal="badges" className="flex h-[5rem] gap-[2rem] pt-[1rem] xs:h-auto">
                  {['badge-g2.svg', 'badge-capterra.svg', 'badge-software-advice.svg'].map((f, i) => (
                    <Placeholder
                      key={i}
                      src={`/assets/${f}`}
                      alt="Review badge"
                      fit="contain"
                      className="h-[4rem] w-[6.5rem] max-w-[6.5rem] rounded-media xs:h-[3rem] xs:w-[5rem] xs:max-w-[5rem]"
                      labelClassName="text-[0.625rem] leading-[0.75rem]"
                    />
                  ))}
                </div>
                <div className="pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]">
                  <div data-hero-reveal="buttons" className="flex items-center gap-[1rem] xs:flex-col xs:items-stretch">
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
