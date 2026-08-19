import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /media paso a llamarse /charlas. La URL vieja esta indexada.
      { source: "/media", destination: "/charlas", permanent: true },
    ];
  },
};

export default nextConfig;
