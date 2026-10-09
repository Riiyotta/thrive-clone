// `.wowevebrow` eyebrow chip used above subpage headings (hero-wowh, highlight-slider headers,
// features-autotabs header). Measured: 8×16 chip, radius 4px 0, gap 8, one-word 18/25.2 label in
// #666c6a (16/22.4 at ≤479). Chip colour is green-hover on most pages, #9335fe on the
// small-business ("thrive-go") variant — pass `chipClassName` to change it.
/**
 * @param {object} props
 * @param {React.ReactNode} props.children label text
 * @param {string} [props.chipClassName='bg-green-hover'] chip background class
 * @param {string} [props.className=''] extra classes on the wrapper
 */
export default function Eyebrow({ children, chipClassName = 'bg-green-hover', className = '', ...rest }) {
  return (
    <div className={`flex items-center gap-[0.5rem] ${className}`} {...rest}>
      <span aria-hidden className={`h-[1rem] w-[0.5rem] shrink-0 rounded-[0.25rem_0] ${chipClassName}`} />
      <span className="text-body text-[#666c6a] xs:text-[1rem] xs:leading-[1.4rem]">{children}</span>
    </div>
  )
}
