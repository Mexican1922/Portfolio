import { motion } from 'framer-motion'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'
import { skills } from '../data/projects'
import StackIcon from './StackIcon'

// Each skill slides in from the left as its card arrives — reading direction,
// so the eye travels the list instead of scanning a static block.
//
// Total settle time is the thing to watch: the stagger plus the row duration
// lands the longest column (7 items) at about 0.6s. Past roughly a second
// this stops reading as polish and starts reading as lag.
const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.12 } },
}

const row = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Skills() {
  return (
    <section className="py-28 lg:py-36 relative">
      {/* Subtle bg */}
      <div className="absolute inset-0 bg-surface/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-heading text-accent text-sm font-semibold tracking-widest uppercase mb-3">
              Expertise
            </p>
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Skills &
              <span className="text-text"> Tools</span>
              <span className="inline-block w-3 h-3 rounded-full bg-accent-2 ml-2 align-middle" />
            </h2>
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <StaggerItem key={category}>
              <div className="glass-card rounded-2xl p-7 h-full group hover:border-accent/20 transition-all duration-500">
                <h3 className="font-heading font-bold text-lg text-text mb-5 group-hover:text-accent-light transition-colors">
                  {category}
                </h3>
                <motion.ul
                  variants={list}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="space-y-3"
                >
                  {items.map((skill) => (
                    <motion.li
                      key={skill}
                      variants={row}
                      className="flex items-center gap-3 text-sm text-text-muted"
                    >
                      <StackIcon name={skill} size={17} className="text-text-dim" />
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
