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
import VideoCarouselSection from '../components/Home/VideoCarouselSection';
import MissionSection from '../components/Home/MissionSection';

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <SpecsSection />
      <ApexDriveSection />
      <div className="hidden md:block">
        <MarqueeBar />
      </div>
      <DetailCarousel />
      <div className="relative">
        <ManufacturingSection />       
        <EllipseTransition />
      </div>
      <CarAnimation />
      <VideoCarouselSection />
      <MissionSection />
      {/* <ImageCarousel /> */}
      {/* <RollingTagsBanner /> */}
      {/* <RealFoodSection /> */}
      {/* <VideoCarousel />       */}
      <FaqSection />      
      <InsightsSection />      
      <div className="hidden md:block">
        <JoinFamSection />
      </div>
      {/* <PaymentBanner /> */}
      <Footer />
    </div>
  );
}
