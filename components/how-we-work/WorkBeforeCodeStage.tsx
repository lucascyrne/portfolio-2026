'use client';

import WorkScrollStage from './WorkScrollStage';

type Chapter = {
  title: string;
  body: string;
  imageAlt: string;
  imageKey?: string;
};

type BeforeCodeContent = {
  eyebrow: string;
  title: string;
  chapters: Chapter[];
};

export default function WorkBeforeCodeStage({ content }: { content: BeforeCodeContent }) {
  return (
    <WorkScrollStage
      id="before-code"
      eyebrow={content.eyebrow}
      title={content.title}
      centered
      items={content.chapters.map((chapter) => ({
        title: chapter.title,
        body: chapter.body,
        imageKey: chapter.imageKey,
        imageAlt: chapter.imageAlt,
      }))}
    />
  );
}
