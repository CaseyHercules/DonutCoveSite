// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  output: 'server', // Enable server-side rendering for API routes
  adapter: cloudflare(), // Cloudflare Pages adapter
});
