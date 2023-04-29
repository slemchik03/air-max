/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: 'loose'
  },
  images: {
    domains: ["res.cloudinary.com"]
  }
}

module.exports = nextConfig
