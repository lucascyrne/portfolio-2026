---
name: ajustes-finais-projetos-contato
overview: Corrigir diagramação de textos em projetos, tornar cards mais concisos com espaço garantido para badges, remover modal de case e padronizar CTAs/links de contato com currículo dinâmico por idioma.
todos:
  - id: fix-projects-subtitle-layout
    content: Ajustar diagramação do subtítulo da página de projetos para leitura consistente em todos os idiomas
    status: completed
  - id: enforce-concise-card-copy
    content: Atualizar conteúdos dos cases em i18n com copy enxuta e título do case more fixado em Mais...
    status: completed
  - id: prevent-card-badge-overflow
    content: Ajustar layout tipográfico/estrutural do ProjectCard para sempre sobrar espaço abaixo das badges sem clipping na borda
    status: completed
  - id: set-sticky-preview-dark-text
    content: Garantir texto preto no ProjectStickyPreview para legibilidade sobre vídeos com fundo claro
    status: completed
  - id: remove-case-modal-and-cta
    content: Remover uso do ProjectCaseModal e remover botão Abrir estudo de caso do ProjectStickyPreview
    status: completed
  - id: update-contact-ctas-email-links
    content: Atualizar email, LinkedIn e GitHub nos componentes de contato e no i18n correspondente
    status: completed
  - id: implement-locale-resume-routing
    content: Implementar roteamento do currículo por idioma ativo (pt PDF local PT-BR, demais PDF local EN)
    status: completed
  - id: sync-footer-contact-links
    content: Alinhar FooterContact com os mesmos links e lógica de currículo definidos para contato
    status: completed
  - id: validate-lint-and-copy-consistency
    content: Validar lint e consistência textual/funcional entre idiomas e componentes
    status: completed
isProject: false
---

# Ajustes finais de textos e conteúdo

## Objetivo

Aplicar os ajustes finais de copy, diagramação e links em `projects` e `contact`, garantindo legibilidade multilíngue, cards concisos sem perda de badges, remoção completa do fluxo de modal e consistência dos CTAs (email, currículo, LinkedIn e GitHub).

## Causa raiz identificada

- A quebra visual da descrição em `projects` está sensível ao comprimento dos textos por idioma (sem balanceamento tipográfico).
- Os textos dos cards são alimentados por i18n e a copy atual está longa para o espaço útil do componente.
- O `ProjectCard` usa altura fixa com título/domínio + badges no mesmo fluxo vertical; quando o texto cresce, as badges encostam/ocultam na borda.
- `ProjectStickyPreview` usa texto temático (`text-foreground`/`text-muted`) que perde contraste sobre vídeos claros.
- O fluxo de modal ainda está ativo (`ProjectCaseModal` + botão de abertura), apesar de não ser mais necessário.
- Links de contato/currículo estão hardcoded em múltiplos componentes, com inconsistência de email e destino de currículo por idioma.

## Arquivos a alterar

- [C:/Projects/workspace/portfolio-2024/app/(public)/projects/page.tsx](<C:/Projects/workspace/portfolio-2024/app/(public)/projects/page.tsx>)
- [C:/Projects/workspace/portfolio-2024/components/core/ProjectCard.tsx](C:/Projects/workspace/portfolio-2024/components/core/ProjectCard.tsx)
- [C:/Projects/workspace/portfolio-2024/components/core/ProjectStickyPreview.tsx](C:/Projects/workspace/portfolio-2024/components/core/ProjectStickyPreview.tsx)
- [C:/Projects/workspace/portfolio-2024/components/core/ProjectCaseModal.tsx](C:/Projects/workspace/portfolio-2024/components/core/ProjectCaseModal.tsx)
- [C:/Projects/workspace/portfolio-2024/resources/i18n/messages/pt.json](C:/Projects/workspace/portfolio-2024/resources/i18n/messages/pt.json)
- [C:/Projects/workspace/portfolio-2024/resources/i18n/messages/en.json](C:/Projects/workspace/portfolio-2024/resources/i18n/messages/en.json)
- [C:/Projects/workspace/portfolio-2024/resources/i18n/messages/es.json](C:/Projects/workspace/portfolio-2024/resources/i18n/messages/es.json)
- [C:/Projects/workspace/portfolio-2024/resources/i18n/messages/zh.json](C:/Projects/workspace/portfolio-2024/resources/i18n/messages/zh.json)
- [C:/Projects/workspace/portfolio-2024/app/(public)/contact/page.tsx](<C:/Projects/workspace/portfolio-2024/app/(public)/contact/page.tsx>)
- [C:/Projects/workspace/portfolio-2024/components/core/ContactIntroSection.tsx](C:/Projects/workspace/portfolio-2024/components/core/ContactIntroSection.tsx)
- [C:/Projects/workspace/portfolio-2024/components/core/FooterContact.tsx](C:/Projects/workspace/portfolio-2024/components/core/FooterContact.tsx)

## Estratégia de implementação

- Ajustar classes do subtítulo em `projects/page.tsx` para leitura consistente entre idiomas (`text-balance`, `leading-relaxed`, largura por `ch`).
- Revisar e atualizar os blocos `projects.cases.*` nos 4 arquivos de i18n com copy mais concisa:
  - `more`: título exatamente `Mais...`, com reforço de perfil pleno full stack e ~6 anos de mercado em texto curto.
  - `latsys`: gestão abrangente e exportação de relatórios.
  - `cofrin`: gratuito, fluxos modernos/intuitivos, autoimport de extrato e relatórios úteis.
  - `beth-front`: linguagem moderna/elegante com foco em impacto e venda da artista.
  - `maid-system`: incluir gestão de bases/unidades, solicitações de limpeza/lavanderia e 3 stakeholders (gestor, cliente, trabalhador[a]).
- Ajustar estrutura do `ProjectCard` para reservar espaço fixo de badges e evitar overflow/clipping com textos longos (limite de linhas e/ou distribuição flex vertical).
- Definir textos do `ProjectStickyPreview` em preto para manter contraste sobre vídeos com fundo branco/claro.
- Remover completamente modal e CTA de abertura de case:
  - retirar botão `projects.openCase` do `ProjectStickyPreview`;
  - remover estado e import do `ProjectCaseModal` em `projects/page.tsx`;
  - remover renderização final do modal e excluir arquivo `ProjectCaseModal.tsx`.
- Atualizar CTAs de contato para novo email `cyrnedev@gmail.com` (hints e `mailto:`), além de garantir LinkedIn/GitHub informados.
- Implementar seleção de currículo por idioma usando `locale`:
  - `pt` -> `/assets/docs/resume-pt-br-2026.pdf`
  - `en/es/zh` -> `/assets/docs/resume-eng-2026.pdf`
- Atualizar `FooterContact.tsx` para refletir os mesmos destinos de LinkedIn/GitHub/currículo, mantendo consistência com a página de contato.

## Critérios de aceite

- Subtítulo de `projects` não quebra de forma ruim no meio da segunda frase em nenhum idioma.
- Cards de projeto exibem copy enxuta em todos os idiomas e o case `more` mostra o título `Mais...`.
- Em qualquer card e idioma, as badges sempre permanecem totalmente visíveis e com respiro abaixo (sem encostar/ocultar na borda).
- `ProjectStickyPreview` exibe título, domínio, resumo e badges em preto com contraste adequado sobre vídeos claros.
- `ProjectCaseModal` deixa de existir no fluxo (sem import, sem estado de abertura, sem botão `Abrir estudo de caso`, sem renderização do modal).
- Todos os CTAs de email usam `cyrnedev@gmail.com`.
- Link de currículo troca automaticamente entre PDF PT-BR e PDF ENG conforme idioma ativo.
- `FooterContact` e seção de contato usam os mesmos links de LinkedIn e GitHub definidos.
- Sem erros de lint nos arquivos alterados.
