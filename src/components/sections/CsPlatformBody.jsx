import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Button from '../shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from '../shared/Placeholder.jsx'
import { gsap, SplitText } from '../../lib/gsap.js'

// cs-platform-body (.section_wowcstemp), case-study-platform template (/case-study/*).
// Hero (logo + H1 over a radial-masked image, play link) -> 4 info cards -> sticky TOC sidebar + article
// (rich-text sections with optional 16:9 inline images) -> testimonial -> video block -> CTA.
// Motion: TOC links bg/colour .2s (hover + scroll-spy .is-active); CTA (ScrollTrigger `cta_blocl`,
// start clamp(top 90%), end clamp(bottom 60%), scrub .8): heading chars #00030a -> #fff, then the
// button block rises from y 100% / opacity 0.

const DEFAULTS = {
  logo: 'Customer one',
  title: 'How Customer one grew product sales by 14% worldwide',
  videoHref: '#',
  image: null,
  cards: [
    { type: 'stat', label: 'Learners using Nimbus', value: '150,000' },
    { type: 'tags', label: 'Challenges addressed with Nimbus', tags: ['Sales enablement', 'Customer service training', 'Product knowledge', 'Social learning'] },
    { type: 'integrations', label: 'Integrations used', tags: ['Workday', 'Outlook', 'OneDrive', 'Microsoft Teams', 'LinkedIn Learning'] },
    { type: 'stat', label: 'Increased product sales by', value: '14%', link: { label: 'See how →', href: '#cs-section-3' } },
  ],
  tocLabel: 'In this case study',
  sections: [
    {
      title: 'From first steps to bold results',
      paragraphs: [
        'Customer one knows that great learning starts with people who feel ready, and its field teams needed one place to build [[product confidence]]. The rollout put [[engagement]] first, with [[sales enablement]] and [[product knowledge]] close behind, so every rep could quickly find what mattered to them each day.',
        'To understand how people were really learning, the team looked closely at [[platform engagement]] across every region and role. They found that short, social formats travelled fastest, and that peers sharing tips sparked more activity than any announcement ever could. That insight shaped the next phase of the programme and the content plan that followed it. It showed where support was needed most.',
      ],
      image: true,
    },
    {
      title: 'Making learning simple',
      paragraphs: [
        'Building on that early success, the team leaned into [[user-generated content]] so the best sellers could share what worked in their own words. Short clips, quick tips and product walk-throughs began to circulate across regions, and managers noticed the conversations they started in team meetings and across the wider community every single week of the year. It became the most popular part of the platform within a few months.',
        'This was not a typical corporate rollout. [[Campaigns]] gave every month a clear theme, while [[analytics]] showed which topics landed and where to focus next. The team could respond in days rather than quarters, keeping content fresh and relevant for thousands of busy people in the field and making every launch feel like an event. Results followed close behind each new campaign.',
      ],
      image: true,
    },
    {
      title: 'Confidence that converts',
      paragraphs: [
        'The impact showed up quickly. Representatives who completed [[product knowledge]] modules sold more of the featured range, and [[structured pathways]] helped new starters ramp faster than ever before. Leaders could finally see the link between learning activity and real results in one place, and regional teams began asking for their own programmes to follow the same model. Momentum keeps on growing.',
        'Customer one is now taking the same approach into new markets, with a wider programme planned for the next year that brings in more teams, more languages and more ways to learn together.',
      ],
      image: false,
    },
  ],
  testimonialLabel: 'Testimonial',
  testimonial: {
    quote: '"The results show what focus and teamwork can achieve with Nimbus. The platform gave us the connection we needed to go beyond our targets. We beat them and then kept the momentum going strong."',
    name: 'Jordan Ellis',
    role: 'Global Sales Training Manager, Customer one',
  },
  sidebarCta: { text: 'See why 500+ companies have made the switch to Nimbus.', label: 'Book a demo →', href: '/lms/demo-platform' },
  video: {
    title: 'See how Customer one launched to a million reps in eight weeks',
    caption: 'Customer one shares how it launched to over a million reps worldwide in just eight weeks, and why Nimbus was the right global platform for direct sales teams.',
  },
  cta: { title: 'What could you achieve with Nimbus?', label: 'Book a demo', href: '/lms/demo-platform' },
}

// Paragraph copy may mark inline links as [[text]] (underlined white links, as in the original rich text).
function rich(text) {
  return text.split(/(\[\[[^\]]+\]\])/).map((part, i) =>
    part.startsWith('[[') ? (
      <a key={i} href="#" className="text-ink underline">
        {part.slice(2, -2)}
      </a>
    ) : (
      part
    ),
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <circle cx="32" cy="32" r="30.5" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M26 20.5v23l18-11.5z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  )
}

function InfoCard({ card }) {
  return (
    <div className="h-auto w-full rounded-card bg-surface-1 px-[2rem] pb-[4rem] pt-[2rem] tab:h-[15rem] mob:p-[1.5rem] xs:h-auto">
      <div
        className={`flex h-full flex-col items-start justify-between gap-y-[4rem] xs:gap-y-[2rem] ${card.link ? 'mb-[1rem]' : ''}`}
      >
        <p className="text-small text-grey">{card.label}</p>
        {card.type === 'stat' && (
          <div className="mt-[2rem] text-[3rem] font-semibold leading-none">{card.value}</div>
        )}
        {card.type === 'tags' && (
          <div className="flex flex-wrap gap-[0.5rem]">
            {card.tags.map((t) => (
              <div key={t} className="rounded-media bg-surface-3 px-[0.75rem] py-[0.5rem] text-[0.95rem] leading-[1.4]">
                {t}
              </div>
            ))}
          </div>
        )}
        {card.type === 'integrations' && (
          <div className="flex flex-wrap gap-[0.5rem]">
            {card.tags.map((t) => (
              <a
                key={t}
                href="#"
                className="flex items-center gap-[0.75rem] rounded-media bg-surface-3 px-[0.75rem] py-[0.5rem] text-[1rem] leading-none text-ink no-underline"
              >
                {t}
              </a>
            ))}
          </div>
        )}
        {card.link && (
          <a href={card.link.href} className="text-small text-ink underline">
            {card.link.label}
          </a>
        )}
      </div>
    </div>
  )
}

export default function CsPlatformBody({
  logo = DEFAULTS.logo,
  title = DEFAULTS.title,
  videoHref = DEFAULTS.videoHref,
  image = DEFAULTS.image,
  cards = DEFAULTS.cards,
  tocLabel = DEFAULTS.tocLabel,
  sections = DEFAULTS.sections,
  testimonialLabel = DEFAULTS.testimonialLabel,
  testimonial = DEFAULTS.testimonial,
  sidebarCta = DEFAULTS.sidebarCta,
  video = DEFAULTS.video,
  cta = DEFAULTS.cta,
  // logoSizeClassName (optional): replaces the logo slot's size classes (e.g. a tall square logo pushes the
  // H1 down on the live page); default keeps h-[2.3rem] w-[10rem] tab:w-[6rem].
  logoSizeClassName = 'h-[2.3rem] w-[10rem] tab:w-[6rem]',
  // inlineImageClassName (optional): classes of the in-article images. The default's aspect-video gives the
  // 26rem-tall slot a 46rem min-content width, which stops the column shrinking at tablet widths; the
  // case-study pages pass the same classes without it.
  inlineImageClassName = 'mb-[3rem] mt-[1rem] inline-flex aspect-video h-[26rem] w-full max-w-full rounded-panel align-top',
}) {
  const ids = [...sections.map((_, i) => `cs-section-${i + 1}`), 'cs-testimonial']
  const [active, setActive] = useState(0)
  const ctaRef = useRef(null)

  // Scroll-spy for the TOC (.is-active): last anchor whose top passed 40% of the viewport.
  useEffect(() => {
    const onScroll = () => {
      let idx = 0
      ids.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) idx = i
      })
      setActive(idx)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids.join('|')])

  useLayoutEffect(() => {
    const root = ctaRef.current
    const ctx = gsap.context(() => {
      const h2 = root.querySelector('[data-cta-heading]')
      const split = SplitText.create(h2, { type: 'words,chars', wordsClass: 'gsap_split_word', charsClass: 'gsap_split_letter' })
      gsap.set([...split.words, ...split.chars], { position: 'relative', display: 'inline-block' })
      gsap.set(split.chars, { color: '#00030a' })
      gsap
        .timeline({ scrollTrigger: { trigger: root, start: 'clamp(top 90%)', end: 'clamp(bottom 60%)', scrub: 0.8 } })
        .to(split.chars, { color: '#ffffff', duration: 0.25, stagger: { amount: 0.5 }, ease: 'none' }, 0)
        .fromTo('[data-cta-button]', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'none' }, 0.65)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section data-section="cs-platform-body" className="flex flex-col justify-center">
      <div className="padding-global">
        <div className="container-medium">
          <div className="py-[5rem] tab:py-[4rem] mob:py-[3rem]">
            {/* hero */}
            <div className="relative flex flex-row items-end justify-between gap-y-[4.375rem] mob:gap-x-[2rem] xs:flex-col">
              <div className="relative z-[1] flex min-h-[60vh] flex-col items-start justify-between ultra:min-h-[40vh] tab:min-h-[50vh] xs:min-h-[40vh]">
                <LogoPlaceholder text={logo} className={`${logoSizeClassName} justify-start text-[1.1rem] text-ink tab:text-[0.7rem]`} />
                <div className="w-full pt-[12rem] tab:pt-[8rem] mob:pt-[4.5rem]" />
                <div className="w-full max-w-[47rem]">
                  <h1 className="font-serif text-[3.8rem] font-normal leading-[1.15] xs:text-[2.5rem]">{title}</h1>
                </div>
              </div>
              <a
                href={videoHref}
                aria-label="Play video"
                className="relative z-[1] mb-[15px] mt-[-10px] flex w-[4rem] min-w-[4rem] justify-end text-ink mob:mb-[8px]"
              >
                <span className="block aspect-square w-[4rem]">
                  <PlayIcon />
                </span>
              </a>
              <Placeholder
                label="Case study hero image"
                src={image || undefined}
                tone={2}
                className="absolute left-0 top-0 z-0 ml-[-10rem] h-full w-full [mask-image:radial-gradient(rgb(0,0,0)_0%,rgba(0,0,0,0)_65%)] tab:ml-[-5rem] xs:ml-0"
              />
            </div>
            <div className="pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]" />
            {/* info cards */}
            <div className="grid grid-cols-4 gap-[1rem] tab:grid-cols-1">
              {cards.map((c, i) => (
                <InfoCard key={i} card={c} />
              ))}
            </div>
            <div className="pt-[6rem] tab:pt-[5rem] mob:pt-[3.5rem]" />
            {/* sidebar + article */}
            <div className="relative flex gap-[3rem] mob:flex-col">
              <div className="w-[24rem] max-w-full mob:w-full xs:hidden">
                <div className="sticky top-[6rem] flex flex-col items-start justify-start gap-y-[0.5rem]">
                  <div className="text-[0.75rem] leading-[1.4] text-grey">
                    <strong className="font-bold">{tocLabel}</strong>
                  </div>
                  <div className="flex w-full flex-col items-start gap-[0.5rem] mob:flex-row mob:overflow-auto">
                    {sections.map((s, i) => (
                      <a
                        key={i}
                        href={`#${ids[i]}`}
                        data-active={active === i}
                        className={`block w-full overflow-auto rounded-media p-[1rem] text-[1rem] leading-[1.4] no-underline transition-[background-color,color] duration-200 hover:bg-surface-3 hover:text-ink ${
                          active === i ? 'bg-surface-3 text-white' : 'bg-page text-grey'
                        }`}
                      >
                        {s.title}
                      </a>
                    ))}
                  </div>
                  <a
                    href="#cs-testimonial"
                    data-active={active === sections.length}
                    className={`block w-full rounded-media p-[1rem] text-[1rem] leading-[1.4] no-underline transition-[background-color,color] duration-200 hover:bg-surface-3 hover:text-ink ${
                      active === sections.length ? 'bg-surface-3 text-white' : 'text-grey'
                    }`}
                  >
                    {testimonialLabel}
                  </a>
                  <div className="w-full pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]" />
                  <div className="flex w-full flex-col items-start justify-start gap-y-[1.5rem] rounded-media p-[1rem] text-[1rem] leading-[1.4]">
                    <p className="mb-[1.25rem] text-[1rem] leading-[1.4]">{sidebarCta.text}</p>
                    <Button
                      href={sidebarCta.href}
                      variant="primary"
                      stretch={false}
                      className="!bg-green-hover !px-[1rem] !py-[0.5rem] hover:!bg-white"
                    >
                      {sidebarCta.label}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full">
                  {sections.map((s, i) => (
                    <div key={i}>
                      <div id={ids[i]} className="scroll-mt-[6rem]">
                        <h2 className="mb-[1.25rem] text-[2.85rem] font-normal leading-[1.15] mob:text-[2rem]">{s.title}</h2>
                        {s.paragraphs.map((p, j) => (
                          <p key={j} className="mb-[1.25rem] text-body last:mb-0 xs:text-body-xs">
                            {rich(p)}
                          </p>
                        ))}
                      </div>
                      {s.image && (
                        <Placeholder
                          label="Inline image"
                          src={typeof s.image === 'string' ? s.image : undefined}
                          className={inlineImageClassName}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div
                  id="cs-testimonial"
                  className="my-[2rem] flex w-full scroll-mt-[6rem] flex-col items-start justify-start gap-y-[3.75rem] overflow-clip rounded-card bg-[rgba(11,11,11,0.01)] p-[2rem] mob:p-[1.5rem] xs:pb-0"
                >
                  <div className="flex max-w-[60rem] flex-col items-center justify-center gap-y-[2rem]">
                    <p className="mb-[1.25rem] text-quote font-medium tab:text-quote-tab mob:text-quote-mob">{testimonial.quote}</p>
                    <div className="flex items-center justify-start gap-[0.75rem]">
                      <div className="flex w-[3rem] items-center justify-start">
                        <Placeholder label="" src={testimonial.avatar} className="aspect-square w-[3rem] rounded-full" />
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <div className="wide:text-[1.15rem] wide:leading-[1.4]">{testimonial.name}</div>
                        <div className="text-grey mob:text-[0.875rem] mob:leading-[1.4]">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="mt-[2rem] flex max-w-[100rem] flex-col justify-center font-serif text-h2 font-normal mob:text-h2-mob xs:text-h2-xs">
                    {video.title}
                  </h2>
                  <Placeholder label="Video embed" className="relative mt-[20px] aspect-[854/480] w-full rounded-panel" />
                  <div className="mt-[4px] flex max-w-[80rem] items-center justify-center pl-[2rem] text-[16px] leading-[1.4] text-grey">
                    {video.caption}
                  </div>
                </div>
              </div>
            </div>
            {/* CTA */}
            <div className="padding-global">
              <div ref={ctaRef} data-cta-block>
                <div className="mx-auto w-full max-w-[72rem] text-center mob:px-[1.5rem] xs:px-[1rem]">
                  <div className="mt-[8rem] tab:mt-[6rem] mob:mt-[4rem]">
                    <h2 data-cta-heading className="font-serif text-h2 font-normal mob:text-h2-mob xs:text-h2-xs">
                      {cta.title}
                    </h2>
                  </div>
                  <div className="mt-[1rem]">
                    <div data-cta-button className="flex items-center justify-center gap-[1rem] xs:flex-col">
                      <Button href={cta.href}>{cta.label}</Button>
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
