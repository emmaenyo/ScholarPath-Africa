// pages/disclaimer.js
import Layout from '../components/layout/Layout'
import Link from 'next/link'

export default function Disclaimer() {
  return (
    <Layout
      title="Disclaimer | ScholarPath Africa"
      description="Read the ScholarPath Africa disclaimer regarding scholarship information, accuracy, and our relationship with third-party scholarship providers."
    >
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Disclaimer</h1>
        <p className="text-gray-500 mb-10">Last updated: September 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">General Information Only</h2>
            <p>The information provided on ScholarPath Africa (scholarpathafrica.com) is for general informational purposes only. While we make every effort to keep scholarship details, deadlines, eligibility requirements, and funding amounts accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of any information on this website.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Scholarship Information Accuracy</h2>
            <p>Scholarship details — including deadlines, funding amounts, eligibility criteria, and application requirements — are subject to change at any time by the awarding organisations. We strongly recommend that you:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Always visit the official website of the scholarship provider to verify current information</li>
              <li>Contact the scholarship provider directly if you have specific questions about eligibility or the application process</li>
              <li>Not rely solely on ScholarPath Africa for making application decisions</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">No Affiliation with Scholarship Providers</h2>
            <p>ScholarPath Africa is an independent platform and is not affiliated with, endorsed by, or in partnership with any of the scholarship providers, universities, governments, or organisations listed on this website. We are not involved in the scholarship application or selection process and have no influence over scholarship decisions.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Application Tips and Guides</h2>
            <p>The application tips, guides, templates, and tools provided on ScholarPath Africa are based on general best practices and publicly available information. They are not a guarantee of scholarship success. Every scholarship is different, and every applicant's situation is unique. We encourage you to adapt any advice to your specific circumstances.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">External Links</h2>
            <p>Our website contains links to external websites and scholarship portals. We have no control over the content or availability of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, ScholarPath Africa excludes all liability for any loss or damage — including without limitation, indirect or consequential loss or damage — arising from the use of, or inability to use, the information on this website, or from any action taken based on information found on this website.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Contact Us</h2>
            <p>If you notice any inaccurate information on our website, please <Link href="/contact" className="text-green-600 hover:underline">contact us</Link> and we will do our best to correct it promptly.</p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
