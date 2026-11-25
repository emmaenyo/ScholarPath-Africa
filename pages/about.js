// pages/about.js
import Link from 'next/link'
import Layout from '../components/layout/Layout'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.scholarpathafrica.com'

export default function About() {
  return (
    <Layout
      title="About ScholarPath Africa"
      description="Who runs ScholarPath Africa, how we collect and check scholarship information, and how the site is funded."
      canonical={`${SITE_URL}/about`}
    >
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">About ScholarPath Africa</h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          ScholarPath Africa is an independent website that helps African students find scholarships, fellowships, internships and study-abroad programmes — and prepare strong applications for them.
        </p>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Why we built it</h2>
            <p className="mb-3">
              Good opportunities are often hard to find. Information is scattered across university pages, embassy sites and social media posts, deadlines are easy to miss, and many "scholarship" websites bury the useful details under pop-ups or ask for payment.
            </p>
            <p>
              We collect opportunities in one place, explain them in plain language, and always point you to the official application page. Applying to any programme listed here is free; we never charge application fees and we are not an agent for any institution.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">What you will find here</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><Link href="/scholarships" className="text-green-700 underline">Opportunity listings</Link> — each with eligibility, benefits, deadline, documents you usually need, and a link to the official page.</li>
              <li><Link href="/blog" className="text-green-700 underline">Guides</Link> on personal statements, recommendation letters, interviews, visas and studying in popular destinations.</li>
              <li><Link href="/tools" className="text-green-700 underline">Free tools</Link>: SOP Generator, CV Guide, Motivation Letter Guide, Visa Tips and an Application Checklist.</li>
              <li><Link href="/countries" className="text-green-700 underline">Country pages</Link> summarising study options by destination.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">How we check information</h2>
            <p className="mb-3">
              Every listing is built from the provider's own announcement — a university, government agency, foundation or international organisation. We link to that source on each page and record when the listing was last reviewed. Where a provider's page is unclear or contradicts another source, we say so or leave the detail out instead of guessing.
            </p>
            <p>
              Read the full process, including how we handle corrections, in our <Link href="/editorial-policy" className="text-green-700 underline">editorial policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">How the site is funded</h2>
            <p>
              ScholarPath Africa is free to use. We may show advertising (for example through Google AdSense) and may include affiliate links to services we think students could find useful. Advertising never influences which opportunities we list or how we describe them, and ads are always labelled.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Get in touch</h2>
            <p className="mb-4">
              Found an error, an expired deadline, or an opportunity we should list? Please tell us — corrections are the most valuable feedback we get.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Contact us</Link>
              <Link href="/scholarships" className="btn-secondary">Browse opportunities</Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}
