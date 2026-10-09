import { useRef } from 'react'
import useLoopCarousel, { useAutoplay } from '../../hooks/useLoopCarousel.js'
import Button from '../shared/Button.jsx'
import Placeholder from '../shared/Placeholder.jsx'

// `reviews-slider` (.section_wowreviews; wrapped in .section_testimonial on /content*, and in
// .section_testimonial-card on /lms/professional-services; identical inside).
// Swiper `is-reviews-slider` (live params): slidesPerView 1, spaceBetween 24 (px), loop, speed 800,
// grabCursor, autoplay { delay 4000, disableOnInteraction false, pauseOnMouseEnter true }.
// The page script adds `.is-visible` to the target slide on slideChangeTransitionStart; CSS embed:
// slides opacity .5 / scale(.65), .is-visible opacity 1 / scale(1), transition opacity .6s ease, transform .6s ease.
// Arrows: 2.625rem (2rem <=479) circles, icon colour #666c6a -> #f5f6ff on hover (color .32s).
//
// `order`: 'author-first' (content pages, corporate, integrations, prof. services, whats-included) or
// 'quote-first' (/lms/features/*). `slides=[]` renders the CMS empty state seen on
// /lms/features/employee-experience and /communication ("No items found.").

const SLIDES = [
  {
    quote: '"Our customers rely on us being true experts in what we sell, and the product and service training we run through Nimbus has helped us grow a team of passionate product and service experts in every store."',
    name: 'Jordan Ellis',
    role: 'Learning & Development Manager',
  },
  {
    quote: '"The feedback we received has been very, very positive. Easy to navigate, the search is brilliant and far better than what we had before. This has been a real game-changer for our whole organisation."',
    name: 'Sam Rivera',
    role: 'Director, Learning & Development, Programmes and Initiatives',
  },
  {
    quote: '"People keep telling us we should have done this years ago, and that it is the best thing we have launched in a long while. The engagement numbers tell me all I need to know; it has been so well received."',
    name: 'Alex Morgan',
    role: 'Learning & Development Manager',
  },
]

function Arrow({ dir, onClick }) {
  return (
    <button
      type="button"
      aria-label={dir === 'prev' ? 'Previous slide' : 'Next slide'}
      onClick={onClick}
      className="block h-[2.625rem] w-[2.625rem] text-[#666c6a] transition-[color] duration-[320ms] ease-[ease] hover:text-ink xs:h-[2rem] xs:w-[2rem]"
    >
      <svg width="100%" height="100%" viewBox="0 0 42 42" fill="none" aria-hidden>
        <rect width="42" height="42" rx="21" fill="#0B0B0B" />
        {dir === 'prev' ? (
          <path d="M23.2574 27.8362C24.0459 28.3389 25 27.6271 25 26.4822L25 15.5178C25 14.3729 24.0459 13.661 23.2574 14.1638L14.6597 19.646C13.7801 20.2069 13.7801 21.7931 14.6597 22.3541L23.2574 27.8362Z" fill="currentColor" />
        ) : (
          <path d="M18.7426 14.1638C17.9541 13.6611 17 14.3729 17 15.5178L17 26.4822C17 27.6271 17.9541 28.339 18.7426 27.8362L27.3403 22.354C28.2199 21.7931 28.2199 20.2069 27.3403 19.646L18.7426 14.1638Z" fill="currentColor" />
        )}
      </svg>
    </button>
  )
}

function Slide({ s, order, visible, hidden }) {
  const author = (
    <div className="flex items-center justify-start gap-[0.75rem]">
      <div className="flex w-[3rem] items-center justify-start">
        <Placeholder
          label=""
          tone={3}
          className="aspect-square h-[3rem] min-h-[3rem] w-[3rem] min-w-[3rem] rounded-none rounded-br-[6px] rounded-tl-[6px] wide:rounded-[100px] xs:h-[2.5rem] xs:min-h-[2.5rem] xs:w-[2.5rem] xs:min-w-[2.5rem]"
        />
      </div>
      <div className="flex flex-col items-start justify-start">
        <div className="text-para text-ink xs:text-body-xs">{s.name}</div>
        <div className="text-body text-grey mob:text-small">{s.role}</div>
      </div>
    </div>
  )
  const title = <div className="text-[1.75rem] font-medium leading-[1.1] text-ink xs:text-[1.25rem]">{s.quote}</div>
  return (
    <div
      aria-hidden={hidden}
      data-slide
      data-visible={visible}
      className="w-full min-w-full shrink-0 overflow-clip"
      style={{
        opacity: visible ? 1 : 0.5,
        transform: `scale(${visible ? 1 : 0.65})`,
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div className="relative h-full min-h-[32.5rem] w-full overflow-clip rounded-panel bg-surface-1 p-[2.5rem] mob:p-[1.5rem] xs:min-h-[35rem] xs:pb-[4.5rem]">
        <div className="flex h-full flex-col justify-between mob:justify-end mob:gap-y-[6rem] xs:gap-y-[3rem]">
          <Placeholder label="Logo" tone={3} className="relative z-[1] aspect-[300/42] w-[7.5rem]" labelClassName="text-[0.6rem]" />
          <div className="relative z-[1] flex max-w-[72.5%] flex-col gap-y-[2rem] tab:max-w-[90%] mob:max-w-full">
            {order === 'quote-first' ? (
              <>
                {title}
                {author}
              </>
            ) : (
              <>
                {author}
                {title}
              </>
            )}
          </div>
        </div>
        <Placeholder
          label="Customer image"
          tone={2}
          className="absolute right-0 top-0 h-[28rem] w-[42rem] max-w-full tab:h-auto tab:w-[27rem] tab:aspect-[936/748]"
        />
      </div>
    </div>
  )
}

export default function ReviewsSlider({
  title = 'Loved by teams like yours',
  slides = SLIDES,
  order = 'author-first',
  button = { label: 'See Nimbus in action', href: '/lms/demo-platform' },
}) {
  const N = slides.length
  const hoverRef = useRef(null)
  const c = useLoopCarousel(Math.max(N, 1), { initialPlaying: N > 1, threshold: 5 })
  useAutoplay(c, { delay: 4000, hoverRef })
  const all = N ? [...slides, ...slides, ...slides] : []
  const activeIdx = c.pos + N

  return (
    <section data-section="reviews-slider">
      <div className="padding-global">
        <div className="py-[5rem] mob:py-[3rem]">
          <div className="flex flex-col items-center justify-start gap-y-[4.375rem]">
            <div className="w-full max-w-[60rem]">
              <div className="flex flex-col items-center justify-start text-center">
                <h2 className="heading-h2">{title}</h2>
              </div>
            </div>
            <div className="w-full max-w-[60rem]">
              {N ? (
                <div ref={hoverRef} className="w-full overflow-clip" data-carousel="reviews">
                  <div
                    {...c.trackProps}
                    className={`flex ${c.animate ? 'transition-transform duration-[800ms] ease-[ease]' : ''}`}
                    style={{
                      ...c.trackProps.style,
                      gap: '24px',
                      transform: `translateX(calc(${-(c.pos + N)} * (100% + 24px) + ${c.dragX}px))`,
                    }}
                  >
                    {all.map((s, i) => (
                      <Slide key={i} s={s} order={order} visible={i === activeIdx} hidden={i !== activeIdx} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full overflow-clip">
                  <div className="bg-surface-1 py-[1rem] pl-[1.5rem] pr-[1rem] text-body text-ink xs:text-body-xs">No items found.</div>
                </div>
              )}
              <div className="relative mt-[-4.5rem] flex items-center justify-end gap-[0.5rem] pr-[1.5rem] xs:mt-[-3rem] xs:pr-[1rem]">
                <div className="flex">
                  <Arrow dir="prev" onClick={N ? c.prev : undefined} />
                  <Arrow dir="next" onClick={N ? c.next : undefined} />
                </div>
              </div>
            </div>
          </div>
          {button && (
            <div className="mt-[3rem] flex flex-wrap items-center justify-center gap-[1.5rem] mob:mt-[2rem] xs:mt-[1.5rem] xs:gap-[2rem]">
              <Button variant="primary" href={button.href}>
                {button.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
