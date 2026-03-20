'use client';

import { MusicProvider } from '@/resources/music/music-context';
import './globals.css';
import { Inter } from 'next/font/google';
import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/core/Header';
import SideMenu from '@/components/core/SideMenu';
import { SecretModeProvider } from '@/resources/secret-mode/secret-mode-context';
import { ThemeProvider } from '@/resources/theme/theme-context';
import { I18nProvider } from '@/resources/i18n';
import Template from './template';

const inter = Inter({ subsets: ['latin'] });
const REGION_WIDTH = 160;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Controla abertura/fechamento por hover com delay para evitar flicker.
  // A lógica roda apenas no desktop (>= lg), mas o estado em si é compartilhado.
  const regionHoverRef = useRef(false);
  const panelHoverRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);
  // Abordagem mais robusta: detecta a faixa direita via posição do cursor.
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktop()) return;

      const inRegion = e.clientX >= window.innerWidth - REGION_WIDTH;

      if (inRegion === regionHoverRef.current) return;

      regionHoverRef.current = inRegion;

      if (inRegion) openMenu();
      else onMenuRegionLeave();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isDesktop = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(min-width: 1024px)').matches;

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      if (!regionHoverRef.current && !panelHoverRef.current) {
        setIsMenuOpen(false);
      }
      closeTimerRef.current = null;
    }, 120);
  };

  const openMenu = () => {
    clearCloseTimer();
    panelHoverRef.current = false;
    regionHoverRef.current = true;
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    clearCloseTimer();
    regionHoverRef.current = false;
    panelHoverRef.current = false;
    setIsMenuOpen(false);
  };

  const onMenuRegionLeave = () => {
    if (!isDesktop()) return;
    regionHoverRef.current = false;
    scheduleClose();
  };

  const onMenuPanelEnter = () => {
    if (!isDesktop()) return;
    panelHoverRef.current = true;
    clearCloseTimer();
  };

  const onMenuPanelLeave = () => {
    if (!isDesktop()) return;
    panelHoverRef.current = false;
    scheduleClose();
  };

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta
          name="description"
          content="Horizonte studio's digital portfolio, made by Lucas Cyrne Ferreira"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} flex flex-col w-full min-h-screen`}>
        <Template>
          <I18nProvider>
            <ThemeProvider>
              <MusicProvider>
                <SecretModeProvider>
                  <Header
                    isMenuOpen={isMenuOpen}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                  />
                  <SideMenu
                    isOpen={isMenuOpen}
                    onClose={closeMenu}
                    onPanelEnter={onMenuPanelEnter}
                    onPanelLeave={onMenuPanelLeave}
                  />
                  {children}
                </SecretModeProvider>
              </MusicProvider>
            </ThemeProvider>
          </I18nProvider>
        </Template>
      </body>
    </html>
  );
}
