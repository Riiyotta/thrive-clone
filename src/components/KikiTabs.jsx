import useLoopCarousel from '../hooks/useLoopCarousel.js'
import Button from './shared/Button.jsx'
import Placeholder from './shared/Placeholder.jsx'

// §5a header + §5b autotabs. Placeholder assistant name "Nova" replaces the original AI brand.
const SLIDES = [
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

const N = SLIDES.length

export default function KikiTabs() {
  // Original Swiper (is-wowautotabs): slidesPerView 1, spaceBetween 24, loop, speed 800, grabCursor,
  // threshold 5 (default), no autoplay. Tab click = slideToLoop(i) (moves linearly, e.g. 0 -> 4 forwards).
  const c = useLoopCarousel(N, { threshold: 5 })
  const active = c.real
  const all = [...SLIDES, ...SLIDES, ...SLIDES] // clones | real | clones

  return (
    <section data-section="kiki" className="section_kikitabs">
      {/* 5a header */}
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
                <Button variant="primary">Meet Nova →</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5b autotabs */}
      <div className="overflow-hidden py-[3rem]">
        <div className="padding-global">
          <div className="container-large">
            <div className="container-medium">
              <div className="flex flex-col gap-[0.5rem]">
                <div
                  role="tablist"
                  className="flex gap-[0.75rem] mob:overflow-auto xs:flex-wrap"
                >
                  {SLIDES.map((s, i) => (
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
                      <div
                        key={i}
                        aria-hidden={i !== c.pos + N}
                        className="relative isolate flex min-h-[32.5rem] w-full shrink-0 flex-col overflow-clip rounded-panel bg-surface-1 pl-[2.5rem] pt-[2.5rem] mob:p-[1.5rem] mob:pb-[4.5rem] xs:min-h-[35rem]"
                      >
                        <div className="relative flex flex-1 flex-col justify-between mob:justify-start mob:gap-[1.5rem]">
                          <div className="max-w-[65%] tab:max-w-full">
                            <p className="max-w-[85%] text-feature font-medium">
                              <span className="inline-block text-ink">{s.highlight}</span>{' '}
                              <span className="inline-block tracking-[-0.025rem] text-grey xs:mb-[1.25rem]">{s.subdued}</span>
                            </p>
                          </div>
                          <Placeholder
                            tone={2}
                            label="Product video 1:1"
                            data-video-slot
                            className="absolute bottom-0 right-0 z-[-1] aspect-square w-[45%] xs:static xs:aspect-auto xs:h-[22rem] xs:w-full"
                          />
                        </div>
                      </div>
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
