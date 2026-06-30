'use client';

import WorkScrollStage from './WorkScrollStage';

type ContractModel = {
  title: string;
  idealFor: string[];
  imageKey?: string;
};

type ContractsContent = {
  eyebrow: string;
  title: string;
  body: string;
  idealForLabel: string;
  models: ContractModel[];
};

const CONTRACT_KEYS = [
  'contractFixed',
  'contractContinuous',
  'contractLicense',
  'contractTransfer',
  'contractSaas',
] as const;

export default function WorkContractsStage({ content }: { content: ContractsContent }) {
  return (
    <WorkScrollStage
      id="contracts"
      eyebrow={content.eyebrow}
      title={content.title}
      body={content.body}
      centered
      items={content.models.map((model, index) => ({
        title: model.title,
        body: '',
        meta: `${content.idealForLabel}: ${model.idealFor.join(', ')}`,
        imageKey: model.imageKey ?? CONTRACT_KEYS[index] ?? 'contractFixed',
        imageAlt: model.title,
      }))}
    />
  );
}
