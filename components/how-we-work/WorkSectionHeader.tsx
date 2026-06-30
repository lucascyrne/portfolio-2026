'use client';

import WorkAnimatedTitle from './WorkAnimatedTitle';

type WorkSectionHeaderProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  centered?: boolean;
  className?: string;
};

export default function WorkSectionHeader({
  eyebrow,
  title,
  body,
  centered = false,
  className = '',
}: WorkSectionHeaderProps) {
  const align = centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl';

  return (
    <div className={`${align} ${className}`}>
      {eyebrow ? (
        <WorkAnimatedTitle
          as="p"
          className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:mb-3 sm:text-sm"
        >
          {eyebrow}
        </WorkAnimatedTitle>
      ) : null}
      <WorkAnimatedTitle
        as="h2"
        className="font-inria text-xl font-bold text-foreground sm:text-2xl md:text-4xl"
      >
        {title}
      </WorkAnimatedTitle>
      {body ? (
        <p
          className={`mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base md:mt-4 md:text-lg ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
