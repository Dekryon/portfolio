import { useEffect, useRef, useState } from 'react'

/**
 * VideoHero — full-bleed muted-autoplay video that lives behind the Hero
 * foreground text. Drops in where Scene used to render.
 *
 * Props (mirrors Scene.jsx for API parity):
 *   scrollRef — RefObject<number> updated by Hero's framer-motion scroll
 *               progress; we use it to softly scale + tone-shift on scroll.
 *
 * Honors prefers-reduced-motion: renders the poster as a still <img>.
 * Honors `Save-Data: on`: skips the video, shows the poster only.
 */
export default function VideoHero({ scrollRef }) {
  const videoRef = useRef(null)
  const overlayRef = useRef(null)
  const [reduced, setReduced] = useState(false)
  const [saveData, setSaveData] = useState(false)

  // Detect motion + data preferences (client-side only)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener?.('change', onChange)
    // Save-Data header proxy (Chromium)
    if (navigator.connection?.saveData) setSaveData(true)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  // Drive a slow scale + darken from Hero's scrollRef so the video stays in
  // visual conversation with the foreground parallax.
  useEffect(() => {
    if (reduced || saveData) return
    let raf = 0
    const loop = () => {
      const p = scrollRef?.current ?? 0
      if (videoRef.current) {
        // 1.0 → 1.06 scale as you scroll past the hero
        videoRef.current.style.transform = `scale(${1 + p * 0.06})`
      }
      if (overlayRef.current) {
        // darken by up to +18% so foreground type stays legible mid-scroll
        overlayRef.current.style.opacity = String(0.45 + p * 0.18)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [scrollRef, reduced, saveData])

  // Static poster path used by both reduced-motion and Save-Data fallbacks
  const POSTER = '/hero-poster.jpg'

  if (reduced || saveData) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={POSTER}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bg/55" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={POSTER}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      {/* Tint + darken so foreground display type reads on any frame */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-bg pointer-events-none transition-opacity duration-500"
        style={{ opacity: 0.45 }}
      />
      {/* Subtle ember warm-cast — keeps brand temperature on top of the video */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-ember/10 via-transparent to-tide/10 mix-blend-soft-light" />
    </div>
  )
}
