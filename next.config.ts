import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    domains: ['ap-south-1.cdn.hygraph.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'xww0hi-t0.myshopify.com',
        pathname: '/**',
      },
    ],
  },
  // output: "export", // Commented out for development
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'build'
};

export default nextConfig;
