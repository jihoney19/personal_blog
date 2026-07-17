export const BLOG_CATEGORIES = ['AI', 'Frontend', 'Backend', 'Projects', 'Devlog'] as const;
export const POST_TYPES = ['Article', 'Tutorial', 'Note', 'Retrospective'] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
export type PostType = (typeof POST_TYPES)[number];
