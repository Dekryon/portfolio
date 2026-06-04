// Re-transcode the hero video into web-friendly H.264 mp4 + a poster JPEG.
// Run when the source clip changes:
//
//   HERO_SOURCE="C:\Users\me\source.mov" node scripts/transcode-hero.mjs
//
// Without HERO_SOURCE, looks for ./scripts/hero-source.mp4 (gitignored).
// Outputs:
//   public/hero.mp4         — H.264 main, CRF 26, mute, faststart
//   public/hero-poster.jpg  — frame at t=8s
//
// Uses ffmpeg-static (devDep) so no global ffmpeg install needed.

import ffmpegPath from 'ffmpeg-static'
import { spawnSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const source =
  process.env.HERO_SOURCE || join(__dirname, 'hero-source.mp4')

if (!existsSync(source)) {
  console.error(`✗ source not found: ${source}`)
  console.error('  set HERO_SOURCE to the absolute path of the clip')
  process.exit(1)
}

const MP4 = join(ROOT, 'public', 'hero.mp4')
const POSTER = join(ROOT, 'public', 'hero-poster.jpg')

function run(args, label) {
  console.log(`→ ${label}`)
  const r = spawnSync(ffmpegPath, args, { stdio: ['ignore', 'inherit', 'inherit'] })
  if (r.status !== 0) {
    console.error(`✗ ${label} failed (exit ${r.status})`)
    process.exit(r.status ?? 1)
  }
}

// Don't pre-transpose — modern ffmpeg auto-rotates from displaymatrix metadata
// and tile-flipping again would un-do it (learned this the hard way).
run(
  [
    '-y',
    '-i', source,
    '-c:v', 'libx264',
    '-profile:v', 'main',
    '-level', '4.0',
    '-pix_fmt', 'yuv420p',
    '-preset', 'slow',
    '-crf', '26',
    '-an',
    '-movflags', '+faststart',
    MP4
  ],
  'transcode → hero.mp4'
)

run(
  [
    '-y',
    '-ss', '00:00:08',
    '-i', source,
    '-frames:v', '1',
    '-q:v', '3',
    '-update', '1',
    POSTER
  ],
  'extract poster → hero-poster.jpg'
)

const mp4Kb = Math.round(statSync(MP4).size / 1024)
const posterKb = Math.round(statSync(POSTER).size / 1024)
console.log(`\nhero.mp4: ${mp4Kb} KB · hero-poster.jpg: ${posterKb} KB`)
