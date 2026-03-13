/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://digixr.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './public',
};
