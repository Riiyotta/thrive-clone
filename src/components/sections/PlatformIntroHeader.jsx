// platform-intro-header: /lms `.section_header.custom-layout.platform-new-header`.
// Centred H2 (2 lines, forced break) + grey paragraph (forced break), shrink-to-fit block, no section padding.
const DEFAULTS = {
  headingTop: 'Far more than a place',
  headingBottom: 'to host and track courses',
  introTop: 'We keep raising the bar for what a learning platform can do, adding the tools teams ask for to solve real problems,',
  introBottom: 'not the ones that only look good in a long checklist.',
}

export default function PlatformIntroHeader(props) {
  const p = { ...DEFAULTS, ...props }
  return (
    <section data-section="platform-intro-header" className="flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="mb-[1.5rem]">
          <h2 className="heading-h2 mx-auto mt-[2rem] flex max-w-[100rem] flex-col">
            <span>
              {p.headingTop}
              <br />
              {p.headingBottom}
            </span>
          </h2>
        </div>
        <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">
          {p.introTop} <br />
          {p.introBottom}
        </p>
      </div>
    </section>
  )
}
