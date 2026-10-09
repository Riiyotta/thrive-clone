// Preview for agent E's page-specific sections: renders every component stacked.
// Fixed-16 components render at a 16px root when shown alone. `?only=Name` renders a single component (used for measurement); `?variant=` is passed through
// for components with variants. Content-family sections sit on the content theme's warm black (#0a0700).
import { createElement as h, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const mods = import.meta.glob('../../components/sections/*.jsx', { eager: true })

const ORDER = [
  ['CsPlatformBody'],
  ['CsFilterGrid'],
  ['CsContentStats', { theme: true }],
  ['CsContentArticle', { theme: true }],
  ['CsContentArticle', { theme: true, props: { variant: 'long', preset: 'long' } }],
  ['CsContentRelated', { theme: true }],
  ['CsContentList', { theme: true }],
  ['Wow2col', { fixed: true }],
  ['CompanyHeader'],
  ['CompanyNews'],
  ['WhyKikitabs', { fixed: true }],
  ['WhyBlock', { fixed: true }],
  ['CustomVideo'],
  ['LearnGrid'],
  ['ContentHero', { theme: true }],
  ['SolutionTabs', { theme: true }],
  ['HeaderGridCard', { theme: true }],
  ['HeaderGridCard', { theme: true, props: { variant: 'suites' } }],
  ['TopicsGrid', { theme: true }],
  ['TopicsGrid', { theme: true, props: { variant: 'suites' } }],
  ['BlogFeatured'],
  ['BlogFilter'],
  ['EventsUpcoming'],
  ['WebinarsUpcoming'],
  ['EventsFilter'],
  ['ContactForm'],
  ['GuidesIndex', { fixed: true }],
  ['GlossaryIndex', { fixed: true }],
  ['GlossaryCta', { fixed: true }],
]

function Preview() {
  const q = new URLSearchParams(useLocation().search)
  const only = q.get('only')
  const variant = q.get('variant')
  const items = ORDER.filter(([name, o]) => {
    if (!mods[`../../components/sections/${name}.jsx`]) return false
    if (only && only !== name) return false
    if (only && variant) return (o?.props?.variant || 'default') === variant
    return true
  })
  // Fixed-16 pages (Layout FIXED_REM_PAGES): with ?only=<fixed component> drop the fluid root so the
  // preview renders at the same 16px root as its real page. Runs after Layout's layout effect.
  const fixed = items.length > 0 && items.every(([, o]) => o?.fixed)
  useEffect(() => {
    if (fixed) document.documentElement.classList.remove('fluid-rem')
  }, [fixed])
  return h(
    'div',
    null,
    items.map(([name, o = {}], i) =>
      h(
        'div',
        { key: name + i, 'data-preview': name, 'data-variant': o.props?.variant || 'default', className: o.theme ? 'bg-[#0a0700]' : '' },
        h(mods[`../../components/sections/${name}.jsx`].default, o.props || {}),
      ),
    ),
  )
}

export const pages = { '/__preview/sections-e': Preview }
