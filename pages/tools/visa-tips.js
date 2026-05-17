// pages/tools/visa-tips.js
import Layout from '../../components/layout/Layout'
import Link from 'next/link'

const visaGuides = [
  {
    country: '🇬🇧 United Kingdom',
    visa: 'Student Visa (formerly Tier 4)',
    key_docs: ['CAS (Confirmation of Acceptance for Studies) from university', 'Passport valid for duration of stay', 'Proof of funds: £1,334/month for courses outside London', 'ATAS certificate (for certain science courses)', 'English language proof (IELTS 5.5–7.0)'],
    tips: ['Apply online via UK Visa & Immigration website', 'Book biometric appointment early', 'Graduate Route visa allows 2 years work after graduation', 'Processing typically 3 weeks'],
    cost: '~£490 (£363 application + IHS surcharge)',
  },
  {
    country: '🇩🇪 Germany',
    visa: 'National Visa (Student)',
    key_docs: ['University admission letter', 'Blocked account showing €10,332 (or scholarship letter)', 'Health insurance', 'Academic transcripts', 'Motivation letter', 'CV'],
    tips: ['Apply at German Embassy/Consulate in your country', 'Processing: 4–12 weeks', 'DAAD scholars need DAAD scholarship letter', 'Must register at local Einwohnermeldeamt within 2 weeks of arrival'],
    cost: '€75 visa fee',
  },
  {
    country: '🇨🇦 Canada',
    visa: 'Study Permit',
    key_docs: ['Letter of Acceptance from DLI (Designated Learning Institution)', 'Proof of funds', 'Passport', 'Biometric', 'Letter of explanation', 'Ties to home country'],
    tips: ['Apply online through IRCC portal', 'Processing: 4–16 weeks', 'SDS (Student Direct Stream) faster for some African countries', 'After graduation: PGWP (Post-Graduate Work Permit) available'],
    cost: 'CAD $150',
  },
  {
    country: '🇺🇸 USA',
    visa: 'F-1 Student Visa',
    key_docs: ['I-20 form from university', 'SEVIS fee payment receipt (~$350)', 'DS-160 form completed online', 'Proof of financial support', 'Interview at US Embassy/Consulate'],
    tips: ['Interview is mandatory', 'Show strong ties to home country', 'Be clear and confident about study plans', 'Scholarship award letter significantly helps', 'Processing: 2-4 weeks after interview'],
    cost: '$185 visa application fee + $350 SEVIS fee',
  },
  {
    country: '🇦🇺 Australia',
    visa: 'Student Visa (Subclass 500)',
    key_docs: ['Confirmation of Enrollment (CoE)', 'Genuine Temporary Entrant (GTE) statement', 'OSHC (Overseas Student Health Cover)', 'Financial evidence', 'English proficiency (IELTS 5.5+)'],
    tips: ['Apply online through ImmiAccount', 'GTE is critical — explain why you plan to return home', 'Processing: 1-3 months', 'Can work 48 hours/fortnight during semester'],
    cost: 'AUD $710',
  },
]

const commonMistakes = [
  { title: 'Not showing ties to home country', desc: 'Visa officers need to believe you will return home. Mention family, job offers, property, or career plans back home.' },
  { title: 'Insufficient funds proof', desc: 'Show the exact amount required, in the right currency, with recent bank statements (last 3-6 months).' },
  { title: 'Unclear study plans', desc: 'Be specific about why you\'re studying, what you will do with your degree, and how it connects to your career goals.' },
  { title: 'Applying too late', desc: 'Apply for your visa as soon as you receive your admission letter. Some embassies are very slow.' },
  { title: 'Inconsistent documents', desc: 'Every document must be consistent — spelling of name, dates, and addresses across all forms.' },
  { title: 'Panic in the interview', desc: 'Practice answering questions out loud. Know your program, university, and scholarship details thoroughly.' },
]

export default function VisaTipsPage() {
  return (
    <Layout
      title="Student Visa Tips for African Students"
      description="How to get your student visa approved. Complete guide for UK, Canada, Germany, USA and Australia student visas for African students."
    >
      <div className="bg-gray-50 border-b py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/tools" className="hover:text-brand-600">Tools</Link>
            <span>›</span>
            <span>Visa Tips</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">✈️ Student Visa Guide</h1>
          <p className="text-gray-500">Everything you need to know to get your student visa approved</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Common mistakes first */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-10">
          <h2 className="font-heading font-semibold text-red-800 mb-4">⚠️ Top Reasons Student Visas Get Rejected</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonMistakes.map(m => (
              <div key={m.title}>
                <h3 className="font-semibold text-red-700 text-sm">{m.title}</h3>
                <p className="text-red-600 text-xs mt-0.5">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Country guides */}
        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Visa Guides by Country</h2>
        <div className="space-y-6">
          {visaGuides.map(guide => (
            <div key={guide.country} className="card p-6">
              <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                <div>
                  <h3 className="font-heading font-bold text-xl text-gray-900">{guide.country}</h3>
                  <p className="text-brand-600 text-sm font-medium">{guide.visa}</p>
                </div>
                <span className="badge-gray text-xs">{guide.cost}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">📋 Required Documents</h4>
                  <ul className="space-y-1.5">
                    {guide.key_docs.map(doc => (
                      <li key={doc} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-brand-500 mt-0.5">•</span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">💡 Tips</h4>
                  <ul className="space-y-1.5">
                    {guide.tips.map(tip => (
                      <li key={tip} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interview questions */}
        <div className="mt-10 card p-6">
          <h2 className="font-heading font-semibold text-lg text-gray-900 mb-4">🎤 Common Visa Interview Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Why do you want to study in [country]?', a: 'Mention the quality of education, specific university or program, research opportunities, and how it aligns with your career goals.' },
              { q: 'What will you do after graduation?', a: 'Show strong intention to return home. Mention a specific career goal, job prospect, or family commitment in your home country.' },
              { q: 'Who is sponsoring your studies?', a: 'Clearly explain the scholarship, its value, and what it covers. Bring supporting documents.' },
              { q: 'Do you have family in [country]?', a: 'Answer honestly. If yes, reassure the officer that you intend to return home after your studies.' },
              { q: 'Have you applied to other countries?', a: 'You can be honest. Explain why this country is your primary choice.' },
            ].map(qa => (
              <div key={qa.q} className="border-l-4 border-brand-300 pl-4">
                <p className="font-medium text-gray-800 text-sm">Q: {qa.q}</p>
                <p className="text-gray-500 text-sm mt-1">✅ {qa.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/scholarships?visa=1" className="btn-primary">
            Browse Visa-Sponsored Scholarships →
          </Link>
        </div>
      </div>
    </Layout>
  )
}
