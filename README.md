# Gregory Uku · Portfolio

gregoryuku.com. React, Vite and Tailwind 3, no animation or 3D libraries.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
```

## Where things are

- `src/data/projects.js` · the four projects. Edit copy here.
- `src/data/experience.js`, `skills.js` · the Experience and Stack sections.
- `scripts/capture-screenshots.mjs` · `npm run screenshots` re-shoots the live sites into `public/projects/` (uses installed Chrome).
- `api/contact.js` · Vercel function behind the contact form (needs `RESEND_API_KEY`).
- `scripts/build-resume.mjs` · `npm run resume` rebuilds `public/resume.pdf`.

## Design

Warm paper background, one accent (`#b53a08`), Source Serif 4 for display, Schibsted Grotesk for text, IBM Plex Mono for labels. Tokens live in `tailwind.config.js`. Motion is limited to hover colour changes, and `prefers-reduced-motion` is respected.
