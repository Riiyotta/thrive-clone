import { useLayoutEffect, useRef } from 'react'
import Placeholder from '../shared/Placeholder.jsx'
import Wordmark from '../shared/Wordmark.jsx'
import { gsap } from '../../lib/gsap.js'

// glossary-cta (.container > ._12-column-card-1) on /resources/lms-glossary — oldest system, fixed 16px root.
// #1b1b1b rounded card: wordmark, 2.5rem heading, one-line copy, two green buttons (hover -> white),
// product image below. Motion (IX2): rises from y 100px + fades in, 1000ms outQuart, delay 300ms, once.
export default function GlossaryCta({
  heading = 'See Nimbus at work',
  text = 'Explore what Nimbus can do for your teams with a short, friendly demo.',
  buttons = [
    { label: 'Book a demo', href: '/lms/demo-platform' },
    { label: 'Try content for free', href: '/content' },
  ],
  image = null,
}) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top bottom', once: true } })
    }, el)
    return () => ctx.revert()
  }, [])
  return (
    <div data-section="glossary-cta" className="relative z-[500] mx-auto flex w-full max-w-[80rem] flex-col items-start justify-start gap-x-[2.5rem] gap-y-[7.5rem] px-[2.5rem] wide:px-[7.5rem] tab:gap-[1.25rem] tab:px-[1.25rem]">
      <div ref={ref} className="relative flex h-auto w-full flex-col justify-between overflow-hidden rounded-[10px] bg-[#1b1b1b] xs:mx-0 xs:self-center">
        <div className="relative z-50 flex flex-col items-center gap-[1.25rem] px-[2.5rem] py-[3.75rem] tab:px-[1.875rem] tab:py-[2.5rem] mob:px-[1.25rem] mob:py-[1.875rem] xs:px-[1rem]">
          <Wordmark className="h-[36px] tab:h-[24px]" textClassName="text-[1.5rem] tab:text-[1rem]" />
          <div className="flex flex-col items-center justify-center gap-[0.75rem] text-center">
            <h2 className="mx-auto mt-[0.25rem] text-[2.5rem] font-normal leading-[3.125rem] tab:leading-[1.3] mob:text-[1.875rem]">{heading}</h2>
            <p className="relative z-10 mb-0 text-[1.25rem] leading-[1.5] text-white tab:leading-[1.3] mob:text-[1rem]">{text}</p>
          </div>
          <div className="flex items-center justify-center gap-[1.25rem] mob:flex-col mob:gap-[0.625rem]">
            {buttons.map((b) => (
              <a
                key={b.label}
                href={b.href}
                className="flex items-center gap-[0.3125rem] rounded-[4px] bg-green px-[1rem] py-[0.5rem] text-[0.875rem] font-semibold leading-[1.4] text-[#1b1b1b] no-underline transition-colors ease-[ease] hover:bg-white"
              >
                {b.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-[1.25rem] w-full max-w-[80rem] px-[2.5rem] tab:px-[1.25rem] mob:mt-[0.625rem] mob:px-[0.9375rem]">
          <Placeholder label="Product image" src={image || undefined} className="aspect-[1300/582] w-full" />
        </div>
      </div>
    </div>
  )
}
