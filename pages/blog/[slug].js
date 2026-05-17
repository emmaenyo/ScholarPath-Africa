// pages/blog/[slug].js
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { getBlogPostBySlug, getBlogPosts } from '../../lib/db'
import { format } from 'date-fns'

function renderMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^\| (.+) \|$/gim, (_, row) => `<tr>${row.split(' | ').map(c => `<td>${c}</td>`).join('')}</tr>`)
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|t])/gim, '')
    .replace(/\n/g, '<br/>')
}

export default function BlogPost({ post, recent }) {
  if (!post) return (
    <Layout title="Post Not Found">
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Link href="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    </Layout>
  )

  const structured = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": { "@type": "Person", "name": post.author },
    "datePublished": post.created_at,
    "publisher": { "@type": "Organization", "name": "ScholarPath Africa" }
  }

  return (
    <Layout
      title={post.title}
      description={post.excerpt || post.title}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-5xl mx-auto px-4 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-brand-600">Blog</Link>
          <span>›</span>
          <span className="text-gray-700 truncate">{post.title}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Article */}
          <article className="lg:col-span-2">
            <span className="badge-green mb-4 inline-block capitalize">{post.category}</span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.created_at ? format(new Date(post.created_at), 'MMMM d, yyyy') : ''}</span>
              <span>•</span>
              <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
            </div>

            <div
              className="prose-scholarpath"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />

            {/* Tags */}
            {post.tags && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(',').map(tag => (
                    <span key={tag} className="badge-gray capitalize">{tag.trim()}</span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 bg-brand-600 text-white rounded-2xl p-6 text-center">
              <h3 className="font-heading text-xl font-bold mb-2">Ready to Find Your Scholarship?</h3>
              <p className="text-brand-100 text-sm mb-4">Browse hundreds of fully funded opportunities for African students</p>
              <Link href="/scholarships" className="bg-white text-brand-700 font-bold px-6 py-2.5 rounded-xl hover:bg-brand-50 transition-colors inline-block">
                Search Scholarships →
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Tools */}
              <div className="card p-5">
                <h3 className="font-semibold text-gray-800 mb-4">🛠️ Free Tools</h3>
                <div className="space-y-2">
                  {[
                    { href: '/tools/sop-generator', label: 'SOP Generator', icon: '✍️' },
                    { href: '/tools/cv-guide', label: 'Scholarship CV Guide', icon: '📄' },
                    { href: '/tools/checklist', label: 'Application Checklist', icon: '✅' },
                    { href: '/tools/visa-tips', label: 'Visa Interview Tips', icon: '✈️' },
                  ].map(t => (
                    <Link key={t.href} href={t.href}
                      className="flex items-center gap-2 text-sm text-brand-600 hover:bg-brand-50 rounded-lg px-2 py-1.5 transition-colors">
                      <span>{t.icon}</span>{t.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent posts */}
              {recent.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold text-gray-800 mb-4">📚 More Articles</h3>
                  <div className="space-y-3">
                    {recent.map(p => (
                      <Link key={p.id} href={`/blog/${p.slug}`}
                        className="block text-sm text-gray-700 hover:text-brand-600 transition-colors line-clamp-2">
                        → {p.title}
                      </Link>
                    ))}
                  </div>
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
    const post = getBlogPostBySlug(params.slug)
    if (!post) return { props: { post: null, recent: [] } }
    incrementViews('blog_posts', post.id)
    const { items } = getBlogPosts({ published: true, limit: 5 })
    const recent = items.filter(p => p.id !== post.id)
    return { props: { post, recent } }
  } catch (e) {
    return { props: { post: null, recent: [] } }
  }
}
