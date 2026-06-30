import type { IconType } from 'react-icons';
import { FaAws } from 'react-icons/fa';
import {
  SiDocker,
  SiDotnet,
  SiFlutter,
  SiGithubactions,
  SiGooglecloud,
  SiGraphql,
  SiJavascript,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiRedis,
  SiSpring,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';

export type TechCategoryId =
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'cloud'
  | 'data'
  | 'tooling';

export type TechStackItem = {
  id: string;
  name: string;
  category: TechCategoryId;
  Icon: IconType;
};

export const TECH_STACK: TechStackItem[] = [
  { id: 'react', name: 'React', category: 'frontend', Icon: SiReact },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', Icon: SiNextdotjs },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', Icon: SiTypescript },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', Icon: SiTailwindcss },
  { id: 'react-query', name: 'TanStack Query', category: 'frontend', Icon: SiReactquery },
  { id: 'react-router', name: 'React Router', category: 'frontend', Icon: SiReactrouter },
  { id: 'node', name: 'Node.js', category: 'backend', Icon: SiNodedotjs },
  { id: 'nestjs', name: 'NestJS', category: 'backend', Icon: SiNestjs },
  { id: 'dotnet', name: '.NET', category: 'backend', Icon: SiDotnet },
  { id: 'spring', name: 'Spring', category: 'backend', Icon: SiSpring },
  { id: 'graphql', name: 'GraphQL', category: 'backend', Icon: SiGraphql },
  { id: 'react-native', name: 'React Native', category: 'mobile', Icon: SiReact },
  { id: 'flutter', name: 'Flutter', category: 'mobile', Icon: SiFlutter },
  { id: 'aws', name: 'AWS', category: 'cloud', Icon: FaAws },
  { id: 'gcp', name: 'GCP', category: 'cloud', Icon: SiGooglecloud },
  { id: 'vercel', name: 'Vercel', category: 'cloud', Icon: SiVercel },
  { id: 'postgres', name: 'PostgreSQL', category: 'data', Icon: SiPostgresql },
  { id: 'mongodb', name: 'MongoDB', category: 'data', Icon: SiMongodb },
  { id: 'redis', name: 'Redis', category: 'data', Icon: SiRedis },
  { id: 'prisma', name: 'Prisma', category: 'data', Icon: SiPrisma },
  { id: 'docker', name: 'Docker', category: 'tooling', Icon: SiDocker },
  { id: 'github-actions', name: 'GitHub Actions', category: 'tooling', Icon: SiGithubactions },
  { id: 'javascript', name: 'JavaScript', category: 'tooling', Icon: SiJavascript },
];

export const TECH_CATEGORY_ORDER: TechCategoryId[] = [
  'frontend',
  'backend',
  'mobile',
  'cloud',
  'data',
  'tooling',
];
