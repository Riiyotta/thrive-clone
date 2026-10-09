import { useState } from 'react'
import Button from '../shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from '../shared/Placeholder.jsx'
import { CheckList, CURRENCIES, Eyebrow, PricingSelect, TickerTrack, formatPrice } from './PricingHero.jsx'

// content-pricing: /pricing `.section_content-pricing`. Grid 1.25fr / 1fr, gap 6rem (1 col <=767).
// Left: yellow-chip eyebrow, H1 (h2 scale), #9b9b9b copy, two accordion cards (WowFaqs Open/Close 4: same timings
// as the shared FAQ, via .faq-body / .faq-icon). Right: content plan card — learners select, two checkbox tiles
// (custom 20px box, #333 -> #eee96d radius 6px when checked), price + currency select (price = core / suites /
// both, placeholder numbers), CTA, yellow check list, and a testimonial ticker under the card
// (IX2 "3cards - testimonial flip": every 6s the track moves one item, 850ms outQuart, loops).
const BRACKETS = ['1–150', '151–300', '301–500', '501–1,000', '1,001–2,500', '2,501–5,000', '5,000+']
const PRICES = {
  core: [12000, 14500, 16000, 18500, 22000, 27000, null],
  suites: [9000, 10500, 11500, 12500, 15500, 18500, null],
}

function Cross({ open }) {
  return (
    <svg data-open={open} className="faq-icon h-[1.25rem] min-h-[1.25rem] w-[1.25rem] min-w-[1.25rem] shrink-0 fill-icon" viewBox="0 0 20 20" aria-hidden>
      <path d="M4.7 3.3 10 8.6l5.3-5.3 1.4 1.4L11.4 10l5.3 5.3-1.4 1.4L10 11.4l-5.3 5.3-1.4-1.4L8.6 10 3.3 4.7z" />
    </svg>
  )
}

function AccordionCard({ q, a, strong }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col justify-center rounded-card bg-surface-1 px-[1.5rem] py-[1.25rem]">
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpen((o) => !o))}
        className="flex cursor-pointer items-center justify-between gap-[1.5rem]"
      >
        <h3 className="text-faq font-medium text-ink">{q}</h3>
        <Cross open={open} />
      </div>
      <div data-open={open} className="faq-body">
        <div className="overflow-hidden">
          <div className="pt-[1rem]">
            <p className="mb-[1.25rem] text-[1rem] leading-[1.4rem] text-grey">
              {strong && <strong className="font-bold">{strong} </strong>}
              {a}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Tile({ label, checked, onChange }) {
  return (
    <label className="mb-[0.3rem] flex flex-1 cursor-pointer gap-[0.75rem] rounded-card bg-surface-3 py-[1rem] pl-[2rem] pr-[1rem]">
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span aria-hidden className={`-ml-[24px] mt-0 h-[20px] w-[20px] shrink-0 ${checked ? 'rounded-[6px] bg-[#eee96d]' : 'rounded-[2px] bg-[#333]'}`} />
      <span className="text-ink">{label}</span>
    </label>
  )
}

const DEFAULTS = {
  eyebrow: 'Nimbus Library',
  heading: 'Stop making every course from scratch',
  intro: 'More than 2,000 ready-to-use lessons, refreshed every month and ready for every role and sector.',
  faqs: [
    {
      q: 'Core library',
      strong: 'More than 2,000',
      a: 'ready-made lessons covering the skills your teams need most. From leadership and compliance to wellbeing and safety at work, available as documents, course packages, video, audio and short social-style clips too. Written, checked and ready to share.',
    },
    {
      q: 'Sector-ready packs',
      strong: 'Six sector packs',
      a: 'built for the industries where compliance, safety and skills training matter most. Public services, retail, hospitality, finance, professional firms and food production, all shaped with our customers. Whether you serve guests, manage risk or run a busy site floor, your lessons are already written for you.',
    },
    {
      q: 'Expert services',
      a: 'From the first day you get a named success manager and content specialist who map your lessons, plan your campaigns and fill the gaps. Add monthly community sessions, hands-on workshops and a network of learning leaders, and you have a service that goes far beyond a library. We do not leave you to it. We grow alongside you.',
    },
  ],
  planEyebrow: 'Award-winning learning content',
  planLead: 'Lessons to get your team learning from day one.',
  question: 'Which content would you like?',
  tiles: ['Core library', 'Sector packs'],
  cta: 'Book a demo →',
  listLead: 'What comes with it',
  features: [
    'Expert-made lessons built by learning designers',
    'Ready to share from the very first day',
    'Video, audio and reading for every style',
    'Linked to your goals and your skill gaps',
    'Fresh lessons added every single month',
    'Easy to brand and adapt for your teams',
    'Reports that show what people complete',
  ],
  testimonials: [
    { quote: '“If you are looking for a partner that listens and delivers, Nimbus is it. Our people finally have short, useful lessons they enjoy and come back to.”', name: 'Jordan Ellis', role: 'Learning and Development Manager' },
    { quote: '“The library saved us months of work. We launched with ready-made lessons on day one and added our own as we went, all in the same place.”', name: 'Sam Rivera', role: 'Head of People Development' },
    { quote: '“Our managers love how quickly they can find the right lesson for their team. It has made learning part of the weekly routine across our sites.”', name: 'Alex Morgan', role: 'Training and Skills Lead' },
  ],
}

export default function ContentPricing(props) {
  const p = { ...DEFAULTS, ...props }
  const [users, setUsers] = useState(BRACKETS[0])
  const [cur, setCur] = useState('USD')
  const [core, setCore] = useState(false)
  const [suites, setSuites] = useState(false)
  const idx = BRACKETS.indexOf(users)
  // both packs together get a placeholder 15% bundle saving
  const usd = (core ? PRICES.core[idx] : 0) + (suites ? PRICES.suites[idx] : 0)
  const price = !core && !suites ? CURRENCIES[cur][0] + '0' : PRICES.core[idx] == null ? 'On request' : formatPrice(core && suites ? usd * 0.85 : usd, cur)

  return (
    <section data-section="content-pricing">
      <div className="padding-global">
        <div className="container-large">
          <div className="py-[7rem] tab:py-[5rem] mob:py-[4rem]">
            <div className="grid grid-cols-[1.25fr_1fr] gap-[6rem] mob:grid-cols-1">
              <div className="flex flex-col items-start justify-start gap-[4rem]">
                <div className="w-full">
                  <Eyebrow chip="bg-[#eee96d]">{p.eyebrow}</Eyebrow>
                  <div className="pt-[1rem]" />
                  <h1 className="heading-h2 mt-0">{p.heading}</h1>
                  <div className="pt-[1rem]" />
                  <div className="max-w-[28rem]">
                    <p className="mb-[1.25rem] text-[#9b9b9b]">{p.intro}</p>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-[0.5rem]">
                  {p.faqs.map((f) => (
                    <AccordionCard key={f.q} {...f} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="relative rounded-panel bg-surface-2 p-[2rem] xs:flex xs:flex-col xs:items-start xs:justify-between">
                  <Eyebrow chip="bg-[#eee96d]">{p.planEyebrow}</Eyebrow>
                  <div className="pt-[0.75rem]" />
                  <div className="mb-[1.25rem] text-grey">{p.planLead}</div>
                  <div className="flex flex-wrap items-center justify-start gap-[1rem] pt-[1.25rem] xs:flex-col xs:items-start xs:justify-center xs:pt-0">
                    <div className="text-ink">We have</div>
                    <PricingSelect label="Number of learners" value={users} options={BRACKETS} onChange={setUsers} width={180} tick="#eee96d" />
                    <div className="text-ink">learners</div>
                    <div className="text-grey">{p.question}</div>
                  </div>
                  <div className="w-full pt-[1rem]">
                    <form className="mb-[0.9rem] flex gap-[0.75rem] xs:flex-col" onSubmit={(e) => e.preventDefault()}>
                      <Tile label={p.tiles[0]} checked={core} onChange={setCore} />
                      <Tile label={p.tiles[1]} checked={suites} onChange={setSuites} />
                    </form>
                  </div>
                  <div className="flex items-center justify-start gap-[1rem]">
                    <div data-price className="font-serif text-[4rem] font-medium leading-[1.4] text-ink xs:text-[2.5rem]">
                      {price}
                    </div>
                    <PricingSelect label="Currency" value={cur} options={Object.keys(CURRENCIES)} onChange={setCur} width={110} compact />
                  </div>
                  <div className="flex flex-wrap items-center justify-start gap-[1.5rem] xs:gap-[2rem] xs:self-stretch">
                    <Button variant="primary" to="/content">
                      {p.cta}
                    </Button>
                  </div>
                  <div className="pt-[2rem]" />
                  <div className="pb-[1rem] text-grey">{p.listLead}</div>
                  <CheckList items={p.features} color="#eee96d" />
                </div>
                <div className="relative h-[16rem]">
                  <div className="absolute inset-x-0 top-0 mx-[1rem] flex flex-col rounded-b-[12px] border border-t-0 border-hover px-[1rem] pb-[1rem] pt-[1.5rem] xs:mx-0">
                    <TickerTrack
                      delay={6}
                      className="h-[13rem] overflow-clip"
                      trackClass="gap-[2rem]"
                      items={p.testimonials}
                      renderItem={(t) => (
                        <div className="flex flex-col text-grey">
                          <LogoPlaceholder className="mb-[1rem] h-[2rem] w-[4rem] self-start text-[0.625rem]" />
                          <p className="mb-[0.75rem] text-[1rem] italic leading-[1.4rem]">{t.quote}</p>
                          <div className="flex items-center justify-start gap-[0.5rem] text-left mob:w-full">
                            <div className="h-[2.5rem] w-[2.5rem] shrink-0 overflow-hidden rounded-full border border-black">
                              <Placeholder label="" tone={3} className="h-full w-full" />
                            </div>
                            <div>
                              <div className="text-[1rem] font-semibold leading-[1.4rem]">{t.name}</div>
                              <div className="text-small">{t.role}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
