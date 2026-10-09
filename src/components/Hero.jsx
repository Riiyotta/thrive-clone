import { useLayoutEffect, useRef } from 'react'
import Button from './shared/Button.jsx'
import Placeholder from './shared/Placeholder.jsx'
import Eyebrow from './shared/Eyebrow.jsx'
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

const BADGES = ['badge-g2.svg', 'badge-capterra.svg', 'badge-software-advice.svg']

/**
 * `.section_wowh-hero`. Defaults reproduce the homepage hero; feature-detail pages (hero-wowh)
 * pass `eyebrow`, `showBadges={false}`, `subtitleTone="grey"`, `secondaryVariant="dark"` and a
 * 1440×1289 image (`imageAspect="aspect-[1440/1289]"`).
 * @param {object} props
 * @param {string} [props.eyebrow] when set, renders the green-chip eyebrow instead of the avatar row
 * @param {string} [props.eyebrowChipClassName='bg-green-hover'] eyebrow chip colour class
 * @param {React.ReactNode} [props.proof] avatar-row text (homepage only, ignored when `eyebrow` is set)
 * @param {React.ReactNode} [props.title] H1
 * @param {React.ReactNode} [props.subtitle] paragraph under the H1 (max 36rem)
 * @param {'ink'|'grey'} [props.subtitleTone='ink'] subtitle colour (grey on subpages)
 * @param {boolean} [props.showBadges=true] review-badge row; when false the buttons follow the
 *   subtitle directly (its 20px bottom margin is the only gap, as on subpages)
 * @param {{label: React.ReactNode, to?: string}} [props.primary] primary button
 * @param {{label: React.ReactNode, to?: string}|null} [props.secondary] secondary button (null hides it)
 * @param {'dark-small'|'dark'} [props.secondaryVariant='dark-small'] secondary button style (subpages: 'dark', 44px)
 * @param {string} [props.imageSrc='/assets/hero-visual.webp'] hero image; null renders a labelled placeholder
 * @param {string} [props.imageLabel='Product UI collage'] placeholder label / alt
 * @param {string} [props.imageAspect='aspect-[1440/1090]'] aspect class of the bleeding image
 */
export default function Hero({
  eyebrow,
  eyebrowChipClassName,
  proof = 'Trusted by two million learners in ninety countries',
  title = 'Workplace learning your people will genuinely look forward to',
  subtitle = 'Learning, skills and mentoring, finally living in one place.',
  subtitleTone = 'ink',
  showBadges = true,
  primary = { label: 'Book a demo →', to: '/lms/demo-platform' },
  secondary = { label: 'Why Nimbus?', to: '/company/why-nimbus' },
  secondaryVariant = 'dark-small',
  imageSrc = '/assets/hero-visual.webp',
  imageLabel = 'Product UI collage',
  imageAspect = 'aspect-[1440/1090]',
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      REVEAL.forEach(([key, from, duration, delay]) => {
        const target = ref.current.querySelector(`[data-hero-reveal="${key}"]`)
        if (!target) return
        const to = { opacity: 1, y: 0, skewX: 0, duration, delay, ease: 'power3.out' }
        if ('scale' in from) to.scale = 1
        if ('filter' in from) to.filter = 'blur(0px)'
        gsap.fromTo(target, from, to)
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
                {eyebrow ? (
                  <Eyebrow data-hero-reveal="avatar" chipClassName={eyebrowChipClassName}>
                    {eyebrow}
                  </Eyebrow>
                ) : (
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
                    <p className="text-small text-grey">{proof}</p>
                  </div>
                )}
                <div className="h-[1rem]" />
                <h1
                  data-hero-reveal="h1"
                  className="origin-[50%_100%] font-serif text-h1 font-normal text-ink tab:text-h1-tab mob:text-h1-mob"
                >
                  {title}
                </h1>
                <div className="h-[1rem]" />
                <p
                  data-hero-reveal="subtitle"
                  className={`mb-[1.25rem] max-w-[36rem] text-medium ${subtitleTone === 'grey' ? 'text-grey' : 'text-ink'} xs:text-medium-xs`}
                >
                  {subtitle}
                </p>
                {showBadges && (
                  <div data-hero-reveal="badges" className="flex h-[5rem] gap-[2rem] pt-[1rem] xs:h-auto">
                    {BADGES.map((f, i) => (
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
                )}
                <div className={showBadges ? 'pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]' : ''}>
                  <div data-hero-reveal="buttons" className="flex items-center gap-[1rem] xs:flex-col xs:items-stretch">
                    <Button variant="primary" to={primary.to}>
                      {primary.label}
                    </Button>
                    {secondary && (
                      <Button variant={secondaryVariant} to={secondary.to}>
                        {secondary.label}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right column: bleeds past the viewport edge */}
              <div className="mr-[-30vw] w-full overflow-clip mob:mr-0">
                <Placeholder
                  src={imageSrc || undefined}
                  alt={imageLabel}
                  label={imageSrc ? undefined : imageLabel}
                  className={`${imageAspect} w-[80%] ultra:w-[75%] mob:w-full`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
