// Converts the heavy raster assets under public/images to WebP.
// Run with: npm run images:optimize  (requires the `sharp` devDependency)
import { readdir, stat } from 'node:fs/promises'
import { join, extname, basename, dirname } from 'node:path'
import sharp from 'sharp'

const ROOT = new URL('../public/images/', import.meta.url).pathname

/** [glob-like prefix, max width in px] — anything matching is converted next to the source file. */
const TARGETS = [
  ['bg-looking-for-you.jpg', 1920],
  ['img-looking-for-you.png', 1200],
  ['staffing/bg-staffing.png', 1600],
  ['recruiting/bg-recruiting.png', 1600],
  ['community/bg-community.png', 1600],
  ['community/experts/Profile_', 600],
]

const walk = async (dir) => {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

const files = await walk(ROOT)
let saved = 0
for (const file of files) {
  const rel = file.slice(ROOT.length)
  const target = TARGETS.find(([prefix]) => rel.startsWith(prefix))
  if (!target || !['.png', '.jpg', '.jpeg'].includes(extname(file).toLowerCase())) continue
  const out = join(dirname(file), `${basename(file, extname(file))}.webp`)
  const before = (await stat(file)).size
  await sharp(file)
    .resize({ width: target[1], withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out)
  const after = (await stat(out)).size
  saved += before - after
  console.log(`${rel} ${(before / 1024).toFixed(0)}K -> ${(after / 1024).toFixed(0)}K`)
}
console.log(`Saved ${(saved / 1024 / 1024).toFixed(1)} MB`)
