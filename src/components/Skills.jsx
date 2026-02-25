import { motion } from 'framer-motion'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'
import { skills } from '../data/projects'

const iconMap = {
  'Full-Stack Development': '⚡',
  'Frontend & Design': '🎨',
  'Tools & Platforms': '🛠',
  'Soft Skills': '🤝',
}

export default function Skills() {
  return (
    <section className="py-28 lg:py-36 relative">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="font-heading text-accent text-sm font-semibold tracking-widest uppercase mb-3">
              Expertise
            </p>
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Skills &
              <span className="gradient-text"> Tools</span>
              <span className="inline-block w-3 h-3 rounded-full bg-accent-2 ml-2 align-middle" />
            </h2>
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <StaggerItem key={category}>
              <div className="glass-card rounded-2xl p-7 h-full group hover:border-accent/20 transition-all duration-500">
                <div className="text-3xl mb-4">{iconMap[category]}</div>
                <h3 className="font-heading font-bold text-lg text-text mb-5 group-hover:text-accent-light transition-colors">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-sm text-text-muted"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
