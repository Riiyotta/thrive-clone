import { useLayoutEffect, useRef } from 'react'
import Placeholder, { LogoPlaceholder } from '../shared/Placeholder.jsx'
import { gsap } from '../../lib/gsap.js'

// content-hero (.section > .component.section_global_header.header_global) on /content, legacy content
// ("yellow") theme. Three parts: centred hero (logo lockup, serif H1, paragraph, yellow button + avatar
// stack), a logo strip with a one-line caption, and a 2-col feature (copy + quote card | image card with
// a centred button). Motion — IX2 "2Col Feature Animation" (scroll into view, once): copy from
// x -3rem / opacity 0 / blur 5px and image card from x 5rem / opacity 0 / blur 5px to rest,
// 750ms, delay 500ms, outQuart.
const THEME = { '--th-border': '#2d2919', '--th-brand': '#eee96d', '--th-btn-hover': '#edcf00' }

const BTN =
  'rounded-[200vw] border border-[var(--th-brand)] bg-[var(--th-brand)] px-[1.25rem] py-[0.75rem] text-center text-[1.125rem] font-medium leading-none text-black no-underline transition-[border-radius] duration-300 ease-in-out hover:bg-[var(--th-btn-hover)] tab:px-[1rem] tab:py-[0.5rem] tab:text-[1rem] xs:block xs:self-stretch'

const DEFAULTS = {
  logo: 'nimbus content',
  title: 'Learning content from people who truly understand your teams',
  text: 'Thousands of ready-made learning resources that people actually enjoy, ready to launch on your platform today or alongside the tools you already use.',
  button: { label: 'Book a content tour', href: '#' },
  social: 'Loved by 500+ teams',
  logosCaption: 'The content library trusted by teams who love learning',
  logos: ['Logo 1', 'Logo 2', 'Logo 3', 'Logo 4', 'Logo 5', 'Logo 6'],
  feature: {
    heading: 'Why teams choose Nimbus content',
    text: 'Nimbus content is a learning library made for real working lives, with thousands of resources ready for any platform you use today.\n\nChoose from [[core topics]] covering leadership, wellbeing and essential skills, or add [[sector suites]] built for industries like retail, hospitality and financial services teams.\n\nEvery piece is short, practical and easy to share, so people can learn in the moment and keep coming back for more.\n\nFresh resources arrive every month, so the library stays current without any extra effort.',
    quote: '“If you are looking for content that people genuinely enjoy and keep coming back to, this is it. Our teams use it every single week.”',
    name: 'Sam Rivers',
    role: 'Learning and Development manager, Northwind',
    button: { label: 'Book a content tour', href: '#' },
  },
}

function rich(t) {
  return t.split(/(\[\[[^\]]+\]\]|\n\n)/).map((p, i) =>
    p === '\n\n' ? (
      <span key={i}>
        <br />
        <br />
      </span>
    ) : p.startsWith('[[') ? (
      <a key={i} href="#" className="text-ink underline">
        {p.slice(2, -2)}
      </a>
    ) : (
      p
    ),
  )
}

export default function ContentHero({
  logo = DEFAULTS.logo,
  title = DEFAULTS.title,
  text = DEFAULTS.text,
  button = DEFAULTS.button,
  social = DEFAULTS.social,
  logosCaption = DEFAULTS.logosCaption,
  logos = DEFAULTS.logos,
  feature = DEFAULTS.feature,
}) {
  const featRef = useRef(null)
  useLayoutEffect(() => {
    const el = featRef.current
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top bottom', once: true } })
      tl.fromTo('[data-2col-copy]', { x: '-3rem', opacity: 0, filter: 'blur(5px)' }, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power3.out' }, 0.5)
      tl.fromTo('[data-2col-media]', { x: '5rem', opacity: 0, filter: 'blur(5px)' }, { x: 0, opacity: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power3.out' }, 0.5)
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section data-section="content-hero" style={THEME} className="overflow-x-clip">
      <div className="padding-global">
        {/* hero */}
        <div className="container-large">
          <div className="relative flex flex-col items-center justify-center border-l border-r border-t border-[var(--th-border)]">
            <div className="flex flex-col items-center justify-start px-[2.5rem] pb-[4rem] pt-[5.5rem] text-center [text-wrap:pretty] tab:px-[2rem] tab:pt-[4rem] mob:px-[1.5rem] xs:px-[1rem]">
              <div className="flex w-full max-w-[64rem] flex-col items-center justify-between leading-[1.4]">
                <div className="flex flex-col items-center justify-start gap-[0.5rem]">
                  <div className="mb-[1rem]">
                    <LogoPlaceholder text={logo} className="h-[2.5rem] w-[10.25rem] text-[0.9rem] normal-case tracking-normal text-ink" />
                  </div>
                  <h1 className="font-serif text-[3.8rem] font-normal leading-[1.15] mob:text-[2.5rem]">{title}</h1>
                </div>
                <p className="mb-[1.25rem] mt-[1rem] w-full max-w-[42rem] text-body xs:text-body-xs">{text}</p>
                <div className="mt-[2rem] flex flex-wrap items-center justify-start gap-[1.5rem] xs:w-full xs:flex-col xs:items-stretch xs:gap-[1rem]">
                  <a href={button.href} className={BTN}>
                    {button.label}
                  </a>
                  <div className="flex items-center justify-start gap-[0.75rem] xs:justify-center">
                    <div className="flex">
                      {[0, 1, 2].map((i) => (
                        <Placeholder
                          key={i}
                          label=""
                          className={`aspect-square h-[2.5rem] w-[2.5rem] overflow-hidden rounded-[1.5rem] tab:h-[2rem] tab:w-[2rem] ${i ? 'ml-[-1rem] tab:ml-[-0.5rem]' : ''}`}
                          tone={3}
                        />
                      ))}
                    </div>
                    <div className="text-small text-ink">{social}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* logos + 2-col feature */}
        <div className="pb-[0.5rem] pt-[3rem] mob:pt-[2rem]">
          <div className="text-center text-body xs:text-body-xs">{logosCaption}</div>
          <div className="container-medium">
            <div className="flex w-full flex-col items-center justify-start gap-y-[2rem]">
              <div className="flex max-w-[60rem] flex-[0_1_auto] items-center justify-between gap-[3rem] pt-[2rem] tab:flex-wrap tab:justify-center tab:gap-y-[2rem] mob:justify-around xs:gap-[2rem]">
                {logos.map((l, i) => (
                  <div key={i} className="flex w-[7rem] items-center justify-center overflow-clip">
                    <LogoPlaceholder text={l} className="h-[2rem] w-[5rem] text-[0.7rem] xs:w-[6rem]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="py-[1rem]" />
          <div className="py-[3rem] mob:py-[2rem]">
            <div ref={featRef} className="flex items-center justify-between mob:flex-col mob:gap-[1.5rem]">
              <div className="w-full max-w-[36rem]">
                <div className="pr-[3rem] tab:pr-[2.5rem] mob:pr-[1.5rem]">
                  <div data-2col-copy className="flex h-full flex-col items-start justify-center gap-y-[0.75rem]">
                    <h2 className="mt-[0.25rem] flex justify-start font-serif text-[3.5rem] font-normal leading-[1.15] mob:text-[2rem]">{feature.heading}</h2>
                    <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">{rich(feature.text)}</p>
                    <div className="mb-[1rem] mt-[0.5rem] rounded-card bg-[rgba(11,11,11,0.02)] p-[1rem]">
                      <p className="mb-[0.75rem] text-body italic xs:text-body-xs">{feature.quote}</p>
                      <div className="flex items-center gap-[1rem] text-left mob:w-full mob:flex-col mob:items-start">
                        <div className="h-[2.5rem] min-h-[2.5rem] w-[2.5rem] shrink-0 overflow-clip rounded-full border border-page">
                          <Placeholder label="" className="h-full w-full rounded-full" />
                        </div>
                        <div>
                          <div className="text-[1rem] font-semibold leading-[1.4]">{feature.name}</div>
                          <div className="text-[1rem] leading-[1.4]">{feature.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[36rem]">
                <div data-2col-media className="h-full w-full overflow-clip rounded-card bg-surface-1 tab:min-h-[20rem]">
                  <Placeholder label="Content hub" className="aspect-square w-full mob:aspect-[828/478]" />
                  <div className="mt-[8rem] flex flex-wrap items-center justify-center gap-[1.5rem] xs:gap-[2rem]">
                    <a href={feature.button.href} className={BTN.replace(' xs:block xs:self-stretch', '')}>
                      {feature.button.label}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
