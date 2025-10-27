
import { Heart, Send,  Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VideoCardProps {
  id: number;
  image: string;
  overlayText: string;
  title: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  views: string;
}

export default function VideoCard({
  overlayText,
  title,
  originalPrice,
  discountedPrice,
  discount,
  views
}: VideoCardProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-[var(--background)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl w-[216px] h-[500px] hover:scale-105 flex-shrink-0 border-2 border-gray-600 transform-gpu transition-transform duration-300 " style={{ willChange: 'transform' }}>
      {/* Video Thumbnail */}
      <div className="relative h-[350px]">
        <video
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        >
          <source src="/korzi-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay Text */}
        {overlayText && (
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded text-sm font-medium ${
              overlayText === "COMPLETE TECH PROFILE" 
                ? 'bg-[var(--primary)] text-black font-bold'
                : 'bg-black/70 text-[var(--foreground)]'
            }`}>
              {overlayText}
            </span>
          </div>
        )}

        {/* Views and Interaction Icons */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <span className="bg-black/50 text-white px-2 py-1 rounded-full text-xs">
            {views}
          </span>
          <div className="flex gap-2">
            <button className="text-white hover:text-[var(--primary)] transition-colors duration-200">
              <Heart className="w-4 h-4" />
            </button>
            <button className="text-white hover:text-[var(--primary)] transition-colors duration-200">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 h-[150px] flex flex-col justify-between">
        {/* Product Information */}
        <div className="flex items-center gap-3">
          {/* Product Thumbnail */}
          <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center flex-shrink-0">
            <Star className="w-5 h-5 text-black" />
          </div>
          
          {/* Product Details */}
          <div className="flex flex-col min-w-0">
            <span className="text-[var(--foreground)] font-medium text-sm truncate">
              {title}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[var(--foreground)] font-semibold text-sm">
                {discountedPrice}
              </span>
              {originalPrice && (
                <span className="text-[var(--text-secondary)] text-xs line-through">
                  {originalPrice}
                </span>
              )}
            </div>
            {discount && (
              <span className="text-[var(--primary)] text-xs font-medium">
                {discount}
              </span>
            )}
          </div>
        </div>

        {/* Buy Now Button */}
        <button className="w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-black font-bold py-3 rounded-lg transition-colors duration-300" onClick={()=>navigate('/shop')}>
          Buy Now
        </button>
      </div>
    </div>
  );
}