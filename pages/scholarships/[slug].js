// pages/scholarships/[slug].js
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { scholarshipMeta, scholarshipIndexable } from '../../lib/seo'
import { buildInsights } from '../../lib/content'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarpathafrica.com'

const FUNDING_LABELS = { full: 'Fully Funded', fully_funded: 'Fully Funded', partial: 'Partial Funding', paid: 'Paid', stipend: 'Stipend', free: 'Free' }
const DEGREE_LABELS = { Bachelors: "Bachelor's", Masters: "Master's", PhD: 'PhD', Postdoc: 'Postdoc', 'Non-degree': 'Open / Non-degree', All: 'All Levels' }
const TYPE_LABELS = { scholarship: 'Scholarship', fellowship: 'Fellowship', internship: 'Internship', conference: 'Conference', 'research-grant': 'Research Grant', 'exchange-program': 'Exchange Program' }

export default function ScholarshipDetail({ scholarship, related, guides = [] }) {
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

  const { title: metaTitle, description: metaDesc, dl } = scholarshipMeta(scholarship)
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

  const ins = buildInsights(scholarship)
  const indexable = scholarshipIndexable(scholarship)
  const reviewed = scholarship.updated_at || scholarship.created_at
  const reviewedLabel = reviewed ? new Date(String(reviewed).replace(' ', 'T')).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''

  // FAQ markup mirrors the visible FAQ section below, so structured data always matches the page.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ins.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <Layout
      title={metaTitle}
      description={metaDesc}
      keywords={metaKeywords}
      canonical={canonicalUrl}
      ogType="article"
      noindex={!indexable}
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

            {ins.dl.status === 'closed' && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 mb-6 text-sm">
                <strong>The latest deadline ({ins.dl.label}) has passed.</strong> Many programmes reopen every year — use this page to prepare, and check the official website for the next intake. See the similar opportunities below for options that may still be open.
              </div>
            )}
            {ins.timeline && (
              <div className="bg-red-50 border border-red-100 text-red-800 rounded-xl p-4 mb-6 text-sm">
                <strong>{ins.timeline.days} day{ins.timeline.days === 1 ? '' : 's'} left</strong> until the deadline on {ins.timeline.label}.
              </div>
            )}

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

            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">At a Glance</h2>
              <p className="text-gray-700 leading-relaxed">{ins.summary}</p>
            </section>

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

            {/* Documents */}
            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">Documents You Will Usually Need</h2>
              <p className="text-gray-600 text-sm mb-3">Typical requirements for {degreeLabel.toLowerCase()} applications of this kind. Always confirm the exact list on the official page.</p>
              <ul className="space-y-2 text-gray-700 text-sm list-disc pl-5">
                {ins.docs.map(d => <li key={d}>{d}</li>)}
              </ul>
            </section>

            {/* Advice */}
            <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8">
              <h2 className="font-display text-lg font-semibold text-amber-900 mb-3">💡 Before You Apply</h2>
              {ins.funding && <p className="text-sm text-amber-900 mb-3">{ins.funding}</p>}
              <ul className="space-y-2 text-sm text-amber-800 list-disc pl-5">
                {ins.advice.map(a => <li key={a}>{a}</li>)}
                <li>Prepare your essays with our <Link href="/tools/sop-generator" className="underline font-medium">SOP Generator</Link> and <Link href="/tools/cv-guide" className="underline font-medium">CV Guide</Link>, and track progress with the <Link href="/tools/checklist" className="underline font-medium">Application Checklist</Link>.</li>
              </ul>
            </section>

            {/* Visible FAQ (matches FAQ schema) */}
            <section className="mb-8">
              <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {ins.faqs.map(f => (
                  <div key={f.q}>
                    <h3 className="font-semibold text-gray-800 text-sm mb-1">{f.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Source and review note */}
            <section className="mb-8 text-xs text-gray-500 border-t border-gray-100 pt-4">
              <p>
                {reviewedLabel && <>Listing last reviewed: {reviewedLabel}. </>}
                Details come from the provider's official announcement{scholarship.official_url ? ' (linked above)' : ''}. Deadlines and amounts can change, so confirm everything on the official site before applying. Spotted an error? <Link href="/contact" className="underline">Tell us</Link> — see our <Link href="/editorial-policy" className="underline">editorial policy</Link>.
              </p>
            </section>

            {/* Related blog posts (live posts only) */}
            {guides.length > 0 && (
              <section className="mb-8">
                <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">Related Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {guides.map(g => (
                    <Link key={g.slug} href={`/blog/${g.slug}`}
                      className="bg-gray-50 hover:bg-green-50 rounded-xl p-3 text-sm text-gray-700 hover:text-green-700 transition-colors">
                      📖 {g.title} →
                    </Link>
                  ))}
                </div>
              </section>
            )}
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
    const { getScholarshipBySlug, getBlogPosts, getDb, incrementViews } = require('../../lib/db')
    const scholarship = await getScholarshipBySlug(params.slug)
    if (!scholarship) return { props: { scholarship: null, related: [], guides: [] } }
    await incrementViews('scholarships', params.slug)

    const db = getDb()
    const rel = await db.execute({
      sql: `SELECT id, slug, title, country, type, funding_type FROM scholarships
            WHERE is_active = 1 AND id != ? AND (country = ? OR type = ?)
            ORDER BY is_featured DESC, id DESC LIMIT 6`,
      args: [scholarship.id, scholarship.country, scholarship.type],
    })
    const related = rel.rows.slice(0, 3).map(r => ({ id: Number(r.id), slug: r.slug, title: r.title, country: r.country, type: r.type, funding_type: r.funding_type }))

    // Pick live blog posts that share words with this listing; fall back to the newest posts.
    const posts = await getBlogPosts(60)
    const words = `${scholarship.country} ${scholarship.type} ${scholarship.degree_level} ${scholarship.title}`
      .toLowerCase().split(/[^a-z]+/).filter(w => w.length > 3)
    const scored = posts.map(p => {
      const t = String(p.title).toLowerCase()
      return { slug: p.slug, title: p.title, score: words.filter(w => t.includes(w)).length }
    }).sort((a, b) => b.score - a.score)
    const guides = scored.slice(0, 4).map(({ slug, title }) => ({ slug, title }))

    return { props: { scholarship, related, guides } }
  } catch (e) {
    console.error(e)
    return { props: { scholarship: null, related: [], guides: [] } }
  }
}
