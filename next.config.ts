import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Remove basePath and assetPrefix for custom domain
  images: {
    unoptimized: true,
  },
  // Add trailing slash for consistent routing
  trailingSlash: true,
  // Disable unnecessary features for static export
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
