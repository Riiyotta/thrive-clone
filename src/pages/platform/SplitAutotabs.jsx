// `.section_wowautotabs` "enterpriseready" variant used on /lms/corporate-lms and /lms/enterprise:
// header → spacer → Swiper is-wowautotabs (spv 1, spaceBetween 24px, loop, speed 800, no autoplay;
// tab click = slideToLoop) whose slides are split text | image (530/530, gap 60, stacked ≤767),
// with the tab row BELOW the slider (76px tabs; ≤767 two per row, 56px, 16px text).
// The homepage KikiTabs has tabs above full-width slides, so this layout lives with the pages that use it.
import useLoopCarousel from '../../hooks/useLoopCarousel.js'
import Placeholder from '../../components/shared/Placeholder.jsx'

function Slide({ s, imageAspect, hidden }) {
  return (
    <div aria-hidden={hidden} className="flex w-full min-w-full shrink-0 justify-between gap-[3.75rem] mob:flex-col mob:gap-[1.5rem]">
      <div className="flex w-[47.3%] flex-col items-start gap-[0.75rem] mob:w-full">
        <p className="mb-[1.25rem] text-[1.25rem] font-medium leading-[1.75rem] text-ink mob:text-[1.125rem] mob:leading-[1.575rem]">{s.title}</p>
        <p className="mb-[1.25rem] text-para text-grey">{s.text}</p>
        {s.link && (
          <a href={s.link.href || '#'} className="mt-[0.25rem] flex gap-[0.75rem] pr-[1.5rem] text-[1rem] font-semibold leading-[1.4rem] text-ink transition-all duration-[250ms] hover:gap-[1rem]">
            {s.link.label} <span aria-hidden>→</span>
          </a>
        )}
      </div>
      <div className="w-[47.3%] overflow-clip rounded-[1rem] bg-surface-1 mob:w-full">
        <Placeholder tone={1} label="Product UI" className={`w-full ${s.imageAspect || imageAspect}`} />
      </div>
    </div>
  )
}

/**
 * @param {React.ReactNode} header  header block (inside container-medium)
 * @param {Array<{tab: string, title: React.ReactNode, text: React.ReactNode, link?: {label, href}, imageAspect?: string}>} slides
 * @param {string} [imageAspect='aspect-[1440/1289]']
 * @param {string} [innerClassName='pt-[1rem]'] container-large top padding (enterprise #1: pt-[3rem]; '' for none)
 * @param {string} [spacerClassName='pt-[4rem] mob:pt-[2rem]'] gap between header and slider
 * @param {React.ReactNode} [after] content after the slider (quote, button)
 */
export default function SplitAutotabs({
  header,
  slides,
  imageAspect = 'aspect-[1440/1289]',
  innerClassName = 'pt-[1rem]',
  spacerClassName = 'pt-[4rem] mob:pt-[2rem]',
  after = null,
}) {
  const N = slides.length
  const c = useLoopCarousel(N, { threshold: 5 })
  const all = [...slides, ...slides, ...slides]
  return (
    <section data-section="split-autotabs" className="overflow-hidden py-[3rem]">
      <div className="padding-global">
        <div className={innerClassName}>
          <div className="container-medium">
            {header}
            <div className={spacerClassName} />
            <div className="flex flex-col gap-[0.5rem]">
              <div className="w-full overflow-clip">
                <div
                  {...c.trackProps}
                  className={`flex ${c.animate ? 'transition-transform duration-[800ms] ease-[ease]' : ''}`}
                  style={{ ...c.trackProps.style, gap: '24px', transform: `translateX(calc(${-(c.pos + N)} * (100% + 24px) + ${c.dragX}px))` }}
                >
                  {all.map((s, i) => (
                    <Slide key={i} s={s} imageAspect={imageAspect} hidden={i !== c.pos + N} />
                  ))}
                </div>
              </div>
              <div role="tablist" className="flex gap-[0.75rem] mob:flex-wrap">
                {slides.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === c.real}
                    onClick={() => c.goTo(i)}
                    className={`flex h-[4.75rem] flex-1 items-center justify-center rounded-card p-[0.5rem] text-center text-kikitab text-ink mob:h-[3.5rem] mob:w-[calc(50%-0.375rem)] mob:flex-none mob:text-kikitab-xs ${
                      i === c.real ? 'bg-surface-3' : 'bg-surface-1'
                    }`}
                  >
                    {s.tab}
                  </button>
                ))}
              </div>
            </div>
            {after}
          </div>
        </div>
      </div>
    </section>
  )
}
