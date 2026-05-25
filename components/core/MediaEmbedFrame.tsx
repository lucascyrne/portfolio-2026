'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type MediaEmbedFrameProps = {
  embedUrl: string;
  iframeTitle: string;
  openNewTabLabel: string;
  isActive: boolean;
  allowCamera?: boolean;
  embedUnavailableTitle?: string;
  embedUnavailableHint?: string;
};

const IFRAME_ALLOW = 'camera; microphone; fullscreen';
const BLOCKED_CHECK_MS = 2500;

const isBlockedFrameLocation = (href: string | undefined) => {
  if (!href) return true;
  return (
    href === 'about:blank' ||
    href.startsWith('chrome-error://') ||
    href.startsWith('about:srcdoc')
  );
};

const openLinkClass =
  'inline-flex rounded-full border border-border bg-surface-muted px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-surface';

/** Link fora do canvas do iframe — não bloqueia interação com o embed. */
export const EmbedOpenLink = ({
  embedUrl,
  label,
  className = '',
}: {
  embedUrl: string;
  label: string;
  className?: string;
}) => (
  <div className={`mt-3 flex justify-end ${className}`.trim()}>
    <a
      href={embedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={openLinkClass}
    >
      {label}
    </a>
  </div>
);

const MediaEmbedFrame = ({
  embedUrl,
  iframeTitle,
  openNewTabLabel,
  isActive,
  allowCamera = false,
  embedUnavailableTitle,
  embedUnavailableHint,
}: MediaEmbedFrameProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [embedBlocked, setEmbedBlocked] = useState(false);

  const checkIframeBlocked = useCallback(() => {
    const frame = iframeRef.current;
    if (!frame) return;

    try {
      const href = frame.contentWindow?.location.href;
      setEmbedBlocked(isBlockedFrameLocation(href));
    } catch {
      setEmbedBlocked(false);
    }
  }, []);

  useEffect(() => {
    setEmbedBlocked(false);
    if (!isActive) return;

    const timer = window.setTimeout(() => {
      checkIframeBlocked();
    }, BLOCKED_CHECK_MS);

    return () => window.clearTimeout(timer);
  }, [embedUrl, isActive, checkIframeBlocked]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b0b12]">
      {isActive && !embedBlocked ? (
        <iframe
          ref={iframeRef}
          key={embedUrl}
          src={embedUrl}
          title={iframeTitle}
          className="absolute inset-0 h-full w-full border-0"
          allow={allowCamera ? IFRAME_ALLOW : 'fullscreen'}
          onLoad={checkIframeBlocked}
        />
      ) : null}

      {isActive && embedBlocked ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
          {embedUnavailableTitle ? (
            <p className="max-w-md text-sm font-medium text-white/90">
              {embedUnavailableTitle}
            </p>
          ) : null}
          {embedUnavailableHint ? (
            <p className="max-w-md text-xs leading-relaxed text-white/55">
              {embedUnavailableHint}
            </p>
          ) : null}
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/25 bg-[#0b0b12]/80 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
          >
            {openNewTabLabel}
          </a>
        </div>
      ) : null}

      {!isActive ? (
        <div
          className="absolute inset-0 animate-pulse bg-[#0b0b12]"
          aria-hidden
        />
      ) : null}
    </div>
  );
};

export default MediaEmbedFrame;
