import JoinFamSection from '../components/Home/JoinFamSection';
import FaqSection from '../components/Home/Faq';
import Footer from '../components/Home/footer';
import HeroSection from '../components/Home/HeroSection';
import SpecsSection from '../components/Home/SpecsSection';
import ApexDriveSection from '../components/Home/ApexDriveSection';
import MarqueeBar from '../components/Home/MarqueeBar'; 
import InsightsSection from '../components/Home/InsightsSection';
import DetailCarousel from '../components/Home/DetailCarousel';
import ManufacturingSection from '../components/Home/Services';
import EllipseTransition from '../components/Home/EllipseTransition';
import CarAnimation from '../components/Home/CarAnimation';
import TakeOverSection from '../components/Home/TakeOverSection';

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <SpecsSection />
      <ApexDriveSection />
      <MarqueeBar />
      <DetailCarousel />
      <div className="relative">
        <ManufacturingSection />       
        <EllipseTransition />
      </div>
      <CarAnimation />
      <TakeOverSection />
      {/* <ImageCarousel /> */}
      {/* <RollingTagsBanner /> */}
      {/* <RealFoodSection /> */}
      {/* <VideoCarousel />       */}
      <FaqSection />      
      <InsightsSection />      
      <JoinFamSection />
      {/* <PaymentBanner /> */}
      <Footer />
    </div>
  );
}
