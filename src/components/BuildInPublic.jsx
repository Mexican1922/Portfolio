import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { socialLinks } from '../data/projects'

/** X's own mark; lucide's `X` is the close glyph, not the brand. */
function XMark({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

/**
 * 100 consecutive days shipping in public, linked to the Day 100 post.
 *
 * The rest of the page makes its case with work hosted here; this is the one
 * claim a reader can verify somewhere Valentine does not control, which is
 * what makes it worth the space.
 */
export default function BuildInPublic() {
  const { days, proof } = socialLinks.buildInPublic

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="glass-card rounded-2xl px-6 py-6 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex items-center gap-4">
              <span className="font-heading font-extrabold text-4xl leading-none bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-transparent">
                {days}
              </span>
              <p className="text-sm leading-snug text-text-muted">
                <span className="font-semibold text-text">
                  consecutive days building in public
                </span>
                <br className="hidden sm:block" /> on X, shipping and posting
                the work every day.
              </p>
            </div>

            <motion.a
              whileHover={{ y: -2 }}
              href={proof}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 self-start sm:self-auto rounded-full border border-border-light px-5 py-2.5 text-sm font-semibold text-text hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
            >
              <XMark />
              Day {days} post
              <ArrowUpRight
                size={14}
                className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              />
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
