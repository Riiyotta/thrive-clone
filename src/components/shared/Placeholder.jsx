// Neutral image/video slot. Geometry (size, aspect, radius) is passed in by the
// caller from the spec; fill uses surface tokens; label names the slot type.
const TONES = {
  1: 'bg-surface-1',
  2: 'bg-surface-2',
  3: 'bg-surface-3',
}

export default function Placeholder({ label, tone = 2, className = '', labelClassName = '', children, src, alt = '', fit = 'cover', imgClassName = '', ...rest }) {
  if (src) {
    return (
      <div className={`relative overflow-clip ${className}`} {...rest}>
        <img src={src} alt={alt} loading="lazy" className={`absolute inset-0 h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${imgClassName}`} />
        {children}
      </div>
    )
  }
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center overflow-clip ${TONES[tone]} ${className}`}
      {...rest}
    >
      {label && (
        <span className={`pointer-events-none select-none px-[0.5rem] text-center text-[0.75rem] leading-[1.05rem] text-grey ${labelClassName}`}>
          {label}
        </span>
      )}
      {children}
    </div>
  )
}

// Generic grey wordmark used for every customer / partner logo slot.
export function LogoPlaceholder({ className = '', text = 'Logo', src, alt = '', imgClassName = '' }) {
  if (src) {
    return (
      <div className={`flex items-center ${className}`}>
        <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-contain ${imgClassName}`} />
      </div>
    )
  }
  return (
    <div
      role="img"
      aria-label="Logo placeholder"
      className={`flex items-center justify-center font-semibold uppercase tracking-[0.08em] text-grey ${className}`}
    >
      {text}
    </div>
  )
}
