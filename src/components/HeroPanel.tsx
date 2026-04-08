"use client";

import { useMemo, useRef } from "react";
import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";
import { COSMIC_SCENES } from "@/lib/cosmicScenes";

function StarField({
  scene,
  radius,
  speed,
  opacity,
  size,
}: {
  scene: (typeof COSMIC_SCENES)[0];
  radius: [number, number];
  speed: number;
  opacity: number;
  size: number;
}) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(scene.particleCount * 3);
    for (let i = 0; i < scene.particleCount; i += 1) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius[0] + Math.random() * (radius[1] - radius[0]);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [radius, scene]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * speed;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={scene.particleColor}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  );
}

function NebulaCore({ scene }: { scene: (typeof COSMIC_SCENES)[0] }) {
  const ref = useRef<THREE.Mesh>(null!);
  const haloRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const material = ref.current?.material as THREE.MeshStandardMaterial | undefined;
    const haloMaterial = haloRef.current?.material as THREE.MeshBasicMaterial | undefined;
    if (!ref.current || !material || !haloRef.current || !haloMaterial) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = state.clock.elapsedTime * 0.02;
    haloRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    const pulse = 0.14 + Math.sin(state.clock.elapsedTime * 0.7) * 0.03;
    material.opacity = pulse;
    haloMaterial.opacity = pulse * 0.7;
  });

  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.95, 42, 42]} />
        <meshStandardMaterial
          color={scene.nebulaColor}
          emissive={scene.nebulaColor}
          emissiveIntensity={0.45}
          roughness={0.5}
          metalness={0.08}
          transparent
          opacity={0.16}
        />
      </mesh>
      <mesh ref={haloRef}>
        <sphereGeometry args={[1.28, 36, 36]} />
        <meshBasicMaterial color={scene.particleColor} transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function CometTrail({
  color,
  count,
  speed,
}: {
  color: string;
  count: number;
  speed: number;
}) {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 5 - 2.5,
        y: Math.random() * 2.2 - 1.1,
        z: Math.random() * 2 - 1.2,
        offset: Math.random() * Math.PI * 2,
        scale: 0.02 + Math.random() * 0.03,
      })),
    [count]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const dummy = new THREE.Object3D();
    const t = state.clock.elapsedTime;
    seeds.forEach((seed, i) => {
      const progress = ((t * speed + seed.offset) % 1) * 1.4;
      dummy.position.set(seed.x - progress * 2.4, seed.y + progress * 0.7, seed.z);
      dummy.scale.set(seed.scale * 2.4, seed.scale * 0.55, seed.scale);
      dummy.rotation.z = -0.55;
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </instancedMesh>
  );
}

export function HeroPanel({ month }: { month: number }) {
  const scene = COSMIC_SCENES[month];
  const winterMode = month === 10 || month === 11 || month === 0;
  const meteorMode = month === 7;
  const calmMode = month === 2 || month === 5;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-t-2xl bg-[#060810]">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        dpr={[1, 2]}
        fallback={<div className="h-full w-full bg-[#060810]" />}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#05070f", 2.4, 6.2]} />
          <ambientLight intensity={winterMode ? 0.4 : 0.32} />
          <directionalLight
            position={[2, 1.5, 2.8]}
            intensity={winterMode ? 0.68 : 0.55}
            color={scene.particleColor}
          />
          <pointLight
            position={[-1.4, -0.8, 1.8]}
            intensity={calmMode ? 0.34 : 0.45}
            color={scene.nebulaColor}
          />
          <StarField
            scene={scene}
            radius={winterMode ? [1.35, 2.55] : [1.45, 2.5]}
            speed={calmMode ? 0.013 : 0.02}
            opacity={winterMode ? 0.86 : 0.72}
            size={winterMode ? 0.01 : 0.009}
          />
          <StarField
            scene={scene}
            radius={meteorMode ? [0.82, 1.45] : [0.9, 1.65]}
            speed={meteorMode ? 0.065 : 0.045}
            opacity={meteorMode ? 0.98 : 0.95}
            size={meteorMode ? 0.013 : 0.012}
          />
          <NebulaCore scene={scene} />
          {meteorMode && <CometTrail color={scene.particleColor} count={18} speed={0.22} />}
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.14),transparent_56%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,20,0.14),rgba(8,10,20,0.45))]" />
      <div className="absolute bottom-4 left-5 font-sans text-xs uppercase tracking-widest text-white/50">
        {scene.description}
      </div>
    </div>
  );
}
