import Placeholder, { LogoPlaceholder } from '../shared/Placeholder.jsx'

// integrations-header: /lms/integrations `.section_integrations_header` (legacy Relume header system).
// Bordered (#00251e) 2-col card: copy (eyebrow tag, H1 3.8rem/1.1, 18px copy, green pill button + avatar stack)
// | square image (3:2 <=991). Then centred line + 6 logos, then a split H2 / grey paragraph header.
// Button hover (no transition on colour, like the original): bg #1ee9b6 -> #016b57, text #000a06 -> #eafff7.
export function LegacyButton({ children, href = '#', className = '' }) {
  return (
    <a
      href={href}
      className={`rounded-[200vw] border border-[#1ee9b6] bg-[#1ee9b6] px-[1.25rem] py-[0.75rem] text-center text-[1.125rem] font-medium leading-none text-[#000a06] no-underline transition-[border-radius] duration-300 ease-in-out hover:bg-[#016b57] hover:text-[#eafff7] tab:px-[1rem] tab:py-[0.5rem] tab:text-[1rem] xs:block xs:self-stretch ${className}`}
    >
      {children}
    </a>
  )
}

export function EyebrowTag({ children, className = '' }) {
  return (
    <div
      className={`mb-[0.75rem] inline-block rounded-pill border border-[#01584b] bg-[#001811] px-[0.75rem] py-[0.325rem] text-small font-medium text-ink tab:px-[0.625rem] tab:py-[0.425rem] tab:text-[0.725rem] xs:mb-[0.25rem] xs:leading-none ${className}`}
    >
      {children}
    </div>
  )
}

const DEFAULTS = {
  eyebrow: 'Connections',
  heading: 'Learning platform connections for every tool you use',
  intro: 'From your HR system, payroll and CRM to chat apps, video calls and calendars, Nimbus links up neatly with the many tools your teams already rely on every single day.',
  cta: 'Book a demo',
  users: 'Enjoyed by over 5M people',
  logosLead: 'Bringing learning together for teams at places like',
  logos: ['logo-volvo.png', 'logo-burgerking.png', 'logo-vodafone.png', 'logo-ba.png', 'logo-krispykreme.svg', 'logo-nothingbundt.png'],
  heading2: 'Platform connections that really work',
  intro2: 'From HR and payroll to chat and video tools, Nimbus links more than 500 teams to the everyday systems that keep their whole business running.',
}

export default function IntegrationsHeader(props) {
  const p = { ...DEFAULTS, ...props }
  return (
    <section data-section="integrations-header">
      <div className="padding-global">
        <div className="container-large">
          <div className="h-full flex-1 border border-[#00251e]">
            <div className="grid h-full grid-cols-2 gap-[4rem] tab:gap-[2rem] mob:grid-cols-1">
              <div className="flex flex-col items-start justify-center gap-y-[0.75rem] px-[2.5rem] py-[5rem] tab:px-[1.5rem] tab:py-[3rem] mob:p-[1.5rem]">
                <div className="flex w-full flex-col items-start justify-between leading-[1.4] [text-wrap:pretty]">
                  <div className="flex flex-col items-start gap-[0.5rem]">
                    <EyebrowTag>{p.eyebrow}</EyebrowTag>
                    <h1 className="font-serif text-[3.8rem] font-normal leading-[1.1] text-ink xs:text-[2.5rem]">{p.heading}</h1>
                  </div>
                  <p className="mb-[1.25rem] mt-[1rem] text-body leading-[1.4] text-ink xs:text-body-xs">{p.intro}</p>
                  <div className="mt-[2rem] flex flex-wrap items-center justify-start gap-[1.5rem] xs:w-full xs:flex-col xs:items-stretch xs:gap-[1rem]">
                    <LegacyButton href="/lms/demo-platform">{p.cta}</LegacyButton>
                    <div className="flex items-center justify-start gap-[0.75rem] xs:justify-center">
                      <div className="flex">
                        {[0, 1, 2].map((i) => (
                          <Placeholder
                            key={i}
                            label=""
                            tone={3}
                            className={`aspect-square h-[2.5rem] w-[2.5rem] rounded-[1.5rem] border border-page tab:h-[2rem] tab:w-[2rem] ${i ? '-ml-[1rem] tab:-ml-[0.5rem]' : ''}`}
                          />
                        ))}
                      </div>
                      <div className="text-small text-ink">{p.users}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-full w-full border-b border-[#00251e]">
                <Placeholder label="Connections visual" tone={2} className="h-full w-full tab:aspect-[3/2] tab:h-auto" />
              </div>
              {/* empty third grid item on the original: adds one row gap under the card */}
              <div aria-hidden />
            </div>
          </div>
          <div className="pb-[1rem] pt-[1rem]">
            <div className="text-center text-body text-ink xs:text-body-xs">{p.logosLead}</div>
            <div className="container-medium">
              <div className="flex w-full flex-col items-center gap-[2rem]">
                <div className="flex max-w-[60rem] items-center justify-between gap-[3rem] pt-[2rem] tab:flex-wrap tab:justify-center tab:gap-y-[2rem] mob:justify-around xs:gap-[2rem]">
                  {p.logos.map((f, i) => (
                    <div key={i} className="flex w-[7rem] items-center justify-center overflow-clip">
                      <LogoPlaceholder src={`/assets/${f}`} alt="Customer logo" className="aspect-[122/37] max-h-[4rem] w-full text-[0.75rem]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pb-[2rem] pt-[4rem]">
              <div className="flex items-end justify-between gap-[3.75rem] [text-wrap:pretty] tab:flex-col tab:items-start tab:gap-[2rem] xs:gap-[1.5rem]">
                <div className="flex max-w-[36rem] flex-col items-start gap-[1rem]">
                  <h2 className="heading-h2">{p.heading2}</h2>
                </div>
                <div className="max-w-[28rem]">
                  <p className="mb-[1.25rem] text-para text-grey">{p.intro2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
