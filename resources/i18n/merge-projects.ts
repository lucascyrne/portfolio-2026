import type { Project, ProjectBase } from '@/resources/projects/projects-data';
import type { Messages } from './types';

type CaseCopy = Messages['projects']['cases'][keyof Messages['projects']['cases']];

export function mergeProjectsBase(
  base: ProjectBase[],
  cases: Messages['projects']['cases']
): Project[] {
  return base.map((b) => {
    const c = cases[b.id as keyof Messages['projects']['cases']] as CaseCopy;
    return {
      ...b,
      title: c.title,
      domain: c.domain,
      summary: c.summary,
      problem: c.problem,
      solution: c.solution,
      impact: c.impact,
      tags: c.tags,
    };
  });
}
