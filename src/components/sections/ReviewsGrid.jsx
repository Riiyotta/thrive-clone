import { useRef } from 'react'
import useLoopCarousel, { useAutoplay } from '../../hooks/useLoopCarousel.js'
import { LogoPlaceholder } from '../shared/Placeholder.jsx'
import Placeholder from '../shared/Placeholder.jsx'

// reviews-grid: /pricing `.section_wowreviews` — H3-size serif header, then a row: 2-col logo grid card
// (#131313, 3rem 1.5rem padding, gap 3rem) + testimonial card (max-w 56rem) holding a reviews Swiper:
// slidesPerView 1, spaceBetween 24, loop, speed 800 (ease), autoplay 4000 with pauseOnMouseEnter, grab cursor.
// Slides sit at scale .65 / opacity .5 and the active one (set at transition start) at 1/1, transition .6s ease.
// Prev/next arrows 2.625rem, #666c6a -> white on hover (color .32s). Stacks <=767.
// On the original the `section_kiki-video` block is nested inside this section: pass it as children.
const LOGOS = ['logo-volvo.png', 'logo-burgerking.png', 'logo-vodafone.png', 'logo-ba.png', 'logo-krispykreme.svg', 'logo-nothingbundt.png', null, null, null, null]

const REVIEWS = [
  { quote: '“The feedback from our teams has been brilliant. People tell us it is the first platform they actually want to open, and managers love how easy it is to share what works across every site.”', name: 'Jordan Ellis', role: 'Director, Learning and Development' },
  { quote: '“Nimbus has been a huge win for us. Our people use it every day, completion is up across the board and our admin time has dropped, which lets us focus on coaching instead of chasing.”', name: 'Sam Rivera', role: 'Head of People Development' },
  { quote: '“Would I recommend Nimbus to other teams? Absolutely. It has changed how our people learn, share and grow, and the support team has been with us at every single step.”', name: 'Alex Morgan', role: 'Learning Experience Manager' },
  { quote: '“People keep telling us they finally know where to find everything. It has become the place our teams go first, for training, news and answers to everyday questions.”', name: 'Taylor Brooks', role: 'Talent and Culture Lead' },
  { quote: '“We would recommend Nimbus to anyone. Setup was smooth, our people took to it straight away and the results speak for themselves.”', name: 'Casey Jordan', role: 'Head of Learning' },
]

function ArrowBtn({ dir, onClick }) {
  return (
    <button
      type="button"
      aria-label={dir < 0 ? 'Previous review' : 'Next review'}
      onClick={onClick}
      className="flex h-[2.625rem] w-[2.625rem] items-center justify-center text-[#666c6a] transition-colors duration-[320ms] hover:text-white mob:h-[2rem] mob:w-[2rem]"
    >
      <svg viewBox="0 0 46 46" fill="none" className="h-full w-full" aria-hidden>
        <circle cx="23" cy="23" r="22.5" stroke="currentColor" />
        <path d={dir < 0 ? 'M26 16l-7 7 7 7' : 'M20 16l7 7-7 7'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

const DEFAULTS = { heading: 'You don’t have to take our word', logos: LOGOS, reviews: REVIEWS }

// logoAspects (optional): per-logo aspect classes replacing aspect-[120/49]; unset = unchanged.
export default function ReviewsGrid({ children, ...props }) {
  const p = { ...DEFAULTS, ...props }
  const N = p.reviews.length
  const hoverRef = useRef(null)
  const c = useLoopCarousel(N, { initialPlaying: true })
  useAutoplay(c, { delay: 4000, hoverRef })
  const all = [...p.reviews, ...p.reviews, ...p.reviews]

  return (
    <section data-section="reviews-grid">
      <div className="padding-global">
        <div className="py-[5rem] tab:py-[4rem] mob:py-[3rem]">
          <div className="flex flex-col items-center justify-start gap-y-[4.375rem]">
            <div className="flex flex-col items-center text-center">
              <h2 className="mt-[0.25rem] flex font-serif text-[3.5rem] font-normal leading-[1.15] text-ink tab:text-[3rem] mob:text-[2.5rem] xs:text-[2rem]">{p.heading}</h2>
            </div>
            <div className="container-large w-full">
              <div className="flex items-center justify-center gap-[1rem] mob:flex-col">
                <div className="grid min-w-[15rem] flex-1 grid-cols-2 gap-[3rem] self-stretch mob:w-full rounded-panel bg-surface-2 px-[1.5rem] py-[3rem]">
                  {p.logos.map((f, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <LogoPlaceholder src={f ? `/assets/${f}` : undefined} alt="Customer logo" className={`${p.logoAspects?.[i] || 'aspect-[120/49]'} max-h-[4rem] w-[7.5rem] max-w-full text-[0.75rem]`} />
                    </div>
                  ))}
                </div>
                <div ref={hoverRef} className="min-w-0 max-w-[56rem] flex-1 self-stretch rounded-panel bg-surface-2 mob:w-full mob:flex-none">
                  <div className="overflow-clip">
                    <div
                      {...c.trackProps}
                      className={`flex ${c.animate ? 'transition-transform duration-[800ms] ease-[ease]' : ''}`}
                      style={{ ...c.trackProps.style, transform: `translateX(calc(${-(c.pos + N)} * (100% + 24px) + ${c.dragX}px))` }}
                    >
                      {all.map((r, i) => {
                        const on = i === c.pos + N
                        return (
                          <div
                            key={i}
                            aria-hidden={!on}
                            className="mr-[24px] w-full min-w-full shrink-0 overflow-clip transition-[opacity,transform] duration-[600ms] ease-[ease]"
                            style={{ opacity: on ? 1 : 0.5, transform: `scale(${on ? 1 : 0.65})` }}
                          >
                            <div className="relative mr-[1rem] h-full min-h-[32.5rem] w-full overflow-clip rounded-panel bg-surface-2 p-[2.5rem] mob:min-h-[35rem] mob:p-[1.5rem] mob:pb-[4.5rem]">
                              <div className="flex h-full flex-col justify-between mob:justify-end mob:gap-y-[3rem]">
                                <LogoPlaceholder className="relative z-[1] aspect-[1439/623] w-[7.5rem] text-[0.75rem]" />
                                <div className="relative z-[1] flex max-w-[72.5%] flex-col gap-y-[2rem] tab:max-w-[90%] mob:max-w-full">
                                  <div className="flex text-[1.5rem] font-medium leading-[1.1] text-ink">{r.quote}</div>
                                  <div className="flex items-center justify-start gap-[0.75rem]">
                                    <div className="flex w-[3rem] items-center justify-start">
                                      <Placeholder label="" tone={3} className="h-[3rem] min-h-[3rem] w-[3rem] min-w-[3rem] rounded-[6px_0] wide:rounded-avatar" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                      <div className="text-para text-ink xs:text-body-xs">{r.name}</div>
                                      <div className="text-body text-grey mob:text-small">{r.role}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Placeholder label="Brand image" tone={3} className="absolute right-0 top-0 h-[28rem] w-[42rem] max-w-full opacity-40 tab:h-auto tab:w-[27rem] tab:aspect-[3/2]" />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="relative -mt-[4.5rem] flex items-center justify-end gap-[0.5rem] pr-[1.5rem] mob:-mt-[3rem] mob:pr-[1rem]">
                    <div className="flex">
                      <ArrowBtn dir={-1} onClick={c.prev} />
                      <ArrowBtn dir={1} onClick={c.next} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </section>
  )
}
