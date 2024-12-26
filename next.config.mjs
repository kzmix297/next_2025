/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
      'localhost:3000',
      'https://jubilant-broccoli-g47jjvr75rjpf9q56-3000.app.github.dev/',
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "statics-cdn-v2.fashionette.net",
        port: "",
        pathname: "/transform/**",
      },
    ],
  },
};

export default nextConfig;
