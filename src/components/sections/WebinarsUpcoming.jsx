import { Eyebrow } from './BlogFeatured.jsx'

// webinars-upcoming (.section > .upcoming-webinars-wrap) on /resources/events-webinars, legacy "green"
// theme: left column (eyebrow, 1.75rem heading, grey line) and a right list of upcoming webinars
// (rows: hover bg -> #001811). The live CMS list was empty at measurement time, so the default shows
// Webflow's "No items found." empty state (#ddd box), as on the original.
const THEME = { '--th-border': '#00251e', '--th-bg2': '#001811', '--th-eyebrow-border': '#01584b' }

export default function WebinarsUpcoming({
  eyebrow = 'Upcoming webinars',
  heading = 'Hear from learning leaders and our own experts in regular live sessions',
  text = 'Follow us on LinkedIn for new dates.',
  webinars = [],
  emptyText = 'No items found.',
}) {
  return (
    <section data-section="webinars-upcoming" style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="border-l border-r border-[var(--th-border)]">
            <div className="relative flex justify-between border-b border-[var(--th-border)] mob:flex-col">
              <div className="sticky top-0 flex w-1/2 flex-col items-start justify-between self-start p-[2.5rem] mob:relative mob:w-full mob:gap-y-[1.25rem] mob:p-[1.5rem]">
                <div>
                  <Eyebrow>{eyebrow}</Eyebrow>
                  <h3 className="mb-[1rem] text-[1.75rem] font-normal leading-[1.15] xs:text-[1.5rem]">{heading}</h3>
                </div>
                <div className="text-body text-grey xs:text-body-xs">{text}</div>
              </div>
              <div className="flex w-1/2 flex-col items-start justify-between border-r border-[var(--th-border)] mob:w-full mob:gap-y-[1rem] mob:border-r-0 mob:p-0">
                <div className="flex self-stretch">
                  {webinars.length ? (
                    <div className="w-full">
                      {webinars.map((w, i) => (
                        <a
                          key={i}
                          href={w.href || '#'}
                          className="flex w-full flex-col items-start justify-start gap-y-[1.5rem] border-b border-l border-[var(--th-border)] p-[2.5rem] text-ink no-underline hover:bg-[var(--th-bg2)] tab:p-[2rem] xs:p-[1.5rem]"
                        >
                          <Eyebrow>{w.date}</Eyebrow>
                          <div className="text-[1.5rem] font-semibold leading-[1.4]">{w.title}</div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-[#dddddd] p-[10px]">
                      <div className="text-body text-ink xs:text-body-xs">{emptyText}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
