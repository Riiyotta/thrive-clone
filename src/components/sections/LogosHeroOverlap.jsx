import Button from '../shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from '../shared/Placeholder.jsx'

// logos-hero-overlap: /lms/corporate-lms `.section_wowlogos.is-neg-overlap` (fixed 16px root page).
// The page's split hero lives inside the logos section, which is pulled up over the (empty) wowcontent
// block above it: margin-top -16rem / -10rem <=991 / -8rem <=767 / -6rem <=479 (pass overlap={false} to drop it).
// Left: avatar group + 8-word line, H1 3.8rem/1.15 (2.5rem <=479), grey paragraph, quote, primary CTA.
// Right: product visual 1440x920 contain. Below: centred line + 7 logos (max-h 4rem; 5rem/6rem wide on mobile).
const DEFAULTS = {
  trusted: 'Chosen by 5 million people in over 60 countries',
  heading: 'The team learning tool for growing firms',
  intro:
    'The team learning platform for growing companies. Rather than a patchwork of tools, Nimbus brings onboarding, compliance, team news and skills growth together in one place. Big-company features, without any of the usual complexity or cost.',
  quote:
    '“The best move we made was switching to Nimbus in the first place. Our engagement went through the roof, and in the very first month every single person who logged in took part straight away.”',
  name: 'Jordan Ellis',
  role: 'Senior Learning Partner,',
  company: 'Acme',
  cta: 'Book a demo →',
  logosLead: 'Bringing learning, knowledge and news together for teams like yours',
  logos: [null, 'logo-volvo.png', 'logo-burgerking.png', 'logo-vodafone.png', 'logo-ba.png', 'logo-krispykreme.svg', 'logo-nothingbundt.png'],
  overlap: true,
  // optional: per-logo aspect classes (replaces the default box aspect for logo i) and extra CTA-row classes
  logoAspects: null,
  ctaClassName: '',
}

export default function LogosHeroOverlap(props) {
  const p = { ...DEFAULTS, ...props }
  return (
    <section
      data-section="logos-hero-overlap"
      className={`relative ${p.overlap ? '-mt-[16rem] tab:-mt-[10rem] mob:-mt-[8rem] xs:-mt-[6rem]' : ''}`}
    >
      <div className="padding-global pt-[8rem]">
        <div className="padding-global">
          <div className="flex items-center justify-between gap-[3rem] mob:flex-col mob:items-start">
            <div className="flex min-w-0 max-w-[44rem] flex-1 flex-col items-start self-start mob:w-full">
              <div className="w-full pt-[1rem]">
                <div className="flex items-center justify-start gap-[1rem] pb-[1rem] text-small text-grey">
                  <Placeholder src="/assets/hero-avatars.png" alt="" fit="contain" className="aspect-[144/64] w-[4.5rem] shrink-0" />
                  <div>{p.trusted}</div>
                </div>
              </div>
              <div className="max-w-[44rem]">
                <h1 className="font-serif text-[3.8rem] font-normal leading-[1.15] text-ink xs:text-[2.5rem]">{p.heading}</h1>
              </div>
              <div className="w-full pt-[1rem]" />
              <div className="max-w-[35rem]">
                <p className="mb-[0.25rem] text-para text-grey [text-wrap:pretty]">{p.intro}</p>
              </div>
              <div className="mb-[2rem] max-w-[34rem] rounded-card bg-[rgba(11,11,11,0.01)] pb-[1rem] pr-[1rem]">
                <p className="mb-[0.75rem] max-w-[34rem] text-[1rem] italic leading-[1.4rem] text-ink">{p.quote}</p>
                <div className="flex items-center gap-[1rem] text-left mob:flex-col mob:items-start">
                  <div className="min-h-[2.5rem] w-[2.5rem] min-w-[2.5rem] overflow-clip border border-black">
                    <Placeholder label="" tone={3} className="aspect-square w-full rounded-[2.5rem]" />
                  </div>
                  <div>
                    <div className="text-small font-semibold text-ink">{p.name}</div>
                    <div className="text-small text-ink">
                      {p.role} <a href="#" className="underline">{p.company}</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`flex items-center justify-start gap-[1rem] xs:flex-col xs:items-start ${p.ctaClassName}`}>
                <Button variant="primary" to="/lms/demo-platform" stretch={false}>
                  {p.cta}
                </Button>
              </div>
            </div>
            <div className="w-full min-w-0 flex-1 overflow-clip">
              <Placeholder label="Product visual" tone={2} className="aspect-[1440/920] w-full rounded-panel" />
            </div>
          </div>
          <div className="pb-[1rem] pt-[2rem]">
            <div className="text-center text-body text-ink xs:text-body-xs">{p.logosLead}</div>
            <div className="container-medium">
              <div className="flex w-full flex-col items-center gap-[2rem]">
                <div className="flex max-w-[60rem] items-center justify-between gap-[3rem] pt-[0.5rem] tab:flex-wrap tab:justify-center tab:gap-y-[2rem] mob:justify-around xs:gap-[2rem]">
                  {p.logos.map((f, i) => (
                    <div key={i} className="flex w-[7rem] items-center justify-center overflow-clip">
                      <LogoPlaceholder
                        src={f ? `/assets/${f}` : undefined}
                        alt="Customer logo"
                        className={`${p.logoAspects?.[i] || (f ? 'aspect-[112/45.7]' : 'aspect-[388/272]')} max-h-[4rem] w-full text-[0.75rem] mob:w-[5rem] xs:w-[6rem]`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
