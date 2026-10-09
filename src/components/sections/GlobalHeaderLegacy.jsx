import Placeholder from '../shared/Placeholder.jsx'

// ---------------------------------------------------------------------------------------------
// Legacy (Relume-style, design system "b") primitives shared by the *-legacy sections.
// The original sets per-page theme custom properties (--_theme---*); measured values below.
//   green  : /lms/solutions, /lms/professional-services, /content/custom-content, /company,
//            /contact-us, /resources/events-webinars
//   yellow : /content, /content/service, /content/topics, /content/sector-suites,
//            /case-studies/content, /case-studies-contents/*
//   pink   : /lms/impact (/lms/thrive-impact)
// Every legacy section takes `theme` and spreads legacyVars(theme) on its root; children read the
// colours through var(--lt-*) so one component renders all three page themes.
// (Suggested home: src/components/shared/legacyTheme.js — kept here because this agent may only
// create section files.)
// ---------------------------------------------------------------------------------------------
export const LEGACY_THEMES = {
  green: {
    border: '#00251e',
    border2: '#01584b',
    bg2: '#001811',
    brand: '#1ee9b6',
    btnBg: '#1ee9b6',
    btnText: '#000a06',
    btnBorder: '#1ee9b6',
    btnHoverBg: '#016b57',
    btnHoverText: '#eafff7',
    ebBorder: '#01584b',
    ebBg: '#001811',
  },
  yellow: {
    border: '#2d2919',
    border2: '#301b08',
    bg2: '#232011',
    brand: '#eee96d',
    btnBg: '#eee96d',
    btnText: '#000000',
    btnBorder: '#eee96d',
    btnHoverBg: '#edcf00',
    btnHoverText: '#000000',
    ebBorder: '#2d2919',
    ebBg: '#2d2919',
  },
  pink: {
    border: '#570039',
    border2: '#7b005d',
    bg2: '#3b041d',
    brand: '#ff00e1',
    btnBg: '#ff00e1',
    btnText: '#f5f6ff',
    btnBorder: '#d900bb',
    btnHoverBg: '#f63ed7',
    btnHoverText: '#f5f6ff',
    ebBorder: '#7b005d',
    ebBg: '#3b041d',
  },
}

export function legacyVars(theme = 'green') {
  const t = LEGACY_THEMES[theme] || LEGACY_THEMES.green
  return {
    '--lt-border': t.border,
    '--lt-border2': t.border2,
    '--lt-bg2': t.bg2,
    '--lt-brand': t.brand,
    '--lt-btn-bg': t.btnBg,
    '--lt-btn-text': t.btnText,
    '--lt-btn-border': t.btnBorder,
    '--lt-btn-hover-bg': t.btnHoverBg,
    '--lt-btn-hover-text': t.btnHoverText,
    '--lt-eb-border': t.ebBorder,
    '--lt-eb-bg': t.ebBg,
  }
}

// `.button.w-button` (theme button). 18/18 w500, 12px 20px, 1px border, pill.
// Hover swaps bg/text instantly (the only transition on the original is border-radius .3s).
// ≤991: 16px text, 8px 16px. At ≤479 inside a header button group it stretches full width.
export function LegacyButton({ children, href = '#', className = '' }) {
  return (
    <a
      href={href}
      data-legacy-button
      className={`inline-block rounded-pill border border-solid border-[color:var(--lt-btn-border)] bg-[var(--lt-btn-bg)] px-[1.25rem] py-[0.75rem] text-center text-[1.125rem] font-medium leading-none text-[color:var(--lt-btn-text)] no-underline transition-[border-radius] duration-300 ease-in-out hover:bg-[var(--lt-btn-hover-bg)] hover:text-[color:var(--lt-btn-hover-text)] tab:px-[1rem] tab:py-[0.5rem] tab:text-[1rem] ${className}`}
    >
      {children}
    </a>
  )
}

// `.eyebrow-tag` tertiary variant: 14px w500, .325rem .75rem, theme eyebrow border/bg, pill, mb .75rem.
// ≤991: .725rem text, .425rem .625rem; ≤479: mb .25rem, line-height 1.
export function LegacyEyebrow({ children, className = '' }) {
  return (
    <div
      className={`mb-[0.75rem] inline-block rounded-pill border border-solid border-[color:var(--lt-eb-border)] bg-[var(--lt-eb-bg)] px-[0.75rem] py-[0.325rem] text-[0.875rem] font-medium leading-[1.4] text-ink tab:px-[0.625rem] tab:py-[0.425rem] tab:text-[0.725rem] xs:mb-[0.25rem] xs:leading-none ${className}`}
    >
      {children}
    </div>
  )
}

// `.section_global_header` padding: 5.5rem 2.5rem 4rem; ≤991 4rem 2rem; ≤767 sides 1.5rem; ≤479 4rem 1rem.
export const GLOBAL_HEADER_PAD =
  'pt-[5.5rem] px-[2.5rem] pb-[4rem] tab:pt-[4rem] tab:px-[2rem] mob:px-[1.5rem] xs:px-[1rem]'

// Legacy H2 (`.header_content_heading`, Instrument Serif 4rem / 1.1, mt .25rem mb 1.25rem; no mobile step).
export const LEGACY_H2 = 'mt-[0.25rem] mb-[1.25rem] font-serif text-[4rem] font-normal leading-[1.1] text-ink'
// Legacy H1 heading (`h1.header_content_heading`): 3.8rem / 1.1; ≤767 2.5rem.
export const LEGACY_H1 = 'font-serif text-[3.8rem] font-normal leading-[1.1] text-ink mob:text-[2.5rem]'
// Plain legacy H1 (no class): 3.8rem / 1.15; ≤767 2.5rem.
export const LEGACY_H1_PLAIN = 'font-serif text-[3.8rem] font-normal leading-[1.15] text-ink mob:text-[2.5rem]'
// `.header_content-para`: body 18/25.2 (17.6/24.64 at ≤479), mt 1rem mb 1.25rem.
export const LEGACY_PARA = 'mt-[1rem] mb-[1.25rem] text-body xs:text-body-xs'

// ---------------------------------------------------------------------------------------------
// global-header-legacy
//   variant 'logo'    — /case-studies/content: brand logo + H1 (3.8rem/1.15) + grey paragraph that
//                       keeps the original's 12rem left margin (so it is off-centre, and at 390 it
//                       collapses to a 136px column exactly like the original).
//   variant 'eyebrow' — /contact-us: eyebrow tag + H1 (3.8rem/1.1) + grey paragraph, centred.
// Both: .component.no-border-bottom (top + side hairlines) > .section_global_header.no-border-bottom.
// ---------------------------------------------------------------------------------------------
export default function GlobalHeaderLegacy({
  variant = 'eyebrow',
  theme = variant === 'logo' ? 'yellow' : 'green',
  eyebrow = 'Sales enquiries',
  heading = variant === 'logo' ? 'Nimbus content customer stories' : 'New platform on your list? Ask our team',
  body = variant === 'logo'
    ? 'Discover how leading organisations use Nimbus content to train their people, strengthen engagement and build lasting capability, with libraries tailored to every single role, sector and team size.'
    : 'Share your learning goals with us and our team will reply within one working day with next steps.',
}) {
  return (
    <section data-section="global-header-legacy" style={legacyVars(theme)}>
      <div className="padding-global">
        <div className="container-large">
          <div className="flex flex-col border border-b-0 border-solid border-[color:var(--lt-border)]">
            <div className={`flex flex-col items-start ${GLOBAL_HEADER_PAD} pb-[4rem]`}>
              {variant === 'logo' ? (
                <>
                  <div className="flex w-full items-center justify-center">
                    <Placeholder label="Content brand logo" tone={3} className="aspect-[512/125] w-[10rem]" />
                  </div>
                  <h1 className="mt-[1.5rem] flex w-full justify-center font-serif text-[3.8rem] font-normal leading-[1.15] text-ink mob:text-[2.5rem]">
                    {heading}
                  </h1>
                  <p className="mb-[0.25rem] ml-[12rem] flex max-w-[50rem] flex-col items-center justify-center text-center text-para text-grey">
                    {body}
                  </p>
                </>
              ) : (
                <div className="flex w-full flex-col items-center justify-between text-center">
                  <div className="flex flex-col items-center gap-[0.5rem]">
                    <LegacyEyebrow>{eyebrow}</LegacyEyebrow>
                    <h1 className={`m-0 ${LEGACY_H1}`}>{heading}</h1>
                  </div>
                  <p className={`${LEGACY_PARA} text-grey`}>{body}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
