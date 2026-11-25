// components/ui/AdBanner.jsx
// Renders NOTHING until a real AdSense ad-unit slot ID is configured, so visitors and
// reviewers never see empty "Ad space" boxes. After approval, set the env var
// NEXT_PUBLIC_ADSENSE_SLOT (Vercel → Settings → Environment Variables) to your ad unit ID.
import { useEffect } from 'react'

const CLIENT = 'ca-pub-8236303795073111'

export default function AdBanner({ className = '' }) {
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT
  useEffect(() => {
    if (!slot) return
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch (e) {}
  }, [slot])

  if (!slot) return null

  return (
    <div className={`w-full ${className}`}>
      <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-1 font-medium">Advertisement</p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
