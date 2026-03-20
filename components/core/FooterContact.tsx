'use client';

import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';

import LogoHorizonte from '@/components/ui/LogoHorizonte';
import type { AppLocale } from '@/resources/i18n';
import { useTheme } from '@/resources/theme/theme-context';

type FooterContactProps = {
  blurb: string;
  rights: string;
  locale: AppLocale;
};

const FooterContact = ({ blurb, rights, locale }: FooterContactProps) => {
  const { theme } = useTheme();
  const logoTheme = theme === 'dark' ? 'dark' : 'light';
  const resumeHref =
    locale === 'pt'
      ? '/assets/docs/resume-pt-br-2026.pdf'
      : '/assets/docs/resume-eng-2026.pdf';

  return (
    <footer className="w-full border-t border-border bg-surface py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <LogoHorizonte variant="full" theme={logoTheme} size={100} />
          <p className="max-w-md text-sm text-muted-foreground">{blurb}</p>
        </div>

        <div className="flex gap-3">
          <a
            href="https://github.com/lucascyrne"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border bg-surface-muted p-3 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/lucas-cyrne-8b8314153/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border bg-surface-muted p-3 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={resumeHref}
            className="rounded-full border border-border bg-surface-muted p-3 text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            aria-label="Resume PDF"
          >
            <FaFileAlt size={20} />
          </a>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        {rights}
      </p>
    </footer>
  );
};

export default FooterContact;
