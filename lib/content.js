// lib/content.js — builds original, listing-specific guidance for each opportunity page.
// Everything here is derived from the listing's own fields plus level/type-specific advice,
// so no two pages share the same block of text.
import { deadlineInfo } from './seo'

const LEVEL_DOCS = {
  Bachelors: [
    'Certified secondary-school transcripts and your leaving certificate (WAEC, NECO, KCSE, Matric or equivalent)',
    'Proof of English proficiency if required (IELTS, TOEFL or Duolingo — check which the provider accepts)',
    'A personal statement explaining why you chose this course and how you will use it',
    'One or two references from teachers or school leaders who know your work',
  ],
  Masters: [
    'Degree certificate and full academic transcripts (translated and certified if not in English)',
    'Curriculum vitae (CV) — most European providers prefer the Europass format',
    'Motivation letter or statement of purpose tailored to this programme',
    'Two academic or professional references',
    'Proof of English proficiency if your degree was not taught in English',
  ],
  PhD: [
    'Research proposal (usually 1,500–3,000 words) aligned with a named supervisor or research group',
    'Master\'s transcripts and degree certificate',
    'Academic CV with publications, conference papers or research experience',
    'Two or three academic references, ideally from your thesis supervisor',
    'Written confirmation or interest from a supervisor — often a mandatory step before you can apply',
  ],
  Postdoc: [
    'Research statement and a list of publications',
    'Academic CV',
    'Two or three academic references',
    'Contact with the host group before applying',
  ],
}

const TYPE_ADVICE = {
  internship: [
    'Check whether the internship is paid, has a stipend, or is unpaid — unpaid roles still need a funding plan for travel, accommodation and insurance.',
    'Confirm the exact eligibility window (many internships require current enrolment or recent graduation).',
    'Tailor your CV to the department\'s work rather than sending a general version.',
  ],
  fellowship: [
    'Fellowships usually assess leadership and impact, not only grades — prepare concrete examples with numbers.',
    'Check whether you must return to your home country or sector after the fellowship.',
    'Read the selection criteria closely and answer each one explicitly in your essays.',
  ],
  conference: [
    'Check whether travel, accommodation and registration are all covered or only some of them.',
    'A submitted abstract or accepted paper often improves your chances — find the abstract deadline.',
    'Ask your institution for a support letter early; some funders require one.',
  ],
  'research-grant': [
    'Match your project to the funder\'s stated priorities and quote them in your proposal.',
    'Prepare a realistic budget; unclear budgets are a common reason for rejection.',
    'Ask a mentor or senior researcher to review the proposal before submission.',
  ],
  'exchange-program': [
    'Confirm that your home institution has an agreement with the host university and that credits will transfer.',
    'Check language requirements for classes and daily life.',
    'Ask whether the exchange is tuition-free but self-funded for living costs.',
  ],
  scholarship: [
    'Read the selection criteria twice and make sure each one is answered somewhere in your application.',
    'Ask your referees for their letters at least six weeks before the deadline.',
    'Submit a day or two early; official portals often slow down in the final hours.',
  ],
}

const FUNDING_NOTE = {
  full: 'This listing is described as fully funded, which normally means tuition and a living allowance are both covered. Always confirm exactly what is included — travel, health insurance and visa fees are sometimes excluded.',
  fully_funded: 'This listing is described as fully funded, which normally means tuition and a living allowance are both covered. Always confirm exactly what is included — travel, health insurance and visa fees are sometimes excluded.',
  partial: 'This is partial funding. It reduces your costs but does not cover everything, so work out your remaining budget (living costs, flights, insurance, visa) before you commit.',
  stipend: 'This opportunity pays a stipend. Compare the monthly amount with the cost of living in the host city before you decide.',
  paid: 'This is a paid opportunity. Check the contract terms, tax treatment and whether relocation costs are covered.',
  free: 'There is no fee to take part, but the listing does not describe a full funding package. Check carefully what you must pay for yourself.',
}

function clean(str) {
  return String(str || '').replace(/\s+/g, ' ').trim()
}

export function buildInsights(s) {
  const dl = deadlineInfo(s.deadline)
  const level = s.degree_level || 'All'
  const type = s.type || 'scholarship'
  const where = s.host_university
    ? `${s.host_university}${s.host_country ? ` in ${s.host_country}` : ''}`
    : (s.country && !/various|multiple|global/i.test(s.country) ? s.country : 'its host institutions')

  // 1. At-a-glance summary (prose from the listing's own data)
  const bits = []
  bits.push(`${s.title} is a ${String(type).replace('-', ' ')} based at ${where}.`)
  if (level && level !== 'All') {
    bits.push(`It is aimed at ${level === 'Non-degree' ? 'non-degree applicants' : level === 'Bachelors' ? 'undergraduate applicants' : level === 'Masters' ? "master's applicants" : level === 'PhD' ? 'doctoral applicants' : level + ' applicants'}.`)
  }
  if (s.amount) bits.push(`Reported award: ${clean(s.amount)}.`)
  if (dl.status === 'open') bits.push(`The current deadline is ${dl.label}.`)
  if (dl.status === 'rolling') bits.push('Applications are accepted on a rolling basis, so apply as early as you can.')
  if (dl.status === 'closed') bits.push(`The most recent deadline (${dl.label}) has passed. Programmes like this usually reopen yearly, so use this page to prepare for the next cycle.`)
  const summary = bits.join(' ')

  // 2. Who should apply — derived from eligibility text
  const elig = clean(s.eligibility)
  const whoFor = elig
    ? `Based on the published criteria: ${elig}`
    : 'The provider has not published detailed eligibility on the page we reviewed — read the official announcement before investing time in an application.'

  // 3. Documents
  const docs = LEVEL_DOCS[level] || [
    'CV or resume',
    'Statement or motivation letter written for this opportunity',
    'Academic or professional references',
    'Identity document / passport',
  ]

  // 4. Practical advice
  const advice = [...(TYPE_ADVICE[type] || TYPE_ADVICE.scholarship)]
  if (s.visa_sponsored === 1) advice.push('Visa support is mentioned for this opportunity. Ask the provider what documents they issue to help your visa application and how early they send them.')
  const funding = FUNDING_NOTE[s.funding_type] || ''

  // 5. Timeline (only when we have a real future date)
  let timeline = null
  const d = new Date(String(s.deadline || ''))
  if (dl.status === 'open' && !isNaN(d)) {
    const days = Math.max(0, Math.ceil((d - new Date()) / 86400000))
    timeline = { days, label: dl.label }
  }

  // 6. FAQ shown on the page AND used for schema, so markup always matches visible content
  const faqs = []
  if (elig) faqs.push({ q: `Who is eligible for the ${s.title}?`, a: elig })
  if (s.benefits) faqs.push({ q: `What does the ${s.title} cover?`, a: clean(s.benefits) })
  if (dl.label) faqs.push({ q: `What is the application deadline?`, a: dl.status === 'closed' ? `The latest listed deadline was ${dl.label} and has passed. Check the official website for the next intake.` : dl.status === 'rolling' ? 'Applications are accepted on a rolling basis.' : `The listed deadline is ${dl.label}.` })
  faqs.push({ q: 'Where do I apply?', a: s.official_url ? 'Use the Apply button on this page. It links to the official provider website. ScholarPath Africa never charges for applications.' : 'Search for the official provider page; we have not been able to list a direct link.' })

  return { summary, whoFor, docs, advice, funding, timeline, faqs, dl }
}
