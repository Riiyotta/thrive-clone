import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap.js'
import Button from '../shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from '../shared/Placeholder.jsx'

// `wowbento` (.section_wowbento): card grids under a split or centred header. Variants:
//  - "cards"     /lms/small-business (1st): H2 + side quote, 1.5fr/1fr row (rect + square) + 3 squares,
//                captions with white lead-in, centred demo button. IX2 "ThriveGo Cards".
//  - "cards-cta" /lms/small-business (2nd): H3 + paragraph + side quote, 2 rect cards with serif H4,
//                text and a dark-small button. IX2 "ThriveGo Cards".
//  - "release"   /lms/spring-release: H2 | paragraph + green pill button, rows of .wowcol_card
//                (wider = 150%) whose padded image block is offset by -39px (as on the original).
//  - "included"  /mentoring: centred 1-line H2, three .wowcol_card with 20px title + text.
//  - "why"       /company/why-nimbus: H2 + paragraph + dark button | quote card, two square images,
//                awards line + 4 award logos (homepage award assets), closing quote.
// IX2 "ThriveGo Cards" (scroll into view, offset 0): each .thrivecards_col starts opacity 0, y 3rem,
// blur(5px) and animates to rest over 500ms outQuart (power3.out). Cards already in view on load
// animate immediately. ("WowCard Imge Reveal" on spring/mentoring targets an element that is not
// inside those cards, so it has no visible effect on the original and is not reproduced.)

const H2 = 'heading-h2'
const H3 = 'mt-[0.25rem] flex font-serif text-[3.5rem] font-normal leading-[1.15] text-ink tab:text-[3rem] mob:text-[2.5rem] xs:text-[2rem]'

function SideQuote({ quote, name, role, org, className = '', small = true, link = false, quoteClass = '' }) {
  return (
    <div className={`rounded-card ${className}`}>
      <p className={`italic text-ink ${small ? 'text-[1rem] leading-[1.4rem]' : 'text-body xs:text-body-xs'} ${quoteClass}`}>{quote}</p>
      <div className="flex items-center gap-[1rem] text-left mob:w-full mob:flex-col mob:items-start">
        <div className="min-h-[2.5rem] w-[2.5rem] min-w-[2.5rem] overflow-clip border border-page">
          <Placeholder label="" tone={3} className="aspect-square w-full rounded-[2.5rem]" />
        </div>
        <div className="mob:mb-[1rem]">
          <div className={`font-semibold text-ink ${small ? 'text-small' : 'text-[1rem] leading-[1.4rem]'}`}>{name}</div>
          <div className={`text-ink ${small ? 'text-small' : 'text-[1rem] leading-[1.4rem]'}`}>
            {role}{' '}
            {link ? (
              <a href="#" className="inline-link">
                {org}
              </a>
            ) : (
              <strong className="font-bold">{org}</strong>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function useCardsReveal(enabled) {
  const root = useRef(null)
  useLayoutEffect(() => {
    if (!enabled) return
    const ctx = gsap.context(() => {
      root.current.querySelectorAll('[data-thrivecard]').forEach((el) => {
        gsap.set(el, { opacity: 0, y: '3rem', filter: 'blur(5px)' })
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          once: true,
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }),
        })
      })
    }, root)
    return () => ctx.revert()
  }, [enabled])
  return root
}

function Caption({ lead, text, link, after }) {
  return (
    <div className="w-full max-w-[28rem]">
      <p className="mb-[1.25rem] text-[1rem] leading-[1.4rem] text-grey">
        <span className="font-medium text-ink">{lead}</span> {text}{' '}
        {link && (
          <a href="#" className="inline-link">
            {link}
          </a>
        )}{' '}
        {after}
      </p>
    </div>
  )
}

const CARDS = [
  { lead: 'Smooth onboarding.', text: 'Get new starters contributing from day one with guided', link: 'onboarding journeys.', after: 'Nimbus Go replaces scattered induction packs with a system small teams can actually run.' },
  { lead: 'Compliance training.', text: 'Assign, track and evidence mandatory training for every employee automatically, then see it all in one place with', link: 'live reporting.', after: 'No spreadsheets, no chasing.' },
  { lead: 'Knowledge sharing.', text: 'Stop know-how walking out the door. Capture, organise and share what your team knows in one place, with', link: 'Nova', after: 'on hand to surface it the moment someone needs it.' },
  { lead: 'Skills growth.', text: 'Spot gaps, build skills and develop your people, whether or not you have a dedicated learning team. Our', link: 'skills toolkit', after: 'makes it simple to follow progress as it happens.' },
  { lead: 'Team updates.', text: 'No scattered group chats or email chains.', link: 'Chat', after: ', share news and connect your whole team in Spaces, keeping updates and company news all in one place.' },
]

function Cards({ cards = CARDS, button, cardGap = 'gap-[0.5rem]' }) {
  const [a, b, ...rest] = cards
  const col = (c, shape, i) => (
    <div key={i} data-thrivecard className={`flex h-full w-full flex-1 flex-col items-start justify-start ${cardGap} tab:min-h-[20rem]`}>
      <div className="w-full rounded-card xs:min-h-[20rem]">
        <Placeholder
          label="Product visual"
          tone={2}
          className={`w-full rounded-panel ${shape === 'rect' ? 'aspect-[6.71/4.14] min-h-[25rem]' : 'aspect-square'}`}
        />
      </div>
      <Caption {...c} />
    </div>
  )
  return (
    <>
      <div className="grid grid-cols-[1.5fr_1fr] gap-[1rem] mob:grid-cols-1 xs:gap-[3rem]">
        {col(a, 'rect', 0)}
        {col(b, 'square', 1)}
      </div>
      <div className="w-full pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]" />
      <div className="grid grid-cols-3 gap-[1rem] mob:grid-cols-1 xs:gap-[3rem]">{rest.map((c, i) => col(c, 'square', i + 2))}</div>
      {button && (
        <div className="flex flex-wrap items-center justify-center gap-[1.5rem] pt-[1.5rem] xs:gap-[2rem]">
          <Button variant="primary" href={button.href}>
            {button.label}
          </Button>
        </div>
      )}
    </>
  )
}

function WowCol({ card, wider }) {
  return (
    <div className={`flex flex-col items-start justify-start gap-[0.5rem] tab:min-h-[20rem] tab:w-full ${wider ? 'w-[150%]' : 'w-full'}`}>
      <div className="m-[-39px] flex h-full min-h-[25.875rem] w-full items-center justify-center overflow-clip rounded-card p-[30px] xs:min-h-[20rem]">
        <Placeholder label={card.media || 'Feature visual'} tone={2} className={`w-full ${card.contain ? 'aspect-[1440/960]' : card.mediaClassName || 'h-full min-h-[22rem]'}`} />
      </div>
      {/* optional per-card fields (all default off): spacer = the live empty block after the media (one extra
          0.5rem gap), mediaClassName replaces the media sizing, titleClassName replaces the medium title size */}
      {card.spacer && <div className="h-0 w-full" />}
      {card.title && (
        <div className="w-full max-w-[28rem]">
          {card.size === 'medium' ? (
            <div className="flex flex-col items-start justify-start gap-y-[0.75rem]">
              <p className={`mb-[1.25rem] ${card.titleClassName || 'text-[1.25rem]'} font-medium leading-[1.4] text-ink`}>{card.title}</p>
              <p className="mb-[1.25rem] text-[1rem] leading-[1.4rem] text-grey">{card.text}</p>
            </div>
          ) : (
            <>
              <p className="mb-[0.75rem] text-body font-bold text-ink xs:text-body-xs">{card.title}</p>
              <p className={`mb-[1.25rem] text-[1rem] leading-[1.4rem] text-grey ${card.bold ? 'font-bold' : ''}`}>{card.text}</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

const RELEASE_ROWS = [
  [
    { title: 'Self sign-up', text: 'A simpler way to bring new people in, with approval rules and custom welcome journeys.', bold: true, wider: true, contain: true },
    { title: 'Nimbus Insights', text: 'Dig deeper into your data with saved views, smart filters and scheduled exports.', bold: true, contain: true },
  ],
  [
    { title: 'Alerts and dashboards overview', text: 'Get a clear and concise summary of what needs attention across every team, with one-click follow-up actions.', contain: true },
    { title: 'Translations for 40 languages', text: 'Translate mixed content automatically, including quizzes.', wider: true, contain: true },
  ],
  [
    { title: 'Branded mobile app', text: 'Publish your own branded app to the stores in a few simple steps.', contain: true },
    { title: 'Nova assistant', text: 'Nova keeps getting smarter with new skills and new integrations.', contain: true },
  ],
]

const INCLUDED = [
  { title: 'Mentor packs', text: 'Guides, growth maps and conversation prompts ready for every mentoring pair.', size: 'medium', media: 'Programme visual' },
  { title: 'Mentee toolkits', text: 'Goal planners and reflection prompts that help mentees get the most out of each session.', size: 'medium', media: 'Programme visual' },
  { title: 'Programme dashboards', text: 'Track matches, sessions and goals so you can see the difference mentoring makes.', size: 'medium', media: 'Programme visual' },
]

export default function WowBento({ variant = 'cards', ...p }) {
  const root = useCardsReveal(variant === 'cards' || variant === 'cards-cta')
  return (
    <section data-section="wowbento" data-variant={variant} ref={root}>
      {(R[variant] || R.cards)(p)}
    </section>
  )
}

const R = {
  cards: ({
    title = 'The training platform that grows with your small business',
    quote = {
      quote: '“A genuinely clever platform that our people actually enjoy. Setup took days, not months, and every update makes it better again.”',
      name: 'Jordan Ellis',
      role: 'People Development Manager,',
      org: 'Northwind Trust',
    },
    cards = CARDS,
    button = { label: 'See Nimbus Go in action', href: '/lms/demo-platform' },
    // optional (defaults unchanged): quoteClass = side-quote paragraph spacing, cardGap = media-to-caption gap,
    // headerClassName = extra classes on the H2/quote row
    quoteClass = 'mb-[0.75rem]',
    cardGap,
    headerClassName = '',
  }) => (
    <div className="padding-global">
      <div className="container-medium">
        <div className="pb-[1rem] pt-[4rem]">
          <div className="container-large">
            <div className={`flex items-end justify-between gap-[3.75rem] tab:flex-col tab:items-start tab:gap-[2rem] ${headerClassName}`}>
              <div className="flex w-full max-w-[36rem] flex-col items-start justify-start gap-y-[1rem]">
                <h2 className={H2}>{title}</h2>
              </div>
              <div className="w-full max-w-[28rem]">
                <SideQuote {...quote} className="mt-[1rem] bg-transparent pl-[2rem] pr-[1rem] pt-[1rem]" quoteClass={quoteClass} />
              </div>
            </div>
            <div className="w-full pt-[5rem] tab:pt-[4rem] mob:pt-[3rem]" />
            <Cards cards={cards} cardGap={cardGap} />
          </div>
          {button && (
            <div className="flex flex-wrap items-center justify-center gap-[1.5rem] pt-[1.5rem] xs:gap-[2rem]">
              <Button variant="primary" href={button.href}>
                {button.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  ),

  'cards-cta': ({
    title = 'From first demo to launch in a few short weeks',
    paragraph = (
      <>
        Nimbus Go is the small business platform with guided{' '}
        <a href="#" className="inline-link">
          launches
        </a>
        , friendly experts on hand and a community that helps you get more from every feature, every single day.
      </>
    ),
    quote = {
      quote: '“This platform beats anything else we tried. Launch was painless, the team is brilliant and our people love the experience.”',
      name: 'Sam Rivera',
      role: 'Director of People,',
      org: 'Fabrikam',
    },
    cards = [
      { title: 'Quick-start setup', text: 'Sign up, configure and launch with a guided plan and expert help at every step.', cta: 'Book a short demo' },
      { title: 'Community help', text: 'Stay connected with a dedicated community of customers sharing ideas, templates and tips to get more from every single feature.', cta: 'Book a short demo' },
    ],
    // optional layout overrides (defaults unchanged): headerColClassName = left column width, headingClassName =
    // extra H3 classes, quoteClassName = extra side-quote classes, cardGap = gap inside each card,
    // mediaClassName = extra classes on each card's media wrapper
    headerColClassName = 'max-w-[36rem]',
    headingClassName = '',
    quoteClassName = '',
    cardGap = 'gap-[0.5rem]',
    mediaClassName = '',
    // cardTitleClassName = H4 size classes; ctaRowClassName = extra classes on each card's button row
    cardTitleClassName = 'text-[1.25rem]',
    ctaRowClassName = '',
  }) => (
    <div className="padding-global">
      <div className="container-medium">
        <div className="py-[5rem] tab:py-[4rem] mob:py-[3rem]">
          <div className="flex items-end justify-between gap-[3.75rem] tab:flex-col tab:items-start tab:gap-[2rem]">
            <div className={`flex w-full ${headerColClassName} flex-col items-start justify-start gap-y-[1rem]`}>
              <h3 className={`${H3} ${headingClassName}`}>{title}</h3>
              <p className="text-para text-grey">{paragraph}</p>
            </div>
            <SideQuote {...quote} className={`mt-[1rem] bg-transparent pl-[2rem] pr-[1rem] pt-[1rem] ${quoteClassName}`} />
          </div>
          <div className="w-full pt-[3rem] tab:pt-[2.5rem] mob:pt-[1.5rem]" />
          <div className="grid grid-cols-2 gap-[1rem] mob:grid-cols-1 xs:gap-[3rem]">
            {cards.map((c, i) => (
              <div key={i} data-thrivecard className={`flex h-full w-full flex-1 flex-col items-start justify-start ${cardGap} tab:min-h-[20rem]`}>
                <div className={`w-full rounded-card xs:min-h-[20rem] ${mediaClassName}`}>
                  <Placeholder label="Team photo" tone={2} className="aspect-[6.71/4.14] min-h-[25rem] w-full rounded-panel" />
                </div>
                <div className="w-full max-w-[28rem]">
                  <h4 className={`mb-[0.5rem] font-serif ${cardTitleClassName} font-normal leading-[1.15] text-ink`}>{c.title}</h4>
                  <div className="w-full pt-[0.25rem]" />
                  <p className="mb-[1.25rem] text-[1rem] leading-[1.4rem] text-grey">{c.text}</p>
                </div>
                <div className={`flex flex-wrap items-center justify-start gap-[1.5rem] xs:gap-[2rem] ${ctaRowClassName}`}>
                  <Button variant="dark-small" href="/lms/demo-platform">
                    {c.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),

  release: ({
    title = 'Catch up on our latest update',
    paragraph = (
      <>
        We are always shipping. Missed the{' '}
        <a href="#" className="inline-link">
          Summer Update
        </a>
        ? Catch up on every new feature, improvement and fix from the last release in one place.
      </>
    ),
    cta = { label: 'Find out more', href: '#' },
    rows = RELEASE_ROWS,
  }) => (
    <div className="padding-global">
      <div className="container-medium">
        <div className="py-[5rem] mob:py-[3rem]">
          <div className="container-large">
            <div className="flex items-stretch justify-between gap-[3.75rem] tab:flex-col tab:items-start tab:gap-[2rem]">
              <div className="flex w-full max-w-[36rem] flex-col items-start justify-start gap-y-[1rem]">
                <h2 className={H2}>{title}</h2>
              </div>
              <div className="w-full max-w-[36rem]">
                <p className="mb-[1.25rem] text-para text-grey">{paragraph}</p>
                <a
                  href={cta.href}
                  className="inline-block rounded-pill border border-solid border-[#1ee9b6] bg-[#1ee9b6] px-[1.25rem] py-[0.75rem] text-center text-[1.125rem] font-medium leading-none text-[#000a06] transition-[border-radius,background-color] duration-300 ease-in-out hover:bg-green-hover"
                >
                  {cta.label}
                </a>
              </div>
            </div>
            <div className="w-full pt-[5rem] tab:pt-[4rem] mob:pt-[3rem]" />
            {rows.map((row, i) => (
              <div key={i}>
                {i === 1 && <div className="w-full pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]" />}
                <div className="flex gap-[1rem] tab:flex-col">
                  {row.map((c, j) => (
                    <WowCol key={j} card={c} wider={c.wider} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),

  included: ({ title = 'What comes included?', cards = INCLUDED }) => (
    <div className="padding-global">
      <div className="container-medium">
        <div className="py-[5rem] mob:py-[3rem]">
          <div className="container-large">
            <div className="flex flex-col items-center justify-start text-center">
              <div className="w-full max-w-[36rem]">
                <h2 className={H2}>{title}</h2>
              </div>
            </div>
            <div className="w-full pt-[5rem] tab:pt-[4rem] mob:pt-[3rem]" />
            <div className="flex gap-[1rem] tab:flex-col">
              {cards.map((c, i) => (
                <WowCol key={i} card={c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  why: ({
    title = 'Built hand in hand with the people who use it',
    paragraph = 'Nimbus is shaped by the teams who use it every day. Customer councils, open roadmaps and regular feedback sessions mean every release solves a real problem for real people.',
    button = { label: 'Book a demo', href: '/lms/demo-platform' },
    quote = {
      quote: '“One of the things that sets Nimbus apart is how closely they listen. Our ideas show up in the product, and the team treats us like partners rather than customers.”',
      name: 'Jordan Ellis',
      role: 'Learning and Development Lead,',
      org: 'Northwind Hotels',
    },
    caption = 'We don’t just hand you a platform. We build it with you, listen to your feedback and keep improving it together.',
    awardsText = 'Nimbus is recognised by leading industry awards for innovation, employee experience and the quality of our customer partnerships worldwide.',
    awards = ['award-1.svg', 'award-2.svg', 'award-3.svg', 'award-4.svg'],
    closing = {
      quote: '“We’ve had people telling us this is the best learning experience they have ever had at work. That says it all about how much effort goes into making Nimbus feel this good.”',
      name: 'Sam Rivera',
      role: 'Learning & Development Manager,',
      org: 'Contoso',
    },
  }) => (
    <div className="padding-global">
      <div className="py-[5rem] mob:py-[3rem]">
        <div className="container-medium">
          <div className="flex items-end justify-between gap-[3.75rem] tab:flex-col tab:items-start tab:gap-[2rem] mob:gap-[1.5rem]">
            <div className="flex w-full max-w-[36rem] flex-col items-start justify-start gap-y-[1rem]">
              <h2 className={`${H2} mb-[1rem]`}>{title}</h2>
              <p className="mb-[1.25rem] max-w-[500px] text-para text-grey">{paragraph}</p>
              <Button variant="dark" href={button.href}>
                {button.label}
              </Button>
            </div>
            <SideQuote {...quote} small={false} link className="mb-[1rem] mt-[0.5rem] bg-page p-[1rem]" quoteClass="mb-[0.75rem]" />
          </div>
          <div className="w-full pt-[5rem] tab:pt-[4rem] mob:pt-[3rem]" />
          <div className="flex items-end justify-between gap-[3.75rem] tab:flex-col tab:items-start tab:gap-[2rem] mob:gap-[1.5rem]">
            <div className="w-full max-w-[36rem]">
              <div className="overflow-clip rounded-card bg-surface-1 tab:min-h-[20rem]">
                <Placeholder label="Event photo" tone={2} className="aspect-square w-full" />
              </div>
            </div>
            <div className="w-full max-w-[36rem]">
              <div className="overflow-clip rounded-card bg-surface-1 tab:min-h-[20rem]">
                <Placeholder label="Team photo" tone={2} className="aspect-square w-full" />
              </div>
              <div className="w-full pt-[1rem]" />
              <p className="mb-[1.25rem] text-[1.25rem] leading-[1.4] text-ink mob:text-[1.125rem]">{caption}</p>
            </div>
          </div>
          <div className="mt-[2rem] flex w-full max-w-[64rem] flex-col items-center justify-start">
            <p className="mb-[1.25rem] max-w-[1000px] pl-[2rem] text-center text-body text-grey xs:text-body-xs">{awardsText}</p>
            <div className="flex w-full flex-col items-center justify-start gap-y-[1rem]">
              <div className="flex max-w-[60rem] items-center justify-between gap-[3rem] tab:flex-wrap tab:justify-center tab:gap-y-[2rem] mob:justify-around xs:gap-[2rem]">
                {awards.map((f, i) => (
                  <div key={i} className="flex w-[7rem] items-center justify-center overflow-clip">
                    <LogoPlaceholder src={`/assets/${f}`} alt="Award" className="h-[4rem] w-[5rem]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-[1rem] mt-[2rem] flex max-w-[60rem] flex-col items-center justify-center gap-y-[1rem]">
        <p className="mb-[1.25rem] flex justify-start text-[2rem] font-medium leading-[1.2] text-ink tab:text-[1.75rem] mob:text-[1.5rem]">{closing.quote}</p>
        <div className="flex flex-col items-center justify-center gap-[0.75rem]">
          <div className="flex w-[3rem] items-center justify-start">
            <Placeholder
              label=""
              tone={3}
              className="aspect-square h-[3rem] w-[3rem] min-w-[3rem] rounded-none rounded-br-[6px] rounded-tl-[6px] wide:rounded-[100px] xs:h-[2.5rem] xs:w-[2.5rem] xs:min-w-[2.5rem]"
            />
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-para text-ink xs:text-body-xs">{closing.name}</div>
            <div className="text-body text-grey mob:text-small">
              {closing.role}{' '}
              <a href="#" className="inline-link">
                {closing.org}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}
