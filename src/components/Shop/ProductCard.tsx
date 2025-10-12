import { useState } from 'react';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  variantId?: string;
  points?: number;
  showWhatsApp?: boolean;
}

export default function ProductCard({
  title,
  image,
  rating,
  reviewCount,
  originalPrice,
  discountedPrice,
  discountPercentage,
  variantId,
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const handleAddToCart = async () => {
    if (!variantId) return;
    
    // Check if user is authenticated before adding to cart
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to your cart', {
        duration: 4000,
        icon: '🔒',
      });
      return;
    }
    
    setIsAdding(true);
    try {
      await addToCart({
        title,
        price: discountedPrice,
        originalPrice,
        quantity: 1,
        image,
        variantId
      });
      toast.success(`${title} added to cart successfully!`, {
        duration: 3000,
        icon: '🛒',
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add item to cart. Please try again.', {
        duration: 4000,
        icon: '❌',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-[var(--background)] border border-[var(--primary)] rounded-lg p-4 relative group hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1">
          {renderStars(rating)}
        </div>
        <span className="text-sm text-[var(--text-secondary)]">{reviewCount} Reviews</span>
      </div>

      {/* Product Title */}
      <h3 className="text-lg font-bold text-[var(--foreground)] mb-3 uppercase leading-tight">
        {title}
      </h3>

      {/* Pricing */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg font-bold text-[var(--primary)]">Rs. {discountedPrice.toLocaleString()}/-</span>
          <span className="text-sm text-[var(--text-secondary)] line-through">Rs. {originalPrice.toLocaleString()}</span>
          <span className="text-sm font-semibold text-[var(--secondary)]">-{discountPercentage}% OFF</span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding || !variantId}
        className="w-full bg-[var(--primary)] text-[var(--background)] py-3 px-4 rounded-lg font-semibold hover:bg-[var(--secondary)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAdding ? 'Adding...' : 'ADD TO CART'}
      </button>
    </div>
  );
}
