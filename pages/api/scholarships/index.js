import { requireAuth } from '../../../../lib/auth';
import { getDb } from '../../../../lib/db';

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export default async function handler(req, res) {
  const auth = requireAuth(req);
  if (!auth.success) return res.status(401).json({ error: 'Unauthorized' });
  const db = getDb();

  if (req.method === 'GET') {
    try {
      const { page = 1, limit = 20, search = '' } = req.query;
      const offset = (parseInt(page) - 1) * parseInt(limit);
      let sql = 'SELECT * FROM scholarships';
      let args = [];
      if (search) { sql += ' WHERE title LIKE ? OR country LIKE ?'; args = [`%${search}%`, `%${search}%`]; }
      sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      args.push(parseInt(limit), offset);
      const result = await db.execute({ sql, args });
      const countSql = search ? 'SELECT COUNT(*) as total FROM scholarships WHERE title LIKE ? OR country LIKE ?' : 'SELECT COUNT(*) as total FROM scholarships';
      const countArgs = search ? [`%${search}%`, `%${search}%`] : [];
      const countResult = await db.execute({ sql: countSql, args: countArgs });
      res.status(200).json({ scholarships: result.rows, total: countResult.rows[0].total });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = req.body;
      if (!data.title || !data.country) return res.status(400).json({ error: 'Title and country required' });
      let slug = generateSlug(data.title);
      const existing = await db.execute({ sql: 'SELECT id FROM scholarships WHERE slug = ?', args: [slug] });
      if (existing.rows.length) slug = `${slug}-${Date.now()}`;
      await db.execute({
        sql: `INSERT INTO scholarships (title, slug, country, country_slug, type, degree_level, funding_type, amount, deadline, description, eligibility, benefits, subjects, host_university, host_country, official_url, visa_sponsored, is_featured, is_active, tips) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [data.title, slug, data.country, generateSlug(data.country), data.type || 'scholarship', data.degree_level || '', data.funding_type || 'full', data.amount || '', data.deadline || '', data.description || '', data.eligibility || '', data.benefits || '', data.subjects || '', data.host_university || '', data.host_country || data.country, data.official_url || '', data.visa_sponsored ? 1 : 0, data.is_featured ? 1 : 0, 1, data.tips || ''],
      });
      res.status(201).json({ success: true, slug });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create: ' + error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
