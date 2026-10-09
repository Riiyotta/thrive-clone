// Preview of agent C's shared sections: every component and every variant, stacked.
// /__preview/sections-c renders all; ?only=Layout2Hero (comma list, or Name:variant) renders a subset;
// ?root=16 forces the fixed 16px root used by /lms/corporate-lms, /lms/enterprise and /lms/features.
import { createElement as h, Fragment, useEffect } from 'react'
import IntegrationsVisual from '../../components/sections/IntegrationsVisual.jsx'
import StickyTabs from '../../components/sections/StickyTabs.jsx'
import AnchorNav from '../../components/sections/AnchorNav.jsx'
import TestimonialCardLegacy from '../../components/sections/TestimonialCardLegacy.jsx'
import Sectors from '../../components/sections/Sectors.jsx'
import Layout2Hero from '../../components/sections/Layout2Hero.jsx'
import FlipLogos from '../../components/sections/FlipLogos.jsx'
import FeatureTwoColLegacy from '../../components/sections/FeatureTwoColLegacy.jsx'
import HeroCenterLegacy from '../../components/sections/HeroCenterLegacy.jsx'
import CardSliderLegacy from '../../components/sections/CardSliderLegacy.jsx'
import GlobalHeaderLegacy from '../../components/sections/GlobalHeaderLegacy.jsx'
import GridCardsLegacy from '../../components/sections/GridCardsLegacy.jsx'
import GridSplitLegacy from '../../components/sections/GridSplitLegacy.jsx'

// [name, variant label, element factory]
const ITEMS = [
  ['AnchorNav', 'solutions', () => h(AnchorNav, { variant: 'solutions' })],
  ['StickyTabs', 'solutions', () => h(StickyTabs, { variant: 'solutions' })],
  ['Sectors', 'industries', () => h(Sectors, { variant: 'industries', id: 'industries' })],
  ['Sectors', 'topics', () => h(Sectors, { variant: 'topics' })],
  ['AnchorNav', 'features', () => h(AnchorNav, { variant: 'features' })],
  ['StickyTabs', 'features', () => h(StickyTabs, { variant: 'features' })],
  ['IntegrationsVisual', 'mid-market', () => h(IntegrationsVisual, { variant: 'mid-market' })],
  ['IntegrationsVisual', 'enterprise', () => h(IntegrationsVisual, { variant: 'enterprise' })],
  ['IntegrationsVisual', 'features', () => h(IntegrationsVisual, { variant: 'features' })],
  ['Layout2Hero', 'impact', () => h(Layout2Hero, { variant: 'impact' })],
  ['Layout2Hero', 'service', () => h(Layout2Hero, { variant: 'service' })],
  ['Layout2Hero', 'case-study', () => h(Layout2Hero, { variant: 'case-study' })],
  ['Layout2Hero', 'company', () => h(Layout2Hero, { variant: 'company' })],
  ['Layout2Hero', 'events', () => h(Layout2Hero, { variant: 'events' })],
  ['FlipLogos', 'yellow', () => h(FlipLogos, { theme: 'yellow' })],
  ['FlipLogos', 'pink', () => h(FlipLogos, { theme: 'pink' })],
  ['FeatureTwoColLegacy', 'impact', () => h(FeatureTwoColLegacy, { variant: 'impact' })],
  ['FeatureTwoColLegacy', 'service', () => h(FeatureTwoColLegacy, { variant: 'service' })],
  ['FeatureTwoColLegacy', 'services', () => h(FeatureTwoColLegacy, { variant: 'services' })],
  ['HeroCenterLegacy', 'services', () => h(HeroCenterLegacy, { variant: 'services' })],
  ['HeroCenterLegacy', 'custom', () => h(HeroCenterLegacy, { variant: 'custom' })],
  ['TestimonialCardLegacy', 'service', () => h(TestimonialCardLegacy, { theme: 'yellow', logo: 'tall' })],
  [
    'TestimonialCardLegacy',
    'custom',
    () =>
      h(TestimonialCardLegacy, {
        theme: 'green',
        logo: 'wide',
        quote: '"The tailored content has completely changed how our people learn, with courses that feel personally made for their own roles"',
        name: 'Riley Morgan',
        role: 'Head of People Development and Learning',
      }),
  ],
  ['CardSliderLegacy', 'journey', () => h(CardSliderLegacy, { variant: 'journey' })],
  ['CardSliderLegacy', 'library', () => h(CardSliderLegacy, { variant: 'library' })],
  ['CardSliderLegacy', 'process', () => h(CardSliderLegacy, { variant: 'process' })],
  ['GlobalHeaderLegacy', 'logo', () => h(GlobalHeaderLegacy, { variant: 'logo' })],
  ['GlobalHeaderLegacy', 'eyebrow', () => h(GlobalHeaderLegacy, { variant: 'eyebrow' })],
  ['GridCardsLegacy', 'services-extra', () => h(GridCardsLegacy, { variant: 'services-extra' })],
  ['GridCardsLegacy', 'people', () => h(GridCardsLegacy, { variant: 'people' })],
  ['GridCardsLegacy', 'stats', () => h(GridCardsLegacy, { variant: 'stats' })],
  ['GridCardsLegacy', 'awards', () => h(GridCardsLegacy, { variant: 'awards' })],
  ['GridCardsLegacy', 'content', () => h(GridCardsLegacy, { variant: 'content' })],
  ['GridSplitLegacy', 'testimonial', () => h(GridSplitLegacy, { variant: 'testimonial' })],
  ['GridSplitLegacy', 'text', () => h(GridSplitLegacy, { variant: 'text' })],
  ['GridSplitLegacy', 'image', () => h(GridSplitLegacy, { variant: 'image' })],
  ['GridSplitLegacy', 'suites', () => h(GridSplitLegacy, { variant: 'suites' })],
]

function SectionsC() {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const only = params.get('only')
  const fixed = params.get('root') === '16'

  // Layout applies .fluid-rem in a layout effect; this passive effect runs after it.
  useEffect(() => {
    if (!fixed) return
    const t = setTimeout(() => document.documentElement.classList.remove('fluid-rem'), 0)
    return () => clearTimeout(t)
  }, [fixed])

  const wanted = only ? only.split(',') : null
  const list = ITEMS.filter(([n, v]) => !wanted || wanted.includes(n) || wanted.includes(`${n}:${v}`))
  return h(
    'div',
    { className: 'pb-[6rem]' },
    list.map(([n, v, make]) =>
      h(
        Fragment,
        { key: `${n}:${v}` },
        wanted
          ? null
          : h('div', { className: 'padding-global py-[1rem] text-[0.75rem] uppercase tracking-[0.08em] text-grey' }, `${n} · ${v}`),
        h('div', { 'data-preview': `${n}:${v}` }, make()),
      ),
    ),
  )
}

export const pages = { '/__preview/sections-c': SectionsC }
