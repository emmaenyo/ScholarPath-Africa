import Layout from '../components/layout/Layout';

export default function Privacy() {
  return (
    <Layout
      title="Privacy Policy | ScholarPath Africa"
      description="ScholarPath Africa's privacy policy — how we collect, use, and protect your data."
    >
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">Last updated: January 2025</p>

        <div className="prose prose-scholarpath">
          <p>
            ScholarPath Africa ("we", "us", or "our") is committed to protecting your privacy. This policy
            explains what data we collect, how we use it, and your rights.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li><strong>Email address and name</strong> — when you subscribe to our newsletter or alerts.</li>
            <li><strong>Usage data</strong> — pages visited, scholarship views, and search queries, collected anonymously via analytics.</li>
            <li><strong>Cookies</strong> — for session management, preferences, and analytics.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To send scholarship alerts, newsletters, and updates (only if you subscribe).</li>
            <li>To improve the platform and understand which scholarships are most useful.</li>
            <li>To display relevant advertisements via Google AdSense.</li>
          </ul>

          <h2>3. Data Sharing</h2>
          <p>
            We do not sell your personal data. We may share anonymised, aggregated data with partners.
            Third-party services we use (e.g. Google Analytics, Google AdSense) have their own privacy policies.
          </p>

          <h2>4. Google AdSense</h2>
          <p>
            We use Google AdSense to display ads. Google may use cookies to serve personalised ads based on
            your browsing history. You can opt out at{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
              adssettings.google.com
            </a>.
          </p>

          <h2>5. Cookies</h2>
          <p>
            We use essential cookies for functionality and analytics cookies (Google Analytics) to understand
            traffic. You may disable cookies in your browser settings, though some features may not work.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request deletion of your data (email us and we will remove your subscription).</li>
            <li>Unsubscribe from our newsletter at any time via the unsubscribe link in any email.</li>
          </ul>

          <h2>7. Data Retention</h2>
          <p>
            We retain subscriber email addresses until you unsubscribe. Analytics data is retained in
            aggregate form for up to 26 months.
          </p>

          <h2>8. Security</h2>
          <p>
            We take reasonable technical and organisational measures to protect your data. However, no
            internet transmission is 100% secure.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            ScholarPath Africa is intended for users aged 16 and over. We do not knowingly collect data
            from children under 16.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this policy periodically. We will notify subscribers of material changes via email.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            For any privacy-related questions, please email us at{' '}
            <a href="mailto:privacy@scholarpathAfrica.com">privacy@scholarpathAfrica.com</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
