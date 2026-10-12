import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap.js'

// Page-local: the first `results` block on /company (.section_results > .comapny-page-stats-section).
// Small Inter H2 (1.5rem) + grey lead, then three square stat cards (label at the top, big number at the
// bottom). ≤767 the three 18.75rem squares stay in one row and scroll sideways (as on the original,
// where the grid overflows its column). Motion (page inline script): when .stats-section is 30% in view
// the numbers count up from 0 with gsap, 1.5s power2.out, once.
const DEFAULT_CARDS = [
  { title: 'Customers', text: 'From small teams to global brands.', value: 500, suffix: '+' },
  { title: 'Learners', text: 'Across every role and sector.', value: 5, suffix: ' Million+' },
  { title: 'Countries', text: 'One platform, every time zone.', value: 60, suffix: '' },
]

export default function StatsResults({
  heading = (
    <>
      Designed to make <em className="italic">growth stick</em>
    </>
  ),
  lead = 'Nimbus is one of the fastest growing learning platforms around, helping teams everywhere turn everyday learning into results they can measure.',
  cards = DEFAULT_CARDS,
}) {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    const nums = [...root.querySelectorAll('[data-count]')]
    let tweens = []
    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries[0].isIntersecting) return
        obs.disconnect()
        tweens = nums.map((el) => {
          const o = { val: 0 }
          return gsap.to(o, { val: Number(el.dataset.count), duration: 1.5, ease: 'power2.out', onUpdate: () => (el.textContent = Math.round(o.val)) })
        })
      },
      { threshold: 0.3 },
    )
    io.observe(root)
    return () => {
      io.disconnect()
      tweens.forEach((t) => t.kill())
    }
  }, [])

  return (
    <section data-sec="results-stats">
      <div className="padding-global">
        <div className="py-[2rem]">
          <div className="container-medium">
            <div className="flex flex-col items-center pt-[2rem]">
              <div className="mb-[1rem] pt-[0.5rem]">
                <div className="max-w-[42rem] text-center">
                  <h2 className="mb-[1.5rem] mt-[0.25rem] text-[1.5rem] font-normal leading-[1.15] text-ink mob:text-[1.25rem]">{heading}</h2>
                  <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">{lead}</p>
                </div>
              </div>
            </div>
            <div ref={ref} className="mob:-mx-[1.25rem] mob:overflow-x-auto mob:px-[1.25rem] mob:[scrollbar-width:none]">
              <div className="grid grid-cols-3 gap-[1rem] mob:w-max mob:grid-cols-[repeat(3,18.75rem)]">
                {cards.map((c, i) => (
                  <div key={i} className="flex aspect-square flex-col items-start justify-between gap-[3.7rem] rounded-card bg-surface-1 p-[1rem] mob:gap-[3rem]">
                    <div className="max-w-[18.5rem] text-body text-ink xs:text-body-xs">
                      {c.title}
                      <br />
                      <br />
                      {c.text}
                    </div>
                    <div className="text-stat font-semibold text-ink mob:text-stat-48">
                      <span data-count={c.value}>{c.value}</span>
                      {c.suffix}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
