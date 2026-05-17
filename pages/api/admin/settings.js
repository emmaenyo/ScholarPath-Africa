// pages/api/admin/settings.js
import { requireAuth } from '../../../lib/auth';
import { getDb } from '../../../lib/db';

export default async function handler(req, res) {
  const auth = requireAuth(req);
  if (!auth.success) return res.status(401).json({ error: 'Unauthorized' });

  const db = getDb();

  // Create settings table if it doesn't exist
  try {
    await db.execute({ sql: `CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)`, args: [] });
  } catch {}

  if (req.method === 'GET') {
    try {
      const result = await db.execute({ sql: 'SELECT key, value FROM settings', args: [] });
      const settings = {};
      result.rows.forEach(row => { settings[row.key] = row.value; });
      res.status(200).json(settings);
    } catch (e) {
      res.status(200).json({});
    }
  } else if (req.method === 'POST') {
    try {
      const { key, value } = req.body;
      await db.execute({ sql: `INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`, args: [key, value] });
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === 'PUT' && req.body.trigger_now) {
    // Manually trigger the cron
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cron/auto-scholarships`, {
        method: 'GET',
        headers: { 'x-admin-trigger': process.env.CRON_SECRET },
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
