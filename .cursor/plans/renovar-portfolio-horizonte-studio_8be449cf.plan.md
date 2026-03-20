---
name: renovar-portfolio-horizonte-studio
overview: Atualizar o portfólio Horizonte Studio com nova identidade visual, melhor UX de áudio/secret mode, página de projetos mais interativa, contatos mais claros e internacionalização em 4 idiomas.
todos:
  - id: cores-ui-base
    content: Definir tokens da nova paleta de cores e atualizar Tailwind + componentes de UI base (logo, botões, fundos, tipografia)
    status: pending
  - id: audio-ux
    content: Refinar MusicProvider e o botão/dock de áudio para estados claros (idle/loading/playing/paused) e melhorar o SoundVisualizer
    status: pending
  - id: projects-page
    content: Redesenhar a página de projetos com modelo de dados, carrossel/galeria de vídeos e modais de detalhes por projeto
    status: pending
  - id: contact-page
    content: Reestruturar a página de contatos com seções claras, melhores textos e CTAs fortes
    status: pending
  - id: i18n
    content: Implementar infraestrutura de internacionalização (pt, en, es, zh) e migrar textos principais
    status: pending
  - id: qa-polish
    content: Realizar ajustes finais de performance, acessibilidade e microinterações em todas as páginas
    status: pending
isProject: false
---

## Visão geral

Vamos evoluir o portfólio mantendo Next.js/React e Tailwind, mas refinando visual, UX e arquitetura de conteúdo. O foco é: **novo sistema de cores alinhado às logos**, **experiência de áudio e "secret mode" mais clara e confiável**, **página de projetos que usa bem os vídeos**, **página de contatos mais estratégica** e **i18n em pt/es/en/zh**.

### Arquitetura atual (resumo rápido)

- **Layout raiz** em `[app/layout.tsx](app/layout.tsx)` com `MusicProvider`, `SecretModeProvider`, `Header`, `SideMenu` e `Footer` compartilhados.
- **Landing** em `[app/(public)/page.tsx](app/(public)/page.tsx)` usando `Hero`, `SecretVideoPlayer`, `SoundVisualizer` e `QuoteCarousel`.
- **Projetos** em `[app/(public)/projects/page.tsx](app/(public)/projects/page.tsx)` com cursor customizado/reveal.
- **Contato** em `[app/(public)/contact/page.tsx](app/(public)/contact/page.tsx)` com carrossel de recomendações, acordeão de skills, FAQ e blocos de contato.
- **Contexto de música** em `[resources/music/music-context.tsx](resources/music/music-context.tsx)` centralizando play/pause, troca de faixa e visualização.

Um fluxo simplificado da navegação pretendida:

```mermaid
flowchart LR
  landing[Landing /] --> aboutSecret[Modo "About me" + vídeo]
  landing --> projects[Projects]
  landing --> contact[Contact]
  aboutSecret --> landing
  projects --> projectDetail[Modal / seção detalhada com vídeo]
  projectDetail --> projects
  contact --> externalLinks[LinkedIn / Email / Outros]
```

## 1. Sistema visual e identidade (cores, tipografia, componentes)

- **Mapear paleta principal**:
  - **Primary**: `#D8656F` (reflexo / botões principais).
  - **Gradient sun**: `#F3407E` → `#E77B79` para elementos-chave (hero, ícones interativos, barras de áudio).
  - **Accent**: `#F3A07E` para hovers, estados ativos e pequenos detalhes.
  - **Dark**: `#2E2E2E` para tipografia principal em fundos claros.
  - **Light / Background**: `#EFEFF0` e `#F4F4F5` para o fundo e superfícies.
  - **Complementos**: definir 1–2 tons neutros (`#A1A1AA`, `#71717A`) e 1 cor de feedback (ex.: sucesso/sutil em verde suave).
- **Atualizar `tailwind.config.ts`**:
  - Criar um tema `horizonte` com tokens (`primary`, `accent`, `sunTop`, `sunBottom`, `background`, `text`, etc.).
  - Revisar gradientes globais (`bg-gradient-to-b from-gray-200...`) para usar os novos tons.
- **Componentizar a marca**:
  - Criar um componente `LogoHorizonte` em `components/ui` que use `next/image` com as novas versões da logo (incluindo variações para header claro/escuro).
  - Adaptar `Header` para usar `LogoHorizonte` e as novas cores, garantindo legibilidade em todas as páginas (especialmente em `secret mode` e projetos com fundos mistos).
- **Rever botões e microcomponentes**:
  - Refatorar `PrimaryButton`, `RoundedButton`, `SecretButton` para usar variantes (`primary`, `ghost`, `pill`, etc.) com tokens de cor.
  - Ajustar estados de foco/hover/active com microtransições suaves (ex.: `transition-colors`, `transition-transform`), evitando framer motion em elementos simples para manter performance.

## 2. Experiência de áudio e "secret mode" na landing

### 2.1. Estado e fluxo do player

- **Clarificar o papel do botão de áudio** no canto inferior (provavelmente em um componente dentro de `MusicProvider` ou similar):
  - Estados explícitos: `idle` (não iniciado), `loading`, `playing`, `paused`, `error`.
  - Mensagens de estado claras e coerentes com o comportamento real.
- **Refinar `music-context`** em `[resources/music/music-context.tsx](resources/music/music-context.tsx)`:
  - Garantir que as funções de inicialização de áudio sejam `lazy` (carregam apenas ao primeiro clique, não na montagem).
  - Expor eventos como `onLoadStart`, `onLoaded`, `onError` para que o componente de UI mostre feedback correto.
- **Sincronizar com `SecretMode`**:
  - Definir claramente as trilhas: `baseTrack` (melodia introspectiva) e `secretTrack` (synth + beat).
  - Documentar o fluxo: landing começa `silent` → clique no player inicializa e toca `baseTrack` → clique em "A bit more about me" ativa `secret mode`, muda trilha e exibe vídeo → ao fechar o vídeo, voltar para `baseTrack` (já configurado parcialmente em `[app/(public)/page.tsx](app/(public)/page.tsx)`).

### 2.2. UI/UX do botão de áudio e visualizador

- **Redesenhar o controle de áudio** (novo componente, ex.: `AudioDock`):
  - Layout tipo dock minimalista no canto inferior esquerdo/direito, com:
    - Ícone principal (play/pause) grande.
    - Label dinâmico: `Clique para iniciar a trilha`, `Carregando áudio...`, `Reproduzindo`, `Pausado`, `Erro ao carregar. Tentar novamente?`.
    - Subtexto constante: "**Use fones de ouvido para uma melhor experiência**" (mostrado após o primeiro play, persistente em todos os idiomas).
  - Eliminar mensagem enganosa de "Inicializando visualizador de áudio..."; se mantivermos algo semelhante, ela só aparece enquanto o áudio efetivamente carrega (`loading`).
- **Sombras/gradientes usando a paleta**:
  - Usar o gradiente do sol nas barras do visualizador (`SoundVisualizer`) e um leve brilho no botão quando o áudio está tocando.
- **Melhorar `SoundVisualizer`**:
  - Garantir que as barras coloridas só apareçam quando `playing`.
  - Explorar animações baseadas em `requestAnimationFrame` ou CSS `keyframes` sincronizadas com volume médio, evitando cálculos pesados.

### 2.3. Interação com o botão "A bit more about me"

- **Revisar `SecretButton` e `Hero`**:
  - Manter a animação horizontal que revela o texto, mas refinar easing e duração para combinar com o estilo suave da nova paleta.
  - Ao clicar:
    - Garantir que a trilha é trocada com um pequeno crossfade (se viável no `music-context`).
    - Aplicar um overlay gradiente suave sobre o vídeo-colagem para harmonizar com as cores das logos.

## 3. Nova experiência da página de projetos

### 3.1. Estrutura de conteúdo

- **Definir um modelo de dados para projetos** (ex.: `projectsData.ts` em `resources`):
  - Campos mínimos: `id`, `nome`, `ano`, `papel` (frontend/fullstack/etc.), `stack`, `tipo` (SaaS, landing, app mobile), `problema`, `solução`, `resultado`, `links` (vídeo web, vídeo mobile, repositório, se aplicável), `tags` (fintech, saúde, arte, etc.).
  - Incluir destaques para: **Latsys**, **Beth-front**, **Cofrin**, **Maid**, plus outros que considerar.
- **Escolher 3–4 projetos principais** para ganhar seções de destaque com vídeo maior e narrativa curta, mantendo outros em forma de cards menores.

### 3.2. Layout e interação

- **Manter a ideia de quadrantes**, mas torná-la mais funcional:
  - Quadrante 1: título "Projects" + pequena explicação do que o visitante vai encontrar.
  - Quadrante 2: **grade/carrossel de vídeos** dos projetos principais.
  - Quadrante 3: **lista navegável de projetos** (cards com hover states) que, ao clicar, abrem um **panel lateral ou modal** com o vídeo e detalhes.
  - Quadrante 4: clientes/parceiros (logos animadas horizontalmente) com microtexto sobre tipos de projetos.
- **Refinar o cursor/máscara**:
  - Avaliar se a máscara reversa continua em tela cheia ou só é ativada em áreas específicas, evitando distrair durante a leitura de textos longos.
  - Otimizar `useCustomCursor` para dispositivos touch (fallback para scroll normal sem cursor customizado).
- **Player de vídeo por projeto**:
  - Criar componente `ProjectVideoPlayer` com suporte a:
    - Thumb estática com botão play.
    - Ao clicar, exibir vídeo em overlay modal com fundo escurecido/gradiente e descrição do fluxo.
    - Controles simples (play/pause, mute, fechar).
  - Opcional: suporte a switch "Web / Mobile" quando houver dois formatos para o mesmo projeto.

### 3.3. Narrativa e textos (baseados no currículo)

- Para cada projeto principal, escrever resumo curto inspirado nas descrições do PDF, por exemplo:
  - **Latsys**: ERP comercial, foco em gestão de produtos/pedidos/estoque, relatórios, exportação para Magis TI.
  - **Maid System**: gestão de equipes de limpeza, dashboards operacionais.
  - **Elo Health**: gestão hospitalar modular.
  - Adaptar a linguagem para um tom consistente em pt/en/es/zh, com foco em impacto de negócio.

## 4. Página de Contatos mais estratégica

### 4.1. Organização de seções

- Reorganizar `[app/(public)/contact/page.tsx](app/(public)/contact/page.tsx)` em blocos claros:
  - **Intro**: frase curta sobre disponibilidade e tipo de parceria que você busca (freelance, contrato, consultoria).
  - **Áreas de atuação**: usar `SkillAccordion` para agrupar por temas (SaaS/Produtos Digitais, Fintech/Blockchain, Health/ERP, Games/Experiências Interativas).
  - **Recomendações**: manter `RecomendationsCarousel`, mas garantir legibilidade da tipografia nas novas cores.
  - **FAQ**: revisar perguntas para responder dúvidas comuns (disponibilidade, fuso, idioma, forma de trabalho, ferramentas, stack).
  - **CTA final forte**: seção `Let's build something` com botões para `Email`, `LinkedIn`, talvez `Calendly` se você usar.

### 4.2. UI e microinterações

- Adotar fundo claro consistente com o restante do site, usando blocos com leve sombra e bordas arredondadas.
- Para cada CTA principal, usar o gradiente do sol com texto escuro ou branco conforme contraste.
- Trabalhar transições verticais suaves entre seções (scroll snapping leve ou só `scroll-behavior: smooth`).

## 5. Internacionalização (pt, es, en, zh)

### 5.1. Estratégia técnica

- Utilizar o suporte de i18n do Next.js App Router ou biblioteca dedicada leve como `next-intl`:
  - Estrutura sugerida: pastas de mensagens em `i18n` ou `messages`, por exemplo `messages/pt.json`, `messages/en.json`, `messages/es.json`, `messages/zh.json`.
  - Chaves semânticas por domínio: `landing.hero.title`, `projects.latsys.description`, `contact.faq.q1`, etc.
- Configurar `RootLayout` em `[app/layout.tsx](app/layout.tsx)` para receber `locale` e envolver a árvore com provider de i18n.
- Adicionar seletor de idioma discreto no `Header` ou `SideMenu`:
  - Exibir língua atual (ex.: `PT`, `EN`, `ES`, `中文`).
  - Menu dropdown simples para troca de idioma que atualiza a rota ou o contexto de tradução.

### 5.2. Conteúdo e copywriting

- Criar primeira versão dos textos em **português** (mais rica e completa), depois adaptar para **inglês** com foco em recrutadores internacionais.
- Traduzir para **espanhol** e **mandarim simplificado** com versões levemente mais sintéticas (priorizando clareza).
- Garantir que elementos dinâmicos (mensagens do player, labels de botões, FAQ, títulos de seções) utilizem as chaves de i18n em vez de strings literais.

## 6. Performance, acessibilidade e detalhes finais

- **Performance**:
  - Verificar lazy loading de vídeos na página de projetos (usar `loading="lazy"`, `poster`, e eventualmente `next/dynamic` para componentes pesados).
  - Avaliar `MusicProvider` para evitar tocar/instanciar o áudio quando a aba estiver oculta (usar `visibilitychange` se for relevante).
- **Acessibilidade**:
  - Atribuir `aria-label` descritivos a botões icônicos (música, menu, play vídeo, fechar modal).
  - Garantir contraste adequado com a nova paleta (testando principalmente texto sobre gradientes).
  - Permitir navegação por teclado: foco visível, modais fechando com `Esc`.
- **SEO e metadados**:
  - Localizar `meta description` e títulos por idioma.
  - Adicionar `open graph` básicos para homepage e página de projetos principais.

## 7. Ordem sugerida de implementação

1. **Implementar novo sistema de cores e componentes de UI base** (paleta em Tailwind, `LogoHorizonte`, botões).
2. **Refinar `MusicProvider` + `AudioDock` + `SoundVisualizer`**, corrigindo o fluxo de estados e mensagens.
3. **Reestruturar a página de projetos** com modelo de dados, layout em quadrantes atualizado e modais de vídeo.
4. **Reorganizar página de contatos** com narrativa mais clara e CTAs fortes.
5. **Adicionar i18n** (infraestrutura, arquivos de mensagens, seletor de idioma) e migrar textos gradualmente.
6. **Passar por uma rodada de ajustes finos**: acessibilidade, microcopys, animações, responsividade.
