// pages/blog/[slug].js
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import AdBanner from '../../components/ui/AdBanner'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarpathafrica.com'

function renderMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/^## (.*$)/gim, '<h2 style="font-size:1.5rem;font-weight:700;margin:2rem 0 1rem;color:#111827">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 style="font-size:1.2rem;font-weight:600;margin:1.5rem 0 0.75rem;color:#1f2937">$1</h3>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size:1.8rem;font-weight:700;margin:1.5rem 0 1rem;color:#111827">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#16a34a;text-decoration:underline">$1</a>')
    .replace(/^- (.*$)/gim, '<li style="margin-left:1.5rem;list-style:disc;margin-bottom:0.5rem">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, s => `<ul style="margin:1rem 0">${s}</ul>`)
    .replace(/\n\n/g, '</p><p style="margin:1rem 0;line-height:1.8;color:#374151">')
    .replace(/\n/g, '<br/>')
}

function extractKeywords(title, category) {
  const base = ['scholarships for African students', 'study abroad Africa', 'African student scholarships']
  const categoryMap = {
    'Scholarships': ['fully funded scholarships', 'scholarship application', 'scholarship tips'],
    'Visa': ['student visa Africa', 'study permit', 'visa application'],
    'Destinations': ['study abroad', 'international universities', 'study in'],
    'Tips': ['scholarship tips', 'application advice', 'how to apply'],
    'Application': ['scholarship application', 'personal statement', 'motivation letter'],
    'Career': ['career development Africa', 'professional development'],
  }
  const extra = categoryMap[category] || []
  return [...base, ...extra, title].join(', ')
}

function estimateReadTime(content) {
  if (!content) return 1
  const words = content.split(' ').length
  return Math.max(1, Math.ceil(words / 200))
}

export default function BlogPost({ post, recent, relatedPosts }) {
  const safeRecent = Array.isArray(recent) ? recent : []
  const safeRelated = Array.isArray(relatedPosts) ? relatedPosts : []

  if (!post) return (
    <Layout title="Article Not Found" noindex={true}>
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="text-gray-500 mb-6">This article may have been moved or deleted.</p>
        <Link href="/blog" className="btn-primary">Browse All Articles</Link>
      </div>
    </Layout>
  )

  const readTime = estimateReadTime(post.content)
  const keywords = extractKeywords(post.title, post.category)
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`
  const publishedDate = post.created_at ? new Date(post.created_at).toISOString() : new Date().toISOString()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.title,
    author: { '@type': 'Person', name: post.author || 'ScholarPath Africa' },
    publisher: {
      '@type': 'Organization',
      name: 'ScholarPath Africa',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    datePublished: publishedDate,
    dateModified: post.updated_at || publishedDate,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    url: canonicalUrl,
    image: `${SITE_URL}/og-image.jpg`,
    articleSection: post.category,
    keywords: keywords,
    wordCount: post.content ? post.content.split(' ').length : 0,
    timeRequired: `PT${readTime}M`,
    inLanguage: 'en',
    about: { '@type': 'Thing', name: 'Scholarships for African Students' },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the best information about ${post.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: post.excerpt || post.title,
        },
      },
    ],
  }

  return (
    <Layout
      title={post.title}
      description={post.excerpt || post.title}
      canonical={canonicalUrl}
      keywords={keywords}
      ogType="article"
      article={{
        publishedAt: publishedDate,
        modifiedAt: post.updated_at || publishedDate,
        author: post.author,
        category: post.category,
        tags: [post.category, 'scholarships', 'African students', 'study abroad'],
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b py-3">
        <div className="max-w-5xl mx-auto px-4 text-sm text-gray-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-green-600">Blog</Link>
          <span>›</span>
          <Link href={`/blog?category=${post.category}`} className="hover:text-green-600">{post.category}</Link>
          <span>›</span>
          <span className="text-gray-700 truncate max-w-xs">{post.title}</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Article */}
          <article className="lg:col-span-2" itemScope itemType="https://schema.org/Article">
            <meta itemProp="datePublished" content={publishedDate} />
            <meta itemProp="author" content={post.author || 'ScholarPath Africa'} />

            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-4 inline-block font-medium">
              {post.category}
            </span>

            <h1 itemProp="headline" className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-gray-600 mb-6 leading-relaxed border-l-4 border-green-500 pl-4">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100 flex-wrap">
              <span>✍️ By <strong className="text-gray-600">{post.author || 'ScholarPath Africa'}</strong></span>
              {post.created_at && (
                <>
                  <span>•</span>
                  <time dateTime={publishedDate}>
                    {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </>
              )}
              <span>•</span>
              <span>⏱️ {readTime} min read</span>
              <span>•</span>
              <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs">{post.category}</span>
            </div>

            <div
              itemProp="articleBody"
              className="text-gray-700 leading-relaxed text-base"
              style={{ lineHeight: '1.8' }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />

            {/* Ad spot — mid article */}
            <AdBanner slot="leaderboard" className="my-8" />

            {/* Internal links CTA */}
            <div className="mt-10 bg-green-50 border border-green-100 rounded-2xl p-6">
              <h3 className="font-display font-bold text-gray-900 mb-3">🎓 Ready to Find Your Scholarship?</h3>
              <p className="text-gray-600 text-sm mb-4">Browse our database of 500+ scholarships, fellowships, and internships for African students.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/scholarships" className="btn-primary text-sm px-4 py-2">Browse All Opportunities</Link>
                <Link href="/scholarships?funding=full" className="btn-secondary text-sm px-4 py-2">Fully Funded Only</Link>
                <Link href="/tools" className="btn-secondary text-sm px-4 py-2">Free Application Tools</Link>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3 font-medium">Related topics:</p>
              <div className="flex flex-wrap gap-2">
                {[post.category, 'African students', 'scholarships', 'study abroad', 'fully funded'].map(tag => (
                  <Link key={tag} href={`/scholarships?search=${encodeURIComponent(tag)}`}
                    className="text-xs bg-gray-100 hover:bg-green-50 hover:text-green-700 text-gray-600 px-3 py-1 rounded-full transition-colors">
                    #{tag.replace(/\s+/g, '')}
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            {safeRelated.length > 0 && (
              <div className="mt-10 pt-8 border-t border-gray-100">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-5">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {safeRelated.map(p => (
                    <Link key={p.id} href={`/blog/${p.slug}`}
                      className="block bg-gray-50 hover:bg-green-50 rounded-xl p-4 transition-colors group">
                      <span className="text-xs text-green-600 font-medium">{p.category}</span>
                      <h3 className="font-semibold text-gray-800 text-sm mt-1 group-hover:text-green-700 line-clamp-2">{p.title}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">

              {/* Quick links */}
              <div className="card p-5">
                <h3 className="font-semibold text-gray-800 mb-4">🔍 Find Scholarships</h3>
                <div className="space-y-2">
                  {[
                    { href: '/scholarships?funding=full', label: '💰 Fully Funded' },
                    { href: '/scholarships?type=fellowship', label: '🏅 Fellowships' },
                    { href: '/scholarships?type=internship', label: '💼 Internships' },
                    { href: '/scholarships?visa=1', label: '✈️ Visa Sponsored' },
                    { href: '/scholarships?type=conference', label: '🎤 Conferences' },
                  ].map(link => (
                    <Link key={link.href} href={link.href}
                      className="flex items-center gap-2 text-sm text-green-600 hover:bg-green-50 rounded-lg px-2 py-1.5 transition-colors font-medium">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Free tools */}
              <div className="card p-5">
                <h3 className="font-semibold text-gray-800 mb-4">🛠️ Free Tools</h3>
                <div className="space-y-2">
                  {[
                    { href: '/tools/sop-generator', label: 'SOP Generator', icon: '✍️' },
                    { href: '/tools/cv-guide', label: 'Scholarship CV Guide', icon: '📄' },
                    { href: '/tools/motivation-letter', label: 'Motivation Letter', icon: '📝' },
                    { href: '/tools/checklist', label: 'Application Checklist', icon: '✅' },
                    { href: '/tools/visa-tips', label: 'Visa Interview Tips', icon: '✈️' },
                  ].map(t => (
                    <Link key={t.href} href={t.href}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg px-2 py-1.5 transition-colors">
                      <span>{t.icon}</span>{t.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Top countries */}
              <div className="card p-5">
                <h3 className="font-semibold text-gray-800 mb-4">🌍 Study Destinations</h3>
                <div className="space-y-1">
                  {[
                    { href: '/countries/united-kingdom', label: '🇬🇧 United Kingdom' },
                    { href: '/countries/germany', label: '🇩🇪 Germany' },
                    { href: '/countries/canada', label: '🇨🇦 Canada' },
                    { href: '/countries/united-states', label: '🇺🇸 United States' },
                    { href: '/countries/australia', label: '🇦🇺 Australia' },
                  ].map(c => (
                    <Link key={c.href} href={c.href}
                      className="block text-sm text-gray-700 hover:text-green-600 px-2 py-1 rounded hover:bg-green-50 transition-colors">
                      {c.label}
                    </Link>
                  ))}
                  <Link href="/countries" className="block text-sm text-green-600 font-medium px-2 py-1 hover:underline">
                    View all countries →
                  </Link>
                </div>
              </div>

              {/* Recent posts */}
              {safeRecent.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold text-gray-800 mb-4">📚 More Articles</h3>
                  <div className="space-y-3">
                    {safeRecent.map(p => (
                      <Link key={p.id} href={`/blog/${p.slug}`}
                        className="block text-sm text-gray-700 hover:text-green-600 transition-colors line-clamp-2 leading-snug">
                        → {p.title}
                      </Link>
                    ))}
                  </div>
                  <Link href="/blog" className="block text-sm text-green-600 font-medium mt-3 hover:underline">
                    View all articles →
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const { getBlogPostBySlug, getBlogPosts, incrementViews } = require('../../lib/db')
    const post = await getBlogPostBySlug(params.slug)
    if (!post) return { props: { post: null, recent: [], relatedPosts: [] } }
    await incrementViews('blog_posts', params.slug)
    const allRecent = await getBlogPosts(10)
    const recent = allRecent.filter(p => p.id !== post.id).slice(0, 5)
    const relatedPosts = allRecent
      .filter(p => p.id !== post.id && p.category === post.category)
      .slice(0, 4)
    return { props: { post, recent, relatedPosts } }
  } catch (e) {
    console.error(e)
    return { props: { post: null, recent: [], relatedPosts: [] } }
  }
}
