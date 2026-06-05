import { motion } from 'framer-motion'
import Portrait from './Portrait.jsx'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative container-x py-24 sm:py-32">
      <div className="flex items-center gap-4 mb-16">
        <span className="marker">02 / Identity</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Portrait · sticky on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 lg:sticky lg:top-28"
        >
          <Portrait />

          <div className="mt-6 grid grid-cols-2 gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
            <div>
              <div className="text-bone">Gregory Uku</div>
              <div>Software Engineer</div>
              <div>In training</div>
            </div>
            <div className="text-right">
              <div>Trent University</div>
              <div>Peterborough, ON</div>
              <div>2023 · Present</div>
            </div>
          </div>
        </motion.div>

        {/* Story */}
        <div className="lg:col-span-7">
          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-display text-[10vw] sm:text-[7vw] lg:text-[5rem] leading-[1] text-bone mb-12"
          >
            Builder<span className="italic blend-glow">,</span><br />
            in <span className="italic tide-glow">training</span>.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 text-bone-muted text-lg leading-[1.7] max-w-2xl"
          >
            <p>
              <span className="float-left text-5xl leading-[0.85] font-serif text-ember mr-2 mt-1.5">
                I
              </span>
              'm a Software Engineering student at Trent University, building
              practical software, web apps, and AI-powered tools. Nigerian roots,
              Ontario base, an unreasonable enthusiasm for shipping things.
            </p>
            <p>
              I work across the stack · semantic HTML and accessible UI on the
              front, real backend logic and APIs underneath. I care about{' '}
              <span className="text-bone">clean design</span>,{' '}
              <span className="text-bone">secure code</span>, and{' '}
              <span className="text-bone">real-world usefulness</span> more than
              any specific framework.
            </p>
            <p>
              I'm still growing. I grow by shipping. Every project here is
              something I designed, built, and pushed past "almost done." When
              I'm not writing code, I'm running a choir, producing music in
              Ableton, or breaking down a basketball play.
            </p>
          </motion.div>

          {/* Quick facts row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border-y border-line"
          >
            {[
              { k: 'BUILDS', v: '8+', s: 'shipped or in-flight' },
              { k: 'YEARS', v: '2+', s: 'building software' },
              { k: 'STACK', v: '6+', s: 'languages & tools' },
              { k: 'STATUS', v: '01', s: 'available now' }
            ].map((f, i) => (
              <div key={i} className="bg-bg p-5">
                <div className="marker mb-2">{f.k}</div>
                <div className="numeral text-4xl text-bone mb-1">{f.v}</div>
                <div className="text-xs text-bone-dim">{f.s}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
