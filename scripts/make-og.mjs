/**
 * Generate the social share card.
 *
 *   node scripts/make-og.mjs
 *
 * Writes public/images/og-banner.jpg at 1200x630 — the size X, LinkedIn,
 * WhatsApp and Slack all crop from. JPEG rather than WebP on purpose: several
 * crawlers still will not render WebP, and a card that fails to load is worse
 * than one that is a few KB larger.
 *
 * Text is drawn through SVG, so it uses whatever sans the system provides
 * rather than the site's Epilogue. At this size the difference is invisible,
 * and it avoids shipping a font file just to build one image.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import sharp from 'sharp'

const W = 1200
const H = 630
const OUT = 'public/images/og-banner.jpg'
const PORTRAIT = 'image-sources/profile.jpeg'

const NAME = 'Valentine Azolibe'
const ROLE = 'Full-Stack Developer'
const SUB = 'React &amp; Django  ·  Co-Founder of Collan'
const URL = 'valentine-azolibe.vercel.app'

const AVATAR = 320
const AVATAR_X = W - AVATAR - 84
const AVATAR_Y = (H - AVATAR) / 2

const bg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="78%" cy="18%" r="62%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.30"/>
      <stop offset="60%" stop-color="#06b6d4" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#050508" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#050508"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <g font-family="Segoe UI, Helvetica Neue, Arial, sans-serif">
    <text x="84" y="150" fill="#ededed" font-size="26" font-weight="700"
          letter-spacing="-0.5">Valentine Codes</text>
    <circle cx="286" cy="142" r="5" fill="#8b5cf6"/>

    <text x="84" y="268" fill="#ededed" font-size="66" font-weight="800"
          letter-spacing="-2">${NAME}</text>
    <text x="84" y="336" fill="#a78bfa" font-size="40" font-weight="700"
          letter-spacing="-1">${ROLE}</text>
    <text x="84" y="392" fill="#7a7a8c" font-size="26" font-weight="500">${SUB}</text>

    <rect x="84" y="440" width="120" height="4" rx="2" fill="url(#rule)"/>

    <text x="84" y="520" fill="#4a4a58" font-size="23" font-weight="500">${URL}</text>
  </g>

  <circle cx="${AVATAR_X + AVATAR / 2}" cy="${H / 2}" r="${AVATAR / 2 + 10}"
          fill="none" stroke="#8b5cf6" stroke-opacity="0.35" stroke-width="2"/>
</svg>`)

const mask = Buffer.from(
  `<svg width="${AVATAR}" height="${AVATAR}"><circle cx="${AVATAR / 2}" cy="${AVATAR / 2}" r="${AVATAR / 2}" fill="#fff"/></svg>`,
)

// The source is a 608x1080 portrait, so squaring it throws away most of the
// frame. `position: 'top'` was cutting the face off-centre; attention picks
// the salient region instead, which on a head-and-shoulders shot is the face.
const portrait = await sharp(await readFile(PORTRAIT))
  .resize(AVATAR, AVATAR, { fit: 'cover', position: sharp.strategy.attention })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer()

await mkdir('public/images', { recursive: true })
const out = await sharp(bg)
  .composite([{ input: portrait, left: AVATAR_X, top: Math.round(AVATAR_Y) }])
  .jpeg({ quality: 88, progressive: true })
  .toBuffer()

await writeFile(OUT, out)
const { width, height } = await sharp(out).metadata()
console.log(`wrote ${OUT} — ${width}x${height}, ${(out.length / 1024).toFixed(0)}KB`)
