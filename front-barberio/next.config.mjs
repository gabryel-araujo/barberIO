/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["deljowbybxjkqoofsvfk.supabase.co"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // tudo que vier de /api/...
        destination: `http://${process.env.HOMOLOG_SERVER}:${process.env.API_PORT}/:path*`,
        //destination: "http://163.176.201.237:1509/:path*",
      },
    ];
  },
};

export default nextConfig;
