/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["jsx", "js", "tsx", "ts"],
};

module.exports = {
  ...nextConfig,
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.alias["@/components"] =
        require.resolve("./src/components");
      config.resolve.alias["@/styles"] = require.resolve("./src/styles");
    }

    return config;
  },
};
