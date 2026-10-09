import { useEffect, useRef, useState } from 'react'
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
      className="flex h-[40px] w-[40px] items-center justify-center rounded-media transition-colors duration-[240ms] hover:bg-hover"
    >
      <span aria-hidden className="h-[28px] w-[28px] rounded-[6px] border-2 border-ink" />
    </a>
  )
}

function DropUp({ label, links, open, onToggle }) {
  return (
    <div className="relative xs:flex xs:h-[40px] xs:flex-col xs:items-center">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="relative flex min-h-[50px] items-center py-[4px] xs:h-[35px] xs:min-h-0 pl-[10px] pr-[30px] text-footer-link text-grey transition-colors duration-[240ms] hover:text-link-hover"
      >
        {label}
        <svg
          aria-hidden
          viewBox="0 0 14 14"
          className={`absolute right-[10px] h-[14px] w-[14px] fill-icon transition-transform duration-300 ease-[ease] ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <path d="M3.2 5.1 7 8.9l3.8-3.8.9.9L7 10.7 2.3 6z" />
        </svg>
      </button>
      {open && (
        <div className="absolute bottom-[50px] right-0 z-10 flex flex-col gap-[6px] whitespace-nowrap rounded-dropup border border-dropup-border bg-dropup p-[16px] mob:static">
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
      className="flex h-[356.5px] w-[300px] flex-col gap-[12px] text-left"
      aria-label="Demo request form (placeholder)"
    >
      {['First name', 'Last name', 'Work email', 'Company'].map((f) => (
        <label key={f} className="flex flex-col gap-[4px] text-small text-grey">
          {f}
          <input
            type="text"
            disabled
            className="h-[40px] rounded-media border border-surface-3 bg-surface-1 px-[12px] text-small text-ink"
          />
        </label>
      ))}
      <button type="submit" disabled className="mt-auto h-[44px] rounded-pill bg-ink text-btn font-medium text-surface-1">
        Submit
      </button>
    </form>
  )
}

export default function Footer() {
  const [dropup, setDropup] = useState(null)
  const legalRef = useRef(null)

  useEffect(() => {
    if (!dropup) return
    const close = (e) => legalRef.current && !legalRef.current.contains(e.target) && setDropup(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [dropup])

  return (
    <footer data-section="footer" className="bg-page pb-[24px]">
      <div className="padding-global">
        <div className="container-large">
          {/* CTA block */}
          <div className="p-[48px] xs:p-[24px]">
            <div className="mx-auto flex max-w-[768px] flex-col items-center gap-[32px] text-center">
              <Wordmark className="h-[32px] w-[112px]" textClassName="text-[26px] leading-none" />
              <h2 className="heading-h2">Ready to give your people a place they love to learn?</h2>
              <p className="mb-[4px] max-w-[512px] text-body text-ink xs:text-body-xs">
                Tell us a little about your team and we will set up a tour around the things you care about most.
              </p>
              <PlaceholderForm />
            </div>
          </div>

          {/* Footer card */}
          <div className="flex flex-col gap-[88px] rounded-panel bg-surface-1 p-[48px] tab:p-[32px] xs:p-[16px]">
            <div className="flex flex-col items-center">
              <p className="mb-[24px] text-body text-ink xs:text-body-xs">Want another view?</p>
              <div className="flex gap-[24px]">
                {['ai-chatgpt.png', 'ai-perplexity.png', 'ai-gemini.png', 'ai-claude.png'].map((f, i) => (
                  <a key={i} href="#" aria-label={`AI assistant ${i + 1}`}>
                    <Placeholder src={`/assets/${f}`} alt="" fit="contain" className="h-[48px] w-[48px] rounded-media tab:h-[40px] tab:w-[40px]" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[60px]">
              <div className="flex items-center justify-between xs:flex-col xs:items-start xs:gap-[24px]">
                <Wordmark className="h-[36px] w-[124px] xs:h-[28px] xs:w-[96px]" textClassName="text-[29px] leading-none xs:text-[22px]" />
                <div className="flex gap-[8px]">
                  <SocialIcon label="Social 1" />
                  <SocialIcon label="Social 2" />
                  <SocialIcon label="Social 3" />
                </div>
              </div>

              <div className="grid grid-cols-4 justify-between gap-[16px] tab:grid-cols-3 tab:gap-y-[48px] mob:gap-y-[24px] xs:grid-cols-2">
                {COLUMNS.map((col) => (
                  <div key={col.header} className="flex flex-col items-start gap-[24px] xs:gap-[8px]">
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
                    <div className="flex flex-col gap-[8px] self-stretch mob:gap-[4px]">
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

            <div className="flex flex-col gap-[32px]">
              <div className="mb-[32px] flex justify-between tab:flex-col tab:items-start tab:gap-[24px]">
                <div className="flex items-center gap-[32px] pt-[16px]">
                  <Placeholder src="/assets/badge-software-advice.svg" alt="Rating badge" fit="contain" className="h-[54px] w-[104px] max-w-[6.5rem] rounded-media xs:h-[42px] xs:w-[80px]" />
                  <Placeholder src="/assets/badge-g2.svg" alt="Rating badge" fit="contain" className="h-[63px] w-[71px] max-w-[6.5rem] rounded-media xs:max-w-[5rem]" />
                </div>
                <div className="flex w-[412px] items-center tab:ml-[-24px] tab:w-auto xs:ml-[-16px]">
                  {[0, 1, 2, 3].map((i) => (
                    <Placeholder
                      key={i}
                      src={`/assets/award-${i + 1}.svg`}
                      alt="Award badge"
                      fit="contain"
                      className={`h-[79px] shrink-0 ${i === 3 ? 'w-[105.3px]' : 'w-[109.5px]'} xs:h-[52px] xs:w-[72px] xs:max-w-[4.5rem]`}
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
                className="flex h-[50px] items-center justify-between tab:h-auto tab:flex-col tab:gap-[16px] mob:gap-[24px]"
              >
                <div className="text-small text-grey">© 2026 Nimbus Learning</div>
                <div className="flex items-center gap-[24px] xs:flex-col xs:gap-[4px]">
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
