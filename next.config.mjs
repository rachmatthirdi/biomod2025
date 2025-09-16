/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  devIndicators: false,
  output: "export",
  basePath: "/biomod2025",
  assetPrefix: "/biomod2025",
  images: {
    unoptimized: true,
  },
};
