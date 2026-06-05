import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const LINKS = [
  { href: '#manifesto', label: 'Manifesto', n: '01' },
  { href: '#about', label: 'Identity', n: '02' },
  { href: '#projects', label: 'Work', n: '03' },
  { href: '#skills', label: 'Stack', n: '05' },
  { href: '#experience', label: 'Experience', n: '06' },
  { href: '#contact', label: 'Contact', n: '09' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(LINKS[0].href)
  const [hovered, setHovered] = useState(null)

  const navRef = useRef(null)
  const itemRefs = useRef({})
  const [activeRect, setActiveRect] = useState(null)
  const [hoverRect, setHoverRect] = useState(null)

  /* Scroll-shadow on header */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* IntersectionObserver to track current section */
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1))
    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (top) setActive('#' + top.target.id)
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0.1, 0.5, 0.9] }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  /* Measure the active item — drives the liquid blob position */
  useLayoutEffect(() => {
    const measure = () => {
      const navEl = navRef.current
      const target = itemRefs.current[active]
      if (!navEl || !target) return
      const navRect = navEl.getBoundingClientRect()
      const r = target.getBoundingClientRect()
      setActiveRect({
        x: r.left - navRect.left,
        width: r.width
      })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  /* Measure hover — drives the secondary blob that merges with active */
  useLayoutEffect(() => {
    if (!hovered || hovered === active) {
      setHoverRect(null)
      return
    }
    const navEl = navRef.current
    const target = itemRefs.current[hovered]
    if (!navEl || !target) return
    const navRect = navEl.getBoundingClientRect()
    const r = target.getBoundingClientRect()
    setHoverRect({ x: r.left - navRect.left, width: r.width })
  }, [hovered, active])

  const onClickLink = (e, href) => {
    e.preventDefault()
    setActive(href)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* SVG filter that powers the goey liquid merging effect.
          Mounted once, referenced via url(#liquid-nav). */}
      <svg
        className="absolute"
        style={{ width: 0, height: 0, position: 'absolute' }}
        aria-hidden="true"
      >
        <defs>
          <filter id="liquid-nav" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 22 -10
              "
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="container-x flex items-center justify-between gap-4">
          {/* Brand */}
          <a href="#top" className="group flex items-center gap-3 shrink-0">
            <div
              className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-mono text-xs font-semibold text-bg shadow-ember"
              style={{
                background:
                  'linear-gradient(135deg, #ff5b22 0%, #ff8a5b 40%, #60a5fa 100%)'
              }}
            >
              <span className="relative z-10">GU</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm sm:text-base text-bone font-medium tracking-tight">
                Gregory Uku
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-bone-dim">
                portfolio / 2026
              </span>
            </div>
          </a>

          {/* Liquid nav pill — liquid-glass + a moderate bg-black underlay.
              Strong enough that text reads decisively, light enough that the
              active blob's gradient still pops through. */}
          <nav
            ref={navRef}
            onMouseLeave={() => setHovered(null)}
            className="hidden lg:flex relative items-center p-1.5 rounded-full liquid-glass"
            style={{
              background:
                'linear-gradient(135deg, rgba(8, 8, 10, 0.38), rgba(8, 8, 10, 0.20))'
            }}
          >
            {/* Liquid blob layer — applies the goey filter so blobs merge fluidly */}
            <div
              className="absolute inset-1.5 pointer-events-none rounded-full overflow-hidden"
              style={{ filter: 'url(#liquid-nav)' }}
            >
              {/* Active blob — saturated ember→tide gradient with a layered
                  halo. mix-blend-screen guarantees the pill lightens whatever
                  is behind it (the dark backdrop layer) instead of being
                  averaged into it. */}
              {activeRect && (
                <motion.div
                  animate={{ x: activeRect.x, width: activeRect.width }}
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 32,
                    mass: 0.75
                  }}
                  className="absolute top-0 h-full rounded-full"
                  style={{
                    background:
                      'linear-gradient(135deg, #ff8a4f 0%, #ffb088 35%, #d0e4ff 70%, #7eb6ff 100%)',
                    backgroundSize: '180% 100%',
                    boxShadow:
                      '0 0 48px rgba(255,138,91,0.75), 0 0 28px rgba(96,165,250,0.6), inset 0 0 20px rgba(255,255,255,0.35)',
                    mixBlendMode: 'screen'
                  }}
                />
              )}
              {/* Hover blob — appears next to active, the goey filter merges them */}
              <AnimatePresence>
                {hoverRect && (
                  <motion.div
                    key="hover"
                    initial={{ opacity: 0, scale: 0.7, x: hoverRect.x, width: hoverRect.width }}
                    animate={{
                      opacity: 0.85,
                      scale: 1,
                      x: hoverRect.x,
                      width: hoverRect.width
                    }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{
                      type: 'spring',
                      stiffness: 480,
                      damping: 30,
                      mass: 0.6
                    }}
                    className="absolute top-0 h-full rounded-full"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(245,241,232,0.95), rgba(245,241,232,0.6))'
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Clickable links sit on top of the blob layer */}
            {LINKS.map((l) => {
              const isActive = active === l.href
              return (
                <a
                  key={l.href}
                  href={l.href}
                  ref={(el) => {
                    itemRefs.current[l.href] = el
                  }}
                  onClick={(e) => onClickLink(e, l.href)}
                  onMouseEnter={() => setHovered(l.href)}
                  onFocus={() => setHovered(l.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative z-10 px-4 py-2 text-base rounded-full transition-colors duration-300 flex items-center gap-2 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember/80 ${
                    isActive
                      ? 'text-bg font-semibold'
                      : hovered === l.href
                      ? 'text-bg font-medium'
                      : 'text-bone font-medium'
                  }`}
                  style={
                    !isActive && hovered !== l.href
                      ? { textShadow: '0 1px 8px rgba(0,0,0,0.55)' }
                      : undefined
                  }
                >
                  <span
                    className={`font-mono text-xs transition-colors duration-300 ${
                      isActive
                        ? 'text-bg/75'
                        : hovered === l.href
                        ? 'text-bg/75'
                        : 'text-bone-muted'
                    }`}
                  >
                    {l.n}
                  </span>
                  <span className="tracking-tight">{l.label}</span>
                </a>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#contact"
              onClick={(e) => onClickLink(e, '#contact')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-bg font-mono text-xs uppercase tracking-[0.15em] font-semibold hover:-translate-y-0.5 transition-all shadow-ember"
              style={{
                background: 'linear-gradient(135deg, #ff5b22 0%, #ff8a5b 100%)'
              }}
            >
              Hire me <ArrowUpRight size={14} />
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-11 h-11 rounded-full liquid-glass flex items-center justify-center hover:border-ember/40 transition-colors"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu · full-screen liquid */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:hidden fixed inset-0 z-[100]"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at top, rgba(255, 91, 34, 0.18), transparent 60%), radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.16), transparent 60%), #08080a'
              }}
              onClick={() => setOpen(false)}
            />

            <div className="relative h-full flex flex-col">
              <div className="flex items-center justify-between p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
                  Menu / 06
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="w-11 h-11 rounded-full liquid-glass flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center px-8">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => {
                      onClickLink(e, l.href)
                      setOpen(false)
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                    className="group flex items-baseline gap-6 py-5 border-b border-line"
                  >
                    <span className="numeral text-4xl text-ember">{l.n}</span>
                    <span className="font-serif text-5xl text-bone group-hover:italic transition-all">
                      {l.label}
                    </span>
                    <ArrowUpRight
                      size={24}
                      className="ml-auto text-bone-muted group-hover:text-ember transition-colors"
                    />
                  </motion.a>
                ))}
              </div>

              <div className="p-6 marker">
                <span className="text-ember">●</span> available now ·
                ukugregory@gmail.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
