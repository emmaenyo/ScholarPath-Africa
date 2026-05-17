// pages/scholarships/[slug].js
import Link from 'next/link'
import Layout from '../../components/layout/Layout'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarpathafrica.com'

const FUNDING_LABELS = { full: 'Fully Funded', fully_funded: 'Fully Funded', partial: 'Partial Funding', paid: 'Paid', stipend: 'Stipend', free: 'Free' }
const DEGREE_LABELS = { Bachelors: "Bachelor's", Masters: "Master's", PhD: 'PhD', Postdoc: 'Postdoc', 'Non-degree': 'Open / Non-degree', All: 'All Levels' }
const TYPE_LABELS = { scholarship: 'Scholarship', fellowship: 'Fellowship', internship: 'Internship', conference: 'Conference', 'research-grant': 'Research Grant', 'exchange-program': 'Exchange Program' }

export default function ScholarshipDetail({ scholarship, related }) {
  if (!scholarship) return (
    <Layout title="Opportunity Not Found" noindex={true}>
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Opportunity Not Found</h1>
        <p className="text-gray-500 mb-6">This opportunity may have been removed or the URL is incorrect.</p>
        <Link href="/scholarships" className="btn-primary">Browse All Opportunities</Link>
      </div>
    </Layout>
  )

  const fundingLabel = FUNDING_LABELS[scholarship.funding_type] || scholarship.funding_type
  const degreeLabel = DEGREE_LABELS[scholarship.degree_level] || scholarship.degree_level
  const typeLabel = TYPE_LABELS[scholarship.type] || scholarship.type
  const canonicalUrl = `${SITE_URL}/scholarships/${scholarship.slug}`

  const metaTitle = `${scholarship.title} — ${typeLabel} in ${scholarship.country}`
  const metaDesc = `${fundingLabel} ${typeLabel} for African students in ${scholarship.country}. ${scholarship.description ? scholarship.description.slice(0, 120) + '...' : ''} Deadline: ${scholarship.deadline || 'See official website'}.`
  const metaKeywords = `${scholarship.title}, ${typeLabel} ${scholarship.country}, scholarships for African students, ${fundingLabel} scholarships, study in ${scholarship.country}, ${scholarship.subjects || ''}, African student ${typeLabel}`

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: scholarship.title,
    description: scholarship.description,
    provider: {
      '@type': 'Organization',
      name: scholarship.host_university || scholarship.country,
      address: { '@type': 'PostalAddress', addressCountry: scholarship.host_country || scholarship.country },
    },
    url: canonicalUrl,
    applicationDeadline: scholarship.deadline,
    offers: {
      '@type': 'Offer',
      description: scholarship.benefits,
      price: '0',
      priceCurrency: 'USD',
    },
    educationalCredentialAwarded: degreeLabel,
    occupationalCategory: scholarship.subjects,
    financialAidEligible: fundingLabel,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      scholarship.eligibility && {
        '@type': 'Question',
        name: `Who is eligible for the ${scholarship.title}?`,
        acceptedAnswer: { '@type': 'Answer', text: scholarship.eligibility },
      },
      scholarship.benefits && {
        '@type': 'Question',
        name: `What does the ${scholarship.title} cover?`,
        acceptedAnswer: { '@type': 'Answer', text: scholarship.benefits },
      },
      scholarship.deadline && {
        '@type': 'Question',
        name: `What is the deadline for the ${scholarship.title}?`,
        acceptedAnswer: { '@type': 'Answer', text: `The deadline for the ${scholarship.title} is ${scholarship.deadline}.` },
      },
    ].filter(Boolean),
  }

  return (
    <Layout
      title={metaTitle}
      description={metaDesc}
      keywords={metaKeywords}
      canonical={canonicalUrl}
      ogType="article"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b py-3">
        <div className="max-w-5xl mx-auto px-4 text-sm text-gray-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span>›</span>
          <Link href="/scholarships" className="hover:text-green-600">Opportunities</Link>
          <span>›</span>
          <Link href={`/scholarships?type=${scholarship.type}`} className="hover:text-green-600 capitalize">{typeLabel}s</Link>
          <span>›</span>
          <Link href={`/countries/${scholarship.country_slug}`} className="hover:text-green-600">{scholarship.country}</Link>
          <span>›</span>
          <span className="text-gray-700 truncate max-w-xs">{scholarship.title}</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">{fundingLabel}</span>
                <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">{typeLabel}</span>
                {scholarship.visa_sponsored === 1 && <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full font-medium">✈️ Visa Sponsored</span>}
                {scholarship.is_featured === 1 && <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">⭐ Featured</span>}
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {scholarship.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>🌍 <Link href={`/countries/${scholarship.country_slug}`} className="hover:text-green-600 hover:underline">{scholarship.country}</Link></span>
                <span>📚 {degreeLabel}</span>
                {scholarship.host_university && <span>🏛️ {scholarship.host_university}</span>}
                {scholarship.deadline && <span>⏰ Deadline: <strong className="text-red-600">{scholarship.deadline}</strong></span>}
              </div>
            </div>

            {/* Apply CTA */}
            <div className="bg-green-600 text-white rounded-2xl p-6 mb-8 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="font-semibold text-lg">Ready to Apply?</h2>
                <p className="text-green-100 text-sm">Visit the official website to start your application</p>
              </div>
              {scholarship.official_url && (
                <a href={scholarship.official_url} target="_blank" rel="noopener noreferrer"
                  className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors">
                  Apply Now →
                </a>
              )}
            </div>

            {scholarship.description && (
              <section className="mb-8">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">About This {typeLabel}</h2>
                <p className="text-gray-700 leading-relaxed">{scholarship.description}</p>
              </section>
            )}

            {scholarship.eligibility && (
              <section className="mb-8">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">Eligibility Requirements</h2>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="text-gray-700 leading-relaxed">{scholarship.eligibility}</p>
                </div>
              </section>
            )}

            {scholarship.benefits && (
              <section className="mb-8">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">What You'll Receive</h2>
                <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                  <p className="text-gray-700 leading-relaxed">{scholarship.benefits}</p>
                </div>
              </section>
            )}

            {scholarship.subjects && (
              <section className="mb-8">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">Eligible Fields of Study</h2>
                <div className="flex flex-wrap gap-2">
                  {scholarship.subjects.split(',').map(s => (
                    <Link key={s} href={`/scholarships?search=${encodeURIComponent(s.trim())}`}
                      className="bg-gray-100 hover:bg-green-50 hover:text-green-700 text-gray-700 text-sm px-3 py-1 rounded-full transition-colors">
                      {s.trim()}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Application tips */}
            <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8">
              <h2 className="font-display text-lg font-semibold text-amber-900 mb-3">💡 Application Tips</h2>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• Start your application at least 3 months before the deadline</li>
                <li>• Use our <Link href="/tools/sop-generator" className="underline font-medium">SOP Generator</Link> to craft a compelling personal statement</li>
                <li>• Request recommendation letters at least 6 weeks in advance — use our <Link href="/tools/recommendation-template" className="underline font-medium">Recommendation Template</Link></li>
                <li>• Read our <Link href="/tools/cv-guide" className="underline font-medium">Scholarship CV Guide</Link> before preparing your resume</li>
                {scholarship.visa_sponsored === 1 && <li>• Prepare for the visa process with our <Link href="/tools/visa-tips" className="underline font-medium">Visa Interview Tips</Link></li>}
                <li>• Track all your applications with our <Link href="/tools/checklist" className="underline font-medium">Application Checklist</Link></li>
              </ul>
            </section>

            {/* Related blog posts */}
            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">Related Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { href: '/blog/how-to-write-winning-scholarship-personal-statement', label: 'How to Write a Winning Personal Statement' },
                  { href: '/blog/how-to-write-a-statement-of-purpose-sop-for-graduate-school', label: 'How to Write a Statement of Purpose' },
                  { href: '/blog/how-to-ask-for-a-recommendation-letter-for-scholarships', label: 'How to Ask for a Recommendation Letter' },
                  { href: '/blog/how-to-prepare-for-a-scholarship-interview', label: 'How to Prepare for a Scholarship Interview' },
                ].map(link => (
                  <Link key={link.href} href={link.href}
                    className="bg-gray-50 hover:bg-green-50 rounded-xl p-3 text-sm text-gray-700 hover:text-green-700 transition-colors">
                    📖 {link.label} →
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">

              {/* Quick info */}
              <div className="card p-5">
                <h3 className="font-semibold text-gray-800 mb-4">Quick Overview</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { icon: '🌍', label: 'Country', value: scholarship.country },
                    { icon: '📚', label: 'Degree Level', value: degreeLabel },
                    { icon: '🏷️', label: 'Type', value: typeLabel },
                    { icon: '💰', label: 'Funding', value: fundingLabel },
                    scholarship.amount && { icon: '💵', label: 'Amount', value: scholarship.amount },
                    scholarship.deadline && { icon: '⏰', label: 'Deadline', value: scholarship.deadline },
                    scholarship.host_university && { icon: '🏛️', label: 'Institution', value: scholarship.host_university },
                    { icon: '✈️', label: 'Visa Support', value: scholarship.visa_sponsored === 1 ? '✅ Yes' : '❌ No' },
                  ].filter(Boolean).map(item => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <div className="text-gray-400 text-xs">{item.label}</div>
                        <div className="font-medium text-gray-800">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {scholarship.official_url && (
                  <a href={scholarship.official_url} target="_blank" rel="noopener noreferrer"
                    className="btn-primary w-full text-center mt-5 text-sm block">
                    Apply Now →
                  </a>
                )}
              </div>

              {/* Tools */}
              <div className="card p-5">
                <h3 className="font-semibold text-gray-800 mb-3">📋 Prepare Your Application</h3>
                <div className="space-y-2">
                  {[
                    { href: '/tools/sop-generator', label: 'SOP Generator', icon: '✍️' },
                    { href: '/tools/cv-guide', label: 'CV Guide', icon: '📄' },
                    { href: '/tools/motivation-letter', label: 'Motivation Letter', icon: '📝' },
                    { href: '/tools/checklist', label: 'Application Checklist', icon: '✅' },
                    { href: '/tools/visa-tips', label: 'Visa Tips', icon: '✈️' },
                  ].map(tool => (
                    <Link key={tool.href} href={tool.href}
                      className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg px-2 py-1.5 transition-colors">
                      <span>{tool.icon}</span>{tool.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* More opportunities */}
              <div className="card p-5">
                <h3 className="font-semibold text-gray-800 mb-3">🔍 More Opportunities</h3>
                <div className="space-y-2">
                  {[
                    { href: `/scholarships?type=${scholarship.type}`, label: `More ${typeLabel}s` },
                    { href: `/countries/${scholarship.country_slug}`, label: `Scholarships in ${scholarship.country}` },
                    { href: '/scholarships?funding=full', label: 'All Fully Funded' },
                    { href: '/scholarships?visa=1', label: 'Visa Sponsored' },
                  ].map(link => (
                    <Link key={link.href} href={link.href}
                      className="block text-sm text-gray-700 hover:text-green-600 px-2 py-1 hover:bg-green-50 rounded transition-colors">
                      → {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related scholarships */}
        {related && related.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Similar Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.slice(0, 3).map(s => (
                <div key={s.id} className="card p-5 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">{FUNDING_LABELS[s.funding_type] || s.funding_type}</span>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full capitalize">{s.type}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{s.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">🌍 {s.country}</p>
                  <Link href={`/scholarships/${s.slug}`} className="text-xs text-green-600 hover:underline font-medium">
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const { getScholarshipBySlug, getFeaturedScholarships, incrementViews } = require('../../lib/db')
    const scholarship = await getScholarshipBySlug(params.slug)
    if (!scholarship) return { props: { scholarship: null, related: [] } }
    await incrementViews('scholarships', params.slug)
    const featured = await getFeaturedScholarships(6)
    const related = featured.filter(s => s.id !== scholarship.id).slice(0, 3)
    return { props: { scholarship, related } }
  } catch (e) {
    console.error(e)
    return { props: { scholarship: null, related: [] } }
  }
}
