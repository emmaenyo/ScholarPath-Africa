const { createClient } = require('@libsql/client');

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const slugsToCheck = [
  'top-10-fully-funded-scholarships-for-african-students-in-2025',
  'best-countries-for-african-students-to-study-abroad-in-2025',
  'how-to-write-a-winning-scholarship-personal-statement',
];

async function check() {
  console.log('Checking blog slugs...\n');
  for (const slug of slugsToCheck) {
    const result = await db.execute({ sql: 'SELECT id, title, slug FROM blog_posts WHERE slug = ?', args: [slug] });
    if (result.rows.length) {
      console.log(`✅ FOUND: ${result.rows[0].title}`);
    } else {
      console.log(`❌ NOT FOUND: ${slug}`);
      // Find similar
      const like = await db.execute({ sql: 'SELECT slug FROM blog_posts WHERE slug LIKE ? LIMIT 3', args: [`%${slug.split('-').slice(0,4).join('-')}%`] });
      if (like.rows.length) console.log(`   Similar slugs: ${like.rows.map(r => r.slug).join(', ')}`);
    }
  }
  process.exit(0);
}

check().catch(console.error);
