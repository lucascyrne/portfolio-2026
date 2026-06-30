'use client';

import type { WorkImageKey } from '@/resources/how-we-work/work-images';
import WorkScrollStage from './WorkScrollStage';

type ArchitectureStep = {
  label: string;
  detail: string;
};

type ArchitectureContent = {
  eyebrow: string;
  title: string;
  body: string;
  steps: ArchitectureStep[];
};

const STEP_IMAGE_KEYS: WorkImageKey[] = [
  'chapterMvp',
  'chapterDiscovery',
  'chapterRequirements',
  'architectureRoadmap',
];

export default function WorkArchitectureStage({ content }: { content: ArchitectureContent }) {
  return (
    <WorkScrollStage
      id="architecture"
      eyebrow={content.eyebrow}
      title={content.title}
      body={content.body}
      centered
      items={content.steps.map((step, index) => ({
        title: step.label,
        body: step.detail,
        imageKey: STEP_IMAGE_KEYS[index] ?? 'architectureRoadmap',
        imageAlt: step.label,
      }))}
    />
  );
}
