import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SKILL_GROUPS } from '../data/skills.js'
import CodePlayer from './CodePlayer.jsx'

// LanguageScene pulls in @react-three/fiber + drei. If it's imported
// eagerly, all of Three.js lands in the main bundle — the audit caught
// this defeating the Hero's own lazy-load. Split it into its own chunk
// and gate the Canvas mount on visibility so the GL context never spins
// up for visitors who don't scroll this far.
const LanguageScene = lazy(() => import('./LanguageScene.jsx'))

function VisibleLanguageScene() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible || !ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin: '400px 0px' }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [visible])

  return (
    <div ref={ref} className="min-h-[640px] sm:min-h-[680px]">
      {visible && (
        <Suspense
          fallback={
            <div className="h-[640px] sm:h-[680px] rounded-3xl liquid-glass" />
          }
        >
          <LanguageScene />
        </Suspense>
      )}
    </div>
  )
}

const LEVEL_DOTS = { Strong: 3, Comfortable: 2, Learning: 1 }
const LEVEL_COLOR = {
  Strong: 'bg-ember',
  Comfortable: 'bg-tide-soft',
  Learning: 'bg-bone-dim'
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative container-x py-24 sm:py-32">
      <div className="flex items-center gap-4 mb-12">
        <span className="marker">05 / Toolset</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <motion.h2
        id="skills-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="h-display text-[10vw] sm:text-[6vw] lg:text-[5rem] leading-[1] text-bone max-w-4xl mb-4"
      >
        What I reach for, <span className="italic blend-glow">honestly</span>.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-bone-muted text-lg max-w-2xl mb-14"
      >
        I'm a student · not pretending otherwise. Most of these are
        <span className="text-tide-soft"> comfortable</span> or
        <span className="text-bone-dim"> still learning</span>, with a few I
        actually reach for on instinct.
      </motion.p>

      {/* 3D languages orb · the centerpiece */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <VisibleLanguageScene />
      </motion.div>

      {/* Smooth code slideshow */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16"
      >
        <div className="lg:col-span-5">
          <div className="marker mb-3">Code, in motion</div>
          <h3 className="h-display text-3xl sm:text-4xl text-bone leading-tight mb-4">
            A glimpse of what I write, <span className="italic ember-glow">live</span>.
          </h3>
          <p className="text-bone-muted leading-relaxed">
            Three real snippets from real projects · typed in, paused,
            crossfaded. Same pattern across React, TypeScript, and C#: read
            the world, decide, act with care.
          </p>
        </div>
        <div className="lg:col-span-7">
          <CodePlayer />
        </div>
      </motion.div>

      {/* The full ladder */}
      <div className="mb-6">
        <div className="marker mb-2">Confidence ladder</div>
        <h3 className="h-display text-3xl sm:text-4xl text-bone leading-tight">
          The <span className="italic tide-glow">honest</span> breakdown.
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-line border-y border-line">
        {SKILL_GROUPS.map((g, i) => {
          const Icon = g.icon
          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="bg-bg p-8 sm:p-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-9 h-9 border border-line-strong flex items-center justify-center">
                  <Icon size={14} className="text-bone-muted" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl text-bone">{g.label}</div>
                <span className="marker ml-auto">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="space-y-2">
                {g.skills.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between gap-4 py-2.5 border-b border-line-strong/30 last:border-0"
                  >
                    <span className="text-bone text-sm sm:text-base">{s.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="marker">{s.level}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((n) => (
                          <span
                            key={n}
                            className={`w-1.5 h-1.5 rounded-full ${
                              n <= LEVEL_DOTS[s.level]
                                ? LEVEL_COLOR[s.level]
                                : 'bg-line-strong'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
