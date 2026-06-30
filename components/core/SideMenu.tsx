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

  const navItems = [
    { num: '01', path: '/', labelKey: 'common.navHome' },
    { num: '02', path: '/projects', labelKey: 'common.navProjects' },
    { num: '03', path: '/how-we-work', labelKey: 'common.navHowWeWork' },
    { num: '04', path: '/contact', labelKey: 'common.navContact' },
  ] as const;

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
        className="fixed z-50 top-0 right-0 py-2 px-2 w-72 min-w-[17rem] h-full bg-surface text-foreground shadow-lg transform translate-x-full"
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
        <nav className="mt-10 flex flex-col items-stretch">
          {navItems.map(({ num, path, labelKey }) => (
            <button
              key={path}
              type="button"
              className="relative flex w-full items-start gap-2 overflow-hidden px-4 py-2 text-left text-foreground transition-all duration-300 hover:bg-surface-muted"
              onClick={() => handleNavigate(path)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="w-6 shrink-0 pt-1 text-xsm leading-none">{num}</span>
              <span className="font-inria text relative flex-1 text-left text-xl leading-snug">
                {t(labelKey)}
              </span>
              <span className="underline absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent" />
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SideMenu;
