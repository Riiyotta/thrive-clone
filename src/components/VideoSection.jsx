import Placeholder from './shared/Placeholder.jsx'

// §11 video. Static placeholder in place of the YouTube embed (no network calls).
export default function VideoSection() {
  return (
    <section data-section="video">
      <div className="padding-global">
        <div className="container-medium">
          <div className="pb-[7rem] pt-[2rem] tab:pb-[6rem] mob:pb-[4rem]">
            <div className="flex flex-col items-center pb-[3rem] text-center">
              <h2 className="heading-h2 mb-[1.5rem]">This is Nimbus</h2>
              {/* ≥1440 the original header is flex (p mb 20 + wrapper mb 24 + 32 = 76px gap); at 1280 and 390 it is block and the margins collapse into the 32px video margin */}
              <p className="mb-0 text-body text-grey wide:mb-[2.75rem] xs:text-body-xs">
                Take a two-minute tour of the product.
                <br />
                No sign-up and no sales pitch.
              </p>
              <div className="mt-[2rem] w-full">
                <Placeholder
                  tone={2}
                  label="Video 16:9"
                  labelClassName="absolute left-[1rem] top-[1rem]"
                  className="relative aspect-video w-full rounded-panel"
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
          <p className="mx-auto my-[2.5rem] max-w-[50rem] text-center text-body text-ink xs:text-body-xs">
              Nimbus is a <span className="font-semibold">learning experience platform</span> that brings courses,{' '}
              <a href="#" className="font-semibold underline">skill journeys</a>, mentoring and team spaces together in one
              place. It helps organisations of every size build a{' '}
              <a href="#" className="font-semibold underline">culture of everyday learning</a>, measure what is working, and
              give people a reason to come back. With a <span className="font-semibold">built-in AI assistant</span>, admins
              save time while learners get answers in the flow of work.
            </p>
        </div>
      </div>
    </section>
  )
}
