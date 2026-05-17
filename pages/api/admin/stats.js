import { requireAuth } from '../../../lib/auth';
import { getStats } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const auth = requireAuth(req);
  if (!auth.success) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const stats = await getStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
