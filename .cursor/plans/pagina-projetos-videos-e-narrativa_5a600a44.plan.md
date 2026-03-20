---
name: pagina-projetos-videos-e-narrativa
overview: Redesenhar a página de projetos para usar eficazmente os vídeos, manter a ideia de quadrantes e apresentar melhor os estudos de caso.
todos:
  - id: dados-projetos
    content: Criar e preencher arquivo de dados estruturados dos projetos com base no currículo
    status: pending
  - id: layout-quadrantes
    content: Refatorar layout da página de projetos para o novo arranjo de quadrantes
    status: pending
  - id: player-videos
    content: Implementar ProjectVideoPlayer e modais de detalhes por projeto
    status: pending
  - id: cursor-responsivo
    content: Revisar cursor/máscara para comportamento amigável em desktop e mobile
    status: pending
isProject: false
---

# Página de projetos: vídeos e narrativa

## Objetivo

Transformar a página de projetos em uma vitrine interativa que combina a estética atual com um storytelling claro dos principais trabalhos.

## Escopo

- Modelo de dados dos projetos.
- Layout em quadrantes evoluído.
- Galeria/carrossel de vídeos e modais detalhados.
- Textos de estudo de caso baseados no currículo.

## Passos

- **Definir modelo de dados de projetos**
  - Criar `resources/projects-data.ts` com campos: `id`, `title`, `role`, `year`, `stack`, `domain`, `summary`, `problem`, `solution`, `impact`, `videos` (web/mobile), `tags`.
  - Preencher pelo menos para: Latsys, Maid System, Elo Health, Beth-front, Cofrin e outros relevantes.
- **Escolher projetos em destaque**
  - Marcar 3–4 projetos com flag `featured=true` para aparecerem com maior destaque na interface.
- **Reorganizar layout em quadrantes**
  - Quadrante 1: título "Projects" com descrição curta e microcopy ao hover ("There's much more!").
  - Quadrante 2: galeria/carrossel de vídeos dos projetos em destaque, com thumbs grandes.
  - Quadrante 3: lista de cards de projetos (rolagem vertical ou grid) que abrem detalhes ao clique.
  - Quadrante 4: logos de clientes/parceiros com animação horizontal contínua e copy como "The best of all time!".
- **Criar `ProjectVideoPlayer` e modais de detalhe**
  - Componente que mostra thumb + overlay play; ao clicar, abre modal:
    - Vídeo principal (web ou seletor Web/Mobile).
    - Blocos de texto: contexto, problema, solução, resultados.
    - Links rápidos (site, repositório, caso exista).
  - Fechamento por botão "close" e tecla `Esc`.
- **Integração com cursor personalizado**
  - Manter ou simplificar `useCustomCursor` para não prejudicar leitura:
    - Ativar efeito de máscara apenas em áreas específicas (ex.: banner superior ou fundos sólidos).
    - Fallback suave para mobile (cursor padrão, sem máscara).
- **Polimento e responsividade**
  - Garantir que vídeos e thumbs funcionem bem em telas pequenas (stack vertical, carrossel touch-friendly).
  - Ajustar transições entre quadrantes e modais para uma experiência fluida.
