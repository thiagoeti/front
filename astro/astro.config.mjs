// Astro SSR tuned for production: standalone server run by Bun, minified HTML and CSS, no client JS, no remote images.
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  // Server: the balance changes on every request, so no page is prerendered.
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  compressHTML: true,
  // One small page: its CSS goes inline and saves a request.
  build: { inlineStylesheets: 'always' },
  // No remote image origin is allowed.
  image: { domains: [], remotePatterns: [] },
  prefetch: false,
  security: { checkOrigin: true },
  devToolbar: { enabled: false },
  vite: { build: { target: 'es2022', minify: true, cssMinify: true, sourcemap: false } },
});
