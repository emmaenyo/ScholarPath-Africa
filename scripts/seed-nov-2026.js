// scripts/seed-nov-2026.js
// Opportunities open as of 3 Nov 2026 — each checked against the official page.
//   node scripts\seed-nov-2026.js            (dry run: prints what it would do)
//   node scripts\seed-nov-2026.js --apply    (writes to the database)
const { createClient } = require('@libsql/client');

const db = createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN });
const APPLY = process.argv.includes('--apply');

function slug(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

// [title, country, country_slug, type, degree_level, funding_type, amount, deadline, description,
//  eligibility, benefits, subjects, host_university, host_country, official_url, visa_sponsored, is_featured]
const opportunities = [

  ['Wageningen University Africa Scholarship Programme 2027', 'netherlands', 'netherlands', 'scholarship', 'Masters', 'full',
   'Tuition, living allowance, travel, visa and insurance for 24 months', 'December 1, 2026',
   'Wageningen University offers the Africa Scholarship Programme (ASP) to African students starting a full-time on-campus MSc in September 2027. To be considered you apply for admission to an eligible MSc programme; the scholarship is decided from that application. Recipients are selected by lottery from the eligible candidates, with offers made in April 2027.',
   'Citizen of an African country. First Class Honours degree or a GPA of 80% or higher. Students who do not yet hold a master\'s degree are preferred. A complete MSc application, including English test results and your bachelor\'s diploma, must be submitted before the deadline.',
   'Tuition coverage and a living allowance for 24 months, return travel to the Netherlands, and visa and health insurance costs',
   'Food, agriculture, environment, life sciences, social sciences', 'Wageningen University & Research', 'Netherlands',
   'https://www.wur.nl/en/Education-Programmes/master/practical-information-masters/Scholarships-for-international-masters-students/Africa-Scholarship-Programme.htm', 1, 1],

  ['Erasmus Mundus Joint Master in Public Policy (Mundus MAPP) Scholarship 2027-2029', 'various', 'various', 'scholarship', 'Masters', 'full',
   '€1,400 per month, up to €33,600 over 24 months, plus tuition waiver', 'December 1, 2026',
   'Mundus MAPP is a two-year Erasmus Mundus Joint Master\'s in public policy delivered by a consortium of European universities. Applicants who want to be considered for financial aid must apply by December 1, 2026, 23:59 CET; self-funded applicants from outside the EU/EEA have until April 15, 2027. Only a limited number of scholarships are awarded, to the highest-ranked applicants on academic merit.',
   'Strong academic record and a bachelor\'s degree. Open to outstanding applicants from inside and outside the EU. Past Erasmus Mundus Joint Master scholarship holders are not eligible, and you cannot hold another EU-funded scholarship for the same course.',
   'Full tuition waiver, monthly allowance of €1,400 for 24 months, health insurance arranged by the consortium. Study visits and travel between home and consortium countries are not covered.',
   'Public policy, governance, political science, economics', 'Mundus MAPP consortium', 'Europe',
   'https://www.mundusmapp.org/how-to-apply/', 1, 1],

  ['Hong Kong PhD Fellowship Scheme 2027/28', 'hong-kong', 'hong-kong', 'scholarship', 'PhD', 'full',
   'HK$344,400 per year plus HK$14,400 annual conference grant', 'December 1, 2026',
   'The Research Grants Council of Hong Kong awards the Hong Kong PhD Fellowship Scheme to top PhD applicants from around the world, for study at Hong Kong universities starting in September 2027. It is a two-step process: register with the RGC to obtain an HKPFS reference number (window closes December 1, 2026, 12:00 noon Hong Kong time), then submit the full application to your chosen university by the same date.',
   'Excellent academic record and research potential. Applicants of any nationality may apply, and each university sets its own entry requirements. Check the specific university\'s PhD admission page.',
   'Annual stipend of HK$344,400 and a conference and research travel grant of HK$14,400 a year, for the full normal study period',
   'All research disciplines', 'Hong Kong universities (for example PolyU)', 'Hong Kong',
   'https://cerg1.ugc.edu.hk/hkpfs/index.html', 0, 1],

  ['Leiden University Excellence Scholarship (LExS) 2027', 'netherlands', 'netherlands', 'scholarship', 'Masters', 'partial',
   '€10,000 to €19,000 towards tuition', 'December 1, 2026',
   'The Leiden University Excellence Scholarship supports outstanding non-EEA students who start a full-time master\'s programme at Leiden in September 2027. It is a partial scholarship, so you will still pay a significant share of your costs. You apply inside your Leiden admission application and upload a motivation letter of up to 500 words.',
   'Non-EEA/non-EFTA passport. Not eligible for Dutch government student finance. Excellent results, as a guide among the top 10% of graduates in your programme. Not open for Leiden Law School LLM and MSc programmes, or for programmes starting in February.',
   'A contribution of €10,000, €15,000, €17,500, €18,500 or €19,000 to your tuition fee. The amount is set by the committee and is not negotiable.',
   'All Leiden master\'s programmes that qualify', 'Leiden University', 'Netherlands',
   'https://www.student.universiteitleiden.nl/en/scholarships/sea/leiden-university-excellence-scholarship-lexs', 0, 0],

  ['UBC International Scholars Program 2027 (Undergraduate)', 'canada', 'canada', 'scholarship', 'Bachelors', 'partial',
   'Need-based; amount depends on your demonstrated financial need', 'November 15, 2026',
   'The International Scholars Program at the University of British Columbia supports high-achieving international students with significant financial need who are starting their first undergraduate degree in September 2027. You apply to UBC first, then complete the award application, which needs a nominator and a teacher referee from your school and four short essays.',
   'International student who will study in Canada on a study permit. Entering directly from secondary school. First undergraduate degree. Significant financial need and no access to external funding. Superior academic achievement and meeting UBC\'s admission and English requirements. Some degree programmes are excluded.',
   'Need-based financial support, plus workshops, retreats and advising as part of the Scholars community',
   'All eligible undergraduate programmes', 'University of British Columbia', 'Canada',
   'https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/', 1, 1],

  ['Jim Leech Mastercard Foundation Fellowship on Entrepreneurship 2027', 'canada', 'canada', 'fellowship', 'Non-degree', 'free',
   'Free 8-month online programme; stipend and seed funding for selected fellows', 'December 1, 2026',
   'Queen\'s University runs this fully virtual, eight-month fellowship for African students and recent graduates who want to start or grow a scalable business. The programme runs January to August in four phases: Explore, Ignite, Launch and Fellowship, and Graduation. You can complete the work at your own pace while meeting assignment deadlines.',
   'Student or recent graduate from any post-secondary institution in Africa, from any discipline. Able to dedicate at least 10 hours a week. Content is in English, with some mentorship available in French.',
   'Business bootcamp and pitch coaching, live workshops, Queen\'s micro-credentials, mentors and a personal coach, seed funding access in the summer phase, a stipend for up to 60 fellows, and pitch prizes of up to CAD 15,000',
   'Entrepreneurship, business, innovation', 'Queen\'s University', 'Canada',
   'https://www.queensu.ca/innovationcentre/programs/jim-leech-mastercard-foundation-fellowship-entrepreneurship', 0, 1],

  ['African Union Commission Internship Programme (Unpaid)', 'ethiopia', 'ethiopia', 'internship', 'Non-degree', 'free',
   'Unpaid: no stipend, travel or per diem is provided', 'Rolling applications',
   'The African Union Commission accepts interns across its departments, mostly at headquarters in Addis Ababa. Internships last a minimum of three months and can be extended by another three. Applications are made on the AU Careers portal. Note that the AU states it does not provide financial support or cover living costs for interns, so plan your budget before applying.',
   'National of an AU member state. Aged 22 to 32 at the time of application. Final-year undergraduate, postgraduate student or graduate of a recognised institution. Fluent in at least one AU working language (Arabic, English, French, Portuguese or Kiswahili).',
   'Experience inside a continental institution, mentoring, a professional network and a certificate on completion. No allowance is paid.',
   'Political affairs, law, economics, communication, IT, human resources, procurement and other fields', 'African Union Commission', 'Ethiopia',
   'https://au.int/en/internships', 0, 0],

];

(async () => {
  console.log(`${APPLY ? 'WRITING' : 'DRY RUN'}: ${opportunities.length} opportunities\n`);
  let added = 0, skipped = 0;

  for (const [title, country, country_slug, type, degree_level, funding_type, amount, deadline, description, eligibility, benefits, subjects, host_university, host_country, official_url, visa_sponsored, is_featured] of opportunities) {
    const s = slug(title);
    try {
      const existing = await db.execute({ sql: 'SELECT id FROM scholarships WHERE slug = ?', args: [s] });
      if (existing.rows.length) { skipped++; console.log(`skip (exists): ${title}`); continue; }
      if (APPLY) {
        await db.execute({
          sql: `INSERT INTO scholarships (title, slug, country, country_slug, type, degree_level, funding_type, amount, deadline, description, eligibility, benefits, subjects, host_university, host_country, official_url, visa_sponsored, is_featured, is_approved, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1)`,
          args: [title, s, country, country_slug, type, degree_level, funding_type, amount, deadline, description, eligibility, benefits, subjects, host_university, host_country, official_url, visa_sponsored ? 1 : 0, is_featured ? 1 : 0],
        });
      }
      added++;
      console.log(`${APPLY ? 'added' : 'would add'}: ${title}  (deadline ${deadline})`);
    } catch (e) {
      console.error(`ERROR ${title}: ${e.message}`);
    }
  }

  // Un-feature items whose deadline has already passed so the homepage stops showing closed opportunities
  const feat = await db.execute({ sql: 'SELECT id, title, deadline FROM scholarships WHERE is_featured = 1 AND is_active = 1', args: [] });
  const today = new Date();
  const expired = feat.rows.filter(r => {
    const t = String(r.deadline || '');
    const d = new Date(t);
    return /\d{4}/.test(t) && !isNaN(d) && d < today;
  });
  console.log(`\nFeatured items with a passed deadline: ${expired.length}`);
  for (const r of expired) {
    console.log(`  ${APPLY ? 'un-featuring' : 'would un-feature'}: ${r.title} (${r.deadline})`);
    if (APPLY) await db.execute({ sql: 'UPDATE scholarships SET is_featured = 0 WHERE id = ?', args: [r.id] });
  }

  console.log(`\n${APPLY ? 'Done.' : 'Dry run only. Add --apply to write.'}  New: ${added}  Skipped: ${skipped}`);
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
