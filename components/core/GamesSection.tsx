'use client';

import GameEmbedStage from '@/components/core/GameEmbedStage';
import HorizonLine from '@/components/core/HorizonLine';
import { gamesBase } from '@/resources/games/games-data';
import { useI18n } from '@/resources/i18n';

const GamesSection = () => {
  const { t, messages } = useI18n();
  const cases = messages.projects.games.cases;

  return (
    <section
      id="games"
      className="overflow-x-hidden px-6 py-12 md:py-16"
      aria-labelledby="games-heading"
    >
      <HorizonLine
        active
        containerClassName="relative left-1/2 mb-8 w-screen -translate-x-1/2 md:mb-10"
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 md:mb-8">
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

        <div className="flex flex-col gap-8">
          {gamesBase.map((game) => {
            const copy =
              cases[game.id as keyof typeof cases] ??
              cases['a-escalada' as keyof typeof cases];

            return (
              <GameEmbedStage
                key={game.id}
                embedUrl={game.embedUrl}
                title={copy.title}
                genre={copy.genre}
                tagline={copy.tagline}
                playLabel={t('projects.playGame')}
                closeLabel={t('projects.closeGame')}
                iframeTitle={t('projects.gameIframeTitle')}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
