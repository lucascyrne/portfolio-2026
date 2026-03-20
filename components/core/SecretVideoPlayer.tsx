'use client';

import { RxCross2 } from 'react-icons/rx';
import { useEffect } from 'react';

const SecretVideoPlayer: React.FC<{
  onClose: () => void;
  isExiting?: boolean;
}> = ({ onClose, isExiting = false }) => {
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7684/ingest/6fbaaf9d-b443-4554-a05b-0c553472d370', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': '5ef607',
      },
      body: JSON.stringify({
        sessionId: '5ef607',
        runId: 'secret-close-1',
        hypothesisId: 'H5',
        location: 'SecretVideoPlayer.tsx:useEffect',
        message: 'SecretVideoPlayer mounted',
        data: {},
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion agent log
  }, []);

  return (
    <div
      className={`absolute inset-0 z-30 bg-background/60 backdrop-blur-sm transition-opacity duration-600 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Vídeo de fundo */}
      <video
        src="/assets/videos/portfolio-2024-video.mp4"
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        onError={() => console.error('Erro ao carregar o vídeo.')}
      />
      {/* Botão para fechar o vídeo */}
      <button
        onClick={() => {
          // #region agent log
          fetch(
            'http://127.0.0.1:7684/ingest/6fbaaf9d-b443-4554-a05b-0c553472d370',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Debug-Session-Id': '5ef607',
              },
              body: JSON.stringify({
                sessionId: '5ef607',
                runId: 'secret-close-1',
                hypothesisId: 'H5',
                location: 'SecretVideoPlayer.tsx:onClose',
                message: 'Secret close pressed',
                data: {},
                timestamp: Date.now(),
              }),
            }
          ).catch(() => {});
          // #endregion agent log
          onClose();
        }}
        className="fixed top-16 right-4 z-[70] text-accent-foreground bg-accent rounded-full p-2 text-lg cursor-pointer shadow-md ring-1 ring-border/60"
        aria-label="Fechar modo secreto"
      >
        <RxCross2 />
      </button>
    </div>
  );
};

export default SecretVideoPlayer;
