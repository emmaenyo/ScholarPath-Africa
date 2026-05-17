import { requireAuth } from '../../../lib/auth';
import { getDb } from '../../../lib/db';

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const values = [];
    let inQuotes = false, current = '';
    for (const char of line) {
      if (char === '"') { inQuotes = !inQuotes; }
      else if (char === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
      else { current += char; }
    }
    values.push(current.trim());
    return headers.reduce((obj, h, i) => ({ ...obj, [h]: values[i] || '' }), {});
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const auth = requireAuth(req);
  if (!auth.success) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { csvData } = req.body;
    if (!csvData) return res.status(400).json({ error: 'No CSV data provided' });

    const rows = parseCSV(csvData);
    if (!rows.length) return res.status(400).json({ error: 'No valid rows found' });

    const db = getDb();
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO scholarships (
        title, slug, country, country_slug, type, degree_level, funding_type,
        amount, deadline, description, eligibility, benefits, subjects,
        host_university, host_country, official_url, visa_sponsored, is_featured, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let imported = 0, skipped = 0;
    const insertMany = db.transaction((rows) => {
      for (const row of rows) {
        if (!row.title || !row.country) { skipped++; continue; }
        const slug = generateSlug(row.title);
        try {
          const r = stmt.run(
            row.title, slug, row.country, generateSlug(row.country),
            row.type || 'scholarship', row.degree_level || '',
            row.funding_type || 'full', row.amount || '', row.deadline || '',
            row.description || '', row.eligibility || '', row.benefits || '',
            row.subjects || '', row.host_university || '',
            row.host_country || row.country, row.official_url || '',
            row.visa_sponsored === 'true' ? 1 : 0,
            row.is_featured === 'true' ? 1 : 0, 1
          );
          if (r.changes) imported++; else skipped++;
        } catch { skipped++; }
      }
    });

    insertMany(rows);
    res.status(200).json({ success: true, imported, skipped, total: rows.length });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ error: 'Import failed: ' + error.message });
  }
}
