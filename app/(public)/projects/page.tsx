'use client';

import Gowdock from '@/public/assets/icons/gowdock-logo.svg';
import NovoAtacarejo from '@/public/assets/icons/novo-atacarejo-logo.svg';
import LucidDreams from '@/public/assets/icons/lucid-dreams-logo.svg';
import GeniusLine from '@/public/assets/icons/geniusline-icon.svg';
import Lovepay from '@/public/assets/icons/lovepay-icon.svg';
import SGA from '@/public/assets/icons/sga-icon.png';
import Rainbet from '@/public/assets/icons/rainbet-icon.png';
import Aoro from '@/public/assets/icons/aoro-icon.png';
import useCustomCursor from '@/resources/hooks/useCustomCursor';
import useRevealText from '@/resources/hooks/useRevealText';
import { useI18n } from '@/resources/i18n';
import ProjectStickyPreview from '@/components/core/ProjectStickyPreview';
import PartnersCarousel from '@/components/core/PartnersCarousel';
import ProjectCard from '@/components/core/ProjectCard';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Point = { x: number; y: number };

// Dimensões do `ProjectCard` no breakpoint `sm` (no orbit usamos `lg+`, então `sm:*` vale).
const ORBIT_CARD_W = 252;
const ORBIT_CARD_H = 210;

// Largura máxima do wrapper do vídeo central (preserva proporção 16:9).
const ORBIT_VIDEO_MAX_W = 980;

const Work = () => {
  const { projects, t } = useI18n();
  const partners = [
    Gowdock,
    NovoAtacarejo,
    LucidDreams,
    GeniusLine,
    Lovepay,
    SGA,
    Rainbet,
    Aoro,
  ];
  const cursorRef = useCustomCursor();
  useRevealText();

  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) ?? projects[0],
    [activeProjectId, projects]
  );

  // Mobile: seleção do projeto é feita por clique (não por IntersectionObserver).
  const railRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    isDown: false,
    moved: false,
    startX: 0,
    startScrollLeft: 0,
    pointerId: -1,
  });
  const [isDragging, setIsDragging] = useState(false);

  const selectProjectSafe = (projectId: string) => {
    // Se o usuário efetivamente arrastou (moved), não disparamos seleção.
    // Isso evita "clique virar drag" em trackpads.
    if (dragRef.current.moved) return;
    setActiveProjectId(projectId);
  };

  const onRailPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!railRef.current) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest('button')) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    railRef.current.setPointerCapture(e.pointerId);
    dragRef.current.isDown = true;
    dragRef.current.moved = false;
    dragRef.current.startX = e.clientX;
    dragRef.current.startScrollLeft = railRef.current.scrollLeft;
    dragRef.current.pointerId = e.pointerId;
    setIsDragging(true);
  };

  const onRailPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!railRef.current) return;
    if (!dragRef.current.isDown) return;
    if (dragRef.current.pointerId !== e.pointerId) return;

    const dx = e.clientX - dragRef.current.startX;
    if (!dragRef.current.moved && Math.abs(dx) > 10) {
      dragRef.current.moved = true;
    }

    railRef.current.scrollLeft = dragRef.current.startScrollLeft - dx;
  };

  const onRailPointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!railRef.current) return;
    if (dragRef.current.pointerId !== e.pointerId) return;

    dragRef.current.isDown = false;
    dragRef.current.pointerId = -1;
    dragRef.current.moved = false;
    setIsDragging(false);

    try {
      railRef.current.releasePointerCapture(e.pointerId);
    } catch {
      // no-op
    }
  };

  // Desktop: "orbit" (vídeo central + cards arrastáveis em torno).
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const previewWrapRef = useRef<HTMLDivElement | null>(null);
  const [orbitReady, setOrbitReady] = useState(false);
  const [orbitDragging, setOrbitDragging] = useState(false);
  const [cardPositions, setCardPositions] = useState<Point[]>(
    projects.map(() => ({ x: 0, y: 0 }))
  );

  const clamp = useCallback((v: number, min: number, max: number) => {
    return Math.min(max, Math.max(min, v));
  }, []);

  const rectsOverlap = useCallback(
    (
      a: { left: number; right: number; top: number; bottom: number },
      b: { left: number; right: number; top: number; bottom: number }
    ) => {
      return (
        a.left < b.right &&
        a.right > b.left &&
        a.top < b.bottom &&
        a.bottom > b.top
      );
    },
    []
  );

  const computeOrbitPositions = useCallback((): Point[] => {
    const orbitEl = orbitRef.current;
    const previewEl = previewWrapRef.current;
    const count = projects.length;
    if (!orbitEl || !previewEl || count <= 0) {
      return Array.from({ length: count }, () => ({ x: 0, y: 0 }));
    }

    const orbitRect = orbitEl.getBoundingClientRect();
    const previewRect = previewEl.getBoundingClientRect();

    const orbitW = orbitRect.width;
    const orbitH = orbitRect.height;

    const maxX = Math.max(0, orbitW - ORBIT_CARD_W);
    const maxY = Math.max(0, orbitH - ORBIT_CARD_H);

    const EDGE_PAD = 28;
    const CENTRAL_PAD = 28; // evita cards "sob o vídeo"
    const CARD_PAD = 10; // evita sobreposição entre cards

    // Retângulo proibido (preview) em coordenadas locais do orbit.
    const forbidden = {
      left: previewRect.left - orbitRect.left - CENTRAL_PAD,
      right: previewRect.right - orbitRect.left + CENTRAL_PAD,
      top: previewRect.top - orbitRect.top - CENTRAL_PAD,
      bottom: previewRect.bottom - orbitRect.top + CENTRAL_PAD,
    };

    const randomBetween = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const placeForSide = (idx: number) => {
      const side = Math.random() < 0.5 ? 'left' : 'right';

      const xMin = side === 'left' ? 0 + EDGE_PAD : forbidden.right + CARD_PAD;
      const xMax =
        side === 'left'
          ? forbidden.left - CARD_PAD - ORBIT_CARD_W
          : maxX - EDGE_PAD;

      if (xMax <= xMin) {
        // tenta a outra lateral se a escolhida não couber
        const fallbackSide = side === 'left' ? 'right' : 'left';
        const altXMin =
          fallbackSide === 'left' ? 0 + EDGE_PAD : forbidden.right + CARD_PAD;
        const altXMax =
          fallbackSide === 'left'
            ? forbidden.left - CARD_PAD - ORBIT_CARD_W
            : maxX - EDGE_PAD;
        return { xMin: altXMin, xMax: altXMax };
      }
      return { xMin, xMax };
    };

    const isForbidden = (x: number, y: number) => {
      const card = {
        left: x - CARD_PAD,
        right: x + ORBIT_CARD_W + CARD_PAD,
        top: y - CARD_PAD,
        bottom: y + ORBIT_CARD_H + CARD_PAD,
      };
      return rectsOverlap(card, forbidden);
    };

    const placed: Point[] = [];
    const attemptsPerCard = 80;

    for (let idx = 0; idx < count; idx++) {
      let placedThis = false;

      for (let attempt = 0; attempt < attemptsPerCard; attempt++) {
        const { xMin, xMax } = placeForSide(idx);
        if (xMax <= xMin) break;

        // Bagunça controlada: enviesar metade superior/ inferior
        const biasTop = idx % 2 === 0 ? 0.7 : 0.3;
        const yRangeMin = 0 + EDGE_PAD;
        const yRangeMax = maxY - EDGE_PAD;
        if (yRangeMax <= yRangeMin) break;

        const rand01 = Math.random();
        const yBias =
          rand01 < biasTop
            ? randomBetween(
                yRangeMin,
                yRangeMin + (yRangeMax - yRangeMin) * 0.55
              )
            : randomBetween(
                yRangeMin + (yRangeMax - yRangeMin) * 0.35,
                yRangeMax
              );

        const x = randomBetween(xMin, xMax);
        const y = yBias;

        if (x < 0 || y < 0 || x > maxX || y > maxY) continue;
        if (isForbidden(x, y)) continue;

        // Evita sobreposição entre cards (AABB)
        const candidate = {
          left: x - CARD_PAD,
          right: x + ORBIT_CARD_W + CARD_PAD,
          top: y - CARD_PAD,
          bottom: y + ORBIT_CARD_H + CARD_PAD,
        };
        let overlaps = false;
        for (const prev of placed) {
          const prevRect = {
            left: prev.x - CARD_PAD,
            right: prev.x + ORBIT_CARD_W + CARD_PAD,
            top: prev.y - CARD_PAD,
            bottom: prev.y + ORBIT_CARD_H + CARD_PAD,
          };
          if (rectsOverlap(candidate, prevRect)) {
            overlaps = true;
            break;
          }
        }
        if (overlaps) continue;

        placed.push({ x, y });
        placedThis = true;
        break;
      }

      if (!placedThis) {
        // Fallback determinístico: coloca em varredura lateral e top/bottom.
        const leftX = clamp(EDGE_PAD, 0, maxX);
        const rightX = clamp(maxX - EDGE_PAD, 0, maxX);
        const x = idx % 2 === 0 ? leftX : rightX;

        // varre y com passo e escolhe primeiro que não colida
        const step = 16;
        let found = false;
        for (let y = EDGE_PAD; y <= maxY - EDGE_PAD; y += step) {
          if (isForbidden(x, y)) continue;
          const candidate = {
            left: x - CARD_PAD,
            right: x + ORBIT_CARD_W + CARD_PAD,
            top: y - CARD_PAD,
            bottom: y + ORBIT_CARD_H + CARD_PAD,
          };
          let overlaps = false;
          for (const prev of placed) {
            const prevRect = {
              left: prev.x - CARD_PAD,
              right: prev.x + ORBIT_CARD_W + CARD_PAD,
              top: prev.y - CARD_PAD,
              bottom: prev.y + ORBIT_CARD_H + CARD_PAD,
            };
            if (rectsOverlap(candidate, prevRect)) {
              overlaps = true;
              break;
            }
          }
          if (overlaps) continue;
          placed.push({ x, y });
          found = true;
          break;
        }

        if (!found) {
          // Último recurso: ainda evita o forbidden e mantém dentro dos limites.
          placed.push({
            x: clamp(x, 0, maxX),
            y: clamp(EDGE_PAD + idx * 12, 0, maxY),
          });
        }
      }
    }

    // Garante que o retorno tem o tamanho esperado.
    return Array.from({ length: count }, (_, i) => placed[i] ?? { x: 0, y: 0 });
  }, [projects.length, clamp, rectsOverlap]);

  const resetOrbitPositions = useCallback(() => {
    setOrbitReady(false);
    setCardPositions(computeOrbitPositions());
    setOrbitReady(true);
  }, [computeOrbitPositions]);

  useEffect(() => {
    resetOrbitPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects.length]);

  // Recalcula as posições ao redimensionar, mas não durante drag.
  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      if (orbitDragging) return;
      const rect = el.getBoundingClientRect();
      const maxX = Math.max(0, rect.width - ORBIT_CARD_W);
      const maxY = Math.max(0, rect.height - ORBIT_CARD_H);

      // Mantém as posições definidas pelo usuário, só corrige overflow.
      setCardPositions((prev) =>
        prev.map((p) => ({
          x: clamp(p.x, 0, maxX),
          y: clamp(p.y, 0, maxY),
        }))
      );
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [orbitDragging, clamp]);

  const setCardPositionAtIndex = useCallback((idx: number, next: Point) => {
    setCardPositions((prev) => prev.map((p, i) => (i === idx ? next : p)));
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <div ref={cursorRef} className="reveal-cursor"></div>
      <section className="px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="font-inria text-4xl md:text-5xl font-bold">
                {t('projects.title')}
              </h1>
              <p className="mt-3 max-w-[62ch] text-balance leading-relaxed text-muted">
                {t('projects.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 pb-16">
        {/* Desktop orbit */}
        <div className="hidden lg:block w-full">
          <div
            ref={orbitRef}
            className="relative w-full overflow-hidden"
            style={{ height: 'min(900px, 80vh)' }}
          >
            <div className="absolute top-4 left-4 z-[60]">
              <button
                type="button"
                onClick={resetOrbitPositions}
                className="rounded-full px-4 py-2 bg-surface-muted text-foreground border border-border/60 shadow-sm hover:bg-surface transition-colors duration-200"
              >
                Reset
              </button>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-[20] pointer-events-none">
              <div
                ref={previewWrapRef}
                className="w-full max-w-[1176px] pointer-events-auto"
              >
                {activeProject && (
                  <ProjectStickyPreview project={activeProject} />
                )}
              </div>
            </div>

            {/* Cards */}
            <div className="absolute inset-0 z-[30]">
              {orbitReady &&
                projects.map((p, idx) => (
                  <ProjectCard
                    key={p.id}
                    projectId={p.id}
                    idx={idx}
                    active={p.id === activeProjectId}
                    title={p.title}
                    domain={p.domain}
                    problem={p.problem}
                    tags={p.tags}
                    onSelect={(id) => setActiveProjectId(id)}
                    dragEnabled
                    onDragStart={() => setOrbitDragging(true)}
                    onDragEnd={() => setOrbitDragging(false)}
                    position={cardPositions[idx] ?? { x: 0, y: 0 }}
                    boundsRef={orbitRef}
                    onPositionChange={(next) =>
                      setCardPositionAtIndex(idx, next)
                    }
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden w-full flex flex-col gap-10">
          {/* Video above */}
          {activeProject && (
            <ProjectStickyPreview project={activeProject} />
          )}

          {/* Horizontal rail */}
          <div
            ref={railRef}
            onPointerDown={onRailPointerDown}
            onPointerMove={onRailPointerMove}
            onPointerUp={onRailPointerUpOrCancel}
            onPointerCancel={onRailPointerUpOrCancel}
            className={[
              'overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
              '[touch-action:pan-x]',
              isDragging ? 'cursor-grabbing' : 'cursor-grab',
            ].join(' ')}
          >
            <div className="flex gap-5 pb-2">
              {projects.map((p, idx) => (
                <ProjectCard
                  key={p.id}
                  projectId={p.id}
                  idx={idx}
                  active={p.id === activeProjectId}
                  title={p.title}
                  domain={p.domain}
                  problem={p.problem}
                  tags={p.tags}
                  onSelect={selectProjectSafe}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-6">
            <div>
              <h2 className="font-inria text-3xl font-bold">
                {t('projects.customersTitle')}
              </h2>
              <p className="mt-2 text-muted">
                {t('projects.customersSubtitle')}
              </p>
            </div>
          </div>
          <PartnersCarousel logos={partners} />
        </div>
      </section>
    </main>
  );
};

export default Work;
