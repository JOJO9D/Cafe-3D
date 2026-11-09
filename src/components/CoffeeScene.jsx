import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment } from '@react-three/drei'

/**
 * One keyframe per page section. The scene reads overall scroll progress,
 * maps it onto these keyframes and eases every value toward its target.
 */
const KEYFRAMES = {
  x: [2.8, -2.8, 2.8, -2.8, 2.8],
  y: [-1, -0.2, -0.5, -0.2, -0.4],
  tilt: [0.15, 0.45, -0.15, 0.45, 0.1],
  scale: [0.85, 0.95, 0.85, 0.95, 0.9],
  fill: [0, 0.15, 0.65, 0.9, 1],
  beans: [0.5, 1, 0.4, 0, 0.2],
  steam: [0, 0.3, 1, 0.7, 1],
  latte: [0, 0, 0.3, 1, 1],
  glaze: ["#f1e6d6", "#f1e6d6", "#f1e6d6", "#b85c38", "#3f5a48"],
  coffee: ["#2a170d", "#2a170d", "#2a170d", "#a8703f", "#8f5a30"],
};

const SECTION_COUNT = KEYFRAMES.x.length

const smoothstep = (t) => t * t * (3 - 2 * t)

function segment(s) {
  const index = Math.min(Math.max(Math.floor(s), 0), SECTION_COUNT - 2)
  const t = smoothstep(THREE.MathUtils.clamp(s - index, 0, 1))
  return { index, t }
}

function sample(values, s) {
  const { index, t } = segment(s)
  return THREE.MathUtils.lerp(values[index], values[index + 1], t)
}

function getScrollSection() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  const progress = max > 0 ? window.scrollY / max : 0
  return { progress, section: progress * (SECTION_COUNT - 1) }
}

/** Inner wall radius of the cup at a given height (matches the lathe profile). */
function innerRadiusAt(y) {
  if (y < 0.5) return THREE.MathUtils.mapLinear(y, 0.15, 0.5, 0.56, 0.66)
  return THREE.MathUtils.mapLinear(y, 0.5, 1.1, 0.66, 0.72)
}

function useLathe(points, segments = 96) {
  return useMemo(
    () =>
      new THREE.LatheGeometry(
        points.map(([x, y]) => new THREE.Vector2(x, y)),
        segments,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
}

function CoffeeCup({isMenu}) {
  const rig = useRef(null)
  const cup = useRef(null)
  const liquid = useRef(null)
  const foam = useRef(null)
  const materials = useMemo(
    () => ({
      glaze: new THREE.MeshPhysicalMaterial({
        color: KEYFRAMES.glaze[0],
        roughness: 0.25,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        side: THREE.DoubleSide,
      }),
      coffee: new THREE.MeshStandardMaterial({ color: KEYFRAMES.coffee[0], roughness: 0.15 }),
      foam: new THREE.MeshStandardMaterial({ color: '#f4e3c8', roughness: 0.6 }),
      bean: new THREE.MeshStandardMaterial({ color: '#4a2a17', roughness: 0.45 }),
    }),
    [],
  )
  const steamRefs = useRef([])
  const beanRefs = useRef([])
  const state = useRef({ fill: 0, beans: 0, steam: 0, latte: 0 })

  const viewport = useThree((s) => s.viewport)
  const isNarrow = viewport.aspect < 0.85

  const cupGeometry = useLathe([
    [0, 0],
    [0.5, 0],
    [0.6, 0.04],
    [0.68, 0.35],
    [0.76, 0.95],
    [0.8, 1.15],
    [0.77, 1.18],
    [0.72, 1.1],
    [0.66, 0.5],
    [0.56, 0.15],
    [0, 0.12],
  ])

  const saucerGeometry = useLathe([
    [0, 0],
    [1.1, 0.02],
    [1.32, 0.12],
    [1.36, 0.16],
    [1.3, 0.16],
    [1.12, 0.08],
    [0.6, 0.06],
    [0, 0.06],
  ])

  const colors = useMemo(
    () => ({
      glaze: KEYFRAMES.glaze.map((c) => new THREE.Color(c)),
      coffee: KEYFRAMES.coffee.map((c) => new THREE.Color(c)),
      target: new THREE.Color(),
    }),
    [],
  )

  const beans = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        angle: (i / 18) * Math.PI * 2,
        radius: 1.55 + (i % 3) * 0.35,
        height: 0.2 + ((i * 37) % 10) / 10,
        spin: 0.4 + ((i * 13) % 7) / 7,
        offset: i * 1.7,
      })),
    [],
  )

  const steam = useMemo(
    () => Array.from({ length: 7 }, (_, i) => ({ phase: i / 7, sway: i * 1.3 })),
    [],
  )

  useFrame(({ clock }, delta) => {

    if (!rig.current || !cup.current) return
    const time = clock.elapsedTime
    const { progress, section } = getScrollSection()
    const responsive = Math.min(1, viewport.width /6.5)

    const targetX = isNarrow ? 0 : sample(KEYFRAMES.x, section) * responsive
    const targetY = sample(KEYFRAMES.y, section) + (isNarrow ? 0.75 : 0)
    const targetScale = sample(KEYFRAMES.scale, section) * (isNarrow ? Math.min(1, viewport.width / 3.6) : 1)

    const damp = THREE.MathUtils.damp
    rig.current.position.x = damp(rig.current.position.x, targetX, 3.5, delta)
    rig.current.position.y = damp(rig.current.position.y, targetY + Math.sin(time * 1.2) * 0.04, 3.5, delta)
    const nextScale = damp(rig.current.scale.x, targetScale, 3.5, delta)
    rig.current.scale.setScalar(nextScale)

    cup.current.rotation.y = damp(cup.current.rotation.y, progress * Math.PI * 3 - 0.6, 3, delta)
    cup.current.rotation.x = damp(cup.current.rotation.x, sample(KEYFRAMES.tilt, section) * 0.5, 3, delta)
    cup.current.rotation.z = damp(cup.current.rotation.z, Math.sin(time * 0.8) * 0.03, 3, delta)

    const s = state.current
    s.fill = damp(s.fill, sample(KEYFRAMES.fill, section), 2.5, delta)
    s.beans = damp(s.beans, sample(KEYFRAMES.beans, section), 3, delta)
    s.steam = damp(s.steam, sample(KEYFRAMES.steam, section), 2, delta)
    s.latte = damp(s.latte, sample(KEYFRAMES.latte, section), 2.5, delta)

    const { index, t } = segment(section)
    const colorEase = 1 - Math.exp(-4 * delta)
    colors.target.lerpColors(colors.glaze[index], colors.glaze[index + 1], t)
    materials.glaze.color.lerp(colors.target, colorEase)
    colors.target.lerpColors(colors.coffee[index], colors.coffee[index + 1], t)
    materials.coffee.color.lerp(colors.target, colorEase)

    const liquidY = 0.14 + s.fill * 0.9
    const liquidR = innerRadiusAt(liquidY) - 0.005
    if (liquid.current) {
      liquid.current.visible = s.fill > 0.02
      liquid.current.position.y = liquidY
      liquid.current.scale.set(liquidR, liquidR, 1)
    }
    if (foam.current) {
      foam.current.visible = s.latte > 0.02 && s.fill > 0.2
      foam.current.position.y = liquidY + 0.004
      foam.current.scale.setScalar(liquidR * s.latte)
      foam.current.rotation.y = time * 0.15
    }

    steam.forEach((puff, i) => {
      const mesh = steamRefs.current[i]
      if (!mesh) return
      const life = (time * 0.28 + puff.phase) % 1
      mesh.position.set(
        Math.sin(life * 5 + puff.sway) * 0.18,
        1.35 + life * 1.5,
        Math.cos(life * 4 + puff.sway) * 0.1,
      )
      mesh.scale.setScalar(0.07 + life * 0.22)
      const material = mesh.material
      material.opacity = s.steam * Math.sin(life * Math.PI) * 0.22
      mesh.visible = material.opacity > 0.005
    })

    beans.forEach((bean, i) => {
      const mesh = beanRefs.current[i]
      if (!mesh) return
      const angle = bean.angle + time * 0.25 + progress * Math.PI * 2
      const radius = bean.radius * (0.6 + s.beans * 0.4)
      mesh.position.set(
        Math.cos(angle) * radius,
        bean.height + Math.sin(time * bean.spin + bean.offset) * 0.25,
        Math.sin(angle) * radius,
      )
      mesh.rotation.set(time * bean.spin, time * bean.spin * 0.7, bean.offset)
      mesh.scale.set(s.beans, s.beans * 0.7, s.beans * 0.5)
      mesh.visible = s.beans > 0.01
    })
  })

  return (
    <group ref={rig}>
      <group ref={cup}>
        <mesh geometry={saucerGeometry} material={materials.glaze} castShadow receiveShadow />

        <group position={[0, 0.06, 0]}>
          <mesh geometry={cupGeometry} material={materials.glaze} castShadow receiveShadow />

          <mesh
            position={[0.74, 0.62, 0]}
            rotation={[0, 0, -Math.PI / 2]}
            material={materials.glaze}
            castShadow
          >
            <torusGeometry args={[0.28, 0.065, 20, 48, Math.PI]} />
          </mesh>

          <mesh ref={liquid} rotation={[-Math.PI / 2, 0, 0]} material={materials.coffee} visible={false}>
            <circleGeometry args={[1, 64]} />
          </mesh>

          <group ref={foam} visible={false}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.foam}>
              <circleGeometry args={[0.62, 48]} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.12, 0.002, 0]} material={materials.coffee}>
              <circleGeometry args={[0.34, 48]} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0.004, 0]} material={materials.foam}>
              <circleGeometry args={[0.14, 32]} />
            </mesh>
          </group>
        </group>
      </group>

      {steam.map((puff, i) => (
        <mesh
          key={puff.phase}
          ref={(el) => {
            steamRefs.current[i] = el
          }}
          visible={false}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}

      {beans.map((bean, i) => (
        <mesh
          key={bean.offset}
          ref={(el) => {
            beanRefs.current[i] = el
          }}
          material={materials.bean}
          castShadow
          visible={false}
        >
          <sphereGeometry args={[0.13, 20, 16]} />
        </mesh>
      ))}

      <ContactShadows position={[0, -0.01, 0]} opacity={0.35} scale={6} blur={2.6} far={3} />
    </group>
  )
}

export function CoffeeScene({isMenu}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.4, 6.5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 3]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#ffd9b0" />
        <Suspense fallback={null}>
          <Environment preset="apartment" environmentIntensity={0.6} />
        </Suspense>
        <CoffeeCup isMenu={isMenu} />
      </Canvas>
    </div>
  )
}
