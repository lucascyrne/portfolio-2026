/** Raio do hotspot do menu no canto superior direito (~37,5% do menor lado do viewport). */
export const MENU_HOTZONE_RADIUS_RATIO = 0.375;

export function isMenuHotzone(clientX: number, clientY: number): boolean {
  if (typeof window === 'undefined') return false;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const r = Math.min(w, h) * MENU_HOTZONE_RADIUS_RATIO;
  const dx = w - clientX;
  const dy = clientY;

  if (dx < 0 || dy < 0) return false;

  return dx * dx + dy * dy <= r * r;
}
