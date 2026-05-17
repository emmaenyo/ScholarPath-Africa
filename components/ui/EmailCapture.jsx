// components/ui/EmailCapture.jsx
import { useState } from 'react'

export default function EmailCapture({ compact = false }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
        setName('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setLoading(false)
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="input flex-1 py-2.5"
        />
        <button type="submit" disabled={loading} className="btn-primary text-sm py-2.5 px-4 whitespace-nowrap">
          {loading ? '...' : 'Subscribe'}
        </button>
        {status === 'success' && <p className="text-green-600 text-sm mt-2">✅ Subscribed!</p>}
      </form>
    )
  }

  return (
    <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 md:p-12 text-white text-center">
      <div className="max-w-xl mx-auto">
        <span className="text-4xl block mb-4">📬</span>
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
          Never Miss a Scholarship Deadline
        </h2>
        <p className="text-brand-100 mb-6 text-sm">
          Get new scholarships, deadlines, and study abroad tips delivered straight to your inbox. Join 10,000+ African students.
        </p>

        {status === 'success' ? (
          <div className="bg-white/20 rounded-xl p-4">
            <p className="text-white font-medium">🎉 You're subscribed! Check your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your first name"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gold-500 hover:bg-gold-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              {loading ? 'Subscribing...' : '🚀 Get Alerts'}
            </button>
          </form>
        )}
        {status === 'error' && <p className="text-red-200 text-sm mt-3">Something went wrong. Try again.</p>}
        <p className="text-brand-200 text-xs mt-3">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </div>
  )
}
