import { getCollectionByHandle } from '@/services/Api/shopify';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';

interface CollectionPageProps {
  params: {
    handle: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const collection = await getCollectionByHandle(params.handle, 50);

  if (!collection) {
    notFound();
  }

  const products = collection.products.edges.map(edge => edge.node);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Collection Header */}
      <div className="mb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-gray-700">Collections</Link>
          <span>/</span>
          <span className="text-gray-900">{collection.title}</span>
        </nav>

        {/* Collection Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Collection Image */}
          <div className="order-2 lg:order-1">
            {collection.image ? (
              <img
                src={collection.image.url}
                alt={collection.image.altText || collection.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-gray-400 text-8xl">📦</div>
              </div>
            )}
          </div>

          {/* Collection Info */}
          <div className="order-1 lg:order-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {collection.title}
            </h1>
            
            {collection.description && (
              <div 
                className="text-lg text-gray-600 mb-6 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: collection.description }}
              />
            )}

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span>{products.length} product{products.length !== 1 ? 's' : ''}</span>
              <span>•</span>
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            No products found in this collection.
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Products in {collection.title}
            </h2>
            <div className="text-sm text-gray-500">
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link 
                key={product.id} 
                href={`/products/${product.handle}`}
                className="group block"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Product Image */}
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                    {product.images.edges[0] ? (
                      <img
                        src={product.images.edges[0].node.url}
                        alt={product.images.edges[0].node.altText || product.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-gray-400 text-4xl">📦</div>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.priceRange.minVariantPrice.amount}
                      </span>
                      
                      <span className="inline-flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                        View Details
                        <svg className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Related Collections */}
      <div className="mt-16">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Explore More Collections
          </h3>
          <Link 
            href="/collections" 
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Collections
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      </div>
    </AppLayout>
  );
}

// Generate static params for all collections (optional - for better performance)
export async function generateStaticParams() {
  try {
    // Fetch all collections to get their handles
    const { getCollections } = await import('@/services/Api/shopify');
    const collections = await getCollections(50); // Get up to 50 collections
    
    return collections.map((collection) => ({
      handle: collection.handle,
    }));
  } catch (error) {
    console.error('Error generating static params for collections:', error);
    // Return empty array if there's an error, fallback to dynamic routing
    return [];
  }
}
