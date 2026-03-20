---
name: drag-projetos-orbita
overview: Transformar a seção de `projects` em um layout central (vídeo) com cards orbitando, permitindo drag livre por card dentro dos limites da seção, sem trocar o vídeo durante o drag (troca apenas no clique), incluindo reset sutil.
todos:
  - id: pc-draggable-props
    content: Atualizar `components/core/ProjectCard.tsx` para aceitar `position`, `boundsRef`, `onPositionChange`, e implementar drag via Pointer Events com `movedRef` bloqueando `onSelect` durante arraste.
    status: pending
  - id: pc-absolute-layout
    content: No `ProjectCard.tsx`, renderizar o card com `absolute`/`transform translate3d(x,y)` controlado pelo pai, mantendo classes atuais de dimensão fixa.
    status: pending
  - id: projects-orbit-layout
    content: Reescrever `app/(public)/projects/page.tsx` para trocar o rail por um container central (`orbitRef`) com `ProjectStickyPreview` posicionado no centro e cards orbitando ao redor usando `cardPositions`.
    status: pending
  - id: initial-positions-reset
    content: Implementar geração de posições iniciais (polar angles) + botão sutil de reset que recalcula `cardPositions` preservando `activeProjectId`.
    status: pending
  - id: resize-clamp
    content: Adicionar `ResizeObserver` no `orbitRef` para clamping das posições existentes quando a área muda de tamanho.
    status: pending
  - id: sanity-check-lints
    content: Após editar, rodar verificação de lints/diagnósticos para garantir que tipagens/handlers estão corretos e não há erros TS/React.
    status: pending
isProject: false
---

## Objetivo

- Deixar o vídeo centralizado e os `ProjectCard`s espalhados ao redor.
- Ao **clicar** em um card: o vídeo exibe o card clicado (mantendo o comportamento atual).
- Ao **clicar e segurar + arrastar**: o card pode ser movido livremente pela seção, mas o vídeo **não muda** durante o drag (muda só quando houver clique sem mover).
- Cards com dimensão fixa e conteúdo interno acomodado.
- Reset sutil para recuperar posição caso o usuário “perca” um card.

## Estratégia

### 1) Drag por card (no próprio `ProjectCard.tsx`)

- Adicionar props para permitir posicionamento controlado pelo pai:
  - `position: { x: number; y: number }`
  - `boundsRef: RefObject<HTMLDivElement>` (container onde o card deve ficar)
  - `onPositionChange(nextPos)` (atualiza x/y durante o drag)
  - `front?: boolean` (para z-index e evitar “sumir”)
- Implementar drag livre com **Pointer Events**:
  - `pointerDown`: captura pointer, registra `startPointerX/Y` e `startPosX/Y`, mede `cardW/cardH` e `bounds`.
  - `pointerMove`: calcula `dx/dy`, ativa `movedRef` quando passar de um threshold, clampa x/y dentro de `[0..bounds - card]` e chama `onPositionChange`.
  - `pointerUp`: solta pointer capture.
  - `onClick`: chama `onSelect(projectId)` **somente se** `movedRef` ainda for `false` (assim o vídeo troca apenas em clique sem arrastar).

### 2) Nova seção “órbita” (no `app/(public)/projects/page.tsx`)

- Remover o “Horizontal rail” (scroll/drag lateral atual) e substituí-lo por:
  - um container `orbitRef` com `relative` + altura fixa + `overflow-hidden`.
  - o `ProjectStickyPreview` (vídeo + texto) posicionado no centro.
  - os `ProjectCard`s renderizados como elementos `absolute` dentro do container, usando `x/y` vindos de estado.
- Gerar posições iniciais determinísticas em torno do centro (polar angles para N=projects.length).
- Reset sutil:
  - botão `Reset` que recalcula as posições iniciais.
  - opcionalmente, ao reset manter `activeProjectId` e só recalcular `cardPositions`.
- Robustez em resize:
  - usar `ResizeObserver` para clamping das posições existentes quando a área muda de tamanho (mantém cards dentro dos limites).

## Fluxo de dados (alto nível)

```mermaid
flowchart LR
  ActiveProject[activeProjectId] --> Preview[ProjectStickyPreview]
  CardPositions[cardPositions[x,y]] --> Cards[ProjectCard (style translate)]
  Drag[ProjectCard pointer events] --> CardPositions
  Click[ProjectCard onClick sem mover] --> ActiveProject
```

## Arquivos a alterar

- `[components/core/ProjectCard.tsx](components/core/ProjectCard.tsx)`
- `[app/(public)/projects/page.tsx](app/(public)/projects/page.tsx)`

## Possíveis riscos e como tratar

- Double-trigger (click após drag): mitigado com `movedRef` no `onClick`.
- Clamping incorreto por medir dimensões erradas: medir `cardW/cardH` no `pointerDown` e clamp usando `boundsRef.getBoundingClientRect()`.
- Cards “sumirem” por z-index ao terminar drag: mitigado com `frontProjectId` (z-index para card último interagido), sem alterar o vídeo durante drag.
