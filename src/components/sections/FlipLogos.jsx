import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap.js'
import { LogoPlaceholder } from '../shared/Placeholder.jsx'
import { legacyVars } from './GlobalHeaderLegacy.jsx'

// flip-logos (`.section_flip-logos`): 4 logo cells (2×2 at ≤767) inside side hairlines. Each cell
// masks a vertical track of 4 logos (mask max-h 3rem, track gap 1rem, logo max-h 2.75rem).
// Motion = IX2 "Logos Grid Animation 1–4" (SCROLL_INTO_VIEW, loop). Per column:
//   set y 0 after D0, then 3 × [wait W, 850ms outQuart to y%], then snap to 0 and loop.
//   col1 D0 0    : W 2000 → -28%, 2000 → -54%, 2000 → -80.5%
//   col2 D0 250  : same as col1
//   col3 D0 300  : W 1500 → -26%, 2000 → -54%, 2000 → -80.5%
//   col4 D0 500  : W 2000 → -26%, 2000 → -54%, 2000 → -80%
// IX2 outQuart = GSAP power3.out (true quartic). Used on /lms/impact, /content/topics,
// /content/sector-suites, /content/service, /content/custom-content (identical geometry).
const COLS = [
  { d0: 0, steps: [[2, -28], [2, -54], [2, -80.5]] },
  { d0: 0.25, steps: [[2, -28], [2, -54], [2, -80.5]] },
  { d0: 0.3, steps: [[1.5, -26], [2, -54], [2, -80.5]] },
  { d0: 0.5, steps: [[2, -26], [2, -54], [2, -80]] },
]

// cell borders (desktop 4-up): 1 no-border-horizontal, 2 all, 3 no-border-left, 4 no-border-horizontal
const CELL_BORDER = ['border-y', 'border', 'border-y border-r', 'border-y']

export default function FlipLogos({ theme = 'yellow', logos = Array.from({ length: 16 }, (_, i) => `Logo ${i + 1}`) }) {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    let ctx
    const start = () => {
      ctx = gsap.context(() => {
        el.querySelectorAll('[data-flip-track]').forEach((track, i) => {
          const c = COLS[i % 4]
          const tl = gsap.timeline({ repeat: -1 })
          tl.set(track, { yPercent: 0 }, c.d0)
          c.steps.forEach(([wait, y]) => tl.to(track, { yPercent: y, duration: 0.85, ease: 'power3.out' }, `+=${wait}`))
          tl.set(track, { yPercent: 0 })
        })
      }, el)
    }
    // SCROLL_INTO_VIEW, offset 0%: starts once the section enters the viewport
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          start()
        }
      },
      { threshold: 0 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      ctx && ctx.revert()
    }
  }, [])

  return (
    <section ref={root} data-section="flip-logos" className="flex flex-col justify-center" style={legacyVars(theme)}>
      <div className="padding-global">
        <div className="container-large">
          <div className="border-x border-solid border-[color:var(--lt-border)]">
            <div className="grid w-full grid-cols-4 items-center justify-between mob:grid-cols-2">
              {COLS.map((_, i) => (
                <div
                  key={i}
                  data-logo-card
                  className={`flex w-full flex-col items-center justify-center border-solid border-[color:var(--lt-border)] px-[4.5rem] py-[3.5rem] mob:p-[3rem] xs:p-[2rem] ${CELL_BORDER[i]}`}
                >
                  <div className="max-h-[3rem] overflow-clip">
                    <div data-flip-track className="flex flex-col items-center justify-start gap-y-[1rem] will-change-transform">
                      {logos.slice(i * 4, i * 4 + 4).map((name, k) => (
                        <LogoPlaceholder
                          key={k}
                          text={name}
                          className="h-[2.75rem] min-h-[2.5rem] w-[10rem] max-w-full text-[0.875rem] xs:h-[2rem] xs:min-h-[2rem] xs:w-[7rem]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
