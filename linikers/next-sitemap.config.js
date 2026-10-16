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
  exclude: ["/admin", "/admin/**", "/api/**", "/login", "/whatsapp-qr", "/components/**", "/bside/agenda-demo", "/bside/cardapio-demo"],
  generateIndexSitemap: false,
  outDir: "public",
};
