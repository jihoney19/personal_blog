import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  integrations: [mdx(), sitemap()],
  site: 'https://jihoney19.github.io',
  base: process.env.GITHUB_ACTIONS === 'true' ? '/personal_blog' : '/',
});
