// Preview of the wave-1 "B-shared" sections: every component and every variant, stacked.
// Plain .js (no JSX) because only this file is registered for the preview route.
import { createElement as h } from 'react'
import SplitTabs from '../../components/sections/SplitTabs.jsx'
import CtaStrip from '../../components/sections/CtaStrip.jsx'
import ReviewsSlider from '../../components/sections/ReviewsSlider.jsx'
import FaqLegacy from '../../components/sections/FaqLegacy.jsx'
import WowContentHero from '../../components/sections/WowContentHero.jsx'
import AutotabsGroup from '../../components/sections/AutotabsGroup.jsx'
import TestimonialQuote from '../../components/sections/TestimonialQuote.jsx'
import ComparisonTable from '../../components/sections/ComparisonTable.jsx'
import Layout03Tabs from '../../components/sections/Layout03Tabs.jsx'
import WowBento from '../../components/sections/WowBento.jsx'
import Marquee from '../../components/sections/Marquee.jsx'
import TwoColFeatures from '../../components/sections/TwoColFeatures.jsx'

const ITEMS = [
  ['wowcontent-hero/small-business', WowContentHero, { variant: 'small-business' }],
  ['wowcontent-hero/corporate', WowContentHero, { variant: 'corporate' }],
  ['wowcontent-hero/enterprise', WowContentHero, { variant: 'enterprise' }],
  ['wowcontent-hero/solutions', WowContentHero, { variant: 'solutions' }],
  ['wowcontent-hero/spring-release', WowContentHero, { variant: 'spring-release' }],
  ['wowcontent-hero/features', WowContentHero, { variant: 'features' }],
  ['wowcontent-hero/mentoring', WowContentHero, { variant: 'mentoring' }],
  ['wowcontent-hero/case-studies', WowContentHero, { variant: 'case-studies' }],
  ['wowcontent-hero/why', WowContentHero, { variant: 'why' }],
  ['wowcontent-hero/whats-included', WowContentHero, { variant: 'whats-included' }],
  ['cta-strip/heading', CtaStrip, { variant: 'heading' }],
  ['cta-strip/pricing', CtaStrip, { variant: 'pricing' }],
  ['cta-strip/spacer', CtaStrip, { variant: 'spacer' }],
  ['cta-strip/button', CtaStrip, { variant: 'button' }],
  ['cta-strip/button-pullup', CtaStrip, { variant: 'button', pullUp: true }],
  ['testimonial-quote/platform', TestimonialQuote, { variant: 'platform' }],
  ['testimonial-quote/platform-features', TestimonialQuote, { variant: 'platform', preset: 'platform-features' }],
  ['testimonial-quote/platform-lg', TestimonialQuote, { variant: 'platform-lg' }],
  ['testimonial-quote/section', TestimonialQuote, { variant: 'section', button: { label: 'What could you achieve? →', href: '/lms/demo-platform' } }],
  ['testimonial-quote/platform+button', TestimonialQuote, { variant: 'platform', preset: 'platform-solutions', button: { label: 'See Nimbus in action', href: '/lms/demo-platform' } }],
  ['testimonial-quote/mid-market', TestimonialQuote, { variant: 'mid-market' }],
  ['testimonial-quote/enterprise', TestimonialQuote, { variant: 'enterprise' }],
  ['testimonial-quote/kiki', TestimonialQuote, { variant: 'kiki' }],
  ['reviews-slider/author-first', ReviewsSlider, { order: 'author-first' }],
  ['reviews-slider/quote-first', ReviewsSlider, { order: 'quote-first' }],
  ['reviews-slider/empty', ReviewsSlider, { slides: [] }],
  ['faq-legacy/olive', FaqLegacy, { theme: 'olive' }],
  ['faq-legacy/olive-items', FaqLegacy, { theme: 'olive-items' }],
  ['faq-legacy/green', FaqLegacy, { theme: 'green', title: 'Integration questions answered' }],
  ['autotabs-group/platform', AutotabsGroup, { variant: 'platform' }],
  ['autotabs-group/enterprise', AutotabsGroup, { variant: 'enterprise' }],
  ['autotabs-group/mentoring', AutotabsGroup, { variant: 'mentoring' }],
  ['split-tabs/base', SplitTabs, { variant: 'base' }],
  ['split-tabs/reversed', SplitTabs, { variant: 'reversed' }],
  ['comparison-table/platform', ComparisonTable, { variant: 'platform' }],
  ['comparison-table/enterprise', ComparisonTable, { variant: 'enterprise' }],
  ['comparison-table/vendor', ComparisonTable, { variant: 'vendor' }],
  ['layout03-tabs/image', Layout03Tabs, { variant: 'image' }],
  ['layout03-tabs/video', Layout03Tabs, { variant: 'video' }],
  ['layout03-tabs/video-compact', Layout03Tabs, { variant: 'video-compact' }],
  ['wowbento/cards', WowBento, { variant: 'cards' }],
  ['wowbento/cards-cta', WowBento, { variant: 'cards-cta' }],
  ['wowbento/release', WowBento, { variant: 'release' }],
  ['wowbento/included', WowBento, { variant: 'included' }],
  ['wowbento/why', WowBento, { variant: 'why' }],
  ['marquee/header', Marquee, { variant: 'header' }],
  ['marquee/plain', Marquee, { variant: 'plain' }],
  ['marquee/plain-set2', Marquee, { variant: 'plain', set: 2 }],
  ['marquee/plain-set3', Marquee, { variant: 'plain', set: 3 }],
  ['two-col-features/company', TwoColFeatures, { preset: 'company' }],
  ['two-col-features/corporate', TwoColFeatures, { preset: 'corporate' }],
  ['two-col-features/enterprise', TwoColFeatures, { preset: 'enterprise' }],
]

function Label({ id }) {
  return h(
    'div',
    { className: 'border-y border-surface-3 bg-surface-2 px-[1rem] py-[0.25rem] font-mono text-[12px] text-grey', 'data-preview-label': id },
    id,
  )
}

function SectionsB() {
  return h(
    'div',
    null,
    ITEMS.map(([id, C, props]) => h('div', { key: id, 'data-preview': id }, h(Label, { id }), h('div', { 'data-preview-body': id }, h(C, props)))),
  )
}

export const pages = { '/__preview/sections-b': SectionsB }
