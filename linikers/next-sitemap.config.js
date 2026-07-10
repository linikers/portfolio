/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://linikers.cloud",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
  },
  exclude: ["/admin/**", "/api/**", "/login", "/whatsapp-qr"],
  generateIndexSitemap: false,
  outDir: "public",
};
