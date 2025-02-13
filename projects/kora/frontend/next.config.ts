import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['100.118.120.108','picsum.photos','imgur.com']
  },
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  reactStrictMode: true,
};

export default nextConfig;
