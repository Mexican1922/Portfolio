import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Send, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { socialLinks } from '../data/projects'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )
    window.location.href = `mailto:${socialLinks.email}?subject=${subject}&body=${body}`
  }

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
              Contact
            </p>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">
              Get In
              <span className="gradient-text"> Touch</span>
              <span className="inline-block w-3 h-3 rounded-full bg-accent ml-2 align-middle" />
            </h1>
            <p className="text-text-muted text-lg max-w-xl leading-relaxed">
              Looking to partner or work together? Reach out through the form
              and I'll get back to you in the next 48 hours.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-28">
        <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 -mt-4">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-text-muted mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-5 py-3.5 rounded-xl bg-surface-2 border border-border text-text placeholder-text-dim text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                      placeholder="Valentine Azolibe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-text-muted mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-5 py-3.5 rounded-xl bg-surface-2 border border-border text-text placeholder-text-dim text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-text-muted mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-5 py-3.5 rounded-xl bg-surface-2 border border-border text-text placeholder-text-dim text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-light transition-all hover:shadow-lg hover:shadow-accent/25"
                >
                  <Send size={16} />
                  Send Message
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </button>
              </form>
            </ScrollReveal>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <div className="glass-card rounded-2xl p-6 sm:p-8 lg:sticky lg:top-28 space-y-8">
                <h3 className="font-heading font-bold text-xl text-text">
                  Contact Info
                </h3>

                <div className="space-y-6">
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="group flex items-start gap-4 hover:translate-x-1 transition-transform"
                  >
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent-light flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-text-dim uppercase tracking-wider mb-1">
                        Email
                      </p>
                      <p className="text-sm text-text group-hover:text-accent-light transition-colors break-all sm:break-normal">
                        {socialLinks.email}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`tel:${socialLinks.phone}`}
                    className="group flex items-start gap-4 hover:translate-x-1 transition-transform"
                  >
                    <div className="w-11 h-11 rounded-xl bg-accent-2/10 flex items-center justify-center text-accent-2 flex-shrink-0 group-hover:bg-accent-2/20 transition-colors">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-text-dim uppercase tracking-wider mb-1">
                        Phone
                      </p>
                      <p className="text-sm text-text group-hover:text-accent-2 transition-colors">
                        {socialLinks.phone}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-success/10 flex items-center justify-center text-success flex-shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-text-dim uppercase tracking-wider mb-1">
                        Location
                      </p>
                      <p className="text-sm text-text">Nigeria 🇳🇬</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-highlight/10 flex items-center justify-center text-highlight flex-shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-text-dim uppercase tracking-wider mb-1">
                        Response Time
                      </p>
                      <p className="text-sm text-text">Within 48 hours</p>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="pt-6 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
                    </span>
                    <span className="text-sm text-text-muted">
                      Currently available for work
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
