// pages/scholarships/[slug].js
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { getScholarshipBySlug, getFeaturedScholarships } from '../../lib/db'

const FUNDING_LABELS = { fully_funded: 'Fully Funded', partial: 'Partial Funding', paid: 'Paid' }
const DEGREE_LABELS = { bachelors: "Bachelor's", masters: "Master's", phd: 'PhD', postdoc: 'Postdoc', all: 'All Levels' }
const TYPE_LABELS = { scholarship: 'Scholarship', fellowship: 'Fellowship', internship: 'Internship', 'exchange-program': 'Exchange Program', 'research-grant': 'Research Grant' }

export default function ScholarshipDetail({ scholarship, related }) {
  if (!scholarship) return (
    <Layout title="Not Found">
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Scholarship Not Found</h1>
        <Link href="/scholarships" className="btn-primary">Browse All Scholarships</Link>
      </div>
    </Layout>
  )

  const fundingLabel = FUNDING_LABELS[scholarship.funding_type] || scholarship.funding_type
  const degreeLabel = DEGREE_LABELS[scholarship.degree_level] || scholarship.degree_level
  const typeLabel = TYPE_LABELS[scholarship.type] || scholarship.type

  const structured = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": scholarship.title,
    "description": scholarship.description,
    "provider": { "@type": "Organization", "name": scholarship.host_university },
    "applicationStartDate": scholarship.deadline_date,
    "url": scholarship.apply_link,
  }

  return (
    <Layout
      title={scholarship.title}
      description={`${scholarship.title} - ${fundingLabel} ${typeLabel} in ${scholarship.country}. Deadline: ${scholarship.deadline}.`}
    >
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>›</span>
          <Link href="/scholarships" className="hover:text-brand-600">Scholarships</Link>
          <span>›</span>
          <span className="text-gray-700 truncate">{scholarship.title}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge-green">{fundingLabel}</span>
                <span className="badge-blue">{typeLabel}</span>
                {scholarship.visa_sponsored === 1 && <span className="badge-blue">✈️ Visa Sponsored</span>}
                {scholarship.is_featured === 1 && <span className="badge bg-amber-50 text-amber-700">⭐ Featured</span>}
              </div>

              <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {scholarship.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>🌍 {scholarship.country}</span>
                <span>📚 {degreeLabel}</span>
                {scholarship.host_university && <span>🏛️ {scholarship.host_university}</span>}
                {scholarship.deadline && <span>⏰ Deadline: <strong>{scholarship.deadline}</strong></span>}
              </div>
            </div>

            {/* Apply CTA */}
            <div className="bg-brand-600 text-white rounded-2xl p-6 mb-8 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="font-semibold text-lg">Ready to Apply?</h2>
                <p className="text-brand-100 text-sm">Visit the official website to start your application</p>
              </div>
              <a
                href={scholarship.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-brand-700 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
              >
                Apply Now →
              </a>
            </div>

            {/* Description */}
            <section className="mb-8">
              <h2 className="font-heading text-xl font-semibold text-gray-900 mb-4">About This Scholarship</h2>
              <p className="text-gray-700 leading-relaxed">{scholarship.description}</p>
            </section>

            {/* Eligibility */}
            {scholarship.eligibility && (
              <section className="mb-8">
                <h2 className="font-heading text-xl font-semibold text-gray-900 mb-4">Eligibility Requirements</h2>
                <div className="bg-blue-50 rounded-xl p-5">
                  <p className="text-gray-700 leading-relaxed">{scholarship.eligibility}</p>
                </div>
              </section>
            )}

            {/* Benefits */}
            {scholarship.benefits && (
              <section className="mb-8">
                <h2 className="font-heading text-xl font-semibold text-gray-900 mb-4">What You'll Receive</h2>
                <div className="bg-green-50 rounded-xl p-5">
                  <p className="text-gray-700 leading-relaxed">{scholarship.benefits}</p>
                </div>
              </section>
            )}

            {/* Subjects */}
            {scholarship.subjects && (
              <section className="mb-8">
                <h2 className="font-heading text-xl font-semibold text-gray-900 mb-4">Eligible Fields of Study</h2>
                <div className="flex flex-wrap gap-2">
                  {scholarship.subjects.split(',').map(s => (
                    <span key={s} className="badge-gray">{s.trim()}</span>
                  ))}
                </div>
              </section>
            )}

            {/* Tips */}
            <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8">
              <h2 className="font-heading text-lg font-semibold text-amber-900 mb-3">💡 Application Tips</h2>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• Start your application at least 3 months before the deadline</li>
                <li>• Use our <Link href="/tools/sop-generator" className="underline">SOP Generator</Link> to craft a compelling statement</li>
                <li>• Request recommendation letters at least 6 weeks in advance</li>
                <li>• Read the <Link href="/tools/cv-guide" className="underline">Scholarship CV Guide</Link> before preparing your resume</li>
                <li>• Prepare for <Link href="/tools/visa-tips" className="underline">visa interview</Link> if visa sponsorship is included</li>
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick info card */}
            <div className="card p-5 mb-6 sticky top-20">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Overview</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-lg">🌍</span>
                  <div><div className="text-gray-400 text-xs">Country</div><div className="font-medium">{scholarship.country}</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">📚</span>
                  <div><div className="text-gray-400 text-xs">Degree Level</div><div className="font-medium">{degreeLabel}</div></div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">💰</span>
                  <div><div className="text-gray-400 text-xs">Funding Type</div><div className="font-medium">{fundingLabel}</div></div>
                </div>
                {scholarship.deadline && (
                  <div className="flex items-start gap-3">
                    <span className="text-lg">⏰</span>
                    <div><div className="text-gray-400 text-xs">Deadline</div><div className="font-medium text-red-600">{scholarship.deadline}</div></div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <span className="text-lg">✈️</span>
                  <div><div className="text-gray-400 text-xs">Visa Sponsored</div><div className="font-medium">{scholarship.visa_sponsored === 1 ? '✅ Yes' : '❌ No'}</div></div>
                </div>
              </div>

              <a
                href={scholarship.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center mt-5 text-sm"
              >
                Apply Now →
              </a>
              {scholarship.official_website && (
                <a
                  href={scholarship.official_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full justify-center mt-2 text-sm"
                >
                  Official Website
                </a>
              )}
            </div>

            {/* Tools */}
            <div className="card p-5 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">📋 Prepare Your Application</h3>
              <div className="space-y-2">
                {[
                  { href: '/tools/sop-generator', label: 'SOP Generator', icon: '✍️' },
                  { href: '/tools/cv-guide', label: 'CV Guide', icon: '📄' },
                  { href: '/tools/checklist', label: 'Application Checklist', icon: '✅' },
                  { href: '/tools/visa-tips', label: 'Visa Tips', icon: '✈️' },
                ].map(tool => (
                  <Link key={tool.href} href={tool.href}
                    className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg px-2 py-1.5 transition-colors">
                    <span>{tool.icon}</span>
                    {tool.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Related Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.slice(0, 3).map(s => (
                <div key={s.id} className="card p-4">
                  <span className="badge-green mb-2 inline-block">{s.funding_type === 'fully_funded' ? 'Fully Funded' : 'Partial'}</span>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{s.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">🌍 {s.country}</p>
                  <Link href={`/scholarships/${s.slug}`} className="text-xs text-brand-600 hover:underline">View Details →</Link>
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
    const scholarship = getScholarshipBySlug(params.slug)
    if (!scholarship) return { props: { scholarship: null, related: [] } }
    incrementViews('scholarships', scholarship.id)
    const related = getFeaturedScholarships(4).filter(s => s.id !== scholarship.id)
    return { props: { scholarship, related } }
  } catch (e) {
    console.error(e)
    return { props: { scholarship: null, related: [] } }
  }
}
