import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import MaterialIcon from '../components/MaterialIcon'
import SpotlightCard from '../components/SpotlightCard'
import ScrollReveal from '../components/ScrollReveal'
import { featuredProjects, otherProjects } from '../data/projects'

const allProjects = [...featuredProjects, ...otherProjects]
const filters = ['All', 'Co-Founder', 'Client Work', 'React', 'Django', 'Vue.js', 'Full-Stack', 'Frontend', 'Firebase']

// Map filter name → matching badge values
const badgeMap = {
  'Co-Founder': ['founder'],
  'Client Work': ['client'],
  'Firebase': ['firebase'],
  'React': ['react'],
  'Vue.js': ['vue'],
  'Full-Stack': ['fullstack'],
  'Frontend': ['frontend'],
}

function getFiltered(projects, filter) {
  if (filter === 'All') return projects
  return projects.filter((p) => {
    const tagMatch = p.tags?.some((t) => t === filter)
    const badges = badgeMap[filter] || []
    const badgeMatch = badges.includes(p.badge)
    return tagMatch || badgeMatch
  })
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

function getBadgeLabel(badge) {
  switch (badge) {
    case 'founder': return 'Co-Founder'
    case 'react': return 'React'
    case 'vue': return 'Vue.js'
    case 'fullstack': return 'Full-Stack'
    case 'frontend': return 'Frontend'
    case 'firebase': return 'Firebase'
    case 'client': return 'Client Work'
    default: return badge
  }
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const filtered = getFiltered(allProjects, activeFilter)

  return (
    <section className="relative">
      {/* Page Header */}
      <div className="relative pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-heading text-accent text-sm font-semibold tracking-widest uppercase mb-4">
              Portfolio
            </p>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight mb-4">
              Things I&apos;ve
              <span className="text-text"> Shipped</span>
              <span className="inline-block w-3 h-3 rounded-full bg-accent ml-2 align-middle" />
            </h1>
            <p className="text-text-muted text-lg max-w-2xl leading-relaxed">
              Production work for real clients and real users: an EdTech
              platform handling payments, a textile storefront its owner runs
              through Django admin, a smart-energy company operating across 12+
              states. Live links and source where it&apos;s public.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-28">
        {/* Filter tabs */}
        <div className="filter-scroll flex gap-2 mb-10 sm:mb-12 pb-2 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeFilter === filter
                ? 'bg-accent text-white shadow-lg shadow-accent/25'
                : 'bg-surface-2 text-text-muted border border-border hover:border-accent/30 hover:text-text'
                }`}
            >
              {filter}
              {activeFilter === filter && (
                <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-xs opacity-80">
                  ({filtered.length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          key={activeFilter}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <div className="group block h-full">
                  <SpotlightCard className="glass-card rounded-2xl overflow-hidden h-full project-card-hover glow-border flex flex-col">
                    {/* Image */}
                    <div className="project-image-wrapper aspect-video relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      {/* Badges overlay */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {project.badge === 'client' && (
                          <span className="badge-featured flex items-center gap-1 text-[10px]">
                            <MaterialIcon name="star" size={9} />
                            Client
                          </span>
                        )}
                        {project.badge === 'founder' && (
                          <span
                            className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full text-white"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
                          >
                            <MaterialIcon name="groups" size={9} />
                            Co-Founder
                          </span>
                        )}
                        {project.badge !== 'founder' && (
                          <span
                            className={`badge-${project.badge} text-[10px] font-medium px-2.5 py-0.5 rounded-full`}
                          >
                            {getBadgeLabel(project.badge)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-heading font-bold text-lg text-text mb-2 flex items-center gap-2">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 hover:text-accent-light transition-colors"
                        >
                          {project.title}
                          <ExternalLink
                            size={14}
                            className="text-text-dim group-hover:text-accent-light transition-colors"
                          />
                        </a>
                      </h3>

                      <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tags?.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 text-[10px] font-medium rounded-full border transition-colors ${tag === activeFilter
                              ? 'bg-accent/15 text-accent-light border-accent/30'
                              : 'bg-surface-3 text-text-dim border-border'
                              }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-text-dim hover:text-text transition-colors"
                        >
                          <Github size={14} />
                          View Code
                        </a>
                      )}
                    </div>
                  </SpotlightCard>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-text-muted text-lg">
              No projects match this filter.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}