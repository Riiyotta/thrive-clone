import Button from './shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from './shared/Placeholder.jsx'
import Pagination from './shared/Pagination.jsx'
import { useEffect, useRef, useState } from 'react'
import useLoopCarousel, { useAutoplay } from '../hooks/useLoopCarousel.js'

// §10 centred highlight carousel (slidesPerView auto, centeredSlides, loop).
const CASE_IMGS = [['case-3.avif', 'case-3-logo.avif'], ['case-4.avif', 'case-4-logo.svg'], ['case-5.avif', 'case-5-logo.svg'], ['case-1.avif', 'case-1-logo.avif'], ['case-2.jpg', 'case-2-logo.svg']]
const SLIDES = [
  { text: 'How a roadside rescue team made learning part of every shift', stats: [['75%', 'of staff active every month'], ['3x', 'more courses completed']] },
  { text: 'A skincare brand that onboards new store staff in days', stats: [['500k+', 'learning moments logged'], ['40%', 'faster time to confidence']] },
  { text: 'Building a sweeter culture across hundreds of bakeries', stats: [['88%', 'of store managers now mentoring new starters'], ['2x', 'internal promotions']] },
  { text: 'A fashion retailer that turned everyday training into a habit its store teams look forward to', stats: [['92%', 'compliance completion'], ['60%', 'less admin time each week']] },
  { text: 'Keeping a fast-moving retail team learning together', stats: [['70%', 'weekly active learners'], ['4.8', 'average course rating']] },
]
const N = SLIDES.length

export default function CaseStudyCarousel() {
  // Original Swiper: threshold 10, speed 800, loop, grabCursor, autoplay 4000 / pauseOnMouseEnter.
  const c = useLoopCarousel(N, { initialPlaying: true, threshold: 10 })
  const hoverRef = useRef(null)
  useAutoplay(c, { delay: 4000, hoverRef })
  const all = [...SLIDES, ...SLIDES, ...SLIDES]
  // updateCenterSlide() runs on slideChangeTransitionEnd / touchEnd and tags every DOM slide
  // (clones included) whose realIndex matches, so the centre styling follows the *settled* index.
  const centreReal = c.settled

  // animateBullet() runs on init, slideChangeTransitionEnd and play: restart the 4s fill
  const [progressKey, setProgressKey] = useState(0)
  useEffect(() => setProgressKey((k) => k + 1), [c.settled, c.playing])

  return (
    <section data-section="highlight" className="overflow-hidden py-[5rem] tab:p-0">
      <div className="padding-global">
        <div className="container-medium">
          <div className="flex flex-row items-end justify-between tab:flex-col tab:items-start tab:gap-[1.5rem]">
            <div className="flex w-[36rem] max-w-full flex-col items-start gap-[1rem]">
              <h2 className="heading-h2">Stories from teams that grew with us</h2>
              <div className="flex">
                <Button variant="dark">Read customer stories</Button>
              </div>
            </div>
            <p className="mb-[1.25rem] max-w-[28rem] text-para text-grey">
              See how teams in retail, travel and beyond turned everyday learning into results they can measure.
            </p>
          </div>

          <div className="h-[5rem] tab:h-[4rem] mob:h-[3rem]" />

          <div className="flex flex-col items-center gap-[2rem]">
            <div
              ref={hoverRef}
              data-carousel="highlight"
              className="relative w-full overflow-visible py-[2.5rem] [container-type:inline-size] [--w:41.625rem] tab:[--w:95cqw]"
            >
              <div
                {...c.trackProps}
                className={`relative left-1/2 flex ${c.animate ? 'transition-transform duration-[800ms] ease-[ease]' : ''}`}
                style={{
                  ...c.trackProps.style,
                  transform: `translateX(calc(${-(c.pos + N)} * var(--w) - var(--w) / 2 + ${c.dragX}px))`,
                }}
              >
                {all.map((s, i) => {
                  const on = i % N === centreReal
                  return (
                    <div
                      key={i}
                      data-center={on}
                      aria-hidden={!on || i < N || i >= 2 * N}
                      className={`relative w-[var(--w)] min-w-[var(--w)] shrink-0 ${
                        on ? 'z-[2] scale-[1.1] opacity-100' : 'scale-[0.95] opacity-20'
                      } transition-[opacity,transform] duration-300 ease-[ease]`}
                    >
                      <div className="flex flex-col gap-[1.25rem]">
                        <div className="relative h-[30rem] overflow-clip rounded-panel mob:h-[24rem]">
                          <Placeholder src={`/assets/${CASE_IMGS[i % N][0]}`} alt="" tone={2} label="Brand photo 16:9" className="absolute inset-0" />
                          <div className="absolute inset-0 p-[2rem] mob:p-[1.5rem]">
                            <LogoPlaceholder src={`/assets/${CASE_IMGS[i % N][1]}`} alt="Customer logo" imgClassName="object-left" className="h-[3rem] w-[7.5rem] justify-start text-[1rem] mob:h-[1.5rem]" />
                          </div>
                        </div>
                        <div
                          className={`flex flex-col gap-[1rem] ${on ? 'visible opacity-100' : 'invisible opacity-0'} transition-[opacity,visibility] duration-300 ease-[ease]`}
                        >
                          <div className="grid grid-cols-[1fr_max-content] items-center gap-[2rem] xs:flex xs:flex-col xs:items-start xs:gap-0">
                            <p className="mb-[1.25rem] line-clamp-2 text-para text-ink">{s.text}</p>
                            <div className="flex">
                              <Button variant="dark">Read more</Button>
                            </div>
                          </div>
                          <div className="flex gap-[1rem] xs:flex-col">
                            {s.stats.map(([n, l]) => (
                              <div
                                key={l}
                                className="flex flex-1 items-center justify-between gap-[3rem] rounded-media bg-surface-2 px-[1.25rem] py-[1rem] xs:justify-start xs:gap-[1rem]"
                              >
                                <span className="text-xlarge font-semibold text-ink xs:text-xlarge-mob">{n}</span>
                                <span className="text-small text-grey">{l}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <Pagination
              count={N}
              active={c.settled}
              playing={c.playing}
              onTogglePlay={() => c.setPlaying((p) => !p)}
              activeWidth={40}
              bulletTransition="duration-300"
              progressDuration={4}
              progressKey={progressKey}
            />
            {/* zero-height .cs-important embed: still takes a 32px flex gap on the original */}
            <div aria-hidden className="h-0" />
          </div>
        </div>
      </div>
    </section>
  )
}
