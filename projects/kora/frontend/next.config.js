/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['100.118.120.108','picsum.photos','imgur.com']
  },
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  reactStrictMode: true,
};

module.exports = nextConfig;