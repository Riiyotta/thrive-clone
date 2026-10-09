import { useState } from 'react'

// §12a FAQ: each item toggles independently. Timings per §13.8 are CSS (index.css .faq-*).
const HOME_ITEMS = [
  {
    q: 'How is pricing worked out?',
    a: (
      <>
        Pricing is based on the number of active users and the modules you choose. There are no hidden fees for
        updates or standard support. <a href="#" className="inline-link">Book a short call</a> and we will put together
        a quote that fits your team.
      </>
    ),
  },
  {
    q: 'Which tools does it connect with, and how is our data kept safe?',
    a: (
      <>
        Nimbus connects with common HR systems, single sign-on providers, chat apps and calendars. Data is encrypted
        in transit and at rest, hosted in the region you choose, and covered by regular independent audits. Our{' '}
        <a href="#" className="inline-link">trust centre</a> has the full details, including policies, certifications
        and a live status page that your IT team can review at any time before or after signing.
      </>
    ),
  },
  {
    q: 'Can we bring our existing courses and content with us?',
    a: (
      <>
        Yes. You can import standard course packages, videos, documents and links, or connect content partners
        directly. Everything lands in one searchable library so learners never have to jump between tools to find
        what they need, and admins can tag, group and retire items in bulk.
      </>
    ),
  },
  {
    q: 'What makes this different from a traditional learning system, and why does that matter for our people?',
    a: (
      <>
        Older systems were built to assign and track. Nimbus starts with the learner: a personal home feed, short
        content, mentoring and communities that make people want to come back. Admins still get the{' '}
        <a href="#" className="inline-link">reporting and compliance tools</a> they rely on, without the clunky
        experience that usually comes with them.
      </>
    ),
  },
  {
    q: 'How long does it take to get up and running?',
    a: (
      <>
        Most teams launch in six to eight weeks. A dedicated onboarding specialist helps with integrations, content
        migration and branding, and our <a href="#" className="inline-link">launch playbook</a> covers the internal
        comms that get people excited from the first day.
      </>
    ),
  },
]

function CrossIcon({ open }) {
  return (
    <svg data-open={open} className="faq-icon h-[1.25rem] w-[1.25rem] shrink-0 fill-icon" viewBox="0 0 20 20" aria-hidden>
      <path d="M4.7 3.3 10 8.6l5.3-5.3 1.4 1.4L11.4 10l5.3 5.3-1.4 1.4L10 11.4l-5.3 5.3-1.4-1.4L8.6 10 3.3 4.7z" />
    </svg>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-card bg-surface-1 px-[1.5rem] py-[1.25rem]">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpen((o) => !o))}
        className="flex cursor-pointer items-center justify-between gap-[1.5rem]"
      >
        <h3 className="text-faq font-medium text-ink">{q}</h3>
        <CrossIcon open={open} />
      </div>
      <div data-open={open} className="faq-body">
        <div className="min-h-0 overflow-clip">
          <div className="pt-[1rem]">
            <p className="text-body text-grey xs:text-body-xs">{a}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const HOME_HEADING = (
  <>
    Your questions about Nimbus,
    <br />
    answered in plain words
  </>
)

/**
 * §12a `.section_wowfaqs`: centred H2 + independent accordion items (timings per §13.8 in index.css).
 * Defaults reproduce the homepage (5 items). Subpages change the heading and the item count (5–11).
 * @param {React.ReactNode} [props.heading] centred H2 (max 60rem)
 * @param {Array<{q: React.ReactNode, a: React.ReactNode}>} [props.items] questions/answers
 * @param {string} [props.paddingClassName='py-[5rem] tab:py-[4rem] mob:py-[3rem]'] vertical padding
 */
export default function Faq({
  heading = HOME_HEADING,
  items = HOME_ITEMS,
  paddingClassName = 'py-[5rem] tab:py-[4rem] mob:py-[3rem]',
}) {
  return (
    <section data-section="faq">
      <div className="padding-global">
        <div className={paddingClassName}>
          <div className="flex flex-col items-center gap-[4.375rem]">
            <h2 className="heading-h2 max-w-[60rem] text-center">{heading}</h2>
            <div className="flex w-full max-w-[42rem] flex-col gap-[1rem]">
              {items.map((it, i) => (
                <FaqItem key={i} {...it} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
