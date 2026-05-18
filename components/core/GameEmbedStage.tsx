'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

type GameEmbedStageProps = {
  embedUrl: string;
  title: string;
  genre: string;
  tagline: string;
  playLabel: string;
  closeLabel: string;
  iframeTitle: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const GameEmbedStage = ({
  embedUrl,
  title,
  genre,
  tagline,
  playLabel,
  closeLabel,
  iframeTitle,
}: GameEmbedStageProps) => {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expanded]);

  const motionTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: EASE };

  const iframe = shouldLoadIframe ? (
    <iframe
      src={embedUrl}
      title={iframeTitle}
      className="absolute inset-0 h-full w-full border-0"
      loading="lazy"
      allow="fullscreen"
    />
  ) : (
    <motion.div
      className="absolute inset-0 bg-[#0b0b12]"
      aria-hidden
      initial={{ opacity: 0.4 }}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
      }
    />
  );

  return (
    <>
      <div ref={containerRef} className="relative mx-auto w-full max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-[#0b0b12] shadow-[inset_0_0_80px_rgba(0,0,0,0.45)] ring-1 ring-border/40">
          <div className="relative w-full aspect-video">
            {iframe}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b0b12] via-[#0b0b12]/75 to-transparent"
              aria-hidden
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:justify-between md:p-5">
            <div>
              <p className="mb-0.5 text-xsm uppercase tracking-widest text-white/50">
                {genre}
              </p>
              <h3 className="font-inria text-xl font-bold text-white md:text-2xl">
                {title}
              </h3>
              <p className="mt-1 max-w-[40ch] text-sm leading-relaxed text-white/70">
                {tagline}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-colors hover:bg-secondary hover:text-secondary-foreground"
            >
              {playLabel}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-background/85 p-4 backdrop-blur-md md:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={motionTransition}
          >
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="fixed top-16 left-4 z-[70] rounded-full bg-surface/60 p-2 text-lg text-foreground/75 shadow-sm ring-1 ring-border/35 backdrop-blur-sm transition-colors hover:bg-surface/75 hover:text-foreground"
              aria-label={closeLabel}
            >
              <RxCross2 />
            </button>

            <motion.div
              className="relative mt-12 min-h-0 flex-1 overflow-hidden rounded-3xl bg-[#0b0b12] ring-1 ring-border/40 shadow-[inset_0_0_80px_rgba(0,0,0,0.45)]"
              initial={reducedMotion ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reducedMotion ? undefined : { scale: 0.96, opacity: 0 }}
              transition={motionTransition}
            >
              {shouldLoadIframe ? (
                <iframe
                  src={embedUrl}
                  title={iframeTitle}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="fullscreen"
                />
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GameEmbedStage;
