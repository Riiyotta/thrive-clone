// Shared placeholder data for the company/resources family.
const WORDS =
  'Nimbus keeps every team learning in one calm place where courses, people and conversations sit together so knowledge moves freely and admins can see what is working across the business without chasing anyone for updates or reports at the end of each month or quarter'.split(' ')

/** Placeholder sentence of exactly `n` words. */
export function words(n) {
  const out = []
  for (let i = 0; i < n; i++) out.push(WORDS[i % WORDS.length])
  const s = out.join(' ')
  return s.charAt(0).toUpperCase() + s.slice(1) + '.'
}

/** [[question, answerWordCount], ...] -> Faq items */
export const faqItems = (list) => list.map(([q, n]) => ({ q, a: words(n) }))

// Six neutral logo placeholders (120×49 boxes at 1440, 107×37 at 390 on the original).
export const COMPANY_LOGOS = Array.from({ length: 6 }, () => ({ text: 'Logo', aspect: 'aspect-[122/49] mob:aspect-[107/37]' }))

export const HIGHLIGHT_SLIDES = undefined
