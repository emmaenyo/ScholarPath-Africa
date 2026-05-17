import Link from 'next/link'
import Layout from '../../components/layout/Layout'

export default function CountryPage({ country, scholarships }) {
  if (!country) return (
    <Layout title="Not Found">
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Country Not Found</h1>
        <Link href="/countries" className="btn-primary">View All Countries</Link>
      </div>
    </Layout>
  )

  const safeScholarships = Array.isArray(scholarships) ? scholarships : [];

  return (
    <Layout
      title={`Scholarships in ${country.name}`}
      description={`Find scholarships and study opportunities in ${country.name} for African students.`}
    >
      <div className="bg-gray-50 border-b py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{country.flag_emoji}</span>
            <div>
              <h1 className="font-display text-3xl font-bold text-gray-900">{country.name}</h1>
              <p className="text-gray-500">{country.continent}</p>
            </div>
          </div>
          {country.description && <p className="text-gray-600 max-w-2xl">{country.description}</p>}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {country.language && (
            <div className="card p-4">
              <div className="text-xs text-gray-400 mb-1">Language</div>
              <div className="font-medium">🗣️ {country.language}</div>
            </div>
          )}
          {country.currency && (
            <div className="card p-4">
              <div className="text-xs text-gray-400 mb-1">Currency</div>
              <div className="font-medium">💱 {country.currency}</div>
            </div>
          )}
          {country.study_cost && (
            <div className="card p-4">
              <div className="text-xs text-gray-400 mb-1">Study Cost</div>
              <div className="font-medium">💰 {country.study_cost}</div>
            </div>
          )}
        </div>

        {country.visa_info && (
          <div className="bg-blue-50 rounded-xl p-5 mb-10">
            <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">✈️ Visa Information</h2>
            <p className="text-gray-700">{country.visa_info}</p>
          </div>
        )}

        <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
          Scholarships in {country.name} ({safeScholarships.length})
        </h2>

        {safeScholarships.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No scholarships found for this country yet.
            <br />
            <Link href="/scholarships" className="text-green-600 hover:underline mt-2 inline-block">Browse all scholarships</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {safeScholarships.map(s => (
              <div key={s.id} className="card p-5">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{s.funding_type === 'full' ? 'Fully Funded' : s.funding_type}</span>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{s.type}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{s.description}</p>
                {s.deadline && <p className="text-xs text-red-600 mb-3">⏰ Deadline: {s.deadline}</p>}
                <Link href={`/scholarships/${s.slug}`} className="text-sm text-green-600 hover:underline font-medium">
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const { getCountryBySlug, getScholarshipsByCountry } = require('../../lib/db')
    const country = await getCountryBySlug(params.slug)
    if (!country) return { props: { country: null, scholarships: [] } }
    const scholarships = await getScholarshipsByCountry(country.name, 20)
    return { props: { country, scholarships: scholarships || [] } }
  } catch (e) {
    console.error(e)
    return { props: { country: null, scholarships: [] } }
  }
}
