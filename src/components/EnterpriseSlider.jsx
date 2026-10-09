import Button from './shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from './shared/Placeholder.jsx'
import Pagination from './shared/Pagination.jsx'
import { useEffect, useRef, useState } from 'react'
import useLoopCarousel, { useAutoplay } from '../hooks/useLoopCarousel.js'

// §6 3-column slider. Loop is emulated with one clone set either side.
const SLIDE_IMGS = ['slide-3.png', 'slide-4.png', 'slide-5.png', 'slide-6.png', 'slide-1.jpg', 'slide-2.png']
const HOME_SLIDES_DATA = [
  { image: 'Integrations UI', highlight: 'Plays well with your stack.', subdued: 'Connect HR, chat and calendar tools in a few clicks so people and data stay in sync without extra work.' },
  { image: 'Security UI', highlight: 'Security your IT team trusts.', subdued: 'Single sign-on, granular roles and regular independent audits keep every account and every record safe by default.' },
  { image: 'Localised product UI', highlight: 'Speaks every language you do.', subdued: 'Right-to-left layouts and dozens of interface languages make the experience feel native for every region.' },
  { image: 'Captioned video UI', highlight: 'Accessible from the first click.', subdued: 'Captions, keyboard navigation and screen-reader support are built in rather than bolted on later.' },
  { image: 'Event photo', highlight: 'A partner, not just software.', subdued: 'A dedicated team helps you launch, measure and grow, with check-ins that keep momentum going.' },
  { image: 'Event photo', highlight: 'A community that shares ideas.', subdued: 'Meet peers at events throughout the year and swap the playbooks that are working for them.' },
]
const HOME_SLIDES = HOME_SLIDES_DATA.map((sl, i) => ({ ...sl, src: `/assets/${SLIDE_IMGS[i]}` }))

// Case-study variant slide (`.case-study_slide-content`): linked surface-1 card, padding 24,
// min-h 368, radius 12, logo top / 20px copy bottom, background-color .2s on hover.
function CaseSlide({ s, hidden }) {
  return (
    <a
      href="#"
      aria-hidden={hidden}
      className="flex min-h-[23rem] w-[calc((100%_-_(var(--n)_-_1)_*_24px)_/_var(--n))] shrink-0 flex-col justify-between overflow-clip rounded-card bg-surface-1 p-[1.5rem] transition-colors duration-200 hover:bg-surface-2"
    >
      <LogoPlaceholder src={s.logo || undefined} alt="Customer logo" imgClassName="object-left" className="h-[2.625rem] w-[6rem] justify-start text-[1rem] xs:h-[2rem] xs:w-[4.75rem]" />
      <p className="text-medium text-ink xs:text-medium-xs">{s.text}</p>
    </a>
  )
}


const HOME_HEADER = (
  <div className="flex flex-col items-start">
    <h2 className="heading-h2 max-w-[60rem]">Built to grow alongside the largest, busiest teams out there</h2>
    <div className="pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]" />
    <div className="flex">
      <Button variant="primary" to="/lms/demo-platform">
        Meet Nimbus →
      </Button>
    </div>
  </div>
)

/**
 * §6 `.section_wow3col-slider` (Swiper is-3-item: spv 3/2/1, gap 24, loop, speed 800, autoplay
 * 3000 started when 40% visible). Defaults reproduce the homepage. The case-study variant
 * (`.case-studies-story-section`, related-3col-slider) passes a centred header, `variant="case"`
 * slides and its own section padding (96/80).
 * @param {React.ReactNode} [props.header] header node above the slider (default: homepage H2 + button)
 * @param {string} [props.headerSpacerClassName='pt-[2rem]'] spacer between header and slider (case variant: 'pt-[5rem] xs:pt-[3rem]')
 * @param {'feature'|'case'} [props.variant='feature'] slide layout: image + highlight/subdued copy, or logo + text card
 * @param {Array<{highlight?: React.ReactNode, subdued?: React.ReactNode, image?: string, src?: string|null, text?: React.ReactNode, logo?: string|null}>} [props.slides]
 *   'feature': `src` image (null → labelled placeholder `image`), highlight + subdued; 'case': `logo` + `text`.
 * @param {string} [props.className='overflow-hidden pb-[5rem] pt-[2rem] mob:pb-0'] section classes
 */
export default function EnterpriseSlider({
  header = HOME_HEADER,
  headerSpacerClassName = 'pt-[2rem]',
  variant = 'feature',
  slides = HOME_SLIDES,
  className = 'overflow-hidden pb-[5rem] pt-[2rem] mob:pb-0',
}) {
  const SLIDES = slides
  const N = SLIDES.length
  // Swiper params on the original: threshold 5, speed 800, loop; its breakpoints object omits
  // grabCursor, which makes Swiper 11 unset the grab cursor at init, so this one shows `auto`.
  const c = useLoopCarousel(N, { initialPlaying: false, threshold: 5, grabCursor: false })
  useAutoplay(c, { delay: 3000 })
  const all = [...SLIDES, ...SLIDES, ...SLIDES] // clones | real | clones

  // IntersectionObserver threshold 0.4 on the slider container, once: slideToLoop(0, 0) then autoplay.start()
  const containerRef = useRef(null)
  const { jump, setPlaying } = c
  useEffect(() => {
    const el = containerRef.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        jump(0)
        setPlaying(true)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [jump, setPlaying])

  // animateBullet() runs on slideChangeTransitionStart and on play: restart the 3s fill
  const [progressKey, setProgressKey] = useState(0)
  useEffect(() => setProgressKey((k) => k + 1), [c.real, c.playing])

  return (
    <section data-section="enterprise" className={className}>
      <div className="padding-global">
        <div className="container-medium">
          {header}
          <div className={headerSpacerClassName} />

          <div ref={containerRef} className="flex flex-col items-start gap-[2rem]">
            {/* slidesPerView 3 / 2 (768–991) / 1 (<768), spaceBetween 24; not clipped */}
            <div data-carousel="enterprise" className="relative w-full [--n:3] tab:[--n:2] mob:[--n:1]">
              <div
                {...c.trackProps}
                className={`flex gap-[1.5rem] ${c.animate ? 'transition-transform duration-[800ms] ease-[ease]' : ''}`}
                style={{
                  ...c.trackProps.style,
                  transform: `translateX(calc(${-(c.pos + N)} * (100% + 1.5rem) / var(--n) + ${c.dragX}px))`,
                }}
              >
                {all.map((s, i) =>
                  variant === 'case' ? (
                    <CaseSlide key={i} s={s} hidden={i < N || i >= 2 * N} />
                  ) : (
                    <div
                      key={i}
                      aria-hidden={i < N || i >= 2 * N}
                      className="flex w-[calc((100%_-_(var(--n)_-_1)_*_24px)_/_var(--n))] shrink-0 flex-col gap-[1.25rem] overflow-clip rounded-card"
                    >
                      <Placeholder src={s.src || undefined} alt="" tone={2} label={s.image} className="h-[26rem] min-h-[20rem] w-full rounded-media" />
                      <p className="mb-[1.25rem] text-slide font-medium mob:text-slide-mob">
                        <span className="inline-block text-ink">{s.highlight}</span>{' '}
                        <span className="inline-block tracking-[-0.02em] text-grey">{s.subdued}</span>
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <Pagination
              count={N}
              active={c.real}
              playing={c.playing}
              onTogglePlay={() => c.setPlaying((p) => !p)}
              activeWidth={48}
              bulletTransition="duration-[500ms]"
              progressDuration={3}
              progressKey={progressKey}
              onBulletClick={c.goTo}
            />
          </div>
          <div className="pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]" />
        </div>
      </div>
    </section>
  )
}
