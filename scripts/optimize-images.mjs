/**
 * Convert public/images to WebP.
 *
 * These are website screenshots — large, flat-toned, and shipped straight from
 * a screen capture, which is the worst case for PNG. WebP at quality 82 holds
 * up visually while cutting most of the weight.
 *
 * Screenshots are also far wider than they are ever displayed (cards top out
 * around 900px on a large screen, and the layout is capped at max-w-7xl), so
 * anything wider than MAX_WIDTH is downscaled first. That, not the codec, is
 * usually where the bulk of the saving comes from.
 *
 *   npm run optimize:images          convert anything without a current .webp
 *   npm run optimize:images -- --force   redo everything
 *
 * Originals are left in place; nothing is deleted.
 */
import { readdir, stat, mkdir } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import sharp from 'sharp'

const SRC_DIR = 'image-sources'
const OUT_DIR = 'public/images'
const MAX_WIDTH = 1600
const QUALITY = 82
const SOURCES = new Set(['.png', '.jpg', '.jpeg'])

const force = process.argv.includes('--force')

const kb = (n) => `${(n / 1024).toFixed(0)}KB`

async function newerThan(a, b) {
  try {
    const [sa, sb] = await Promise.all([stat(a), stat(b)])
    return sa.mtimeMs > sb.mtimeMs
  } catch {
    return true // target missing
  }
}

const files = (await readdir(SRC_DIR)).filter((f) => SOURCES.has(extname(f).toLowerCase()))
if (!files.length) {
  console.log('no source images found in', SRC_DIR)
  process.exit(0)
}

// foo.png and foo.jpeg both want foo.webp. Whichever ran first would win and
// the other would be silently skipped, so the output might not come from the
// file the site actually references. Refuse to guess.
const byTarget = new Map()
for (const f of files) {
  const key = `${basename(f, extname(f))}.webp`
  byTarget.set(key, [...(byTarget.get(key) ?? []), f])
}
const clashes = [...byTarget].filter(([, srcs]) => srcs.length > 1)
if (clashes.length) {
  console.error('Multiple sources map to the same .webp:\n')
  for (const [target, srcs] of clashes) {
    console.error(`  ${target}  <-  ${srcs.join(', ')}`)
  }
  console.error('\nRemove or rename the duplicates, then re-run.')
  process.exit(1)
}

await mkdir(OUT_DIR, { recursive: true })

let before = 0
let after = 0
let converted = 0

for (const file of files.sort()) {
  const src = join(SRC_DIR, file)
  const out = join(OUT_DIR, `${basename(file, extname(file))}.webp`)

  const srcSize = (await stat(src)).size
  before += srcSize

  if (!force && !(await newerThan(src, out))) {
    after += (await stat(out)).size
    console.log(`  skip  ${file} (up to date)`)
    continue
  }

  const img = sharp(src)
  const { width } = await img.metadata()

  await img
    .resize({ width: Math.min(width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out)

  const outSize = (await stat(out)).size
  after += outSize
  converted++

  const cut = (100 * (1 - outSize / srcSize)).toFixed(0)
  console.log(
    `  ok    ${file.padEnd(28)} ${kb(srcSize).padStart(8)} -> ${kb(outSize).padStart(8)}  (-${cut}%)`,
  )
}

console.log(
  `\n${converted} converted | ${kb(before)} -> ${kb(after)} ` +
    `(-${(100 * (1 - after / before)).toFixed(0)}%)`,
)
