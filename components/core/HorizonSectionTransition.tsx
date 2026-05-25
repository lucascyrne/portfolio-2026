'use client';

import HorizonLine from '@/components/core/HorizonLine';
import StarsField from '@/components/core/StarsField';
import { useTheme } from '@/resources/theme/theme-context';
import { useReducedMotion } from 'framer-motion';

type HorizonSectionTransitionProps = {
  active?: boolean;
  className?: string;
};

/**
 * Transição atmosférica entre Projetos (↑) e Jogos (↓).
 * Glow único contínuo no centro; estrelas com deriva por metade.
 */
export default function HorizonSectionTransition({
  active = true,
  className = '',
}: HorizonSectionTransitionProps) {
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const starVariant = theme === 'dark' ? 'default' : 'contact';

  return (
    <div
      className={`horizon-section-transition left-1/2 w-screen -translate-x-1/2 ${className}`.trim()}
      aria-hidden="true"
    >
      <div
        className={[
          'horizon-section-transition__glow',
          reducedMotion ? 'horizon-section-transition__glow--static' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      />

      <StarsField
        active={active}
        count={70}
        drift="up"
        heightClassName="h-full"
        variant={starVariant}
        regionClassName="horizon-section-transition__stars horizon-section-transition__stars--up"
      />
      <StarsField
        active={active}
        count={70}
        drift="down"
        heightClassName="h-full"
        variant={starVariant}
        regionClassName="horizon-section-transition__stars horizon-section-transition__stars--down"
      />

      <div className="horizon-section-transition__line">
        <HorizonLine
          active={active}
          containerClassName="relative w-full"
          svgClassName="h-6 w-full md:h-7"
        />
      </div>
    </div>
  );
}
