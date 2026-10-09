import Placeholder from '../shared/Placeholder.jsx'
import { legacyVars } from './GlobalHeaderLegacy.jsx'

// testimonial-card-legacy (`.section_testimonial-card`): bordered card (.component) with a
// decorative background image (`.testimonial-card_background.is-green`, opacity .85, cover) and a
// 2-col grid: customer logo | quote + client (56px round photo, name 600, role grey).
// Padding 3.5rem 2.5rem (≤991 2.5rem 1.5rem; ≤767 2rem 1.25rem; ≤479 sides 1rem). ≤767 one column,
// gap 1rem, client block stacks (photo above name/role).
//   /content/service (theme yellow, tall logo `.specsavers` h 5rem / 3rem ≥1440)
//   /content/custom-content (theme green, logo h 2.5rem)
export default function TestimonialCardLegacy({
  theme = 'yellow',
  logo = 'tall',
  quote = '"Partnering with the Nimbus team has been a real pleasure. They listen carefully, respond quickly to our comments, and readily tweak the details whenever we ask"',
  name = 'Jordan Ellis',
  role = 'Design manager',
}) {
  return (
    <section data-section="testimonial-card-legacy" style={legacyVars(theme)}>
      <div className="padding-global">
        <div className="container-large">
          <div className="relative isolate flex flex-col border border-solid border-[color:var(--lt-border)]">
            <div className="mx-auto w-full px-[2.5rem] py-[3.5rem] tab:px-[1.5rem] tab:py-[2.5rem] mob:px-[1.25rem] mob:py-[2rem] xs:px-[1rem]">
              <div className="grid grid-cols-2 gap-0 mob:grid-cols-1 mob:gap-[1rem]">
                <div>
                  <Placeholder
                    label="Customer logo"
                    tone={3}
                    className={
                      logo === 'tall'
                        ? 'aspect-[501/192] h-[5rem] wide:h-[3rem]'
                        : 'aspect-[521/211] h-[2.5rem]'
                    }
                  />
                </div>
                <div className="flex h-full flex-col items-start justify-between text-left mob:justify-start">
                  <div className="text-body text-ink xs:text-body-xs">{quote}</div>
                  <div className="mt-[2.5rem] mob:mt-[1.25rem]">
                    <div className="flex items-center justify-start gap-[1rem] mob:w-full mob:flex-col mob:items-center mob:gap-[0.75rem] mob:text-center">
                      <Placeholder label="" tone={3} className="aspect-square w-[3.5rem] min-w-[3.5rem] rounded-[3rem] mob:self-start" />
                      <div className="mob:mb-[1rem] mob:self-start mob:text-left xs:flex xs:flex-col xs:gap-[0.5rem]">
                        <div className="text-body font-semibold text-ink xs:text-body-xs">{name}</div>
                        <div className="text-body text-grey xs:text-body-xs">{role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Placeholder
              aria-hidden
              label=""
              tone={1}
              className="pointer-events-none absolute inset-0 z-[-1] opacity-[0.85]"
              data-bg="testimonial-card_background is-green"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
