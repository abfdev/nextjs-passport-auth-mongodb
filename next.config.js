/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config;
  },
  images: {
    domains: ["ui-avatars.com", "lh3.googleusercontent.com"],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
