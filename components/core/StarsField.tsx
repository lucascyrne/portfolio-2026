'use client';

import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

type StarsFieldProps = {
  active?: boolean;
  count?: number;
  heightClassName?: string;
  variant?: 'default' | 'contact';
  drift?: 'up' | 'down' | 'none';
  regionClassName?: string;
};

type Star = {
  leftPct: number;
  topPct: number;
  sizePx: number;
  opacity: number;
  twinkleOpacity: number;
  durationSeconds: number;
  delaySeconds: number;
  driftDurationSeconds: number;
};

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

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function StarsField({
  active = true,
  count = 120,
  heightClassName = 'h-[48%]',
  variant = 'default',
  drift = 'none',
  regionClassName = '',
}: StarsFieldProps) {
  const reducedMotion = useReducedMotion();

  const stars = useMemo<Star[]>(() => {
    if (!active) return [];

    const seed = drift === 'up' ? 1337 : drift === 'down' ? 4242 : 1337;
    const rand = mulberry32(seed);

    return Array.from({ length: count }, () => {
      const opacity = randBetween(rand, 0.16, 0.64);
      const twinkleOpacity = clamp(
        opacity + randBetween(rand, 0.08, 0.22),
        0.06,
        0.85
      );
      const sizePx = randBetween(rand, 0.8, 2.4);

      return {
        leftPct: randBetween(rand, 0, 100),
        topPct: randBetween(rand, 0, 100),
        sizePx,
        opacity,
        twinkleOpacity,
        durationSeconds: randBetween(rand, 3.5, 6.5),
        delaySeconds: randBetween(rand, 0, 6),
        driftDurationSeconds: randBetween(rand, 6, 14),
      } satisfies Star;
    });
  }, [active, count, drift]);

  if (!active) return null;

  const useDrift = drift !== 'none' && !reducedMotion;
  const useTwinkle = drift === 'none' && !reducedMotion;

  return (
    <div
      className={[
        'pointer-events-none overflow-hidden',
        regionClassName || `absolute inset-x-0 top-0 z-0 ${heightClassName}`,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      {stars.map((star, idx) => (
        <span
          key={idx}
          className={[
            'horizon-star',
            variant === 'contact' ? 'horizon-star--contact' : '',
            useDrift && drift === 'up' ? 'horizon-star--drift-up' : '',
            useDrift && drift === 'down' ? 'horizon-star--drift-down' : '',
            useTwinkle ? 'horizon-star--twinkle' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            left: `${star.leftPct}%`,
            top: `${star.topPct}%`,
            width: `${star.sizePx}px`,
            height: `${star.sizePx}px`,
            ['--starOpacity' as string]: star.opacity,
            ['--starTwinkleOpacity' as string]: star.twinkleOpacity,
            animationDuration: useDrift
              ? `${star.driftDurationSeconds}s`
              : `${star.durationSeconds}s`,
            animationDelay: `${star.delaySeconds}s`,
          }}
        />
      ))}
    </div>
  );
}
