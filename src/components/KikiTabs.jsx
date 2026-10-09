import useLoopCarousel from '../hooks/useLoopCarousel.js'
import Button from './shared/Button.jsx'
import Placeholder from './shared/Placeholder.jsx'

// §5a header + §5b autotabs. Placeholder assistant name "Nova" replaces the original AI brand.
const HOME_SLIDES = [
  {
    tab: 'Coach',
    highlight: 'A coach in every pocket.',
    subdued:
      'Nova checks in after each session, asks what stuck, and suggests one small next step so new habits keep building long after the training day ends.',
  },
  {
    tab: 'Creator',
    highlight: 'Draft a course in minutes.',
    subdued:
      'Drop in a policy, a slide deck or a rough outline and Nova shapes it into a short, friendly course with quizzes, ready for you to tweak, approve and publish.',
  },
  {
    tab: 'Analyst',
    highlight: 'Ask your data anything, plainly.',
    subdued:
      'Type a question about completions, skills or engagement and Nova answers with a clear chart and a short summary you can share with leaders.',
  },
  {
    tab: 'Admin',
    highlight: 'Let routine setup run itself.',
    subdued:
      'Nova builds audiences, schedules reminders and tidies up enrolments in the background, so your team spends less time on admin and more on people.',
  },
  {
    tab: 'Assistant',
    highlight: 'Answers right when they matter.',
    subdued:
      'Anyone can ask Nova a question in the flow of work and get a helpful answer pulled from your own content, with links to dig deeper.',
  },
]

// §5a homepage header (Nova intro). Pages pass their own header node or null.
const HOME_HEADER = (
  <div className="padding-global">
    <div className="container-medium flex">
      <div className="mt-[4rem] w-[40rem] max-w-full">
        <div className="flex w-[40rem] max-w-full flex-col items-start">
          <h2 className="heading-h2">
            Meet the AI helper that
            <br />
            knows your <em className="italic">people</em>
          </h2>
          <p className="mt-[1.5rem] w-[40rem] max-w-full text-para text-grey">
            Nova is an assistant built into every corner of the platform, ready to help.
            <br />
            It learns from your own content, so every answer sounds like your team wrote it.
          </p>
          <div className="mt-[1.25rem] flex">
            <Button variant="primary" to="/nova">
              Meet Nova →
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

function VideoSlide({ s, hidden }) {
  return (
    <div aria-hidden={hidden} className="relative isolate flex min-h-[32.5rem] w-full shrink-0 flex-col overflow-clip rounded-panel bg-surface-1 pl-[2.5rem] pt-[2.5rem] mob:p-[1.5rem] mob:pb-[4.5rem] xs:min-h-[35rem]">
      <div className="relative flex flex-1 flex-col justify-between mob:justify-start mob:gap-[1.5rem]">
        <div className="max-w-[65%] tab:max-w-full">
          <p className="max-w-[85%] text-feature font-medium">
            <span className="inline-block text-ink">{s.highlight}</span>{' '}
            <span className="inline-block tracking-[-0.025rem] text-grey xs:mb-[1.25rem]">{s.subdued}</span>
          </p>
        </div>
        <Placeholder
          tone={2}
          label={s.mediaLabel || 'Product video 1:1'}
          data-video-slot
          className="absolute bottom-0 right-0 z-[-1] aspect-square w-[45%] xs:static xs:aspect-auto xs:h-[22rem] xs:w-full"
        />
      </div>
    </div>
  )
}

// `.wow-slider-content` image slide (lms, corporate-lms, enterprise, small-business, feature-page
// autotabs-cta): padding 40/40/0/40 (24 at ≤479), gap 40, min-h 640 (384 at ≤479); a header row
// with the copy (max 36rem) and an optional primary button bottom-right; image below.
function ImageSlide({ s, imageAspect, hidden }) {
  return (
    <div aria-hidden={hidden} className="flex min-h-[40rem] w-full shrink-0 flex-col items-start gap-[2.5rem] overflow-clip rounded-panel bg-surface-1 px-[2.5rem] pt-[2.5rem] xs:min-h-[24rem] xs:px-[1.5rem] xs:pt-[1.5rem]">
      <div className="flex w-full items-end justify-between gap-[3rem] xs:flex-col xs:items-start xs:gap-[1rem]">
        <div className="max-w-[36rem]">
          {s.text ? (
            <p className="text-body text-ink xs:text-body-xs">{s.text}</p>
          ) : (
            <p className="mb-[1.25rem] text-para font-medium tracking-[-0.025rem] text-[#888888]">
              <span className="font-normal tracking-normal text-white">{s.highlight}</span> {s.subdued}
            </p>
          )}
        </div>
        {s.cta && (
          <Button variant="primary" to={s.cta.to} stretch={false}>
            {s.cta.label}
          </Button>
        )}
      </div>
      <Placeholder
        src={s.src || undefined}
        tone={2}
        label={s.mediaLabel || 'Product UI'}
        className={`w-full ${s.imageAspect || imageAspect}`}
      />
    </div>
  )
}

/**
 * §5 Nova header + `.section_wowautotabs` (Swiper is-wowautotabs: spv 1, gap 24, loop, speed 800,
 * no autoplay; tab click = slideToLoop). Defaults reproduce the homepage (5 video slides + header).
 * @param {React.ReactNode|null} [props.header] node rendered above the tabs (default: homepage
 *   Nova header; null = no header, as on /lms and corporate-lms; pass a node for split/eyebrow headers)
 * @param {Array<{tab: string, highlight?: React.ReactNode, subdued?: React.ReactNode, text?: React.ReactNode,
 *   src?: string, mediaLabel?: string, imageAspect?: string, cta?: {label: React.ReactNode, to?: string}}>} [props.tabs]
 *   one entry per tab/slide. Video slides use highlight + subdued. Image slides use highlight + subdued
 *   (white + #888 18.4px) or `text` (plain 18px paragraph), an optional `cta` button and an image.
 * @param {'video'|'image'} [props.media='video'] slide layout
 * @param {string} [props.imageAspect='aspect-video'] default image aspect for image slides
 * @param {string} [props.className='section_kikitabs'] section classes
 * @param {string} [props.tabsClassName='overflow-hidden py-[3rem]'] autotabs block classes (`.section_wowautotabs`)
 */
export default function KikiTabs({
  header = HOME_HEADER,
  tabs = HOME_SLIDES,
  media = 'video',
  imageAspect = 'aspect-video',
  className = 'section_kikitabs',
  tabsClassName = 'overflow-hidden py-[3rem]',
}) {
  const N = tabs.length
  // Original Swiper (is-wowautotabs): slidesPerView 1, spaceBetween 24, loop, speed 800, grabCursor,
  // threshold 5 (default), no autoplay. Tab click = slideToLoop(i) (moves linearly, e.g. 0 -> 4 forwards).
  const c = useLoopCarousel(N, { threshold: 5 })
  const active = c.real
  const all = [...tabs, ...tabs, ...tabs] // clones | real | clones

  return (
    <section data-section="kiki" className={className}>
      {header}

      {/* 5b autotabs */}
      <div className={tabsClassName}>
        <div className="padding-global">
          <div className="container-large">
            <div className="container-medium">
              <div className="flex flex-col gap-[0.5rem]">
                <div
                  role="tablist"
                  className="flex gap-[0.75rem] mob:overflow-auto xs:flex-wrap"
                >
                  {tabs.map((s, i) => (
                    <button
                      key={s.tab}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      onClick={() => c.goTo(i)}
                      className={`flex h-[4.75rem] flex-1 items-center justify-center rounded-card p-[0.5rem] text-kikitab text-ink mob:h-[3.5rem] mob:w-[12.5rem] mob:flex-none mob:text-kikitab-xs xs:min-w-[9.375rem] xs:flex-1 ${
                        i === active ? 'bg-surface-3' : 'bg-surface-1'
                      }`}
                    >
                      {s.tab}
                    </button>
                  ))}
                </div>

                {/* Swiper: slidesPerView 1, spaceBetween 24, speed 800 */}
                <div className="w-full overflow-clip" data-carousel="kiki">
                  <div
                    {...c.trackProps}
                    className={`flex gap-[1.5rem] ${c.animate ? 'transition-transform duration-[800ms] ease-[ease]' : ''}`}
                    style={{
                      ...c.trackProps.style,
                      transform: `translateX(calc(${-(c.pos + N)} * (100% + 1.5rem) + ${c.dragX}px))`,
                    }}
                  >
                    {all.map((s, i) => (
                      media === 'image' ? (
                        <ImageSlide key={i} s={s} imageAspect={imageAspect} hidden={i !== c.pos + N} />
                      ) : (
                        <VideoSlide key={i} s={s} hidden={i !== c.pos + N} />
                      )
                    ))}
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
