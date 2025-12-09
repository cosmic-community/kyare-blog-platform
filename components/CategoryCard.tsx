import Link from 'next/link'
import { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const categoryImage = category.metadata?.category_image
  const color = category.metadata?.color || '#3498db'

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
        {/* Image */}
        {categoryImage && (
          <div className="relative h-32 overflow-hidden">
            <img
              src={`${categoryImage.imgix_url}?w=400&h=256&fit=crop&auto=format,compress`}
              alt={category.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div 
              className="absolute inset-0 bg-opacity-40"
              style={{ backgroundColor: color }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <h3 
            className="text-lg font-bold mb-2 group-hover:opacity-80 transition-opacity"
            style={{ color }}
          >
            {category.title}
          </h3>
          {category.metadata?.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {category.metadata.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}