// scripts/batch3.js — needs a READ+WRITE Turso token
//   node scripts\batch3.js            (dry run)
//   node scripts\batch3.js --apply
const { createClient } = require('@libsql/client');
const posts = require('./batch3-posts');
const db = createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN });
const APPLY = process.argv.includes('--apply');

// stale-year thin posts
const UNPUBLISH_SLUGS = [];
const UNPUBLISH_TITLES = [];

(async () => {
  for (const s of UNPUBLISH_SLUGS) {
    const r = await db.execute({ sql: 'SELECT id, title FROM blog_posts WHERE slug = ?', args: [s] });
    console.log(r.rows[0] ? `unpublish [${r.rows[0].id}] ${r.rows[0].title}` : `(not found) ${s}`);
    if (APPLY && r.rows[0]) await db.execute({ sql: 'UPDATE blog_posts SET is_published = 0 WHERE slug = ?', args: [s] });
  }
  for (const t of UNPUBLISH_TITLES) {
    const r = await db.execute({ sql: 'SELECT id, title FROM blog_posts WHERE title = ? AND is_published = 1', args: [t] });
    console.log(r.rows[0] ? `unpublish [${r.rows[0].id}] ${t}` : `(not found) ${t}`);
    if (APPLY && r.rows[0]) await db.execute({ sql: 'UPDATE blog_posts SET is_published = 0 WHERE title = ?', args: [t] });
  }
  for (const p of posts) {
    const words = p.content.split(/\s+/).length;
    const r = await db.execute({ sql: 'SELECT id FROM blog_posts WHERE slug = ?', args: [p.slug] });
    console.log(`${r.rows[0] ? 'rewrite' : '(slug missing!)'} ${p.slug} -> ${words} words`);
    if (APPLY && r.rows[0]) await db.execute({
      sql: 'UPDATE blog_posts SET title=?, excerpt=?, content=?, is_published=1, updated_at=CURRENT_TIMESTAMP WHERE slug=?',
      args: [p.title, p.excerpt, p.content, p.slug] });
  }
  console.log(APPLY ? '\nDone.' : '\nDry run only. Add --apply to write.');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
