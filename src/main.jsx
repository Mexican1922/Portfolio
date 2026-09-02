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

// Fade out the boot screen from index.html once the app has painted.
const boot = document.getElementById('boot')
if (boot) {
  requestAnimationFrame(() => {
    boot.classList.add('is-done')
    boot.addEventListener('transitionend', () => boot.remove(), { once: true })
    // Belt and braces: if the transition never fires (reduced motion, a
    // backgrounded tab), drop the node anyway so it cannot trap clicks.
    setTimeout(() => boot.remove(), 800)
  })
}
