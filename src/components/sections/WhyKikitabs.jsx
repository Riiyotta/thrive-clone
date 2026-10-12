import { useState } from 'react'
import Button from '../shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from '../shared/Placeholder.jsx'
import useLoopCarousel from '../../hooks/useLoopCarousel.js'

// why-kikitabs (.section_kikitabs) on /company/why-nimbus (fixed 16px root). Four stacked blocks:
//  1. Header: balanced serif H2 with an italic phrase, grey intro, primary button.
//  2. Autotabs (.section_wowautotabs): 5 tab buttons + loop slider (Swiper is-wowautotabs: spv 1,
//     spaceBetween 24, loop, speed 800, no autoplay; tab click = slideToLoop) — via useLoopCarousel.
//  3. Split header (H2 + italic quote card) and split-layout tabs (.wowtabs_wrapper: click tabs,
//     pane/child fade opacity + visibility .3s, green chip on the current tab).
//  4. Results header, 4 result cards, centred quote with stacked author, primary CTA.
// The header's .margin-top.margin-huge (4rem) collapses out of the section, so the root carries mt 4rem.

const D = {
  heading: { before: 'The assistant your team keeps ', em: 'asking for', after: '' },
  intro:
    'Flexible, adaptable and built around how your people already work, Nova answers questions, finds the right resource and nudges every learner forward, so managers spend far less time chasing updates and whole teams spend more time actually learning together every week.',
  headerButton: { label: 'Meet Nova →', href: '/nova' },
  slides: [
    { tab: 'Guide', highlight: 'Coaching that really grows people.', subdued: 'Guidance in the flow of work, with prompts, check-ins and honest feedback that adapt to each person, so growth keeps moving even when managers are busy with everything else on their plate.' },
    { tab: 'Builder', highlight: 'Great content, ready in minutes.', subdued: 'An extra designer on the team, turning rough notes, long documents and half-formed ideas into polished learning that people actually want to finish this week.' },
    { tab: 'Analyst', highlight: 'Skip the dashboards and just ask the question.', subdued: 'Nova spots gaps, trends and risks across your learning data, then explains what it found in plain words anyone can act on.' },
    { tab: 'Admin', highlight: 'Housekeeping that quietly happens in the background.', subdued: 'Tidy old content, fix broken links and keep every pathway current, so your platform stays fresh without hours of manual clean-up each month. Everything stays neat and current.' },
    { tab: 'Assistant', highlight: 'One place for every answer.', subdued: 'Nova searches across your courses, documents, people and conversations at once, then gives a clear answer with links to the source, so nobody has to dig through folders or wait for a reply before getting on.' },
  ],
  splitHeading: 'Where team learning goes next',
  quote: {
    text: '“We needed a platform that could grow with us and keep our people engaged from day one. Nimbus gave us that and more, with a team that listens closely and a product that keeps improving.”',
    name: 'Casey Morgan',
    role: 'Chief Product and Marketing Officer,',
    org: 'Northwind',
  },
  tabs: [
    { label: 'Hub', copy: 'Bring your tools together in one place, so people find learning, news and help without switching between apps all day long or losing track of what matters.', cta: 'Book a demo' },
    { label: 'Mentors', copy: 'Give every team its own space to share updates, celebrate wins and learn from each other in the open.', cta: 'Book a demo' },
    { label: 'Spaces', copy: 'See the skills your people have today and the ones they need next, then build pathways that close the gap.', cta: 'Book a demo' },
    { label: 'People Search', copy: 'Turn activity into answers with reports that show what is working and where to focus your effort next.', cta: 'Book a demo' },
  ],
  results: {
    heading: { before: 'What could your people ', em: 'achieve?' },
    lead: 'Real outcomes from real teams who chose Nimbus to power their learning every day.',
    cards: [
      { stat: '1.5x', brand: 'Customer one', rest: 'faster onboarding for new starters at' },
      { stat: '8.2%', brand: 'Customer two', rest: 'increase in sales for', after: 'after launching new product learning' },
      { stat: '50%', brand: 'Customer three', rest: 'less time spent on admin at', after: 'this year' },
      { stat: '150%', brand: 'Customer four', rest: 'more active learners at' },
    ],
  },
  bigQuote: {
    text: '“What really stood out was how quickly people took to it. Within weeks our teams were sharing, learning and helping each other in ways we had always hoped for but never quite managed before, and the results followed.”',
    name: 'Jordan Ellis',
    role: 'Operational Learning and Development at',
    org: 'Northwind Building Group',
  },
  cta: { label: 'Book a demo today →', href: '/lms/demo-platform' },
}

export default function WhyKikitabs({
  heading = D.heading,
  intro = D.intro,
  headerButton = D.headerButton,
  slides = D.slides,
  splitHeading = D.splitHeading,
  quote = D.quote,
  tabs = D.tabs,
  results = D.results,
  bigQuote = D.bigQuote,
  cta = D.cta,
}) {
  const N = slides.length
  const c = useLoopCarousel(N, { threshold: 5 })
  const all = [...slides, ...slides, ...slides]
  const [tab, setTab] = useState(0)

  return (
    <div data-section="why-kikitabs" className="mt-[4rem] overflow-x-clip">
      {/* 1 + 2: header and autotabs */}
      <div className="padding-global">
        <div>
          <div className="padding-global">
            <div className="container-medium">
              <div className="flex flex-col items-start justify-center">
                <div className="mb-[1.5rem] flex items-center justify-center">
                  <div className="w-full max-w-[100rem] [text-wrap:balance]">
                    <h2 className="heading-h2 max-w-[39.6rem]">
                      {heading.before}
                      <em className="italic">{heading.em}</em>
                      {heading.after}
                    </h2>
                  </div>
                </div>
                <div className="w-full max-w-[50rem]">
                  <p className="mb-[1.25rem] flex flex-col items-center justify-center text-para text-grey">{intro}</p>
                </div>
                <div className="flex items-center justify-center gap-[1rem] xs:flex-col">
                  <Button href={headerButton.href} stretch={false}>
                    {headerButton.label}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden py-[3rem]">
            <div className="padding-global">
              <div className="container-large">
                <div className="container-medium">
                  <div className="flex flex-col gap-y-[0.5rem]">
                    <div role="tablist" className="flex gap-[0.75rem] mob:flex-wrap mob:justify-start mob:overflow-auto">
                      {slides.map((s, i) => (
                        <button
                          key={s.tab}
                          type="button"
                          role="tab"
                          aria-selected={i === c.real}
                          onClick={() => c.goTo(i)}
                          className={`relative flex h-[4.75rem] w-full items-center justify-center overflow-hidden rounded-card p-[8px] text-center text-kikitab text-ink tab:text-[1rem] mob:h-[3.5rem] mob:w-[200px] mob:min-w-[200px] mob:text-kikitab-xs xs:w-auto xs:min-w-[150px] xs:flex-1 xs:basis-full ${
                            i === c.real ? 'bg-surface-3' : 'bg-surface-1'
                          }`}
                        >
                          <span className="relative z-[1] flex">{s.tab}</span>
                        </button>
                      ))}
                    </div>
                    <div className="w-full overflow-clip">
                      <div
                        {...c.trackProps}
                        className={`flex gap-[1.5rem] ${c.animate ? 'transition-transform duration-[800ms] ease-[ease]' : ''}`}
                        style={{ ...c.trackProps.style, transform: `translateX(calc(${-(c.pos + N)} * (100% + 1.5rem) + ${c.dragX}px))` }}
                      >
                        {all.map((s, i) => (
                          <div key={i} aria-hidden={i !== c.pos + N} className="w-full shrink-0">
                            <div className="relative mr-[1rem] h-full min-h-[32.5rem] w-full overflow-clip rounded-panel bg-surface-1 pl-[2.5rem] pt-[2.5rem] mob:p-[1.5rem] xs:min-h-[35rem] xs:pb-[4.5rem]">
                              <div className="relative z-[1] flex h-full flex-col justify-between mob:justify-start mob:gap-y-[1.5rem]">
                                <div className="flex max-w-[65%] flex-col items-start justify-start gap-y-[1rem] tab:max-w-full">
                                  <div className="max-w-[85%] text-feature font-medium mob:text-[1.75rem] xs:text-feature">
                                    <div className="text-ink">{s.highlight}</div>
                                    <p className="mb-[1.25rem] tracking-[-0.025rem] text-grey">{s.subdued}</p>
                                  </div>
                                </div>
                                <Placeholder
                                  label="Product video 1:1"
                                  className="absolute left-[594px] top-[-6px] z-[-1] aspect-square w-[30.4rem] tab:left-auto tab:right-0 mob:static mob:w-full"
                                />
                              </div>
                            </div>
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

      {/* 3: split header + split-layout tabs */}
      <div className="container-medium">
        <div className="mt-[3rem] flex items-start justify-between gap-[3.75rem] tab:flex-col tab:gap-[2rem] xs:gap-[1.5rem]">
          <div className="flex flex-1 flex-col items-start justify-start gap-y-[1rem]">
            <h2 className="heading-h2">{splitHeading}</h2>
          </div>
          <div className="mb-[1rem] mt-[0.5rem] max-w-[30rem] flex-[0_1_auto] rounded-card bg-page p-[1rem]">
            <p className="mb-[0.75rem] text-body italic xs:text-body-xs">{quote.text}</p>
            <div className="flex items-center gap-[1rem] text-left mob:w-full mob:flex-col mob:items-start">
              <div className="h-[2.5rem] min-h-[2.5rem] w-[2.5rem] shrink-0 overflow-clip rounded-full border border-page">
                <Placeholder label="" src={quote.avatar} className="h-full w-full rounded-full" />
              </div>
              <div className="mob:mb-[1rem]">
                <div className="text-[1rem] font-semibold leading-[1.4]">{quote.name}</div>
                <div className="text-[1rem] leading-[1.4]">
                  {quote.role}{' '}
                  <a href="#" className="inline-link">
                    {quote.org}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[1rem]" />
        <div className="relative flex h-[37rem] flex-col justify-between mob:h-auto">
          <div className="w-1/2 mob:flex mob:w-full mob:flex-col">
            <div role="tablist" className="w-full mob:mb-[3rem] mob:flex mob:gap-[1.5rem] mob:overflow-auto xs:flex-wrap">
              {tabs.map((t, i) => {
                const on = i === tab
                return (
                  <button
                    key={t.label}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setTab(i)}
                    className={`flex w-full items-center justify-start border-b border-surface-3 py-[1.5rem] text-left text-tab font-normal mob:whitespace-nowrap mob:text-tab-mob xs:w-auto xs:py-[0.5rem] ${
                      on ? 'tab-chip gap-[0.75rem] pl-[2rem] text-ink' : 'pl-[0.25rem] text-tab-inactive'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>
            <div className="absolute bottom-0 right-0 top-0 mr-[-10vw] w-[60%] overflow-clip tab:mr-[-15vw] mob:relative mob:m-0 mob:mb-[3rem] mob:h-[60dvh] mob:w-full xs:h-[40dvh]">
              {tabs.map((t, i) => (
                <div key={i} data-active={i === tab} className="fade-pane absolute inset-0 flex">
                  <div className="flex w-full items-center justify-start self-start">
                    <Placeholder label={`${t.label} screen`} className="aspect-[670/406] w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[12rem] w-[40%] mob:w-full xs:h-[14rem]">
            {tabs.map((t, i) => (
              <div key={i} data-active={i === tab} className="fade-pane absolute inset-0 flex flex-col items-start justify-start gap-y-[1rem]">
                <div>
                  <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">{t.copy}</p>
                  <div className="flex flex-wrap items-center justify-start gap-[1.5rem] xs:gap-[2rem]">
                    <Button variant="dark">{t.cta}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4: results */}
      <div className="container-medium mb-[2rem]">
        <div className="mt-[2rem] flex flex-col items-center justify-center pt-[2rem]">
          <div className="mb-[1rem] flex flex-col items-center justify-center pt-[0.5rem]" />
          <div className="mb-[1.5rem] w-full max-w-[60rem] text-center">
            <h2 className="heading-h2 mx-auto max-w-[60rem] text-center">
              {results.heading.before}
              <em className="italic">{results.heading.em}</em>
            </h2>
          </div>
          <p className="mb-[1.25rem] block max-w-[1000px] text-center text-body text-grey xs:text-body-xs">{results.lead}</p>
        </div>
        <div className="grid grid-cols-4 gap-[1rem] tab:grid-cols-2 xs:grid-cols-1">
          {results.cards.map((card, i) => (
            <div
              key={i}
              className="flex w-full flex-col items-start justify-between gap-[3.7rem] rounded-card bg-surface-1 px-[2rem] pb-[2rem] pt-[1rem] tab:gap-[5rem] mob:p-[1.5rem] xs:gap-[3rem]"
            >
              <LogoPlaceholder text={card.brand} className="h-[3rem] w-[6.4rem] max-w-[50%] justify-start text-[0.7rem] text-ink mob:h-[2rem]" />
              <div className="flex flex-1 flex-col items-start justify-between gap-y-[1rem]">
                <div className="text-stat font-semibold tab:text-stat-48 mob:text-stat-40 xs:text-stat-48">{card.stat}</div>
                <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">
                  {card.rest}{' '}
                  <a href="#" className="inline-link">
                    {card.brand}
                  </a>
                  {card.after ? ` ${card.after}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-[5rem] mb-[1rem] mt-[2rem] flex max-w-[60rem] flex-col items-center justify-center gap-y-[1rem] tab:mx-0">
          <p className="mb-[1.25rem] flex text-quote font-medium tab:text-quote-tab mob:text-quote-mob">{bigQuote.text}</p>
          <div className="flex flex-col items-center justify-center gap-[0.75rem]">
            <Placeholder label="" src={bigQuote.avatar} className="aspect-square h-[5rem] min-h-[5rem] w-[5rem] min-w-[5rem] rounded-[0.375rem_0] wide:rounded-avatar" />
            <div className="flex flex-col items-center justify-center">
              <div className="wide:text-[1.15rem] wide:leading-[1.4]">{bigQuote.name}</div>
              <div className="text-grey mob:text-[0.875rem] mob:leading-[1.4]">
                {bigQuote.role}{' '}
                <a href="#" className="inline-link">
                  {bigQuote.org}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-[1.5rem] pb-[1rem]">
          <Button href={cta.href} stretch={false}>
            {cta.label}
          </Button>
        </div>
      </div>
    </div>
  )
}
