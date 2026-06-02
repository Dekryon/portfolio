import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const WORDS = [
  ['I', 'design'], ['and'], ['ship'],
  ['software'], ['that'], ['actually'], ['gets'], ['used'],
  ['·'], ['web'], ['apps,'],
  ['AI'], ['tools,'], ['real'], ['products,'],
  ['from'], ['a'], ['student'], ['desk'], ['in'], ['Ontario.']
]

export default function Manifesto() {
  const containerRef = useRef(null)

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('span[data-word]')
    if (!els) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-on')
          }
        })
      },
      { threshold: 0.5 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="manifesto" className="relative container-x py-32 sm:py-40">
      <div className="flex items-center gap-4 mb-12">
        <span className="marker">01 / Manifesto</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <h2
        ref={containerRef}
        className="h-display text-[8vw] sm:text-[6vw] lg:text-[5.5rem] leading-[1.05] text-bone-dim max-w-6xl"
      >
        {WORDS.flat().map((w, i) => (
          <span
            key={i}
            data-word
            className="word inline-block transition-colors duration-500 mr-3"
          >
            {w}
          </span>
        ))}
      </h2>

      <style>{`
        .word { color: rgba(245, 241, 232, 0.18); }
        .word.is-on { color: #f5f1e8; }
      `}</style>

      <div className="mt-20 grid sm:grid-cols-3 gap-8">
        {[
          { k: '01', v: 'Be honest', d: "Don't fake senior. Ship at a student's altitude · but ship well." },
          { k: '02', v: 'Be useful', d: 'Real users beat clever ideas. Solve something, then refine.' },
          { k: '03', v: 'Be relentless', d: 'Boring 80% is the work. The wow happens in the last 20.' }
        ].map((p, i) => (
          <motion.div
            key={p.k}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-line pt-5"
          >
            <div className={`numeral text-5xl mb-2 ${i === 0 ? 'text-ember' : i === 1 ? 'cool-blend' : 'warm-blend'}`}>
              {p.k}
            </div>
            <div className="font-serif italic text-2xl text-bone mb-2">{p.v}</div>
            <div className="text-sm text-bone-muted leading-relaxed">{p.d}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
