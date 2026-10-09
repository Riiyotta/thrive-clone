import { useLayoutEffect, useRef } from 'react'
import { gsap, SplitText } from '../lib/gsap.js'

// §9 scroll-highlight quote, §13.6. Measured from the original's live ScrollTrigger:
// SplitText chars, color -> #fff, 1.5s each, stagger {amount:10} (11.5s timeline), power4.inOut,
// start "clamp(top 500)", end "clamp(bottom 500)", scrub 0.8, toggleActions "play none none none".
export default function QuoteHighlight() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    const ctx = gsap.context(() => {
      const split = SplitText.create(el, {
        type: 'words,chars',
        wordsClass: 'gsap_split_word',
        charsClass: 'gsap_split_letter',
      })
      gsap.set([...split.words, ...split.chars], { position: 'relative', display: 'inline-block' })
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: 'clamp(top 500)',
            end: 'clamp(bottom 500)',
            scrub: 0.8,
            toggleActions: 'play none none none',
          },
        })
        .to(split.chars, { color: '#ffffff', duration: 1.5, stagger: { amount: 10 }, ease: 'power4.inOut' })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section data-section="quote">
      <div className="padding-global">
        <div className="pb-[5rem] pt-[2rem] tab:pb-[4rem] mob:pb-[3rem]">
          <div className="flex flex-col items-center">
            <div className="max-w-[42rem]">
              <p
                ref={ref}
                data-scroll-highlight
                className="text-quote font-medium text-surface-3 tab:text-quote-tab mob:text-quote-mob"
              >
                “Companies that weave learning into the everyday flow of work adapt faster, keep their best people longer and find new growth far easier than the rest.”
                <br />
                <br />
                Morgan Reyes, Industry Analyst
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
