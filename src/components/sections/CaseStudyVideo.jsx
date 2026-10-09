import Placeholder, { LogoPlaceholder } from '../shared/Placeholder.jsx'

// case-study-video: /lms/mentoring-software `.section_case-study`.
// Video card (#0b0b0b, radius 1rem, 2rem padding, min-h 60vh inner): logo top-left, 12rem spacer, H2 bottom-left,
// 4rem play button bottom-right; background image masked with a radial fade (offset +2rem/-2rem on desktop,
// inset 0 <=991). Below: two stat cards (24px/1 heading -> 48px <=991 -> 40px <=767; 1 col <=479).
// The play button links out to the video (YouTube on the original) — static here, no hover state on the original.
function PlayIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-[4rem] w-[4rem] min-w-[4rem] max-w-[4rem]" aria-hidden>
      <circle cx="32" cy="32" r="32" fill="#f5f6ff" />
      <path d="M26 21.5v21l17-10.5z" fill="#0b0b0b" />
    </svg>
  )
}

const DEFAULTS = {
  heading: 'The Rising Talent Trust guides thousands of young people into their first careers with Nimbus',
  videoHref: '#',
  stats: [
    { heading: 'Why the right match matters most', body: 'Nimbus pairs mentors and mentees on goals, skills and availability, so every single pairing starts on the right foot from the very first meeting.' },
    { heading: 'Jordan Ellis, Programme Lead', body: '“Matching is the most important part of any mentoring scheme. Getting it right from the start means people stay engaged, trust builds faster and results follow.”' },
  ],
}

export default function CaseStudyVideo(props) {
  const p = { ...DEFAULTS, ...props }
  return (
    <section data-section="case-study-video">
      <div className="padding-global">
        <div className="py-[5rem] tab:py-[4rem] mob:py-[3rem]">
          <div className="container-medium">
            <div className="p-0">
              <div className="relative flex flex-row items-end justify-between gap-x-[5rem] gap-y-[4.375rem] overflow-clip rounded-panel bg-surface-1 p-[2rem] mob:gap-x-[2rem] xs:flex-col">
                <div className="relative z-[1] flex min-h-[60vh] min-w-0 flex-1 flex-col items-start justify-between tab:min-h-[50vh] xs:min-h-[40vh] ultra:min-h-[40vh]">
                  <LogoPlaceholder className="aspect-[388/272] w-[5rem] text-[0.75rem] tab:w-[6rem] xs:w-[4rem]" />
                  <div className="w-full pt-[12rem] tab:pt-[8rem] mob:pt-[4.5rem]" />
                  <div className="w-full max-w-[60rem]">
                    <h2 className="heading-h2">{p.heading}</h2>
                  </div>
                </div>
                <a href={p.videoHref} aria-label="Play video" className="relative z-[1] my-0 flex max-w-full justify-end mob:mb-[8px]">
                  <PlayIcon />
                </a>
                <div
                  className="absolute -top-[2rem] left-[2rem] z-0 h-full w-full tab:inset-0"
                  style={{ WebkitMaskImage: 'radial-gradient(#000 0%, rgba(0,0,0,0) 65%)', maskImage: 'radial-gradient(#000 0%, rgba(0,0,0,0) 65%)' }}
                >
                  <Placeholder label="Video still" tone={3} className="h-full w-full" />
                </div>
              </div>
              <div className="mt-[1rem] grid grid-cols-2 gap-[1rem] xs:grid-cols-1">
                {p.stats.map((s) => (
                  <div key={s.heading} className="flex h-auto w-full flex-col items-start justify-between gap-[2rem] rounded-card bg-surface-1 p-[1rem] tab:gap-[5rem] mob:p-[1.5rem]">
                    <div className="flex h-full flex-col items-start justify-between gap-y-[1rem]">
                      <div className="text-[1.5rem] font-medium leading-none text-ink tab:text-[3rem] mob:text-[2.5rem]">{s.heading}</div>
                      <p className="mb-0 text-body text-grey xs:text-body-xs">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
