// pages/index.js
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../components/layout/Layout'
import ScholarshipCard from '../components/scholarship/ScholarshipCard'
import EmailCapture from '../components/ui/EmailCapture'
import { getFeaturedScholarships, getCountries, getStats } from '../lib/db'
import AnnouncementTicker from '../components/ui/AnnouncementTicker'

export default function Home({ featured, countries, stats }) {
  const router = useRouter()
  const [search, setSearch] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    if (search.trim()) router.push(`/scholarships?search=${encodeURIComponent(search)}`)
    else router.push('/scholarships')
  }

  const featuredCountries = countries.filter(c => c.is_featured).slice(0, 6)

  return (
    <Layout>
      <AnnouncementTicker />
      {/* HERO */}
      <section className="hero-gradient text-white py-20 md:py-32 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-brand-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gold-400 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-brand-200 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400" />
            </span>
            {stats.scholarships}+ Active Opportunities for African Students
          </div>

          <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6">
            Discover Your Path to
            <span className="block text-brand-400">Global Education</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            The #1 platform for African students to find fully funded scholarships, fellowships, and study abroad opportunities in top countries worldwide.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search scholarships, country, or field of study..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-brand-400 shadow-lg"
              />
            </div>
            <button type="submit" className="bg-brand-500 hover:bg-brand-400 text-white font-semibold px-8 py-4 rounded-2xl transition-colors shadow-lg whitespace-nowrap">
              Search Now
            </button>
          </form>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              { label: '✅ Fully Funded', href: '/scholarships?funding=fully_funded' },
              { label: '✈️ Visa Sponsored', href: '/scholarships?visa=1' },
              { label: '🏅 Fellowships', href: '/scholarships?type=fellowship' },
              { label: '🇬🇧 UK Scholarships', href: '/scholarships?country=United+Kingdom' },
              { label: '🇩🇪 Germany', href: '/scholarships?country=Germany' },
            ].map(link => (
              <Link key={link.href} href={link.href}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-4 py-2 rounded-full transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: stats.scholarships + '+', label: 'Active Scholarships' },
            { value: stats.countries + '+', label: 'Countries' },
            { value: stats.fullyFunded + '+', label: 'Fully Funded' },
            { value: '50K+', label: 'Students Helped' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-3xl font-heading font-bold text-brand-600">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED SCHOLARSHIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Featured Scholarships</h2>
            <p className="section-sub">Top opportunities for African students right now</p>
          </div>
          <Link href="/scholarships" className="hidden md:flex btn-outline items-center gap-1">
            View All <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(s => (
            <ScholarshipCard key={s.id} scholarship={s} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/scholarships" className="btn-primary">
            Browse All {stats.scholarships}+ Scholarships →
          </Link>
        </div>
      </section>

      {/* AD BANNER */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="rounded-xl border-2 border-dashed border-gray-100 bg-gray-50 p-3 text-center text-xs text-gray-400 py-5">
          Advertisement
        </div>
      </div>

      {/* STUDY DESTINATIONS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="section-title">Popular Study Destinations</h2>
            <p className="section-sub">Explore scholarship opportunities by country</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCountries.map(country => (
              <Link key={country.code} href={`/countries/${country.slug}`}
                className="card card-hover p-4 text-center group">
                <div className="text-4xl mb-2">{country.flag_emoji}</div>
                <div className="font-medium text-gray-800 text-sm group-hover:text-brand-600 transition-colors">
                  {country.name}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link href="/countries" className="btn-outline">
              View All Countries →
            </Link>
          </div>
        </div>
      </section>

      {/* SEO CONTENT LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="section-title text-center mb-10">Explore By Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🎓', title: 'Undergraduate Scholarships', desc: "Bachelor's degree funding for African students", href: '/scholarships?degree=bachelors' },
            { icon: '🏛️', title: "Masters Scholarships", desc: "Postgraduate scholarships worldwide", href: '/scholarships?degree=masters' },
            { icon: '🔬', title: 'PhD & Research Grants', desc: "Doctoral programs and research funding", href: '/scholarships?degree=phd' },
            { icon: '💼', title: 'Internship Programs', desc: "Paid international internship opportunities", href: '/scholarships?type=internship' },
            { icon: '✅', title: 'Fully Funded', desc: "All expenses covered scholarships", href: '/scholarships?funding=fully_funded' },
            { icon: '✈️', title: 'Visa Sponsored', desc: "Programs that include visa support", href: '/scholarships?visa=1' },
            { icon: '🏅', title: 'Fellowships', desc: "Prestigious fellowship programs", href: '/scholarships?type=fellowship' },
            { icon: '🔄', title: 'Exchange Programs', desc: "Short-term exchange opportunities", href: '/scholarships?type=exchange-program' },
          ].map(cat => (
            <Link key={cat.href} href={cat.href}
              className="card card-hover p-5 flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{cat.icon}</span>
              <div>
                <div className="font-semibold text-gray-800 text-sm">{cat.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{cat.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="section-title mb-4">How ScholarPath Works</h2>
          <p className="section-sub mb-12">Find and apply for scholarships in 4 simple steps</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', icon: '🔍', title: 'Search', desc: 'Browse 100+ scholarships filtered by country, degree, and funding type.' },
              { step: '02', icon: '📋', title: 'Review', desc: 'Read eligibility requirements, benefits, and deadlines in detail.' },
              { step: '03', icon: '✍️', title: 'Prepare', desc: 'Use our free tools to craft your SOP, CV, and recommendation letters.' },
              { step: '04', icon: '🚀', title: 'Apply', desc: 'Click to apply directly on the official scholarship website.' },
            ].map(step => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 bg-brand-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  {step.icon}
                </div>
                <div className="text-xs font-mono text-brand-500 font-bold mb-1">STEP {step.step}</div>
                <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Scholarship Guides & Tips</h2>
            <p className="section-sub">Expert advice to boost your application success</p>
          </div>
          <Link href="/blog" className="hidden md:block btn-outline">View All →</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'How to Win Scholarships as an African Student', category: 'Guide', href: '/blog/how-to-win-scholarships-african-student', time: '8 min read' },
            { title: 'Best Countries to Study Abroad for African Students in 2024', category: 'Destinations', href: '/blog/best-countries-study-abroad-african-students', time: '6 min read' },
            { title: 'How to Write a Winning Statement of Purpose (SOP)', category: 'Writing', href: '/blog/how-to-write-winning-statement-of-purpose', time: '7 min read' },
          ].map(post => (
            <Link key={post.href} href={post.href} className="card card-hover p-6 group">
              <span className="badge-green mb-3 inline-block">{post.category}</span>
              <h3 className="font-heading font-semibold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors leading-snug">
                {post.title}
              </h3>
              <span className="text-xs text-gray-400">{post.time}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <EmailCapture />
      </section>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    const { getFeaturedScholarships, getCountries, getStats } = require('../lib/db')
    const featured = await getFeaturedScholarships(6)
    const countries = await getCountries()
    const stats = await getStats()
    return { props: { featured, countries, stats } }
  } catch (e) {
    console.error(e)
    return { props: { featured: [], countries: [], stats: { scholarships: 0, countries: 0, fullyFunded: 0, types: 0 } } }
  }
}
