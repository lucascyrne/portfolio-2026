# Imagens — Como Trabalhamos (Horizonte Studio)

Referência de prompts, uso na página e alinhamento com o storytelling.

## Identidade visual (todas as imagens)

- **Estilo:** editorial minimalista, fotografia ou ilustração realista suave, sem texto legível na cena
- **Paleta Horizonte:** acentos coral/rosa quente (`#F3407E`, `#F3A07E`, `#d8656f`), luz lateral quente, sombras suaves
- **Tom:** profissional, humano, processo real (não stock genérico de “tech bro”)
- **Formato:** WebP, preferência **16:9** (hero, discovery, contratos) ou **4:3** (capítulos, arquitetura)
- **Composição:** espaço negativo para overlay de texto quando aplicável; foco claro no assunto da seção

## Mapa página → imagem

| Seção                        | Componente               | Chave i18n / código              | Arquivo                         |
| ---------------------------- | ------------------------ | -------------------------------- | ------------------------------- |
| Hero (passo Problema)        | `WorkHeroParallax`       | `hero.flowSteps[0].imageKey`     | `hero-discovery.webp`           |
| Hero (Descoberta)            | `WorkHeroParallax`       | `chapterDiscovery`               | `chapter-discovery.webp`        |
| Hero (Desenvolvimento)       | `WorkHeroParallax`       | `development`                    | `development-desk.webp`         |
| Hero (Produto)               | `WorkHeroParallax`       | `philosophy`                     | `philosophy-retrospective.webp` |
| Antes do código — Problema   | `WorkScrollStage`        | `chapterProblem`                 | `chapter-problem.webp`          |
| Antes do código — Descoberta | `WorkScrollStage`        | `chapterDiscovery`               | `chapter-discovery.webp`        |
| Antes do código — Requisitos | `WorkScrollStage`        | `chapterRequirements`            | `chapter-requirements.webp`     |
| Antes do código — MVP        | `WorkScrollStage`        | `chapterMvp`                     | `chapter-mvp.webp`              |
| Arquitetura — MVP            | `WorkScrollStage`        | mapa estático                    | `chapter-mvp.webp`              |
| Arquitetura — Validação      | `WorkScrollStage`        | mapa estático                    | `chapter-discovery.webp`        |
| Arquitetura — Versão 1       | `WorkScrollStage`        | mapa estático                    | `chapter-requirements.webp`     |
| Arquitetura — Escala         | `WorkScrollStage`        | mapa estático                    | `architecture-roadmap.webp`     |
| Contratação ×5               | `WorkScrollStage`        | `contractFixed` … `contractSaas` | `contract-*.webp`               |

### Reserva / alias (não renderizados hoje)

| Arquivo                    | Chave            | Uso sugerido                              |
| -------------------------- | ---------------- | ----------------------------------------- |
| `before-code.webp`         | `beforeCode`     | Capa da seção ou OG/social                |
| `contracts-handshake.webp` | `contracts`      | Header genérico de contratação            |
| `philosophy-team.webp`     | `philosophyTeam` | Variante aprendizados / cultura de equipe |

---

## Prompts por arquivo

### `hero-discovery.webp`

**Seção:** Hero — visão geral do processo  
**Storytelling:** “Cada projeto começa com uma conversa honesta.”

```
Editorial minimalist photo, discovery workshop with sticky notes and hand-drawn user flows on a white wall, warm side lighting from the left, coral pink accent tones (#F3407E), clean modern studio space, negative space on the right third for text overlay, shallow depth of field, no readable text or logos, professional and human, WebP 16:9
```

### `chapter-problem.webp`

**Seção:** Antes do código — Problema  
**Storytelling:** Mapear dor operacional antes de codar.

```
Editorial photo, operator taking notes in a notebook while observing a real counter or logistics workflow, morning natural light, warm coral highlights, authentic small business environment, focus on observation not screens, no faces required, no readable text, minimalist composition, 4:3
```

### `chapter-discovery.webp`

**Seção:** Antes do código — Descoberta / Hero passo 2 / Arquitetura Validação  
**Storytelling:** Entrevistas, shadowing, protótipos rápidos.

```
Flat lay editorial photo, wireframe sketches and sticky notes on light wood desk, coffee cup edge, soft warm daylight, coral accent pen or marker, discovery session mood, clean and calm, no readable text on wireframes, 4:3
```

### `chapter-requirements.webp`

**Seção:** Antes do código — Requisitos / Arquitetura Versão 1  
**Storytelling:** Escopo claro — o que entra e o que fica de fora.

```
Close editorial photo of scope document with handwritten margin notes and highlighter marks, pen on paper, shallow depth of field, warm coral pink accent on markings, professional planning mood, no legible words, 4:3
```

### `chapter-mvp.webp`

**Seção:** Antes do código — MVP / Arquitetura MVP  
**Storytelling:** Menor produto que prova valor.

```
Editorial photo, lean desk with single mobile or web prototype on one device, one highlighted feature on screen (blurred UI), minimal setup, warm lamp light, coral accent object nearby, startup MVP energy, no readable UI text, 4:3
```

### `discovery-workshop.webp`

**Seção:** Levantamento — Requisitos (escopo consciente)  
**Storytelling:** Rotina e conversa viram requisitos priorizados.

```
Wide editorial photo, team workshop wall with prioritized requirement cards or affinity mapping, studio environment, warm lateral light, coral pink sticky notes as accent only, organized and intentional, negative space left for copy, no readable text, 16:9
```

### `discovery-process.webp`

**Seção:** Levantamento — Processos  
**Storytelling:** Do jeito que é ao jeito que deve ser.

```
Editorial photo, large hand-drawn process flowchart on paper or whiteboard in creative studio, top-down or three-quarter angle, warm light, thin coral lines as accent, operational clarity mood, no readable labels, 16:9
```

### `discovery-integrations.webp`

**Seção:** Levantamento — Integrações  
**Storytelling:** Ecossistema conectado — APIs e dados.

```
Minimal isometric editorial illustration, connected nodes and API lines between systems, soft coral (#F3407E) and peach (#F3A07E) on neutral background, clean tech diagram aesthetic without labels, floating depth, 16:9
```

### `architecture-roadmap.webp`

**Seção:** Arquitetura — Escala  
**Storytelling:** Roadmap pragmático, fases testáveis.

```
Editorial photo, stacked transparent roadmap sheets or architectural plans with thin coral pink guide lines, desk surface, soft evening light, planning and growth metaphor, no readable text, 4:3
```

### `development-desk.webp`

**Seção:** Desenvolvimento (hero passo 3 + constelação tech)  
**Storytelling:** Entrega contínua, código legível, produto real.

```
Editorial night photo, developer desk with monitor showing blurred UI and code side by side, warm desk lamp, coral reflection on keyboard edge, focused calm atmosphere, no readable code or text, 16:9
```

### `contract-fixed.webp`

**Seção:** Contratação — Projeto fechado  
**Storytelling:** MVP, landing, sistemas pequenos — escopo fechado.

```
Editorial still life, single signed project document with closed folder on clean desk, one pen, warm light, coral accent clip or tab, closure and clarity metaphor, no readable text, 16:9
```

### `contract-continuous.webp`

**Seção:** Contratação — Desenvolvimento contínuo  
**Storytelling:** Startups, SaaS, produto em evolução — ciclos contínuos.

```
Editorial photo, wall calendar or circular sprint cycle diagram with subtle coral markers, studio office, rhythm and iteration metaphor, soft warm light, no readable dates or text, 16:9
```

### `contract-license.webp`

**Seção:** Contratação — Licença de uso  
**Storytelling:** Software proprietário, operação específica.

```
Editorial photo, elegant key on minimal stand next to software license booklet (blurred), warm side light, coral accent on key tag, access and permission metaphor, no readable text, 16:9
```

(PAROU AQUI) -----------------------------------------------------

### `contract-transfer.webp`

**Seção:** Contratação — Cessão total  
**Storytelling:** Posse integral do código e PI.

```
Editorial photo, hand passing USB drive or repository ownership folder across desk, transfer metaphor, warm coral highlight on folder edge, professional trust mood, no readable text, 16:9
```

### `contract-saas.webp`

**Seção:** Contratação — SaaS  
**Storytelling:** Produtos recorrentes, multi-tenant.

```
Minimal editorial illustration, soft cloud shapes with multiple tenant blocks connected below, coral and peach gradient accents on neutral sky, multi-tenant SaaS metaphor, clean and airy, no logos or text, 16:9
```

### `philosophy-retrospective.webp`

**Seção:** Hero passo Produto / tom de aprendizados  
**Storytelling:** Software que alguém usa de verdade; retrospectiva honesta.

```
Editorial photo, whiteboard after team retrospective with erased marks and empty chairs, late afternoon golden light through window, quiet reflection mood, coral pink eraser or marker on ledge, no readable board text, 16:9
```

### `before-code.webp` _(reserva)_

**Storytelling:** Metáfora da seção “Antes do código”.

```
Editorial wide photo, empty chair facing whiteboard with faint process sketches, morning light, anticipation before building software, warm coral accent chair or object, negative space, no readable text, 16:9
```

### `contracts-handshake.webp` _(reserva)_

**Storytelling:** Parceria e modelos flexíveis de contratação.

```
Editorial close photo, professional handshake over minimal contract papers on desk, shallow depth of field, warm coral tone in lighting, trust and partnership, no readable documents, 16:9
```

### `philosophy-team.webp` _(reserva)_

**Storytelling:** Anos de projetos reais — equipe e aprendizado coletivo.

```
Editorial photo, small team silhouettes or backs near window in creative studio, soft sunset coral light, collaborative but not posed stock, learning and honesty mood, no faces, no text, 16:9
```

---

## Checklist de qualidade

- [ ] Arquivo existe em `public/assets/images/how-we-work/`
- [ ] Chave mapeada em `resources/how-we-work/work-images.ts`
- [ ] `resolveWorkImage` retorna path dedicado (não fallback genérico)
- [ ] Conteúdo i18n (`imageAlt` / `imageKey`) coerente com a cena
- [ ] Imagem legível no layout split (Discovery, Architecture, Before code)
- [ ] Sem texto legível na imagem final

_Última revisão: alinhada à página `/how-we-work` e aos 19 assets em disco._
