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
