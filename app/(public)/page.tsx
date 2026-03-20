'use client';

import Hero from '@/components/core/Hero';
import QuoteCarousel from '@/components/core/QuoteCarousel';
import SecretVideoPlayer from '@/components/core/SecretVideoPlayer';
import SoundVisualizer from '@/components/core/SoundVisualizer';
import AudioDock from '@/components/core/AudioDock';
import { useMusic } from '@/resources/music/music-context';
import { useSecretMode } from '@/resources/secret-mode/secret-mode-context';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [showQuoteCarousel, setShowQuoteCarousel] = useState(false);
  const [isSecretExiting, setIsSecretExiting] = useState(false);
  const didExitRef = useRef(false);

  const { fadeToBaseTrack } = useMusic();
  const { isSecretMode, setIsSecretMode } = useSecretMode();

  const handleSecretExit = () => {
    if (didExitRef.current) return;
    didExitRef.current = true;

    const EXIT_FADE_MS = 600;
    setIsSecretExiting(true);

    // Crossfade/fade no volume (sem reiniciar currentTime).
    fadeToBaseTrack({ durationMs: EXIT_FADE_MS }).catch(() => {});

    window.setTimeout(() => {
      setShowQuoteCarousel(false);
      setIsSecretMode(false);
      setIsSecretExiting(false);
    }, EXIT_FADE_MS);
  };

  useEffect(() => {
    if (isSecretMode) {
      didExitRef.current = false;
      setIsSecretExiting(false);
      const timeout = setTimeout(() => setShowQuoteCarousel(true), 700); // Espera 700ms
      return () => clearTimeout(timeout);
    } else {
      setShowQuoteCarousel(false);
      setIsSecretExiting(false);
    }
  }, [isSecretMode]);

  return (
    <main className="flex flex-col w-full bg-landing-day dark:bg-landing-sunset overflow-hidden overflow-y-hidden transition-colors duration-500">
      {/* Camada do visualizador de som */}
      <div className="absolute inset-0 pointer-events-none">
        <SoundVisualizer isSecretMode={isSecretMode} />
      </div>

      {/* Camada do conteúdo principal */}
      <div className="flex flex-col w-full items-center justify-between bg-transparent">
        {/* <Header isSecretMode={isSecretMode} /> */}
        {isSecretMode && (
          <SecretVideoPlayer
            onClose={handleSecretExit}
            isExiting={isSecretExiting}
          />
        )}
        <Hero isSecretMode={isSecretMode} setIsSecretMode={setIsSecretMode} />
        {showQuoteCarousel && isSecretMode && (
          <QuoteCarousel runOnce onComplete={handleSecretExit} />
        )}
      </div>
      <AudioDock />
    </main>
  );
}
