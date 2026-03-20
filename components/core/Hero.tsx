'use client';

import { Dispatch, FC, SetStateAction, useState } from 'react';
import Image from 'next/image';
import DownRight from '/public/assets/icons/down-right.svg';
import PrimaryButton from '../ui/PrimaryButton';
import SecretButton from '../ui/SecretButton';
import { useMusic } from '@/resources/music/music-context';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/resources/i18n';
import HorizonLine from './HorizonLine';
import StarsField from './StarsField';

type HeroProps = {
  isSecretMode: boolean;
  setIsSecretMode: Dispatch<SetStateAction<boolean>>;
};

const Hero: FC<HeroProps> = ({ isSecretMode, setIsSecretMode }) => {
  const { push } = useRouter();
  const { ensureAudioReadyAndPlaySecret } = useMusic();
  const { messages } = useI18n();
  const L = messages.landing;

  const handleSecretMode = async () => {
    setIsSecretMode(true);
    await ensureAudioReadyAndPlaySecret();
  };

  return (
    <section
      className={`relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${
        isSecretMode
          ? 'opacity-0 -translate-y-full'
          : 'opacity-100 translate-y-0'
      } animate-fade-in`}
    >
      <StarsField active={!isSecretMode} />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-6">
        <div className="flex flex-col items-center gap-1">
          <h5 className="text-xsm tracking-[0.25em] text-muted uppercase">
            {L.heroEyebrow}
          </h5>
          <h4 className="font-inria text-2xl italic text-foreground">
            {L.heroReach}
          </h4>
          <h5 className="font-inria text-4xl md:text-5xl font-bold text-foreground">
            {L.heroHorizons}
          </h5>
        </div>
        <HorizonLine active={!isSecretMode} />
        <div className="flex flex-col items-center justify-center gap-2">
          <PrimaryButton
            value={L.ctaWork}
            icon={<Image src={DownRight} alt={'An alt caption'} />}
            onClick={() => push('/projects')}
          />
          <SecretButton onClick={handleSecretMode} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
