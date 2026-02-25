/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   experimental: {
    turbo: false, // ✅ hard disable turbopack
  }
};

module.exports = nextConfig;
