'use client';

import ContactCTA from '@/components/core/ContactCTA';
import ContactIntroSection from '@/components/core/ContactIntroSection';
import FAQ from '@/components/core/Faq';
import FooterContact from '@/components/core/FooterContact';
import RecomendationsCarousel from '@/components/core/RecomendationsCarousel';
import SkillAccordion from '@/components/core/SkillAccordion';
import { useI18n } from '@/resources/i18n';
import useRevealText from '@/resources/hooks/useRevealText';

const Contact = () => {
  const { messages, locale } = useI18n();
  const c = messages.contact;
  const resumeHref =
    locale === 'pt'
      ? '/assets/docs/resume-pt-br-2026.pdf'
      : '/assets/docs/resume-eng-2026.pdf';
  useRevealText();

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <ContactIntroSection contact={c} />

      <RecomendationsCarousel eyebrow={c.recommendationsEyebrow} id="recs" />

      <SkillAccordion
        id="areas"
        heading={c.areasHeading}
        items={messages.contactAreas}
      />

      <FAQ id="faq" heading={c.faqHeading} items={messages.contactFaq} />

      <section
        className="bg-gradient-to-br from-primary/15 via-surface-muted to-secondary/15 px-4 py-14 md:py-20"
        aria-labelledby="cta-final-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="cta-final-heading"
            className="font-inria text-2xl font-bold text-foreground md:text-3xl"
          >
            {c.ctaTitle}
          </h2>
          <p className="mt-3 text-muted-foreground">{c.ctaSubtitle}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <ContactCTA
              variant="email"
              href="mailto:cyrnedev@gmail.com"
              label={c.ctaEmail}
              hint={c.ctaEmailHint}
            />
            <ContactCTA
              variant="linkedin"
              href="https://www.linkedin.com/in/lucas-cyrne-8b8314153/"
              label={c.ctaLinkedIn}
              hint={c.ctaLinkedInHint}
            />
            <ContactCTA
              variant="readcv"
              href={resumeHref}
              label={c.ctaReadcv}
              hint={c.ctaReadcvHint}
            />
            <ContactCTA
              variant="github"
              href="https://github.com/lucascyrne"
              label={c.ctaGithub}
              hint={c.ctaGithubHint}
            />
          </div>
        </div>
      </section>

      <FooterContact blurb={c.footerBlurb} rights={c.footerRights} locale={locale} />
    </main>
  );
};

export default Contact;
