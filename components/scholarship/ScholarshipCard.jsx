// components/scholarship/ScholarshipCard.jsx
import Link from 'next/link'

const FUNDING_LABELS = {
  full: { label: 'Fully Funded', class: 'bg-green-100 text-green-700' },
  fully_funded: { label: 'Fully Funded', class: 'bg-green-100 text-green-700' },
  partial: { label: 'Partial Funding', class: 'bg-amber-100 text-amber-700' },
  paid: { label: 'Paid', class: 'bg-blue-100 text-blue-700' },
  stipend: { label: 'Stipend', class: 'bg-blue-100 text-blue-700' },
  free: { label: 'Free', class: 'bg-green-100 text-green-700' },
}

const TYPE_ICONS = {
  scholarship: '🎓',
  fellowship: '🏅',
  internship: '💼',
  conference: '🎤',
  'research-grant': '🔬',
  'exchange-program': '✈️',
}

const TYPE_LABELS = {
  scholarship: 'Scholarship',
  fellowship: 'Fellowship',
  internship: 'Internship',
  conference: 'Conference',
  'research-grant': 'Research Grant',
  'exchange-program': 'Exchange Program',
}

const DEGREE_LABELS = {
  Bachelors: "Bachelor's",
  Masters: "Master's",
  PhD: 'PhD',
  All: 'All Levels',
  Postdoc: 'Postdoc',
  'Non-degree': 'Open',
  bachelors: "Bachelor's",
  masters: "Master's",
  phd: 'PhD',
  all: 'All Levels',
}

export default function ScholarshipCard({ scholarship }) {
  const funding = FUNDING_LABELS[scholarship.funding_type] || { label: scholarship.funding_type, class: 'bg-gray-100 text-gray-600' }
  const typeLabel = TYPE_LABELS[scholarship.type] || scholarship.type
  const typeIcon = TYPE_ICONS[scholarship.type] || '🎓'
  const degreeLabel = DEGREE_LABELS[scholarship.degree_level] || scholarship.degree_level

  return (
    <div className="card p-5 flex flex-col h-full hover:shadow-md transition-shadow">
      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${funding.class}`}>
          {funding.label}
        </span>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-50 text-blue-700">
          {typeIcon} {typeLabel}
        </span>
        {scholarship.visa_sponsored === 1 && (
          <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-amber-50 text-amber-700">✈️ Visa</span>
        )}
        {scholarship.is_featured === 1 && (
          <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-purple-50 text-purple-700">⭐ Featured</span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-gray-900 text-base leading-tight mb-2 line-clamp-2">
        {scholarship.title}
      </h3>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-3">
        <span>🌍 {scholarship.country}</span>
        {degreeLabel && <span>📚 {degreeLabel}</span>}
        {scholarship.host_university && <span className="truncate max-w-[140px]">🏛️ {scholarship.host_university}</span>}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1 mb-3">
        {scholarship.description}
      </p>

      {/* Amount */}
      {scholarship.amount && (
        <div className="text-xs text-green-700 font-medium bg-green-50 px-2 py-1 rounded-lg mb-3 inline-block w-fit">
          💰 {scholarship.amount}
        </div>
      )}

      {/* Deadline */}
      {scholarship.deadline && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <span>⏰</span>
          <span>Deadline: <strong className="text-gray-700">{scholarship.deadline}</strong></span>
        </div>
      )}

      {/* Single CTA — always works */}
      <div className="mt-auto pt-3 border-t border-gray-100">
        <Link
          href={`/scholarships/${scholarship.slug}`}
          className="block w-full text-center text-sm font-semibold bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-xl transition-colors"
        >
          View Details & Apply →
        </Link>
      </div>
    </div>
  )
}
