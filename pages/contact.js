// pages/contact.js
import { useState } from 'react'
import Layout from '../components/layout/Layout'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.scholarpathafrica.com'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '', website: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const set = k => e => setForm({ ...form, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setStatus('sending'); setError('')
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(data.error || 'Could not send your message.')
      setStatus('sent')
    } catch (err) {
      setError(err.message); setStatus('error')
    }
  }

  return (
    <Layout
      title="Contact ScholarPath Africa"
      description="Report an error, suggest an opportunity, or ask a question. Contact the ScholarPath Africa team."
      canonical={`${SITE_URL}/contact`}
    >
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
        <p className="text-gray-600 text-lg mb-10">Found a mistake, want to suggest an opportunity, or have a question? Send us a message.</p>

        {status === 'sent' ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center" role="status">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Message received</h2>
            <p className="text-gray-600">Thank you. We read every message and aim to reply within a few working days.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="card p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="c-name" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                <input id="c-name" required type="text" className="input" value={form.name} onChange={set('name')} />
              </div>
              <div>
                <label htmlFor="c-email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input id="c-email" required type="email" className="input" value={form.email} onChange={set('email')} />
              </div>
            </div>
            <div>
              <label htmlFor="c-subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select id="c-subject" className="input" value={form.subject} onChange={set('subject')}>
                <option>General Inquiry</option>
                <option>Report an Error</option>
                <option>Suggest an Opportunity</option>
                <option>Partnership</option>
                <option>Advertising</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="c-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="c-message" required rows={6} className="input" value={form.message} onChange={set('message')} />
            </div>
            {/* Honeypot — hidden from people */}
            <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
              <label>Website <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label>
            </div>
            {status === 'error' && <p className="text-red-600 text-sm" role="alert">{error}</p>}
            <button type="submit" disabled={status === 'sending'} className="btn-primary w-full py-3 disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}

        <div className="mt-10 bg-gray-50 rounded-xl p-5 text-sm text-gray-600">
          <p><strong className="text-gray-800">Email:</strong> info@scholarpathafrica.com</p>
          <p className="mt-2">When reporting an error, please include the page address and the correct information so we can fix it quickly. ScholarPath Africa never asks applicants for payment.</p>
        </div>
      </div>
    </Layout>
  )
}
