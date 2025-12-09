// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { Post, Author } from '@/types'
import PostCard from '@/components/PostCard'
import { notFound } from 'next/navigation'

export const revalidate = 60

// Generate static params for all authors
export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author: Author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }
  
  return {
    title: `${author.title} | Kyare Blog`,
    description: author.metadata?.bio || `Articles by ${author.title}`,
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  
  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Author Header */}
      <header className="mb-12 text-center">
        {/* Profile Photo */}
        {author.metadata?.profile_photo && (
          <div className="mb-6">
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=512&h=512&fit=crop&auto=format,compress`}
              alt={author.title}
              className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
            />
          </div>
        )}

        {/* Name & Role */}
        <h1 className="text-5xl font-bold mb-2">{author.title}</h1>
        {author.metadata?.role && (
          <p className="text-xl text-gray-600 mb-6">
            {author.metadata.role}
          </p>
        )}

        {/* Bio */}
        {author.metadata?.bio && (
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            {author.metadata.bio}
          </p>
        )}

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          {author.metadata?.twitter && (
            <a 
              href={author.metadata.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Twitter →
            </a>
          )}
          {author.metadata?.linkedin && (
            <a 
              href={author.metadata.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 font-medium"
            >
              LinkedIn →
            </a>
          )}
          {author.metadata?.website && (
            <a 
              href={author.metadata.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Website →
            </a>
          )}
        </div>
      </header>

      {/* Author's Posts */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">
          Articles by {author.title}
        </h2>
        
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No posts published yet.</p>
          </div>
        )}
      </section>
    </div>
  )
}