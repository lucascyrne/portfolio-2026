'use client';

import { useMusic } from '@/resources/music/music-context';
import { useI18n } from '@/resources/i18n';
import { ClipLoader } from 'react-spinners';
import { IoPause, IoPlay } from 'react-icons/io5';

const AudioDock = () => {
  const {
    state,
    isPlaying,
    audioReady,
    activeTrack,
    loading,
    ensureAudioReadyAndPlayBase,
    togglePlayPause,
  } = useMusic();
  const { t } = useI18n();

  const handleClick = async () => {
    if (!audioReady) {
      await ensureAudioReadyAndPlayBase();
      return;
    }

    await togglePlayPause();
  };

  const getLabel = () => {
    if (!audioReady && loading.initializeAudioContext) {
      return t('audio.loading');
    }

    if (!audioReady) {
      return t('audio.clickStart');
    }

    if (state === 'error') {
      return t('audio.error');
    }

    if (!isPlaying && state === 'paused' && !loading.initializeAudioContext) {
      return t('audio.readyClick');
    }

    if (isPlaying) {
      return activeTrack === 'secret'
        ? t('audio.secretPlaying')
        : t('audio.mainPlaying');
    }

    return t('audio.paused');
  };

  return (
    <div className="fixed left-4 bottom-4 z-40 flex items-center gap-3 rounded-full px-4 py-2 bg-surface text-foreground shadow-lg border border-border/60 backdrop-blur-md">
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground shadow-sm"
        aria-label={isPlaying ? t('audio.pauseAria') : t('audio.playAria')}
      >
        {state === 'loading' ? (
          <ClipLoader size={18} />
        ) : isPlaying ? (
          <IoPause size={18} />
        ) : (
          <IoPlay size={18} />
        )}
      </button>
      <div className="flex flex-col">
        <span className="text-xs font-medium">{getLabel()}</span>
        {audioReady && (
          <span className="text-[11px] text-muted-foreground">
            {t('audio.headphones')}
          </span>
        )}
      </div>
    </div>
  );
};

export default AudioDock;
