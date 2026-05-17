import { useState } from 'react';
import Layout from '../../components/layout/Layout';

const sections = [
  {
    id: 'hook',
    title: '1. Opening Hook',
    icon: '🎯',
    guidance: 'Start with a compelling story, personal moment, or bold statement that reveals WHY you want this scholarship. Avoid clichés like "I have always been passionate about..."',
    prompts: [
      'What specific moment in your life made you choose this field?',
      'What problem have you witnessed that drives your ambition?',
      'What is a defining experience from your community or family?',
    ],
    example: 'When the electricity went out for the third day in a row during my final school exams in Kumasi, I studied by candlelight — and decided that energy poverty would not define my generation\'s future. That night shaped my decision to pursue Renewable Energy Engineering.',
  },
  {
    id: 'background',
    title: '2. Academic & Professional Background',
    icon: '📚',
    guidance: 'Summarise your most relevant qualifications, achievements, and experience. Be specific — use numbers, awards, and outcomes. Don\'t just list — connect everything to your goals.',
    prompts: [
      'What is your strongest academic achievement and why does it matter?',
      'What research, internship, or work experience is most relevant?',
      'What leadership roles or publications set you apart?',
    ],
    example: 'I graduated first in my class in Electrical Engineering from Makerere University, where I designed a low-cost solar inverter prototype that reduced costs by 40%. I subsequently worked with the Rwanda Energy Group, managing a rural electrification project that connected 3,200 households.',
  },
  {
    id: 'why_program',
    title: '3. Why This Program / University',
    icon: '🎓',
    guidance: 'Show you have done your research. Name specific professors, research groups, modules, or facilities. Generic letters are rejected — personalisation is essential.',
    prompts: [
      'Which professor\'s research aligns with your interests?',
      'What specific module or lab will advance your goals?',
      'Why is this institution the right fit (not just any university)?',
    ],
    example: 'The MSc in Sustainable Energy at TU Delft is uniquely aligned with my interests. Professor van den Berg\'s research on off-grid microgrids for Sub-Saharan Africa directly intersects with my work in Rwanda. The Energy Transition Lab offers hands-on prototyping facilities unavailable in my region.',
  },
  {
    id: 'why_scholarship',
    title: '4. Why This Scholarship',
    icon: '🏆',
    guidance: 'Connect your values to the scholarship\'s mission. Explain why you are the ideal candidate — not just academically, but in terms of the change you will create.',
    prompts: [
      'What does this scholarship stand for, and how do your values align?',
      'Why is this funding critical to your plans?',
      'What will you contribute to the scholarship community?',
    ],
    example: 'The DAAD\'s commitment to building long-term capacity in developing nations resonates with my conviction that Africa\'s energy crisis requires home-grown expertise. This scholarship is not just financial support — it is a chance to build bridges between German engineering excellence and African implementation realities.',
  },
  {
    id: 'goals',
    title: '5. Future Goals & Impact',
    icon: '🌍',
    guidance: 'Be specific about what you will do with this degree. Vague goals like "make a difference" are weak. Show a clear plan: short-term (immediately after graduation), medium-term (5 years), and long-term vision.',
    prompts: [
      'What specific role or organisation will you return to?',
      'What project or policy change will you work on?',
      'How will your community/country benefit from your education?',
    ],
    example: 'Upon graduation, I will return to Rwanda and join the Ministry of Infrastructure\'s energy division to develop a national microgrid policy framework. Within five years, I aim to establish a Social Enterprise that deploys community-owned solar mini-grids in at least 50 rural villages. Long-term, I envision a pan-African clean energy consultancy.',
  },
  {
    id: 'closing',
    title: '6. Closing Paragraph',
    icon: '✍️',
    guidance: 'End with confidence and gratitude. Restate your core thesis. Express readiness and excitement. Avoid sounding desperate or overly formal.',
    prompts: [
      'What is the one thing you want the committee to remember about you?',
      'What will you bring to the cohort and university community?',
    ],
    example: 'I am ready for the intellectual rigour, cultural exchange, and transformative experience that studying at TU Delft will bring. I am committed to returning home with the tools to contribute meaningfully to Africa\'s energy future. I am grateful for this opportunity and look forward to becoming part of the DAAD alumni community.',
  },
];

const commonMistakes = [
  { mistake: 'Starting with "I have always been passionate about..."', fix: 'Start with a story or specific moment — show, don\'t tell.' },
  { mistake: 'Copying content from the CV without adding value', fix: 'Interpret your experiences — explain what you learned and how it shapes your goals.' },
  { mistake: 'Being vague about future plans', fix: 'Name specific organisations, roles, or projects you will pursue.' },
  { mistake: 'Ignoring the scholarship\'s values and mission', fix: 'Read the scholarship\'s website thoroughly and mirror their language where authentic.' },
  { mistake: 'Submitting without proofreading', fix: 'Use Grammarly, read aloud, and have a native English speaker review if possible.' },
  { mistake: 'Exceeding the word limit', fix: 'Adhere strictly — committees see it as inability to follow instructions.' },
  { mistake: 'Writing in too formal or too casual a tone', fix: 'Match the tone of the scholarship — research-focused programs want analytical writing; community-focused ones value warmth.' },
];

export default function MotivationLetter() {
  const [activeSection, setActiveSection] = useState('hook');
  const [showExample, setShowExample] = useState({});

  return (
    <Layout
      title="Motivation Letter Guide | ScholarPath Africa"
      description="Learn how to write a powerful scholarship motivation letter. Section-by-section guide with examples for African students applying to scholarships abroad."
    >
      <div className="bg-green-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-2 text-green-700 font-semibold text-sm uppercase tracking-wide">Tools</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Motivation Letter Writing Guide
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            A section-by-section guide to writing a compelling scholarship motivation letter — with prompts and real examples.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 card p-4">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide mb-3">Sections</h3>
            <nav className="space-y-1">
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeSection === s.id ? 'bg-green-600 text-white font-medium' : 'text-gray-600 hover:bg-green-50'}`}
                >
                  {s.icon} {s.title}
                </button>
              ))}
              <button
                onClick={() => setActiveSection('mistakes')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeSection === 'mistakes' ? 'bg-green-600 text-white font-medium' : 'text-gray-600 hover:bg-green-50'}`}
              >
                ⚠️ Common Mistakes
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === 'mistakes' ? (
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Common Mistakes to Avoid</h2>
              <div className="space-y-4">
                {commonMistakes.map((item, i) => (
                  <div key={i} className="card p-5">
                    <div className="flex gap-3">
                      <span className="text-red-500 text-lg mt-0.5">✗</span>
                      <div>
                        <div className="font-semibold text-gray-800 mb-1">{item.mistake}</div>
                        <div className="flex gap-2 items-start">
                          <span className="text-green-600 text-sm mt-0.5">→</span>
                          <div className="text-gray-600 text-sm">{item.fix}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            sections.filter(s => s.id === activeSection).map(section => (
              <div key={section.id}>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">{section.title}</h2>
                <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
                  <p className="text-gray-700">{section.guidance}</p>
                </div>

                <h3 className="font-semibold text-gray-800 mb-3">Questions to guide your writing:</h3>
                <ul className="space-y-2 mb-6">
                  {section.prompts.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-green-600 font-bold">?</span>
                      <span className="text-gray-700">{p}</span>
                    </li>
                  ))}
                </ul>

                <div>
                  <button
                    onClick={() => setShowExample(e => ({ ...e, [section.id]: !e[section.id] }))}
                    className="btn-secondary text-sm px-4 py-2 mb-4"
                  >
                    {showExample[section.id] ? 'Hide Example' : '👁 Show Example Paragraph'}
                  </button>
                  {showExample[section.id] && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                      <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">Example</div>
                      <p className="text-gray-700 italic leading-relaxed">"{section.example}"</p>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
                  {sections.findIndex(s => s.id === activeSection) > 0 && (
                    <button
                      onClick={() => setActiveSection(sections[sections.findIndex(s => s.id === activeSection) - 1].id)}
                      className="btn-secondary"
                    >
                      ← Previous Section
                    </button>
                  )}
                  <div className="ml-auto">
                    {sections.findIndex(s => s.id === activeSection) < sections.length - 1 ? (
                      <button
                        onClick={() => setActiveSection(sections[sections.findIndex(s => s.id === activeSection) + 1].id)}
                        className="btn-primary"
                      >
                        Next Section →
                      </button>
                    ) : (
                      <button onClick={() => setActiveSection('mistakes')} className="btn-primary">
                        Common Mistakes →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
