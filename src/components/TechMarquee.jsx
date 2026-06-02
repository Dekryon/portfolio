const ITEMS = [
  'React',
  'TypeScript',
  'Three.js',
  'Tailwind',
  'Framer Motion',
  'C#',
  'Node.js',
  'Vite',
  'Git',
  'OpenAI API',
  'Figma',
  'Netlify',
  'Vercel'
]

export default function TechMarquee() {
  return (
    <div className="relative border-y border-line overflow-hidden">
      <div className="container-x py-4 flex items-center gap-6">
        <span className="marker shrink-0">// Tools in rotation</span>
        <div className="marquee flex-1">
          <div className="marquee__track">
            {ITEMS.map((t, i) => (
              <Item key={i} text={t} />
            ))}
            {ITEMS.map((t, i) => (
              <Item key={`b-${i}`} text={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Item({ text }) {
  return (
    <span className="font-serif text-2xl text-bone-dim flex items-center gap-6 whitespace-nowrap">
      <span className="hover:text-ember transition-colors">{text}</span>
      <span className="text-ember">✦</span>
    </span>
  )
}
