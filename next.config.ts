import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export", // Enable static HTML export
  basePath: "/hmkconf", // Needed for GitHub Pages (project repo)
  trailingSlash: true, // Ensures folder structure matches static hosting
}

export default nextConfig
