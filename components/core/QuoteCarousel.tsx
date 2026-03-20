'use client';

import React, { useEffect, useState } from 'react';
import { useI18n } from '@/resources/i18n';

type QuoteCarouselProps = {
  runOnce?: boolean;
  onComplete?: () => void;
};

const QuoteCarousel: React.FC<QuoteCarouselProps> = ({
  runOnce = false,
  onComplete,
}) => {
  const { messages } = useI18n();
  const quotes = messages.landing.quotes;
  const quoteIn = messages.landing.quoteIn;

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (!runOnce) {
      const interval = setInterval(() => {
        setFadeIn(false);
        setTimeout(() => {
          setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
          setFadeIn(true);
        }, 1600);
      }, 8000);

      return () => clearInterval(interval);
    }

    const QUOTE_INTERVAL_MS = 8000;
    const QUOTE_FADE_MS = 1600;
    const timers: number[] = [];
    let completed = false;

    setCurrentQuoteIndex(0);
    setFadeIn(true);

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => fn(), ms);
      timers.push(id);
    };

    const n = quotes.length;
    if (n <= 1) {
      schedule(() => setFadeIn(false), QUOTE_INTERVAL_MS);
      schedule(() => {
        if (completed) return;
        completed = true;
        onComplete?.();
      }, QUOTE_INTERVAL_MS + QUOTE_FADE_MS);
    } else {
      // Intercala fade-out e troca de quote (mantém a estética do modo atual).
      for (let i = 0; i < n - 1; i++) {
        const startFadeOutAt = (i + 1) * QUOTE_INTERVAL_MS;
        const nextIndex = i + 1;

        schedule(() => setFadeIn(false), startFadeOutAt);
        schedule(() => {
          setCurrentQuoteIndex(nextIndex);
          setFadeIn(true);
        }, startFadeOutAt + QUOTE_FADE_MS);
      }

      const lastIndex = n - 1;
      const lastVisibleAt = lastIndex * QUOTE_INTERVAL_MS + QUOTE_FADE_MS;
      const startFadeOutLast = lastVisibleAt + QUOTE_INTERVAL_MS;

      schedule(() => {
        // garante consistência caso o estado mude rapidamente
        setCurrentQuoteIndex(lastIndex);
        setFadeIn(false);
      }, startFadeOutLast);

      schedule(() => {
        if (completed) return;
        completed = true;
        onComplete?.();
      }, startFadeOutLast + QUOTE_FADE_MS);
    }

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runOnce, onComplete, quotes.length]);

  const q = quotes[currentQuoteIndex];

  return (
    <section className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
      <div
        className={`relative flex flex-col items-center justify-center gap-2 p-8 w-full md:w-1/2 md:p-0 h-full z-40 opacity-90 ${
          fadeIn ? 'animate-fade-in' : 'animate-fade-out'
        }`}
      >
        <h1 className="font-inria text-center text-white text-shadow text-lg">
          {q.text}
        </h1>
        <h4 className="font-inria text-center text-white text-shadow text-md">
          {q.author} {quoteIn} <i className="text-primary">{q.work}</i>
        </h4>
      </div>
    </section>
  );
};

export default QuoteCarousel;
