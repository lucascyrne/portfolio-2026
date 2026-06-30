'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { resolveWorkImage } from '@/resources/how-we-work/work-images';
import WorkSectionHeader from './WorkSectionHeader';

gsap.registerPlugin(ScrollTrigger);

export type ScrollStageItem = {
  title: string;
  body: string;
  imageKey?: string;
  imageAlt?: string;
  meta?: string;
};

type WorkScrollStageProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  body?: string;
  items: ScrollStageItem[];
  centered?: boolean;
  className?: string;
};

const HEADER_OFFSET_PX = 56;

function progressToIndex(progress: number, count: number): number {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.round(progress * (count - 1)));
}

function StageSlideContent({
  item,
  index,
  activeIndex,
  transitionDuration,
}: {
  item: ScrollStageItem;
  index: number;
  activeIndex: number;
  transitionDuration: number;
}) {
  const isActive = index === activeIndex;
  const imageKey = item.imageKey ?? 'hero';

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-y-auto px-2 md:px-4"
      initial={false}
      animate={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
      transition={{ duration: transitionDuration, ease: 'easeOut' }}
      aria-hidden={!isActive}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 text-center sm:gap-6 lg:flex-row lg:items-center lg:gap-10 lg:text-left">
        <div className="relative aspect-[4/3] w-full max-w-xs shrink-0 overflow-hidden sm:max-w-md lg:max-w-lg lg:w-1/2">
          <Image
            src={resolveWorkImage(imageKey)}
            alt={item.imageAlt ?? item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 480px"
            priority={index === 0}
          />
        </div>
        <div className="flex flex-col items-center lg:w-1/2 lg:items-start">
          <span className="font-inria text-4xl font-bold text-primary/25 sm:text-5xl md:text-6xl">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-1 font-inria text-xl font-semibold text-foreground sm:mt-2 sm:text-2xl md:text-3xl">
            {item.title}
          </h3>
          {item.body ? (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:text-lg">
              {item.body}
            </p>
          ) : null}
          {item.meta ? (
            <p className="mt-2 text-sm text-muted-foreground sm:mt-3 md:text-base">{item.meta}</p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkScrollStage({
  id,
  eyebrow,
  title,
  body,
  items,
  centered = true,
  className = '',
}: WorkScrollStageProps) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const transitionDuration = reducedMotion ? 0 : 0.45;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || items.length === 0) return;

    if (items.length === 1) {
      setActiveIndex(0);
      return;
    }

    const slideCount = items.length - 1;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: `top ${HEADER_OFFSET_PX}px`,
        end: () => `+=${window.innerHeight * slideCount}`,
        pin,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setActiveIndex(progressToIndex(self.progress, items.length));
        },
      });
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [items.length]);

  const panelHeight = `calc(100svh - ${HEADER_OFFSET_PX}px)`;

  return (
    <section ref={sectionRef} id={id} className={className}>
      <div
        ref={pinRef}
        className="flex flex-col px-4 md:px-8"
        style={{ height: panelHeight }}
      >
        <div className="shrink-0 pb-3 pt-4 md:pb-4 md:pt-6">
          <WorkSectionHeader
            eyebrow={eyebrow}
            title={title}
            body={body}
            centered={centered}
          />
        </div>

        <div className="relative min-h-0 flex-1" aria-live="polite">
          {items.map((item, index) => (
            <StageSlideContent
              key={`${item.title}-${index}`}
              item={item}
              index={index}
              activeIndex={activeIndex}
              transitionDuration={transitionDuration}
            />
          ))}
        </div>

        <div className="flex shrink-0 flex-col items-center gap-2 pb-4 pt-2 md:pb-6 md:pt-3">
          <div className="h-0.5 w-28 overflow-hidden rounded-full bg-border sm:w-32">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${((activeIndex + 1) / items.length) * 100}%` }}
            />
          </div>
          <span className="text-xs tabular-nums text-muted-foreground sm:text-sm">
            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <div className="flex gap-1.5 sm:gap-2">
            {items.map((item, index) => (
              <span
                key={item.title}
                className={`size-1.5 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-primary' : 'bg-border'
                }`}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
