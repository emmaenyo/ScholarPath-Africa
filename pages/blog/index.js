import Link from 'next/link'
import Layout from '../../components/layout/Layout'

export default function BlogPage({ posts }) {
  const safePosts = Array.isArray(posts) ? posts : [];

  return (
    <Layout
      title="Scholarship Tips & Guides | ScholarPath Africa"
      description="Expert tips on scholarship applications, visa guides, SOP writing, and study abroad advice for African students."
    >
      <div className="bg-gray-50 border-b py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Scholarship Tips & Guides
          </h1>
          <p className="text-gray-500 text-lg">
            Expert advice to help African students win scholarships and study abroad
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {safePosts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No blog posts yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safePosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="card card-hover p-6 group">
                <div className="mb-3">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{post.category}</span>
                </div>
                <h2 className="font-display font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{post.author}</span>
                  <span className="text-green-600 font-medium group-hover:underline">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    const { getBlogPosts } = require('../../lib/db')
    const posts = await getBlogPosts(20)
    return { props: { posts: posts || [] } }
  } catch (e) {
    console.error(e)
    return { props: { posts: [] } }
  }
}
