// pages/privacy.js
import Layout from '../components/layout/Layout'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.scholarpathafrica.com'

export default function Privacy() {
  return (
    <Layout
      title="Privacy Policy | ScholarPath Africa"
      description="How ScholarPath Africa collects, uses and protects information, including cookies and Google advertising."
      canonical={`${SITE_URL}/privacy`}
    >
      <div className="max-w-3xl mx-auto px-4 py-16 text-gray-700 leading-relaxed">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: November 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-2">1. Who we are</h2>
            <p>ScholarPath Africa ({SITE_URL}) is a website that publishes scholarship listings and application guides for African students. You can contact us through our <a href="/contact" className="text-green-700 underline">contact page</a> or at info@scholarpathafrica.com.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-2">2. Information we collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Information you give us:</strong> your name and email address if you subscribe to alerts or send us a message through the contact form.</li>
              <li><strong>Usage data:</strong> pages visited, device and browser type, approximate location (country/city) and referring website, collected through cookies and similar technologies.</li>
              <li><strong>Technical data:</strong> IP address and server logs, used for security and to prevent abuse.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-2">3. How we use it</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To send the scholarship alerts you ask for, and to reply to your messages.</li>
              <li>To understand which pages are useful and to improve the site.</li>
              <li>To keep the site secure and prevent spam.</li>
              <li>To show advertising that helps fund the site.</li>
            </ul>
            <p className="mt-2">We do not sell your personal information.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-2">4. Cookies and Google advertising</h2>
            <p className="mb-2">We use cookies for essential site functions and for analytics. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this and other websites.</p>
            <p className="mb-2">Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the internet. You can opt out of personalised advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">Google Ads Settings</a>. You can also visit <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">aboutads.info</a> to opt out of some third-party vendors' use of cookies for personalised advertising.</p>
            <p>To learn how Google uses data from sites that use its services, see <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">policies.google.com/technologies/partner-sites</a>. You can control cookies in your browser settings; some features may not work if you block them.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-2">5. Third-party links</h2>
            <p>Listings link to official provider websites, which have their own privacy policies. We are not responsible for their content or practices.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-2">6. Data retention and your rights</h2>
            <p>We keep subscriber and contact details only as long as needed for the purpose they were given. Depending on where you live (for example under the GDPR, Nigeria's NDPA, Kenya's Data Protection Act or South Africa's POPIA), you may have the right to access, correct or delete your data and to withdraw consent. To exercise these rights, contact us. You can unsubscribe from emails at any time.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-2">7. Children</h2>
            <p>The site is intended for students aged 16 and over and is not directed at children under 13. We do not knowingly collect their personal information.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-gray-900 mb-2">8. Changes</h2>
            <p>We may update this policy and will change the date above when we do.</p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
