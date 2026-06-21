# Gregory Uku — Portfolio (2026)

A cinematic 3D portfolio for **Gregory Uku**, Software Engineering student at Trent University.

Built with React, Vite, Three.js (via React Three Fiber), Lenis smooth scroll, Framer Motion, and Tailwind CSS.

## What makes it different
- **Real WebGL hero** — wireframe icosahedron, drifting particles, horizon grid, bloom + chromatic aberration, scroll-reactive camera, mouse parallax.
- **Editorial typography** — Instrument Serif for display moments (italic accents on key words), Geist + Geist Mono for everything else.
- **Single bold accent** — sunset ember `#FF5B22`. No gradient text, no glass cards.
- **Sticky-scroll project sections** — every project pins in view with its own browser mockup, parallax tilt, and tinted background.
- **CSS-drawn mock UIs** — when no real screenshot is provided, the site auto-renders a hand-coded dashboard / marketing page / terminal that matches the project type.
- **Lenis smooth scroll** + Framer Motion scroll-driven manifesto where words light up as they enter the viewport.
- **Real loader** + grain texture overlay for a film-print feel.
- **Reduced-motion safe** — all motion respects `prefers-reduced-motion`.

---

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

```bash
npm run build
npm run preview
```

---

## Adding your real assets (the part that makes it feel like YOU)

### 1. Portrait
Drop a real 4:5 portrait at `public/portrait.jpg`. See `public/portrait-instructions.md` for prompt + sizing tips. Until you do, a geometric SVG placeholder fills the slot.

### 2. Project screenshots
Capture them automatically (on a machine with internet):

```bash
npx playwright install chromium
npm run screenshots
```

This opens each live project URL and saves it into `public/projects/` at the
right size and filename (see `scripts/capture-screenshots.mjs`). Or drop your
own screenshots in manually using the filenames in `public/projects/README.md`.
Until a file exists, each project renders a tailored CSS mock UI
(dashboard / marketing / terminal).

### 3. Resume
Drop your CV at `public/resume.pdf`. All "Download Resume" buttons pick it up automatically.

### 4. Open Graph image
Drop a 1200×630 share image at `public/og-image.jpg`.

---

## Editing content

All content lives in `src/data/` as plain JS — no JSON gymnastics, no CMS:

| File                          | Edit to change                                                 |
|------------------------------|----------------------------------------------------------------|
| `src/data/projects.js`       | Projects (title, year, role, pitch, mock type, accent, etc.)    |
| `src/data/skills.js`         | Skill groups + per-skill confidence levels                      |
| `src/data/experience.js`     | Timeline entries                                                |
| `src/data/education.js`      | School, program, courses, highlights                            |
| `src/data/philosophy.js`     | Building principles                                             |
| `src/components/NowPlaying.jsx` | "Now" widget content (music, books, what you're coding)      |

### Project schema
```js
{
  id: 'slug',
  title: 'Project Name',
  category: 'AI' | 'Web' | 'Software',
  year: '2026',
  role: 'Solo · Design + Engineering',
  pitch: 'one-line summary',
  problem: 'why this exists',
  solution: 'how you solved it',
  features: ['array', 'of', 'strings'],
  tech: ['React', 'Node'],
  learned: 'what you got out of it',
  status: 'Completed' | 'In Development' | 'Prototype' | 'Concept',
  github: '#',
  demo: '#',
  accent: '#ff5b22',         // any hex — drives the per-project tint
  image: '/projects/foo.jpg', // real screenshot path
  mockType: 'dashboard' | 'marketing' | 'terminal', // fallback CSS UI
  label: 'foo.gregoryuku.com' // shown in the mock browser url bar
}
```

---

## Wiring the contact form

The form (`Contact.jsx`) POSTs to a Vercel Serverless Function at
`api/contact.js`, which emails the submission to `ukugregory@gmail.com` via
[Resend](https://resend.com). If that call fails (backend down or the API key
isn't set yet) it falls back to opening the visitor's mail client, so a message
is never silently lost.

**One-time setup:**
1. Sign up at https://resend.com (free) and create an API key (`re_...`).
2. In Vercel → project `portfolio` → Settings → Environment Variables, add
   `RESEND_API_KEY` = that key. Redeploy.
3. Done — submissions now land directly in the inbox.

With no custom domain, Resend sends from `onboarding@resend.dev` to your own
account email (which is the recipient here), so no domain verification is
needed. Once you own a domain, verify it in Resend and update `FROM_EMAIL` in
`api/contact.js` to send from your own address.

**Local testing:** `RESEND_API_KEY` works with `vercel dev` (the Vite `npm run
dev` server alone won't run the `/api` function — use `vercel dev` to exercise
it locally). Create a `.env.local` with `RESEND_API_KEY=re_...`.

### Inbox priority (Gmail)
Every inquiry uses the subject `🔴 Portfolio inquiry — <name>`. To auto-prioritize:
Gmail → Search `subject:"Portfolio inquiry"` → **Create filter** → check
*Star it*, *Mark as important*, and *Apply label* (e.g. `Portfolio`).

---

## Deployment

### Vercel (recommended for the 3D scene's load speed)
1. Push to GitHub
2. Import at https://vercel.com → auto-detects Vite
3. Deploy

### Netlify
Build command: `npm run build` · Publish: `dist`

### GitHub Pages
```bash
npm install -D gh-pages
```
Add to `package.json`:
```json
"homepage": "https://YOU.github.io/portfolio",
"scripts": { "deploy": "vite build && gh-pages -d dist" }
```
Set `base: '/portfolio/'` in `vite.config.js`. Then `npm run deploy`.

---

## Folder structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── portrait.jpg                  (you provide)
│   ├── portrait-instructions.md
│   ├── og-image.jpg                  (you provide)
│   ├── resume.pdf                    (you provide)
│   └── projects/
│       ├── README.md
│       ├── ordo.jpg                  (you provide)
│       ├── quality-auto.jpg          (you provide)
│       └── ...
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── BackToTop.jsx
│   │   ├── Contact.jsx
│   │   ├── DeviceMockup.jsx
│   │   ├── Education.jsx
│   │   ├── ExperienceTimeline.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Loader.jsx
│   │   ├── Manifesto.jsx
│   │   ├── Navbar.jsx
│   │   ├── NowPlaying.jsx
│   │   ├── Philosophy.jsx
│   │   ├── Portrait.jsx
│   │   ├── Projects.jsx
│   │   ├── Scene.jsx
│   │   ├── Skills.jsx
│   │   ├── SmoothScroll.jsx
│   │   └── TechMarquee.jsx
│   ├── data/
│   │   ├── education.js
│   │   ├── experience.js
│   │   ├── philosophy.js
│   │   ├── projects.js
│   │   └── skills.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## Performance notes
- 3D scene auto-pauses off-screen via R3F's frameloop.
- DPR clamped to 1.6 to keep mid-range laptops smooth.
- Lenis disables itself under `prefers-reduced-motion`.
- All animations under 1 RAF; no scroll listeners outside of Lenis + IntersectionObserver.

## License
Code: yours to fork and remix. Content (projects, bio, etc.): Gregory Uku.
