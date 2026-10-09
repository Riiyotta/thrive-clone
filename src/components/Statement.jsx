import { useLayoutEffect, useRef } from 'react'
import Placeholder from './shared/Placeholder.jsx'
import { gsap } from '../lib/gsap.js'

// §8 statement. [data-scroll-zoom] gets the §13.5 scroll zoom: IX2 "WowBig Visual Reveal" keyframes
// (55%: scale 2.5, translate 23px/-447px, opacity 0 -> 65%: identity, opacity 1; same px on mobile),
// re-expressed as a ScrollTrigger scrub over the range the original visibly animates in
// (element top at 55% -> 5% of the viewport; IX2 smoothing 90 ~ scrub 0.9).
export default function Statement() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const wrap = ref.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-scroll-zoom]',
        { scale: 2.5, x: 23, y: -447, opacity: 0, transformOrigin: '50% 50%' },
        {
          scale: 1,
          x: 0,
          y: 0,
          opacity: 1,
          ease: 'none',
          // trigger on the untransformed wrapper so the 2.5x start state can't skew measurements
          scrollTrigger: { trigger: wrap, start: 'top 55%', end: 'top 5%', scrub: 0.9 },
        },
      )
    }, wrap)
    return () => ctx.revert()
  }, [])

  return (
    // overflow-x clip mirrors the original's body/page-wrapper overflow-x:hidden; vertical stays visible
    <section data-section="statement" className="mt-[2rem] flex flex-col overflow-x-clip">
      <div ref={ref} className="relative">
        <Placeholder
          data-scroll-zoom
          src="/assets/statement-visual.avif"
          alt="Product montage"
          className="aspect-[1440/598] w-full origin-center"
        />
      </div>
      <div className="padding-global">
        <div className="pb-[1rem] pt-[5rem] tab:pt-[4rem] mob:pt-[3rem]">
          <div className="mx-auto flex max-w-[36rem] flex-col items-center text-center">
            <h2 className="heading-h2 max-w-[25rem]">Built for how people really learn</h2>
            <div className="h-[1rem]" />
            <p className="mb-[1.25rem] text-para text-grey">
              Most training tools were designed for tracking, not for people.
              <br />
              We started from the other end, with curiosity and the small moments where people learn,
              <br />
              and built the rest around that.
              <br />
              Teams come back without being asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
