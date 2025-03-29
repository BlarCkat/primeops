import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    serverComponentsExternalPackages: ['openai']
  },
  env:{
    OPENAI_API_KEY: "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"
  }
};

export default nextConfig;
