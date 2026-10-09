import { LogoPlaceholder } from '../shared/Placeholder.jsx'

// cs-content-related (.section > .component > .section_global_header + 3-card grid), case-study-content.
// Hairline-bordered header ("Read more ..." serif 4rem/1.1) over three 4.56:3.5 cards: logo, 17-word
// summary and a "Learn more ›" link whose gap widens .75rem -> 1rem on hover (all .25s ease).
const THEME = { '--th-border': '#2d2919' }

const DEFAULTS = {
  heading: 'Explore more customer stories',
  items: [
    { logo: 'Customer eight', text: 'Customer eight used Nimbus content to bring a shared language of service to every restaurant it runs.', href: '/case-studies-contents/customer-8' },
    { logo: 'Customer nine', text: 'Customer nine gave thousands of store colleagues quick, relevant learning they could finish between busy shifts.', href: '/case-studies-contents/customer-9' },
    { logo: 'Customer ten', text: 'Customer ten built a culture of growth with ready-made pathways that managers can share in a few clicks, lifting engagement across every region.', href: '/case-studies-contents/customer-10' },
  ],
  linkLabel: 'Learn more',
}

export default function CsContentRelated({ heading = DEFAULTS.heading, items = DEFAULTS.items, linkLabel = DEFAULTS.linkLabel }) {
  return (
    <section data-section="cs-content-related" style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="relative flex flex-col border border-[var(--th-border)]">
            <div className="flex flex-col items-start justify-start border-b border-[var(--th-border)] px-[2.5rem] pb-[4rem] pt-[5.5rem] [text-wrap:pretty] tab:px-[2rem] tab:pt-[4rem] mob:px-[1.5rem] xs:px-[1rem]">
              <div className="flex w-full flex-col items-start justify-between leading-[1.4] mob:pr-0">
                <div className="flex flex-col items-start justify-start gap-[0.5rem]">
                  <h2 className="mb-0 font-serif text-[4rem] font-normal leading-[1.1]">{heading}</h2>
                </div>
              </div>
            </div>
            <div className="grid w-full flex-1 grid-cols-3 mob:grid-cols-1">
              {items.map((it, i) => (
                <div key={i}>
                  <div className="flex aspect-[4.56/3.5] h-full flex-1 flex-col justify-between gap-y-[0.75rem] border border-r-0 border-[var(--th-border)] p-[2rem] text-ink tab:aspect-auto tab:gap-y-[3rem] tab:p-[1.5rem] mob:border-r mob:p-[1.25rem] xs:min-h-[10rem] xs:p-[1rem]">
                    <div className="flex items-center justify-start gap-[1rem] self-start">
                      <LogoPlaceholder text={it.logo} className="h-[2rem] w-[6.1rem] justify-start text-[0.75rem] text-ink mob:h-[1.25rem] mob:w-[3.8rem] mob:text-[0.5rem]" />
                    </div>
                    <div>
                      <p className="mb-[1.25rem] text-[1rem] leading-[1.4]">{it.text}</p>
                      <a
                        href={it.href}
                        className="group mt-[0.25rem] flex gap-[0.75rem] self-start pr-[1.5rem] font-semibold text-inherit no-underline transition-all duration-[250ms] ease-[ease] hover:gap-[1rem]"
                      >
                        <span className="text-[1rem] leading-[1.4]">{linkLabel}</span>
                        <svg viewBox="0 0 5.1 8.43" className="w-[8px]" aria-hidden>
                          <path d="M.7.7l3.5 3.5L.7 7.7" fill="none" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
