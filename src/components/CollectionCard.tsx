import { ShopifyCollection } from '@/services/Api/shopify';
import Link from 'next/link';

interface CollectionCardProps {
  collection: ShopifyCollection;
  className?: string;
}

export default function CollectionCard({ collection, className = "" }: CollectionCardProps) {
  return (
    <Link 
      href={`/collections/${collection.handle}`}
      className={`group block ${className}`}
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Collection Image */}
        <div className="aspect-w-16 aspect-h-12 bg-gray-200">
          {collection.image ? (
            <img
              src={collection.image.url}
              alt={collection.image.altText || collection.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-gray-400 text-6xl">📦</div>
            </div>
          )}
        </div>

        {/* Collection Info */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {collection.title}
          </h2>
          
          {collection.description && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {collection.description}
            </p>
          )}

          {/* Product Count */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {collection.products.edges.length} product{collection.products.edges.length !== 1 ? 's' : ''}
            </span>
            
            {/* Sample Products */}
            {collection.products.edges.length > 0 && (
              <div className="flex -space-x-2">
                {collection.products.edges.slice(0, 3).map((productEdge, index) => {
                  const product = productEdge.node;
                  const image = product.images.edges[0]?.node;
                  return (
                    <div key={product.id} className="relative">
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || product.title}
                          className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">📦</span>
                        </div>
                      )}
                    </div>
                  );
                })}
                {collection.products.edges.length > 3 && (
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-600">+{collection.products.edges.length - 3}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* View Collection Button */}
          <div className="mt-4">
            <span className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
              View Collection
              <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
