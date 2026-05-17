// lib/db.js — Turso/libsql compatible (works on Vercel)
import { createClient } from '@libsql/client';

let client;

export function getDb() {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL || 'file:local.db',
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

// Scholarship helpers
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
  const offset = (page - 1) * limit;

  const [dataResult, countResult] = await Promise.all([
    db.execute({ sql: `SELECT * FROM scholarships ${whereClause} ORDER BY is_featured DESC, created_at DESC LIMIT ? OFFSET ?`, args: [...args, limit, offset] }),
    db.execute({ sql: `SELECT COUNT(*) as total FROM scholarships ${whereClause}`, args }),
  ]);

  return {
    scholarships: dataResult.rows,
    total: countResult.rows[0].total,
    page,
    totalPages: Math.ceil(countResult.rows[0].total / limit),
  };
}

export async function getScholarshipBySlug(slug) {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM scholarships WHERE slug = ? AND is_active = 1', args: [slug] });
  return result.rows[0] || null;
}

export async function getFeaturedScholarships(limit = 6) {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM scholarships WHERE is_featured = 1 AND is_active = 1 ORDER BY created_at DESC LIMIT ?', args: [limit] });
  return result.rows;
}

export async function getCountries() {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM countries ORDER BY name ASC', args: [] });
  return result.rows;
}

export async function getCountryBySlug(slug) {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM countries WHERE slug = ?', args: [slug] });
  return result.rows[0] || null;
}

export async function getScholarshipsByCountry(country, limit = 12) {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM scholarships WHERE country = ? AND is_active = 1 ORDER BY is_featured DESC LIMIT ?', args: [country, limit] });
  return result.rows;
}

export async function getBlogPosts(limit = 10) {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC LIMIT ?', args: [limit] });
  return result.rows;
}

export async function getBlogPostBySlug(slug) {
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1', args: [slug] });
  return result.rows[0] || null;
}

export async function incrementViews(table, slug) {
  const db = getDb();
  await db.execute({ sql: `UPDATE ${table} SET views = views + 1 WHERE slug = ?`, args: [slug] });
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
    scholarships: s.rows[0].count,
    countries: c.rows[0].count,
    blog_posts: b.rows[0].count,
    subscribers: e.rows[0].count,
  };
}
