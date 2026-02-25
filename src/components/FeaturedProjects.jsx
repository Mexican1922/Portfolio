import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Star, ExternalLink } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { featuredProjects } from '../data/projects'

export default function FeaturedProjects() {
  return (
    <section className="py-28 lg:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="font-heading text-accent text-sm font-semibold tracking-widest uppercase mb-3">
                Featured Work
              </p>
              <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
                Latest
                <span className="gradient-text"> Projects</span>
                <span className="inline-block w-3 h-3 rounded-full bg-accent ml-2 align-middle" />
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden sm:flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm font-medium"
            >
              View all
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

        {/* Featured Cards — Large */}
        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.15}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="glass-card rounded-2xl lg:rounded-3xl overflow-hidden project-card-hover glow-border">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div
                      className={`project-image-wrapper aspect-video lg:aspect-auto lg:min-h-[400px] ${index % 2 === 1 ? 'lg:order-2' : ''
                        }`}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="badge-featured flex items-center gap-1">
                          <Star size={10} />
                          Featured
                        </span>
                        <span className={`badge-${project.badge} text-xs font-medium px-3 py-1 rounded-full`}>
                          Client Work
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-2xl lg:text-3xl text-text mb-2 group-hover:text-accent-light transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-text-dim text-sm font-medium mb-4">
                        {project.subtitle}
                      </p>

                      <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-lg">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-surface-3 text-text-muted border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-accent-light text-sm font-semibold group-hover:gap-3 transition-all">
                        <ExternalLink size={16} />
                        Visit Live Site
                        <ArrowUpRight
                          size={16}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile "View all" link */}
        <div className="sm:hidden mt-10 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border-light text-text-muted hover:text-accent hover:border-accent/30 transition-all text-sm font-medium"
          >
            View All Projects
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
