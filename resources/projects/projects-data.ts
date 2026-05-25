export type ProjectVideo = {
  src: string;
};

export type ProjectEmbed = {
  url: string;
};

/** Dados estruturais; textos localizados em messages.*.json → projects.cases (i18n). */
export type ProjectBase = {
  id: string;
  title: string;
  stack: string[];
  video?: ProjectVideo;
  embed?: ProjectEmbed;
};

export type Project = ProjectBase & {
  domain: string;
  summary: string;
  tags: string[];
  problem: string;
  solution: string;
  impact: string;
};

const baseVideoSrc = '/assets/videos/portfolio-final.mp4';
const latsysVideoSrc = '/assets/videos/latsys-apps.mp4';
const bethFrontVideoSrc = '/assets/videos/beth-front-apps.mp4';
const cofrinVideoSrc = '/assets/videos/cofrin-apps.mp4';
const maidVideoSrc = '/assets/videos/maid-apps.mp4';

export const projectsBase: ProjectBase[] = [
  {
    id: 'latsys',
    title: 'Latsys',
    stack: ['Next.js', 'TypeScript', 'Supabase'],
    video: { src: latsysVideoSrc },
  },
  {
    id: 'maid-system',
    title: 'Maid System',
    stack: ['React', 'TypeScript', 'Dashboards'],
    video: { src: maidVideoSrc },
  },
  {
    id: 'beth-front',
    title: 'Beth-front',
    stack: ['Preact', 'UI Interativa'],
    video: { src: bethFrontVideoSrc },
  },
  {
    id: 'cofrin',
    title: 'Cofrin',
    stack: ['React', 'Finanças', 'Interface'],
    video: { src: cofrinVideoSrc },
  },
  {
    id: 'apogeu',
    title: 'Apogeu',
    stack: ['React', 'Vite', 'MediaPipe', 'Tone.js', 'Web Audio'],
    embed: { url: 'https://apogeu-synth.vercel.app/' },
  },
  {
    id: 'more',
    title: 'Mais...',
    stack: ['UI', 'Interações', 'Vídeo'],
    video: { src: baseVideoSrc },
  },
];
