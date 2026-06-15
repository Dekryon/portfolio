// Capture real screenshots of the live website projects and save them into
// public/projects/ with the filenames the portfolio already expects. Run this
// on a machine with internet access (it needs a real browser):
//
//   npm install
//   npx playwright install chromium
//   npm run screenshots
//
// Re-shoot just one file by passing its name:
//   node scripts/capture-screenshots.mjs quality-auto.jpg
//
// Then review public/projects/, and commit + push:
//   git add public/projects && git commit -m "Add project screenshots" && git push
//
// Only projects with a live, public URL are captured. The rest keep their
// hand-coded CSS mock UI automatically.

import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdir } from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'projects')

// Optional filter — `node script.mjs quality-auto.jpg` re-shoots only that one.
const ONLY = process.argv[2] || null

// filename → live URL. Filenames match the `image` paths in src/data/projects.js.
const SHOTS = [
  { name: 'ordo.jpg', url: 'https://useordo.org', settle: 5000 },
  { name: 'signal.jpg', url: 'https://signal-tracker-roan.vercel.app', settle: 5000 },
  { name: 'ai-saas-factory.jpg', url: 'https://ai-saas-factory-ten.vercel.app', settle: 5000 },
  // Quality Auto auto-rotates a hero carousel; 2500ms reliably lands on slide 1
  // before the rotation advances, where the main headline is readable.
  { name: 'quality-auto.jpg', url: 'https://qualityautosignatures.com', settle: 2500 },
  { name: 'portfolio.jpg', url: 'https://gregoryuku.com', settle: 6500 }
]

const WIDTH = 1600
const HEIGHT = 1000 // 16:10 — matches the browser mockup frame

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2, // retina-crisp; drop to 1 for exactly 1600×1000
    colorScheme: 'dark'
  })

  const shots = ONLY ? SHOTS.filter((s) => s.name === ONLY) : SHOTS
  let ok = 0
  for (const { name, url, settle = 3500 } of shots) {
    const page = await context.newPage()
    try {
      console.log(`→ ${url}`)
      const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
      if (resp && resp.status() >= 400) {
        console.error(`  ✗ skipped ${name}: HTTP ${resp.status()} (likely auth-gated or 404)`)
        continue
      }
      // Let webfonts and entrance animations settle before the shot.
      await page.waitForTimeout(settle)
      await page.screenshot({
        path: join(OUT_DIR, name),
        type: 'jpeg',
        quality: 82,
        clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT }
      })
      console.log(`  ✓ saved public/projects/${name}`)
      ok++
    } catch (err) {
      console.error(`  ✗ failed ${name}: ${err.message}`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  console.log(`\nDone — ${ok}/${shots.length} captured.`)
  console.log('Review public/projects/, then commit + push to deploy.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
