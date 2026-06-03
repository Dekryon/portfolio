# Deploy State · pick up here

_Last audited: 2026-06-03_

## ✅ Live

The site **is deployed and live**. The earlier note that the Vercel deploy
"never finished" was wrong — it shipped.

- **Production:** https://portfolio-qualityauto-signatures.vercel.app
- **Repo:** https://github.com/Dekryon/portfolio (public)
- **Vercel team:** "Gregory's projects" (`qualityauto-signatures`), project `portfolio`
- **CI/CD:** GitHub integration is connected. Every push to `main` auto-deploys
  to production; PRs get preview URLs. No manual `vercel` command needed.
- **Build:** clean — 362 KB gzipped JS.

## ✅ Done in the latest audit pass
- Fixed broken social links: `github.com/gregoryuku` → `github.com/Dekryon`
  (the `gregoryuku` GitHub username does not exist).
- Pointed `og:url` / `canonical` / share images at the real production URL
  instead of the not-yet-owned `gregoryuku.com`.
- Wired the contact form for real (Formspree via `VITE_FORMSPREE_ENDPOINT`,
  with a `mailto:` fallback). See "Contact form" below.
- Replaced dead `#` project links: live ones now point at real URLs
  (portfolio repo + live site, qualityautosignatures.com); the rest render
  no dead buttons.

## ⏳ Still to do

### 1. Drop in real assets (`/public/`)
Each is referenced in code and currently falls back to a placeholder. Add the
file, push, and Vercel picks it up automatically.
- `portrait.jpg` (4:5) — see `public/portrait-instructions.md`
- `projects/*.jpg` — see `public/projects/README.md` for filenames
- `resume.pdf` — until added, "Download Résumé" links 404
- `og-image.jpg` (1200×630) — until added, social share previews are blank

### 2. Contact form backend
The form works today by opening the visitor's mail client. To send inline:
1. Create a free form at https://formspree.io → copy the endpoint
   (`https://formspree.io/f/XXXX`).
2. In Vercel → project `portfolio` → Settings → Environment Variables, add
   `VITE_FORMSPREE_ENDPOINT` = that URL.
3. Redeploy. The form then POSTs directly, no mail client needed.

### 3. Verify / set the LinkedIn URL
Links point to `linkedin.com/in/gregoryuku` — confirm that vanity URL is yours
(GitHub had to move to `Dekryon`; LinkedIn may differ).

## Domain decision (optional)

`gregoryuku.com` is **not purchased yet**. The site runs fine on the
`.vercel.app` URL. If you buy it later:
1. Add the domain in Vercel → project `portfolio` → Settings → Domains.
2. Update `og:url` / `canonical` in `index.html` back to `https://gregoryuku.com/`.
3. Update the `portfolio` project's `demo`/`label` in `src/data/projects.js`.

| Domain | Price/yr | Note |
|---|---|---|
| **gregoryuku.com** | $11.25 | recommended |
| gregoryuku.dev | $9.99 | strong alt |
| gregoryuku.me | $12.99 | weaker fit |

## Optional GitHub rename
`Dekryon` → `gregoryuku` (if available) would make repo URLs cleaner. All repo
URLs auto-redirect after a rename — but then revert the link fixes above back
to `gregoryuku`.
