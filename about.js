// pages/about.js
import Link from 'next/link'
import Layout from '../components/layout/Layout'

export default function About() {
  return (
    <Layout
      title="About ScholarPath Africa — Our Mission"
      description="ScholarPath Africa is Africa's leading scholarship discovery platform, helping African students find fully funded scholarships, fellowships, and study abroad opportunities worldwide."
      keywords="about ScholarPath Africa, scholarships for African students, scholarship platform Africa, study abroad Africa"
      canonical={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarpathafrica.com'}/about`}
    >
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">About ScholarPath Africa</h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          Helping African students discover life-changing scholarship opportunities worldwide.
        </p>

        <div className="prose max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
            <p className="leading-relaxed">
              ScholarPath Africa exists to close the information gap that prevents talented African students from accessing world-class education. Every year, billions of dollars in scholarships go unclaimed simply because students don't know they exist. We are changing that.
            </p>
            <p className="leading-relaxed">
              We believe that where you were born should not determine how far you go. Every African student with talent, ambition, and drive deserves access to the best educational opportunities the world has to offer.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '🎓', title: 'Scholarship Discovery', desc: 'We curate and update a comprehensive database of fully funded scholarships, fellowships, internships, conferences, and research grants for African students.' },
                { icon: '📝', title: 'Application Support', desc: 'Our free tools — SOP Generator, CV Guide, Motivation Letter Guide, and Application Checklist — help students prepare competitive applications.' },
                { icon: '🌍', title: 'Country Guides', desc: 'Detailed guides on studying in the UK, USA, Germany, Canada, Australia, and more — covering universities, visas, costs, and life abroad.' },
                { icon: '📰', title: 'Scholarship Blog', desc: 'Expert articles on scholarship tips, application strategies, visa guides, and success stories from African students studying abroad.' },
              ].map(item => (
                <div key={item.title} className="bg-green-50 rounded-xl p-5">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Our Content Standards</h2>
            <p className="leading-relaxed">
              Every opportunity listed on ScholarPath Africa is verified for accuracy. We update our database regularly to ensure deadlines, eligibility criteria, and funding details are current. Our blog content is written by experts and reviewed for accuracy before publication.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Start Your Journey</h2>
            <p className="leading-relaxed mb-4">
              Ready to find your scholarship? Browse our database of 500+ opportunities or use our free tools to prepare your application.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/scholarships" className="btn-primary">Browse Scholarships</Link>
              <Link href="/tools" className="btn-secondary">Free Tools</Link>
              <Link href="/blog" className="btn-secondary">Read Our Blog</Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}
