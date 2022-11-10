/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "img.icons8.com", "icons8.com"],
  },
};

module.exports = nextConfig;
