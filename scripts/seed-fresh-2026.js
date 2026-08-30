// scripts/seed-fresh-2026.js
// Fresh real opportunities for 2026-2027 — researched and verified
const { createClient } = require('@libsql/client');

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

function slug(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

const opportunities = [

  // ── SCHOLARSHIPS ──
  ['Chevening Scholarship 2027 for African Students', 'united-kingdom', 'united-kingdom', 'scholarship', 'Masters', 'full',
   '£1,378/month outside London, £1,690/month in London', 'October 6, 2026',
   'The UK Government\'s flagship international scholarship programme is now open for 2027. Applications opened August 4, 2026 and close October 6, 2026. Chevening offers fully funded one-year Master\'s degrees at any UK university to outstanding emerging leaders from Africa and worldwide.',
   'Minimum 2 years work experience (2,800 hours). Bachelor\'s degree. Citizen of Chevening-eligible country. Commitment to return home after scholarship.',
   'Full tuition fees, monthly living allowance (£1,378 outside London), return economy flights, visa fees, arrival allowance',
   'All disciplines', 'Any UK University', 'United Kingdom', 'https://chevening.org/apply', 1, 1],

  ['Ireland Fellows Programme 2027/28 for African Students', 'ireland', 'ireland', 'scholarship', 'Masters', 'full',
   'Full funding', 'July 26, 2026',
   'The Government of Ireland has opened applications for the Ireland Fellows Programme 2027/28 — a prestigious fully funded scholarship for students from Africa, Asia, Latin America and Palestine to pursue a Master\'s degree in Ireland. Applications opened June 29, 2026.',
   'Not already hold a Master\'s degree. Applying to commence a new master\'s in Ireland in 2027. Leadership abilities and SDG commitment. Selected African countries eligible.',
   'Full tuition, living stipend, accommodation, return flights, health insurance',
   'All disciplines', 'Irish Universities', 'Ireland', 'https://hea.ie/funding-governance-performance/funding/student-finance/ireland-fellows-programme/', 1, 1],

  ['World Bank Group Africa Fellowship Program 2027', 'united-states', 'united-states', 'fellowship', 'PhD', 'full',
   'Consultant fees + round-trip airfare', 'August 25, 2026',
   'The World Bank Group Africa Fellowship Program 2027 is now open. This six-month fellowship targets young Sub-Saharan African PhD candidates and recent PhD graduates. Fellows work at WBG offices in Washington D.C. or country offices on real development projects. Deadline: August 25, 2026.',
   'Sub-Saharan Africa national. Under 32 years old. Final year PhD student or PhD completed within last 3 years. Strong English and quantitative skills. Women especially encouraged.',
   'Consultant fees for 6 months, round-trip economy airfare, hands-on WBG experience, professional networking',
   'Economics, Development, Finance, Health, Climate, Agriculture', 'World Bank Group', 'United States', 'https://worldbank.org/en/region/afr/brief/world-bank-group-africa-fellowship-program', 1, 1],

  ['WBG Pioneers Internship Program 2026 (Paid)', 'united-states', 'united-states', 'internship', 'Masters', 'paid',
   'Competitive salary', 'August 12, 2026',
   'The World Bank Group Pioneers Program 2026 is the WBG\'s flagship paid internship for students. Applications are open now and close August 12, 2026. Participants work alongside leading development experts on global projects across technical and corporate functions.',
   'Citizen of WBG member country. Fluent English. 0-6 years professional experience. Current PhD student or Master\'s student. Apply for up to 3 positions only.',
   'Competitive paid internship, professional mentorship, exposure to WBG operations, global networking',
   'Economics, Finance, Development, Technology, Communications, HR', 'World Bank Group', 'United States', 'https://worldbank.org/en/about/careers/programs-and-internships/internship', 1, 1],

  ['WHO Global Internship Programme 2026', 'various', 'various', 'internship', 'Non-degree', 'paid',
   'Monthly stipend (CHF 250/week)', 'Rolling applications',
   'The World Health Organization 2026 Internship Programme is now open for applications. WHO offers internships at headquarters in Geneva and regional offices worldwide including AFRO in Brazzaville. Students and recent graduates in health, communications, and administration can apply.',
   'Enrolled in university or graduated within 12 months. Interest in global health. Proficiency in at least one WHO language (English, French, Spanish, Arabic, Chinese, Russian).',
   'Weekly stipend, international public health experience, WHO professional network, Geneva or regional offices',
   'Public Health, Medicine, Communications, Administration, Social Sciences', 'World Health Organization', 'Various', 'https://who.int/careers/internships', 0, 1],

  ['African Union Enterprise Africa Network Fellowship 2026/2027', 'ethiopia', 'ethiopia', 'fellowship', 'Non-degree', 'full',
   'Full funding', 'September 30, 2026',
   'Applications are open for the 2026/2027 African Union Enterprise Africa Network (EAN) Fellowship Programme. This initiative supports young African professionals to drive enterprise development across the continent. Deadline: September 30, 2026.',
   'African citizen. Young professional with entrepreneurship or business background. Commitment to African development.',
   'Full fellowship funding, AU capacity building, continental networking, mentorship',
   'Entrepreneurship, Business, Enterprise Development', 'African Union Commission', 'Ethiopia', 'https://au.int/en/ean-fellowship', 0, 1],

  ['AAUW International Fellowship 2026/2027 for African Women', 'united-states', 'united-states', 'fellowship', 'Masters', 'full',
   '$20,000 - $50,000', 'September 17, 2026',
   'AAUW International Fellowships 2026/2027 are now open. The programme promotes education and equity for women internationally. African women pursuing full-time graduate or postdoctoral study in the US are eligible. Deadline: September 17, 2026.',
   'Woman. Not a US citizen or permanent resident. Enrolled or applying to accredited US university. Full-time study. Commitment to women\'s rights.',
   '$20,000 for Master\'s/first professional degrees, $25,000 for doctoral, $50,000 for postdoctoral',
   'All disciplines', 'US Universities', 'United States', 'https://aauw.org/resources/programs/fellowships-grants/current-opportunities/international', 1, 1],

  ['AfCFTA Secretariat Internship Programme 2026', 'ghana', 'ghana', 'internship', 'Bachelors', 'paid',
   'Monthly stipend', 'Rolling applications',
   'The African Continental Free Trade Area Secretariat in Accra, Ghana offers internship opportunities for young Africans. The programme covers interpretation, translation, legal, economics and communications. Minimum 3-month commitment required.',
   'African citizen. Final year student in accredited university. Full availability for minimum 3 months. Proficiency in AU official language (English, French, Arabic, Portuguese, Kiswahili, Spanish).',
   'Monthly stipend, AfCFTA headquarters experience, continental trade exposure, professional networking',
   'Law, Economics, Trade, Interpretation, Communications', 'AfCFTA Secretariat', 'Ghana', 'https://au-afcfta.org/careers', 0, 1],

  ['iLead Fellowship 2026 for Young African Leaders', 'various', 'various', 'fellowship', 'Non-degree', 'full',
   'Full funding', 'August 31, 2026',
   'Applications are open for the 2026 iLead Fellowship Program. This five-month leadership fellowship is designed for young leaders aged 18 to 25 committed to personal and community development across Africa. Deadline: August 31, 2026.',
   'African youth. Age 18-25. Demonstrated leadership experience. Commitment to community development.',
   'Full fellowship funding, leadership training, mentorship, peer network across Africa',
   'Leadership, Community Development, Social Innovation', 'iLead Foundation', 'Various', 'https://ileadfellowship.org', 0, 0],

  ['Africa Fact-Checking Fellowship Cameroon 2026', 'cameroon', 'cameroon', 'fellowship', 'Non-degree', 'full',
   'Full funding', 'August 22, 2026',
   'Applications are open for the Africa Fact-Checking Fellowship in Cameroon for journalists and media professionals. The programme supports fact-checking skills and media integrity across Africa. Deadline: August 22, 2026 (23:59 WAT).',
   'Journalist or media professional from eligible African country. Strong interest in fact-checking and media integrity. French or English proficiency.',
   'Training, stipend, mentorship, fact-checking tools, professional network',
   'Journalism, Media, Communications', 'Africa Check', 'Cameroon', 'https://africacheck.org/fellowships', 0, 0],

  ['McCall MacBain Scholarships at McGill 2027', 'canada', 'canada', 'scholarship', 'Masters', 'full',
   'Full funding (tuition + $25,000 CAD/year)', 'September 2026',
   'The McCall MacBain Scholarships at McGill University are Canada\'s first comprehensive merit scholarship. Open to exceptional students from any country including African students for Master\'s or professional programmes at McGill. Applications open September 2026.',
   'Exceptional academic record. Demonstrated leadership. Strong character and commitment to positive impact. Applying to eligible McGill programme.',
   'Full tuition, $25,000 CAD annual stipend, mentorship, leadership programming, global network',
   'All disciplines at McGill University', 'McGill University', 'Canada', 'https://mccallmacbainscholars.org', 1, 1],

  ['Rhodes Scholarships West Africa 2027', 'united-kingdom', 'united-kingdom', 'scholarship', 'Masters', 'full',
   'Full funding', 'August 2026',
   'The Rhodes Scholarships for West Africa 2027 are open. One of the world\'s oldest and most prestigious scholarships, Rhodes enables outstanding West African students to study at the University of Oxford. Applications for the 2027 intake open in August 2026.',
   'West African citizen (Ghana, Nigeria, Sierra Leone, Liberia etc). Age 19-25. Exceptional academic record. Leadership potential. Commitment to service.',
   'Full Oxford tuition, living stipend, return flights, health insurance, Rhodes community',
   'All disciplines at Oxford', 'University of Oxford', 'United Kingdom', 'https://rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/rhodes-scholarships-africa', 1, 1],

  ['Rhodes Scholarships Kenya 2027', 'united-kingdom', 'united-kingdom', 'scholarship', 'Masters', 'full',
   'Full funding', 'August 2026',
   'Rhodes Scholarships for Kenya 2027 are now accepting applications. This world-renowned scholarship enables outstanding Kenyan students to pursue graduate study at the University of Oxford fully funded. Applications open August 2026.',
   'Kenyan citizen. Age 19-25. Exceptional academic record. Demonstrated leadership and commitment to others.',
   'Full tuition at Oxford, living stipend, flights, health insurance',
   'All disciplines at Oxford', 'University of Oxford', 'United Kingdom', 'https://rhodeshouse.ox.ac.uk/scholarships', 1, 1],

  ['Imperial College London President\'s PhD Scholarships 2027', 'united-kingdom', 'united-kingdom', 'scholarship', 'PhD', 'full',
   'Full tuition fees for 3.5 years + £22,000/year stipend', 'December 2026',
   'Imperial College London offers President\'s PhD Scholarships for outstanding international students including Africans. The scholarship covers full tuition for 3.5 years plus a generous annual stipend. Applications for 2027 entry open soon.',
   'Exceptional academic record. Applying to PhD at Imperial College London. Strong research proposal.',
   'Full tuition fees for 3.5 years, £22,000 annual living stipend, research support',
   'STEM, Medicine, Business, Humanities', 'Imperial College London', 'United Kingdom', 'https://imperial.ac.uk/study/pg/fees-and-funding/scholarships/presidents-phd-scholarships', 0, 1],

  ['University of Canberra Research Scholarship 2027 for Africans', 'australia', 'australia', 'scholarship', 'PhD', 'full',
   'Full tuition + AUD $32,500/year stipend', 'December 2026',
   'The University of Canberra offers Research Scholarships for international students including Africans for PhD study in Australia. These scholarships cover full tuition and provide a generous living stipend.',
   'Strong academic record. Research proposal in area matching UC expertise. English proficiency (IELTS 6.5+).',
   'Full tuition waiver, AUD $32,500 annual stipend, research support, thesis allowance',
   'Health Sciences, Education, Business, STEM, Arts', 'University of Canberra', 'Australia', 'https://canberra.edu.au/research/degrees/scholarships', 0, 1],

  ['MTN Global Graduate Development Programme 2027', 'various', 'various', 'internship', 'Bachelors', 'paid',
   'Monthly salary + job placement', 'Rolling applications',
   'The MTN Global Graduate Development Programme 2027 is open for applications. This prestigious programme offers recent graduates a structured career development experience across MTN\'s operations in Africa and Middle East with a monthly salary and potential permanent placement.',
   'Recent university graduate (within 2 years). African or Middle East nationality. STEM or Business degree preferred. Strong academic performance.',
   'Monthly salary, structured training, mentorship, permanent job placement opportunity',
   'Technology, Engineering, Business, Finance, Marketing', 'MTN Group', 'Various', 'https://mtn.com/careers/graduate-programme', 0, 1],

  ['Ashinaga Africa Initiative Scholarship 2027 for Francophone Africa', 'japan', 'japan', 'scholarship', 'Bachelors', 'full',
   'Full funding', 'Rolling applications',
   'The Ashinaga Africa Initiative Scholarship 2027 is now open for Francophone African students. This fully funded programme supports orphaned or socially vulnerable African students to study at top universities worldwide with a focus on those from French-speaking African countries.',
   'From eligible Francophone African country. Orphaned or from vulnerable background. Academic excellence. Strong leadership potential.',
   'Full tuition, accommodation, living allowance, flights, mentorship programme',
   'All disciplines', 'International Universities', 'Japan', 'https://en.ashinaga.org/what-we-do/africa-initiative', 1, 1],

  ['Portugal Government Scholarship for African Students 2026', 'portugal', 'portugal', 'scholarship', 'Masters', 'partial',
   'Tuition support + accommodation', 'September 30, 2026',
   'The Government of Portugal has opened applications for scholarships for international students including Africans enrolled in Portuguese higher education institutions. The scholarship covers tuition and may include accommodation support. Deadline: September 30, 2026.',
   'Enrolled in approved Portuguese higher education institution. PALOP country citizens have priority. Academic merit.',
   'Tuition fee coverage, possible accommodation support, other benefits per programme',
   'All disciplines', 'Portuguese Universities', 'Portugal', 'https://dges.gov.pt/en/pagina/scholarships', 0, 0],

  ['ARES Scholarships 2027-28 Belgium for African Students', 'belgium', 'belgium', 'scholarship', 'Masters', 'full',
   'Full funding', 'February 2027',
   'ARES (Académie de Recherche et d\'Enseignement Supérieur) offers fully funded scholarships for students from developing countries including Africa to pursue Master\'s degrees in Belgium. Applications for 2027-28 will open early 2027.',
   'Citizen of eligible developing country. Bachelor\'s degree. Strong academic record. Development-relevant field of study.',
   'Full tuition, monthly stipend, accommodation, travel, health insurance',
   'Development-related disciplines', 'Belgian Universities', 'Belgium', 'https://ares-ac.be/en/cooperation-au-developpement/scholarships', 0, 1],

  ['IDP IELTS Future Award 2026 — $5,000 for African Students', 'various', 'various', 'scholarship', 'Bachelors', 'partial',
   '$5,000 USD', 'Rolling applications',
   'IDP IELTS Future Award 2026 offers $5,000 to outstanding students from developing countries including Africa who plan to study abroad. Applications are now open. The award supports students who have taken IELTS and plan to pursue international education.',
   'Taken IELTS exam. Planning international study. From eligible developing country. Strong academic profile.',
   '$5,000 USD award towards international study costs',
   'All disciplines', 'International Universities', 'Various', 'https://ielts.idp.com/future-award', 0, 0],

  ['University of Southern Queensland PhD Scholarship 2027 for Africans', 'australia', 'australia', 'scholarship', 'PhD', 'full',
   'Full tuition + AUD $30,000/year', 'Rolling applications',
   'The University of Southern Queensland offers PhD scholarships for international students including Africans. Full tuition waiver plus a living allowance for the duration of the PhD programme.',
   'Strong academic record (First Class Honours or equivalent). English proficiency. Strong research proposal aligned with USQ research priorities.',
   'Full tuition waiver, AUD $30,000 annual stipend, research support',
   'Engineering, Health, Agriculture, Education, Business, STEM', 'University of Southern Queensland', 'Australia', 'https://usq.edu.au/research/degrees/scholarships', 0, 0],

  ['Kaohsiung Medical University Fully Funded Scholarship 2026', 'taiwan', 'taiwan', 'scholarship', 'Masters', 'full',
   'Full tuition + monthly stipend', 'Rolling applications',
   'Kaohsiung Medical University in Taiwan offers fully funded scholarships for international students including Africans for medical and health sciences programmes. Read application guidelines carefully for language requirements.',
   'Accepted at KMU for eligible programme. Language proficiency as per programme requirements. Strong academic record.',
   'Full tuition, monthly living stipend, accommodation support',
   'Medicine, Health Sciences, Pharmacy, Nursing, Public Health', 'Kaohsiung Medical University', 'Taiwan', 'https://oia.kmu.edu.tw/en/scholarships', 0, 0],

  ['Transfyr AI Fellowship 2026/2027 for African Tech Leaders', 'united-states', 'united-states', 'fellowship', 'Non-degree', 'full',
   '$125,000 + benefits + computing resources', 'Rolling applications',
   'The Transfyr AI Fellowship supports exceptional AI researchers and practitioners including Africans to advance artificial intelligence research and application. Fellows receive generous compensation and access to cutting-edge computing resources.',
   'Exceptional track record in AI/ML. Strong research or applied AI experience. Demonstrated leadership in technology.',
   '$125,000 stipend, benefits package, high-performance computing resources, research support',
   'Artificial Intelligence, Machine Learning, Data Science', 'Transfyr AI', 'United States', 'https://transfyr.ai/fellowship', 0, 0],

  ['Knight-Hennessy Scholars Program Stanford 2027', 'united-states', 'united-states', 'scholarship', 'Masters', 'full',
   'Full funding (world\'s largest fully funded scholarship)', 'October 2026',
   'The Knight-Hennessy Scholars Program at Stanford University is the world\'s largest fully funded graduate scholarship, supporting up to 100 high-achieving students annually including Africans. Applications for 2027 open October 2026.',
   'Exceptional academic record. Demonstrated leadership. Commitment to positive global impact. Applying to any Stanford graduate programme.',
   'Full tuition, living stipend, travel, leadership programming, Stanford community',
   'All graduate disciplines at Stanford', 'Stanford University', 'United States', 'https://knight-hennessy.stanford.edu', 1, 1],

  ['Gupta-Klinsky India RISE Fellowship 2026 for Africans', 'india', 'india', 'fellowship', 'Non-degree', 'full',
   'Full funding', 'Rolling applications',
   'The Gupta-Klinsky India Institute at Johns Hopkins University offers the India RISE Fellowship 2026 for professionals interested in India-Africa relations, development, and policy. Applications are now open.',
   'Professional with interest in India-Africa relations. Strong academic or professional background. English proficiency.',
   'Full fellowship funding, Johns Hopkins affiliation, India-Africa policy network, research support',
   'International Relations, Policy, Development, Economics', 'Johns Hopkins University', 'India', 'https://sais.jhu.edu/india/rise-fellowship', 0, 0],

  ['Open Doors Scholarship 2026 for African Students — Russia', 'russia', 'russia', 'scholarship', 'Masters', 'full',
   'Full funding', 'August 20, 2026',
   'Applications for The Open Doors Scholarship open on August 20, 2026. This scholarship is for Bachelor\'s, Master\'s, Doctoral and Post-doc candidates from Africa and worldwide to study in Russia at top universities.',
   'Bachelor\'s or higher degree. Strong academic record. Applications open August 20, 2026.',
   'Full tuition, accommodation, living allowance, Russian language support',
   'All disciplines', 'Top Russian Universities', 'Russia', 'https://od.globaluni.ru/en', 0, 0],

];

async function seedFresh() {
  console.log(`🔍 Adding ${opportunities.length} fresh 2026-2027 opportunities...\n`);

  let added = 0, skipped = 0;

  for (const [title, country, country_slug, type, degree_level, funding_type, amount, deadline, description, eligibility, benefits, subjects, host_university, host_country, official_url, visa_sponsored, is_featured] of opportunities) {
    const s = slug(title);
    try {
      const existing = await db.execute({ sql: 'SELECT id FROM scholarships WHERE slug = ?', args: [s] });
      if (existing.rows.length) { skipped++; console.log(`⏭  Skipped (exists): ${title}`); continue; }
      await db.execute({
        sql: `INSERT INTO scholarships (title, slug, country, country_slug, type, degree_level, funding_type, amount, deadline, description, eligibility, benefits, subjects, host_university, host_country, official_url, visa_sponsored, is_featured, is_approved, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1)`,
        args: [title, s, country, country_slug, type, degree_level, funding_type, amount, deadline, description, eligibility, benefits, subjects, host_university, host_country, official_url, visa_sponsored ? 1 : 0, is_featured ? 1 : 0],
      });
      added++;
      console.log(`✓ ${title}`);
    } catch (e) {
      console.error(`✗ ${title}: ${e.message}`);
      skipped++;
    }
  }

  console.log(`\n✅ Done! Added: ${added}, Skipped: ${skipped}`);
  process.exit(0);
}

seedFresh().catch(err => { console.error(err); process.exit(1); });
