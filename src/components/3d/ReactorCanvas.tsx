import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { FOUNDERS } from '../../data/founders';
import { Founder } from '../../types';
import { soundFx } from '../../utils/sound';

interface ReactorCanvasProps {
  onSelectFounder?: (founder: Founder) => void;
  onHoverFounder?: (founder: Founder | null) => void;
  className?: string;
}

export const ReactorCanvas: React.FC<ReactorCanvasProps> = ({
  onSelectFounder,
  onHoverFounder,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredFounder, setHoveredFounder] = useState<Founder | null>(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Store callbacks in refs to avoid re-initializing Three.js scene on prop updates
  const onSelectRef = useRef(onSelectFounder);
  const onHoverRef = useRef(onHoverFounder);
  useEffect(() => {
    onSelectRef.current = onSelectFounder;
    onHoverRef.current = onHoverFounder;
  }, [onSelectFounder, onHoverFounder]);

  const handleNodeSelect = useCallback((founder: Founder) => {
    soundFx.playClick();
    if (onSelectRef.current) {
      onSelectRef.current(founder);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGLError(true);
        return;
      }
    } catch {
      setHasWebGLError(true);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setHasWebGLError(true);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Root Group
    const reactorGroup = new THREE.Group();
    scene.add(reactorGroup);

    // 1. Central Glowing Core
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    reactorGroup.add(coreMesh);

    // Inner glowing sphere
    const innerCoreGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    reactorGroup.add(innerCore);

    // Core Glow Ring
    const coreRingGeo = new THREE.RingGeometry(1.4, 1.55, 64);
    const coreRingMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const coreRing = new THREE.Mesh(coreRingGeo, coreRingMat);
    reactorGroup.add(coreRing);

    // 2. Concentric Orbital Rings
    interface RingData {
      mesh: THREE.Mesh;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
    }
    const rings: RingData[] = [];
    const ringConfigs = [
      { radius: 2.6, tube: 0.03, color: 0x06b6d4, rx: 0.005, ry: 0.012, rz: 0.002 },
      { radius: 3.8, tube: 0.025, color: 0x3b82f6, rx: -0.008, ry: 0.006, rz: 0.01 },
      { radius: 5.0, tube: 0.02, color: 0xa855f7, rx: 0.004, ry: -0.009, rz: -0.005 },
      { radius: 6.2, tube: 0.018, color: 0x00f0ff, rx: -0.003, ry: 0.004, rz: 0.008 },
    ];

    ringConfigs.forEach((cfg) => {
      const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100);
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.7,
      });
      const mesh = new THREE.Mesh(geo, mat);
      reactorGroup.add(mesh);
      rings.push({
        mesh,
        rotSpeedX: cfg.rx,
        rotSpeedY: cfg.ry,
        rotSpeedZ: cfg.rz,
      });
    });

    // 3. Floating Orbital Energy Particles
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colors = [
      new THREE.Color(0x06b6d4), // cyan
      new THREE.Color(0x3b82f6), // blue
      new THREE.Color(0xf59e0b), // amber
      new THREE.Color(0xa855f7), // purple
      new THREE.Color(0xef4444), // red
      new THREE.Color(0x10b981), // emerald
    ];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 5.0;
      const height = (Math.random() - 0.5) * 3.5;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = height;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      const col = colors[i % colors.length];
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    reactorGroup.add(particleSystem);

    // 4. Six Founder Energy Nodes along the outer orbit
    const founderNodeMeshes: { mesh: THREE.Mesh; founder: Founder; angle: number; halo: THREE.Mesh; beam: THREE.Line }[] = [];
    const orbitRadius = 4.6;

    FOUNDERS.forEach((founder, idx) => {
      const angle = (idx / FOUNDERS.length) * Math.PI * 2;
      const x = Math.cos(angle) * orbitRadius;
      const y = Math.sin(angle) * orbitRadius * 0.4;
      const z = Math.sin(angle) * orbitRadius * 0.9;

      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(x, y, z);

      // Node Mesh
      const nodeGeo = new THREE.SphereGeometry(0.32, 24, 24);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(founder.accentHex),
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = { founderId: founder.id, founder };
      nodeGroup.add(nodeMesh);

      // Halo ring around node
      const haloGeo = new THREE.RingGeometry(0.4, 0.48, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(founder.accentHex),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      nodeGroup.add(haloMesh);

      // Energy Beam to Core
      const beamGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-x, -y, -z),
      ]);
      const beamMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(founder.accentHex),
        transparent: true,
        opacity: 0.25,
      });
      const beamLine = new THREE.Line(beamGeo, beamMat);
      nodeGroup.add(beamLine);

      reactorGroup.add(nodeGroup);
      founderNodeMeshes.push({
        mesh: nodeMesh,
        founder,
        angle,
        halo: haloMesh,
        beam: beamLine,
      });
    });

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Mouse Tracking & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.x = x;
      mouse.y = y;

      targetRotation.y = x * 0.4;
      targetRotation.x = -y * 0.3;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clickMouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      raycaster.setFromCamera(clickMouse, camera);
      const interactiveMeshes = founderNodeMeshes.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const founder = intersects[0].object.userData.founder as Founder;
        if (founder) {
          handleNodeSelect(founder);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    let currentHoveredId: string | null = null;
    let animationFrameId: number;
    let clock = new THREE.Clock();

    setIsReady(true);

    // Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera/reactor tilt to mouse
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
      reactorGroup.rotation.x = currentRotation.x + Math.sin(elapsedTime * 0.5) * 0.05;
      reactorGroup.rotation.y = currentRotation.y + elapsedTime * 0.15;

      // Core rotation & pulse
      coreMesh.rotation.x += delta * 0.6;
      coreMesh.rotation.y += delta * 0.8;
      const coreScale = 1.0 + Math.sin(elapsedTime * 3) * 0.08;
      innerCore.scale.set(coreScale, coreScale, coreScale);
      coreRing.rotation.z += delta * 0.4;

      // Rings animation
      rings.forEach((ring) => {
        ring.mesh.rotation.x += ring.rotSpeedX;
        ring.mesh.rotation.y += ring.rotSpeedY;
        ring.mesh.rotation.z += ring.rotSpeedZ;
      });

      // Particle rotation
      particleSystem.rotation.y -= delta * 0.08;

      // Raycasting for hover state
      raycaster.setFromCamera(mouse, camera);
      const interactiveMeshes = founderNodeMeshes.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hitFounder = intersects[0].object.userData.founder as Founder;
        if (currentHoveredId !== hitFounder.id) {
          currentHoveredId = hitFounder.id;
          setHoveredFounder(hitFounder);
          soundFx.playHover();
          if (onHoverRef.current) {
            onHoverRef.current(hitFounder);
          }
          container.style.cursor = 'pointer';
        }
      } else {
        if (currentHoveredId !== null) {
          currentHoveredId = null;
          setHoveredFounder(null);
          if (onHoverRef.current) {
            onHoverRef.current(null);
          }
          container.style.cursor = 'default';
        }
      }

      // Halos and Nodes pulse
      founderNodeMeshes.forEach((item) => {
        const isHovered = currentHoveredId === item.founder.id;
        const targetScale = isHovered ? 1.5 : 1.0 + Math.sin(elapsedTime * 4 + item.angle) * 0.12;
        item.mesh.scale.set(targetScale, targetScale, targetScale);
        item.halo.rotation.z += delta * (isHovered ? 2.5 : 1.0);
        (item.beam.material as THREE.LineBasicMaterial).opacity = isHovered ? 0.8 : 0.25;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      resizeObserver.disconnect();

      // Dispose Three.js objects
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
          if (obj.geometry) obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handleNodeSelect]);

  return (
    <div
      ref={containerRef}
      id="interactive-3d-reactor-container"
      className={`relative w-full h-full min-h-[420px] flex items-center justify-center select-none ${className}`}
    >
      {/* Fallback if WebGL fails */}
      {hasWebGLError && (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-900/60 border border-cyan-500/30 rounded-2xl max-w-md">
          <div className="w-24 h-24 rounded-full border-4 border-cyan-400 border-dashed animate-spin flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/30 glow-cyan animate-pulse" />
          </div>
          <h4 className="font-orbitron text-lg font-bold text-cyan-300 mb-2">ARC REACTOR ONLINE</h4>
          <p className="text-sm text-slate-400">
            Hardware 2D Fallback Active. System nodes operational.
          </p>
        </div>
      )}

      {/* Hover Floating HUD Tooltip */}
      {hoveredFounder && isReady && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-30 transition-all duration-300 transform scale-100 opacity-100 font-mono"
        >
          <div className="px-4 py-2.5 rounded-none bg-[#0a0a0a] border border-[#00D1FF] backdrop-blur-md shadow-2xl flex items-center gap-3.5">
            <div
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: hoveredFounder.accentHex }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs tracking-wider text-white uppercase">
                  {hoveredFounder.heroCodename}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 border border-white/10 bg-white/5 text-[#00D1FF] uppercase">
                  {hoveredFounder.name}
                </span>
              </div>
              <p className="text-[11px] text-white/50 mt-0.5">
                {hoveredFounder.specialisation}
              </p>
            </div>
            <div className="text-[9px] text-[#00D1FF] bg-white/5 px-2 py-1 border border-white/10 tracking-widest uppercase">
              DOSSIER &rarr;
            </div>
          </div>
        </div>
      )}

      {/* Orbit Guidance HUD */}
      <div className="absolute top-4 right-4 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/10 text-[9px] font-mono text-white/40 tracking-widest uppercase backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse" />
        3D REACTOR // 6 HERO NODES SYNCED
      </div>
    </div>
  );
};
