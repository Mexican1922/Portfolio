import { useEffect, useState } from 'react'

/**
 * Suspense fallback shown while a lazily-loaded route chunk arrives.
 *
 * Covers the viewport so a navigation shows the rocket alone rather than the
 * nav and footer framing an empty column.
 *
 * Appears immediately: MIN_LOADER_MS in App.jsx already guarantees the chunk
 * cannot resolve inside a frame, so the hold-off that used to prevent a flash
 * would now just eat into the time the loader is visible. Set a `delay` if
 * that floor is ever removed.
 */
export default function PageLoader({ delay = 0 }) {
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
      <div className="speeder-stack" aria-hidden>
        <div className="speeder-word">
          <span>Valentine</span>
          <span>Codes</span>
          <i />
        </div>
        <div className="speeder-ship">
          <div className="speeder">
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
      </div>
    </div>
  )
}
