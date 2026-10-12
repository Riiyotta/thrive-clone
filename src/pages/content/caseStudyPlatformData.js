// Per-route content for the case-study-platform template (CaseStudyPlatform.jsx), keyed by clone path.
// Every text slot is placeholder copy sized (characters per block, measured from each original route's
// rendered DOM) so headings, chips and paragraphs wrap onto the same number of lines at 1440 and 390.
import { prose, phrase } from './filler.js'

const NAMES = ['one', 'two', 'three', 'four', 'five']

// Per route: H1 chars, stat 1, 4 challenge tags (chars), integration chips, stat 2 label/value,
// sections [[titleChars, [paragraph chars...]], ...], quote chars, role words, video title chars, caption chars.
const SPEC = [
  { h1: 50, stat: '150,000', tags: [16, 25, 17, 15], integ: ['HR suite', 'Mailbox', 'File hub', 'Team calendar', 'Video workspace'], label2: [27, '14%'],
    sections: [[32, [372, 427]], [25, [477, 428]], [24, [460, 209]]], quote: 199, role: 'Global Sales Training Manager,', video: 59, caption: 166 },
  { h1: 75, stat: '34,000', tags: [8, 18, 22, 22], integ: ['Notes', 'Library', 'Course market', 'People records', 'Book summaries app'], label2: [20, '70%'],
    sections: [[49, [492, 441]], [37, [409, 504]], [50, [372, 426, 162]]], quote: 119, role: 'Skills Academy Manager,', video: 44, caption: 190 },
  { h1: 67, stat: '6,000', tags: [25, 22, 19, 18], integ: ['Mailbox', 'Team calendar'], label2: [29, '1.5x'],
    sections: [[49, [392, 393]], [29, [159, 347, 310]], [36, [316, 340]]], quote: 160, role: 'Head of Learning and Development,', video: 48, caption: 180 },
  { h1: 49, stat: '13,100', tags: [19, 25, 23, 19], integ: ['Single login'], label2: [18, '8m+'],
    sections: [[38, [423, 399]], [38, [387, 486]], [41, [371, 358]]], quote: 181, role: 'Learning Lead,', video: 40, caption: 170 },
  { h1: 74, stat: '5,000', tags: [25, 23, 19, 19], integ: ['Employee records hub'], label2: [27, '800+'],
    sections: [[55, [346, 428]], [51, [484, 520]], [54, [374, 567]]], quote: 107, role: 'Director of Training and Development for Franchise Operations,', video: 55, caption: 150 },
]

const TAG_WORDS = ['Sales enablement', 'Customer service training', 'Product knowledge', 'Social learning', 'Skills development', 'Leadership development',
  'Coaching and mentoring', 'Frontline training', 'Employee onboarding', 'Compliance training', 'Franchise training', 'Employee engagement', 'Training']
// Pick the challenge tag whose length is closest to the measured one (unused tags first).
function tagsFor(lengths) {
  const used = new Set()
  return lengths.map((n) => {
    const best = TAG_WORDS.filter((t) => !used.has(t)).sort((a, b) => Math.abs(a.length - n) - Math.abs(b.length - n))[0]
    used.add(best)
    return best
  })
}

function build(s, i) {
  const name = `Customer ${NAMES[i]}`
  return {
    logo: name,
    title: phrase(`How ${name}`, s.h1, 20 + i * 7),
    cards: [
      { type: 'stat', label: 'Learners using Nimbus', value: s.stat },
      { type: 'tags', label: 'Challenges addressed with Nimbus', tags: tagsFor(s.tags) },
      { type: 'integrations', label: 'Integrations used', tags: s.integ },
      { type: 'stat', label: phrase('', s.label2[0], 60 + i * 5).replace(/^./, (c) => c.toUpperCase()), value: s.label2[1], link: { label: 'See how →', href: '#cs-section-3' } },
    ],
    sections: s.sections.map(([t, paras], k) => ({
      title: phrase('', t, 40 + k * 23 + i * 11),
      paragraphs: paras.map((n, j) => prose(n, k * 37 + j * 19 + i * 13)),
      image: k < 2,
    })),
    testimonial: {
      quote: `"${prose(s.quote - 2, 90 + i * 9)}"`,
      name: ['Jordan Ellis', 'Riley Morgan', 'Sam Rivers', 'Alex Morgan', 'Casey Lane'][i],
      role: `${s.role} ${name}`,
    },
    video: {
      title: phrase(`See how ${name}`, s.video, 120 + i * 4),
      caption: prose(s.caption, 150 + i * 6),
    },
  }
}

export const CASE_STUDY_PLATFORM = Object.fromEntries(SPEC.map((s, i) => [`/case-study/customer-${i + 1}`, build(s, i)]))

export const RELATED_SLIDES = ['one', 'two', 'three', 'four', 'five', 'six'].map((n) => ({
  logo: null,
  text: `Customer ${n} lifts course completion across every one of its sites in a single year`,
}))
