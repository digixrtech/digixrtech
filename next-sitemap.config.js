/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.digixrtech.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './public',
};
