import Placeholder from './shared/Placeholder.jsx'

const HOME_BODY = (
  <>
    Take a two-minute tour of the product.
    <br />
    No sign-up and no sales pitch.
  </>
)

const HOME_FOOTNOTE = (
  <>
    Nimbus is a <span className="font-semibold">learning experience platform</span> that brings courses,{' '}
    <a href="#" className="font-semibold underline">skill journeys</a>, mentoring and team spaces together in one
    place. It helps organisations of every size build a{' '}
    <a href="#" className="font-semibold underline">culture of everyday learning</a>, measure what is working, and
    give people a reason to come back. With a <span className="font-semibold">built-in AI assistant</span>, admins
    save time while learners get answers in the flow of work.
  </>
)

/**
 * §11 `section.section_kiki-video`: centred H2 + grey paragraph + 16:9 video placeholder (no network).
 * Defaults reproduce the homepage. Feature pages have no outer section padding (`blockClassName=""`),
 * a 16px H2 gap, a 48px gap above the video and no trailing LLM paragraph (`footnote={null}`).
 * @param {React.ReactNode} [props.heading='This is Nimbus'] H2
 * @param {string} [props.headingClassName='mb-[1.5rem]'] H2 bottom margin (feature pages: 'mb-[1rem]')
 * @param {React.ReactNode} [props.body] grey paragraph under the H2
 * @param {React.ReactNode|null} [props.footnote] centred paragraph after the block (homepage `.homepage-llm-paragraph`); null hides it
 * @param {string} [props.blockClassName='pb-[7rem] pt-[2rem] tab:pb-[6rem] mob:pb-[4rem]'] padding of the padded block
 * @param {string} [props.videoClassName='mt-[2rem]'] gap above the video
 * @param {string} [props.videoLabel='Video 16:9'] placeholder label
 * @param {string} [props.videoAspectClassName='aspect-video'] video aspect (/pricing embed is 4:3: 'aspect-[4/3]')
 * body={null} omits the paragraph entirely (no empty margin box).
 */
export default function VideoSection({
  heading = 'This is Nimbus',
  headingClassName = 'mb-[1.5rem]',
  body = HOME_BODY,
  footnote = HOME_FOOTNOTE,
  blockClassName = 'pb-[7rem] pt-[2rem] tab:pb-[6rem] mob:pb-[4rem]',
  videoClassName = 'mt-[2rem]',
  videoLabel = 'Video 16:9',
  videoAspectClassName = 'aspect-video',
}) {
  return (
    <section data-section="video">
      <div className="padding-global">
        <div className="container-medium">
          <div className={blockClassName}>
            <div className="flex flex-col items-center pb-[3rem] text-center">
              <h2 className={`heading-h2 ${headingClassName}`}>{heading}</h2>
              {/* ≥1440 the original header is flex (p mb 20 + wrapper mb 24 + 32 = 76px gap); at 1280 and 390 it is block and the margins collapse into the 32px video margin */}
              {body != null && <p className="mb-0 text-body text-grey wide:mb-[2.75rem] xs:text-body-xs">{body}</p>}
              <div className={`${videoClassName} w-full`}>
                <Placeholder
                  tone={2}
                  label={videoLabel}
                  labelClassName="absolute left-[1rem] top-[1rem]"
                  className={`relative ${videoAspectClassName} w-full rounded-panel`}
                >
                  <button
                    type="button"
                    aria-label="Play video"
                    className="flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-full bg-playbtn text-[1rem] leading-none text-white"
                  >
                    ▶
                  </button>
                </Placeholder>
              </div>
            </div>
          </div>
          {/* sits outside the padded block like .homepage-llm-paragraph; its 40px bottom margin collapses past the section */}
          {footnote && (
            <p className="mx-auto my-[2.5rem] max-w-[50rem] text-center text-body text-ink xs:text-body-xs">{footnote}</p>
          )}
        </div>
      </div>
    </section>
  )
}
