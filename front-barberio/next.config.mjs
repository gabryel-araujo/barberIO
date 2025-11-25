/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["deljowbybxjkqoofsvfk.supabase.co"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // tudo que vier de /api/...
        destination: `http://${process.env.PROD_SERVER}:${process.env.API_PORT}/:path*`,
      },
    ];
  },
};

export default nextConfig;
