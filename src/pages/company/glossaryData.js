// Glossary cards for /resources/lms-glossary: 27 terms (live count at measurement time). Terms and texts are placeholder
// copy chosen per card so the title / text line counts match the original's at 1440, 1280, 768 and 390.
const ROWS = [
  ['Kirkpatrick model', 'Kirkpatrick model explained in plain words: what it means, why it matters for growing teams and how to put it to work in your organisation.'],
  ['Assessment', 'Assessment explained in plain words: what it means, why it matters for growing teams and how to put it to work in your organisation.'],
  ['Blended learning', 'Blended learning programmes for distributed teams explained in plain words. Here is what it means and how growing teams use it every day to help people learn faster and work better together.'],
  ['Certification tracking', 'Certification tracking is easy to get started with: what it is, why it matters and how to measure whether it is working for your people and your business.'],
  ['Learning culture', 'Learning culture explained in plain words: what it means, why it matters for growing teams, how to build one that lasts, the simple habits that keep people curious every week and how to tell whether it is working.'],
  ['Competency framework', 'Competency framework explained in plain words: what it means, why it matters for growing teams and how to put it to work in your organisation.'],
  ['Coaching', 'Coaching is one of the ideas every learning team should know. Here is what it means and how growing teams use it every day to help people learn faster and work better together.'],
  ['Artificial intelligence in workplace learning', 'Artificial intelligence in workplace learning in a nutshell: what it means, why it matters for growing teams and how to put it to work in your organisation.'],
  ['eLearning', 'eLearning explained in plain words: what it means, why it matters for growing teams and how to put it to work in your organisation.'],
  ['LMS', 'LMS explained in plain words: what it means, why it matters for growing teams and how to put it to work.'],
  ['Applied learning', 'Applied learning explained in plain words: what it means, why it matters for growing teams and how to put it to work.'],
  ['Learning objectives', 'Learning objectives explained in plain words. Here is what it means and how growing teams use it every day to help people learn faster and work better together.'],
  ['Talent development', 'Talent development explained in plain words: what it means, why it matters for growing organisations, how to plan development programmes that last and the everyday habits that help people grow into bigger roles.'],
  ['ROI', 'ROI explained in plain words: what it means and why it matters.'],
  ['Compliance training', 'Compliance training explained in plain words: what it means, why it matters for growing teams and how to put it to work in your organisation.'],
  ['Adaptive learning', 'Adaptive learning explained in plain words: what it means, why it matters for growing teams and how to put it to work.'],
  ['Microlearning', 'Microlearning explained in plain words: what it means and why it matters.'],
  ['Job aid', 'Job aid is one of the ideas every learning team should know: what it means and why it matters.'],
  ['Bite-sized learning', 'Bite-sized learning explained in plain words, with examples from real teams, the benefits you can expect and the common mistakes to avoid when you start.'],
  ['SCORM', 'SCORM explained in plain words: what it means, why it matters for growing teams and how to put it to work.'],
  ['Cohort-based learning', 'Cohort-based learning explained in plain words: what it means, why it matters for growing teams and how to put it to work in your organisation.'],
  ['Content curation', 'Content curation explained in plain words: what it means, why it matters for growing teams and how to put it to work in your organisation.'],
  ['Gamification', 'Gamification explained in plain words: what it means, why it matters for growing teams and how to put it to work.'],
  ['xAPI', 'xAPI explained in plain words: what it means, why it matters for growing teams and how to put it to work.'],
  ['SSO', 'SSO lets everybody authenticate once, then reach every workplace application without additional passwords.'],
  ['Continuous learning', 'Continuous learning explained in plain words: what it means, why it matters for growing teams and how to put it to work in your organisation.'],
  ['Mentoring', 'Mentoring is one of the ideas every learning team should know, with examples from real teams, the benefits you can expect and the common mistakes to avoid when you start.'],
]

const KEEP_CASE = /^[A-Z]{2,}|^[a-z]/
export const GLOSSARY_TERMS = ROWS.map(([term, text]) => ({
  term,
  title: `What is ${KEEP_CASE.test(term) ? term : term.charAt(0).toLowerCase() + term.slice(1)}?`,
  text,
  href: '#',
}))
