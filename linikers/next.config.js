/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["jsx", "js", "tsx", "ts"],
};
const path = require("path");
module.exports = {
  ...nextConfig,

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
