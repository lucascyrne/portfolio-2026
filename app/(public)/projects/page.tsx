'use client';

import useCustomCursor from '@/resources/hooks/useCustomCursor';
import useRevealText from '@/resources/hooks/useRevealText';
import { AppLocale, useI18n } from '@/resources/i18n';
import ProjectStickyPreview from '@/components/core/ProjectStickyPreview';
import OrbitShowcase, { type OrbitItem } from '@/components/core/OrbitShowcase';
import GamesSection from '@/components/core/GamesSection';
import HorizonSectionTransition from '@/components/core/HorizonSectionTransition';
import { useMemo, useState } from 'react';
import FooterContact from '@/components/core/FooterContact';

const Work = () => {
  const { projects, t, locale } = useI18n();
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

      <section className="relative z-20 w-full px-6 pb-0">
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

      <HorizonSectionTransition active />

      <GamesSection />

      <FooterContact
        blurb={t('contact.footerBlurb')}
        rights={t('contact.footerRights')}
        locale={locale as AppLocale}
      />
    </main>
  );
};

export default Work;
