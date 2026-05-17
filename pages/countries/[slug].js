// pages/countries/[slug].js
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import ScholarshipCard from '../../components/scholarship/ScholarshipCard'
import { getCountryBySlug, getScholarshipsByCountry } from '../../lib/db'

export default function CountryPage({ country, scholarships }) {
  if (!country) return (
    <Layout title="Country Not Found">
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Country Not Found</h1>
        <Link href="/countries" className="btn-primary">View All Countries</Link>
      </div>
    </Layout>
  )

  return (
    <Layout
      title={`Scholarships in ${country.name} for African Students`}
      description={`Find fully funded scholarships, fellowships and study programs in ${country.name} for African students. ${country.description || ''}`}
    >
      {/* Country Hero */}
      <div className="hero-gradient text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-7xl mb-4">{country.flag_emoji}</div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
            Study in {country.name}
          </h1>
          <p className="text-brand-200 text-lg max-w-2xl mx-auto">
            {country.description}
          </p>
        </div>
      </div>

      {/* Country info */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {country.study_cost && (
            <div className="text-center">
              <div className="text-2xl mb-1">💰</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Tuition Cost</div>
              <div className="font-semibold text-gray-800 text-sm">{country.study_cost}</div>
            </div>
          )}
          {country.language && (
            <div className="text-center">
              <div className="text-2xl mb-1">🗣️</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Language</div>
              <div className="font-semibold text-gray-800 text-sm">{country.language}</div>
            </div>
          )}
          {country.continent && (
            <div className="text-center">
              <div className="text-2xl mb-1">🌍</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Region</div>
              <div className="font-semibold text-gray-800 text-sm">{country.continent}</div>
            </div>
          )}
          <div className="text-center">
            <div className="text-2xl mb-1">🎓</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Scholarships</div>
            <div className="font-semibold text-gray-800 text-sm">{scholarships.length}+ Available</div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Visa info */}
        {country.visa_info && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10">
            <h2 className="font-heading text-lg font-semibold text-blue-900 mb-2">✈️ Visa Information</h2>
            <p className="text-blue-800 text-sm leading-relaxed">{country.visa_info}</p>
            <Link href="/tools/visa-tips" className="text-blue-600 text-sm underline mt-2 inline-block">
              Read our full visa guide →
            </Link>
          </div>
        )}

        {/* Scholarships */}
        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
          Scholarships in {country.name}
        </h2>

        {scholarships.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No scholarships listed yet for {country.name}.</p>
            <Link href="/scholarships" className="btn-primary mt-4 inline-block">Browse All Scholarships</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {scholarships.map(s => (
              <ScholarshipCard key={s.id} scholarship={s} />
            ))}
          </div>
        )}

        {/* Internal links for SEO */}
        <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
          <h3 className="font-semibold text-gray-800 mb-4">Explore More</h3>
          <div className="flex flex-wrap gap-3">
            <Link href={`/scholarships?country=${encodeURIComponent(country.name)}&funding=fully_funded`} className="btn-outline text-sm">
              Fully Funded in {country.name}
            </Link>
            <Link href={`/scholarships?country=${encodeURIComponent(country.name)}&degree=masters`} className="btn-outline text-sm">
              Master's in {country.name}
            </Link>
            <Link href={`/scholarships?country=${encodeURIComponent(country.name)}&visa=1`} className="btn-outline text-sm">
              Visa Sponsored in {country.name}
            </Link>
            <Link href="/countries" className="btn-outline text-sm">
              All Countries →
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const { getCountryBySlug, getScholarshipsByCountry } = require('../../lib/db')
    const country = getCountryBySlug(params.slug)
    if (!country) return { props: { country: null, scholarships: [] } }
    const scholarships = getScholarshipsByCountry(country.name)
    return { props: { country, scholarships } }
  } catch (e) {
    return { props: { country: null, scholarships: [] } }
  }
}
