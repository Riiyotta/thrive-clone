const LOGOS = ['logo-volvo.png', 'logo-burgerking.png', 'logo-vodafone.png', 'logo-ba.png', 'logo-krispykreme.svg', 'logo-nothingbundt.png']
import { LogoPlaceholder } from './shared/Placeholder.jsx'

// Measured logo box heights at 112px wide (1440): 45.7 except Nothing Bundt 48.5 and
// Krispy Kreme 37.8. Expressed as aspect ratios so they scale with the 80/96px mobile widths.
const ASPECT = {
  'logo-nothingbundt.png': 'aspect-[112/48.5]',
  'logo-krispykreme.svg': 'aspect-[112/37.8]',
}

// §3 static customer-logo row (no motion)
export default function LogoStrip() {
  return (
    <section data-section="logos">
      <div className="padding-global">
        <div className="py-[3rem] mob:py-[2rem]">
          <p className="w-full text-center text-body text-ink xs:text-body-xs">Chosen by teams at</p>
          <div className="container-medium">
            <div className="flex flex-col items-center gap-[2rem]">
              <div className="mx-auto flex max-w-[60rem] items-center justify-between gap-[3rem] pt-[2rem] mob:flex-wrap mob:justify-around mob:gap-[2rem]">
                {LOGOS.map((f, i) => (
                  <div key={i} className="flex w-[7rem] items-center justify-center overflow-clip mob:w-[5rem] xs:w-[6rem]">
                    <LogoPlaceholder src={`/assets/${f}`} alt="Customer logo" className={`${ASPECT[f] || 'aspect-[112/45.7]'} max-h-[4rem] w-full text-[1rem]`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="h-[2rem]" />
      </div>
    </section>
  )
}
