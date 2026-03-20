'use client';

import React, { useEffect, useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { useI18n } from '@/resources/i18n';

type RecommendationItem = {
  name: string;
  role: string;
  company: string;
  text: string;
  link?: string;
};

type RecomendationsCarouselProps = {
  eyebrow?: string;
  id?: string;
};

const RecomendationsCarousel: React.FC<RecomendationsCarouselProps> = ({
  eyebrow,
  id,
}) => {
  const { messages } = useI18n();
  const quotes = messages.contactRecommendations as RecommendationItem[];
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFadeIn(true);
      }, 1600);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const { name, role, company, text, link } = quotes[currentQuoteIndex];

  return (
    <section
      id={id}
      className="relative z-10 flex h-[720px] w-full items-center justify-center pt-12 md:h-[480px]"
      aria-label={eyebrow ?? messages.contact.recommendationsEyebrow}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-[url('/assets/images/nebulosa.webp')] opacity-[0.72] dark:bg-nebula-vignette dark:opacity-60 dark:mix-blend-overlay"
        aria-hidden
      />

      <div
        className={`relative z-40 flex h-full w-full flex-col items-center justify-center gap-2 px-6 md:w-1/2 md:px-0 ${
          fadeIn ? 'animate-fade-in' : 'animate-fade-out'
        }`}
      >
        {eyebrow ? (
          <p className="mb-2 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground dark:text-slate-300">
            {eyebrow}
          </p>
        ) : null}
        <p className="text-center font-inria text-lg text-foreground dark:text-slate-200">
          {text}
        </p>
        <h3 className="font-inria text-center text-base text-secondary">
          {name}
        </h3>
        <h4 className="font-inria text-center text-sm text-foreground/90 dark:text-slate-200">
          {role} @ <i className="text-secondary not-italic">{company}</i>
        </h4>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 cursor-pointer text-secondary transition-transform hover:scale-110"
            aria-label={`LinkedIn — ${name}`}
          >
            <FaLinkedin size={28} />
          </a>
        ) : null}
      </div>
    </section>
  );
};

export default RecomendationsCarousel;
