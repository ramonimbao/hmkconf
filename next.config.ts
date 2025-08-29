import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export", // Enable static HTML export
  trailingSlash: true, // Ensures folder structure matches static hosting

  images: {
    unoptimized: true,
  },
}

export default nextConfig
