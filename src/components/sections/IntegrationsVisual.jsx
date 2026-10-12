import Button from '../shared/Button.jsx'
import Placeholder from '../shared/Placeholder.jsx'

// integrations-visual (`.section_wowintegrations` / wowcenter_header + integrations strip image
// natural 1440×410, padded 1.5rem). Wow design system (fixed-16 pages: values are plain rem).
//   'mid-market'  /lms/corporate-lms: container-small (45.25rem), padding-section-medium
//                 (5rem top / 3rem ≤767, 2rem bottom), centred H2 + grey para, image, then a
//                 centred primary button below the container.
//   'enterprise'  /lms/enterprise: same block without the button.
//   'features'    /lms/features: container 60rem, 6rem spacer (3.5rem ≤767), H2 in max 36rem,
//                 24/33.6 grey para (20/28 ≤767) in max 42rem, 1rem spacer, image, CTA row.
const DEFAULTS = {
  'mid-market': {
    heading: 'Connect your tools together',
    body: 'No need for a patchwork of apps. Nimbus links with the tools your people already use, from workplace messaging and HR records to single sign-on and reporting, so learning sits right where the work happens.',
    cta: 'See all integrations →',
  },
  enterprise: {
    heading: 'The first app your people open, the last they close',
    body: 'These are not bolt-on extras. Nimbus works with your HR system, CRM, chat and calendar straight out of the box, so every update lands in the right place, every learner sees the right course at exactly the right time, and admins spend far less time moving data between tools and more time on the people work that matters most each and every week.',
  },
  features: {
    heading: 'Plug it all into Nimbus',
    body: 'Nimbus connects to 65+ HR, chat, content and security tools, so learning fits neatly into the systems your teams already use. Sync people data, send reminders where work happens and keep records in step.',
    cta: 'Explore our integrations →',
  },
}

function Visual() {
  return (
    <div className="flex items-center justify-center p-[1.5rem]">
      <Placeholder label="Integrations strip 1440×410" tone={2} className="aspect-[1440/410] w-full max-w-full" />
    </div>
  )
}

export default function IntegrationsVisual({ variant = 'mid-market', ...props }) {
  const d = { ...DEFAULTS[variant], ...props }

  if (variant === 'features') {
    return (
      <section data-section="integrations-visual">
        <div className="padding-global">
          <div className="padding-global">
            <div className="mx-auto w-full max-w-[60rem] mob:px-[1rem]">
              <div className="pt-[6rem] mob:pt-[3.5rem]" />
              <div className="container-large">
                <div className="flex flex-col items-center text-center">
                  <div className="w-full max-w-[36rem]">
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="heading-h2 text-center">{d.heading}</h2>
                    </div>
                  </div>
                  <div className="w-full max-w-[42rem]">
                    <p className="mb-[1.25rem] flex pt-[1.5rem] text-center text-[1.5rem] leading-[1.4] text-grey mob:text-[1.25rem]">{d.body}</p>
                  </div>
                </div>
                <div className="w-full pt-[1rem]" />
                <Visual />
                <div className="py-[1rem]">
                  <div className="flex flex-wrap items-center justify-center gap-[1.5rem] xs:gap-[2rem]">
                    <Button variant="primary" href={d.ctaHref || '#'}>
                      {d.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section data-section="integrations-visual">
      <div className="padding-global">
        <div className="mx-auto w-full max-w-[45.25rem]">
          <div className="pb-[2rem] pt-[5rem] mob:pt-[3rem]">
            <div className="container-large">
              <div className="flex flex-col items-center text-center">
                <div className="flex max-w-[50rem] flex-col items-center justify-center gap-[1.5rem] pt-[1rem]">
                  <h2 className="heading-h2 text-center">{d.heading}</h2>
                  <p className="mb-[1.25rem] text-para text-grey">{d.body}</p>
                </div>
              </div>
              <Visual />
            </div>
          </div>
        </div>
        {d.cta && (
          <div className="flex items-center justify-center gap-[1rem] mob:flex-col">
            <Button variant="primary" href={d.ctaHref || '#'}>
              {d.cta}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
