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
  async headers() {
    return [
      {
        source: '/index',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, no-cache',
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig
