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
Drop screenshots into `public/projects/` using the filenames in `public/projects/README.md`. Until you do, each project renders a tailored CSS mock UI (dashboard / marketing / terminal).

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

The form fakes a successful submit (`Contact.jsx`). Wire it for real with:

### Option A — Formspree
```js
const onSubmit = async (e) => {
  e.preventDefault()
  const res = await fetch('https://formspree.io/f/YOUR_ID', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  })
  if (res.ok) setSent(true)
}
```

### Option B — EmailJS
See https://www.emailjs.com/docs/examples/reactjs/.

### Option C — Netlify Forms
Add `data-netlify="true"` and a `name` attribute to the `<form>`.

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
│       ├── drive-thru.jpg            (you provide)
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
