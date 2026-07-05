import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductByHandle, ShopifyProduct } from '../services/shopify';
import CartDrawer from '../components/CartDrawer';
import ProductHero from '../components/Product/ProductHero';
import DiscountModal from '../components/DiscountModal';

// Lazy load below-fold sections
const ProductTabs = lazy(() => import('../components/Product/ProductTabs'));
const BuiltInIndiaSection = lazy(() => import('../components/Product/BuiltInIndiaSection'));
const TestimonialsSection = lazy(() => import('../components/Product/TestimonialsSection'));
const ProductFAQ = lazy(() => import('../components/Product/ProductFAQ'));
const Footer = lazy(() => import('../components/Home/footer'));
const SpecsSection = lazy(() => import('../components/Home/SpecsSection'));
const TakeOverSection = lazy(() => import('../components/Home/TakeOverSection'));

const SectionFallback = () => <div className="min-h-[400px] bg-black" />;

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const productHandle = 'apex-dr4x16-vortex-green-edition';
      setLoading(true);
      try {
        const data = await getProductByHandle(productHandle);
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#39FF14]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Product not found</h2>
          <button onClick={() => navigate('/shop')} className="text-[#39FF14]">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const images = product.images.edges.map(e => e.node);
  const firstVariant = product.variants.edges[0]?.node;
  const price = parseFloat(firstVariant?.price?.amount || '0');
  const compareAtPrice = firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : 0;

  const productData = {
    title: product.title,
    description: product.description.split('\n')[0],
    images,
    price,
    compareAtPrice: compareAtPrice > price ? compareAtPrice : undefined,
    productId: product.id,
    variantId: firstVariant?.id || '',
    quantityAvailable: firstVariant?.quantityAvailable
  };

  return (
    <div className="w-full overflow-x-hidden bg-black text-white pt-24 min-h-screen pb-20 lg:pb-0">
      <div className="space-y-2 lg:space-y-0">
        <ProductHero product={productData} />
        <Suspense fallback={<SectionFallback />}>
          <SpecsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TakeOverSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProductTabs />
        </Suspense>
       
        <Suspense fallback={<SectionFallback />}>
          <ProductFAQ />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <BuiltInIndiaSection />
        </Suspense>
        
      </div>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <CartDrawer />
      <DiscountModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={() => setShowModal(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
