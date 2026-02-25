import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const start = performance.now()
          const animate = (now) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

export default function Hero() {
  const stat1 = useCountUp(10)
  const stat2 = useCountUp(2)
  const stat3 = useCountUp(3)

  return (
    <section className="relative min-h-screen flex items-center pt-24 gradient-mesh overflow-hidden">
      {/* Decorative grid dots */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full animate-float" style={{ background: 'var(--theme-glow-2)', filter: 'blur(48px)' }} />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full animate-float"
        style={{ background: 'var(--theme-gradient-2)', filter: 'blur(48px)', animationDelay: '3s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent-light text-sm font-medium">
                <Sparkles size={14} />
                Available for work
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-text-muted text-lg mb-3"
            >
              Hey, I&apos;m Valentine 👋
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight mb-6"
            >
              <span className="gradient-text">Full-Stack</span>
              <br />
              Developer
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-text-muted text-lg leading-relaxed max-w-lg mb-8"
            >
              I build polished, high-performance web applications that users love.
              From stunning frontends to robust payment integrations — I ship
              real products for real clients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-light transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
              >
                Get In Touch
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border-light text-text font-semibold text-sm hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
              >
                Browse Projects
              </Link>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-10 mt-14 pt-8 border-t border-border"
            >
              <div ref={stat1.ref}>
                <p className="font-heading font-bold text-2xl text-text">
                  {stat1.count}+
                </p>
                <p className="text-text-dim text-xs mt-1 uppercase tracking-wider">
                  Projects Shipped
                </p>
              </div>
              <div ref={stat2.ref}>
                <p className="font-heading font-bold text-2xl text-text">
                  {stat2.count}+
                </p>
                <p className="text-text-dim text-xs mt-1 uppercase tracking-wider">
                  Client Projects
                </p>
              </div>
              <div ref={stat3.ref}>
                <p className="font-heading font-bold text-2xl text-text">
                  {stat3.count}+
                </p>
                <p className="text-text-dim text-xs mt-1 uppercase tracking-wider">
                  Years Learning
                </p>
              </div>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Rotating ring */}
              <div className="absolute -inset-6 rounded-full border border-dashed border-accent/20 animate-spin-slow" />
              <div className="absolute -inset-12 rounded-full border border-dashed border-accent-2/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

              {/* Glow behind */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-accent-2/20 blur-2xl scale-110" />

              {/* Avatar */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-border-light shadow-2xl">
                <img
                  src="/images/profile.jpg"
                  alt="Valentine Azolibe"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 glass-card rounded-2xl px-4 py-3 shadow-xl"
              >
                <p className="text-xs text-text-muted">Based in</p>
                <p className="font-heading font-bold text-sm text-text">
                  🇳🇬 Nigeria
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
