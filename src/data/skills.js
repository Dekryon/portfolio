import {
  Code2,
  Layout,
  Wrench,
  BrainCircuit,
  Users,
  Database
} from 'lucide-react'

/* Honest confidence ladder:
 *  - Strong       → I can build with this without a tutorial open.
 *  - Comfortable  → I can build, but I'm still googling pieces.
 *  - Learning     → I know it exists and I can read it. Active study.
 */

export const SKILL_GROUPS = [
  {
    id: 'languages',
    label: 'Languages',
    icon: Code2,
    accent: 'from-ember to-tide',
    skills: [
      { name: 'HTML', level: 'Strong' },
      { name: 'CSS', level: 'Comfortable' },
      { name: 'JavaScript', level: 'Comfortable' },
      { name: 'C#', level: 'Comfortable' },
      { name: 'TypeScript', level: 'Learning' },
      { name: 'Python', level: 'Learning' },
      { name: 'SQL', level: 'Learning' }
    ]
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Layout,
    accent: 'from-tide to-ember',
    skills: [
      { name: 'React', level: 'Comfortable' },
      { name: 'Tailwind CSS', level: 'Comfortable' },
      { name: 'Responsive Design', level: 'Comfortable' },
      { name: 'Framer Motion', level: 'Learning' },
      { name: 'Accessibility', level: 'Learning' },
      { name: 'UI Design', level: 'Comfortable' }
    ]
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: Wrench,
    accent: 'from-ember-soft to-tide-soft',
    skills: [
      { name: 'VS Code', level: 'Strong' },
      { name: 'Git', level: 'Comfortable' },
      { name: 'GitHub', level: 'Comfortable' },
      { name: 'Vite', level: 'Comfortable' },
      { name: 'Netlify', level: 'Comfortable' },
      { name: 'Ableton Live 12', level: 'Comfortable' }
    ]
  },
  {
    id: 'concepts',
    label: 'Concepts',
    icon: BrainCircuit,
    accent: 'from-tide-soft to-ember-soft',
    skills: [
      { name: 'Problem Solving', level: 'Comfortable' },
      { name: 'Debugging', level: 'Comfortable' },
      { name: 'AI-Assisted Dev', level: 'Comfortable' },
      { name: 'Software Design', level: 'Learning' },
      { name: 'APIs', level: 'Learning' },
      { name: 'Databases', level: 'Learning' },
      { name: 'Security Basics', level: 'Learning' }
    ]
  },
  {
    id: 'soft',
    label: 'Soft Skills',
    icon: Users,
    accent: 'from-ember to-tide-soft',
    skills: [
      { name: 'Communication', level: 'Strong' },
      { name: 'Customer Service', level: 'Strong' },
      { name: 'Teamwork', level: 'Strong' },
      { name: 'Leadership', level: 'Comfortable' },
      { name: 'Adaptability', level: 'Strong' },
      { name: 'Fast Learning', level: 'Strong' }
    ]
  },
  {
    id: 'data',
    label: 'Data & APIs',
    icon: Database,
    accent: 'from-tide to-ember-soft',
    skills: [
      { name: 'JSON', level: 'Comfortable' },
      { name: 'Fetch / Axios', level: 'Comfortable' },
      { name: 'Arrays & Logic', level: 'Comfortable' },
      { name: 'REST APIs', level: 'Learning' },
      { name: 'File I/O', level: 'Comfortable' }
    ]
  }
]

/* Languages featured in the 3D orb (subset of the above, mapped to icons). */
export const FEATURED_LANGUAGES = [
  { name: 'JavaScript', level: 'Comfortable', note: 'My everyday language' },
  { name: 'TypeScript', level: 'Learning', note: 'Adding types lately' },
  { name: 'C#', level: 'Comfortable', note: 'OOP fundamentals' },
  { name: 'Python', level: 'Learning', note: 'Scripting + data' },
  { name: 'HTML5', level: 'Strong', note: 'Semantic, accessible' },
  { name: 'CSS3', level: 'Comfortable', note: 'Layout + animation' },
  { name: 'React', level: 'Comfortable', note: 'Component thinking' },
  { name: 'Tailwind CSS', level: 'Comfortable', note: 'Design tokens in CSS' },
  { name: 'Node.js', level: 'Learning', note: 'Server-side JS' },
  { name: 'Git', level: 'Comfortable', note: 'Daily commits' },
  { name: 'SQL', level: 'Learning', note: 'Querying basics' }
]

export const LEVEL_STYLES = {
  Strong: 'border-ember/40 bg-ember/10 text-ember',
  Comfortable: 'border-tide/40 bg-tide/10 text-tide-soft',
  Learning: 'border-line-strong bg-bone/5 text-bone-muted'
}
