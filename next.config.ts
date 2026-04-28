import type { NextConfig } from "next";
import path from "path";

const root = process.cwd()

const nextConfig: NextConfig = {
  turbopack: {
    root,
    resolveAlias: {
      tailwindcss: path.join(root, 'node_modules/tailwindcss'),
    },
  },
};

export default nextConfig;
