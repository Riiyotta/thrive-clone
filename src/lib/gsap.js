// Single registration point for GSAP plugins (gsap 3.15 ships SplitText for free).
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export { gsap, ScrollTrigger, SplitText }

// Web fonts and lazy media can change the document height after ScrollTrigger's initial
// measurement; re-measure whenever the page height actually changes.
if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
  let lastH = 0
  let t = null
  new ResizeObserver(() => {
    const h = document.documentElement.scrollHeight
    if (h === lastH) return
    lastH = h
    clearTimeout(t)
    t = setTimeout(() => ScrollTrigger.refresh(), 100)
  }).observe(document.documentElement)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh())
}
