import { LogoPlaceholder } from './shared/Placeholder.jsx'

const HOME_LOGOS = ['logo-volvo.png', 'logo-burgerking.png', 'logo-vodafone.png', 'logo-ba.png', 'logo-krispykreme.svg', 'logo-nothingbundt.png']

// Measured logo box heights at 112px wide (1440): 45.7 except Nothing Bundt 48.5 and
// Krispy Kreme 37.8. Expressed as aspect ratios so they scale with the 80/96px mobile widths.
const ASPECT = {
  'logo-nothingbundt.png': 'aspect-[112/48.5]',
  'logo-krispykreme.svg': 'aspect-[112/37.8]',
}

/**
 * §3 static customer-logo row (`.section_wowlogos`, no motion). Defaults reproduce the homepage.
 * Subpage instances differ in wrapper padding, container width (small 724 vs medium 1120), whether
 * the heading sits above the container (homepage, demo page) or inside the centred component
 * (feature pages: `headingPlacement="inside"`, gap 32), the wrap's top padding, and logo count.
 * @param {React.ReactNode|null} [props.heading='Chosen by teams at'] line above the logos; null hides it
 * @param {'outside'|'inside'} [props.headingPlacement='outside'] heading above the container, or first child of the component
 * @param {'medium'|'small'} [props.container='medium'] container-medium (70rem) or container-small (45.25rem)
 * @param {string} [props.paddingClassName='py-[3rem] mob:py-[2rem]'] vertical padding of the inner wrapper
 * @param {string} [props.gapClassName='gap-[2rem]'] gap inside the component (heading -> wrap when inside)
 * @param {string} [props.wrapClassName='pt-[2rem] mob:flex-wrap mob:justify-around mob:gap-[2rem]'] logo row extras (top padding, mobile wrapping)
 * @param {string} [props.logoClassName='w-[7rem] mob:w-[5rem] xs:w-[6rem]'] logo block width classes
 * @param {Array<string|{src?: string, aspect?: string, text?: string}>} [props.logos] logo files in /assets
 *   (homepage logos only) or placeholder objects; default = the 6 homepage logos
 * @param {boolean} [props.trailingSpacer=true] the homepage's extra 2rem spacer after the strip
 */
export default function LogoStrip({
  heading = 'Chosen by teams at',
  headingPlacement = 'outside',
  container = 'medium',
  paddingClassName = 'py-[3rem] mob:py-[2rem]',
  gapClassName = 'gap-[2rem]',
  wrapClassName = 'pt-[2rem] mob:flex-wrap mob:justify-around mob:gap-[2rem]',
  logoClassName = 'w-[7rem] mob:w-[5rem] xs:w-[6rem]',
  logos = HOME_LOGOS,
  trailingSpacer = true,
}) {
  const headingEl =
    heading != null ? (
      <p className={`${headingPlacement === 'outside' ? 'w-full' : ''} text-center text-body text-ink xs:text-body-xs`}>{heading}</p>
    ) : null
  return (
    <section data-section="logos">
      <div className="padding-global">
        <div className={paddingClassName}>
          {headingPlacement === 'outside' && headingEl}
          <div className={container === 'small' ? 'mx-auto w-full max-w-[45.25rem]' : 'container-medium'}>
            <div className={`flex flex-col items-center ${gapClassName}`}>
              {headingPlacement === 'inside' && headingEl}
              <div className={`mx-auto flex max-w-[60rem] items-center justify-between gap-[3rem] ${wrapClassName}`}>
                {logos.map((l, i) => {
                  const o = typeof l === 'string' ? { src: `/assets/${l}`, aspect: ASPECT[l] } : l
                  return (
                    <div key={i} className={`flex items-center justify-center overflow-clip ${logoClassName}`}>
                      <LogoPlaceholder
                        src={o.src}
                        text={o.text}
                        alt="Customer logo"
                        className={`${o.aspect || 'aspect-[112/45.7]'} max-h-[4rem] w-full text-[1rem]`}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        {trailingSpacer && <div className="h-[2rem]" />}
      </div>
    </section>
  )
}
