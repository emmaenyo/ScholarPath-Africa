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
  // Never cut a title mid-deadline: if the suffixed title is too long, fall back to the plain title.
  const short = { open: `${s.title}: ${dl.label}`, rolling: `${s.title}: Apply Now` }[dl.status]
  const chosen = title.length <= 52 ? title : (short && short.length <= 52 ? short : s.title)
  return { title: truncate(chosen, 52), description, dl }
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
  description: 'Fully funded scholarships, fellowships & internships for African students, with deadlines, eligibility and official apply links.',
  }
}


// ---- Indexing quality gate -------------------------------------------------
export function wordCount(str) {
  return String(str || '').trim().split(/\s+/).filter(Boolean).length
}

// A listing is worth indexing only if it has real substance and is not long expired.
export function scholarshipIndexable(s, now = new Date()) {
  const words = wordCount(s.description) + wordCount(s.eligibility) + wordCount(s.benefits)
  if (words < 60) return false
  const t = String(s.deadline || '').trim()
  const d = new Date(t)
  if (!isNaN(d) && /\d{4}/.test(t)) {
    const daysAgo = (now - d) / 86400000
    if (daysAgo > 90) return false
  }
  return true
}
