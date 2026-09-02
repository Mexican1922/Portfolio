import { useEffect, useState } from 'react'

/**
 * Suspense fallback shown while a lazily-loaded route chunk arrives.
 *
 * On a warm cache a chunk can resolve in a few milliseconds, and a spinner that
 * appears and vanishes inside one frame reads as a glitch. So nothing is drawn
 * for `delay` ms — fast navigations stay silent, and the spinner only appears
 * when there is genuinely something to wait for.
 */
export default function PageLoader({ delay = 140 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(id)
  }, [delay])

  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading page</span>
      <span
        aria-hidden
        className={`page-loader ${visible ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
