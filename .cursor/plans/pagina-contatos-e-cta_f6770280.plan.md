---
name: pagina-contatos-e-cta
overview: Reorganizar a página de contatos para comunicar melhor áreas de atuação, depoimentos, FAQ e chamadas para ação.
todos:
  - id: estrutura-contact
    content: Reorganizar a estrutura de seções da página de contato
    status: pending
  - id: ui-contact
    content: Atualizar estilos da página de contato para a nova paleta
    status: pending
  - id: ctas-contact
    content: Criar CTAs claros para email, LinkedIn e outros canais
    status: pending
  - id: faq-copy
    content: Rever e reescrever perguntas/respostas do FAQ alinhadas ao posicionamento atual
    status: pending
isProject: false
---

# Página de contatos e chamadas para ação

## Objetivo

Tornar a página de contatos um ponto forte de conversão, clara sobre o tipo de trabalho que você faz e como iniciar uma conversa.

## Escopo

- Estrutura de seções da página de contato.
- Conteúdos (introdução, áreas de atuação, FAQ).
- CTAs principais (email, LinkedIn, outros links).

## Passos

- **Reorganizar seções principais**
  - Introdução curta: quem você é hoje e que tipo de parceria procura (freelance, projetos de produto, etc.).
  - Áreas de atuação: usar `SkillAccordion` agrupando por domínios (SaaS/Produtos Digitais, Fintech/Blockchain, Health/ERP, Games/Experiências Interativas).
  - Recomendações: manter `RecomendationsCarousel` com layout mais limpo e contrastante.
  - FAQ: revisar questões para responder objeções comuns (idiomas, fuso, formato de contrato, stack, prazos típicos).
  - Seção final de CTA: título forte + botões grandes de contato.
- **Aprimorar UI e layout**
  - Migrar gradiente de fundo escuro para uma solução mais alinhada à nova paleta (fundos claros com cartões coloridos).
  - Garantir que textos tenham bom contraste e espaçamento confortável.
- **CTAs principais**
  - Criar componente `ContactCTA` com variantes (email, LinkedIn, outros).
  - Incluir ícones discretos e texto de apoio (ex.: "Resposta em até X dias").
- **Microcopy e idioma**
  - Escrever textos diretos, com tom profissional mas humano.
  - Preparar as chaves de tradução (mesmo que inicialmente preencha apenas em pt/en).
- **Teste e refinamento**
  - Verificar leitura em mobile (ordem das seções, tamanho dos botões).
  - Garantir que todos os links externos abram em nova aba com `rel` adequado.
