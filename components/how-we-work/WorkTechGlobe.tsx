'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import {
  TECH_CATEGORY_ORDER,
  TECH_STACK,
  type TechCategoryId,
} from '@/resources/how-we-work/tech-stack';
import WorkSectionHeader from './WorkSectionHeader';

const TechGlobeCanvas = dynamic(() => import('./TechGlobeCanvas'), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto flex aspect-square w-full max-w-[min(100%,480px)] items-center justify-center rounded-full bg-surface/40"
      aria-hidden
    />
  ),
});

type DevelopmentContent = {
  eyebrow: string;
  title: string;
  body: string;
  principle?: string;
  categories: Record<TechCategoryId | 'all', string>;
};

type WorkTechGlobeProps = {
  content: DevelopmentContent;
};

export default function WorkTechGlobe({ content }: WorkTechGlobeProps) {
  const [activeCategory, setActiveCategory] = useState<TechCategoryId | 'all'>('all');

  const categoriesWithItems = TECH_CATEGORY_ORDER.filter((cat) =>
    TECH_STACK.some((item) => item.category === cat)
  );

  return (
    <section id="development" className="bg-surface/20 py-12 md:py-16">
      <div className="px-4 md:px-8">
        <WorkSectionHeader
          eyebrow={content.eyebrow}
          title={content.title}
          body={content.body}
          centered
        />
      </div>

      <div className="mx-auto mt-8 max-w-4xl px-4 md:mt-10 md:px-8">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 border-b border-border pb-3">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {content.categories.all}
          </button>
          {categoriesWithItems.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {content.categories[cat]}
            </button>
          ))}
        </div>

        <div className="mt-6 md:mt-10">
          <TechGlobeCanvas activeCategory={activeCategory} />
        </div>
      </div>
    </section>
  );
}
