/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jolly-jennings-nkmfaj8pmf.liara.run",
        port: "",
        pathname: "/api/files/tasks/**",
      },
    ],
  },
};

export default nextConfig;
