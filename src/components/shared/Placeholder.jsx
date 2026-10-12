// Neutral image/video slot. Geometry (size, aspect, radius) is passed in by the
// caller from the spec; fill uses surface tokens; label names the slot type.
const TONES = {
  1: 'bg-surface-1',
  2: 'bg-surface-2',
  3: 'bg-surface-3',
}

// Stock stand-ins for empty slots (Unsplash License via Picsum; see public/stock/CREDITS.md).
// Applied as a background image on the existing box, so layout, positioning context and
// children are untouched. Slots without a label (tiny icons) and logo/badge slots keep the
// grey fill. Pass `stock={false}` to opt a slot out.
const STOCK = {
  ui: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 26, 36, 48, 60, 119, 180, 201, 366, 370, 445, 529, 532, 668, 885],
  people: [64, 65, 192, 348, 395, 513, 604, 822, 832, 839, 856, 996, 1005, 1010, 1012, 1027],
  avatar: [1027, 64, 65, 832, 996, 1005, 856, 839],
  learn: [24, 367, 403, 464, 486, 526, 527, 528, 534, 998, 1073],
  city: [42, 43, 122, 238, 259, 391, 411, 737, 740, 862, 864, 945, 948, 1031, 1048, 1076, 1081],
  video: [56, 158, 223, 953, 959, 1033],
}
const NO_STOCK = /logo|badge|rating|award|icon|^social \d|qr|wordmark|flag|currency/i
const KIND = [
  [/avatar|headshot|portrait|author|speaker/i, 'avatar'],
  [/team|people|person|mentor|learner|customer photo|event photo|community/i, 'people'],
  [/video|still|thumbnail|background/i, 'video'],
  [/guide|cover|article|book|course|library|topic|glossary|blog|webinar|event|story image|suite/i, 'learn'],
  [/brand|case|story|office|sector|city|company|hub/i, 'city'],
]
function stockFor(label) {
  if (!label || NO_STOCK.test(label)) return null
  const kind = (KIND.find(([re]) => re.test(label)) || [null, 'ui'])[1]
  const list = STOCK[kind]
  let h = 0
  for (const ch of label) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  const id = list[h % list.length]
  return kind === 'avatar' ? `/stock/${id}-sq.jpg` : `/stock/${id}.jpg`
}

export default function Placeholder({ label, tone = 2, className = '', labelClassName = '', children, src, alt = '', fit = 'cover', imgClassName = '', stock = true, style, ...rest }) {
  const stockSrc = !src && stock ? stockFor(label) : null
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
      style={stockSrc ? { backgroundImage: `url(${stockSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', ...style } : style}
      data-stock-slot={stockSrc ? '' : undefined}
      {...rest}
    >
      {label && (
        // Hidden (not removed) under a stock photo so the box keeps its exact geometry.
        <span className={`pointer-events-none select-none px-[0.5rem] text-center text-[0.75rem] leading-[1.05rem] text-grey ${stockSrc ? 'invisible' : ''} ${labelClassName}`}>
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
