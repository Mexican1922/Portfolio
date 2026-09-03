import { useCallback, useRef } from 'react'

/**
 * Card wrapper with a soft light that follows the cursor.
 *
 * The position is written straight to CSS custom properties in a pointermove
 * handler rather than held in state — a card re-rendering on every mouse frame
 * would be pure waste, and React cannot keep up with pointermove anyway.
 *
 * The glow itself is a child div rather than a pseudo-element, so it can carry
 * `pointer-events: none` explicitly. A full-bleed overlay that takes pointer
 * events swallows every link inside the card, which is exactly the bug the
 * existing border glow caused.
 *
 * Touch devices never fire pointermove without contact, so the effect simply
 * never activates there; no capability check needed.
 */
export default function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null)

  const onPointerMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
  }, [])

  const onPointerLeave = useCallback(() => {
    ref.current?.style.setProperty('--spot-o', '0')
  }, [])

  const onPointerEnter = useCallback(() => {
    ref.current?.style.setProperty('--spot-o', '1')
  }, [])

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`spotlight ${className}`}
    >
      <span aria-hidden className="spotlight__glow" />
      {children}
    </div>
  )
}
