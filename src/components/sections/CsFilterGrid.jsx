import { useEffect, useMemo, useRef, useState } from 'react'
import { LogoPlaceholder } from '../shared/Placeholder.jsx'

// cs-filter-grid (.section_wowfilters) on /case-studies/lms: H2 header, sticky filter bar
// ("All" + Industries / Use Case / Number of employees checkbox dropdowns, Finsweet-style:
// OR inside a field, AND across fields) and a 3-col (2 ≤991, 1 ≤767) grid of case-study cards.
// Card hover: bg #0b0b0b -> #141414, transition all .2s. Option hover: grey -> white, colour .3s.
// Dropdowns open on click and stay open while options are toggled (as on the original); outside click closes.

const INDUSTRIES = ['Beauty', 'Education & Training', 'Finance', 'Food & Drink', 'Gaming', 'Government & Public Sector', 'Healthcare', 'Hospitality', 'Leisure and Tourism', 'Manufacturing', 'Non-Profit', 'Professional Services', 'Real Estate', 'Recruitment', 'Retail', 'Software', 'Transport']
const USE_CASES = ['Coaching and mentoring', 'Communication', 'Compliance training', 'Continuing Professional Development', 'Corporate social responsibility', 'Customer service training', 'Deskless workforce', 'Employee engagement', 'Employee onboarding', 'Employee training', 'Essential learning', 'Extended enterprise', 'Franchise training', 'Frontline training', 'Internal communications', 'Knowledge management', 'Leadership development', 'Performance enablement', 'Product knowledge', 'Role-based training', 'Sales enablement', 'Skills development', 'Social learning', 'Training']
const SIZES = ['0 - 250', '250 - 500', '500 - 1,000', '1,000 - 5,000', '5,000 - 10,000', '10,000 - 15,000', '15K+']

const DEFAULT_FILTERS = [
  { key: 'industry', label: 'Industries', options: INDUSTRIES, listWidth: 'w-[24rem] xs:w-[18rem]' },
  { key: 'useCase', label: 'Use Case', options: USE_CASES, listWidth: 'w-[24rem] xs:w-[18rem]' },
  { key: 'employees', label: 'Number of employees', options: SIZES, listWidth: 'w-[14rem] xs:w-[18rem]' },
]

// 49 placeholder cards (the live CMS list showed 49 at measurement time). Headlines are 8–12 words (2 lines).
const HEADLINES = [
  'Customer {n} cuts onboarding time in half across every store',
  'Customer {n} transforms compliance training across 1,000+ sites',
  'Customer {n} reaches a 70% mentoring match rate in eight weeks',
  'Customer {n} unites 5,000 people across 800+ locations on one platform',
  'Customer {n} lifts product sales by 14% through targeted learning',
  'Customer {n} grows customer satisfaction and wins a national service award',
  'Customer {n} hits 90% completion with half its content made by staff',
  'Customer {n} reaches 98% adoption and renews early for five years',
]
const DEFAULT_ITEMS = Array.from({ length: 49 }, (_, i) => ({
  logo: `Logo ${i + 1}`,
  text: HEADLINES[i % HEADLINES.length].replace('{n}', String(i + 1)),
  industry: INDUSTRIES[(i * 7) % INDUSTRIES.length],
  useCase: [USE_CASES[(i * 5) % USE_CASES.length], USE_CASES[(i * 11 + 3) % USE_CASES.length]],
  employees: SIZES[(i * 3) % SIZES.length],
  href: '#',
}))

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" className="h-[1em] w-[1em]" aria-hidden>
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Dropdown({ filter, selected, onToggle, open, setOpen }) {
  const title = selected.length ? selected.join(', ') : filter.label
  return (
    <div className="relative z-[900] xs:w-full">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(open ? null : filter.key)}
        className={`relative flex w-full items-center justify-start whitespace-nowrap rounded-card bg-surface-3 py-[0.75rem] pl-[1rem] pr-[2rem] text-[0.85rem] leading-[1.4] ${
          selected.length ? 'text-ink' : 'text-grey'
        }`}
      >
        <span className="max-w-[16rem] overflow-hidden text-ellipsis">{title}</span>
        <span className="absolute bottom-0 right-0 top-0 my-auto mr-[0.75rem] flex h-[1em] items-center text-ink">
          <Chevron />
        </span>
      </button>
      {open && (
        <div className={`absolute left-0 top-full mt-[0.75rem] xs:relative ${filter.listWidth}`}>
          <div className="grid grid-cols-2 rounded-card bg-surface-3 p-[0.75rem]">
            {filter.options.map((o) => {
              const on = selected.includes(o)
              return (
                <label
                  key={o}
                  className={`block cursor-pointer py-[0.25rem] pl-[0.5rem] pr-[1rem] text-[0.85rem] leading-[1.4] transition-colors duration-300 hover:text-ink xs:pl-[0.25rem] ${
                    on ? 'text-ink' : 'text-grey'
                  }`}
                >
                  <input type="checkbox" className="hidden" checked={on} onChange={() => onToggle(filter.key, o)} />
                  <span>{o}</span>
                </label>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CsFilterGrid({
  heading = 'Learning stories from onboarding, compliance and performance teams',
  filters = DEFAULT_FILTERS,
  items = DEFAULT_ITEMS,
  emptyText = 'No case studies match those filters yet.',
}) {
  const [sel, setSel] = useState({})
  const [open, setOpen] = useState(null)
  const formRef = useRef(null)

  useEffect(() => {
    const close = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) setOpen(null)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const toggle = (key, value) =>
    setSel((s) => {
      const cur = s[key] || []
      return { ...s, [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] }
    })

  const visible = useMemo(
    () =>
      items.filter((it) =>
        Object.entries(sel).every(([k, vals]) => {
          if (!vals.length) return true
          const v = [].concat(it[k])
          return vals.some((x) => v.includes(x))
        }),
      ),
    [items, sel],
  )

  return (
    <section data-section="cs-filter-grid" className="relative">
      <div className="padding-global">
        <div className="py-[5rem] tab:py-[4rem] mob:py-[3rem]">
          <div className="container-medium">
            <div className="flex flex-col items-center justify-center">
              <div className="flex w-full flex-col items-start justify-start gap-y-[1rem]">
                <h2 className="heading-h2">{heading}</h2>
              </div>
            </div>
            <div className="pt-[5rem] tab:pt-[4rem] mob:pt-[3rem]" />
            <div className="flex w-full flex-col gap-[1rem]">
              <div className="sticky top-[3rem] z-[2] mb-[15px]">
                <form
                  ref={formRef}
                  onSubmit={(e) => e.preventDefault()}
                  className="flex w-full items-center justify-start gap-[0.5rem] xs:flex-col xs:items-start"
                >
                  <div className="flex items-center justify-between rounded-card px-[1rem] py-[0.75rem] tab:px-[1.5rem] mob:min-h-[5rem] mob:py-[1.5rem] xs:min-h-[1rem] xs:w-full xs:px-[0.5rem] xs:py-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSel({})
                        setOpen(null)
                      }}
                      className="w-full text-left text-[1rem] leading-[1.4] text-grey transition-colors duration-[260ms] hover:text-ink"
                    >
                      All
                    </button>
                  </div>
                  {filters.map((f) => (
                    <Dropdown
                      key={f.key}
                      filter={f}
                      selected={sel[f.key] || []}
                      onToggle={toggle}
                      open={open === f.key}
                      setOpen={setOpen}
                    />
                  ))}
                </form>
              </div>
              <div className="flex w-full flex-col">
                {visible.length ? (
                  <div className="grid w-full grid-cols-3 gap-[1rem] tab:grid-cols-2 mob:grid-cols-1">
                    {visible.map((it, i) => (
                      <div key={it.text + i}>
                        <a
                          href={it.href}
                          className="flex h-full min-h-[16.25rem] flex-col items-start justify-between gap-y-[1rem] rounded-card bg-surface-1 p-[1.5rem] text-inherit no-underline transition-all duration-200 hover:bg-[#141414]"
                        >
                          <div className="flex items-center justify-between">
                            <LogoPlaceholder
                              text={it.logo}
                              className="h-[2.5rem] min-h-[1.5rem] w-[5rem] min-w-[5rem] max-w-[10rem] justify-start text-[0.8rem] text-ink mob:max-w-[8rem]"
                            />
                          </div>
                          <div>
                            <p className="mb-[1.25rem] text-para text-ink">{it.text}</p>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center rounded-card bg-surface-1 p-[1.5rem] text-[0.875rem]">{emptyText}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
