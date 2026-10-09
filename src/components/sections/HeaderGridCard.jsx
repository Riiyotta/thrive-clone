import Placeholder from '../shared/Placeholder.jsx'

// header-grid-card (.section > .component > .grid_section.grid-section--cols-2), content-catalogue hero
// (/content/topics, /content/sector-suites), legacy content ("yellow") theme. Left hairline card:
// eyebrow pill, serif 3rem/1 H1, grey paragraph, yellow pill button; right: media.
// variant 'topics' = 923:600 image (3:2 ≤991); variant 'suites' = 500px background-video slot.
// Button hover: bg #eee96d -> #edcf00 (instant).
const THEME = { '--th-border': '#2d2919', '--th-eyebrow': '#2d2919', '--th-brand': '#eee96d', '--th-btn-hover': '#edcf00' }

const VARIANTS = {
  topics: {
    eyebrow: 'Core library',
    title: 'Learning content to help every team thrive',
    text: 'More than 1000 ready-made learning resources covering the skills, topics and challenges teams face every day.',
    button: { label: 'Explore the library', href: '#' },
  },
  suites: {
    eyebrow: 'Sector bundles',
    title: 'Industry-specific content for your teams',
    text: 'Complete learning collections built for the sectors you work in, with the essential topics, compliance and skills content each one needs.',
    button: { label: 'Book a content walkthrough', href: '#' },
  },
}

export default function HeaderGridCard({ variant = 'topics', eyebrow, title, text, button, media = null }) {
  const v = VARIANTS[variant] || VARIANTS.topics
  eyebrow = eyebrow ?? v.eyebrow
  title = title ?? v.title
  text = text ?? v.text
  button = button ?? v.button
  return (
    <section data-section="header-grid-card" data-variant={variant} style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="relative flex flex-col">
            <div className="grid w-full flex-1 grid-cols-2 mob:grid-cols-1">
              <div className="flex flex-1 flex-col items-start justify-center gap-y-[0.75rem] border border-r-0 border-[var(--th-border)] p-[2rem] text-ink tab:gap-y-[2rem] tab:p-[1.5rem] mob:border-r mob:p-[1.25rem] xs:p-[1rem]">
                <div className="flex w-full flex-col items-start justify-between leading-[1.4]">
                  <div className="flex flex-col items-start justify-start gap-[0.5rem]">
                    <div className="mb-[0.75rem] inline-block rounded-[100vw] border border-[var(--th-eyebrow)] bg-[var(--th-eyebrow)] px-[0.75rem] py-[0.325rem] text-[0.875rem] font-medium text-white tab:px-[0.625rem] tab:py-[0.425rem] tab:text-[0.725rem] xs:mb-[0.25rem] xs:leading-none">
                      {eyebrow}
                    </div>
                    <h1 className="font-serif text-[3rem] font-normal leading-[1.1] xs:text-[2rem]">{title}</h1>
                  </div>
                  <p className="mb-[1.25rem] mt-[1rem] text-body text-grey xs:text-body-xs">{text}</p>
                  <div className="mt-[2rem] flex flex-wrap items-center justify-start gap-[1.5rem] xs:w-full xs:flex-col xs:items-stretch xs:gap-[1rem]">
                    <a
                      href={button.href}
                      className="rounded-[200vw] border border-[var(--th-brand)] bg-[var(--th-brand)] px-[1.25rem] py-[0.75rem] text-center text-[1.125rem] font-medium leading-none text-black no-underline transition-[border-radius] duration-300 ease-in-out hover:bg-[var(--th-btn-hover)] tab:px-[1rem] tab:py-[0.5rem] tab:text-[1rem] xs:block xs:self-stretch"
                    >
                      {button.label}
                    </a>
                  </div>
                </div>
              </div>
              <div className="relative h-full w-full border border-[var(--th-border)]">
                {variant === 'suites' ? (
                  <Placeholder label="Background video" src={media || undefined} className="relative h-[500px] w-full overflow-hidden" />
                ) : (
                  <Placeholder label="Header image" src={media || undefined} className="aspect-[923/600] w-full tab:aspect-[3/2]" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
