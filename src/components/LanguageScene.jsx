import { Suspense, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { ICON_MAP } from '../data/languageIcons.jsx'
import { FEATURED_LANGUAGES } from '../data/skills.js'

function isMobile() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 640px)').matches ||
         /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

/* Place each language card on a Fibonacci sphere · even visual distribution. */
function fibPositions(n, r = 2.6) {
  const positions = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = phi * i
    positions.push([
      Math.cos(theta) * radius * r,
      y * r,
      Math.sin(theta) * radius * r
    ])
  }
  return positions
}

function LangCard({ name, level, note, hovered, onHover }) {
  const Icon = ICON_MAP[name]
  const isActive = hovered === name
  return (
    <div
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
      className={`relative w-[140px] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
        isActive ? 'scale-110' : 'scale-100'
      }`}
    >
      <div
        className={`liquid-glass rounded-xl p-3 flex items-center gap-2.5 transition-all ${
          isActive ? 'border-ember/50' : ''
        }`}
      >
        {Icon ? (
          <Icon size={26} />
        ) : (
          <div className="w-[26px] h-[26px] rounded bg-bone/10" />
        )}
        <div className="flex-1 min-w-0">
          <div className="text-bone text-[11px] font-medium leading-tight truncate">
            {name}
          </div>
          <div
            className={`font-mono text-[8px] uppercase tracking-[0.15em] mt-0.5 ${
              level === 'Strong'
                ? 'text-ember'
                : level === 'Comfortable'
                ? 'text-bone-muted'
                : 'text-bone-dim'
            }`}
          >
            {level}
          </div>
        </div>
      </div>
    </div>
  )
}

function Orb({ hovered, onHover, paused }) {
  const ref = useRef(null)
  const positions = useMemo(() => fibPositions(FEATURED_LANGUAGES.length, 2.6), [])

  useFrame((_, delta) => {
    if (!ref.current || paused) return
    ref.current.rotation.y += delta * 0.18
    ref.current.rotation.x = Math.sin(performance.now() / 4000) * 0.15
  })

  return (
    <group ref={ref}>
      {FEATURED_LANGUAGES.map((lang, i) => (
        <group key={lang.name} position={positions[i]}>
          <Html
            transform
            distanceFactor={6}
            sprite
            zIndexRange={[10, 0]}
            style={{ pointerEvents: 'auto' }}
          >
            <LangCard {...lang} hovered={hovered} onHover={onHover} />
          </Html>
        </group>
      ))}

      {/* Connecting glow lines */}
      <mesh>
        <icosahedronGeometry args={[2.6, 0]} />
        <meshBasicMaterial wireframe color="#3b82f6" transparent opacity={0.08} />
      </mesh>
      <mesh rotation={[0.4, 0.8, 0]}>
        <icosahedronGeometry args={[2.6, 0]} />
        <meshBasicMaterial wireframe color="#ff5b22" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

function CameraDrift() {
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.04
    camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function LanguageScene() {
  const [hovered, setHovered] = useState(null)
  const mobile = isMobile()

  return (
    <div className="relative w-full h-[640px] sm:h-[680px] rounded-xl overflow-hidden liquid-glass">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[70%] h-[70%] bg-ember/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[70%] h-[70%] bg-tide/20 blur-[140px] rounded-full" />
      </div>

      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
        dpr={mobile ? [1, 1.2] : [1, 1.6]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ff5b22" />
        <pointLight position={[-5, -3, 5]} intensity={1.0} color="#3b82f6" />

        <Suspense fallback={null}>
          <Orb hovered={hovered} onHover={setHovered} paused={!!hovered} />
        </Suspense>

        {!mobile && <CameraDrift />}
      </Canvas>

      {/* Caption */}
      <div className="absolute top-6 left-6 right-6 flex items-start justify-between pointer-events-none">
        <div>
          <div className="marker mb-2">Stack / orbit</div>
          <div className="font-serif text-2xl text-bone leading-tight">
            What I actually <span className="italic ember-glow">reach for.</span>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <div className="marker">{FEATURED_LANGUAGES.length} tools</div>
          <div className="text-[10px] text-bone-dim mt-1">
            {mobile ? 'tap to inspect' : 'hover to pause'}
          </div>
        </div>
      </div>

      {/* Bottom · hovered detail */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim">
          {hovered ? (
            <span>
              <span className="text-bone">{hovered}</span>{' '}
              <span className="text-ember">●</span>{' '}
              {FEATURED_LANGUAGES.find((l) => l.name === hovered)?.note}
            </span>
          ) : (
            <span>idle · scroll-locked · all 11 in orbit</span>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-2 marker">
          <span className="w-1.5 h-1.5 rounded-full bg-ember" /> Strong
          <span className="w-1.5 h-1.5 rounded-full bg-bone-muted ml-2" /> Comfortable
          <span className="w-1.5 h-1.5 rounded-full bg-bone-dim ml-2" /> Learning
        </div>
      </div>
    </div>
  )
}
