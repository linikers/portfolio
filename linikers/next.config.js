/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["jsx", "js", "tsx", "ts"],
};
const path = require("path");
module.exports = {
  ...nextConfig,
  images: {
    domains: [
      'github-readme-stats.vercel.app',
      'res.cloudinary.com',
      'firebasestorage.googleapis.com',
    ],
  },
  // Página estática do modelo de pousada (linikers/public/bside/pousada/modelo).
  // Fica fora do Pages Router de propósito: é um site one-page autônomo, com
  // CSS e JS próprios, feito para virar site de cliente. O rewrite só resolve
  // o endereço limpo, igual ao dos outros modelos (/bside/<vertical>/modelo).
  async rewrites() {
    return [
      { source: "/bside/pousada/modelo", destination: "/bside/pousada/modelo/index.html" },
      { source: "/bside/pousada/modelo/", destination: "/bside/pousada/modelo/index.html" },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.alias["@/components"] = path.join(
        __dirname,
        "src/components"
      );
      config.resolve.alias["@/styles"] = path.join(__dirname, "src/styles");
    }

    return config;
  },
};
