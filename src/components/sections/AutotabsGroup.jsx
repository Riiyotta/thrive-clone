import useLoopCarousel from '../../hooks/useLoopCarousel.js'
import Placeholder from '../shared/Placeholder.jsx'
import TestimonialQuote from './TestimonialQuote.jsx'

// `autotabs-group` (.section_autotabs): centred header + tabbed Swiper (`is-wowautotabs`) + a quote.
// Swiper (live params + page script "WOW AUTOTABS SLIDERS"): slidesPerView 1, spaceBetween 24px, loop,
// speed 800, grabCursor, NO autoplay (commented out on the original); tab click = slideToLoop(i).
// The script also tweens a .wowprogress-overlay for 7.5s, but that overlay is display:none (invisible).
// Tabs: 4.75rem tall, surface-1, active surface-3, radius .75rem; <=767 wrap at 200px x 3.5rem,
// <=479 flex 1 1 0 / min 150px (two per row).
// Variants:
//  - "platform"   (/lms, .section_wowlogos.reuslts wrapper with 8rem top margin): 4 tabs, inline
//                 white title + grey #888 subtext, scale-down 16:9 screenshots, platform quote below.
//  - "enterprise" (/lms/enterprise): 4 tabs, title on its own line (ink, 500) + grey subtext, quote
//                 below with 4rem top / 1rem bottom padding.
//  - "mentoring"  (/lms/mentoring-software): header inside .padding-section-medium-2, 3 tabs nested in an
//                 extra padding-global, cover images, followed by a .text-size-large quote with client row.

const TABS4 = [
  { tab: 'Connected search', title: 'One search for every answer.', text: 'Whether it lives in your documents, chat tools, intranet or course library, Nimbus finds the right answer and shows exactly where it came from, in seconds.' },
  { tab: 'Course search', title: 'Search inside every course you own.', text: 'Nimbus reads the content inside uploaded course packages, so learners can jump straight to the lesson, slide or video moment that answers their question.' },
  { tab: 'Assistant', title: 'Run Nimbus from the AI tools you already use every day.', text: 'Create spaces, assign courses and pull reports from your favourite AI assistant, with the same permissions and audit trail as the platform itself.' },
  { tab: 'Build your own', title: 'Build the learning tools you imagine.', text: 'Describe a quiz, a checklist or a mini app in plain words and Nimbus builds it for you, ready to share with any team in a click.' },
]
const TABS3 = [
  { tab: 'Smart mentor matching', title: 'Pair the right mentors with the right people.', text: 'Nimbus looks at skills, goals and interests to suggest strong matches, so every pairing starts with real common ground.' },
  { tab: 'Guided programmes', title: 'Give every pairing a clear path.', text: 'Ready-made programmes, prompts and check-ins keep mentors and mentees moving forward, week after week.' },
  { tab: 'Reporting', title: 'See the impact of mentoring.', text: 'Track sessions, goals and feedback in one place and show leaders how mentoring lifts skills and retention.' },
]

const CONFIG = {
  platform: { tabs: TABS4, inline: true, media: 'contain', tabPad: 'p-[8px]' },
  enterprise: { tabs: TABS4, inline: false, media: 'contain', tabPad: 'p-[8px]' },
  mentoring: { tabs: TABS3, inline: true, media: 'cover', tabPad: 'p-[8px]' },
}

function Tabs({ tabs, inline, media, mediaClassName = '' }) {
  const N = tabs.length
  const c = useLoopCarousel(N, { threshold: 5 })
  const active = c.real
  const all = [...tabs, ...tabs, ...tabs]
  return (
    <div className="flex flex-col gap-y-[0.5rem]" data-autotabs>
      <div role="tablist" className="flex gap-[0.75rem] mob:flex-wrap mob:items-center mob:justify-start mob:overflow-auto">
        {tabs.map((t, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => c.goTo(i)}
            className={`relative flex h-[4.75rem] w-full cursor-pointer items-center justify-center overflow-hidden rounded-card p-[8px] text-center text-kikitab text-ink tab:text-[1rem] tab:leading-[1.4rem] mob:h-[3.5rem] mob:w-[200px] mob:min-w-[200px] xs:w-auto xs:min-w-[150px] xs:flex-[1_1_0%] ${
              i === active ? 'bg-surface-3' : 'bg-surface-1'
            }`}
          >
            <span className="relative z-[1] flex">{t.tab}</span>
          </button>
        ))}
      </div>
      <div className="w-full overflow-clip" data-carousel="autotabs">
        <div
          {...c.trackProps}
          className={`flex ${c.animate ? 'transition-transform duration-[800ms] ease-[ease]' : ''}`}
          style={{ ...c.trackProps.style, gap: '24px', transform: `translateX(calc(${-(c.pos + N)} * (100% + 24px) + ${c.dragX}px))` }}
        >
          {all.map((t, i) => (
            <div key={i} aria-hidden={i !== c.pos + N} className="w-full min-w-full shrink-0 overflow-clip">
              <div className="flex h-full min-h-[40rem] w-full flex-col items-start justify-start gap-[2.5rem] rounded-panel bg-surface-1 px-[2.5rem] pb-0 pt-[2.5rem] tab:min-h-[32rem] mob:min-h-[28rem] mob:p-[1.5rem] xs:min-h-[24rem] xs:pb-0">
                <div className="flex items-end justify-between self-stretch xs:flex-col xs:items-start xs:gap-[1rem]">
                  <div className="w-full max-w-[36rem]">
                    <div className="relative z-[1] text-kikitab font-medium">
                      {inline ? (
                        <>
                          <span className="inline font-normal text-white">{t.title}</span>
                          <p className="mb-[1.25rem] ml-[0.3rem] inline tracking-[-0.02em] text-[#888]">{t.text}</p>
                        </>
                      ) : (
                        <>
                          <div className="inline-block text-ink">{t.title}</div>
                          <p className="mb-[1.25rem] inline-block tracking-[-0.02em] text-grey">{t.text}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`flex aspect-video h-full w-full flex-col gap-[1.5rem] ${mediaClassName}`}>
                  <Placeholder
                    label={media === 'cover' ? 'Product screenshot' : 'Product screenshot 16:9'}
                    tone={2}
                    className={`aspect-video w-full ${media === 'cover' ? '' : ''} ${mediaClassName}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// `headingClassName` (optional, default ''): extra H2 classes; /lms passes 'tab:mt-0' because the original's
// H2 top margin collapses into the section margin at ≤991. `mediaClassName` (optional): extra classes on each
// slide's media box (/lms passes 'xs:aspect-[306/197]', the original's first-slide screenshot at ≤479).
export default function AutotabsGroup({
  variant = 'platform',
  title,
  paragraph,
  tabs,
  quote,
  headingClassName = '',
  mediaClassName,
}) {
  const cfg = CONFIG[variant] || CONFIG.platform
  const T = tabs || cfg.tabs

  if (variant === 'mentoring') {
    const q = quote || {
      text: '“Mentoring opens a whole new way of learning for our people. Nimbus made it easy to launch, match and track programmes across every region, and our mentors now feel supported instead of stretched, which has made a real difference to how our teams grow together.”',
      name: 'Jordan Ellis',
      role: 'Head of Academy and Operations,',
      org: 'Northwind Group',
    }
    return (
      <section data-section="autotabs-group" data-variant="mentoring">
        <div className="padding-global">
          <div className="container-medium">
            <div className="pb-[5rem] pt-[1rem] tab:pb-[4rem] mob:pb-[3rem]">
              <div>
                <div className="mx-auto flex w-full max-w-[60rem] flex-col items-center justify-center text-center">
                  <h2 className="heading-h2">{title || 'Mentor matching tools built around genuine human connection'}</h2>
                  <div className="mx-auto mt-[1.5rem] flex w-full max-w-[36rem] flex-col items-center justify-center">
                    <p className="mb-[1.25rem] text-center text-body text-grey xs:text-body-xs">
                      {paragraph || 'Bring mentoring to life with matching, guidance and reporting.'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden py-[3rem]">
                <div className="padding-global">
                  <div className="container-large">
                    <div className="container-medium">
                      <Tabs tabs={T} inline={cfg.inline} media={cfg.media} mediaClassName={mediaClassName} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[45.25rem]">
                <p className="mb-[1.25rem] flex text-[1.5rem] leading-[1.4] text-ink mob:text-[1.25rem]">{q.text}</p>
                <div className="flex items-center gap-[1rem] text-left mob:w-full mob:flex-col mob:items-start">
                  <div className="min-h-[2.5rem] w-[2.5rem] min-w-[2.5rem] overflow-clip border border-page">
                    <Placeholder label="" tone={3} className="aspect-square w-full rounded-[2.5rem]" />
                  </div>
                  <div className="mob:mb-[1rem]">
                    <div className="text-[1rem] font-semibold leading-[1.4rem] text-ink">{q.name}</div>
                    <div className="text-[1rem] leading-[1.4rem] text-grey">
                      {q.role} <strong className="font-bold">{q.org}</strong>
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

  const isPlatform = variant === 'platform'
  const header = (
    <div className="padding-global mt-[2rem]">
      <div className="container-medium">
        <div className={`mx-auto flex w-full flex-col items-center justify-center text-center ${isPlatform ? 'max-w-[80rem]' : 'max-w-[60rem]'}`}>
          <div className="text-center">
            <h2 className={`heading-h2 flex flex-col ${isPlatform ? 'mt-[2rem] max-w-[80rem]' : 'max-w-[60rem]'} ${headingClassName}`}>
              {title ||
                (isPlatform ? (
                  <>
                    The best learning tool doesn't just
                    <br />
                    track learning. It connects it all
                  </>
                ) : (
                  'The new standard for enterprise learning management platforms'
                ))}
            </h2>
            <p className="mb-[1.25rem] mt-[1.5rem] text-center text-body text-grey xs:text-body-xs">
              {paragraph ||
                (isPlatform
                  ? 'Search across every connected system, run Nimbus from your favourite AI assistants, surface the hidden gems buried in a decade of old course files, and build your own learning tools in minutes. All within the limits you choose.'
                  : (
                    <>
                      Search every connected system in one query, unlock years of <a href="#" className="inline-link">course content</a>{' '}
                      sitting unused in your archives, and <a href="#" className="inline-link">run Nimbus from the assistants</a> your teams already use.
                    </>
                  ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const body = (
    <>
      {header}
      <div className="overflow-hidden pb-[3rem] pt-[1rem]">
        <div className="padding-global">
          <div className="container-large">
            <div className="container-medium">
              <Tabs tabs={T} inline={cfg.inline} media={cfg.media} mediaClassName={mediaClassName} />
            </div>
          </div>
        </div>
        <TestimonialQuote variant={isPlatform ? 'autotabs' : 'autotabs-enterprise'} {...(quote || {})} />
      </div>
    </>
  )

  if (isPlatform) {
    return (
      <section data-section="autotabs-group" data-variant="platform" className="mt-[8rem]">
        {body}
      </section>
    )
  }
  return (
    <section data-section="autotabs-group" data-variant="enterprise">
      {body}
    </section>
  )
}
