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
    heading: ['Build a lasting ', 'mentoring', ' habit'],
    body: 'Your next great mentor is probably working somewhere across your organisation. Intelligent matching introduces people, then supports every pairing with thoughtful prompts and check-ins.',
    cta: { label: 'Explore mentoring', href: '/lms/mentoring-software' },
    media: { type: 'image', width: '70%', aspect: '1440 / 873', mb: '60px' },
    inset: true,
    headerClassName: 'mob:mb-[1rem]',
    wide: true,
    endSpacer: false,
    // three feature items + a customer-quote item, as on the original (copy lengths follow its line counts)
    items: [
      { title: 'Smart mentor matching', body: 'Pair the right mentors with the right people in seconds, using goals, skills and interests to suggest strong matches that both sides feel excited about from the very first meeting onwards.' },
      { title: 'Guided programmes', body: 'Give every pairing a clear path with ready-made programmes, prompts and check-ins that keep both people moving forward together.' },
      { title: 'Progress check-ins', body: 'See the impact of mentoring in one place, tracking sessions, goals and feedback so you can show leaders exactly how each pairing lifts skills and retention over the year.' },
      {
        title: 'What customers say about mentoring',
        body: '“Nimbus really understands what makes mentoring work. Our people found great matches fast and the programme keeps growing.”',
        quote: { name: 'Sam Rivera', role: 'Foundation Manager' },
      },
    ],
  },
  {
    theme: 'dark',
    eyebrow: 'New',
    heading: ['Nova ', '', 'connect'],
    body: 'You no longer need to open the platform to get work done. Connect Nimbus to the AI tools your team already uses and run everyday learning tasks from anywhere.',
    cta: null,
    media: { type: 'image', aspect: '1440 / 957', placement: 'top-flush' },
    // eyebrow sits tight on the H2 and the copy 1rem below it; the image follows the header directly
    headerGapClassName: 'gap-0',
    endSpacer: 2,
    gridClassName: 'mob:mb-[1.5rem]',
    bodyClassName: 'mt-[1rem]',
    items: items(
      ['Multi-agent connections', 'Secure permissions', 'Full audit trail', 'Quick setup for every admin team'],
      [
        'Connect Nimbus directly to the assistants your team already uses and work from one place.',
        'Connect Nimbus directly to the assistants your team already uses and work from one familiar place.',
        'Every action is logged with who did what and when, so reviews are quick and simple.',
        'Switch it on in minutes with guided steps and no developer time needed at all.',
      ],
    ),
  },
  {
    theme: 'light',
    heading: ['Reports that show the whole ', 'picture', ''],
    body: 'The whole picture, whenever you need it. New dashboards bring skills, completions and engagement together so leaders can see what is working and act on it straight away, without waiting on anyone.',
    cta: { label: 'Explore reporting', href: '/lms/features/lms-analytics' },
    // image straight under the header (centred), then a 5rem gap and a 60rem-wide grid, as on the original
    media: { type: 'image', width: '60rem', aspect: '1440 / 683', rounded: true, placement: 'top-flush', center: true },
    gridClassName: 'mx-auto mt-[1rem] max-w-[60rem] mob:mb-[1.5rem] mob:mt-[0.5rem]',
    items: items(
      ['Skills dashboards', 'Self-serve insight', 'Scheduled reports', 'Team views'],
      [
        'See exactly how skills are growing across every team, with clear charts that show where to invest next and which groups need a little more support.',
        'Every insight is available on demand, with simple filters anyone can use and nothing to request from the data team.',
        'Send a short summary to your leaders every week, month or quarter, with the numbers they care about most.',
        'Give each manager a simple view of their own team, with progress, gaps and wins in one place.',
      ],
    ),
  },
  {
    theme: 'dark',
    heading: ['Rewards that make learning ', 'fun', ''],
    body: 'Learning that pays off for everyone. People earn points for finishing courses, encouraging colleagues and sharing knowledge, then exchange them for rewards your organisation chooses, from additional holiday to thoughtful treats and charitable donations.',
    cta: null,
    media: { type: 'image', aspect: '1440 / 873', placement: 'bottom' },
    gridClassName: 'mob:mb-[-1rem]',
    inset: true,
    headerClassName: 'mob:mb-[1rem]',
    endSpacer: false,
    items: items(
      ['Points-based rewards', 'Custom reward store', 'Team challenges', 'Leaderboards'],
      [
        'Finishing learning earns points that people can swap for rewards chosen by your own team, from treats to time off.',
        'Build your own reward store with treats, gift cards, charity donations and extra time off that your people really want.',
        'Finishing learning earns points that people can swap for rewards chosen by your own team, from small treats and gift cards to extra time off.',
        'Friendly leaderboards show who is learning most this month, so teams cheer each other on and keep going.',
      ],
    ),
  },
  {
    theme: 'dark',
    heading: ['Chat: where learning meets ', 'conversation', ''],
    body: 'Chat puts conversations right next to learning, so people can ask questions, share tips and follow up on courses without ever leaving the platform or switching to another app.',
    cta: { label: 'Explore chat', href: '/lms/features/chat' },
    media: { type: 'image', width: '90%', aspect: '1440 / 873', mb: '69px' },
    inset: true,
    headerClassName: 'mob:mb-[1rem]',
    endSpacer: false,
    wide: true,
    items: items(
      ['Saved message history', 'Group conversations', 'Async teamwork', 'Rich sharing'],
      [
        'Every conversation is saved and searchable, so useful answers never get lost in the scroll again, even months later.',
        'Start a group for any team, project or course and keep every question and answer in one shared place.',
        'Pick up threads whenever suits you, so people on different shifts and time zones can still work together.',
        'Share files, links, courses and videos right inside any conversation, so everything people need to keep learning sits together in one tidy thread.',
      ],
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
        wrapClassName="tab:flex-wrap tab:justify-center mob:justify-around mob:gap-[2rem]"
        logoClassName="w-[7rem]"
        // ≤479 the original marks are 92px wide with their own heights (37 / 20 / 13 / 15 / 26 / 19), two per row
        logos={[
          'aspect-[122/37] leading-none xs:w-[6rem] xs:aspect-[92/37]',
          'aspect-[122/37] leading-none xs:w-[6rem] xs:aspect-[92/20]',
          'aspect-[122/37] leading-none xs:w-[6rem] xs:aspect-[92/13]',
          'aspect-[122/37] leading-none xs:w-[6rem] xs:aspect-[92/15]',
          'aspect-[122/37] leading-none xs:w-[6rem] xs:aspect-[92/26]',
          'aspect-[122/37] leading-none xs:w-[6rem] xs:aspect-[92/19]',
        ].map((aspect) => ({ text: 'Logo', aspect }))}
        trailingSpacer={false}
      />
      <div data-gap className="h-[1rem]" />
      <SpringGrid
        quote={{
          text: '“We treat Nova like a brand new colleague on the team. It takes on the repetitive work that used to fill our week, spots gaps before we do and gives our people answers in seconds. That frees our small team to spend its time on coaching, culture and the projects that actually move the whole business forward.”',
          name: 'Jordan Ellis',
          role: 'Head of Digital Learning, Northwind',
        }}
        items={[
          { title: 'Review', body: 'Nova reviews completion trends across every team and flags the courses that need attention before deadlines start to slip.' },
          { title: 'Build', body: 'Nova turns policies, notes and slide decks into short lessons with quizzes, ready for an admin to check and publish.' },
          { title: 'Plan', body: 'Nova suggests the next step for each person based on their role, goals and the skills their team is building right now.' },
          { title: 'Guide', body: 'Nova follows up after each course with friendly nudges and short, handy refreshers so all the learning really sticks.' },
        ]}
      />
      {BLOCKS.map((b, i) => (
        <SpringGrid key={i} quote={null} {...b} />
      ))}
      <WowBento variant="release" />
      <Faq heading="Spring release questions" items={FAQ} />
    </>
  )
}
