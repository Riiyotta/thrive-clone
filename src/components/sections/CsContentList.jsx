import { LogoPlaceholder } from '../shared/Placeholder.jsx'

// cs-content-list (.section > .component > .cs-content_collection-list) on /case-studies/content,
// legacy content ("yellow") theme: 3-col (2 ≤767, 1 ≤479) grid of 10 hairline cards — logo, 14-word
// summary, "Learn more ›" link. Hover: dotted texture on the card (instant); link gap .75rem -> 1rem (.25s).
const THEME = { '--th-border': '#2d2919' }
const TEXTURE = 'hover:bg-[radial-gradient(rgba(238,233,109,0.09)_1px,transparent_1.3px)] hover:bg-[length:0.375rem_0.375rem]'

const SUMMARIES = [
  'A well-known optical retailer built a culture of everyday learning across its many stores.',
  'A national property team used ready-made campaigns to double engagement in one year.',
  'A busy restaurant group gave every team member a shared standard of great service, from the kitchen to the counter.',
  'A large grocer helped thousands of store colleagues learn in short bursts between busy shifts, with practical content they could finish on any device.',
  'A workplace solutions provider replaced its old libraries with fresh, relevant learning for every employee.',
  'A regional housing association made essential compliance learning feel simple and engaging, helping teams across every site stay confident, safe and up to date throughout the year.',
  'A fashion retailer gave its store teams quick product knowledge they enjoy using.',
  'A care provider supported frontline staff with wellbeing content that fits neatly around their shifts.',
  'A logistics firm brought safety learning to drivers and warehouse teams on any device they carry.',
  'A hotel group onboarded seasonal staff faster with short, practical guest service modules.',
]
const DEFAULT_ITEMS = SUMMARIES.map((text, i) => ({ logo: `Customer ${i + 6}`, text, href: `/case-studies-contents/customer-${(i % 5) + 6}` }))

// textClassName (optional): summary spacing classes; default mb-[1.25rem]. The live list keeps 1.5rem
// between the summary and the link, so /case-studies/content passes 'mb-[1.5rem]'.
export default function CsContentList({ items = DEFAULT_ITEMS, linkLabel = 'Learn more', textClassName = 'mb-[1.25rem]' }) {
  return (
    <section data-section="cs-content-list" style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="relative flex flex-col border-l border-r border-[var(--th-border)]">
            <div className="grid grid-cols-3 gap-0 mob:grid-cols-2 xs:grid-cols-1">
              {items.map((it, i) => (
                <div key={i}>
                  <a
                    href={it.href}
                    className={`flex h-full flex-col items-stretch justify-between gap-y-[5rem] border border-[var(--th-border)] p-[2rem] text-ink no-underline tab:gap-y-[2rem] tab:p-[1.5rem] mob:p-[1.25rem] xs:p-[1rem] ${TEXTURE}`}
                  >
                    <div className="flex items-center justify-start gap-[1rem] self-start">
                      <LogoPlaceholder text={it.logo} className="h-[2rem] w-[5.2rem] justify-start text-[0.6rem] text-ink xs:h-[1.5rem]" />
                    </div>
                    <div>
                      <p className={`${textClassName} text-[1rem] leading-[1.4]`}>{it.text}</p>
                      <div className="group mt-[0.25rem] flex gap-[0.75rem] self-start pr-[1.5rem] font-semibold transition-all duration-[250ms] ease-[ease] hover:gap-[1rem]">
                        <span className="text-[1rem] leading-[1.4]">{linkLabel}</span>
                        <svg viewBox="0 0 5.1 8.43" className="w-[8px]" aria-hidden>
                          <path d="M.7.7l3.5 3.5L.7 7.7" fill="none" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
