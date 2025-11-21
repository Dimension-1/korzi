import HeroSection from '../components/About/HeroSection';
import AutoScrollImages from '../components/About/AutoScrollImages';
import PillarsSection from '../components/About/PillarsSection';
import Footer from '../components/Home/footer';
import CartDrawer from '../components/CartDrawer';

const AboutPage = () => {
  return (
    <div className="w-full overflow-x-hidden bg-black text-white pt-24">
      <HeroSection />
      <AutoScrollImages />
      <PillarsSection />
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default AboutPage;
