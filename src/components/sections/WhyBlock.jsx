import Button from '../shared/Button.jsx'

// why-block (.container-medium-2.text-align-center.enterprise-block.why-thrive-block) on
// /company/why-nimbus: centred serif H2 + one primary button. 72rem max, margin 4rem top / 6rem bottom;
// ≤767 side padding 1.5rem, ≤479 1rem and the button stretches full width.

export default function WhyBlock({ heading = 'Ready to find out what Nimbus can do today?', button = { label: 'Book a demo', href: '/lms/demo-platform' } }) {
  return (
    <div data-section="why-block" className="mx-auto mb-[6rem] mt-[4rem] w-full max-w-[72rem] text-center mob:px-[1.5rem] xs:px-[1rem]">
      <h2 className="heading-h2">{heading}</h2>
      <div className="mt-[1rem] flex items-center justify-center gap-[1rem] xs:flex-col">
        <Button href={button.href}>{button.label}</Button>
      </div>
    </div>
  )
}
