import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // 👈 allow all Cloudinary image paths
      },
    ],
  },
  output: "export"
};

export default nextConfig;
