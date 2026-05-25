'use client';

import Gowdock from '@/public/assets/icons/gowdock-logo.svg';
import NovoAtacarejo from '@/public/assets/icons/novo-atacarejo-logo.svg';
import LucidDreams from '@/public/assets/icons/lucid-dreams-logo.svg';
import GeniusLine from '@/public/assets/icons/geniusline-icon.svg';
import Lovepay from '@/public/assets/icons/lovepay-icon.svg';
import SGA from '@/public/assets/icons/sga-icon.png';
import Rainbet from '@/public/assets/icons/rainbet-icon.png';
import Aoro from '@/public/assets/icons/aoro-icon.png';
import useCustomCursor from '@/resources/hooks/useCustomCursor';
import useRevealText from '@/resources/hooks/useRevealText';
import { useI18n } from '@/resources/i18n';
import ProjectStickyPreview from '@/components/core/ProjectStickyPreview';
import OrbitShowcase, { type OrbitItem } from '@/components/core/OrbitShowcase';
import GamesSection from '@/components/core/GamesSection';
import PartnersCarousel from '@/components/core/PartnersCarousel';
import { useMemo, useState } from 'react';

const Work = () => {
  const { projects, t } = useI18n();
  const partners = [
    Gowdock,
    NovoAtacarejo,
    LucidDreams,
    GeniusLine,
    Lovepay,
    SGA,
    Rainbet,
    Aoro,
  ];
  const cursorRef = useCustomCursor();
  useRevealText();

  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id);

  const orbitItems: OrbitItem[] = useMemo(
    () =>
      projects.map((p) => ({
        id: p.id,
        title: p.title,
        domain: p.domain,
        problem: p.problem,
        tags: p.tags,
      })),
    [projects]
  );

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) ?? projects[0],
    [activeProjectId, projects]
  );

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <div ref={cursorRef} className="reveal-cursor"></div>
      <section className="px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="font-inria text-4xl md:text-5xl font-bold">
                {t('projects.title')}
              </h1>
              <p className="mt-3 max-w-[62ch] text-balance leading-relaxed text-muted">
                {t('projects.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 pb-16">
        <OrbitShowcase
          items={orbitItems}
          activeId={activeProjectId}
          onActiveIdChange={setActiveProjectId}
          renderCenter={() =>
            activeProject ? (
              <ProjectStickyPreview project={activeProject} isActive />
            ) : null
          }
        />
      </section>

      <GamesSection />

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-6">
            <div>
              <h2 className="font-inria text-3xl font-bold">
                {t('projects.customersTitle')}
              </h2>
              <p className="mt-2 text-muted">
                {t('projects.customersSubtitle')}
              </p>
            </div>
          </div>
          <PartnersCarousel logos={partners} />
        </div>
      </section>
    </main>
  );
};

export default Work;
