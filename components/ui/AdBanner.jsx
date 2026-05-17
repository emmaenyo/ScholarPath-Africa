// components/ui/AdBanner.jsx
export default function AdBanner({ slot = 'sidebar', className = '' }) {
  const adId = process.env.NEXT_PUBLIC_ADSENSE_ID

  if (slot === 'sidebar') {
    return (
      <div className={`rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-4 text-center text-xs text-gray-400 ${className}`}>
        {adId ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={adId}
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="py-8">
            <p className="font-medium text-gray-500">Advertisement</p>
            <p className="text-gray-400 mt-1">300×250</p>
            <p className="text-gray-300 mt-2 text-xs">Configure AdSense in .env.local</p>
          </div>
        )}
      </div>
    )
  }

  if (slot === 'leaderboard') {
    return (
      <div className={`rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-3 text-center ${className}`}>
        {adId ? (
          <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client={adId} data-ad-slot="9876543210" data-ad-format="auto" data-full-width-responsive="true" />
        ) : (
          <p className="text-xs text-gray-400 py-3">Advertisement (728×90)</p>
        )}
      </div>
    )
  }

  return null
}

// Sponsored listing badge (for future featured/paid listings)
export function SponsoredBadge() {
  return (
    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">
      Sponsored
    </span>
  )
}
