// components/layout/Layout.jsx
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Layout({ children, title, description, canonical }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  const siteTitle = title ? `${title} | ScholarPath Africa` : 'ScholarPath Africa — Find Scholarships & Study Abroad Opportunities'
  const siteDesc = description || 'Discover fully funded scholarships, fellowships, and study abroad programs for African students. Find opportunities in Canada, UK, USA, Germany, Australia and more.'

  const navLinks = [
    { href: '/scholarships', label: 'Scholarships' },
    { href: '/countries', label: 'Countries' },
    { href: '/blog', label: 'Blog' },
    { href: '/tools', label: 'Tools' },
  ]

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* OpenGraph */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ScholarPath Africa" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL || ''}${router.asPath}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDesc} />
        
        {canonical && <link rel="canonical" href={canonical} />}
        
        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "ScholarPath Africa",
          "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarpat.africa',
          "description": siteDesc,
          "potentialAction": {
            "@type": "SearchAction",
            "target": { "@type": "EntryPoint", "urlTemplate": "/scholarships?search={search_term_string}" },
            "query-input": "required name=search_term_string"
          }
        })}} />
      </Head>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">S</span>
              </div>
              <span className="font-heading font-bold text-gray-900 text-lg hidden sm:block">
                Scholar<span className="text-brand-600">Path</span> Africa
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    router.pathname.startsWith(link.href)
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/scholarships" className="btn-primary text-sm py-2 px-4">
                🔍 Find Scholarships
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden py-3 border-t border-gray-100 space-y-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/scholarships" className="btn-primary w-full justify-center text-sm py-2.5">
                  🔍 Find Scholarships
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main content */}
      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-dark-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="font-heading font-bold text-white text-lg">ScholarPath Africa</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Helping African students discover fully funded scholarships, fellowships, and study abroad opportunities worldwide.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Opportunities</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/scholarships" className="hover:text-brand-400 transition-colors">All Scholarships</Link></li>
                <li><Link href="/scholarships?funding=fully_funded" className="hover:text-brand-400 transition-colors">Fully Funded</Link></li>
                <li><Link href="/scholarships?type=fellowship" className="hover:text-brand-400 transition-colors">Fellowships</Link></li>
                <li><Link href="/scholarships?type=internship" className="hover:text-brand-400 transition-colors">Internships</Link></li>
                <li><Link href="/scholarships?visa=1" className="hover:text-brand-400 transition-colors">Visa Sponsored</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Study Destinations</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/countries/canada" className="hover:text-brand-400 transition-colors">🇨🇦 Canada</Link></li>
                <li><Link href="/countries/germany" className="hover:text-brand-400 transition-colors">🇩🇪 Germany</Link></li>
                <li><Link href="/countries/united-kingdom" className="hover:text-brand-400 transition-colors">🇬🇧 United Kingdom</Link></li>
                <li><Link href="/countries/united-states" className="hover:text-brand-400 transition-colors">🇺🇸 USA</Link></li>
                <li><Link href="/countries" className="hover:text-brand-400 transition-colors">All Countries →</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools" className="hover:text-brand-400 transition-colors">Application Tools</Link></li>
                <li><Link href="/tools/sop-generator" className="hover:text-brand-400 transition-colors">SOP Generator</Link></li>
                <li><Link href="/tools/cv-guide" className="hover:text-brand-400 transition-colors">CV Guide</Link></li>
                <li><Link href="/tools/visa-tips" className="hover:text-brand-400 transition-colors">Visa Tips</Link></li>
                <li><Link href="/blog" className="hover:text-brand-400 transition-colors">Blog</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} ScholarPath Africa. All rights reserved. Helping African students achieve their study abroad dreams.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link href="/sitemap.xml" className="hover:text-gray-300">Sitemap</Link>
              <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
              <Link href="/admin" className="hover:text-gray-300">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
