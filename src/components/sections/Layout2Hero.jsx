import Button from '../shared/Button.jsx'
import Eyebrow from '../shared/Eyebrow.jsx'
import Placeholder from '../shared/Placeholder.jsx'
import { LEGACY_H1, LEGACY_H1_PLAIN, LEGACY_PARA, LegacyButton, legacyVars } from './GlobalHeaderLegacy.jsx'

// layout2-hero (`section_layout-2_header`): full-bleed media card (hero-full: min-h 42rem, p 2.5rem,
// radius 1rem, bottom-aligned content over a transparent→black gradient). Variants:
//   'impact'     /lms/impact            border-top container + side lines; logo + H1 + para, CTA right
//   'service'    /content/service       section_component.border-top; logo + H1 + para + CTA below
//   'case-study' /case-studies-contents/* side lines; customer logo + H1 (max 47rem) + video button
//   'company'    /company               no hairlines; wow eyebrow chip + H2 + para + wow Button
//   'events'     /resources/events-webinars side lines; H1 + CTA below, background video slot
// ≤767: min-h 30rem, p 1.5rem, inner stacks (row-gap 1.5rem); ≤479 p 1rem.
const DEFAULTS = {
  impact: {
    theme: 'pink',
    heading: 'Show your leaders what learning truly achieves',
    body: 'Turn everyday learning data into clear proof of real business results.',
    cta: 'Talk to us',
  },
  service: {
    theme: 'yellow',
    heading: 'Content support designed around how you work',
    body: 'End-to-end help with all your learning content.',
    cta: 'See Nimbus at work',
  },
  'case-study': {
    theme: 'yellow',
    heading: 'Customer six rebuilt onboarding across every site in one single year',
  },
  company: {
    theme: 'green',
    eyebrow: 'Careers',
    heading: 'Ready to shape what comes next?',
    body: 'Join Nimbus and help shape how thousands of teams learn, grow and succeed together.',
    cta: 'View open roles →',
  },
  events: {
    theme: 'green',
    heading: 'Our events are like no other',
    cta: 'Save your seat',
  },
}

export default function Layout2Hero({ variant = 'impact', ...props }) {
  const d = { ...DEFAULTS[variant], ...props }
  const { theme, heading, body, cta, eyebrow, ctaHref = '#', videoButton = variant === 'case-study' } = d

  const framed = variant !== 'company'
  const card = (
    <div
      className="relative flex min-h-[42rem] flex-col items-start justify-end overflow-clip rounded-panel p-[2.5rem] mob:min-h-[30rem] mob:p-[1.5rem] xs:p-[1rem]"
      data-hero-full
    >
      <Placeholder
        label={variant === 'events' ? 'Background video' : 'Hero image'}
        tone={2}
        className="absolute inset-0 h-full w-full"
        labelClassName="self-start pt-[1.5rem]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0),#000)]" />

      {variant === 'case-study' ? (
        <>
          <Placeholder label="Logo" tone={3} className="relative mb-[1.5rem] h-[3.5rem] w-[9rem] mob:mb-[1.5rem]" />
          <div className="relative w-full max-w-[47rem]">
            <h1 className={LEGACY_H1}>{heading}</h1>
          </div>
          {videoButton && (
            <a
              href="#"
              aria-label="Play video"
              className="absolute bottom-[2.5rem] right-[2.5rem] mb-[0.86rem] flex h-[2.4rem] w-[3.67rem] items-center justify-center rounded-[0.5rem] bg-ink text-surface-1 mob:static mob:mb-[0.375rem] mob:mt-[1rem] mob:h-[2.1rem] mob:w-[3.3rem]"
            >
              <span className="text-[0.875rem] leading-none">▶</span>
            </a>
          )}
        </>
      ) : variant === 'company' ? (
        <>
          <div className="relative flex w-full items-end justify-between mob:flex-col mob:items-start mob:gap-y-[1.5rem]">
            <div className="flex w-full max-w-[36rem] flex-col items-start gap-[0.5rem]">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="mt-[0.25rem] mb-[1.25rem] font-serif text-[4rem] font-normal leading-[1.15] text-ink">{heading}</h2>
              <p className="mb-[1.25rem] max-w-[36rem] text-body text-ink xs:text-body-xs">{body}</p>
            </div>
          </div>
          <div className="relative flex flex-wrap items-center justify-center gap-[1.5rem] xs:w-full">
            <Button variant="primary" href={ctaHref}>
              {cta}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="relative flex w-full items-end justify-between mob:flex-col mob:items-start mob:gap-y-[1.5rem]">
            <div className="flex w-full max-w-[36rem] flex-col items-start justify-between">
              <div className="flex flex-col items-start gap-[0.5rem]">
                {(variant === 'impact' || variant === 'service') && (
                  <Placeholder
                    label="Logo"
                    tone={3}
                    className={`mb-[1rem] h-[2.5rem] ${variant === 'impact' ? 'w-[9.7rem]' : 'w-[10.25rem]'} mob:h-[2.5rem]`}
                  />
                )}
                <h1 className={variant === 'events' ? LEGACY_H1 : LEGACY_H1_PLAIN}>{heading}</h1>
              </div>
              {body && <p className={`${LEGACY_PARA} text-ink`}>{body}</p>}
              {variant !== 'impact' && cta && (
                <div className="mt-[2rem] flex flex-wrap items-center justify-start gap-[1.5rem] xs:w-full xs:flex-col xs:items-stretch xs:gap-[1rem]">
                  <LegacyButton href={ctaHref}>{cta}</LegacyButton>
                </div>
              )}
            </div>
            {variant === 'impact' && cta && (
              <LegacyButton href={ctaHref} className="xs:w-full">
                {cta}
              </LegacyButton>
            )}
          </div>
          {(variant === 'impact' || variant === 'service') && <div className="w-full pt-[2rem] mob:pt-[1.25rem]" />}
        </>
      )}
    </div>
  )

  return (
    <section data-section="layout2-hero" style={legacyVars(theme)}>
      <div className="padding-global">
        <div className={`container-large ${variant === 'impact' ? 'border-t border-solid border-[color:var(--lt-border)]' : ''}`}>
          {framed ? (
            <div
              className={`border-x border-solid border-[color:var(--lt-border)] ${
                variant === 'service' ? 'border-t' : ''
              }`}
            >
              {card}
            </div>
          ) : (
            card
          )}
        </div>
      </div>
    </section>
  )
}
