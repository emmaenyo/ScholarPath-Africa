// pages/contact.js
import { useState } from 'react'
import Layout from '../components/layout/Layout'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <Layout
      title="Contact ScholarPath Africa"
      description="Get in touch with ScholarPath Africa. Contact us for scholarship inquiries, partnership opportunities, content submissions, or general questions."
      keywords="contact ScholarPath Africa, scholarship inquiry, partnership ScholarPath"
      canonical={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarpathafrica.com'}/contact`}
    >
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
        <p className="text-gray-600 text-lg mb-10">Have a question, suggestion, or partnership inquiry? We'd love to hear from you.</p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Message Sent!</h2>
            <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 48 hours.</p>
          </div>
        ) : (
          <div className="card p-8">
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="input" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" className="input" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select className="input">
                  <option>General Inquiry</option>
                  <option>Scholarship Submission</option>
                  <option>Partnership Opportunity</option>
                  <option>Content Correction</option>
                  <option>Advertising</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={5} className="input" placeholder="How can we help you?" />
              </div>
              <button onClick={() => setSubmitted(true)} className="btn-primary w-full py-3">
                Send Message
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: '📧', title: 'Email Us', desc: 'info@scholarpathafrica.com' },
            { icon: '⏱️', title: 'Response Time', desc: 'Within 48 hours' },
            { icon: '🌍', title: 'Serving', desc: 'All 54 African countries' },
          ].map(item => (
            <div key={item.title} className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-semibold text-gray-800 text-sm">{item.title}</div>
              <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
