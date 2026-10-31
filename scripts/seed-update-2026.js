// scripts/seed-update-2026.js
// Fresh real opportunities researched September 2026
const { createClient } = require('@libsql/client');

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

function slug(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

const opportunities = [

  // ── FRESH SCHOLARSHIPS ──
  ['ASU Mastercard Foundation Innovation and Technology Scholarships 2027', 'united-states', 'united-states', 'scholarship', 'Bachelors', 'full',
   'Full funding', 'September 27, 2026',
   'Arizona State University and the Mastercard Foundation offer fully funded scholarships for talented young Africans to pursue technology and innovation-focused disciplines at ASU. The programme equips scholars with leadership skills to drive digital transformation back home.',
   'African citizen. Young professional or student. Technology or innovation background. Commitment to return and contribute to African development.',
   'Full tuition, living stipend, flights, health insurance, leadership training',
   'Technology, Innovation, Engineering, Computer Science', 'Arizona State University', 'United States', 'https://mastercardfdn.org/asu', 1, 1],

  ['Nordic Africa Institute Nordic Scholarship Programme 2027', 'sweden', 'sweden', 'scholarship', 'PhD', 'full',
   'Full funding', 'October 11, 2026',
   'The Nordic Africa Institute offers the Nordic Scholarship Programme 2027/2028 for early-career African researchers. The programme provides access to unique library resources, robust academic networks, and dedicated research time to advance scholarship on Africa.',
   'African researcher. Early-career academic. PhD student or recent PhD graduate. Research focus on Africa.',
   'Research funding, library access, academic network, Nordic residency',
   'African Studies, Social Sciences, Humanities, Development Studies', 'Nordic Africa Institute', 'Sweden', 'https://nai.uu.se/scholarships', 0, 1],

  ['Gates Cambridge Scholarship 2027/2028 — Now Open', 'united-kingdom', 'united-kingdom', 'scholarship', 'Masters', 'full',
   'Full funding — one of world\'s most prestigious awards', 'October 2026',
   'Applications are now open for the Gates Cambridge Scholarship 2027/2028. This prestigious scholarship funds outstanding students from outside the UK to pursue a full-time postgraduate degree at the University of Cambridge. Gates Cambridge scholars are selected for academic excellence, leadership potential, and commitment to improving lives.',
   'Non-UK citizen. Applying to any postgraduate programme at Cambridge. Outstanding academic record. Demonstrated commitment to improving lives of others.',
   'Full tuition, maintenance allowance, return flights, visa costs, family allowance, development funding',
   'All postgraduate disciplines at Cambridge', 'University of Cambridge', 'United Kingdom', 'https://gatescambridge.org/apply', 1, 1],

  ['Commonwealth Masters Scholarships 2027/2028 — Open', 'united-kingdom', 'united-kingdom', 'scholarship', 'Masters', 'full',
   'Full funding', 'October 2026',
   'The Commonwealth Scholarship Commission has opened applications for Commonwealth Masters Scholarships 2027/2028. These scholarships fund citizens of eligible Commonwealth countries for full-time Master\'s study at a UK university. A flagship programme for African students since 1959.',
   'Citizen of eligible Commonwealth country. First or upper second-class undergraduate degree. Cannot self-fund UK study. Development impact commitment.',
   'Full tuition, living allowance, return airfare, arrival and departure allowances, thesis grant',
   'All disciplines with development focus', 'UK Universities', 'United Kingdom', 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-masters-scholarships', 1, 1],

  ['Commonwealth PhD Scholarships 2027/2028 — Open', 'united-kingdom', 'united-kingdom', 'scholarship', 'PhD', 'full',
   'Full funding', 'October 2026',
   'Commonwealth PhD Scholarships 2027/2028 are now open for applications from eligible Commonwealth country citizens. These prestigious awards fund full-time doctoral study at UK universities and are specifically targeted at students from low and middle income Commonwealth countries including most of Africa.',
   'Citizen of low or middle income Commonwealth country. Masters degree or equivalent. Cannot afford UK study. Strong research proposal.',
   'Full tuition, living allowance, airfare, arrival allowance, thesis grant, research support',
   'All research disciplines', 'UK Universities', 'United Kingdom', 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-phd-scholarships', 1, 1],

  ['Japan Exchange and Teaching Programme (JET) 2027 for Young Leaders', 'japan', 'japan', 'exchange-program', 'Non-degree', 'full',
   'Full funding', 'Rolling applications',
   'The Government of Japan Exchange and Teaching Programme 2027 is now open for young leaders from African and other countries. The JET Programme sends participants to Japan to work in schools and local government offices, promoting international exchange and cross-cultural understanding.',
   'University graduate. Under 40 years old. Fluent English. Strong interest in Japan and education.',
   'Full funding, monthly salary (¥280,000+), accommodation, flights, health insurance',
   'Education, International Relations, Language Teaching', 'Japanese Schools and Government Offices', 'Japan', 'https://jetprogramme.org', 1, 1],

  ['University of Macau Masters and PhD Scholarships 2027/2028', 'china', 'china', 'scholarship', 'Masters', 'full',
   'Full tuition + MOP 8,000/month stipend', 'Rolling applications',
   'The University of Macau has opened applications for 2027/2028 Master\'s and PhD programmes with scholarship opportunities for international students including Africans. The university is internationally ranked and offers English-medium programmes across multiple disciplines.',
   'Bachelor\'s degree for Masters, Masters for PhD. Strong academic record. English proficiency.',
   'Full tuition waiver, monthly stipend of MOP 8,000, accommodation support',
   'Business, Engineering, Law, Sciences, Humanities, Education', 'University of Macau', 'China', 'https://um.edu.mo/scholarships', 0, 1],

  ['DAAD Helmut Schmidt Scholarship 2027/28 — Now Open', 'germany', 'germany', 'scholarship', 'Masters', 'full',
   'Full funding', 'October 31, 2026',
   'The DAAD Helmut-Schmidt Scholarship Programme 2027/28 has opened applications. This prestigious programme supports mid-career professionals from developing countries for Master\'s study in public policy, economics, and governance in Germany. Deadline: October 31, 2026.',
   'From developing country. 2+ years professional experience in public sector or related field. Under 36. English or German proficiency.',
   'Full tuition, monthly stipend of approximately €934, travel allowance, health insurance',
   'Public Policy, Governance, Economics, Development', 'German Universities', 'Germany', 'https://daad.de/helmut-schmidt', 1, 1],

  ['EAC Youth Fellowship 2026 — Fully Funded East Africa', 'tanzania', 'tanzania', 'fellowship', 'Non-degree', 'full',
   'Full funding', 'September 30, 2026',
   'The East African Community (EAC) Youth Fellowship 2026 is a fully funded regional leadership programme for East African youth. Fellows engage with EAC institutions and contribute to regional integration initiatives. This is a rare opportunity to work at the heart of East African integration.',
   'East African citizen (Kenya, Uganda, Tanzania, Rwanda, Burundi, South Sudan, DRC, Somalia). University graduate. Under 35. Leadership experience.',
   'Full funding, EAC placement, professional development, regional networking',
   'Regional Integration, Policy, Economics, Law, Agriculture', 'East African Community', 'Tanzania', 'https://eac.int/youth-fellowship', 1, 1],

  ['Africa Institute Senior and Post-doctoral Fellowships 2027 UAE', 'united-arab-emirates', 'united-arab-emirates', 'fellowship', 'PhD', 'full',
   'Full funding + research support', 'Rolling applications',
   'The Africa Institute in Sharjah, UAE offers Senior and Post-doctoral Fellowships 2027 for African scholars. Fellows conduct research on Africa from the UAE, contributing to building knowledge bridges between Africa and the Arab world. A unique and prestigious opportunity.',
   'Senior academic or post-doctoral researcher. African scholar or specialist in African studies. Strong publication record.',
   'Full fellowship funding, research support, accommodation, visa, access to Africa Institute resources',
   'African Studies, History, Politics, Culture, Economics', 'Africa Institute Sharjah', 'United Arab Emirates', 'https://theafricainstitute.org/fellowships', 0, 1],

  ['Mastercard Foundation DrPH Scholarship University of Toronto 2027', 'canada', 'canada', 'scholarship', 'PhD', 'full',
   'Full funding', 'Rolling applications',
   'The University of Toronto Mastercard Foundation Doctor of Public Health (DrPH) Scholarship 2027/2028 is a fully funded opportunity for African health leaders to pursue doctoral-level public health study at one of the world\'s top universities. Applications now open.',
   'African health leader. Masters degree in public health or related field. Minimum 5 years relevant work experience. Commitment to return and serve in Africa.',
   'Full tuition, living allowance, books, health insurance, flights, mentorship',
   'Public Health, Health Systems, Epidemiology, Global Health', 'University of Toronto', 'Canada', 'https://dlsph.utoronto.ca/mastercard-foundation-drph-scholarship', 1, 1],

  ['Land is Life Indigenous Women Fellowship 2027 Cohort V', 'various', 'various', 'fellowship', 'Non-degree', 'full',
   'Full funding', 'Rolling applications',
   'The Land is Life Indigenous Women\'s Program Fellowship 2027 (Cohort V) supports indigenous and rural women leaders from across the Global South including Africa in environmental justice, land rights, and climate advocacy. A transformative leadership programme.',
   'Indigenous or rural woman from eligible country. Working on land rights, environment, or climate issues. Community leader.',
   'Full fellowship funding, leadership training, international networking, advocacy skills',
   'Environmental Justice, Land Rights, Climate, Indigenous Rights', 'Land is Life', 'Various', 'https://landislife.org/fellowship', 0, 1],

  ['CIFAR Azrieli Global Scholars Program 2027 — CDN $100,000', 'canada', 'canada', 'research-grant', 'PhD', 'full',
   'CDN $100,000 in funding over 2 years', 'Rolling applications',
   'The CIFAR Azrieli Global Scholars Program 2027/2029 offers CDN $100,000 in research funding over two years for early-career researchers worldwide including Africans. Scholars join CIFAR research programmes and benefit from international collaboration and mentorship.',
   'Early-career researcher. PhD completed within last 5 years. Exceptional research potential. Faculty position or equivalent.',
   'CDN $100,000 research funding, CIFAR programme membership, international collaboration, mentorship',
   'All research disciplines', 'CIFAR Partner Institutions', 'Canada', 'https://cifar.ca/azrieli-global-scholars', 0, 1],

  // ── INTERNSHIPS / JOBS ──
  ['WFP Internship Programme 2026 — Monthly Stipend', 'various', 'various', 'internship', 'Non-degree', 'paid',
   'Monthly stipend + insurance + travel support', 'Rolling applications',
   'The World Food Programme (WFP) Internship Programme 2026 is now open. WFP is the world\'s largest humanitarian organisation and offers interns practical experience in food security, nutrition, logistics, and humanitarian response. Interns receive a monthly stipend and exposure to global efforts to end hunger.',
   'Enrolled in university or graduated within 2 years. Relevant field (nutrition, logistics, economics, communications, IT). English proficiency.',
   'Monthly stipend, health insurance, travel support, UN experience, global network',
   'Nutrition, Food Security, Logistics, Communications, IT, Economics', 'WFP Offices Worldwide', 'Various', 'https://wfp.org/careers/internships', 0, 1],

  ['FAO Young Professionals Programme (YPP) 2026 — Career Opportunity', 'various', 'various', 'internship', 'Non-degree', 'paid',
   'Full UN professional salary + benefits', 'September 2026',
   'The FAO Young Professionals Programme (YPP) 2026 is a career-track recruitment initiative for talented young professionals from developing countries including Africa. Selected candidates start careers as international civil servants at FAO. Priority given to candidates from least developed and underrepresented countries.',
   'National of non- or underrepresented FAO member country. Advanced degree in relevant field. Under 32 years old. Fluent English or French.',
   'Full UN professional salary, benefits package, career development, international civil servant status',
   'Agriculture, Food Science, Economics, Nutrition, Forestry, Fisheries', 'FAO Rome and Field Offices', 'Various', 'https://fao.org/employment/young-talent-programme', 1, 1],

  ['FAO Internship Programme Africa Region 2026', 'various', 'various', 'internship', 'Non-degree', 'paid',
   'Monthly stipend up to $700', 'Rolling applications',
   'The FAO Internship Programme for Africa Region 2026 is open. Interns work within FAO\'s regional structures supporting African member states in achieving more efficient, inclusive, resilient, and sustainable agrifood systems. Assignments across FAO Africa offices and project locations.',
   'Enrolled in undergraduate or postgraduate programme or recently graduated. Relevant background in agriculture, food security, or development. Fluent English or French.',
   'Monthly stipend up to $700, practical international work experience, FAO professional network',
   'Agriculture, Food Security, Environment, Rural Development, Communications', 'FAO Africa Regional Office', 'Various', 'https://fao.org/employment/young-talent-programme/internship-programme', 0, 1],

  ['McKinsey Forward Programme 2026 — Free 10-Week Career Skills for Africans', 'various', 'various', 'fellowship', 'Non-degree', 'free',
   'Free (full programme funded)', 'Rolling applications',
   'McKinsey.org Forward Programme 2026 is a free 10-week career skills programme for Africans. The programme develops professional skills — problem solving, communication, digital literacy, and leadership — and connects participants with McKinsey mentors and alumni networks.',
   'African professional. 18-34 years old. Working or seeking employment. Motivation to develop career. English proficiency.',
   'Free 10-week programme, McKinsey mentorship, career skills certificate, alumni network',
   'Business, Management, Professional Development, Digital Skills', 'McKinsey.org Online', 'Various', 'https://mckinsey.org/forward', 1, 1],

  ['Julius Berger Nigeria Workshop Engineer Development Programme 2026', 'nigeria', 'nigeria', 'internship', 'Bachelors', 'paid',
   'Monthly stipend + development support', 'Rolling applications',
   'Julius Berger Nigeria has opened applications for its 2026 Workshop Engineer Development Programme for Nigerian graduates. This prestigious programme offers engineering graduates practical experience in construction, project management, and engineering operations at Nigeria\'s leading construction company.',
   'Nigerian graduate. Engineering degree (Civil, Mechanical, Electrical). Recent graduate (within 3 years). Strong academic record.',
   'Monthly stipend, structured engineering training, mentorship, potential permanent employment',
   'Civil Engineering, Mechanical Engineering, Electrical Engineering', 'Julius Berger Nigeria', 'Nigeria', 'https://julius-berger.com/careers', 0, 1],

  ['Claude Campus Ambassador Program 2026 — USD 3,600 Stipend', 'various', 'various', 'fellowship', 'Non-degree', 'paid',
   'USD 3,600 stipend + benefits', 'Rolling applications',
   'The Claude Campus Ambassador Program 2026 is open for students and researchers worldwide including Africa. Ambassadors represent Anthropic\'s AI platform on campuses, organize events, create educational content, and earn a USD 3,600 stipend along with other benefits.',
   'Current student or researcher at accredited institution. Interest in AI and technology. Communication and leadership skills.',
   'USD 3,600 stipend, AI tools access, professional development, global network',
   'Artificial Intelligence, Technology, Communications, Research', 'Anthropic / Claude', 'Various', 'https://anthropic.com/claude-campus-ambassadors', 0, 0],

  ['South Africa National Youth Service 100,000 Paid Opportunities 2026', 'south-africa', 'south-africa', 'internship', 'Non-degree', 'paid',
   'Paid stipend across all 9 provinces', 'Rolling applications',
   'South Africa has opened 100,000 National Youth Service paid opportunities for young South Africans across all 9 provinces. This major government initiative provides young people with practical work experience, skills development, and income across various sectors of the economy.',
   'South African citizen. Age 18-35. Not currently employed or in full-time education. Resident in South Africa.',
   'Monthly stipend, skills training, professional certificate, work experience',
   'All sectors — health, education, environment, construction, agriculture', 'Various Government Departments', 'South Africa', 'https://www.gov.za/national-youth-service', 0, 1],

  // ── CONFERENCES ──
  ['ACU Early Career Conference Grants 2026/2027 for African Researchers', 'various', 'various', 'conference', 'Non-degree', 'full',
   'Conference travel and registration costs covered', 'Rolling applications — September 30, 2026',
   'Applications are open for the Association of Commonwealth Universities (ACU) Early Career Conference Grants 2026/2027. These grants help emerging researchers attend international conferences in Commonwealth countries, covering travel, accommodation, and registration. Applicants must be presenting at the conference.',
   'Early career academic at a Commonwealth university. Presenting paper, poster, or chairing session at eligible conference. Outside home country conference location.',
   'Travel costs, accommodation, conference registration, professional networking',
   'All academic disciplines', 'Commonwealth Universities', 'Various', 'https://acu.ac.uk/funding-opportunities/early-career-conference-grants', 1, 1],

  ['AFRICAI Travel Grants — MICCAI 2026 for African AI Researchers', 'various', 'various', 'conference', 'PhD', 'full',
   'Full travel grant', 'July 1, 2026',
   'The AFRICAI Workshop at MICCAI 2026 has secured dedicated funding to support participation by African researchers in medical AI. Travel grants cover conference attendance, accommodation, and travel for exceptional researchers from Africa who submit papers to the AFRICAI workshop.',
   'African researcher or based at African institution. Submitted paper to AFRICAI Workshop at MICCAI 2026. Student, postdoc, or early-career scientist.',
   'Full travel grant, conference registration, accommodation, international AI research network',
   'Medical AI, Artificial Intelligence, Computer Vision, Healthcare Technology', 'MICCAI AFRICAI Workshop', 'Various', 'https://conferences.miccai.org/2026/en/GRANTS-AND-AWARDS.html', 0, 1],

  ['University of Michigan African Studies Conference Travel Grants 2026', 'united-states', 'united-states', 'conference', 'PhD', 'partial',
   'Up to $1,000 for international travel', 'Rolling — September 30, 2026',
   'The University of Michigan LSA African Studies Center offers conference travel grants of up to $1,000 for Africa-focused conference participation. Grants support graduate students and early-career researchers presenting Africa-related research at conferences. Applications reviewed on a rolling basis.',
   'Graduate student or early career researcher. Africa-focused research. Accepted to present at conference. Priority to U-M affiliated applicants but open to others.',
   'Up to $1,000 for international conference travel, supplement to other grants',
   'African Studies, Development, History, Political Science, Social Sciences', 'University of Michigan', 'United States', 'https://africa.umich.edu/funding/travel-grants', 0, 0],

  ['Carnegie Challenge for Civic Leadership 2026/2027 — Seed Funding', 'various', 'various', 'fellowship', 'Non-degree', 'full',
   'Seed funding + global recognition', 'Rolling applications',
   'The Carnegie Challenge for Civic Leadership 2026/2027 offers seed funding and global recognition for young changemakers working on civic innovation and community leadership. African youth leaders with transformative projects are encouraged to apply.',
   'Young leader. Working on civic innovation or community development. Documented project with measurable impact. Under 35.',
   'Seed funding, global recognition, Carnegie network, mentorship, leadership development',
   'Civic Leadership, Community Development, Social Innovation', 'Carnegie Corporation', 'Various', 'https://carnegie.org/civic-leadership-challenge', 0, 0],

  ['TDD Research Pathways Grant 2026 — Up to $15,000', 'various', 'various', 'research-grant', 'PhD', 'full',
   'Up to $15,000', 'Rolling applications',
   'The TDD Research Pathways Grant 2026 offers up to $15,000 for early-career researchers, students, and clinicians worldwide including Africa. The grant supports research on tropical and neglected diseases that disproportionately affect African populations.',
   'Early-career researcher, student, or clinician. Research on tropical or neglected diseases. Affiliated with research institution.',
   'Up to $15,000 research grant, professional development, international research network',
   'Tropical Medicine, Neglected Diseases, Public Health, Clinical Research', 'TDD Research Foundation', 'Various', 'https://tddresearch.org/pathways-grant', 0, 0],

  ['Citi Foundation Global Innovation Challenge 2026 — Open', 'various', 'various', 'fellowship', 'Non-degree', 'full',
   'Philanthropic funding + mentorship', 'October 6, 2026',
   'Applications are open for the 2026 Citi Foundation Global Innovation Challenge. The programme provides philanthropic support to innovative organisations addressing financial inclusion and economic empowerment challenges. African innovators and social enterprises are encouraged to apply.',
   'Social enterprise or non-profit. Working on financial inclusion or economic empowerment. Demonstrated impact. Applications close October 6, 2026.',
   'Grant funding, Citi mentorship, global network, capacity building',
   'Financial Inclusion, Economic Empowerment, Social Enterprise', 'Citi Foundation', 'Various', 'https://citigroup.com/global/foundation/innovation-challenge', 0, 0],

  ['UBA Foundation National Essay Competition 2026 Nigeria', 'nigeria', 'nigeria', 'scholarship', 'Bachelors', 'partial',
   'Cash prizes for winners', 'October 23, 2026',
   'Applications are open for the 2026 UBA Foundation National Essay Competition for senior secondary students in Nigeria. This annual competition organised by the United Bank for Africa Foundation encourages academic excellence and critical thinking among Nigerian youth. Deadline: October 23, 2026.',
   'Senior secondary school student in Nigeria. Nigerian citizen. Strong academic performance.',
   'Cash prizes for winners and runners-up, recognition, UBA Foundation scholarship pathway',
   'Essay Writing, Critical Thinking, All subjects', 'UBA Foundation', 'Nigeria', 'https://ubafoundation.com/essay-competition', 0, 0],

  ['European University Institute Jean Monnet Fellowships 2027 — €2,850/month', 'italy', 'italy', 'fellowship', 'PhD', 'full',
   '€2,850 per month grant', 'September 26, 2026',
   'Applications are open for the European University Institute Jean Monnet Fellowships 2027 for PhD scholars. Fellows spend one academic year at EUI in Florence, Italy, working on their doctoral research. The grant is €2,850 per month. Deadline: September 26, 2026.',
   'PhD researcher. Research on European or international topics. University affiliation. Strong research proposal.',
   '€2,850/month grant, EUI library and research facilities, Florence residency, international academic network',
   'Law, History, Political Science, Economics, Social Sciences', 'European University Institute', 'Italy', 'https://eui.eu/jean-monnet-fellowships', 0, 1],

  ['World Bank Small AI for Development Hackathon 2026', 'various', 'various', 'fellowship', 'Non-degree', 'paid',
   'Prize funding for winners', 'October 6, 2026',
   'Applications are open for the 2026 World Bank Group Small AI for Development Hackathon Challenge. The competition invites innovators to develop AI solutions for development challenges in the Global South. African participants are strongly encouraged. Deadline: October 6, 2026.',
   'Individual or team. Interest in AI and development. Must propose AI solution to a specific development challenge.',
   'Prize funding for winners, World Bank recognition, professional mentorship, global visibility',
   'Artificial Intelligence, Development, Technology, Data Science', 'World Bank Group', 'Various', 'https://worldbank.org/ai-hackathon-2026', 0, 1],

  ['REDCap Africa Symposium 2026 — Call for Abstracts South Africa', 'south-africa', 'south-africa', 'conference', 'Non-degree', 'partial',
   'Registration support available', 'Rolling applications',
   'Registrations and abstract submissions are open for the REDCap Africa Symposium 2026 in South Africa. The symposium focuses on strengthening data systems, research management, and digital innovation across Africa. A key event for African researchers in data-driven research.',
   'African researcher. Working in data management, research administration, or digital health. Abstract submission on relevant topic.',
   'Conference participation, knowledge exchange, skills development, Africa-wide research network',
   'Data Management, Research Systems, Digital Health, Health Informatics', 'REDCap Africa', 'South Africa', 'https://redcapafrica.org/symposium-2026', 0, 0],
];

async function seedUpdate() {
  console.log(`\n🔍 Adding ${opportunities.length} fresh September 2026 opportunities...\n`);

  let added = 0, skipped = 0;

  for (const [title, country, country_slug, type, degree_level, funding_type, amount, deadline, description, eligibility, benefits, subjects, host_university, host_country, official_url, visa_sponsored, is_featured] of opportunities) {
    const s = slug(title);
    try {
      const existing = await db.execute({ sql: 'SELECT id FROM scholarships WHERE slug = ?', args: [s] });
      if (existing.rows.length) {
        skipped++;
        console.log(`⏭  Skipped (exists): ${title}`);
        continue;
      }
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

seedUpdate().catch(err => { console.error(err); process.exit(1); });
