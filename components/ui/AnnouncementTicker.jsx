// components/ui/AnnouncementTicker.jsx
import Link from 'next/link';

const announcements = [
  '🆕 New scholarships added daily — bookmark this page and check back often!',
  '🎓 Fully funded scholarships for African students updated every week!',
  '💰 Hundreds of fully funded opportunities available — apply before deadlines close!',
  '🌍 500+ scholarships, fellowships & internships for African students worldwide',
  '✈️ Visa-sponsored opportunities available — filter by "Visa Sponsored" to find them',
  '🏅 New fellowships just added — check the Fellowships section today!',
  '💼 Paid internships at the UN, World Bank & IMF — apply now!',
  '🔔 Subscribe to get notified when new opportunities are added!',
  '🎤 International conferences with full funding for African scholars — browse now!',
  '📝 New blog posts added regularly — tips, guides, and application advice!',
  '⏰ Deadlines approaching — check your saved scholarships today!',
  '🌟 Featured scholarships updated — see what\'s new this week!',
  '📚 Free tools available — SOP Generator, CV Guide, Visa Tips and more!',
  '🔍 Use our search filters to find scholarships that match your profile!',
  '💡 Tip: Apply to at least 5 scholarships to maximise your chances!',
];

export default function AnnouncementTicker() {
  const items = [...announcements, ...announcements];

  return (
    <div className="bg-green-700 text-white overflow-hidden relative" style={{ height: '38px' }}>
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10"
        style={{ background: 'linear-gradient(to right, #15803d, transparent)' }} />

      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10"
        style={{ background: 'linear-gradient(to left, #15803d, transparent)' }} />

      {/* Label */}
      <div className="absolute left-0 top-0 bottom-0 z-20 bg-green-900 flex items-center px-4 gap-2 whitespace-nowrap">
        <span className="animate-pulse text-green-300">●</span>
        <span className="font-bold text-xs uppercase tracking-wider text-green-100">Live Updates</span>
      </div>

      {/* Scrolling ticker */}
      <div className="flex items-center h-full pl-36" style={{ overflow: 'hidden' }}>
        <div className="ticker-track flex items-center gap-0 whitespace-nowrap">
          {items.map((item, i) => (
            <span key={i} className="ticker-item inline-flex items-center text-sm text-green-50">
              {item}
              <span className="mx-8 text-green-400">◆</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ticker-track {
          animation: ticker-scroll 80s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
