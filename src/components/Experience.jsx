import { EXPERIENCE } from '../data/experience.js'
import { SKILL_GROUPS } from '../data/skills.js'

const LEVELS = ['Strong', 'Comfortable', 'Learning']
const LEVEL_NOTE = {
  Strong: 'I build with these without a tutorial open.',
  Comfortable: 'I build with these and still look things up.',
  Learning: 'Active study.'
}

// Skill groups flattened into three confidence tiers, duplicates removed.
const TIERS = LEVELS.map((level) => ({
  level,
  names: [
    ...new Set(
      SKILL_GROUPS.filter((g) => g.id !== 'soft').flatMap((g) => g.skills.filter((s) => s.level === level).map((s) => s.name))
    )
  ]
}))

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="section border-t border-line">
      <h2 id="exp-title" className="h2">
        Experience
      </h2>

      <ol className="mt-10 border-t border-line">
        {EXPERIENCE.map((e) => (
          <li key={e.id} className="grid gap-1 border-b border-line py-5 md:grid-cols-12 md:gap-10">
            <p className="label pt-1 md:col-span-3">{e.period}</p>
            <div className="md:col-span-9">
              <p className="font-medium">
                {e.role}, <span className="font-normal text-ink-2">{e.org}</span>
              </p>
              <p className="mt-1 max-w-[40rem] text-ink-2">{e.summary}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="h2 mt-20 sm:mt-24">Stack</h2>
      <div className="mt-10 border-t border-line">
        {TIERS.map((t) => (
          <div key={t.level} className="grid gap-1 border-b border-line py-5 md:grid-cols-12 md:gap-10">
            <p className="label pt-1 md:col-span-3">{t.level}</p>
            <div className="md:col-span-9">
              <p>{t.names.join(' · ')}</p>
              <p className="mt-1 text-[14px] text-ink-3">{LEVEL_NOTE[t.level]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
