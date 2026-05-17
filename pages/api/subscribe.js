import { getDb } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, name } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Valid email required' });
  try {
    const db = getDb();
    const existing = await db.execute({ sql: 'SELECT id FROM email_subscribers WHERE email = ?', args: [email] });
    if (existing.rows.length) return res.status(200).json({ success: true, message: 'Already subscribed' });
    await db.execute({ sql: 'INSERT INTO email_subscribers (email, name) VALUES (?, ?)', args: [email, name || ''] });
    res.status(201).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Subscription failed' });
  }
}
