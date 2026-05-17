// pages/api/cron/auto-scholarships.js
export default async function handler(req, res) {
  // Verify this is called by Vercel cron or admin
  const isVercelCron = req.headers.authorization === `Bearer ${process.env.CRON_SECRET}`;
  const isAdmin = req.headers['x-admin-trigger'] === process.env.CRON_SECRET;
  
  if (!isVercelCron && !isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Check if auto-add is enabled in the database
    const { createClient } = await import('@libsql/client');
    const db = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    // Check settings table
    try {
      const setting = await db.execute({ 
        sql: 'SELECT value FROM settings WHERE key = ?', 
        args: ['auto_scholarships_enabled'] 
      });
      if (setting.rows.length && setting.rows[0].value === '0') {
        return res.status(200).json({ success: false, message: 'Auto-scholarship generation is disabled.' });
      }
    } catch {
      // Settings table may not exist yet, continue
    }

    // Call OpenAI
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a scholarship database assistant. Generate exactly 5 real, currently active scholarships for African students. Return ONLY a valid JSON array, no markdown, no explanation. Each object must have these exact fields:
{
  "title": "Full scholarship name",
  "slug": "url-friendly-slug",
  "country": "Host country name",
  "country_slug": "host-country-slug",
  "type": "scholarship|fellowship|internship|research-grant",
  "degree_level": "Bachelors|Masters|PhD|Non-degree",
  "funding_type": "full|partial|paid",
  "amount": "funding amount description",
  "deadline": "Month Year deadline",
  "description": "2-3 sentence description",
  "eligibility": "Key eligibility requirements",
  "benefits": "What is covered",
  "subjects": "Eligible fields of study",
  "host_university": "University or organization name",
  "host_country": "Country where studies take place",
  "official_url": "https://real-url.org",
  "visa_sponsored": true or false,
  "is_featured": false
}`,
          },
          {
            role: 'user',
            content: 'Generate 5 different real scholarships for African students. Mix different countries and types.',
          },
        ],
        temperature: 0.8,
        max_tokens: 3000,
      }),
    });

    const openaiData = await openaiRes.json();
    const content = openaiData.choices[0].message.content;

    let scholarships;
    try {
      scholarships = JSON.parse(content);
    } catch {
      const match = content.match(/\[[\s\S]*\]/);
      if (!match) throw new Error('Could not parse OpenAI response');
      scholarships = JSON.parse(match[0]);
    }

    if (!Array.isArray(scholarships)) throw new Error('Response is not an array');

    let added = 0, skipped = 0;
    for (const s of scholarships) {
      try {
        const existing = await db.execute({ sql: 'SELECT id FROM scholarships WHERE slug = ?', args: [s.slug] });
        if (existing.rows.length) { skipped++; continue; }
        await db.execute({
          sql: `INSERT INTO scholarships (title, slug, country, country_slug, type, degree_level, funding_type, amount, deadline, description, eligibility, benefits, subjects, host_university, host_country, official_url, visa_sponsored, is_featured, is_approved, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1)`,
          args: [s.title, s.slug, s.country, s.country_slug, s.type, s.degree_level, s.funding_type, s.amount, s.deadline, s.description, s.eligibility, s.benefits, s.subjects, s.host_university, s.host_country, s.official_url, s.visa_sponsored ? 1 : 0, 0],
        });
        added++;
      } catch (e) {
        skipped++;
      }
    }

    // Log the run
    try {
      await db.execute({
        sql: `INSERT OR IGNORE INTO settings (key, value) VALUES ('last_auto_run', ?)`,
        args: [new Date().toISOString()],
      });
      await db.execute({
        sql: `UPDATE settings SET value = ? WHERE key = 'last_auto_run'`,
        args: [new Date().toISOString()],
      });
    } catch {}

    res.status(200).json({ success: true, added, skipped });

  } catch (error) {
    console.error('Cron error:', error);
    res.status(500).json({ error: error.message });
  }
}
