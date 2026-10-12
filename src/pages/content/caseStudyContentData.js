// Per-route props for the case-study-content template (CaseStudyContent.jsx), keyed by clone path.
// Structure (H1 length, stat chips, topic chips with/without icon, article sections and block order,
// figure types, quote length, related cards) follows each original route as measured from its rendered
// DOM; every text is placeholder copy sized by character count (filler.js) so line counts match.
import { prose, phrase } from './filler.js'

const NAME = { 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten' }

// Article spec: one entry per rich-text block = one TOC section. Block codes:
// ['h', chars, bold] sub-heading (first one = section title) | ['p', chars] | ['s'] spacer paragraph |
// ['e'] empty paragraph | ['f', 'landscape'|'wide'|'full'] figure | ['q', chars] ruled blockquote.
export const SPEC = {
  6: {
    h1: 91,
    solutions: ['Employee engagement', 'Skills development', 'Social learning', 'Essential learning'],
    topics: [['D&I', true], ['Mental health & Wellbeing', true], ['Compliance', false]],
    preset: 'short',
    article: [
      [['h', [32, 1, 0], true, 69], ['p', 640, undefined, 31]],
      [['h', 29, true, 101], ['s'], ['p', 537, undefined, 93], ['h', 26, true], ['s'], ['p', 433]],
    ],
    quote: 169,
    related: [[8, 144], [9, 104], [10, 110]],
  },
  7: {
    h1: 98,
    solutions: ['Frontline training', 'Essential learning', 'Leadership development'],
    topics: [['Customer service', true], ['Compliance', false]],
    preset: 'long',
    article: [
      [['h', 16], ['p', 300], ['p', 518], ['h', [0, 30]], ['p', 105], ['p', 264], ['p', 345], ['p', 501], ['s'], ['f', 'landscape'], ['h', [0, 16]], ['p', [1, 396], undefined, 208], ['p', 521], ['s'], ['f', 'wide'], ['s']],
      [['h', 41], ['p', [0, 297]], ['p', 195], ['p', 300], ['p', 136], ['s'], ['e'], ['f', 'landscape'], ['h', 16], ['p', [0, 119]], ['p', 95], ['q', 215], ['p', 150], ['s']],
    ],
    quote: 307,
    related: [[10, 104], [9, 104], [6, 95]],
  },
  8: {
    h1: 116,
    solutions: ['Compliance training', 'Employee engagement', 'Essential learning'],
    topics: [['Customer service', true], ['World of work', true], ['Cyber & information security', true]],
    preset: 'short',
    article: [
      [['h', 30, true], ['p', [1, 215, 0, 367]], ['h', 31, true, 61], ['p', [0, 230, 0, 460, 0, 256]], ['h', 53, true], ['p', [0, 186, 0, 353]], ['h', 36, true], ['p', [498, 0, 300]], ['s']],
    ],
    quote: 316,
    related: [[9, 104], [10, 110], [6, 142]],
  },
  9: {
    h1: 120,
    solutions: ['Employee engagement', 'Leadership development', 'Social learning'],
    topics: [['Workplace skills', false], ['Employee experience', true]],
    preset: 'short',
    article: [
      [['h', 29, undefined, 79], ['p', [240, 1]], ['h', 37], ['p', 279], ['p', 192], ['h', 24], ['p', 225], ['p', 269], ['h', 18], ['p', 325], ['p', 206]],
    ],
    quote: 246,
    related: [[10, 104], [8, 144], [7, 92]],
  },
  10: {
    role: 'Head of Learning Strategy and Digital Programmes, Customer ten',
    h1: [135, 106],
    solutions: ['Skills development', 'Sales enablement', 'Essential learning'],
    topics: [['Business skills', false], ['Workplace skills', false], ['Employee experience', true]],
    preset: 'long',
    article: [
      [['h', 24], ['p', 400], ['p', 224], ['s'], ['f', 'full']],
      [['h', 33, undefined, 112], ['p', 397], ['p', 358, undefined, 110], ['s'], ['f', 'full'], ['s'], ['h', 23], ['p', 379], ['p', 247]],
    ],
    quote: 315,
    related: [[7, 104], [9, 104], [8, 94]],
  },
}

// A length may be an array of <br>-separated segments: 0 = empty line, 1 = zero-width-joiner line.
const seg = (n, seed, f) => (Array.isArray(n) ? n.map((m, i) => (m === 0 ? '' : m === 1 ? '\u200d' : f(m, seed + i * 7))).join('\n') : f(n, seed))

// An optional 4th entry overrides the generated seed (used where the default seed's word breaks could not
// match the live line counts at both 1440 and 390).
function block(b, seed0) {
  const [k, n, x, sd] = b
  const seed = sd ?? seed0
  if (k === 'h') return { h2: seg(n, seed, (m, sd) => phrase('', m, sd)), bold: !!x }
  if (k === 'p') return { p: seg(n, seed, prose) }
  if (k === 's') return { spacer: true }
  if (k === 'e') return { empty: true }
  if (k === 'f') return { figure: n }
  if (k === 'q') return { quote: prose(n, seed) }
  return null
}

function build(n) {
  const s = SPEC[n]
  const name = `Customer ${NAME[n]}`
  return {
    hero: { heading: Array.isArray(s.h1) ? phrase(name, s.h1[0], s.h1[1]) : phrase(name, s.h1, 30 + n * 7) },
    stats: {
      stat: { value: '34,000', label: 'User licences' },
      solutions: s.solutions,
      topics: s.topics.map(([label, icon]) => (icon ? { label, icon: true } : { label })),
    },
    article: {
      preset: s.preset,
      sections: s.article.map((blocks, i) => {
        const [first, ...rest] = blocks
        return {
          title: seg(first[1], first[3] ?? 50 + i * 31 + n * 3, (m, sd) => phrase('', m, sd)),
          bold: !!first[2],
          blocks: rest.map((b, j) => block(b, i * 41 + j * 17 + n * 5)),
        }
      }),
      quote: {
        text: `"${prose(s.quote - 2, 70 + n * 9)}"`,
        name: ['Jordan Ellis', 'Sam Rivers', 'Riley Morgan', 'Alex Morgan', 'Casey Lane'][n - 6],
        role: s.role || 'Learning and Development Manager',
      },
    },
    related: {
      heading: 'Read more client stories',
      items: s.related.map(([m, chars]) => ({
        logo: `Customer ${NAME[m]}`,
        text: phrase(`Customer ${NAME[m]}`, chars - 1, 100 + m * 13) + '.',
        href: `/case-studies-contents/customer-${m}`,
      })),
    },
  }
}

export const CASE_STUDY_CONTENT = Object.fromEntries([6, 7, 8, 9, 10].map((n) => [`/case-studies-contents/customer-${n}`, build(n)]))
