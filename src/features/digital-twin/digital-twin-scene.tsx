"use client";

import { Suspense, useEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { twinFloors } from "./data";
import { useTwinStore } from "./twin-store";
import type { CameraPreset, TwinZone } from "./types";

function CameraRig({ preset }: { preset: CameraPreset }) {
  const { camera } = useThree();
  useEffect(() => {
    const positions: Record<CameraPreset, [number, number, number]> = {
      overview: [10, 8, 11],
      front: [0, 4, 15],
      top: [0, 16, 0.1],
      floor: [8, 3.5, 8]
    };
    camera.position.set(...positions[preset]);
    camera.lookAt(0, 1.5, 0);
    camera.updateProjectionMatrix();
  }, [camera, preset]);
  return null;
}

function intensityColor(value: number) {
  const low = new THREE.Color("#4ade80");
  const mid = new THREE.Color("#facc15");
  const high = new THREE.Color("#fb7185");
  return value < 0.55 ? low.clone().lerp(mid, value / 0.55) : mid.clone().lerp(high, (value - 0.55) / 0.45);
}

function ZoneMesh({ zone, yOffset }: { zone: TwinZone; yOffset: number }) {
  const selectedZone = useTwinStore((state) => state.selectedZone);
  const setSelectedZone = useTwinStore((state) => state.setSelectedZone);
  const color = useMemo(() => intensityColor(zone.intensity), [zone.intensity]);
  const selected = selectedZone === zone.id;

  return (
    <group position={[zone.position[0], zone.position[1] + yOffset, zone.position[2]]}>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          setSelectedZone(zone.id);
        }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={zone.size} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={selected ? 0.85 : 0.25}
          roughness={0.48}
          metalness={0.08}
          transparent
          opacity={0.9}
        />
      </mesh>
      <Html position={[0, 0.55, 0]} center distanceFactor={10}>
        <button
          type="button"
          onClick={() => setSelectedZone(zone.id)}
          className="min-w-28 rounded-xl border border-white/15 bg-slate-950/85 px-3 py-2 text-left text-[11px] text-slate-100 shadow-xl backdrop-blur"
        >
          <span className="block font-semibold">{zone.label}</span>
          <span className="mt-0.5 block text-slate-300">{Math.round(zone.intensity * 100)}% load</span>
          {zone.alert ? <span className="mt-1 block text-rose-300">Attention required</span> : null}
        </button>
      </Html>
      {zone.alert ? (
        <mesh position={[zone.size[0] / 2 - 0.35, 0.45, zone.size[2] / 2 - 0.35]}>
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshStandardMaterial color="#fb7185" emissive="#fb7185" emissiveIntensity={2.4} />
        </mesh>
      ) : null}
    </group>
  );
}

function BuildingModel() {
  const exploded = useTwinStore((state) => state.exploded);
  const selectedFloor = useTwinStore((state) => state.selectedFloor);
  const setSelectedZone = useTwinStore((state) => state.setSelectedZone);

  return (
    <group onPointerMissed={() => setSelectedZone(null)}>
      {twinFloors.map((floor) => {
        const yOffset = exploded ? floor.level * 0.8 : 0;
        const hidden = selectedFloor !== null && selectedFloor !== floor.level;
        if (hidden) return null;
        return (
          <group key={floor.id}>
            {floor.zones.map((zone) => <ZoneMesh key={zone.id} zone={zone} yOffset={yOffset} />)}
            <mesh position={[0, floor.level * 1.25 + yOffset - 0.32, 0]} receiveShadow>
              <boxGeometry args={[8.9, 0.12, 3.65]} />
              <meshStandardMaterial color="#0f172a" roughness={0.72} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function DigitalTwinScene() {
  const performanceMode = useTwinStore((state) => state.performanceMode);
  const cameraPreset = useTwinStore((state) => state.cameraPreset);
  const dpr: [number, number] = performanceMode === "quality" ? [1, 2] : performanceMode === "balanced" ? [1, 1.5] : [0.75, 1];

  return (
    <div className="h-[560px] overflow-hidden rounded-[28px] border border-border bg-slate-950">
      <Canvas shadows dpr={dpr} camera={{ position: [10, 8, 11], fov: 43 }}>
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 16, 28]} />
        <ambientLight intensity={1.2} />
        <directionalLight castShadow position={[8, 13, 8]} intensity={2.8} shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-7, 5, -5]} color="#38bdf8" intensity={10} distance={22} />
        <Suspense fallback={null}>
          <BuildingModel />
          <ContactShadows position={[0, -0.45, 0]} opacity={0.65} scale={18} blur={2.8} far={10} />
          {performanceMode !== "economy" ? <Environment preset="city" /> : null}
          {performanceMode === "quality" ? (
            <EffectComposer>
              <Bloom intensity={0.55} luminanceThreshold={0.45} />
              <Noise opacity={0.025} />
              <Vignette eskil={false} offset={0.15} darkness={0.75} />
            </EffectComposer>
          ) : null}
        </Suspense>
        <CameraRig preset={cameraPreset} />
        <OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={7} maxDistance={24} maxPolarAngle={Math.PI / 2.02} />
      </Canvas>
    </div>
  );
}
