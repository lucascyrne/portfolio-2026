'use client';

import { useRef, useState } from 'react';
import type { RefObject } from 'react';

type ProjectCardProps = {
  projectId: string;
  idx: number;
  active: boolean;
  title: string;
  domain: string;
  problem: string;
  tags: string[];
  onSelect: (projectId: string) => void;
  // Drag (opcional): usado na versão "orbit" dos projetos.
  dragEnabled?: boolean;
  position?: { x: number; y: number };
  boundsRef?: RefObject<HTMLDivElement | null>;
  onPositionChange?: (next: { x: number; y: number }) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
};

export default function ProjectCard({
  projectId,
  idx,
  active,
  title,
  domain,
  problem,
  tags,
  onSelect,
  dragEnabled = false,
  position,
  boundsRef,
  onPositionChange,
  onDragStart,
  onDragEnd,
}: ProjectCardProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    pointerId: -1,
    moved: false,
    startPointerX: 0,
    startPointerY: 0,
    startPosX: 0,
    startPosY: 0,
  });

  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  const canDrag =
    dragEnabled &&
    !!position &&
    !!boundsRef?.current &&
    !!onPositionChange &&
    !!buttonRef.current;

  return (
    <button
      type="button"
      data-project-card="true"
      data-project-id={projectId}
      ref={buttonRef}
      style={{
        // Evita "scroll/zoom" durante drag no mobile quando habilitado.
        touchAction: dragEnabled ? 'none' : undefined,
        // Posição controlada pelo pai (orbit).
        position: dragEnabled ? 'absolute' : undefined,
        left: dragEnabled ? 0 : undefined,
        top: dragEnabled ? 0 : undefined,
        transform:
          typeof position?.x === 'number' && typeof position?.y === 'number'
            ? `translate3d(${position.x}px, ${position.y}px, 0)`
            : undefined,
      }}
      onClick={() => {
        // Se houve drag, não transforma em clique.
        if (dragEnabled && dragRef.current.moved) return;
        onSelect(projectId);
      }}
      className={[
        'text-left rounded-3xl',
        // ~30% menor (224x196 e 252x210 no breakpoint `sm`)
        'flex-shrink-0 w-[224px] sm:w-[252px] h-[196px] sm:h-[210px]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset',
        dragEnabled ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : '',
      ].join(' ')}
      onPointerDown={(e) => {
        if (!canDrag) return;
        // Mouse: apenas botão esquerdo.
        if (e.pointerType === 'mouse' && e.button !== 0) return;

        const boundsEl = boundsRef?.current;
        const cardEl = frameRef.current;
        if (!boundsEl || !cardEl) return;

        // pointer capture garante que move/up funcione mesmo se sair do card.
        try {
          buttonRef.current?.setPointerCapture(e.pointerId);
        } catch {
          // no-op
        }

        dragRef.current.pointerId = e.pointerId;
        dragRef.current.moved = false;
        dragRef.current.startPointerX = e.clientX;
        dragRef.current.startPointerY = e.clientY;
        dragRef.current.startPosX = position!.x;
        dragRef.current.startPosY = position!.y;
        setIsDragging(true);
        onDragStart?.();
      }}
      onPointerMove={(e) => {
        if (!dragEnabled) return;
        if (dragRef.current.pointerId !== e.pointerId) return;
        if (!boundsRef?.current || !onPositionChange || !position) return;
        if (!frameRef.current) return;

        const dx = e.clientX - dragRef.current.startPointerX;
        const dy = e.clientY - dragRef.current.startPointerY;

        // Threshold baixo para reduzir casos onde micro-movimentos ainda disparam clique.
        const threshold = 3;
        if (!dragRef.current.moved && Math.abs(dx) + Math.abs(dy) > threshold) {
          dragRef.current.moved = true;
        }

        const cardRect = frameRef.current.getBoundingClientRect();
        const boundsRect = boundsRef.current.getBoundingClientRect();

        const maxX = Math.max(0, boundsRect.width - cardRect.width);
        const maxY = Math.max(0, boundsRect.height - cardRect.height);

        const nextX = dragRef.current.startPosX + dx;
        const nextY = dragRef.current.startPosY + dy;

        onPositionChange({
          x: clamp(nextX, 0, maxX),
          y: clamp(nextY, 0, maxY),
        });
      }}
      onPointerUp={(e) => {
        if (!dragEnabled) return;
        if (dragRef.current.pointerId !== e.pointerId) return;

        dragRef.current.pointerId = -1;
        setIsDragging(false);
        onDragEnd?.();

        try {
          buttonRef.current?.releasePointerCapture(e.pointerId);
        } catch {
          // no-op
        }
      }}
      onPointerCancel={(e) => {
        if (!dragEnabled) return;
        if (dragRef.current.pointerId !== e.pointerId) return;

        dragRef.current.pointerId = -1;
        setIsDragging(false);
        onDragEnd?.();

        try {
          buttonRef.current?.releasePointerCapture(e.pointerId);
        } catch {
          // no-op
        }
      }}
    >
      <div
        className={[
          'reveal-area relative rounded-3xl overflow-hidden border-2 h-full w-full',
          // Use explicit colors (evita problemas com opacidade em CSS vars + tailwind)
          active
            ? 'border-[#f3407e] bg-[#fdfdfe] dark:border-[#f3407e] dark:bg-[#0b1220]'
            : 'border-[#d0d8eb] bg-[#ecf3ff] dark:border-[#1f2937] dark:bg-[#111827]',
        ].join(' ')}
        // Raio reduzido em 50% para um reveal mais focado.
        data-radius={idx === 0 ? 130 : 110}
        ref={frameRef}
      >
        <div className="absolute inset-0 reveal-hidden bg-primary">
          <div className="h-full w-full p-4 flex flex-col justify-end gap-1 text-primary-foreground">
            <p className="text-xs leading-5 text-primary-foreground/90">
              {problem}
            </p>
          </div>
        </div>

        <div className="relative p-4 h-full reveal-visible flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-inria text-xl font-bold leading-tight">
                {title}
              </h3>
              <p className="mt-1 text-sm leading-tight text-muted max-w-[14ch]">
                {domain}
              </p>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted whitespace-nowrap">
              Case {String(idx + 1).padStart(2, '0')}
            </div>
          </div>

          <div className="mt-auto pt-3 flex flex-wrap gap-1">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-surface text-foreground text-xs border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
