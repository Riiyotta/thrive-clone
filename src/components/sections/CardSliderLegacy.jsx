import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { GLOBAL_HEADER_PAD, LEGACY_H2, LegacyEyebrow, legacyVars } from './GlobalHeaderLegacy.jsx'

// card-slider-legacy: legacy header + Webflow `w-slider` of hairline cards with square arrow
// buttons bottom-right and round dots bottom-left.
//   'journey' /lms/impact        centred H2 header; 3.42:5 cards (title + eyebrow tags); pb 8rem
//   'library' /content/service   2-col header (H2 | grey para); square cards (title + grey text); pb 3rem
//   'process' /content/custom-content  2-col header in .section-heading-padding; 3.42:5 cards
//             (numbered icon block + brand-colour H5 + small text); pb 3rem
// Webflow slider semantics (data-animation slide, duration 500, easing ease, infinite false,
// autoplay false, nav-spacing 3): mask = 25% (≤991 50%, ≤767 80%, ≤479 95%) with visible overflow.
// Slides are grouped into pages exactly like webflow.js (edge 100px: a new page starts when the
// running width since the current page offset exceeds maskWidth - 100); a page change translates
// every slide to -left(first slide of page) over 500ms `ease`. Next on the last page rewinds to 0,
// prev on the first goes to the last. One dot per page. Swipe (mouse/touch) changes page.
const DEFAULTS = {
  journey: {
    theme: 'pink',
    heading: 'Your Nimbus results timeline',
    slides: [
      { title: 'Set targets', tags: ['Data Specialist'] },
      { title: 'Results planning workshops', tags: ['Data Specialist', 'Programme Lead'] },
      { title: 'Choose a project to measure and agree the scope', tags: ['Data Specialist'] },
      { title: 'Plan campaigns and fresh creative for launch', tags: ['Design', 'Campaigns'] },
      { title: 'Check progress and fine-tune the plan', tags: ['Data Specialist'] },
      { title: 'Dashboards built around your goals', tags: ['Data Specialist'] },
      { title: 'Present the outcomes and the business case to leaders', tags: ['Data Specialist'] },
      { title: 'Celebrate the wins', tags: ['Design', 'Campaigns'] },
      { title: 'Plan the next phase', tags: ['Programme Lead'] },
    ],
  },
  library: {
    theme: 'yellow',
    heading: 'Expert help behind every content library',
    body: 'Behind every course is a team of specialists helping you get the right learning to the right people.',
    slides: [
      { title: 'Planning sessions', body: 'Workshops to understand your goals, map your audiences and shape a clear content plan.' },
      { title: 'Library curation', body: 'We pick the titles that fit each role so learners only see what matters to them most.' },
      { title: 'Pathway design', body: 'Ready-made journeys that guide new starters and leaders through the right courses in order.' },
      { title: 'Launch support', body: 'Campaign packs, emails and posters that help your teams find and start new learning.' },
      { title: 'Quarterly reviews', body: 'Regular check-ins on usage and results, with fresh ideas to keep your learners engaged.' },
      { title: 'New releases', body: 'Early access to new titles every month, matched to the priorities you have shared with us.' },
    ],
  },
  process: {
    theme: 'green',
    heading: 'Our custom eLearning development process',
    body: 'Our specialist custom content team works with you from the very first idea all the way to launch day, keeping you close to each decision so the finished course feels truly yours and lands well with every learner.',
    slides: [
      { title: 'Discovery', body: 'From first call to signed brief, we agree goals, audience, scope and every key date together.' },
      { title: 'Ideas session', body: 'Shaping themes, structure and tone with your experts.' },
      { title: 'Writing, design and build', body: 'Where the fun happens!' },
      { title: 'Review and launch', body: 'Feedback rounds, final checks and a smooth launch.' },
    ],
  },
}

const MASK_W = 'w-[25%] tab:w-[50%] mob:w-[80%] xs:w-[95%]'
const SLIDE_W = {
  journey: 'w-full xs:w-[75%]',
  library: 'w-full mob:w-[60%]',
  process: 'w-full',
}
const SLIDER_PB = {
  journey: 'pb-[8rem] mob:pb-[6rem]',
  library: 'pb-[3rem] mob:pb-[2rem]',
  process: 'pb-[3rem] mob:pb-[6rem]',
}

function ArrowIcon({ dir }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" aria-hidden>
      {dir === 'left' ? (
        <path d="M3.31066 8.75001L9.03033 14.4697L7.96967 15.5303L0.439339 8.00001L7.96967 0.469676L9.03033 1.53034L3.31066 7.25001L15.5 7.25L15.5 8.75L3.31066 8.75001Z" fill="currentColor" />
      ) : (
        <path d="M12.6893 7.25L6.96967 1.53033L8.03033 0.469666L15.5607 8L8.03033 15.5303L6.96967 14.4697L12.6893 8.75L0.5 8.75L0.5 7.25L12.6893 7.25Z" fill="currentColor" />
      )}
    </svg>
  )
}

function Slide({ variant, s, i, processGap = 'gap-[1.25rem]' }) {
  if (variant === 'journey') {
    return (
      <div className="flex aspect-[3.42/5] h-full flex-col items-start justify-between p-[2rem] no-underline transition-none hover:bg-[var(--lt-bg2)] tab:aspect-square">
        <div className="font-serif text-[1.125rem] font-semibold leading-[1.4] tracking-[0.03em] text-ink mob:text-[1.25rem] xs:mb-[0.125rem]">{s.title}</div>
        {s.tags.length > 1 ? (
          <div className="flex flex-col items-start justify-center gap-x-[0.75rem] gap-y-[0.25rem]">
            {s.tags.map((t) => (
              <LegacyEyebrow key={t}>{t}</LegacyEyebrow>
            ))}
          </div>
        ) : (
          <LegacyEyebrow>{s.tags[0]}</LegacyEyebrow>
        )}
      </div>
    )
  }
  if (variant === 'library') {
    return (
      <div className="flex aspect-square h-full flex-col items-start justify-between p-[2rem] wide:p-[2.5rem] mob:h-auto mob:p-[1.5rem] xs:p-[1rem]">
        <div className="text-body text-ink xs:text-body-xs">{s.title}</div>
        <p className="mb-[1.25rem] text-[1rem] leading-[1.4] text-grey">{s.body}</p>
      </div>
    )
  }
  return (
    <div className="flex aspect-[3.42/5] h-full flex-col items-start justify-between mob:aspect-square">
      <div className="flex flex-col items-center justify-center self-start pb-[0.75rem] pl-[2.5rem] pr-[0.25rem] pt-[2.5rem] text-center mob:pl-[1rem]">
        <div className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[8px_0] border border-solid border-[color:var(--lt-eb-border)] bg-[var(--lt-bg2)] p-[8px] text-body text-white mob:h-[1.75rem] mob:w-[1.75rem]">
          {String(i + 1).padStart(2, '0')}
        </div>
      </div>
      <div className="flex flex-col items-start justify-between self-stretch p-[2.5rem] mob:px-[1rem]">
        <div className={`flex flex-col ${processGap}`}>
          <div className="font-serif text-[1.125rem] font-normal leading-[1.4] tracking-[0.03em] text-[color:var(--lt-brand)] mob:text-[1.25rem]">{s.title}</div>
          <p className="text-[0.875rem] leading-[1.4] text-grey">{s.body}</p>
        </div>
      </div>
    </div>
  )
}

// processGap (optional, 'process' cards): title-to-text gap class; undefined keeps gap-[1.25rem]
// (live /content/custom-content uses a 1rem title margin, so it passes 'gap-[1rem]').
export default function CardSliderLegacy({ variant = 'journey', ...props }) {
  const d = { ...DEFAULTS[variant], ...props }
  const { slides } = d
  const maskRef = useRef(null)
  const slideRefs = useRef([])
  const [pages, setPages] = useState([0]) // page -> first slide index
  const [page, setPage] = useState(0)
  const [offset, setOffset] = useState(0)

  // webflow.js layout(): group slides into pages (edge 100px)
  const layout = useCallback(() => {
    const mask = maskRef.current
    if (!mask) return
    const width = mask.getBoundingClientRect().width
    const threshold = Math.max(0, width - 100)
    const starts = [0]
    let off = 0
    let anchor = 0
    slideRefs.current.forEach((el, i) => {
      if (!el) return
      if (anchor - off > threshold) {
        off += width
        starts.push(i)
      }
      anchor += el.getBoundingClientRect().width
    })
    setPages(starts)
    setPage((p) => Math.min(p, starts.length - 1))
  }, [])

  useLayoutEffect(() => {
    layout()
    const ro = new ResizeObserver(layout)
    ro.observe(maskRef.current)
    return () => ro.disconnect()
  }, [layout])

  useLayoutEffect(() => {
    const first = slideRefs.current[pages[page]]
    setOffset(first ? first.offsetLeft : 0)
  }, [page, pages])

  const go = useCallback((p) => setPage(((p % pages.length) + pages.length) % pages.length), [pages.length])

  // swipe
  const drag = useRef(null)
  useEffect(() => {
    const mask = maskRef.current
    const down = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      drag.current = { x: e.clientX, y: e.clientY }
    }
    const up = (e) => {
      const s = drag.current
      drag.current = null
      if (!s) return
      const dx = e.clientX - s.x
      if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(e.clientY - s.y)) setPage((p) => {
        const n = pages.length
        return (((dx < 0 ? p + 1 : p - 1) % n) + n) % n
      })
    }
    mask.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      mask.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [pages.length])

  const header =
    variant === 'journey' ? (
      <div className={`flex flex-col items-center border-b border-solid border-[color:var(--lt-border)] ${GLOBAL_HEADER_PAD}`}>
        <div className="flex w-full flex-col items-center text-center">
          <h2 className={`${LEGACY_H2} max-w-[36rem]`}>{d.heading}</h2>
        </div>
      </div>
    ) : (
      <div
        className={
          variant === 'library'
            ? `border-b border-solid border-[color:var(--lt-border)] ${GLOBAL_HEADER_PAD}`
            : 'mx-auto w-full px-[2.5rem] py-[3.5rem] tab:px-[1.5rem] tab:py-[2.5rem] mob:px-[1.25rem] mob:py-[2rem] xs:px-[1rem]'
        }
      >
        <div className="grid grid-cols-2 gap-[5rem] mob:grid-cols-1">
          <div className="flex w-full flex-col items-start justify-between gap-[1.25rem]">
            <h2 className={`${LEGACY_H2} ${variant === 'process' ? 'max-w-[36rem]' : ''}`}>{d.heading}</h2>
          </div>
          <div className="flex w-full flex-col">
            <div className="w-full max-w-[28rem]">
              <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">{d.body}</p>
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <section data-section="card-slider-legacy" style={legacyVars(d.theme)}>
      <div className="padding-global">
        <div className="container-large">
          <div
            className={`flex flex-col border-solid border-[color:var(--lt-border)] ${variant === 'journey' ? 'border-x' : 'border-x border-b'}`}
          >
            {header}
            <div
              className={`relative overflow-clip bg-transparent text-white ${SLIDER_PB[variant]}`}
              role="region"
              aria-label="carousel"
              data-wslider={variant}
            >
              <div ref={maskRef} className={`relative flex select-none border-b border-solid border-black ${MASK_W} ${variant === 'library' ? 'mob:pb-[1.5rem]' : ''}`} style={{ touchAction: 'pan-y' }}>
                {slides.map((s, i) => (
                  <div
                    key={i}
                    ref={(el) => (slideRefs.current[i] = el)}
                    data-wslide
                    aria-hidden={i < pages[page] || (page + 1 < pages.length && i >= pages[page + 1])}
                    className={`shrink-0 overflow-hidden border-b border-r border-solid border-[color:var(--lt-border)] transition-transform duration-500 ease-[ease] ${SLIDE_W[variant]}`}
                    style={{ transform: `translateX(${-offset}px)` }}
                  >
                    <Slide variant={variant} s={s} i={i} processGap={d.processGap} />
                  </div>
                ))}
              </div>
              <button
                type="button"
                aria-label="previous slide"
                onClick={() => go(page - 1)}
                className="absolute bottom-0 right-[4rem] z-[3] flex h-[3rem] w-[3rem] items-center justify-center border border-solid border-[color:var(--lt-border)] bg-[rgba(239,239,239,0)] p-0 text-white mob:h-[2rem] mob:w-[2rem] xs:h-[3rem] xs:w-[3rem]"
              >
                <span className="flex h-[1rem] w-[1rem] flex-col items-center justify-center">
                  <ArrowIcon dir="left" />
                </span>
              </button>
              <button
                type="button"
                aria-label="next slide"
                onClick={() => go(page + 1)}
                className="absolute bottom-0 right-0 z-[4] flex h-[3rem] w-[3rem] items-center justify-center border border-solid border-[color:var(--lt-border)] bg-[rgba(239,239,239,0)] p-0 text-white mob:h-[2rem] mob:w-[2rem] xs:h-[3rem] xs:w-[3rem]"
              >
                <span className="flex h-[1rem] w-[1rem] flex-col items-center justify-center">
                  <ArrowIcon dir="right" />
                </span>
              </button>
              <div
                className={`absolute bottom-0 left-0 z-[2] h-[1.75rem] pt-[10px] text-[0.5rem] leading-[1.4] wide:ml-[1rem] wide:pt-0 ${
                  variant === 'library' ? 'ml-[10px]' : 'ml-[1rem]'
                }`}
              >
                {pages.map((_, p) => (
                  <button
                    type="button"
                    key={p}
                    aria-label={`Show slide ${p + 1} of ${pages.length}`}
                    onClick={() => go(p)}
                    className={`relative mx-[3px] mb-[0.5em] inline-block h-[1em] w-[1em] cursor-pointer rounded-full p-0 align-top transition-[background-color,color] duration-100 ${
                      p === page ? 'bg-track' : 'bg-[rgba(34,34,34,0.4)]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
