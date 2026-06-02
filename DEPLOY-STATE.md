# Deploy State · pick up here

## ✅ Done
- Code finished (v3.3)
- Git initialized on `main`
- Initial commit pushed to **https://github.com/Dekryon/portfolio** (public)
- Build verified: 362 KB gzipped JS, no errors
- Vercel team identified: "Gregory's projects" (slug `qualityauto-signatures`)
- Domain prices checked

## ⏳ Stopped here · Vercel deploy not finished

API errored mid-flight. Three ways to resume:

### Easiest · Vercel CLI from this folder
```bash
cd "C:\Claude code\portfolio"
vercel login                                       # if needed
vercel link --yes --scope qualityauto-signatures   # link to team
vercel --prod                                       # ship
```

### Cleanest long-term · GitHub integration via dashboard
1. Open https://vercel.com/new
2. Import `Dekryon/portfolio`
3. Click Deploy (auto-detects Vite, no config)
4. Future `git push` to main auto-deploys; PRs get preview URLs

### Try MCP again
Use the Vercel MCP `deploy_to_vercel` tool if available.

---

## Domain decision needed

Recommendation: keep `3ddes.com` as the poems site (already established artist brand). Get a separate `.com` for the dev portfolio.

| Domain | Price/yr | Pick? |
|---|---|---|
| **gregoryuku.com** | $11.25 | ✅ recommended |
| gregoryuku.dev | $9.99 | strong alt |
| gregoryuku.io | $37.99 | too expensive |
| gregoryuku.me | $12.99 | weaker fit |

Cross-link the two sites' footers when both are live.

---

## Still to drop into `/public/`
- `portrait.jpg` (4:5)
- `projects/*.jpg` (see `public/projects/README.md` for filenames)
- `resume.pdf`
- `og-image.jpg` (1200×630)

Each one Vercel will pick up automatically on next push.

---

## Optional GitHub rename
`gregoryuku` username is available. Settings → change `Dekryon` → `gregoryuku`. All repo URLs auto-redirect. Cleaner for portfolio links.
