import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { sitePath } from '../lib/paths';

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('posts')).filter((post) => !post.data.draft);

  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? new URL(context.url.origin),
    trailingSlash: true,
    customData: '<language>ko</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(`${post.data.publishedAt}T00:00:00Z`),
      link: sitePath(`/posts/${post.id}/`),
    })),
  });
};
