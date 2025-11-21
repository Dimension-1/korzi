import { useState, useEffect, useRef } from 'react';
import { useCartStore } from '../../stores/cartStore';

interface ProductHeroProps {
  product: {
    title: string;
    description: string;
    images: Array<{ url: string; altText?: string }>;
    price: number;
    compareAtPrice?: number;
    variantId: string;
    quantityAvailable?: number;
  };
}

export default function ProductHero({ product }: ProductHeroProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [product.images.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    
    const container = imageContainerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const scrollPercentage = x / rect.width;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    container.scrollLeft = scrollPercentage * maxScroll;
  };

  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const imageWidth = container.clientWidth;
      const index = Math.round(scrollLeft / imageWidth);
      setSelectedImage(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const discount = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    await addToCart({
      title: product.title,
      price: product.price,
      originalPrice: product.compareAtPrice,
      quantity,
      image: product.images[0]?.url || '/image.png',
      variantId: product.variantId
    });
  };

  const features = [
    { icon: '/assets/Product/4wd.png', title: '4WD All-Terrain Drive' },
    { icon: '/assets/Product/Power.png', title: 'Rechargeable Power' },
    { icon: '/assets/Product/crasht_tested.png', title: 'Crash-Tested Build' },
    { icon: '/assets/Product/throttle.png', title: 'Responsive Throttle' },
    { icon: '/assets/Product/biscert.png', title: 'BIS Certified Machine' },
    { icon: '/assets/Product/support.png', title: 'Warranty & Support' }
  ];

  return (
    <div className="w-full mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] gap-8 lg:gap-12">
        {/* Left: Product Info */}
        <div className="space-y-5">
          <span className="inline-block px-3 py-1.5 bg-zinc-800 text-zinc-400 text-[10px] font-bold tracking-widest rounded">
            LIMITED STOCK
          </span>
          
          <h1 
            className="text-[#02FF00] uppercase text-4xl md:text-5xl lg:text-6xl"
            style={{
              fontFamily: 'Bebas Neue',
              fontWeight: 400
            }}
          >
            {product.title}
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-sm">★ 4.5/5</span>
            <span className="text-zinc-500 text-sm">• 65 Reviews</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 md:gap-3">
            <span className="text-2xl md:text-3xl font-bold">₹{product.price.toFixed(0)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <>
                <span className="text-sm text-zinc-600 line-through">₹{product.compareAtPrice.toFixed(0)}</span>
                <span className="text-xs text-zinc-400">({discount}% OFF)</span>
                <span className="text-xs text-zinc-500">MRP inclusive of all taxes</span>
              </>
            )}
          </div>

          <p 
            className="text-white max-w-[638px] text-sm md:text-base"
            style={{
              fontFamily: 'DM Sans',
              fontWeight: 400
            }}
          >
            {product.description}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-zinc-800 bg-black">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className={`p-4 md:p-5 flex items-center gap-3 ${
                  idx % 2 === 0 ? 'sm:border-r border-zinc-800' : ''
                } ${
                  idx < features.length - 1 ? 'border-b border-zinc-800' : ''
                } ${
                  idx < 4 ? 'sm:border-b border-zinc-800' : ''
                }`}
              >
                <div className="flex-shrink-0 w-8 h-8">
                  <img src={feature.icon} alt={feature.title} className="w-full h-full object-contain" />
                </div>
                <p className="text-xs md:text-sm font-medium text-white">{feature.title}</p>
              </div>
            ))}
          </div>

          {/* Quantity & Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <div className="flex items-center border border-zinc-800 bg-black">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-5 py-3 text-lg hover:bg-zinc-900 transition"
              >
                −
              </button>
              <span className="px-8 py-3 border-x border-zinc-800 text-sm font-mono">{String(quantity).padStart(2, '0')}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-5 py-3 text-lg hover:bg-zinc-900 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full sm:w-[200px] px-5 py-3 flex items-center justify-center gap-2 border-l-4 border-[#02FF00] relative overflow-hidden group bg-[#3A3A3A] text-white cursor-pointer"
              style={{
                fontFamily: 'DM Sans',
                fontSize: '12px',
                letterSpacing: '0.05em'
              }}
            >
              <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-20 group-hover:text-black transition-colors duration-300">ADD TO CART</span>
              <svg className="relative z-10 w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </button>

            <button className="w-full sm:w-[200px] bg-[#02FF00] hover:bg-[#00DD00] text-black py-3 px-10 font-bold transition text-xs uppercase tracking-widest">
              BUY NOW
            </button>
          </div>
        </div>

        {/* Right: Images */}
        <div className="space-y-4">
          <div className="relative">
            <div 
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              className="flex gap-4 overflow-x-auto scroll-smooth cursor-pointer bg-zinc-950"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {product.images.map((image, idx) => (
                <div key={idx} className="flex-shrink-0 w-full">
                  <img
                    src={image.url}
                    alt={`${product.title} - ${idx + 1}`}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
            <button 
              onClick={() => {
                if (imageContainerRef.current) {
                  const newIndex = Math.max(0, selectedImage - 1);
                  imageContainerRef.current.scrollLeft = newIndex * imageContainerRef.current.clientWidth;
                }
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-700 p-3 transition-colors z-10"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => {
                if (imageContainerRef.current) {
                  const newIndex = Math.min(product.images.length - 1, selectedImage + 1);
                  imageContainerRef.current.scrollLeft = newIndex * imageContainerRef.current.clientWidth;
                }
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#02FF00] hover:bg-[#00DD00] p-3 transition-colors z-10"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2 justify-center">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (imageContainerRef.current) {
                    imageContainerRef.current.scrollLeft = idx * imageContainerRef.current.clientWidth;
                  }
                }}
                className={`transition-all ${
                  selectedImage === idx ? 'w-8 h-1 bg-[#02FF00] rounded-full' : 'w-8 h-1 bg-zinc-800 border border-zinc-700 rounded-sm'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
