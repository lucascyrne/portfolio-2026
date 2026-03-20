import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type PlayerState = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

type ActiveTrack = 'base' | 'secret';

type MusicContextType = {
  isPlaying: boolean;
  state: PlayerState;
  activeTrack: ActiveTrack;
  initializeAudioContext: () => void;
  togglePlayPause: () => void;
  ensureAudioReadyAndPlayBase: () => Promise<void>;
  ensureAudioReadyAndPlaySecret: () => Promise<void>;
  playBaseTrack: () => Promise<void>;
  playSecretTrack: () => Promise<void>;
  fadeToBaseTrack: (args: { durationMs: number }) => Promise<void>;
  stop: () => void;
  audioRef1: React.RefObject<HTMLAudioElement>;
  audioRef2: React.RefObject<HTMLAudioElement>;
  analyser: AnalyserNode | null;
  audioReady: boolean;
  loading: Record<string, boolean>;
};

const initialLoadingObject = {
  initializeAudioContext: false,
  connectAudio: false,
  togglePlayPause: false,
  changeTrack: false,
};

// Cria o contexto
const MusicContext = createContext<MusicContextType | undefined>(undefined);

const useMusicState = () => {
  const [loading, setLoading] = useState(initialLoadingObject);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef1 = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [state, setState] = useState<PlayerState>('idle');
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [activeAudio, setActiveAudio] = useState<1 | 2>(1);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const fadeTokenRef = useRef(0);

  const mediaElementSourceRef = useRef<
    Map<HTMLAudioElement, MediaElementAudioSourceNode>
  >(new Map());

  const toggleLoading = useCallback(
    (key: keyof typeof loading, state: boolean) => {
      setLoading((prev) => ({ ...prev, [key]: state }));
    },
    []
  );

  const initializeAudioContext = useCallback(async () => {
    if (audioInitialized) return;

    toggleLoading('initializeAudioContext', true);
    try {
      setState('loading');
      // #region agent log
      fetch('http://127.0.0.1:7684/ingest/6fbaaf9d-b443-4554-a05b-0c553472d370', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Debug-Session-Id': '5ef607',
        },
        body: JSON.stringify({
          sessionId: '5ef607',
          runId: 'init-audio-1',
          hypothesisId: 'H1',
          location: 'music-context.tsx:initializeAudioContext:start',
          message: 'initializeAudioContext called',
          data: { audioInitialized },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion agent log
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioCtxRef.current = audioCtx;

      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      // Configura o AnalyserNode
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 256; // Ajuste conforme necessário
      setAnalyser(analyserNode);

      // Conecta o áudio ao analyser
      const connectAudio = (audio: HTMLAudioElement | null) => {
        if (!audio || !audioCtxRef.current || !analyserNode) return;

        let source = mediaElementSourceRef.current.get(audio);
        if (!source) {
          source = audioCtxRef.current.createMediaElementSource(audio);
          mediaElementSourceRef.current.set(audio, source);
        }

        source.connect(analyserNode);
        analyserNode.connect(audioCtxRef.current.destination);
      };

      // Conectar o analyser a ambos os áudios
      connectAudio(audioRef1.current);
      connectAudio(audioRef2.current);

      setAudioInitialized(true);
      setAudioReady(true);
      setState('paused');
      // #region agent log
      fetch('http://127.0.0.1:7684/ingest/6fbaaf9d-b443-4554-a05b-0c553472d370', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Debug-Session-Id': '5ef607',
        },
        body: JSON.stringify({
          sessionId: '5ef607',
          runId: 'init-audio-1',
          hypothesisId: 'H1',
          location: 'music-context.tsx:initializeAudioContext:end',
          message: 'initializeAudioContext finished',
          data: { audioInitialized: true, audioReady: true, ctxState: audioCtx.state },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion agent log
    } finally {
      toggleLoading('initializeAudioContext', false);
    }
  }, [audioInitialized, toggleLoading]);

  const getAudioByIndex = useCallback(
    (index: 1 | 2) => (index === 1 ? audioRef1.current : audioRef2.current),
    []
  );

  const playTrack = useCallback(
    async (target: 1 | 2, syncPosition = true) => {
      const from = getAudioByIndex(activeAudio);
      const to = getAudioByIndex(target);

      if (!to) return;

      toggleLoading('changeTrack', true);
      setState('loading');
      try {
        // Pausa sempre todas as trilhas antes de tocar a nova
        from?.pause();

        if (syncPosition && from) {
          to.currentTime = from.currentTime;
        }

        await to.play();

        setActiveAudio(target);
        setIsPlaying(true);
        setState('playing');
      } catch (error) {
        console.error('Erro ao tocar trilha de áudio:', error);
        // Alguns navegadores ainda podem bloquear o primeiro play mesmo após interação.
        // Tratamos esse caso como \"áudio pronto, mas pausado\" em vez de erro fatal.
        const name = (error as any)?.name ?? '';
        if (name === 'NotAllowedError') {
          setState('paused');
        } else {
          setState('error');
        }
      } finally {
        toggleLoading('changeTrack', false);
      }
    },
    [activeAudio, toggleLoading, getAudioByIndex]
  );

  const playBaseTrack = useCallback(
    async () => {
      await playTrack(1, activeAudio === 2);
    },
    [activeAudio, playTrack]
  );

  const playSecretTrack = useCallback(
    async () => {
      await playTrack(2, activeAudio === 1);
    },
    [activeAudio, playTrack]
  );

  const fadeToBaseTrack = useCallback(
    async ({ durationMs }: { durationMs: number }) => {
      // Crossfade sutil sem reiniciar o tempo: só interpolamos volume.
      if (activeAudio === 1) return;
      if (!audioInitialized || !isPlaying) return;

      const from = audioRef2.current; // secret
      const to = audioRef1.current; // base
      if (!from || !to) return;

      const token = ++fadeTokenRef.current;
      const fromStartVolume = from.volume ?? 1;
      const syncTime = from.currentTime;

      // Mantém o mesmo tempo, mas com volume 0 no destino.
      to.currentTime = syncTime;
      to.volume = 0;

      try {
        await to.play();
      } catch {
        // Se o browser bloquear o play, ainda assim não queremos estourar a UX.
      }

      const start = performance.now();

      const tick = (now: number) => {
        if (fadeTokenRef.current !== token) return;

        const rawT = (now - start) / durationMs;
        const t = Math.max(0, Math.min(1, rawT));
        const eased = t; // linear: suficientemente sutil e estável

        from.volume = fromStartVolume * (1 - eased);
        to.volume = eased;

        if (t < 1) {
          requestAnimationFrame(tick);
          return;
        }

        // Finaliza a transição.
        try {
          from.pause();
        } catch {
          // ignore
        }
        from.volume = 0;
        to.volume = 1;

        setActiveAudio(1);
        setState('playing');
        setIsPlaying(true);
      };

      requestAnimationFrame(tick);
    },
    [activeAudio, audioInitialized, isPlaying]
  );

  const ensureAudioReadyAndPlayBase = useCallback(async () => {
    try {
      if (!audioInitialized) {
        await initializeAudioContext();
      }

      // #region agent log
      fetch('http://127.0.0.1:7684/ingest/6fbaaf9d-b443-4554-a05b-0c553472d370', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Debug-Session-Id': '5ef607',
        },
        body: JSON.stringify({
          sessionId: '5ef607',
          runId: 'init-audio-1',
          hypothesisId: 'H2',
          location: 'music-context.tsx:ensureAudioReadyAndPlayBase:beforePlay',
          message: 'After initializeAudioContext',
          data: { audioInitialized, audioReady, state },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion agent log

      await playBaseTrack();
    } catch (error) {
      console.error('Erro ao inicializar áudio base:', error);
      setState('error');
    }
  }, [audioInitialized, audioReady, state, initializeAudioContext, playBaseTrack]);

  const ensureAudioReadyAndPlaySecret = useCallback(async () => {
    try {
      if (!audioInitialized) {
        await initializeAudioContext();
      }
      await playSecretTrack();
    } catch (error) {
      console.error('Erro ao inicializar áudio secret:', error);
      setState('error');
    }
  }, [audioInitialized, initializeAudioContext, playSecretTrack]);

  const togglePlayPause = useCallback(async () => {
    if (!audioReady) return;

    const currentAudio = getAudioByIndex(activeAudio);
    if (!currentAudio) return;

    if (isPlaying) {
      currentAudio.pause();
      setIsPlaying(false);
      setState('paused');
    } else {
      // #region agent log
      fetch('http://127.0.0.1:7684/ingest/6fbaaf9d-b443-4554-a05b-0c553472d370', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Debug-Session-Id': '5ef607',
        },
        body: JSON.stringify({
          sessionId: '5ef607',
          runId: 'init-audio-1',
          hypothesisId: 'H3',
          location: 'music-context.tsx:togglePlayPause:beforePlay',
          message: 'Attempting play on currentAudio',
          data: { audioReady, activeAudio, isPlaying },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion agent log

      try {
        await currentAudio.play();
        setIsPlaying(true);
        setState('playing');
      } catch (error) {
        console.error('Erro ao alternar play/pause:', error);
        const name = (error as any)?.name ?? '';
        if (name === 'NotAllowedError') {
          // Contexto desbloqueado, mas play ainda bloqueado: mantemos como pausado.
          setState('paused');
        } else {
          setState('error');
        }
      }
    }
  }, [audioReady, activeAudio, isPlaying, getAudioByIndex]);

  const stop = useCallback(() => {
    const current = getAudioByIndex(activeAudio);
    current?.pause();
    if (current) current.currentTime = 0;
    setIsPlaying(false);
    setState('idle');
  }, [activeAudio, getAudioByIndex]);

  // useEffect(() => {
  //   const unlockAudio = () => {
  //     if (!audioCtx || audioInitialized) return;

  //     // Cria um buffer vazio
  //     const buffer = audioCtx.createBuffer(1, 1, 22050);
  //     const source = audioCtx.createBufferSource();
  //     source.buffer = buffer;

  //     // Conecta ao destino (alto-falantes)
  //     source.connect(audioCtx.destination);

  //     // Toca o som silencioso
  //     source.start(0);

  //     console.log('Áudio desbloqueado.');
  //     setAudioInitialized(true);

  //     // Remove o listener após desbloquear o áudio
  //     window.removeEventListener('touchstart', unlockAudio);
  //   };

  //   window.addEventListener('touchstart', unlockAudio, false);

  //   return () => {
  //     window.removeEventListener('touchstart', unlockAudio);
  //   };
  // }, [audioCtx, audioInitialized]);

  // useEffect(() => {
  //   const unlockAudio = () => {
  //     if (!audioCtx || audioInitialized) return;

  //     const buffer = audioCtx.createBuffer(1, 1, 22050);
  //     const source = audioCtx.createBufferSource();
  //     source.buffer = buffer;
  //     source.connect(audioCtx.destination);
  //     source.start(0);

  //     // Inicializa e conecta o AnalyserNode
  //     const analyserNode = audioCtx.createAnalyser();
  //     analyserNode.fftSize = 256;

  //     setAnalyser(analyserNode);
  //     setAudioInitialized(true);
  //     setAudioReady(true);

  //     console.log('AudioContext desbloqueado e AnalyserNode inicializado.');
  //     window.removeEventListener('touchstart', unlockAudio);
  //   };

  //   window.addEventListener('touchstart', unlockAudio, false);

  //   return () => {
  //     window.removeEventListener('touchstart', unlockAudio);
  //   };
  // }, [audioCtx, audioInitialized]);

  return {
    isPlaying,
    state,
    activeTrack: activeAudio === 1 ? ('base' as ActiveTrack) : ('secret' as ActiveTrack),
    initializeAudioContext,
    togglePlayPause,
    ensureAudioReadyAndPlayBase,
    ensureAudioReadyAndPlaySecret,
    playBaseTrack,
    playSecretTrack,
    fadeToBaseTrack,
    stop,
    audioRef1,
    audioRef2,
    analyser,
    audioReady,
    loading,
  };
};

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const musicState = useMusicState();

  return (
    <MusicContext.Provider value={musicState}>
      {children}
      <audio
        ref={musicState.audioRef1}
        src="assets/mp3/song.mp3"
        loop
        preload="auto"
      />
      <audio
        ref={musicState.audioRef2}
        src="assets/mp3/portfolio-song-final.mp3"
        loop
        preload="auto"
      />
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
