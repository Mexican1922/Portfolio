/**
 * Contact sheet for spotting the Windows activation watermark.
 *
 *   node scripts/scan-watermarks.mjs <srcDir...>
 *
 * Correlating against a template was tried and abandoned: these are full-page
 * captures, so the watermark sits wherever the viewport happened to be rather
 * than at a fixed offset, and nothing lines up reliably enough to threshold.
 * So this just crops the likely corner from each image, boosts contrast, and
 * lays them out big enough to read. Delete public/_wm/ when done.
 */
import { readdir, mkdir, writeFile, rm } from 'node:fs/promises'
import { join, extname, basename, resolve } from 'node:path'
import sharp from 'sharp'

const OUT = 'public/_wm'
const dirs = process.argv.slice(2)
if (!dirs.length) dirs.push('image-sources')

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const seen = new Set()
const rows = []

for (const dir of dirs) {
  let files
  try {
    files = (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f))
  } catch {
    continue
  }
  const tag = resolve(dir).split(/[\\/]/).slice(-2, -1)[0]
  for (const f of files.sort()) {
    const stem = basename(f, extname(f))
    if (seen.has(stem)) continue // same shot in both repos
    seen.add(stem)

    const src = join(dir, f)
    const m = await sharp(src).metadata()
    const w = m.width ?? 0
    const h = m.height ?? 0
    // bottom-right quadrant, wide enough to catch the two-line watermark
    const cw = Math.min(w, Math.max(620, Math.round(w * 0.42)))
    const ch = Math.min(h, Math.max(170, Math.round(h * 0.22)))
    const name = `${stem}.png`
    await sharp(src)
      .extract({ left: w - cw, top: h - ch, width: cw, height: ch })
      .resize({ width: 700 })
      .linear(1.6, -40) // lift the faint grey glyphs off the background
      .toFile(join(OUT, name))
    rows.push({ tag, file: f, name, dim: `${w}x${h}` })
  }
}

const html = `<!doctype html><meta charset="utf-8"><title>watermark scan</title>
<style>
body{background:#111;color:#eee;font:13px system-ui;margin:0;padding:12px}
figure{margin:0 0 10px;background:#000;border:1px solid #333;border-radius:6px;overflow:hidden}
img{display:block;width:100%}
figcaption{padding:5px 8px;font-family:ui-monospace,monospace;font-size:12px;color:#9c9}
</style>
${rows
  .map(
    (r) =>
      `<figure id="${r.name}"><img src="/_wm/${r.name}" alt="${r.file}"><figcaption>${r.file} · ${r.dim}</figcaption></figure>`,
  )
  .join('\n')}`
await writeFile(join(OUT, 'index.html'), html)
console.error(`wrote ${rows.length} crops to ${OUT}`)
