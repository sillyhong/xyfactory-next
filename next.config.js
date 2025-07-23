/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: ['/assets','placeimg'],
  },
  i18n,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/:slug*',
  //       locale: false,
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           // value: 'public, no-store, must-revalidate',
  //           value: 'public, no-cache, s-maxage=10, stale-while-revalidate=59',
  //         },
  //         {
  //           key: 'X-Test',
  //           value: 'true',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/zh',
  //       locale: false,
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           // value: 'public, no-store, must-revalidate',
  //           value: 'public, no-cache, s-maxage=10, stale-while-revalidate=59',
  //         },
  //         {
  //           key: 'X-Test',
  //           value: 'true',
  //         },
  //       ],
  //     },
  //   ]
  // },
}

module.exports = nextConfig
