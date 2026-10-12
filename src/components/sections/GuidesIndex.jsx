import Placeholder from '../shared/Placeholder.jsx'

// guides-index (.s) on /resources/guides — the oldest Webflow system, fixed 16px root, px-based values
// written as rem (÷16). Header (serif H1, line of copy, static sign-up form), a featured guide card
// (#1b1b1b, 550px tall, 65% black + 15px backdrop-blur layer over the background) and a 3-col grid of
// guides (2 ≤767, 1 ≤479). Motion (IX2): guide covers scale 1 -> 1.025 on hover, 300ms easeInOut, and back;
// Download buttons bg #fbfbfb -> #139c79 with white text and inverted icon. Sign-up submit hover -> #1de9b6.
// The featured card and grid sit in 7.5rem side padding only at ≥1440; 992–1439 it is 2.5rem (measured live).

const COVER = 'rounded-[5px_20px_20px_5px]'

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.25rem] w-[1.25rem] transition-[filter] duration-300 group-hover:invert" aria-hidden>
      <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="#1b1b1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DownloadButton({ href = '#', label = 'Download' }) {
  return (
    <a
      href={href}
      className="group relative z-[999] flex flex-[0_1_auto] flex-nowrap items-center justify-start gap-[0.9375rem] overflow-visible rounded-[4px] border border-[#fbfbfb] bg-[#fbfbfb] px-[1rem] py-[0.5rem] font-semibold text-[#1b1b1b] no-underline transition-all ease-[ease] duration-200 hover:border-[#3d3d3d] hover:bg-[#139c79] hover:text-white"
    >
      <span className="text-[1.125rem] leading-[1.4] xs:text-[1.1rem]">{label}</span>
      <DownloadIcon />
    </a>
  )
}

// Sign-up row shared by the guides and glossary headers (static; submit prevented).
export function SignupForm({ placeholder = 'Enter your email', submitLabel = 'Sign up' }) {
  return (
    <div className="mb-[0.9375rem] w-full max-w-[50rem] tab:max-w-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto flex w-[43.75rem] items-center gap-[0.3125rem] overflow-hidden rounded-[6px] border border-[#3d3d3d] bg-[#1b1b1b] p-[3px] wide:w-auto tab:max-w-full mob:w-auto"
      >
        <input
          type="email"
          placeholder={placeholder}
          aria-label={placeholder}
          className="h-[2.375rem] min-w-0 flex-1 rounded-[4px] border border-transparent bg-[#1b1b1b] px-[0.9375rem] py-[0.5rem] text-[0.875rem] text-white outline-none placeholder:font-semibold placeholder:text-[#d7d7d7] focus:border-[#1de9b6]"
        />
        <button
          type="submit"
          className="h-[2.75rem] w-[7rem] shrink-0 rounded-[4px] bg-[#fbfbfb] pb-[9px] pl-[15px] pr-[40px] pt-[10px] text-left text-[1rem] text-black hover:bg-[#1de9b6]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14'%3E%3Cpath d='M2 7h10M8 3l4 4-4 4' fill='none' stroke='%23000' stroke-width='1.6'/%3E%3C/svg%3E\")", backgroundPosition: '86% 47%', backgroundRepeat: 'no-repeat' }}
        >
          {submitLabel}
        </button>
      </form>
    </div>
  )
}

const DEFAULT_GUIDES = [
  ['Communication in learning teams', 'In this guide we explore how clear, regular communication helps learning teams build trust and keep everyone moving together.'],
  ['Building a skills-first culture', 'A practical look at mapping skills, spotting gaps and growing the capabilities your organisation needs for the next five years.'],
  ['The manager’s guide to coaching', 'Simple coaching habits any manager can use to help their people grow, with conversation prompts and examples you can try today.'],
  ['Onboarding that actually sticks', 'Everything you need to design a first ninety days that welcomes new starters, builds confidence and keeps people for longer.'],
  ['Measuring the impact of learning', 'How to connect learning activity to business results, with simple metrics, useful reports and stories that leaders will listen to.'],
  ['Making compliance engaging', 'Ideas for turning required training into short, relevant experiences people complete willingly, without losing any rigour along the way.'],
  ['Learning in the flow of work', 'Bring learning closer to the job with bite-sized resources, smart nudges and social features that fit around busy working days.'],
  ['A playbook for peer mentoring', 'Step-by-step advice for launching a mentoring programme that matches the right people and keeps every conversation focused and useful.'],
].map(([title, text]) => ({ title, text, href: '#' }))

export default function GuidesIndex({
  title = 'Free guides',
  intro = 'Sign up for the newest guides in your inbox.',
  placeholder = 'Enter your email',
  submitLabel = 'Sign up',
  featured = { title: 'The future of work', text: 'The way we work keeps changing, and this report shows how learning teams can stay one step ahead.', href: '#' },
  guides = DEFAULT_GUIDES,
}) {
  return (
    <div data-section="guides-index">
      {/* header */}
      <div className="relative z-50 mx-auto flex w-full max-w-[112.5rem] flex-col items-center gap-[1.25rem] px-[7.5rem] tab:px-[1.25rem]">
        <h1 className="mx-auto font-serif text-[3.125rem] font-normal leading-[1.2] tab:leading-[1.3] mob:text-[2.5rem] xs:leading-[1.2]">{title}</h1>
        <p className="relative z-10 mb-0 text-center text-[1.25rem] leading-[1.5] text-white tab:leading-[1.3] mob:text-[1rem]">{intro}</p>
        <SignupForm placeholder={placeholder} submitLabel={submitLabel} />
      </div>

      {/* featured */}
      <div className="flex max-w-full flex-col items-start gap-[2.5rem] tab:gap-[1.875rem]">
        <div className="mx-auto flex w-full max-w-[80rem] flex-row items-center justify-between gap-x-[2.5rem] px-[7.5rem] tab:flex-col tab:items-start tab:gap-[1.25rem] tab:p-[1.25rem]" />
        <div className="w-full max-w-full px-[2.5rem] wide:px-[7.5rem] tab:px-[1.875rem] mob:px-[1.25rem]">
          <div className="group/f relative flex h-[34.375rem] w-full flex-row justify-end overflow-hidden rounded-[10px] bg-[#1b1b1b] mob:h-auto xs:flex-col">
            <div className="relative z-[100] flex min-h-[50%] w-1/2 flex-col items-start gap-[1.25rem] px-[2.5rem] py-[3.75rem] xs:w-full xs:pb-0">
              <h3 className="mb-0 text-[2.5rem] font-normal leading-[1.25] tab:leading-[1.3] mob:text-[1.875rem]">{featured.title}</h3>
              <p className="relative z-10 mb-[1.25rem] text-[1.25rem] leading-[1.5] text-white tab:leading-[1.3] mob:text-[1rem]">{featured.text}</p>
              <DownloadButton href={featured.href} />
            </div>
            <div className="relative z-[100] flex min-h-[50%] w-1/2 flex-col items-center justify-center gap-[1.25rem] px-[2.5rem] py-[3.75rem] mob:self-start xs:w-full">
              <a href={featured.href} className="flex h-full w-full flex-col items-center">
                <Placeholder
                  label="Guide cover"
                  className={`aspect-[2481/3508] h-full shadow-[0_5px_5px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out hover:scale-[1.025] tab:h-auto tab:w-full ${COVER}`}
                />
              </a>
            </div>
            <div className="absolute inset-0 z-50 min-h-full bg-[rgba(0,0,0,0.65)] backdrop-blur-[15px]" />
          </div>
        </div>
      </div>

      {/* grid */}
      <div className="relative z-[500] mx-auto mt-[3.75rem] flex min-h-[50vh] w-full max-w-[80rem] flex-col items-start justify-start gap-x-[2.5rem] gap-y-[7.5rem] px-[2.5rem] wide:px-[7.5rem] tab:gap-[1.25rem] tab:px-[1.875rem] mob:mb-[3.75rem] mob:min-h-0">
        <div className="w-full">
          <div className="grid grid-cols-3 gap-x-[5.625rem] gap-y-[7.5rem] tab:gap-x-[3.75rem] mob:grid-cols-2 xs:grid-cols-1">
            {guides.map((g, i) => (
              <div key={i} className="relative">
                <a href={g.href} className="block max-w-full">
                  <Placeholder
                    label="Guide cover"
                    className={`mb-[2.5rem] aspect-[2480/3508] w-3/4 transition-transform duration-300 ease-in-out hover:scale-[1.025] ${COVER}`}
                  />
                </a>
                <div className="relative z-[100] flex w-full flex-col items-start justify-start gap-[1.25rem]">
                  <div className="flex flex-col justify-start gap-[0.625rem]">
                    <h3 className="mb-0 text-[1.875rem] font-normal leading-[1.15] tab:text-[1.5rem] tab:leading-[1.2]">{g.title}</h3>
                    <div className="relative z-10 text-[1rem] leading-[1.4375rem] tab:text-[0.875rem] tab:leading-[1.2]">{g.text}</div>
                  </div>
                  <DownloadButton href={g.href} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
