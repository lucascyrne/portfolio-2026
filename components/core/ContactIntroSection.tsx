'use client';

import type { Messages } from '@/resources/i18n';
import ContactCTA from './ContactCTA';
import HorizonLine from './HorizonLine';
import StarsField from './StarsField';

type ContactIntroSectionProps = {
  contact: Messages['contact'];
};

export default function ContactIntroSection({
  contact,
}: ContactIntroSectionProps) {
  return (
    <section
      className="reveal-area relative w-full overflow-hidden bg-surface px-4 pb-12 pt-16 md:pb-16 md:pt-20"
      aria-labelledby="contact-intro-heading"
      data-radius="170"
    >
      <div className="reveal-hidden pointer-events-none">
        <div className="relative h-full w-full bg-background">
          <StarsField active={true} variant="contact" />
          <div className="absolute inset-x-0 top-[56%]">
            <HorizonLine
              active={true}
              containerClassName="relative w-screen"
              svgClassName="w-full h-6 mx-auto pointer-events-none"
            />
          </div>
          <p className="font-inria absolute inset-x-4 top-1/2 -translate-y-1/2 text-center text-2xl font-bold text-foreground/90 md:text-4xl">
            {contact.introRevealLine}
          </p>
        </div>
      </div>

      <div className="reveal-visible mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {contact.introEyebrow}
        </p>
        <h1
          id="contact-intro-heading"
          className="font-inria mx-auto max-w-[14ch] text-balance text-3xl font-bold leading-tight text-foreground md:max-w-[18ch] md:text-4xl"
        >
          {contact.introTitle}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          {contact.introBody}
        </p>

        <div className="mx-auto mt-10 grid max-w-xl gap-3 sm:grid-cols-2">
          <ContactCTA
            variant="email"
            href="mailto:cyrnedev@gmail.com"
            label={contact.ctaEmail}
            hint={contact.ctaEmailHint}
          />
          <ContactCTA
            variant="linkedin"
            href="https://www.linkedin.com/in/lucas-cyrne-8b8314153/"
            label={contact.ctaLinkedIn}
            hint={contact.ctaLinkedInHint}
          />
        </div>
      </div>
    </section>
  );
}
