import Placeholder from '../shared/Placeholder.jsx'

// header-image-legacy: /lms/professional-services `.section > .header_component` (legacy Relume header).
// Hairline (#00251e) 2-col card with no gap: copy (H2 4rem/1.1 serif at every width, 16px copy, 4 review badges)
// | square image. Stacks <=767 (copy padding 1.5rem; 5rem 2.5rem desktop, 3rem 1.5rem <=991).
const DEFAULTS = {
  heading: 'Nimbus Professional Support',
  intro:
    'Nimbus gives you a dedicated team for every stage of your rollout, from planning and data moves to launch, adoption and the long run. Our specialists bring years of experience across many sectors, so you get a partner who helps you hit your goals and keeps the momentum going well after go-live.',
  badges: ['/assets/badge-g2.svg', '/assets/badge-capterra.svg', '/assets/badge-software-advice.svg', null],
}

export default function HeaderImageLegacy(props) {
  const p = { ...DEFAULTS, ...props }
  return (
    <section data-section="header-image-legacy">
      <div className="padding-global">
        <div className="container-large">
          <div className="h-full flex-1 border-b border-l border-r border-[#00251e]">
            <div className="grid h-full grid-cols-2 mob:grid-cols-1">
              <div className="flex flex-col items-start justify-center gap-y-[0.75rem] px-[2.5rem] py-[5rem] tab:px-[1.5rem] tab:py-[3rem] mob:p-[1.5rem]">
                <div className="flex w-full flex-col items-start justify-between leading-[1.4] [text-wrap:pretty]">
                  <div className="flex flex-col items-start gap-[0.5rem]">
                    <h2 className="mb-[1.25rem] mt-[0.25rem] font-serif text-[4rem] font-normal leading-[1.1] text-ink">{p.heading}</h2>
                  </div>
                  <p className="mb-[1.25rem] mt-[1rem] text-[1rem] leading-[1.4] text-ink">{p.intro}</p>
                </div>
                <div className="flex items-center justify-start gap-[2rem] pt-[1rem]">
                  {p.badges.map((b, i) => (
                    <Placeholder key={i} src={b || undefined} label="Badge" alt="Review badge" fit="contain" tone={2} className="aspect-[71/63] h-[4rem] max-w-[6.5rem] rounded-media xs:h-[3rem] xs:max-w-[5rem]" />
                  ))}
                </div>
              </div>
              <div className="relative h-full w-full border-b border-[#00251e]">
                <Placeholder label="Team photo" tone={2} className="aspect-square w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
