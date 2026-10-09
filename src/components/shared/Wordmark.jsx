// "Nimbus" placeholder brand: simple text wordmark sized to the logo box from the spec.
export default function Wordmark({ className = '', textClassName = '' }) {
  return (
    <span aria-label="Nimbus" className={`inline-flex items-center gap-[0.375rem] text-ink ${className}`}>
      <span aria-hidden className="aspect-square h-[85%] rounded-[0.25rem] bg-ink" />
      <span className={`font-semibold tracking-[-0.02em] ${textClassName}`}>nimbus</span>
    </span>
  )
}
