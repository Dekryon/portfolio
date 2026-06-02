import { useState } from 'react'

export function BrowserMockup({ src, alt, label = 'localhost:3000', children, className = '' }) {
  const [errored, setErrored] = useState(false)
  const showImg = src && !errored

  return (
    <div className={`relative rounded-xl overflow-hidden border border-line-strong bg-bg-soft shadow-cinema ${className}`}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-gradient-to-b from-bg-card to-bg-surface">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-bone/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-bone/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-bone/15" />
        </div>
        <div className="flex-1 mx-4 max-w-sm h-6 rounded-md bg-bg-soft border border-line flex items-center justify-center px-3">
          <span className="font-mono text-[10px] text-bone-dim truncate">{label}</span>
        </div>
        <span className="font-mono text-[10px] text-bone-dim">●●●</span>
      </div>

      {/* Screen */}
      <div className="relative aspect-[16/10] bg-bg overflow-hidden">
        {showImg && (
          <img
            src={src}
            alt={alt}
            onError={() => setErrored(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {!showImg && children}
      </div>
    </div>
  )
}

export function PhoneMockup({ src, alt, children, className = '' }) {
  const [errored, setErrored] = useState(false)
  const showImg = src && !errored
  return (
    <div className={`relative aspect-[9/19] rounded-[2.4rem] border-[8px] border-bg-elevated bg-bg-soft shadow-cinema overflow-hidden ${className}`}>
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black z-10" />
      <div className="relative w-full h-full overflow-hidden rounded-[1.8rem]">
        {showImg && (
          <img
            src={src}
            alt={alt}
            onError={() => setErrored(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {!showImg && children}
      </div>
    </div>
  )
}

/* Pretty placeholder UIs · for when no real screenshot is dropped in yet */

export function MockDashboard({ accent = '#ff5b22', title = 'Dashboard' }) {
  return (
    <div className="absolute inset-0 p-5 flex gap-4 bg-gradient-to-br from-bg-soft via-bg to-bg-soft">
      {/* Sidebar */}
      <div className="w-24 flex flex-col gap-3 pt-2">
        <div className="h-2.5 w-12 rounded-full bg-bone/20" />
        <div className="h-2 w-16 rounded-full bg-bone/10" />
        <div className="h-2 w-14 rounded-full bg-bone/10" />
        <div className="h-2 w-16 rounded-full bg-bone/10" />
        <div className="h-2 w-12 rounded-full bg-bone/10" />
        <div className="mt-auto h-8 rounded-md border border-line bg-bg-soft/40" />
      </div>
      {/* Main */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="h-3 w-32 rounded-full bg-bone/30" />
          <div className="flex gap-1.5">
            <span className="h-6 w-12 rounded-md border border-line bg-bg-soft/40" />
            <span className="h-6 w-16 rounded-md" style={{ background: accent }} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-md border border-line bg-bg-soft/30 p-2">
              <div className="h-1.5 w-10 rounded-full bg-bone/15 mb-1.5" />
              <div className="h-3 w-14 rounded-full bg-bone/30" />
            </div>
          ))}
        </div>
        {/* Chart area */}
        <div className="flex-1 rounded-md border border-line bg-bg-soft/30 p-3 relative overflow-hidden">
          <div className="h-1.5 w-16 rounded-full bg-bone/15 mb-2" />
          <svg viewBox="0 0 200 80" className="w-full h-[80%]">
            <defs>
              <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={accent} />
                <stop offset="100%" stopColor="#f5f1e8" />
              </linearGradient>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
                <stop offset="100%" stopColor={accent} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 60 L 25 50 L 50 55 L 75 38 L 100 42 L 125 28 L 150 33 L 175 18 L 200 22 L 200 80 L 0 80 Z"
              fill="url(#fill)"
            />
            <path
              d="M0 60 L 25 50 L 50 55 L 75 38 L 100 42 L 125 28 L 150 33 L 175 18 L 200 22"
              fill="none"
              stroke="url(#line)"
              strokeWidth="1.2"
            />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-12 rounded-md border border-line bg-bg-soft/30 flex items-center px-3 gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
            <div className="h-1.5 flex-1 rounded-full bg-bone/15" />
          </div>
          <div className="h-12 rounded-md border border-line bg-bg-soft/30 flex items-center px-3 gap-2">
            <span className="w-2 h-2 rounded-full bg-bone/30" />
            <div className="h-1.5 flex-1 rounded-full bg-bone/15" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function MockMarketing({ accent = '#ff5b22' }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-bg-soft via-bg to-bg-soft p-6 flex flex-col gap-4">
      {/* Top nav */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded" style={{ background: accent }} />
          <div className="h-2 w-16 rounded-full bg-bone/30" />
        </div>
        <div className="flex gap-3">
          <div className="h-1.5 w-8 rounded-full bg-bone/15" />
          <div className="h-1.5 w-10 rounded-full bg-bone/15" />
          <div className="h-1.5 w-8 rounded-full bg-bone/15" />
        </div>
      </div>
      {/* Hero block */}
      <div className="flex-1 grid grid-cols-2 gap-6 items-center">
        <div className="space-y-2">
          <div className="h-1.5 w-16 rounded-full" style={{ background: accent }} />
          <div className="h-3 w-full rounded-full bg-bone/40" />
          <div className="h-3 w-4/5 rounded-full bg-bone/40" />
          <div className="h-3 w-3/5 rounded-full bg-bone/40" />
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-bone/15" />
            <div className="h-1.5 w-5/6 rounded-full bg-bone/15" />
            <div className="h-1.5 w-2/3 rounded-full bg-bone/15" />
          </div>
          <div className="mt-3 flex gap-2">
            <div className="h-7 w-20 rounded-full" style={{ background: accent }} />
            <div className="h-7 w-20 rounded-full border border-line" />
          </div>
        </div>
        <div className="aspect-square rounded-lg border border-line bg-bg-soft/40 relative overflow-hidden">
          <div className="absolute inset-4 rounded-md border border-line" />
          <div className="absolute inset-8 rounded-md" style={{ background: `${accent}40` }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full" style={{ background: accent }} />
        </div>
      </div>
      {/* Logos row */}
      <div className="flex items-center justify-around opacity-40">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-2 w-10 rounded-full bg-bone/30" />
        ))}
      </div>
    </div>
  )
}

export function MockTerminal({ accent = '#ff5b22' }) {
  return (
    <div className="absolute inset-0 bg-bg p-6 font-mono text-[11px] leading-relaxed">
      <div className="space-y-1">
        <div><span style={{ color: accent }}>$</span> <span className="text-bone">gradesys init</span></div>
        <div className="text-bone-muted">→ Creating student records...</div>
        <div className="text-bone-muted">→ Loading menu options...</div>
        <div className="text-bone-muted">→ Ready.</div>
        <div className="h-2" />
        <div><span style={{ color: accent }}>$</span> <span className="text-bone">gradesys add</span></div>
        <div className="text-bone-muted">Name: <span className="text-bone">Aiyana K.</span></div>
        <div className="text-bone-muted">ID: <span className="text-bone">2026-0814</span></div>
        <div className="text-bone-muted">Grade: <span className="text-bone">93.5</span></div>
        <div style={{ color: accent }}>✓ Added.</div>
        <div className="h-2" />
        <div><span style={{ color: accent }}>$</span> <span className="text-bone">gradesys report --top 5</span></div>
        <div className="text-bone">┌─────────────────┬──────┐</div>
        <div className="text-bone">│ NAME            │ AVG  │</div>
        <div className="text-bone">├─────────────────┼──────┤</div>
        <div className="text-bone">│ Aiyana K.       │ 93.5 │</div>
        <div className="text-bone">│ Marcus O.       │ 91.2 │</div>
        <div className="text-bone">│ Sofia L.        │ 89.8 │</div>
        <div className="text-bone">│ Daniel R.       │ 88.4 │</div>
        <div className="text-bone">│ Priya S.        │ 86.1 │</div>
        <div className="text-bone">└─────────────────┴──────┘</div>
        <div className="flex items-center gap-2 mt-2">
          <span style={{ color: accent }}>$</span>
          <span className="inline-block w-2 h-3.5 align-middle animate-pulse" style={{ background: accent }} />
        </div>
      </div>
    </div>
  )
}
