import { getScholarships } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { page = 1, limit = 12, ...filters } = req.query;
    const result = await getScholarships({ ...filters, page: parseInt(page), limit: parseInt(limit) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scholarships' });
  }
}
