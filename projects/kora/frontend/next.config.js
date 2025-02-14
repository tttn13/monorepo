/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias['@kora/shared-types'] = '../packages/shared-types/src';
    return config;
  },
  output: 'standalone',
};

module.exports = nextConfig;