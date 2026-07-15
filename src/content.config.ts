import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const postTypes = [
  'Learning Notes',
  'Problem Solving',
  'Technical Articles',
  'Project Retrospectives',
] as const;
const categories = ['AI Agents', 'Frontend', 'Backend', 'Astro'] as const;

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishedAt: date,
    updatedAt: date.optional(),
    type: z.enum(postTypes),
    category: z.enum(categories),
    tags: z.array(z.string().trim()).superRefine((tags, ctx) => {
      if (new Set(tags).size !== tags.length)
        ctx.addIssue({ code: 'custom', message: 'Tags must be unique' });
    }),
    draft: z.boolean(),
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
