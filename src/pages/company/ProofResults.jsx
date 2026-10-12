import Button from '../../components/shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from '../../components/shared/Placeholder.jsx'

// Page-local: the "proof" results block (.section_results .padding-xhuge on /company,
// .padding-bottom.padding-xhuge.demo-stats on /whats-included). Serif H2 with an italic word, grey lead,
// a 4-column grid of three logo/stat cards plus a translucent quote card (logo, 6rem-padded quote,
// avatar + name/role), then either a green CTA card (company) or a centred primary button (whats-included).
// The homepage Results component has neither the quote card nor the CTA card, so this lives with the page.
export default function ProofResults({
  heading,
  lead,
  cards,
  quote,
  cta = null, // { kind: 'card', text, label, to } | { kind: 'button', label, to }
  headingClassName = 'mb-[2rem]',
  className = '',
  innerClassName = 'pb-[8rem] mob:pb-[4rem]',
  wrapGlobal = true,
  containerClassName = 'container-medium',
}) {
  const body = (
    <div className={innerClassName}>
      <div className={containerClassName}>
        <div className="mt-[1rem] flex flex-col items-center pt-[1rem]">
          <div className="mb-[1rem] pt-[0.5rem]">
            <div className="max-w-[42rem] text-center">
              <h2 className={`heading-h2 ${headingClassName}`}>{heading}</h2>
              <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">{lead}</p>
            </div>
          </div>
          <div className="grid w-full grid-cols-4 gap-[1rem] tab:grid-cols-2 xs:grid-cols-1">
            {cards.map((c, i) => (
              <div
                key={i}
                className="flex flex-col items-start justify-between gap-[3.7rem] rounded-card bg-surface-1 px-[2rem] pb-[2rem] pt-[1rem] mob:gap-[3rem] mob:p-[1.5rem]"
              >
                <LogoPlaceholder alt="Customer logo" imgClassName="object-left" className={`${c.logoClass || 'w-[3rem]'} h-[3rem] max-w-[50%] justify-start text-[0.75rem] mob:h-[2rem]`} />
                <div className="flex flex-col gap-[1rem]">
                  <div className="text-stat font-semibold text-ink mob:text-stat-48">{c.stat}</div>
                  <p className="mb-[1.25rem] text-body text-grey xs:text-body-xs">{c.text}</p>
                </div>
              </div>
            ))}
            {quote && (
              <div className="mb-[1rem] mt-[0.5rem] rounded-card bg-[rgba(11,11,11,0.02)] p-[1rem]">
                <LogoPlaceholder alt="Customer logo" imgClassName="object-left" className="h-[3rem] w-[7.4rem] max-w-[50%] justify-start text-[0.75rem] mob:h-[2rem]" />
                <p className="mb-[0.75rem] pt-[6rem] text-body text-ink xs:text-body-xs">{quote.text}</p>
                <div className={`flex items-start gap-[0.5rem] ${quote.clientClassName || ''}`}>
                  <Placeholder label="" tone={2} className="h-[2.5rem] w-[2.5rem] shrink-0 rounded-full border border-page" />
                  <div>
                    <div className="text-[1rem] font-semibold leading-[1.4] text-ink">{quote.name}</div>
                    <div className="text-[1rem] leading-[1.4] text-ink">{quote.role}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {cta?.kind === 'card' && (
          <div className="grid grid-cols-[1fr_auto] items-center gap-x-[5rem] gap-y-[2rem] overflow-hidden rounded-panel bg-legacy-green p-[2rem] mob:grid-cols-1 mob:items-start mob:gap-[1.5rem]">
            <div className="max-w-[28rem] text-[1.25rem] leading-[1.4] text-surface-2 mob:text-[1.125rem]">{cta.text}</div>
            <div className="flex justify-end">
              <Button variant="dark" to={cta.to} className="mob:w-full mob:py-[0.5rem]">
                {cta.label}
              </Button>
            </div>
          </div>
        )}
        {cta?.kind === 'button' && (
          <div className="flex flex-wrap items-center justify-center gap-[1.5rem] pb-[1rem] pt-[1.5rem]">
            <Button to={cta.to}>{cta.label}</Button>
          </div>
        )}
      </div>
    </div>
  )
  return (
    <section data-sec="results-proof" className={className}>
      {wrapGlobal ? <div className="padding-global">{body}</div> : body}
    </section>
  )
}
