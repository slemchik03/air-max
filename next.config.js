const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: 'loose'
  },
  webpack: {
    plugins: [new MiniCssExtractPlugin()]
  },
  "env": {
    PROJECT_URL: "https://air-max.vercel.app"
  },
  images: {
    domains: ["res.cloudinary.com", "images.clerk.dev"]
  },
}

module.exports = nextConfig
