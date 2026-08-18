import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/auth",
      permanent: false,
    },
  ],
};

export default nextConfig;
