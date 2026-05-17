const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarpathAfrica.com';

export default function Robots() {}

export async function getServerSideProps({ res }) {
  const content = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(content);
  res.end();
  return { props: {} };
}
