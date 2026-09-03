import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)

// Minimum time the boot screen stays up, in ms, measured from the stamp set in
// index.html. The app often paints in well under this, so without a floor the
// loader would be gone before it registered. This is latency we are adding on
// purpose — keep it short. 0 disables the hold.
const MIN_BOOT_MS = 700

// Fade out the boot screen from index.html once the app has painted.
const boot = document.getElementById('boot')
if (boot) {
  const elapsed = Date.now() - (window.__bootAt ?? Date.now())
  const wait = Math.max(0, MIN_BOOT_MS - elapsed)
  setTimeout(() => {
    requestAnimationFrame(() => {
      boot.classList.add('is-done')
      boot.addEventListener('transitionend', () => boot.remove(), { once: true })
      // Belt and braces: if the transition never fires (reduced motion, a
      // backgrounded tab), drop the node anyway so it cannot trap clicks.
      setTimeout(() => boot.remove(), 800)
    })
  }, wait)
}
