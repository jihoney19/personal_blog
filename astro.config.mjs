import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  integrations: [mdx()],
  site: 'https://jihoney19.github.io',
  base: process.env.GITHUB_ACTIONS === 'true' ? '/personal_blog' : '/',
});
