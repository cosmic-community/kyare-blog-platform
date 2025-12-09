// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'

export const revalidate = 60

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post: Post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: `${post.title} | Kyare Blog`,
    description: post.metadata?.excerpt || post.title,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const category = post.metadata?.category
  const author = post.metadata?.author
  const featuredImage = post.metadata?.featured_image
  const gallery = post.metadata?.gallery
  const isPremium = post.metadata?.premium_content
  const readingTime = post.metadata?.reading_time

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        {/* Category Badge */}
        {category && (
          <Link href={`/categories/${category.slug}`} className="inline-block mb-4">
            <span 
              className="px-4 py-2 text-sm font-semibold text-white rounded-full hover:opacity-80 transition-opacity"
              style={{ backgroundColor: category.metadata?.color || '#3498db' }}
            >
              {category.title}
            </span>
          </Link>
        )}

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4">
          {post.title}
          {isPremium && <span className="ml-3 text-yellow-500">💎</span>}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center text-gray-600 space-x-6 mb-6">
          {author && (
            <Link href={`/authors/${author.slug}`} className="flex items-center hover:text-gray-900">
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={author.title}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div>
                <div className="font-semibold">{author.title}</div>
                {author.metadata?.role && (
                  <div className="text-sm text-gray-500">{author.metadata.role}</div>
                )}
              </div>
            </Link>
          )}
          {readingTime && (
            <span>⏱️ {readingTime} min read</span>
          )}
        </div>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.metadata.excerpt}
          </p>
        )}
      </header>

      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <ReactMarkdown>{post.metadata?.content || ''}</ReactMarkdown>
      </div>

      {/* Gallery */}
      {gallery && gallery.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gallery.map((image: { url: string; imgix_url: string }, index: number) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img
                  src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Author Bio */}
      {author && (
        <div className="border-t border-gray-200 pt-8 mt-8">
          <h3 className="text-xl font-bold mb-4">About the Author</h3>
          <div className="flex items-start space-x-4">
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=192&h=192&fit=crop&auto=format,compress`}
                alt={author.title}
                className="w-20 h-20 rounded-full"
              />
            )}
            <div>
              <Link href={`/authors/${author.slug}`} className="text-xl font-bold hover:text-blue-600">
                {author.title}
              </Link>
              {author.metadata?.role && (
                <p className="text-gray-600 mb-2">{author.metadata.role}</p>
              )}
              {author.metadata?.bio && (
                <p className="text-gray-700 mb-3">{author.metadata.bio}</p>
              )}
              {/* Social Links */}
              <div className="flex space-x-4">
                {author.metadata?.twitter && (
                  <a 
                    href={author.metadata.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Twitter
                  </a>
                )}
                {author.metadata?.linkedin && (
                  <a 
                    href={author.metadata.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900"
                  >
                    LinkedIn
                  </a>
                )}
                {author.metadata?.website && (
                  <a 
                    href={author.metadata.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}