import { getAllAuthors } from '@/lib/cosmic'
import { Author } from '@/types'
import Link from 'next/link'

export const revalidate = 60

export const metadata = {
  title: 'Authors | Kyare Blog',
  description: 'Meet our team of writers and contributors',
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Our Authors</h1>
        <p className="text-xl text-gray-600">
          Meet the talented writers behind our content
        </p>
      </header>

      {/* Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author: Author) => (
          <Link 
            key={author.id} 
            href={`/authors/${author.slug}`}
            className="group"
          >
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              {/* Profile Photo */}
              {author.metadata?.profile_photo && (
                <div className="mb-4">
                  <img
                    src={`${author.metadata.profile_photo.imgix_url}?w=384&h=384&fit=crop&auto=format,compress`}
                    alt={author.title}
                    className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Name & Role */}
              <h2 className="text-2xl font-bold text-center mb-2 group-hover:text-blue-600 transition-colors">
                {author.title}
              </h2>
              {author.metadata?.role && (
                <p className="text-center text-gray-600 mb-4">
                  {author.metadata.role}
                </p>
              )}

              {/* Bio */}
              {author.metadata?.bio && (
                <p className="text-gray-700 text-center line-clamp-3 mb-4">
                  {author.metadata.bio}
                </p>
              )}

              {/* Social Links */}
              <div className="flex justify-center space-x-4 text-sm">
                {author.metadata?.twitter && (
                  <span className="text-blue-500">Twitter</span>
                )}
                {author.metadata?.linkedin && (
                  <span className="text-blue-700">LinkedIn</span>
                )}
                {author.metadata?.website && (
                  <span className="text-gray-600">Website</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}