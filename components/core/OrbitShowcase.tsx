'use client';

import ProjectCard from '@/components/core/ProjectCard';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type OrbitItem = {
  id: string;
  title: string;
  domain: string;
  problem: string;
  tags: string[];
};

type Point = { x: number; y: number };

const ORBIT_CARD_W = 252;
const ORBIT_CARD_H = 210;

/** Palco central do orbit (projetos e jogos). */
export const ORBIT_CENTER_MAX_WIDTH_CLASS = 'max-w-[1176px] w-full';

type OrbitShowcaseProps = {
  items: OrbitItem[];
  activeId: string;
  onActiveIdChange: (id: string) => void;
  renderCenter: () => ReactNode;
  showReset?: boolean;
  /** Largura máxima do palco central (deve ser menor que o orbit para margem dos cards). */
  centerMaxWidthClass?: string;
};

const OrbitShowcase = ({
  items,
  activeId,
  onActiveIdChange,
  renderCenter,
  showReset = true,
  centerMaxWidthClass = ORBIT_CENTER_MAX_WIDTH_CLASS,
}: OrbitShowcaseProps) => {
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const previewWrapRef = useRef<HTMLDivElement | null>(null);
  const [orbitReady, setOrbitReady] = useState(false);
  const [orbitDragging, setOrbitDragging] = useState(false);
  const [cardPositions, setCardPositions] = useState<Point[]>(
    items.map(() => ({ x: 0, y: 0 }))
  );

  const railRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    isDown: false,
    moved: false,
    startX: 0,
    startScrollLeft: 0,
    pointerId: -1,
  });
  const [isRailDragging, setIsRailDragging] = useState(false);

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
    const count = items.length;
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
    const CENTRAL_PAD = 28;
    const CARD_PAD = 10;

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
        const leftX = clamp(EDGE_PAD, 0, maxX);
        const rightX = clamp(maxX - EDGE_PAD, 0, maxX);
        const x = idx % 2 === 0 ? leftX : rightX;

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
          placed.push({
            x: clamp(x, 0, maxX),
            y: clamp(EDGE_PAD + idx * 12, 0, maxY),
          });
        }
      }
    }

    return Array.from({ length: count }, (_, i) => placed[i] ?? { x: 0, y: 0 });
  }, [items.length, clamp, rectsOverlap]);

  const resetOrbitPositions = useCallback(() => {
    setOrbitReady(false);
    setCardPositions(computeOrbitPositions());
    setOrbitReady(true);
  }, [computeOrbitPositions]);

  useEffect(() => {
    resetOrbitPositions();
  }, [items.length, resetOrbitPositions]);

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      if (orbitDragging) return;
      const rect = el.getBoundingClientRect();
      const maxX = Math.max(0, rect.width - ORBIT_CARD_W);
      const maxY = Math.max(0, rect.height - ORBIT_CARD_H);

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

  const selectItemSafe = (id: string) => {
    if (dragRef.current.moved) return;
    onActiveIdChange(id);
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
    setIsRailDragging(true);
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
    setIsRailDragging(false);

    try {
      railRef.current.releasePointerCapture(e.pointerId);
    } catch {
      // no-op
    }
  };

  return (
    <div className="w-full">
      <div className="hidden lg:block w-full">
        <div
          ref={orbitRef}
          className="relative w-full overflow-hidden"
          style={{ height: 'min(900px, 80vh)' }}
        >
          {showReset && (
            <div className="absolute top-4 left-4 z-[60]">
              <button
                type="button"
                onClick={resetOrbitPositions}
                className="rounded-full border border-border/60 bg-surface-muted px-4 py-2 text-foreground shadow-sm transition-colors duration-200 hover:bg-surface"
              >
                Reset
              </button>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 z-[20] flex items-center justify-center">
            <div
              ref={previewWrapRef}
              className={`pointer-events-auto ${centerMaxWidthClass}`}
            >
              {renderCenter()}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-[30]">
            {orbitReady &&
              items.map((item, idx) => (
                <ProjectCard
                  key={item.id}
                  projectId={item.id}
                  idx={idx}
                  active={item.id === activeId}
                  title={item.title}
                  domain={item.domain}
                  problem={item.problem}
                  tags={item.tags}
                  onSelect={onActiveIdChange}
                  dragEnabled
                  onDragStart={() => setOrbitDragging(true)}
                  onDragEnd={() => setOrbitDragging(false)}
                  position={cardPositions[idx] ?? { x: 0, y: 0 }}
                  boundsRef={orbitRef}
                  onPositionChange={(next) => setCardPositionAtIndex(idx, next)}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-10 lg:hidden">
        {renderCenter()}
        <div
          ref={railRef}
          onPointerDown={onRailPointerDown}
          onPointerMove={onRailPointerMove}
          onPointerUp={onRailPointerUpOrCancel}
          onPointerCancel={onRailPointerUpOrCancel}
          className={[
            'overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            '[touch-action:pan-x]',
            isRailDragging ? 'cursor-grabbing' : 'cursor-grab',
          ].join(' ')}
        >
          <div className="flex gap-5 pb-2">
            {items.map((item, idx) => (
              <ProjectCard
                key={item.id}
                projectId={item.id}
                idx={idx}
                active={item.id === activeId}
                title={item.title}
                domain={item.domain}
                problem={item.problem}
                tags={item.tags}
                onSelect={selectItemSafe}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitShowcase;
