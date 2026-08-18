import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    sanity({
      projectId: '4ojaxary',
      dataset: 'production',
      useCdn: false,
      stega: {
        enabled: false,
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@sanity/client', '@sanity/astro'],
    },
    server: {
      watch: {
        ignored: ['**/.astro/**', '**/worker-configuration.d.ts', '**/.wrangler/**'],
      },
    },
  },
});
