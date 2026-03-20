'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type HorizonLineProps = {
  active?: boolean;
  containerClassName?: string;
  svgClassName?: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export default function HorizonLine({
  active = true,
  containerClassName = 'relative w-screen mt-8 mb-8',
  svgClassName = 'w-full h-6 mx-auto pointer-events-none',
}: HorizonLineProps) {
  const reducedMotion = useReducedMotion();

  const pathMainRef = useRef<SVGPathElement | null>(null);
  const pathGhostRef = useRef<SVGPathElement | null>(null);

  const rafIdRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const pathMain = pathMainRef.current;
    const pathGhost = pathGhostRef.current;
    if (!pathMain || !pathGhost) return;

    if (!active || reducedMotion) {
      const baseD = 'M0,5 C25,3 75,7 100,5';
      pathMain.setAttribute('d', baseD);
      pathGhost.setAttribute('d', baseD);
      return;
    }

    const baseY = 5;
    // amplitude e velocidade em modo "mar ao longe" (mais perceptível).
    const ampMain = 3.64; // +100%
    const ampGhost = 2.4; // +100%

    // Mais pontos ao longo do eixo X => captura variações locais.
    const pointCount = 24;
    const xs = Array.from(
      { length: pointCount },
      (_, i) => (100 * i) / (pointCount - 1)
    );

    // Calcula uma ondulação orgânica e suave (determinística por tempo + posição).
    const calcY = (x: number, tSeconds: number, amp: number) => {
      const xn = x / 100; // normaliza 0..1

      // Combina ondas de diferentes escalas para gerar uma “forma viva”
      // sem depender de poucos pontos de controle.
      // Velocidade 100% maior.
      const t = tSeconds * 0.62;

      const w1 = Math.sin(t * 0.45 + xn * 10.0);
      const w2 = Math.sin(t * 0.7 + xn * 18.0 + 1.35);
      const w3 = Math.sin(t * 0.28 + xn * 6.2 + 0.2);

      const y = baseY + amp * (0.55 * w1 + 0.3 * w2 + 0.15 * w3);
      return clamp(y, 0.0, 10.0);
    };

    // Converte uma sequência de pontos (Catmull-Rom) em curva de Bezier suavizada.
    const buildSmoothPath = (ys: number[]) => {
      const points = xs.map((x, i) => ({ x, y: ys[i] }));
      let d = `M${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`;

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] ?? points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] ?? p2;

        const c1x = p1.x + (p2.x - p0.x) / 6;
        const c1y = p1.y + (p2.y - p0.y) / 6;
        const c2x = p2.x - (p3.x - p1.x) / 6;
        const c2y = p2.y - (p3.y - p1.y) / 6;

        d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(
          2
        )},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
      }

      return d;
    };

    const loop = (nowMs: number) => {
      if (!startTimeRef.current) startTimeRef.current = nowMs;
      const elapsedSeconds = (nowMs - startTimeRef.current) / 1000;

      // Throttle leve (~40fps) para manter custo baixo.
      if (nowMs - lastTickRef.current >= 25) {
        lastTickRef.current = nowMs;

        const ysMain = xs.map((x) => calcY(x, elapsedSeconds, ampMain));
        const ysGhost = xs.map((x) => calcY(x, elapsedSeconds, ampGhost));

        pathMain.setAttribute('d', buildSmoothPath(ysMain));
        pathGhost.setAttribute('d', buildSmoothPath(ysGhost));
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      lastTickRef.current = 0;
      startTimeRef.current = 0;
    };
  }, [active, reducedMotion]);

  return (
    <div className={containerClassName}>
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className={svgClassName}
        aria-hidden="true"
        focusable="false"
      >
        {/* Camada fantasma (profundidade): mais sutil e menos opaca */}
        <path
          ref={pathGhostRef}
          d="M0,5 C25,3 75,7 100,5"
          fill="none"
          stroke="var(--color-horizon-stroke)"
          strokeWidth="0.22"
          strokeOpacity="0.13"
          strokeLinecap="round"
        />
        {/* Camada principal: contraste mínimo e perceptível */}
        <path
          ref={pathMainRef}
          d="M0,5 C25,3 75,7 100,5"
          fill="none"
          stroke="var(--color-horizon-stroke)"
          strokeWidth="0.38"
          strokeOpacity="0.78"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
