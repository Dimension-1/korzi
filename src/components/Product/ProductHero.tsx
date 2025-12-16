import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { useOrderStore } from '../../stores/orderStore';
import { getCloudinaryUrl } from '../../utils/cloudinary';

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
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCartStore();
  const { setCurrentOrder } = useOrderStore();
  const navigate = useNavigate();
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const handleScroll = (container: HTMLDivElement) => () => {
      const scrollLeft = container.scrollLeft;
      const imageWidth = container.clientWidth;
      const index = Math.round(scrollLeft / imageWidth);
      setSelectedImage(index);
    };

    const mobileContainer = mobileContainerRef.current;
    const desktopContainer = desktopContainerRef.current;
    
    const mobileHandler = mobileContainer ? handleScroll(mobileContainer) : null;
    const desktopHandler = desktopContainer ? handleScroll(desktopContainer) : null;

    if (mobileContainer && mobileHandler) {
      mobileContainer.addEventListener('scroll', mobileHandler);
    }
    if (desktopContainer && desktopHandler) {
      desktopContainer.addEventListener('scroll', desktopHandler);
    }

    return () => {
      if (mobileContainer && mobileHandler) {
        mobileContainer.removeEventListener('scroll', mobileHandler);
      }
      if (desktopContainer && desktopHandler) {
        desktopContainer.removeEventListener('scroll', desktopHandler);
      }
    };
  }, []);

  // Auto-scroll images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (selectedImage + 1) % product.images.length;
      const mobileContainer = mobileContainerRef.current;
      const desktopContainer = desktopContainerRef.current;
      
      if (mobileContainer) {
        mobileContainer.scrollTo({ left: nextIndex * mobileContainer.clientWidth, behavior: 'smooth' });
      }
      if (desktopContainer) {
        desktopContainer.scrollTo({ left: nextIndex * desktopContainer.clientWidth, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [selectedImage, product.images.length]);

  const discount = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    try {
      await addToCart({
        title: product.title,
        price: product.price,
        originalPrice: product.compareAtPrice,
        quantity,
        image: product.images[0]?.url || '/image.png',
        variantId: product.variantId
      });
    } finally {
      setTimeout(() => setIsAddingToCart(false), 500);
    }
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    try {
      await addToCart({
        title: product.title,
        price: product.price,
        originalPrice: product.compareAtPrice,
        quantity: 1,
        image: product.images[0]?.url || '/image.png',
        variantId: product.variantId
      });
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedCartItems = useCartStore.getState().cartItems;
      const totalPrice = useCartStore.getState().getTotalPrice();
      
      const orderData = {
        items: updatedCartItems.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          variantId: item.variantId
        })),
        customer: {
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        },
        shippingAddress: {
          address1: '',
          address2: '',
          city: '',
          province: '',
          country: 'India',
          zip: ''
        },
        totalAmount: totalPrice,
        currency: 'INR'
      };
      
      setCurrentOrder(orderData);
      navigate('/checkout');
    } catch (error) {
      console.error('Buy now error:', error);
    }
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
    <div className="w-full mx-auto px-4 md:px-8 py-4 md:py-12">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-16">
        {/* Right: Images - First on mobile */}
        <div className="space-y-2 lg:hidden">
          <div className="relative">
            <div 
              ref={mobileContainerRef}
              className="flex overflow-x-hidden bg-zinc-950"
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
                const container = mobileContainerRef.current;
                if (container) {
                  const newIndex = Math.max(0, selectedImage - 1);
                  container.scrollTo({ left: newIndex * container.clientWidth, behavior: 'smooth' });
                }
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-[#02FF00] p-2 transition-colors z-10 group"
            >
              <svg className="w-4 h-4 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => {
                const container = mobileContainerRef.current;
                if (container) {
                  const newIndex = Math.min(product.images.length - 1, selectedImage + 1);
                  container.scrollTo({ left: newIndex * container.clientWidth, behavior: 'smooth' });
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-[#02FF00] p-2 transition-colors z-10 group"
            >
              <svg className="w-4 h-4 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2 justify-center">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const container = mobileContainerRef.current;
                  if (container) {
                    container.scrollTo({ left: idx * container.clientWidth, behavior: 'smooth' });
                  }
                }}
                className={`transition-all ${
                  selectedImage === idx ? 'w-8 h-1.5 bg-[#02FF00]' : 'w-8 h-1.5 bg-transparent border border-[#02FF00]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Left: Product Info */}
        <div className="space-y-2 lg:space-y-6 lg:pr-8 lg:order-first">
          <span className="inline-block px-2 py-1 lg:px-3 lg:py-1.5 bg-zinc-800 text-zinc-400 text-[8px] lg:text-[10px] font-bold tracking-widest rounded">
            LIMITED STOCK
          </span>
          
          <h1 
            className="text-[#02FF00] uppercase text-2xl lg:text-6xl"
            style={{
              fontFamily: 'Bebas Neue',
              fontWeight: 400
            }}
          >
            {product.title}
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-xs lg:text-sm">★ 4.5/5</span>
            <span className="text-zinc-500 text-xs lg:text-sm">• 65 Reviews</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-1.5 lg:gap-3">
            <span className="text-xl lg:text-3xl font-bold">₹{product.price.toFixed(0)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <>
                <span className="text-xs lg:text-sm text-zinc-600 line-through">₹{product.compareAtPrice.toFixed(0)}</span>
                <span className="text-[10px] lg:text-xs text-zinc-400">({discount}% OFF)</span>
                <span className="text-[10px] lg:text-xs text-zinc-500">MRP inclusive of all taxes</span>
              </>
            )}
          </div>

          <p 
            className="text-white max-w-[638px] text-xs lg:text-base"
            style={{
              fontFamily: 'DM Sans',
              fontWeight: 400
            }}
          >
            {product.description}
          </p>

          {/* Features Grid */}
          <div className="bg-[#1F1F1F] grid grid-cols-2 gap-0 border border-zinc-800 bg-black">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className={`p-2.5 lg:p-5 flex items-center gap-2 lg:gap-3 ${
                  idx % 2 === 0 ? 'border-r border-zinc-800' : ''
                } ${
                  idx < features.length - 2 ? 'border-b border-zinc-800' : ''
                }`}
              >
                <div className="flex-shrink-0 w-5 h-5 lg:w-8 lg:h-8">
                  <img src={getCloudinaryUrl(feature.icon)} alt={feature.title} className="w-full h-full object-contain" />
                </div>
                <p className="text-[10px] lg:text-sm font-medium text-white">{feature.title}</p>
              </div>
            ))}
          </div>

          {/* Quantity & Actions */}
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 pt-2">
            <div className="flex gap-2 lg:contents">
              <div className="flex items-center border border-zinc-800 bg-black h-[45px] lg:h-[50px] w-auto">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 lg:px-5 h-full text-base lg:text-lg hover:bg-zinc-900 transition"
                >
                  −
                </button>
                <span className="px-6 lg:px-8 h-full flex items-center justify-center border-x border-zinc-800 text-xs lg:text-sm font-mono">{String(quantity).padStart(2, '0')}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 lg:px-5 h-full text-base lg:text-lg hover:bg-zinc-900 transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="flex-1 lg:w-[200px] h-[45px] lg:h-[50px] px-4 lg:px-5 flex items-center justify-center gap-2 border-l-4 border-[#02FF00] relative overflow-hidden group bg-[#3A3A3A] text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  fontFamily: 'DM Sans',
                  fontSize: '11px',
                  letterSpacing: '0.05em'
                }}
              >
                <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-20 group-hover:text-black transition-colors duration-300">{isAddingToCart ? 'ADDING...' : 'ADD TO CART'}</span>
                <svg className="relative z-10 w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </button>
            </div>

            <button 
              onClick={handleBuyNow}
              disabled={isAddingToCart}
              className="w-full lg:w-[200px] h-[45px] lg:h-[50px] bg-[#02FF00] hover:bg-[#00DD00] text-black px-8 lg:px-10 font-bold transition text-[11px] lg:text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? 'ADDING...' : 'BUY NOW'}
            </button>
          </div>
        </div>

        {/* Right: Images - Desktop only */}
        <div className="hidden lg:block space-y-4">
          <div className="relative max-w-[600px] mx-auto">
            <div 
              ref={desktopContainerRef}
              className="flex overflow-x-hidden bg-zinc-950"
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
                const container = desktopContainerRef.current;
                if (container) {
                  const newIndex = Math.max(0, selectedImage - 1);
                  container.scrollTo({ left: newIndex * container.clientWidth, behavior: 'smooth' });
                }
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-[#02FF00] p-3 transition-colors z-10 group"
            >
              <svg className="w-6 h-6 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => {
                const container = desktopContainerRef.current;
                if (container) {
                  const newIndex = Math.min(product.images.length - 1, selectedImage + 1);
                  container.scrollTo({ left: newIndex * container.clientWidth, behavior: 'smooth' });
                }
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-[#02FF00] p-3 transition-colors z-10 group"
            >
              <svg className="w-6 h-6 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="flex gap-2 justify-center">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const container = desktopContainerRef.current;
                  if (container) {
                    container.scrollTo({ left: idx * container.clientWidth, behavior: 'smooth' });
                  }
                }}
                className={`transition-all ${
                  selectedImage === idx ? 'w-10 h-1.5 bg-[#02FF00]' : 'w-10 h-1.5 bg-transparent border border-[#02FF00]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
