/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["deljowbybxjkqoofsvfk.supabase.co"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://${process.env.SERVER}:${process.env.API_PORT}/:path*`,
      },
    ];
  },
};

export default nextConfig;
