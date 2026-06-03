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
- Wired the contact form for real: a Vercel Serverless Function (`api/contact.js`)
  emails submissions via Resend, with a `mailto:` fallback. See "Contact form" below.
- Updated LinkedIn links to the real profile (`/in/gregory-uku-8b632724b`).
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

### 2. Contact form backend (Resend API key)
The form POSTs to `api/contact.js` (Vercel Function) → Resend → your inbox, and
falls back to the visitor's mail client if the key is missing. To activate
inline sending:
1. Sign up at https://resend.com (free) → create an API key (`re_...`).
2. In Vercel → project `portfolio` → Settings → Environment Variables, add
   `RESEND_API_KEY` = that key.
3. Redeploy. Submissions then land directly in `ukugregory@gmail.com`.

Subject line is `🔴 Portfolio inquiry — <name>`. Gmail filter to prioritize:
search `subject:"Portfolio inquiry"` → Create filter → Star + Mark important + Label.

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
