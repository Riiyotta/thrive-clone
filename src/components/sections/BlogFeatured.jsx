import Placeholder from '../shared/Placeholder.jsx'

// blog-featured (.section > .section_component > .section-split.border-bottom + .blog_featured-wrap +
// .event_subscribe-wrap) on /resources/blog-and-news, legacy "green" theme: page header (eyebrow, serif H1,
// lead), the featured post (0.8fr image | 1fr content; hover bg -> #001811, .26s) and a subscribe callout
// on #001811 with a static email form (no submission). Stacks ≤767; meta row reverses ≤479.
const THEME = { '--th-border': '#00251e', '--th-bg2': '#001811', '--th-eyebrow-border': '#01584b', '--th-brand': '#1ee9b6' }

export function Eyebrow({ children, className = '' }) {
  return (
    <div
      className={`mb-[0.75rem] inline-block rounded-[100vw] border border-[var(--th-eyebrow-border)] bg-[var(--th-bg2)] px-[0.75rem] py-[0.325rem] text-[0.875rem] font-medium leading-[1.4] text-ink tab:px-[0.625rem] tab:py-[0.425rem] tab:text-[0.725rem] xs:mb-[0.25rem] xs:leading-none ${className}`}
    >
      {children}
    </div>
  )
}

export function SubscribeCallout({
  heading = 'Get fresh learning ideas and product news sent straight to you',
  sub = 'Expert insight monthly.',
  placeholder = 'Enter your work email',
  button = 'Subscribe',
  headingWrapClass = 'max-w-[28rem]',
  subClass = 'text-small text-ink',
}) {
  return (
    <div className="border-b border-[var(--th-border)] bg-[var(--th-bg2)]">
      <div className="flex items-stretch justify-between border-t border-[var(--th-border)] px-[2.5rem] py-[3.75rem] tab:gap-[1rem] mob:flex-col mob:items-start mob:justify-between mob:gap-y-[2rem] mob:px-[1.5rem] mob:py-[2.5rem] xs:px-[1rem] xs:py-[1.75rem]">
        <div className="flex w-[60%] flex-col items-start justify-center gap-[1.5rem] mob:w-[80%] xs:w-full">
          <div className={`w-full ${headingWrapClass}`}>
            <h3 className="mb-[1rem] text-[1.75rem] font-normal leading-[1.15] xs:text-[2rem]">{heading}</h3>
            <div className="pt-[1rem]" />
            <div className={subClass}>{sub}</div>
          </div>
        </div>
        <div className="flex w-[30%] flex-row items-center justify-end gap-[0.75rem] tab:flex-1 mob:w-full mob:items-start mob:justify-start">
          <div className="mb-[15px] w-full">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-y-[0.5rem]">
              <input
                type="email"
                placeholder={placeholder}
                aria-label={placeholder}
                className="min-h-[2.75rem] w-full rounded-br-[6px] rounded-tl-[6px] border border-[#00322b] bg-[#fafefe] px-[1rem] py-[0.25rem] text-[1.125rem] text-[#333] outline-none placeholder:text-grey focus:border-[var(--th-brand)]"
              />
              <button type="submit" className="h-[2.75rem] w-full rounded-br-[8px] rounded-tl-[8px] bg-[var(--th-brand)] px-[0.86rem] text-[1.125rem] text-white">
                {button}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BlogFeatured({
  eyebrow = 'Blog & news',
  title = 'Fresh reads and updates',
  lead = 'Catch up on our newest pieces.',
  post = {
    title: 'Your next admin job could take seconds, not hours',
    text: 'How we turned Nova into a helper that handles routine admin for you, so platform owners can focus on work that moves learning forward.',
    author: 'Jordan Ellis',
    date: 'October 7, 2026',
    readTime: '6 mins to read',
    href: '#',
  },
  subscribe = {},
}) {
  return (
    <section data-section="blog-featured" style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="border-l border-r border-[var(--th-border)]">
            <div className="flex items-stretch justify-between border-b border-t border-[var(--th-border)] px-[2.5rem] py-[3.75rem] tab:gap-[1rem] mob:flex-col mob:items-start mob:gap-y-[2rem] mob:px-[1.5rem] mob:py-[2.5rem] xs:px-[1rem] xs:py-[1.75rem]">
              <div className="flex w-[60%] flex-col items-start justify-center gap-[1.5rem] mob:w-[80%] xs:w-full">
                <Eyebrow>{eyebrow}</Eyebrow>
                <h1 className="font-serif text-[3.8rem] font-normal leading-[1.15] text-ink xs:text-[2.5rem]">{title}</h1>
                <p className="mb-0 text-[1.25rem] leading-[1.4] text-ink xs:text-[1.125rem]">{lead}</p>
              </div>
            </div>
            <a
              href={post.href}
              className="grid grid-cols-[0.8fr_1fr] text-ink no-underline transition-[background-color] ease-[ease] duration-[260ms] hover:bg-[var(--th-bg2)] mob:grid-cols-1"
            >
              <Placeholder label="Featured post image" src={post.image} className="h-full w-full mob:aspect-[390/253]" />
              <div className="flex flex-col items-stretch justify-between gap-[4rem] px-[3.75rem] py-[3rem] tab:gap-y-[3rem] tab:p-[2rem] mob:px-[1.5rem] xs:gap-y-[2rem] xs:p-[1rem]">
                <div className="flex flex-col gap-[18px]">
                  <h2 className="mb-[1.25rem] mt-[0.25rem] text-[2rem] font-normal leading-[1.4] mob:text-[1.5rem]">{post.title}</h2>
                  <p className="mb-[1.25rem] text-[1rem] leading-[1.4] text-grey">{post.text}</p>
                </div>
                <div className="flex items-center justify-between gap-[1.5rem] tab:flex-col tab:items-start tab:gap-y-[0.5rem] mob:w-full xs:flex-col-reverse xs:gap-y-[1.5rem]">
                  <div className="flex items-start justify-start gap-[0.75rem]">
                    <div className="flex w-[3rem] items-center justify-start">
                      <Placeholder label="" src={post.avatar} className="aspect-square w-[3rem] rounded-br-[6px] rounded-tl-[6px]" />
                    </div>
                    <div>
                      <div className="text-small text-grey">Written by</div>
                      <div className="text-[1rem] font-semibold leading-[1.4]">{post.author}</div>
                    </div>
                  </div>
                  <div className="flex gap-[1rem] xs:mt-[0.5rem]">
                    <Eyebrow>{post.date}</Eyebrow>
                    <Eyebrow>{post.readTime}</Eyebrow>
                  </div>
                </div>
              </div>
            </a>
            <SubscribeCallout {...subscribe} />
          </div>
        </div>
      </div>
    </section>
  )
}
