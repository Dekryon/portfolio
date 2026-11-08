import { PROJECTS } from '../data/projects.js'

function Project({ p, index }) {
  return (
    <article
      id={p.id}
      aria-labelledby={`${p.id}-title`}
      className="grid gap-8 border-t border-line py-12 md:grid-cols-12 md:gap-12 md:py-16"
    >
      <div className="md:col-span-5">
        <p className="label">
          {String(index + 1).padStart(2, '0')} · {p.year} · {p.status}
        </p>
        <h3 id={`${p.id}-title`} className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.015em]">
          {p.title}
        </h3>
        <p className="mt-3 text-lg text-ink">{p.tagline}</p>
        <p className="mt-5 text-ink-2 [text-wrap:pretty]">{p.summary}</p>
        <p className="mt-6 font-mono text-[12.5px] leading-relaxed text-ink-3">
          {p.role}
          <br />
          {p.stack.join(' · ')}
        </p>
        <a
          href={p.href}
          target="_blank"
          rel="noreferrer"
          className="link mt-6 inline-block py-2 font-medium"
        >
          Visit {p.host} ↗
        </a>
      </div>

      <img
        src={p.image}
        alt={p.alt}
        width="1600"
        height="1000"
        loading={index === 0 ? 'eager' : 'lazy'}
        className="aspect-[16/10] w-full self-start rounded border border-line object-cover object-top md:col-span-7"
      />
    </article>
  )
}

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="section pt-8 sm:pt-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 id="work-title" className="h2">
          Selected work
        </h2>
        <p className="max-w-sm text-ink-2">
          Four projects, all live. Each screenshot is the real site.
        </p>
      </div>
      {PROJECTS.map((p, i) => (
        <Project key={p.id} p={p} index={i} />
      ))}
    </section>
  )
}
