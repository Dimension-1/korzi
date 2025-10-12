import FaqSection from '../components/Home/Faq';
import VideoCarousel from '../components/Home/videoCarousel';
import Footer from '../components/Home/footer';
import { ProductCarousel, CertificationsScroll, Review } from '../components/Shop';
import SuperYouSection from '../components/Shop/SuperYouSection';
import ShopFooter from '../components/Shop/ShopFooter';
import ProductSection from '../components/Shop/ProductSection';
import CartDrawer from '../components/CartDrawer';

function ShopPage() {
  // Sample product data matching the design
  const sampleProducts = [
    {
      id: '1',
      title: 'UNFLAVOURED 1 KG - FERMENTED YEAST PROTEIN',
      image: '/image.png',
      rating: 4.5,
      reviewCount: 46,
      originalPrice: 2799,
      discountedPrice: 2199,
      discountPercentage: 21,
      variantId: 'gid://shopify/ProductVariant/1',
      points: 0
    },
    {
      id: '2',
      title: 'CHOCOLATE & COLD COFFEE ASSORTED - PACK OF 8 SACHETS',
      image: '/image.png',
      rating: 4.5,
      reviewCount: 48,
      originalPrice: 1099,
      discountedPrice: 899,
      discountPercentage: 18,
      variantId: 'gid://shopify/ProductVariant/2'
    },
    {
      id: '3',
      title: 'CHOCOLATE - PACK OF 8 SACHETS',
      image: '/image.png',
      rating: 4.0,
      reviewCount: 33,
      originalPrice: 1099,
      discountedPrice: 899,
      discountPercentage: 18,
      variantId: 'gid://shopify/ProductVariant/3'
    },
    {
      id: '4',
      title: 'COLD COFFEE - PACK OF 8 SACHETS',
      image: '/image.png',
      rating: 4.5,
      reviewCount: 77,
      originalPrice: 1099,
      discountedPrice: 899,
      discountPercentage: 18,
      variantId: 'gid://shopify/ProductVariant/4',
      showWhatsApp: true
    },
    {
      id: '5',
      title: 'VANILLA - PACK OF 8 SACHETS',
      image: '/image.png',
      rating: 4.2,
      reviewCount: 52,
      originalPrice: 1199,
      discountedPrice: 999,
      discountPercentage: 17,
      variantId: 'gid://shopify/ProductVariant/5',
      points: 50
    },
    {
      id: '6',
      title: 'STRAWBERRY - PACK OF 8 SACHETS',
      image: '/image.png',
      rating: 4.3,
      reviewCount: 41,
      originalPrice: 1299,
      discountedPrice: 1099,
      discountPercentage: 15,
      variantId: 'gid://shopify/ProductVariant/6',
      showWhatsApp: true
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
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
      <ProductCarousel 
        title="OUR PRODUCTS"
        products={sampleProducts}
        itemsPerView={4}
      />
      <FaqSection/>
      <SuperYouSection/>
      
      <Footer/>
      <ShopFooter/>
      <CartDrawer />
    </div>
  )
}

export default ShopPage
