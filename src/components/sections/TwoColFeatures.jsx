import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap.js'
import Placeholder from '../shared/Placeholder.jsx'

// `two-col-features` (.section_2col-features): two alternating text / square-image rows.
// Row 1: .padding-global.ads-page (1rem top) > container-medium > container-large > .padding-section-small
//        (3rem/3rem); text left (3rem right pad), image right.
// Row 2: .padding-section-large.pading-large-comapny-page (4rem/4rem; `.mid-market-page` = 4rem/0 + 2rem
//        bottom margin on corporate/enterprise); image left, text right (3rem left pad).
// Each text column: h2.newheading-style-h3 (3.5 / 3 / 2.5 / 2rem, lh 1.15), grey 18px paragraph and a
// testimonial11 quote card. `blocks` sets the order per row (corporate row 1 puts the heading last).
// Motion (IX2 "2Col Feature Animation" + "Reverse", scroll into view, offset 0) on /company and
// /lms/corporate-lms; /lms/enterprise has none (`reveal={false}`). Measured live: start state
// opacity 0 + blur(5px), text x -3rem / image x +5rem (mirrored on the reverse row); after 500ms both
// animate to rest in 750ms outQuart (power3.out).

const A = ({ children }) => (
  <a href="#" className="inline-link">
    {children}
  </a>
)
const BR2 = (
  <>
    <br />
    <br />
  </>
)

// Copy presets per route (word / line structure of each original instance).
const PRESETS = {
  company: [
    {
      title: 'Why teams pick Nimbus',
      text: (
        <>
          Most learning platforms track completions. Nimbus goes further. Learning, skills and knowledge live in one AI-powered
          place that people genuinely want to use. {BR2}That's why over 400 organisations across 50 countries trust it to drive
          performance that actually shows up in their business results. {BR2}There’s never been a platform like it.
        </>
      ),
      quote: '“Nimbus has completely changed the way we run learning and development here. It’s made everything so much more engaging, far more accessible, and so much more effective with everything we roll out.”',
      name: 'Jordan Ellis',
      role: 'L&D Manager, Northwind Brewery',
      blocks: ['title', 'text', 'quote'],
    },
    {
      title: 'Customers first. Every time.',
      text: (
        <>
          We don't vanish after go-live. Every Nimbus customer gets a dedicated team from day one, with <A>launch support</A>,
          strategy and help built around your goals, not ours. It's why our customers stay, and why they keep winning awards with
          us.
        </>
      ),
      quote: '"Would I recommend Nimbus to other organisations? A resounding yes. The partnership your organisation will build with Nimbus is like no other, and I truly, truly endorse it."',
      name: 'Sam Rivera',
      role: 'Global Head of Learning & Development, Kite',
      blocks: ['title', 'text', 'quote'],
    },
  ],
  corporate: [
    {
      title: 'A true partner in every sense of the word',
      text: (
        <>
          Nimbus has support staff in over 20 countries and full <A>launch</A> teams on the ground in Europe, North America and
          the Middle East. Everything we do is built around you, from our feature roadmap to your success, no matter where in
          the world you're based.
        </>
      ),
      quote: '"What really, really struck us about Nimbus was not just the platform, but the whole wraparound service – which really set [them] apart from all of the other providers we had been looking at. The support we’ve had has been brilliant.”',
      name: 'Jordan Ellis',
      role: (
        <>
          Operational Learning and L&D Infrastructure Manager, <A>Northwind Building Society</A>
        </>
      ),
      blocks: ['text', 'quote', 'title'],
    },
    {
      title: '60 countries. 28 industries. One platform.',
      text: 'Nimbus has launched in 60 countries across 28 industries, and has helped move customers from over 20 different learning platforms. Whatever the challenge, we will find a way.',
      quote: '"If another business leader asked if I would recommend Nimbus to them, I would say 100% yes. We have had nothing but success with them. It has been smooth, slick, fun, engaging, and really successful. We’ve had really positive results."',
      name: 'Sam Rivera',
      role: (
        <>
          Lead Consultant, Organisational Development, <A>Northwind Heritage Trust</A>
        </>
      ),
      blocks: ['title', 'text', 'quote'],
    },
  ],
  enterprise: [
    {
      title: "We're only getting started",
      text: (
        <>
          We're <A>shipping features</A> three to four times faster than we did last year. These aren't vanity features. They're
          the ones enterprise customers actually ask for, like <A>Spaces</A>, built with you, for you. Every single month, without
          fail. {BR2}And we're only just getting started. Enterprise customers help shape our roadmap directly, in regular
          sessions with our product team, so what we build solves your challenges sooner.
        </>
      ),
      quote: '"We are adopting the latest Nimbus features almost as fast as they come out. As part of our leadership programme, we launched Spaces, which has been really popular."',
      name: 'Jordan Ellis',
      role: 'Digital Capability Manager, Northwind Retail Group',
      blocks: ['title', 'text', 'quote'],
    },
    {
      title: 'Enterprise grade security, built in',
      text: (
        <>
          Nimbus is a secure, cloud-based learning platform built for <A>enterprise data protection</A>, independently certified
          for security and quality, hosted in the cloud with enterprise-grade encryption and regional data residency options, so
          your IT and legal teams get exactly what they need to sign off with confidence.{BR2}Nimbus also supports enterprise{' '}
          <A>compliance training</A> needs, letting you build and deliver mandatory training alongside everything else your
          teams learn. <A>Role-based access</A>, <A>SSO</A>, audit logging and content permissions come as standard, not an
          add-on.
        </>
      ),
      quote: '“Security was one of our key considerations when we ran a tender for a new platform, and the Nimbus team were able to show that they met all of our required standards.”',
      name: 'Sam Rivera',
      role: 'Improvement Manager, Kite',
      blocks: ['title', 'text', 'quote'],
    },
  ],
}

function Quote({ quote, name, role }) {
  return (
    <div className="mb-[1rem] mt-[0.5rem] rounded-card bg-[rgba(11,11,11,0.02)] py-[1rem] pr-[1rem]">
      <p className="mb-[0.75rem] text-body italic text-ink xs:text-body-xs">{quote}</p>
      <div className="flex items-center gap-[1rem] text-left mob:w-full mob:flex-col mob:items-start">
        <div className="min-h-[2.5rem] w-[2.5rem] min-w-[2.5rem] overflow-clip border border-page">
          <Placeholder label="" tone={3} className="aspect-square w-full rounded-[2.5rem]" />
        </div>
        <div className="mob:mb-[1rem]">
          <div className="text-[1rem] font-semibold leading-[1.4rem] text-ink">{name}</div>
          <div className="text-[1rem] leading-[1.4rem] text-ink">{role}</div>
        </div>
      </div>
    </div>
  )
}

function Content({ row }) {
  const parts = {
    title: (
      <h2 key="t" className="mt-[0.25rem] flex font-serif text-[3.5rem] font-normal leading-[1.15] text-ink tab:text-[3rem] mob:text-[2.5rem] xs:text-[2rem]">
        {row.title}
      </h2>
    ),
    text: (
      <p key="p" className="mb-[1.25rem] text-body text-grey xs:text-body-xs">
        {row.text}
      </p>
    ),
    quote: <Quote key="q" {...row} />,
  }
  return (
    <div data-2col-content className="flex flex-col items-start justify-center gap-y-[0.75rem]">
      {row.blocks.map((b) => parts[b])}
    </div>
  )
}

function Image({ label }) {
  return (
    <div data-2col-img className="overflow-clip rounded-card bg-surface-1">
      <Placeholder label={label} tone={2} className="aspect-square w-full mob:aspect-[3/2]" />
    </div>
  )
}

export default function TwoColFeatures({ preset = 'company', rows, reveal = preset !== 'enterprise', marketPage = preset !== 'company' }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!reveal) return
    const ctx = gsap.context(() => {
      root.current.querySelectorAll('[data-2col-row]').forEach((row) => {
        const rev = row.dataset.reverse === 'true'
        const content = row.querySelector('[data-2col-content]')
        const img = row.querySelector('[data-2col-img]')
        gsap.set(content, { opacity: 0, x: rev ? '3rem' : '-3rem', filter: 'blur(5px)' })
        gsap.set(img, { opacity: 0, x: rev ? '-5rem' : '5rem', filter: 'blur(5px)' })
        ScrollTrigger.create({
          trigger: row,
          start: 'top bottom',
          once: true,
          onEnter: () =>
            gsap.to([content, img], { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.75, delay: 0.5, ease: 'power3.out' }),
        })
      })
    }, root)
    return () => ctx.revert()
  }, [reveal])

  const [a, b] = rows || PRESETS[preset] || PRESETS.company
  return (
    <section data-section="two-col-features" ref={root}>
      <div>
        <div className="padding-global pt-[1rem]">
          <div className="container-medium">
            <div className="container-large">
              <div className="py-[3rem] mob:py-[2rem]">
                <div data-2col-row data-reverse="false" className="flex items-center justify-between tab:flex-col tab:items-start tab:gap-[1rem] mob:items-center mob:gap-[1.5rem]">
                  <div className="w-full max-w-[36rem]">
                    <div className="pr-[3rem] tab:pr-[2.5rem] mob:pr-[1.5rem]">
                      <Content row={a} />
                    </div>
                  </div>
                  <div className="w-full max-w-[36rem]">
                    <Image label="Team photo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="padding-global">
          <div className={marketPage ? 'mb-[2rem] pt-[4rem]' : 'py-[4rem]'}>
            <div className="container-medium">
              <div className="container-large">
                <div data-2col-row data-reverse="true" className="flex items-center justify-between tab:flex-col-reverse tab:items-start tab:gap-[1rem] mob:items-center mob:gap-[1.5rem]">
                  <div className="w-full max-w-[36rem]">
                    <Image label="Product visual" />
                  </div>
                  <div className="w-full max-w-[36rem]">
                    <div className="pl-[3rem] tab:pl-[2.5rem] mob:pl-[1.5rem]">
                      <Content row={b} />
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
