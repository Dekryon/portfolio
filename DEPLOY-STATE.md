# Deploy State · pick up here

_Last audited: 2026-06-05_

## ✅ Live

- **Production:** https://portfolio-qualityauto-signatures.vercel.app
- **Repo:** https://github.com/Dekryon/portfolio (public)
- **Vercel project:** `portfolio` in team `qualityauto-signatures`
- **CI/CD:** push to `main` auto-deploys to prod; PRs get preview URLs.
- **Build:** clean — 342 KB gzipped main JS + Scene split into 22 KB gzip
  lazy chunk (via React.lazy on Hero.jsx). Project-grid `<img>`s have
  `loading="lazy"` so ~600 KB of JPEGs below the fold don't block first
  paint.
- **Hero is the original WebGL scene** (`Scene.jsx` — wireframe sphere,
  ember orbit, sparkles, bloom + chromatic aberration), lazy-loaded.
  A muted-autoplay video was tried briefly (commit `fb10ad3`) and
  reverted (commit `32f4123`) at user request.
- **Nav redesign** (commits `fa44376` → `0440d97` → `fba5b64`): clean
  ALL-CAPS Geist Mono labels (Ordo-style), dark glass pill with hairline
  border, vivid ember solid pill that slides between hovered/active
  links. Root cause of all the prior "active blob looks dark" symptoms
  was `.liquid-glass > *` overriding Tailwind's `.absolute` utility on
  the blob container; now fixed AND the CSS rule is wrapped in
  `:where()` + `:not([data-glass-raw])` so future absolute children
  don't hit the same trap.
- **Accessibility** (commits `f11d50c`, `0adfefe`): retired `bone-faint`
  color (failed WCAG AA at 2.4:1); contact form fields have
  htmlFor/id binding, required asterisks, aria-required, aria-live
  status region; skip-to-content link as first tab stop; Loader has
  role="progressbar" with live aria-valuenow; every `<section>` has
  aria-labelledby pointing at its `<h2>`.
- **SEO** (commit `e9aad19`): Person JSON-LD schema; meta description
  trimmed to 156 chars (under Google's snippet cutoff).
- **Real screenshots in place** (4 of 8 cards): `quality-auto.jpg`,
  `portfolio.jpg`, `drive-thru.jpg` (Ordo operator portal),
  `ai-saas-factory.jpg`. The other 4 cards render the hand-coded CSS
  mock (terminal / dashboard / marketing) via the DeviceMockup onError
  fallback — replace them by dropping a JPEG with the matching filename
  into `public/projects/`.
- **Card content updated:** the 'AI Agent Automation System' concept
  card was replaced with a real **AI SaaS Factory** entry (live demo
  at ai-saas-factory-ten.vercel.app, repo at Dekryon/ai-saas-factory).
- **Portrait + grain texture wired:** `public/portrait.jpg` (1200x1500,
  4:5, sunset street shot) drives the About section; `public/grain.jpg`
  (256x256 photographed tile texture) drives the body-wide film-grain
  overlay and the Portrait frame's noise blend.
- **Capture script** (`npm run screenshots`) covers 4 live URLs.
- **Latest commit:** `0adfefe` — section aria-labelledby pass.

## 🔥 Important — one production bug

The production URL **returns HTTP 401 (Vercel auth wall)** to unauthenticated
visitors. Your portfolio's own "Live demo" button is sending people to a
sign-in page, and the screenshot script can't capture the site.

**Fix (60 seconds):**
1. https://vercel.com/qualityauto-signatures/portfolio/settings/deployment-protection
2. Set **Vercel Authentication** to **Disabled** (or "Only Preview Deployments"
   if you want previews gated but prod open).
3. Save.

After that:
- `npm run screenshots` will fill in `public/projects/portfolio.jpg`.
- The "Live demo" button on the portfolio card will actually open the site.

## ⏳ Still to do · in priority order

### 1. Disable deployment protection (above) — blocks everything else
### 2. Wire `RESEND_API_KEY` in Vercel
The contact form already POSTs to `api/contact.js` (Vercel Function) → Resend
→ inbox, with a `mailto:` fallback when the key isn't set.

1. Sign up at https://resend.com (free; no card required).
2. Verified-email account already covers sending to your own Gmail — no DNS
   needed.
3. Create an API key (`re_...`).
4. Vercel → project `portfolio` → Settings → Environment Variables → add
   `RESEND_API_KEY` = that key. Apply to **Production**.
5. Redeploy (any push, or Vercel UI → Deployments → Redeploy).

Subject line is `🔴 Portfolio inquiry — <name>`. Gmail filter to prioritize:
search `subject:"Portfolio inquiry"` → Create filter → Star + Mark important.

### 3. Re-shoot screenshots
After step 1, run from this folder:
```bash
npm run screenshots
git add public/projects && git commit -m "Add portfolio screenshot" && git push
```

### 4. Drop the user-supplied assets in `/public/`
Each is referenced in code; missing files fall back to placeholders.
- `portrait.jpg` (4:5) — see `public/portrait-instructions.md`
- `resume.pdf` — until added, "Download Résumé" 404s
- `og-image.jpg` (1200×630) — until added, social shares have no preview

The drive-thru card has no public deployment yet — the CSS dashboard mock
keeps rendering automatically until a real demo exists.

### 5. Buy a domain (optional but recommended)

All checked via Vercel Domains (2026-06-04):

| Domain | Price/yr | Pick? |
|---|---|---|
| **gregoryuku.com** | **$11.25** | ✅ recommended — universal, matches the name, classic |
| gregoryuku.dev | $9.99 | strong alt — signals "engineer" louder |
| gregoryuku.app | $9.99 | weakest fit (the portfolio isn't an app) |
| gregoryuku.me | $12.99 | weaker — `.me` reads more casual |
| gregoryuku.co | $17.99 | no real benefit over `.com` |
| gregoryuku.io | $37.99 | overpriced for what it gives |

After buying:
1. Vercel → project `portfolio` → Settings → Domains → add the domain.
   (Vercel-purchased domains auto-wire DNS; no manual records.)
2. Update `index.html` `og:url` / `canonical` to `https://gregoryuku.com/`.
3. Update `portfolio` entry in `src/data/projects.js` — `demo` and `label`.
4. Update `DEPLOY-STATE.md` and `README.md`.
5. Cross-link from `3ddes.com` footer (your other site).

## Optional · GitHub username rename

`Dekryon` → `gregoryuku` would make repo URLs cleaner. GitHub auto-redirects
all old URLs, but the Footer + projects.js links would still want updating
to match. Defer until you've decided.
