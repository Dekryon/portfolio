import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import { PROJECTS, STATUS_STYLES } from '../data/projects.js'
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

function ProjectScene({ project, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5])

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
        <BrowserMockup src={project.image} alt={project.title} label={project.label}>
          <MockSwitch project={project} />
        </BrowserMockup>

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
          className="h-display text-4xl sm:text-5xl lg:text-6xl text-bone mb-5"
        >
          {project.title}
        </motion.h3>

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
              Solved
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
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative container-x">
      <div className="flex items-center gap-4 mb-12 pt-24">
        <span className="marker">03 / Selected work</span>
        <div className="flex-1 h-px bg-line" />
        <span className="marker">{PROJECTS.length} projects</span>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="h-display text-[12vw] sm:text-[8vw] lg:text-[8rem] leading-[0.95] text-bone max-w-6xl mb-6"
      >
        Things I've <span className="italic blend-glow">built</span>.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-bone-muted text-lg max-w-xl mb-8"
      >
        Real builds, real concepts, real screenshots. Drop your own into
        <span className="font-mono text-bone mx-1">/public/projects/</span>
        and they replace the placeholders automatically.
      </motion.p>

      {/* Stack of project scenes */}
      <div>
        {PROJECTS.map((p, i) => (
          <ProjectScene key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
