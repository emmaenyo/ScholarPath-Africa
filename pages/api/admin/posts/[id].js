// pages/api/admin/posts/[id].js
import { requireAuth } from '../../../../lib/auth';
import { getDb } from '../../../../lib/db';

export default async function handler(req, res) {
  const auth = requireAuth(req);
  if (!auth.success) return res.status(401).json({ error: 'Unauthorized' });
  const { id } = req.query;
  const db = getDb();

  if (req.method === 'PUT') {
    try {
      const data = req.body;
      await db.execute({
        sql: `UPDATE blog_posts SET title=?, excerpt=?, content=?, category=?, author=?, is_published=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`,
        args: [data.title, data.excerpt || '', data.content || '', data.category || 'Tips', data.author || 'ScholarPath Team', data.is_published ? 1 : 0, id],
      });
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await db.execute({ sql: 'DELETE FROM blog_posts WHERE id = ?', args: [id] });
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
