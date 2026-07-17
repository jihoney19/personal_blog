import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { BLOG_CATEGORIES, POST_TYPES } from './config/blog';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: date,
    updatedDate: date.optional(),
    type: z.enum(POST_TYPES),
    category: z.enum(BLOG_CATEGORIES),
    tags: z.array(z.string().trim()).superRefine((tags, ctx) => {
      if (new Set(tags).size !== tags.length)
        ctx.addIssue({ code: 'custom', message: 'Tags must be unique' });
    }),
    draft: z.boolean(),
    heroImage: z.string().optional(),
    readingTime: z.number().int().positive().optional(),
    status: z.enum(['Draft', 'Published']).optional(),
    slug: slug.optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z
    .object({
      title: z.string().min(1),
      summary: z.string().min(1),
      status: z.enum(['In progress', 'Complete', 'Paused']),
      startedAt: date,
      endedAt: date.optional(),
      role: z.string().min(1),
      stack: z.array(z.string()).min(1),
      repoUrl: z.string().url().optional(),
      demoUrl: z.string().url().optional(),
      relatedPosts: z.array(slug).optional(),
    })
    .refine((project) => !project.endedAt || project.endedAt >= project.startedAt, {
      message: 'endedAt cannot precede startedAt',
    }),
});

export const collections = { posts, projects };
