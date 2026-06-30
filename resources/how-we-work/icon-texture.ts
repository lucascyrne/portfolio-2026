import type { IconType } from 'react-icons';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as THREE from 'three';

export type IconTextureTheme = 'light' | 'dark';

const textureCache = new Map<string, THREE.CanvasTexture>();

const THEME_STYLES: Record<
  IconTextureTheme,
  { icon: string; fillCenter: string; fillEdge: string; stroke: string }
> = {
  light: {
    icon: '#18181b',
    fillCenter: 'rgba(255, 255, 255, 0.98)',
    fillEdge: 'rgba(243, 64, 126, 0.12)',
    stroke: 'rgba(243, 64, 126, 0.45)',
  },
  dark: {
    icon: '#f8fafc',
    fillCenter: 'rgba(30, 30, 36, 0.92)',
    fillEdge: 'rgba(243, 64, 126, 0.2)',
    stroke: 'rgba(243, 64, 126, 0.5)',
  },
};

function cacheKey(id: string, theme: IconTextureTheme) {
  return `${id}:${theme}`;
}

function drawIconOnCanvas(Icon: IconType, theme: IconTextureTheme): Promise<HTMLCanvasElement> {
  const palette = THEME_STYLES[theme];

  return new Promise((resolve, reject) => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas 2d unavailable'));
      return;
    }

    const svg = renderToStaticMarkup(
      createElement(Icon, { size: 56, color: palette.icon })
    );
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const cx = size / 2;
      const cy = size / 2;
      const r = size * 0.48;

      const fill = ctx.createRadialGradient(cx, cy, r * 0.15, cx, cy, r);
      fill.addColorStop(0, palette.fillCenter);
      fill.addColorStop(1, palette.fillEdge);
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = palette.stroke;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r - 1, 0, Math.PI * 2);
      ctx.stroke();

      const iconSize = size * 0.44;
      ctx.drawImage(img, cx - iconSize / 2, cy - iconSize / 2, iconSize, iconSize);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load icon SVG'));
    };
    img.src = url;
  });
}

export async function getIconTexture(
  id: string,
  Icon: IconType,
  theme: IconTextureTheme
): Promise<THREE.CanvasTexture> {
  const key = cacheKey(id, theme);
  const cached = textureCache.get(key);
  if (cached) return cached;

  const canvas = await drawIconOnCanvas(Icon, theme);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  textureCache.set(key, texture);
  return texture;
}

export async function preloadIconTextures(
  items: { id: string; Icon: IconType }[],
  theme: IconTextureTheme
): Promise<Map<string, THREE.CanvasTexture>> {
  const entries = await Promise.all(
    items.map(async (item) => [item.id, await getIconTexture(item.id, item.Icon, theme)] as const)
  );
  return new Map(entries);
}
