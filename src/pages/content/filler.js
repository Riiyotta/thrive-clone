// Placeholder prose sized to a target character count, so per-route copy wraps onto the same number of
// lines as the measured original without reusing any of its text. Original neutral copy only.
const CORPUS = (
  'The learning team began with a simple question about what people actually needed from their working day and ' +
  'how short, practical resources could fit around busy shifts without adding pressure. Managers were invited to ' +
  'share the moments where support mattered most, and those conversations shaped a clear plan for the first year. ' +
  'Every new programme launched with a small pilot group, so the team could listen closely, adjust the format and ' +
  'build confidence before rolling it out across every region. People responded well to bite-sized videos, quick ' +
  'reads and guided activities that felt relevant to their own roles, and completion rates rose steadily as a ' +
  'result. Leaders noticed the change in team meetings, where colleagues started sharing tips and recommending ' +
  'resources to each other without being asked. Clear dashboards made it easy to see which topics landed and where ' +
  'to focus next, so the plan stayed flexible and grounded in real feedback from the people using it every week. ' +
  'Over time the platform became the natural home for onboarding, product updates and everyday questions, replacing ' +
  'scattered documents and long email chains with one calm and familiar place to learn. New starters reached ' +
  'confidence faster, experienced colleagues found fresh ways to grow, and the whole organisation began to treat ' +
  'learning as part of the job rather than something extra to fit in at the end of a long day. The next phase ' +
  'builds on that momentum with new pathways, more languages and a wider community of internal experts ready to ' +
  'share what they know with the colleagues who need it most.'
).split(' ')

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

/** Words from the corpus (starting at `seed`) until the text reaches `chars` characters; ends with a full stop. */
export function prose(chars, seed = 0) {
  const out = []
  let len = 0
  let i = seed % CORPUS.length
  while (len < chars - 1) {
    const w = CORPUS[i % CORPUS.length]
    out.push(w)
    len += w.length + (out.length > 1 ? 1 : 0)
    i += 1
  }
  return cap(out.join(' ').replace(/[,.]$/, '')) + '.'
}

/** A lead-in (e.g. "How Customer two") followed by corpus words up to `chars`, without a closing full stop. */
export function phrase(lead, chars, seed = 0) {
  const words = lead ? lead.split(' ') : []
  let len = lead.length
  let i = seed % CORPUS.length
  while (len < chars) {
    const w = CORPUS[i % CORPUS.length].replace(/[,.]$/, '')
    words.push(words.length ? w : cap(w))
    len += w.length + (words.length > 1 ? 1 : 0)
    i += 1
  }
  return words.join(' ')
}
