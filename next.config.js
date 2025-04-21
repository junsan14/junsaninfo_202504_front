/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['172.20.10.6','localhost','scontent.cdninstagram.com'], // ← ここにIPやドメインを追加
    },
    /*
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`,
        },
        {
          source: '/sanctum/:path*',
          destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/:path*`,
        },
      ];
    },
    */
  }
  
  module.exports = nextConfig
  