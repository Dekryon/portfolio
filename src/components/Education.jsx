import { motion } from 'framer-motion'
import { EDUCATION } from '../data/education.js'

export default function Education() {
  return (
    <section id="education" className="relative container-x py-24 sm:py-32">
      <div className="flex items-center gap-4 mb-12">
        <span className="marker">07 / Education</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left: school overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <h2 className="h-display text-[10vw] sm:text-[6vw] lg:text-[5rem] leading-[1] text-bone mb-8">
            {EDUCATION.school}<span className="italic ember-glow">.</span>
          </h2>

          <div className="flex flex-wrap items-center gap-3 mb-8 marker">
            <span className="text-bone">{EDUCATION.program}</span>
            <span>·</span>
            <span>{EDUCATION.period}</span>
            <span>·</span>
            <span>{EDUCATION.location}</span>
          </div>

          <p className="text-bone-muted text-lg leading-relaxed max-w-2xl mb-10">
            {EDUCATION.blurb}
          </p>

          <div className="space-y-3">
            <div className="marker mb-3">Highlights</div>
            {EDUCATION.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex gap-4 items-baseline"
              >
                <span className="numeral text-2xl text-ember w-8 shrink-0">
                  0{i + 1}
                </span>
                <span className="text-bone leading-relaxed">{h}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: coursework */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="marker mb-4">Relevant coursework</div>
          <div className="border-t border-line">
            {EDUCATION.courses.map((c, i) => (
              <motion.div
                key={c.code}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group flex items-baseline gap-4 py-3.5 border-b border-line hover:bg-bg-soft/40 -mx-2 px-2 transition-colors"
              >
                <span className="font-mono text-[11px] text-bone-dim w-20 shrink-0 group-hover:text-ember transition-colors">
                  {c.code}
                </span>
                <span className="text-bone group-hover:translate-x-1 transition-transform">
                  {c.name}
                </span>
                <span className="ml-auto font-mono text-[10px] text-bone-faint opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
