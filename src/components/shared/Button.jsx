// §0.6 buttons. Structure mirrors .btn_global > .btn_global-text-block.is-mask > .btn_global-text
// §13.1 hover: SplitText chars on [data-button-animate], y 0 -> -1.5em, 0.45s, stagger {amount:.25},
// power4.inOut; mouseenter plays, mouseleave reverses (measured on the original IX3 interaction).
import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, SplitText } from '../../lib/gsap.js'

const VARIANTS = {
  primary: 'bg-ink text-surface-1 px-[1.25rem] py-[0.75rem] mob:py-[0.5rem] text-btn hover:bg-green-hover',
  'primary-small': 'bg-ink text-surface-1 px-[1rem] py-[0.5rem] text-btn-sm tracking-[-0.0225rem] hover:bg-green-hover',
  dark: 'bg-surface-3 text-ink px-[1.25rem] py-[0.75rem] mob:py-[0.5rem] text-btn hover:bg-ink hover:text-surface-1',
  'dark-small': 'bg-surface-3 text-ink px-[1rem] py-[0.5rem] text-btn-dark-sm hover:bg-ink hover:text-surface-1',
  // Subpage footer CTA (`.footer_button-block .btn_global` green variant): #1ee9b6 rest, ink on hover.
  accent: 'bg-green text-surface-1 px-[1.25rem] py-[0.75rem] mob:py-[0.5rem] text-btn hover:bg-ink',
}

/**
 * @param {object} props
 * @param {'primary'|'primary-small'|'dark'|'dark-small'|'accent'} [props.variant='primary']
 * @param {boolean} [props.stretch=true] stretch to full row at ≤479 (xs:flex-auto self-stretch)
 * @param {string} [props.to] clone route path: renders a react-router <Link> (same <a> markup)
 * @param {string} [props.href='#'] used when rendering a plain <a> (no `to`)
 * @param {React.ElementType} [props.as] override the rendered element/component
 */
export default function Button({ children, variant = 'primary', stretch = true, className = '', href = '#', as, ...rest }) {
  const Comp = as || (rest.to ? Link : 'a')
  const ref = useRef(null)

  useLayoutEffect(() => {
    const btn = ref.current
    const label = btn.querySelector('[data-button-animate]')
    const ctx = gsap.context(() => {
      const split = SplitText.create(label, {
        type: 'words,chars',
        wordsClass: 'gsap_split_word',
        charsClass: 'gsap_split_letter',
      })
      gsap.set([...split.words, ...split.chars], { position: 'relative', display: 'inline-block' })
      const tl = gsap.timeline({ paused: true })
      tl.to(split.chars, { y: '-1.5em', duration: 0.45, stagger: { amount: 0.25 }, ease: 'power4.inOut' })
      const enter = () => tl.play()
      const leave = () => tl.reverse()
      btn.addEventListener('mouseenter', enter)
      btn.addEventListener('mouseleave', leave)
      return () => {
        btn.removeEventListener('mouseenter', enter)
        btn.removeEventListener('mouseleave', leave)
      }
    }, btn)
    return () => ctx.revert()
  }, [])

  return (
    <Comp
      ref={ref}
      {...(Comp === 'a' ? { href } : {})}
      data-button
      className={`inline-flex shrink-0 items-center justify-center rounded-pill font-medium no-underline transition-[background-color] duration-[240ms] ease-[ease] ${
        VARIANTS[variant]
      } ${stretch ? 'xs:flex-auto xs:self-stretch' : ''} ${className}`}
      {...rest}
    >
      {/* .btn_global-text-block is a fixed 20px on the original (does not scale with the fluid root) */}
      <span className="flex h-[20px] items-center overflow-clip">
        <span data-button-animate className="btn-label whitespace-nowrap">
          {children}
        </span>
      </span>
    </Comp>
  )
}
