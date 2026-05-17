// pages/api/admin/generate-post.js
import { requireAuth } from '../../../lib/auth';
import { getDb } from '../../../lib/db';

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

const HIGH_TRAFFIC_TOPICS = [
  'Top 10 fully funded scholarships for African students in 2025',
  'How to write a winning scholarship personal statement',
  'Chevening scholarship application tips and common mistakes',
  'How to get a student visa for the UK as an African student',
  'DAAD scholarship guide for African students',
  'How to write a statement of purpose for graduate school',
  'Fully funded Masters scholarships with no IELTS requirement',
  'How to get a recommendation letter for scholarships',
  'Study in Germany for free: complete guide for African students',
  'Commonwealth scholarship application guide',
  'How to study in Canada as an African student',
  'Best countries to study abroad for African students',
  'How to write a motivation letter for scholarships',
  'Student visa interview tips for African students',
  'Erasmus Mundus scholarship application guide',
];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const auth = requireAuth(req);
  if (!auth.success) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { topic, auto_publish } = req.body;
    const chosenTopic = topic || HIGH_TRAFFIC_TOPICS[Math.floor(Math.random() * HIGH_TRAFFIC_TOPICS.length)];

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
            content: `You are a scholarship content writer for ScholarPath Africa, a platform helping African students find scholarships. Write SEO-optimised, helpful blog posts targeting African students searching for study abroad opportunities. 

Return ONLY valid JSON with this structure:
{
  "title": "SEO-optimised article title",
  "slug": "url-friendly-slug",
  "excerpt": "2-sentence meta description under 160 characters",
  "category": "Tips|Scholarships|Visa|Destinations|Career|Application",
  "content": "Full article in markdown format"
}

Content guidelines:
- 700-1000 words
- Use ## for section headings
- Include practical, actionable tips
- Mention specific scholarships or programs where relevant
- Use bullet points with - for lists
- Write in a warm, encouraging tone for African students
- Include a strong intro and conclusion
- Naturally include keywords African students search for`,
          },
          {
            role: 'user',
            content: `Write a blog post about: "${chosenTopic}"`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const openaiData = await openaiRes.json();
    const content = openaiData.choices?.[0]?.message?.content;
    if (!content) throw new Error('No response from OpenAI');

    let post;
    try { post = JSON.parse(content); }
    catch {
      const match = content.match(/\{[\s\S]*\}/);
      if (!match) throw new Error('Could not parse response');
      post = JSON.parse(match[0]);
    }

    const db = getDb();
    let slug = post.slug || generateSlug(post.title);
    const existing = await db.execute({ sql: 'SELECT id FROM blog_posts WHERE slug = ?', args: [slug] });
    if (existing.rows.length) slug = `${slug}-${Date.now()}`;

    await db.execute({
      sql: `INSERT INTO blog_posts (title, slug, excerpt, content, category, author, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [post.title, slug, post.excerpt || '', post.content || '', post.category || 'Tips', 'ScholarPath Team', auto_publish ? 1 : 0],
    });

    // Update last post run timestamp
    await db.execute({ sql: `INSERT OR REPLACE INTO settings (key, value) VALUES ('last_post_run', ?)`, args: [new Date().toISOString()] }).catch(() => {});

    res.status(200).json({ success: true, title: post.title, slug, published: !!auto_publish });
  } catch (error) {
    console.error('Generate post error:', error);
    res.status(500).json({ error: error.message });
  }
}
