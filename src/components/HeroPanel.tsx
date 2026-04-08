"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";
import { COSMIC_SCENES } from "@/lib/cosmicScenes";

function StarField({ scene }: { scene: (typeof COSMIC_SCENES)[0] }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(scene.particleCount * 3);
    for (let i = 0; i < scene.particleCount; i += 1) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 1.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [scene]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={scene.particleColor}
        size={0.008}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

function NebulaCloud({ scene }: { scene: (typeof COSMIC_SCENES)[0] }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const material = ref.current?.material as THREE.MeshBasicMaterial | undefined;
    if (!ref.current || !material) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.005;
    material.opacity = 0.06 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial color={scene.nebulaColor} transparent opacity={0.06} />
    </mesh>
  );
}

export function HeroPanel({ month }: { month: number }) {
  const scene = COSMIC_SCENES[month];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-t-2xl bg-[#060810]">
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.1} />
        <StarField scene={scene} />
        <NebulaCloud scene={scene} />
      </Canvas>
      <div className="absolute bottom-4 left-5 font-sans text-xs uppercase tracking-widest text-white/50">
        {scene.description}
      </div>
    </div>
  );
}
