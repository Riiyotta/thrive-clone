// FAQ copy for the content family. Question lengths (characters) follow each original route so the
// questions wrap onto the same number of lines; answers are collapsed by default (only open-state height).
import { prose } from './filler.js'

const qa = (qs, seed = 0) => qs.map((q, i) => ({ q, a: prose(150 + ((i * 47) % 160), seed + i * 23) }))

// faq-legacy title shared by /content, /content/topics, /content/sector-suites (4 words, 1 line @1440, 2 @390)
export const LEGACY_FAQ_TITLE = 'Every answer, right here'
export const LEGACY_FAQ_EYEBROW = "FAQ's"

export const CONTENT_FAQ = qa([
  'How long does it take to launch Nimbus content?',
  'How many learning resources do my teams receive?',
  'Which content formats does the library include?',
  'Which languages does Nimbus content cover?',
  'What makes Nimbus content different from other learning libraries?',
  'Why use LMS content?',
  'Who makes the best content for an LMS?',
])

export const TOPICS_FAQ = qa([
  'Which topics does the library cover?',
  'How often are new courses added to the core library?',
  'Can we tailor resources to suit our brand?',
  'Do the courses work on phones as well as laptops?',
  'How can we see the impact of the content we choose?',
], 5)

export const SUITES_FAQ = qa([
  'What are Nimbus sector suites?',
  'How do you decide which topics belong in every suite?',
  'Which formats of content are included in every suite?',
  'Do sector suites include compliance and regulatory courses?',
  'Can we combine sector suites with the core library too?',
], 9)

// Heading wraps at 34rem (2 lines at 1440 and 390, as on the original).
export const CUSTOM_FAQ_HEADING = 'Your custom content questions, answered'
export const CUSTOM_FAQ = qa([
  'What is bespoke eLearning development?',
  'How does bespoke eLearning differ from ready-made, off-the-shelf courses?',
  'How long does building a bespoke eLearning programme take?',
  'Can you build custom eLearning content for any industry?',
], 13)

export const MENTORING_FAQ = qa([
  'What is a ready-made mentoring programme kit?',
  'How is Nimbus mentoring any different?',
  'What comes inside every mentoring programme?',
  'Which people are the programmes for?',
  'What results can we look for?',
  'Do mentors need past experience?',
  'How does each programme run day to day?',
  'Do the programmes work for remote and hybrid teams too?',
  'How flexible are these programmes?',
  'Is support available during onboarding and launch?',
  'Can we track the impact of mentoring?',
  'How long does each programme run?',
  'Can we run several themes at the same time?',
  'Which optional extras can we add on?',
  'Where do the mentoring programmes live?',
], 17)

export const CASE_STUDIES_FAQ_HEADING = 'Our customer story FAQs'
export const CASE_STUDIES_FAQ = qa([
  'Which teams already use Nimbus?',
  'What results do Nimbus onboarding stories usually show?',
  'Have teams moved to Nimbus from a different system?',
  'How do teams drive platform adoption?',
  'Does Nimbus suit frontline and multi-location teams?',
  'How do you measure the ROI?',
  'What are the perks of a platform?',
], 21)
