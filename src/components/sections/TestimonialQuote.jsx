import Button from '../shared/Button.jsx'
import Placeholder from '../shared/Placeholder.jsx'

// `testimonial-quote`: large centred customer quote (.wowtestimonial_data) with stacked author.
// Variants (all measured; values are design px / 16):
//  - "platform"     .section_testimonial.platform-top > .padding-top.padding-xlarge (4rem top, 2rem mobile)
//                   /lms (1st), /lms/features, /lms/solutions (the latter with `button="below"`).
//  - "platform-lg"  same with .platform-13: 5rem top on every breakpoint, 4rem bottom margin + 2rem pad (/lms 2nd).
//  - "section"      .section_testimonial > .padding-section-medium (5rem / 3rem mobile), button inside author (/lms 3rd).
//  - "mid-market"   bare .wowtestimonial_data.gap-small.mid-market: mt 2rem mb 3rem, 1rem gap, left-aligned
//                   quote text (/lms/corporate-lms).
//  - "enterprise"   .mid-market.enterprise.enterprise-2: mt 1rem, quote centred with 2rem left pad (/lms/enterprise).
//  - "kiki"         .padding-top.padding-huge (6rem / 5rem tab / 3.5rem mob), 3rem avatar (2.5rem <=479) (/nova).
// Avatar: 5rem (3rem for kiki); corner shape is the site-wide 6px TL/BR "tag" below 1440 and fully round
// (100px) at >=1440, exactly as the original.

// Default copy per variant (word/line counts of the original instance each variant was measured on).
const PRESETS = {
  platform: {
    quote: `"We needed a platform that feels engaging, looks great and matches how people behave in their lives outside work — that sense of streaming, user-made and AI-made content."`,
    name: 'Jordan Ellis',
    role: 'Head of Learning & Development,',
    org: 'Northwind',
  },
  'platform-features': {
    quote: `“Since moving from our old platform we’ve seen some amazing results: 171% more engagement, a third less time spent onboarding, 3,083% more average content completions and half of our annual training budget saved. It’s safe to say we've never looked back!”`,
    name: 'Sam Rivera',
    role: 'L&D Administrator,',
    org: 'Northwind Housing Group',
    orgBreak: true,
  },
  'platform-solutions': {
    quote: `"Just last year, we had over 50,000 event signups and took over 12,000 employees through our training programmes."`,
    name: 'Alex Morgan',
    role: 'Global Director of Field Talent, Contoso Workspace Group',
    org: null,
  },
  'platform-lg': {
    quote: `"We treat Nova like another member of the team, helping our people find answers faster, summarise, translate, and solve admin queries, freeing our team to focus on the business. This is the future of digital learning."`,
    name: 'Sam Rivera',
    role: 'Head of Digital Learning,',
    org: 'Fabrik Group',
    orgStyle: 'strong',
  },
  section: {
    quote: `"I have lots of experience working with different learning experience platforms and learning management systems, and they've always been clunky and complicated. Nimbus simply removes all of those problems."`,
    name: 'Alex Morgan',
    role: 'Head of People Technology, Insight and Learning,',
    org: 'Northwind Building Society',
  },
  'mid-market': {
    quote: `"I would definitely recommend Nimbus. If you're looking for a platform that really encourages collaboration [and] encourages individuals to take responsibility for their own learning, that's exactly what Nimbus allows you to do."`,
    name: 'Jordan Ellis',
    role: 'Global Talent Director,',
    org: 'Contoso',
  },
  enterprise: {
    quote: `"We can actually link our sales data. The reps who engage with the content on the platform are seeing a bigger lift in their earnings than reps who don't."`,
    name: 'Sam Rivera',
    role: 'Global Learning & Digital Training Leader,',
    org: 'Kite',
  },
  kiki: {
    quote: `"Nova (or Ask Nimbus) has been such a positive addition to our platform. It gives our very time-poor deskless workforce a way to get answers instantly in the flow of work... It has given them the confidence to have conversations they maybe were not comfortable having before."`,
    name: 'Jordan Ellis',
    role: 'Global Field & Retail Training Manager at',
    org: 'Kite',
  },
  autotabs: {
    quote: `"Everyone in L&D talks about AI right now. Fewer vendors help you see what it could actually look like inside the systems you already have. This is what that looks like. The same platform you already pay for, suddenly capable of far more than we expected."`,
    name: 'Jordan Ellis',
    role: 'Senior Talent Development Manager,',
    org: 'Vista Air',
    orgStyle: 'strong',
  },
  'autotabs-enterprise': {
    quote: `"One thing I love about Nimbus is how ambitious they are. I love the different ways of thinking, the bold ideas that they keep coming up with, and our whole team at Kite being part of that journey is truly exceptional."`,
    name: 'Sam Rivera',
    role: 'Global Head of L&D,',
    org: 'Kite',
    orgStyle: 'strong',
  },
}

const AVATAR_SHAPE = 'rounded-none rounded-tl-[6px] rounded-br-[6px] wide:rounded-[100px]'

function Author({ name, role, org, orgStyle, orgBreak, avatar, size, button, buttonClassName = 'mt-[1.5rem]' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-[0.75rem]">
      <div className={`flex items-center justify-center w-[3rem]`}>
        <Placeholder
          src={avatar}
          label=""
          tone={3}
          className={`aspect-square shrink-0 ${AVATAR_SHAPE} ${
            size === 'sm'
              ? 'h-[3rem] w-[3rem] min-w-[3rem] xs:h-[2.5rem] xs:w-[2.5rem] xs:min-w-[2.5rem]'
              : 'h-[5rem] w-[5rem] min-w-[5rem]'
          }`}
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-para text-ink xs:text-body-xs">{name}</div>
        <div className="text-body text-grey mob:text-small">
          {role}
          {org && (
            <>
              {' '}
              {orgStyle === 'strong' ? (
                <strong className="font-bold">{org}</strong>
              ) : (
                <a href="#" className="inline-link">
                  {org}
                </a>
              )}
              {orgBreak && (
                <>
                  <br />
                  <br />
                </>
              )}
            </>
          )}
        </div>
        {button && (
          <div className={`${buttonClassName} flex flex-wrap items-center justify-start gap-[1.5rem] xs:gap-[2rem]`}>
            <Button variant="primary" href={button.href}>
              {button.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// `buttonClassName` (optional, 'section' variant only): top margin of the in-author button; default 'mt-[1.5rem]'.
export default function TestimonialQuote({ variant = 'platform', preset, button, buttonClassName, ...over }) {
  // `preset` picks default copy (e.g. 'platform-features', 'platform-solutions'); any prop overrides it.
  const d = { orgStyle: 'link', ...(PRESETS[preset || variant] || PRESETS.platform), ...over }
  const { quote, name, role, org, orgStyle, orgBreak, avatar } = d
  const quoteText = (extra = '') => (
    <p className={`mb-[1.25rem] text-[2rem] font-medium leading-[1.2] text-ink tab:text-[1.75rem] mob:text-[1.5rem] ${extra}`}>{quote}</p>
  )

  if (variant === 'mid-market' || variant === 'enterprise') {
    return (
      <div
        data-section="testimonial-quote"
        data-variant={variant}
        className={`mx-auto mb-[3rem] flex max-w-[60rem] flex-col items-center justify-center gap-[1rem] ${
          variant === 'enterprise' ? 'mt-[1rem]' : 'mt-[2rem]'
        }`}
      >
        {quoteText(variant === 'enterprise' ? 'flex items-center justify-center pl-[2rem]' : 'flex')}
        <Author name={name} role={role} org={org} orgStyle={orgStyle} orgBreak={orgBreak} avatar={avatar} />
      </div>
    )
  }

  const data = (
    <div
      className={`mx-auto mb-[4rem] flex max-w-[60rem] flex-col items-center justify-center ${
        variant === 'kiki' ? 'gap-[1rem]' : 'gap-[2rem]'
      }`}
    >
      {quoteText(variant === 'kiki' ? 'flex text-center' : variant === 'autotabs-enterprise' ? 'text-center !mb-0' : 'text-center')}
      <Author
        name={name}
        role={role}
        org={org}
        orgStyle={orgStyle}
        orgBreak={orgBreak}
        avatar={avatar}
        size={variant === 'kiki' ? 'sm' : 'lg'}
        button={variant === 'section' ? button : null}
        buttonClassName={buttonClassName}
      />
    </div>
  )

  if (variant === 'autotabs' || variant === 'autotabs-enterprise') {
    // quote block that closes AutotabsGroup: no padding-global (full width on mobile)
    return (
      <div
        data-section="testimonial-quote"
        data-variant={variant}
        className={
          variant === 'autotabs'
            ? 'mb-[4rem] pt-[4rem] tab:pt-[3rem] mob:pt-[2rem]'
            : 'pb-[1rem] pt-[4rem] tab:pt-[3rem] mob:pt-[2rem]'
        }
      >
        <div className="container-medium">{data}</div>
      </div>
    )
  }

  if (variant === 'kiki') {
    return (
      <section data-section="testimonial-quote" data-variant="kiki">
        <div className="padding-global">
          <div className="container-medium">
            <div className="pt-[6rem] tab:pt-[5rem] mob:pt-[3.5rem]">{data}</div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'section') {
    return (
      <section data-section="testimonial-quote" data-variant="section">
        <div className="padding-global">
          <div className="py-[5rem] mob:py-[3rem]">
            <div className="container-medium">{data}</div>
          </div>
        </div>
      </section>
    )
  }

  // platform / platform-lg. The data block's 4rem bottom margin collapses out of the section (the
  // original's .padding-top has !important zero bottom padding), as do .platform-13's own margins.
  const lg = variant === 'platform-lg'
  return (
    <section data-section="testimonial-quote" data-variant={variant} className={button ? '' : 'mb-[3rem]'}>
      <div className="padding-global">
        <div className={lg ? 'mb-[4rem] pt-[5rem]' : 'pt-[4rem] tab:pt-[3rem] mob:pt-[2rem]'}>
          <div className="container-medium">{data}</div>
        </div>
        {button && (
          <div className="mt-[-3rem] flex flex-wrap items-center justify-center gap-[1.5rem] xs:gap-[2rem]">
            <Button variant="primary" href={button.href}>
              {button.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
