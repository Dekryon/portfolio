/* Honest confidence ladder:
 *  - Strong       → I can build with this without a tutorial open.
 *  - Comfortable  → I can build, but I'm still googling pieces.
 *  - Learning     → I know it exists and I can read it. Active study.
 */

export const SKILL_GROUPS = [
  {
    id: 'languages',
    label: 'Languages',
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
    skills: [
      { name: 'JSON', level: 'Comfortable' },
      { name: 'Fetch / Axios', level: 'Comfortable' },
      { name: 'Arrays & Logic', level: 'Comfortable' },
      { name: 'REST APIs', level: 'Learning' },
      { name: 'File I/O', level: 'Comfortable' }
    ]
  }
]
