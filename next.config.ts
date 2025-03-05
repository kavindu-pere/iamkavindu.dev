import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  }
];

const nextConfig: NextConfig = {
  output: 'export',
  poweredByHeader: false, // Remove X-Powered-By header
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID: process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
