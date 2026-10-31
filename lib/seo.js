// lib/seo.js — click-focused title/description builders
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

export function truncate(str, max) {
  const s = String(str || '').replace(/\s+/g, ' ').trim()
  if (s.length <= max) return s
  const cut = s.slice(0, max - 1)
  const sp = cut.lastIndexOf(' ')
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[,;:\-–—\s]+$/, '') + '…'
}

// deadline is free text ("July 1, 2026", "Rolling", "Varies") -> {status, label}
export function deadlineInfo(text, now = new Date()) {
  const t = String(text || '').trim()
  if (!t) return { status: 'unknown', label: '' }
  const d = new Date(t)
  if (!isNaN(d) && /\d{4}/.test(t)) {
    const label = `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    return { status: d < now ? 'closed' : 'open', label }
  }
  return { status: /rolling|open|ongoing|year/i.test(t) ? 'rolling' : 'unknown', label: t }
}

const FUND = { full: 'Fully Funded', fully_funded: 'Fully Funded', partial: 'Partial Funding', stipend: 'Stipend', paid: 'Paid', free: 'Free' }
const TYPE = { scholarship: 'Scholarship', fellowship: 'Fellowship', internship: 'Internship', conference: 'Conference', 'research-grant': 'Research Grant', 'exchange-program': 'Exchange Program' }

export function scholarshipMeta(s) {
  const fund = FUND[s.funding_type] || ''
  const type = TYPE[s.type] || 'Opportunity'
  const dl = deadlineInfo(s.deadline)
  const where = s.country && !/various|multiple|global/i.test(s.country) ? ` in ${s.country}` : ''
  let title, tail
  if (dl.status === 'open') { title = `${s.title}: ${dl.label} Deadline`; tail = `Closes ${dl.label}. ` }
  else if (dl.status === 'rolling') { title = `${s.title}: Apply Now`; tail = 'Rolling applications. ' }
  else if (dl.status === 'closed') { title = `${s.title}: How to Apply Next Cycle`; tail = 'Latest cycle closed — check the official site for the next intake. ' }
  else { title = `${s.title}: Eligibility & How to Apply`; tail = '' }
  const lead = `${[fund, type].filter(Boolean).join(' ')}${where} for African students. `
  const benefit = s.benefits ? truncate(s.benefits, 70) + '. ' : ''
  const description = truncate(`${lead}${benefit}${tail}Eligibility, benefits and a direct link to apply.`, 158)
  return { title: truncate(title, 52), description, dl }
}

export function blogMeta(p) {
  const base = String(p.excerpt || '').trim()
  const description = truncate(base ? base : `${p.title} — practical, step-by-step guidance for African students.`, 158)
  return { title: truncate(p.title, 58), description }
}

export function homeMeta() {
  const now = new Date()
  return {
  rawTitle: `Fully Funded Scholarships for African Students (${MONTHS[now.getMonth()]} ${now.getFullYear()}) | ScholarPath Africa`,
  description: 'New fully funded scholarships, fellowships & internships for African students, checked every two weeks. See deadlines, eligibility and apply links — free.',
  }
}
