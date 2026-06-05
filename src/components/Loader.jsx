import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let p = 0
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 12 + 4)
      setProgress(Math.round(p))
      if (p >= 100) {
        clearInterval(id)
        setTimeout(() => setDone(true), 350)
      }
    }, 90)
    return () => clearInterval(id)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[200] bg-bg flex items-end justify-between p-6 sm:p-10"
        >
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-dim">
              GU / 26
            </span>
            <span className="font-serif italic text-2xl sm:text-3xl text-bone">
              loading the workshop
            </span>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div
              className="numeral text-5xl sm:text-7xl text-bone leading-none"
              aria-hidden="true"
            >
              {String(progress).padStart(3, '0')}
            </div>
            <div className="w-40 sm:w-64 h-px bg-line-strong overflow-hidden">
              <motion.div
                className="h-full bg-ember origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
