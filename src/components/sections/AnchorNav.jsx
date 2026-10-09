// anchor-nav (`h2.heading-style-h4.solutions-nav`): the centred intro line above the sticky
// anchor tabs (the anchors themselves live in StickyTabs).
//   'solutions' /lms/solutions: full-width h2, margin-top 1rem
//   'features'  /lms/features : inside padding-global > container-medium, margin-top 4rem
// Inter 2rem/1.4 (32/44.8), 1.5rem/1.4 at ≤767.
export default function AnchorNav({ variant = 'solutions', heading = variant === 'features' ? 'Explore every platform feature' : 'Pick your learning path here' }) {
  const h = (
    <h2
      data-section="anchor-nav"
      className={`flex justify-center text-center text-xlarge font-normal text-ink mob:text-xlarge-mob ${
        variant === 'features' ? 'mt-[4rem]' : 'mt-[1rem]'
      } mb-0`}
    >
      {heading}
    </h2>
  )
  if (variant !== 'features') return h
  return (
    <div className="padding-global">
      <div className="container-medium">{h}</div>
    </div>
  )
}
