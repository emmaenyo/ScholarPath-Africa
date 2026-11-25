// pages/api/contact.js — stores contact-form messages in the database.
import { getDb } from '../../lib/db'

const hits = new Map() // best-effort in-memory rate limit per IP (resets on cold start)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name = '', email = '', subject = 'General Inquiry', message = '', website = '' } = req.body || {}

  // Honeypot: real users never fill this hidden field
  if (website) return res.status(200).json({ ok: true })

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim()
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000)
  if (recent.length >= 5) return res.status(429).json({ error: 'Too many messages. Please try again later.' })

  const n = String(name).trim().slice(0, 100)
  const e = String(email).trim().slice(0, 200)
  const sub = String(subject).trim().slice(0, 100)
  const m = String(message).trim().slice(0, 5000)

  if (n.length < 2) return res.status(400).json({ error: 'Please enter your name.' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return res.status(400).json({ error: 'Please enter a valid email address.' })
  if (m.length < 10) return res.status(400).json({ error: 'Please write a short message (at least 10 characters).' })

  try {
    const db = getDb()
    await db.execute({
      sql: `CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, email TEXT, subject TEXT, message TEXT,
        is_read INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      args: [],
    })
    await db.execute({
      sql: 'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      args: [n, e, sub, m],
    })
    hits.set(ip, [...recent, now])
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact error', err)
    return res.status(500).json({ error: 'Something went wrong. Please email info@scholarpathafrica.com instead.' })
  }
}
