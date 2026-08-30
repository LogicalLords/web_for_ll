import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, RoundedBoxGeometry } from '@react-three/drei';

// ---------------------------------------------------------------------------
// Original low-poly hologram icons — one primitive-geometry glyph per codename.
// Nothing here is derived from any copyrighted character design.
// ---------------------------------------------------------------------------
function useBoltShape() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 1.15);
    s.lineTo(-0.5, 0.15);
    s.lineTo(-0.18, 0.15);
    s.lineTo(-0.42, -1.15);
    s.lineTo(0.52, -0.05);
    s.lineTo(0.2, -0.05);
    s.closePath();
    return s;
  }, []);
}

function IconMesh({ kind, color, accent }) {
  const bolt = useBoltShape();

  switch (kind) {
    // Iron Man — glowing reactor core (icosahedron) inside a gold ring
    case 'core':
      return (
        <group scale={0.92}>
          <mesh>
            <icosahedronGeometry args={[0.44, 0]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={2}
              metalness={0.5}
              roughness={0.15}
            />
          </mesh>
          <mesh rotation-x={Math.PI / 2} position-y={0.05}>
            <torusGeometry args={[0.68, 0.05, 12, 32]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={1.4}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <coneGeometry args={[0.14, 0.34, 3]} />
            <meshStandardMaterial color="#eceef3" emissive="#eceef3" emissiveIntensity={1.6} />
          </mesh>
        </group>
      );

    // Captain America — hexagon shield with a gold hex core
    case 'shield':
      return (
        <group scale={0.92}>
          <mesh>
            <cylinderGeometry args={[0.6, 0.6, 0.16, 6]} />
            <meshStandardMaterial color={color} metalness={0.75} roughness={0.3} />
          </mesh>
          <mesh position-y={0.03}>
            <cylinderGeometry args={[0.34, 0.34, 0.2, 6]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.2} metalness={0.8} />
          </mesh>
        </group>
      );

    // Thor — extruded lightning bolt
    case 'bolt':
      return (
        <group scale={0.85}>
          <mesh>
            <extrudeGeometry
              args={[bolt, { depth: 0.34, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 2 }]}
            />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.3}
              metalness={0.6}
              roughness={0.25}
            />
          </mesh>
        </group>
      );

    // Hulk — blocky low-poly fist
    case 'fist':
      return (
        <group scale={0.9} rotation-z={0.18}>
          <mesh position-y={0.28}>
            <boxGeometry args={[0.5, 0.62, 0.5]} />
            <meshStandardMaterial color={color} metalness={0.4} roughness={0.5} />
          </mesh>
          <mesh position={[0.15, 0.78, 0]}>
            <boxGeometry args={[0.3, 0.24, 0.34]} />
            <meshStandardMaterial color={color} metalness={0.4} roughness={0.5} />
          </mesh>
          <mesh position={[0.05, 0.86, 0]}>
            <boxGeometry args={[0.26, 0.2, 0.34]} />
            <meshStandardMaterial color={color} metalness={0.4} roughness={0.5} />
          </mesh>
          <mesh position={[-0.08, 0.86, 0]}>
            <boxGeometry args={[0.26, 0.2, 0.34]} />
            <meshStandardMaterial color={color} metalness={0.4} roughness={0.5} />
          </mesh>
          <mesh position={[-0.22, 0.78, 0]}>
            <boxGeometry args={[0.24, 0.22, 0.34]} />
            <meshStandardMaterial color={color} metalness={0.4} roughness={0.5} />
          </mesh>
          <mesh position={[-0.32, 0.52, 0]} rotation-z={-0.5}>
            <boxGeometry args={[0.18, 0.3, 0.3]} />
            <meshStandardMaterial color={color} metalness={0.4} roughness={0.5} />
          </mesh>
        </group>
      );

    // Black Widow — hourglass
    case 'hourglass':
      return (
        <group scale={0.92}>
          <mesh position-y={0.44}>
            <coneGeometry args={[0.5, 0.78, 6]} />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.35} />
          </mesh>
          <mesh position-y={-0.44} rotation-x={Math.PI}>
            <coneGeometry args={[0.5, 0.78, 6]} />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.35} />
          </mesh>
          <mesh rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.07, 0.07, 0.25, 8]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.2} />
          </mesh>
        </group>
      );

    // Hawkeye — target rings
    case 'target':
      return (
        <group scale={0.92}>
          <mesh>
            <cylinderGeometry args={[0.12, 0.14, 0.14, 16]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.6} />
          </mesh>
          <mesh>
            <torusGeometry args={[0.4, 0.07, 12, 28]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.1} />
          </mesh>
          <mesh>
            <torusGeometry args={[0.74, 0.05, 12, 28]} />
            <meshStandardMaterial color={accent} metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      );

    default:
      return null;
  }
}

/**
 * One small transparent canvas per dossier card. Draws the floating hologram
 * panel (rounded box + glowing edge lines + interior scanline) and the spinning
 * low-poly icon, tilting toward the cursor via `tiltRef` (normalized -1..1).
 */
export default function DossierScene({ member, tiltRef, motion }) {
  const group = useRef(null);
  const spin = useRef(null);
  const scan = useRef(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const g = group.current;

    if (g) {
      const targetX = motion ? -tiltRef.current.y * 0.14 + Math.sin(t * 0.8) * 0.035 : 0;
      const targetY = motion ? tiltRef.current.x * 0.16 + Math.cos(t * 0.6) * 0.035 : 0;
      g.rotation.x += (targetX - g.rotation.x) * Math.min(1, delta * 4);
      g.rotation.y += (targetY - g.rotation.y) * Math.min(1, delta * 4);
      g.position.y = Math.sin(t * 1.3) * 0.05;
    }

    if (spin.current && motion) spin.current.rotation.y += delta * 1.7;
    if (scan.current) scan.current.position.y = motion ? Math.sin(t * 1.1) * 1.15 : -1.4;
  });

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[2.5, 4, 4]} intensity={1.2} color={member.color} />
      <directionalLight position={[-3, -2, -4]} intensity={0.6} color={member.accent} />

      <group ref={group}>
        {/* hologram panel */}
        <mesh>
          <RoundedBoxGeometry args={[2.0, 2.7, 0.1, 4, 0.07]} />
          <Edges color={member.accent} />
          <meshStandardMaterial color="#11151d" metalness={0.85} roughness={0.4} />
        </mesh>

        {/* inner inset panel */}
        <mesh position={[0, 0, 0.1]}>
          <RoundedBoxGeometry args={[1.7, 2.32, 0.06, 3, 0.05]} />
          <Edges color={member.color} />
          <meshStandardMaterial
            color="#0d1017"
            metalness={0.9}
            roughness={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* traveling scanline inside the hologram */}
        <mesh ref={scan} position={[0, 0, 0.16]}>
          <planeGeometry args={[1.62, 0.05]} />
          <meshBasicMaterial
            color={member.color}
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* spinning icon hovering above the panel */}
        <group ref={spin} position={[0, 1.52, 0.25]}>
          <IconMesh kind={member.icon} color={member.color} accent={member.accent} />
        </group>
      </group>
    </Canvas>
  );
}