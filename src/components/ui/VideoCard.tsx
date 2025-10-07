'use client';

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
  id,
  image,
  overlayText,
  title,
  originalPrice,
  discountedPrice,
  discount,
  views
}: VideoCardProps) {
  return (
    <div className="bg-[var(--surface)] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-[216px] h-[500px] flex-shrink-0">
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
                ? 'bg-[var(--neon-green)] text-black font-bold'
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="text-white hover:text-[var(--primary)] transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
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
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          {/* Product Details */}
          <div className="flex flex-col">
            <span className="text-[var(--foreground)] font-medium text-sm">
              {title}
            </span>
            <span className="text-[var(--foreground)] font-semibold text-sm">
              {discountedPrice}
            </span>
          </div>
        </div>

        {/* Buy Now Button */}
        <button className="w-full bg-[var(--primary)] hover:bg-[var(--secondary)] text-black font-bold py-3 rounded-lg transition-colors duration-300">
          Buy Now
        </button>
      </div>
    </div>
  );
}
