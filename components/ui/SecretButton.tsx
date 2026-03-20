'use client';

import { useState } from 'react';
import { TfiWorld } from 'react-icons/tfi';
import { useI18n } from '@/resources/i18n';


interface SecretButtonProps {
  onClick: () => void;
}

const SecretButton: React.FC<SecretButtonProps> = ({ onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useI18n();

  return (
    <button
      className={`relative group rounded-full h-12 flex items-center overflow-hidden transition-all duration-500 ease-in-out shadow-lg border border-border
        ${isExpanded ? 'bg-surface-muted max-w-[18rem] pl-4 pr-3' : 'bg-transparent max-w-12 pl-0 pr-0'}
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={onClick}
    >
      {/* Ícone centralizado no estado colapsado */}
      <span
        className={`flex items-center justify-center transition-all duration-500 ease-in-out
          ${isExpanded ? 'translate-x-0 mr-2' : 'translate-x-[12px]'} text-primary
        `}
      >
        <TfiWorld className="text-lg" />
      </span>

      {/* Texto exibido ao expandir */}
      <span
        className={`flex items-center justify-center whitespace-nowrap font-medium
          transition-opacity duration-300 ease-in-out text-primary
          ${isExpanded ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {t('landing.secretButton')}
      </span>

      {/* Animação ao clicar */}
      <span className="absolute inset-0 bg-accent opacity-20 scale-0 group-active:scale-100 rounded-full transition-transform duration-75 ease-in-out z-10" />
    </button>
  );
};

export default SecretButton;
