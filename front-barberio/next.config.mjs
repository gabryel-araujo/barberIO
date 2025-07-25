/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // tudo que vier de /api/...
        destination: "http://127.0.0.1:1509/:path*", // vai para o seu back-end
      },
    ];
  },
};

export default nextConfig;
