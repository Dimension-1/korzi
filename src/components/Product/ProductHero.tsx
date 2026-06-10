import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { useOrderStore } from '../../stores/orderStore';
import { getCloudinaryUrl } from '../../utils/cloudinary';
import { eventNames, gaEvent } from '../../utils/gtm';
import { openFlexyPeCheckout } from '../../utils/flexypeCheckout';
import { createMetaEventId, getOrCreateCheckoutEventId } from '../../utils/metaEventId';
import { Operation } from '../CartDrawer';

interface ProductHeroProps {
  product: {
    title: string;
    description: string;
    images: Array<{ url: string; altText?: string }>;
    price: number;
    compareAtPrice?: number;
    productId: string;
    variantId: string;
    quantityAvailable?: number;
  };
}

// ─── Mobile: Why Korzi Section ────────────────────────────────────────────────
function MobileWhyKorzi() {
  const whyCards = [
    {
      icon: '/assets/Product/bis_certified.png',
      title: 'BIS Certified',
      desc: "India's child safety standard. Built for real use",
    },
    {
      icon: '/assets/Product/indian_flag.png',
      title: 'Made in India',
      desc: 'Built in Bangalore. No customs. Fast delivery.',
    },
    {
      icon: '/assets/Product/spare_parts.png',
      title: 'Spare Parts',
      desc: 'Toot gaya? Koi tension nahi. Service available.',
    },
    {
      icon: '/assets/Product/easy_returns.png',
      title: 'Easy Returns',
      desc: "Not happy? We sort it out. No runaround.",
    },
  ];

  const specs = [
    { value: '25KM/H', label: 'SPEED' },
    { value: '4WD', label: 'DRIVE' },
    { value: '50M+', label: 'RANGE' },
    { value: '25MIN', label: 'RUN TIME' },
    { value: '1:16', label: 'SCALE' },
  ];

  return (
    <div className="lg:hidden w-full mt-8 space-y-3" style={{marginTop:'24px'}}>
      {/* Heading */}
      <h1
        className="text-white text-base uppercase"
        style={{ fontFamily: 'Bebas Neue', letterSpacing: '0.08em', fontSize:'28px' }}
      >
        WHY <span className="text-[#02FF00]">KORZI</span>
      </h1>

      {/* 2×2 Cards */}
      <div className="grid grid-cols-2 gap-2">
        {whyCards.map((card, idx) => (
          <div
            key={idx}
            className="p-3 flex flex-col gap-2 rounded-lg relative"
            style={{
              background: 'linear-gradient(180deg, rgba(18, 67, 18, 0.3) 0%, rgba(21, 34, 21, 0.3) 100%)',
              border: '0.5px solid #124312',
            }}

          >
            <div className="flex items-center gap-2">
              {/* Icon container: dark green background square with rounded corners */}
              <div className="w-8 h-8 flex-shrink-0 rounded-md flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #124312 0%, #152215 100%)', border: '0.5px solid #124312' }}>
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-5 h-5 object-contain opacity-80"
                />
              </div>
              <span
                className="text-white text-xs font-semibold"
                style={{ fontFamily: 'DM Sans' }}
              >
                {card.title}
              </span>
            </div>
            <p
              className="text-zinc-400 text-[10px] leading-snug"
              style={{ fontFamily: 'DM Sans' }}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Rating + Review */}
      <div className="border border-zinc-800 bg-zinc-950 p-3 flex items-start gap-4">
        <div className="flex flex-col items-center flex-shrink-0">
          <span
            className="text-[#02FF00] text-3xl font-bold leading-none"
            style={{ fontFamily: 'Bebas Neue' }}
          >
            4.8
          </span>
          <span className="text-yellow-400 text-xs">★ ★ ★ ★ ★</span>
          <span className="text-zinc-500 text-[10px] mt-0.5" style={{ fontFamily: 'DM Sans' }}>
            248 reviews
          </span>
        </div>
        <div className="border-l border-zinc-800 pl-4">
          <p
            className="text-[#BAB6B6] text-xs italic leading-snug"
            style={{ fontFamily: 'DM Sans' }}
          >
            "Bought it for my daughter but my wife and i ended up playing more. Worth every rupee."
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[#9E9E9E] text-[10px]" style={{ fontFamily: 'DM Sans' }}>
              Siddhant M
            </span>
            <span className="text-[#02FF00] text-[10px]">
            <img
                  src="/assets/Product/verified.png"
                  alt={'card.title'}
                  className="w-[13px] h-[13px] object-contain opacity-80"
                />
            </span>
            <span className="text-[#BAB6B6] text-[10px]">Verified Buyer</span>
          </div>
        </div>
      </div>

      {/* Specs Bar */}
      <div className="border border-zinc-800 bg-black grid grid-cols-5">
        {specs.map((spec, idx) => (
          <div
            key={idx}
            className={`py-2 flex flex-col items-center justify-center bg-transparent ${
              idx < specs.length - 1 ? 'border-r border-zinc-800' : ''
            }`}
          >
            <span
              className="text-[#02FF00] text-xs font-bold"
              style={{ fontFamily: 'Bebas Neue', letterSpacing: '0.05em' }}
            >
              {spec.value}
            </span>
            <span className="text-zinc-500 text-[8px] mt-0.5" style={{ fontFamily: 'DM Sans' }}>
              {spec.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Shared timer seed – computed once per page load so both components stay in sync
const TIMER_SEED = { m: 59, s: Math.floor(Math.random() * 60) };
// Random units left between 5 and 11 – computed once per page load
const UNITS_LEFT = Math.floor(Math.random() * 7) + 5; // 5–11 inclusive

// ─── Mobile: Pricing Section ──────────────────────────────────────────────────
function MobilePricingSection({
  price,
  compareAtPrice,
  totalUnits = 50,
  onBuyNow,
  isAddingToCart,
  buyNowRef,
}: {
  price: number;
  compareAtPrice?: number;
  totalUnits?: number;
  onBuyNow: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isAddingToCart: boolean;
  buyNowRef: React.RefObject<HTMLDivElement>;
}) {
  const emiAmount = 280;
  const unitsLeft = UNITS_LEFT;

  return (
    <div className="lg:hidden w-full mt-3 space-y-2" style={{backgroundColor:"#0F0F0F", padding:16}}>

      {/* ── Block 1: Badge + Price + EMI ───────────────────────── */}
      <div className="p-4 space-y-3" style={{ background: '#000000' }}>

        {/* Badge — fire emoji + orange text, dashed border */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm"
          style={{ border: '1px solid #FF6E55', backgroundColor:'#2E1B1B' }}
        >
          <span className="text-base leading-none">🔥</span>
          <span
            className="text-[#D8200E] text-[11px] font-semibold tracking-wide"
            style={{ fontFamily: 'DM Sans' }}
          >
            Launch Offers–Ends tonight
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-3">
          <span
            className="text-white leading-none"
            style={{ fontFamily: 'Bebas Neue', fontSize: '52px' }}
          >
            ₹{price.toLocaleString('en-IN')}
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <div className="flex flex-col gap-0.5">
              <span className="text-zinc-500 text-sm line-through" style={{ fontFamily: 'DM Sans' }}>
                ₹{compareAtPrice.toLocaleString('en-IN')}
              </span>
              <span
                className="text-[#02FF00] text-xs font-bold px-2 py-0.5"
                style={{ fontFamily: 'DM Sans', background: 'rgba(2,255,0,0.12)' }}
              >
                Save ₹{(compareAtPrice - price).toLocaleString('en-IN')}
              </span>
            </div>
          )}
        </div>

        {/* EMI block — green left border, dark bg */}
        <div
          className="flex items-center justify-between p-3"
          style={{
            background: 'linear-gradient(135deg, #0d2818 0%, #071a0f 100%)',
            border: '1px solid rgba(2,255,0,0.2)',
          }}
        >
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[#02FF00] leading-none"
              style={{ fontFamily: 'Bebas Neue', fontSize: '22px', letterSpacing: '0.04em' }}
            >
              ₹{emiAmount}/MO
            </span>
            <span className="text-[#F5F5F5] text-[10px]" style={{ fontFamily: 'DM Sans' }}>
              No-cost EMI &nbsp;·&nbsp; 0% interest &nbsp;·&nbsp; All major cards
            </span>
          </div>
          <span
            className="text-[#02FF00] text-[10px] font-semibold px-2 py-1"
            style={{ border: '1px solid rgba(2,255,0,0.35)', fontFamily: 'DM Sans' }}
          >
            0% EMI
          </span>
        </div>

        {/* Footer note */}
        <p className="text-[#5E5E5E] text-[10px]" style={{ fontFamily: 'DM Sans'  }}>
        Launch Pricing . While Stock last . MRP inclusive all taxes
        </p>
      </div>

      {/* ── Block 2: Scarcity ───────────────────────────────────── */}
      <div className="border border-[#02FF00]/25 px-4 py-3 space-y-2" style={{ background: '#000000', marginBottom:'16px' }}>
        {/* Row: dot + label + count */}
        <div className="flex items-center justify-between" >
          <div className="flex items-center gap-2" >
            <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
            <span
              className="text-orange-500 text-xs font-semibold"
              style={{ fontFamily: 'DM Sans' }}
            >
              Built in small batches
            </span>
          </div>
          <span style={{ fontFamily: 'DM Sans' }}>
            <span className="text-[#02FF00] text-xs font-bold">{unitsLeft}</span>
            <span className="text-zinc-400 text-[10px]"> / {totalUnits} </span>
            <span className="text-white text-[10px] font-semibold tracking-wider">UNITS LEFT</span>
          </span>
        </div>
        {/* Progress bar: orange fill, zinc track */}
        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: '#3a3a3a' }}>
          <div
            className="h-full rounded-full bg-orange-500"
            style={{ width: `${(unitsLeft / totalUnits) * 100}%` }}
          />
        </div>
        <p className="text-zinc-500 text-[10px]" style={{ fontFamily: 'DM Sans' }}>
          Next batch ships in 3–4 weeks. Order now to avoid waiting.
        </p>
      </div>

      {/* ── Block 3: CTA buttons (ref here for IntersectionObserver) ── */}
      <div ref={buyNowRef} className="space-y-2 pb-2">
        {/* Buy Now — full green, Bebas Neue, price inline */}
        <button
          onClick={onBuyNow}
          disabled={isAddingToCart}
          className="w-full h-[56px] bg-[#02FF00] hover:bg-[#00DD00] text-black transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          style={{ fontFamily: 'Bebas Neue', fontSize: '22px', letterSpacing: '0.08em' }}
        >
          {isAddingToCart ? 'ADDING...' : `BUY NOW - ₹${price.toLocaleString('en-IN')}`}
        </button>

        {/* EMI secondary button — dark bg, green border */}
        <button
          className="w-full h-[48px] text-white text-xs font-medium flex items-center justify-center gap-1.5 transition hover:bg-zinc-900"
          style={{
            fontFamily: 'DM Sans',
            background: '#111',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          Or pay ₹{emiAmount}/month &nbsp;·&nbsp; No-cost EMI
        </button>
      </div>
    </div>
  );
}

// ─── Mobile: Floating CTA (sticky bottom) ────────────────────────────────────
function MobileFloatingCTA({
  isAddingToCart,
  onAddToCart,
  onBuyNow,
  hidden,
}: {
  isAddingToCart: boolean;
  onAddToCart: () => void;
  onBuyNow: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hidden: boolean;
}) {
  const [timeLeft, setTimeLeft] = useState({ m: TIMER_SEED.m, s: TIMER_SEED.s });

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        let { m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 0; s = 0; }
        return { m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    // lg:hidden ensures this never renders on desktop regardless of `hidden` state
    // translate-y-full slides it off-screen when inline Buy Now is visible
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-black transition-transform duration-300 ${hidden ? 'translate-y-full pointer-events-none' : 'translate-y-0'}`}>
      {/* Countdown strip */}
      <div className="flex items-center justify-center gap-1.5 py-1.5 bg- border-b border-zinc-800">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D8200E] animate-pulse" />
        <span className="text-[#FFFFFF] text-[14px]" style={{ fontFamily: 'DM Sans' }}>
          Price increases after
        </span>
        {[timeLeft.m, timeLeft.s].map((val, i) => (
          <span key={i} className="flex items-center gap-0.5">
            <span
              className="bg-[#02FF00] text-black text-[14px] font-bold px-1 py-0.5 font-mono"
              style={{ minWidth: '20px', textAlign: 'center' }}
            >
              {pad(val)}
            </span>
            {i < 1 && <span className="text-[#02FF00] text-[10px] font-bold">:</span>}
          </span>
        ))}
      </div>

      {/* Two equal buttons */}
      <div className="flex gap-0 px-3 pt-3 pb-1">
        {/* Buy Now */}
        <button
          onClick={onBuyNow}
          disabled={isAddingToCart}
          className="flex-1 h-[52px] bg-[#02FF00] hover:bg-[#00DD00] text-black transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          style={{ fontFamily: 'Bebas Neue', fontSize: '20px', letterSpacing: '0.08em' }}
        >
          {isAddingToCart ? 'ADDING...' : 'BUY NOW'}
        </button>

        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          disabled={isAddingToCart}
          data-add-to-cart
          className="flex-1 h-[52px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: '#2E2E2E', fontFamily: 'Bebas Neue', fontSize: '20px', letterSpacing: '0.08em', color: '#fff' }}
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
            style={{ color: '#02FF00' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {isAddingToCart ? 'ADDING...' : 'ADD TO CART'}
        </button>
      </div>

      {/* Trust bar */}
      <p
        className="text-center text-zinc-400 pb-2"
        style={{ fontFamily: 'DM Sans', fontSize: '10px' }}
      >
        Free delivery &nbsp;·&nbsp; BIS Certified &nbsp;·&nbsp; Built in India &nbsp;·&nbsp; Easy returns
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProductHeroV2({ product }: ProductHeroProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  // FIX: track whether inline Buy Now is visible to hide floating CTA
  const [isBuyNowVisible, setIsBuyNowVisible] = useState(false);
  const { addToCart, refreshCartCount, clearCart } = useCartStore();
  const { setCurrentOrder } = useOrderStore();
  const navigate = useNavigate();
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  // FIX: ref for the inline Buy Now section to observe
  const buyNowRef = useRef<HTMLDivElement>(null);

  // FIX: IntersectionObserver — hide floating CTA when inline Buy Now is on screen
  useEffect(() => {
    const el = buyNowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsBuyNowVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

    if (mobileContainer && mobileHandler) mobileContainer.addEventListener('scroll', mobileHandler);
    if (desktopContainer && desktopHandler) desktopContainer.addEventListener('scroll', desktopHandler);

    return () => {
      if (mobileContainer && mobileHandler) mobileContainer.removeEventListener('scroll', mobileHandler);
      if (desktopContainer && desktopHandler) desktopContainer.removeEventListener('scroll', desktopHandler);
    };
  }, []);

  // Auto-scroll images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (selectedImage + 1) % product.images.length;
      const mobileContainer = mobileContainerRef.current;
      const desktopContainer = desktopContainerRef.current;

      if (mobileContainer)
        mobileContainer.scrollTo({ left: nextIndex * mobileContainer.clientWidth, behavior: 'smooth' });
      if (desktopContainer)
        desktopContainer.scrollTo({ left: nextIndex * desktopContainer.clientWidth, behavior: 'smooth' });
    }, 5000);

    return () => clearInterval(timer);
  }, [selectedImage, product.images.length]);

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    setIsAddingToCart(true);
    try {
      gaEvent(eventNames.add_to_cart, {
        button_name: 'Add to cart',
        value: product.price * quantity,
        currency: 'Rupee',
        product_id: product?.variantId,
      });
      await addToCart({
        title: product.title,
        price: product.price,
        originalPrice: product.compareAtPrice,
        quantity,
        image: product.images[0]?.url || '/image.png',
        variantId: product.variantId,
      });
    } finally {
      setTimeout(() => setIsAddingToCart(false), 500);
    }
  };

  const handleBuyNow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAddingToCart) return;
    gaEvent(eventNames.purchase, {
      button_name: 'buy_now',
      value: quantity * product?.price || 0,
      product_id: product?.variantId,
      content_type: product.title,
      event_id: getOrCreateCheckoutEventId(),
    });

    if (window.FlexyPeCheckout?.open) {
      const productIdNum = parseInt((product.productId || '').split('/').pop() || '0');
      const variantIdNum = parseInt((product.variantId || '').split('/').pop() || '0');

      setIsAddingToCart(true);
      openFlexyPeCheckout({
        flow: 'checkout',
        source: 'buy_now_button',
        items: [{ product_id: productIdNum, variant_id: variantIdNum, quantity }],
        onClose: () => { setIsAddingToCart(false); refreshCartCount(); },
        onSuccess: () => {
          setIsAddingToCart(false);
          clearCart().catch(() => {});
          refreshCartCount();
          gaEvent(eventNames.payment_verification_successful, {
            value: quantity * product?.price || 0,
            product_id: product?.variantId,
            content_type: product.title,
            event_id: createMetaEventId('purchase'),
          });
        },
        onFailure: () => { setIsAddingToCart(false); },
      });
      return;
    }

    setIsAddingToCart(true);
    try {
      await addToCart({
        title: product.title,
        price: product.price,
        originalPrice: product.compareAtPrice,
        quantity: quantity || 1,
        image: product.images[0]?.url || '/image.png',
        variantId: product.variantId,
      });

      await new Promise((resolve) => setTimeout(resolve, 300));
      const updatedCartItems = useCartStore.getState().cartItems;
      const totalPrice = useCartStore.getState().getTotalPrice();

      setCurrentOrder({
        items: updatedCartItems.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          variantId: item.variantId,
        })),
        customer: { firstName: '', lastName: '', email: '', phone: '' },
        shippingAddress: { address1: '', address2: '', city: '', province: '', country: 'India', zip: '' },
        totalAmount: totalPrice,
        currency: 'INR',
      });
      navigate('/checkout');
    } catch (error) {
      console.error('Buy now error:', error);
    } finally {
      setTimeout(() => setIsAddingToCart(false), 500);
    }
  };

  const features = [
    { icon: '/assets/Product/4wd.png', title: '4WD All-Terrain Drive' },
    { icon: '/assets/Product/Power.png', title: 'Rechargeable Power' },
    { icon: '/assets/Product/crasht_tested.png', title: 'Crash-Tested Build' },
    { icon: '/assets/Product/throttle.png', title: 'Responsive Throttle' },
    { icon: '/assets/Product/biscert.png', title: 'BIS Certified Machine' },
    { icon: '/assets/Product/support.png', title: 'Warranty & Support' },
  ];

  const handleQuantityChange = (operation: Operation) => {
    if (operation === Operation.DECREASE) {
      const newQuantity = Math.max(1, quantity - 1);
      gaEvent(eventNames.remove_from_cart, {
        button_name: '-',
        newQuantity,
        prevQuantiry: quantity,
        previousValue: product.price * newQuantity,
        product_id: product.variantId,
        value: product.price * newQuantity,
      });
      setQuantity(newQuantity);
    } else if (operation === Operation.INCREASE) {
      const newQuantity = quantity + 1;
      gaEvent(eventNames.add_quantity_cart, {
        button_name: '+',
        newQuantity,
        prevQuantiry: quantity,
        product_id: product.variantId,
        previousValue: product.price * newQuantity,
        value: product.price * newQuantity,
      });
      setQuantity(newQuantity);
    }
  };

  return (
    <>
      {/* ── Main hero layout ─────────────────────────────────────── */}
      {/* FIX: reduced pb on mobile since inline Buy Now replaces floating CTA at bottom */}
      <div className="w-full mx-auto px-4 md:px-8 py-1 md:py-12 min-h-[800px] md:min-h-[900px] pb-[80px] lg:pb-0">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-16">
          {/* Title – Mobile only */}
          <div className="lg:hidden space-y-1">
            <h2
              className="text-[#02FF00] text-2xl uppercase"
              style={{ fontFamily: 'Bebas Neue', fontWeight: 400, lineHeight: '44px' }}
            >
              SEMI HOBBY GRADE RC CAR
            </h2>
            <p className="text-white text-s" style={{ fontFamily: 'DM Sans' }}>
              Built for impact. Tuned for control.
            </p>
          </div>

          {/* Images – Mobile */}
          <div className="space-y-2 lg:hidden">
            <div className="relative">
              <div ref={mobileContainerRef} className="flex overflow-x-hidden bg-zinc-950">
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
                <svg
                  className="w-4 h-4 text-white group-hover:text-black transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const container = mobileContainerRef.current;
                  if (container) {
                    const newIndex = (selectedImage + 1) % product.images.length;
                    container.scrollTo({ left: newIndex * container.clientWidth, behavior: 'smooth' });
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-[#02FF00] p-2 transition-colors z-10 group"
              >
                <svg
                  className="w-4 h-4 text-white group-hover:text-black transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
                    if (container)
                      container.scrollTo({ left: idx * container.clientWidth, behavior: 'smooth' });
                  }}
                  className={`transition-all ${
                    selectedImage === idx
                      ? 'w-8 h-1.5 bg-[#02FF00]'
                      : 'w-8 h-1.5 bg-transparent border border-[#02FF00]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── Left: Product Info ─────────────────────────────────── */}
          <div className="space-y-2 lg:space-y-6 lg:pr-8 lg:order-first">
            <span className="inline-block px-2 py-1 lg:px-3 lg:py-1.5 bg-zinc-800 text-zinc-400 text-[8px] lg:text-[10px] font-bold tracking-widest rounded">
              LIMITED STOCK
            </span>

            <h1
              className="text-[#02FF00] uppercase text-2xl lg:text-6xl"
              style={{ fontFamily: 'Bebas Neue', fontWeight: 400 }}
            >
              {product.title}
            </h1>

            <div className="lg:hidden flex flex-wrap items-baseline gap-1.5">
              <span className="text-xl font-bold">₹{product.price.toFixed(0)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="text-sm text-zinc-600 line-through">
                    ₹{product.compareAtPrice.toFixed(0)}
                  </span>
                  <span className="text-xs text-zinc-400">({discount}% OFF)</span>
                  <span className="text-xs text-zinc-500">MRP inclusive of all taxes</span>
                </>
              )}
            </div>

            <div className="hidden inline-flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900">
              <span className="text-white text-xs lg:text-sm" style={{ fontFamily: 'DM Sans' }}>
                ₹5,000–₹7,500
              </span>
              <span className="text-zinc-500">|</span>
              <span className="text-[#02FF00] text-xs lg:text-sm font-medium" style={{ fontFamily: 'DM Sans' }}>
                EMI from ₹280/mo
              </span>
            </div>


           

            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-xs lg:text-sm">★ ★ ★ ★ ★</span>
              <span className="text-zinc-500 text-xs lg:text-sm font-bold">Rated</span>
              <span className="text-xs lg:text-sm font-bold">4.8/5.0</span>
              <span className="text-zinc-500 text-xs lg:text-sm font-bold">(248 Reviews)</span>
              {/* FIX: Limited Stock text now correctly red */}
              <span className="text-xs lg:text-sm font-bold text-[#D8200E]">• Limited Stock</span>
            </div>


            {/* Desktop price — strictly hidden on mobile */}
            <div className="lg:flex hidden flex-wrap items-baseline gap-1.5 lg:gap-3">
              <span className="text-xl lg:text-3xl font-bold">₹{product.price.toFixed(0)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="text-xs lg:text-sm text-zinc-600 line-through">
                    ₹{product.compareAtPrice.toFixed(0)}
                  </span>
                  <span className="text-[10px] lg:text-xs text-zinc-400">({discount}% OFF)</span>
                  <span className="text-[10px] lg:text-xs text-zinc-500">MRP inclusive of all taxes</span>
                </>
              )}
            </div>

            {/* Comparison Table – Mobile only */}
            <div className="lg:hidden w-full border border-zinc-800 bg-black">
              <div className="grid grid-cols-2">
                <div className="py-2 px-2 text-center border-b border-r border-zinc-800">
                  <span className="text-sm font-bold text-zinc-400" style={{ fontFamily: 'DM Sans' }}>
                    TOY RC
                  </span>
                </div>
                <div className="py-2 px-2 text-center border-b border-zinc-800">
                  <span className="text-sm font-bold text-[#02FF00]" style={{ fontFamily: 'DM Sans' }}>
                    KORZI K-01
                  </span>
                </div>
                {[
                  ['Basic 2WD Drive', '4WD All Terrain Traction'],
                  ['Fragile Plastic body', 'Reinforced ABS Chassis'],
                  ['Breaks in weeks', 'Crash – Tested'],
                  ['No Support', 'Indian Warranty'],
                ].map(([bad, good], idx) => (
                  <>
                    <div
                      key={`bad-${idx}`}
                      className={`py-2 px-2 flex items-center gap-2 border-r border-zinc-800 ${
                        idx < 3 ? 'border-b border-zinc-800' : ''
                      }`}
                    >
                      <span className="text-red-500 text-sm flex-shrink-0">✕</span>
                      <span className="text-white text-xs" style={{ fontFamily: 'DM Sans' }}>
                        {bad}
                      </span>
                    </div>
                    <div
                      key={`good-${idx}`}
                      className={`py-2 px-2 flex items-center gap-2 ${
                        idx < 3 ? 'border-b border-zinc-800' : ''
                      }`}
                    >
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#02FF00"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <span className="text-white text-xs" style={{ fontFamily: 'DM Sans' }}>
                        {good}
                      </span>
                    </div>
                  </>
                ))}
              </div>
            </div>

            <p
              className="text-white max-w-[638px] text-xs lg:text-base mb-4"
              style={{ fontFamily: 'DM Sans', fontWeight: 400, marginBottom:'10px' }}
            >
              {product.description}
            </p>

            {/* ── Mobile-only Why Korzi + Pricing (inserted inline) ── */}
            <MobileWhyKorzi />
            <MobilePricingSection
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              totalUnits={50}
              onBuyNow={handleBuyNow}
              isAddingToCart={isAddingToCart}
              buyNowRef={buyNowRef}
            />

            {/* Features Grid */}
            <div className="hidden bg-[#1F1F1F] lg:grid grid-cols-2 gap-0 border border-zinc-800 bg-black">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 lg:p-5 flex items-center gap-2 lg:gap-3 ${
                    idx % 2 === 0 ? 'border-r border-zinc-800' : ''
                  } ${idx < features.length - 2 ? 'border-b border-zinc-800' : ''}`}
                >
                  <div className="flex-shrink-0 w-5 h-5 lg:w-8 lg:h-8">
                    <img
                      src={getCloudinaryUrl(feature.icon)}
                      alt={feature.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[10px] lg:text-sm font-medium text-white">{feature.title}</p>
                </div>
              ))}
            </div>

            {/* Quantity & Actions – Desktop only (mobile handled by inline CTA + FloatingCTA) */}
            <div className="hidden lg:flex lg:flex-row gap-3 pt-2">
              <div className="flex items-center border border-zinc-800 bg-black h-[50px]">
                <button
                  onClick={() => handleQuantityChange(Operation.DECREASE)}
                  className="px-5 h-full text-lg hover:bg-zinc-900 transition"
                >
                  −
                </button>
                <span className="px-8 h-full flex items-center justify-center border-x border-zinc-800 text-sm font-mono">
                  {String(quantity).padStart(2, '0')}
                </span>
                <button
                  onClick={() => handleQuantityChange(Operation.INCREASE)}
                  className="px-5 h-full text-lg hover:bg-zinc-900 transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                data-add-to-cart
                className="w-[200px] h-[50px] px-5 flex items-center justify-center gap-2 border-l-4 border-[#02FF00] relative overflow-hidden group bg-[#3A3A3A] text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'DM Sans', fontSize: '11px', letterSpacing: '0.05em' }}
              >
                <span className="absolute inset-0 bg-[#02FF00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-20 group-hover:text-black transition-colors duration-300">
                  {isAddingToCart ? 'ADDING...' : 'ADD TO CART'}
                </span>
                <svg
                  className="relative z-10 w-4 h-4 text-[#02FF00] group-hover:text-black transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isAddingToCart}
                className="w-[200px] h-[50px] bg-[#02FF00] hover:bg-[#00DD00] text-black px-10 font-bold transition text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingToCart ? 'ADDING...' : 'BUY NOW'}
              </button>
            </div>
          </div>

          {/* Images – Desktop */}
          <div className="hidden lg:block space-y-4">
            <div className="relative max-w-[600px] mx-auto">
              <div ref={desktopContainerRef} className="flex overflow-x-hidden bg-zinc-950">
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
                <svg
                  className="w-6 h-6 text-white group-hover:text-black transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const container = desktopContainerRef.current;
                  if (container) {
                    const newIndex = (selectedImage + 1) % product.images.length;
                    container.scrollTo({ left: newIndex * container.clientWidth, behavior: 'smooth' });
                  }
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-[#02FF00] p-3 transition-colors z-10 group"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:text-black transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
                    if (container)
                      container.scrollTo({ left: idx * container.clientWidth, behavior: 'smooth' });
                  }}
                  className={`transition-all ${
                    selectedImage === idx
                      ? 'w-10 h-1.5 bg-[#02FF00]'
                      : 'w-10 h-1.5 bg-transparent border border-[#02FF00]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Floating CTA — hidden when inline Buy Now is visible ── */}
      <MobileFloatingCTA
        isAddingToCart={isAddingToCart}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        hidden={isBuyNowVisible}
      />
    </>
  );
}