import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to plain static HTML/CSS/JS in `out/` — host anywhere for free.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
