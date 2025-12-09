import Link from 'next/link'
import { Post } from '@/types'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const category = post.metadata?.category
  const author = post.metadata?.author
  const featuredImage = post.metadata?.featured_image
  const isPremium = post.metadata?.premium_content
  const readingTime = post.metadata?.reading_time

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className={`bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 h-full ${featured ? 'lg:flex' : ''}`}>
        {/* Image */}
        {featuredImage && (
          <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2' : 'h-48'}`}>
            <img
              src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {isPremium && (
              <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                💎 Premium
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`p-6 ${featured ? 'lg:w-1/2 flex flex-col justify-center' : ''}`}>
          {/* Category Badge */}
          {category && (
            <div className="mb-3">
              <span 
                className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full"
                style={{ backgroundColor: category.metadata?.color || '#3498db' }}
              >
                {category.title}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className={`font-bold mb-3 group-hover:text-blue-600 transition-colors ${featured ? 'text-3xl' : 'text-xl'}`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.metadata?.excerpt && (
            <p className={`text-gray-600 mb-4 ${featured ? 'text-lg' : 'text-base'}`}>
              {post.metadata.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              {author && (
                <span className="flex items-center">
                  {author.metadata?.profile_photo && (
                    <img
                      src={`${author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                      alt={author.title}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  )}
                  {author.title}
                </span>
              )}
              {readingTime && (
                <span>⏱️ {readingTime} min read</span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}