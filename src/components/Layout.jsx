import { useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import { ScrollTrigger } from '../lib/gsap.js'
import { STOCK_MAP, SQUARE_IDS } from '../stock/stockMap.js'

// Global chrome rendered once for every route: Nav and Footer never remount on navigation.
// Pages that keep a fixed 16px root on the original (pages-manifest.json fluidRem.fixedRemPages).
const FIXED_REM_PAGES = new Set([
  '/',
  '/lms/corporate-lms',
  '/lms/enterprise',
  '/lms/features',
  '/mentoring',
  '/company/why-nimbus',
  '/whats-included',
  '/resources/guides',
  '/resources/lms-glossary',
])

// Pages whose footer CTA keeps the homepage HubSpot-form block (measured live 2026-10-09:
// '/' and '/company'); every other route uses the subpage button variant.
const FORM_FOOTER_PAGES = new Set(['/', '/company'])

// Content-theme pages sit on a warm near-black body (#0a0700) on the original; all others on #000.
const isContentTheme = (path) =>
  ['/content', '/content/topics', '/content/sector-suites', '/case-studies/content'].includes(path) ||
  path.startsWith('/case-studies-contents/')

export default function Layout() {
  const { pathname } = useLocation()
  // Before paint, so rem-based layout never renders at the wrong scale.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('fluid-rem', !FIXED_REM_PAGES.has(pathname))
  }, [pathname])
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname])

  // Per-route stock photo picks (src/stock/stockMap.js), applied to stock-eligible slots in DOM
  // order. Only the background image changes, never geometry. Re-applied when slots are added
  // later (filters, load-more, carousel clones).
  const mainRef = useRef(null)
  useEffect(() => {
    const picks = STOCK_MAP[pathname]
    const main = mainRef.current
    if (!picks || !main) return
    const apply = () => {
      main.querySelectorAll('[data-stock-slot]').forEach((el, i) => {
        const id = picks[i]
        if (id == null) return
        const square = Math.abs(el.clientWidth - el.clientHeight) < 4 && SQUARE_IDS.has(id)
        el.style.backgroundImage = `url(/stock/${id}${square ? '-sq' : ''}.jpg)`
      })
    }
    apply()
    const mo = new MutationObserver(apply)
    mo.observe(main, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [pathname])

  // overflow-x: clip like the original's .page-wrapper: hides bleeding images/reveal offsets without
  // creating a scroll container, so position: sticky keeps working.
  return (
    <div className={`${isContentTheme(pathname) ? 'bg-content-bg' : 'bg-page'} overflow-x-clip pt-[4rem]`}>
      <Nav />
      <main ref={mainRef}>
        <Outlet />
      </main>
      <Footer variant={FORM_FOOTER_PAGES.has(pathname) ? 'home' : 'subpage'} />
    </div>
  )
}
