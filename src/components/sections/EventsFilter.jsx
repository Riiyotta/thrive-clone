import { useMemo, useState } from 'react'
import Placeholder from '../shared/Placeholder.jsx'

// events-filter (.section > .events_filters-wrap > .webinars_filter_content-wrap) on
// /resources/events-webinars, legacy "green" theme: centred serif H2 and a 2-col (1 col ≤479) grid of
// past webinars (5.34:4.05 cells, auto ≤991): big day number (+ green month tag), 1.25rem title,
// "Watch now ›". Hover (IX2): the image layer (photo + rgba(0,0,0,.75) overlay) fades 0 -> 1, 300ms easeIn,
// and back on mouse-out. The original's Finsweet filter UI is hidden; `showFilter` renders an optional
// year filter (client-side) for pages that want it. 52 placeholder items (live count at measurement time).
const THEME = { '--th-border': '#00251e', '--th-brand': '#1ee9b6' }

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const TITLES = [
  'The engagement workout: how one team got everyone learning again',
  'Breaking barriers and building confident leaders for tomorrow',
  'What great onboarding looks like in a hybrid world',
  'Nimbus in 2025: tips, trends and the ideas we are most excited about this year',
  'Skills first: turning frameworks into everyday growth',
]
const DEFAULT_ITEMS = Array.from({ length: 52 }, (_, i) => {
  const d = new Date(Date.UTC(2026, 3, 8) - i * 17 * 86400000)
  return {
    day: String(d.getUTCDate()).padStart(2, '0'),
    month: i < 2 ? null : `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`,
    year: d.getUTCFullYear(),
    title: TITLES[i % TITLES.length],
    image: i >= 17,
    href: '#',
  }
})

export default function EventsFilter({ heading = 'Catch up on past webinars', items = DEFAULT_ITEMS, linkLabel = 'Watch now', showFilter = false }) {
  const years = useMemo(() => [...new Set(items.map((i) => i.year))], [items])
  const [year, setYear] = useState(null)
  const list = year ? items.filter((i) => i.year === year) : items
  return (
    <section data-section="events-filter" style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="border-l border-r border-[var(--th-border)]">
            <div className="flex items-start justify-between border-b border-[var(--th-border)]">
              <div className="flex w-full flex-col">
                <div className="relative flex flex-col border-l border-r border-[var(--th-border)]">
                  <div className="flex flex-col items-center justify-start px-[2.5rem] pb-[4rem] pt-[5.5rem] [text-wrap:pretty] tab:px-[2rem] tab:pt-[4rem] mob:px-[1.5rem] xs:px-[1rem]">
                    <div className="flex w-full flex-col items-center text-center leading-[1.4]">
                      <h2 className="mb-[1.25rem] mt-[0.25rem] font-serif text-[4rem] font-normal leading-[1.1]">{heading}</h2>
                    </div>
                    {showFilter && (
                      <div className="flex flex-wrap justify-center gap-[0.5rem]">
                        {[null, ...years].map((y) => (
                          <button
                            key={y ?? 'all'}
                            type="button"
                            onClick={() => setYear(y)}
                            className={`rounded-[100vw] border border-[var(--th-border)] px-[1rem] py-[0.375rem] text-[0.875rem] transition-colors duration-300 hover:text-ink ${year === y ? 'bg-[#001811] text-ink' : 'text-grey'}`}
                          >
                            {y ?? 'All'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-t border-[var(--th-border)]">
                  <div className="grid w-full grid-cols-2 xs:grid-cols-1">
                    {list.map((it, i) => (
                      <div key={i} className="h-full last:border-r last:border-[var(--th-border)]">
                        <a
                          href={it.href}
                          className="group relative isolate flex aspect-[5.34/4.05] h-full flex-col items-start justify-between gap-y-[1rem] border-b border-l border-[var(--th-border)] p-[2.5rem] text-ink no-underline tab:aspect-auto tab:p-[2rem] mob:p-[1.5rem]"
                        >
                          <div>
                            <div className="mb-[1.5rem]">
                              {it.month && <div className="text-body font-semibold text-[var(--th-brand)] xs:text-body-xs">{it.month}</div>}
                              <div className="text-[3rem] font-medium leading-none xs:text-[2rem]">{it.day}</div>
                            </div>
                          </div>
                          <div className="flex max-w-[50ch] flex-col items-start justify-start gap-y-[1rem]">
                            <div className="text-[1.25rem] leading-[1.4] xs:text-[1.125rem]">{it.title}</div>
                            <div className="mt-[0.25rem] flex gap-[0.75rem] self-start pr-[1.5rem] font-semibold transition-all duration-[250ms] ease-[ease] hover:gap-[1rem]">
                              <span className="text-[1rem] leading-[1.4]">{linkLabel}</span>
                              <svg viewBox="0 0 5.1 8.43" className="w-[8px]" aria-hidden>
                                <path d="M.7.7l3.5 3.5L.7 7.7" fill="none" stroke="currentColor" strokeWidth="1.2" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute inset-0 z-[-1] opacity-0 transition-opacity duration-300 ease-in group-hover:opacity-100">
                            <div className="absolute inset-0 z-[-1] bg-[rgba(0,0,0,0.75)]" />
                            {it.image && <Placeholder label="" className="absolute inset-0 z-[-2] h-full w-full" />}
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
