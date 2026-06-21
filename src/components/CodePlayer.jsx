import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* A smooth, typewriter-style code slideshow.
 *  Each slide types in, holds, then crossfades to the next.
 *  Tokenization is hand-classified per line · no syntax-highlight runtime.
 */

const SLIDES = [
  {
    label: 'Ordo · order intent',
    lang: 'TypeScript',
    lines: [
      [{ t: 'kw', v: 'export async function' }, { t: 'fn', v: ' parseOrder' }, { t: 'punc', v: '(' }, { t: 'var', v: 'audio' }, { t: 'punc', v: ': ' }, { t: 'kw', v: 'Buffer' }, { t: 'punc', v: ') {' }],
      [{ t: 'var', v: '  const' }, { t: 'var', v: ' transcript' }, { t: 'punc', v: ' = ' }, { t: 'kw', v: 'await' }, { t: 'fn', v: ' transcribe' }, { t: 'punc', v: '(' }, { t: 'var', v: 'audio' }, { t: 'punc', v: ')' }],
      [{ t: 'var', v: '  const' }, { t: 'var', v: ' intent' }, { t: 'punc', v: ' = ' }, { t: 'kw', v: 'await' }, { t: 'fn', v: ' classify' }, { t: 'punc', v: '(' }, { t: 'var', v: 'transcript' }, { t: 'punc', v: ')' }],
      [{ t: 'com', v: '  // confidence-aware confirmation loop' }],
      [{ t: 'kw', v: '  if' }, { t: 'punc', v: ' (' }, { t: 'var', v: 'intent' }, { t: 'prop', v: '.confidence' }, { t: 'punc', v: ' < ' }, { t: 'num', v: '0.75' }, { t: 'punc', v: ') {' }],
      [{ t: 'kw', v: '    return' }, { t: 'fn', v: ' askClarify' }, { t: 'punc', v: '(' }, { t: 'var', v: 'intent' }, { t: 'punc', v: ')' }],
      [{ t: 'punc', v: '  }' }],
      [{ t: 'kw', v: '  return' }, { t: 'var', v: ' toTicket' }, { t: 'punc', v: '(' }, { t: 'var', v: 'intent' }, { t: 'punc', v: ')' }],
      [{ t: 'punc', v: '}' }]
    ]
  },
  {
    label: 'Portfolio · 3D hero scene',
    lang: 'React',
    lines: [
      [{ t: 'kw', v: 'function' }, { t: 'fn', v: ' Hero' }, { t: 'punc', v: '() {' }],
      [{ t: 'kw', v: '  return' }, { t: 'punc', v: ' (' }],
      [{ t: 'punc', v: '    <' }, { t: 'fn', v: 'Canvas' }, { t: 'punc', v: '>' }],
      [{ t: 'punc', v: '      <' }, { t: 'fn', v: 'Icosa' }, { t: 'punc', v: ' />' }],
      [{ t: 'punc', v: '      <' }, { t: 'fn', v: 'Particles' }, { t: 'prop', v: ' count' }, { t: 'punc', v: '={' }, { t: 'num', v: '1400' }, { t: 'punc', v: '} />' }],
      [{ t: 'punc', v: '      <' }, { t: 'fn', v: 'EffectComposer' }, { t: 'punc', v: '>' }],
      [{ t: 'punc', v: '        <' }, { t: 'fn', v: 'Bloom' }, { t: 'prop', v: ' intensity' }, { t: 'punc', v: '={' }, { t: 'num', v: '0.9' }, { t: 'punc', v: '} />' }],
      [{ t: 'punc', v: '      </' }, { t: 'fn', v: 'EffectComposer' }, { t: 'punc', v: '>' }],
      [{ t: 'punc', v: '    </' }, { t: 'fn', v: 'Canvas' }, { t: 'punc', v: '>' }],
      [{ t: 'punc', v: '  )' }],
      [{ t: 'punc', v: '}' }]
    ]
  },
  {
    label: 'Student Grades · console UX',
    lang: 'C#',
    lines: [
      [{ t: 'kw', v: 'static void' }, { t: 'fn', v: ' AddStudent' }, { t: 'punc', v: '(' }, { t: 'kw', v: 'List<Student>' }, { t: 'var', v: ' roster' }, { t: 'punc', v: ') {' }],
      [{ t: 'fn', v: '  Console' }, { t: 'prop', v: '.Write' }, { t: 'punc', v: '(' }, { t: 'str', v: '"Name: "' }, { t: 'punc', v: ');' }],
      [{ t: 'kw', v: '  var' }, { t: 'var', v: ' name' }, { t: 'punc', v: ' = ' }, { t: 'fn', v: 'Console' }, { t: 'prop', v: '.ReadLine' }, { t: 'punc', v: '();' }],
      [{ t: 'com', v: '  // validate before commit' }],
      [{ t: 'kw', v: '  if' }, { t: 'punc', v: ' (' }, { t: 'kw', v: 'string' }, { t: 'prop', v: '.IsNullOrWhiteSpace' }, { t: 'punc', v: '(' }, { t: 'var', v: 'name' }, { t: 'punc', v: ')) {' }],
      [{ t: 'fn', v: '    Console' }, { t: 'prop', v: '.WriteLine' }, { t: 'punc', v: '(' }, { t: 'str', v: '"Name required."' }, { t: 'punc', v: ');' }],
      [{ t: 'kw', v: '    return' }, { t: 'punc', v: ';' }],
      [{ t: 'punc', v: '  }' }],
      [{ t: 'var', v: '  roster' }, { t: 'prop', v: '.Add' }, { t: 'punc', v: '(' }, { t: 'kw', v: 'new' }, { t: 'fn', v: ' Student' }, { t: 'punc', v: '(' }, { t: 'var', v: 'name' }, { t: 'punc', v: '));' }],
      [{ t: 'punc', v: '}' }]
    ]
  }
]

const CHAR_DELAY = 14 // ms
const HOLD = 2200    // ms after typing finishes before switching

function totalChars(lines) {
  return lines.reduce((sum, tokens) => sum + tokens.reduce((s, t) => s + t.v.length, 0), 0)
}

export default function CodePlayer() {
  const [slideIdx, setSlideIdx] = useState(0)
  const [typed, setTyped] = useState(0)
  const total = totalChars(SLIDES[slideIdx].lines)
  const timerRef = useRef(null)

  useEffect(() => {
    setTyped(0)
    let n = 0
    const tick = () => {
      if (n < total) {
        n += 1
        setTyped(n)
        timerRef.current = setTimeout(tick, CHAR_DELAY)
      } else {
        timerRef.current = setTimeout(() => {
          setSlideIdx((i) => (i + 1) % SLIDES.length)
        }, HOLD)
      }
    }
    timerRef.current = setTimeout(tick, 200)
    return () => clearTimeout(timerRef.current)
  }, [slideIdx, total])

  const slide = SLIDES[slideIdx]

  /* Build rendered lines limited to `typed` characters */
  const rendered = []
  let consumed = 0
  for (let li = 0; li < slide.lines.length; li++) {
    const tokens = slide.lines[li]
    const out = []
    let lineDone = false
    for (let ti = 0; ti < tokens.length; ti++) {
      const tok = tokens[ti]
      const remaining = typed - consumed
      if (remaining <= 0) break
      const sliceLen = Math.min(remaining, tok.v.length)
      out.push({ t: tok.t, v: tok.v.slice(0, sliceLen) })
      consumed += sliceLen
      if (sliceLen < tok.v.length) { lineDone = true; break }
    }
    rendered.push({ tokens: out, full: !lineDone && out.length === tokens.length })
    if (consumed >= typed) break
  }

  /* Pad remaining lines as empty so layout stays stable */
  while (rendered.length < slide.lines.length) {
    rendered.push({ tokens: [], full: false })
  }

  return (
    <div className="liquid-glass rounded-xl overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-ember/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-bone/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-bone/30" />
        </div>
        <div className="flex-1 mx-4 max-w-sm h-6 rounded-md border border-line flex items-center justify-center px-3 bg-bg-soft/40">
          <span className="font-mono text-[10px] text-bone-dim truncate">
            {slide.label}
          </span>
        </div>
        <span className="chip !py-0.5">{slide.lang}</span>
      </div>

      {/* Code body */}
      <div className="relative p-6 min-h-[280px] code-block">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {rendered.map((line, i) => (
              <div key={i} className="whitespace-pre">
                <span className="ln">{String(i + 1).padStart(2, ' ')}</span>
                {line.tokens.map((tok, j) => (
                  <span key={j} className={`tok-${tok.t}`}>
                    {tok.v}
                  </span>
                ))}
                {/* Caret at the end of the current line */}
                {!line.full && i === rendered.findIndex((l) => !l.full) && (
                  <span className="caret" />
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Slide progress dots */}
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === slideIdx ? 'w-8 bg-ember' : 'w-1.5 bg-bone/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
