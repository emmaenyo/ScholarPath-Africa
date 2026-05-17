// pages/scholarships/[slug].js
import Link from 'next/link'
import Layout from '../../components/layout/Layout'

const FUNDING_LABELS = { fully_funded: 'Fully Funded', partial: 'Partial Funding', paid: 'Paid', full: 'Fully Funded' }
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

  return (
    <Layout
      title={scholarship.title}
      description={`${scholarship.title} - ${fundingLabel} ${typeLabel} in ${scholarship.country}. Deadline: ${scholarship.deadline}.`}
    >
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span>›</span>
          <Link href="/scholarships" className="hover:text-green-600">Scholarships</Link>
          <span>›</span>
          <span className="text-gray-700 truncate">{scholarship.title}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">{fundingLabel}</span>
                <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">{typeLabel}</span>
                {scholarship.visa_sponsored === 1 && <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">✈️ Visa Sponsored</span>}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{scholarship.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>🌍 {scholarship.country}</span>
                <span>📚 {degreeLabel}</span>
                {scholarship.host_university && <span>🏛️ {scholarship.host_university}</span>}
                {scholarship.deadline && <span>⏰ Deadline: <strong>{scholarship.deadline}</strong></span>}
              </div>
            </div>

            <div className="bg-green-600 text-white rounded-2xl p-6 mb-8 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="font-semibold text-lg">Ready to Apply?</h2>
                <p className="text-green-100 text-sm">Visit the official website to start your application</p>
              </div>
              <a href={scholarship.official_url} target="_blank" rel="noopener noreferrer"
                className="bg-white text-green-700 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors">
                Apply Now →
              </a>
            </div>

            {scholarship.description && (
              <section className="mb-8">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">About This Scholarship</h2>
                <p className="text-gray-700 leading-relaxed">{scholarship.description}</p>
              </section>
            )}

            {scholarship.eligibility && (
              <section className="mb-8">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">Eligibility Requirements</h2>
                <div className="bg-blue-50 rounded-xl p-5">
                  <p className="text-gray-700 leading-relaxed">{scholarship.eligibility}</p>
                </div>
              </section>
            )}

            {scholarship.benefits && (
              <section className="mb-8">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">What You'll Receive</h2>
                <div className="bg-green-50 rounded-xl p-5">
                  <p className="text-gray-700 leading-relaxed">{scholarship.benefits}</p>
                </div>
              </section>
            )}

            {scholarship.subjects && (
              <section className="mb-8">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">Eligible Fields of Study</h2>
                <div className="flex flex-wrap gap-2">
                  {scholarship.subjects.split(',').map(s => (
                    <span key={s} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">{s.trim()}</span>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8">
              <h2 className="font-display text-lg font-semibold text-amber-900 mb-3">💡 Application Tips</h2>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• Start your application at least 3 months before the deadline</li>
                <li>• Use our <Link href="/tools/sop-generator" className="underline">SOP Generator</Link> to craft a compelling statement</li>
                <li>• Request recommendation letters at least 6 weeks in advance</li>
                <li>• Read the <Link href="/tools/cv-guide" className="underline">Scholarship CV Guide</Link> before preparing your resume</li>
                <li>• Prepare for <Link href="/tools/visa-tips" className="underline">visa interview</Link> if visa sponsorship is included</li>
              </ul>
            </section>
          </div>

          <div className="lg:col-span-1">
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
                  <div><div className="text-gray-400 text-xs">Funding</div><div className="font-medium">{fundingLabel}</div></div>
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
              <a href={scholarship.official_url} target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full text-center mt-5 text-sm block">
                Apply Now →
              </a>
            </div>

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
                    className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg px-2 py-1.5 transition-colors">
                    <span>{tool.icon}</span>{tool.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {related && related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Related Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.slice(0, 3).map(s => (
                <div key={s.id} className="card p-4">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mb-2 inline-block">{FUNDING_LABELS[s.funding_type] || s.funding_type}</span>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{s.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">🌍 {s.country}</p>
                  <Link href={`/scholarships/${s.slug}`} className="text-xs text-green-600 hover:underline">View Details →</Link>
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
    const featured = await getFeaturedScholarships(4)
    const related = featured.filter(s => s.id !== scholarship.id)
    return { props: { scholarship, related } }
  } catch (e) {
    console.error(e)
    return { props: { scholarship: null, related: [] } }
  }
}
