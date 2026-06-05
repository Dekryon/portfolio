import { motion } from 'framer-motion'
import { PRINCIPLES } from '../data/philosophy.js'

export default function Philosophy() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-heading" className="relative container-x py-24 sm:py-32">
      <div className="flex items-center gap-4 mb-12">
        <span className="marker">08 / Mindset</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <motion.h2
        id="philosophy-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="h-display text-[10vw] sm:text-[6vw] lg:text-[5rem] leading-[1] text-bone max-w-4xl mb-4"
      >
        How I think when I'm <span className="italic">writing software</span>.
      </motion.h2>

      <p className="text-bone-muted text-lg max-w-xl mb-16">
        Frameworks change. These don't.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border-y border-line">
        {PRINCIPLES.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-bg p-8 sm:p-10 hover:bg-bg-soft transition-colors"
            >
              <div className="numeral text-6xl text-ember/30 absolute top-4 right-6 group-hover:text-ember/60 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </div>

              <Icon size={20} className="text-bone-muted mb-6" />

              <h3 className="font-serif text-2xl sm:text-3xl text-bone mb-3 leading-tight">
                {p.title}
              </h3>
              <p className="text-bone-muted leading-relaxed">{p.body}</p>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-ember scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
