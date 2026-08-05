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
  exclude: ["/admin", "/admin/**", "/api/**", "/login", "/whatsapp-qr", "/components/**"],
  generateIndexSitemap: false,
  outDir: "public",
};
