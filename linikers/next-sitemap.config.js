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
  exclude: ["/admin", "/admin/**", "/api/**", "/login", "/whatsapp-qr", "/sendCert", "/components/**", "/bside/agenda-demo", "/bside/cardapio-demo", "/bside/hot", "/bside/hot/modelo"],
  generateIndexSitemap: false,
  outDir: "public",
};
