'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { resolveWorkImage } from '@/resources/how-we-work/work-images';
import ProcessTimeline from './ProcessTimeline';
import WorkAnimatedTitle from './WorkAnimatedTitle';

type FlowStep = {
  label: string;
  description?: string;
  storyBeat?: string;
  imageKey?: string;
};

export type WorkHeroContent = {
  title: string;
  storyLead: string;
  imageAlt: string;
  flowSteps: FlowStep[];
};

type WorkHeroParallaxProps = {
  content: WorkHeroContent;
};

const DEFAULT_STEP_KEYS = ['hero', 'chapterDiscovery', 'development', 'philosophy'] as const;

export default function WorkHeroParallax({ content }: WorkHeroParallaxProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, reducedMotion ? 0 : 60]);

  const activeStep = content.flowSteps[activeIndex];
  const bgImageKey =
    activeStep?.imageKey ?? DEFAULT_STEP_KEYS[activeIndex] ?? 'hero';

  return (
    <header className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden px-4 py-16 md:px-8">
      <AnimatePresence mode="sync">
        <motion.div
          key={bgImageKey}
          className="pointer-events-none absolute inset-0 z-0"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <Image
              src={resolveWorkImage(bgImageKey)}
              alt=""
              fill
              className="object-cover opacity-[0.28] dark:opacity-[0.16]"
              sizes="100vw"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/88 to-background" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <WorkAnimatedTitle
          as="h1"
          className="font-inria text-3xl font-bold text-foreground md:text-5xl lg:text-6xl"
        >
          {content.title}
        </WorkAnimatedTitle>
        <WorkAnimatedTitle
          as="p"
          className="mt-5 max-w-2xl font-inria text-lg text-foreground/90 md:text-xl"
        >
          {content.storyLead}
        </WorkAnimatedTitle>

        <div className="mt-14 w-full max-w-3xl">
          <ProcessTimeline
            steps={content.flowSteps}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            interactive
          />
        </div>

        <div
          className="mt-10 grid w-full max-w-2xl grid-cols-1 grid-rows-1 px-2"
          aria-live="polite"
        >
          {content.flowSteps.map((step, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={step.label}
                className="col-start-1 row-start-1 text-center"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 1 : 0,
                }}
                transition={{ duration: reducedMotion ? 0 : 0.35, ease: 'easeOut' }}
                aria-hidden={!isActive}
              >
                {step.storyBeat ? (
                  <>
                    <p className="text-xs font-medium uppercase tracking-widest text-primary">
                      {step.label}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                      {step.storyBeat}
                    </p>
                  </>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
