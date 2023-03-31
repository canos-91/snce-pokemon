/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  //Webpack/Docker hot reload config
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

module.exports = nextConfig;
