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
        sql: `UPDATE scholarships SET title=?, country=?, type=?, degree_level=?, funding_type=?, amount=?, deadline=?, description=?, eligibility=?, benefits=?, subjects=?, host_university=?, host_country=?, official_url=?, visa_sponsored=?, is_featured=?, is_active=?, tips=? WHERE id=?`,
        args: [data.title, data.country, data.type, data.degree_level, data.funding_type, data.amount, data.deadline, data.description, data.eligibility, data.benefits, data.subjects, data.host_university, data.host_country, data.official_url, data.visa_sponsored ? 1 : 0, data.is_featured ? 1 : 0, data.is_active !== false ? 1 : 0, data.tips, id],
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await db.execute({ sql: 'DELETE FROM scholarships WHERE id = ?', args: [id] });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
