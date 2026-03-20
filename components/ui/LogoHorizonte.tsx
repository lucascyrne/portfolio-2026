'use client';

import Image from 'next/image';
import { FC } from 'react';

type LogoVariant = 'full' | 'minimal' | 'circle';
type LogoTheme = 'light' | 'dark';

type LogoHorizonteProps = {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: number;
  className?: string;
};

const logoMap: Record<LogoVariant, Record<LogoTheme, string>> = {
  full: {
    light: '/assets/logos/horizonte-studio-logo-full-light.png',
    dark: '/assets/logos/horizonte-studio-logo-full-dark.png',
  },
  minimal: {
    light: '/assets/logos/horizonte-studio-logo-minimal-light.png',
    dark: '/assets/logos/horizonte-studio-logo-minimal-dark.png',
  },
  circle: {
    light: '/assets/logos/horizonte-studio-logo-circle-light.png',
    dark: '/assets/logos/horizonte-studio-logo-circle-dark.png',
  },
};

const LogoHorizonte: FC<LogoHorizonteProps> = ({
  variant = 'full',
  theme = 'light',
  size = 120,
  className,
}) => {
  const src = logoMap[variant][theme];

  return (
    <div className={className} aria-label="Horizonte Studio">
      <Image
        src={src}
        alt="Horizonte Studio logo"
        width={size}
        height={size}
        priority
      />
    </div>
  );
};

export default LogoHorizonte;

