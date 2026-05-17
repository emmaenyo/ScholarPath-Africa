// pages/countries/index.js
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { getCountries } from '../../lib/db'

export default function CountriesPage({ countries }) {
  const featured = countries.filter(c => c.is_featured)
  const others = countries.filter(c => !c.is_featured)

  return (
    <Layout
      title="Study Abroad Countries for African Students"
      description="Explore study abroad destinations for African students. Find scholarships, visa info, costs, and requirements for Canada, UK, Germany, USA, Australia and more."
    >
      <div className="bg-gray-50 border-b py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Study Abroad Destinations
          </h1>
          <p className="text-gray-500 text-lg">
            Explore scholarship opportunities in {countries.length} countries worldwide
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Featured countries */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">🌟 Top Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(country => (
                <Link key={country.code} href={`/countries/${country.slug}`}
                  className="card card-hover p-6 group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{country.flag_emoji}</span>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-gray-900 group-hover:text-brand-600 transition-colors">
                        {country.name}
                      </h3>
                      <p className="text-sm text-gray-500">{country.continent}</p>
                    </div>
                  </div>
                  {country.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{country.description}</p>
                  )}
                  <div className="space-y-1.5 text-xs text-gray-500">
                    {country.study_cost && <div>💰 {country.study_cost}</div>}
                    {country.language && <div>🗣️ {country.language}</div>}
                  </div>
                  <div className="mt-4 text-sm font-medium text-brand-600 group-hover:underline">
                    View Scholarships →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Other countries */}
        {others.length > 0 && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">More Countries</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {others.map(country => (
                <Link key={country.code} href={`/countries/${country.slug}`}
                  className="card card-hover p-4 flex items-center gap-3 group">
                  <span className="text-3xl">{country.flag_emoji}</span>
                  <div>
                    <div className="font-medium text-gray-800 text-sm group-hover:text-brand-600 transition-colors">
                      {country.name}
                    </div>
                    <div className="text-xs text-gray-400">{country.continent}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    const { getCountries } = require('../../lib/db')
    const countries = getCountries()
    return { props: { countries } }
  } catch (e) {
    return { props: { countries: [] } }
  }
}
