import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'
import Link from 'next/link'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const posts = await getAllPosts()
  const categories = await getAllCategories()

  // Separate featured/premium posts from regular posts
  const featuredPosts = posts.filter((post: Post) => post.metadata?.premium_content === true).slice(0, 2)
  const regularPosts = posts.filter((post: Post) => post.metadata?.premium_content !== true).slice(0, 6)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Kyare</h1>
        <p className="text-xl text-gray-600">
          Your source for technology, gaming, anime, and entertainment news
        </p>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Explore Categories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category: Category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured/Premium Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <span className="mr-2">💎</span>
            Premium Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post: Post) => (
              <PostCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <Link 
            href="/posts" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}