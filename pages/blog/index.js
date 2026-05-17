// pages/blog/index.js
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { getBlogPosts } from '../../lib/db'
import { format } from 'date-fns'

export default function BlogPage({ posts }) {
  return (
    <Layout
      title="Scholarship Blog & Study Abroad Guides"
      description="Expert guides on scholarships, study abroad, SOP writing, visa tips, and more for African students."
    >
      <div className="bg-gray-50 border-b py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Scholarship Guides & Tips
          </h1>
          <p className="text-gray-500">Expert advice to help African students win scholarships and study abroad</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No blog posts published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`}
                className="card card-hover p-6 group flex flex-col">
                <span className="badge-green mb-3 capitalize">{post.category}</span>
                <h2 className="font-heading font-semibold text-gray-900 text-lg leading-snug mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                  <span>{post.author}</span>
                  <span>{post.created_at ? format(new Date(post.created_at), 'MMM d, yyyy') : ''}</span>
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
    const { items } = getBlogPosts({ published: true, limit: 50 })
    return { props: { posts: items } }
  } catch (e) {
    return { props: { posts: [] } }
  }
}
