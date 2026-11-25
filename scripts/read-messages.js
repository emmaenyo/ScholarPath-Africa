// node scripts/read-messages.js  (needs TURSO_DATABASE_URL + TURSO_AUTH_TOKEN in the environment)
const { createClient } = require('@libsql/client')
;(async () => {
  const db = createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN })
  const r = await db.execute('SELECT id, name, email, subject, message, created_at FROM contact_messages ORDER BY id DESC LIMIT 50').catch(() => ({ rows: [] }))
  if (!r.rows.length) return console.log('No messages yet.')
  for (const m of r.rows) console.log(`#${m.id} ${m.created_at}\n${m.name} <${m.email}> — ${m.subject}\n${m.message}\n${'-'.repeat(50)}`)
})()
