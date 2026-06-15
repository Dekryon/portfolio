# Deploy State · pick up here

_Last audited: 2026-06-15_

## ✅ Live

- **Production:** https://gregoryuku.com  (apex primary; `www.gregoryuku.com` → 308 → apex)
- **Vercel preview URL:** https://portfolio-one-gamma-71.vercel.app (still works)
- **Repo:** https://github.com/Dekryon/portfolio (public)
- **Vercel project:** `portfolio` in team `qualityauto-signatures`
- **Registrar:** Namecheap. DNS still on Namecheap BasicDNS · A `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com.` Vercel nudges to switch to `216.198.79.1` / `80cb06b8d6fed39b.vercel-dns-017.com.` eventually · old records still work.
- **Deployment Protection:** Disabled (was the 401 auth wall).
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
- **Real screenshots in place for all 5 shipping cards**: `ordo.jpg`
  (useordo.org marketing landing · "Every call, answered."), `signal.jpg`
  (signal-tracker-roan.vercel.app · 5-agent dashboard), `ai-saas-factory.jpg`,
  `quality-auto.jpg`, `portfolio.jpg`. The 6th card (Gradesys) is `phase:
  coming-soon` and renders the blueprint spec card · no fake screenshot.
- **2026-06-15 redesign · investor-grade pass:** dropped 4 weak cards
  (Web Coursework, Small Business Landing, Student Grades Manager C# console,
  CS Study Companion placeholder). Added 2 real ones (Signal, Gradesys SaaS).
  Re-framed Ordo to receptionist + useordo.org. Hero / About / Skills /
  Manifesto rewritten to drop "student-first" framing.
- **Portrait + grain texture wired:** `public/portrait.jpg` (1200x1500,
  4:5, sunset street shot) drives the About section; `public/grain.jpg`
  (256x256 photographed tile texture) drives the body-wide film-grain
  overlay and the Portrait frame's noise blend.
- **Capture script** (`npm run screenshots`) covers 4 live URLs.
- **Latest commit:** `0adfefe` — section aria-labelledby pass.

## ⏳ Still to do · in priority order

### 1. Wire `RESEND_API_KEY` in Vercel
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

### 2. Re-shoot screenshots
Now that prod is public on `gregoryuku.com`, run from this folder:
```bash
npm run screenshots
git add public/projects && git commit -m "Add portfolio screenshot" && git push
```

### 3. Drop the user-supplied assets in `/public/`
Each is referenced in code; missing files fall back to placeholders.
- `og-image.jpg` (1200×630) — until added, social shares have no preview
- `resume.pdf` — currently generated from `src/data` via `cf18d49`; replace with a real PDF when ready

The drive-thru card has no public deployment yet — the CSS dashboard mock
keeps rendering automatically until a real demo exists.

### 4. Cross-link from `3ddes.com` footer
Add a small "Also: gregoryuku.com" link to the 3ddes-website footer so the two sites point at each other.

## Optional · GitHub username rename

`Dekryon` → `gregoryuku` would make repo URLs cleaner. GitHub auto-redirects
all old URLs, but the Footer + projects.js links would still want updating
to match. Defer until you've decided.
