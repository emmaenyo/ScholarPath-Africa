// pages/scholarships/index.js
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'
import ScholarshipCard from '../../components/scholarship/ScholarshipCard'
import SearchFilters from '../../components/scholarship/SearchFilters'
import AdBanner from '../../components/ui/AdBanner'
import Link from 'next/link'
import { getScholarships, getCountries } from '../../lib/db'

export default function ScholarshipsPage({ scholarships, countries, total, page, pages, query }) {
  const router = useRouter()

  function goToPage(p) {
    router.push({ pathname: '/scholarships', query: { ...query, page: p } })
  }

  const activeFilters = Object.entries(query).filter(([k, v]) => v && k !== 'page')

  return (
    <Layout
      title="Find Scholarships for African Students"
      description="Search hundreds of scholarships, fellowships, and study abroad programs for African students. Filter by country, degree level, funding type and more."
    >
      {/* Page header */}
      <div className="bg-gray-50 border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">
            Scholarships for African Students
          </h1>
          <p className="text-gray-500">
            {total} opportunities found
            {query.country && ` in ${query.country}`}
            {query.type && ` • ${query.type}`}
            {query.funding === 'fully_funded' && ' • Fully Funded'}
          </p>

          {/* Active filter tags */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {activeFilters.map(([key, val]) => (
                <span key={key} className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 text-xs px-3 py-1 rounded-full">
                  {val}
                  <button onClick={() => {
                    const q = { ...query }
                    delete q[key]
                    router.push({ pathname: '/scholarships', query: q })
                  }} className="hover:text-brand-900">✕</button>
                </span>
              ))}
              <button
                onClick={() => router.push('/scholarships')}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-20">
              <SearchFilters countries={countries} />
              <div className="mt-6">
                <AdBanner slot="sidebar" />
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {scholarships.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-5xl block mb-4">🔍</span>
                <h3 className="font-heading text-xl font-semibold text-gray-800 mb-2">No opportunities found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
                <Link href="/scholarships" className="btn-primary">Clear Filters</Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {scholarships.map(s => (
                    <ScholarshipCard key={s.id} scholarship={s} />
                  ))}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => goToPage(page - 1)}
                      disabled={page <= 1}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:border-brand-400 hover:text-brand-600 transition-colors"
                    >
                      ← Prev
                    </button>

                    {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
                      const p = i + 1
                      return (
                        <button key={p} onClick={() => goToPage(p)}
                          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                            p === page
                              ? 'bg-brand-600 text-white'
                              : 'border border-gray-200 hover:border-brand-400 hover:text-brand-600'
                          }`}
                        >
                          {p}
                        </button>
                      )
                    })}

                    <button
                      onClick={() => goToPage(page + 1)}
                      disabled={page >= pages}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:border-brand-400 hover:text-brand-600 transition-colors"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const { getScholarships, getCountries } = require('../../lib/db')
    const page = parseInt(query.page) || 1
    const { scholarships: items, total, totalPages: pages } = await getScholarships({
      country: query.country || '',
      type: query.type || '',
      degree: query.degree || '',
      funding: query.funding || '',
      visa: query.visa || '',
      search: query.search || '',
      page,
      limit: 12,
    })
    const countries = await getCountries()

    return {
      props: {
        scholarships: items,
        countries,
        total,
        page,
        pages,
        query: Object.fromEntries(Object.entries(query).filter(([_, v]) => v)),
      }
    }
  } catch (e) {
    console.error(e)
    return { props: { scholarships: [], countries: [], total: 0, page: 1, pages: 1, query: {} } }
  }
}
