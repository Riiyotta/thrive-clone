import Placeholder from '../shared/Placeholder.jsx'
import { LEGACY_H1, LEGACY_H1_PLAIN, LEGACY_PARA, LegacyButton, LegacyEyebrow, legacyVars } from './GlobalHeaderLegacy.jsx'

// hero-center-legacy: centred legacy hero (`.hero_header > .section_center > .header_global.is-center-align`).
//   'services' /lms/professional-services: .component (all hairlines), hero_header pt 1rem,
//              eyebrow tag + H1 (3.8rem/1.1, max 60rem) + para + stacked CTA with avatar row.
//   'custom'   /content/custom-content: .section_component.border-top (top + side hairlines),
//              hero_header pt 4rem, brand logo (115×38px, fixed px) + H1 (3.8rem/1.15) + para + CTA.
// section_center: 4.5rem 2.5rem; ≤991 py 3.5rem; ≤767 py 2.5rem gap 1rem; ≤479 2.5rem 1rem.
const DEFAULTS = {
  services: {
    eyebrow: 'Expert Services',
    heading: 'The experts supporting every great platform',
    body: 'From launch to long-term success, our specialists plan, configure and support your learning platform so every team gets more value, faster, at every stage, right from day one.',
    cta: 'Meet our team',
    proof: 'Trusted by over 5M learners',
  },
  custom: {
    heading: 'Bespoke eLearning Made Around Your People',
    body: 'Made-to-measure learning content, designed together with you, for all of your people.',
    cta: 'See it at work',
  },
}

export default function HeroCenterLegacy({ variant = 'services', theme = 'green', ...props }) {
  const d = { ...DEFAULTS[variant], ...props }
  const services = variant === 'services'
  return (
    <section data-section="hero-center-legacy" style={legacyVars(theme)}>
      <div className="padding-global">
        <div className="container-large">
          <div
            className={`flex flex-col border-solid border-[color:var(--lt-border)] ${
              services ? 'border' : 'border-x border-t'
            }`}
          >
            <div className={`relative flex items-center justify-center ${services ? 'pt-[1rem]' : 'pt-[4rem]'}`}>
              <div className="relative z-[1] flex w-full flex-col items-center justify-center px-[2.5rem] py-[4.5rem] tab:py-[3.5rem] mob:gap-[1rem] mob:py-[2.5rem] xs:px-[1rem]">
                <div className="flex w-full flex-col items-center justify-between text-center">
                  <div className="flex flex-col items-center gap-[0.5rem]">
                    {services ? (
                      <LegacyEyebrow>{d.eyebrow}</LegacyEyebrow>
                    ) : (
                      <Placeholder label="Logo" tone={3} className="mb-[1.5rem] h-[38px] w-[115px]" />
                    )}
                    <h1 className={`${services ? `${LEGACY_H1} max-w-[60rem]` : `${LEGACY_H1_PLAIN} max-w-[41.2rem]`}`}>{d.heading}</h1>
                  </div>
                  <p className={`${LEGACY_PARA} max-w-[36rem] text-ink`}>{d.body}</p>
                  <div className="mt-[2rem] flex flex-col items-center gap-[1.5rem] xs:w-full xs:items-stretch xs:gap-[1rem]">
                    <LegacyButton href={d.ctaHref || '#'}>{d.cta}</LegacyButton>
                    {services && (
                      <div className="flex items-center justify-start gap-[0.75rem] xs:justify-center">
                        <div className="flex">
                          {[0, 1, 2].map((i) => (
                            <Placeholder
                              key={i}
                              label=""
                              tone={3}
                              className={`aspect-square w-[2.5rem] rounded-[1.5rem] tab:w-[2rem] ${
                                i ? '-ml-[1rem] tab:-ml-[0.5rem]' : ''
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-small text-ink">{d.proof}</div>
                      </div>
                    )}
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
