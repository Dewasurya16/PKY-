/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "okdixuuvwzcfyomzksss.supabase.co",
      },
    ],
  },
};

export default nextConfig;
