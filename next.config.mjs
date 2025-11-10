/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_PB_URL?.replace(
          /^https?:\/\//,
          "",
        ).replace(/\/$/, ""),
        port: "",
        pathname: "/api/files/tasks/**",
      },
    ],
  },
};

export default nextConfig;
