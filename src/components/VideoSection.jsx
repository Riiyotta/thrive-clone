import Placeholder from './shared/Placeholder.jsx'

// §11 video. Static placeholder in place of the YouTube embed (no network calls).
export default function VideoSection() {
  return (
    <section data-section="video">
      <div className="padding-global">
        <div className="container-medium">
          <div className="pb-[112px] pt-[32px] tab:pb-[96px] mob:pb-[64px]">
            <div className="flex flex-col items-center pb-[48px] text-center">
              <h2 className="heading-h2 mb-[24px]">This is Nimbus</h2>
              {/* ≥1440 the original header is flex (p mb 20 + wrapper mb 24 + 32 = 76px gap); at 1280 and 390 it is block and the margins collapse into the 32px video margin */}
              <p className="mb-0 text-body text-grey wide:mb-[44px] xs:text-body-xs">
                Take a two-minute tour of the product.
                <br />
                No sign-up and no sales pitch.
              </p>
              <div className="mt-[32px] w-full">
                <Placeholder
                  tone={2}
                  label="Video 16:9"
                  labelClassName="absolute left-[16px] top-[16px]"
                  className="relative aspect-video w-full rounded-panel"
                >
                  <button
                    type="button"
                    aria-label="Play video"
                    className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-playbtn text-[16px] leading-none text-white"
                  >
                    ▶
                  </button>
                </Placeholder>
              </div>
            </div>
          </div>
          {/* sits outside the padded block like .homepage-llm-paragraph; its 40px bottom margin collapses past the section */}
          <p className="mx-auto my-[40px] max-w-[800px] text-center text-body text-ink xs:text-body-xs">
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
