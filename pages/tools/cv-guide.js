// pages/tools/cv-guide.js
import Layout from '../../components/layout/Layout'
import Link from 'next/link'

const cvSections = [
  {
    title: '1. Personal Information',
    icon: '👤',
    content: 'Full name, email address, phone number, LinkedIn/ResearchGate (if relevant), nationality. Do NOT include photo, date of birth, or marital status for Western universities.',
    example: 'Jane Okonkwo | jane.okonkwo@email.com | +234 800 000 0000 | Lagos, Nigeria',
  },
  {
    title: '2. Education',
    icon: '🎓',
    content: 'List in reverse chronological order. Include degree, institution, country, graduation year, GPA/grade, honors. Include thesis title if relevant.',
    example: 'B.Sc. Computer Science | University of Lagos, Nigeria | 2021 | CGPA: 4.78/5.0 | First Class Honours\nThesis: "Machine Learning Applications in Healthcare"',
  },
  {
    title: '3. Research Experience',
    icon: '🔬',
    content: 'Essential for scholarships and PhD applications. List research projects with supervisor name, institution, period, and 2-3 bullet points of key findings or contributions.',
    example: 'Research Assistant | Prof. Adeyemi, UNILAG Computer Science Dept | Jan 2020–June 2021\n• Developed NLP pipeline processing 50K+ clinical records\n• Co-authored 1 peer-reviewed paper (under review)',
  },
  {
    title: '4. Work Experience',
    icon: '💼',
    content: 'Relevant jobs, internships, and consulting. Use action verbs. Quantify impact where possible (managed 10 staff, increased revenue by 30%).',
    example: 'Software Engineer | Interswitch, Lagos | July 2021–Present\n• Built REST APIs serving 200K+ daily transactions\n• Led team of 4 junior developers',
  },
  {
    title: '5. Publications & Conferences',
    icon: '📖',
    content: 'List peer-reviewed papers, conference papers, book chapters. Use proper citation format. Include DOI or URL. Pending papers: mark as "Under Review".',
    example: 'Okonkwo J., Adeyemi K. (2022). "AI in African Healthcare." Journal of Medical Informatics, 15(3), pp. 45-62.',
  },
  {
    title: '6. Awards & Scholarships',
    icon: '🏆',
    content: 'List academic awards, merit scholarships received, competition prizes. Include year and awarding body.',
    example: 'Best Graduating Student Award | Department of Computer Science, UNILAG | 2021\nFaculty of Science Merit Scholarship | UNILAG | 2018–2021',
  },
  {
    title: '7. Skills',
    icon: '⚡',
    content: 'Technical skills (programming languages, software, lab techniques), Language proficiency (with test scores: IELTS 7.5, GRE 320), and relevant soft skills.',
    example: 'Technical: Python, R, TensorFlow, SQL, SPSS\nLanguages: English (Native), French (B2), Hausa (Conversational)\nTest Scores: IELTS 7.5 | GRE: V155/Q165',
  },
  {
    title: '8. Leadership & Volunteering',
    icon: '🌍',
    content: 'Student government, NGO work, community projects, mentorship. Shows character and commitment to impact beyond academics.',
    example: 'President | UNILAG Computer Science Students Association | 2020–2021\n• Organized annual tech fair with 500+ attendees\nVolunteer | African Youth Leadership Forum | 2019–Present',
  },
  {
    title: '9. References',
    icon: '📋',
    content: 'Include 2-3 academic referees (professors who know your work). Include their full title, institution, email, and relationship to you.',
    example: 'Prof. Kofi Mensah | Associate Professor of Engineering | University of Ghana\nkofimensah@ug.edu.gh | PhD Supervisor',
  },
]

export default function CVGuide() {
  return (
    <Layout
      title="Scholarship CV Guide for African Students"
      description="How to write a winning scholarship academic CV. Structure, examples, tips and common mistakes to avoid."
    >
      <div className="bg-gray-50 border-b py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/tools" className="hover:text-brand-600">Tools</Link>
            <span>›</span>
            <span>CV Guide</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 mb-2">📄 Scholarship CV Guide</h1>
          <p className="text-gray-500">How to write an academic CV that wins scholarships</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Intro */}
        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 mb-8">
          <h2 className="font-heading font-semibold text-brand-800 mb-2">What is an Academic CV vs Resume?</h2>
          <p className="text-brand-700 text-sm leading-relaxed">
            A scholarship CV (Curriculum Vitae) is different from a regular resume. It is comprehensive (2–5 pages), includes all academic achievements, publications, and research experience. Never send a 1-page resume for a scholarship application unless specifically requested.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {cvSections.map(section => (
            <div key={section.title} className="card p-6">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl flex-shrink-0">{section.icon}</span>
                <h2 className="font-heading font-semibold text-lg text-gray-900">{section.title}</h2>
              </div>
              <p className="text-gray-600 text-sm mb-3">{section.content}</p>
              <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs text-gray-600 whitespace-pre-wrap border border-gray-100">
                {section.example}
              </div>
            </div>
          ))}
        </div>

        {/* Do's and Don'ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
            <h3 className="font-semibold text-green-800 mb-3">✅ Do This</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Use consistent formatting throughout</li>
              <li>• Quantify achievements (increased by 30%, 500 students reached)</li>
              <li>• Use action verbs (led, developed, managed, published)</li>
              <li>• Tailor CV for each scholarship</li>
              <li>• Save as PDF to preserve formatting</li>
              <li>• Name file: FirstName_LastName_CV.pdf</li>
              <li>• Get a professor or mentor to review it</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
            <h3 className="font-semibold text-red-800 mb-3">❌ Avoid These</h3>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Adding a photo (for Western universities)</li>
              <li>• Including marital status or religion</li>
              <li>• Spelling errors or typos</li>
              <li>• Objective statement (outdated)</li>
              <li>• Vague bullet points ("responsible for...")</li>
              <li>• Overly decorative or colorful design</li>
              <li>• Submitting in Word format</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/tools/sop-generator" className="btn-primary">
            Next: Generate Your SOP →
          </Link>
        </div>
      </div>
    </Layout>
  )
}
