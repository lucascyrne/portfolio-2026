'use client';

import { useEffect } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const transitionElement = document.getElementById('transition-element');

    if (!transitionElement) {
      console.error('Elemento de transição não encontrado');
      return;
    }

    // Adiciona a classe para iniciar a animação
    transitionElement.classList.add('animate-slide-out');

    // Remove o elemento após a animação (opcional)
    const onAnimationEnd = () => {
      transitionElement.style.display = 'none';
    };
    transitionElement.addEventListener('animationend', onAnimationEnd);

    return () => {
      transitionElement.removeEventListener('animationend', onAnimationEnd);
    };
  }, []);

  return (
    <div>
      {/* Elemento de transição */}
      <div
        id="transition-element"
        className="fixed top-0 left-0 w-screen h-screen bg-primary z-50 animate-slide-out pointer-events-none"
      ></div>

      {/* Conteúdo da página */}
      {children}
    </div>
  );
}
