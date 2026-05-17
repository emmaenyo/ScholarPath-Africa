// components/layout/Layout.jsx
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarpathafrica.com'
const SITE_NAME = 'ScholarPath Africa'
const DEFAULT_DESC = 'Discover fully funded scholarships, fellowships, internships and study abroad programs for African students. Find opportunities in Canada, UK, USA, Germany, Australia and more.'
const DEFAULT_KEYWORDS = 'scholarships for African students, fully funded scholarships Africa, study abroad Africa, fellowships Africa, internships Africa, scholarship application tips, DAAD scholarship, Chevening scholarship, Commonwealth scholarship, Fulbright scholarship'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

export default function Layout({
  children,
  title,
  description,
  canonical,
  keywords,
  ogType = 'website',
  ogImage,
  article,
  noindex = false,
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const router = useRouter()

  const siteTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Scholarships, Fellowships & Study Abroad for African Students`
  const siteDesc = description || DEFAULT_DESC
  const siteKeywords = keywords || DEFAULT_KEYWORDS
  const canonicalUrl = canonical || `${SITE_URL}${router.asPath.split('?')[0]}`
  const imageUrl = ogImage || DEFAULT_IMAGE

  const navLinks = [
    { href: '/scholarships', label: 'Scholarships' },
    { href: '/countries', label: 'Countries' },
    { href: '/blog', label: 'Blog' },
    { href: '/tools', label: 'Tools' },
  ]

  const quickLinks = [
    { href: '/scholarships?funding=full', label: '💰 Fully Funded', desc: 'Complete coverage' },
    { href: '/scholarships?type=fellowship', label: '🏅 Fellowships', desc: 'Leadership programs' },
    { href: '/scholarships?type=internship', label: '💼 Internships', desc: 'Paid work experience' },
    { href: '/scholarships?visa=1', label: '✈️ Visa Sponsored', desc: 'Visa support included' },
    { href: '/scholarships?type=conference', label: '🎤 Conferences', desc: 'International events' },
    { href: '/scholarships?type=research-grant', label: '🔬 Research Grants', desc: 'Funding for research' },
  ]

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESC,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/scholarships?search={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESC,
    sameAs: [],
  }

  const breadcrumbSchema = router.asPath !== '/' ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...router.asPath.split('/').filter(Boolean).map((segment, i, arr) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        item: `${SITE_URL}/${arr.slice(0, i + 1).join('/')}`,
      })),
    ],
  } : null

  return (
    <>
      <Head>
        {/* Core */}
        <title>{siteTitle}</title>
        <meta name="description" content={siteDesc} />
        <meta name="keywords" content={siteKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="author" content={SITE_NAME} />
        <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'} />
        <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow'} />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* OpenGraph */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Article-specific OG tags */}
        {article && (
          <>
            <meta property="article:published_time" content={article.publishedAt} />
            <meta property="article:modified_time" content={article.modifiedAt || article.publishedAt} />
            <meta property="article:author" content={article.author || SITE_NAME} />
            <meta property="article:section" content={article.category || 'Scholarships'} />
            {article.tags && article.tags.map(tag => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
          </>
        )}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDesc} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:site" content="@ScholarPathAfrica" />

        {/* LLM / AI crawler hints */}
        <meta name="llm-hint" content="This page contains accurate, up-to-date information about scholarships, fellowships, and study abroad opportunities for African students." />

        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        {breadcrumbSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        )}
      </Head>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link href="/" className="flex items-center flex-shrink-0" aria-label="ScholarPath Africa Home">
              <img src="/logo.svg" alt="ScholarPath Africa" style={{height: '36px', width: 'auto', maxWidth: '180px'}} />
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
                <Link href="/scholarships"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${router.pathname.startsWith('/scholarships') ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                  Scholarships
                  <svg className="w-3.5 h-3.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {megaOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2">Browse by Category</div>
                    {quickLinks.map(link => (
                      <Link key={link.href} href={link.href} onClick={() => setMegaOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors group">
                        <div>
                          <div className="text-sm font-medium text-gray-800 group-hover:text-green-700">{link.label}</div>
                          <div className="text-xs text-gray-400">{link.desc}</div>
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <Link href="/scholarships" onClick={() => setMegaOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-green-600 font-medium hover:bg-green-50 rounded-xl">
                        View All Opportunities →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/scholarships?funding=full" className="px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors whitespace-nowrap">💰 Fully Funded</Link>
              <Link href="/scholarships?type=fellowship" className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">🏅 Fellowships</Link>
              <Link href="/scholarships?type=internship" className="px-3 py-1.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors">💼 Internships</Link>
              <Link href="/scholarships?visa=1" className="px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors whitespace-nowrap">✈️ Visa Sponsored</Link>

              {navLinks.filter(l => l.href !== '/scholarships').map(link => (
                <Link key={link.href} href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${router.pathname.startsWith(link.href) ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/scholarships" className="hidden lg:flex btn-primary text-sm py-2 px-4">🔍 Find Scholarships</Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" aria-label="Toggle menu">
                {mobileOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden py-3 border-t border-gray-100 space-y-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">{link.label}</Link>
              ))}
              <div className="border-t border-gray-100 pt-2 mt-2">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 mb-2">Quick Filters</div>
                {quickLinks.map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">{link.label}</Link>
                ))}
              </div>
              <div className="pt-2">
                <Link href="/scholarships" onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center text-sm py-2.5 block text-center">🔍 Find Scholarships</Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="min-h-screen" id="main-content">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="font-display font-bold text-white text-lg">ScholarPath Africa</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Africa's leading scholarship discovery platform. Helping African students find fully funded scholarships, fellowships, internships, and study abroad opportunities worldwide.
              </p>
              <p className="text-xs text-gray-500">Updated daily with new opportunities.</p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Opportunities</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/scholarships" className="hover:text-green-400 transition-colors">All Opportunities</Link></li>
                <li><Link href="/scholarships?funding=full" className="hover:text-green-400 transition-colors">💰 Fully Funded Scholarships</Link></li>
                <li><Link href="/scholarships?type=fellowship" className="hover:text-green-400 transition-colors">🏅 Fellowships</Link></li>
                <li><Link href="/scholarships?type=internship" className="hover:text-green-400 transition-colors">💼 Internships</Link></li>
                <li><Link href="/scholarships?type=conference" className="hover:text-green-400 transition-colors">🎤 Conferences</Link></li>
                <li><Link href="/scholarships?type=research-grant" className="hover:text-green-400 transition-colors">🔬 Research Grants</Link></li>
                <li><Link href="/scholarships?visa=1" className="hover:text-green-400 transition-colors">✈️ Visa Sponsored</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Study Destinations</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/countries/canada" className="hover:text-green-400 transition-colors">🇨🇦 Scholarships in Canada</Link></li>
                <li><Link href="/countries/germany" className="hover:text-green-400 transition-colors">🇩🇪 Scholarships in Germany</Link></li>
                <li><Link href="/countries/united-kingdom" className="hover:text-green-400 transition-colors">🇬🇧 Scholarships in UK</Link></li>
                <li><Link href="/countries/united-states" className="hover:text-green-400 transition-colors">🇺🇸 Scholarships in USA</Link></li>
                <li><Link href="/countries/australia" className="hover:text-green-400 transition-colors">🇦🇺 Scholarships in Australia</Link></li>
                <li><Link href="/countries" className="hover:text-green-400 transition-colors">All Countries →</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools/sop-generator" className="hover:text-green-400 transition-colors">✍️ SOP Generator</Link></li>
                <li><Link href="/tools/cv-guide" className="hover:text-green-400 transition-colors">📄 Scholarship CV Guide</Link></li>
                <li><Link href="/tools/motivation-letter" className="hover:text-green-400 transition-colors">📝 Motivation Letter Guide</Link></li>
                <li><Link href="/tools/visa-tips" className="hover:text-green-400 transition-colors">✈️ Visa Interview Tips</Link></li>
                <li><Link href="/tools/checklist" className="hover:text-green-400 transition-colors">✅ Application Checklist</Link></li>
                <li><Link href="/blog" className="hover:text-green-400 transition-colors">📰 Scholarship Blog</Link></li>
              </ul>
            </div>
          </div>

          {/* Popular searches for SEO */}
          <div className="border-t border-gray-800 mt-10 pt-8">
            <p className="text-xs text-gray-500 mb-3 font-medium">Popular Searches:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Fully funded scholarships for African students',
                'DAAD scholarship',
                'Chevening scholarship',
                'Commonwealth scholarship',
                'Fulbright scholarship',
                'Study in Germany free',
                'Scholarships without IELTS',
                'PhD scholarships Africa',
                'UN internships',
                'MasterCard Foundation scholarship',
              ].map(term => (
                <Link key={term} href={`/scholarships?search=${encodeURIComponent(term)}`}
                  className="text-xs text-gray-500 hover:text-green-400 transition-colors bg-gray-800 px-2 py-1 rounded">
                  {term}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} ScholarPath Africa. All rights reserved. Helping African students achieve their study abroad dreams.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link href="/sitemap.xml" className="hover:text-gray-300">Sitemap</Link>
              <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
              <Link href="/about" className="hover:text-gray-300">About</Link>
              <Link href="/contact" className="hover:text-gray-300">Contact</Link>
              <Link href="/admin" className="hover:text-gray-300">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
