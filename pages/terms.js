// pages/terms.js
import Layout from '../components/layout/Layout'
import Link from 'next/link'

export default function Terms() {
  return (
    <Layout
      title="Terms of Service | ScholarPath Africa"
      description="Read the ScholarPath Africa Terms of Service governing the use of our scholarship discovery platform."
    >
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-10">Last updated: September 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using ScholarPath Africa (scholarpathafrica.com), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">2. Use of the Website</h2>
            <p>ScholarPath Africa grants you a non-exclusive, non-transferable, revocable licence to use this website for personal, non-commercial purposes. You agree not to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Copy, reproduce, or distribute our content without prior written permission</li>
              <li>Attempt to gain unauthorised access to any part of the website or its systems</li>
              <li>Use automated tools to scrape, crawl, or extract data from the website without permission</li>
              <li>Post or transmit any harmful, offensive, or misleading content</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">3. Intellectual Property</h2>
            <p>All content on ScholarPath Africa — including text, graphics, logos, and tools — is the intellectual property of ScholarPath Africa or its content suppliers and is protected by applicable intellectual property laws. Scholarship listings reference publicly available information about third-party programmes and are provided for informational purposes.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">4. Newsletter Subscription</h2>
            <p>By subscribing to our newsletter, you agree to receive email communications from ScholarPath Africa about new scholarships, application tips, and related educational content. You may unsubscribe at any time by clicking the unsubscribe link in any email or by contacting us directly.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">5. Third-Party Links</h2>
            <p>Our website links to third-party scholarship websites and portals. These links are provided for your convenience. We have no control over third-party websites and are not responsible for their content, accuracy, or availability.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">6. Advertising</h2>
            <p>ScholarPath Africa may display advertisements through Google AdSense and other advertising networks. The appearance of an advertisement does not constitute our endorsement of the advertised product or service.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">7. Disclaimer of Warranties</h2>
            <p>The website is provided on an "as is" basis without warranties of any kind. We do not warrant that the website will be uninterrupted, error-free, or free of viruses. Please also read our <Link href="/disclaimer" className="text-green-600 hover:underline">Disclaimer</Link> for further information about the accuracy of scholarship information.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the website after any changes constitutes your acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">9. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with applicable law. Any disputes arising from these terms or your use of the website shall be subject to the exclusive jurisdiction of the relevant courts.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-3">10. Contact</h2>
            <p>For questions about these Terms of Service, please <Link href="/contact" className="text-green-600 hover:underline">contact us</Link>.</p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
