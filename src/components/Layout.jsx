import { useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import { ScrollTrigger } from '../lib/gsap.js'

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

  return (
    <div className="bg-page pt-[4rem]">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
