// pages/api/admin/generate-post.js
import { requireAuth } from '../../../lib/auth';
import { getDb } from '../../../lib/db';

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

// Weighted topic pools — more entries = higher chance of selection
const TOPIC_POOLS = {
  // Scholarship Guides (highest AdSense value)
  scholarship_guides: [
    'How to apply for the Chevening Scholarship as an African student',
    'DAAD Scholarship application guide for African students',
    'Commonwealth Scholarship: complete guide for African students',
    'Fulbright Scholarship application tips for African students',
    'Gates Cambridge Scholarship: how to apply and win',
    'Erasmus Mundus Scholarship: complete application guide',
    'MasterCard Foundation Scholars Program: how to apply',
    'Australia Awards Scholarship guide for African students',
    'Rhodes Scholarship application guide for Africans',
    'Swedish Institute Scholarship: how to apply',
    'Korean Government Scholarship (GKS) guide for Africans',
    'Japanese Government MEXT Scholarship application guide',
    'Chinese Government Scholarship guide for African students',
    'Orange Tulip Scholarship Netherlands guide',
    'Vanier Canada Graduate Scholarship guide',
    'Eiffel Excellence Scholarship France application guide',
    'VLIR-UOS Scholarship Belgium guide for African students',
    'World Bank Scholarship guide for developing countries',
    'AfDB Scholarship guide for African students',
    'Joint Japan World Bank Scholarship application guide',
  ],

  // Country Study Guides (high traffic)
  country_guides: [
    'How to study in Germany for free as an African student',
    'Complete guide to studying in the UK as an African student',
    'How to study in Canada as an African student',
    'Studying in the USA: complete guide for African students',
    'How to study in Australia as an African student',
    'Studying in the Netherlands: guide for African students',
    'How to study in France as an African student',
    'Studying in Sweden: complete guide for African students',
    'How to study in Norway as an African student',
    'Studying in South Korea: guide for African students',
    'How to study in Japan as an African student',
    'Studying in China: complete guide for African students',
    'How to study in Turkey as an African student',
    'Studying in Belgium as an African student',
    'Best European countries to study for African students',
    'Cheapest countries for African students to study abroad',
    'Top universities in the world accepting African students',
  ],

  // Visa Guides (very high search volume)
  visa_guides: [
    'How to get a UK Student visa as an African student: step-by-step guide',
    'US F-1 student visa guide for African students',
    'How to get a Canadian Study Permit as an African student',
    'Germany student visa application guide for Africans',
    'Australia student visa guide for African students',
    'Netherlands student visa guide for African students',
    'France student visa guide for African students',
    'Common reasons for student visa rejection and how to avoid them',
    'Student visa interview questions and answers for African students',
    'How to write a strong student visa cover letter',
    'Financial proof requirements for student visa applications',
    'How to open a blocked account for Germany student visa',
    'Student visa processing times by country: what to expect',
  ],

  // Application Tips (high engagement)
  application_tips: [
    'How to write a winning scholarship personal statement',
    'How to write a statement of purpose (SOP) for graduate school',
    'How to write a motivation letter for scholarships',
    'How to ask for a strong recommendation letter for scholarships',
    'How to build a scholarship CV that gets noticed',
    'How to prepare for a scholarship interview',
    'Common scholarship application mistakes to avoid',
    'How to write a research proposal for PhD scholarships',
    'How to choose the right referees for scholarship applications',
    'Tips for writing scholarship essays that stand out',
    'How to apply for multiple scholarships at once',
    'How to use LinkedIn to boost your scholarship chances',
    'How to write a scholarship rejection appeal letter',
    'What scholarship committees look for in applicants',
    'How to create a scholarship application tracker',
  ],

  // No IELTS / Special Categories (very high search volume)
  special_categories: [
    'Fully funded scholarships that do not require IELTS or TOEFL',
    'Scholarships for African students with low GPA',
    'Fully funded PhD scholarships for African students',
    'Undergraduate scholarships for African students',
    'Scholarships for African women in STEM',
    'Scholarships for African students in engineering',
    'Medical scholarships for African students',
    'Law scholarships for African students',
    'Business and MBA scholarships for African students',
    'Agriculture scholarships for African students',
    'Public health scholarships for African students',
    'Scholarships for African students in computer science',
    'Fully funded scholarships with no work experience required',
    'Scholarships for first-generation African college students',
    'Scholarships with the highest acceptance rates for Africans',
  ],

  // Country-specific scholarships (high intent traffic)
  country_specific: [
    'Best scholarships for Nigerian students studying abroad',
    'Top scholarships for Ghanaian students in 2024',
    'Scholarships available for Kenyan students abroad',
    'Best scholarships for Ethiopian students',
    'Scholarships for South African students to study abroad',
    'Top scholarships for Tanzanian students',
    'Scholarships for Ugandan students studying internationally',
    'Best scholarships for Rwandan students',
    'Scholarships for Cameroonian students abroad',
    'Top scholarships for Senegalese students',
    'Scholarships for Zimbabwean students',
    'Best scholarships for Egyptian students to study abroad',
    'Scholarships for Moroccan students internationally',
  ],

  // Internships & Fellowships (growing search volume)
  internships_fellowships: [
    'Best paid internships for African students at international organisations',
    'How to apply for UN internships as an African student',
    'World Bank internship guide for African students',
    'IMF internship application guide for African students',
    'African Development Bank internship guide',
    'WHO internship guide for African students',
    'How to get a fellowship as an African professional',
    'Hubert Humphrey Fellowship guide for African professionals',
    'Best research fellowships for African scientists',
    'International conference grants for African researchers',
    'How to apply for the Mandela Washington Fellowship',
    'YALI Fellowship guide for young African leaders',
  ],

  // After graduation / career (high value)
  career_after_study: [
    'Post-study work visa options for African graduates',
    'How to find a job in the UK after graduating as an African student',
    'Working in Germany after graduation: guide for African students',
    'Canadian permanent residency pathway for African graduates',
    'How to transition from student visa to work visa abroad',
    'Highest paying careers for African graduates abroad',
    'How to build a global career as an African professional',
    'Networking tips for African students studying abroad',
    'How to use your scholarship alumni network for career growth',
  ],
};

// Weight: scholarship_guides appears 3x, country_guides 2x, visa_guides 2x, others 1x
const WEIGHTED_POOLS = [
  ...TOPIC_POOLS.scholarship_guides,
  ...TOPIC_POOLS.scholarship_guides,
  ...TOPIC_POOLS.scholarship_guides,
  ...TOPIC_POOLS.country_guides,
  ...TOPIC_POOLS.country_guides,
  ...TOPIC_POOLS.visa_guides,
  ...TOPIC_POOLS.visa_guides,
  ...TOPIC_POOLS.application_tips,
  ...TOPIC_POOLS.special_categories,
  ...TOPIC_POOLS.country_specific,
  ...TOPIC_POOLS.internships_fellowships,
  ...TOPIC_POOLS.career_after_study,
];

function getRandomTopic() {
  return WEIGHTED_POOLS[Math.floor(Math.random() * WEIGHTED_POOLS.length)];
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const auth = requireAuth(req);
  if (!auth.success) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { topic, auto_publish } = req.body;
    const chosenTopic = topic || getRandomTopic();

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
            content: `You are a senior scholarship content writer for ScholarPath Africa, Africa's leading scholarship discovery platform. Write deeply researched, SEO-optimised, long-form blog posts targeting African students searching for study abroad opportunities.

Your articles must:
- Be 900-1200 words minimum
- Target high-value keywords naturally throughout
- Use ## for main sections, ### for subsections
- Include specific scholarship names, universities, deadlines where relevant
- Be written in warm, encouraging, authoritative tone
- Include practical actionable steps
- Have a strong intro that hooks readers immediately
- End with a clear call to action linking to scholarships

Return ONLY valid JSON with no markdown backticks:
{
  "title": "SEO-optimised H1 title (60-70 characters ideal)",
  "slug": "url-friendly-slug-with-keywords",
  "excerpt": "Compelling meta description 150-160 characters with primary keyword",
  "category": "Scholarships|Visa|Destinations|Tips|Application|Career",
  "keywords": "comma-separated list of 8-10 target keywords",
  "content": "Full markdown article content"
}`,
          },
          {
            role: 'user',
            content: `Write a comprehensive, SEO-optimised blog post about: "${chosenTopic}"
            
This is for African students. Make it detailed, specific, and genuinely helpful. Include real scholarship names, real universities, real processes where applicable.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });

    const openaiData = await openaiRes.json();
    const content = openaiData.choices?.[0]?.message?.content;
    if (!content) throw new Error('No response from OpenAI');

    let post;
    try { post = JSON.parse(content); }
    catch {
      const match = content.match(/\{[\s\S]*\}/);
      if (!match) throw new Error('Could not parse response as JSON');
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

    // Update last run timestamp
    await db.execute({
      sql: `INSERT OR REPLACE INTO settings (key, value) VALUES ('last_post_run', ?)`,
      args: [new Date().toISOString()],
    }).catch(() => {});

    res.status(200).json({
      success: true,
      title: post.title,
      slug,
      topic: chosenTopic,
      category: post.category,
      published: !!auto_publish,
    });

  } catch (error) {
    console.error('Generate post error:', error);
    res.status(500).json({ error: error.message });
  }
}
