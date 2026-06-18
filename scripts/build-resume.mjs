// Generate Gregory Uku's résumé as a single-page PDF.
//
// Output: public/resume.pdf
//
// Sources of truth (kept in lock-step with the live site):
//   src/data/projects.js     — projects
//   src/data/experience.js   — work
//   src/data/education.js    — Trent program + courses
//
// Re-runnable: `node scripts/build-resume.mjs` (or `npm run resume`).
// HTML + Playwright print → real typography, single-column ATS-friendly.

import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { writeFile } from 'node:fs/promises'

import { PROJECTS } from '../src/data/projects.js'
import { EXPERIENCE } from '../src/data/experience.js'
import { EDUCATION } from '../src/data/education.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PDF = join(__dirname, '..', 'public', 'resume.pdf')

// ── Résumé-specific copy (the parts not in the site data) ───────────────

const NAME = 'Gregory Uku'
const ROLE_LINE_1 = 'Founder & CEO · Ordo'
const ROLE_LINE_2 = 'Software Engineering Student · Trent University'
const OPEN_TO = 'Open to investor intros · partnerships · internships'

const CONTACT = [
  { label: 'ukugregory@gmail.com', href: 'mailto:ukugregory@gmail.com' },
  { label: 'gregoryuku.com', href: 'https://gregoryuku.com' },
  { label: 'github.com/Dekryon', href: 'https://github.com/Dekryon' },
  { label: 'linkedin.com/in/gregory-uku', href: 'https://www.linkedin.com/in/gregory-uku-8b632724b' },
  { label: 'Peterborough, ON', href: null }
]

const SUMMARY =
  'Founder building AI products with real customers. Currently CEO of Ordo (AI phone receptionist · live pilot in Canada) and founder of Signal (AI trading intelligence). Three years of shipping · client websites, multi-agent systems, a portfolio of live URLs. Software Engineering at Trent while building.'

// ── Project copy is sourced from src/data/projects.js but tightened for
// the résumé's tighter width. Title, role label, demo URL, stack, one-line
// pitch. No vendor names. Only public/working URLs.
const RESUME_PROJECTS = [
  {
    id: 'ordo',
    role: 'Founder & CEO',
    period: '2026 · Present',
    pitch:
      'AI phone receptionist that answers every call · books, orders, FAQs, messages · in your brand voice, 24/7. Three vertical doors (restaurants, hotels, medical). $149 per line per month. Live pilot in Canada with 94% of orders handled end to end.',
    tech: 'Next.js · Node · Voice AI · WebSockets · Tailwind'
  },
  {
    id: 'signal',
    role: 'Founder & Engineer',
    period: '2026 · Present',
    pitch:
      'AI trading intelligence. Five specialized agents (Insider, Options, News, Pre-Market, Macro) brief a synthesizer that writes one BUY / SELL / HOLD / AVOID call per ticker with stop loss, take profit, and position size. Paper-traded until win rate is proven.',
    tech: 'Next.js · TypeScript · Postgres · Real-time data feeds'
  },
  {
    id: 'ai-saas-factory',
    role: 'Solo · Design + Engineering',
    period: '2026',
    pitch:
      'Autonomous agent mesh that turns a one-line product brief into a deployable SaaS. Orchestrator fans out to builder, marketing, and security agents in parallel; results land in one review-and-deploy dashboard. Open beta.',
    tech: 'Next.js · TypeScript · Code sandboxes · Postgres'
  },
  {
    id: 'quality-auto',
    role: 'Solo · Design + Build · Client work',
    period: '2025',
    pitch:
      'Trust-first website for a Nigerian vehicle business. Inventory grid, vehicle detail pages, WhatsApp + email contact flow, SEO and Open Graph metadata. Shipped to production.',
    tech: 'HTML · CSS · JavaScript · Netlify'
  }
]

// Cross-reference with PROJECTS so demo URLs stay accurate when the data changes.
const PROJECT_URLS = Object.fromEntries(PROJECTS.map((p) => [p.id, { demo: p.demo, title: p.title, subtitle: p.subtitle, github: p.github }]))

const RESUME_EXPERIENCE = [
  {
    role: 'Founder & CEO',
    org: 'Ordo',
    period: '2026 · Present',
    body: 'Building AI phone receptionist live-piloted in Canada. Designed and shipped the marketing landing (useordo.org), operator portal (app.useordo.org), and voice agent. Same brain, three vertical doors. Carrying product, engineering, and early sales single-handed.'
  },
  {
    role: 'Student Housing · Customer Service',
    org: 'Trent University',
    period: '2024 · Present',
    body: 'Frontline support for residents · owned the response loop on requests, troubleshooting, and escalations. Logged and routed without dropping balls, built rapport during high-stress periods.'
  },
  {
    role: 'Freelance · Laptop Repair & IT Help',
    org: 'Self-employed',
    period: '2022 · Present',
    body: 'Hands-on troubleshooting across Windows, macOS, and Linux. Hardware, software, malware, data recovery, machine migration. Wrote how-to notes so clients could self-serve later.'
  },
  {
    role: 'Choir Director',
    org: 'Community Choir',
    period: '2022 · Present',
    body: 'Lead weekly rehearsals for 15+ members, arrange pieces, assign parts, coordinate live event logistics end-to-end.'
  }
]

const SKILLS = [
  { label: 'Languages', body: 'TypeScript, JavaScript, Python, C#, SQL, HTML, CSS' },
  { label: 'Frontend', body: 'React, Next.js, Tailwind, Framer Motion, Three.js (R3F), Responsive + accessibility' },
  { label: 'Backend / Data', body: 'Node.js, Postgres, REST APIs, WebSockets, real-time pipelines, edge functions' },
  { label: 'AI Engineering', body: 'Multi-agent orchestration, voice AI, prompt + tool design, retrieval, evals' },
  { label: 'Tooling', body: 'Git, GitHub, Vite, Vercel, Netlify, Playwright, VS Code' }
]

// ── HTML template ────────────────────────────────────────────────────────

function escape(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

function projectsHtml() {
  return RESUME_PROJECTS.map((p) => {
    const live = PROJECT_URLS[p.id]
    const demo = live?.demo
    const title = live?.title || p.id
    const subtitle = live?.subtitle
    const demoLabel = demo ? demo.replace(/^https?:\/\//, '').replace(/\/$/, '') : ''
    return `
      <div class="row">
        <div class="row-head">
          <div>
            <div class="row-title">${escape(title)}${subtitle ? ` <span class="row-sub">· ${escape(subtitle)}</span>` : ''}</div>
            <div class="row-meta">${escape(p.role)}</div>
          </div>
          <div class="row-right">
            ${demo ? `<a href="${escape(demo)}">${escape(demoLabel)}</a>` : ''}
            <div class="row-dim">${escape(p.period)}</div>
          </div>
        </div>
        <p class="row-body">${escape(p.pitch)}</p>
        <p class="row-tech">${escape(p.tech)}</p>
      </div>`
  }).join('')
}

function experienceHtml() {
  return RESUME_EXPERIENCE.map((e) => `
    <div class="row tight">
      <div class="row-head">
        <div>
          <div class="row-title">${escape(e.role)} <span class="row-sub">· ${escape(e.org)}</span></div>
        </div>
        <div class="row-right">
          <div class="row-dim">${escape(e.period)}</div>
        </div>
      </div>
      <p class="row-body">${escape(e.body)}</p>
    </div>`).join('')
}

function skillsHtml() {
  return SKILLS.map((s) => `
    <div class="skill-row">
      <div class="skill-label">${escape(s.label)}</div>
      <div class="skill-body">${escape(s.body)}</div>
    </div>`).join('')
}

function educationHtml() {
  return `
    <div class="row tight">
      <div class="row-head">
        <div>
          <div class="row-title">${escape(EDUCATION.school)} <span class="row-sub">· ${escape(EDUCATION.program)}</span></div>
        </div>
        <div class="row-right">
          <div class="row-dim">${escape(EDUCATION.location.split(',').slice(0, 2).join(', '))} · ${escape(EDUCATION.period)}</div>
        </div>
      </div>
      <p class="row-body">Relevant coursework · ${EDUCATION.courses.map((c) => escape(c.name)).join(', ')}.</p>
    </div>`
}

function contactHtml() {
  return CONTACT.map((c) => c.href
    ? `<a href="${escape(c.href)}">${escape(c.label)}</a>`
    : `<span>${escape(c.label)}</span>`
  ).join('<span class="contact-sep">·</span>')
}

const HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escape(NAME)} · Résumé</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" />
  <style>
    @page { size: Letter; margin: 0; }
    :root {
      --ink: #1a1a1f;
      --dim: #5a5a63;
      --muted: #8a8a93;
      --line: #e0dcd2;
      --ember: #ff5b22;
      --serif: 'Instrument Serif', Georgia, serif;
      --sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      font-family: var(--sans);
      color: var(--ink);
      font-size: 9pt;
      line-height: 1.4;
      background: #fff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      width: 8.5in;
      min-height: 11in;
      padding: 0.4in 0.55in 0.28in 0.55in;
    }

    /* Header */
    .header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; }
    .name {
      font-family: var(--serif);
      font-size: 38pt;
      line-height: 0.95;
      letter-spacing: -0.02em;
      margin: 0;
    }
    .name em { font-style: italic; color: var(--ember); }
    .role { font-size: 10pt; color: var(--dim); margin-top: 6px; }
    .role .role-1 { color: var(--ember); font-weight: 600; }
    .role .sep { color: var(--muted); margin: 0 6px; }
    .open-to { font-size: 8.5pt; color: var(--muted); font-style: italic; margin-top: 4px; }

    .contact {
      text-align: right;
      font-size: 8.5pt;
      color: var(--dim);
      max-width: 3.4in;
      line-height: 1.7;
    }
    .contact a { color: var(--dim); text-decoration: none; border-bottom: 1px solid transparent; }
    .contact a:hover { border-bottom-color: var(--ember); }
    .contact .contact-sep { margin: 0 6px; color: var(--muted); }

    .accent-rule {
      height: 2px;
      background: var(--ember);
      margin: 10px 0 10px 0;
      width: 100%;
    }

    /* Summary */
    .summary {
      font-size: 9.5pt;
      line-height: 1.45;
      color: var(--ink);
      margin: 0 0 2px 0;
      max-width: 7.2in;
    }

    /* Sections */
    .section { margin-top: 9px; }
    .section-head {
      display: flex; align-items: baseline; gap: 12px;
      margin-bottom: 5px;
    }
    .section-head .label {
      font-family: var(--sans);
      font-size: 8.5pt;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--ember);
      font-weight: 600;
    }
    .section-head .rule { flex: 1; height: 1px; background: var(--line); }

    .row { margin-bottom: 6px; }
    .row.tight { margin-bottom: 4px; }
    .row:last-child { margin-bottom: 0; }
    .row-head {
      display: flex; justify-content: space-between; align-items: baseline;
      gap: 16px;
    }
    .row-title {
      font-weight: 600;
      font-size: 10.5pt;
      color: var(--ink);
    }
    .row-title .row-sub {
      font-weight: 400;
      font-style: italic;
      color: var(--dim);
      font-family: var(--serif);
      font-size: 11pt;
    }
    .row-meta { font-size: 8.5pt; color: var(--dim); margin-top: 1px; }
    .row-right { text-align: right; }
    .row-right a {
      color: var(--ember);
      text-decoration: none;
      font-size: 8.5pt;
      font-weight: 500;
    }
    .row-dim { font-size: 8pt; color: var(--muted); margin-top: 1px; letter-spacing: 0.03em; }
    .row-body {
      font-size: 9pt;
      color: var(--ink);
      margin: 2px 0 1px 0;
      max-width: 7.2in;
      line-height: 1.4;
    }
    .row-tech {
      font-size: 8pt;
      color: var(--dim);
      font-style: italic;
      margin: 0;
      max-width: 7.2in;
    }

    /* Skills */
    .skill-row {
      display: grid;
      grid-template-columns: 1.1in 1fr;
      gap: 8px;
      padding: 2px 0;
      align-items: baseline;
    }
    .skill-label {
      font-size: 8pt;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--ember);
      font-weight: 600;
    }
    .skill-body { font-size: 9.5pt; color: var(--ink); }

    /* Footer */
    .footer {
      margin-top: 10px;
      padding-top: 5px;
      border-top: 1px solid var(--line);
      display: flex; justify-content: space-between;
      font-size: 7.5pt;
      color: var(--muted);
      letter-spacing: 0.08em;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div>
        <h1 class="name">Gregory <em>Uku</em></h1>
        <div class="role">
          <span class="role-1">${escape(ROLE_LINE_1)}</span>
          <span class="sep">·</span>
          <span>${escape(ROLE_LINE_2)}</span>
        </div>
        <div class="open-to">${escape(OPEN_TO)}</div>
      </div>
      <div class="contact">${contactHtml()}</div>
    </div>

    <div class="accent-rule"></div>

    <p class="summary">${escape(SUMMARY)}</p>

    <section class="section">
      <div class="section-head"><span class="label">Selected Work</span><span class="rule"></span></div>
      ${projectsHtml()}
    </section>

    <section class="section">
      <div class="section-head"><span class="label">Experience</span><span class="rule"></span></div>
      ${experienceHtml()}
    </section>

    <section class="section">
      <div class="section-head"><span class="label">Skills</span><span class="rule"></span></div>
      ${skillsHtml()}
    </section>

    <section class="section">
      <div class="section-head"><span class="label">Education</span><span class="rule"></span></div>
      ${educationHtml()}
    </section>
  </div>
</body>
</html>
`

async function main() {
  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport: { width: 816, height: 1056 } })
  const page = await context.newPage()
  await page.setContent(HTML, { waitUntil: 'networkidle' })
  await page.emulateMedia({ media: 'print' })
  await page.pdf({
    path: OUT_PDF,
    width: '8.5in',
    height: '11in',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    printBackground: true,
    preferCSSPageSize: true
  })
  await browser.close()
  // Echo the rendered HTML alongside in case we want to host it too.
  const htmlOut = OUT_PDF.replace(/\.pdf$/, '.html')
  await writeFile(htmlOut, HTML, 'utf-8')
  console.log(`saved public/resume.pdf and public/resume.html`)
}

main().catch((err) => { console.error(err); process.exit(1) })
