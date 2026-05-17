import { getDb } from '../lib/db';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarpathAfrica.com';

function generateSitemap(scholarships, countries, posts) {
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/scholarships', priority: '0.9', changefreq: 'daily' },
    { url: '/countries', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog', priority: '0.7', changefreq: 'weekly' },
    { url: '/tools', priority: '0.7', changefreq: 'monthly' },
    { url: '/tools/sop-generator', priority: '0.6', changefreq: 'monthly' },
    { url: '/tools/cv-guide', priority: '0.6', changefreq: 'monthly' },
    { url: '/tools/checklist', priority: '0.6', changefreq: 'monthly' },
    { url: '/tools/visa-tips', priority: '0.6', changefreq: 'monthly' },
    { url: '/tools/motivation-letter', priority: '0.6', changefreq: 'monthly' },
    { url: '/tools/recommendation-template', priority: '0.6', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  ];

  const now = new Date().toISOString().split('T')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(p => `<url>
    <loc>${SITE_URL}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n  ')}
  ${scholarships.map(s => `<url>
    <loc>${SITE_URL}/scholarships/${s.slug}</loc>
    <lastmod>${s.updated_at ? s.updated_at.split('T')[0] : now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n  ')}
  ${countries.map(c => `<url>
    <loc>${SITE_URL}/countries/${c.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n  ')}
  ${posts.map(p => `<url>
    <loc>${SITE_URL}/blog/${p.slug}</loc>
    <lastmod>${p.updated_at ? p.updated_at.split('T')[0] : now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n  ')}
</urlset>`;
}

export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  const db = getDb();
  const scholarships = db.prepare('SELECT slug, updated_at FROM scholarships WHERE is_active = 1').all();
  const countries = db.prepare('SELECT slug FROM countries').all();
  const posts = db.prepare('SELECT slug, updated_at FROM blog_posts WHERE is_published = 1').all();

  const sitemap = generateSitemap(scholarships, countries, posts);

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return { props: {} };
}
