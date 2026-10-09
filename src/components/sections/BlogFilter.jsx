import { useEffect, useMemo, useRef, useState } from 'react'
import Placeholder from '../shared/Placeholder.jsx'

// blog-filter (.section > .section_component > .filter_wrap) on /resources/blog-and-news, legacy "green"
// theme. Sticky 20% category sidebar (checkbox list; 2-col wrap ≤991) + 80% results: "Showing X articles
// out of Y" + sort dropdown (newest / oldest), 2-col post grid (1 col ≤479) and "Load more" (+20).
// Filtering is client-side over placeholder posts (Finsweet list behaviour: OR across ticked categories).
// Hovers: card bg -> #001811 (.24s); checkbox ticked = #00886d fill.
const THEME = { '--th-border': '#00251e', '--th-bg2': '#001811', '--th-eyebrow-border': '#01584b', '--th-brand': '#1ee9b6', '--th-check': '#00886d' }

const CATEGORIES = ['AI', 'Comms', 'Compliance', 'Content', 'CRM', 'Data', 'Employee training and skills', 'Engineering', 'HR', 'Ideas and inspiration', 'Learner engagement', 'Learning platform', 'Learning tech trends', 'Mentoring and coaching', 'News', 'Organisation', 'SSO', 'Technology']
const TITLES = [
  'Your next admin task can start with a single sentence',
  'How we rebuilt search so people find the right answer the first time they look',
  'Five habits of teams that keep learning every week',
  'What we learned shipping our biggest release yet, and what we would do differently next time',
  'A practical guide to measuring the impact of learning on everyday performance',
  'Nimbus welcomes a new chief product officer to lead the next chapter of growth',
  'Mentoring that works',
  'Why onboarding is the most important learning moment of all for new people',
  'Inside the engineering team behind Nova',
]
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// 249 placeholder posts (the live list count at measurement time), newest first.
const DEFAULT_POSTS = Array.from({ length: 249 }, (_, i) => {
  const d = new Date(Date.UTC(2026, 9, 7) - i * 4 * 86400000)
  return {
    id: i,
    title: TITLES[i % TITLES.length],
    category: CATEGORIES[(i * 7 + 7) % CATEGORIES.length],
    ts: d.getTime(),
    date: `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`,
    read: `${3 + ((i * 5) % 10)} mins to read`,
    href: '#',
  }
})

function Tag({ children }) {
  return (
    <div className="mb-[0.75rem] inline-block rounded-[100vw] border border-[var(--th-eyebrow-border)] bg-[var(--th-bg2)] px-[0.75rem] py-[0.325rem] text-[0.875rem] font-medium leading-[1.4] text-white tab:px-[0.625rem] tab:py-[0.425rem] tab:text-[0.725rem] xs:mb-[0.25rem] xs:leading-none">
      {children}
    </div>
  )
}

export function Checkbox({ label, checked, onChange }) {
  return (
    <label className="mb-0 flex cursor-pointer items-center justify-start gap-[1rem] border-t border-[var(--th-border)] px-[1.5rem] py-[1rem] tab:border-r tab:pl-[1.5rem] xs:px-[1rem]">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} />
      <span
        aria-hidden
        className={`h-[12px] w-[12px] shrink-0 border ${checked ? 'border-[var(--th-check)] bg-[var(--th-check)]' : 'border-[var(--th-border)]'}`}
      />
      <span className="text-[1rem] leading-[1.4] text-ink">{label}</span>
    </label>
  )
}

export function SortDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])
  return (
    <div ref={ref} className="relative z-[900] border border-[var(--th-border)] text-ink xs:w-full">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-start gap-[1rem] py-[0.5rem] pl-[1.25rem] pr-[0.75rem] text-[1rem] leading-[1.4] text-[#666c6a]">
        <span>{value ? options.find((o) => o.value === value).label : 'Sort by'}</span>
        <svg viewBox="0 0 16 16" className="h-[1rem] w-[1rem] text-ink" aria-hidden>
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-[-1px] top-full min-w-[calc(100%+2px)] whitespace-nowrap border border-b-0 border-[var(--th-border)] bg-[#000a06]">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value)
                setOpen(false)
              }}
              className="block w-full border-b border-[var(--th-border)] px-[1.25rem] py-[0.625rem] text-left text-[1rem] leading-[1.4] text-grey hover:text-ink"
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function BlogFilter({ posts = DEFAULT_POSTS, categories = CATEGORIES, pageSize = 20, filterLabel = 'Filter by category', noun = 'articles' }) {
  const [sel, setSel] = useState([])
  const [sort, setSort] = useState('')
  const [shown, setShown] = useState(pageSize)
  const list = useMemo(() => {
    let l = sel.length ? posts.filter((p) => sel.includes(p.category)) : posts
    if (sort === 'oldest') l = [...l].sort((a, b) => a.ts - b.ts)
    if (sort === 'newest') l = [...l].sort((a, b) => b.ts - a.ts)
    return l
  }, [posts, sel, sort])
  useEffect(() => setShown(pageSize), [sel, sort, pageSize])
  const toggle = (c) => setSel((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]))

  return (
    <section data-section="blog-filter" style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="border-l border-r border-[var(--th-border)]">
            <div className="relative flex items-start justify-between border-b border-[var(--th-border)] tab:flex-col tab:items-stretch">
              <div className="sticky top-0 mb-0 w-[20%] tab:relative tab:w-full">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="border-b border-[var(--th-border)]">
                    <div className="flex min-h-[7.5rem] items-center justify-between border-r border-[var(--th-border)] p-[2.5rem] tab:px-[1.5rem] mob:min-h-[5rem] mob:py-[1.5rem]">
                      <div className="text-body text-grey xs:text-body-xs">{filterLabel}</div>
                    </div>
                    <div className="flex flex-col text-[1rem]">
                      <div className="flex flex-col tab:grid tab:grid-cols-2 xs:flex xs:flex-row xs:flex-wrap">
                        {categories.map((c) => (
                          <div key={c} className="xs:flex-[1.25_1_auto] xs:basis-[40%] mob:last:border-b mob:last:border-[var(--th-border)]">
                            <Checkbox label={c} checked={sel.includes(c)} onChange={() => toggle(c)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="flex w-[80%] flex-col tab:w-full">
                <div className="flex min-h-[7.5rem] items-center justify-between border-b border-[var(--th-border)] p-[2.5rem] tab:px-[1.5rem] mob:min-h-[5rem] mob:py-[1.5rem] xs:flex-col xs:items-start xs:gap-y-[1rem] xs:p-[1rem]">
                  <div className="text-body xs:text-body-xs">
                    Showing <span className="text-[var(--th-brand)]">{list.length}</span> {noun} out of <span>{posts.length}</span>
                  </div>
                  <SortDropdown
                    value={sort}
                    onChange={setSort}
                    options={[
                      { value: 'newest', label: 'Date (newest first)' },
                      { value: 'oldest', label: 'Date (oldest first)' },
                    ]}
                  />
                </div>
                <div className="mob:border-t mob:border-[var(--th-border)]">
                  <div className="grid w-full grid-cols-2 xs:grid-cols-1">
                    {list.slice(0, shown).map((p) => (
                      <div key={p.id} className="h-full last:border-r last:border-[var(--th-border)]">
                        <a
                          href={p.href}
                          className="flex h-full flex-col items-start justify-start gap-y-[1rem] border-b border-l border-[var(--th-border)] p-[2.5rem] text-ink no-underline transition-[background-color] duration-[240ms] hover:bg-[var(--th-bg2)] tab:p-[1.5rem] xs:p-[1rem]"
                        >
                          <Placeholder label="Post image" src={p.image} className="h-[15rem] w-full tab:h-[12rem] xs:h-[10rem]" />
                          <div className="flex flex-col items-start justify-start gap-[1rem]">
                            <h4 className="mb-[0.5rem] font-serif text-[1.125rem] font-normal leading-[1.4] tracking-[0.03em] mob:text-[1.25rem] xs:mb-[0.125rem]">{p.title}</h4>
                            <div className="flex gap-[1rem] xs:mt-[0.5rem]">
                              <Tag>{p.date}</Tag>
                              <Tag>{p.read}</Tag>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                  {!list.length && <div className="border-l border-[var(--th-border)] p-[2.5rem] text-grey">No {noun} match those filters.</div>}
                  {shown < list.length && (
                    <div className="flex flex-wrap justify-center border-l border-[var(--th-border)] py-[3rem]">
                      <button
                        type="button"
                        onClick={() => setShown((n) => n + pageSize)}
                        className="mx-[0.625rem] rounded-[200vw] border border-[var(--th-brand)] bg-[var(--th-brand)] px-[1.25rem] py-[0.75rem] text-center text-[1.125rem] font-medium leading-none text-[#000a06] transition-[border-radius] duration-300 ease-in-out hover:bg-[#016b57] hover:text-[#eafff7] tab:px-[1rem] tab:py-[0.5rem] tab:text-[1rem]"
                      >
                        Load more
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
