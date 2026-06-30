'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

type TitleTag = 'h1' | 'h2' | 'h3' | 'p';

type WorkAnimatedTitleProps = {
  as?: TitleTag;
  className?: string;
  children: ReactNode;
  once?: boolean;
};

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

export default function WorkAnimatedTitle({
  as: Tag = 'h2',
  className = '',
  children,
  once = true,
}: WorkAnimatedTitleProps) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once, margin: '-10% 0px -10% 0px' });
  const MotionTag = motionTags[Tag];

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 48 }}
      animate={
        inView
          ? reducedMotion
            ? { opacity: 1 }
            : { opacity: 1, x: 0 }
          : reducedMotion
            ? { opacity: 0 }
            : { opacity: 0, x: 48 }
      }
      transition={{ duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  );
}
