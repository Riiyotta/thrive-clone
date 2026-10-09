import Button from './shared/Button.jsx'
import Placeholder from './shared/Placeholder.jsx'
import Pagination from './shared/Pagination.jsx'
import { useEffect, useRef, useState } from 'react'
import useLoopCarousel, { useAutoplay } from '../hooks/useLoopCarousel.js'

// §6 3-column slider. Loop is emulated with one clone set either side.
const SLIDE_IMGS = ['slide-3.png', 'slide-4.png', 'slide-5.png', 'slide-6.png', 'slide-1.jpg', 'slide-2.png']
const SLIDES = [
  { image: 'Integrations UI', highlight: 'Plays well with your stack.', subdued: 'Connect HR, chat and calendar tools in a few clicks so people and data stay in sync without extra work.' },
  { image: 'Security UI', highlight: 'Security your IT team trusts.', subdued: 'Single sign-on, granular roles and regular independent audits keep every account and every record safe by default.' },
  { image: 'Localised product UI', highlight: 'Speaks every language you do.', subdued: 'Right-to-left layouts and dozens of interface languages make the experience feel native for every region.' },
  { image: 'Captioned video UI', highlight: 'Accessible from the first click.', subdued: 'Captions, keyboard navigation and screen-reader support are built in rather than bolted on later.' },
  { image: 'Event photo', highlight: 'A partner, not just software.', subdued: 'A dedicated team helps you launch, measure and grow, with check-ins that keep momentum going.' },
  { image: 'Event photo', highlight: 'A community that shares ideas.', subdued: 'Meet peers at events throughout the year and swap the playbooks that are working for them.' },
]
const N = SLIDES.length

export default function EnterpriseSlider() {
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
    <section data-section="enterprise" className="overflow-hidden pb-[5rem] pt-[2rem] mob:pb-0">
      <div className="padding-global">
        <div className="container-medium">
          <div className="flex flex-col items-start">
            <h2 className="heading-h2 max-w-[60rem]">Built to grow alongside the largest, busiest teams out there</h2>
            <div className="pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]" />
            <div className="flex">
              <Button variant="primary">Meet Nimbus →</Button>
            </div>
          </div>
          <div className="pt-[2rem]" />

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
                {all.map((s, i) => (
                  <div
                    key={i}
                    aria-hidden={i < N || i >= 2 * N}
                    className="flex w-[calc((100%_-_(var(--n)_-_1)_*_24px)_/_var(--n))] shrink-0 flex-col gap-[1.25rem] overflow-clip rounded-card"
                  >
                    <Placeholder src={`/assets/${SLIDE_IMGS[SLIDES.indexOf(s)]}`} alt="" tone={2} label={s.image} className="h-[26rem] min-h-[20rem] w-full rounded-media" />
                    <p className="mb-[1.25rem] text-slide font-medium mob:text-slide-mob">
                      <span className="inline-block text-ink">{s.highlight}</span>{' '}
                      <span className="inline-block tracking-[-0.02em] text-grey">{s.subdued}</span>
                    </p>
                  </div>
                ))}
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
