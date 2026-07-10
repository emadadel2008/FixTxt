/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isGitHubActions && {
    basePath: "/FixTxt",
    assetPrefix: "/FixTxt/",
  }),
};

module.exports = nextConfig;
