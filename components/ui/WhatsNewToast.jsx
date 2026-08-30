// components/ui/WhatsNewToast.jsx
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function WhatsNewToast() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Toast message — update this whenever you add new content
  const update = {
    count: 26,
    label: 'fresh opportunities added',
    highlights: ['Chevening 2027', 'Rhodes Scholarships', 'Knight-Hennessy Stanford', 'World Bank Fellowship'],
    date: 'August 30, 2026',
    link: '/scholarships',
  }

  useEffect(() => {
    // Only show once per session
    const key = `whats_new_${update.date.replace(/\s/g, '_')}`
    const seen = sessionStorage.getItem(key)
    if (!seen) {
      // Show after 2 seconds
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  function dismiss() {
    const key = `whats_new_${update.date.replace(/\s/g, '_')}`
    sessionStorage.setItem(key, '1')
    setDismissed(true)
    setTimeout(() => setVisible(false), 300)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 max-w-sm w-full transition-all duration-300 ${
        dismissed ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="animate-pulse text-green-200">●</span>
            <span className="text-white text-sm font-semibold">Just Updated</span>
          </div>
          <button
            onClick={dismiss}
            className="text-green-200 hover:text-white transition-colors text-lg leading-none"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🎓</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">
                {update.count} {update.label}!
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{update.date}</p>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-1 mb-4">
            {update.highlights.map(h => (
              <div key={h} className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-green-500 font-bold">✓</span>
                {h}
              </div>
            ))}
            <div className="text-xs text-gray-400 pl-4">...and more</div>
          </div>

          {/* CTA */}
          <Link
            href={update.link}
            onClick={dismiss}
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            View New Opportunities →
          </Link>
        </div>
      </div>
    </div>
  )
}
