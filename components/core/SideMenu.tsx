'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { PiMoonStarsDuotone, PiSunDuotone } from 'react-icons/pi';
import { RxCross2 } from 'react-icons/rx';
import { useTheme } from '@/resources/theme/theme-context';
import { useI18n, type AppLocale } from '@/resources/i18n';

type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onPanelEnter?: () => void;
  onPanelLeave?: () => void;
};

const SideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  onClose,
  onPanelEnter,
  onPanelLeave,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t, messages } = useI18n();

  const locales: { code: AppLocale; label: string }[] = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'zh', label: '中文' },
  ];

  useEffect(() => {
    const menu = menuRef.current;

    if (isOpen) {
      gsap.to(menu, {
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      gsap.to(menu, {
        x: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.querySelector('.underline');
    const text = e.currentTarget.querySelector('.text');
    if (target && text) {
      gsap.to(target, {
        scaleX: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.querySelector('.underline');
    const text = e.currentTarget.querySelector('.text');
    if (target && text) {
      gsap.to(target, {
        scaleX: 0,
        duration: 0.5,
        ease: 'power2.in',
      });
      gsap.to(text, {
        fontFamily: '',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/35 lg:bg-black/20"
          onClick={onClose}
          aria-label="Fechar menu"
        />
      )}
      <div
        ref={menuRef}
        className="fixed z-50 top-0 right-0 py-2 px-2 w-64 h-full bg-surface text-foreground shadow-lg transform translate-x-full"
        onMouseEnter={onPanelEnter}
        onMouseLeave={onPanelLeave}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between mr-2">
          <button
            type="button"
            aria-label="Alternar tema claro/escuro"
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-surface-muted text-foreground"
          >
            {theme === 'dark' ? (
              <PiSunDuotone size={20} />
            ) : (
              <PiMoonStarsDuotone size={20} />
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu lateral"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-border bg-surface-muted text-foreground/80 hover:text-foreground transition-colors"
          >
            <RxCross2 size={18} />
          </button>
        </div>
        <div className="mt-6 px-4">
          <p className="text-xsm uppercase tracking-widest text-muted-foreground mb-2">
            {messages.common.language}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {locales.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={`min-w-[2.5rem] rounded-md border px-2 py-1 text-xs font-medium transition-colors ${
                  locale === code
                    ? 'border-primary bg-primary/15 text-primary'
                    : 'border-border bg-surface-muted text-foreground hover:bg-surface'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <nav className="flex flex-col items-start justify-star mt-10">
          <button
            className="flex items-start relative px-4 py-2 w-full text-xl font-normal text-foreground overflow-hidden hover:bg-surface-muted transition-all duration-300"
            onClick={() => handleNavigate('/')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="relative top-1 mr-[2px] align-top text-xsm">01</span>
            <span className="font-inria text relative">
              {t('common.navHome')}
            </span>
            <span className="underline absolute left-0 bottom-0 h-[1px] w-full bg-accent transform scale-x-0 origin-left"></span>
          </button>
          <button
            className="flex items-start relative px-4 py-2 w-full text-xl font-normal text-foreground overflow-hidden hover:bg-surface-muted transition-all duration-300"
            onClick={() => handleNavigate('/projects')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="relative top-1 mr-[2px] align-top text-xsm">02</span>
            <span className="font-inria text relative">
              {t('common.navProjects')}
            </span>
            <span className="underline absolute left-0 bottom-0 h-[1px] w-full bg-accent transform scale-x-0 origin-left"></span>
          </button>
          <button
            className="flex items-start relative px-4 py-2 w-full text-xl font-normal text-foreground overflow-hidden hover:bg-surface-muted transition-all duration-300"
            onClick={() => handleNavigate('/contact')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="relative top-1 mr-[2px] align-top text-xsm">03</span>
            <span className="font-inria text relative">
              {t('common.navContact')}
            </span>
            <span className="underline absolute left-0 bottom-0 h-[1px] w-full bg-accent transform scale-x-0 origin-left"></span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default SideMenu;
