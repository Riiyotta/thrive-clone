// FAQ item builder for the platform family. The closed-state height of every wowfaqs item depends
// only on its question's line count, so each page lists its questions written to the original's
// word count and approximate width (Inter 500 20px ≈ 10.4px per character at 1440).
const ANSWER =
  'Our team walks you through every step, from planning to launch, and stays on hand afterwards so your people get the most out of Nimbus.'

export const faqItems = (questions) => questions.map((q) => ({ q, a: ANSWER }))
