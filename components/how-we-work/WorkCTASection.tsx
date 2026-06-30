'use client';

import ContactCTA from '@/components/core/ContactCTA';
import { CONTACT_LINKS } from '@/resources/utils/contact-links';
import WorkAnimatedTitle from './WorkAnimatedTitle';

type WorkCTAContent = {
  title: string;
  body: string;
  whatsapp: string;
  whatsappHint: string;
  email: string;
  emailHint: string;
  portfolio: string;
  portfolioHint: string;
};

type WorkCTASectionProps = {
  content: WorkCTAContent;
};

export default function WorkCTASection({ content }: WorkCTASectionProps) {
  return (
    <section
      className="border-t border-border bg-surface-muted px-4 py-14 md:py-20"
      aria-labelledby="work-cta-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <WorkAnimatedTitle
          as="h2"
          className="font-inria text-2xl font-bold text-foreground md:text-3xl"
        >
          {content.title}
        </WorkAnimatedTitle>
        <WorkAnimatedTitle
          as="p"
          className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {content.body}
        </WorkAnimatedTitle>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCTA
            variant="whatsapp"
            href={CONTACT_LINKS.whatsapp}
            label={content.whatsapp}
            hint={content.whatsappHint}
          />
          <ContactCTA
            variant="email"
            href={CONTACT_LINKS.email}
            label={content.email}
            hint={content.emailHint}
          />
          <ContactCTA
            variant="portfolio"
            href={CONTACT_LINKS.portfolio}
            label={content.portfolio}
            hint={content.portfolioHint}
            className="sm:col-span-2 lg:col-span-1"
          />
        </div>
      </div>
    </section>
  );
}
