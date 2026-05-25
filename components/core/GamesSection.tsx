'use client';

import MediaEmbedFrame from '@/components/core/MediaEmbedFrame';
import HorizonLine from '@/components/core/HorizonLine';
import OrbitShowcase, { type OrbitItem } from '@/components/core/OrbitShowcase';
import { gamesBase } from '@/resources/games/games-data';
import { useI18n } from '@/resources/i18n';
import { useMemo, useState } from 'react';

const GamesSection = () => {
  const { t, messages } = useI18n();
  const cases = messages.projects.games.cases;

  const orbitItems: OrbitItem[] = useMemo(
    () =>
      gamesBase.map((game) => {
        const copy =
          cases[game.id as keyof typeof cases] ??
          cases['a-escalada' as keyof typeof cases];

        return {
          id: game.id,
          title: copy.title,
          domain: copy.genre,
          problem: copy.tagline,
          tags: ['Jogo'],
        };
      }),
    [cases]
  );

  const [activeGameId, setActiveGameId] = useState(
    orbitItems[0]?.id ?? gamesBase[0]?.id
  );

  const activeGame = useMemo(
    () => gamesBase.find((g) => g.id === activeGameId) ?? gamesBase[0],
    [activeGameId]
  );

  return (
    <section
      id="games"
      className="overflow-x-hidden py-12 md:py-16"
      aria-labelledby="games-heading"
    >
      <HorizonLine
        active
        containerClassName="relative left-1/2 mb-8 w-screen -translate-x-1/2 md:mb-10"
      />

      <div className="px-6">
        <div className="mx-auto mb-6 max-w-6xl md:mb-8">
          <h2
            id="games-heading"
            className="font-inria text-3xl font-bold md:text-4xl"
          >
            {t('projects.gamesTitle')}
          </h2>
          <p className="mt-3 max-w-[62ch] text-balance leading-relaxed text-muted">
            {t('projects.gamesSubtitle')}
          </p>
        </div>
      </div>

      <div className="w-full px-6">
        <OrbitShowcase
          items={orbitItems}
          activeId={activeGameId}
          onActiveIdChange={setActiveGameId}
          showReset={orbitItems.length > 1}
          centerMaxWidthClass="mx-auto w-full max-w-4xl"
          renderCenter={() =>
            activeGame ? (
              <div className="relative w-full aspect-video lg:aspect-[2196/1080]">
                <div className="relative h-full overflow-hidden rounded-3xl ring-1 ring-border">
                  <MediaEmbedFrame
                    embedUrl={activeGame.embedUrl}
                    iframeTitle={t('projects.gameIframeTitle')}
                    openNewTabLabel={t('projects.openDemoNewTab')}
                    embedUnavailableTitle={t('projects.embedUnavailableTitle')}
                    embedUnavailableHint={t('projects.embedUnavailableHint')}
                    isActive
                  />
                </div>
              </div>
            ) : null
          }
        />
      </div>
    </section>
  );
};

export default GamesSection;
