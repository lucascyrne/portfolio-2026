'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import type { ContactAreaItem } from '@/resources/contact/types';

const VISIBILITY_DELAY_MS = 500;

type SkillAccordionProps = {
  items: ContactAreaItem[];
  heading?: string;
  id?: string;
};

const SkillAccordion = ({ items, heading, id }: SkillAccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [visibleIndex, setVisibleIndex] = useState<null | number>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearShowTimer = () => {
    if (showTimerRef.current !== null) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
  };

  useEffect(() => () => clearShowTimer(), []);

  const queueVisible = (index: null | number) => {
    clearShowTimer();
    if (index === null) {
      setVisibleIndex(null);
      return;
    }
    setVisibleIndex(null);
    showTimerRef.current = setTimeout(() => {
      setVisibleIndex(index);
      showTimerRef.current = null;
    }, VISIBILITY_DELAY_MS);
  };

  const headingId = `${id ?? 'areas'}-heading`;

  return (
    <section
      id={id}
      className="w-full bg-surface-muted/80 px-4 py-12 md:py-16"
      aria-labelledby={heading ? headingId : undefined}
    >
      {heading ? (
        <h2
          id={headingId}
          className="mb-8 text-center font-inria text-2xl font-bold text-foreground md:text-3xl"
        >
          {heading}
        </h2>
      ) : null}
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:gap-0 md:overflow-hidden md:rounded-2xl md:ring-1 md:ring-border">
        {items.map((skill, index) => {
          const isActive = activeIndex === index;
          const isVisible = visibleIndex === index;

          return (
            <div
              key={skill.title}
              className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-start overflow-hidden rounded-2xl border border-border bg-surface pt-6 transition-all duration-500 md:min-h-[320px] md:rounded-none md:border-0 md:border-r md:border-border md:pt-10 last:md:border-r-0 ${isActive ? 'md:flex-[3] md:shadow-lg' : 'md:flex-1'}`}
              onClick={() => {
                if (activeIndex === index) {
                  setActiveIndex(null);
                  queueVisible(null);
                } else {
                  setActiveIndex(index);
                  queueVisible(index);
                }
              }}
              onMouseEnter={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                  setActiveIndex(index);
                  queueVisible(index);
                }
              }}
              onMouseLeave={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                  clearShowTimer();
                  setActiveIndex(null);
                  setVisibleIndex(null);
                }
              }}
            >
              <div className="absolute inset-0">
                <Image
                  src={skill.image}
                  alt={skill.title}
                  fill
                  className={`object-cover transition-transform duration-500 ${isActive ? 'scale-100' : 'scale-125'}`}
                />
                <div className="absolute inset-0 bg-black/55" />
              </div>

              <div className="relative z-10 flex w-full flex-col items-center gap-2 px-4 pb-6 text-center md:px-10">
                <h3 className="font-inria text-lg font-semibold text-slate-100 md:text-xl">
                  <i>{skill.title}</i>
                </h3>
                <div
                  className={`grid w-full max-w-prose transition-[grid-template-rows] duration-500 ease-out ${isVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      className={`px-0 pb-1 pt-1 text-sm text-slate-200 md:text-base ${isVisible ? 'animate-fade-in-xs opacity-100' : 'opacity-0'}`}
                    >
                      {skill.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillAccordion;
