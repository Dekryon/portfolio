// One-off: capture public/projects/portfolio.jpg via a Vercel share-link
// bypass, so the screenshot works even while the live URL is still gated
// by deployment protection. Pass the share URL as an env var:
//
//   PORTFOLIO_URL="https://portfolio-qualityauto-signatures.vercel.app/?_vercel_share=…" \
//     node scripts/shoot-portfolio.mjs
//
// Use scripts/capture-screenshots.mjs for the normal multi-shot flow.

import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'projects', 'portfolio.jpg')

const url = process.env.PORTFOLIO_URL
if (!url) {
  console.error('Set PORTFOLIO_URL to the share-bypass URL.')
  process.exit(1)
}

const WIDTH = 1600
const HEIGHT = 1000

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 2,
  colorScheme: 'dark'
})
const page = await ctx.newPage()
console.log(`→ ${url}`)
await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
// Portfolio has a real loader + WebGL hero; give it room to settle.
// Video hero needs longer to load + play past the intro animation
await page.waitForTimeout(14000)
await page.screenshot({
  path: OUT,
  type: 'jpeg',
  quality: 82,
  clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT }
})
console.log(`  ✓ saved ${OUT}`)
await browser.close()
