import Link from 'next/link'
import Layout from '../../components/layout/Layout'

function renderMarkdown(text) {
  if (!text) return ''
  return text
    .replace(/^## (.*$)/gim, '<h2 style="font-size:1.4rem;font-weight:700;margin:1.5rem 0 0.75rem">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size:1.8rem;font-weight:700;margin:1.5rem 0 0.75rem">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#16a34a;text-decoration:underline">$1</a>')
    .replace(/^- (.*$)/gim, '<li style="margin-left:1.5rem;list-style:disc">$1</li>')
    .replace(/\n\n/g, '</p><p style="margin:1rem 0">')
    .replace(/\n/g, '<br/>')
}

export default function BlogPost({ post, recent }) {
  const safeRecent = Array.isArray(recent) ? recent : [];

  if (!post) return (
    <Layout title="Post Not Found">
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <Link href="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    </Layout>
  )

  return (
    <Layout title={post.title} description={post.excerpt || post.title}>
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-5xl mx-auto px-4 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span>›</span>
          <Link href="/blog" className="hover:text-green-600">Blog</Link>
          <span>›</span>
          <span className="text-gray-700 truncate">{post.title}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mb-4 inline-block">{post.category}</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
              <span>By {post.author}</span>
              {post.created_at && <><span>•</span><span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></>}
            </div>
            <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
            <div className="mt-10 bg-green-600 text-white rounded-2xl p-6 text-center">
              <h3 className="font-display text-xl font-bold mb-2">Ready to Find Your Scholarship?</h3>
              <p className="text-green-100 text-sm mb-4">Browse hundreds of fully funded opportunities for African students</p>
              <Link href="/scholarships" className="bg-white text-green-700 font-bold px-6 py-2.5 rounded-xl hover:bg-green-50 transition-colors inline-block">
                Search Scholarships →
              </Link>
            </div>
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="card p-5">
                <h3 className="font-semibold text-gray-800 mb-4">🛠️ Free Tools</h3>
                <div className="space-y-2">
                  {[
                    { href: '/tools/sop-generator', label: 'SOP Generator', icon: '✍️' },
                    { href: '/tools/cv-guide', label: 'CV Guide', icon: '📄' },
                    { href: '/tools/checklist', label: 'Application Checklist', icon: '✅' },
                    { href: '/tools/visa-tips', label: 'Visa Tips', icon: '✈️' },
                  ].map(t => (
                    <Link key={t.href} href={t.href} className="flex items-center gap-2 text-sm text-green-600 hover:bg-green-50 rounded-lg px-2 py-1.5 transition-colors">
                      <span>{t.icon}</span>{t.label}
                    </Link>
                  ))}
                </div>
              </div>

              {safeRecent.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold text-gray-800 mb-4">📚 More Articles</h3>
                  <div className="space-y-3">
                    {safeRecent.map(p => (
                      <Link key={p.id} href={`/blog/${p.slug}`} className="block text-sm text-gray-700 hover:text-green-600 transition-colors line-clamp-2">
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
    const post = await getBlogPostBySlug(params.slug)
    if (!post) return { props: { post: null, recent: [] } }
    await incrementViews('blog_posts', params.slug)
    const recent = await getBlogPosts(5)
    const filtered = recent.filter(p => p.id !== post.id)
    return { props: { post, recent: filtered } }
  } catch (e) {
    console.error(e)
    return { props: { post: null, recent: [] } }
  }
}
