import Placeholder from '../shared/Placeholder.jsx'

// demo-hero: /lms/demo-platform `.section > .container-large.demo-container`.
// Avatar line, then three 2-col grids (gap 5rem; 1 col <=479 with the form first):
// [H1 3.8rem/1.1 | H3 1.75rem serif, bottom-aligned] / [grey intro, 4-item list (18px/1.4em), 3 badges | form] /
// [quote | quote (hidden <=479)]. The HubSpot form is a static 300x358 placeholder (cross-origin iframe on the original).
function Client({ name, role, org, infoClassName = '' }) {
  return (
    <div className="flex items-center gap-[1rem] text-left mob:flex-col mob:items-start">
      <div className="min-h-[2.5rem] w-[2.5rem] min-w-[2.5rem] overflow-clip border border-black">
        <Placeholder label="" tone={3} className="aspect-square w-full rounded-[2.5rem]" />
      </div>
      <div className={infoClassName}>
        <div className="text-[1rem] font-semibold leading-[1.4rem] text-ink">{name}</div>
        <div className="text-[1rem] leading-[1.4rem] text-ink">
          {role} <strong className="font-bold">{org}</strong>
        </div>
      </div>
    </div>
  )
}

const DEFAULTS = {
  trusted: 'Chosen by more than 500 teams around the world',
  heading: 'The learning platform behind ambitious teams',
  formTitle: 'Let’s set up your demo',
  introA: 'Smart tools where they help, people where they count. In just',
  introStrong: '30 minutes',
  introB: 'we will show you how Nimbus fits your team.',
  points: [
    'Bring learning, knowledge and news into one home. One sign-in.',
    'Nova, our AI helper, drafts lessons, coaches your people and turns your learning data into clear answers. Mentoring comes built in.',
    'Learning paths that grow skills, with reports that show results.',
    'Independently audited and certified, hosted on secure cloud servers.',
  ],
  badges: ['/assets/badge-g2.svg', '/assets/badge-capterra.svg', '/assets/badge-software-advice.svg'],
  quotes: [
    { text: '“Would I recommend Nimbus to other companies? Without a doubt. The partnership you build with the whole team is really unlike any other.”', name: 'Jordan Ellis', role: 'Global Head of Learning,', org: 'Northwind' },
    { text: '“I have worked with plenty of learning platforms and learning management systems over the years, and they have always felt clunky and overcomplicated. Nimbus simply takes all of those headaches away for us.”', name: 'Sam Rivera', role: 'Head of People Technology at', org: 'Harbor Mutual Group' },
  ],
}

// clientInfoClassName (optional): extra classes on each quote's name/role block; unset = unchanged.
export default function DemoHero(props) {
  const p = { ...DEFAULTS, ...props }
  return (
    <section data-section="demo-hero">
      <div className="padding-global">
        <div className="container-large">
          <div className="flex items-center justify-start gap-[1rem] pb-[1rem] text-small text-grey">
            <Placeholder src="/assets/hero-avatars.png" alt="" fit="contain" className="aspect-[144/64] w-[4.5rem] shrink-0" />
            <div>{p.trusted}</div>
          </div>
          <div className="pb-[5rem] tab:pb-[4rem] mob:pb-[3rem]">
            <div className="flex flex-col gap-[1rem]">
              <div className="grid grid-cols-2 gap-[5rem] xs:grid-cols-1 xs:gap-[1rem]">
                <div className="flex max-w-[42rem] flex-col items-start justify-between">
                  <h1 className="font-serif text-[3.8rem] font-normal leading-[1.1] text-ink xs:text-[2.5rem]">{p.heading}</h1>
                </div>
                <h3 className="mb-[1rem] self-end font-serif text-[1.75rem] font-normal leading-[1.15] text-ink xs:self-start xs:text-[1.5rem]">{p.formTitle}</h3>
              </div>
              <div className="-mb-[2rem] grid grid-cols-2 gap-[5rem] xs:grid-cols-1 xs:gap-[2rem]">
                <div className="xs:order-2">
                  <p className="mb-[2rem] max-w-[1000px] text-left text-body text-grey xs:text-body-xs">
                    {p.introA} <strong className="font-bold text-ink">{p.introStrong}</strong> {p.introB}
                  </p>
                  <ul className="mt-[10px] flex flex-col gap-[5px] pl-[1.5rem] text-[18px] leading-[1.4em] text-grey xs:pl-[24px]">
                    {p.points.map((t) => (
                      <li key={t} className="mb-[0.25rem] list-disc">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-start gap-[2rem] pt-[1rem]">
                    <Placeholder src={p.badges[0]} alt="Review badge" fit="contain" className="h-[10rem] w-[7rem] max-w-[7rem]" />
                    {p.badges.slice(1).map((b) => (
                      <Placeholder key={b} src={b} alt="Review badge" fit="contain" className="h-[12rem] w-[10rem] max-w-[10rem]" />
                    ))}
                  </div>
                </div>
                <div className="flex self-stretch xs:order-1 xs:w-full">
                  <Placeholder label="Demo request form" tone={1} className="h-[358px] w-[300px] rounded-card border border-hover" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[5rem] xs:grid-cols-1">
                {p.quotes.map((q, i) => (
                  <div key={i} className={`flex w-full flex-col items-start justify-between gap-[1.25rem] ${i > 0 ? 'xs:hidden' : ''}`}>
                    <div>
                      <p className="mb-[0.75rem] italic text-ink">{q.text}</p>
                      <Client {...q} infoClassName={p.clientInfoClassName} />
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
