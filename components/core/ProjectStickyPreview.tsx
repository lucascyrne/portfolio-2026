'use client';

import MediaEmbedFrame from '@/components/core/MediaEmbedFrame';
import { useI18n } from '@/resources/i18n';
import type { Project } from '@/resources/projects/projects-data';

type ProjectStickyPreviewProps = {
  project: Project;
  isActive?: boolean;
};

const ProjectStickyPreview = ({
  project,
  isActive = true,
}: ProjectStickyPreviewProps) => {
  const { t } = useI18n();
  const embedUrl = project.embed?.url;

  if (embedUrl) {
    return (
      <div className="relative w-full aspect-video lg:aspect-[2196/1080]">
        <div className="relative h-full overflow-hidden rounded-3xl ring-1 ring-border">
          <MediaEmbedFrame
            embedUrl={embedUrl}
            iframeTitle={t('projects.demoIframeTitle')}
            openNewTabLabel={t('projects.openDemoNewTab')}
            embedUnavailableTitle={t('projects.embedUnavailableTitle')}
            embedUnavailableHint={t('projects.embedUnavailableHint')}
            isActive={isActive}
            allowCamera
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video lg:aspect-[2196/1080]">
      <div className="relative h-full overflow-hidden rounded-3xl bg-surface ring-1 ring-border">
        <video
          key={project.id}
          src={project.video?.src}
          className="h-full w-full object-cover object-center"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </div>
  );
};

export default ProjectStickyPreview;
