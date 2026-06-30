import type { ReactNode } from 'react';

type WorkEditorialShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  body?: string;
  headerClassName?: string;
  className?: string;
  fullBleed?: boolean;
  children?: ReactNode;
  reveal?: boolean;
};

export default function WorkEditorialShell({
  id,
  eyebrow,
  title,
  body,
  headerClassName = '',
  className = '',
  fullBleed = false,
  children,
  reveal = true,
}: WorkEditorialShellProps) {
  const header = (
    <div className={`max-w-3xl ${headerClassName}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-inria text-2xl font-bold text-foreground md:text-4xl">{title}</h2>
      {body ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {body}
        </p>
      ) : null}
    </div>
  );

  return (
    <section
      id={id}
      className={`${reveal ? 'reveal-area' : ''} py-16 md:py-24 ${className}`}
    >
      <div className="px-4 md:px-8">{header}</div>
      {children ? (
        <div className={fullBleed ? 'mt-10 w-full' : 'mx-auto mt-10 max-w-5xl px-4 md:px-8'}>
          {children}
        </div>
      ) : null}
    </section>
  );
}
