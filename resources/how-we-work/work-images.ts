export const WORK_IMAGE_KEYS = [
  'hero',
  'chapterProblem',
  'chapterDiscovery',
  'chapterRequirements',
  'chapterMvp',
  'discoveryRequirements',
  'discoveryProcess',
  'discoveryIntegrations',
  'architectureRoadmap',
  'development',
  'contractFixed',
  'contractContinuous',
  'contractLicense',
  'contractTransfer',
  'contractSaas',
  'philosophy',
  'philosophyTeam',
  'beforeCode',
  'discovery',
  'architecture',
  'contracts',
] as const;

export type WorkImageKey = (typeof WORK_IMAGE_KEYS)[number];

/** Every file in public/assets/images/how-we-work/ with its canonical key. */
export const WORK_IMAGE_FILES: Record<string, WorkImageKey | 'unmapped'> = {
  'hero-discovery.webp': 'hero',
  'chapter-problem.webp': 'chapterProblem',
  'chapter-discovery.webp': 'chapterDiscovery',
  'chapter-requirements.webp': 'chapterRequirements',
  'chapter-mvp.webp': 'chapterMvp',
  'discovery-workshop.webp': 'discoveryRequirements',
  'discovery-process.webp': 'discoveryProcess',
  'discovery-integrations.webp': 'discoveryIntegrations',
  'architecture-roadmap.webp': 'architectureRoadmap',
  'development-desk.webp': 'development',
  'contract-fixed.webp': 'contractFixed',
  'contract-continuous.webp': 'contractContinuous',
  'contract-license.webp': 'contractLicense',
  'contract-transfer.webp': 'contractTransfer',
  'contract-saas.webp': 'contractSaas',
  'philosophy-retrospective.webp': 'philosophy',
  'philosophy-team.webp': 'philosophyTeam',
  'before-code.webp': 'beforeCode',
  'contracts-handshake.webp': 'contracts',
};

export const WORK_IMAGES: Record<WorkImageKey, string> = {
  hero: '/assets/images/how-we-work/hero-discovery.webp',
  chapterProblem: '/assets/images/how-we-work/chapter-problem.webp',
  chapterDiscovery: '/assets/images/how-we-work/chapter-discovery.webp',
  chapterRequirements: '/assets/images/how-we-work/chapter-requirements.webp',
  chapterMvp: '/assets/images/how-we-work/chapter-mvp.webp',
  discoveryRequirements: '/assets/images/how-we-work/discovery-workshop.webp',
  discoveryProcess: '/assets/images/how-we-work/discovery-process.webp',
  discoveryIntegrations: '/assets/images/how-we-work/discovery-integrations.webp',
  architectureRoadmap: '/assets/images/how-we-work/architecture-roadmap.webp',
  development: '/assets/images/how-we-work/development-desk.webp',
  contractFixed: '/assets/images/how-we-work/contract-fixed.webp',
  contractContinuous: '/assets/images/how-we-work/contract-continuous.webp',
  contractLicense: '/assets/images/how-we-work/contract-license.webp',
  contractTransfer: '/assets/images/how-we-work/contract-transfer.webp',
  contractSaas: '/assets/images/how-we-work/contract-saas.webp',
  philosophy: '/assets/images/how-we-work/philosophy-retrospective.webp',
  philosophyTeam: '/assets/images/how-we-work/philosophy-team.webp',
  beforeCode: '/assets/images/how-we-work/before-code.webp',
  discovery: '/assets/images/how-we-work/discovery-process.webp',
  architecture: '/assets/images/how-we-work/architecture-roadmap.webp',
  contracts: '/assets/images/how-we-work/contracts-handshake.webp',
};

export const WORK_IMAGE_FALLBACKS: Record<WorkImageKey, string> = {
  hero: '/assets/images/nebulosa.webp',
  chapterProblem: '/assets/images/design.webp',
  chapterDiscovery: '/assets/images/front-end.webp',
  chapterRequirements: '/assets/images/architecture.webp',
  chapterMvp: '/assets/images/database.webp',
  discoveryRequirements: '/assets/images/front-end.webp',
  discoveryProcess: '/assets/images/architecture.webp',
  discoveryIntegrations: '/assets/images/database.webp',
  architectureRoadmap: '/assets/images/architecture.webp',
  development: '/assets/images/database.webp',
  contractFixed: '/assets/images/design.webp',
  contractContinuous: '/assets/images/front-end.webp',
  contractLicense: '/assets/images/architecture.webp',
  contractTransfer: '/assets/images/database.webp',
  contractSaas: '/assets/images/nebulosa.webp',
  philosophy: '/assets/images/design.webp',
  philosophyTeam: '/assets/images/design.webp',
  beforeCode: '/assets/images/design.webp',
  discovery: '/assets/images/front-end.webp',
  architecture: '/assets/images/architecture.webp',
  contracts: '/assets/images/design.webp',
};

/** Where each key is rendered on /how-we-work (for audits). */
export const WORK_IMAGE_USAGE: Partial<Record<WorkImageKey, string>> = {
  hero: 'WorkHeroParallax — passo Problema',
  chapterProblem: 'WorkScrollStage — Antes do código (Problema)',
  chapterDiscovery: 'WorkScrollStage, WorkHeroParallax (Descoberta / Validação)',
  chapterRequirements: 'WorkScrollStage (Requisitos / Versão 1)',
  chapterMvp: 'WorkScrollStage (MVP)',
  architectureRoadmap: 'WorkScrollStage — Planejamento (Escala)',
  development: 'WorkHeroParallax — passo Desenvolvimento',
  philosophy: 'WorkHeroParallax — passo Produto',
  contractFixed: 'WorkScrollStage — Projeto fechado',
  contractContinuous: 'WorkScrollStage — Desenvolvimento contínuo',
  contractLicense: 'WorkScrollStage — Licença de uso',
  contractTransfer: 'WorkScrollStage — Cessão total',
  contractSaas: 'WorkScrollStage — SaaS',
  beforeCode: 'Reserva — capa seção / social',
  contracts: 'Reserva — header contratação',
  philosophyTeam: 'Reserva — cultura de equipe',
};

export function resolveWorkImage(
  key: WorkImageKey | string | undefined
): string {
  if (key && key in WORK_IMAGES) {
    return WORK_IMAGES[key as WorkImageKey];
  }
  if (key && key in WORK_IMAGE_FALLBACKS) {
    return WORK_IMAGE_FALLBACKS[key as WorkImageKey];
  }
  return WORK_IMAGE_FALLBACKS.hero;
}
