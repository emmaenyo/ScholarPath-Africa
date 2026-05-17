// pages/blog/index.js
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import AdBanner from '../../components/ui/AdBanner'

export default function BlogPage({ posts }) {
  const safePosts = Array.isArray(posts) ? posts : []

  return (
    <Layout
      title="Scholarship Tips & Guides for African Students"
      description="Expert tips on scholarship applications, visa guides, SOP writing, country guides, and study abroad advice for African students."
      keywords="scholarship tips Africa, how to apply for scholarships, study abroad guide Africa, visa tips African students"
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

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Leaderboard ad — top of blog listing */}
        <AdBanner slot="leaderboard" className="mb-10" />

        {safePosts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No blog posts yet.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safePosts.map((post, index) => (
                <>
                  <Link key={post.id} href={`/blog/${post.slug}`} className="card hover:shadow-md transition-shadow p-6 group block">
                    <div className="mb-3">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">{post.category}</span>
                    </div>
                    <h2 className="font-display font-bold text-gray-900 text-lg mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{post.author || 'ScholarPath Team'}</span>
                      <span className="text-green-600 font-medium group-hover:underline">Read More →</span>
                    </div>
                  </Link>

                  {/* Ad after every 9th post */}
                  {(index + 1) % 9 === 0 && index !== safePosts.length - 1 && (
                    <div key={`ad-${index}`} className="md:col-span-2 lg:col-span-3">
                      <AdBanner slot="leaderboard" />
                    </div>
                  )}
                </>
              ))}
            </div>
          </>
        )}

        {/* Bottom ad */}
        <AdBanner slot="leaderboard" className="mt-12" />
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    const { getBlogPosts } = require('../../lib/db')
    const posts = await getBlogPosts(60)
    return { props: { posts: posts || [] } }
  } catch (e) {
    console.error(e)
    return { props: { posts: [] } }
  }
}
