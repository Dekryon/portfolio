"""Generate Gregory Uku's résumé as a single-page PDF.

Output: public/resume.pdf

Sources of truth (so the résumé stays honest about what's on the site):
  src/data/projects.js     — projects
  src/data/skills.js       — skills
  src/data/experience.js   — work
  src/data/education.js    — Trent program + courses

Re-runnable: edit the data files, run `python scripts/build-resume.py`, commit.

Design: ATS-friendly text PDF, single column, Helvetica family, ember accent
on the name + section headers so it matches the portfolio's brand without
sacrificing parseability.
"""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "resume.pdf"

EMBER = HexColor("#ff5b22")
BONE = HexColor("#1a1a1f")
DIM = HexColor("#5a5a63")
LINE = HexColor("#d8d4cb")
TIDE = HexColor("#1d4ed8")

PAGE_W, PAGE_H = LETTER
MARGIN_X = 50
MARGIN_T = 50


def main() -> None:
    c = canvas.Canvas(str(OUT), pagesize=LETTER)
    c.setTitle("Gregory Uku — Résumé")
    c.setAuthor("Gregory Uku")
    c.setSubject("Software Engineering · Resume 2026")
    c.setCreator("portfolio/scripts/build-resume.py")

    y = PAGE_H - MARGIN_T

    # ── Header ──────────────────────────────────────────────────────────
    c.setFillColor(BONE)
    c.setFont("Helvetica-Bold", 28)
    c.drawString(MARGIN_X, y, "Gregory Uku")

    y -= 16
    c.setFont("Helvetica", 11)
    c.setFillColor(EMBER)
    c.drawString(MARGIN_X, y, "Software Engineering student · Builder")
    c.setFillColor(DIM)
    c.setFont("Helvetica-Oblique", 10)
    open_x = MARGIN_X + c.stringWidth(
        "Software Engineering student · Builder  ", "Helvetica", 11
    )
    c.drawString(open_x, y, "· Open to internships, freelance, collaboration")

    y -= 14
    c.setFont("Helvetica", 10)
    c.setFillColor(DIM)
    contact = (
        "ukugregory@gmail.com  ·  github.com/Dekryon  ·  "
        "linkedin.com/in/gregory-uku-8b632724b  ·  Peterborough, ON"
    )
    c.drawString(MARGIN_X, y, contact)

    y -= 10
    c.setStrokeColor(EMBER)
    c.setLineWidth(1.2)
    c.line(MARGIN_X, y, PAGE_W - MARGIN_X, y)

    # ── Summary ─────────────────────────────────────────────────────────
    y -= 20
    c.setFillColor(BONE)
    c.setFont("Helvetica", 10)
    summary = (
        "I design and ship real-world software, web apps, and AI-powered tools. "
        "Comfortable across the stack — React + Tailwind on the front, Node + "
        "TypeScript + Anthropic / OpenAI APIs on the back, Supabase / Vercel for "
        "data and deploy. Multiple shipped products: ai-saas-factory, ordo-portal "
        "(AI drive-thru), Quality Auto Signatures, and this portfolio. I learn "
        "fast and ship what I learn."
    )
    y = wrap_text(c, summary, MARGIN_X, y, PAGE_W - 2 * MARGIN_X, 11, "Helvetica", 10)

    # ── Education ───────────────────────────────────────────────────────
    y = section_header(c, "Education", y)
    c.setFillColor(BONE)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(MARGIN_X, y, "Trent University")
    c.setFont("Helvetica", 10)
    c.setFillColor(DIM)
    c.drawRightString(PAGE_W - MARGIN_X, y, "Peterborough, ON · 2023 — Present")
    y -= 13
    c.setFillColor(BONE)
    c.setFont("Helvetica-Oblique", 10)
    c.drawString(MARGIN_X, y, "B.Sc. · Computer Science / Software Engineering")
    y -= 14
    c.setFillColor(DIM)
    c.setFont("Helvetica", 9)
    courses = (
        "Relevant coursework · Data Management Systems, Software Design & Analysis, "
        "Computer Architecture, Web Development, Linear Algebra, Statistics."
    )
    y = wrap_text(c, courses, MARGIN_X, y, PAGE_W - 2 * MARGIN_X, 10, "Helvetica", 9)

    # ── Projects ────────────────────────────────────────────────────────
    y = section_header(c, "Selected Projects", y)
    projects = [
        (
            "AI SaaS Factory",
            "github.com/Dekryon/ai-saas-factory · ai-saas-factory-ten.vercel.app",
            "Next.js · TypeScript · Anthropic API · E2B · Supabase · Replicate",
            "Autonomous AI agent mesh that turns one-sentence ideas into a shipped "
            "SaaS — orchestrator fans out to builder, marketing, and security "
            "agents in parallel; results land in a single review-and-deploy dashboard.",
        ),
        (
            "Ordo · AI Drive-Thru",
            "github.com/Dekryon/drive-thru-ai · ordo-portal-liart.vercel.app",
            "React · Node.js · OpenAI API · Deepgram · WebSockets · Tailwind",
            "Voice-first drive-thru assistant: speech-to-intent pipeline with "
            "confidence-aware confirmation flow, operator override dashboard, and "
            "per-location menu config. Live pilot in Canada.",
        ),
        (
            "Quality Auto Signatures",
            "qualityautosignatures.com",
            "HTML · CSS · JavaScript · Netlify",
            "Trust-first website for a Nigerian vehicle business — inventory grid, "
            "vehicle detail pages, WhatsApp + email contact flow, mobile-first "
            "layout, SEO and OG metadata. Shipped and in production.",
        ),
        (
            "This Portfolio",
            "github.com/Dekryon/portfolio",
            "React · Vite · Three.js (R3F) · Lenis · Framer Motion · Tailwind",
            "Cinematic dev portfolio: real WebGL hero (wireframe sphere, ember orbit, "
            "bloom + chromatic aberration), Lenis smooth scroll, sticky-scroll project "
            "sections, Instrument Serif display type. WCAG 2.1 AA pass.",
        ),
    ]
    for title, link, stack, body in projects:
        y = project_block(c, title, link, stack, body, y)
        if y < 200:
            break

    # ── Experience ──────────────────────────────────────────────────────
    y = section_header(c, "Experience", y)
    experiences = [
        (
            "Student Housing · Customer Service",
            "Trent University · 2024 — Present",
            "Frontline support for residents — owning the response loop on requests, "
            "troubleshooting, and escalations. Logged + routed without dropping balls.",
        ),
        (
            "Freelance · Laptop Repair & IT Help",
            "Self-employed · 2022 — Present",
            "Hands-on troubleshooting across Windows, macOS, and Linux. Hardware, "
            "software, malware, data recovery, machine migration. Wrote how-to notes "
            "so clients could self-serve later.",
        ),
        (
            "Choir Director",
            "Community Choir · 2022 — Present",
            "Lead weekly rehearsals for 15+ members, arrange pieces, assign parts, "
            "coordinate live event logistics end-to-end.",
        ),
        (
            "Sales Associate",
            "Retail · 2023 — 2024",
            "Customer-facing sales. Listened fast, asked the right questions, hit "
            "consistent targets through honest recommendations.",
        ),
    ]
    for title, where, body in experiences:
        y = experience_block(c, title, where, body, y)
        if y < 130:
            break

    # ── Skills ──────────────────────────────────────────────────────────
    y = section_header(c, "Skills", y)
    skills_lines = [
        ("Languages", "HTML, CSS, JavaScript, C#, TypeScript, Python, SQL"),
        ("Frontend", "React, Tailwind CSS, Framer Motion, Responsive design, UI design"),
        ("Backend / data", "Node.js, Supabase, REST APIs, JSON, Fetch / Axios"),
        ("AI tooling", "Anthropic SDK, OpenAI API, E2B, Replicate, AI-assisted dev"),
        ("Tools", "Git, GitHub, Vite, Netlify, Vercel, VS Code"),
    ]
    for label, body in skills_lines:
        c.setFillColor(EMBER)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(MARGIN_X, y, label.upper())
        c.setFillColor(BONE)
        c.setFont("Helvetica", 9)
        c.drawString(MARGIN_X + 90, y, body)
        y -= 11

    # ── Footer line ─────────────────────────────────────────────────────
    c.setStrokeColor(LINE)
    c.setLineWidth(0.4)
    c.line(MARGIN_X, 42, PAGE_W - MARGIN_X, 42)
    c.setFillColor(DIM)
    c.setFont("Helvetica", 8)
    c.drawString(MARGIN_X, 32, "Generated from portfolio/src/data — re-run scripts/build-resume.py to refresh")
    c.drawRightString(PAGE_W - MARGIN_X, 32, "Gregory Uku · 2026")

    c.save()
    size_kb = OUT.stat().st_size // 1024
    print(f"saved {OUT.relative_to(ROOT)} ({size_kb} KB)")


def section_header(c: canvas.Canvas, label: str, y: float) -> float:
    y -= 18
    c.setFillColor(EMBER)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(MARGIN_X, y, label.upper())
    text_width = c.stringWidth(label.upper(), "Helvetica-Bold", 10)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.line(MARGIN_X + text_width + 8, y + 3, PAGE_W - MARGIN_X, y + 3)
    return y - 13


def project_block(
    c: canvas.Canvas, title: str, link: str, stack: str, body: str, y: float
) -> float:
    c.setFillColor(BONE)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(MARGIN_X, y, title)
    c.setFont("Helvetica", 9)
    c.setFillColor(TIDE)
    c.drawRightString(PAGE_W - MARGIN_X, y, link)
    y -= 12
    c.setFillColor(DIM)
    c.setFont("Helvetica-Oblique", 9)
    c.drawString(MARGIN_X, y, stack)
    y -= 12
    c.setFillColor(BONE)
    y = wrap_text(c, body, MARGIN_X, y, PAGE_W - 2 * MARGIN_X, 10, "Helvetica", 9)
    return y - 5


def experience_block(
    c: canvas.Canvas, title: str, where: str, body: str, y: float
) -> float:
    c.setFillColor(BONE)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(MARGIN_X, y, title)
    c.setFont("Helvetica", 9)
    c.setFillColor(DIM)
    c.drawRightString(PAGE_W - MARGIN_X, y, where)
    y -= 12
    c.setFillColor(BONE)
    y = wrap_text(c, body, MARGIN_X, y, PAGE_W - 2 * MARGIN_X, 10, "Helvetica", 9)
    return y - 4


def wrap_text(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    max_width: float,
    line_height: float,
    font: str,
    size: int,
) -> float:
    c.setFont(font, size)
    words = text.split()
    line = ""
    for word in words:
        candidate = (line + " " + word).strip()
        if c.stringWidth(candidate, font, size) > max_width:
            c.drawString(x, y, line)
            y -= line_height
            line = word
        else:
            line = candidate
    if line:
        c.drawString(x, y, line)
        y -= line_height
    return y


if __name__ == "__main__":
    main()
