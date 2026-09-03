import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import PageLoader from './components/PageLoader'
import HomePage from './pages/HomePage'

// The landing page stays in the main bundle — it is what most visitors arrive
// on, and splitting it would put a loading state in front of the first paint.
// The rest are split out, so they cost nothing until someone navigates.
// How long the loader stays up on a route change, in ms. The chunks resolve in
// a few milliseconds on a warm connection, so without a floor the loader would
// flash and vanish. Raising this makes the site slower for no benefit to the
// reader; 0 disables the hold entirely.
const MIN_LOADER_MS = 600

/** Hold a lazy import open long enough for the loader to be seen. */
const withMinDuration = (factory, ms = MIN_LOADER_MS) =>
  () =>
    Promise.all([factory(), new Promise((r) => setTimeout(r, ms))]).then(
      ([mod]) => mod,
    )

const ProjectsPage = lazy(withMinDuration(() => import('./pages/ProjectsPage')))
const AboutPage = lazy(withMinDuration(() => import('./pages/AboutPage')))
const ContactPage = lazy(withMinDuration(() => import('./pages/ContactPage')))

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// With `mode="wait"` the outgoing page finishes exiting before the incoming one
// mounts, so a slow exit leaves the viewport empty for that whole beat. Keep the
// exit short and the entry unhurried: the gap reads as a wipe, not a blank.
const pageVariants = {
  initial: { opacity: 0, y: 18, scale: 0.995 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.995,
    transition: { duration: 0.16, ease: 'easeIn' },
  },
}

const staticVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
}

function PageWrapper({ children }) {
  const reduced = prefersReducedMotion()
  return (
    <motion.div
      variants={reduced ? staticVariants : pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      // Scroll as the new page starts animating in, not the moment the URL
      // changes — otherwise the outgoing page visibly jumps to the top mid-exit.
      onAnimationStart={() => window.scrollTo(0, 0)}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    // `reducedMotion="user"` makes every framer animation on the site honour
    // the OS setting, rather than each component remembering to check.
    <MotionConfig reducedMotion="user">
    <div className="grain-overlay min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {/* Keyed on the path so each navigation gets its own boundary and the
              spinner re-arms, rather than resolving once for the whole app. */}
          <Suspense key={location.pathname} fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <HomePage />
                  </PageWrapper>
                }
              />
              <Route
                path="/projects"
                element={
                  <PageWrapper>
                    <ProjectsPage />
                  </PageWrapper>
                }
              />
              <Route
                path="/about"
                element={
                  <PageWrapper>
                    <AboutPage />
                  </PageWrapper>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageWrapper>
                    <ContactPage />
                  </PageWrapper>
                }
              />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
    </div>
    </MotionConfig>
  )
}
