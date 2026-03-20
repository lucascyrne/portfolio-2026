'use client';

import { FC, ReactNode } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';

export type ContactCTAVariant = 'email' | 'linkedin' | 'readcv' | 'github';

type ContactCTAProps = {
  variant: ContactCTAVariant;
  href: string;
  label: string;
  hint?: string;
  className?: string;
};

const iconByVariant: Record<ContactCTAVariant, ReactNode> = {
  email: <FaEnvelope className="size-5 shrink-0" aria-hidden />,
  linkedin: <FaLinkedin className="size-5 shrink-0" aria-hidden />,
  readcv: <IoDocumentTextOutline className="size-5 shrink-0" aria-hidden />,
  github: <FaGithub className="size-5 shrink-0" aria-hidden />,
};

const ContactCTA: FC<ContactCTAProps> = ({
  variant,
  href,
  label,
  hint,
  className = '',
}) => {
  const openInNewTab = /^https?:\/\//i.test(href);

  return (
    <a
      href={href}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      className={`group flex w-full items-start gap-3 rounded-2xl border border-border bg-surface px-6 py-4 shadow-sm transition-colors duration-200 hover:border-primary/40 hover:bg-surface-muted ${className}`}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
        {iconByVariant[variant]}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left text-foreground">
        <span className="font-inria text-lg font-semibold leading-snug">{label}</span>
        {hint ? (
          <span className="text-sm leading-snug text-muted-foreground">{hint}</span>
        ) : null}
      </span>
    </a>
  );
};

export default ContactCTA;
