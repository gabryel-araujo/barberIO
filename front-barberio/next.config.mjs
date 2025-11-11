/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["deljowbybxjkqoofsvfk.supabase.co"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // tudo que vier de /api/...
        destination: `http://${process.env.HOMOLOG_SERVER}:${process.env.API_PORT}/:path*`, // vai para o seu back-end  Novo - 136.248.85.49 ANTIGO - 137.131.135.29
      },
    ];
  },
};

export default nextConfig;
