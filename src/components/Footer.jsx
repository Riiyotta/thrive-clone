import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './shared/Button.jsx'
import Wordmark from './shared/Wordmark.jsx'
import Placeholder from './shared/Placeholder.jsx'

// §12b footer
const COLUMNS = [
  {
    header: 'Platform',
    headerLink: true,
    links: ['Learning home', 'Skill journeys', 'Peer mentoring', 'Team spaces', 'Analytics', 'Integrations'],
    button: 'See it in action →',
  },
  {
    header: 'Content',
    headerLink: true,
    links: ['Course library', 'Authoring', 'Compliance packs', 'Content partners'],
    button: 'Browse content →',
  },
  {
    header: 'Case Studies',
    headerLink: true,
    links: ['Northwind', 'Brightway', 'Kestrel Co', 'Harbor Foods', 'All stories'],
  },
  {
    header: 'Resources',
    headerLink: false,
    links: ['Blog', 'Guides', 'Webinars', 'Help centre', 'Events', 'Glossary'],
  },
]

const DROPUPS = [
  { label: 'Terms and Conditions', links: ['Customer terms', 'Acceptable use', 'Service levels', 'Support policy', 'Partner terms'] },
  { label: 'Privacy Policy', links: ['Privacy notice', 'Data processing', 'Sub-processors', 'Retention', 'Candidate privacy', 'Accessibility'] },
]

function SocialIcon({ label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-media transition-colors duration-[240ms] hover:bg-hover"
    >
      <span aria-hidden className="h-[1.75rem] w-[1.75rem] rounded-[0.375rem] border-2 border-ink" />
    </a>
  )
}

function DropUp({ label, links, open, onToggle }) {
  return (
    <div className="relative xs:flex xs:h-[2.5rem] xs:flex-col xs:items-center">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="relative flex min-h-[3.125rem] items-center py-[0.25rem] xs:h-[2.1875rem] xs:min-h-0 pl-[0.625rem] pr-[1.875rem] text-footer-link text-grey transition-colors duration-[240ms] hover:text-link-hover"
      >
        {label}
        <svg
          aria-hidden
          viewBox="0 0 14 14"
          className={`absolute right-[0.625rem] h-[0.875rem] w-[0.875rem] fill-icon transition-transform duration-300 ease-[ease] ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <path d="M3.2 5.1 7 8.9l3.8-3.8.9.9L7 10.7 2.3 6z" />
        </svg>
      </button>
      {open && (
        <div className="absolute bottom-[3.125rem] right-0 z-10 flex flex-col gap-[0.375rem] whitespace-nowrap rounded-dropup border border-dropup-border bg-dropup p-[1rem] mob:static">
          {links.map((l) => (
            <a key={l} href="#" className="text-footer-link text-grey transition-colors duration-[240ms] hover:text-link-hover">
              {l}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function PlaceholderForm() {
  // HubSpot form internals are unmeasurable (§16); static 300x351 stand-in, no submit handler / network.
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex h-[22.28125rem] w-[18.75rem] flex-col gap-[0.75rem] text-left"
      aria-label="Demo request form (placeholder)"
    >
      {['First name', 'Last name', 'Work email', 'Company'].map((f) => (
        <label key={f} className="flex flex-col gap-[0.25rem] text-small text-grey">
          {f}
          <input
            type="text"
            disabled
            className="h-[2.5rem] rounded-media border border-surface-3 bg-surface-1 px-[0.75rem] text-small text-ink"
          />
        </label>
      ))}
      <button type="submit" disabled className="mt-auto h-[2.75rem] rounded-pill bg-ink text-btn font-medium text-surface-1">
        Submit
      </button>
    </form>
  )
}

// Subpage CTA copy (placeholder; word/line counts match the original's subpage block:
// H2 8 words / 2 lines with a 3-word italic tail, paragraph 18 words / 2 lines at 1440).
const SUBPAGE_CTA = {
  heading: (
    <>
      Give your team a home <em>for real growth</em>
    </>
  ),
  body: 'Bring your questions and we will walk you through the platform, the content and the results teams like yours see.',
  button: 'Let’s talk',
}

/**
 * Global footer, rendered once by Layout.
 * @param {object} props
 * @param {'home'|'subpage'} [props.variant='home'] CTA block above the footer card.
 *   'home': 768px heading block (48rem) with the 300×351 HubSpot form stand-in (homepage, /company).
 *   'subpage': 640px heading block (40rem) with a green "Book a demo"-style button linking to
 *   /lms/demo-platform instead of the form (`footer.contact-us-footer` on every other subpage).
 *   The footer card below is identical in both variants.
 */
export default function Footer({ variant = 'home' }) {
  const [dropup, setDropup] = useState(null)
  const legalRef = useRef(null)

  useEffect(() => {
    if (!dropup) return
    const close = (e) => legalRef.current && !legalRef.current.contains(e.target) && setDropup(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [dropup])

  const sub = variant === 'subpage'

  return (
    <footer data-section="footer" data-variant={variant} className="bg-page pb-[1.5rem]">
      <div className="padding-global">
        <div className="container-large">
          {/* CTA block */}
          <div className="p-[3rem] xs:p-[1.5rem]">
            {sub ? (
              <div className="mx-auto flex max-w-[40rem] flex-col items-center gap-[2rem] text-center">
                <Wordmark className="h-[2rem] w-[7rem]" textClassName="text-[1.625rem] leading-none" />
                <h2 className="heading-h2 [&_em]:italic">{SUBPAGE_CTA.heading}</h2>
                <p className="mb-[0.25rem] max-w-[32rem] text-body text-ink xs:text-body-xs">{SUBPAGE_CTA.body}</p>
                <div className="flex gap-[1rem]">
                  <Button as={Link} to="/lms/demo-platform" variant="accent" stretch={false}>
                    {SUBPAGE_CTA.button}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mx-auto flex max-w-[48rem] flex-col items-center gap-[2rem] text-center">
                <Wordmark className="h-[2rem] w-[7rem]" textClassName="text-[1.625rem] leading-none" />
                <h2 className="heading-h2">Ready to give your people a place they love to learn?</h2>
                <p className="mb-[0.25rem] max-w-[32rem] text-body text-ink xs:text-body-xs">
                  Tell us a little about your team and we will set up a tour around the things you care about most.
                </p>
                <PlaceholderForm />
              </div>
            )}
          </div>

          {/* Footer card */}
          <div className="flex flex-col gap-[5.5rem] rounded-panel bg-surface-1 p-[3rem] tab:p-[2rem] xs:p-[1rem]">
            <div className="flex flex-col items-center">
              <p className="mb-[1.5rem] text-body text-ink xs:text-body-xs">Want another view?</p>
              <div className="flex gap-[1.5rem]">
                {['ai-chatgpt.png', 'ai-perplexity.png', 'ai-gemini.png', 'ai-claude.png'].map((f, i) => (
                  <a key={i} href="#" aria-label={`AI assistant ${i + 1}`}>
                    <Placeholder src={`/assets/${f}`} alt="" fit="contain" className="h-[3rem] w-[3rem] rounded-media tab:h-[2.5rem] tab:w-[2.5rem]" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[3.75rem]">
              <div className="flex items-center justify-between xs:flex-col xs:items-start xs:gap-[1.5rem]">
                <Wordmark className="h-[2.25rem] w-[7.75rem] xs:h-[1.75rem] xs:w-[6rem]" textClassName="text-[1.8125rem] leading-none xs:text-[1.375rem]" />
                <div className="flex gap-[0.5rem]">
                  <SocialIcon label="Social 1" />
                  <SocialIcon label="Social 2" />
                  <SocialIcon label="Social 3" />
                </div>
              </div>

              <div className="grid grid-cols-4 justify-between gap-[1rem] tab:grid-cols-3 tab:gap-y-[3rem] mob:gap-y-[1.5rem] xs:grid-cols-2">
                {COLUMNS.map((col) => (
                  <div key={col.header} className="flex flex-col items-start gap-[1.5rem] xs:gap-[0.5rem]">
                    {col.headerLink ? (
                      <a
                        href="#"
                        className="text-footer-head font-medium text-ink transition-colors duration-200 wide:hover:text-grey mob:text-footer-head-mob"
                      >
                        {col.header}
                      </a>
                    ) : (
                      <div className="text-footer-head font-medium text-ink mob:text-footer-head-mob">{col.header}</div>
                    )}
                    <div className="flex flex-col gap-[0.5rem] self-stretch mob:gap-[0.25rem]">
                      {col.links.map((l) => (
                        <a key={l} href="#" className="text-footer-link text-grey transition-colors duration-[240ms] hover:text-link-hover">
                          {l}
                        </a>
                      ))}
                      {/* on the original the button sits inside the link list (8px gap) */}
                      {col.button && (
                        <div className="flex">
                          <Button variant="dark-small">{col.button}</Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[2rem]">
              <div className="mb-[2rem] flex justify-between tab:flex-col tab:items-start tab:gap-[1.5rem]">
                <div className="flex items-center gap-[2rem] pt-[1rem]">
                  <Placeholder src="/assets/badge-software-advice.svg" alt="Rating badge" fit="contain" className="h-[3.375rem] w-[6.5rem] max-w-[6.5rem] rounded-media xs:h-[2.625rem] xs:w-[5rem]" />
                  <Placeholder src="/assets/badge-g2.svg" alt="Rating badge" fit="contain" className="h-[3.9375rem] w-[4.4375rem] max-w-[6.5rem] rounded-media xs:max-w-[5rem]" />
                </div>
                <div className="flex w-[25.75rem] items-center tab:ml-[-1.5rem] tab:w-auto xs:ml-[-1rem]">
                  {[0, 1, 2, 3].map((i) => (
                    <Placeholder
                      key={i}
                      src={`/assets/award-${i + 1}.svg`}
                      alt="Award badge"
                      fit="contain"
                      className={`h-[4.9375rem] shrink-0 ${i === 3 ? 'w-[6.58125rem]' : 'w-[6.84375rem]'} xs:h-[3.25rem] xs:w-[4.5rem] xs:max-w-[4.5rem]`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-body text-ink xs:text-body-xs">
                Nimbus is <a href="#" className="inline-link">independently audited</a>, meets{' '}
                <a href="#" className="inline-link">accessibility standards</a>, supports teams in over forty languages and follows{' '}
                <a href="#" className="inline-link">regional data rules</a> in every market.
              </p>

              <div
                ref={legalRef}
                className="flex h-[3.125rem] items-center justify-between tab:h-auto tab:flex-col tab:gap-[1rem] mob:gap-[1.5rem]"
              >
                <div className="text-small text-grey">© 2026 Nimbus Learning</div>
                <div className="flex items-center gap-[1.5rem] xs:flex-col xs:gap-[0.25rem]">
                  <a href="#" className="text-footer-link text-grey transition-colors duration-[240ms] hover:text-link-hover">
                    Trust Centre
                  </a>
                  <a href="#" className="text-footer-link text-grey transition-colors duration-[240ms] hover:text-link-hover">
                    Website Cookies &amp; Policy
                  </a>
                  {DROPUPS.map((d) => (
                    <DropUp
                      key={d.label}
                      {...d}
                      open={dropup === d.label}
                      onToggle={() => setDropup((o) => (o === d.label ? null : d.label))}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
