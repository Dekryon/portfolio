import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { PROJECTS } from '../data/projects.js'
import {
  BrowserMockup,
  MockDashboard,
  MockMarketing,
  MockTerminal
} from './DeviceMockup.jsx'

function MockSwitch({ project }) {
  switch (project.mockType) {
    case 'terminal':
      return <MockTerminal accent={project.accent} />
    case 'marketing':
      return <MockMarketing accent={project.accent} />
    case 'dashboard':
    default:
      return <MockDashboard accent={project.accent} title={project.title} />
  }
}

function ComingSoonCard({ project }) {
  const features = project.features || []
  return (
    <div className="relative rounded-xl overflow-hidden border border-line-strong bg-bg-soft shadow-cinema aspect-[16/10]">
      {/* Subtle grid backdrop · blueprint feel */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.05] text-bone"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="absolute inset-0 p-8 sm:p-10 flex flex-col">
        {/* Top status line */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: project.accent }}
            />
            <span className="marker">// In design · {project.target || 'Q4 2026'}</span>
          </div>
          <span className="marker">SPEC v0.1</span>
        </div>

        {/* Big spec heading */}
        <div className="mt-8 sm:mt-10">
          <div className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] text-bone leading-[1.05]">
            Designed, not yet{' '}
            <span className="italic" style={{ color: project.accent }}>
              built
            </span>
            .
          </div>
        </div>

        {/* Feature spec list */}
        <ul className="mt-6 sm:mt-7 space-y-2 max-w-md">
          {features.slice(0, 4).map((f, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-bone-muted">
              <span className="marker shrink-0 pt-0.5">{String(i + 1).padStart(2, '0')}</span>
              <span className="leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>

        {/* Bottom progress staging */}
        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between marker mb-2">
            <span>Spec</span>
            <span>Design</span>
            <span>Build</span>
            <span>Ship</span>
          </div>
          <div className="relative h-px bg-line">
            <div
              className="absolute top-0 left-0 h-px"
              style={{ width: '22%', background: project.accent }}
            />
            <div
              className="absolute top-1/2 w-2 h-2 rounded-full"
              style={{
                left: '22%',
                transform: 'translate(-50%, -50%)',
                background: project.accent,
                boxShadow: `0 0 12px ${project.accent}`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectScene({ project, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5])

  const isComingSoon = project.phase === 'coming-soon'

  return (
    <article
      ref={ref}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-24 sm:py-32 border-t border-line"
    >
      {/* Background tint */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.05] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 30% 50%, ${project.accent}, transparent)`
        }}
      />

      {/* Number marker */}
      <div className="absolute top-8 right-0 marker">
        · {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
      </div>

      {/* Mockup side */}
      <motion.div
        style={{ y, rotate }}
        className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
      >
        {isComingSoon ? (
          <ComingSoonCard project={project} />
        ) : (
          <BrowserMockup src={project.image} alt={project.title} label={project.label}>
            <MockSwitch project={project} />
          </BrowserMockup>
        )}

        {/* Caption row */}
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim">
          <span>{project.role}</span>
          <span style={{ color: project.accent }}>● {project.status}</span>
        </div>
      </motion.div>

      {/* Copy side */}
      <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div className="flex items-center gap-3 mb-4 marker">
          <span>{project.year}</span>
          <span>·</span>
          <span>{project.category}</span>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-display text-4xl sm:text-5xl lg:text-6xl text-bone mb-2"
        >
          {project.title}
        </motion.h3>

        {project.subtitle && (
          <div className="font-serif italic text-bone-muted text-xl sm:text-2xl mb-5">
            {project.subtitle}
          </div>
        )}

        <p className="text-bone-muted text-base sm:text-lg leading-relaxed mb-6">
          {project.pitch}
        </p>

        {/* Problem / Solution mini list */}
        <div className="space-y-3 mb-7 text-sm text-bone-muted">
          <div className="flex gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim shrink-0 w-16 pt-1">
              Problem
            </span>
            <span className="leading-relaxed">{project.problem}</span>
          </div>
          <div className="flex gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim shrink-0 w-16 pt-1">
              {isComingSoon ? 'Intent' : 'Solved'}
            </span>
            <span className="leading-relaxed">{project.solution}</span>
          </div>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-7">
          {project.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {isComingSoon ? (
            <a href="#contact" className="btn-ember group">
              Tell me you want this
              <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          ) : (
            <>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="btn-ember group">
                  View live <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="btn-line">
                  <Github size={14} /> Source
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const shipping = PROJECTS.filter((p) => p.phase !== 'coming-soon')
  const upcoming = PROJECTS.filter((p) => p.phase === 'coming-soon')

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative container-x">
      <div className="flex items-center gap-4 mb-12 pt-24">
        <span className="marker">03 / Selected work</span>
        <div className="flex-1 h-px bg-line" />
        <span className="marker">
          {shipping.length} shipping · {upcoming.length} in design
        </span>
      </div>

      <motion.h2
        id="projects-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="h-display text-[12vw] sm:text-[8vw] lg:text-[8rem] leading-[0.95] text-bone max-w-6xl mb-6"
      >
        Things I've <span className="italic">shipped</span>.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-bone-muted text-lg max-w-2xl mb-8"
      >
        Live products and working betas first. Honest "in design" cards at the
        bottom · because pretending a spec is a demo helps no one.
      </motion.p>

      {/* Shipping work */}
      <div>
        {shipping.map((p, i) => (
          <ProjectScene key={p.id} project={p} index={i} />
        ))}
      </div>

      {/* Upcoming divider + cards */}
      {upcoming.length > 0 && (
        <>
          <div className="border-t border-line pt-24 pb-4 mt-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="marker">// What's next</span>
              <div className="flex-1 h-px bg-line" />
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="h-display text-[10vw] sm:text-[6vw] lg:text-[6rem] leading-[0.95] text-bone-muted max-w-5xl mb-4"
            >
              Coming <span className="italic ember-glow">soon</span>.
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-bone-muted max-w-xl"
            >
              On the bench · spec'd, designed, waiting for build time. Want one
              of these in your hands sooner? Tell me which.
            </motion.p>
          </div>
          {upcoming.map((p, i) => (
            <ProjectScene
              key={p.id}
              project={p}
              index={shipping.length + i}
            />
          ))}
        </>
      )}
    </section>
  )
}
