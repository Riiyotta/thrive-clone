import Placeholder from '../shared/Placeholder.jsx'

// cs-content-article (.section > .section_component.blog_content-wrap), case-study-content template.
// Left 30% sticky sidebar: "In this article" TOC (built from the section headings), share links,
// CTA card on the dotted texture with a yellow pill button. Right 70%: rich text (18px body,
// 2.85rem headings, centred 60% figures, yellow-ruled blockquotes) and an inline quote card.
// ≤767 the sidebar moves below the article and the TOC is hidden.
// Hovers: share icons bg #232011 -> #301b08 (.24s); CTA button bg #eee96d -> #edcf00.
const THEME = {
  '--th-border': '#2d2919',
  '--th-bg2': '#232011',
  '--th-brand': '#eee96d',
  '--th-btn-hover': '#edcf00',
  '--th-border2': '#301b08',
}
const TEXTURE = 'bg-[radial-gradient(rgba(238,233,109,0.09)_1px,transparent_1.3px)] bg-[length:0.375rem_0.375rem]'

// Block types: { p }, { h2 } (a sub-heading inside a section), { figure: 'landscape'|'wide' }, { quote }, { spacer: true }.
// Paragraph text may contain **bold** and [[link]] spans.
const SHORT = [
  {
    title: 'Leading learning with campaigns',
    bold: true,
    blocks: [
      { spacer: true },
      { p: 'The human approach to learning design caught their attention, and the team liked that it supported how people actually learn at work. Knowing they had found the right fit, the learning team at Customer six removed their old content libraries and launched Nimbus content alongside a new platform. With current and relevant resources to hand, Customer six took a fresh, campaign-led approach to learning. They quickly mapped which titles would support their learning at work week, and released one module each week through their internal comms channel to get people learning and talking about it. Within a month, every team had joined in and shared ideas.' },
    ],
  },
  {
    title: 'Ready pathways and campaigns',
    bold: true,
    blocks: [
      { spacer: true },
      { p: 'Next, the ready-made pathways helped the team deliver a strong awareness month campaign with resources covering topics from being a good ally to understanding inclusive language. Alex Morgan, Learning Advisor at Customer six, said: “Getting content recommendations is something we did not expect from a provider. It has always been us going to suppliers, so it has been great to receive recommendations on content, campaigns and pathways. It is next level!” The team now plans every campaign this way, months ahead.' },
      { h2: 'What did learners say next?', bold: true },
      { spacer: true },
      { p: 'Across the board, the content has received **4 or 5 stars** from learners themselves, and the organisation has seen activity double from **500 logins to 1,000** since the new offering launched. The learning team now has plenty of plans to use the resources for upcoming initiatives, including live events and a people campaign focused on careers and growth.' },
    ],
  },
]

const LONG = [
  {
    title: 'The gift of time',
    blocks: [
      { p: 'With more than 30,000 colleagues spread across hundreds of locations, Customer seven needed learning that people could pick up in a spare moment and that never felt like a chore for anyone.' },
      { p: 'Just like the rest of the business, the design team wanted to give people more time back. Design manager **Sam Rivers** explained that the team was looking for **high-quality, ready-made content** that could sit alongside their own material, and they found it in [[Nimbus content]] with very little setup effort required.' },
      { h2: 'Content in the blink of an eye, every day' },
      { p: 'Bite-sized resources let people learn in under five minutes, between tasks and on any device they have to hand.' },
      { p: 'Short videos, quick reads and podcasts mean there is always something new that fits into a busy day.' },
      { p: 'Managers can share a resource in seconds, and teams talk about it together straight afterwards.' },
      { p: 'Mixed formats (the **variety** that keeps people coming back) are what make the library feel alive. Some people prefer watching, others prefer reading, and a few like to listen on the move. Offering every format means more people find something that works for them, and completion follows naturally from there. It also means the content team can test new ideas quickly and keep what lands best.' },
      { spacer: true },
      { figure: 'landscape' },
      { h2: 'A clear vision for belonging' },
      { p: 'Customer seven has always cared about inclusion, and the team wanted content that reflected every colleague. The library gave them a strong starting point, with fresh resources on allyship, inclusive language and wellbeing released every month for their people.' },
      { p: 'The fact that the library covers such a wide range of topics means the team no longer has to commission one-off pieces for every campaign. Instead, they curate collections from what is already there, add a short introduction from a leader, and launch within days. People respond well to that personal touch, and engagement stays high throughout each campaign window.' },
      { p: 'It has also changed how managers think about learning. Rather than waiting for a formal course, they share a relevant resource in their weekly huddle and let the conversation run. That small habit has built a culture where learning is part of the job, not something extra, and it has made the biggest difference of all to everyone involved.' },
      { figure: 'wide' },
      { spacer: true },
    ],
  },
  {
    title: 'Leaders who are truly invested in learning',
    blocks: [
      { p: 'The leadership team at Customer seven is fully invested in learning, and they lead by example. Senior leaders share their own favourite resources, comment on what their teams post, and talk about learning openly in town halls. That visible support has made it easy for everyone else to join in.' },
      { p: 'Since launching the new content, the team has seen steady growth in active learners every single month of the year.' },
      { p: 'Completion rates are up, and people are spending longer with the resources they choose for themselves.' },
      { p: 'Feedback from colleagues has been overwhelmingly positive, with many asking for even more new topics.' },
      { p: 'Managers report that conversations about growth now happen naturally in one-to-ones and team meetings.' },
      { spacer: true },
      { p: '' },
      { figure: 'landscape' },
      { h2: 'Seeing is believing' },
      { p: 'You only have to look at the numbers to see the difference. Activity has grown month after month, and people keep coming back for more.' },
      { p: 'In the words of **Sam Rivers**, **Design Manager within the Retail team:**' },
      { quote: '“We absolutely love working with the team. The content is fresh, relevant and easy to share, and our people have really taken to it. It has made a real difference to how we think about learning, and we are excited to see where it goes next for all of us here.”' },
      { p: 'Engagement has been brilliant from day one, and the team is already planning the next set of campaigns for later this year.' },
      { p: 'The partnership continues to grow, with new topics and formats added every quarter for colleagues across the whole business.' },
      { spacer: true },
    ],
  },
]

const PRESETS = {
  short: {
    sections: SHORT,
    quote: {
      text: '"It has always been us going to suppliers, so it has been great to get recommendations on content, campaigns and pathways from Nimbus. It is next level!"',
      name: 'Alex Morgan',
      role: 'Learning Advisor at Customer six',
    },
  },
  long: {
    sections: LONG,
    quote: {
      text: '"Working with the Nimbus team has been a real pleasure from the very start. They listen, they suggest ideas we would never have thought of, and they always deliver. Our people love the content, and our leaders love seeing the impact it has on engagement across the business every month. We could not ask for a better partner."',
      name: 'Sam Rivers',
      role: 'Design Manager within the Retail team',
    },
  },
}

function inline(text) {
  return text.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\])/).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>
    if (part.startsWith('[['))
      return (
        <a key={i} href="#" className="text-[var(--th-brand)] underline">
          {part.slice(2, -2)}
        </a>
      )
    return part
  })
}

const H2 = 'my-[1rem] text-[2.85rem] leading-[1.15] tracking-normal mob:text-[2rem]'

function Block({ b }) {
  if (b.spacer) return <p className="my-[1rem]">{'‍'}</p>
  if (b.p !== undefined) return <p className="my-[1rem]">{b.p ? inline(b.p) : '‍'}</p>
  if (b.h2) return <h2 className={`${H2} ${b.bold ? 'font-bold' : 'font-normal'}`}>{b.h2}</h2>
  if (b.figure)
    return (
      <figure className="mx-auto my-[2rem] w-fit max-w-[60%]">
        <Placeholder label="Article image" className={b.figure === 'wide' ? 'aspect-[1919/870] w-[28.7rem] max-w-full' : 'aspect-[3/2] w-[28.7rem] max-w-full'} />
      </figure>
    )
  if (b.quote)
    return (
      <blockquote className="my-[1.5rem] border-l-[0.25rem] border-[var(--th-brand)] px-[1.25rem] text-[1.25rem] leading-[1.5]">
        <em className="font-bold">{b.quote}</em>
      </blockquote>
    )
  return null
}

function ShareIcon({ kind }) {
  const d = {
    in: 'M5 9h3v10H5zM6.5 4.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM10 9h2.9v1.4c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19h-3v-4.8c0-1.2 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V19h-3z',
    x: 'M4 4h4.5l3.6 5 4.2-5H19l-5.6 6.6L20 20h-4.5l-4-5.5L6.8 20H4l6.3-7.4z',
    fb: 'M13.5 20v-7h2.4l.4-2.8h-2.8V8.4c0-.8.2-1.4 1.4-1.4h1.5V4.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.6 1.3-3.6 3.7v2.1H8.2V13h2.4v7z',
  }[kind]
  return (
    <svg viewBox="0 0 24 24" className="h-[24px] w-[24px]" aria-hidden>
      <path d={d} fill="currentColor" />
    </svg>
  )
}

export default function CsContentArticle({
  preset = 'short',
  sections = PRESETS[preset].sections,
  quote = PRESETS[preset].quote,
  tocLabel = 'In this article',
  shareLabel = 'Share',
  sidebarCta = {
    text: 'With more than 1,000 expertly made learning resources and six sector suites, Nimbus content is the choice for team growth.',
    label: 'Book a demo',
    href: '/lms/demo-platform',
  },
}) {
  return (
    <section data-section="cs-content-article" style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="border-l border-r border-[var(--th-border)]">
            <div className="relative flex mob:flex-col">
              {/* sidebar */}
              <div className="sticky top-0 flex w-[30%] flex-col items-start justify-start self-start border-b border-[var(--th-border)] mob:order-[9999] mob:w-full">
                <div className="flex flex-col items-start justify-start gap-y-[1.5rem] p-[2.5rem] tab:p-[1.5rem] mob:hidden">
                  <div className="text-[1rem] leading-[1.4] text-grey">{tocLabel}</div>
                  <div className="flex w-full flex-col items-start justify-start gap-[1.5rem]">
                    {sections.map((s, i) => (
                      <div key={i}>
                        <a href={`#article-${i + 1}`} className="text-body text-ink no-underline">
                          {s.title}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex w-full items-center justify-between border-t border-[var(--th-border)] px-[2.5rem] py-[2rem] text-[var(--th-brand)] tab:flex-col tab:items-start tab:gap-y-[1rem] tab:p-[1.5rem]">
                  <div className="text-body xs:text-body-xs">{shareLabel}</div>
                  <div className="flex items-center justify-start gap-[0.5rem]">
                    {['in', 'x', 'fb'].map((k) => (
                      <a
                        key={k}
                        href="#"
                        aria-label={`Share (${k})`}
                        className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-br-[8px] rounded-tl-[8px] border border-[var(--th-border)] bg-[var(--th-bg2)] text-[var(--th-brand)] transition-[background-color] duration-[240ms] hover:bg-[var(--th-border2)]"
                      >
                        <ShareIcon kind={k} />
                      </a>
                    ))}
                  </div>
                </div>
                <div className={`flex w-full flex-col items-start justify-start gap-y-[1rem] border-t border-[var(--th-border)] p-[2.5rem] text-ink tab:p-[1.5rem] ${TEXTURE}`}>
                  <div className="text-body xs:text-body-xs">{sidebarCta.text}</div>
                  <a
                    href={sidebarCta.href}
                    className="rounded-[200vw] border border-[var(--th-brand)] bg-[var(--th-brand)] px-[1.25rem] py-[0.75rem] text-center text-[0.9375rem] font-medium leading-none text-black no-underline transition-[border-radius] duration-300 ease-in-out hover:bg-[var(--th-btn-hover)] tab:px-[1rem] tab:py-[0.5rem] tab:text-[1rem] xs:block xs:self-stretch"
                  >
                    {sidebarCta.label}
                  </a>
                </div>
              </div>
              {/* article */}
              <div className="flex w-[70%] flex-col border-l border-[var(--th-border)] p-[3rem] tab:p-0 mob:w-full">
                <div className="p-[2.5rem] tab:p-[1.5rem] mob:p-[1.25rem]">
                  {sections.map((s, i) => (
                    <div key={i} id={`article-${i + 1}`}>
                      <div className="text-[18px] leading-[1.4] tracking-normal text-ink">
                        <h2 className={`${H2} !mt-0 ${s.bold ? 'font-bold' : 'font-normal'}`}>{s.title}</h2>
                        {s.blocks.map((b, j) => (
                          <Block key={j} b={b} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className={`flex w-full flex-col items-start justify-between gap-y-[1.5rem] border border-[var(--th-border)] p-[3.5rem] text-left text-ink tab:p-[2.5rem] mob:p-[1rem] ${TEXTURE}`}
                >
                  <div className="mb-[1rem] text-[1.5rem] leading-[1.4] mob:text-[1.25rem] xs:text-[1.125rem]">{quote.text}</div>
                  <div className="flex flex-col items-start justify-center gap-[1rem] self-stretch">
                    <div className="flex flex-col items-start justify-start gap-[0.5rem]">
                      <Placeholder label="" src={quote.avatar} className="h-[2.5rem] w-[2.5rem] rounded-br-[6px] rounded-tl-[6px]" />
                      <div className="text-body xs:text-body-xs">{quote.name}</div>
                      <div className="text-small text-grey">{quote.role}</div>
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
