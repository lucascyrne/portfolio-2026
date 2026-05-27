/** Dados estruturais; textos em messages.*.json → projects.games.cases (i18n). */
export type HorizonteGameBase = {
  id: string;
  embedUrl: string;
  year?: number;
};

export const gamesBase: HorizonteGameBase[] = [
  {
    id: 'a-escalada',
    embedUrl: 'https://a-escalada.vercel.app/',
    year: 2025,
  },
  {
    id: 'hockey-club',
    embedUrl: 'https://hockey-club-bay.vercel.app/',
    year: 2025,
  },
];
