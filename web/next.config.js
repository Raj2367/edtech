/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Expose backend API URL
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
};

module.exports = nextConfig;
