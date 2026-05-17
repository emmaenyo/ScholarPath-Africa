// pages/api/cron/auto-scholarships.js
export default async function handler(req, res) {
  const isVercelCron = req.headers.authorization === `Bearer ${process.env.CRON_SECRET}`;
  const isAdmin = req.headers['x-admin-trigger'] === process.env.CRON_SECRET;
  if (!isVercelCron && !isAdmin) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { createClient } = await import('@libsql/client');
    const db = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    // Create settings table if needed
    try { await db.execute({ sql: `CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)`, args: [] }); } catch {}

    // Check if auto-generation is enabled
    const enabledSetting = await db.execute({ sql: 'SELECT value FROM settings WHERE key = ?', args: ['auto_scholarships_enabled'] }).catch(() => ({ rows: [] }));
    if (enabledSetting.rows.length && enabledSetting.rows[0].value === '0') {
      return res.status(200).json({ success: false, message: 'Auto-generation is disabled.' });
    }

    // Check auto-publish setting
    const publishSetting = await db.execute({ sql: 'SELECT value FROM settings WHERE key = ?', args: ['auto_publish'] }).catch(() => ({ rows: [] }));
    const autoPublish = !publishSetting.rows.length || publishSetting.rows[0].value !== '0';

    // Call OpenAI
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a scholarship database assistant for African students. Generate exactly 5 real, currently active opportunities. Mix types: scholarships, fellowships, internships, conferences, research grants. Return ONLY a valid JSON array with no markdown. Each object:
{
  "title": "Full name",
  "slug": "url-slug",
  "country": "Host country",
  "country_slug": "host-country-slug",
  "type": "scholarship|fellowship|internship|conference|research-grant",
  "degree_level": "Bachelors|Masters|PhD|Non-degree|All",
  "funding_type": "full|partial|paid|free|stipend",
  "amount": "funding description",
  "deadline": "Month Year",
  "description": "2-3 sentences",
  "eligibility": "Key requirements",
  "benefits": "What is covered",
  "subjects": "Fields of study",
  "host_university": "Organization name",
  "host_country": "Country",
  "official_url": "https://real-url.org",
  "visa_sponsored": true or false,
  "is_featured": false
}`,
          },
          { role: 'user', content: 'Generate 5 diverse opportunities for African students. Include at least one internship and one conference.' },
        ],
        temperature: 0.8,
        max_tokens: 3000,
      }),
    });

    const openaiData = await openaiRes.json();
    const content = openaiData.choices?.[0]?.message?.content;
    if (!content) throw new Error('No response from OpenAI');

    let opportunities;
    try { opportunities = JSON.parse(content); }
    catch {
      const match = content.match(/\[[\s\S]*\]/);
      if (!match) throw new Error('Could not parse OpenAI response');
      opportunities = JSON.parse(match[0]);
    }

    if (!Array.isArray(opportunities)) throw new Error('Response is not an array');

    let added = 0, skipped = 0;
    for (const s of opportunities) {
      try {
        const existing = await db.execute({ sql: 'SELECT id FROM scholarships WHERE slug = ?', args: [s.slug] });
        if (existing.rows.length) { skipped++; continue; }
        await db.execute({
          sql: `INSERT INTO scholarships (title, slug, country, country_slug, type, degree_level, funding_type, amount, deadline, description, eligibility, benefits, subjects, host_university, host_country, official_url, visa_sponsored, is_featured, is_approved, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
          args: [s.title, s.slug, s.country, s.country_slug || s.country.toLowerCase().replace(/\s+/g, '-'), s.type, s.degree_level, s.funding_type, s.amount, s.deadline, s.description, s.eligibility, s.benefits, s.subjects, s.host_university, s.host_country, s.official_url, s.visa_sponsored ? 1 : 0, 0, autoPublish ? 1 : 0],
        });
        added++;
      } catch (e) { console.error(`Failed: ${s.title}`, e.message); skipped++; }
    }

    // Update last run timestamp
    await db.execute({ sql: `INSERT OR REPLACE INTO settings (key, value) VALUES ('last_auto_run', ?)`, args: [new Date().toISOString()] }).catch(() => {});

    res.status(200).json({ success: true, added, skipped, auto_published: autoPublish });
  } catch (error) {
    console.error('Cron error:', error);
    res.status(500).json({ error: error.message });
  }
}
