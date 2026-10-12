import { useEffect, useRef, useState } from 'react'

// `faq-legacy` (.section_faq, Relume-style "grid lines" FAQ) on /content, /content/topics,
// /content/sector-suites and /lms/integrations.
// Themes (measured): 'olive'  -> outer lines #2d2919, items #00251e (topics, sector-suites)
//                    'olive-items' -> outer + item lines #2d2919, open bg rgb(35,32,17) (/content)
//                    'green' -> outer + item lines #00251e, no top border, no bottom spacer (/lms/integrations)
// IX2 "FAQ 4/6 accordion" (click / second click), measured live: open = height 0 -> auto 400ms ease,
// icon rotate 0 -> 45deg 200ms ease, background/border colours 100ms; close = everything back in 100ms.

const THEMES = {
  olive: { outer: '#2d2919', item: '#00251e', openBg: 'rgb(0,24,17)', openBorder: 'rgb(1,88,75)', tagBg: '#2d2919', tagBorder: '#2d2919', borderTop: true, bottom: true },
  'olive-items': { outer: '#2d2919', item: '#2d2919', openBg: 'rgb(35,32,17)', openBorder: 'rgb(45,41,25)', tagBg: '#2d2919', tagBorder: '#2d2919', borderTop: true, bottom: true },
  green: { outer: '#00251e', item: '#00251e', openBg: 'rgb(0,24,17)', openBorder: 'rgb(1,88,75)', tagBg: '#001811', tagBorder: '#01584b', borderTop: false, bottom: false },
}

const ITEMS = [
  {
    q: 'Which subjects does the core library cover?',
    a: 'Our core library includes more than 900 short courses across compliance, customer care, wellbeing, leadership and data privacy, all written to help your teams build real skills quickly and confidently.',
  },
  {
    q: 'Which formats do the courses and resources come in?',
    a: 'Courses come as short videos, interactive lessons, quick reads and printable guides, so every learner finds a format that suits them.',
  },
  {
    q: 'Which languages does the Nimbus library support?',
    a: 'The library is available in more than 40 languages, with new translations added every month for every course.',
  },
  {
    q: 'How many courses can my team access each year?',
    a: 'Every plan includes the full library with unlimited access for every learner, plus new releases each quarter at no extra cost, so your people always have fresh, relevant content ready the moment they need it.',
  },
  {
    q: 'What if the library is missing a course we need?',
    a: 'If something is missing, our content team can build it for you, or you can create your own course in minutes with the built-in authoring tools and share it with any audience across your organisation straight away.',
  },
]

function PlusIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M25.3333 15.667V16.3336C25.3333 16.7018 25.0349 17.0003 24.6667 17.0003H17V24.667C17 25.0351 16.7015 25.3336 16.3333 25.3336H15.6667C15.2985 25.3336 15 25.0351 15 24.667V17.0003H7.3333C6.96511 17.0003 6.66663 16.7018 6.66663 16.3336V15.667C6.66663 15.2988 6.96511 15.0003 7.3333 15.0003H15V7.33365C15 6.96546 15.2985 6.66699 15.6667 6.66699H16.3333C16.7015 6.66699 17 6.96546 17 7.33365V15.0003H24.6667C25.0349 15.0003 25.3333 15.2988 25.3333 15.667Z"
        fill="currentColor"
      />
    </svg>
  )
}

// `item.open` (optional, default false; added for /lms/integrations, whose 4th item is open on load).
function Item({ item, theme, xsCompact, answerClassName = 'my-[2.5rem]' }) {
  const [open, setOpen] = useState(!!item.open)
  const [height, setHeight] = useState(item.open ? 'auto' : 0) // px or 'auto'
  const [anim, setAnim] = useState('none')
  const body = useRef(null)
  const timers = useRef([])
  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => clear, [])

  const toggle = () => {
    clear()
    const el = body.current
    if (!open) {
      // first click: 400ms ease open (the first IX2 group is an instant initial-state reset)
      setOpen(true)
      setAnim('none')
      setHeight(0)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnim('height 0.4s ease')
          setHeight(el.scrollHeight)
          timers.current.push(setTimeout(() => setHeight('auto'), 400))
        }),
      )
    } else {
      // second click: 100ms back to closed
      setAnim('none')
      setHeight(el.offsetHeight)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnim('height 0.1s linear')
          setHeight(0)
        }),
      )
      setOpen(false)
    }
  }
  const shown = open
  const colorT = '0.1s'

  return (
    <div className="flex flex-col items-stretch justify-start overflow-hidden" data-faq-item data-open={shown}>
      <div
        onClick={toggle}
        className="flex cursor-pointer items-center justify-between border border-b-0 border-solid"
        style={{
          borderColor: shown ? theme.openBorder : theme.item,
          backgroundColor: shown ? theme.openBg : 'rgba(0,0,0,0)',
          transition: `background-color ${colorT} linear, border-color ${colorT} linear`,
        }}
      >
        <div
          className="flex-1 self-stretch border-r border-solid px-[2.5rem] py-[2rem] tab:px-[2rem] tab:py-[1.75rem] mob:p-[1.25rem]"
          style={{ borderColor: shown ? theme.openBorder : theme.item, transition: `border-color ${colorT} linear` }}
        >
          <div className={`text-[1.25rem] font-bold leading-[1.4] text-ink ${xsCompact ? 'xs:text-[1.125rem]' : ''}`}>{item.q}</div>
        </div>
        <div className="flex items-center justify-center self-start p-[2rem] text-ink tab:py-[1.75rem] mob:flex-none mob:p-[1.25rem] xs:self-stretch xs:p-[1rem]">
          <div
            className="flex h-[2rem] w-[2rem] flex-col items-center justify-center mob:h-[1.5rem] mob:w-[1.5rem]"
            style={{ transform: `rotate(${shown ? 45 : 0}deg)`, transition: shown ? 'transform 0.2s ease' : 'transform 0.1s linear' }}
          >
            <PlusIcon />
          </div>
        </div>
      </div>
      <div
        ref={body}
        className="w-full overflow-hidden border border-solid pl-[2.5rem] pr-[1.5rem] pt-0 tab:pl-[2rem] mob:px-[1.25rem]"
        style={{
          height,
          transition: anim === 'none' ? `background-color 0.1s linear, border-color 0.1s linear` : `${anim}, background-color 0.1s linear, border-color 0.1s linear`,
          borderColor: shown ? theme.openBorder : 'rgba(0,0,0,0)',
          backgroundColor: shown ? theme.openBg : 'rgba(0,0,0,0)',
        }}
      >
        <div className={answerClassName}>
          <p className="mb-[1.25rem] text-body text-ink xs:text-body-xs">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

// `xsCompact` (optional, default false; added for the /content family, measured on /content, /content/topics and
// /content/sector-suites at 390): ≤479 question text 18px, heading top gap 4px, bottom spacer 4.6rem.
// `answerClassName` (optional, default 'my-[2.5rem]'): vertical margin around each answer (/lms/integrations passes
// 'my-[2.5rem] tab:my-[1.5rem] mob:my-[1.25rem]').
export default function FaqLegacy({ theme = 'olive', eyebrow = 'FAQs', title = 'Every answer in one place', items = ITEMS, xsCompact = false, answerClassName }) {
  const t = THEMES[theme] || THEMES.olive
  return (
    <section data-section="faq-legacy" data-theme={theme}>
      <div className="padding-global">
        <div className="container-large">
          <div
            className="border-x border-solid tab:border-x-0"
            style={{ borderColor: t.outer, borderTop: t.borderTop ? `1px solid ${t.outer}` : undefined }}
          >
            <div className="text-center">
              <div className="mx-auto w-full max-w-[42rem] tab:max-w-full">
                <div
                  className="mx-0 border-x border-solid px-[2.5rem] pb-[4rem] pt-[6rem] tab:pt-[5rem] mob:pt-[3rem] xs:px-[1.5rem] xs:py-[3rem]"
                  style={{ borderColor: t.outer }}
                >
                  <div
                    className="mb-[0.75rem] inline-block rounded-pill border border-solid px-[0.75rem] py-[0.325rem] text-small font-medium text-ink"
                    style={{ backgroundColor: t.tagBg, borderColor: t.tagBorder }}
                  >
                    {eyebrow}
                  </div>
                  <div className={`mt-[1rem] ${xsCompact ? 'xs:mt-[0.25rem]' : ''}`}>
                    <h2 className="mb-[1.25rem] text-[3rem] font-normal leading-[1.2] text-ink mob:text-[2rem]">{title}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-y border-solid" style={{ borderColor: t.outer }}>
              <div className="mx-auto w-full max-w-[42rem] tab:max-w-full">
                <div className="grid grid-cols-[100%] items-start">
                  {items.map((it, i) => (
                    <Item key={i} item={it} theme={t} xsCompact={xsCompact} answerClassName={answerClassName} />
                  ))}
                </div>
              </div>
            </div>
            <div className="border-b border-solid" style={{ borderColor: t.outer }}>
              <div className="mx-auto w-full max-w-[42rem] tab:max-w-full">
                <div className="mx-auto w-0 border-x border-solid" style={{ borderColor: t.outer }}>
                  {t.bottom && <div className={`w-full pt-[12rem] ${xsCompact ? 'xs:pt-[4.6rem]' : ''}`} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
