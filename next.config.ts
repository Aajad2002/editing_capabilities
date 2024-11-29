import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Add your image domains here
  },
  webpack: (config: WebpackConfig) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          ...(config.resolve?.fallback || {}),
          fs: false,
        },
      },
    };
  },
};

export default config;