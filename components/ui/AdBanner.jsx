// components/ui/AdBanner.jsx
export default function AdBanner({ slot = 'default', className = '' }) {
  const isLeaderboard = slot === 'leaderboard'
  const isSidebar = slot === 'sidebar'

  return (
    <div className={`w-full ${className}`}>
      <div className="text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-medium">Advertisement</p>
        <div
          className={`bg-gray-100 border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 text-sm mx-auto ${
            isLeaderboard
              ? 'w-full h-24 md:h-28'
              : isSidebar
              ? 'w-full h-60'
              : 'w-full h-24'
          }`}
        >
          {/* Replace this div with your AdSense code */}
          {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
              <ins class="adsbygoogle" ... ></ins> */}
          <span className="text-xs text-gray-300">Ad space</span>
        </div>
      </div>
    </div>
  )
}
