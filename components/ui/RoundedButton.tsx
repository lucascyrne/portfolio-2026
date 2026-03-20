'use client';

import { FC, ReactNode } from 'react';

type RoundedButtonProps = {
  icon?: ReactNode;
  onClick?: () => void;
};

const RoundedButton: FC<RoundedButtonProps> = ({ icon, onClick }) => {
  return (
    <button
      className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground shadow-sm transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
      onClick={onClick}
    >
      <span className="flex items-center justify-center">{icon}</span>
    </button>
  );
};

export default RoundedButton;

