// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import { notFound } from 'next/navigation'

export const revalidate = 60

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category: Category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }
  
  return {
    title: `${category.title} | Kyare Blog`,
    description: category.metadata?.description || `Browse ${category.title} articles`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const categoryImage = category.metadata?.category_image
  const color = category.metadata?.color || '#3498db'

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <header className="mb-12">
        <div className="relative rounded-lg overflow-hidden mb-6">
          {categoryImage ? (
            <>
              <img
                src={`${categoryImage.imgix_url}?w=2400&h=600&fit=crop&auto=format,compress`}
                alt={category.title}
                className="w-full h-64 object-cover"
              />
              <div 
                className="absolute inset-0 bg-opacity-50 flex items-center justify-center"
                style={{ backgroundColor: color }}
              >
                <div className="text-center text-white">
                  <h1 className="text-5xl font-bold mb-4">{category.title}</h1>
                  {category.metadata?.description && (
                    <p className="text-xl max-w-2xl">{category.metadata.description}</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div 
              className="h-64 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: color }}
            >
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">{category.title}</h1>
                {category.metadata?.description && (
                  <p className="text-xl max-w-2xl">{category.metadata.description}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No posts found in this category yet.</p>
        </div>
      )}
    </div>
  )
}