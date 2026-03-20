---
name: identidade-visual-e-componentes-ui
overview: Atualizar identidade visual, paleta de cores e componentes base (logo, botões, fundos, tipografia) do portfólio Horizonte Studio.
todos:
  - id: cores-tailwind
    content: Criar tokens de cor Horizonte em tailwind.config.ts e atualizar gradientes globais
    status: completed
  - id: logo-component
    content: Criar componente LogoHorizonte e integrá-lo ao Header
    status: completed
  - id: botoes-base
    content: Refatorar PrimaryButton, RoundedButton e SecretButton para usar variantes baseadas na nova paleta
    status: completed
  - id: tipografia
    content: Revisar escala tipográfica e aplicar aos principais headings
    status: completed
isProject: false
---

# Identidade visual e componentes de UI

## Objetivo

Deixar toda a interface coerente com as novas logos e paleta Horizonte, com componentes base reutilizáveis e acessíveis.

## Escopo

- Paleta de cores e tokens em Tailwind.
- Logo e variações de uso (claro/escuro, reduzido).
- Botões e componentes básicos (chips, badges, etc.).
- Fundos, gradientes e tipografia.

## Passos

- **Mapear paleta Horizonte**
  - Definir tokens: `primary`, `accent`, `sunTop`, `sunBottom`, `horizon`, `background`, `surface`, `textPrimary`, `textMuted`, `border`, `success`, etc.
  - Atualizar `tailwind.config.ts` com esses tokens e gradientes padrão (ex.: `bg-sunrise` usando `#F3407E` → `#E77B79`).
- **Atualizar base visual global**
  - Revisar `app/globals.css` para remover gradientes antigos de cinza e substituí-los por combinações da nova paleta.
  - Garantir que o `body` e seções principais usem `background` e `surface` em vez de cores literais.
- **Criar componente `LogoHorizonte`**
  - Adicionar imagens otimizadas das novas logos em `public/assets/logo`.
  - Criar `components/ui/LogoHorizonte.tsx` com props mínimas: `variant` (`default`, `mono`, `compact`) e `theme` (`light`, `dark`).
  - Substituir o texto puro em `Header` por `LogoHorizonte`, mantendo acessibilidade (`aria-label`, `alt`).
- **Refatorar botões base**
  - Padronizar `PrimaryButton`, `RoundedButton`, `SecretButton` para usar variantes de estilo com a paleta (primário, secundário, ghost, text-only).
  - Padronizar tamanhos (`sm`, `md`, `lg`) e ícones opcionais.
  - Garantir estados de hover/focus/disabled com transições suaves.
- **Rever tipografia**
  - Confirmar famílias (`Inter`, `Inria`) e pesos utilizados.
  - Definir escala tipográfica clara (tokens para `heading-xl`, `heading-md`, `body`, `caption`).
  - Revisar headings principais (landing, projects, contact) para alinhar com a marca e melhorar legibilidade.
- **Testes visuais**
  - Verificar contraste mínimo (WCAG AA) para combinações de texto/fundo.
  - Validar comportamento em dark sections (secret mode, vídeo) usando `LogoHorizonte` `theme="dark"`.
