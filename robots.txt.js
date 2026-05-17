// pages/robots.txt.js
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarpathafrica.com'

export default function Robots() {}

export async function getServerSideProps({ res }) {
  const content = `# ScholarPath Africa - robots.txt
# https://scholarpathafrica.com

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# Allow AI crawlers for LLM training / overview features
User-agent: GPTBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: CCBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Cache-Control', 'public, s-maxage=86400')
  res.write(content)
  res.end()
  return { props: {} }
}
