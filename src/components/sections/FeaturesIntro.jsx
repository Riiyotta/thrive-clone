// features-intro: /lms/features `.section > .container-large.feature-large-block` (fixed 16px root page).
// Left-aligned header: H2 (max-w 42rem) + 1rem spacer + grey paragraph (max-w 36rem).
const DEFAULTS = {
  heading: 'Learning platform features for every kind of team',
  intro:
    'Explore the tools for building courses, growing people, working with AI, tracking results and scaling safely, so your teams grow faster and your business can show it.',
}

export default function FeaturesIntro(props) {
  const p = { ...DEFAULTS, ...props }
  return (
    <section data-section="features-intro">
      <div className="padding-global">
        <div className="container-large mt-[1rem]">
          <div className="container-medium">
            <div className="flex max-w-[42rem] flex-col items-start">
              <div className="flex flex-col items-start gap-[1rem]">
                <h2 className="heading-h2">{p.heading}</h2>
                <div className="w-full pt-[1rem]" />
              </div>
              <div className="w-full max-w-[36rem]">
                <p className="mb-[1.25rem] text-para text-grey [text-wrap:pretty]">{p.intro}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
