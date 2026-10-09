import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import { ScrollTrigger } from '../lib/gsap.js'

// Global chrome rendered once for every route: Nav and Footer never remount on navigation.
export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname])

  return (
    <div className="bg-page pt-[64px]">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
