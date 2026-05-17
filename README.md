# ScholarPath Africa 🌍

A full-stack scholarships discovery platform for African students — built with Next.js, SQLite, and Tailwind CSS.

## Features

- 🔍 **Search & filter** scholarships by country, type, degree level, and funding
- 🌐 **Country pages** with visa information and scholarship listings
- ✍️ **Tools suite** — SOP generator, CV guide, motivation letter guide, application checklist, visa tips, recommendation letter templates
- 📰 **Blog** with scholarship tips and guides
- 📧 **Email capture** for scholarship alerts
- 🔧 **Admin panel** — add/edit/delete scholarships, CSV bulk import, stats dashboard
- 📊 **SEO-ready** — schema.org markup, dynamic sitemap, meta tags
- 💰 **AdSense-ready** — placeholder ad units throughout

---

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+
- npm or yarn

### 2. Clone & Install

```bash
git clone <your-repo>
cd scholarpath-africa
npm install
```

### 3. Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
DATABASE_PATH=./scholarpath.db
JWT_SECRET=your-super-secret-jwt-key-change-this
ADMIN_EMAIL=admin@scholarpathAfrica.com
ADMIN_PASSWORD=your-strong-admin-password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Initialise Database

```bash
node scripts/init-db.js
node scripts/seed.js
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Deployment on Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/scholarpath-africa.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)

### 3. Environment Variables on Vercel

In Vercel Dashboard → Settings → Environment Variables, add:

| Variable | Value |
|---|---|
| `DATABASE_PATH` | `/tmp/scholarpath.db` |
| `JWT_SECRET` | `your-secret-key` |
| `ADMIN_EMAIL` | `your-admin@email.com` |
| `ADMIN_PASSWORD` | `your-password` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |
| `NEXT_PUBLIC_ADSENSE_ID` | `ca-pub-XXXXXXXXXXXXXXXX` (optional) |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` (optional) |

> ⚠️ **Important**: Vercel uses an ephemeral filesystem. The SQLite database at `/tmp/scholarpath.db` will reset on each deployment. For production, migrate to **Turso** (SQLite edge DB), **PlanetScale**, or **Neon** (PostgreSQL).

### 4. Using Turso (Recommended for Production SQLite)

```bash
npm install @libsql/client
npx turso db create scholarpath
npx turso db tokens create scholarpath
```

Update `lib/db.js` to use `@libsql/client` with the Turso URL and auth token from env vars.

---

## Database Management

### Backup the database

```bash
cp scholarpath.db scholarpath-backup-$(date +%Y%m%d).db
```

### Import scholarships from CSV

Admin panel → Import CSV, or via API:

```bash
curl -X POST http://localhost:3000/api/admin/import-csv \
  -H "Content-Type: application/json" \
  -H "Cookie: admin_token=YOUR_JWT" \
  -d '{"csvData": "title,country,type,..."}'
```

### CSV Format

Headers (all optional except `title` and `country`):

```
title,country,type,degree_level,funding_type,amount,deadline,description,eligibility,benefits,subjects,host_university,host_country,official_url,visa_sponsored,is_featured
```

---

## Adding Google AdSense

1. Get your AdSense publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`)
2. Set `NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX` in env vars
3. Add to `pages/_document.js` (create if needed):

```jsx
import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
  return (
    <Html>
      <Head>
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`} crossOrigin="anonymous"></script>
      </Head>
      <body><Main /><NextScript /></body>
    </Html>
  )
}
```

4. Replace `AdBanner` placeholder divs with real AdSense units.

---

## Adding Google Analytics

1. Get your GA4 Measurement ID (`G-XXXXXXXXXX`)
2. Set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
3. Install `next-gtag` or add the GA script to `_document.js`

---

## Customisation

### Adding New Scholarships (Admin)
1. Go to `/admin` → log in
2. Fill out the "Add Scholarship" form
3. Or use CSV import for bulk uploads

### Adding New Countries
Run a SQL insert in the database:
```sql
INSERT INTO countries (name, slug, flag, description, currency, language, visa_info, cost_of_living, university_count)
VALUES ('France', 'france', '🇫🇷', 'Description...', 'EUR', 'French, English', 'Visa info...', '$$', 80);
```

### Changing Branding
- Colors: `tailwind.config.js` → `green` and `gold` palette
- Fonts: `styles/globals.css` → Google Fonts import
- Logo: `components/layout/Layout.jsx` → navbar section

---

## Project Structure

```
scholarpath-africa/
├── components/
│   ├── layout/Layout.jsx        # Navbar, footer, SEO head
│   ├── scholarship/
│   │   ├── ScholarshipCard.jsx  # Scholarship listing card
│   │   └── SearchFilters.jsx    # Sidebar filters
│   └── ui/
│       ├── EmailCapture.jsx     # Newsletter signup
│       └── AdBanner.jsx         # Ad placeholders
├── lib/
│   ├── db.js                    # Database helpers
│   └── auth.js                  # JWT auth helpers
├── pages/
│   ├── api/
│   │   ├── admin/               # Protected admin APIs
│   │   ├── scholarships/        # Public scholarship API
│   │   └── subscribe.js         # Email subscribe
│   ├── admin/                   # Admin panel pages
│   ├── blog/                    # Blog listing + posts
│   ├── countries/               # Country pages
│   ├── scholarships/            # Scholarship listing + detail
│   ├── tools/                   # All tools
│   └── index.js                 # Homepage
├── scripts/
│   ├── init-db.js               # Database schema creation
│   └── seed.js                  # Sample data seeding
└── styles/globals.css
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 |
| Styling | Tailwind CSS |
| Database | SQLite (better-sqlite3) |
| Auth | JWT (jsonwebtoken) |
| Fonts | Playfair Display + DM Sans |
| Deployment | Vercel |

---

## License

MIT — free to use, modify, and deploy.

---

Built for African students 🌍 — helping them find and win life-changing scholarships.
