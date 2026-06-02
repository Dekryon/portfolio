import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Points,
  PointMaterial,
  Float,
  MeshDistortMaterial,
  Sparkles
} from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  ChromaticAberration
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

function isMobile() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(max-width: 640px)').matches ||
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  )
}

/* ─── Core building blocks ─── */

function Ring({ radius, thickness, color, opacity, rotation, segments = 96 }) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, thickness, 16, segments]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

/* Six tiny octahedrons orbiting the main body, with bloom-bright emission */
function Satellites({ count = 6, radius = 2.85, mobile = false }) {
  const group = useRef(null)

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.32
      group.current.rotation.x = Math.sin(performance.now() / 6000) * 0.25
    }
  })

  const items = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const yOffset = Math.sin(angle * 2) * 0.5
      arr.push({
        position: [
          Math.cos(angle) * radius,
          yOffset,
          Math.sin(angle) * radius
        ],
        color: i % 2 === 0 ? '#ff5b22' : '#3b82f6'
      })
    }
    return arr
  }, [count, radius])

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <Float
          key={i}
          speed={1.4 + (i % 3) * 0.3}
          rotationIntensity={2.2}
          floatIntensity={0.6}
        >
          <mesh position={it.position}>
            <octahedronGeometry args={[mobile ? 0.07 : 0.09, 0]} />
            <meshStandardMaterial
              color={it.color}
              emissive={it.color}
              emissiveIntensity={1.8}
              roughness={0.1}
              metalness={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function Icosa({ mobile = false }) {
  const outer = useRef(null)
  const inner = useRef(null)
  const core = useRef(null)

  useFrame((state, delta) => {
    if (outer.current) {
      outer.current.rotation.x += delta * 0.07
      outer.current.rotation.y += delta * 0.11
    }
    if (inner.current) {
      inner.current.rotation.x -= delta * 0.16
      inner.current.rotation.z += delta * 0.09
    }
    if (core.current) {
      const t = state.clock.elapsedTime
      const s = 1 + Math.sin(t * 1.6) * 0.08
      core.current.scale.set(s, s, s)
    }
  })

  return (
    <group>
      {/* Warm halo disc — gives the object a sun-behind-it feel */}
      <mesh position={[0, 0, -1.4]}>
        <circleGeometry args={[3.6, 64]} />
        <meshBasicMaterial color="#ff5b22" transparent opacity={0.08} />
      </mesh>
      {/* Cool halo disc */}
      <mesh position={[0, 0, -1.5]}>
        <circleGeometry args={[5.2, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.06} />
      </mesh>

      {/* Outer wireframe — higher subdivision for detail */}
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.4, 2]} />
        <meshBasicMaterial
          color="#f5f1e8"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Inner organic-morph solid */}
      <mesh ref={inner} scale={1.05}>
        <icosahedronGeometry args={[1.45, mobile ? 2 : 4]} />
        <MeshDistortMaterial
          color="#0a0d18"
          emissive="#ff5b22"
          emissiveIntensity={0.5}
          roughness={0.12}
          metalness={1}
          distort={0.18}
          speed={1.4}
          flatShading={false}
        />
      </mesh>

      {/* Bright pulsing core — the warm heart */}
      <mesh ref={core}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshBasicMaterial color="#ffa07a" />
      </mesh>
      {/* Inner blue echo ring around the core */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.005, 12, 64]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.7} />
      </mesh>

      {/* Six rings at varied scales and angles */}
      <Ring
        radius={3.2}
        thickness={0.014}
        color="#ff5b22"
        opacity={0.95}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Ring
        radius={3.4}
        thickness={0.014}
        color="#3b82f6"
        opacity={0.95}
        rotation={[Math.PI / 6, -Math.PI / 3, Math.PI / 2]}
      />
      <Ring
        radius={3.0}
        thickness={0.01}
        color="#60a5fa"
        opacity={0.6}
        rotation={[Math.PI / 2.4, Math.PI / 2.2, 0]}
      />
      <Ring
        radius={3.6}
        thickness={0.008}
        color="#f5f1e8"
        opacity={0.3}
        rotation={[Math.PI / 3, Math.PI / 4, 0]}
      />
      <Ring
        radius={2.8}
        thickness={0.012}
        color="#ff8a5b"
        opacity={0.7}
        rotation={[0, Math.PI / 4, Math.PI / 3]}
      />
      <Ring
        radius={3.85}
        thickness={0.006}
        color="#93c5fd"
        opacity={0.4}
        rotation={[Math.PI / 5, Math.PI / 7, Math.PI / 6]}
      />

      {/* Orbiting satellites */}
      <Satellites count={mobile ? 4 : 6} mobile={mobile} />

      {/* Glittery sparkles · warm + cool layers · only on desktop */}
      {!mobile && (
        <>
          <Sparkles
            count={60}
            scale={5}
            size={2.4}
            speed={0.45}
            color="#ff8a5b"
            opacity={0.85}
          />
          <Sparkles
            count={60}
            scale={6}
            size={1.6}
            speed={0.35}
            color="#60a5fa"
            opacity={0.75}
          />
        </>
      )}
    </group>
  )
}

function Particles({ count = 1400 }) {
  const ref = useRef(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03
      ref.current.rotation.x += delta * 0.01
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#f5f1e8"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  )
}

function TideParticles({ count = 600 }) {
  const ref = useRef(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.04
      ref.current.rotation.z += delta * 0.01
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  )
}

function Grid() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
        <planeGeometry args={[40, 40, 30, 30]} />
        <meshBasicMaterial color="#ff5b22" wireframe transparent opacity={0.08} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.21, 0]}>
        <planeGeometry args={[40, 40, 30, 30]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

function CameraPull({ scrollRef }) {
  useFrame(({ camera }) => {
    const t = scrollRef.current ?? 0
    const target = 6 + t * 4
    camera.position.z += (target - camera.position.z) * 0.05
    camera.position.y = 0.4 - t * 1.5
    camera.lookAt(0, 0, 0)
  })
  return null
}

function MouseParallax({ scrollRef, enabled }) {
  const target = useRef({ x: 0, y: 0 })

  useFrame(({ camera, mouse }) => {
    if (!enabled) {
      camera.position.x = 0
      return
    }
    target.current.x += (mouse.x * 0.4 - target.current.x) * 0.04
    target.current.y += (mouse.y * 0.3 - target.current.y) * 0.04
    camera.position.x = target.current.x
    camera.position.y = 0.4 + target.current.y - (scrollRef.current ?? 0) * 1.5
  })
  return null
}

export default function Scene({ scrollRef }) {
  const mobile = isMobile()
  const dpr = mobile ? [1, 1.2] : [1, 1.6]
  const particleCount = mobile ? 600 : 1400
  const tideCount = mobile ? 250 : 600

  return (
    <Canvas
      camera={{ position: [0, 0.4, 6], fov: 45 }}
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: 'high-performance'
      }}
      dpr={dpr}
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={['#08080a']} />
      <fog attach="fog" args={['#08080a', 8, 24]} />

      <ambientLight intensity={0.35} />
      <pointLight position={[8, 6, 8]} intensity={1.6} color="#ff5b22" />
      <pointLight position={[-8, 4, -4]} intensity={1.6} color="#3b82f6" />
      <pointLight position={[-3, 8, 2]} intensity={0.9} color="#60a5fa" />
      <pointLight position={[3, -4, 2]} intensity={0.7} color="#ff8a5b" />
      <pointLight position={[0, -4, -8]} intensity={0.5} color="#f5f1e8" />
      <directionalLight position={[0, 6, 4]} intensity={0.4} />

      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.1}>
          <Icosa mobile={mobile} />
        </Float>
        <Particles count={particleCount} />
        <TideParticles count={tideCount} />
        <Grid />
      </Suspense>

      <CameraPull scrollRef={scrollRef} />
      <MouseParallax scrollRef={scrollRef} enabled={!mobile} />

      {!mobile && (
        <EffectComposer>
          <Bloom
            intensity={1.1}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.85}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0009, 0.0009]}
          />
        </EffectComposer>
      )}
      {mobile && (
        <EffectComposer>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.85}
          />
        </EffectComposer>
      )}
    </Canvas>
  )
}
