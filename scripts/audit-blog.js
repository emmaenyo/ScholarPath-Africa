// scripts/audit-blog.js
// Usage:  $env:TURSO_DATABASE_URL="..."; $env:TURSO_AUTH_TOKEN="..."
//         node scripts/audit-blog.js            (report only)
//         node scripts/audit-blog.js --apply    (UNPUBLISH flagged posts; reversible, nothing is deleted)
const { createClient } = require('@libsql/client');
const db = createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN });
const APPLY = process.argv.includes('--apply');
const MIN_WORDS = 600;

const words = t => String(t || '').trim().split(/\s+/).filter(Boolean).length;
const norm = t => String(t || '').toLowerCase().replace(/\b(20\d\d)\b/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

(async () => {
  const r = await db.execute({ sql: 'SELECT id, title, slug, category, content, views, is_published FROM blog_posts WHERE is_published = 1', args: [] });
  const posts = r.rows.map(p => ({ id: p.id, title: String(p.title), slug: String(p.slug), views: Number(p.views || 0), words: words(p.content) }));

  // duplicates: same normalized title -> keep the longest
  const groups = {};
  posts.forEach(p => (groups[norm(p.title)] ||= []).push(p));
  const dupLoser = new Set();
  Object.values(groups).forEach(g => { if (g.length > 1) g.sort((a, b) => b.words - a.words).slice(1).forEach(p => dupLoser.add(p.id)); });

  const flagged = [];
  posts.forEach(p => {
    const why = [];
    if (p.words < MIN_WORDS) why.push(`thin (${p.words} words)`);
    if (/\b(2023|2024|2025)\b/.test(p.title + ' ' + p.slug)) why.push('stale year in title/slug');
    if (dupLoser.has(p.id)) why.push('duplicate topic');
    if (why.length) flagged.push({ ...p, why: why.join(', ') });
  });

  console.log(`\nPublished posts: ${posts.length}   Flagged: ${flagged.length}   Keep: ${posts.length - flagged.length}\n`);
  console.log('--- KEEP ---');
  posts.filter(p => !flagged.find(f => f.id === p.id)).forEach(p => console.log(`  ${p.words}w  ${p.title}`));
  console.log('\n--- FLAGGED ---');
  flagged.forEach(p => console.log(`  [${p.id}] ${p.words}w  ${p.title}\n        /blog/${p.slug}  -> ${p.why}`));

  if (APPLY) {
    for (const p of flagged) await db.execute({ sql: 'UPDATE blog_posts SET is_published = 0 WHERE id = ?', args: [p.id] });
    console.log(`\nUnpublished ${flagged.length} posts. To restore one: UPDATE blog_posts SET is_published=1 WHERE id=<id>.`);
  } else console.log('\nReport only. Re-run with --apply to unpublish the flagged posts.');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
