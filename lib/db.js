// lib/db.js
import Database from 'better-sqlite3'
import path from 'path'

let db

export function getDb() {
  if (!db) {
    const dbPath = process.env.DATABASE_PATH || './scholarpath.db'
    db = new Database(path.resolve(process.cwd(), dbPath))
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
  }
  return db
}

// Scholarship helpers
export function getScholarships({ country, type, degree, funding, visa, page = 1, limit = 12, search } = {}) {
  const db = getDb()
  let where = ['is_approved = 1', 'is_active = 1']
  const params = []

  if (country) { where.push('country = ?'); params.push(country) }
  if (type) { where.push('type = ?'); params.push(type) }
  if (degree) { where.push('degree_level = ?'); params.push(degree) }
  if (funding) { where.push('funding_type = ?'); params.push(funding) }
  if (visa === '1') { where.push('visa_sponsored = 1') }
  if (search) {
    where.push('(title LIKE ? OR description LIKE ? OR country LIKE ?)')
    params.push(`%${search}%`, `%${search}%`, `%${search}%`)
  }

  const whereStr = where.length ? 'WHERE ' + where.join(' AND ') : ''
  const offset = (page - 1) * limit

  const total = db.prepare(`SELECT COUNT(*) as count FROM scholarships ${whereStr}`).get(...params)
  const items = db.prepare(`SELECT * FROM scholarships ${whereStr} ORDER BY is_featured DESC, created_at DESC LIMIT ? OFFSET ?`).all(...params, limit, offset)

  return { items, total: total.count, page, limit, pages: Math.ceil(total.count / limit) }
}

export function getScholarshipBySlug(slug) {
  const db = getDb()
  return db.prepare('SELECT * FROM scholarships WHERE slug = ? AND is_approved = 1').get(slug)
}

export function getFeaturedScholarships(limit = 6) {
  const db = getDb()
  return db.prepare('SELECT * FROM scholarships WHERE is_featured = 1 AND is_approved = 1 AND is_active = 1 ORDER BY created_at DESC LIMIT ?').all(limit)
}

export function getCountries() {
  const db = getDb()
  return db.prepare('SELECT * FROM countries ORDER BY is_featured DESC, name ASC').all()
}

export function getCountryBySlug(slug) {
  const db = getDb()
  return db.prepare('SELECT * FROM countries WHERE slug = ?').get(slug)
}

export function getScholarshipsByCountry(country, limit = 20) {
  const db = getDb()
  return db.prepare('SELECT * FROM scholarships WHERE country = ? AND is_approved = 1 AND is_active = 1 ORDER BY is_featured DESC LIMIT ?').all(country, limit)
}

export function getBlogPosts({ published = true, limit = 10, page = 1, category } = {}) {
  const db = getDb()
  let where = published ? ['is_published = 1'] : []
  const params = []
  if (category) { where.push('category = ?'); params.push(category) }
  const whereStr = where.length ? 'WHERE ' + where.join(' AND ') : ''
  const offset = (page - 1) * limit
  const total = db.prepare(`SELECT COUNT(*) as count FROM blog_posts ${whereStr}`).get(...params)
  const items = db.prepare(`SELECT id, title, slug, excerpt, category, tags, author, views, created_at FROM blog_posts ${whereStr} ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(...params, limit, offset)
  return { items, total: total.count }
}

export function getBlogPostBySlug(slug) {
  const db = getDb()
  return db.prepare('SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1').get(slug)
}

export function incrementViews(table, id) {
  const db = getDb()
  db.prepare(`UPDATE ${table} SET views = views + 1 WHERE id = ?`).run(id)
}

export function getStats() {
  const db = getDb()
  return {
    scholarships: db.prepare('SELECT COUNT(*) as count FROM scholarships WHERE is_active = 1').get().count,
    countries: db.prepare('SELECT COUNT(*) as count FROM countries').get().count,
    types: db.prepare("SELECT COUNT(DISTINCT type) as count FROM scholarships").get().count,
    fullyFunded: db.prepare("SELECT COUNT(*) as count FROM scholarships WHERE funding_type = 'fully_funded'").get().count,
  }
}
