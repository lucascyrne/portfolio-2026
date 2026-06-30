'use client';

import type { ReactNode } from 'react';

import StarsField from './StarsField';

type ContactLowerAtmosphereProps = {
  children: ReactNode;
};

export default function ContactLowerAtmosphere({
  children,
}: ContactLowerAtmosphereProps) {
  return (
    <div className="contact-lower-atmosphere relative overflow-hidden bg-gradient-to-b from-surface-muted/90 via-surface-muted/60 to-primary/10">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="contact-lower-atmosphere__glow absolute inset-0" />
        <StarsField
          active
          variant="contact"
          drift="up"
          count={90}
          regionClassName="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 z-0 opacity-60">
          <StarsField
            active
            variant="contact"
            drift="down"
            count={50}
            regionClassName="absolute inset-0"
          />
        </div>
      </div>

      <div className="contact-lower-atmosphere__content relative z-10">
        {children}
      </div>
    </div>
  );
}
