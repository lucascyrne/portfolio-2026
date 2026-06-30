'use client';

import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

import type { TechCategoryId } from '@/resources/how-we-work/tech-stack';
import TechGlobeScene from './TechGlobeScene';

type TechGlobeCanvasProps = {
  activeCategory: TechCategoryId | 'all';
};

export default function TechGlobeCanvas({ activeCategory }: TechGlobeCanvasProps) {
  const [onGlobe, setOnGlobe] = useState(false);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[min(100%,480px)]"
      onPointerEnter={() => setOnGlobe(true)}
      onPointerLeave={() => setOnGlobe(false)}
      role="img"
      aria-label="Globo interativo de tecnologias"
    >
      <div
        className="pointer-events-none absolute inset-[6%] rounded-full bg-gradient-to-b from-primary/[0.06] via-transparent to-primary/[0.03]"
        aria-hidden
      />
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <TechGlobeScene activeCategory={activeCategory} idle={!onGlobe} />
      </Canvas>
      <div
        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_40%,transparent_42%,hsl(var(--background)/0.35)_100%)]"
        aria-hidden
      />
    </div>
  );
}
