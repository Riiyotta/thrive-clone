// learn-grid (.section_learn) on /content/custom-content, legacy "green" theme: hairline component with
// a 0.75fr / 1fr grid — header (serif 4rem/1.1 H2 + 1rem paragraph) beside a 2-col list of formats,
// each a green-outlined icon box + 1.25rem/500 label. Last row has no bottom rule. Stacks ≤767.
const THEME = { '--th-border': '#00251e', '--th-bg2': '#001811', '--th-brand': '#1ee9b6', '--th-eyebrow-border': '#01584b' }

const DEFAULTS = {
  heading: 'Creating your bespoke learning content',
  text: 'Your custom content is shaped around your goals, your people and your brand, using the formats that suit each audience best.',
  items: ['Motion', 'Ten minute interactive modules', 'Video shoots and photo shoots', 'Guides and handbooks', 'Knowledge checks', 'Recaps', 'Audio stories', 'Learning campaign assets', 'Hands-on tasks', 'Content uploaded and mapped onto pathways'],
}

function Icon() {
  return (
    <svg viewBox="0 0 20 20" className="h-[1.25rem] w-[1.25rem]" aria-hidden>
      <path d="M3 10h14M10 3v14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

// iconShrink (optional): let the icon box shrink beside long labels, as the live flex row does (default keeps shrink-0).
export default function LearnGrid({ heading = DEFAULTS.heading, text = DEFAULTS.text, items = DEFAULTS.items, iconShrink = false }) {
  const lastRow = items.length - (items.length % 2 === 0 ? 2 : 1)
  return (
    <section data-section="learn-grid" style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="relative flex flex-col border border-r-0 border-[var(--th-border)]">
            <div className="grid grid-cols-[0.75fr_1fr] gap-0 mob:grid-cols-1 mob:gap-[1rem]">
              <div className="flex w-full flex-col items-start justify-between gap-[1.25rem]">
                <div className="mx-auto px-[2.5rem] py-[3.5rem] tab:px-[1.5rem] tab:py-[2.5rem] mob:px-[1.25rem] mob:py-[2rem] xs:px-[1rem]">
                  <div className="flex w-full flex-col items-start justify-between leading-[1.4]">
                    <div className="flex flex-col items-start justify-start gap-[0.5rem]">
                      <h2 className="mb-[1.25rem] mt-[0.25rem] font-serif text-[4rem] font-normal leading-[1.1]">{heading}</h2>
                    </div>
                    <p className="mb-[1.25rem] mt-[1rem] text-[1rem] leading-[1.4]">{text}</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col">
                <div className="grid grid-cols-2 gap-0 mob:border-t mob:border-[var(--th-border)]">
                  {items.map((label, i) => (
                    <div
                      key={i}
                      className={`self-stretch border-l border-[var(--th-border)] p-[2rem] tab:p-[1.5rem] xs:p-[1rem] ${i < lastRow ? 'border-b' : ''}`}
                    >
                      <div className="flex flex-row items-center justify-start gap-[1rem] tab:gap-[1.25rem]">
                        <div className={`flex h-[2.5rem] w-[2.5rem] ${iconShrink ? 'shrink' : 'shrink-0'} items-center justify-center rounded-br-[8px] rounded-tl-[8px] border border-[var(--th-eyebrow-border)] bg-[var(--th-bg2)] p-[8px] text-[var(--th-brand)] tab:h-[2rem] tab:w-[2rem] mob:p-[4px] xs:h-[1.5rem] xs:w-[1.5rem] xs:rounded-br-[4px] xs:rounded-tl-[4px]`}>
                          <Icon />
                        </div>
                        <div className="text-[1.25rem] font-medium leading-[1.4] text-white xs:text-[1.125rem]">{label}</div>
                      </div>
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
