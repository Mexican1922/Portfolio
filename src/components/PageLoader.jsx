import { useEffect, useState } from 'react'

/**
 * Suspense fallback shown while a lazily-loaded route chunk arrives.
 *
 * Covers the viewport with just the wordmark and the sweep — the same thing the
 * boot screen shows — rather than sitting in the page with the nav and footer
 * framing an empty column. Loading should look like one state, not a hole.
 *
 * Nothing is drawn for `delay` ms: a chunk on a warm cache resolves in a few
 * milliseconds, and a loader that appears and vanishes inside one frame reads
 * as a glitch.
 */
export default function PageLoader({ delay = 140 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(id)
  }, [delay])

  return (
    <div
      className={`route-loader ${visible ? 'is-visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading page</span>
      <div aria-hidden className="route-loader__mark">
        <span>Valentine</span>
        <span>Codes</span>
        <span className="route-loader__dot" />
      </div>
      <div aria-hidden className="page-loader" />
    </div>
  )
}
