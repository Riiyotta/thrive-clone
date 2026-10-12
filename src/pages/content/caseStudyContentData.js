// Per-route props for the case-study-content template (CaseStudyContent.jsx), keyed by clone path.
// Structure (H1 length, stat chips, topic chips with/without icon, article sections and block order,
// figure types, quote length, related cards) follows each original route as measured from its rendered
// DOM; every text is placeholder copy sized by character count (filler.js) so line counts match.
import { prose, phrase } from './filler.js'

const NAME = { 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten' }

// Article spec: one entry per rich-text block = one TOC section. Block codes:
// ['h', chars, bold] sub-heading (first one = section title) | ['p', chars] | ['s'] spacer paragraph |
// ['e'] empty paragraph | ['f', 'landscape'|'wide'|'full'] figure | ['q', chars] ruled blockquote.
const SPEC = {
  6: {
    h1: 84,
    solutions: ['Employee engagement', 'Skills development', 'Social learning', 'Essential learning'],
    topics: [['Inclusion', true], ['Mental health & Wellbeing', true], ['Compliance', false]],
    preset: 'short',
    article: [
      [['h', [32, 1, 0], true], ['p', 640]],
      [['h', 29, true], ['s'], ['p', 530], ['h', 31, true], ['s'], ['p', 433]],
    ],
    quote: 166,
    related: [[8, 112], [9, 104], [10, 145]],
  },
  7: {
    h1: 101,
    solutions: ['Frontline training', 'Essential learning', 'Leadership development'],
    topics: [['Customer service', true], ['Compliance', false]],
    preset: 'long',
    article: [
      [['h', 16], ['p', 300], ['p', 535], ['h', [0, 30]], ['p', 105], ['p', 264], ['p', 362], ['p', 501], ['s'], ['f', 'landscape'],
        ['h', [0, 22]], ['p', [1, 386]], ['p', 521], ['s'], ['f', 'wide'], ['s']],
      [['h', 35], ['p', [0, 297]], ['p', 199], ['p', 304], ['p', 136], ['s'], ['e'], ['f', 'landscape'], ['h', 19], ['p', [0, 119]], ['p', 95],
        ['q', 231], ['p', 152], ['s']],
    ],
    quote: 307,
    related: [[10, 104], [9, 104], [6, 92]],
  },
  8: {
    h1: 116,
    solutions: ['Compliance training', 'Employee engagement', 'Essential learning'],
    topics: [['Customer service', true], ['World of work', true], ['Cyber & information security', true]],
    preset: 'short',
    article: [[['h', 30, true], ['p', [1, 215, 0, 367]], ['h', 31, true], ['p', [0, 230, 0, 460, 0, 256]], ['h', 53, true], ['p', [0, 186, 0, 353]], ['h', 37, true],
      ['p', [482, 0, 300]], ['s']]],
    quote: 325,
    related: [[9, 104], [10, 145], [6, 112]],
  },
  9: {
    h1: 120,
    solutions: ['Employee engagement', 'Leadership development', 'Social learning'],
    topics: [['Workplace skills', false], ['Employee experience', true]],
    preset: 'short',
    article: [[['h', 30], ['p', [240, 1]], ['h', 37], ['p', 279], ['p', 192], ['h', 25], ['p', 225], ['p', 275], ['h', 18], ['p', 317], ['p', 210]]],
    quote: 258,
    related: [[10, 104], [8, 104], [7, 92]],
  },
  10: {
    h1: 145,
    solutions: ['Skills development', 'Sales enablement', 'Essential learning'],
    topics: [['Business skills', false], ['Workplace skills', false], ['Employee experience', true]],
    preset: 'long',
    article: [
      [['h', 26], ['p', 397], ['p', 224], ['s'], ['f', 'full']],
      [['h', 35], ['p', 400], ['p', 363], ['s'], ['f', 'full'], ['s'], ['h', 23], ['p', 376], ['p', 247]],
    ],
    quote: 315,
    related: [[7, 104], [9, 104], [8, 92]],
  },
}

// A length may be an array of <br>-separated segments: 0 = empty line, 1 = zero-width-joiner line.
const seg = (n, seed, f) => (Array.isArray(n) ? n.map((m, i) => (m === 0 ? '' : m === 1 ? '\u200d' : f(m, seed + i * 7))).join('\n') : f(n, seed))

function block(b, seed) {
  const [k, n, x] = b
  if (k === 'h') return { h2: seg(n, seed, (m, sd) => phrase('', m, sd)), bold: !!x }
  if (k === 'p') return { p: seg(n, seed, prose) }
  if (k === 's') return { spacer: true }
  if (k === 'e') return { p: '' }
  if (k === 'f') return { figure: n }
  if (k === 'q') return { quote: prose(n, seed) }
  return null
}

function build(n) {
  const s = SPEC[n]
  const name = `Customer ${NAME[n]}`
  return {
    hero: { heading: phrase(name, s.h1, 30 + n * 7) },
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
          title: seg(first[1], 50 + i * 31 + n * 3, (m, sd) => phrase('', m, sd)),
          bold: !!first[2],
          blocks: rest.map((b, j) => block(b, i * 41 + j * 17 + n * 5)),
        }
      }),
      quote: {
        text: `"${prose(s.quote - 2, 70 + n * 9)}"`,
        name: ['Jordan Ellis', 'Sam Rivers', 'Riley Morgan', 'Alex Morgan', 'Casey Lane'][n - 6],
        role: 'Learning and Development Manager',
      },
    },
    related: {
      heading: 'Read more customer stories',
      items: s.related.map(([m, chars]) => ({
        logo: `Customer ${NAME[m]}`,
        text: phrase(`Customer ${NAME[m]}`, chars - 1, 100 + m * 13) + '.',
        href: `/case-studies-contents/customer-${m}`,
      })),
    },
  }
}

export const CASE_STUDY_CONTENT = Object.fromEntries([6, 7, 8, 9, 10].map((n) => [`/case-studies-contents/customer-${n}`, build(n)]))
