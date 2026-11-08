export default function Hero() {
  return (
    <section id="top" className="wrap py-16 sm:py-28">
      <p className="label">Peterborough, Ontario</p>
      <h1 className="mt-5 max-w-[14ch] font-serif text-[clamp(3rem,8vw,7rem)] leading-[1] tracking-[-0.02em] [text-wrap:balance]">
        I build software and ship it.
      </h1>
      <p className="mt-8 max-w-[36rem] text-lg text-ink-2">
        Software engineering student at Trent University. I run Ordo, an AI phone
        receptionist for small businesses, and build Gradus, a grade tracker for
        Canadian students.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
        <a href="#work" className="btn-solid">
          See the work
        </a>
        <a href="mailto:ukugregory@gmail.com" className="link">
          ukugregory@gmail.com
        </a>
      </div>
    </section>
  )
}
