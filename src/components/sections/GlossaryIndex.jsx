import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { SignupForm } from './GuidesIndex.jsx'
import { gsap } from '../../lib/gsap.js'

// glossary-index (.section-23) on /resources/lms-glossary — oldest system, fixed 16px root (px ÷16 as rem).
// Header (serif H1, 3-line intro, static sign-up form), an A–Z pill filter (radio; Finsweet cmsfilter
// behaviour: filters terms by first letter, "Showing N results.") and a 3-col grid of term cards.
// Motion (IX2): header fades in (1000ms outQuart, delay 100), filter fades in, the list rises from
// y 100px + fades (1000ms outQuart, delay 500) — scroll-into-view, once. Card hover: the other cards dim to
// opacity .5 (500ms), back to 1 on leave (200ms ease). Letter hover: text #1de9b6, bg white/10,
// border #139c79 (.3s); "Read more" hover bg #1de9b6. The list sits in 7.5rem side padding only at ≥1440 (2.5rem below).

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const TERMS = [
  'Adaptive learning', 'Blended learning', 'Certification tracking', 'Corporate training platform', 'Compliance training', 'Content curation',
  'Digital adoption', 'eLearning authoring', 'Employee onboarding', 'Extended enterprise', 'Gamification in learning', 'Human capital management',
  'Instructor-led training', 'Knowledge base', 'Learning experience platform', 'Learning management system', 'Learning pathways', 'Microlearning',
  'Mobile learning', 'Peer learning', 'Personalised learning', 'Reskilling', 'SCORM', 'Skills gap analysis', 'Social learning', 'Upskilling', 'xAPI',
]
const DEFAULT_TERMS = TERMS.map((t) => ({
  title: `What is ${t.toLowerCase().startsWith('what') ? t : t}?`.replace('What is ', 'What is '),
  term: t,
  text: `${t} explained in plain words: what it means, why it matters for growing teams and how to put it to work in your organisation.`,
  href: '#',
}))

export default function GlossaryIndex({
  title = 'Learning glossary',
  intro = 'Your plain-language guide to the words used across workplace learning, from adaptive pathways to xAPI, with clear definitions, practical examples and tips for putting each idea to work in your organisation.',
  terms = DEFAULT_TERMS,
  readMore = 'Read more',
}) {
  const [letter, setLetter] = useState(null)
  const [hover, setHover] = useState(null)
  const ref = useRef(null)
  const list = useMemo(() => (letter ? terms.filter((t) => t.term.toUpperCase().startsWith(letter)) : terms), [terms, letter])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const once = (el, from, delay) =>
        gsap.fromTo(el, from, { opacity: 1, y: 0, duration: 1, delay, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top bottom', once: true } })
      once('[data-gl-head]', { opacity: 0 }, 0.1)
      gsap.fromTo('[data-gl-filter]', { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '[data-gl-filter]', start: 'top 80%', once: true } })
      once('[data-gl-list]', { opacity: 0, y: 100 }, 0.5)
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      data-section="glossary-index"
      className="relative flex flex-col items-center justify-center gap-[3.75rem] overflow-hidden py-[7.5rem] tab:gap-[2.5rem] tab:py-[3.75rem] mob:gap-[1.875rem] mob:py-[2.5rem]"
    >
      <div data-gl-head className="relative z-50 flex w-full max-w-[112.5rem] flex-col items-center gap-[1.25rem] px-[7.5rem] tab:px-[1.25rem]">
        <h1 className="mb-0 font-serif text-[3.125rem] font-normal leading-[3.75rem] tab:leading-[1.3] mob:text-[2.5rem] xs:leading-[1.2]">{title}</h1>
        <p className="relative z-10 mb-0 max-w-[50rem] text-center text-[1.25rem] leading-[1.5] text-white tab:leading-[1.3] mob:text-[1rem]">{intro}</p>
        <SignupForm />
      </div>
      <div data-gl-filter className="mb-[0.9375rem] flex w-[60%] flex-col items-center justify-start mob:w-[80%] xs:w-full">
        <form onSubmit={(e) => e.preventDefault()} className="w-max max-w-[100vw] mob:w-full">
          <div className="flex max-w-full flex-col items-stretch justify-end gap-[1rem] p-[10px] text-center tab:gap-y-[12px] tab:pl-[16px] tab:pt-[16px]">
            <div role="radiogroup" className="flex flex-row items-center justify-start gap-[0.25rem] rounded-[100vw] border border-[rgba(255,255,255,0.2)] bg-[#1b1b1b] px-[1rem] py-[0.5rem] mob:flex-wrap xs:rounded-[2vw]">
              {[null, ...LETTERS].map((l) => {
                const on = letter === l
                return (
                  <button
                    key={l ?? 'all'}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setLetter(l)}
                    className={`mb-0 cursor-pointer rounded-[100vw] border border-[#1b1b1b] px-[0.5rem] py-[0.1rem] text-center text-body transition-[background-color,color] ease-[ease] duration-300 hover:border-[#139c79] hover:bg-[rgba(255,255,255,0.1)] hover:text-[#1de9b6] xs:text-body-xs ${
                      on ? '!text-white' : 'text-[#8a8a8a]'
                    }`}
                  >
                    {l ?? 'All'}
                  </button>
                )
              })}
            </div>
            <div className="text-center text-body xs:text-body-xs">
              Showing <span className="text-[#1de9b6]">{list.length}</span> results.
            </div>
          </div>
        </form>
      </div>
      <div
        data-gl-list
        className="relative z-[500] mx-auto flex min-h-[28.125rem] w-full max-w-[80rem] flex-col items-start justify-start gap-x-[2.5rem] gap-y-[7.5rem] px-[2.5rem] wide:px-[7.5rem] tab:gap-[1.25rem] tab:px-[1.25rem]"
      >
        <div className="w-full">
          <div className="grid grid-cols-3 gap-[2.5rem] tab:grid-cols-2 tab:gap-[1.25rem] mob:grid-cols-1" onMouseLeave={() => setHover(null)}>
            {list.map((t, i) => (
              <div key={t.term}>
                <a
                  href={t.href}
                  onMouseEnter={() => setHover(i)}
                  className={`relative flex h-full flex-col justify-end overflow-hidden rounded-[10px] bg-[#1b1b1b] p-0 text-white no-underline transition-opacity ${
                    hover === null ? 'opacity-100 duration-200 ease-[ease]' : hover === i ? 'opacity-100 duration-500' : 'opacity-50 duration-500'
                  }`}
                >
                  <div className="relative z-[100] flex h-full flex-col items-start justify-between gap-[1.25rem] px-[2.5rem] py-[3.75rem] tab:gap-[0.625rem] tab:px-[1.875rem] tab:py-[2.5rem] mob:px-[1.25rem] mob:py-[1.875rem]">
                    <h3 className="mb-0 text-[1.875rem] font-normal leading-[1.15] tab:leading-[1.3]">{t.title}</h3>
                    <div className="flex flex-col items-start gap-[1.25rem]">
                      <div className="relative z-10 text-[1rem] leading-[1.4375rem] tab:leading-[1.3]">{t.text}</div>
                      <div className="z-[999] flex items-center gap-[0.3125rem] rounded-[4px] border border-[#fbfbfb] bg-[#fbfbfb] px-[1rem] py-[0.5rem] text-[0.875rem] font-semibold leading-[1.4] text-[#1b1b1b] transition-all ease-[ease] duration-200 hover:bg-[#1de9b6] hover:text-black">
                        {readMore}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          {!list.length && <div className="py-[2rem] text-center text-grey">No terms start with that letter yet.</div>}
        </div>
        {/* zero-height sibling after the list (the original's empty collection block) still takes the column gap */}
        <div aria-hidden className="h-0 w-full" />
      </div>
    </section>
  )
}
