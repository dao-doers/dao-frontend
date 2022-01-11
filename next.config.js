/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    DAO_ADDRESS: process.env.NEXT_PUBLIC_DAO_ADDRESS,
    TRIBUTE_TOKEN_ADDRESS: process.env.NEXT_PUBLIC_TRIBUTE_TOKEN_ADDRESS,
    PROVIDER_CONFIG_WEB3_URL: process.env.NEXT_PUBLIC_PROVIDER_CONFIG_WEB3_URL,
  },
  images: {
    loader: 'akamai',
    path: '/',
  },
}