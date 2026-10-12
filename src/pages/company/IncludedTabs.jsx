import Button from '../../components/shared/Button.jsx'
import Placeholder from '../../components/shared/Placeholder.jsx'
import useLoopCarousel from '../../hooks/useLoopCarousel.js'

// Page-local: `kiki-autotabs` on /whats-included (.section_wowautotabs.extra-tm.whats-included-section-tabs-2).
// Unlike the homepage KikiTabs, the header is a split layout (H2 + lead | quote card), the slides carry a
// bottom-left title + text over an offset product image and a bottom gradient, and the six "logo" tabs sit
// BELOW the slider (4.75rem, 3.5rem ≤767 in two columns). Swiper (live params): slidesPerView 1,
// spaceBetween 24, loop, speed 800, grabCursor, no autoplay; tab click = slideToLoop. The original's
// progress overlay is display:none, so it is not rendered. Followed by a centred primary CTA and the
// empty .demo-page-results-section spacer (1rem / 2rem).
const DEFAULT_SLIDES = [
  ['Nimbus Hub', 'One tailored home where every course, update and conversation sits together, so people always know where to start.'],
  ['Nimbus Spaces', 'Community spaces where teams share wins, swap know-how and keep the knowledge they build close at hand for later.'],
  ['Nimbus Skills', 'A living map of the skills across your teams, with pathways that close each gap before it slows anyone down.'],
  ['Nimbus Mentors', 'Pair people with the right mentor in a few clicks and let check-ins, goals and notes keep every pairing moving.'],
  ['Nimbus Insights', 'Clear reports on what people learn and where they engage, ready to share with leaders whenever they ask for them.'],
  ['Nimbus Rewards', 'Points, badges and shout-outs that celebrate progress and keep people coming back to learn something new every week.'],
].map(([tab, text]) => ({ tab, text }))

export default function IncludedTabs({
  heading = 'Everything that comes with every Nimbus plan',
  lead = 'No hidden extras and no premium tiers. Every customer gets the full platform from day one.',
  quote = {
    text: '“They are miles ahead of anything else we looked at. The platform is simple to use, flexible and keeps getting better.”',
    name: 'Riley Chen',
    role: 'Head of Learning Experience, Northwind',
  },
  slides = DEFAULT_SLIDES,
  cta = { label: 'Book your personal demo', to: '/lms/demo-platform' },
}) {
  const N = slides.length
  const c = useLoopCarousel(N, { threshold: 5 })
  const all = [...slides, ...slides, ...slides]
  return (
    <section data-sec="kiki-autotabs" className="mt-[4rem] overflow-hidden pb-[3rem] pt-[1rem]">
      <div className="padding-global">
        <div className="container-large">
          <div className="container-medium">
            <div className="flex items-start justify-between gap-[5rem] mob:flex-col mob:gap-[1rem]">
              <div className="flex max-w-[42rem] flex-col items-start gap-[1rem]">
                <h2 className="heading-h2">{heading}</h2>
                <p className="mb-[1.25rem] text-para text-grey">{lead}</p>
              </div>
              <div className="my-[1rem] max-w-[36rem] rounded-card bg-page p-[1rem]">
                <p className="mb-[0.75rem] text-body italic text-ink xs:text-body-xs">{quote.text}</p>
                <div className="flex items-center gap-[1rem] mob:flex-col mob:items-start">
                  <Placeholder label="" tone={2} className="h-[2.5rem] w-[2.5rem] shrink-0 rounded-full border border-page" />
                  <div className="mob:mb-[1rem]">
                    <div className="text-[1rem] font-semibold leading-[1.4] text-grey">{quote.name}</div>
                    <div className="text-[1rem] leading-[1.4] text-grey">{quote.role}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-[2rem] mob:pt-[1.25rem]" />
            <div className="flex flex-col gap-[0.5rem]">
              <div className="w-full overflow-clip">
                <div
                  {...c.trackProps}
                  className={`flex gap-[1.5rem] ${c.animate ? 'transition-transform duration-[800ms] ease-[ease]' : ''}`}
                  style={{ ...c.trackProps.style, transform: `translateX(calc(${-(c.pos + N)} * (100% + 1.5rem) + ${c.dragX}px))` }}
                >
                  {all.map((s, i) => (
                    <div key={i} aria-hidden={i !== c.pos + N} className="w-full shrink-0 overflow-clip rounded-panel">
                      <div className="relative flex min-h-[40rem] flex-col items-start gap-[2.5rem] overflow-clip rounded-panel bg-surface-1 px-[2.5rem] pt-[2.5rem] mob:min-h-[24rem] mob:px-[1.5rem] mob:pt-[1.5rem]">
                        <Placeholder
                          label="Product UI 1440:873"
                          tone={2}
                          className="absolute left-0 top-0 ml-[12.6rem] mt-[3.6rem] aspect-[1440/873] w-full mob:ml-[3.4rem] mob:mt-[1rem]"
                        />
                        <div className="pointer-events-none absolute inset-x-0 top-[21.25rem] min-h-[18.75rem] bg-[linear-gradient(rgba(255,255,255,0)_15%,#0b0b0b_78%)] mob:top-[5.25rem]" />
                        <div className="relative z-[1] flex w-full flex-1 flex-col items-start justify-end pb-[2.5rem]">
                          <div className="max-w-[36rem]">
                            <h3 className="mb-[1rem] text-[1.25rem] font-normal leading-[1.15] text-ink">{s.tab}</h3>
                            <div className="pt-[1rem]" />
                            <p className="mb-[1.25rem] text-para text-grey">{s.text}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div role="tablist" className="flex gap-[0.75rem] mob:flex-wrap">
                {slides.map((s, i) => (
                  <button
                    key={s.tab}
                    type="button"
                    role="tab"
                    aria-selected={i === c.real}
                    onClick={() => c.goTo(i)}
                    className={`flex h-[4.75rem] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-card p-[0.5rem] text-center text-para text-ink mob:h-[3.5rem] mob:basis-[calc(50%-0.375rem)] mob:text-[1rem] mob:leading-[1.4] ${
                      i === c.real ? 'bg-surface-3' : 'bg-surface-1'
                    }`}
                  >
                    {s.tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-[1.5rem] pt-[1.5rem] xs:px-0">
        <Button to={cta.to}>{cta.label}</Button>
      </div>
      <div className="pb-[2rem] pt-[1rem]" />
    </section>
  )
}
