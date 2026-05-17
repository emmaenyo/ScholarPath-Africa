// components/scholarship/ScholarshipCard.jsx
import Link from 'next/link'

const FUNDING_LABELS = {
  fully_funded: { label: 'Fully Funded', class: 'badge-green' },
  partial: { label: 'Partial', class: 'badge-gold' },
  paid: { label: 'Paid', class: 'badge-blue' },
}

const TYPE_ICONS = {
  scholarship: '🎓',
  fellowship: '🏅',
  internship: '💼',
  'exchange-program': '🔄',
  'research-grant': '🔬',
  'training-program': '📚',
}

const DEGREE_LABELS = {
  bachelors: "Bachelor's",
  masters: "Master's",
  phd: 'PhD',
  all: 'All Levels',
  postdoc: 'Postdoc',
}

export default function ScholarshipCard({ scholarship }) {
  const funding = FUNDING_LABELS[scholarship.funding_type] || { label: scholarship.funding_type, class: 'badge-gray' }

  return (
    <div className="card card-hover p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">
          {TYPE_ICONS[scholarship.type] || '🎓'}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className={funding.class}>{funding.label}</span>
            {scholarship.visa_sponsored === 1 && (
              <span className="badge badge-blue">✈️ Visa</span>
            )}
            {scholarship.is_featured === 1 && (
              <span className="badge bg-amber-50 text-amber-700">⭐ Featured</span>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-gray-900 text-lg leading-tight mb-2 line-clamp-2">
        {scholarship.title}
      </h3>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          🌍 {scholarship.country}
        </span>
        <span className="flex items-center gap-1">
          📚 {DEGREE_LABELS[scholarship.degree_level] || scholarship.degree_level}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1 mb-4">
        {scholarship.description}
      </p>

      {/* Deadline */}
      {scholarship.deadline && (
        <div className="flex items-center gap-1.5 text-sm mb-4">
          <span className="text-gray-400">⏰</span>
          <span className="text-gray-600">Deadline: <strong className="text-gray-800">{scholarship.deadline}</strong></span>
        </div>
      )}

      {/* Host */}
      {scholarship.host_university && (
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
          <span>🏛️</span>
          <span className="truncate">{scholarship.host_university}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2 border-t border-gray-50">
        <Link
          href={`/scholarships/${scholarship.slug}`}
          className="flex-1 text-center text-sm font-medium text-brand-600 hover:text-brand-700 py-2 px-3 rounded-lg hover:bg-brand-50 transition-colors"
        >
          View Details
        </Link>
        <a
          href={scholarship.apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-sm font-medium bg-brand-600 text-white py-2 px-3 rounded-lg hover:bg-brand-700 transition-colors"
        >
          Apply Now →
        </a>
      </div>
    </div>
  )
}
