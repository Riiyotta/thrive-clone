import Button from '../shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from '../shared/Placeholder.jsx'

// platform-hero: /lms `.section_hero-platform.platform-hero` (margin-top -1rem).
// Split hero: H1 (3.8rem/1.15 serif, 2.5rem <=479), grey paragraph, inline quote with avatar,
// primary CTA; product visual right (object-fit contain, 1440x1339). Below: centred line + 8 logo row
// (`.wowlogos_wrap.platform-logos`: flex space-between gap 3rem max-w 60rem; wraps/space-around <=767).
const LOGOS = ['logo-volvo.png', 'logo-burgerking.png', 'logo-vodafone.png', 'logo-ba.png', 'logo-krispykreme.svg', 'logo-nothingbundt.png', null, null]

const DEFAULTS = {
  heading: 'The AI-first learning platform your whole team will love',
  intro:
    'Nimbus brings learning, skills, mentoring, knowledge and team news together in one learning platform. Chosen by more than 500 teams in over 60 countries, from busy retail chains and restaurant groups to major airlines and global offices.',
  quote:
    '“I needed a platform that people would actually choose to open, not one they were told to use. Within weeks our teams were sharing what they learned, asking for more content and building skills on their own terms, which never happened with our old system.”',
  name: 'Jordan Ellis',
  role: 'Head of People Development,',
  company: 'Northwind Co',
  cta: 'Book a demo →',
  logosLead: 'From busy retail floors to global offices, teams everywhere grow with Nimbus every day',
  logos: LOGOS,
}

export default function PlatformHero(props) {
  const p = { ...DEFAULTS, ...props }
  return (
    <section data-section="platform-hero" className="-mt-[1rem]">
      <div className="padding-global">
        <div className="pb-[2rem] pt-[0.5rem]">
          <div className="container-medium mt-[1rem]">
            <div className="flex items-center justify-between gap-[3rem] mob:flex-col mob:items-start">
              <div className="flex min-w-0 flex-1 flex-col items-start mob:w-full">
                <div className="pt-[1rem]" />
                <h1 className="font-serif text-[3.8rem] font-normal leading-[1.15] text-ink xs:text-[2.5rem]">{p.heading}</h1>
                <div className="pt-[1rem]" />
                <p className="mb-[0.25rem] max-w-[35rem] text-para text-grey [text-wrap:pretty]">{p.intro}</p>
                <div className="my-[1.5rem]">
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
                <div className="flex items-center justify-start gap-[1rem] xs:flex-col xs:items-start">
                  <Button variant="primary" to="/lms/demo-platform" stretch={false}>
                    {p.cta}
                  </Button>
                </div>
              </div>
              <div className="w-full min-w-0 flex-1 overflow-clip">
                <Placeholder label="Platform visual" tone={2} className="aspect-[1440/1339] w-full rounded-panel" />
              </div>
            </div>
          </div>
          <div className="padding-global">
            <div className="py-[1.5rem] mob:py-[2rem]">
              <div className="text-center text-body text-ink xs:text-body-xs">{p.logosLead}</div>
              <div className="container-medium">
                <div className="flex w-full flex-col items-center gap-[2rem]">
                  <div className="flex max-w-[60rem] items-center justify-between gap-[3rem] pt-[0.5rem] tab:flex-wrap tab:justify-center tab:gap-y-[2rem] mob:justify-around xs:gap-[2rem]">
                    {p.logos.map((f, i) => (
                      <div key={i} className="flex w-[7rem] items-center justify-center overflow-clip">
                        <LogoPlaceholder src={f ? `/assets/${f}` : undefined} alt="Customer logo" className={`${f ? 'aspect-[120/49]' : 'aspect-[388/272]'} max-h-[4rem] w-full text-[0.75rem]`} />
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
