import { useEffect, useMemo, useRef, useState } from 'react'
import { LogoPlaceholder } from '../shared/Placeholder.jsx'

// integration-filter: /lms/integrations `.section > .section_component > .filter_wrap` (Finsweet list filter).
// Sticky 20% sidebar of category checkboxes (OR filter) + 80% results: "Showing N … of M" header,
// "Sort by" dropdown (A–Z / Z–A) and a 3-col card grid (2 cols <=991, 1 col <=479).
// All hairlines #00251e. Card hover: patterned background (approximation of bg-pattern-small.svg), transition .2s.
// 66 placeholder items, like the live CMS list at measurement time.
const CATEGORIES = ['Comms', 'Content', 'CRM', 'Data', 'HR', 'Organisation', 'Performance management', 'SSO', 'Technology']
const SYL = ['Ar', 'Bel', 'Cor', 'Dun', 'El', 'Fen', 'Gal', 'Hol', 'Ist', 'Jun', 'Kel', 'Lum']
const END = ['ova', 'ix', 'ly', 'stack', 'desk', 'hub', 'flow', 'ia', 'sync', 'base', 'path']
const ITEMS = Array.from({ length: 66 }, (_, i) => ({
  name: SYL[(i * 7) % SYL.length] + END[(i * 5 + Math.floor(i / 11)) % END.length],
  category: CATEGORIES[(i * 4) % CATEGORIES.length],
}))

const PATTERN =
  'repeating-linear-gradient(0deg, rgba(0,37,30,0.55) 0 1px, transparent 1px 16px), repeating-linear-gradient(90deg, rgba(0,37,30,0.55) 0 1px, transparent 1px 16px)'

function Arrow() {
  return (
    <svg className="h-[0.75rem] w-[0.75rem] mob:h-[1rem] xs:w-[0.65rem]" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])
  const opts = [
    ['asc', 'Name (A-Z)'],
    ['desc', 'Name (Z-A)'],
  ]
  const label = opts.find((o) => o[0] === value)?.[1] || 'Sort by'
  return (
    <div ref={ref} className="relative z-[900] border border-[#00251e] text-ink xs:w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-start gap-[1rem] py-[0.5rem] pl-[1.25rem] pr-[0.75rem] text-[1rem] leading-[1.4rem] text-[#666c6a]"
      >
        <div>{label}</div>
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden className="text-[#fafefe]">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" fill="none" />
        </svg>
      </button>
      {open && (
        <nav role="listbox" className="absolute left-[-1px] right-[-1px] top-full border border-b-0 border-[#00251e] bg-[#000a06]">
          {opts.map(([k, t]) => (
            <a
              key={k}
              href="#"
              role="option"
              aria-selected={k === value}
              onClick={(e) => {
                e.preventDefault()
                onChange(k)
                setOpen(false)
              }}
              className="block whitespace-nowrap border-b border-[#00251e] px-[1.25rem] py-[0.75rem] text-[1rem] text-[#666c6a] transition-colors duration-200 hover:text-[#1ee9b6]"
            >
              {t}
            </a>
          ))}
        </nav>
      )}
    </div>
  )
}

export default function IntegrationFilter({ items = ITEMS, categories = CATEGORIES, filterLabel = 'Filter by category', noun = 'connections' }) {
  const [checked, setChecked] = useState([])
  const [sort, setSort] = useState(null)
  const shown = useMemo(() => {
    let list = checked.length ? items.filter((it) => checked.includes(it.category)) : items
    if (sort) list = [...list].sort((a, b) => (sort === 'asc' ? 1 : -1) * a.name.localeCompare(b.name))
    return list
  }, [items, checked, sort])
  const toggle = (c) => setChecked((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]))

  return (
    <section data-section="integration-filter">
      <div className="padding-global">
        <div className="container-large">
          <div className="border-l border-r border-[#00251e]">
            <div className="relative flex items-start justify-between border-b border-[#00251e] tab:flex-col">
              {/* sidebar */}
              <form className="sticky top-0 mb-0 w-[20%] tab:relative tab:w-full" onSubmit={(e) => e.preventDefault()}>
                <div className="border-b border-[#00251e]">
                  <div className="flex min-h-[7.5rem] items-center justify-between border-r border-[#00251e] p-[2.5rem] tab:px-[1.5rem] mob:min-h-[5rem] mob:py-[1.5rem]">
                    <div className="text-grey">{filterLabel}</div>
                  </div>
                  <div className="flex flex-col text-[1rem] tab:flex-row tab:flex-wrap xs:grid xs:grid-cols-2">
                    {categories.map((c) => {
                      const on = checked.includes(c)
                      return (
                        <label
                          key={c}
                          className="mb-0 flex cursor-pointer items-center justify-start gap-[1rem] border-t border-[#00251e] py-[1rem] pl-[1.5rem] pr-[1.5rem] tab:border-r xs:px-[1rem]"
                        >
                          <input type="checkbox" className="peer sr-only" checked={on} onChange={() => toggle(c)} />
                          <span
                            aria-hidden
                            className={`h-[12px] w-[12px] shrink-0 border ${on ? 'border-[#00886d] bg-[#00886d]' : 'border-[#00251e]'}`}
                          />
                          <span className="text-[1rem] leading-[1.4rem] text-ink">{c}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </form>
              {/* results */}
              <div className="flex w-[80%] flex-col tab:w-full">
                <div className="flex min-h-[7.5rem] items-center justify-between p-[2.5rem] tab:px-[1.5rem] mob:min-h-[5rem] mob:py-[1.5rem] xs:flex-col xs:items-start xs:gap-y-[1rem] xs:p-[1rem]">
                  <div className="text-ink">
                    Showing <span className="text-[#1ee9b6]">{shown.length}</span> {noun} out of <span>{items.length}</span>
                  </div>
                  <SortDropdown value={sort} onChange={setSort} />
                </div>
                <div className="grid w-full grid-cols-3 tab:grid-cols-2 xs:grid-cols-1">
                  {shown.map((it, i) => (
                    <div key={it.name + i} className="last:border-r last:border-[#00251e]">
                      <a
                        href="#"
                        className="group flex h-full min-h-[12rem] max-w-full flex-col items-start justify-between gap-y-[1rem] border-b border-l border-t border-[#00251e] p-[1.5rem] transition-all duration-200 hover:bg-[length:auto] mob:p-[1.5rem] xs:border-b-0 xs:border-l-0"
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundImage = PATTERN)}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundImage = '')}
                      >
                        <div className="flex w-full items-center justify-between gap-[2rem] overflow-clip">
                          <LogoPlaceholder text={it.name.slice(0, 2)} className="h-[2.5rem] min-h-[1.5rem] w-[5rem] max-w-[10rem] text-[0.75rem] mob:max-w-[8rem]" />
                          <div className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[8px_0] border border-[#01584b] bg-[#00251e] text-ink mob:h-[1.75rem] mob:w-[1.75rem] xs:rounded-[6px_0]">
                            <Arrow />
                          </div>
                        </div>
                        <div className="mt-[2rem] flex flex-col gap-[11px]">
                          <h4 className="mb-[0.5rem] font-serif text-[1.125rem] font-normal leading-[1.15] text-ink">{it.name}</h4>
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
    </section>
  )
}
