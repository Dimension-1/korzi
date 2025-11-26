import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductByHandle, ShopifyProduct } from '../services/shopify';
import CartDrawer from '../components/CartDrawer';
import ProductHero from '../components/Product/ProductHero';
import ProductTabs from '../components/Product/ProductTabs';
import BuiltInIndiaSection from '../components/Product/BuiltInIndiaSection';
import TestimonialsSection from '../components/Product/TestimonialsSection';
import VideoCarouselSection from '../components/Home/VideoCarouselSection';
import ProductFAQ from '../components/Product/ProductFAQ';
import Footer from '../components/Home/footer';
import SpecsSection from '../components/Home/SpecsSection';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const productHandle = 'apex-dr4x16-vortex-green-edition';
      setLoading(true);
      const data = await getProductByHandle(productHandle);
      setProduct(data);
      setLoading(false);
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
    variantId: firstVariant?.id || '',
    quantityAvailable: firstVariant?.quantityAvailable
  };

  return (
    <div className="w-full overflow-x-hidden bg-black text-white pt-24">
      <div className="space-y-4 lg:space-y-0">
        <ProductHero product={productData} />
        <SpecsSection />
        <ProductTabs />
        <VideoCarouselSection />
        <ProductFAQ />
        <BuiltInIndiaSection />
        <TestimonialsSection />
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default ProductDetailPage;
