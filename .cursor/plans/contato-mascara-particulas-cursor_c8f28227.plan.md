---
name: contato-mascara-particulas-cursor
overview: Aplicar o mesmo reveal circular por máscara da página de projetos em toda a primeira seção de contato, revelando um céu estrelado idêntico ao da home que começa oculto e aparece apenas no radial em torno do cursor.
todos:
  - id: adapt-reveal-contact-intro
    content: Aplicar estrutura de máscara na intro inteira em contact/page.tsx cobrindo toda a largura da viewport e removendo borda da seção
    status: completed
  - id: replicate-hidden-home-star-sky
    content: Replicar o céu estrelado da home de forma idêntica na seção de contato como camada oculta (reveal-hidden), sem alterar a identidade visual original do Hero
    status: completed
  - id: wire-radial-reveal-to-stars
    content: Conectar o movimento do mouse ao reveal circular da seção para que o radial revele a camada de céu estrelado de forma idêntica ao comportamento dos projetos
    status: completed
  - id: polish-css-a11y
    content: Ajustar CSS global para preservar legibilidade do conteúdo na camada visível e validar fallback para reduced-motion e touch sem efeitos pesados
    status: completed
  - id: validate-no-regressions
    content: Revisar impacto em Hero, StarsField, HorizonLine e ProjectCard para garantir comportamento idêntico sem regressões
    status: completed
isProject: false
---

# Máscara radial + céu estrelado oculto

## Objetivo

Implementar na primeira seção de contato um reveal circular por máscara idêntico ao da página de projetos, aplicado em toda a largura da seção, para revelar um céu estrelado idêntico ao da home que inicia oculto.

## Arquivos principais

- [C:/Projects/workspace/portfolio-2024/app/(public)/contact/page.tsx](<C:/Projects/workspace/portfolio-2024/app/(public)/contact/page.tsx>)
- [C:/Projects/workspace/portfolio-2024/components/core/StarsField.tsx](C:/Projects/workspace/portfolio-2024/components/core/StarsField.tsx)
- [C:/Projects/workspace/portfolio-2024/components/core/HorizonLine.tsx](C:/Projects/workspace/portfolio-2024/components/core/HorizonLine.tsx)
- [C:/Projects/workspace/portfolio-2024/resources/hooks/useRevealText.ts](C:/Projects/workspace/portfolio-2024/resources/hooks/useRevealText.ts)
- [C:/Projects/workspace/portfolio-2024/app/globals.css](C:/Projects/workspace/portfolio-2024/app/globals.css)

## Estratégia de implementação

- Reaproveitar o padrão `reveal-area`/`reveal-hidden`/`reveal-visible` na primeira seção de contato como wrapper full-width (de uma borda da viewport à outra), removendo borda visual extra nessa seção.
- Colocar o mesmo céu estrelado da home (mesmos componentes e parâmetros-base) dentro da camada `reveal-hidden`, mantendo-o completamente oculto fora do radial.
- Manter a camada `reveal-visible` com o conteúdo textual e CTAs, garantindo legibilidade alta enquanto o radial percorre a seção.
- Reutilizar o mecanismo de mousemove já usado nos projetos (`useRevealText` + `clip-path: circle(...)`) para que a revelação circular no contato seja idêntica em comportamento e sensação.
- Garantir fallback de acessibilidade/performance: desativar ou simplificar o efeito em `prefers-reduced-motion` e ponteiro `coarse` (touch), preservando layout e conteúdo.

## Critérios de aceite

- A primeira seção de contato ocupa visualmente toda a largura da viewport para o efeito e não adiciona borda extra.
- O céu estrelado usado na home é replicado de forma idêntica na seção de contato, porém começa oculto.
- O radial circular ao redor do mouse revela esse céu estrelado com comportamento equivalente ao reveal dos cards de projetos.
- Em mobile/touch e `prefers-reduced-motion`, a seção mantém experiência estável e legível sem custo excessivo.
- Hero/home e cards de projetos continuam sem regressão visual/comportamental.

## Sugestões extras (opcionais após MVP)

- Adicionar um `backdrop` radial de baixa opacidade no `reveal-hidden` para suavizar a transição entre conteúdo e céu estrelado.
- Incluir um limite de FPS para atualizações do clip-path em dispositivos menos potentes.
- Ajustar dinamicamente raio do reveal com breakpoints para manter proporção visual em telas muito largas.
