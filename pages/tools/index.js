// pages/tools/index.js
import Link from 'next/link'
import Layout from '../../components/layout/Layout'

const tools = [
  {
    href: '/tools/sop-generator',
    icon: '✍️',
    title: 'SOP Generator',
    desc: 'Generate a customized Statement of Purpose for your scholarship application with guided prompts.',
    badge: 'Popular',
  },
  {
    href: '/tools/cv-guide',
    icon: '📄',
    title: 'Scholarship CV Guide',
    desc: 'Learn how to write a scholarship-winning academic CV with structure, examples and tips.',
    badge: null,
  },
  {
    href: '/tools/checklist',
    icon: '✅',
    title: 'Application Checklist',
    desc: 'A comprehensive checklist for your scholarship application — never miss a document again.',
    badge: null,
  },
  {
    href: '/tools/visa-tips',
    icon: '✈️',
    title: 'Visa Interview Tips',
    desc: 'Prepare for your student visa interview with common questions, answers, and expert tips.',
    badge: null,
  },
  {
    href: '/tools/recommendation-template',
    icon: '📝',
    title: 'Recommendation Letter Template',
    desc: 'Templates for requesting and guiding professors to write strong recommendation letters.',
    badge: null,
  },
  {
    href: '/tools/motivation-letter',
    icon: '💡',
    title: 'Motivation Letter Guide',
    desc: 'Write a compelling motivation letter with our structured template and examples.',
    badge: null,
  },
]

export default function ToolsPage() {
  return (
    <Layout
      title="Free Scholarship Application Tools"
      description="Free tools for African students: SOP Generator, CV Guide, Application Checklist, Visa Tips and more."
    >
      <div className="bg-gray-50 border-b py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Free Application Tools
          </h1>
          <p className="text-gray-500 text-lg">
            Everything you need to write a winning scholarship application
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <Link key={tool.href} href={tool.href}
              className="card card-hover p-6 group flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <span className="text-4xl">{tool.icon}</span>
                {tool.badge && <span className="badge-green">{tool.badge}</span>}
              </div>
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                {tool.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
                {tool.desc}
              </p>
              <span className="text-sm font-medium text-brand-600 group-hover:underline">
                Open Tool →
              </span>
            </Link>
          ))}
        </div>

        {/* Tip */}
        <div className="mt-12 bg-brand-50 border border-brand-100 rounded-2xl p-6 text-center">
          <h3 className="font-heading font-semibold text-brand-800 text-lg mb-2">
            💡 Pro Tip
          </h3>
          <p className="text-brand-700 text-sm max-w-xl mx-auto">
            The most successful scholarship applicants start preparing their documents 3–6 months before the deadline. Use our tools early and apply to multiple scholarships simultaneously.
          </p>
        </div>
      </div>
    </Layout>
  )
}
