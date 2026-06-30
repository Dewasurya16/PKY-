/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  serverExternalPackages: ['pdfkit'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "okdixuuvwzcfyomzksss.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
