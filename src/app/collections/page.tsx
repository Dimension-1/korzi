import { getCollections } from '@/services/Api/shopify';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Collections</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our carefully curated collections of premium products, each designed to meet your specific needs.
        </p>
      </div>

      {collections.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            No collections found. Please check your Shopify store configuration.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link 
              key={collection.id} 
              href={`/collections/${collection.handle}`}
              className="group block"
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
          ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-600 mb-6">
            Browse all our products or get in touch with our team for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Products
            </Link>
            <Link 
              href="/contact" 
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      </div>
    </AppLayout>
  );
}
