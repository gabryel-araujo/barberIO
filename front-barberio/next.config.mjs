/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["deljowbybxjkqoofsvfk.supabase.co"]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // tudo que vier de /api/...
        destination: "http://137.131.135.29:1509/:path*", // vai para o seu back-end  Novo - 136.248.85.49
      },
    ];
  },
};

export default nextConfig;
