import { getDb } from '../../lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, name } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Valid email required' });

  try {
    const db = getDb();
    const existing = db.prepare('SELECT id FROM email_subscribers WHERE email = ?').get(email);
    if (existing) return res.status(200).json({ success: true, message: 'Already subscribed' });

    db.prepare('INSERT INTO email_subscribers (email, name) VALUES (?, ?)').run(email, name || '');
    res.status(201).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ error: 'Subscription failed' });
  }
}
