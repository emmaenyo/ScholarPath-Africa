import { requireAuth } from '../../../../lib/auth';
import { getDb } from '../../../../lib/db';

export default async function handler(req, res) {
  const auth = requireAuth(req);
  if (!auth.success) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query;
  const db = getDb();

  if (req.method === 'GET') {
    const scholarship = db.prepare('SELECT * FROM scholarships WHERE id = ?').get(id);
    if (!scholarship) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(scholarship);
  }

  if (req.method === 'PUT') {
    try {
      const data = req.body;
      const stmt = db.prepare(`
        UPDATE scholarships SET
          title = ?, country = ?, type = ?, degree_level = ?, funding_type = ?,
          amount = ?, deadline = ?, description = ?, eligibility = ?, benefits = ?,
          subjects = ?, host_university = ?, host_country = ?, official_url = ?,
          visa_assistance = ?, is_featured = ?, is_active = ?, tips = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      stmt.run(
        data.title, data.country, data.type, data.degree_level, data.funding_type,
        data.amount, data.deadline, data.description, data.eligibility, data.benefits,
        data.subjects, data.host_university, data.host_country, data.official_url,
        data.visa_sponsored ? 1 : 0, data.is_featured ? 1 : 0,
        data.is_active !== false ? 1 : 0, data.tips, id
      );
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ error: 'Failed to update scholarship' });
    }
  } else if (req.method === 'DELETE') {
    try {
      db.prepare('DELETE FROM scholarships WHERE id = ?').run(id);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Failed to delete scholarship' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
