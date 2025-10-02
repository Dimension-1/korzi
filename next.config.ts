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
        pathname: '/**', // 👈 allow all Cloudinary image paths
      },
    ],
  },
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'build'
};

export default nextConfig;
