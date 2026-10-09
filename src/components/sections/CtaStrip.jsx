import Button from '../shared/Button.jsx'

// `cta-strip`: the short call-to-action blocks between sections. Variants:
//  - "heading"  (.section_header.case-study-quote-cta.feature-cta, all 17 /lms/features/* pages):
//               centred 1-line H2 + primary button; margin 4rem 0 3rem.
//  - "pricing"  (.section_pricing > .why-thrive-new-cta, /lms/small-business): same header inside
//               padding-global/container-medium, mt .5rem, followed by a 2rem/2rem spacer.
//  - "spacer"   (.section_pricing on /lms/mentoring-software): the original block is empty, only
//               .padding-section-medium (5rem / 3rem mobile) remains.
//  - "button"   (.button-block on /lms/enterprise, .button-group.feature-cta on /lms/features):
//               a lone centred primary button. `pullUp` reproduces .feature-cta's -4rem top margin.
export default function CtaStrip({
  variant = 'heading',
  title = variant === 'pricing' ? 'What could your team build with Nimbus?' : 'Where will your team take it?',
  label = variant === 'pricing' ? 'Book your demo now' : variant === 'button' ? 'Explore every feature' : 'Say hello',
  href = '/lms/demo-platform',
  pullUp = false,
}) {
  if (variant === 'spacer') {
    return (
      <section data-section="cta-strip" data-variant="spacer">
        <div className="padding-global">
          <div className="container-medium">
            <div className="py-[5rem] mob:py-[3rem]" />
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'button') {
    return (
      <div
        data-section="cta-strip"
        data-variant="button"
        className={`flex flex-wrap items-center justify-center gap-[1rem] mob:flex-col ${pullUp ? 'mt-[-4rem]' : ''}`}
      >
        <Button variant="primary" href={href}>
          {label}
        </Button>
      </div>
    )
  }

  const header = (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        variant === 'pricing' ? 'mt-[0.5rem]' : 'mb-[3rem] mt-[4rem]'
      }`}
    >
      <div className="w-full max-w-[60rem] text-balance">
        <h2 className="heading-h2">{title}</h2>
      </div>
      <div className="w-full max-w-[36rem] pt-[1.5rem]" />
      <div className="flex items-center justify-center gap-[1rem] mob:flex-col">
        <Button variant="primary" href={href} stretch={false}>
          {label}
        </Button>
      </div>
    </div>
  )

  if (variant === 'pricing') {
    return (
      <section data-section="cta-strip" data-variant="pricing">
        <div className="padding-global">
          <div className="container-medium">
            {header}
            <div className="py-[2rem]" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <div data-section="cta-strip" data-variant="heading">
      {header}
    </div>
  )
}
