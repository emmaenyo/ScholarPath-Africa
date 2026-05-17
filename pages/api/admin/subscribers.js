// pages/api/admin/subscribers.js
import { requireAuth } from '../../../lib/auth';
import { getDb } from '../../../lib/db';

export default async function handler(req, res) {
  const auth = requireAuth(req);
  if (!auth.success) return res.status(401).json({ error: 'Unauthorized' });
  const db = getDb();

  if (req.method === 'GET') {
    try {
      const result = await db.execute({ 
        sql: 'SELECT * FROM email_subscribers ORDER BY created_at DESC', 
        args: [] 
      });
      res.status(200).json({ subscribers: result.rows || [] });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await db.execute({ sql: 'DELETE FROM email_subscribers WHERE id = ?', args: [id] });
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
