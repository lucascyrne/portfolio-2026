---
name: experiencia-audio-secret-mode-landing
overview: Refinar o player de áudio, o visualizador e o fluxo de secret mode na landing para uma experiência clara, responsiva e envolvente.
todos:
  - id: mapear-audio-atual
    content: Mapear e entender o fluxo atual de music-context, SoundVisualizer e secret mode
    status: pending
  - id: refatorar-contexto-audio
    content: Refatorar contexto de música com estados explícitos e métodos claros
    status: pending
  - id: audio-dock-ui
    content: Criar componente AudioDock com cópias e estados revisados
    status: pending
  - id: integrar-secret-mode
    content: Ajustar integração entre secret mode, trilhas de áudio e vídeo secreto
    status: pending
isProject: false
---

# Experiência de áudio e secret mode na landing

## Objetivo

Eliminar confusões no player de áudio, melhorar a visualização sonora e tornar o fluxo de secret mode mais intuitivo e confiável.

## Escopo

- Contexto e estados de áudio.
- Dock/botão de controle de música (play/pause).
- Visualizador de som e integração com o áudio real.
- Transição entre trilha base e trilha do secret mode.

## Passos

- **Mapear fluxo atual**
  - Revisar `resources/music/music-context.tsx`, `SoundVisualizer`, `SecretButton` e `Hero`.
  - Documentar estados reais hoje (quando o áudio carrega, quando o visualizador inicia, quando o secret mode troca a música).
- **Redesenhar modelo de estado do player**
  - Implementar estados explícitos: `idle`, `loading`, `playing`, `paused`, `error`.
  - Expor métodos no contexto: `playBaseTrack`, `playSecretTrack`, `togglePlayPause`, `stop`, `onError`.
  - Garantir lazy loading: o áudio só é criado/carregado no primeiro play.
- **Criar componente `AudioDock`**
  - Novo componente fixo no canto inferior (esquerdo ou direito) com:
    - Botão principal (ícone play/pause).
    - Label dinâmico por estado: mensagem inicial, carregando, tocando, pausado, erro.
    - Subtexto permanente após primeiro play: "Use fones de ouvido para uma melhor experiência".
  - Substituir mensagens antigas confusas ("Inicializando visualizador de áudio...").
- **Integrar com `SoundVisualizer`**
  - Conectar `SoundVisualizer` ao estado do player para:
    - Aparecer/animar apenas em `playing`.
    - Pausar/atenuar animações em `paused`.
  - Ajustar cores do visualizador com a paleta (gradiente do sol, reflexos).
- **Fluxo do secret mode**
  - Ajustar `Hero` e `SecretButton` para:
    - Ao ativar secret mode: setar `isSecretMode=true`, trocar para `secretTrack` com transição suave.
    - Ao fechar o vídeo secreto: resetar `isSecretMode=false` e retornar para `baseTrack`.
  - Garantir que o estado do dock reflita a trilha atual (ex.: label específica quando secret track está ativa).
- **Testes e polimento**
  - Validar comportamento em desktop e mobile (considerando autoplay restrictions).
  - Testar ciclos de play/pause/secret/fechar várias vezes sem vazamento de áudio.
  - Ajustar timings de animação (hero fade, entrada do vídeo, visualizador) para fluidez.
