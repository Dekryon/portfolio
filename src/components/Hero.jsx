import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

// Lazy-load Scene.jsx so Three.js + R3F + postprocessing (~80 KB gzip)
// stream in after the foreground typography is parsed. Hero <section> is
// the same size, so the layout doesn't shift — visitors just see the
// vignette gradient over the page bg until the WebGL canvas hydrates.
const Scene = lazy(() => import('./Scene.jsx'))

const ROLES = ['Software Engineer', 'Frontend Developer', 'AI Builder', 'Problem Solver']

export default function Hero() {
  const heroRef = useRef(null)
  const scrollRef = useRef(0)
  const [time, setTime] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const subY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      scrollRef.current = v
    })
    return () => unsub()
  }, [scrollYProgress])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const opts = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Toronto' }
      setTime(now.toLocaleTimeString('en-CA', opts) + ' ET')
    }
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative h-[100svh] min-h-[700px] w-full overflow-hidden"
    >
      {/* 3D scene — streams in after first paint via React.lazy */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Scene scrollRef={scrollRef} />
        </Suspense>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-bg/60 via-transparent to-bg" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-bg/40 via-transparent to-bg/40" />

      {/* Top utility bar · hidden on mobile, navbar handles brand */}
      <motion.div
        style={{ opacity }}
        className="hidden sm:flex absolute top-0 left-0 right-0 z-10 items-center justify-between p-6 sm:p-10 font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim"
      >
        <span>Peterborough · ON · CA</span>
        <span className="hidden sm:inline">{time}</span>
        <span>v.26 · portfolio</span>
      </motion.div>

      {/* Center content */}
      <motion.div
        style={{ y: titleY, opacity }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-6"
        >
          Software engineering · 2026
        </motion.span>

        <h1 className="h-display text-[18vw] sm:text-[14vw] lg:text-[12rem] leading-[0.9]">
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 1.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="block overflow-hidden"
          >
            <span className="block warm-blend">Gregory</span>
          </motion.span>
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 1.75, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="block italic overflow-hidden"
          >
            <span className="block cool-blend">Uku</span>
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="mt-8 max-w-lg text-bone-muted text-base sm:text-lg leading-relaxed pointer-events-auto liquid-glass rounded-2xl px-5 py-3 sm:px-6 sm:py-4"
        >
          A Software Engineering student building real-world{' '}
          <span className="text-bone">software</span>,{' '}
          <span className="text-bone">web apps</span>, and{' '}
          <span className="text-bone">AI-powered tools</span> · from Trent
          University, Ontario.
        </motion.div>
      </motion.div>

      {/* Bottom utility */}
      <motion.div
        style={{ y: subY, opacity }}
        className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-10 flex items-end justify-between gap-6"
      >
        {/* Left: status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-muted space-y-2"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
            <span className="text-bone">Available · Internships · Freelance</span>
          </div>

          {/* Liquid-glass pill — each new role slides in from the right */}
          <div className="hidden sm:inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full liquid-glass overflow-hidden">
            <span className="text-bone-muted shrink-0">Currently</span>
            {/* Decorative role ticker — aria-hidden so assistive tech isn't
                re-interrupted with a new value every 2.4s. */}
            <span
              className="relative overflow-hidden h-[14px] flex items-center"
              style={{ minWidth: '11ch' }}
              aria-hidden="true"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={ROLES[roleIdx]}
                  initial={{ x: 22, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -22, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 480,
                    damping: 32,
                    mass: 0.6
                  }}
                  className="text-bone whitespace-nowrap"
                >
                  {ROLES[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="inline-block w-1.5 h-3 bg-ember animate-pulse shrink-0" />
          </div>
        </motion.div>

        {/* Right: scroll cue */}
        <motion.a
          href="#manifesto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.8 }}
          className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-bone-muted hover:text-bone transition"
        >
          <span>Scroll</span>
          <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
        </motion.a>
      </motion.div>
    </section>
  )
}
