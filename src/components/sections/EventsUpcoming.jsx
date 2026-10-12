import { SubscribeCallout } from './BlogFeatured.jsx'

// events-upcoming (.section > .component.section_global_header + .upcoming-events_list +
// .event_subscribe-wrap) on /resources/events-webinars, legacy "green" theme: centred serif H2, a 3-col
// list of upcoming event cards (date chip with green gradient + left rule, semibold name, "Register
// today ›"; hover bg -> #001811) and the newsletter callout (static form). The live CMS showed 1 event.
const THEME = { '--th-border': '#00251e', '--th-bg2': '#001811', '--th-eyebrow-border': '#01584b', '--th-brand': '#1ee9b6' }

const DEFAULTS = {
  heading: 'Where to meet us next',
  events: [{ date: '20th - 22nd October 2026', name: 'People Expo', href: '#' }],
  linkLabel: 'Register today',
  subscribe: { heading: 'For fresh learning insight and invites to upcoming events', sub: 'Join the list', headingWrapClass: 'max-w-[36rem]', subClass: 'text-body xs:text-body-xs' },
}

export default function EventsUpcoming({ heading = DEFAULTS.heading, events = DEFAULTS.events, linkLabel = DEFAULTS.linkLabel, subscribe = DEFAULTS.subscribe }) {
  return (
    <section data-section="events-upcoming" style={THEME}>
      <div className="padding-global">
        <div className="container-large">
          <div className="relative flex flex-col border-l border-r border-[var(--th-border)]">
            <div className="flex flex-col items-center justify-start px-[2.5rem] pb-[4rem] pt-[5.5rem] [text-wrap:pretty] tab:px-[2rem] tab:pt-[4rem] mob:px-[1.5rem] xs:px-[1rem]">
              <div className="flex w-full flex-col items-center justify-between text-center leading-[1.4]">
                <h2 className="mb-[1.25rem] mt-[0.25rem] font-serif text-[4rem] font-normal leading-[1.1]">{heading}</h2>
              </div>
            </div>
          </div>
          <div className="border-l border-r border-[var(--th-border)]">
            <div className="grid grid-cols-3 gap-0 mob:grid-cols-1">
              {events.map((ev, i) => (
                <a
                  key={i}
                  href={ev.href}
                  className="flex h-full flex-col items-stretch justify-between gap-y-[0.75rem] border border-[var(--th-border)] p-[2rem] text-ink no-underline hover:bg-[var(--th-bg2)] tab:gap-y-[2rem] tab:p-[1.25rem] xs:p-[1rem]"
                >
                  <div className="flex items-center justify-start gap-[1rem]">
                    <h3 className="mb-[1rem] border-l border-[var(--th-brand)] bg-[linear-gradient(100deg,rgba(30,233,182,0.5),rgba(255,255,255,0)_52%)] px-[1rem] py-[0.75rem] text-[1.35rem] font-normal leading-[1.15] text-ink mob:text-[1.25rem]">
                      {ev.date}
                    </h3>
                  </div>
                  <div className="mt-[2.75rem] mob:mt-[3rem]">
                    <div className="text-[1.5rem] font-semibold leading-[1.4] tab:text-[1.25rem]">{ev.name}</div>
                    <div className="pt-[1rem]" />
                    <div className="mt-[0.25rem] flex gap-[0.75rem] self-start pr-[1.5rem] font-semibold transition-all duration-[250ms] ease-[ease] hover:gap-[1rem]">
                      <span className="text-[1rem] leading-[1.4]">{linkLabel}</span>
                      <svg viewBox="0 0 5.1 8.43" className="w-[8px]" aria-hidden>
                        <path d="M.7.7l3.5 3.5L.7 7.7" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <SubscribeCallout {...subscribe} />
          </div>
        </div>
      </div>
    </section>
  )
}
