// scripts/seed.js
const Database = require('better-sqlite3')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const DB_PATH = process.env.DATABASE_PATH || './scholarpath.db'
const db = new Database(path.resolve(DB_PATH))

db.pragma('journal_mode = WAL')

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

console.log('🌱 Seeding ScholarPath Africa database...')

// Countries
const countries = [
  { name: 'Canada', code: 'CA', slug: 'canada', continent: 'North America', language: 'English/French', flag_emoji: '🇨🇦', is_featured: 1, study_cost: '$15,000–$35,000/year', visa_info: 'Study permit required. Processing takes 4–8 weeks.', description: 'Canada offers world-class education with a clear pathway to permanent residence. Top universities include UofT, UBC, McGill and Waterloo.' },
  { name: 'Germany', code: 'DE', slug: 'germany', continent: 'Europe', language: 'German/English', flag_emoji: '🇩🇪', is_featured: 1, study_cost: '€500–€3,000/year (mostly tuition-free)', visa_info: 'Student visa required. Show €10,332 blocked account.', description: 'Germany offers tuition-free education at public universities. Strong engineering, science and arts programs.' },
  { name: 'United Kingdom', code: 'GB', slug: 'united-kingdom', continent: 'Europe', language: 'English', flag_emoji: '🇬🇧', is_featured: 1, study_cost: '£12,000–£38,000/year', visa_info: 'Student visa (Tier 4). CAS from university required.', description: 'Home to Oxford, Cambridge and Russell Group universities. Post-Study Work visa allows 2 years of work after graduation.' },
  { name: 'United States', code: 'US', slug: 'united-states', continent: 'North America', language: 'English', flag_emoji: '🇺🇸', is_featured: 1, study_cost: '$25,000–$75,000/year', visa_info: 'F-1 Student Visa. SEVIS registration required.', description: 'Home to the world\'s top universities including MIT, Harvard, Stanford. Excellent research and funding opportunities.' },
  { name: 'Australia', code: 'AU', slug: 'australia', continent: 'Oceania', language: 'English', flag_emoji: '🇦🇺', is_featured: 1, study_cost: 'AUD 20,000–45,000/year', visa_info: 'Subclass 500 student visa. Health insurance required.', description: 'World-renowned universities, multicultural environment and excellent research facilities.' },
  { name: 'Netherlands', code: 'NL', slug: 'netherlands', continent: 'Europe', language: 'English/Dutch', flag_emoji: '🇳🇱', is_featured: 0, study_cost: '€8,000–€20,000/year', visa_info: 'MVV visa + residence permit via university.', description: 'Many programs taught in English. Strong in technology, agriculture and international law.' },
  { name: 'Norway', code: 'NO', slug: 'norway', continent: 'Europe', language: 'Norwegian/English', flag_emoji: '🇳🇴', is_featured: 0, study_cost: 'Free at public universities (even for internationals)', visa_info: 'Study permit required. Show NOK 116,239 in funds.', description: 'Norway offers free tuition even to international students at public universities.' },
  { name: 'Japan', code: 'JP', slug: 'japan', continent: 'Asia', language: 'Japanese/English', flag_emoji: '🇯🇵', is_featured: 0, study_cost: '¥535,800/year average', visa_info: 'Student visa. Certificate of eligibility required.', description: 'MEXT scholarships cover full expenses. Strong in science, technology and innovation.' },
  { name: 'China', code: 'CN', slug: 'china', continent: 'Asia', language: 'Chinese/English', flag_emoji: '🇨🇳', is_featured: 0, study_cost: '$3,000–$10,000/year', visa_info: 'X1/X2 student visa. JW202 form required.', description: 'CSC scholarships available for African students. Growing hub for science and engineering.' },
  { name: 'Turkey', code: 'TR', slug: 'turkey', continent: 'Europe/Asia', language: 'Turkish/English', flag_emoji: '🇹🇷', is_featured: 0, study_cost: 'Free under Türkiye Scholarships', visa_info: 'Student residence permit via scholarship.', description: 'Türkiye Scholarships cover full tuition, accommodation, stipend and health insurance.' },
]

const insertCountry = db.prepare(`
  INSERT OR IGNORE INTO countries (name, code, slug, continent, language, flag_emoji, is_featured, study_cost, visa_info, description)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)
countries.forEach(c => insertCountry.run(c.name, c.code, c.slug, c.continent, c.language, c.flag_emoji, c.is_featured ? 1 : 0, c.study_cost, c.visa_info, c.description))
console.log(`✅ Inserted ${countries.length} countries`)

// Scholarships
const scholarships = [
  {
    title: 'Vanier Canada Graduate Scholarships',
    country: 'Canada', country_code: 'CA',
    host_university: 'Various Canadian Universities',
    degree_level: 'phd',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'November each year',
    deadline_date: '2024-11-01',
    description: 'The Vanier CGS program aims to attract and retain world-class doctoral students by supporting students who demonstrate both leadership skills and a high standard of scholarly achievement in graduate studies. Worth CAD $50,000/year for 3 years.',
    eligibility: 'Nominated by a Canadian university. Must not have completed more than 20 months of doctoral studies. Open to Canadian and international students.',
    benefits: 'CAD $50,000 per year for up to 3 years of doctoral study',
    subjects: 'Social Sciences, Humanities, Natural Sciences, Engineering, Health',
    apply_link: 'https://vanier.gc.ca',
    official_website: 'https://vanier.gc.ca',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 1,
  },
  {
    title: 'DAAD Scholarships for Development-Related Postgraduate Courses',
    country: 'Germany', country_code: 'DE',
    host_university: 'Various German Universities',
    degree_level: 'masters',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'September–October each year',
    deadline_date: '2024-10-01',
    description: 'DAAD offers scholarships for postgraduate degree programmes in Germany with a special development policy relevance. Intended for graduates from developing countries including all African nations.',
    eligibility: 'Bachelor\'s degree with minimum 2 years work experience. Under 36 years of age. Must return to home country after graduation.',
    benefits: 'Monthly stipend €861–€1,200, travel allowance, health insurance, tuition coverage',
    subjects: 'Agriculture, Medicine, Engineering, Social Sciences, Law, Economics',
    apply_link: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    official_website: 'https://www.daad.de',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 1,
  },
  {
    title: 'Chevening Scholarships (UK Government)',
    country: 'United Kingdom', country_code: 'GB',
    host_university: 'Any UK University',
    degree_level: 'masters',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'November each year',
    deadline_date: '2024-11-05',
    description: 'Chevening is the UK government\'s international awards programme, funded by the Foreign, Commonwealth & Development Office. Enables outstanding emerging leaders from around the world to study in the UK.',
    eligibility: 'Minimum 2 years work experience. Bachelor\'s degree. Return to home country for 2 years after scholarship. Open to most African countries.',
    benefits: 'Full tuition, monthly living allowance, return flights, visa fees, arrival allowance',
    subjects: 'All subjects offered by UK universities',
    apply_link: 'https://www.chevening.org/apply/',
    official_website: 'https://www.chevening.org',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 1,
  },
  {
    title: 'Commonwealth Scholarships (UK)',
    country: 'United Kingdom', country_code: 'GB',
    host_university: 'UK Universities',
    degree_level: 'masters',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'December each year',
    deadline_date: '2024-12-15',
    description: 'Commonwealth Scholarships are offered by the UK government for Master\'s and PhD study. Targeted at candidates from low and middle income Commonwealth countries. Designed for those who could not otherwise afford to study in the UK.',
    eligibility: 'Commonwealth citizen. First degree of at least upper second class. Cannot be a permanent resident of UK or other high-income country.',
    benefits: 'Full tuition and fees, monthly stipend, airfare, thesis grant, study travel grant',
    subjects: 'Science, Technology, Health, Education, Agriculture, Social Sciences',
    apply_link: 'https://cscuk.fcdo.gov.uk/apply/',
    official_website: 'https://cscuk.fcdo.gov.uk',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 1,
  },
  {
    title: 'Fulbright Foreign Student Program (USA)',
    country: 'United States', country_code: 'US',
    host_university: 'US Universities',
    degree_level: 'masters',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'Varies by country (typically February–October)',
    deadline_date: '2024-08-01',
    description: 'The Fulbright Program is the U.S. government\'s flagship international exchange program, providing grants for study, research and teaching. African students in many countries can apply through their local Fulbright Commission.',
    eligibility: 'Bachelor\'s degree or equivalent. Strong academic record. Leadership potential. Must return home after program.',
    benefits: 'Full tuition, monthly stipend, health insurance, airfare, visa support',
    subjects: 'All academic disciplines',
    apply_link: 'https://foreign.fulbrightonline.org/',
    official_website: 'https://foreign.fulbrightonline.org',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 1,
  },
  {
    title: 'Australia Awards Scholarships',
    country: 'Australia', country_code: 'AU',
    host_university: 'Australian Universities',
    degree_level: 'masters',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'April–June each year',
    deadline_date: '2024-05-01',
    description: 'Australia Awards are prestigious international scholarships funded by the Australian Government. Open to students from Africa and other developing regions for undergraduate and postgraduate study.',
    eligibility: 'Citizen of eligible country. 18+ years. Must apply in home country. Work experience preferred.',
    benefits: 'Full tuition, return airfare, establishment allowance, health insurance, living costs',
    subjects: 'Agriculture, Education, Health, Governance, Infrastructure',
    apply_link: 'https://www.australiaawards.gov.au/',
    official_website: 'https://www.australiaawards.gov.au',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 0,
  },
  {
    title: 'Türkiye Scholarships (Government of Turkey)',
    country: 'Turkey', country_code: 'TR',
    host_university: 'Turkish Universities',
    degree_level: 'bachelors',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'February each year',
    deadline_date: '2025-02-20',
    description: 'Türkiye Scholarships is a competitive government scholarship program for international students who want to study in Turkey at Bachelor\'s, Master\'s, and PhD levels. Very popular among African students.',
    eligibility: 'Open to international students. Bachelor\'s: under 21. Master\'s: under 30. PhD: under 35. GPA requirements apply.',
    benefits: 'Full tuition, monthly stipend, accommodation, health insurance, Turkish language course, return ticket',
    subjects: 'All subjects available in Turkish universities',
    apply_link: 'https://turkiyeburslari.gov.tr/',
    official_website: 'https://turkiyeburslari.gov.tr',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 1,
  },
  {
    title: 'MasterCard Foundation Scholars Program',
    country: 'Various', country_code: '',
    host_university: 'Partner Universities Worldwide',
    degree_level: 'bachelors',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'Varies by university (November–February)',
    deadline_date: '2025-02-01',
    description: 'The Mastercard Foundation Scholars Program enables academically talented yet economically disadvantaged young Africans to access quality education. Partners include UofT, McGill, Arizona State, Edinburgh, EPFL and more.',
    eligibility: 'African students only. Academically talented but financially disadvantaged. Demonstrated leadership. Commitment to giving back to Africa.',
    benefits: 'Full scholarship covering tuition, accommodation, meals, books, travel, and personal stipend',
    subjects: 'All fields at partner universities',
    apply_link: 'https://mastercardfdn.org/all/scholars/',
    official_website: 'https://mastercardfdn.org',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 1,
  },
  {
    title: 'MEXT Japanese Government Scholarship',
    country: 'Japan', country_code: 'JP',
    host_university: 'Japanese Universities',
    degree_level: 'masters',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'May–June each year',
    deadline_date: '2024-06-01',
    description: 'The Japanese Government (MEXT) scholarship is awarded to international students for research, undergraduate and teacher training studies in Japan. Covers all expenses with generous monthly stipend.',
    eligibility: 'Apply through Japanese Embassy in your country. Under 35 years. Good academic record.',
    benefits: 'Full tuition waiver, monthly stipend ¥143,000–¥145,000, round-trip airfare, no application fee',
    subjects: 'All disciplines including Japanese Language studies',
    apply_link: 'https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm',
    official_website: 'https://www.mext.go.jp/en/',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 0,
  },
  {
    title: 'Chinese Government Scholarship (CSC)',
    country: 'China', country_code: 'CN',
    host_university: 'Chinese Universities',
    degree_level: 'bachelors',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'March–April each year',
    deadline_date: '2025-04-01',
    description: 'The Chinese Government Scholarship (CSC) is funded by the Ministry of Education of China. It enables international students to study undergraduate, postgraduate and doctoral programs in Chinese universities. Very popular for African students.',
    eligibility: 'Non-Chinese citizen in good health. Under 25 (UG), Under 35 (PG), Under 40 (PhD). Good academic record.',
    benefits: 'Full tuition, accommodation, monthly stipend CNY 2,500–3,500, health insurance, Chinese language training',
    subjects: 'Science, Engineering, Agriculture, Medicine, Economics, Law, Arts, History',
    apply_link: 'https://www.campuschina.org/',
    official_website: 'https://www.campuschina.org',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 0,
  },
  {
    title: 'AAUW International Fellowships (USA) - Women',
    country: 'United States', country_code: 'US',
    host_university: 'US Accredited Universities',
    degree_level: 'masters',
    type: 'fellowship',
    funding_type: 'partial',
    deadline: 'November each year',
    deadline_date: '2024-11-01',
    description: 'The American Association of University Women (AAUW) International Fellowships support women pursuing full-time graduate or postdoctoral study in the United States who are not US citizens or permanent residents.',
    eligibility: 'Women only. Not a US citizen or permanent resident. Hold a bachelor\'s degree. Apply to accredited US institution.',
    benefits: '$18,000–$30,000 fellowship award per year',
    subjects: 'All disciplines',
    apply_link: 'https://www.aauw.org/resources/programs/fellowships-grants/current-opportunities/international/',
    official_website: 'https://www.aauw.org',
    visa_sponsored: 0, open_to_africans: 1, is_featured: 0,
  },
  {
    title: 'Holland Scholarship (Netherlands)',
    country: 'Netherlands', country_code: 'NL',
    host_university: 'Dutch Universities of Applied Sciences and Research Universities',
    degree_level: 'bachelors',
    type: 'scholarship',
    funding_type: 'partial',
    deadline: 'February–May each year',
    deadline_date: '2025-02-01',
    description: 'The Holland Scholarship is funded by the Dutch Ministry of Education, Culture and Science and a number of Dutch research universities and universities of applied sciences. It is intended for talented students from outside the European Economic Area.',
    eligibility: 'Non-EEA students. Enrolled or applying to participating Dutch university. Meet university-specific requirements.',
    benefits: '€5,000 one-time scholarship in first year of study',
    subjects: 'All disciplines at participating universities',
    apply_link: 'https://www.studyinholland.nl/scholarships/holland-scholarship',
    official_website: 'https://www.studyinholland.nl',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 0,
  },
  {
    title: 'World Bank Graduate Scholarship Program (JJ/WBGSP)',
    country: 'Various', country_code: '',
    host_university: 'Partner Universities Worldwide',
    degree_level: 'masters',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'February each year',
    deadline_date: '2025-02-15',
    description: 'The Joint Japan/World Bank Graduate Scholarship Program supports mid-career professionals from developing countries, including African nations, to pursue development-related graduate programs at universities worldwide.',
    eligibility: 'National of World Bank member developing country. Under 45. Bachelor\'s degree. 3+ years recent development experience.',
    benefits: 'Full tuition, living expenses, health insurance, airfare, dissertation grant',
    subjects: 'Development Economics, Public Policy, Agriculture, Health, Education, Environment',
    apply_link: 'https://www.worldbank.org/en/programs/scholarships',
    official_website: 'https://www.worldbank.org/en/programs/scholarships',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 0,
  },
  {
    title: 'Erasmus Mundus Joint Master Degrees (EU)',
    country: 'Various European Countries', country_code: '',
    host_university: 'European University Consortia',
    degree_level: 'masters',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'January–March each year',
    deadline_date: '2025-01-15',
    description: 'Erasmus Mundus Joint Master Degrees are high-quality study programmes jointly developed, delivered and awarded by international consortia of higher education institutions. African students highly competitive for these awards.',
    eligibility: 'Bachelor\'s degree. Apply to specific EMJMD programme. Strong academic record. Language proficiency.',
    benefits: '€1,400/month living allowance, €9,000 travel/installation allowance, full tuition waiver, health insurance',
    subjects: 'Arts, Sciences, Engineering, Social Sciences, Business, Law – varies by programme',
    apply_link: 'https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters',
    official_website: 'https://erasmus-plus.ec.europa.eu',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 1,
  },
  {
    title: 'African Development Bank (AfDB) Internship Program',
    country: 'Various', country_code: '',
    host_university: 'African Development Bank',
    degree_level: 'bachelors',
    type: 'internship',
    funding_type: 'paid',
    deadline: 'Rolling applications (quarterly)',
    deadline_date: '2025-03-01',
    description: 'The AfDB Internship Program provides students and recent graduates with opportunities to supplement academic learning with practical experience in an international multicultural environment. Available in various AfDB offices across Africa and globally.',
    eligibility: 'African Union citizen. Currently enrolled in or graduated (within 2 years) from Bachelor\'s/Master\'s/PhD. Under 30.',
    benefits: 'Monthly stipend, travel allowance, valuable international development experience',
    subjects: 'Finance, Economics, Engineering, Environment, Social Sciences, Law, IT',
    apply_link: 'https://www.afdb.org/en/about-us/careers/internship-programme',
    official_website: 'https://www.afdb.org',
    visa_sponsored: 0, open_to_africans: 1, is_featured: 0,
  },
  {
    title: 'Gates Cambridge Scholarship',
    country: 'United Kingdom', country_code: 'GB',
    host_university: 'University of Cambridge',
    degree_level: 'phd',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'October–December each year',
    deadline_date: '2024-10-14',
    description: 'Gates Cambridge Scholarships are highly competitive full-cost scholarships for outstanding applicants from outside the UK to pursue a full-time postgraduate degree at the University of Cambridge. One of the world\'s most prestigious awards.',
    eligibility: 'Non-UK citizen. Apply to Cambridge for any subject. Exceptional academic record. Leadership qualities. Commitment to improving lives of others.',
    benefits: 'Full University and College fees, maintenance stipend, flights, family allowance, development funding',
    subjects: 'All subjects at University of Cambridge',
    apply_link: 'https://www.gatescambridge.org/apply/',
    official_website: 'https://www.gatescambridge.org',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 1,
  },
  {
    title: 'Orange Knowledge Programme (OKP) – Netherlands',
    country: 'Netherlands', country_code: 'NL',
    host_university: 'Dutch Universities',
    degree_level: 'masters',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'March each year',
    deadline_date: '2025-03-01',
    description: 'The Orange Knowledge Programme (OKP) is a Dutch government scholarship for professionals from developing countries. Scholarship for short courses and Master\'s programmes in the Netherlands.',
    eligibility: 'Mid-career professional from eligible country (many African countries qualify). Employed and sponsored by employer. Ages 25–45.',
    benefits: 'Full tuition, visa, living allowance, travel costs, health insurance',
    subjects: 'Water Management, Agriculture, Health, Security, Rule of Law',
    apply_link: 'https://www.nuffic.nl/en/subjects/orange-knowledge-programme',
    official_website: 'https://www.nuffic.nl',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 0,
  },
  {
    title: 'OPEC Fund Scholarship Program',
    country: 'Various', country_code: '',
    host_university: 'Universities in OECD Countries',
    degree_level: 'masters',
    type: 'scholarship',
    funding_type: 'fully_funded',
    deadline: 'March each year',
    deadline_date: '2025-03-31',
    description: 'The OPEC Fund for International Development offers scholarships to students from developing countries, including across Africa, to pursue master\'s degree programs at reputable universities in OECD member countries.',
    eligibility: 'Citizen of OPEC Fund eligible developing country. Under 35. Bachelor\'s degree with excellent grades. Admission to OECD university.',
    benefits: 'Tuition fees up to $25,000, living allowance $20,000/year, return economy airfare, health insurance',
    subjects: 'Development-related fields: Economics, Finance, Engineering, Environment, Agriculture',
    apply_link: 'https://opecfund.org/about/scholarships',
    official_website: 'https://opecfund.org',
    visa_sponsored: 1, open_to_africans: 1, is_featured: 0,
  },
]

const insertScholarship = db.prepare(`
  INSERT OR IGNORE INTO scholarships 
  (title, slug, country, country_code, host_university, degree_level, type, funding_type, 
   deadline, deadline_date, description, eligibility, benefits, subjects, apply_link, 
   official_website, visa_sponsored, open_to_africans, is_featured)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

scholarships.forEach(s => {
  const slug = slugify(s.title)
  insertScholarship.run(
    s.title, slug, s.country, s.country_code, s.host_university, s.degree_level, s.type,
    s.funding_type, s.deadline, s.deadline_date, s.description, s.eligibility, s.benefits,
    s.subjects, s.apply_link, s.official_website, s.visa_sponsored ? 1 : 0,
    s.open_to_africans ? 1 : 0, s.is_featured ? 1 : 0
  )
})
console.log(`✅ Inserted ${scholarships.length} scholarships`)

// Blog posts
const posts = [
  {
    title: 'How to Win Scholarships as an African Student: The Complete Guide',
    slug: 'how-to-win-scholarships-african-student',
    excerpt: 'A step-by-step guide to finding, applying for, and winning fully funded scholarships to study abroad from Africa.',
    category: 'guides',
    tags: 'scholarship,application,tips,africa',
    is_published: 1,
    content: `# How to Win Scholarships as an African Student

Winning a scholarship to study abroad is life-changing — and more achievable than most people think. Each year, thousands of African students secure fully funded scholarships to top universities in the UK, USA, Canada, Germany, Australia and beyond.

## Step 1: Start Early (18 months before)

Most scholarship deadlines are 12–18 months before your intended start date. Begin your research now:
- Identify 10–15 scholarships you qualify for
- Note all deadlines in a calendar
- Request recommendation letters early

## Step 2: Build a Strong Academic Profile

- Maintain a GPA above 3.5/4.0 or equivalent
- Take GRE/GMAT/IELTS/TOEFL early
- Get research experience if applying for science programs

## Step 3: Write Outstanding Essays

Your Statement of Purpose and personal essays are your biggest opportunity. Scholarship committees read thousands — yours must stand out:
- Tell your unique story
- Connect your past, present and future
- Show how you will use your degree to benefit Africa

## Step 4: Get Strong Recommendation Letters

Contact professors and supervisors who know your work well:
- Ask at least 3 months in advance
- Provide them with your CV, SOP draft, and the scholarship details
- Follow up politely

## Step 5: Apply to Multiple Scholarships

Never rely on just one application. Apply to 8–15 scholarships simultaneously. The scholarship game is partly a numbers game.

## Top Mistakes to Avoid

- Applying at the last minute
- Generic, unspecific essays
- Ignoring the eligibility criteria
- Missing supporting documents
- Not following instructions exactly

## Final Tips

Stay organized, stay persistent, and remember: rejection is part of the process. Many successful scholars were rejected multiple times before winning their scholarship.`,
  },
  {
    title: 'Best Countries to Study Abroad for African Students in 2024',
    slug: 'best-countries-study-abroad-african-students',
    excerpt: 'Compare the top destinations for African students: costs, scholarship availability, visa requirements, and post-study opportunities.',
    category: 'destinations',
    tags: 'study abroad,countries,germany,canada,uk,usa',
    is_published: 1,
    content: `# Best Countries to Study Abroad for African Students

Choosing where to study abroad is one of the biggest decisions you'll make. Here's our comprehensive comparison of the top destinations for African students.

## 1. Germany 🇩🇪 — Best for Free Education

**Why Germany?** Public universities charge zero or minimal tuition fees — even for international students. With the DAAD scholarship, you also get a monthly stipend.

- Tuition: €0 at public universities (semester fees €150–€350)
- DAAD and other scholarships widely available
- Strong in engineering, sciences, and business
- Path to PR after graduation

## 2. Canada 🇨🇦 — Best for Immigration Pathways

**Why Canada?** Canada actively wants to keep international graduates. The Post-Graduation Work Permit (PGWP) can lead to permanent residence.

- World-class universities (UofT, UBC, McGill)
- Vanier, Trudeau and many university scholarships
- Multicultural and welcoming environment
- Clear immigration pathway

## 3. United Kingdom 🇬🇧 — Best for Prestige & Speed

**Why UK?** World's top universities (Oxford, Cambridge, LSE, Imperial). Master's programs are only 1 year — saving time and money.

- Chevening and Commonwealth scholarships for Africans
- Graduate Route visa: 2 years work after graduation
- Globally recognized degrees

## 4. United States 🇺🇸 — Best Research Opportunities

**Why USA?** The US has the most scholarship money in the world. Fulbright, university fellowships, and departmental grants.

- 4,000+ universities with various financial aid options
- OPT: 1–3 years work authorization after graduation
- Strong alumni networks globally

## 5. Turkey 🇹🇷 — Best Fully Funded All-Inclusive

**Why Turkey?** Türkiye Scholarships cover EVERYTHING: tuition, accommodation, food stipend, health insurance, flights and even a Turkish language course.

- Very competitive acceptance rates
- Growing universities
- 1-year Turkish language course included
- Covers bachelors through PhD

## Quick Comparison Table

| Country | Tuition | Avg Scholarship Value | Work After? |
|---------|---------|----------------------|-------------|
| Germany | Free | €12,000/year | Yes |
| Canada | $15–35K/yr | Full + CAD 50K | Yes (PGWP) |
| UK | £12–38K/yr | Full | Yes (2yr) |
| USA | $25–75K/yr | Full varies | Yes (OPT) |
| Turkey | Free (Scholarship) | Full all-inclusive | Limited |`,
  },
  {
    title: 'How to Write a Winning Statement of Purpose (SOP) for Scholarships',
    slug: 'how-to-write-winning-statement-of-purpose',
    excerpt: 'Master the art of writing a compelling Statement of Purpose that wins scholarships. Includes templates, examples and expert tips.',
    category: 'writing',
    tags: 'SOP,statement of purpose,writing,scholarship tips',
    is_published: 1,
    content: `# How to Write a Winning Statement of Purpose

Your Statement of Purpose (SOP) is the heart of your scholarship application. It's your chance to speak directly to the committee and convince them you deserve funding.

## The Golden Structure

### Paragraph 1: The Hook
Start with a compelling story, quote, or observation that immediately grabs attention. Avoid clichés like "Since childhood, I have always wanted to..."

### Paragraph 2: Your Academic Journey
Describe your academic background, key achievements, and what sparked your interest in your field.

### Paragraph 3: Your Research/Work Experience
What have you done? What did you learn? How did it shape your goals?

### Paragraph 4: Why This Program/University
Be SPECIFIC. Research the program, professors, labs, or courses you want. Generic SOPs get rejected.

### Paragraph 5: Your Career Goals
Where will this degree take you? How will you use it to make an impact — especially in Africa?

### Paragraph 6: Why This Scholarship
Why does this scholarship specifically align with your values and goals?

## 10 Rules for a Great SOP

1. **Show, don't tell** — Use specific examples, not vague claims
2. **Be authentic** — Your unique story is your greatest asset
3. **Research deeply** — Name specific faculty, programs, or research groups
4. **Address Africa** — Most scholarship committees love development narratives
5. **Be concise** — Usually 800–1,200 words max
6. **No grammar errors** — Have multiple people proofread
7. **Answer the prompt** — Read the instructions carefully
8. **Avoid negative language** — Don't talk about what you couldn't do
9. **Strong opening** — You have 30 seconds to capture interest
10. **Strong closing** — End with a memorable, forward-looking statement

## Common Mistakes

- Starting with "My name is..." 
- Repeating your CV in prose form
- Being too vague about your research interests
- Not connecting your goals to the scholarship's mission
- Exceeding the word limit`,
  },
]

const insertPost = db.prepare(`
  INSERT OR IGNORE INTO blog_posts (title, slug, excerpt, content, category, tags, is_published)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)
posts.forEach(p => insertPost.run(p.title, p.slug, p.excerpt, p.content, p.category, p.tags, p.is_published ? 1 : 0))
console.log(`✅ Inserted ${posts.length} blog posts`)

console.log('\n🎉 Database seeded successfully!')
console.log('Run: npm run dev')
