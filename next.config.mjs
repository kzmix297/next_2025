/** @type {import('next').NextConfig} */
const nextConfig = {
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
