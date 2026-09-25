import type { NextConfig } from 'next';

// Static export: every route is prerendered to `out/` (README "static where possible").
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
