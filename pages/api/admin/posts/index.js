// pages/api/admin/posts/index.js
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
      const result = await db.execute({ sql: 'SELECT * FROM blog_posts ORDER BY created_at DESC', args: [] });
      res.status(200).json({ posts: result.rows || [] });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === 'POST') {
    try {
      const data = req.body;
      if (!data.title) return res.status(400).json({ error: 'Title required' });
      let slug = data.slug || generateSlug(data.title);
      const existing = await db.execute({ sql: 'SELECT id FROM blog_posts WHERE slug = ?', args: [slug] });
      if (existing.rows.length) slug = `${slug}-${Date.now()}`;
      await db.execute({
        sql: `INSERT INTO blog_posts (title, slug, excerpt, content, category, author, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [data.title, slug, data.excerpt || '', data.content || '', data.category || 'Tips', data.author || 'ScholarPath Team', data.is_published ? 1 : 0],
      });
      res.status(201).json({ success: true, slug });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
