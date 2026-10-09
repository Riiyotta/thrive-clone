import Placeholder from '../shared/Placeholder.jsx'

// wow2col (.section_wow2col) on /mentoring (used 4x): text column (serif H2 at the top, large lead +
// grey paragraph pinned to the bottom) beside a 1:1 image card (#0b0b0b, radius .75rem). Stacks ≤767
// (gap 1.5rem, image min-height 20rem). `leadNarrow` wraps the lead in the 28rem max-width block used by
// three of the four instances.

export default function Wow2col({
  heading = 'Mentoring made simple',
  lead = 'The Nimbus mentoring programme pairs people with the right guide at the right moment, so every conversation builds real skills, confidence and lasting connections that help careers grow.',
  body = 'With curated pathways, matching tools and progress check-ins, mentors and mentees always know what to focus on next.',
  leadNarrow = false,
  image = null,
}) {
  const leadEl = <p className="mb-[1.25rem] flex text-[1.5rem] leading-[1.4] mob:text-[1.25rem]">{lead}</p>
  return (
    <section data-section="wow2col">
      <div className="padding-global">
        <div className="container-medium">
          <div className="py-[5rem] tab:py-[4rem] mob:py-[3rem]">
            <div className="container-large">
              <div className="flex items-stretch justify-between gap-[3.75rem] mob:flex-col mob:gap-[1.5rem]">
                <div className="w-full max-w-[36rem]">
                  <div className="flex h-full flex-col items-start justify-between gap-y-[4rem]">
                    <h2 className="heading-h2">{heading}</h2>
                    <div className="flex flex-col items-start justify-start gap-[1.25rem]">
                      {leadNarrow ? <div className="w-full max-w-[28rem]">{leadEl}</div> : leadEl}
                      <p className="mb-[1.25rem] text-para text-grey">{body}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-[36rem]">
                  <Placeholder
                    label="Mentoring image"
                    src={image || undefined}
                    tone={1}
                    className="aspect-square w-full overflow-clip rounded-card bg-surface-1 mob:min-h-[20rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
