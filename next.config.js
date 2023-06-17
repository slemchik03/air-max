const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: "loose",
  },
  webpack: {
    plugins: [new MiniCssExtractPlugin()],
  },
  env: {
    PROJECT_URL: "http://localhost:3000",
  },
  images: {
    domains: ["res.cloudinary.com", "images.clerk.dev"],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
