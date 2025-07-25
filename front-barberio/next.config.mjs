/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // tudo que vier de /api/...
        destination: "http://137.131.135.29:1509/:path*", // vai para o seu back-end
      },
      {
        source: "/crm/:path*", // tudo que vier de /api/...
        destination: "http://136.248.85.49:3000/:path*", // vai para o seu back-end
      },
    ];
  },
};

export default nextConfig;
