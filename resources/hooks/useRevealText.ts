import { useEffect } from 'react';
import gsap from 'gsap';

const useRevealText = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let activeTouchPointerId: number | null = null;

    const applyReveal = (clientX: number, clientY: number) => {
      const revealAreas = document.querySelectorAll('.reveal-area');

      revealAreas.forEach((area) => {
        const rect = area.getBoundingClientRect();
        const hiddenText = area.querySelector('.reveal-hidden') as HTMLElement;

        if (hiddenText) {
          const radius =
            Number((area as HTMLElement).dataset.radius ?? '180') || 180;
          const clipPath = `circle(${radius}px at ${clientX - rect.left}px ${
            clientY - rect.top
          }px)`;
          gsap.to(hiddenText, { clipPath });
        }
      });
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      applyReveal(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      applyReveal(touch.clientX, touch.clientY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        activeTouchPointerId = e.pointerId;
        applyReveal(e.clientX, e.clientY);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
        applyReveal(e.clientX, e.clientY);
        return;
      }

      if (e.pointerType === 'touch' && activeTouchPointerId === e.pointerId) {
        applyReveal(e.clientX, e.clientY);
      }
    };

    const clearActiveTouch = (e: PointerEvent) => {
      if (e.pointerType === 'touch' && activeTouchPointerId === e.pointerId) {
        activeTouchPointerId = null;
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', clearActiveTouch);
    document.addEventListener('pointercancel', clearActiveTouch);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', clearActiveTouch);
      document.removeEventListener('pointercancel', clearActiveTouch);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
};

export default useRevealText;
