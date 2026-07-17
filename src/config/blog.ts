export const BLOG_CATEGORIES = ['AI Agents', 'Frontend', 'Backend', 'Astro'] as const;
export const POST_TYPES = [
  'Learning Notes',
  'Problem Solving',
  'Technical Articles',
  'Project Retrospectives',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
export type PostType = (typeof POST_TYPES)[number];
