'use client';

import Image, { type StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

type Logo = StaticImageData | string;

type PartnersCarouselProps = {
  logos: Logo[];
  speedSeconds?: number;
};

const PartnersCarousel = ({
  logos,
  speedSeconds = 12,
}: PartnersCarouselProps) => {
  const extendedLogos = useMemo(() => [...logos, ...logos], [logos]);
  const listRef = useRef<HTMLUListElement | null>(null);
  const firstBlockRef = useRef<HTMLLIElement | null>(null);
  const secondBlockRef = useRef<HTMLLIElement | null>(null);
  const [loopDistance, setLoopDistance] = useState(0);

  useLayoutEffect(() => {
    const first = firstBlockRef.current;
    const second = secondBlockRef.current;
    if (!first || !second) return;

    // Mede a distância exata (inclui o gap no "fronteira" entre blocos).
    // Assim, ao terminar o translate, o bloco 2 encaixa perfeitamente no bloco 1.
    const distance = second.offsetLeft - first.offsetLeft;
    setLoopDistance(distance);
  }, [logos.length]);

  return (
    <div className="w-full overflow-hidden">
      <motion.ul
        ref={listRef}
        className="flex relative items-center justify-start m-0 p-0 gap-24 w-max"
        style={{ willChange: 'transform' }}
        animate={
          loopDistance
            ? {
                x: [0, -loopDistance],
                transition: {
                  x: {
                    ease: 'linear',
                    repeat: Infinity,
                    duration: speedSeconds,
                  },
                },
              }
            : { x: 0 }
        }
      >
        {extendedLogos.map((logo, index) => (
          <li
            key={`${index}`}
            style={{ display: 'flex', flexShrink: '0' }}
            ref={
              index === 0
                ? firstBlockRef
                : index === logos.length
                  ? secondBlockRef
                  : null
            }
            aria-hidden={index >= logos.length}
          >
            <Image
              src={logo}
              alt="Partner logo"
              className="w-32 h-auto"
              draggable={false}
            />
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default PartnersCarousel;

