'use client';

import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

type StarsFieldProps = {
  active?: boolean;
  count?: number;
  // Altura da área onde as estrelas são distribuídas (relativa ao container).
  heightClassName?: string;
  variant?: 'default' | 'contact';
};

type Star = {
  leftPct: number;
  topPct: number;
  sizePx: number;
  opacity: number;
  twinkleOpacity: number;
  durationSeconds: number;
  delaySeconds: number;
};

// PRNG determinístico para evitar mismatch entre SSR/CSR.
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randBetween(rand: () => number, min: number, max: number) {
  return min + (max - min) * rand();
}

export default function StarsField({
  active = true,
  count = 120,
  heightClassName = 'h-[48%]',
  variant = 'default',
}: StarsFieldProps) {
  const reducedMotion = useReducedMotion();

  const stars = useMemo<Star[]>(() => {
    if (!active) return [];

    const rand = mulberry32(1337);

    return Array.from({ length: count }, (_, i) => {
      const opacity = randBetween(rand, 0.16, 0.64);
      const twinkleOpacity = clamp(
        opacity + randBetween(rand, 0.08, 0.22),
        0.06,
        0.85
      );

      // Tamanho minúsculo, com leve variação.
      const sizePx = randBetween(rand, 0.8, 2.4);

      return {
        // Distribuição uniforme em [%], dentro da área superior do Hero.
        leftPct: randBetween(rand, 0, 100),
        topPct: randBetween(rand, 0, 100),
        sizePx,
        opacity,
        twinkleOpacity,
        // Twinkle leve e com fase diferente em cada estrela.
        durationSeconds: randBetween(rand, 3.5, 6.5),
        delaySeconds: randBetween(rand, 0, 6),
        // (i) fica apenas para chave: sem usar diretamente nos valores.
      } satisfies Star;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, count]);

  if (!active) return null;

  return (
    <div
      className={`absolute inset-x-0 top-0 pointer-events-none overflow-hidden ${heightClassName} z-0`}
      aria-hidden="true"
    >
      {stars.map((star, idx) => (
        <span
          key={idx}
          className={`horizon-star ${variant === 'contact' ? 'horizon-star--contact' : ''} ${reducedMotion ? '' : 'horizon-star--twinkle'}`}
          style={{
            left: `${star.leftPct}%`,
            top: `${star.topPct}%`,
            width: `${star.sizePx}px`,
            height: `${star.sizePx}px`,
            // Custom props consumidas pelos keyframes.
            ['--starOpacity' as any]: star.opacity,
            ['--starTwinkleOpacity' as any]: star.twinkleOpacity,
            animationDuration: `${star.durationSeconds}s`,
            animationDelay: `${star.delaySeconds}s`,
          }}
        />
      ))}
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
