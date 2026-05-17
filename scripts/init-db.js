// scripts/init-db.js
const Database = require('better-sqlite3')
const bcrypt = require('bcryptjs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const DB_PATH = process.env.DATABASE_PATH || './scholarpath.db'
const db = new Database(path.resolve(DB_PATH))

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

console.log('🗄️  Initializing ScholarPath Africa database...')

db.exec(`
  CREATE TABLE IF NOT EXISTS scholarships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    country TEXT NOT NULL,
    country_code TEXT,
    host_university TEXT,
    degree_level TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'scholarship',
    funding_type TEXT NOT NULL DEFAULT 'fully_funded',
    deadline TEXT,
    deadline_date TEXT,
    description TEXT NOT NULL,
    eligibility TEXT,
    benefits TEXT,
    subjects TEXT,
    apply_link TEXT NOT NULL,
    official_website TEXT,
    visa_sponsored INTEGER DEFAULT 0,
    open_to_africans INTEGER DEFAULT 1,
    is_featured INTEGER DEFAULT 0,
    is_approved INTEGER DEFAULT 1,
    is_active INTEGER DEFAULT 1,
    views INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    continent TEXT,
    description TEXT,
    study_cost TEXT,
    visa_info TEXT,
    language TEXT,
    flag_emoji TEXT,
    is_featured INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    category TEXT DEFAULT 'general',
    tags TEXT,
    is_published INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    author TEXT DEFAULT 'ScholarPath Team',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'admin',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS email_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    interests TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS opportunity_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_scholarships_country ON scholarships(country);
  CREATE INDEX IF NOT EXISTS idx_scholarships_type ON scholarships(type);
  CREATE INDEX IF NOT EXISTS idx_scholarships_degree ON scholarships(degree_level);
  CREATE INDEX IF NOT EXISTS idx_scholarships_approved ON scholarships(is_approved, is_active);
  CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(is_published);
`)

// Insert default admin
const adminEmail = process.env.ADMIN_EMAIL || 'admin@scholarpath.africa'
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!'
const hash = bcrypt.hashSync(adminPassword, 10)

const existing = db.prepare('SELECT id FROM admin_users WHERE email = ?').get(adminEmail)
if (!existing) {
  db.prepare('INSERT INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)').run(
    adminEmail, hash, 'ScholarPath Admin'
  )
  console.log(`✅ Admin user created: ${adminEmail}`)
}

// Insert opportunity types
const types = [
  { name: 'Scholarship', slug: 'scholarship', icon: '🎓' },
  { name: 'Fellowship', slug: 'fellowship', icon: '🏅' },
  { name: 'Internship', slug: 'internship', icon: '💼' },
  { name: 'Exchange Program', slug: 'exchange-program', icon: '🔄' },
  { name: 'Research Grant', slug: 'research-grant', icon: '🔬' },
  { name: 'Training Program', slug: 'training-program', icon: '📚' },
]
const insertType = db.prepare('INSERT OR IGNORE INTO opportunity_types (name, slug, icon) VALUES (?, ?, ?)')
types.forEach(t => insertType.run(t.name, t.slug, t.icon))

console.log('✅ Database initialized successfully!')
console.log(`📁 Database file: ${path.resolve(DB_PATH)}`)
console.log('\nNext steps:')
console.log('  npm run db:seed     → Add sample scholarship data')
console.log('  npm run dev         → Start development server')
