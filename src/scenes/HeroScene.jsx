import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { C } from '../lib/tokens';

// ---------------------------------------------------------------------------
// Drifting ember/dust field. Two translucent additive point clouds (gold + red)
// fall slowly through space and wrap around. Particle count is capped per-device.
// ---------------------------------------------------------------------------
function Dust({ count, color, speed = 1, motion }) {
  const geo = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 13;
      arr[i * 3 + 2] = -3 - Math.random() * 5;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!motion) return;
    const g = geo.current;
    if (!g) return;
    const p = g.attributes.position.array;
    for (let i = 0; i < count; i++) {
      p[i * 3 + 1] -= delta * 0.06 * speed;
      p[i * 3] += Math.sin((p[i * 3 + 1] + i) * 0.02) * delta * 0.02;
      if (p[i * 3 + 1] < -6.5) p[i * 3 + 1] = 6.5;
    }
    g.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geo}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Original "vibranium-style" shield: stacked hexagonal discs (6-segment
// cylinders), spokes, a glowing emissive core and red/gold rim rings. Built
// entirely from primitive geometry — nothing copied from any franchise.
// ---------------------------------------------------------------------------
function HexDisc({ radius, depth = 0.16, color, rot = 0 }) {
  return (
    <group rotation-z={rot}>
      <mesh>
        <cylinderGeometry args={[radius, radius, depth, 6]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.35} transparent opacity={0} />
      </mesh>
    </group>
  );
}

function Shield({ bootRef, motion }) {
  const group = useRef(null);
  const core = useRef(null);
  const ring = useRef(null);
  const halo = useRef(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const b = bootRef.current.shield;
    const t = state.clock.elapsedTime;

    g.scale.setScalar(0.5 + 0.5 * b);

    if (!motion) {
      // static (reduced-motion) fallback: only apply boot opacity/scale
      g.traverse((o) => {
        if (o.isMesh && o.material.opacity !== undefined && o !== halo.current) {
          o.material.opacity = b;
        }
      });
      if (halo.current) halo.current.material.opacity = b * 0.09;
      return;
    }

    // boot: fast spin that eases down to a slow idle rotation
    g.rotation.z += delta * (2.4 * (1 - b) + 0.12);
    g.rotation.x = Math.sin(t * 0.35) * 0.09;
    g.position.y = Math.sin(t * 0.7) * 0.11;

    if (core.current) {
      core.current.rotation.z += delta * (3.2 * (1 - b) + 0.7);
      core.current.rotation.y += delta * 1.3;
    }
    if (ring.current) ring.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.55) * 0.22;
    if (halo.current) halo.current.rotation.z -= delta * 0.18;

    g.traverse((o) => {
      if (o.isMesh && o.material.opacity !== undefined && o !== halo.current) {
        o.material.opacity = b;
      }
    });
    if (halo.current) halo.current.material.opacity = b * 0.09;
  });

  return (
    <group ref={group}>
      <HexDisc radius={1.78} depth={0.14} color={C.line} />
      <HexDisc radius={1.46} depth={0.18} color={C.panel2} rot={Math.PI / 6} />
      <HexDisc radius={1.14} depth={0.24} color={C.panel} />
      <HexDisc radius={0.82} depth={0.3} color="#0f1218" rot={Math.PI / 6} />

      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`spoke-${i}`} rotation-z={(i * Math.PI) / 3} position={[0.9, 0, 0.01]}>
          <boxGeometry args={[1.7, 0.035, 0.06]} />
          <meshStandardMaterial color={C.line} metalness={0.85} roughness={0.4} transparent opacity={0} />
        </mesh>
      ))}

      {/* red outer hex-ring */}
      <group ref={ring} position-y={0.03}>
        <mesh>
          <torusGeometry args={[1.82, 0.06, 12, 6]} />
          <meshStandardMaterial
            color={C.red}
            emissive={C.red}
            emissiveIntensity={1.6}
            metalness={0.6}
            roughness={0.3}
            transparent
            opacity={0}
          />
        </mesh>
      </group>

      {/* gold mid hex-ring */}
      <mesh rotation-x={Math.PI / 2} position-z={0.05}>
        <torusGeometry args={[1.52, 0.04, 12, 6]} />
        <meshStandardMaterial
          color={C.gold}
          emissive={C.gold}
          emissiveIntensity={1.1}
          metalness={0.9}
          roughness={0.25}
          transparent
          opacity={0}
        />
      </mesh>

      {/* emissive gold core */}
      <group ref={core} position-z={0.08}>
        <mesh>
          <icosahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color={C.gold}
            emissive={C.gold}
            emissiveIntensity={2.4}
            metalness={0.3}
            roughness={0.12}
            transparent
            opacity={0}
          />
        </mesh>
        <mesh>
          <torusGeometry args={[0.58, 0.035, 12, 24]} />
          <meshStandardMaterial
            color={C.gold}
            emissive={C.gold}
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0}
          />
        </mesh>
      </group>

      {/* soft red halo behind */}
      <mesh ref={halo} position-z={-0.06}>
        <circleGeometry args={[2.2, 48]} />
        <meshBasicMaterial
          color={C.red}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene({ bootRef, motion = true, dpr = 1.75, particleCount = 420 }) {
  return (
    <Canvas
      dpr={[1, dpr]}
      camera={{ position: [0, 0.6, 8], fov: 45 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={[C.bg]} />
      <ambientLight intensity={0.35} />
      {/* red + gold rim lights */}
      <directionalLight position={[4, 5, 4]} intensity={1.6} color={C.red} />
      <directionalLight position={[-4, -2, -5]} intensity={1.1} color={C.gold} />

      <Shield bootRef={bootRef} motion={motion} />
      <Dust count={particleCount} color={C.gold} speed={1} motion={motion} />
      <Dust count={Math.round(particleCount / 2)} color={C.red} speed={1.5} motion={motion} />
    </Canvas>
  );
}