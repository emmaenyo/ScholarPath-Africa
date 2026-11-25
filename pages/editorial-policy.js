// pages/editorial-policy.js
import Link from 'next/link'
import Layout from '../components/layout/Layout'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.scholarpathafrica.com'

export default function EditorialPolicy() {
  return (
    <Layout
      title="Editorial Policy | ScholarPath Africa"
      description="How ScholarPath Africa sources, checks, updates and corrects scholarship listings and guides, and how we handle advertising."
      canonical={`${SITE_URL}/editorial-policy`}
    >
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">Editorial Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: November 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">1. Sources</h2>
            <p>
              Scholarship, fellowship and internship listings are based on the provider's official announcement. We do not copy text from other aggregator sites. Each listing links to the official page so you can read the original and apply directly.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">2. What we check</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>The programme exists and is currently accepting applications, or reopens on a regular cycle.</li>
              <li>Deadline, level of study, funding and eligibility match the official page.</li>
              <li>The official link opens the provider's own site and not a third-party agent.</li>
              <li>Opportunities that charge applicants fees, or ask for payment to "guarantee" a place, are not listed.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">3. Guides and articles</h2>
            <p className="mb-3">
              Guides are written for African students and cover applications, essays, visas and destinations. We may use AI-assisted tools to help draft and structure text; facts such as fees, deadlines and rules are checked against official sources, and guides state clearly when figures change from year to year.
            </p>
            <p>
              Guides are general information, not legal, immigration or financial advice. Always confirm requirements with the institution or the relevant government authority.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">4. Updates and expired listings</h2>
            <p>
              Each listing shows when it was last reviewed. Listings whose deadline has passed are clearly marked, and old listings with little information may be hidden from search engines until the next intake is confirmed.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">5. Corrections</h2>
            <p>
              If you find an error, <Link href="/contact" className="text-green-700 underline">contact us</Link> with the page address and the correct information. We review corrections promptly and update the listing.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">6. Advertising and affiliate links</h2>
            <p>
              The site may display advertisements and affiliate links. They are separate from editorial content, are labelled, and never affect whether or how an opportunity is listed. We are not affiliated with, and do not receive payment from, scholarship providers for listing them.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
