import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/ui-04-magnetic-dock",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
