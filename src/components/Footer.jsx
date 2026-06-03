import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative container-x pb-12 pt-24 border-t border-line">
      {/* Massive name as art */}
      <div className="mb-16 overflow-hidden">
        <a
          href="#top"
          className="block h-display text-[28vw] sm:text-[24vw] leading-[0.85] text-bone-dim/30 hover:text-bone transition-colors duration-700"
        >
          Gregory<span className="italic blend-glow">.</span>
        </a>
      </div>

      {/* Footer rows */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
        <FooterCol title="Site">
          <a href="#manifesto">Manifesto</a>
          <a href="#about">Identity</a>
          <a href="#projects">Work</a>
          <a href="#skills">Toolset</a>
        </FooterCol>
        <FooterCol title="Direct">
          <a href="mailto:ukugregory@gmail.com">ukugregory@gmail.com</a>
          <a href="https://github.com/Dekryon" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/gregory-uku-8b632724b" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="/resume.pdf" download>Résumé.pdf</a>
        </FooterCol>
        <FooterCol title="Made with">
          <span>React · Vite</span>
          <span>Three.js · R3F</span>
          <span>Lenis · Framer</span>
          <span>Instrument Serif</span>
        </FooterCol>
        <FooterCol title="Colophon">
          <span>Peterborough, ON</span>
          <span>2026</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
            Available
          </span>
        </FooterCol>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-line font-mono text-[10px] uppercase tracking-[0.25em] text-bone-faint">
        <span>© {year} Gregory Uku · All rights reserved.</span>
        <div className="flex items-center gap-3">
          <a
            href="mailto:ukugregory@gmail.com"
            className="hover:text-ember transition-colors"
            aria-label="Email"
          >
            <Mail size={12} />
          </a>
          <a
            href="https://github.com/Dekryon"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ember transition-colors"
            aria-label="GitHub"
          >
            <Github size={12} />
          </a>
          <a
            href="https://www.linkedin.com/in/gregory-uku-8b632724b"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ember transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={12} />
          </a>
          <a
            href="#top"
            className="flex items-center gap-1 hover:text-ember transition-colors"
          >
            <span>To top</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }) {
  const items = Array.isArray(children) ? children : [children]
  return (
    <div>
      <div className="marker mb-4">{title}</div>
      <ul className="space-y-2.5">
        {items.map((c, i) => (
          <li
            key={i}
            className="text-sm text-bone-muted [&>a]:block [&>a:hover]:text-ember [&>a]:transition-colors"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  )
}
