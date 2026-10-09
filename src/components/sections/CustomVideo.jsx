import Placeholder from '../shared/Placeholder.jsx'

// custom-video (.section_custom-video) on /content/custom-content, legacy "green" theme:
// hairline component (no top border), header (serif 4rem/1.1 H2 + green pill button), then a 2-col
// grid: 16:9 lightbox thumbnail (right hairline) and a 1.25rem paragraph. 1 col ≤767 (text first ≤479).
// Button hover: bg #1ee9b6 -> #016b57, text #000a06 -> #eafff7 (instant; only border-radius has a .3s transition).
const THEME = { '--th-border': '#00251e', '--th-brand': '#1ee9b6', '--th-btn-text': '#000a06', '--th-btn-hover': '#016b57', '--th-btn-text-hover': '#eafff7' }

export default function CustomVideo({
  heading = 'Custom learning made for your people and your goals',
  button = { label: 'Watch how it works', href: '#' },
  text = 'Our specialist content studio collaborates with you to transform internal knowledge, operational processes and organisational stories into memorable learning. From compact explainer videos to comprehensive programmes, every deliverable is designed around your brand, your workforce and the outcomes you care about most, then delivered ready to launch.',
  image = null,
}) {
  return (
    <section data-section="custom-video" style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="relative flex flex-col border-b border-l border-[var(--th-border)]">
            <div className="flex flex-col items-start justify-start px-[2.5rem] pb-[4rem] pt-[5.5rem] [text-wrap:pretty] tab:px-[2rem] tab:pt-[4rem] mob:px-[1.5rem] xs:px-[1rem]">
              <div className="flex w-full flex-col items-start justify-between leading-[1.4]">
                <div className="flex flex-col items-start justify-start gap-[0.5rem]">
                  <h2 className="mb-0 w-full max-w-[42rem] font-serif text-[4rem] font-normal leading-[1.1]">{heading}</h2>
                </div>
                <div className="mt-[2rem] flex flex-wrap items-center justify-start gap-[1.5rem] xs:w-full xs:flex-col xs:items-stretch xs:gap-[1rem]">
                  <a
                    href={button.href}
                    className="rounded-[200vw] border border-[var(--th-brand)] bg-[var(--th-brand)] px-[1.25rem] py-[0.75rem] text-center text-[1.125rem] font-medium leading-none text-[var(--th-btn-text)] no-underline transition-[border-radius] duration-300 ease-in-out hover:bg-[var(--th-btn-hover)] hover:text-[var(--th-btn-text-hover)] tab:px-[1rem] tab:py-[0.5rem] tab:text-[1rem] xs:block xs:self-stretch"
                  >
                    {button.label}
                  </a>
                </div>
              </div>
            </div>
            <div className="self-stretch border-t border-[var(--th-border)]">
              <div className="grid grid-cols-2 items-center gap-x-0 gap-y-[4px] mob:grid-cols-1 mob:gap-y-[1rem]">
                <a
                  href={button.href}
                  className="relative flex w-full items-center justify-center overflow-hidden border-r border-[var(--th-border)] px-[2.5rem] py-[6rem] mob:py-[3rem] xs:order-2 xs:p-[1.5rem]"
                >
                  <Placeholder label="Video thumbnail 16:9" src={image || undefined} className="aspect-video w-full self-stretch" />
                </a>
                <div className="w-full px-[2.5rem] tab:p-[1.5rem] xs:order-1 xs:px-[1rem]">
                  <p className="mb-[1.25rem] text-[1.25rem] leading-[1.4] xs:text-[1.125rem]">{text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
