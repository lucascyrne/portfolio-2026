'use client';

import { useMemo } from 'react';
import type { Project } from '@/resources/projects/projects-data';

type ProjectStickyPreviewProps = {
  project: Project;
};

const ProjectStickyPreview = ({ project }: ProjectStickyPreviewProps) => {
  const topTags = useMemo(() => project.tags.slice(0, 4), [project.tags]);

  return (
    <div className="relative w-full aspect-video lg:aspect-[2196/1080]">
      <div className="relative h-full rounded-3xl overflow-hidden bg-surface ring-1 ring-border">
        <div className="absolute inset-0">
          <video
            key={project.id}
            src={project.video.src}
            className="w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />

          <div className="absolute inset-0 hidden lg:block bg-gradient-to-t from-white/92 via-white/55 to-transparent" />
        </div>

        <div className="relative hidden h-full p-7 lg:flex flex-col justify-end gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-inria text-3xl text-black">
              {project.title}
            </h3>
            <p className="text-black/80">{project.domain}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {topTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/95 text-black text-sm border border-black/15"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="max-w-[52ch] text-black/85">{project.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectStickyPreview;
