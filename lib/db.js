import { createClient } from '@libsql/client';

let client;

export function getDb() {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL || 'file:local.db',
      authToken: process.env.TURSO_AUTH_TOKEN || undefined,
    });
  }
  return client;
}

export async function getScholarships({ country, type, degree, funding, visa, page = 1, limit = 12, search } = {}) {
  const db = getDb();
  let where = ['is_approved = 1', 'is_active = 1'];
  const args = [];

  if (country) { where.push('country = ?'); args.push(country); }
  if (type) { where.push('type = ?'); args.push(type); }
  if (degree) { where.push('degree_level = ?'); args.push(degree); }
  if (funding) { where.push('funding_type = ?'); args.push(funding); }
  if (visa === '1') { where.push('visa_sponsored = 1'); }
  if (search) {
    where.push('(title LIKE ? OR description LIKE ? OR country LIKE ?)');
    args.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';
  const offset = (parseInt(page) - 1) * parseInt(limit);

  const [dataResult, countResult] = await Promise.all([
    db.execute({ sql: `SELECT * FROM scholarships ${whereClause} ORDER BY is_featured DESC, created_at DESC LIMIT ? OFFSET ?`, args: [...args, parseInt(limit), offset] }),
    db.execute({ sql: `SELECT COUNT(*) as total FROM scholarships ${whereClause}`, args }),
  ]);

  const total = Number(countResult.rows[0].total);
  return {
    scholarships: dataResult.rows,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / parseInt(limit)),
  };
}

export async function getScholarshipBySlug(slug) {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM scholarships WHERE slug = ? AND is_active = 1', args: [slug] });
  return result.rows[0] || null;
}

export async function getFeaturedScholarships(limit = 6) {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM scholarships WHERE is_featured = 1 AND is_active = 1 ORDER BY created_at DESC LIMIT ?', args: [parseInt(limit)] });
  return result.rows || [];
}

export async function getCountries() {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM countries ORDER BY name ASC', args: [] });
  return result.rows || [];
}

export async function getCountryBySlug(slug) {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM countries WHERE slug = ?', args: [slug] });
  return result.rows[0] || null;
}

export async function getScholarshipsByCountry(country, limit = 12) {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM scholarships WHERE country = ? AND is_active = 1 ORDER BY is_featured DESC LIMIT ?', args: [country, parseInt(limit)] });
  return result.rows || [];
}

export async function getBlogPosts(limit = 10) {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC LIMIT ?', args: [parseInt(limit)] });
  return result.rows || [];
}

export async function getBlogPostBySlug(slug) {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1', args: [slug] });
  return result.rows[0] || null;
}

export async function incrementViews(table, slug) {
  try {
    const db = getDb();
    await db.execute({ sql: `UPDATE ${table} SET views = views + 1 WHERE slug = ?`, args: [slug] });
  } catch (e) { /* ignore */ }
}

export async function getStats() {
  const db = getDb();
  const [s, c, b, e] = await Promise.all([
    db.execute({ sql: 'SELECT COUNT(*) as count FROM scholarships WHERE is_active = 1', args: [] }),
    db.execute({ sql: 'SELECT COUNT(*) as count FROM countries', args: [] }),
    db.execute({ sql: 'SELECT COUNT(*) as count FROM blog_posts WHERE is_published = 1', args: [] }),
    db.execute({ sql: 'SELECT COUNT(*) as count FROM email_subscribers', args: [] }),
  ]);
  return {
    scholarships: Number(s.rows[0].count),
    countries: Number(c.rows[0].count),
    blog_posts: Number(b.rows[0].count),
    subscribers: Number(e.rows[0].count),
  };
}
