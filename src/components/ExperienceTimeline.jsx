import { motion } from 'framer-motion'
import { EXPERIENCE } from '../data/experience.js'

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative container-x py-24 sm:py-32">
      <div className="flex items-center gap-4 mb-12">
        <span className="marker">06 / Experience</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="h-display text-[10vw] sm:text-[6vw] lg:text-[5rem] leading-[1] text-bone max-w-5xl mb-16"
      >
        Where I've <span className="italic">shown up</span> and shipped.
      </motion.h2>

      <div className="grid grid-cols-12 gap-4 sm:gap-8">
        <div className="hidden sm:block col-span-1 marker">Year</div>
        <div className="hidden sm:block col-span-4 marker">Role</div>
        <div className="hidden sm:block col-span-7 marker">What I did</div>
      </div>

      <div className="mt-6 border-t border-line">
        {EXPERIENCE.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group grid grid-cols-12 gap-4 sm:gap-8 py-8 border-b border-line hover:bg-bg-soft/40 transition-colors -mx-4 px-4 sm:-mx-6 sm:px-6"
          >
            <div className="col-span-12 sm:col-span-1 marker text-bone">{e.period}</div>

            <div className="col-span-12 sm:col-span-4">
              <div className="font-serif text-2xl sm:text-3xl text-bone leading-tight">
                {e.role.split(' · ')[0]}
              </div>
              <div className="text-sm text-bone-muted mt-1">{e.org}</div>
              <div className="mt-3">
                <span className="chip">{e.tag}</span>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-7 space-y-3">
              <p className="text-bone-muted leading-relaxed">{e.summary}</p>
              <ul className="space-y-1.5 mt-2">
                {e.wins.map((w, k) => (
                  <li key={k} className="flex gap-3 text-sm text-bone-muted">
                    <span className="text-ember mt-1 shrink-0">→</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
