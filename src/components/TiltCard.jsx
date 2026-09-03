import { useCallback, useRef } from 'react'

/**
 * Card that leans toward the cursor.
 *
 * The idea is borrowed from goodgrowth.com, where a 3D disc rotates to follow
 * the pointer. That is a real WebGL mesh; this is the same sensation in a CSS
 * transform — geometry responding to you, rather than a light shining on it.
 *
 * Rotation is written straight to CSS custom properties in a pointermove
 * handler. Holding it in React state would re-render the card on every mouse
 * frame, which React cannot keep up with and does not need to.
 */

// Degrees at the very edge. Past about 8 the card stops reading as a lean and
// starts reading as a novelty — text skews, and the eye goes to the trick
// instead of the work.
const MAX_TILT = 6

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const frame = useRef(0)

  const onPointerMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    // Coalesce to one write per frame: pointermove can fire well above 60Hz.
    if (frame.current) return
    frame.current = requestAnimationFrame(() => {
      frame.current = 0
      const r = el.getBoundingClientRect()
      // -0.5..0.5 from the card's centre
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      // Y follows horizontal movement, X follows vertical, inverted so the
      // card tips toward the cursor rather than away from it.
      el.style.setProperty('--tilt-y', `${px * MAX_TILT * 2}deg`)
      el.style.setProperty('--tilt-x', `${-py * MAX_TILT * 2}deg`)
    })
  }, [])

  const reset = useCallback(() => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    frame.current = 0
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
  }, [])

  return (
    <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={reset} className="tilt">
      <div className={`tilt__inner ${className}`}>{children}</div>
    </div>
  )
}
