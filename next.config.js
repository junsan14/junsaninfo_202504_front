/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8000',
          pathname: '/userfiles/images/**',
        },
      ],
    },
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
  }
  
  module.exports = nextConfig
  