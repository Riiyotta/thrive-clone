import Button from '../shared/Button.jsx'
import Placeholder, { LogoPlaceholder } from '../shared/Placeholder.jsx'
import Eyebrow from '../shared/Eyebrow.jsx'

// `wowcontent-hero` (.section_wowcontent): the page hero shared by 10 one-off templates. The
// structure differs per page, so `variant` selects the measured layout and every text/media slot is a
// prop with placeholder defaults (copy matches the original's word/line counts).
//
// variant          route                    layout
// small-business   /lms/small-business      split, eyebrow chip, long para, hero quote, 1 button, image
// corporate        /lms/corporate-lms       empty spacer (5rem / 3rem); hero lives in logos-hero-overlap
// enterprise       /lms/enterprise          split, h1 with italic word, para, quote, button, contain image + 7 logos
// solutions        /lms/solutions           centred, h1 (2 lines, italic), para, button
// spring-release   /lms/spring-release      centred, "NEW" tag, 1-line h1, para, button, full-width image
// features         /lms/features            split (no left padding), h1, para, primary + dark-small, image bleeding right
// mentoring        /mentoring               split, avatars, h1, para, button; empty right visual
// case-studies     /case-studies/lms        split (top-aligned, container-large), avatars, 4rem title, para, featured card, image
// why              /company/why-nimbus      split, avatars, h1, para + quote, 3 badges, button, image
// whats-included   /whats-included          centred, h1, white para, button
//
// Motion: /lms/small-business has the IX2 "Thrive Go Header Animation" (scroll into view); it is
// reproduced in WowContentHero only as static end state (see report) because it fires on load in view.

const H1 = 'font-serif text-[3.8rem] font-normal leading-[1.15] text-ink mob:text-[2.5rem]'
const PARA = 'text-para text-grey'
const AV_SHAPE = 'rounded-[2.5rem]'

function AvatarGroup({ label }) {
  return (
    <div className="flex items-center justify-start gap-[1rem] text-small text-grey">
      <Placeholder src="/assets/hero-avatars.png" fit="contain" className="aspect-[144/64] w-[4.5rem] shrink-0" />
      <div>{label}</div>
    </div>
  )
}

// .testimonial11_content (hero quote). `size` 'sm' = 16px quote + 14px client (thrive-go / mid-market),
// 'md' = 18px quote + 16px client (why page).
function HeroQuote({ quote, name, role, org, size = 'sm', className = '', quoteClass = '' }) {
  const sm = size === 'sm'
  return (
    <div className={`rounded-card ${className}`}>
      <p className={`mb-[0.75rem] italic text-ink ${sm ? 'text-[1rem] leading-[1.4rem]' : 'text-body xs:text-body-xs'} ${quoteClass}`}>
        {quote}
      </p>
      <div className="flex items-center gap-[1rem] text-left mob:w-full mob:flex-col mob:items-start">
        <div className="min-h-[2.5rem] w-[2.5rem] min-w-[2.5rem] overflow-clip border border-page">
          <Placeholder label="" tone={3} className={`aspect-square w-full ${AV_SHAPE}`} />
        </div>
        <div className="mob:mb-[1rem]">
          <div className={`font-semibold text-ink ${sm ? 'text-small' : 'text-[1rem] leading-[1.4rem]'}`}>{name}</div>
          <div className={`text-ink ${sm ? 'text-small' : 'text-[1rem] leading-[1.4rem]'}`}>
            {role}{' '}
            {size === 'md' ? (
              <a href="#" className="inline-link">
                {org}
              </a>
            ) : (
              <strong className="font-bold">{org}</strong>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Buttons({ items, className = '' }) {
  return (
    <div className={`flex items-center justify-start gap-[1rem] mob:flex-col mob:items-start ${className}`}>
      {items.map((b, i) => (
        <Button key={i} variant={b.variant || 'primary'} href={b.href || '/lms/demo-platform'}>
          {b.label}
        </Button>
      ))}
    </div>
  )
}

const DEFAULT_QUOTE = {
  quote: (
    <>
      "I would happily recommend Nimbus to other organisations. It's a brilliant platform. It has that “pick up and go” feel
      for people who are very busy at work, but need to build content quickly. Ultimately it's a really great experience for
      every learner."
      <br />
      <br />
    </>
  ),
  name: 'Jordan Ellis',
  role: 'Learning Development and Innovation Lead,',
  org: 'Northwind Community Trust',
}

export default function WowContentHero({ variant = 'solutions', ...p }) {
  const V = VARIANTS[variant] || VARIANTS.solutions
  return (
    <section data-section="wowcontent-hero" data-variant={variant}>
      {V(p)}
    </section>
  )
}

const VARIANTS = {
  corporate: () => (
    <div className="padding-global">
      <div className="container-medium">
        <div className="py-[5rem] mob:py-[3rem]" />
      </div>
    </div>
  ),

  'small-business': ({
    eyebrow = 'Nimbus Go',
    title = 'The best platform for small teams',
    paragraph = (
      <>
        Nimbus Go is the friendly learning platform built for small businesses of 10 to 500 people — big-company features,
        without the big-company price tag.
        <br />
        <br />
        Onboarding, compliance courses and skills growth, made simple. 900+ ready-made courses, mentoring and Nova, our AI
        assistant, all included at no extra cost.
      </>
    ),
    quote = DEFAULT_QUOTE,
    button = { label: 'See Nimbus in action →', href: '/lms/demo-platform' },
  }) => (
    <div className="padding-global">
      <div className="mx-auto w-full max-w-[100rem]">
        <div className="pb-[1rem] pt-[2rem]">
          <div className="flex items-center justify-between gap-[3rem] mob:flex-col mob:items-start">
            <div className="flex w-full max-w-[44rem] flex-col items-start self-start">
              <Eyebrow chipClassName="bg-[#9335fe]">{eyebrow}</Eyebrow>
              <div className="pt-[1rem]" />
              <div className="w-full max-w-[28rem]">
                <h1 className={H1}>{title}</h1>
              </div>
              <div className="pt-[1rem]" />
              <div className="w-full max-w-[35rem]">
                <p className={`mb-[4px] ${PARA}`}>{paragraph}</p>
              </div>
              <HeroQuote {...quote} className="my-[0.5rem] bg-[rgba(11,11,11,0.01)] py-[1rem] pr-[1rem]" quoteClass="max-w-[35rem]" />
              <Buttons items={[button]} />
            </div>
            <div className="w-full max-w-full overflow-clip" style={{ maxHeight: '40rem' }}>
              <Placeholder label="Product screenshot" tone={2} className="aspect-[1440/1002] w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  enterprise: ({
    title = (
      <>
        The <em className="italic">enterprise</em> learning experience platform
      </>
    ),
    paragraph = (
      <>
        You don't need separate tools for learning, knowledge and news. Nimbus brings it all together — an independently
        certified platform with AI agents built in, made to perform at a truly global scale.
        <br />
        <br />
        Built to run learning across brands, regions and global workforces without giving up any security or control.
      </>
    ),
    quote = {
      quote: '"Would I recommend Nimbus to other organisations? A resounding yes. The partnership you build with Nimbus is like no other."',
      name: 'Jordan Ellis',
      role: 'Global Head of L&D,',
      org: 'Kite',
    },
    button = { label: 'See Nimbus in action →', href: '/lms/demo-platform' },
    logosLabel = 'Across every industry, all around the world, the biggest brands are turning to Nimbus.',
    logos = ['logo-volvo.png', 'logo-burgerking.png', 'logo-vodafone.png', 'logo-ba.png', 'logo-krispykreme.svg', 'logo-nothingbundt.png', null],
    // optional: per-logo aspect classes (replace aspect-[96/26] for logo i); default unchanged
    logoAspects = [],
  }) => (
    <div className="padding-global">
      <div className="container-medium mt-[1rem]">
        <div className="flex items-center justify-between gap-[3rem] mob:flex-col mob:items-start">
          <div className="flex w-full max-w-[80rem] flex-[0_1_auto] flex-col items-start self-start">
            <div className="w-full pt-[1rem]" />
            <div className="w-full">
              <h1 className={H1}>{title}</h1>
            </div>
            <div className="w-full pt-[1rem]" />
            <div className="w-full max-w-[35rem]">
              <p className={`mb-[1rem] ${PARA}`}>{paragraph}</p>
            </div>
            <HeroQuote {...quote} className="mb-[2rem] max-w-[34rem] bg-[rgba(11,11,11,0.01)] pb-[1rem] pr-[1rem]" quoteClass="max-w-[34rem]" />
            <Buttons items={[button]} />
          </div>
          <div className="w-full max-w-full shrink overflow-clip" style={{ maxHeight: '40rem' }}>
            <Placeholder label="Product visual" tone={2} className="aspect-[1440/1339] w-full" />
          </div>
        </div>
      </div>
      <div className="mt-[4rem] flex w-full flex-col items-center justify-start gap-[2rem]">
        <div className="text-center text-body text-ink xs:text-body-xs">{logosLabel}</div>
        <div className="flex min-h-[4rem] max-w-[60rem] items-center justify-between gap-[3rem] tab:flex-wrap tab:justify-center tab:gap-y-[2rem] mob:justify-around xs:gap-[2rem]">
          {logos.map((f, i) => (
            <div key={i} className="flex w-[7rem] items-center justify-center overflow-clip">
              <LogoPlaceholder
                src={f ? `/assets/${f}` : undefined}
                text="Logo"
                className={`${logoAspects[i] || 'aspect-[96/26]'} w-[6rem] text-[0.75rem] mob:w-[5rem] xs:w-[6rem]`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  solutions: ({
    title = (
      <>
        Learning tools for <br />
        <em className="italic">every team</em>
      </>
    ),
    paragraph = 'Nimbus learning solutions cover onboarding, compliance, skills and performance for every team. Used by 400+ organisations across 50+ countries, without juggling separate learning and comms tools.',
    button = { label: 'See Nimbus in action', href: '/lms/demo-platform' },
  }) => (
    <div className="padding-global">
      <div className="container-medium">
        <div className="pb-[2rem] pt-[5rem] mob:pt-[3rem]">
          <div className="flex flex-col items-center justify-start gap-y-[4.375rem] xs:gap-x-[3rem]">
            <div className="flex w-full max-w-[36rem] flex-col items-center justify-start text-center">
              <h1 className={H1}>{title}</h1>
              <p className={`mb-[1.25rem] mt-[1rem] text-center ${PARA}`}>{paragraph}</p>
              <div className="w-full pt-[1rem]" />
              <Buttons items={[button]} className="justify-center mob:items-center" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  'spring-release': ({
    tag = 'NEW',
    title = 'The Nimbus Fall Release',
    paragraph = 'Our newest features bring helpful AI into your daily workflows, taking on the manual work so your people can focus on what matters most: each other.',
    button = { label: 'See it all in action', href: '/lms/demo-platform' },
  }) => (
    <div className="padding-global">
      <div className="container-medium">
        <div className="py-[5rem] mob:py-[3rem]">
          <div className="flex flex-col items-center justify-start gap-y-[4.375rem]">
            <div className="flex w-full max-w-[56rem] flex-col items-center justify-start text-center">
              <div className="mb-[0.75rem] rounded-pill border border-[#01584b] bg-[#00251e] px-[0.75rem] py-[0.325rem] text-small font-medium text-[#1ee9b6] xs:px-[0.625rem] xs:py-[0.425rem] xs:text-[0.725rem] xs:leading-[1.015rem]">
                {tag}
              </div>
              <h1 className={H1}>{title}</h1>
              <div className="w-full pt-[1rem]" />
              <p className={`mb-[1.25rem] ${PARA}`}>{paragraph}</p>
              <Buttons items={[button]} className="justify-center mob:items-center" />
            </div>
            <div className="relative flex w-full flex-col overflow-clip">
              <Placeholder label="Release overview" tone={2} className="aspect-[1439/1340] w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  features: ({
    title = 'Platform features that improve learning and output',
    paragraph = 'Nimbus platform features cover learning, AI, skills, mentoring, communications, analytics and integrations, with Nova built in.',
    buttons = [
      { label: 'Book a demo', variant: 'primary', href: '/lms/demo-platform' },
      { label: 'See our latest releases', variant: 'dark-small', href: '#' },
    ],
  }) => (
    <div className="pl-0 pr-[2rem] mob:pr-[1.25rem]">
      <div className="container-medium">
        <div className="pb-[2rem] pt-[5rem] mob:pt-[3rem]">
          <div className="flex items-center justify-start gap-[3rem] tab:gap-0 tab:px-[2.5rem] mob:flex-col mob:gap-[3rem] xs:pl-[1rem] xs:pr-0">
            <div className="flex w-full max-w-[36rem] flex-col items-start justify-start">
              <h1 className={H1}>{title}</h1>
              <div className="w-full max-w-[36rem]">
                <p className={`mb-[1.25rem] mt-[1rem] ${PARA}`}>{paragraph}</p>
              </div>
              <div className="w-full pt-[1rem]" />
              <Buttons items={buttons} className="mob:items-stretch" />
            </div>
            <div className="mr-[-10vw] w-full max-w-full overflow-clip mob:mr-0" style={{ maxHeight: '40rem' }}>
              <Placeholder label="Platform overview" tone={2} className="aspect-[1440/920] w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  mentoring: ({
    avatarsLabel = 'Loved by over 4 million learners',
    title = 'Mentoring programmes that take the heavy lifting',
    paragraph = 'Ready-to-run, people-first mentoring that builds confident, inclusive leaders and sets every pairing up for success.',
    button = { label: 'Book a demo', href: '/lms/demo-platform' },
  }) => (
    <div className="padding-global">
      <div className="container-medium">
        <div className="py-[5rem] mob:py-[3rem]">
          <div className="flex items-center justify-between gap-[3rem] mob:flex-col mob:items-start">
            <div className="flex flex-col items-start justify-start">
              <AvatarGroup label={avatarsLabel} />
              <div className="w-full pt-[1rem]" />
              <h1 className={H1}>{title}</h1>
              <div className="w-full pt-[1rem]" />
              <div className="w-full max-w-[36rem]">
                <p className={`mb-[1.25rem] ${PARA}`}>{paragraph}</p>
              </div>
              <div className="w-full pt-[2rem] tab:pt-[1.5rem] mob:pt-[1.25rem]" />
              <div className="flex w-full flex-wrap items-center justify-start gap-[1.5rem] xs:gap-[2rem]">
                <Button variant="primary" href={button.href}>
                  {button.label}
                </Button>
              </div>
            </div>
            {/* empty .wowsection_right-visual (no image on the original; still takes flex space) */}
            <div className="mr-[-30vw] w-full max-w-full overflow-clip mob:mr-[-30vw]" style={{ maxHeight: '40rem' }} />
          </div>
        </div>
      </div>
    </div>
  ),

  'case-studies': ({
    avatarsLabel = 'Trusted by 400+ organisations across 50+ countries',
    title = 'Learning case studies that go beyond completions',
    paragraph = 'Nimbus is an AI-powered learning platform used by four million people at organisations including Customer one, Customer two, a regional council and a national retail body. These customer stories show measured results in onboarding, compliance, adoption, admin time and sales, across retail, hospitality, public sector and financial services. Filter by industry, company size or use case to find your story.',
    feature = {
      name: 'Customer three',
      tag: 'Featured',
      text: 'Customer three drives a 1.5x return on staffing cost savings',
      cta: 'Read Case Study',
      href: '/case-study/customer-3',
    },
  }) => (
    <div className="padding-global">
      <div className="container-large">
        <div className="pb-[2rem] pt-[5rem] mob:pt-[3rem]">
          <div className="flex items-start justify-between gap-[3rem] mob:flex-col">
            <div className="flex w-full max-w-[42rem] flex-col items-start justify-start">
              <AvatarGroup label={avatarsLabel} />
              <div className="w-full pt-[1rem]" />
              <h1 className="heading-h2 mb-[2rem] !mt-0">{title}</h1>
              <p className={`mb-[2rem] ${PARA}`}>{paragraph}</p>
              <div className="flex h-full w-[25rem] flex-col items-start justify-start gap-[1.5rem] rounded-card bg-surface-1 p-[1.5rem] xs:w-full">
                <div className="flex w-full justify-between">
                  <div className="flex items-center justify-start gap-[0.5rem]">
                    <div className="flex h-[2rem] min-h-[2rem] w-[2rem] min-w-[2rem] items-center justify-center overflow-clip rounded-media bg-ink" />
                    <div className="text-body text-ink xs:text-body-xs">{feature.name}</div>
                  </div>
                  <div className="flex items-center justify-center rounded-pill bg-[#00251e] px-[0.75rem] py-[0.25rem] text-[0.75rem] leading-none text-green-hover">
                    {feature.tag}
                  </div>
                </div>
                <p className="mb-[1.25rem] text-[1rem] leading-[1.4rem] text-ink">{feature.text}</p>
                <Button variant="dark-small" href={feature.href}>
                  {feature.cta}
                </Button>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <Placeholder label="Customer collage" tone={2} className="aspect-[1440/1155] w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  why: ({
    avatarsLabel = 'Loved by 4 million learners across 50+ countries',
    title = (
      <>
        Why should your tools
        <br />
        stop at learning?
      </>
    ),
    paragraph = (
      <>
        AI where it helps. Human where it counts. Everything your people need to learn, connect and grow, all in one place.
        <br />
        <br />
        That's why teams trust Nimbus.
      </>
    ),
    quote = {
      quote: (
        <>
          "It never feels like we're just another client. <br />
          We're on their journey, and they're on ours. Nothing is ever too much."
        </>
      ),
      name: 'Jordan Ellis',
      role: 'Head of Learning and Development,',
      org: 'Fabrik',
    },
    badges = ['badge-capterra.svg', 'badge-g2.svg', 'badge-software-advice.svg'],
    button = { label: 'See for yourself →', href: '/lms/demo-platform' },
  }) => (
    <div className="padding-global">
      <div className="container-medium">
        <div className="py-[2rem]">
          <div className="flex items-center justify-between gap-[3rem] mob:flex-col mob:items-start">
            <div className="flex w-full max-w-[56rem] flex-col items-start justify-start">
              <AvatarGroup label={avatarsLabel} />
              <div className="w-full pt-[1rem]" />
              <h1 className={H1}>{title}</h1>
              <div className="w-full pt-[1rem]" />
              <div className="w-full max-w-[28rem]">
                <p className={`mb-[4px] ${PARA}`}>{paragraph}</p>
              </div>
              <HeroQuote {...quote} size="md" className="mb-[1rem] mt-[0.5rem] w-full bg-page py-[1rem] pr-[1rem]" />
              <div className="mb-[2rem] flex items-center justify-start gap-[2rem]">
                {badges.map((f, i) => (
                  <Placeholder key={i} src={`/assets/${f}`} fit="contain" className="aspect-[288/150] w-[6.5rem] xs:w-[5rem]" />
                ))}
              </div>
              <div className="flex w-full flex-wrap items-center justify-start gap-[1.5rem] xs:gap-[2rem]">
                <Button variant="primary" href={button.href}>
                  {button.label}
                </Button>
              </div>
            </div>
            <div className="w-full max-w-full overflow-clip" style={{ maxHeight: '40rem' }}>
              <Placeholder label="Platform overview" tone={2} className="aspect-[1440/920] w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  'whats-included': ({
    title = 'Everything you need to transform your training',
    paragraph = (
      <>
        AI, mentoring, analytics, skills and a fully branded learning home all included as standard. One platform for every
        question
        <br />
        <br />
      </>
    ),
    button = { label: 'Book your demo →', href: '/lms/demo-platform' },
  }) => (
    <div className="padding-global">
      <div className="container-medium">
        <div className="pt-[5rem] mob:pt-[3rem]">
          <div className="flex flex-col items-center justify-start gap-y-[4.375rem]">
            <div className="flex w-full max-w-[42rem] flex-col items-center justify-start text-center">
              <div className="w-full pt-[1rem]" />
              <h1 className={H1}>{title}</h1>
              <div className="w-full pt-[1rem]" />
              <p className="mb-[1.25rem] text-para text-ink">{paragraph}</p>
              <Buttons items={[button]} className="justify-center mob:items-center" />
            </div>
            <div className="flex flex-col" />
          </div>
        </div>
      </div>
    </div>
  ),
}
