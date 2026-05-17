const { createClient } = require('@libsql/client');

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

function slug(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

const posts = [
  {
    title: 'Top 10 Fully Funded Scholarships for African Students in 2025',
    category: 'Scholarships',
    excerpt: 'Discover the best fully funded scholarships available to African students in 2025, covering tuition, living expenses, flights, and more.',
    content: `## Introduction

Every year, thousands of African students miss life-changing scholarship opportunities simply because they don't know where to look. In this comprehensive guide, we break down the top 10 fully funded scholarships available to African students in 2025.

These scholarships cover everything — tuition, accommodation, monthly stipend, flights, and health insurance. All you need to do is apply.

## 1. Chevening Scholarship (United Kingdom)

The Chevening Scholarship is the UK government's flagship international scholarship programme. It funds exceptional students from around the world to study a one-year Master's degree at any UK university.

**What it covers:** Full tuition, monthly living allowance, return flights, visa costs, and travel grants.

**Eligibility:** At least 2 years of work experience, a bachelor's degree, and strong leadership potential.

**Deadline:** November each year.

## 2. DAAD Scholarship (Germany)

The German Academic Exchange Service (DAAD) offers one of the most generous scholarship programmes for international students. Germany's public universities charge no tuition fees, and DAAD tops this up with a living allowance.

**What it covers:** Monthly stipend of approximately €861, health insurance, travel allowance, and German language course.

**Eligibility:** Bachelor's degree with strong academic record. Some programmes require German language proficiency.

## 3. Commonwealth Scholarship (United Kingdom)

Funded by the UK government, Commonwealth Scholarships are available to citizens of Commonwealth countries for Master's and PhD study at UK universities.

**What it covers:** Full tuition, living allowance, airfare, thesis grant, and warm clothing allowance.

**Eligibility:** Commonwealth citizen with a first-class undergraduate degree.

## 4. Fulbright Foreign Student Program (USA)

The Fulbright Program is America's flagship international exchange programme, offering scholarships for graduate study, research, and teaching in the United States.

**What it covers:** Tuition, living stipend, health insurance, travel, and enrichment activities.

**Eligibility:** Bachelor's degree, English proficiency, strong academic record, and leadership qualities.

## 5. Australia Awards Scholarship

Funded by the Australian Government, Australia Awards support students from developing countries to undertake full-time undergraduate or postgraduate studies in Australia.

**What it covers:** Full tuition, return airfare, living allowance, health cover, and pre-course English training if required.

**Eligibility:** Citizens of eligible developing countries, with a minimum of 2 years work experience for most awards.

## 6. Erasmus Mundus Joint Masters

The Erasmus Mundus programme funds international students to study across multiple European universities, earning a jointly awarded master's degree.

**What it covers:** Tuition waiver, monthly living allowance of €1,400, travel and installation costs.

**Eligibility:** Bachelor's degree in a relevant field, English or French proficiency depending on programme.

## 7. MasterCard Foundation Scholars Program

This transformative scholarship programme supports talented but financially disadvantaged African students to access quality higher education.

**What it covers:** Full tuition, accommodation, meals, books, transport, health insurance, and mentoring.

**Eligibility:** Must be African, demonstrate financial need and academic excellence, and commit to giving back to Africa.

## 8. Swedish Institute Scholarships for Global Professionals

The Swedish Institute offers scholarships to future global leaders from selected countries to study Master's programmes in Sweden.

**What it covers:** Tuition fee waiver, living expenses, travel grant, and insurance.

**Eligibility:** Bachelor's degree, minimum 3,000 hours of work experience, strong leadership record.

## 9. Gates Cambridge Scholarship

One of the most prestigious scholarships in the world, the Gates Cambridge Scholarship funds outstanding students from outside the UK to study at the University of Cambridge.

**What it covers:** Full tuition, living allowance, return flights, visa costs, family allowance, and development funding.

**Eligibility:** Exceptional academic record, strong leadership and commitment to improving the lives of others.

## 10. Vanier Canada Graduate Scholarship

Canada's most prestigious doctoral scholarship, the Vanier CGS attracts world-class PhD students to Canadian universities.

**What it covers:** CAD $50,000 per year for three years.

**Eligibility:** Canadian or international students nominated by a Canadian university. Outstanding academic achievement and leadership.

## How to Maximise Your Chances

- **Start early:** Most deadlines are 6-12 months before the programme starts
- **Research thoroughly:** Understand each scholarship's values and tailor your application accordingly
- **Get strong references:** Ask recommenders who know your work well, not just senior people
- **Tell your story:** Scholarship committees want to know your unique journey and vision
- **Apply to multiple scholarships:** Don't put all your eggs in one basket

## Final Thoughts

Fully funded scholarships are competitive but absolutely achievable for motivated African students. Thousands of Africans win these awards every year. Use our scholarship search tool to find opportunities that match your profile and start your application today.`,
  },
  {
    title: 'How to Write a Winning Scholarship Personal Statement',
    category: 'Tips',
    excerpt: 'Learn the step-by-step process for writing a compelling scholarship personal statement that stands out from thousands of applicants.',
    content: `## What Is a Scholarship Personal Statement?

A scholarship personal statement — also called a motivation letter or statement of purpose — is one of the most important parts of your scholarship application. It is your opportunity to tell your story, explain why you deserve the award, and show how you will use the opportunity to make a difference.

In a sea of applications with similar grades and qualifications, your personal statement is what makes you memorable.

## The Golden Rule: Show, Don't Tell

The biggest mistake applicants make is writing vague statements like "I am passionate about development" or "I have always wanted to help my community."

Instead, show the committee through specific stories and evidence.

**Weak:** "I am committed to improving healthcare in Africa."

**Strong:** "When my younger sister died of malaria because the nearest clinic was 40 kilometres away, I promised myself I would spend my life building healthcare infrastructure that reaches the last mile."

## Structure Your Personal Statement Effectively

### 1. The Opening Hook (1 paragraph)

Start with a specific moment, story, or observation that reveals your motivation. This should capture attention immediately.

Examples of strong openings:
- A defining personal experience
- A problem you witnessed that shaped your worldview
- A moment of realisation that changed your direction

### 2. Your Background and Qualifications (1-2 paragraphs)

Summarise your most relevant academic and professional achievements. Be specific — use numbers, awards, and outcomes where possible.

Connect everything back to your goals. Don't just list achievements; explain what they taught you and how they prepared you.

### 3. Why This Scholarship and Programme (1 paragraph)

Show you have done your research. Mention:
- Specific modules, professors, or research groups at the university
- How the scholarship's values align with yours
- Why this particular award matters to you

This paragraph proves you are applying strategically, not just sending the same letter to every scholarship.

### 4. Your Future Goals and Impact (1-2 paragraphs)

Be specific about what you will do after graduating:
- What role or organisation will you work with?
- What specific problem will you address?
- How will your home community or country benefit?

Vague answers like "I will give back to my country" will not impress committees. Name the ministry, NGO, hospital, or company you plan to work with.

### 5. The Closing Paragraph

End with confidence. Reiterate your core message — who you are, what you will do, and why you are ready for this opportunity. Express gratitude without sounding desperate.

## Common Mistakes to Avoid

- **Exceeding the word limit:** Committees see this as an inability to follow instructions
- **Starting with "I was born in...":** Jump straight into your story
- **Using jargon:** Write clearly so anyone can understand your work
- **Copying templates:** Committees can spot generic letters immediately
- **Focusing too much on the past:** Balance your history with your future vision
- **Ignoring instructions:** Read the guidelines multiple times before writing

## Practical Tips for Writing

1. **Write multiple drafts:** Never submit your first draft
2. **Read it aloud:** This helps you catch awkward phrases
3. **Get feedback:** Ask a teacher, mentor, or native English speaker to review it
4. **Check for grammar:** Use Grammarly or similar tools
5. **Tailor it for every scholarship:** Never send the exact same letter twice

## Final Checklist Before Submitting

- Does the opening grab attention?
- Have you told a specific, personal story?
- Is every claim backed by evidence?
- Have you explained why THIS scholarship specifically?
- Are your future plans concrete and detailed?
- Is it within the word limit?
- Has someone else proofread it?

Use our SOP Generator tool to get a structured template tailored to your field and target scholarship.`,
  },
  {
    title: 'Complete Guide to the Chevening Scholarship Application',
    category: 'Scholarships',
    excerpt: 'Everything African students need to know about applying for the prestigious Chevening Scholarship — eligibility, timeline, essays, and insider tips.',
    content: `## What Is the Chevening Scholarship?

The Chevening Scholarship is the UK government's flagship international scholarship programme, funded by the Foreign, Commonwealth and Development Office (FCDO). It awards fully funded Master's degrees at any UK university to exceptional individuals who demonstrate leadership potential and a commitment to creating positive change in their countries.

Since 1983, over 50,000 people have been awarded Chevening Scholarships, creating a global network of leaders across every sector.

## What Does Chevening Cover?

Chevening is one of the most comprehensive scholarships available:

- **Full tuition fees** — no limit on course cost
- **Monthly living allowance** — enough to live comfortably in the UK
- **Return economy flights** — from your home country
- **Arrival and departure allowance**
- **Visa application fee**
- **Travel grants** — for Chevening events in the UK

## Eligibility Requirements

To be eligible for Chevening, you must:

- Be a citizen of a Chevening-eligible country (most African countries qualify)
- Return to your home country for at least two years after your scholarship
- Have an undergraduate degree equivalent to a UK 2:1 (upper second-class honours)
- Have at least **two years of work experience** (2,800 hours)
- Apply to three eligible UK university courses and receive an offer from at least one

## The Four Chevening Essays

The heart of the Chevening application is four essays, each around 500 words:

### 1. Leadership and Influence Essay
Describe a situation where you demonstrated leadership and influenced people around you. Use a specific example and explain the impact.

### 2. Networking Essay
Describe a time when you built and used a professional network to achieve a goal. Explain how you will use the Chevening network.

### 3. Studying in the UK Essay
Why do you want to study in the UK specifically? What will you gain that you couldn't get elsewhere?

### 4. Career Plan Essay
Where do you want to be in 10 years? How will a Chevening Scholarship help you get there?

## Tips for Winning Chevening Essays

- **Be specific:** Use real examples with real outcomes
- **Show leadership:** Every essay should reflect your ability to lead and inspire
- **Connect to Chevening's values:** Leadership, networking, UK study, and positive change
- **Quantify impact:** "I trained 45 community health workers" is stronger than "I trained many people"
- **Show your plan:** Chevening wants to invest in people with a clear vision

## The Application Timeline

- **August:** Applications open
- **November:** Application deadline (usually first Tuesday of November)
- **February-April:** Interviews for shortlisted candidates
- **June:** Final selections announced
- **September/October:** Scholars arrive in the UK

## Common Reasons for Rejection

- Insufficient work experience
- Vague or generic essays
- No clear connection between the course chosen and career goals
- Applying to courses that don't relate to your professional background
- Missing or incorrect supporting documents

## Interview Tips

If shortlisted, you'll be interviewed by a panel at the British High Commission or Embassy in your country:

- Dress professionally
- Know your essays thoroughly — they will ask follow-up questions
- Be ready to discuss current events in your country and sector
- Explain specifically how you will use Chevening to benefit your country
- Show enthusiasm for the UK and for building UK-Africa relationships

## Final Advice

Chevening is not just looking for the best academic students — they want people who will become leaders and use their UK experience to create positive change. Focus your entire application on demonstrating that you are that person.

Start preparing at least three months before the deadline. Use our application checklist to track every requirement.`,
  },
  {
    title: 'How to Get a UK Student Visa as an African Student',
    category: 'Visa',
    excerpt: 'A complete step-by-step guide to applying for a UK Student visa (formerly Tier 4) as an African student, including documents, costs, and common mistakes.',
    content: `## Understanding the UK Student Visa

The UK Student visa (formerly known as the Tier 4 General student visa) allows international students to study in the UK at a licensed institution. If you have been accepted at a UK university and plan to study a course longer than 6 months, you will need this visa.

This guide walks you through every step of the process.

## Step 1: Receive Your CAS (Confirmation of Acceptance for Studies)

Before you can apply for your visa, your university must send you a CAS number. This is a unique reference number that your university generates once you have accepted your offer and met all conditions.

The CAS contains important information including:
- Your course details
- Course start and end dates
- Tuition fee amounts
- Your university's Sponsor Licence number

Keep this number safe — you will need it throughout the application.

## Step 2: Check Your Eligibility

To apply for a UK Student visa, you must:

- Have a CAS from a licensed UK university
- Have enough money to support yourself (usually £1,334/month for London or £1,023/month outside London, for up to 9 months)
- Prove your English language ability (IELTS, TOEFL, or equivalent)
- Be a genuine student intending to study in the UK

## Step 3: Gather Your Documents

Prepare the following documents before starting your application:

**Essential documents:**
- Valid passport (at least 6 months beyond your planned stay)
- CAS number from your university
- Proof of English language proficiency (IELTS score of 6.0 or above for most courses)
- Financial evidence (bank statements showing funds for at least 28 consecutive days)
- Academic transcripts and certificates

**Additional documents (may be required):**
- ATAS clearance certificate (for certain sensitive subjects)
- Parental consent letter (if under 18)
- Tuberculosis test results (required for most African countries)

## Step 4: Complete Your Online Application

Visit the official UK Visas and Immigration website (gov.uk) to complete your online application form. The process takes approximately 30-60 minutes.

You will need to:
- Create a UK Visas and Immigration account
- Complete all sections of the form honestly
- Pay the visa application fee
- Pay the Immigration Health Surcharge

**Current fees (2025):**
- Visa application fee: £490
- Immigration Health Surcharge: £776 per year of study

## Step 5: Book Your Biometric Appointment

After submitting your online application, you must book an appointment at a Visa Application Centre (VAC) in your country to provide your biometric information (fingerprints and photograph).

In most African countries, appointments are available through VFS Global. Book as early as possible — slots fill up quickly, especially in August and September.

## Step 6: Attend Your Appointment

Bring all your original documents and copies to your appointment. The staff will collect your biometrics and forward your application to the UK Visas and Immigration team.

Processing times vary by country but are typically 3-8 weeks.

## Common Reasons for UK Visa Rejection

- **Insufficient funds:** Your bank statement must show the required amount for 28 consecutive days ending no more than 31 days before your application
- **Inconsistent information:** Any discrepancy between your application and documents can lead to rejection
- **Failure to demonstrate genuine student intentions:** Be prepared to explain your study plans
- **Missing tuberculosis test:** Required for most African countries
- **Applying too early or too late:** Apply no more than 6 months before your course starts

## Tips for a Successful Application

- Apply early — don't wait until the last minute
- Ensure your bank statements are clean and consistent
- Be honest in your application — any misrepresentation can lead to a ban
- Keep digital and physical copies of all documents
- Check the specific requirements for your country on the UK government website

## After Your Visa Is Approved

Once approved, you will receive a vignette sticker in your passport valid for 30 days. You must collect your Biometric Residence Permit (BRP) within 10 days of arriving in the UK.

Congratulations — your UK journey begins!`,
  },
  {
    title: 'Studying in Germany for Free: Complete Guide for African Students',
    category: 'Destinations',
    excerpt: 'Germany offers free tuition at public universities. Here is everything African students need to know about studying in Germany, from applications to visas.',
    content: `## Why Study in Germany?

Germany is one of the most popular study destinations for African students — and for good reason. Public universities in Germany charge little to no tuition fees, even for international students. This makes Germany one of the most affordable places in the world to earn a world-class degree.

With over 400 universities, 20,000+ English-taught programmes, and a booming economy, Germany offers extraordinary opportunities for ambitious African students.

## Tuition Fees in Germany

Most public universities in Germany charge only a semester contribution fee of €150-350 per semester. This covers:
- Administration costs
- A public transport ticket for the semester
- Student union fees

There is no tuition fee in the traditional sense at most German public universities.

**Note:** Baden-Württemberg charges non-EU international students €1,500 per semester. Check your specific state's policy.

## Top German Universities for International Students

- **Technical University of Munich (TUM)** — Engineering, technology, natural sciences
- **Ludwig Maximilian University of Munich (LMU)** — Humanities, sciences, medicine
- **Heidelberg University** — Research-intensive, life sciences
- **Freie Universität Berlin** — Social sciences, humanities, natural sciences
- **RWTH Aachen** — Engineering and technology

## Language Requirements

**For German-taught programmes:**
- German language certificate: TestDaF (level 4) or DSH (level 2)
- Many universities offer preparatory language courses (Studienkolleg)

**For English-taught programmes:**
- IELTS: 6.0-7.0 or TOEFL iBT: 80-100
- Germany has over 1,500 English-taught Master's programmes

## Application Process

### Step 1: Choose Your Programme
Search for programmes on:
- DAAD's database (daad.de)
- Hochschulstart (for medicine and highly competitive courses)
- Uni-Assist (application portal for many universities)

### Step 2: Check Entry Requirements
Each university sets its own requirements. Generally you need:
- Bachelor's degree in a related field (minimum grade equivalent to German 2.5 or better)
- Language proficiency certificate
- Motivation letter
- Letters of recommendation

### Step 3: Apply Through Uni-Assist or Directly
Many German universities use Uni-Assist to process international applications. Submit your documents well before the deadline.

**Typical deadlines:**
- Winter semester (October start): May 15 - July 15
- Summer semester (April start): November 15 - January 15

## The German Student Visa

African students need a German student visa. The process:

1. Apply at the German Embassy or Consulate in your country
2. Required documents: admission letter, proof of financial resources (€11,208 per year in a blocked account), health insurance, language certificate, passport
3. Blocked account: Open a blocked account (Sperrkonto) with Deutsche Bank, Fintiba, or Expatrio — €11,208 must be deposited

**Processing time:** 4-12 weeks. Apply early.

## Cost of Living in Germany

- **Rent:** €300-600/month (varies greatly by city)
- **Food:** €200-300/month
- **Transport:** Often included in semester ticket
- **Health insurance:** €110-120/month
- **Total:** Approximately €800-1,200/month

**Cheapest cities:** Leipzig, Dresden, Chemnitz, Halle
**Most expensive cities:** Munich, Frankfurt, Hamburg

## DAAD Scholarships

The German Academic Exchange Service (DAAD) offers numerous scholarships for African students:

- **DAAD Development-Related Postgraduate Courses:** Full funding for Master's students from developing countries
- **Helmut Schmidt Programme:** For public policy students
- **DAAD-APPEAR:** For students from selected African countries

Visit daad.de to explore all available scholarships.

## Working While Studying

International students in Germany can work up to 120 full days or 240 half days per year. The minimum wage is approximately €12.41/hour (2025).

## After Graduation: Job Opportunities

Germany allows international graduates to stay for 18 months to look for a job. With Germany facing a significant skills shortage, your chances of finding employment after graduation are excellent.

Germany is an exceptional destination for African students who want world-class education without the financial burden. Start your journey today.`,
  },
  {
    title: 'DAAD Scholarship 2025: Complete Application Guide for Africans',
    category: 'Scholarships',
    excerpt: 'Everything you need to know about applying for a DAAD scholarship as an African student — eligibility, documents, tips, and deadlines for 2025.',
    content: `## What Is the DAAD Scholarship?

The DAAD (Deutscher Akademischer Austauschdienst / German Academic Exchange Service) is Germany's largest scholarship organisation, offering over 100,000 scholarships annually to students and researchers worldwide.

For African students, DAAD scholarships represent one of the best opportunities to study in Germany — one of the world's top academic destinations — with full financial support.

## Types of DAAD Scholarships for Africans

### 1. DAAD Scholarships for Development-Related Postgraduate Courses
Targeted at students from developing countries pursuing Master's degrees in fields relevant to sustainable development.

**Coverage:** Monthly stipend (€934), travel allowance, health insurance, study and research allowance

### 2. Helmut Schmidt Programme
For professionals from developing and emerging countries pursuing a Master's in public policy, governance, or related fields.

**Coverage:** Full funding including tuition, stipend, and allowances

### 3. DAAD-BEBUC Scholarship (for Burundi)
Specifically for Burundian students to study at selected universities.

### 4. Graduate School Scholarships
Supports African researchers to pursue PhD studies at German universities.

### 5. Research Stays for Academics
For African academics and researchers to conduct research at German institutions.

## General Eligibility Requirements

- Bachelor's or Master's degree with excellent academic results
- Relevant work experience (usually 2+ years for postgraduate scholarships)
- Strong German or English language skills (depending on programme)
- Must be from an eligible country
- Generally under 36 years of age for postgraduate scholarships

## Required Documents

Prepare these documents well in advance:

- **Application form:** Complete online at the DAAD portal
- **Academic transcripts:** All university transcripts, officially translated
- **Degree certificates:** Bachelor's and any other degrees
- **CV/Resume:** In table format (Tabellarischer Lebenslauf)
- **Motivation letter:** 1-2 pages explaining your study plans and how you will use them
- **Two letters of recommendation:** From university professors or professional supervisors
- **Language certificate:** German (if applicable) or English (IELTS/TOEFL)
- **Proof of work experience:** Employment letters or certificates
- **University admission letter:** Or proof of application

## Application Process Step by Step

### Step 1: Choose Your Programme
Visit the DAAD scholarship database at daad.de. Filter by your country, field of study, and degree level.

### Step 2: Choose Your German University and Course
Some DAAD scholarships require you to be admitted to a specific programme first. Apply to your chosen university in parallel with the DAAD application.

### Step 3: Submit Your DAAD Application
Most applications are submitted through the DAAD portal (mydaad.de). Some scholarships require application through the DAAD office in your home country.

### Step 4: Interview
Shortlisted candidates are usually invited for an interview, either in person at the DAAD office or via video call.

### Step 5: Decision
Successful applicants are notified 4-6 months after the application deadline.

## Application Deadlines

Deadlines vary by programme. Most DAAD scholarships for the following academic year have deadlines between **October and January**.

Check the specific deadline for your chosen programme at daad.de.

## Tips for a Successful DAAD Application

- **Academic excellence matters:** DAAD is highly competitive. A strong academic record is essential
- **Relevance is key:** Show a clear connection between your studies, your career, and development in your home country
- **Quantify your experience:** Concrete achievements are more convincing than vague descriptions
- **Strong motivation letter:** Explain specifically why Germany, why this university, and how the scholarship aligns with your long-term goals
- **Excellent references:** Choose referees who know your academic or professional work closely
- **Apply early:** Don't rush your application at the last minute

## Life in Germany as a DAAD Scholar

DAAD scholars benefit from:
- A comprehensive induction programme
- The DAAD alumni network
- Support from the International Office at their university
- German language courses (if needed)
- Cultural exchange events

Germany offers a safe, high-quality, and intellectually stimulating environment. Most DAAD scholars leave with not just a degree, but lifelong friendships and professional connections.

Apply for the DAAD scholarship today and take the first step toward your German education.`,
  },
  {
    title: 'How to Study in Canada as an African Student: Complete 2025 Guide',
    category: 'Destinations',
    excerpt: 'Everything African students need to know about studying in Canada — universities, scholarships, student visa, costs, and post-graduation opportunities.',
    content: `## Why Canada Is a Top Choice for African Students

Canada consistently ranks among the world's top study destinations for international students. With world-class universities, a multicultural society, a safe environment, and clear pathways to permanent residency, it is an exceptional choice for African students.

Over 800,000 international students study in Canada — the country actively welcomes them.

## Top Canadian Universities

- **University of Toronto** — Consistently ranked in the global top 25
- **McGill University** — Strong research reputation, especially in medicine and law
- **University of British Columbia (UBC)** — Beautiful campus, strong STEM programmes
- **University of Waterloo** — World-leading in technology and engineering
- **University of Alberta** — Excellent for energy, engineering, and sciences
- **Dalhousie University** — Strong in oceanography, agriculture, and health

## Tuition Fees in Canada

International student tuition fees in Canada vary by programme and university:

- **Undergraduate programmes:** CAD $20,000-35,000/year
- **Master's programmes:** CAD $15,000-30,000/year
- **PhD programmes:** CAD $7,000-15,000/year (often covered by funding)
- **MBA programmes:** CAD $30,000-60,000/year

Professional programmes (medicine, law, dentistry) are significantly higher.

## Scholarships for African Students in Canada

### Vanier Canada Graduate Scholarship
**Value:** CAD $50,000/year for 3 years
**For:** PhD students at Canadian universities
**Deadline:** October/November

### MasterCard Foundation Scholars Program
Available at several Canadian universities including McGill, University of Calgary, and Dalhousie.
**For:** Talented but financially disadvantaged African students

### Lester B. Pearson International Scholarship
**Value:** Full funding (tuition, books, incidental fees, full residence support)
**For:** Exceptional undergraduate applicants demonstrating leadership

### University-Specific Scholarships
Most Canadian universities offer merit-based scholarships for international students. Check each university's financial aid office.

## The Canadian Student Visa (Study Permit)

To study in Canada, African students need a Study Permit.

### Requirements:
- Letter of Acceptance from a Designated Learning Institution (DLI)
- Proof of financial support (tuition + CAD $10,000 for living expenses)
- Clean criminal record
- Good health (medical exam may be required)
- Proof of ties to home country

### Application Process:
1. Receive your acceptance letter from a Canadian university
2. Apply online through IRCC (Immigration, Refugees and Citizenship Canada)
3. Submit biometrics at a VAC in your country
4. Wait for processing (typically 4-8 weeks)

**Fee:** CAD $150

## Cost of Living in Canada

Costs vary significantly by city:

| City | Monthly Living Cost |
|------|-------------------|
| Toronto | CAD $2,000-3,000 |
| Vancouver | CAD $2,000-2,800 |
| Montreal | CAD $1,500-2,200 |
| Calgary | CAD $1,600-2,400 |
| Halifax | CAD $1,200-1,800 |

## Working While Studying

International students with a valid study permit can work up to **20 hours per week** during academic sessions and full-time during scheduled breaks.

## After Graduation: The Path to PR

Canada offers one of the clearest pathways from study to permanent residency:

1. **Post-Graduation Work Permit (PGWP):** Work in Canada for up to 3 years after graduation
2. **Canadian Experience Class (CEC):** Apply for permanent residence after gaining Canadian work experience
3. **Express Entry:** Points-based immigration system that rewards Canadian education and work

Many African students who study in Canada go on to build successful careers and lives there.

## Tips for African Students

- Apply to multiple universities to maximise scholarship opportunities
- Start your study permit application as soon as you receive your acceptance letter
- Join the African Student Association at your university
- Take advantage of campus career services from day one
- Canadian winters are severe — prepare adequately

Canada is more than a study destination — it's a place where many African students build their futures. Start your Canadian journey today.`,
  },
  {
    title: 'Commonwealth Scholarship 2025: How to Apply and Win',
    category: 'Scholarships',
    excerpt: 'A detailed guide to the Commonwealth Scholarship for African students — what it covers, how to apply, essay tips, and what selectors look for.',
    content: `## What Is the Commonwealth Scholarship?

The Commonwealth Scholarship Commission (CSC) in the UK funds talented citizens of Commonwealth countries to pursue Master's and PhD study at UK universities. Funded by the UK government through the Foreign, Commonwealth and Development Office (FCDO), it is one of the most prestigious and comprehensive scholarships available to African students.

Since its founding in 1959, the Commonwealth Scholarship has supported over 30,000 scholars from across the Commonwealth.

## What the Commonwealth Scholarship Covers

The Commonwealth Scholarship is truly comprehensive:

- **Full tuition fees** — paid directly to your university
- **Airfare** — return economy flights from your home country
- **Living allowance** — generous monthly stipend to cover rent and living expenses
- **Warm clothing allowance** — one-time payment for students arriving from warm climates
- **Thesis grant** — for PhD scholars
- **Study travel grant** — to support fieldwork or conference attendance

## Types of Commonwealth Scholarships

### 1. Commonwealth Master's Scholarships
For citizens of low and middle income Commonwealth countries to study a full-time Master's degree at a UK university.

### 2. Commonwealth PhD Scholarships
For students from low and middle income Commonwealth countries to pursue a PhD at a UK university.

### 3. Commonwealth Split-Site PhD Scholarships
Allows PhD students registered at a university in a low or middle income Commonwealth country to spend 12 months at a UK university.

### 4. Commonwealth Distance Learning Scholarships
For students to study part-time distance learning Master's programmes from UK universities while remaining in their home countries.

## Eligibility Requirements

- Citizen of an eligible Commonwealth country (most African countries qualify)
- Permanent resident in your home country
- Hold a first-class or upper second-class (2:1) undergraduate degree — or a lower qualification plus a Master's degree
- Be unable to afford to study in the UK without this scholarship
- Demonstrate potential to positively impact development in your home country

## The Application Process

### Step 1: Choose Your UK University and Course
Commonwealth Scholars can study at any accredited UK university. Research programmes aligned with your career goals and the Commonwealth's development priorities.

### Step 2: Apply Through Your Nominating Agency
Applications are submitted through your country's nominating agency — typically the Ministry of Education, National Commission, or equivalent body. Apply in your home country first.

### Step 3: Complete the CSC Online Application
Shortlisted nominees are invited to complete a full online application through the CSC portal, including:
- Personal statement
- Research proposal (for PhD applicants)
- Academic references
- Development impact statement

### Step 4: Notification
Successful candidates are typically notified by June for courses starting in September/October.

## What Selectors Look For

The CSC evaluates candidates on three key criteria:

1. **Academic merit:** Strong undergraduate grade (first class preferred), relevant postgraduate experience
2. **Quality of the plan for study in the UK:** A well-defined research or study plan with clear academic objectives
3. **Potential development impact:** How will your UK education contribute to development in your home country or wider Commonwealth?

The third criterion is often what distinguishes winning applications.

## Writing Your Development Impact Statement

This is the most important and distinctive element of a Commonwealth Scholarship application:

- Be specific about the problem you will address
- Explain how your UK degree will equip you to address it
- Describe concrete actions you will take after returning home
- Reference your home country's development challenges
- Show evidence of existing work in your field

Vague answers like "I will contribute to my country's development" are not sufficient. Name the ministry, programme, or organisation you will work with.

## Interview Tips

Some nominating agencies conduct interviews before forwarding nominations:

- Know your application inside out
- Be ready to discuss development issues in your country
- Explain why you chose your specific course and university
- Demonstrate humility and a commitment to returning home
- Show enthusiasm for the Commonwealth's values

## Timeline

- **August-October:** Applications open through national nominating agencies
- **December:** Nominations submitted to CSC
- **March-April:** CSC makes final decisions
- **June:** Scholars notified
- **September/October:** Scholars arrive in the UK

The Commonwealth Scholarship is not just a degree — it is membership in a global network of change-makers. Apply with your whole story.`,
  },
  {
    title: 'How to Write a Statement of Purpose (SOP) for Graduate School',
    category: 'Application',
    excerpt: 'A complete guide to writing a powerful statement of purpose for graduate school applications, with examples and templates for African students.',
    content: `## What Is a Statement of Purpose?

A Statement of Purpose (SOP) — also called a research statement, personal statement, or letter of intent — is a critical component of graduate school applications. It tells admissions committees who you are, what you want to study, why you want to study it, and what you bring to their programme.

For African students applying to international universities, a strong SOP can be the deciding factor, especially when competing against applicants with similar academic profiles.

## How Long Should an SOP Be?

Most programmes request an SOP of 500-1,000 words (1-2 pages, single-spaced). Always follow the specific guidelines of each programme. When no limit is given, aim for 800-1,000 words.

## The Ideal Structure

### Opening Paragraph: The Hook
Start with something specific and compelling — a defining moment, a question that drives you, or a problem you encountered. Avoid clichés like "Since childhood, I have always been passionate about..."

**Example of a weak opening:**
"I am writing to apply for the Master's programme in Public Health because I have always wanted to help people."

**Example of a strong opening:**
"In 2019, I watched my hospital's single ventilator be manually operated in shifts by nurses for 72 hours because we had no power — and our patient survived. That experience showed me both the resilience of African healthcare workers and the urgent need for sustainable healthcare infrastructure solutions."

### Academic Background (1-2 paragraphs)
Summarise your undergraduate education and most relevant coursework. Highlight:
- Your GPA or class rank (if strong)
- Relevant thesis or research projects
- Awards or academic distinctions
- Key courses that prepared you for graduate study

Connect your academic background to your proposed graduate study.

### Research or Professional Experience (1-2 paragraphs)
Describe your most relevant research, internships, or professional experience. Be specific:
- What was the project or role?
- What methods did you use?
- What were the outcomes or findings?
- What did you learn that you will bring to graduate school?

### Why This Programme and University (1 paragraph)
This paragraph is where most applicants fail. Show genuine research:
- Name specific faculty members whose work interests you
- Mention specific courses, labs, or research centres
- Explain why this programme fits your goals better than others

Do NOT send the same paragraph to every university. Admissions committees can tell.

### Future Goals (1 paragraph)
Where do you want to be in 5-10 years? Be specific:
- What career path are you pursuing?
- What problem do you want to solve?
- How will this graduate degree help you get there?

### Closing Paragraph
Bring everything together. Reiterate your passion, your readiness, and your fit for the programme. Express enthusiasm without desperation.

## Common SOP Mistakes

- **Starting with "I was born in..."** — Jump straight to your academic story
- **Listing everything on your CV** — Select the most relevant experiences and analyse them
- **Being vague about research interests** — "I want to study public health broadly" is not enough
- **Failing to name faculty** — Shows you haven't researched the programme
- **Exceeding the word limit** — Shows inability to follow instructions
- **Using passive voice** — Write actively: "I designed" not "a study was designed"
- **Submitting without proofreading** — Grammar errors destroy credibility

## SOP Template for African Students

**Paragraph 1 (Hook/Intro):** Specific story or moment that shaped your academic interest

**Paragraph 2 (Academic background):** Undergraduate degree, relevant courses, academic achievements

**Paragraph 3 (Research/work experience):** Most relevant project or job — what you did, learned, and achieved

**Paragraph 4 (Why this programme):** Faculty, courses, labs, unique features of this specific programme

**Paragraph 5 (Future goals):** Career plans, problems you will address, how this degree helps

**Paragraph 6 (Closing):** Synthesis and enthusiasm

## Tips for International Students

- Have a native English speaker proofread your SOP
- Translate any technical terms clearly
- Explain your country's grading system if it differs from the destination country's
- Don't be afraid to mention challenges you've overcome — resilience is valued

Use our SOP Generator tool to get a personalised template based on your field and target university.`,
  },
  {
    title: 'Fulbright Scholarship: Complete Application Guide for African Students',
    category: 'Scholarships',
    excerpt: 'Everything African students need to know about the Fulbright Foreign Student Program — eligibility, application tips, essays, and how to stand out.',
    content: `## What Is the Fulbright Scholarship?

The Fulbright Program is the United States government's flagship international educational exchange programme, established in 1946. Named after Senator J. William Fulbright, it is one of the most prestigious scholarships in the world, operating in over 160 countries.

The **Fulbright Foreign Student Program** brings students from around the world to the United States to pursue Master's or PhD degrees at American universities.

## What Fulbright Covers

The Fulbright Foreign Student Program is fully funded:

- **Full tuition and fees** at a US university
- **Monthly living stipend** to cover accommodation and daily expenses
- **Health insurance**
- **Return airfare** from your home country
- **Book allowance**
- **Enrichment activities** — conferences, cultural events, and professional development

## Eligibility Requirements

Eligibility varies slightly by country, but generally:

- Citizen and resident of an eligible country (most African countries have active Fulbright programmes)
- Bachelor's degree (minimum)
- English proficiency (TOEFL or IELTS)
- Strong academic record
- Leadership qualities and community engagement
- Commitment to returning to your home country after the award

## The Application Process

### Step 1: Contact Your Country's Fulbright Commission or US Embassy
The Fulbright programme is administered locally in most countries by a Fulbright Commission or the US Embassy's Public Affairs section. Contact them to get country-specific information and deadlines.

### Step 2: Prepare Your Application Materials
A typical Fulbright application includes:
- Online application form
- Personal statement (see below)
- Study/research objective statement
- Three letters of recommendation
- Academic transcripts
- Language proficiency test scores
- CV/Resume

### Step 3: Submit Your Application
Most countries have a single annual deadline, typically between **February and October** (varies by country). Check your country's specific deadline.

### Step 4: Selection Process
Applications are reviewed at three levels:
1. National screening (in your home country)
2. US Embassy review
3. J. William Fulbright Foreign Scholarship Board (final selection)

## The Fulbright Personal Statement

The personal statement is one of the most important parts of your application. It should:

- Tell your personal story authentically
- Explain your academic and professional journey
- Connect your past experiences to your proposed study
- Describe your goals after returning home
- Show how you will be an ambassador for your country in the US

**Key tip:** Fulbright is not just looking for academic excellence. They want people who will build mutual understanding between Americans and people of other countries. Show cultural curiosity and a commitment to people-to-people exchange.

## The Study/Research Objective Statement

This is a more academic document that:
- Describes your proposed course of study or research
- Explains why you need to study in the US specifically
- Identifies US universities with relevant programmes and faculty
- Shows how your study fits with development needs in your home country

**Research specific professors and programmes** in the US that align with your work. Admissions officers can tell when applicants haven't done their homework.

## Choosing Your US Universities

Fulbright allows you to suggest up to four universities. Tips for selection:

- Choose universities with strong programmes in your field
- Look for faculty whose research aligns with yours
- Consider geographic diversity — don't only apply to Harvard and MIT
- Include at least one university outside major cities (Fulbright appreciates this)
- Research each university's international student community and support

## What Makes a Winning Fulbright Application?

- **Authentic voice:** Write in your own voice, not what you think they want to hear
- **Specific goals:** Vague ambitions are less compelling than concrete plans
- **Development relevance:** Show how your US education will benefit your country
- **Leadership record:** Demonstrate that you have made a difference already
- **Strong references:** References from people who know your work well

## Countries with Active Fulbright Programmes in Africa

Nigeria, Ghana, Kenya, Tanzania, Ethiopia, Senegal, Côte d'Ivoire, Cameroon, Rwanda, Uganda, Zambia, Zimbabwe, Mozambique, and many more — check the US Embassy in your country for details.

## Timeline for African Applicants

- **Check your country's deadline:** Varies from February to October
- **Prepare your application:** Give yourself at least 3 months
- **Request references early:** Give recommenders at least 6 weeks notice
- **Take English test:** TOEFL or IELTS scores must be current

The Fulbright experience extends far beyond the classroom. Fulbright scholars become part of a global community of leaders. Many of the world's most influential figures are Fulbright alumni. Start your application today.`,
  },
];

// Generate remaining 40 posts
const additionalPosts = [
  { title: 'Australia Awards Scholarship: How to Apply as an African Student', category: 'Scholarships', excerpt: 'A complete guide to the Australia Awards Scholarship for African students — eligibility, application process, and tips for success.' },
  { title: 'How to Get a Germany Student Visa: Step-by-Step Guide', category: 'Visa', excerpt: 'Everything you need to know about applying for a German student visa as an African student, including blocked account, documents, and processing times.' },
  { title: 'Top Scholarships for Nigerian Students in 2025', category: 'Scholarships', excerpt: 'The best scholarship opportunities specifically available to Nigerian students — local and international, undergraduate and postgraduate.' },
  { title: 'Top Scholarships for Ghanaian Students in 2025', category: 'Scholarships', excerpt: 'Discover the best scholarship opportunities for Ghanaian students to study abroad in 2025, from fully funded to partial awards.' },
  { title: 'Top Scholarships for Kenyan Students in 2025', category: 'Scholarships', excerpt: 'The best international scholarship opportunities available to Kenyan students in 2025 — fully funded and partial awards.' },
  { title: 'How to Apply for the Rhodes Scholarship', category: 'Scholarships', excerpt: 'A detailed guide to applying for the prestigious Rhodes Scholarship at Oxford University — one of the world\'s oldest and most competitive scholarships.' },
  { title: 'IELTS for Scholarship Applications: Everything You Need to Know', category: 'Tips', excerpt: 'How to prepare for IELTS for scholarship and university applications — scores required, preparation tips, and how to improve your band score.' },
  { title: 'How to Ask for a Recommendation Letter for Scholarships', category: 'Tips', excerpt: 'A practical guide to requesting strong recommendation letters for scholarship applications — who to ask, how to ask, and what to provide.' },
  { title: 'Study in the Netherlands: Guide for African Students', category: 'Destinations', excerpt: 'Everything African students need to know about studying in the Netherlands — universities, scholarships, visa, and cost of living.' },
  { title: 'Orange Tulip Scholarship: How to Apply', category: 'Scholarships', excerpt: 'A complete guide to the Orange Tulip Scholarship for African students wanting to study in the Netherlands.' },
  { title: 'How to Write a Motivation Letter for Scholarships', category: 'Application', excerpt: 'A step-by-step guide to writing a compelling motivation letter for scholarship applications, with examples and templates.' },
  { title: 'Scholarships That Do Not Require IELTS or TOEFL', category: 'Scholarships', excerpt: 'Discover fully funded scholarships available to African students that do not require IELTS or TOEFL — and how to qualify.' },
  { title: 'Study in France: Guide for African Students', category: 'Destinations', excerpt: 'Everything you need to know about studying in France as an African student — universities, scholarships, visa, and language requirements.' },
  { title: 'Eiffel Excellence Scholarship France: How to Apply', category: 'Scholarships', excerpt: 'A complete application guide for the Eiffel Excellence Scholarship, one of France\'s most prestigious awards for international students.' },
  { title: 'Study in Sweden: Complete Guide for African Students', category: 'Destinations', excerpt: 'Everything African students need to know about studying in Sweden — universities, scholarships, student visa, and cost of living.' },
  { title: 'Swedish Institute Scholarship: Application Guide', category: 'Scholarships', excerpt: 'How to apply for the Swedish Institute Scholarship — one of Scandinavia\'s most generous awards for international students.' },
  { title: 'How to Study Abroad for Free as an African Student', category: 'Tips', excerpt: 'Practical strategies for African students to study internationally without paying tuition — from free-tuition countries to full scholarships.' },
  { title: 'Best Countries for African Students to Study Abroad in 2025', category: 'Destinations', excerpt: 'A ranked guide to the best study destinations for African students in 2025, based on scholarships, quality of education, and immigration pathways.' },
  { title: 'How to Prepare for a Scholarship Interview', category: 'Tips', excerpt: 'Everything you need to know to ace your scholarship interview — common questions, preparation strategies, and what selectors are looking for.' },
  { title: 'Erasmus Mundus Scholarship: Complete Application Guide', category: 'Scholarships', excerpt: 'How to apply for an Erasmus Mundus Joint Master scholarship — one of the best funded international scholarships for African students.' },
  { title: 'Gates Cambridge Scholarship: How to Apply and Win', category: 'Scholarships', excerpt: 'A comprehensive guide to applying for the Gates Cambridge Scholarship at the University of Cambridge — criteria, essays, and interview tips.' },
  { title: 'How to Build a Scholarship CV That Gets Noticed', category: 'Application', excerpt: 'Learn how to create a professional academic CV for scholarship applications, with examples, formats, and key sections.' },
  { title: 'Scholarship Rejection: How to Bounce Back and Try Again', category: 'Tips', excerpt: 'Practical advice for African students on how to handle scholarship rejection, learn from feedback, and improve future applications.' },
  { title: 'PhD Scholarships for African Students: Complete Guide 2025', category: 'Scholarships', excerpt: 'The best fully funded PhD scholarship opportunities for African students in 2025, with application tips and deadlines.' },
  { title: 'How to Find Scholarships in Your Field of Study', category: 'Tips', excerpt: 'A practical guide to finding scholarships relevant to your specific field — engineering, health, law, business, agriculture, and more.' },
  { title: 'UN Internships for African Students: How to Apply', category: 'Scholarships', excerpt: 'A guide to applying for United Nations internship programmes as an African student — eligibility, application process, and tips.' },
  { title: 'World Bank Scholarship: How to Apply', category: 'Scholarships', excerpt: 'Everything you need to know about the World Bank Group\'s scholarship and fellowship programmes for students from developing countries.' },
  { title: 'Study in South Korea: Guide for African Students', category: 'Destinations', excerpt: 'A complete guide for African students wanting to study in South Korea — universities, the GKS scholarship, visa, and cost of living.' },
  { title: 'Korean Government Scholarship (GKS/KGSP): How to Apply', category: 'Scholarships', excerpt: 'A detailed guide to applying for the Korean Government Scholarship Programme as an African student, including documents and tips.' },
  { title: 'Study in Japan: Complete Guide for African Students', category: 'Destinations', excerpt: 'Everything African students need to know about studying in Japan — MEXT scholarship, universities, visa, language, and culture.' },
  { title: 'MEXT Scholarship Japan: How to Apply as an African Student', category: 'Scholarships', excerpt: 'A step-by-step guide to applying for the Japanese Government (MEXT) Scholarship as an African student.' },
  { title: 'Study in China: Guide for African Students 2025', category: 'Destinations', excerpt: 'A comprehensive guide to studying in China as an African student — Chinese Government Scholarship, universities, visa, and life in China.' },
  { title: 'Chinese Government Scholarship: Application Guide for Africans', category: 'Scholarships', excerpt: 'How to apply for the Chinese Government Scholarship as an African student — types, eligibility, documents, and tips.' },
  { title: 'Student Visa Interview Tips for African Students', category: 'Visa', excerpt: 'How to prepare for and pass your student visa interview — common questions, dos and don\'ts, and what visa officers look for.' },
  { title: 'How to Write a Research Proposal for PhD Scholarships', category: 'Application', excerpt: 'A complete guide to writing a compelling research proposal for PhD scholarship applications — structure, tips, and common mistakes.' },
  { title: 'Undergraduate Scholarships for African Students in 2025', category: 'Scholarships', excerpt: 'The best fully funded undergraduate scholarship opportunities for African students in 2025, with application tips.' },
  { title: 'Scholarships for African Women in STEM 2025', category: 'Scholarships', excerpt: 'The best scholarship opportunities specifically for African women studying science, technology, engineering, and mathematics.' },
  { title: 'How to Get a US Student Visa (F-1) as an African Student', category: 'Visa', excerpt: 'A complete guide to applying for an F-1 student visa to study in the United States as an African student.' },
  { title: 'How to Get a Canadian Study Permit as an African Student', category: 'Visa', excerpt: 'Step-by-step guide to applying for a Canadian Study Permit as an African student — documents, process, and tips.' },
  { title: 'MasterCard Foundation Scholars Program: How to Apply', category: 'Scholarships', excerpt: 'Everything you need to know about the MasterCard Foundation Scholars Program — partner universities, eligibility, and application tips.' },
];

async function generateContent(title, category) {
  return `## Introduction

This article provides a comprehensive guide on ${title.toLowerCase()}. As an African student navigating the complex world of international education and scholarships, having reliable, detailed information is essential to your success.

## Key Information

Understanding the landscape is the first step. Whether you are looking for funding opportunities, visa information, or practical application tips, this guide covers everything you need to know.

## Who Is This For?

This guide is specifically tailored for African students who are:
- Looking to study abroad
- Applying for international scholarships
- Seeking guidance on visa applications
- Building their academic and professional profile

## Step-by-Step Guide

### Step 1: Research Thoroughly
Begin by gathering all available information about your target opportunity. Visit official websites, read success stories from past recipients, and join online communities of scholars and applicants.

### Step 2: Prepare Your Documents
Every application requires a set of documents. Typically these include:
- Academic transcripts and certificates
- Proof of English language proficiency (IELTS or TOEFL)
- Letters of recommendation from academic or professional referees
- Personal statement or motivation letter
- CV or resume

### Step 3: Write Compelling Application Materials
Your personal statement and motivation letter are often the most important parts of your application. Be specific, authentic, and clear about your goals and how this opportunity will help you achieve them.

### Step 4: Submit Early
Never wait until the deadline. Technical issues, missing documents, and last-minute problems can derail a strong application. Submit at least 2 weeks before the deadline.

### Step 5: Follow Up
After submitting, confirm receipt of your application and follow any additional instructions from the institution or scholarship organisation.

## Common Mistakes to Avoid

- Submitting a generic application that is not tailored to the specific opportunity
- Missing the deadline
- Providing inaccurate information
- Choosing referees who do not know your work well
- Ignoring the specific criteria and values of the scholarship or institution

## Tips for Success

- Start your preparation at least 6 months in advance
- Join online forums and communities of African students studying abroad
- Reach out to current scholars or alumni for advice
- Use all available resources — our tools section has free SOP generators, CV guides, and application checklists
- Stay organised with a dedicated tracker for all your applications and deadlines

## Resources

Use our free tools to strengthen your application:
- **SOP Generator:** Get a personalised statement of purpose template
- **CV Guide:** Learn how to format your academic CV
- **Application Checklist:** Never miss a required document
- **Visa Tips:** Prepare for your student visa application and interview

## Final Thoughts

Success in scholarship applications and international education requires persistence, preparation, and a clear sense of purpose. Thousands of African students win fully funded scholarships every year — with the right preparation, you can be one of them.

Browse our scholarship database to find opportunities that match your profile, and use our tools to prepare the strongest possible application.`;
}

async function seedBlog() {
  console.log('Seeding blog posts...');

  // Create settings table if needed
  try {
    await db.execute({ sql: `CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)`, args: [] });
  } catch {}

  let added = 0, skipped = 0;

  // Seed detailed posts
  for (const post of posts) {
    const postSlug = slug(post.title);
    try {
      const existing = await db.execute({ sql: 'SELECT id FROM blog_posts WHERE slug = ?', args: [postSlug] });
      if (existing.rows.length) { skipped++; continue; }
      await db.execute({
        sql: `INSERT INTO blog_posts (title, slug, excerpt, content, category, author, is_published) VALUES (?, ?, ?, ?, ?, ?, 1)`,
        args: [post.title, postSlug, post.excerpt, post.content, post.category, 'ScholarPath Team'],
      });
      added++;
      console.log(`✓ Added: ${post.title}`);
    } catch (e) { console.error(`✗ Failed: ${post.title}`, e.message); skipped++; }
  }

  // Seed additional posts with generated content
  for (const post of additionalPosts) {
    const postSlug = slug(post.title);
    try {
      const existing = await db.execute({ sql: 'SELECT id FROM blog_posts WHERE slug = ?', args: [postSlug] });
      if (existing.rows.length) { skipped++; continue; }
      const content = await generateContent(post.title, post.category);
      await db.execute({
        sql: `INSERT INTO blog_posts (title, slug, excerpt, content, category, author, is_published) VALUES (?, ?, ?, ?, ?, ?, 1)`,
        args: [post.title, postSlug, post.excerpt, content, post.category, 'ScholarPath Team'],
      });
      added++;
      console.log(`✓ Added: ${post.title}`);
    } catch (e) { console.error(`✗ Failed: ${post.title}`, e.message); skipped++; }
  }

  console.log(`\n✅ Done! Added: ${added}, Skipped: ${skipped}`);
  process.exit(0);
}

seedBlog().catch(err => { console.error(err); process.exit(1); });
