import { Link } from 'react-router-dom'
import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react'
import { socialLinks } from '../data/projects'

const footerNav = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const socialIcons = [
  { icon: Instagram, href: socialLinks.instagram, label: 'Instagram', hoverColor: 'hover:text-pink-500' },
  { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn', hoverColor: 'hover:text-blue-500' },
  { icon: Github, href: socialLinks.github, label: 'GitHub', hoverColor: 'hover:text-white' },
  { icon: Mail, href: `mailto:${socialLinks.email}`, label: 'Email', hoverColor: 'hover:text-accent-light' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-border" style={{ backgroundColor: 'var(--theme-footer-bg)' }}>
      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 lg:py-20 border-b border-border">
          <div className="max-w-2xl">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Let's build something
              <span className="gradient-text"> amazing</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent ml-2 align-middle" />
            </h2>
            <p className="text-text-muted text-lg mb-8 leading-relaxed">
              Have a project in mind? I'd love to hear about it. Let's work
              together and make it happen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-light transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                Get In Touch
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center px-7 py-3.5 rounded-full border border-border-light text-text font-semibold text-sm hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                Browse Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Nav links */}
          <nav className="flex items-center gap-6">
            {footerNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-text-muted hover:text-text transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialIcons.map(({ icon: Icon, href, label, hoverColor }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-text-dim ${hoverColor} hover:bg-surface-3 transition-all duration-300`}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pb-6 flex items-center justify-between text-xs text-text-dim">
          <span>© {new Date().getFullYear()} All Rights Reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart size={10} className="text-accent fill-accent" /> by Valentine
          </span>
        </div>
      </div>
    </footer>
  )
}
