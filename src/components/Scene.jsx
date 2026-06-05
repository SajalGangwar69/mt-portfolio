import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Trail, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { CAM_POSITIONS } from '../data/portfolio'

// ── CORE OBJECT ───────────────────────────────────────────────────────────
function CoreObject({ section }) {
  const outerRef = useRef()
  const innerRef = useRef()
  const torusRef = useRef()
  const torus2Ref = useRef()

  const colors = ['#00f5ff', '#bf00ff', '#39ff14', '#ff0090', '#ffb800', '#00f5ff']

  useFrame((_, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.3
      outerRef.current.rotation.y += delta * 0.45
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.5
      innerRef.current.rotation.y -= delta * 0.6
    }
    if (torusRef.current) {
      torusRef.current.rotation.z += delta * 0.2
      torusRef.current.rotation.x += delta * 0.05
    }
    if (torus2Ref.current) {
      torus2Ref.current.rotation.z -= delta * 0.15
      torus2Ref.current.rotation.y += delta * 0.1
    }
  })

  const col = colors[section] || '#00f5ff'

  return (
    <group>
      {/* Outer wireframe icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.8, 1]} />
        <meshStandardMaterial
          color={col}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Inner solid icosahedron */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial
          color={section % 2 === 0 ? '#bf00ff' : '#00f5ff'}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Torus ring 1 */}
      <mesh ref={torusRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[4.5, 0.06, 16, 100]} />
        <meshBasicMaterial color={col} transparent opacity={0.25} />
      </mesh>

      {/* Torus ring 2 */}
      <mesh ref={torus2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[5.8, 0.04, 16, 100]} />
        <meshBasicMaterial color="#bf00ff" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

// ── ORBIT NODES ───────────────────────────────────────────────────────────
function OrbitNode({ index, total }) {
  const ref = useRef()
  const speed = 0.3 + (index / total) * 0.4
  const radius = 7 + (index % 3) * 1.5
  const yOffset = (index - total / 2) * 0.6
  const colors = ['#00f5ff', '#bf00ff', '#39ff14', '#ff0090', '#ffb800']

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + (index / total) * Math.PI * 2
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius
      ref.current.position.z = Math.sin(t) * radius
      ref.current.position.y = yOffset + Math.sin(clock.elapsedTime * 0.8 + index) * 0.6
      ref.current.rotation.x += 0.02
      ref.current.rotation.y += 0.03
    }
  })

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.22, 0]} />
      <meshBasicMaterial
        color={colors[index % colors.length]}
        transparent
        opacity={0.75}
      />
    </mesh>
  )
}

// ── PARTICLE FIELD ────────────────────────────────────────────────────────
function ParticleField({ mouseX, mouseY }) {
  const count = 1600
  const ref = useRef()

  const [positions, originals] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const orig = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      const v = (Math.random() - 0.5) * 90
      pos[i] = v
      orig[i] = v
    }
    return [pos, orig]
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array
    const nx = mouseX * 35
    const ny = mouseY * 20

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2
      const dx = arr[ix] - nx
      const dy = arr[iy] - ny
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 5) {
        const force = (5 - dist) / 5
        arr[ix] += dx * force * 0.07
        arr[iy] += dy * force * 0.07
      }
      arr[ix] += (originals[ix] - arr[ix]) * 0.02
      arr[iy] += (originals[iy] - arr[iy]) * 0.02
      arr[iz] += (originals[iz] - arr[iz]) * 0.02
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y += 0.0002
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.18} color="#00f5ff" transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

// Nebula background particles
function Nebula() {
  const positions = useMemo(() => {
    const pos = new Float32Array(700 * 3)
    for (let i = 0; i < 700 * 3; i++) pos[i] = (Math.random() - 0.5) * 180
    return pos
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={700} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#bf00ff" transparent opacity={0.28} sizeAttenuation />
    </points>
  )
}

// ── CAMERA CONTROLLER ─────────────────────────────────────────────────────
function CameraController({ section, mouseX, mouseY }) {
  const { camera } = useThree()

  useFrame(() => {
    const target = CAM_POSITIONS[section]
    if (!target) return
    camera.position.x += (target.x + mouseX * 2 - camera.position.x) * 0.04
    camera.position.y += (target.y + mouseY * 1.2 - camera.position.y) * 0.04
    camera.position.z += (target.z - camera.position.z) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ── LIGHTS ────────────────────────────────────────────────────────────────
function Lights() {
  const light1 = useRef()
  const light2 = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (light1.current) light1.current.intensity = 1.3 + Math.sin(t * 1.5) * 0.4
    if (light2.current) light2.current.intensity = 0.9 + Math.cos(t * 0.8) * 0.3
  })

  return (
    <>
      <ambientLight color="#111122" intensity={0.8} />
      <pointLight ref={light1} color="#00f5ff" intensity={1.3} distance={45} position={[8, 6, 10]} />
      <pointLight ref={light2} color="#bf00ff" intensity={0.9} distance={35} position={[-8, -4, 8]} />
      <pointLight color="#39ff14" intensity={0.4} distance={25} position={[0, -10, 5]} />
    </>
  )
}

// ── GRID ──────────────────────────────────────────────────────────────────
function Grid({ section }) {
  return (
    <gridHelper
      args={[100, 50, '#003333', '#001a1a']}
      position={[0, -12 - section * 1.5, 0]}
      material-transparent
      material-opacity={0.15}
    />
  )
}

// ── MAIN SCENE ────────────────────────────────────────────────────────────
export default function Scene({ section, mouseX, mouseY }) {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      camera={{ fov: 70, near: 0.1, far: 1000, position: [0, 0, 28] }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <CameraController section={section} mouseX={mouseX} mouseY={mouseY} />
      <Lights />
      <CoreObject section={section} />
      {Array.from({ length: 10 }, (_, i) => (
        <OrbitNode key={i} index={i} total={10} />
      ))}
      <ParticleField mouseX={mouseX} mouseY={mouseY} />
      <Nebula />
      <Grid section={section} />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
    </Canvas>
  )
}
