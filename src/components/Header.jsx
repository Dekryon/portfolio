const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience', hideSm: true },
  { href: '#contact', label: 'Contact' }
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="whitespace-nowrap font-serif text-lg sm:text-xl tracking-tight">
          Gregory Uku
        </a>
        <nav aria-label="Main" className="flex items-center gap-4 sm:gap-7 text-[14px] sm:text-[15px]">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`py-3 text-ink-2 hover:text-accent transition-colors ${l.hideSm ? 'hidden sm:inline' : ''}`}
            >
              {l.label}
            </a>
          ))}
          <a href="/resume.pdf" className="py-3 font-medium text-ink hover:text-accent transition-colors">
            Résumé
          </a>
        </nav>
      </div>
    </header>
  )
}
