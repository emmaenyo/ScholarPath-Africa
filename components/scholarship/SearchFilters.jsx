// components/scholarship/SearchFilters.jsx
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SearchFilters({ countries = [] }) {
  const router = useRouter()
  const q = router.query

  const [filters, setFilters] = useState({
    search: q.search || '',
    country: q.country || '',
    type: q.type || '',
    degree: q.degree || '',
    funding: q.funding || '',
    visa: q.visa || '',
  })

  function handleChange(e) {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const params = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
    router.push({ pathname: '/scholarships', query: params })
  }

  function handleReset() {
    setFilters({ search: '', country: '', type: '', degree: '', funding: '', visa: '' })
    router.push('/scholarships')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h2 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wide">Filter Opportunities</h2>
      
      {/* Search */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Search</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="e.g. engineering, canada..."
            className="input pl-9"
          />
        </div>
      </div>

      {/* Country */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Country</label>
        <select name="country" value={filters.country} onChange={handleChange} className="select">
          <option value="">All Countries</option>
          {countries.map(c => (
            <option key={c.code} value={c.name}>{c.flag_emoji} {c.name}</option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Opportunity Type</label>
        <select name="type" value={filters.type} onChange={handleChange} className="select">
          <option value="">All Types</option>
          <option value="scholarship">🎓 Scholarship</option>
          <option value="fellowship">🏅 Fellowship</option>
          <option value="internship">💼 Internship</option>
          <option value="exchange-program">🔄 Exchange Program</option>
          <option value="research-grant">🔬 Research Grant</option>
        </select>
      </div>

      {/* Degree Level */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Degree Level</label>
        <select name="degree" value={filters.degree} onChange={handleChange} className="select">
          <option value="">All Levels</option>
          <option value="bachelors">Bachelor's</option>
          <option value="masters">Master's</option>
          <option value="phd">PhD / Doctorate</option>
          <option value="postdoc">Postdoc</option>
          <option value="all">All Levels</option>
        </select>
      </div>

      {/* Funding Type */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Funding Type</label>
        <select name="funding" value={filters.funding} onChange={handleChange} className="select">
          <option value="">Any Funding</option>
          <option value="fully_funded">✅ Fully Funded</option>
          <option value="partial">📊 Partial Funding</option>
          <option value="paid">💰 Paid Program</option>
        </select>
      </div>

      {/* Visa Sponsorship */}
      <div className="mb-5">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="visa"
            checked={filters.visa === '1'}
            onChange={e => setFilters(prev => ({ ...prev, visa: e.target.checked ? '1' : '' }))}
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm font-medium text-gray-700">✈️ Visa Sponsorship Only</span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button type="submit" className="btn-primary flex-1 justify-center py-2.5 text-sm">
          Search
        </button>
        <button type="button" onClick={handleReset} className="btn-outline">
          Reset
        </button>
      </div>
    </form>
  )
}
