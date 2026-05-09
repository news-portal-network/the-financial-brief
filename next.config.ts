import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["drizzle-kit", "sharp"],
  turbopack: {
    resolveAlias: {
      "drizzle-kit": "./drizzle-kit-shim.js",
      "drizzle-kit/api": "./drizzle-kit-shim.js",
    },
  },
};

initOpenNextCloudflareForDev();

export default withPayload(nextConfig);
