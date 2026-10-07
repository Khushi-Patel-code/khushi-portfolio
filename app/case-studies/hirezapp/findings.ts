// Add real audit findings here and the "What I found" section appears on the page.
// Leave the list empty and the section stays hidden.
export type Finding = {
  page: string;
  issue: string;
  whyItMattered: string;
  fix: string;
};

export const findings: Finding[] = [];
