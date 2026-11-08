import { useState } from 'react'

export default function About() {
  const [noPhoto, setNoPhoto] = useState(false)

  return (
    <section id="about" aria-labelledby="about-title" className="section border-t border-line">
      <div className="grid gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-4">
          {noPhoto ? (
            <div className="grid aspect-[4/5] place-items-center rounded bg-panel font-serif text-6xl text-ink-3">
              GU
            </div>
          ) : (
            <img
              src="/portrait.jpg"
              alt="Gregory Uku"
              width="640"
              height="800"
              loading="lazy"
              onError={() => setNoPhoto(true)}
              className="aspect-[4/5] w-full rounded object-cover"
            />
          )}
        </div>

        <div className="md:col-span-8">
          <h2 id="about-title" className="h2">
            About
          </h2>
          <div className="mt-8 max-w-[38rem] space-y-5 text-ink-2 [text-wrap:pretty]">
            <p>
              I'm finishing a Software Engineering degree at Trent University and
              building products alongside it. My family is Nigerian and I live in
              Ontario, so two of the sites here serve people I know: a car dealer in
              Lagos and students at Trent.
            </p>
            <p>
              I work across the stack: accessible, semantic front ends, and the
              APIs and databases underneath. I care most about clear design, secure
              code, and whether the thing is useful to the person using it.
            </p>
            <p>
              Outside code I direct a community choir, produce music in Ableton,
              and fix laptops for friends and family.
            </p>
          </div>

          <dl className="mt-10 grid max-w-[38rem] grid-cols-[7rem_1fr] gap-y-3 border-t border-line pt-6 text-[15px]">
            <dt className="label pt-0.5">Studying</dt>
            <dd>B.Sc. Computer Science, Trent University, 2023 to present</dd>
            <dt className="label pt-0.5">Building</dt>
            <dd>Ordo and Gradus</dd>
            <dt className="label pt-0.5">Open to</dt>
            <dd>Internships, freelance work, and partnerships</dd>
          </dl>
        </div>
      </div>
    </section>
  )
}
