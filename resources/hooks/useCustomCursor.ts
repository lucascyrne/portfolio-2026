import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const useCustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isCoarsePointer =
      window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return;

    const cursor = cursorRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power1.out',
        });
      }
    };

    const handleMouseEnter = () => {
      if (cursor) {
        cursor.style.display = 'block';
      }
    };

    const handleMouseLeave = () => {
      if (cursor) {
        cursor.style.display = 'none';
      }
    };

    const revealAreas = document.querySelectorAll('.reveal-area');
    revealAreas.forEach((area) => {
      area.addEventListener('mouseenter', handleMouseEnter);
      area.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      revealAreas.forEach((area) => {
        area.removeEventListener('mouseenter', handleMouseEnter);
        area.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return cursorRef;
};

export default useCustomCursor;
