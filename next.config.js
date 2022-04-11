/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    DAO_ADDRESS: process.env.NEXT_PUBLIC_DAO_ADDRESS,
    TRIBUTE_TOKEN_ADDRESS: process.env.NEXT_PUBLIC_TRIBUTE_TOKEN_ADDRESS,
    SUDT_PROXY_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_SUDT_PROXY_CONTRACT_ADDRESS,
    PROVIDER_URL: process.env.NEXT_PUBLIC_PROVIDER_URL,
    INDEXER_URL: process.env.NEXT_PUBLIC_INDEXER_URL,
    MODE: process.env.NEXT_PUBLIC_MODE,
  },
  images: {
    loader: 'akamai',
    path: '/',
  },
  headers: async () => {
    return [
      {
        source: '/:pages*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, max-age=43200, must-revalidate',
          },
        ],
      },
    ];
  },
};
