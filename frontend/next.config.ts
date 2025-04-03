import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://backend.local:3000/api/v1/:path*', // Rails API サーバー
      },
    ];
  },
  images: {
    domains: [
      'www.pokemon.co.jp',
      'iconbu.com',
      'localhost',
      'backend.local',
    ],
  },
};
export default nextConfig;
