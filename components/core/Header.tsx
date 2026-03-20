'use client';

import Image from 'next/image';
import RoundedButton from '../ui/RoundedButton';
import MoreOptions from '@/public/assets/icons/more-options.svg';
import LogoHorizonte from '../ui/LogoHorizonte';
import { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSecretMode } from '@/resources/secret-mode/secret-mode-context';
import { useTheme } from '@/resources/theme/theme-context';
import { useI18n } from '@/resources/i18n';

type HeaderProps = {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

const Header: FC<HeaderProps> = ({ isMenuOpen, openMenu, closeMenu }) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const { isSecretMode } = useSecretMode();
  const { theme } = useTheme();
  const { t } = useI18n();

  return (
    <section className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-surface/70">
      <nav className="flex items-center justify-between py-2 px-4">
        <button
          type="button"
          className="flex items-center justify-start cursor-pointer"
          aria-label={t('common.logoAria')}
          onClick={() => push('/')}
        >
          <LogoHorizonte
            variant="minimal"
            theme={
              theme === 'dark' || isSecretMode || pathname === '/contact'
                ? 'dark'
                : 'light'
            }
            size={80}
            className="h-10 flex items-center"
          />
        </button>
        <div className="lg:hidden">
          <RoundedButton
            icon={<Image src={MoreOptions} alt={'An alt caption'} />}
            onClick={isMenuOpen ? closeMenu : openMenu}
          />
        </div>
        {/* Desktop: dica no lugar do botão — seta (←), animação contínua (CSS global no wrapper) */}
        <div
          className={
            isMenuOpen
              ? 'hidden lg:flex items-center justify-center w-10 h-10 pointer-events-none opacity-0 transition-opacity duration-300'
              : 'header-menu-arrow-nudge hidden lg:flex items-center justify-center w-10 h-10 pointer-events-none opacity-100 transition-opacity duration-300'
          }
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-foreground/70"
          >
            <path
              d="M14.5 5.5L8.5 12L14.5 18.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </nav>
    </section>
  );
};

export default Header;
