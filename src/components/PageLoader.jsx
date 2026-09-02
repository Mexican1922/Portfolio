import { useEffect, useState } from 'react'

/**
 * Suspense fallback shown while a lazily-loaded route chunk arrives.
 *
 * Covers the viewport so a navigation shows the rocket alone rather than the
 * nav and footer framing an empty column.
 *
 * Draws nothing for `delay` ms: a chunk on a warm cache resolves in a few
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
      className={`speeder-stage ${visible ? 'opacity-100' : 'opacity-0'}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading page</span>
      <div className="longfazers" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="speeder" aria-hidden>
        <span>
          <span />
          <span />
          <span />
          <span />
        </span>
        <div className="base">
          <span />
          <div className="face" />
        </div>
      </div>
    </div>
  )
}
