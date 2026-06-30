'use client';

import FooterContact from '@/components/core/FooterContact';
import WorkArchitectureStage from '@/components/how-we-work/WorkArchitectureStage';
import WorkBeforeCodeStage from '@/components/how-we-work/WorkBeforeCodeStage';
import WorkContractsStage from '@/components/how-we-work/WorkContractsStage';
import WorkCTASection from '@/components/how-we-work/WorkCTASection';
import WorkHeroParallax from '@/components/how-we-work/WorkHeroParallax';
import WorkPageShell from '@/components/how-we-work/WorkPageShell';
import WorkTechGlobe from '@/components/how-we-work/WorkTechGlobe';
import { useI18n } from '@/resources/i18n';

const HowWeWorkPage = () => {
  const { messages, locale } = useI18n();
  const w = messages.howWeWork;
  const c = messages.contact;

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <WorkPageShell>
        <WorkHeroParallax content={w.hero} />
        <WorkBeforeCodeStage content={w.beforeCode} />
        <WorkArchitectureStage content={w.architecture} />
        <WorkTechGlobe content={w.development} />
        <WorkContractsStage content={w.contracts} />
        <WorkCTASection content={w.cta} />
      </WorkPageShell>
      <FooterContact blurb={c.footerBlurb} rights={c.footerRights} locale={locale} />
    </main>
  );
};

export default HowWeWorkPage;
