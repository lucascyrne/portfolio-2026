'use client';

import type { ReactNode } from 'react';

import StarsField from '@/components/core/StarsField';

type WorkPageShellProps = {
  children: ReactNode;
};

export default function WorkPageShell({ children }: WorkPageShellProps) {
  return (
    <div className="work-atmosphere relative overflow-x-hidden bg-gradient-to-b from-background via-surface-muted/40 to-primary/5">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="work-atmosphere__glow absolute inset-0" />
        <StarsField
          active
          variant="contact"
          drift="up"
          count={80}
          regionClassName="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 z-0 opacity-50">
          <StarsField
            active
            variant="contact"
            drift="down"
            count={45}
            regionClassName="absolute inset-0"
          />
        </div>
      </div>
      <div className="work-atmosphere__content relative z-10">{children}</div>
    </div>
  );
}
