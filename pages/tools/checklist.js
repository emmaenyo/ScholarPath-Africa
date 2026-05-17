// pages/tools/checklist.js
import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'

const checklistItems = [
  { category: '📝 Application Documents', items: [
    'Statement of Purpose (SOP) / Personal Statement',
    'Academic CV / Resume',
    'Official transcripts (notarized/translated if needed)',
    'Degree certificates (notarized copies)',
    'Proof of language proficiency (IELTS/TOEFL/DELF)',
    'GRE/GMAT scores (if required)',
    'Research proposal (for PhD applications)',
    'Portfolio (for arts/design programs)',
  ]},
  { category: '📨 Recommendation Letters', items: [
    'Identify 2-3 recommenders (professors, supervisors)',
    'Request letters at least 6-8 weeks in advance',
    'Send recommenders your CV and scholarship details',
    'Confirm recommenders have submitted by deadline',
    'Have backup recommenders ready',
  ]},
  { category: '📋 Application Process', items: [
    'Create online application account',
    'Fill in all application form sections',
    'Upload all required documents',
    'Pay application fee (if required)',
    'Submit application before deadline',
    'Save confirmation/reference number',
    'Note interview dates (if applicable)',
  ]},
  { category: '✈️ Visa & Travel Documents', items: [
    'Valid passport (minimum 6 months beyond program end)',
    'Offer letter / Certificate of Enrollment',
    'Financial proof / blocked account',
    'Health/medical certificate (if required)',
    'Police clearance certificate',
    'Accommodation confirmation',
    'Travel insurance',
    'Visa appointment booked',
  ]},
  { category: '💰 Financial Planning', items: [
    'Calculate total scholarship coverage',
    'Identify any funding gaps',
    'Open a blocked account (Germany) or show bank statement',
    'Research part-time work rules for destination country',
    'Plan for initial setup costs (flight, deposit, SIM card)',
  ]},
  { category: '🎓 Post-Acceptance', items: [
    'Accept scholarship offer formally',
    'Complete enrollment at university',
    'Apply for student accommodation',
    'Register with health insurance',
    'Connect with alumni network',
    'Join scholarship scholar community',
    'Book flights (early for best prices)',
  ]},
]

export default function ChecklistPage() {
  const [checked, setChecked] = useState({})

  function toggle(key) {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const total = checklistItems.reduce((acc, c) => acc + c.items.length, 0)
  const done = Object.values(checked).filter(Boolean).length

  return (
    <Layout
      title="Scholarship Application Checklist"
      description="Complete scholarship application checklist for African students. Never miss a document with this step-by-step guide."
    >
      <div className="bg-gray-50 border-b py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/tools" className="hover:text-brand-600">Tools</Link>
            <span>›</span>
            <span>Application Checklist</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">✅ Application Checklist</h1>
          <p className="text-gray-500">Track your scholarship application progress</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Progress */}
        <div className="card p-5 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">Your Progress</span>
            <span className="text-brand-600 font-bold">{done}/{total} completed</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 rounded-full transition-all duration-500"
              style={{ width: `${(done / total) * 100}%` }}
            />
          </div>
          {done === total && total > 0 && (
            <p className="text-green-600 font-medium mt-2 text-sm">🎉 You're ready to apply!</p>
          )}
        </div>

        {/* Checklist */}
        <div className="space-y-6">
          {checklistItems.map(section => (
            <div key={section.category} className="card p-5">
              <h2 className="font-heading font-semibold text-gray-900 mb-4">{section.category}</h2>
              <div className="space-y-2">
                {section.items.map((item, i) => {
                  const key = `${section.category}-${i}`
                  return (
                    <label key={key} className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={!!checked[key]}
                        onChange={() => toggle(key)}
                        className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 mt-0.5 flex-shrink-0"
                      />
                      <span className={`text-sm leading-relaxed ${checked[key] ? 'line-through text-gray-400' : 'text-gray-700 group-hover:text-gray-900'}`}>
                        {item}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          Your progress is saved locally in your browser.
        </p>
      </div>
    </Layout>
  )
}
