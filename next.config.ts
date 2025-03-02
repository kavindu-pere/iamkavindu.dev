import type { NextConfig } from "next";

// Check if we're in a GitHub Actions environment
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  // Only enable static export in production or GitHub Actions environment
  ...(process.env.NODE_ENV === 'production' || isGitHubActions ? {
    output: 'export',
    basePath,
    assetPrefix: basePath ? `${basePath}/` : '',
    images: {
      unoptimized: true,
    }
  } : {}),
};

export default nextConfig;
