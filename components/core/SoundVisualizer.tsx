'use client';

import { useMusic } from '@/resources/music/music-context';
import { FC, useEffect, useRef } from 'react';
import { ClipLoader } from 'react-spinners';

interface SoundVisualizerProps {
  isSecretMode: boolean;
}

const SoundVisualizer: FC<SoundVisualizerProps> = ({ isSecretMode }) => {
  const { analyser, isPlaying, audioReady } = useMusic();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!audioReady || !analyser || !canvasRef.current || !isPlaying) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 3;
    };

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const frequencyLimit = Math.floor(bufferLength * 0.4);
      const totalBars = Math.max(canvas.width / 10, frequencyLimit);
      const barWidth = canvas.width / totalBars;

      for (let i = 0; i < totalBars; i++) {
        const dataIndex = Math.floor((i / totalBars) * frequencyLimit);
        const nextIndex = Math.min(dataIndex + 1, frequencyLimit - 1);
        const factor = (i / totalBars) * frequencyLimit - dataIndex;

        const interpolatedHeight =
          dataArray[dataIndex] * (1 - factor) + dataArray[nextIndex] * factor;

        const barHeight = interpolatedHeight / 2;

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

        if (isSecretMode) {
          // Dusk – barras mais discretas
          gradient.addColorStop(0, 'rgba(243, 64, 126, 0.28)');
          gradient.addColorStop(1, 'rgba(247, 115, 115, 0.32)');
        } else {
          // Day – barras mais vivas
          gradient.addColorStop(0, 'rgba(243, 64, 126, 0.35)');
          gradient.addColorStop(1, 'rgba(243, 160, 126, 0.4)');
        }

        ctx.fillStyle = gradient;

        ctx.fillRect(
          i * barWidth,
          canvas.height - barHeight,
          barWidth - 2,
          barHeight
        );
      }

      if (isPlaying) {
        requestAnimationFrame(draw);
      }
    };

    resizeCanvas();
    draw();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [analyser, isPlaying, audioReady, isSecretMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full bg-transparent z-20"
    />
  );
};

export default SoundVisualizer;
