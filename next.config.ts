import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: lets a phone preview the local dev server through an ngrok tunnel.
  // Has no effect on production builds.
  allowedDevOrigins: ["*.ngrok-free.app"],
};

export default nextConfig;
