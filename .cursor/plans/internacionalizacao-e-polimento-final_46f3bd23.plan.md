---
name: internacionalizacao-e-polimento-final
overview: Implementar i18n em pt/es/en/zh para o portfólio e cuidar dos ajustes finais de performance, acessibilidade e microinterações.
todos:
  - id: infra-i18n
    content: Escolher abordagem e implementar infraestrutura de i18n com arquivos de mensagens
    status: pending
  - id: seletor-idioma
    content: Criar seletor de idioma integrado ao layout global
    status: pending
  - id: migrar-textos
    content: Migrar textos das principais páginas para o sistema de i18n
    status: pending
  - id: seo-a11y
    content: Ajustar SEO por idioma e revisar acessibilidade/performance em toda a aplicação
    status: pending
isProject: false
---

# Internacionalização e polimento final

## Objetivo

Preparar o portfólio para um público internacional com quatro idiomas e finalizar o refinamento técnico (performance, acessibilidade, detalhes visuais).

## Escopo

- Infra de i18n (estrutura de mensagens, provider, seletor de idioma).
- Migração gradual de textos.
- SEO por idioma.
- Ajustes de performance, acessibilidade e microinterações.

## Passos

- **Definir abordagem de i18n**
  - Escolher entre i18n nativo do Next App Router ou lib como `next-intl`.
  - Criar estrutura de mensagens (`messages/pt.json`, `en.json`, `es.json`, `zh.json`) com chaves por domínio (landing, projects, contact, common).
- **Integrar provider de i18n**
  - Envolver `RootLayout` com provider de idioma.
  - Expor hook simples `useI18n` ou similar para obter `t(key)` nas páginas/componentes.
- **Criar seletor de idioma**
  - Componente pequeno no `Header` ou `SideMenu` com códigos `PT`, `EN`, `ES`, `中文`.
  - Suporte a troca de idioma sem quebrar o estado atual da página, preferencialmente via rotas ou contexto.
- **Migrar textos principais**
  - Começar pela landing (hero, botões, player de áudio, secret mode).
  - Migrar página de projetos (títulos, descrições de estudos de caso).
  - Migrar página de contato (títulos, FAQ, CTAs).
- **SEO e metadados por idioma**
  - Ajustar `meta description` e título conforme idioma.
  - Configurar tags `lang` corretas e hreflang se necessário.
- **Performance e acessibilidade**
  - Otimizar carregamento de vídeos e trilhas de áudio (lazy load, preload seletivo, `poster` para vídeos).
  - Garantir foco visível, labels acessíveis e contraste.
  - Revisar animações para evitar jank (uso moderado de Framer Motion e GSAP, preferindo CSS onde possível).
