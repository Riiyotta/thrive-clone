import Placeholder from '../shared/Placeholder.jsx'
import Eyebrow from '../shared/Eyebrow.jsx'

// company-news (.section_company-news) on /company: green-chip eyebrow, serif H2 and one-line lead,
// then a 0.6fr / 1fr grid: a featured news card (3:2 image, serif h5 title, grey summary, faded meta)
// and a rounded list of headline rows. Hovers: card and rows bg #131313 -> #1a1a1a (instant, as on
// the original). Rows are separated by a 1px rgba(245,246,246,.2) rule (≤767 also a #00251e top rule).

const DEFAULTS = {
  eyebrow: 'News',
  heading: 'Fresh news from Nimbus',
  lead: 'The latest updates from our product, people and partners.',
  featured: {
    title: 'Nimbus opens a new home in North America with a growing local team',
    text: 'Our new base in a fast-growing tech hub brings us closer to customers and partners across the region.',
    date: 'September 23, 2026',
    readTime: '3 mins to read',
    href: '#',
  },
  items: [
    { title: 'Speed matters most.', href: '#' },
    { title: 'The custom block: what it is, why it matters and how to use it', href: '#' },
    { title: 'Insights is out of beta. Here is what changed for every admin', href: '#' },
    { title: 'Northwind and Nimbus partner to bring smarter help to every employee on day one', href: '#' },
  ],
}

export default function CompanyNews({
  eyebrow = DEFAULTS.eyebrow,
  heading = DEFAULTS.heading,
  lead = DEFAULTS.lead,
  featured = DEFAULTS.featured,
  items = DEFAULTS.items,
}) {
  return (
    <section data-section="company-news">
      <div className="padding-global">
        <div className="pb-[7rem] pt-[2rem] tab:pb-[6rem] mob:pb-[4rem]">
          <div className="container-large">
            <div>
              <div className="leading-[1.1]">
                <Eyebrow className="[&>span:last-child]:leading-[1.1] mob:[&>span:last-child]:text-[1rem]">{eyebrow}</Eyebrow>
                <div className="mt-[1rem]">
                  <h2 className="heading-h2">{heading}</h2>
                </div>
                <div className="mt-[2.5rem] tab:mt-[1.5rem] mob:mt-[1.25rem]">
                  <p className="mb-[1.25rem] w-full max-w-[36rem] text-body leading-[1.1] xs:text-body-xs xs:leading-[1.1]">{lead}</p>
                </div>
              </div>
              <div className="mt-[5rem] tab:mt-[4rem] mob:mt-[3rem]">
                <div className="grid grid-cols-[0.6fr_1fr] gap-[1rem] mob:grid-cols-1">
                  <div className="flex w-full flex-col items-start justify-between gap-[1.25rem] rounded-panel bg-surface-2">
                    <a
                      href={featured.href}
                      className="block w-full rounded-panel bg-surface-2 p-[2rem] text-ink no-underline hover:bg-surface-3"
                    >
                      <div className="mb-[1.5rem]">
                        <div className="w-full overflow-hidden">
                          <Placeholder label="News image" src={featured.image} className="aspect-[3/2] w-full" />
                        </div>
                      </div>
                      <div className="mb-[1rem]">
                        <h3 className="mb-[1rem] font-serif text-[1.125rem] font-normal leading-[1.4] tracking-[0.03em] mob:text-[1.25rem] xs:mb-[0.125rem]">
                          {featured.title}
                        </h3>
                      </div>
                      <div className="mb-[1rem]">
                        <div className="text-[1rem] leading-[1.4] text-grey">{featured.text}</div>
                      </div>
                      <div className="flex items-center justify-start gap-[1rem] opacity-25">
                        <div className="text-small">{featured.date}</div>
                        <div className="text-small">{featured.readTime}</div>
                      </div>
                    </a>
                  </div>
                  <div className="flex w-full flex-col">
                    <div className="overflow-clip rounded-panel">
                      <div className="flex-1">
                        {items.map((it, i) => (
                          <div key={i} className="border-b border-[rgba(245,246,246,0.2)]">
                            <a
                              href={it.href}
                              className="block bg-surface-2 p-[2.5rem] text-[1.25rem] leading-[1.4] text-ink no-underline hover:bg-surface-3 tab:p-[2rem] mob:border-t mob:border-[#00251e] mob:p-[1.5rem] xs:p-[1rem]"
                            >
                              <div>{it.title}</div>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
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
