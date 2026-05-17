// pages/tools/sop-generator.js
import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'

export default function SOPGenerator() {
  const [form, setForm] = useState({
    name: '', country: '', university: '', program: '', degree: 'Master\'s',
    background: '', experience: '', why_program: '', why_university: '', goals: '', impact: '',
    scholarship: '',
  })
  const [sop, setSop] = useState('')
  const [copied, setCopied] = useState(false)

  function handle(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function generate() {
    const { name, country, university, program, degree, background, experience, why_program, why_university, goals, impact, scholarship } = form

    const text = `STATEMENT OF PURPOSE
${program} – ${degree} Program
${university ? university + ' | ' : ''}${country || ''}

My name is ${name || '[Your Name]'}, and I am writing to express my strong interest in the ${degree} program in ${program || '[Field of Study]'}${university ? ` at ${university}` : ''}. ${scholarship ? `I am honored to be applying for the ${scholarship}.` : ''}

ACADEMIC AND PROFESSIONAL BACKGROUND

${background || '[Describe your academic background: your undergraduate degree, major, GPA, relevant coursework, honors or awards. Be specific about what you studied and what sparked your passion for this field.]'}

${experience ? `My professional experience has further deepened my interest in ${program}. ${experience}` : '[Describe any research, work, or volunteer experience relevant to your field. What projects did you work on? What did you achieve? What challenges did you overcome?]'}

WHY THIS PROGRAM

${why_program || `I am particularly drawn to the ${program} program because [explain specific aspects of the program, curriculum, research groups, or methodology that align with your interests and goals. Show you have done your research].`}

${why_university ? `What sets ${university || 'this institution'} apart for me is ${why_university}` : `[Explain specifically why this university/institution is your top choice. Name specific professors, labs, centers, or unique resources that match your research interests.]`}

MY GOALS AND VISION

Upon completing my ${degree} in ${program}, I plan to ${goals || '[describe your short-term career goals – what position or role will you pursue immediately after graduation?]'}

${impact ? `My long-term vision is to ${impact}` : `[Describe your long-term impact goals – how will this degree enable you to make a meaningful difference in Africa or your home country? Be specific and authentic.]`}

CONCLUSION

I am confident that the ${program} program ${university ? `at ${university}` : ''} will provide me with the knowledge, skills, and network to achieve my goals. ${scholarship ? `With the support of the ${scholarship}, I will be able to fully dedicate myself to my studies and give back to my community upon return.` : ''} I am deeply committed to contributing positively to both the academic community and to Africa's development. I look forward to the opportunity to bring my unique perspective and dedication to your program.

Thank you for your consideration.

Sincerely,
${name || '[Your Name]'}
`
    setSop(text)
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(sop)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fields = [
    { name: 'name', label: 'Your Full Name', placeholder: 'e.g. Amara Diallo', type: 'text' },
    { name: 'country', label: 'Destination Country', placeholder: 'e.g. Canada, Germany, UK', type: 'text' },
    { name: 'university', label: 'University Name', placeholder: 'e.g. University of Toronto', type: 'text' },
    { name: 'program', label: 'Program / Field of Study', placeholder: 'e.g. Computer Science, Public Health', type: 'text' },
    { name: 'scholarship', label: 'Scholarship Name (optional)', placeholder: 'e.g. Chevening, DAAD, Fulbright', type: 'text' },
  ]

  const textareas = [
    { name: 'background', label: 'Your Academic Background', placeholder: 'Describe your undergraduate degree, GPA, major, relevant coursework, honors...' },
    { name: 'experience', label: 'Work/Research Experience', placeholder: 'Describe relevant professional or research experience, projects, achievements...' },
    { name: 'why_program', label: 'Why This Program?', placeholder: 'What specific aspects of the program excite you? Name specific courses, professors, or research groups...' },
    { name: 'why_university', label: 'Why This University?', placeholder: 'Why is this institution the best fit for your goals? Be specific...' },
    { name: 'goals', label: 'Career Goals (Short-term)', placeholder: 'What will you do immediately after graduation? What role or position will you pursue?' },
    { name: 'impact', label: 'Long-term Impact in Africa', placeholder: 'How will you use this degree to contribute to Africa\'s development or your home country?' },
  ]

  return (
    <Layout
      title="Free SOP Generator for Scholarship Applications"
      description="Generate a professional Statement of Purpose for scholarship applications. Free tool for African students applying to study abroad."
    >
      <div className="bg-gray-50 border-b py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/tools" className="hover:text-brand-600">Tools</Link>
            <span>›</span>
            <span>SOP Generator</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">✍️ SOP Generator</h1>
          <p className="text-gray-500">Fill in your details and generate a structured Statement of Purpose template</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Degree selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Degree Level</label>
          <div className="flex gap-3">
            {["Bachelor's", "Master's", "PhD"].map(d => (
              <button key={d} type="button" onClick={() => setForm(p => ({ ...p, degree: d }))}
                className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-colors ${
                  form.degree === d ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600 hover:border-brand-300'
                }`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                <input name={f.name} value={form[f.name]} onChange={handle} type={f.type}
                  placeholder={f.placeholder} className="input" />
              </div>
            ))}
          </div>

          {textareas.map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
              <textarea name={f.name} value={form[f.name]} onChange={handle}
                placeholder={f.placeholder} rows={3} className="input resize-none" />
            </div>
          ))}
        </div>

        <button onClick={generate}
          className="btn-primary w-full justify-center py-3.5 mt-6 text-base">
          ✨ Generate SOP Template
        </button>

        {/* Output */}
        {sop && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading font-semibold text-lg text-gray-900">Your SOP Template</h2>
              <button onClick={copyToClipboard}
                className={`btn-outline text-sm ${copied ? 'border-green-500 text-green-600' : ''}`}>
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 font-mono text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
              {sop}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              ⚠️ This is a template. Personalize every section with specific details before submitting. Generic SOPs are rejected.
            </p>
          </div>
        )}

        {/* Tips */}
        <div className="mt-10 bg-amber-50 border border-amber-100 rounded-2xl p-6">
          <h3 className="font-semibold text-amber-900 mb-3">✏️ Tips for a Winning SOP</h3>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>• <strong>Be specific:</strong> Name actual professors, labs, or courses at the university</li>
            <li>• <strong>Tell a story:</strong> Connect your past, present, and future in a narrative</li>
            <li>• <strong>Show impact:</strong> Explain how you'll use your degree to help Africa</li>
            <li>• <strong>Tailor each SOP:</strong> Never use the same SOP for different scholarships</li>
            <li>• <strong>Stay within limits:</strong> Usually 500–1,200 words unless specified</li>
            <li>• <strong>Proofread:</strong> Have at least 2 people review your SOP before submitting</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
