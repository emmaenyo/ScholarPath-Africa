// pages/sitemap.xml.js
import { getDb } from '../lib/db'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarpathafrica.com'

function generateSitemap(scholarships, countries, posts) {
  const now = new Date().toISOString().split('T')[0]

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/scholarships', priority: '0.9', changefreq: 'daily' },
    { url: '/scholarships?funding=full', priority: '0.8', changefreq: 'daily' },
    { url: '/scholarships?type=fellowship', priority: '0.8', changefreq: 'daily' },
    { url: '/scholarships?type=internship', priority: '0.8', changefreq: 'daily' },
    { url: '/scholarships?type=conference', priority: '0.7', changefreq: 'weekly' },
    { url: '/scholarships?visa=1', priority: '0.8', changefreq: 'daily' },
    { url: '/countries', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
    { url: '/tools', priority: '0.7', changefreq: 'monthly' },
    { url: '/tools/sop-generator', priority: '0.7', changefreq: 'monthly' },
    { url: '/tools/cv-guide', priority: '0.7', changefreq: 'monthly' },
    { url: '/tools/checklist', priority: '0.6', changefreq: 'monthly' },
    { url: '/tools/visa-tips', priority: '0.7', changefreq: 'monthly' },
    { url: '/tools/motivation-letter', priority: '0.7', changefreq: 'monthly' },
    { url: '/tools/recommendation-template', priority: '0.6', changefreq: 'monthly' },
    { url: '/about', priority: '0.5', changefreq: 'monthly' },
    { url: '/contact', priority: '0.4', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  ${staticPages.map(p => `<url>
    <loc>${SITE_URL}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n  ')}

  ${scholarships.map(s => `<url>
    <loc>${SITE_URL}/scholarships/${s.slug}</loc>
    <lastmod>${now}</lastmod>
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
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n  ')}

</urlset>`
}

export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  const db = getDb()
  const [s, c, p] = await Promise.all([
    db.execute({ sql: 'SELECT slug FROM scholarships WHERE is_active = 1', args: [] }),
    db.execute({ sql: 'SELECT slug FROM countries', args: [] }),
    db.execute({ sql: 'SELECT slug FROM blog_posts WHERE is_published = 1', args: [] }),
  ])

  const sitemap = generateSitemap(s.rows, c.rows, p.rows)
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate')
  res.write(sitemap)
  res.end()
  return { props: {} }
}
