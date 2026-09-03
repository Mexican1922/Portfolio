import {
  siReact,
  siTypescript,
  siNextdotjs,
  siVuedotjs,
  siTailwindcss,
  siFramer,
  siVite,
  siPython,
  siDjango,
  siPostgresql,
  siGithub,
  siVercel,
  siRender,
  siFirebase,
  siSupabase,
} from 'simple-icons'

/**
 * Brand marks for the stack, taken from simple-icons rather than transcribed.
 *
 * Icons are imported individually so the bundler keeps only these fifteen —
 * the package carries several thousand and has no business in the bundle.
 *
 * Anything absent here falls back to the dot the list already used. That
 * covers two kinds of entry, both deliberate: practices (REST API design, SEO)
 * and the soft skills, neither of which has a mark to borrow.
 */
const ICONS = {
  'React 19': siReact,
  React: siReact,
  TypeScript: siTypescript,
  'Next.js': siNextdotjs,
  'Vue.js': siVuedotjs,
  'Tailwind CSS': siTailwindcss,
  'Framer Motion': siFramer,
  Vite: siVite,
  Python: siPython,
  Django: siDjango,
  'Django REST Framework': siDjango,
  PostgreSQL: siPostgresql,
  'Git & GitHub': siGithub,
  Vercel: siVercel,
  Render: siRender,
  Firebase: siFirebase,
  Supabase: siSupabase,
}

/**
 * Brand colours are dropped in favour of the site's palette. Fifteen different
 * hues in one panel reads as a sticker sheet, and several (Vercel's black,
 * Django's near-black) would vanish against the dark cards.
 */
export default function StackIcon({ name, size = 16, className = '' }) {
  const icon = ICONS[name]

  if (!icon) {
    return (
      <span
        aria-hidden
        className={`inline-block flex-shrink-0 rounded-full bg-accent ${className}`}
        style={{ width: size * 0.28, height: size * 0.28 }}
      />
    )
  }

  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={`flex-shrink-0 ${className}`}
    >
      <path d={icon.path} />
    </svg>
  )
}
