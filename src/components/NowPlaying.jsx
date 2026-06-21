import { motion } from 'framer-motion'
import { Headphones, Music, BookOpen, Coffee, Code } from 'lucide-react'

const ITEMS = [
  {
    label: 'In headphones',
    icon: Headphones,
    title: 'Bluesy',
    sub: '3ddes · feels like late practice nights',
    accent: '#ff5b22'
  },
  {
    label: 'Coding lately',
    icon: Code,
    title: 'Ordo',
    sub: 'Speech-to-order pipeline · confidence loop',
    accent: '#f5f1e8'
  },
  {
    label: 'Reading',
    icon: BookOpen,
    title: 'Designing Data-Intensive Applications',
    sub: 'Martin Kleppmann · chapter 7, transactions',
    accent: '#a78bfa'
  },
  {
    label: 'Producing',
    icon: Music,
    title: 'Ableton Live 12',
    sub: 'R&B sketches, lots of Rhodes patches',
    accent: '#34d399'
  },
  {
    label: 'Fueled by',
    icon: Coffee,
    title: 'Cold brew, no sugar',
    sub: 'Peterborough winters demand it',
    accent: '#d4a574'
  }
]

export default function NowPlaying() {
  return (
    <section className="relative container-x py-24 sm:py-28">
      <div className="flex items-center gap-4 mb-12">
        <span className="marker">04 / Now</span>
        <div className="flex-1 h-px bg-line" />
        <span className="marker">a snapshot</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-line border-y border-line">
        {ITEMS.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-bg p-6 sm:p-7 hover:bg-bg-soft transition-colors"
            >
              <div className="flex items-center gap-2 marker mb-5">
                <Icon size={11} style={{ color: item.accent }} />
                {item.label}
              </div>
              <div className="font-serif text-2xl sm:text-[1.6rem] leading-[1.1] text-bone mb-2">
                {item.title}
              </div>
              <div className="text-xs text-bone-muted leading-relaxed">{item.sub}</div>

              <div className="mt-6 h-px w-8 transition-all duration-500 group-hover:w-full"
                   style={{ background: item.accent }} />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
