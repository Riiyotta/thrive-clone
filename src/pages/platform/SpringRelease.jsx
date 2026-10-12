// /lms/spring-release (page-lms-spring-release): hero → logos → 6 release-note blocks → wowbento (release) → faq.
import WowContentHero from '../../components/sections/WowContentHero.jsx'
import LogoStrip from '../../components/LogoStrip.jsx'
import SpringGrid from '../../components/sections/SpringGrid.jsx'
import WowBento from '../../components/sections/WowBento.jsx'
import Faq from '../../components/Faq.jsx'
import { faqItems } from './faq.js'

const items = (list, body) => list.map((title, i) => ({ title, body: Array.isArray(body) ? body[i] : body }))

// Each block's copy follows the original's word / line structure (see CLONE_SPEC_PAGES §C page-lms-spring-release).
const BLOCKS = [
  {
    theme: 'dark',
    heading: ['Build a ', 'mentoring', ' habit'],
    body: 'The right mentor for every person is now just a click away. Smart matching looks at goals, skills and interests to pair people up, then guides each pairing with prompts and check-ins.',
    cta: { label: 'Explore mentoring', href: '/lms/mentoring-software' },
    media: { type: 'image', width: '70%', aspect: '1440 / 873', mb: '3.15rem' },
    inset: true,
    wide: true,
    items: items(
      ['Smart mentor matching', 'Guided programmes', 'Progress check-ins', 'Customer view'],
      'Pair the right mentors with the right people in seconds, using goals, skills and interests to suggest strong matches that both sides are excited about from the very first meeting.',
    ),
  },
  {
    theme: 'dark',
    eyebrow: 'New',
    heading: ['Nova ', '', 'connect'],
    body: 'You no longer need to open the platform to get work done. Connect Nimbus to the AI tools your team already uses and run everyday learning tasks from wherever you happen to be.',
    cta: null,
    media: { type: 'image', aspect: '1440 / 957', placement: 'top' },
    items: items(
      ['Multi-agent connections', 'Secure permissions', 'Full audit trail', 'Fast setup'],
      'Connect Nimbus directly to the assistants your team already uses and work from one familiar place.',
    ),
  },
  {
    theme: 'light',
    heading: ['Reports that show the whole ', 'picture', ''],
    body: 'The whole picture, whenever you need it. New dashboards bring skills, completions and engagement together so leaders can see what is working and act on it straight away, without waiting on anyone.',
    cta: { label: 'Explore reporting', href: '/lms/features/lms-analytics' },
    media: { type: 'image', width: '76.4%', aspect: '1440 / 683', rounded: true },
    items: items(
      ['Skills dashboards', 'Self-serve insight', 'Scheduled reports', 'Team views'],
      [
        'See exactly how skills are growing across every team, with clear charts that show where to invest next and which groups need a little more support.',
        'Every insight is available on demand, with filters anyone can use and nothing to request.',
        'Send a short summary to leaders every week, month or quarter, with the numbers they care about most.',
        'Give each manager a simple view of their own team, with progress, gaps and wins in one place.',
      ],
    ),
  },
  {
    theme: 'dark',
    heading: ['Rewards that make learning ', 'fun', ''],
    body: 'Learning that pays off for everyone. People earn points for finishing courses, helping colleagues and sharing what they know, then swap them for rewards your team picks, from extra time off to treats and charity gifts.',
    cta: null,
    media: { type: 'image', aspect: '1440 / 873', placement: 'bottom' },
    inset: true,
    items: items(
      ['Points-based rewards', 'Custom reward store', 'Team challenges', 'Leaderboards'],
      'Finishing learning earns points that people can swap for rewards chosen by your own team.',
    ),
  },
  {
    theme: 'dark',
    heading: ['Chat: where learning meets ', 'conversation', ''],
    body: 'Chat puts conversations right next to learning, so people can ask questions, share tips and follow up on courses without ever leaving the platform or switching to another app.',
    cta: { label: 'Explore chat', href: '/lms/features/chat' },
    media: { type: 'image', width: '90%', aspect: '1440 / 873', mb: '3.63rem' },
    inset: true,
    wide: true,
    items: items(
      ['Saved message history', 'Group conversations', 'Async teamwork', 'Rich sharing'],
      'Every conversation is saved and searchable, so useful answers never get lost in the scroll again.',
    ),
  },
]

const FAQ = faqItems([
  'When will the new spring features be switched on for every customer account?',
  'Do we need to do anything to turn on the new features, or will they simply appear for all of our admins?',
  'Is there an extra cost for any of the new features in this spring release?',
  'Where can we find training guides and help articles for each of the new features?',
  'How can our admins share feedback and ideas on the new features with your team?',
])

export default function SpringRelease() {
  return (
    <>
      <WowContentHero variant="spring-release" />
      <LogoStrip
        heading={null}
        paddingClassName="py-[5rem] mob:py-[3rem]"
        wrapClassName="mob:flex-wrap mob:justify-around mob:gap-[2rem]"
        logos={Array.from({ length: 6 }, () => ({ text: 'Logo', aspect: 'aspect-[122/37]' }))}
        trailingSpacer={false}
      />
      <div data-gap className="h-[1rem]" />
      <SpringGrid />
      {BLOCKS.map((b, i) => (
        <SpringGrid key={i} quote={null} {...b} />
      ))}
      <WowBento variant="release" />
      <Faq heading="Spring release questions" items={FAQ} />
    </>
  )
}
