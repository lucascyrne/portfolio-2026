import type { ReactNode } from 'react';

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  body?: string;
  children?: ReactNode;
  wide?: boolean;
  fullBleed?: boolean;
  className?: string;
};

export default function SectionShell({
  id,
  eyebrow,
  title,
  body,
  children,
  wide = false,
  fullBleed = false,
  className = '',
}: SectionShellProps) {
  const maxWidth = wide ? 'max-w-5xl' : 'max-w-3xl';

  if (fullBleed) {
    return (
      <section id={id} className={`reveal-area py-16 md:py-24 ${className}`}>
        <div className={`mx-auto px-4 md:px-8 ${maxWidth}`}>
          {eyebrow ? (
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-inria text-2xl font-bold text-foreground md:text-3xl">
            {title}
          </h2>
          {body ? (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {body}
            </p>
          ) : null}
        </div>
        {children ? <div className="mt-10 w-full">{children}</div> : null}
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`reveal-area px-4 py-16 md:py-24 ${className}`}
    >
      <div className={`mx-auto ${maxWidth}`}>
        {eyebrow ? (
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-inria text-2xl font-bold text-foreground md:text-3xl">
          {title}
        </h2>
        {body ? (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {body}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
