import { ShopifyCollection } from '@/services/Api/shopify';
import CollectionCard from './CollectionCard';

interface CollectionGridProps {
  collections: ShopifyCollection[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function CollectionGrid({ 
  collections, 
  title = "Our Collections",
  subtitle,
  className = "" 
}: CollectionGridProps) {
  return (
    <div className={`${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Collections Grid */}
      {collections.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            No collections found.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <CollectionCard 
              key={collection.id} 
              collection={collection} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
