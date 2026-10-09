// Preview of agent D's page-specific sections, stacked in catalogue order.
// /__preview/sections-d renders all; ?only=PricingHero renders one; ?root=16 keeps a fixed 16px root.
import { createElement as h, useEffect } from 'react'

const ORDER = [
  'PricingHero', 'ReviewsGrid', 'ContentPricing',
  'PlatformHero', 'PlatformIntroHeader', 'FeatureBento',
  'LogosHeroOverlap', 'SpringGrid', 'DemoHero', 'FeaturesIntro',
  'IntegrationsHeader', 'IntegrationFilter',
  'HeaderImageLegacy', 'TabsHLegacy', 'PricingProLegacy',
  'KikiHeader', 'KikiFeatureTabs', 'MentoringHeader', 'CaseStudyVideo',
]
const mods = import.meta.glob(
  '../../components/sections/{PricingHero,ReviewsGrid,ContentPricing,PlatformHero,PlatformIntroHeader,FeatureBento,LogosHeroOverlap,SpringGrid,DemoHero,FeaturesIntro,IntegrationsHeader,IntegrationFilter,HeaderImageLegacy,TabsHLegacy,PricingProLegacy,KikiHeader,KikiFeatureTabs,MentoringHeader,CaseStudyVideo}.jsx',
  { eager: true },
)
const byName = Object.fromEntries(
  Object.entries(mods).map(([path, m]) => [path.split('/').pop().replace('.jsx', ''), m.default]),
)

function SectionsD() {
  // ?root=16 previews fixed-16px pages (corporate-lms, features): drop Layout's fluid root after it applies it.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('root') !== '16') return
    const t = setTimeout(() => document.documentElement.classList.remove('fluid-rem'), 0)
    return () => clearTimeout(t)
  }, [])
  const only = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('only') : null
  const names = ORDER.filter((n) => byName[n] && (!only || only.split(',').includes(n)))
  return h(
    'div',
    null,
    names.map((n) => h('div', { key: n, 'data-preview': n }, h(byName[n]))),
  )
}

export const pages = { '/__preview/sections-d': SectionsD }
