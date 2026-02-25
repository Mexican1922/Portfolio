import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, ArrowRight, Code2, Palette, Server, Users } from 'lucide-react'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'
import { skills, socialLinks } from '../data/projects'

const highlights = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    desc: 'Building complete web applications from frontend to backend with React, Node.js, and modern frameworks.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'Crafting intuitive, responsive interfaces that look stunning and provide exceptional user experiences.',
  },
  {
    icon: Server,
    title: 'Payment Integration',
    desc: 'Implementing secure payment systems and e-commerce functionality for real-world client applications.',
  },
  {
    icon: Users,
    title: 'Client Collaboration',
    desc: 'Working directly with clients to understand requirements and deliver polished products on time.',
  },
]

export default function About() {
  return (
    <section className="relative">
      {/* Hero area */}
      <div className="pt-32 pb-20 lg:pt-40 lg:pb-28 gradient-mesh">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-heading text-accent text-sm font-semibold tracking-widest uppercase mb-4">
              About Me
            </p>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Valentine
              <span className="gradient-text"> Azolibe</span>
              <span className="inline-block w-3 h-3 rounded-full bg-accent ml-2 align-middle" />
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-28">
        {/* Bio + Skills side by side */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 -mt-8">
          {/* Bio Text */}
          <div className="lg:col-span-3 space-y-5">
            <ScrollReveal>
              <p className="text-text-muted text-lg leading-relaxed">
                Hi, I'm <span className="text-text font-semibold">Valentine Azolibe</span> 👋 — a
                full-stack developer passionate about building clean, modern, and
                user-friendly web applications.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-text-muted text-lg leading-relaxed">
                My journey into web development began in university, where I first
                discovered frontend through a friend. Later, at{' '}
                <span className="text-text font-medium">Aptech</span>, I sharpened
                my skills in web development with Python, and since then, I've
                been deeply committed to creating digital experiences that are both
                functional and beautiful.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-text-muted text-lg leading-relaxed">
                I specialize in building responsive web applications using{' '}
                <span className="text-accent-light font-medium">React</span> and{' '}
                <span className="text-accent-light font-medium">Vue.js</span>,
                with a strong foundation in modern JavaScript, Tailwind CSS, and
                Node.js. I've worked on diverse projects — from{' '}
                <span className="text-text font-medium">
                  EdTech platforms with payment integration
                </span>{' '}
                to{' '}
                <span className="text-text font-medium">
                  professional business websites for real clients
                </span>
                .
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-text-muted text-lg leading-relaxed">
                I enjoy solving problems with code, exploring new design trends,
                and making ideas come alive on the web. Beyond coding, I'm curious,
                creative, and always eager to learn and grow. 🚀
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <p className="text-text-muted text-lg leading-relaxed">
                Want to work together or have a project in mind?{' '}
                <Link
                  to="/contact"
                  className="text-accent-light hover:text-accent font-medium border-b border-accent/30 hover:border-accent transition-colors"
                >
                  Let's connect!
                </Link>
              </p>
            </ScrollReveal>

            {/* Resume download */}
            <ScrollReveal delay={0.4}>
              <div className="pt-6">
                <a
                  href={socialLinks.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl glass-card hover:border-accent/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent-light">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text group-hover:text-accent-light transition-colors">
                      Download Resume
                    </p>
                    <p className="text-xs text-text-dim">PDF • View on Google Drive</p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-text-dim group-hover:text-accent-light group-hover:translate-x-1 transition-all ml-4"
                  />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Skills sidebar */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <div className="glass-card rounded-2xl p-8 sticky top-28">
                <h3 className="font-heading font-bold text-xl text-text mb-6">
                  Skills & Tools
                </h3>
                <div className="space-y-6">
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="text-sm font-semibold text-accent-light mb-3">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 text-xs font-medium rounded-full bg-surface-3 text-text-muted border border-border hover:border-accent/20 hover:text-text transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* What I do — highlights */}
        <div className="mt-24">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight mb-10">
              What I Do
              <span className="inline-block w-2 h-2 rounded-full bg-accent ml-2 align-middle" />
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 gap-6">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title}>
                <div className="glass-card rounded-2xl p-7 h-full group hover:border-accent/20 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent-light mb-5 group-hover:bg-accent/20 transition-colors">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-text mb-2 group-hover:text-accent-light transition-colors">
                    {title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
