import { useCallback, useEffect, useRef, useState } from 'react'

// Swiper-11-like loop carousel state. Slides are rendered as
// [clones(count)] [real(count)] [clones(count)] and `pos` is the index into the
// real set (may run into the clones; it is snapped back without a transition).
//
// Drag/swipe mirrors the params read off the original's Swiper instances:
//   threshold (5 default, 10 on the highlight slider), touchAngle 45, touchRatio 1,
//   followFinger, shortSwipes (< longSwipesMs 300 => always advance),
//   longSwipesRatio 0.5, release transition = speed (800ms, CSS `ease`), preventClicks.
//   Like Swiper, the movement that crosses the threshold is swallowed (start point is reset).
export default function useLoopCarousel(count, { initialPlaying = false, threshold = 5, grabCursor = true } = {}) {
  const [pos, setPos] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [playing, setPlaying] = useState(initialPlaying)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  // real index of the last *settled* slide (after transitionend, or at drag release)
  const [settled, setSettled] = useState(0)
  // increments on every settle (transition end): autoplay restarts its delay from here
  const [settleId, setSettleId] = useState(0)

  const norm = useCallback((p) => ((p % count) + count) % count, [count])
  const real = norm(pos)

  const posRef = useRef(pos)
  posRef.current = pos

  const moveTo = useCallback((p) => {
    setAnimate(true)
    setTransitioning(true)
    setPos(p)
  }, [])
  const next = useCallback(() => moveTo(posRef.current + 1), [moveTo])
  const prev = useCallback(() => moveTo(posRef.current - 1), [moveTo])
  const goTo = useCallback((i) => {
    if (norm(posRef.current) === i && posRef.current === i) return
    moveTo(i)
  }, [moveTo, norm])
  // instant reposition (Swiper slideToLoop(i, 0))
  const jump = useCallback((i) => {
    setAnimate(false)
    setPos(i)
    setSettled(norm(i))
  }, [norm])

  const settle = useCallback(() => {
    const p = posRef.current
    setTransitioning(false)
    setSettled(norm(p))
    setSettleId((n) => n + 1)
    if (p >= count || p < 0) {
      setAnimate(false)
      setPos(norm(p))
    }
  }, [count, norm])

  const onTransitionEnd = useCallback(
    (e) => {
      if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
      settle()
    },
    [settle],
  )

  // re-enable transitions on the frame after a snap
  useEffect(() => {
    if (animate || dragging) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    return () => cancelAnimationFrame(id)
  }, [animate, dragging])

  // ---- drag ----
  const trackRef = useRef(null)
  const drag = useRef(null)

  const onPointerDown = useCallback(
    (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      const track = trackRef.current
      if (!track) return
      // Swiper's touchStartPreventDefault (skips focusable form elements): stops native image drag / text selection
      if (e.pointerType === 'mouse' && !e.target.closest('input,select,option,textarea,button,video,label')) e.preventDefault()
      const kids = track.children
      const step = kids.length > 1 ? kids[1].offsetLeft - kids[0].offsetLeft : track.offsetWidth
      const d = { x0: e.clientX, y0: e.clientY, t0: performance.now(), x: e.clientX, started: false, cancelled: false, step }
      drag.current = d

      const move = (ev) => {
        if (d.cancelled) return
        d.x = ev.clientX
        const dx = ev.clientX - d.x0
        const dy = ev.clientY - d.y0
        if (!d.started) {
          if (Math.sqrt(dx * dx + dy * dy) < threshold) return
          if ((Math.atan2(Math.abs(dy), Math.abs(dx)) * 180) / Math.PI > 45) {
            d.cancelled = true // vertical gesture: let the page scroll
            return
          }
          d.started = true
          d.x0 = ev.clientX // Swiper resets startX once the threshold is crossed
          setDragging(true)
          setAnimate(false)
          return
        }
        setDragX(ev.clientX - d.x0)
      }
      const up = () => {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
        window.removeEventListener('pointercancel', up)
        drag.current = null
        if (!d.started) return
        const dx = d.x - d.x0
        const dt = performance.now() - d.t0
        const ratio = Math.abs(dx) / d.step
        const k = Math.floor(ratio)
        let n = 0
        if (dx !== 0) n = dt < 300 ? k + 1 : k + (ratio - k > 0.5 ? 1 : 0)
        const target = posRef.current - Math.sign(dx) * n
        setDragging(false)
        setDragX(0)
        setAnimate(true)
        setPos(target)
        setSettled(norm(target)) // highlight slider re-centres on touchEnd (rAF), not at transition end
        if (dx === 0) settle()
        else setTransitioning(true)
        // preventClicks: swallow the click that follows a drag
        const kill = (ce) => {
          ce.preventDefault()
          ce.stopPropagation()
        }
        window.addEventListener('click', kill, true)
        setTimeout(() => window.removeEventListener('click', kill, true), 0)
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
      window.addEventListener('pointercancel', up)
    },
    [threshold, norm, settle],
  )

  const trackProps = {
    ref: trackRef,
    onPointerDown,
    onTransitionEnd,
    onDragStart: (e) => e.preventDefault(),
    style: {
      // .swiper-horizontal { touch-action: pan-y }
      touchAction: 'pan-y',
      cursor: grabCursor ? (dragging ? 'grabbing' : 'grab') : undefined,
    },
  }

  return {
    pos,
    real,
    settled,
    settleId,
    animate,
    dragging,
    dragX,
    transitioning,
    next,
    prev,
    goTo,
    jump,
    onTransitionEnd,
    trackProps,
    playing,
    setPlaying,
  }
}

// Swiper 11 autoplay semantics (waitForTransition: true, disableOnInteraction: false):
// the `delay` timer starts after each slide transition ends (period = speed + delay),
// pauseOnMouseEnter pauses the timer and resumes with the time left on leave,
// a drag pauses it; the next settle restarts a full delay.
export function useAutoplay(c, { delay, hoverRef = null }) {
  const { playing, next, settleId, dragging, transitioning } = c
  const timer = useRef(null)
  const startedAt = useRef(0)
  const remaining = useRef(delay)
  const hovering = useRef(false)
  const live = useRef({})
  live.current = { playing, dragging, transitioning, next }

  const schedule = useCallback(() => {
    clearTimeout(timer.current)
    timer.current = null
    const s = live.current
    if (!s.playing || s.dragging || s.transitioning || hovering.current) return
    startedAt.current = performance.now()
    timer.current = setTimeout(() => {
      timer.current = null
      remaining.current = delay
      live.current.next()
    }, remaining.current)
  }, [delay])

  const pause = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
      remaining.current = Math.max(0, remaining.current - (performance.now() - startedAt.current))
    }
  }, [])

  // new full delay after each settle and on (re)start
  useEffect(() => {
    remaining.current = delay
    schedule()
    return () => clearTimeout(timer.current)
  }, [playing, settleId, delay, schedule])

  useEffect(() => {
    if (dragging) pause()
  }, [dragging, pause])

  // Swiper's beforeTransitionStart -> pause(internal, reset): any transition (autoplay, bullet/tab
  // click, drag release) cancels the pending timer; the following settle starts a full delay.
  useEffect(() => {
    if (!transitioning) return
    clearTimeout(timer.current)
    timer.current = null
    remaining.current = delay
  }, [transitioning, delay])

  useEffect(() => {
    const el = hoverRef && hoverRef.current
    if (!el) return
    const enter = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      hovering.current = true
      pause()
    }
    const leave = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      hovering.current = false
      schedule()
    }
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
    }
  }, [hoverRef, pause, schedule])
}
