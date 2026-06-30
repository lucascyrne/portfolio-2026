'use client';

import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

import { preloadIconTextures } from '@/resources/how-we-work/icon-texture';
import { useTheme } from '@/resources/theme/theme-context';
import {
  TECH_STACK,
  type TechCategoryId,
  type TechStackItem,
} from '@/resources/how-we-work/tech-stack';

const PRIMARY = '#F3407E';
const RADIUS = 1.75;

type NodePosition = [number, number, number];

function fibonacciSphere(count: number, radius: number): NodePosition[] {
  const phi = (1 + Math.sqrt(5)) / 2;
  return Array.from({ length: count }, (_, i) => {
    const t = (2 * Math.PI * i) / phi;
    const p = Math.acos(1 - (2 * (i + 0.5)) / count);
    return [
      radius * Math.cos(t) * Math.sin(p),
      radius * Math.sin(t) * Math.sin(p),
      radius * Math.cos(p),
    ];
  });
}

function faceOut(position: NodePosition): THREE.Quaternion {
  return new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(...position).normalize()
  );
}

function faceCamera(position: NodePosition): THREE.Quaternion {
  return new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(...position).normalize(),
    new THREE.Vector3(0, 0, 1)
  );
}

function TechNode({
  item,
  position,
  texture,
  activeCategory,
  hovered,
  onHover,
}: {
  item: TechStackItem;
  position: NodePosition;
  texture: THREE.CanvasTexture;
  activeCategory: TechCategoryId | 'all';
  hovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const active = activeCategory === 'all' || item.category === activeCategory;
  const opacity = active ? 1 : 0.12;
  const scale = active ? (hovered ? 1.18 : 1) : 0.52;

  return (
    <group position={position} quaternion={faceOut(position)} scale={scale}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          if (active) onHover(item.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        <circleGeometry args={[0.13, 32]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={opacity}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

type TechGlobeSceneProps = {
  activeCategory: TechCategoryId | 'all';
  idle: boolean;
};

export default function TechGlobeScene({ activeCategory, idle }: TechGlobeSceneProps) {
  const { theme } = useTheme();
  const groupRef = useRef<THREE.Group>(null);
  const [textures, setTextures] = useState<Map<string, THREE.CanvasTexture> | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const tourIndex = useRef(0);
  const tourTimer = useRef(0);
  const tourTarget = useRef(new THREE.Quaternion());

  const positions = useMemo(() => fibonacciSphere(TECH_STACK.length, RADIUS), []);

  useEffect(() => {
    let cancelled = false;
    preloadIconTextures(TECH_STACK, theme).then((map) => {
      if (!cancelled) setTextures(map);
    });
    return () => {
      cancelled = true;
    };
  }, [theme]);

  useEffect(() => {
    tourIndex.current = 0;
    tourTimer.current = 0;
    tourTarget.current = faceCamera(positions[0]!);
    groupRef.current?.quaternion.copy(tourTarget.current);
  }, [activeCategory, positions]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group || !idle || dragging || hoveredId) return;

    tourTimer.current += delta;
    if (tourTimer.current >= 4.5) {
      tourTimer.current = 0;
      tourIndex.current = (tourIndex.current + 1) % TECH_STACK.length;
      tourTarget.current = faceCamera(positions[tourIndex.current]!);
    }
    group.quaternion.slerp(tourTarget.current, delta * 0.6);
  });

  if (!textures) return null;

  return (
    <>
      <ambientLight intensity={0.7} />

      <group ref={groupRef}>
        <mesh renderOrder={0}>
          <sphereGeometry args={[RADIUS, 32, 32]} />
          <meshBasicMaterial
            color={PRIMARY}
            wireframe
            transparent
            opacity={0.2}
            depthWrite={false}
          />
        </mesh>

        {TECH_STACK.map((item, i) => {
          const texture = textures.get(item.id);
          if (!texture) return null;
          return (
            <TechNode
              key={item.id}
              item={item}
              position={positions[i]!}
              texture={texture}
              activeCategory={activeCategory}
              hovered={hoveredId === item.id}
              onHover={setHoveredId}
            />
          );
        })}
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
        onStart={() => setDragging(true)}
        onEnd={() => setDragging(false)}
      />
    </>
  );
}
