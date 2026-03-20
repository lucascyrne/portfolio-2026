'use client';

import { FC, ReactNode } from 'react';

type PrimaryButtonProps = {
  value?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

const PrimaryButton: FC<PrimaryButtonProps> = ({ value, icon, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className="flex items-center justify-center px-6 py-3 gap-2 rounded-full shadow-sm bg-primary text-primary-foreground transition-colors duration-200 hover:bg-secondary hover:text-secondary-foreground"
      onClick={handleClick}
    >
      {value}
      <span>{icon}</span>
    </button>
  );
};

export default PrimaryButton;
