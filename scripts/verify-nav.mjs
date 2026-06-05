// Drive the live site through three states so we can verify the nav
// a11y changes + liquid-glass slide work:
//   1. Idle  — no hover, active is Manifesto by default
//   2. Hover — pointer over "Identity" link, liquid blob should slide
//   3. Cycle — wait 3s so the Hero "Currently <role>" pill ticks
//
// Saves three JPEGs into ./verify-shots/.
//
// Usage:
//   PORTFOLIO_URL="https://...?_vercel_share=..." node scripts/verify-nav.mjs

import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'verify-shots')

const url = process.env.PORTFOLIO_URL
if (!url) {
  console.error('Set PORTFOLIO_URL.')
  process.exit(1)
}

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 2,
  colorScheme: 'dark'
})
const page = await ctx.newPage()
console.log(`→ ${url}`)
await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
await page.waitForTimeout(14000) // Loader.jsx + intro animation

// Shot 1: idle
await page.screenshot({
  path: join(OUT, 'nav-idle.jpg'),
  type: 'jpeg',
  quality: 84,
  clip: { x: 0, y: 0, width: 1600, height: 200 }
})
console.log('  ✓ nav-idle.jpg')

// Shot 2: hover over "IDENTITY" link (the second link in the pill).
// Matches case-insensitively since the redesign uses CSS `text-transform`
// + raw "Identity" in the DOM, but a previous round shipped UPPERCASE
// literals — accept either.
const identity = page
  .locator('a')
  .filter({ hasText: /identity/i })
  .first()
if (await identity.count()) {
  await identity.hover()
  await page.waitForTimeout(800) // let the spring settle
  await page.screenshot({
    path: join(OUT, 'nav-hover.jpg'),
    type: 'jpeg',
    quality: 84,
    clip: { x: 0, y: 0, width: 1600, height: 200 }
  })
  console.log('  ✓ nav-hover.jpg')
} else {
  console.log('  ✗ could not find Identity link')
}

// Shot 3: hero bottom strip showing the "Currently <role>" pill
await page.mouse.move(100, 100) // un-hover
await page.waitForTimeout(2500) // wait for the next role tick
await page.screenshot({
  path: join(OUT, 'hero-role-pill.jpg'),
  type: 'jpeg',
  quality: 84,
  clip: { x: 0, y: 820, width: 900, height: 180 }
})
console.log('  ✓ hero-role-pill.jpg')

await browser.close()
console.log('\nDone — review ./verify-shots/')
