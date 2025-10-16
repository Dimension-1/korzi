import { useState, useEffect } from 'react';
import FaqSection from '../components/Home/Faq';
import VideoCarousel from '../components/Home/videoCarousel';
import Footer from '../components/Home/footer';
import { ProductCarousel, CertificationsScroll, Review } from '../components/Shop';
import SuperYouSection from '../components/Shop/SuperYouSection';
import ShopFooter from '../components/Shop/ShopFooter';
import ProductSection from '../components/Shop/ProductSection';
import CartDrawer from '../components/CartDrawer';
import { getProducts, ShopifyProduct } from '../services/shopify';

// Transform Shopify product to ProductCarousel format
const transformShopifyProduct = (product: ShopifyProduct) => {
  const firstImage = product.images.edges[0]?.node?.url || '/image.png';
  const firstVariant = product.variants.edges[0]?.node;
  const price = parseFloat(firstVariant?.price?.amount || product.priceRange.minVariantPrice.amount);
  
  // Calculate discount (assuming 15-25% discount for demo)
  const discountPercentage = Math.floor(Math.random() * 11) + 15; // 15-25%
  const originalPrice = Math.round(price / (1 - discountPercentage / 100));
  
  return {
    id: product.id,
    title: product.title,
    image: firstImage,
    rating: 4.0 + Math.random() * 1, // Random rating between 4.0-5.0
    reviewCount: Math.floor(Math.random() * 100) + 20, // Random reviews 20-120
    originalPrice,
    discountedPrice: price,
    discountPercentage,
    variantId: firstVariant?.id,
    points: Math.random() > 0.7 ? Math.floor(Math.random() * 100) + 10 : undefined, // Random points for some products
    showWhatsApp: Math.random() > 0.8 // Random WhatsApp button for some products
  };
};

function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Fetch products from Shopify
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const shopifyProducts = await getProducts(20); // Fetch up to 20 products
        
        if (shopifyProducts.length > 0) {
          const transformedProducts = shopifyProducts.map(transformShopifyProduct);
          setProducts(transformedProducts);
        } else {
          // No products found
          setProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] lg:pb-12">
      {/* Hero Image */}
      <ProductSection/>
      <div className="">
        <img className="w-full h-[30%] object-fit" src="/image.png" alt="Shop" />
      </div>
      
      <div className="w-full">
         <img className="w-full h-[50%] object-fit" src="https://superyou.in/cdn/shop/files/Website_Banner_2560x600_Ingredients.jpg?v=1754054302&width=2000" alt="Shop" />
      </div>
      {/* Certifications Scroll */}

      <CertificationsScroll />
      
      {/* Product Carousel */}
      
      
      <VideoCarousel/>
      <Review/>
      {/* Product Carousel */}
      {loading ? (
        <div className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8">OUR PRODUCTS</h2>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
              </div>
              <p className="text-[var(--text-secondary)] mt-4">Loading products...</p>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8">OUR PRODUCTS</h2>
              <p className="text-red-500 mb-4">{error}</p>
              <p className="text-[var(--text-secondary)]">Please try again later.</p>
            </div>
          </div>
        </div>
      ) : (
        <ProductCarousel 
          title="OUR PRODUCTS"
          products={products}
          itemsPerView={4}
        />
      )}
      <FaqSection/>
      <SuperYouSection/>
      
      <Footer/>
      <ShopFooter/>
      <CartDrawer />
    </div>
  )
}

export default ShopPage
