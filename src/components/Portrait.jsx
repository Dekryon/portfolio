import { useState } from 'react'

export default function Portrait({ src = '/portrait.jpg', alt = 'Gregory Uku' }) {
  const [errored, setErrored] = useState(false)

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-line-strong group">
      {/* Image (real photo when provided) */}
      {!errored && (
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
        />
      )}

      {/* Placeholder when no image */}
      {errored && <PortraitPlaceholder />}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none bg-noise" />

      {/* Frame markers */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-bone font-mono text-[10px] uppercase tracking-[0.2em] pointer-events-none">
        <span>GU / 01</span>
        <span className="text-ember">● REC</span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-bone font-mono text-[10px] uppercase tracking-[0.2em] pointer-events-none">
        <span>Trent Univ.</span>
        <span>2026</span>
      </div>

      {/* Corner brackets */}
      <Bracket pos="top-2 left-2" />
      <Bracket pos="top-2 right-2 rotate-90" />
      <Bracket pos="bottom-2 right-2 rotate-180" />
      <Bracket pos="bottom-2 left-2 -rotate-90" />
    </div>
  )
}

function Bracket({ pos }) {
  return (
    <div className={`absolute w-3 h-3 border-t border-l border-bone/40 pointer-events-none ${pos}`} />
  )
}

function PortraitPlaceholder() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-bg-soft via-bg to-bg-soft flex items-center justify-center">
      {/* Abstract geometric portrait · replace `/public/portrait.jpg` with a real photo */}
      <svg viewBox="0 0 200 250" className="w-full h-full">
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff5b22" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff8a5b" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#15161a" />
            <stop offset="100%" stopColor="#08080a" />
          </linearGradient>
        </defs>
        <rect width="200" height="250" fill="url(#bg)" />

        {/* Head silhouette */}
        <ellipse cx="100" cy="92" rx="42" ry="48" fill="url(#pg)" opacity="0.85" />
        {/* Shoulders */}
        <path
          d="M 30 250 Q 30 175 70 160 L 130 160 Q 170 175 170 250 Z"
          fill="url(#pg)"
          opacity="0.7"
        />
        {/* Highlight */}
        <ellipse cx="80" cy="70" rx="14" ry="20" fill="#f5f1e8" opacity="0.15" />

        {/* Grid overlay */}
        <g stroke="#f5f1e8" strokeWidth="0.3" opacity="0.1">
          <line x1="0" y1="62" x2="200" y2="62" />
          <line x1="0" y1="125" x2="200" y2="125" />
          <line x1="0" y1="188" x2="200" y2="188" />
          <line x1="50" y1="0" x2="50" y2="250" />
          <line x1="100" y1="0" x2="100" y2="250" />
          <line x1="150" y1="0" x2="150" y2="250" />
        </g>

        <text
          x="100"
          y="220"
          textAnchor="middle"
          fill="#f5f1e8"
          fontFamily="Geist Mono, monospace"
          fontSize="6"
          letterSpacing="2"
          opacity="0.5"
        >
          DROP /portrait.jpg INTO /public
        </text>
      </svg>
    </div>
  )
}
