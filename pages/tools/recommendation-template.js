import { useState } from 'react';
import Layout from '../../components/layout/Layout';

const templates = {
  academic: {
    label: 'Academic / Professor',
    body: (f) => `[Letterhead / Institution Name]
[Date]

Scholarship Committee
[Scholarship Name]

Dear Members of the Scholarship Committee,

It is my great pleasure to recommend ${f.studentName || '[Student Name]'} for the ${f.scholarshipName || '[Scholarship Name]'}. I have known ${f.studentName || 'this student'} for ${f.duration || '[X years/months]'} in my capacity as ${f.recommenderRole || '[your role]'} at ${f.institution || '[Institution]'}.

${f.studentName || 'The applicant'} is among the most ${f.qualities || 'dedicated, intellectually curious, and capable'} students I have had the privilege of teaching. During this period, they demonstrated exceptional ${f.skills || 'analytical thinking, research aptitude, and academic excellence'}.

One particular example that stands out: ${f.example || '[Describe a specific project, achievement, or moment that illustrates the student\'s exceptional qualities]'}. This demonstrated not only ${f.studentName || 'their'} academic abilities but also their ${f.softSkills || 'leadership, resilience, and commitment to excellence'}.

${f.studentName || 'This student'} has expressed a clear ambition to ${f.goals || '[student\'s academic/career goals]'}. I am fully confident that they have the intellect, work ethic, and character to succeed in this program and to make meaningful contributions to their field and their home country.

I recommend ${f.studentName || 'this applicant'} without reservation and in the strongest possible terms. Should you have any questions, please do not hesitate to contact me at ${f.recommenderEmail || '[your email]'}.

Sincerely,

${f.recommenderName || '[Your Full Name]'}
${f.recommenderRole || '[Title/Position]'}
${f.institution || '[Institution]'}
${f.recommenderEmail || '[Email]'} | ${f.recommenderPhone || '[Phone]'}`,
  },
  employer: {
    label: 'Employer / Supervisor',
    body: (f) => `[Company/Organization Letterhead]
[Date]

Scholarship Committee
[Scholarship Name]

Dear Scholarship Committee,

I am writing to enthusiastically recommend ${f.studentName || '[Applicant Name]'} for the ${f.scholarshipName || '[Scholarship Name]'}. In my role as ${f.recommenderRole || '[your title]'} at ${f.institution || '[Organization]'}, I have had the opportunity to work with ${f.studentName || 'this individual'} for ${f.duration || '[duration]'}.

During this time, ${f.studentName || 'the applicant'} consistently demonstrated exceptional ${f.qualities || 'professionalism, initiative, and problem-solving abilities'}. Their contributions to our team include ${f.skills || '[specific contributions and skills demonstrated]'}.

A notable example of their impact: ${f.example || '[Describe a specific project or achievement with measurable outcomes]'}. This initiative showcased their ability to ${f.softSkills || 'lead under pressure, collaborate across teams, and deliver results'}.

I am confident that ${f.studentName || 'this applicant'} will bring the same energy, commitment, and talent to their graduate studies. Their goal to ${f.goals || '[student\'s stated career goals]'} aligns well with the mission of this scholarship, and I believe they will be an outstanding representative of your program.

Please feel free to contact me at ${f.recommenderEmail || '[email]'} if you require additional information.

Warm regards,

${f.recommenderName || '[Your Full Name]'}
${f.recommenderRole || '[Title]'}
${f.institution || '[Organization]'}
${f.recommenderPhone || '[Phone]'} | ${f.recommenderEmail || '[Email]'}`,
  },
  community: {
    label: 'Community / NGO Leader',
    body: (f) => `[Organization Letterhead]
[Date]

To the ${f.scholarshipName || '[Scholarship Name]'} Committee,

It is with immense pride that I write this letter of recommendation for ${f.studentName || '[Applicant Name]'}, a remarkable young person who has shown extraordinary commitment to community service and leadership in ${f.institution || '[community/region]'}.

I have known ${f.studentName || 'the applicant'} for ${f.duration || '[duration]'} through their involvement with ${f.recommenderRole || '[organization/initiative]'}. In this time, they have demonstrated outstanding ${f.qualities || 'dedication, empathy, and leadership'} qualities.

Their most significant contribution was ${f.example || '[describe a community project, initiative or leadership role with clear impact]'}. Through this work, they impacted ${f.skills || '[describe number of people/communities affected and how]'}, demonstrating both ${f.softSkills || 'grassroots organizing skills and strategic thinking'}.

${f.studentName || 'This individual'} seeks to pursue ${f.goals || '[their academic/professional goals]'} — a vision that is deeply rooted in their desire to serve their community and continent. The ${f.scholarshipName || 'this scholarship'} would provide them with the platform to gain the knowledge and networks needed to amplify their impact.

I recommend them wholeheartedly.

With respect,

${f.recommenderName || '[Your Full Name]'}
${f.recommenderRole || '[Title / Organization]'}
${f.recommenderEmail || '[Email]'}`,
  },
};

export default function RecommendationTemplate() {
  const [form, setForm] = useState({
    studentName: '', scholarshipName: '', recommenderName: '',
    recommenderRole: '', recommenderEmail: '', recommenderPhone: '',
    institution: '', duration: '', qualities: '', skills: '',
    softSkills: '', example: '', goals: '',
  });
  const [type, setType] = useState('academic');
  const [copied, setCopied] = useState(false);

  const output = templates[type].body(form);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout
      title="Recommendation Letter Template | ScholarPath Africa"
      description="Generate professional recommendation letter templates for scholarship applications. Customizable for academic, employer, and community references."
    >
      <div className="bg-green-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-2 text-green-700 font-semibold text-sm uppercase tracking-wide">Tools</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Recommendation Letter Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Create a professional reference letter template for your recommender to personalise and sign.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <div className="card p-6 mb-6">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Letter Type</h2>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(templates).map(([key, tmpl]) => (
                <label key={key} className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${type === key ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                  <input type="radio" name="type" value={key} checked={type === key} onChange={() => setType(key)} className="text-green-600" />
                  <span className="font-medium text-gray-800">{tmpl.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Fill in Details</h2>
            <div className="space-y-4">
              {[
                { key: 'studentName', label: 'Student / Applicant Full Name', placeholder: 'e.g. Amara Diallo' },
                { key: 'scholarshipName', label: 'Scholarship Name', placeholder: 'e.g. Chevening Scholarship' },
                { key: 'recommenderName', label: 'Recommender Full Name', placeholder: 'e.g. Dr. James Osei' },
                { key: 'recommenderRole', label: 'Recommender Title / Role', placeholder: 'e.g. Associate Professor of Economics' },
                { key: 'institution', label: 'Institution / Organization', placeholder: 'e.g. University of Ghana' },
                { key: 'recommenderEmail', label: 'Recommender Email', placeholder: 'e.g. j.osei@ug.edu.gh' },
                { key: 'recommenderPhone', label: 'Recommender Phone', placeholder: 'e.g. +233 XX XXX XXXX' },
                { key: 'duration', label: 'How long have they known the student?', placeholder: 'e.g. 2 years, since 2022' },
                { key: 'qualities', label: 'Key Qualities (comma-separated)', placeholder: 'e.g. intellectually curious, diligent, innovative' },
                { key: 'skills', label: 'Academic / Professional Skills', placeholder: 'e.g. data analysis, research design, grant writing' },
                { key: 'softSkills', label: 'Soft Skills / Character', placeholder: 'e.g. leadership, empathy, resilience' },
                { key: 'example', label: 'Specific Achievement / Example', placeholder: 'Describe a concrete story or project...' },
                { key: 'goals', label: "Student's Academic / Career Goals", placeholder: 'e.g. pursue a PhD in Public Health and return to improve health systems in Nigeria' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  {key === 'example' || key === 'goals' ? (
                    <textarea
                      rows={3}
                      className="input"
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    />
                  ) : (
                    <input
                      type="text"
                      className="input"
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-xl font-bold text-gray-900">Generated Letter</h2>
              <button onClick={handleCopy} className={`btn-primary text-sm px-4 py-2 ${copied ? 'bg-green-700' : ''}`}>
                {copied ? '✓ Copied!' : 'Copy Letter'}
              </button>
            </div>
            <div className="card p-6 bg-white">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{output}</pre>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Share this with your recommender and ask them to personalise and print on official letterhead.
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border-t border-amber-100 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Tips for Getting Strong Recommendation Letters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Ask early', body: 'Give recommenders at least 4–6 weeks notice. Last-minute requests lead to generic letters.' },
              { title: 'Provide a briefing document', body: 'Share your CV, personal statement draft, and scholarship details so they can tailor the letter.' },
              { title: 'Choose the right person', body: 'Pick someone who knows your work well, not just the most senior person you know.' },
              { title: 'Follow up politely', body: 'Send a reminder one week before the deadline — recommenders are busy.' },
              { title: 'Express gratitude', body: 'Send a thank-you note after submission, regardless of outcome.' },
              { title: 'Confirm submission', body: 'For online portals, verify the recommender received the system email and submitted on time.' },
            ].map(tip => (
              <div key={tip.title} className="flex gap-3">
                <span className="text-green-600 text-lg mt-0.5">✓</span>
                <div>
                  <div className="font-semibold text-gray-800">{tip.title}</div>
                  <div className="text-gray-600 text-sm">{tip.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
