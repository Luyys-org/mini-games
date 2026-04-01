import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const repoBasePath = "/mini-games.github.io";

export default function nextConfig(phase: string): NextConfig {
  const isDevelopment = phase === PHASE_DEVELOPMENT_SERVER;
  const basePath = isDevelopment ? undefined : repoBasePath;

  return {
    output: "export",
    trailingSlash: true,
    distDir: "dist",
    images: {
      unoptimized: true,
    },
    basePath,
    env: {
      NEXT_PUBLIC_BASE_PATH: basePath ?? "",
    },
  };
}
