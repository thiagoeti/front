// Next.js production config: standalone server, explicit headers, compression, cache size and image limits.
/** @type {import('next').NextConfig} */
const nextConfig = {
  // server.js with only the traced node_modules, started by node instead of next start.
  output: "standalone",
  // The page calls connection(): rendered per request, nothing to cache as components.
  cacheComponents: false,
  reactCompiler: false,
  // No proxy in front: the Next server gzips itself.
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  productionBrowserSourceMaps: false,
  // In-memory cache plus the 512 MB heap stay under the 1 GB container.
  cacheMaxMemorySize: 32 * 1024 * 1024,
  // No remote image origin; optimized images in AVIF or WebP, cached for 4 hours.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 14400,
    remotePatterns: [],
  },
  httpAgentOptions: { keepAlive: true },
};

export default nextConfig;
