#!/usr/bin/env node
// Re-measure section heights of the built clone at 1440px (R9 evidence for extraction/wrapper_gate.py).
//
//   npx vite build --outDir <scratch>/dist && npx vite preview --outDir <scratch>/dist --port 5713
//   NODE_PATH="$(npm root -g)" node design-repo/extraction/measure_sections.mjs <out.json>
//
// Base URL: env MEASURE_BASE_URL (default http://localhost:5713). Playwright is resolved at runtime from
// NODE_PATH or the global npm root; no machine path is written into this repo.
// For each template the FIRST route is loaded; every direct element child of <main> is measured and mapped,
// in order, to the template's node sequence for that route (routeSequences[route] when recorded, otherwise
// the template's required nodes plus the optional ones the page renders). shell.nav / shell.footer are
// measured from the nav/footer elements. One child may hold several nodes (MULTI below, from the page source).
import { createRequire } from 'module'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.dirname(HERE)
const require = createRequire(import.meta.url)

function loadPlaywright() {
  const roots = (process.env.NODE_PATH || '').split(path.delimiter).filter(Boolean)
  try { roots.push(execSync('npm root -g', { encoding: 'utf8' }).trim()) } catch { /* ignore */ }
  for (const r of roots) {
    try { return require(path.join(r, 'playwright')) } catch { /* next */ }
  }
  return require('playwright')
}

const BASE = process.env.MEASURE_BASE_URL || 'http://localhost:5713'
const OUT = process.argv[2]
if (!OUT) { console.error('usage: measure_sections.mjs <out.json>'); process.exit(2) }

const tpls = JSON.parse(fs.readFileSync(path.join(REPO, 'templates', 'templates.json'), 'utf8')).templates

// Children that render more than one design-repo node (verified against the page source):
// Results.jsx renders the stat cards AND the testimonial in one container (Home.jsx:21), and the platform pages
// wrap Results + CentredQuote/FinalQuote in one plain <div> (Lms.jsx:209-225, SmallBusiness.jsx:122-159,
// Enterprise.jsx:228-251). Merged only when the page renders fewer children than node groups.
const MULTI = { 'proof.results-stats': ['proof.testimonial', 'proof.centred-quote'] }

// One DOM element that holds several design-repo sections split along its own content blocks (R6). The parts
// are measured inside the element: header = element top -> bottom of the info-card grid; cta = the CTA
// wrapper (parent .padding-global of [data-cta-block]) -> element bottom; body = the rest.
const SPLIT = { 'cs-platform-body': ['article.cs-platform-header', 'article.cs-platform-body', 'conversion.cs-platform-cta'] }

function sequenceFor(t, route) {
  const rs = (t.routeSequences || {})[route]
  if (rs) return { seq: rs.filter((s) => !s.startsWith('shell.')), certain: true }
  return { seq: null, certain: false }
}

const { chromium } = loadPlaywright()
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const out = { viewport: { width: 1440, height: 900 }, tool: 'playwright chromium', measuredAt: new Date().toISOString(), baseUrl: BASE, templates: {} }

for (const [tid, t] of Object.entries(tpls)) {
  const route = t.routes[0]
  await page.goto(BASE + route, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(async () => {
    const step = 600
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)) }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(800)
  const m = await page.evaluate(() => {
    const h = (el) => (el ? Math.round(el.getBoundingClientRect().height) : null)
    const nav = document.querySelector('nav, header')
    const navPos = nav ? getComputedStyle(nav).position : null
    const footer = document.querySelector('footer')
    // footer CTA block = first descendant block of footer > .padding-global > .container-large
    const cta = footer && footer.querySelector(':scope > .padding-global > .container-large > div')
    const main = document.querySelector('main')
    let kids = [...main.children]
    let flattened = false
    // a page that wraps all its sections in one plain <div> (no data-section): measure its children
    while (kids.length === 1 && !kids[0].getAttribute('data-section') && kids[0].children.length > 1) {
      kids = [...kids[0].children]; flattened = true
    }
    const children = kids.map((el, index) => {
      const pos = getComputedStyle(el).position
      return {
        index, tag: el.tagName.toLowerCase(), dataSection: el.getAttribute('data-section'),
        classes: (el.getAttribute('class') || '').split(/\s+/).filter(Boolean).slice(0, 4).join(' '),
        heightPx: h(el), childCount: el.childElementCount, inFlow: !(pos === 'fixed' || pos === 'absolute'),
        splitKey: el.querySelector('[data-section="cs-platform-body"]') || el.getAttribute('data-section') === 'cs-platform-body' ? 'cs-platform-body' : null,
        splitParts: (el.getAttribute('data-section') === 'cs-platform-body' || el.querySelector('[data-section="cs-platform-body"]')) ? (() => {
          const r = el.getBoundingClientRect()
          const cards = el.querySelector('.grid-cols-4').getBoundingClientRect()
          const cta = el.querySelector('[data-cta-block]').closest('.padding-global').getBoundingClientRect()
          const header = Math.round(cards.bottom - r.top)
          const tail = Math.round(r.bottom - cta.top)
          return [header, Math.round(r.height) - header - tail, tail]
        })() : null,
      }
    })
    return {
      pageHeightPx: Math.round(document.documentElement.scrollHeight),
      nav: { heightPx: h(nav), inFlow: !(navPos === 'fixed' || navPos === 'sticky' || navPos === 'absolute') },
      footer: { heightPx: h(footer), ctaBlockHeightPx: h(cta) },
      flattened, children,
    }
  })
  // mapping. Nodes rendered by Layout.jsx (the footer CTA: conversion.demo-cta / conversion.demo-form) live
  // inside <footer>, not <main>; they are measured from the footer's CTA block.
  const layoutNodes = new Set(t.nodes.filter((n) => String(n.measuredFrom || '').startsWith('src/components/Layout.jsx') && !n.section.startsWith('shell.')).map((n) => n.section))
  const repeatable = new Set(t.nodes.filter((n) => n.repeatable).map((n) => n.section))
  const multiTail = new Set(Object.values(MULTI).flat())
  let { seq, certain } = sequenceFor(t, route)
  const isSpacer = (c) => c.heightPx <= 80 && !c.dataSection && c.childCount === 0
  const real = m.children.filter((c) => c.heightPx > 0 && !isSpacer(c))
  const pageSeq = (s) => s.filter((x) => !layoutNodes.has(x))
  if (!seq) {
    const all = t.nodes.filter((n) => !n.section.startsWith('shell.')).map((n) => n.section)
    const req = t.nodes.filter((n) => !n.section.startsWith('shell.') && n.required !== false).map((n) => n.section)
    const fits = (s) => pageSeq(s).filter((x) => !multiTail.has(x)).length <= real.length
    seq = fits(all) ? all : req
  }
  const groups = []
  const ps = pageSeq(seq)
  for (let i = 0; i < ps.length; i++) {
    groups.push([ps[i]])
  }
  for (const parts of Object.values(SPLIT)) {
    const k = groups.findIndex((g) => g[0] === parts[0])
    if (k >= 0 && parts.every((s, j) => (groups[k + j] || [])[0] === s)) groups.splice(k, parts.length, [...parts])
  }
  for (let i = 0; i < groups.length - 1 && groups.length > real.length; i++) {
    if ((MULTI[groups[i][0]] || []).includes(groups[i + 1][0])) groups.splice(i, 2, [...groups[i], ...groups[i + 1]])
  }
  let gi = 0
  let surplus = real.length - groups.length
  let prev = null
  for (const c of m.children) {
    if (c.heightPx === 0) { c.sections = []; c.note = 'zero-height utility element'; continue }
    if (isSpacer(c)) { c.sections = []; c.note = 'empty spacer element (no children, no data-section, <= 80px)'; continue }
    if (surplus > 0 && prev && prev.dataSection && c.dataSection === prev.dataSection && prev.sections.length === 1 && repeatable.has(prev.sections[0])) {
      c.sections = [prev.sections[0]]; c.note = 'repeat of a repeatable node'; surplus--; prev = c; continue
    }
    c.sections = groups[gi++] || []
    if (c.splitParts && SPLIT[c.splitKey]) {
      c.parts = SPLIT[c.splitKey].map((s, j) => ({ section: s, heightPx: c.splitParts[j] }))
      c.note = 'one element split into ' + c.parts.length + ' sections along its own content blocks'
    }
    delete c.splitParts
    delete c.splitKey
    prev = c
  }
  if (layoutNodes.size) m.footer.ctaSections = [...layoutNodes]
  const note = []
  if (gi !== groups.length || m.children.some((c) => c.heightPx > 0 && !isSpacer(c) && !c.sections.length)) note.push(`MISMATCH: ${groups.length} node groups vs ${real.length} non-spacer <main> children`)
  if (m.flattened) note.push('page wraps its sections in one plain <div>; its children were measured')
  if (!certain && t.nodes.some((n) => n.required === false && !n.section.startsWith('shell.'))) note.push('optional slots resolved by fitting the rendered child count')
  out.templates[tid] = { route, ...m, mappingNote: note.join('; ') || 'one <main> child per node group, in template order' }
  console.log(tid, route, m.children.length, 'children', note.join('; '))
}
await browser.close()
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n')
console.log('wrote', OUT)
