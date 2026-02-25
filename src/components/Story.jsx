import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

export default function Story() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-10">
            My Story
            <span className="inline-block w-3 h-3 rounded-full bg-accent ml-2 align-middle" />
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal delay={0.1}>
            <p className="text-text-muted text-lg leading-relaxed">
              My journey into web development began during my 300 level at
              university when a close friend introduced me to front-end
              development. At the time, I wasn't too serious about it, but I was
              fascinated by the idea of creating something from nothing. That
              curiosity planted a seed of passion in me.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-text-muted text-lg leading-relaxed">
              After graduating, I decided to take things further and enrolled at{' '}
              <span className="text-text font-medium">Aptech</span>, where I
              registered to learn{' '}
              <span className="text-text font-medium">
                Web Development with Python
              </span>
              . The structured learning environment helped me build a strong
              foundation, and my passion for development grew even stronger.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-text-muted text-lg leading-relaxed">
              Since then, I've gone beyond just building personal projects — I
              now build{' '}
              <span className="text-accent-light font-medium">
                production-ready applications for real clients
              </span>
              . From{' '}
              <span className="text-text font-medium">
                Apex TechHub
              </span>{' '}
              (a full-featured EdTech platform with payment integration) to{' '}
              <span className="text-text font-medium">
                Kings Tech Solutions
              </span>{' '}
              (a professional business website for a security & solar company),
              each project has sharpened my skills and pushed me to deliver
              polished, high-quality work.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-text-muted text-lg leading-relaxed">
              Today, I'm focused on combining design and functionality to build
              user-friendly web experiences. I enjoy turning ideas into
              functional products, continuously learning new tools, and
              collaborating with others who share the same passion for
              technology.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <p className="text-text-muted text-lg leading-relaxed">
              My{' '}
              <Link
                to="/projects"
                className="text-accent-light hover:text-accent font-medium border-b border-accent/30 hover:border-accent transition-colors"
              >
                projects
              </Link>{' '}
              reflect this journey, and they tell the story of how far I've come
              — and how much further I'm excited to go 🚀
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.6}>
          <div className="mt-12">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-accent-light hover:text-accent font-semibold text-sm transition-colors"
            >
              Learn more about me
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
